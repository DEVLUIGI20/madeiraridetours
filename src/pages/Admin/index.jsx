import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import { bookingService } from '../../services/bookingService';
import './Admin.css';

// Professional SVG Icons (NO EMOJIS)
const Icons = {
  Dashboard: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vip-icon">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Calendar: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vip-icon">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  Map: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vip-icon">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  ),
  Users: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vip-icon">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vip-icon">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  Logout: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vip-icon">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Search: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vip-icon-search">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  TrendUp: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vip-icon-small">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vip-icon-small">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Alert: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vip-icon-small">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  Refresh: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vip-icon-small">
      <polyline points="23 4 23 10 17 10" />
      <polyline points="1 20 1 14 7 14" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="vip-icon-inline">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
};

export default function Admin() {
  const todayDateStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const [bookings, setBookings] = useState([]);
  const [customTourRequests, setCustomTourRequests] = useState([]);
  const [summary, setSummary] = useState({
    total: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
    revenue: 0,
    pendingRevenue: 0,
    cancelledRevenue: 0,
    avgOrderValue: 0,
    totalPassengers: 0,
    conversionRate: 0,
  });
  const [blockedDates, setBlockedDates] = useState([]);
  const [newBlockedDate, setNewBlockedDate] = useState('');
  const [loading, setLoading] = useState(true);

  // Active view: 'dashboard' | 'bookings' | 'custom-tours' | 'customers' | 'blocked-dates'
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionLoading, setActionLoading] = useState(null);
  const [customActionLoading, setCustomActionLoading] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  const showFeedback = (text, type = 'success') => {
    setFeedbackMsg({ text, type });
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  useEffect(() => {
    let ignore = false;

    async function fetchData(silent = false) {
      if (!silent) setLoading(true);
      const [bookingsRes, summaryRes, blockedRes, customToursRes] = await Promise.all([
        bookingService.getAllBookings(),
        bookingService.getBookingSummary(),
        bookingService.getBlockedDates(),
        bookingService.getCustomTourRequests(),
      ]);

      if (!ignore) {
        if (bookingsRes.success) setBookings(bookingsRes.data);
        if (summaryRes.success) setSummary(summaryRes.summary);
        if (blockedRes.success) setBlockedDates(blockedRes.data);
        if (customToursRes.success) setCustomTourRequests(customToursRes.data);
        if (!silent) setLoading(false);
      }
    }

    // Initial load
    fetchData(false);

    // Auto-refresh every 10 seconds smoothly in the background
    const interval = setInterval(() => {
      fetchData(true);
    }, 10000);

    return () => {
      ignore = true;
      clearInterval(interval);
    };
  }, []);

  const handleBlockDate = async (e) => {
    e.preventDefault();
    if (!newBlockedDate) return;

    if (blockedDates.includes(newBlockedDate)) {
      showFeedback(`A data ${newBlockedDate} já se encontra bloqueada.`, 'error');
      return;
    }

    const res = await bookingService.blockDate(newBlockedDate);
    if (res.success) {
      setBlockedDates((prev) => [...prev, newBlockedDate].sort());
      setNewBlockedDate('');
      showFeedback(`Data ${newBlockedDate} bloqueada com sucesso.`);
    } else {
      showFeedback('Erro ao bloquear data no servidor.', 'error');
    }
  };

  const handleUnblockDate = async (dateStr) => {
    const res = await bookingService.unblockDate(dateStr);
    if (res.success) {
      setBlockedDates((prev) => prev.filter((d) => d !== dateStr));
      showFeedback(`Data ${dateStr} desbloqueada com sucesso.`);
    } else {
      showFeedback('Erro ao desbloquear data.', 'error');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setActionLoading(id);
    const res = await bookingService.updateBookingStatus(id, newStatus);
    if (res.success) {
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
      const sumRes = await bookingService.getBookingSummary();
      if (sumRes.success) setSummary(sumRes.summary);
      showFeedback(`Estado alterado para ${newStatus.toUpperCase()}`);
    } else {
      showFeedback('Erro ao atualizar estado.', 'error');
    }
    setActionLoading(null);
  };

  const handleCustomTourStatus = async (id, newStatus) => {
    setCustomActionLoading(id);
    const res = await bookingService.updateCustomTourStatus(id, newStatus);
    if (res.success) {
      setCustomTourRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
      showFeedback(`Pedido atualizado para ${newStatus.toUpperCase()}`);
    } else {
      showFeedback('Erro ao atualizar pedido.', 'error');
    }
    setCustomActionLoading(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  // Filtered Bookings list
  const filteredBookings = useMemo(() => {
    return bookings.filter((b) => {
      const matchFilter = statusFilter === 'all' || b.status === statusFilter;
      if (!matchFilter) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const customerName = (b.customer?.name || b.customer_name || '').toLowerCase();
      const customerEmail = (b.customer?.email || b.customer_email || '').toLowerCase();
      const customerPhone = (b.customer?.phone || b.customer_phone || '').toLowerCase();
      const ref = (b.booking_ref || '').toLowerCase();
      const service = (b.service_name || b.service_type || '').toLowerCase();
      const pickup = (b.pickup_location || '').toLowerCase();

      return (
        customerName.includes(q) ||
        customerEmail.includes(q) ||
        customerPhone.includes(q) ||
        ref.includes(q) ||
        service.includes(q) ||
        pickup.includes(q)
      );
    });
  }, [bookings, statusFilter, searchQuery]);

  // Unique clients aggregated
  const uniqueCustomers = useMemo(() => {
    const map = new Map();
    bookings.forEach((b) => {
      const email = b.customer?.email || b.customer_email;
      if (!email) return;
      if (!map.has(email)) {
        map.set(email, {
          name: b.customer?.name || b.customer_name || 'Cliente',
          email,
          phone: b.customer?.phone || b.customer_phone || '—',
          bookingsCount: 1,
          totalSpent: Number(b.total_amount) || 0,
          latestDate: b.booking_date || b.created_at,
          status: 'verified',
        });
      } else {
        const existing = map.get(email);
        existing.bookingsCount += 1;
        existing.totalSpent += Number(b.total_amount) || 0;
      }
    });
    return Array.from(map.values());
  }, [bookings]);

  const pendingCustomTours = customTourRequests.filter((r) => r.status === 'pending').length;

  return (
    <div className="vip-admin-layout">
      {/* Toast Feedback */}
      {feedbackMsg && (
        <div className={`vip-toast ${feedbackMsg.type}`}>
          {feedbackMsg.type === 'error' ? <Icons.Alert /> : <Icons.Check />}
          <span>{feedbackMsg.text}</span>
        </div>
      )}

      {/* ── LEFT SIDEBAR ── */}
      <aside className="vip-sidebar">
        <div className="vip-brand">
          <div className="vip-brand-name">
            <span className="vip-brand-title">MadeiraRide Tours</span>
          </div>
        </div>

        <nav className="vip-nav">
          <button
            type="button"
            className={`vip-nav-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveMenu('dashboard')}
          >
            <Icons.Dashboard />
            <span className="vip-nav-label">Dashboard</span>
          </button>

          <button
            type="button"
            className={`vip-nav-item ${activeMenu === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveMenu('bookings')}
          >
            <Icons.Calendar />
            <span className="vip-nav-label">Bookings</span>
            <span className="vip-nav-count">{bookings.length}</span>
          </button>

          <button
            type="button"
            className={`vip-nav-item ${activeMenu === 'custom-tours' ? 'active' : ''}`}
            onClick={() => setActiveMenu('custom-tours')}
          >
            <Icons.Map />
            <span className="vip-nav-label">Custom Tours</span>
            {pendingCustomTours > 0 && (
              <span className="vip-nav-badge">{pendingCustomTours}</span>
            )}
          </button>

          <button
            type="button"
            className={`vip-nav-item ${activeMenu === 'customers' ? 'active' : ''}`}
            onClick={() => setActiveMenu('customers')}
          >
            <Icons.Users />
            <span className="vip-nav-label">Clients</span>
            <span className="vip-nav-count">{uniqueCustomers.length}</span>
          </button>

          <button
            type="button"
            className={`vip-nav-item ${activeMenu === 'blocked-dates' ? 'active' : ''}`}
            onClick={() => setActiveMenu('blocked-dates')}
          >
            <Icons.Lock />
            <span className="vip-nav-label">Blocked Dates</span>
            {blockedDates.length > 0 && (
              <span className="vip-nav-count alert">{blockedDates.length}</span>
            )}
          </button>
        </nav>

        <div className="vip-sidebar-footer">
          <button type="button" onClick={handleLogout} className="vip-logout-link">
            <Icons.Logout />
            <span>Terminar Sessão</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <div className="vip-main-wrapper">
        <header className="vip-topbar">
          <div className="vip-topbar-left">
            <h1 className="vip-page-title">
              {activeMenu === 'dashboard' && 'Dashboard Overview'}
              {activeMenu === 'bookings' && 'Bookings Management'}
              {activeMenu === 'custom-tours' && 'Custom Tour Requests'}
              {activeMenu === 'customers' && 'Client Directory'}
              {activeMenu === 'blocked-dates' && 'Blocked Calendar Dates'}
            </h1>
          </div>

          <div className="vip-topbar-right"></div>
        </header>

        {/* ═════════════════════════════════════════════════════
            1. DASHBOARD OVERVIEW: ADVANCED REVENUE & KPI ANALYTICS
           ═════════════════════════════════════════════════════ */}
        {activeMenu === 'dashboard' && (
          <div className="vip-dashboard-view">
            {/* Primary Revenue Cards */}
            <div className="vip-kpi-grid">
              <div className="vip-kpi-card highlight-green">
                <div className="vip-kpi-head">
                  <span className="vip-kpi-label">Faturação Realizada</span>
                  <span className="vip-kpi-tag positive">+ Confirmed</span>
                </div>
                <div className="vip-kpi-value">{summary.revenue.toLocaleString('pt-PT')} €</div>
                <div className="vip-kpi-sub">
                  Total de <strong>{summary.confirmed}</strong> viagens confirmadas
                </div>
              </div>

              <div className="vip-kpi-card highlight-orange">
                <div className="vip-kpi-head">
                  <span className="vip-kpi-label">Faturação Pendente</span>
                  <span className="vip-kpi-tag warning">A Aguardar Confirmação</span>
                </div>
                <div className="vip-kpi-value">{summary.pendingRevenue.toLocaleString('pt-PT')} €</div>
                <div className="vip-kpi-sub">
                  <strong>{summary.pending}</strong> reservas + <strong>{pendingCustomTours}</strong> orçamentos
                </div>
              </div>

              <div className="vip-kpi-card highlight-red">
                <div className="vip-kpi-head">
                  <span className="vip-kpi-label">Faturação Cancelada</span>
                  <span className="vip-kpi-tag negative">Valor Perdido</span>
                </div>
                <div className="vip-kpi-value">{summary.cancelledRevenue.toLocaleString('pt-PT')} €</div>
                <div className="vip-kpi-sub">
                  <strong>{summary.cancelled}</strong> viagens canceladas no total
                </div>
              </div>

              <div className="vip-kpi-card highlight-blue">
                <div className="vip-kpi-head">
                  <span className="vip-kpi-label">Ticket Médio (AOV)</span>
                  <span className="vip-kpi-tag neutral">Por Reserva</span>
                </div>
                <div className="vip-kpi-value">{summary.avgOrderValue} €</div>
                <div className="vip-kpi-sub">
                  Média faturada por cliente confirmado
                </div>
              </div>
            </div>

            {/* Secondary KPIs Row: Operational Performance */}
            <div className="vip-secondary-kpi-row">
              <div className="vip-sec-kpi">
                <span className="vip-sec-label">Taxa de Conversão</span>
                <div className="vip-sec-val-row">
                  <strong className="vip-sec-val">{summary.conversionRate}%</strong>
                  <span className="vip-sec-detail">de confirmação sobre total de pedidos</span>
                </div>
                <div className="vip-progress-track">
                  <div className="vip-progress-fill" style={{ width: `${Math.min(summary.conversionRate, 100)}%` }} />
                </div>
              </div>

              <div className="vip-sec-kpi">
                <span className="vip-sec-label">Passageiros Transportados</span>
                <div className="vip-sec-val-row">
                  <strong className="vip-sec-val">{summary.totalPassengers}</strong>
                  <span className="vip-sec-detail">passageiros em viagens confirmadas</span>
                </div>
              </div>

              <div className="vip-sec-kpi">
                <span className="vip-sec-label">Oportunidades em Aberto</span>
                <div className="vip-sec-val-row">
                  <strong className="vip-sec-val">{pendingCustomTours}</strong>
                  <span className="vip-sec-detail">pedidos de tour à espera de contacto</span>
                </div>
              </div>
            </div>

            {/* Recent Bookings Quick Table */}
            <div className="vip-dashboard-recent-card">
              <div className="vip-table-header-bar">
                <div>
                  <h3 className="vip-inner-heading">Últimas Reservas Registadas</h3>
                  <p className="vip-sub">Acesso direto às reservas mais recentes que requerem atenção</p>
                </div>
                <button type="button" onClick={() => setActiveMenu('bookings')} className="vip-link-btn">
                  Ver Todas ({bookings.length}) →
                </button>
              </div>

              <div className="vip-table-container">
                <table className="vip-table">
                  <thead>
                    <tr>
                      <th>Ref / Data</th>
                      <th>Cliente</th>
                      <th>Serviço</th>
                      <th>Pax</th>
                      <th>Valor</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id}>
                        <td>
                          <span className="vip-ref-code">{b.booking_ref || `#${b.id.slice(0, 6)}`}</span>
                          <div className="vip-date-strong">{b.booking_date}</div>
                        </td>
                        <td>
                          <div className="vip-client-name">{b.customer?.name || b.customer_name || 'N/D'}</div>
                          <div className="vip-sub">{b.customer?.phone || b.customer_phone || ''}</div>
                        </td>
                        <td>
                          <span className="vip-service-pill">{b.service_name || b.service_type}</span>
                        </td>
                        <td>{b.passengers || 1}</td>
                        <td>
                          <strong className="vip-price-tag">{b.total_amount ? `${b.total_amount} €` : 'Quote'}</strong>
                        </td>
                        <td>
                          <span className={`vip-status-tag ${b.status}`}>{b.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════
            2. BOOKINGS VIEW
           ═════════════════════════════════════════════════════ */}
        {activeMenu === 'bookings' && (
          <main className="vip-content-card">
            <div className="vip-table-header-bar">
              <div className="vip-search-box">
                <Icons.Search />
                <input
                  type="text"
                  placeholder="Pesquisar por cliente, email, ref, voo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="vip-search-input"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} className="vip-clear-btn">
                    ✕
                  </button>
                )}
              </div>

              <div className="vip-filter-pills">
                <button
                  type="button"
                  onClick={() => setStatusFilter('all')}
                  className={`vip-pill ${statusFilter === 'all' ? 'active' : ''}`}
                >
                  Todas ({bookings.length})
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('confirmed')}
                  className={`vip-pill ${statusFilter === 'confirmed' ? 'active' : ''}`}
                >
                  Confirmadas
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('pending')}
                  className={`vip-pill ${statusFilter === 'pending' ? 'active' : ''}`}
                >
                  Pendentes
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('completed')}
                  className={`vip-pill ${statusFilter === 'completed' ? 'active' : ''}`}
                >
                  Concluídas
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('cancelled')}
                  className={`vip-pill ${statusFilter === 'cancelled' ? 'active' : ''}`}
                >
                  Canceladas
                </button>
              </div>
            </div>

            <div className="vip-table-container">
              {loading ? (
                <div className="vip-state-box">A carregar registos da base de dados...</div>
              ) : filteredBookings.length === 0 ? (
                <div className="vip-state-box">Nenhuma reserva encontrada para este filtro.</div>
              ) : (
                <table className="vip-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}>Nr</th>
                      <th>Data & Hora</th>
                      <th>Cliente</th>
                      <th>Serviço / Itinerário</th>
                      <th>Pax</th>
                      <th>Valor</th>
                      <th>Estado</th>
                      <th style={{ textAlign: 'right' }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((b, idx) => {
                      const customerName = b.customer?.name || b.customer_name || 'N/D';
                      const customerPhone = b.customer?.phone || b.customer_phone || '';
                      const customerEmail = b.customer?.email || b.customer_email || '';

                      return (
                        <tr key={b.id}>
                          <td className="vip-td-nr">{idx + 1}</td>
                          <td>
                            <strong className="vip-date-strong">{b.booking_date || 'A combinar'}</strong>
                            <div className="vip-sub">{b.booking_time || 'Hora flexível'}</div>
                            <span className="vip-ref-code">{b.booking_ref || `#${b.id.slice(0, 6)}`}</span>
                          </td>
                          <td>
                            <div className="vip-client-name">{customerName}</div>
                            {customerPhone && (
                              <a
                                href={`https://wa.me/${customerPhone.replace(/\D/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="vip-wa-link"
                              >
                                <Icons.Phone /> {customerPhone}
                              </a>
                            )}
                            <div className="vip-sub">{customerEmail}</div>
                          </td>
                          <td>
                            <span className="vip-service-pill">{b.service_name || b.service_type}</span>
                            {b.pickup_location && (
                              <div className="vip-sub">Recolha: {b.pickup_location}</div>
                            )}
                            {b.flight_number && (
                              <div className="vip-sub">Voo: {b.flight_number}</div>
                            )}
                            {(b.trip_type === 'round-trip' || b.return_date) && (
                              <div className="vip-sub-round">
                                Ida e Volta {b.return_date ? `| Regresso: ${b.return_date}` : ''}
                              </div>
                            )}
                          </td>
                          <td>
                            <span className="vip-pax-tag">{b.passengers || 1} pax</span>
                          </td>
                          <td>
                            <strong className="vip-price-tag">
                              {b.total_amount ? `${b.total_amount} €` : 'Orçamento'}
                            </strong>
                          </td>
                          <td>
                            <span className={`vip-status-tag ${b.status}`}>{b.status}</span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div className="vip-actions-group">
                              {b.status !== 'confirmed' && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(b.id, 'confirmed')}
                                  disabled={actionLoading === b.id}
                                  className="vip-btn-confirm"
                                >
                                  Confirmar
                                </button>
                              )}
                              {b.status !== 'completed' && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(b.id, 'completed')}
                                  disabled={actionLoading === b.id}
                                  className="vip-btn-complete"
                                >
                                  Concluir
                                </button>
                              )}
                              {b.status !== 'cancelled' && (
                                <button
                                  type="button"
                                  onClick={() => handleStatusChange(b.id, 'cancelled')}
                                  disabled={actionLoading === b.id}
                                  className="vip-btn-cancel"
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
          </main>
        )}

        {/* ═════════════════════════════════════════════════════
            3. CUSTOM TOURS VIEW
           ═════════════════════════════════════════════════════ */}
        {activeMenu === 'custom-tours' && (
          <main className="vip-content-card">
            <div className="vip-table-header-bar">
              <div>
                <h3 className="vip-inner-heading">Pedidos de Tour Personalizado</h3>
                <p className="vip-sub">Rotas selecionadas pelos clientes no mapa interativo.</p>
              </div>
            </div>

            <div className="vip-table-container">
              {loading ? (
                <div className="vip-state-box">A carregar pedidos de tour...</div>
              ) : customTourRequests.length === 0 ? (
                <div className="vip-state-box">Nenhum pedido de tour personalizado registado ainda.</div>
              ) : (
                <table className="vip-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}>Nr</th>
                      <th>Data Pretendida</th>
                      <th>Cliente</th>
                      <th>Recolha</th>
                      <th>Paragens Escolhidas</th>
                      <th>Pax</th>
                      <th>Estado</th>
                      <th style={{ textAlign: 'right' }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customTourRequests.map((r, idx) => (
                      <tr key={r.id}>
                        <td className="vip-td-nr">{idx + 1}</td>
                        <td>
                          <strong className="vip-date-strong">{r.preferred_date || 'A combinar'}</strong>
                          <div className="vip-sub">
                            {r.created_at ? new Date(r.created_at).toLocaleDateString('pt-PT') : ''}
                          </div>
                        </td>
                        <td>
                          <div className="vip-client-name">{r.customer_name}</div>
                          {r.customer_phone && (
                            <a
                              href={`https://wa.me/${r.customer_phone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="vip-wa-link"
                            >
                              <Icons.Phone /> {r.customer_phone}
                            </a>
                          )}
                          <div className="vip-sub">{r.customer_email}</div>
                        </td>
                        <td>
                          <strong style={{ color: '#0f172a', fontSize: '13px' }}>{r.pickup_location || 'A combinar'}</strong>
                        </td>
                        <td>
                          <div className="vip-stops-list">
                            {(r.selected_points || []).map((stop, sIdx) => (
                              <span key={sIdx} className="vip-stop-badge">
                                {sIdx + 1}. {stop}
                              </span>
                            ))}
                          </div>
                          {r.notes && (
                            <div className="vip-sub" style={{ marginTop: 6, fontStyle: 'italic' }}>
                              "{r.notes}"
                            </div>
                          )}
                        </td>
                        <td>
                          <span className="vip-pax-tag">{r.passengers ? `${r.passengers} pax` : '—'}</span>
                        </td>
                        <td>
                          <span className={`vip-status-tag ${r.status || 'pending'}`}>
                            {r.status || 'pending'}
                          </span>
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div className="vip-actions-group">
                            {r.status !== 'quoted' && (
                              <button
                                type="button"
                                onClick={() => handleCustomTourStatus(r.id, 'quoted')}
                                disabled={customActionLoading === r.id}
                                className="vip-btn-confirm"
                              >
                                Orçamentado
                              </button>
                            )}
                            {r.status !== 'confirmed' && (
                              <button
                                type="button"
                                onClick={() => handleCustomTourStatus(r.id, 'confirmed')}
                                disabled={customActionLoading === r.id}
                                className="vip-btn-complete"
                              >
                                Confirmar
                              </button>
                            )}
                            {r.status !== 'cancelled' && (
                              <button
                                type="button"
                                onClick={() => handleCustomTourStatus(r.id, 'cancelled')}
                                disabled={customActionLoading === r.id}
                                className="vip-btn-cancel"
                              >
                                Cancelar
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </main>
        )}

        {/* ═════════════════════════════════════════════════════
            4. CLIENTS VIEW
           ═════════════════════════════════════════════════════ */}
        {activeMenu === 'customers' && (
          <main className="vip-content-card">
            <div className="vip-table-header-bar">
              <div>
                <h3 className="vip-inner-heading">Diretório de Clientes</h3>
                <p className="vip-sub">Clientes com reservas ou contactos registados no sistema.</p>
              </div>
            </div>

            <div className="vip-table-container">
              {uniqueCustomers.length === 0 ? (
                <div className="vip-state-box">Nenhum cliente registado ainda.</div>
              ) : (
                <table className="vip-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}>Nr</th>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Telefone</th>
                      <th>Total de Reservas</th>
                      <th>Total Faturado</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uniqueCustomers.map((c, idx) => (
                      <tr key={c.email}>
                        <td className="vip-td-nr">{idx + 1}</td>
                        <td>
                          <strong className="vip-client-name">{c.name}</strong>
                        </td>
                        <td>
                          <span className="vip-sub">{c.email}</span>
                        </td>
                        <td>
                          {c.phone !== '—' ? (
                            <a
                              href={`https://wa.me/${c.phone.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noreferrer"
                              className="vip-wa-link"
                            >
                              <Icons.Phone /> {c.phone}
                            </a>
                          ) : (
                            '—'
                          )}
                        </td>
                        <td>
                          <span className="vip-pax-tag">{c.bookingsCount} reserva{c.bookingsCount > 1 ? 's' : ''}</span>
                        </td>
                        <td>
                          <strong className="vip-price-tag">{c.totalSpent} €</strong>
                        </td>
                        <td>
                          <span className="vip-status-tag confirmed">Ativo</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </main>
        )}

        {/* ═════════════════════════════════════════════════════
            5. BLOCKED DATES VIEW
           ═════════════════════════════════════════════════════ */}
        {activeMenu === 'blocked-dates' && (
          <main className="vip-content-card">
            <div className="vip-block-banner">
              <div>
                <h3 className="vip-inner-heading">Bloqueio de Datas & Lotação</h3>
                <p className="vip-sub">
                  As datas adicionadas ficam bloqueadas a vermelho e indisponíveis para os clientes nos calendários.
                </p>
              </div>
              <form onSubmit={handleBlockDate} className="vip-block-form">
                <input
                  type="date"
                  required
                  min={todayDateStr}
                  value={newBlockedDate}
                  onChange={(e) => setNewBlockedDate(e.target.value)}
                  className="vip-date-picker-input"
                />
                <button type="submit" className="vip-btn-primary">
                  + Bloquear Data
                </button>
              </form>
            </div>

            <div className="vip-blocked-list-section">
              <h4 className="vip-sub-heading">Datas Bloqueadas Atualmente ({blockedDates.length})</h4>
              {blockedDates.length === 0 ? (
                <div className="vip-state-box green">
                  Nenhuma data bloqueada atualmente. Todos os dias estão abertos para reservas.
                </div>
              ) : (
                <div className="vip-blocked-cards-grid">
                  {blockedDates.map((dStr) => {
                    const d = new Date(dStr + 'T00:00:00');
                    const formatted = isNaN(d.getTime())
                      ? dStr
                      : d.toLocaleDateString('pt-PT', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });

                    return (
                      <div key={dStr} className="vip-blocked-card">
                        <div>
                          <span className="vip-blocked-badge">Bloqueada</span>
                          <strong className="vip-blocked-date-text">{dStr}</strong>
                          <div className="vip-sub">{formatted}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleUnblockDate(dStr)}
                          className="vip-unblock-btn"
                        >
                          ✕ Desbloquear
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
