import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { TOURS_DATA } from '../../constants/toursCatalog';
import { MOUNTAIN_TRANSFERS_CATALOG, AIRPORT_TRANSFER_LOCATIONS, MADEIRA_ADVENTURES } from '../../constants/transfersCatalog';
import { getAirportLocations, getTours } from '../../services/catalogService';
import PassengerPicker from '../../components/common/PassengerPicker';
import { PAYMENT_METHOD, SERVICE_TYPE } from '../../constants/booking';
import { paymentService } from '../../services/paymentService';
import { ROUTES } from '../../constants/index';
import { sanitizeText, isValidEmail, isValidPhone } from '../../utils/security';
import { useLanguage } from '../../hooks/useLanguage';
import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import './Booking.css';

const CHECKOUT_I18N = {
  pt: {
    heroTitle: 'Finalizar Reserva',
    heroSubtitle: 'Conclua a sua reserva com total segurança',
    summaryHeading: 'Resumo da Reserva',
    at: 'às',
    return: 'Regresso',
    passengers: 'Passageiros',
    itineraryHeading: 'Itinerário & Detalhes da Rota',
    pickupLocation: 'Local de Recolha',
    pickupDefault: 'Onde desejar (Hotel / Alojamento)',
    dropoffDestination: 'Destino / Chegada',
    estDuration: 'Duração estimada:',
    roundTripIncluded: (date) => `Ida e Volta Incluída (Regresso em ${date || 'data selecionada'})`,
    total: 'Total',
    yourDetails: 'Os Seus Dados',
    fullName: 'Nome Completo',
    namePlaceholder: 'João Silva',
    email: 'Endereço de Email',
    emailPlaceholder: 'joao@email.com',
    phone: 'Número de Telefone / WhatsApp',
    phonePlaceholder: '+351 912 345 678',
    hotelAirport: 'Hotel / Morada de Destino',
    hotelStandard: 'Hotel / Morada de Recolha',
    hotelPlaceholder: 'Ex: Hotel Savoy Palace, Funchal',
    flightNumber: 'Número de Voo (Opcional, para monitorização de chegada)',
    flightPlaceholder: 'Ex: TP1685 ou FR382',
    paymentMethod: 'Método de Pagamento',
    card: 'Cartão de Crédito ou Débito',
    paypal: 'PayPal',
    processing: 'A processar...',
    payNow: (amount) => `Pagar Agora (€${amount}) →`,
    airportPrefix: 'Transfer de Aeroporto —',
  },
  en: {
    heroTitle: 'Checkout',
    heroSubtitle: 'Complete your booking securely',
    summaryHeading: 'Booking Summary',
    at: 'at',
    return: 'Return',
    passengers: 'Passengers',
    itineraryHeading: 'Transfer & Route Itinerary',
    pickupLocation: 'Pick-up Location',
    pickupDefault: 'Anywhere in Madeira (Hotel / Address)',
    dropoffDestination: 'Drop-off Destination',
    estDuration: 'Est. duration:',
    roundTripIncluded: (date) => `Round Trip Included (Return on ${date || 'selected date'})`,
    total: 'Total',
    yourDetails: 'Your Details',
    fullName: 'Full Name',
    namePlaceholder: 'John Smith',
    email: 'Email Address',
    emailPlaceholder: 'john@email.com',
    phone: 'Phone Number / WhatsApp',
    phonePlaceholder: '+44 7123 456789',
    hotelAirport: 'Hotel / Destination Address',
    hotelStandard: 'Hotel / Pick-up Address',
    hotelPlaceholder: 'e.g. Hotel Savoy Palace, Funchal',
    flightNumber: 'Flight Number (Optional for airport arrival tracking)',
    flightPlaceholder: 'e.g. TP1685 or FR382',
    paymentMethod: 'Payment Method',
    card: 'Credit or Debit Card',
    paypal: 'PayPal',
    processing: 'Processing...',
    payNow: (amount) => `Pay Now (€${amount}) →`,
    airportPrefix: 'Airport Transfer —',
  },
  de: {
    heroTitle: 'Buchung Abschließen',
    heroSubtitle: 'Schließen Sie Ihre Buchung sicher ab',
    summaryHeading: 'Buchungsübersicht',
    at: 'um',
    return: 'Rückfahrt',
    passengers: 'Passagiere',
    itineraryHeading: 'Reiseverlauf & Routendetails',
    pickupLocation: 'Abholort',
    pickupDefault: 'Überall auf Madeira (Hotel / Adresse)',
    dropoffDestination: 'Zielort',
    estDuration: 'Geschätzte Dauer:',
    roundTripIncluded: (date) => `Hin- und Rückfahrt inklusive (Rückfahrt am ${date || 'ausgewählten Datum'})`,
    total: 'Gesamt',
    yourDetails: 'Ihre Daten',
    fullName: 'Vollständiger Name',
    namePlaceholder: 'Max Mustermann',
    email: 'E-Mail-Adresse',
    emailPlaceholder: 'max@beispiel.de',
    phone: 'Telefonnummer / WhatsApp',
    phonePlaceholder: '+49 170 1234567',
    hotelAirport: 'Hotel / Zieladresse',
    hotelStandard: 'Hotel / Abholadresse',
    hotelPlaceholder: 'z.B. Hotel Savoy Palace, Funchal',
    flightNumber: 'Flugnummer (Optional zur Flugüberwachung)',
    flightPlaceholder: 'z.B. LH4300 oder TP1685',
    paymentMethod: 'Zahlungsmethode',
    card: 'Kredit- oder Debitkarte',
    paypal: 'PayPal',
    processing: 'Wird verarbeitet...',
    payNow: (amount) => `Jetzt Bezahlen (€${amount}) →`,
    airportPrefix: 'Flughafentransfer —',
  },
  fr: {
    heroTitle: 'Finaliser la Réservation',
    heroSubtitle: 'Complétez votre réservation en toute sécurité',
    summaryHeading: 'Récapitulatif de la Réservation',
    at: 'à',
    return: 'Retour',
    passengers: 'Passagers',
    itineraryHeading: 'Itinéraire & Détails du Trajet',
    pickupLocation: 'Lieu de Prise en Charge',
    pickupDefault: 'Partout à Madère (Hôtel / Adresse)',
    dropoffDestination: 'Destination d\'arrivée',
    estDuration: 'Durée estimée :',
    roundTripIncluded: (date) => `Aller-retour inclus (Retour le ${date || 'date sélectionnée'})`,
    total: 'Total',
    yourDetails: 'Vos Coordonnées',
    fullName: 'Nom Complet',
    namePlaceholder: 'Jean Dupont',
    email: 'Adresse E-mail',
    emailPlaceholder: 'jean@email.com',
    phone: 'Numéro de Téléphone / WhatsApp',
    phonePlaceholder: '+33 6 12 34 56 78',
    hotelAirport: 'Hôtel / Adresse de Destination',
    hotelStandard: 'Hôtel / Adresse de Prise en Charge',
    hotelPlaceholder: 'Ex: Hôtel Savoy Palace, Funchal',
    flightNumber: 'Numéro de Vol (Optionnel pour le suivi)',
    flightPlaceholder: 'Ex: TP1685 ou AF1234',
    paymentMethod: 'Mode de Paiement',
    card: 'Carte Bancaire',
    paypal: 'PayPal',
    processing: 'Traitement en cours...',
    payNow: (amount) => `Payer Maintenant (€${amount}) →`,
    airportPrefix: 'Transfert Aéroport —',
  },
  es: {
    heroTitle: 'Finalizar Reserva',
    heroSubtitle: 'Complete su reserva con total seguridad',
    summaryHeading: 'Resumen de la Reserva',
    at: 'a las',
    return: 'Regreso',
    passengers: 'Pasajeros',
    itineraryHeading: 'Itinerario y Detalles de la Ruta',
    pickupLocation: 'Lugar de Recogida',
    pickupDefault: 'Donde desee (Hotel / Alojamiento)',
    dropoffDestination: 'Destino de Llegada',
    estDuration: 'Duración estimada:',
    roundTripIncluded: (date) => `Ida y Vuelta Incluida (Regreso el ${date || 'fecha seleccionada'})`,
    total: 'Total',
    yourDetails: 'Sus Datos',
    fullName: 'Nombre Completo',
    namePlaceholder: 'Juan Pérez',
    email: 'Correo Electrónico',
    emailPlaceholder: 'juan@email.com',
    phone: 'Número de Teléfono / WhatsApp',
    phonePlaceholder: '+34 612 345 678',
    hotelAirport: 'Hotel / Dirección de Destino',
    hotelStandard: 'Hotel / Dirección de Recogida',
    hotelPlaceholder: 'Ej: Hotel Savoy Palace, Funchal',
    flightNumber: 'Número de Vuelo (Opcional para seguimiento)',
    flightPlaceholder: 'Ej: TP1685 o IB3100',
    paymentMethod: 'Método de Pago',
    card: 'Tarjeta de Crédito o Débito',
    paypal: 'PayPal',
    processing: 'Procesando...',
    payNow: (amount) => `Pagar Ahora (€${amount}) →`,
    airportPrefix: 'Traslado de Aeropuerto —',
  },
};

