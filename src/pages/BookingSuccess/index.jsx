import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { APP_CONFIG, makeWhatsAppUrl } from '../../constants';
import { MADEIRA_ADVENTURES } from '../../constants/transfersCatalog';
import { TOURS_DATA } from '../../constants/toursCatalog';
import { downloadCalendarEvent } from '../../utils/calendar';
import usePageTitle from '../../hooks/usePageTitle';
import './BookingSuccess.css';

export default function BookingSuccess() {
  const [searchParams] = useSearchParams();
  const refParam = searchParams.get('ref') || '';

  usePageTitle(
    'Reserva Confirmada — Voucher Digital',
    'Obrigado pela sua reserva com a Madeira Ride Tours. Consulte o seu voucher digital e detalhes da viagem.'
  );

  const [booking, setBooking] = useState(null);

  useEffect(() => {
    async function fetchBooking() {
      if (!refParam) return;

      // 1. Try to load from cached session storage first (instant & reliable)
      try {
        const cachedRaw = sessionStorage.getItem(`voucher_${refParam}`);
        if (cachedRaw) {
          const cached = JSON.parse(cachedRaw);
          if (cached) {
            setBooking(cached);
          }
        }
      } catch (err) {
        console.warn('Could not read cached voucher:', err);
      }

      // 2. Query Supabase to get the most updated DB record if available
      try {
        if (supabase) {
          const { data, error } = await supabase
            .from('bookings')
            .select('*')
            .eq('booking_ref', refParam)
            .single();

          if (!error && data) {
            setBooking((prev) => ({ ...prev, ...data }));
          }
        }
      } catch (err) {
        console.error('Error fetching booking voucher:', err);
      }
    }

    fetchBooking();
  }, [refParam]);

  const bookingRef = booking?.booking_ref || refParam || 'MRT-CONFIRMED';
  const customerName = booking?.customer_name || 'Estimado(a) Cliente';
  const customerEmail = booking?.customer_email || 'o seu email';
  const customerPhone = booking?.customer_phone || '';
  const serviceName = booking?.service_name || 'Transfer Privado na Madeira';
  const bookingDate = booking?.booking_date || 'Data confirmada';
  const bookingTime = booking?.booking_time || '10:00';
  const pickup = booking?.pickup_location || 'Aeroporto da Madeira (FNC) / Hotel';
  const totalAmount = booking?.total_amount ? `€${booking.total_amount}` : 'Confirmado';
  const passengers = booking?.passengers || 1;
  const flightNumber = booking?.flight_number;
  const tripType = booking?.trip_type;
  const returnDate = booking?.return_date;
  const returnTime = booking?.return_time;
  const isRoundTrip = tripType === 'round-trip' || !!returnDate;
  const paymentMethod = booking?.payment_method || 'stripe_card';
  const serviceId = booking?.service_id || '';

  // Determine if this booking is actually an airport transfer
  const isAirportBooking = serviceId === 'airport-transfer' || 
    (serviceName && serviceName.toLowerCase().includes('airport')) ||
    (pickup && pickup.toLowerCase().includes('aeroporto')) ||
    Boolean(flightNumber);

  // Match adventure or tour to get the full itinerary
  const matchedAdventure = MADEIRA_ADVENTURES.find((a) => a.id === serviceId || a.title === serviceName || a.titlePt === serviceName);
  const matchedTour = TOURS_DATA.find((t) => t.id === serviceId || t.title === serviceName);
  const itineraryStops = matchedAdventure?.itinerary || matchedTour?.itinerary || null;

  const voucherWhatsAppMsg = makeWhatsAppUrl(
    `Olá! Acabei de efetuar a reserva ${bookingRef} para ${serviceName} no dia ${bookingDate} às ${bookingTime}${isRoundTrip && returnDate ? ` com regresso a ${returnDate}` : ''}.`
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="booking-success-page">
      <div className="success-container">
        
        {/* Top Success Banner */}
        <section className="success-banner">
          <div className="success-icon-badge" aria-hidden="true">✓</div>
          <h1 className="success-title">Reserva Efetuada com Sucesso!</h1>
          <p className="success-subtitle">
            Obrigado, <strong>{customerName}</strong>. A sua viagem na Madeira está registada e a nossa equipa já foi notificada.
          </p>
          <div className="email-sent-alert">
            <span>✉️</span> Foi enviado um comprovativo detalhado para <strong>{customerEmail}</strong>
          </div>
        </section>

        {/* Digital Voucher Ticket */}
        <section className="voucher-ticket">
          {/* Header */}
          <div className="voucher-header">
            <div>
              <h2 className="voucher-brand-title">{APP_CONFIG.NAME}</h2>
              <p className="voucher-brand-sub">Voucher Digital Oficial</p>
            </div>
            <div className="voucher-ref-box">
              <span className="voucher-ref-label">Referência</span>
              <span className="voucher-ref-code">{bookingRef}</span>
            </div>
          </div>

          {/* Body */}
          <div className="voucher-body">
            <div>
              <h3 className="voucher-service-title">{serviceName}</h3>
              <div className="voucher-pills-row">
                <span className="voucher-status-pill confirmed">● Reserva Registada</span>
                {isRoundTrip && (
                  <span className="voucher-status-pill roundtrip">🔄 Ida e Volta</span>
                )}
              </div>
            </div>

            <div className="voucher-grid">
              <div className="voucher-item">
                <span className="voucher-item-label">Titular da Reserva</span>
                <span className="voucher-item-value">{customerName}</span>
              </div>
              <div className="voucher-item">
                <span className="voucher-item-label">Contacto / Email</span>
                <span className="voucher-item-value">{customerEmail}{customerPhone ? ` · ${customerPhone}` : ''}</span>
              </div>
              <div className="voucher-item">
                <span className="voucher-item-label">Data da Viagem (Ida)</span>
                <span className="voucher-item-value">{bookingDate}</span>
              </div>
              <div className="voucher-item">
                <span className="voucher-item-label">Hora Prevista</span>
                <span className="voucher-item-value">{bookingTime}</span>
              </div>
              {isRoundTrip && returnDate && (
                <>
                  <div className="voucher-item">
                    <span className="voucher-item-label">Data de Regresso (Volta)</span>
                    <span className="voucher-item-value voucher-item-value--return">🔄 {returnDate}</span>
                  </div>
                  <div className="voucher-item">
                    <span className="voucher-item-label">Hora do Regresso</span>
                    <span className="voucher-item-value">{returnTime || 'A combinar'}</span>
                  </div>
                </>
              )}
              <div className="voucher-item voucher-item--full">
                <span className="voucher-item-label">Ponto de Encontro / Morada de Recolha</span>
                <span className="voucher-item-value">{pickup}</span>
              </div>
              <div className="voucher-item">
                <span className="voucher-item-label">Passageiros</span>
                <span className="voucher-item-value">{passengers} {passengers === 1 ? 'passageiro' : 'passageiros'}</span>
              </div>
              {flightNumber ? (
                <div className="voucher-item">
                  <span className="voucher-item-label">Número de Voo</span>
                  <span className="voucher-item-value">✈️ {flightNumber}</span>
                </div>
              ) : null}
              <div className="voucher-item">
                <span className="voucher-item-label">Método de Pagamento</span>
                <span className="voucher-item-value">
                  {paymentMethod === 'stripe_card' ? 'Cartão de Crédito / Débito' : paymentMethod === 'whatsapp_manual' ? 'WhatsApp / Pagamento Direto' : paymentMethod}
                </span>
              </div>
              <div className="voucher-item">
                <span className="voucher-item-label">Valor Total</span>
                <span className="voucher-item-value voucher-item-value--price">{totalAmount}</span>
              </div>
            </div>

            {/* Full Itinerary Section when available (e.g. Adventures & Tours) */}
            {itineraryStops && itineraryStops.length > 0 && (
              <div className="voucher-itinerary-section">
                <h4 className="voucher-itinerary-title">
                  <span>📍</span> Itinerário Completo da Experiência ({itineraryStops.length} Paragens)
                </h4>
                <div className="voucher-itinerary-timeline">
                  {itineraryStops.map((item, idx) => {
                    const stepNum = item.step || (idx + 1);
                    const stepTitle = item.titlePt || item.title;
                    const stepDesc = item.descPt || item.desc;
                    return (
                      <div key={idx} className="voucher-itinerary-step">
                        <span className="voucher-itinerary-num">{stepNum}</span>
                        <div className="voucher-itinerary-content">
                          <strong className="voucher-itinerary-name">{stepTitle}</strong>
                          {stepDesc && <p className="voucher-itinerary-desc">{stepDesc}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Tear Line Decoration */}
          <div className="voucher-tear-line">
            <div className="voucher-tear-notch left" />
            <div className="voucher-tear-dots" />
            <div className="voucher-tear-notch right" />
          </div>

          {/* Instructions */}
          <div className="voucher-instructions">
            <h4 className="voucher-inst-title">Instruções Importantes para a Viagem</h4>
            <ul className="voucher-inst-list">
              {isAirportBooking && (
                <li><strong>No Aeroporto (FNC):</strong> O motorista estará na área de chegadas com uma placa com o seu nome. Monitorizamos o seu voo em tempo real.</li>
              )}
              <li><strong>No Hotel / Morada de Recolha:</strong> Por favor esteja na receção ou entrada principal 5 minutos antes da hora marcada.</li>
              <li>Pode guardar este voucher no telemóvel ou imprimi-lo para apresentar ao motorista.</li>
            </ul>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="voucher-actions">
          <button
            type="button"
            onClick={() => downloadCalendarEvent({
              booking_ref: bookingRef,
              service_name: serviceName,
              booking_date: bookingDate,
              booking_time: bookingTime,
              pickup_location: pickup,
            })}
            className="voucher-btn voucher-btn--calendar"
          >
            📅 Adicionar ao Apple / Google Calendário
          </button>
          <button type="button" onClick={handlePrint} className="voucher-btn voucher-btn--print">
            🖨️ Descarregar / Imprimir Voucher (PDF)
          </button>
          <a
            href={voucherWhatsAppMsg}
            target="_blank"
            rel="noopener noreferrer"
            className="voucher-btn voucher-btn--whatsapp"
          >
            💬 Confirmar no WhatsApp
          </a>
          <Link to="/" className="voucher-btn voucher-btn--home">
            Voltar à Página Principal
          </Link>
        </div>

      </div>
    </div>
  );
}
