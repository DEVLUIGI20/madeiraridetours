import React from 'react';
import { makeWhatsAppUrl } from '../../constants';
import './ErrorBoundary.css';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console or remote monitoring in production
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const emergencyWhatsApp = makeWhatsAppUrl(
        'Olá! Ocorreu um problema técnico na página e preciso de apoio com uma reserva.'
      );

      return (
        <div className="error-boundary-wrapper">
          <div className="error-boundary-card">
            <div className="error-boundary-icon" aria-hidden="true">⚠️</div>
            <h1 className="error-boundary-title">Algo correu mal</h1>
            <p className="error-boundary-desc">
              Pedimos desculpa pelo incómodo. Ocorreu uma falha inesperada ao carregar esta secção.
            </p>
            <div className="error-boundary-actions">
              <button
                type="button"
                className="error-boundary-btn error-boundary-btn-primary"
                onClick={this.handleReset}
              >
                Voltar à Página Principal
              </button>
              <a
                href={emergencyWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="error-boundary-btn error-boundary-btn-whatsapp"
              >
                Apoio via WhatsApp
              </a>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="error-boundary-details">
                <summary>Detalhes do Erro (Dev)</summary>
                <pre>{this.state.error.toString()}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

