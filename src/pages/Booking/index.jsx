import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { useLanguage } from '../../hooks/useLanguage';
import { TOURS_CATALOG } from '../../constants/tours';
import { MOUNTAIN_TRANSFERS_CATALOG } from '../../constants/transfers';
import { PAYMENT_METHOD, SERVICE_TYPE } from '../../constants/booking';
import { paymentService } from '../../services/paymentService';
import { ROUTES } from '../../constants/index';
import { sanitizeText, isValidEmail, isValidPhone } from '../../utils/security';
import './Booking.css';

const TIME_SLOTS = ['06:00','07:00','08:00','09:00','10:00','11:00','14:00','15:00','16:00'];

export default function Booking() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const {
    booking,
    setStep,
    selectService,
    setTripDetails,
    setCustomer,
    setPaymentMethod,
    markPendingPayment,
  } = useBooking();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isCustomTour = booking.service_type === SERVICE_TYPE.CUSTOM;

  const allServices = [
    ...TOURS_CATALOG.map((s) => ({ ...s, service_type: SERVICE_TYPE.TOUR, titleText: t(s.titleKey) })),
    ...MOUNTAIN_TRANSFERS_CATALOG.map((s) => ({ ...s, service_type: SERVICE_TYPE.TRANSFER, titleText: t(s.titleKey, s.titleDefault) })),
    {
      id: 'custom',
      service_type: SERVICE_TYPE.CUSTOM,
      titleText: t('booking.customTour', 'Custom Tour (Pedido de Orçamento)'),
      price4: 0,
      price6: 0,
      duration: 'Flexível',
    },
  ];

  function handleServiceSelect(svc) {
    selectService({
      service_type: svc.service_type,
      service_id: svc.id,
      service_title: svc.titleText,
      price4: svc.price4,
      price6: svc.price6,
    });
    // Se for custom, o método de pagamento passa automaticamente para manual/orçamento
    if (svc.service_type === SERVICE_TYPE.CUSTOM) {
      setPaymentMethod(PAYMENT_METHOD.WHATSAPP_MANUAL);
    }
  }

  const [trip, setTrip] = useState({
    date: booking.date,
    time_slot: booking.time_slot,
    passengers: booking.passengers,
    pickup_location: booking.pickup_location,
    special_notes: booking.special_notes,
  });

  function validateTrip() {
    const e = {};
    if (!trip.date) e.date = t('booking.required', 'Required');
    if (!trip.passengers || trip.passengers < 1) e.passengers = t('booking.required', 'Required');
    if (!isCustomTour && !trip.time_slot) e.time_slot = t('booking.required', 'Required');
    if (!trip.pickup_location.trim()) e.pickup_location = t('booking.required', 'Required');
    if (isCustomTour && !trip.special_notes?.trim()) {
      e.special_notes = t('booking.describeCustomRoute', 'Por favor descreve os locais que gostarias de visitar.');
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleTripNext() {
    if (validateTrip()) setTripDetails(trip);
  }

  const [cust, setCust] = useState({ ...booking.customer });

  function validateCust() {
    const e = {};
    const cleanName = sanitizeText(cust.name);
    if (!cleanName) {
      e.name = t('booking.required', 'Required');
    }
    if (!isValidEmail(cust.email)) {
      e.email = t('booking.invalidEmail', 'Invalid email');
    }
    if (!isValidPhone(cust.phone)) {
      e.phone = t('booking.required', 'Required (mínimo 7 dígitos)');
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleCustNext() {
    if (validateCust()) {
      setCustomer({
        name: sanitizeText(cust.name),
        email: cust.email.trim().toLowerCase(),
        phone: cust.phone.trim(),
        country: sanitizeText(cust.country),
      });
    }
  }

  async function handleSubmit() {
    setLoading(true);
    setErrors({});
    try {
      markPendingPayment();

      // Custom Tour: apenas pedido de orçamento (sem Stripe)
      if (isCustomTour) {
        const waLink = paymentService.generateWhatsAppBookingLink({
          ...booking,
          customer: cust,
          service_title: `Custom Tour — Pedido de Orçamento`,
          total_amount_eur: 'Sob Consulta (Orçamento)',
        });
        window.open(waLink, '_blank');
        navigate(ROUTES.BOOKING_SUCCESS + '?ref=' + booking.ref + '&custom=true');
        return;
      }

      // WhatsApp Manual Flow
      if (booking.payment_method === PAYMENT_METHOD.WHATSAPP_MANUAL) {
        const waLink = paymentService.generateWhatsAppBookingLink({
          ...booking,
          customer: cust,
        });
        window.open(waLink, '_blank');
        navigate(ROUTES.BOOKING_SUCCESS + '?ref=' + booking.ref);
        return;
      }

      // Stripe Payment Flow
      await paymentService.startCheckout({
        booking: {
          ref: booking.ref,
          service_type: booking.service_type,
          service_id: booking.service_id,
          service_title: booking.service_title,
          date: trip.date || booking.date,
          time_slot: trip.time_slot || booking.time_slot,
          passengers: trip.passengers || booking.passengers,
          pickup_location: trip.pickup_location || booking.pickup_location,
          special_notes: trip.special_notes || booking.special_notes,
          total_amount_eur: booking.total_amount_eur,
        },
        customer: cust,
      });
    } catch (err) {
      setErrors({ submit: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>{isCustomTour ? 'Pedir Orçamento de Custom Tour' : t('booking.title', 'Book Your Experience')}</h1>
        <p>{isCustomTour ? 'Diz-nos o que queres visitar e preparamos um itinerário exclusivo.' : t('booking.subtitle', 'Private tours and transfers across Madeira Island')}</p>
      </div>

      <div className="booking-steps">
        {[1, 2, 3, 4].map((n) => (
          <div
            key={n}
            className={`step-dot ${booking.step >= n ? 'active' : ''} ${booking.step > n ? 'done' : ''}`}
            onClick={() => booking.step > n && setStep(n)}
            role="button"
            tabIndex={booking.step > n ? 0 : -1}
          >
            {booking.step > n ? '✓' : n}
          </div>
        ))}
        <div className="step-line" style={{ '--progress': `${((booking.step - 1) / 3) * 100}%` }} />
      </div>

      <div className="booking-card">
        {booking.step === 1 && (
          <div className="step-panel">
            <h2>{t('booking.step1', 'Choose your experience')}</h2>
            <div className="service-grid">
              {allServices.map((svc) => (
                <button
                  key={svc.id}
                  className={`service-card ${booking.service_id === svc.id ? 'selected' : ''}`}
                  onClick={() => handleServiceSelect(svc)}
                  type="button"
                >
                  <div className="service-card-top">
                    <span className="service-type-badge">{svc.service_type}</span>
                    {svc.duration && <span className="service-duration">{svc.duration}</span>}
                  </div>
                  <h3>{svc.titleText}</h3>
                  {svc.price4 > 0 && (
                    <p className="service-price">
                      {t('booking.from', 'From')} <strong>{svc.price4}€</strong>
                    </p>
                  )}
                  {svc.id === 'custom' && (
                    <p className="service-price"><strong>Sob Consulta</strong> (Orçamento)</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {booking.step === 2 && (
          <div className="step-panel">
            <h2>{isCustomTour ? 'Detalhes do Passeio Personalizado' : t('booking.step2', 'Trip details')}</h2>
            <div className="selected-service-banner">
              <strong>{booking.service_title}</strong>
              <button type="button" onClick={() => setStep(1)} className="change-btn">
                {t('booking.change', 'Change')}
              </button>
            </div>

            {isCustomTour && (
              <div className="custom-notice-box">
                ℹ️ <strong>Tour Sob Medida:</strong> Este serviço não tem pagamento direto. Indica a tua data prevista e os pontos da ilha que queres conhecer para elaborarmos um orçamento personalizado.
              </div>
            )}

            <div className="form-grid">
              <label>
                {t('booking.date', 'Data prevista')}
                <input
                  type="date"
                  value={trip.date}
                  onChange={(e) => setTrip((p) => ({ ...p, date: e.target.value }))}
                  className={errors.date ? 'error' : ''}
                />
                {errors.date && <span className="field-error">{errors.date}</span>}
              </label>

              {!isCustomTour ? (
                <label>
                  {t('booking.time', 'Pickup time')}
                  <select
                    value={trip.time_slot}
                    onChange={(e) => setTrip((p) => ({ ...p, time_slot: e.target.value }))}
                    className={errors.time_slot ? 'error' : ''}
                  >
                    <option value="">{t('booking.selectTime', '— select —')}</option>
                    {TIME_SLOTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.time_slot && <span className="field-error">{errors.time_slot}</span>}
                </label>
              ) : (
                <label>
                  Hora de início preferencial
                  <select
                    value={trip.time_slot}
                    onChange={(e) => setTrip((p) => ({ ...p, time_slot: e.target.value }))}
                  >
                    <option value="A combinar">A combinar com o motorista</option>
                    {TIME_SLOTS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </label>
              )}

              <label>
                {t('booking.passengers', 'Passengers')}
                <select
                  value={trip.passengers}
                  onChange={(e) => setTrip((p) => ({ ...p, passengers: Number(e.target.value) }))}
                >
                  {[1,2,3,4,5,6,7,8].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? t('booking.person', 'person') : t('booking.people', 'people')}</option>
                  ))}
                </select>
              </label>

              <label className="full-width">
                {t('booking.pickup', 'Pickup location (hotel / morada na Madeira)')}
                <input
                  type="text"
                  placeholder={t('booking.pickupPlaceholder', 'ex: Hotel Pestana Carlton, Funchal')}
                  value={trip.pickup_location}
                  onChange={(e) => setTrip((p) => ({ ...p, pickup_location: e.target.value }))}
                  className={errors.pickup_location ? 'error' : ''}
                />
                {errors.pickup_location && <span className="field-error">{errors.pickup_location}</span>}
              </label>

              <label className="full-width">
                {isCustomTour ? 'Descreve o teu itinerário ideal ou lugares a visitar *' : t('booking.notes', 'Special notes (optional)')}
                <textarea
                  rows={4}
                  placeholder={isCustomTour ? 'Ex: Gostaríamos de visitar Fanal, Piscinas do Porto Moniz e fazer uma paragem numa poncha tradicional...' : t('booking.notesPlaceholder', 'Dietary needs, accessibility, special requests...')}
                  value={trip.special_notes}
                  onChange={(e) => setTrip((p) => ({ ...p, special_notes: e.target.value }))}
                  className={errors.special_notes ? 'error' : ''}
                />
                {errors.special_notes && <span className="field-error">{errors.special_notes}</span>}
              </label>
            </div>

            {!isCustomTour && booking.price4 > 0 && (
              <div className="price-preview">
                <span>{t('booking.estimatedPrice', 'Estimated price')}</span>
                <strong>{booking.total_amount_eur}€</strong>
              </div>
            )}

            <div className="step-actions">
              <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                {t('booking.back', 'Back')}
              </button>
              <button type="button" className="btn-primary" onClick={handleTripNext}>
                {t('booking.next', 'Next')}
              </button>
            </div>
          </div>
        )}

        {booking.step === 3 && (
          <div className="step-panel">
            <h2>{t('booking.step3', 'Your details')}</h2>
            <div className="form-grid">
              <label>
                {t('booking.name', 'Full name')}
                <input
                  type="text"
                  value={cust.name}
                  onChange={(e) => setCust((p) => ({ ...p, name: e.target.value }))}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </label>

              <label>
                {t('booking.email', 'Email')}
                <input
                  type="email"
                  value={cust.email}
                  onChange={(e) => setCust((p) => ({ ...p, email: e.target.value }))}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </label>

              <label>
                {t('booking.phone', 'Phone / WhatsApp')}
                <input
                  type="tel"
                  placeholder="+351 ..."
                  value={cust.phone}
                  onChange={(e) => setCust((p) => ({ ...p, phone: e.target.value }))}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </label>

              <label>
                {t('booking.country', 'Country')}
                <input
                  type="text"
                  value={cust.country}
                  onChange={(e) => setCust((p) => ({ ...p, country: e.target.value }))}
                />
              </label>
            </div>

            <div className="step-actions">
              <button type="button" className="btn-secondary" onClick={() => setStep(2)}>
                {t('booking.back', 'Back')}
              </button>
              <button type="button" className="btn-primary" onClick={handleCustNext}>
                {t('booking.next', 'Next')}
              </button>
            </div>
          </div>
        )}

        {booking.step === 4 && (
          <div className="step-panel">
            <h2>{isCustomTour ? 'Rever Pedido de Orçamento' : t('booking.step4', 'Review & Payment')}</h2>

            <div className="review-block">
              <div className="review-row"><span>{t('booking.service', 'Service')}</span><strong>{booking.service_title}</strong></div>
              <div className="review-row"><span>{t('booking.date', 'Date')}</span><strong>{booking.date}</strong></div>
              <div className="review-row"><span>{t('booking.passengers', 'Passengers')}</span><strong>{booking.passengers}</strong></div>
              <div className="review-row"><span>{t('booking.pickup', 'Pickup')}</span><strong>{booking.pickup_location}</strong></div>
              {isCustomTour && (
                <div className="review-row"><span>Roteiro Desejado</span><small style={{ color: '#0f172a', fontWeight: 600 }}>{trip.special_notes || booking.special_notes}</small></div>
              )}
              <div className="review-row"><span>{t('booking.name', 'Name')}</span><strong>{booking.customer.name || cust.name}</strong></div>
              <div className="review-row"><span>{t('booking.email', 'Email')}</span><strong>{booking.customer.email || cust.email}</strong></div>
              
              <div className="review-row total">
                <span>{isCustomTour ? 'Preço Estimado' : t('booking.total', 'Total')}</span>
                <strong>{isCustomTour ? 'Sob Consulta (Orçamento Personalizado)' : `${booking.total_amount_eur}€`}</strong>
              </div>
            </div>

            {!isCustomTour ? (
              <div className="payment-methods">
                <h3>{t('booking.paymentMethod', 'Payment method')}</h3>
                <div className="pm-grid">
                  <label className={`pm-card ${booking.payment_method === PAYMENT_METHOD.STRIPE_CARD ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="pm"
                      value={PAYMENT_METHOD.STRIPE_CARD}
                      checked={booking.payment_method === PAYMENT_METHOD.STRIPE_CARD}
                      onChange={() => setPaymentMethod(PAYMENT_METHOD.STRIPE_CARD)}
                    />
                    <div>
                      <strong>💳 {t('booking.payCard', 'Pay by Card')}</strong>
                      <p>{t('booking.payCardDesc', 'Secure Stripe payment. Visa, Mastercard, etc.')}</p>
                    </div>
                  </label>
                  <label className={`pm-card ${booking.payment_method === PAYMENT_METHOD.WHATSAPP_MANUAL ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="pm"
                      value={PAYMENT_METHOD.WHATSAPP_MANUAL}
                      checked={booking.payment_method === PAYMENT_METHOD.WHATSAPP_MANUAL}
                      onChange={() => setPaymentMethod(PAYMENT_METHOD.WHATSAPP_MANUAL)}
                    />
                    <div>
                      <strong>💬 {t('booking.payWhatsapp', 'Pay via WhatsApp')}</strong>
                      <p>{t('booking.payWhatsappDesc', 'Send booking request and arrange payment with driver.')}</p>
                    </div>
                  </label>
                </div>
              </div>
            ) : (
              <div className="custom-quote-notice">
                <p>📩 Ao clicares em <strong>"Enviar Pedido de Orçamento"</strong>, o proprietário recebe os teus detalhes para preparar uma cotação sob medida e contactar-te por WhatsApp e Email.</p>
              </div>
            )}

            {errors.submit && (
              <div className="error-banner">⚠️ {errors.submit}</div>
            )}

            <div className="step-actions">
              <button type="button" className="btn-secondary" onClick={() => setStep(3)} disabled={loading}>
                {t('booking.back', 'Back')}
              </button>
              <button type="button" className="btn-primary" onClick={handleSubmit} disabled={loading}>
                {loading ? t('booking.processing', 'Processing…') :
                  isCustomTour
                    ? '📩 Enviar Pedido de Orçamento →'
                    : booking.payment_method === PAYMENT_METHOD.STRIPE_CARD
                      ? t('booking.payNow', 'Pay Now →')
                      : t('booking.sendWhatsapp', 'Send via WhatsApp →')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
