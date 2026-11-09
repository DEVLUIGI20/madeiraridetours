import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { TOURS_DATA } from '../../constants/toursCatalog';
import { MOUNTAIN_TRANSFERS_CATALOG, AIRPORT_TRANSFER_LOCATIONS, MADEIRA_ADVENTURES } from '../../constants/transfersCatalog';
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
  const timeParam = searchParams.get('time') || '';
  const returnDateParam = searchParams.get('returnDate') || '';
  const returnTimeParam = searchParams.get('returnTime') || '';
  const tripTypeParam = searchParams.get('tripType') || 'one-way';
  const paxParam = searchParams.get('pax') || '2';
  const fromParam = searchParams.get('from') || '';
  const dropoffParam = searchParams.get('dropoff') || '';
  const pickupParam = searchParams.get('pickup') || '';
  const priceParam = searchParams.get('price') || '';

  const { booking, markPendingPayment } = useBooking();

  // Find service & itinerary information
  const currentService = useMemo(() => {
    // 0. Madeira Adventures lookup
    const adv = MADEIRA_ADVENTURES.find((a) => a.id === serviceParam);
    if (adv) {
      const fixedPrice = priceParam ? Number(priceParam) : (paxParam === '8' ? adv.price8 : adv.price4);
      return {
        id: adv.id,
        title: adv.title,
        type: SERVICE_TYPE.TOUR,
        isAirportTransfer: false,
        origin: pickupParam || fromParam || 'Funchal / Accommodation Pickup',
        destination: adv.title,
        duration: adv.duration,
        highlights: adv.highlights,
        totalCalculatedPrice: fixedPrice,
        image: adv.image,
      };
    }

    // 1. Airport Transfer lookup
    if (serviceParam === 'airport-transfer' || fromParam.includes('Airport') || dropoffParam) {
      const loc = AIRPORT_TRANSFER_LOCATIONS.find(
        (l) => l.name === dropoffParam || l.id === dropoffParam
      ) || AIRPORT_TRANSFER_LOCATIONS[4]; // Default Funchal

      const origin = fromParam || 'Madeira Airport (FNC)';
      const destination = dropoffParam || loc.name;
      const isRoundTrip = tripTypeParam === 'round-trip';
      const fixedPrice = priceParam ? Number(priceParam) : (isRoundTrip ? loc.roundTripPrice : loc.oneWayPrice);

      return {
        id: 'airport-transfer',
        title: `Airport Transfer — ${destination}`,
        type: SERVICE_TYPE.TRANSFER,
        isAirportTransfer: true,
        origin,
        destination,
        isRoundTrip,
        duration: loc.duration,
        zone: loc.zone,
        totalCalculatedPrice: fixedPrice,
        image: null,
      };
    }

    // 2. Mountain Transfer lookup
    const mt = MOUNTAIN_TRANSFERS_CATALOG.find((m) => m.id === serviceParam);
    if (mt) {
      return {
        id: mt.id,
        title: mt.title,
        type: SERVICE_TYPE.TRANSFER,
        isAirportTransfer: false,
        origin: 'Funchal / Hotel Pickup',
        destination: mt.title,
        duration: mt.duration,
        highlights: mt.highlights,
        totalCalculatedPrice: mt.price * (Number(paxParam) || 2),
        image: null,
      };
    }

    // 3. Tour lookup
    const tour = TOURS_DATA.find((t) => t.id === serviceParam);
    if (tour) {
      return {
        id: tour.id,
        title: tour.title,
        type: SERVICE_TYPE.TOUR,
        isAirportTransfer: false,
        origin: 'Funchal / South Coast Hotels',
        destination: tour.title,
        duration: tour.duration,
        highlights: tour.highlights,
        totalCalculatedPrice: tour.price * (Number(paxParam) || 1),
        image: tour.image,
      };
    }

    // Fallback default
    const defaultTour = TOURS_DATA[0];
    return {
      id: defaultTour.id,
      title: defaultTour.title,
      type: SERVICE_TYPE.TOUR,
      isAirportTransfer: false,
      origin: 'Funchal',
      destination: defaultTour.title,
      duration: defaultTour.duration,
      highlights: defaultTour.highlights,
      totalCalculatedPrice: defaultTour.price * (Number(paxParam) || 1),
      image: defaultTour.image,
    };
  }, [serviceParam, fromParam, dropoffParam, tripTypeParam, priceParam, paxParam, pickupParam]);

  // Form State
  const [fullName, setFullName] = useState(booking.customer?.name || '');
  const [email, setEmail] = useState(booking.customer?.email || '');
  const [phone, setPhone] = useState(booking.customer?.phone || '');
  const [pickupAddress, setPickupAddress] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [paymentMethod, setSelectedPaymentMethod] = useState(PAYMENT_METHOD.STRIPE_CARD);

  // Date and passengers
  const [selectedDate] = useState(() => {
    if (dateParam) return dateParam;
    if (booking.date) return booking.date;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    return tomorrow.toISOString().split('T')[0];
  });

  const [selectedTime] = useState(() => {
    if (timeParam) return timeParam;
    if (booking.time_slot) return booking.time_slot;
    return '10:00';
  });

  const passengers = Number(paxParam) || booking.passengers || 2;
  const totalPrice = currentService.totalCalculatedPrice.toFixed(2);

  // Formatting Date for summary badge
  const formattedDepartureDate = useMemo(() => {
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

  const formattedReturnDate = useMemo(() => {
    if (!returnDateParam) return null;
    try {
      const d = new Date(returnDateParam);
      return d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return returnDateParam;
    }
  }, [returnDateParam]);

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

      // Format clean pickup and dropoff description
      const finalPickup = pickupAddress 
        ? `${pickupAddress} (${currentService.origin})`
        : currentService.origin;

      const bookingPayload = {
        ref: booking.ref || `MRT-${Date.now()}`,
        service_type: currentService.type,
        service_id: currentService.id,
        service_title: currentService.title,
        date: selectedDate,
        return_date: returnDateParam || null,
        trip_type: tripTypeParam,
        time_slot: selectedTime,
        passengers,
        pickup_location: finalPickup,
        flight_number: flightNumber || null,
        total_amount_eur: Number(totalPrice),
        payment_method: paymentMethod,
      };

      if (paymentMethod === PAYMENT_METHOD.PAYPAL) {
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
          {/* Left Column: Booking Summary & Detailed Itinerary */}
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
                  <span className="summary-text">{formattedDepartureDate} às {selectedTime}</span>
                </div>
                {formattedReturnDate && (
                  <div className="summary-meta-line">
                    <span className="summary-icon">🔄</span>
                    <span className="summary-text">Return: {formattedReturnDate} {returnTimeParam ? `às ${returnTimeParam}` : ''}</span>
                  </div>
                )}
                <div className="summary-meta-line">
                  <span className="summary-icon">👤</span>
                  <span className="summary-text">
                    {passengers} {passengers === 1 ? 'passenger' : 'passengers'}
                  </span>
                </div>
              </div>
            </div>

            {/* ── Detailed Itinerary Box ── */}
            <div className="checkout-itinerary-box">
              <h4 className="itinerary-heading">Transfer & Route Itinerary</h4>
              
              <div className="itinerary-timeline">
                <div className="itinerary-point start">
                  <div className="point-dot" />
                  <div className="point-info">
                    <span className="point-label">Pick-up Location</span>
                    <strong className="point-val">{currentService.origin}</strong>
                  </div>
                </div>

                <div className="itinerary-line">
                  <span className="route-duration">Est. duration: ~{currentService.duration || '25 min'}</span>
                </div>

                <div className="itinerary-point end">
                  <div className="point-dot dropoff" />
                  <div className="point-info">
                    <span className="point-label">Drop-off Destination</span>
                    <strong className="point-val">{currentService.destination}</strong>
                  </div>
                </div>

                {currentService.isRoundTrip && (
                  <div className="itinerary-roundtrip-badge">
                    <span className="rt-icon">⇄</span>
                    <span>Round Trip Included (Return on {formattedReturnDate || 'selected date'})</span>
                  </div>
                )}
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

              {/* Optional Hotel / Specific Address or Flight Number */}
              <div className="form-group">
                <label htmlFor="pickupAddress" className="form-label">
                  Hotel / Specific Address
                </label>
                <input
                  id="pickupAddress"
                  type="text"
                  placeholder="e.g. Hotel Savoy Palace, Funchal"
                  className="form-input"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="flightNumber" className="form-label">
                  Flight Number (Optional for airport pickup)
                </label>
                <input
                  id="flightNumber"
                  type="text"
                  placeholder="e.g. TP1685 or FR382"
                  className="form-input"
                  value={flightNumber}
                  onChange={(e) => setFlightNumber(e.target.value)}
                />
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
                      <span className="brand-badge mbway-badge" title="MB WAY / Card">MB</span>
                      <span className="brand-badge visa-badge" title="Visa">VISA</span>
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
                {loading ? 'Processing...' : `Pay Now (€${totalPrice}) →`}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
