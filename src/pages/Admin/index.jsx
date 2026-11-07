import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { bookingService } from '../../services/bookingService';
import './Admin.css';

export default function Admin() {
  const [bookings, setBookings] = useState([]);
  const [summary, setSummary] = useState({ total: 0, confirmed: 0, pending: 0, revenue: 0 });
  const [blockedDates, setBlockedDates] = useState([]);
  const [newBlockedDate, setNewBlockedDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [actionLoading, setActionLoading] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const [bookingsRes, summaryRes, blockedRes] = await Promise.all([
      bookingService.getAllBookings(),
      bookingService.getBookingSummary(),
      bookingService.getBlockedDates(),
    ]);

    if (bookingsRes.success) {
      setBookings(bookingsRes.data);
    }
    if (summaryRes.success) {
      setSummary(summaryRes.summary);
    }
    if (blockedRes.success) {
      setBlockedDates(blockedRes.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      setLoading(true);
      const [bookingsRes, summaryRes, blockedRes] = await Promise.all([
        bookingService.getAllBookings(),
        bookingService.getBookingSummary(),
        bookingService.getBlockedDates(),
      ]);

      if (!ignore) {
        if (bookingsRes.success) {
          setBookings(bookingsRes.data);
        }
        if (summaryRes.success) {
          setSummary(summaryRes.summary);
        }
        if (blockedRes.success) {
          setBlockedDates(blockedRes.data);
        }
        setLoading(false);
      }
    }

    fetchData();

    return () => {
      ignore = true;
    };
  }, []);

  const handleBlockDate = async (e) => {
    e.preventDefault();
    if (!newBlockedDate) return;
    const res = await bookingService.blockDate(newBlockedDate);
    if (res.success) {
      setBlockedDates((prev) => [...prev, newBlockedDate].sort());
      setNewBlockedDate('');
    }
  };

  const handleUnblockDate = async (dateStr) => {
    const res = await bookingService.unblockDate(dateStr);
    if (res.success) {
      setBlockedDates((prev) => prev.filter((d) => d !== dateStr));
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setActionLoading(id);
    const res = await bookingService.updateBookingStatus(id, newStatus);
    if (res.success) {
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
      // Reload summary stats
      const sumRes = await bookingService.getBookingSummary();
      if (sumRes.success) setSummary(sumRes.summary);
    }
    setActionLoading(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const filteredBookings = bookings.filter((b) => {
    if (filter === 'all') return true;
    return b.status === filter;
  });

  return (
    <div className="admin-dashboard-container">
      {/* Header bar */}
      <header className="admin-header-bar">
        <div className="admin-header-left">
          <div className="admin-logo-mark">MRT</div>
          <div>
            <h1 className="admin-header-title">Gestão Operacional</h1>
            <p className="admin-header-sub">Painel de Controlo de Reservas & Viagens</p>
          </div>
        </div>
        <button onClick={handleLogout} className="admin-logout-btn">
          Terminar Sessão
        </button>
      </header>

      {/* Metric summary cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <span className="stat-label">Total de Reservas</span>
          <span className="stat-val">{summary.total}</span>
        </div>
        <div className="admin-stat-card">
          <span className="stat-label">Confirmadas</span>
          <span className="stat-val stat-val--confirmed">{summary.confirmed}</span>
        </div>
        <div className="admin-stat-card">
          <span className="stat-label">Pendentes / Orçamentos</span>
          <span className="stat-val stat-val--pending">{summary.pending}</span>
        </div>
        <div className="admin-stat-card">
          <span className="stat-label">Faturação Confirmada</span>
          <span className="stat-val stat-val--revenue">{summary.revenue} €</span>
        </div>
      </div>

      {/* Capacity & Blocked Dates Management (Fase 2) */}
      <div className="admin-capacity-card">
        <div className="admin-capacity-header">
          <div>
            <h2 className="admin-section-title">Bloqueio de Datas & Lotação</h2>
            <p className="admin-subtext">As datas aqui adicionadas ficam bloqueadas no formulário de reserva dos clientes.</p>
          </div>
          <form onSubmit={handleBlockDate} className="admin-block-form">
            <input
              type="date"
              required
              value={newBlockedDate}
              onChange={(e) => setNewBlockedDate(e.target.value)}
              className="admin-date-input"
            />
            <button type="submit" className="admin-block-btn">
              + Bloquear Data
            </button>
          </form>
        </div>

        <div className="admin-blocked-pills">
          {blockedDates.length === 0 ? (
            <span className="admin-subtext">Nenhuma data bloqueada atualmente (todas disponíveis).</span>
          ) : (
            blockedDates.map((dateStr) => (
              <span key={dateStr} className="admin-blocked-pill">
                🔒 {dateStr}
                <button
                  type="button"
                  onClick={() => handleUnblockDate(dateStr)}
                  className="admin-unblock-x"
                  title="Desbloquear esta data"
                >
                  ✕
                </button>
              </span>
            ))
          )}
        </div>
      </div>

      {/* Filter and control bar */}
      <div className="admin-table-controls">
        <div className="admin-filters">
          <button
            onClick={() => setFilter('all')}
            className={`admin-filter-pill ${filter === 'all' ? 'active' : ''}`}
          >
            Todas ({bookings.length})
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`admin-filter-pill ${filter === 'confirmed' ? 'active' : ''}`}
          >
            Confirmadas
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`admin-filter-pill ${filter === 'pending' ? 'active' : ''}`}
          >
            Pendentes
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`admin-filter-pill ${filter === 'completed' ? 'active' : ''}`}
          >
            Concluídas
          </button>
        </div>

        <button onClick={loadData} className="admin-refresh-btn" disabled={loading}>
          {loading ? 'A atualizar...' : '↻ Atualizar Lista'}
        </button>
      </div>

      {/* Bookings table */}
      <div className="admin-table-wrapper">
        {loading ? (
          <div className="admin-loading-state">A carregar registos da base de dados...</div>
        ) : filteredBookings.length === 0 ? (
          <div className="admin-empty-state">
            <p>Nenhuma reserva encontrada para este filtro.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Data Viagem</th>
                <th>Cliente</th>
                <th>Serviço</th>
                <th>Pax</th>
                <th>Valor</th>
                <th>Estado</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => {
                const customerName = b.customer?.name || b.customer_name || 'N/D';
                const customerPhone = b.customer?.phone || b.customer_phone || '';
                const customerEmail = b.customer?.email || b.customer_email || '';

                return (
                  <tr key={b.id}>
                    <td>
                      <strong>{b.booking_date || 'Data a definir'}</strong>
                      <div className="admin-subtext">{b.booking_time || 'Hora flexível'}</div>
                    </td>
                    <td>
                      <div className="admin-customer-name">{customerName}</div>
                      {customerPhone && (
                        <a
                          href={`https://wa.me/${customerPhone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noreferrer"
                          className="admin-wa-link"
                          title="Abrir WhatsApp do cliente"
                        >
                          💬 {customerPhone}
                        </a>
                      )}
                      {customerEmail && (
                        <div className="admin-subtext">{customerEmail}</div>
                      )}
                    </td>
                    <td>
                      <span className="admin-service-badge">{b.service_name || b.service_type}</span>
                      {b.pickup_location && (
                        <div className="admin-subtext">📍 {b.pickup_location}</div>
                      )}
                    </td>
                    <td>{b.passengers || 1}</td>
                    <td>
                      <strong>{b.total_amount ? `${b.total_amount} €` : 'Sob Orçamento'}</strong>
                    </td>
                    <td>
                      <span className={`admin-status-tag admin-status-tag--${b.status}`}>
                        {b.status}
                      </span>
                    </td>
                    <td>
                      <div className="admin-actions-cell">
                        {b.status !== 'confirmed' && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'confirmed')}
                            disabled={actionLoading === b.id}
                            className="btn-action-confirm"
                          >
                            Confirmar
                          </button>
                        )}
                        {b.status !== 'completed' && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'completed')}
                            disabled={actionLoading === b.id}
                            className="btn-action-complete"
                          >
                            Concluir
                          </button>
                        )}
                        {b.status !== 'cancelled' && (
                          <button
                            onClick={() => handleStatusChange(b.id, 'cancelled')}
                            disabled={actionLoading === b.id}
                            className="btn-action-cancel"
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
