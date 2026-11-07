import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import './AdminLogin.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin';

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data?.session) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setErrorMsg(err.message || 'Erro ao iniciar sessão. Verifica os teus dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="admin-brand-badge">MRT</div>
          <h1>Backoffice Admin</h1>
          <p>Painel de Gestão — Madeira Ride Tours</p>
        </div>

        {errorMsg && (
          <div className="admin-login-error" role="alert">
            <span>⚠️</span> {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="admin-login-form">
          <label className="admin-login-label">
            Email de Administrador
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="admin@madeiraridetours.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-login-input"
            />
          </label>

          <label className="admin-login-label">
            Palavra-passe
            <input
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-login-input"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="admin-login-submit"
          >
            {loading ? 'A autenticar...' : 'Entrar no Painel'}
          </button>
        </form>

        <div className="admin-login-footer">
          <a href="/" className="admin-back-link">← Voltar ao Website</a>
        </div>
      </div>
    </div>
  );
}