export default function Booking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentLang } = useLanguage();
  const bT = CHECKOUT_I18N[currentLang] || CHECKOUT_I18N.en;

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
  const [locations, setLocations] = useState(AIRPORT_TRANSFER_LOCATIONS);
  const [toursList, setToursList] = useState(TOURS_DATA);

  useEffect(() => {
    let isMounted = true;
    getAirportLocations().then((liveLocations) => {
      if (isMounted && liveLocations && liveLocations.length > 0) {
        setLocations(liveLocations);
      }
    });
    getTours().then((liveTours) => {
      if (isMounted && liveTours && liveTours.length > 0) {
        setToursList(liveTours);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Helper to resolve localized title for tour or adventure
  const resolveTitle = (item) => {
    if (!item) return '';
    if (currentLang === 'pt') return item.titlePt || item.title;
    if (currentLang === 'de') return item.titleDe || item.titleEn || item.title;
    if (currentLang === 'fr') return item.titleFr || item.titleEn || item.title;
    if (currentLang === 'es') return item.titleEs || item.titleEn || item.title;
    return item.titleEn || item.title;
  };

  // Find service & itinerary information
  const currentService = useMemo(() => {
    // 0. Madeira Adventures lookup
    const adv = MADEIRA_ADVENTURES.find((a) => a.id === serviceParam);
    if (adv) {
      const fixedPrice = priceParam ? Number(priceParam) : (paxParam === '8' ? adv.price8 : adv.price4);
      const title = resolveTitle(adv);
      return {
        id: adv.id,
        title,
        type: SERVICE_TYPE.TOUR,
        isAirportTransfer: false,
        origin: pickupParam || fromParam || bT.pickupDefault,
        destination: title,
        duration: adv.duration,
        highlights: adv.highlights,
        totalCalculatedPrice: fixedPrice,
        image: adv.image,
      };
    }

    // 1. Airport Transfer lookup
    if (serviceParam === 'airport-transfer' || fromParam.includes('Airport') || dropoffParam) {
      const loc = locations.find(
        (l) => l.name === dropoffParam || l.id === dropoffParam
      ) || locations[0]; // Default Funchal

      const origin = fromParam || (currentLang === 'pt' ? 'Aeroporto da Madeira (FNC)' : 'Madeira Airport (FNC)');
      const destination = dropoffParam || loc.name;
      const isRoundTrip = tripTypeParam === 'round-trip';
      const fixedPrice = priceParam ? Number(priceParam) : (isRoundTrip ? loc.roundTripPrice : loc.oneWayPrice);

      return {
        id: 'airport-transfer',
        title: `${bT.airportPrefix} ${destination}`,
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
      const title = resolveTitle(mt);
      return {
        id: mt.id,
        title,
        type: SERVICE_TYPE.TRANSFER,
        isAirportTransfer: false,
        origin: pickupParam || fromParam || bT.pickupDefault,
        destination: title,
        duration: mt.duration,
        highlights: mt.highlights,
        totalCalculatedPrice: mt.price * (Number(paxParam) || 2),
        image: null,
      };
    }

    // 3. Tour lookup (checked against live database list and static catalog)
    const tour = toursList.find((t) => t.id === serviceParam) || TOURS_DATA.find((t) => t.id === serviceParam);
    if (tour) {
      const paxNum = Number(paxParam) || 1;
      let calculatedPrice = tour.price;

      if (tour.price4 && tour.price8) {
        calculatedPrice = paxNum > 4 ? tour.price8 : tour.price4;
      } else if (priceParam) {
        calculatedPrice = Number(priceParam);
      } else if (tour.price) {
        calculatedPrice = tour.price;
      }

      const title = resolveTitle(tour);
      return {
        id: tour.id,
        title,
        type: SERVICE_TYPE.TOUR,
        isAirportTransfer: false,
        origin: pickupParam || bT.pickupDefault,
        destination: title,
        duration: tour.duration,
        highlights: tour.highlights,
        totalCalculatedPrice: calculatedPrice,
        image: tour.image,
      };
    }

    // Fallback default
    const defaultTour = toursList[0] || TOURS_DATA[0];
    const defaultTitle = resolveTitle(defaultTour);
    return {
      id: defaultTour.id,
      title: defaultTitle,
      type: SERVICE_TYPE.TOUR,
      isAirportTransfer: false,
      origin: bT.pickupDefault,
      destination: defaultTitle,
      duration: defaultTour.duration,
      highlights: defaultTour.highlights,
      totalCalculatedPrice: defaultTour.price || 90,
      image: defaultTour.image,
    };
  }, [serviceParam, fromParam, dropoffParam, tripTypeParam, priceParam, paxParam, pickupParam, locations, toursList, currentLang, bT]);

  // Form State
  const initialPickup = pickupParam || '';
  const [fullName, setFullName] = useState(booking.customer?.name || '');
  const [email, setEmail] = useState(booking.customer?.email || '');
  const [phone, setPhone] = useState(booking.customer?.phone || '');
  const [pickupAddress, setPickupAddress] = useState(initialPickup);
  const [pickupZoneParam] = useState(pickupParam || '');
  const [flightNumber, setFlightNumber] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    booking.paymentMethod || PAYMENT_METHOD.STRIPE_CARD
  );
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Dynamic values
  const [passengers, setPassengers] = useState(Number(paxParam) || booking.passengers || 2);
  const selectedDate = dateParam || booking.date || getDefaultDate();
  const selectedTime = timeParam || booking.timeSlot || '10:00';

  // Format Dates nicely
  const formattedDepartureDate = useMemo(() => {
    if (!selectedDate) return '';
    try {
      const localeMap = { pt: 'pt-PT', en: 'en-GB', de: 'de-DE', fr: 'fr-FR', es: 'es-ES' };
      const d = new Date(selectedDate + 'T00:00:00');
      return d.toLocaleDateString(localeMap[currentLang] || 'en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return selectedDate;
    }
  }, [selectedDate, currentLang]);

  const formattedReturnDate = useMemo(() => {
    if (!returnDateParam) return '';
    try {
      const localeMap = { pt: 'pt-PT', en: 'en-GB', de: 'de-DE', fr: 'fr-FR', es: 'es-ES' };
      const d = new Date(returnDateParam + 'T00:00:00');
      return d.toLocaleDateString(localeMap[currentLang] || 'en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return returnDateParam;
    }
  }, [returnDateParam, currentLang]);

  // Price Calculation
  const totalPrice = useMemo(() => {
    const adv = MADEIRA_ADVENTURES.find((a) => a.id === serviceParam);
    if (adv) {
      if (priceParam) return Number(priceParam);
      return passengers <= 4 ? adv.price4 : adv.price8;
    }

    const tour = toursList.find((t) => t.id === serviceParam) || TOURS_DATA.find((t) => t.id === serviceParam);
    if (tour) {
      if (tour.price4 && tour.price8) {
        return passengers <= 4 ? tour.price4 : tour.price8;
      }
      if (priceParam) return Number(priceParam);
      return tour.price;
    }

    if (currentService.type === SERVICE_TYPE.TRANSFER && !currentService.isAirportTransfer) {
      const basePerPerson = currentService.totalCalculatedPrice / (Number(paxParam) || 2);
      return Math.round(basePerPerson * passengers);
    }

    return currentService.totalCalculatedPrice;
  }, [currentService, passengers, serviceParam, priceParam, paxParam, toursList]);

  function getDefaultDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  function validate() {
    const errs = {};
    if (!sanitizeText(fullName)) {
      errs.fullName = currentLang === 'pt' ? 'Por favor indique o seu nome completo.' : 'Please enter your full name.';
    }
    if (!isValidEmail(email)) {
      errs.email = currentLang === 'pt' ? 'Por favor indique um email válido.' : 'Please enter a valid email address.';
    }
    if (!isValidPhone(phone)) {
      errs.phone = currentLang === 'pt' ? 'Por favor indique um contacto telefónico válido.' : 'Please enter a valid phone number.';
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
        phone: sanitizeText(phone),
      };

      let finalPickup = pickupAddress.trim();
      if (!finalPickup) {
        finalPickup = pickupZoneParam.trim() || currentService.origin;
      } else if (pickupZoneParam.trim() && !finalPickup.toLowerCase().includes(pickupZoneParam.toLowerCase())) {
        finalPickup = `${finalPickup}, ${pickupZoneParam.trim()}`;
      }

      const bookingPayload = {
        ref: booking.ref || `MRT-${Date.now()}`,
        service_type: currentService.type,
        service_id: currentService.id,
        service_title: currentService.title,
        date: selectedDate,
        return_date: returnDateParam || null,
        return_time: returnTimeParam || null,
        trip_type: tripTypeParam,
        time_slot: selectedTime,
        passengers,
        pickup_location: finalPickup,
        flight_number: currentService.isAirportTransfer ? (flightNumber || null) : null,
        total_amount_eur: Number(totalPrice),
        payment_method: selectedPaymentMethod,
        language: currentLang || 'en',
      };

      if (selectedPaymentMethod === PAYMENT_METHOD.PAYPAL) {
        alert(currentLang === 'pt' ? 'Integração PayPal iniciada...' : 'PayPal integration is initialized...');
        navigate(ROUTES.BOOKING_SUCCESS + '?ref=' + bookingPayload.ref + '&pm=paypal');
        return;
      }

      // Default: Stripe card checkout
      await paymentService.startCheckout({
        booking: bookingPayload,
        customer: customerData,
      });
    } catch (err) {
      setErrors({ submit: err.message || (currentLang === 'pt' ? 'Falha ao iniciar pagamento. Tente novamente.' : 'Payment initiation failed. Please try again.') });
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
          <h1 className="checkout-hero-title">{bT.heroTitle}</h1>
          <p className="checkout-hero-subtitle">
            {bT.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ── Main Two-Column Layout ── */}
      <main className="checkout-main container-constrained">
        <div className="checkout-grid">
          {/* Left Column: Booking Summary & Detailed Itinerary */}
          <section className="checkout-summary-card">
            <h2 className="card-heading">{bT.summaryHeading}</h2>

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
                  <span className="summary-text">{formattedDepartureDate} {bT.at} {selectedTime}</span>
                </div>
                {formattedReturnDate && (
                  <div className="summary-meta-line">
                    <span className="summary-icon">🔄</span>
                    <span className="summary-text">{bT.return}: {formattedReturnDate} {returnTimeParam ? `${bT.at} ${returnTimeParam}` : ''}</span>
                  </div>
                )}
                <div className="checkout-pax-wrapper">
                  <span className="checkout-pax-field-lbl">
                    {bT.passengers}
                  </span>
                  <PassengerPicker
                    value={passengers}
                    onChange={(n) => setPassengers(n)}
                    language={currentLang}
                    min={1}
                    max={8}
                  />
                </div>
              </div>
            </div>

            {/* ── Detailed Itinerary Box ── */}
            <div className="checkout-itinerary-box">
              <h4 className="itinerary-heading">{bT.itineraryHeading}</h4>
              
              <div className="itinerary-timeline">
                <div className="itinerary-point start">
                  <div className="point-dot" />
                  <div className="point-info">
                    <span className="point-label">
                      {bT.pickupLocation}
                    </span>
                    <strong className="point-val">
                      {pickupAddress.trim() ? pickupAddress : currentService.origin}
                    </strong>
                  </div>
                </div>

                <div className="itinerary-line">
                  <span className="route-duration">{bT.estDuration} ~{currentService.duration || '25 min'}</span>
                </div>

                <div className="itinerary-point end">
                  <div className="point-dot dropoff" />
                  <div className="point-info">
                    <span className="point-label">{bT.dropoffDestination}</span>
                    <strong className="point-val">{currentService.destination}</strong>
                  </div>
                </div>

                {currentService.isRoundTrip && (
                  <div className="itinerary-roundtrip-badge">
                    <span className="rt-icon">⇄</span>
                    <span>{bT.roundTripIncluded(formattedReturnDate)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="summary-total-row">
              <span className="total-label">{bT.total}</span>
              <strong className="total-amount">€{totalPrice}</strong>
            </div>
          </section>

          {/* Right Column: Your Details & Payment */}
          <section className="checkout-form-card">
            <h2 className="card-heading">{bT.yourDetails}</h2>

            <form onSubmit={handleCheckout} className="checkout-form">
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">
                  {bT.fullName} <span className="req">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  placeholder={bT.namePlaceholder}
                  className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                {errors.fullName && <p className="field-error">{errors.fullName}</p>}
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  {bT.email} <span className="req">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder={bT.emailPlaceholder}
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="field-error">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  {bT.phone} <span className="req">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  placeholder={bT.phonePlaceholder}
                  className={`form-input ${errors.phone ? 'input-error' : ''}`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {errors.phone && <p className="field-error">{errors.phone}</p>}
              </div>

              {/* Optional Hotel / Specific Address or Flight Number */}
              <div className="form-group">
                <label htmlFor="pickupAddress" className="form-label">
                  {currentService.isAirportTransfer 
                    ? bT.hotelAirport 
                    : bT.hotelStandard}
                </label>
                <input
                  id="pickupAddress"
                  type="text"
                  placeholder={bT.hotelPlaceholder}
                  className="form-input"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                />
              </div>

              {/* Flight Number: ONLY shown for Airport Transfers */}
              {currentService.isAirportTransfer && (
                <div className="form-group">
                  <label htmlFor="flightNumber" className="form-label">
                    {bT.flightNumber}
                  </label>
                  <input
                    id="flightNumber"
                    type="text"
                    placeholder={bT.flightPlaceholder}
                    className="form-input"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                  />
                </div>
              )}

              {/* Payment Method Selector */}
              <div className="payment-method-section">
                <h3 className="section-subheading">{bT.paymentMethod}</h3>

                <div className="payment-options">
                  {/* Credit or Debit Card */}
                  <label
                    className={`payment-option ${selectedPaymentMethod === PAYMENT_METHOD.STRIPE_CARD ? 'active' : ''}`}
                  >
                    <div className="option-radio-group">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={PAYMENT_METHOD.STRIPE_CARD}
                        checked={selectedPaymentMethod === PAYMENT_METHOD.STRIPE_CARD}
                        onChange={() => setSelectedPaymentMethod(PAYMENT_METHOD.STRIPE_CARD)}
                        className="payment-radio"
                      />
                      <span className="payment-label-text">{bT.card}</span>
                    </div>

                    <div className="card-brands">
                      <span className="brand-badge mbway-badge" title="MB WAY / Card">MB</span>
                      <span className="brand-badge visa-badge" title="Visa">VISA</span>
                      <span className="brand-badge mc-badge" title="MasterCard">MC</span>
                    </div>
                  </label>

                  {/* PayPal */}
                  <label
                    className={`payment-option ${selectedPaymentMethod === PAYMENT_METHOD.PAYPAL ? 'active' : ''}`}
                  >
                    <div className="option-radio-group">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={PAYMENT_METHOD.PAYPAL}
                        checked={selectedPaymentMethod === PAYMENT_METHOD.PAYPAL}
                        onChange={() => setSelectedPaymentMethod(PAYMENT_METHOD.PAYPAL)}
                        className="payment-radio"
                      />
                      <span className="payment-label-text">{bT.paypal}</span>
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
                {loading ? bT.processing : bT.payNow(totalPrice)}
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
