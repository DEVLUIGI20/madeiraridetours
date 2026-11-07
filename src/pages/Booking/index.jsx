import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { TOURS_DATA } from '../../constants/toursCatalog';
import { MOUNTAIN_TRANSFERS_CATALOG, AIRPORT_TRANSFER_LOCATIONS } from '../../constants/transfersCatalog';
import { PAYMENT_METHOD, SERVICE_TYPE } from '../../constants/booking';
import { paymentService } from '../../services/paymentService';
import { ROUTES } from '../../constants/index';
import { sanitizeText, isValidEmail, isValidPhone } from '../../utils/security';
import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import './Booking.css';

export default function Booking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URL query params
  const serviceParam = searchParams.get('service') || '';
  const dateParam = searchParams.get('date') || '';
  const paxParam = searchParams.get('pax') || '2';
  const pickupParam = searchParams.get('pickup') || '';
  const dropoffParam = searchParams.get('dropoff') || '';

  const { booking, markPendingPayment } = useBooking();

  // Find service information
  const currentService = useMemo(() => {
    // 1. Tour lookup
    const tour = TOURS_DATA.find((t) => t.id === serviceParam);
    if (tour) {
      return {
        id: tour.id,
        title: tour.title,
        type: SERVICE_TYPE.TOUR,
        pricePerPerson: tour.price,
        image: tour.image,
      };
    }

    // 2. Airport Transfer lookup
    if (serviceParam === 'airport-transfer') {
      const loc = AIRPORT_TRANSFER_LOCATIONS.find((l) => l.name === dropoffParam) || AIRPORT_TRANSFER_LOCATIONS[0];
      return {
        id: 'airport-transfer',
        title: `Airport Transfer: ${pickupParam || 'Airport'} → ${dropoffParam || loc.name}`,
        type: SERVICE_TYPE.TRANSFER,
        pricePerPerson: loc ? loc.price : 35,
        image: null,
      };
    }

    // 3. Mountain Transfer lookup
    const mt = MOUNTAIN_TRANSFERS_CATALOG.find((m) => m.id === serviceParam);
    if (mt) {
      return {
        id: mt.id,
        title: mt.title,
        type: SERVICE_TYPE.TRANSFER,
        pricePerPerson: mt.price,
        image: null,
      };
    }

    // Fallback: Default Tour (Pico do Areeiro)
    const defaultTour = TOURS_DATA[0];
    return {
      id: defaultTour.id,
      title: defaultTour.title,
      type: SERVICE_TYPE.TOUR,
      pricePerPerson: defaultTour.price,
      image: defaultTour.image,
    };
  }, [serviceParam, dropoffParam, pickupParam]);

  // Form State
  const [fullName, setFullName] = useState(booking.customer?.name || '');
  const [email, setEmail] = useState(booking.customer?.email || '');
  const [phone, setPhone] = useState(booking.customer?.phone || '');
  const [paymentMethod, setSelectedPaymentMethod] = useState(PAYMENT_METHOD.STRIPE_CARD);

  // Date and passengers (from URL query, booking context, or sensible defaults)
  const [selectedDate] = useState(() => {
    if (dateParam) return dateParam;
    if (booking.date) return booking.date;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    return tomorrow.toISOString().split('T')[0];
  });

  const passengers = Number(paxParam) || booking.passengers || 2;
  const totalPrice = (currentService.pricePerPerson * (currentService.type === SERVICE_TYPE.TRANSFER && serviceParam === 'airport-transfer' ? 1 : passengers)).toFixed(2);

  // Formatting Date for summary badge (e.g. "Sat, Nov 22, 2025")
  const formattedDate = useMemo(() => {
    try {
      const d = new Date(selectedDate);
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return selectedDate;
    }
  }, [selectedDate]);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!sanitizeText(fullName)) {
      errs.fullName = 'Please enter your full name.';
    }
    if (!isValidEmail(email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!isValidPhone(phone)) {
      errs.phone = 'Please provide a valid phone number (minimum 7 digits).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleCheckout(e) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      markPendingPayment();

      const customerData = {
        name: sanitizeText(fullName),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
      };

      const bookingPayload = {
        ref: booking.ref || `MRT-${Date.now()}`,
        service_type: currentService.type,
        service_id: currentService.id,
        service_title: currentService.title,
        date: selectedDate,
        time_slot: booking.time_slot || '08:00',
        passengers,
        pickup_location: pickupParam || booking.pickup_location || 'Funchal / Hotel',
        total_amount_eur: Number(totalPrice),
        payment_method: paymentMethod,
      };

      if (paymentMethod === PAYMENT_METHOD.PAYPAL) {
        // Redirect or trigger PayPal checkout
        alert('PayPal integration is initialized. Connecting to PayPal checkout...');
        navigate(ROUTES.BOOKING_SUCCESS + '?ref=' + bookingPayload.ref + '&pm=paypal');
        return;
      }

      // Default: Stripe card checkout
      await paymentService.startCheckout({
        booking: bookingPayload,
        customer: customerData,
      });
    } catch (err) {
      setErrors({ submit: err.message || 'Payment initiation failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="checkout-page">
      {/* ── Sub-Hero Banner matching Mockup ── */}
      <section className="checkout-hero">
        <div className="checkout-hero-bg">
          <ImagePlaceholder
            alt="Madeira Scenic Ocean View"
            height="100%"
          />
          <div className="checkout-hero-overlay" />
        </div>
        <div className="checkout-hero-content container-constrained">
          <h1 className="checkout-hero-title">Checkout</h1>
          <p className="checkout-hero-subtitle">
            Complete your booking securely
          </p>
        </div>
      </section>

      {/* ── Main Two-Column Layout ── */}
      <main className="checkout-main container-constrained">
        <div className="checkout-grid">
          {/* Left Column: Booking Summary */}
          <section className="checkout-summary-card">
            <h2 className="card-heading">Booking Summary</h2>

            <div className="summary-item-card">
              <div className="summary-thumb-box">
                <ImagePlaceholder
                  src={currentService.image}
                  alt={currentService.title}
                  width="100%"
                  height="100%"
                />
              </div>

              <div className="summary-item-details">
                <h3 className="summary-item-title">{currentService.title}</h3>
                <div className="summary-meta-line">
                  <span className="summary-icon">📅</span>
                  <span className="summary-text">{formattedDate}</span>
                </div>
                <div className="summary-meta-line">
                  <span className="summary-icon">👤</span>
                  <span className="summary-text">
                    {passengers} {passengers === 1 ? 'adult' : 'adults'}
                  </span>
                </div>
              </div>
            </div>

            <div className="summary-total-row">
              <span className="total-label">Total</span>
              <strong className="total-amount">€{totalPrice}</strong>
            </div>
          </section>

          {/* Right Column: Your Details & Payment */}
          <section className="checkout-form-card">
            <h2 className="card-heading">Your Details</h2>

            <form onSubmit={handleCheckout} className="checkout-form">
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  Full Name <span className="req">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  placeholder="João Silva"
                  className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && <p className="field-error">{errors.fullName}</p>}
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email Address <span className="req">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="joao@email.com"
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="field-error">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Phone Number <span className="req">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder="+351 912 345 678"
                  className={`form-input ${errors.phone ? 'input-error' : ''}`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <p className="field-error">{errors.phone}</p>}
              </div>

              {/* Payment Method Selector */}
              <div className="payment-method-section">
                <h3 className="section-subheading">Payment Method</h3>

                <div className="payment-options">
                  {/* Credit or Debit Card */}
                  <label
                    className={`payment-option ${paymentMethod === PAYMENT_METHOD.STRIPE_CARD ? 'active' : ''}`}
                  >
                    <div className="option-radio-group">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={PAYMENT_METHOD.STRIPE_CARD}
                        checked={paymentMethod === PAYMENT_METHOD.STRIPE_CARD}
                        onChange={() => setSelectedPaymentMethod(PAYMENT_METHOD.STRIPE_CARD)}
                        className="payment-radio"
                      />
                      <span className="payment-label-text">Credit or Debit Card</span>
                    </div>

                    <div className="card-brands">
                      {/* Multibanco / Card badge */}
                      <span className="brand-badge mbway-badge" title="MB WAY / Card">MB</span>
                      {/* Visa */}
                      <span className="brand-badge visa-badge" title="Visa">VISA</span>
                      {/* MasterCard */}
                      <span className="brand-badge mc-badge" title="MasterCard">MC</span>
                    </div>
                  </label>

                  {/* PayPal */}
                  <label
                    className={`payment-option ${paymentMethod === PAYMENT_METHOD.PAYPAL ? 'active' : ''}`}
                  >
                    <div className="option-radio-group">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={PAYMENT_METHOD.PAYPAL}
                        checked={paymentMethod === PAYMENT_METHOD.PAYPAL}
                        onChange={() => setSelectedPaymentMethod(PAYMENT_METHOD.PAYPAL)}
                        className="payment-radio"
                      />
                      <span className="payment-label-text">PayPal</span>
                    </div>

                    <span className="paypal-logo-text">PayPal</span>
                  </label>
                </div>
              </div>

              {errors.submit && (
                <div className="checkout-alert error">
                  {errors.submit}
                </div>
              )}

              {/* Submit / Pay Now Button */}
              <button
                type="submit"
                disabled={loading}
                className="checkout-pay-btn"
              >
                {loading ? 'Processing...' : 'Pay Now →'}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
