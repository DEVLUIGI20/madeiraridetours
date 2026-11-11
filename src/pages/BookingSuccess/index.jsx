import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { APP_CONFIG, makeWhatsAppUrl } from '../../constants';
import { MADEIRA_ADVENTURES } from '../../constants/transfersCatalog';
import { TOURS_DATA } from '../../constants/toursCatalog';
import { downloadCalendarEvent } from '../../utils/calendar';
import { useLanguage } from '../../hooks/useLanguage';
import usePageTitle from '../../hooks/usePageTitle';
import './BookingSuccess.css';

export default function BookingSuccess() {
  const [searchParams] = useSearchParams();
  const refParam = searchParams.get('ref') || '';
  const { currentLang } = useLanguage();

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
  const bookingLang = booking?.language || currentLang || 'en';

  usePageTitle(
    bookingLang === 'pt'
      ? 'Reserva Confirmada — Voucher Digital'
      : bookingLang === 'de'
      ? 'Buchung Bestätigt — Digitaler Voucher'
      : bookingLang === 'fr'
      ? 'Réservation Confirmée — Bon Numérique'
      : bookingLang === 'es'
      ? 'Reserva Confirmada — Voucher Digital'
      : 'Booking Confirmed — Digital Voucher',
    'Madeira Ride Tours Voucher'
  );

  const voucherTexts = {
    pt: {
      pageTitle: 'Reserva Efetuada com Sucesso!',
      subtitle: (name) => <>Obrigado, <strong>{name}</strong>. A sua viagem na Madeira está registada e a nossa equipa já foi notificada.</>,
      emailAlert: (email) => <>Foi enviado um comprovativo detalhado para <strong>{email}</strong></>,
      officialVoucher: 'Voucher Digital Oficial',
      refLabel: 'Referência',
      registered: '● Reserva Registada',
      roundTripBadge: '🔄 Ida e Volta',
      holder: 'Titular da Reserva',
      contact: 'Contacto / Email',
      depDate: 'Data da Viagem (Ida)',
      expectedTime: 'Hora Prevista',
      retDate: 'Data de Regresso (Volta)',
      retTime: 'Hora do Regresso',
      toArrange: 'A combinar',
      pickupSpot: 'Ponto de Encontro / Morada de Recolha',
      passengers: 'Passageiros',
      paxUnit: (n) => `${n} ${n === 1 ? 'passageiro' : 'passageiros'}`,
      flightNumber: 'Número de Voo',
      paymentMethod: 'Método de Pagamento',
      cardPayment: 'Cartão de Crédito / Débito',
      totalVal: 'Valor Total',
      itineraryHeading: (count) => <><span>📍</span> Itinerário Completo da Experiência ({count} Paragens)</>,
      instHeading: 'Instruções Importantes para a Viagem',
      airportInst: 'No Aeroporto (FNC): O motorista estará na área de chegadas com uma placa com o seu nome. Monitorizamos o seu voo em tempo real.',
      hotelInst: 'No Hotel / Morada de Recolha: Por favor esteja na receção ou entrada principal 5 minutos antes da hora marcada.',
      saveInst: 'Pode guardar este voucher no telemóvel ou imprimi-lo para apresentar ao motorista.',
      calendarBtn: '📅 Adicionar ao Apple / Google Calendário',
      printBtn: '🖨️ Descarregar / Imprimir Voucher (PDF)',
      whatsappBtn: '💬 Confirmar no WhatsApp',
      homeBtn: 'Voltar à Página Principal',
    },
    en: {
      pageTitle: 'Booking Successfully Confirmed!',
      subtitle: (name) => <>Thank you, <strong>{name}</strong>. Your trip in Madeira is registered and our team has been notified.</>,
      emailAlert: (email) => <>A detailed confirmation was sent to <strong>{email}</strong></>,
      officialVoucher: 'Official Digital Voucher',
      refLabel: 'Reference',
      registered: '● Booking Confirmed',
      roundTripBadge: '🔄 Round Trip',
      holder: 'Lead Passenger',
      contact: 'Contact / Email',
      depDate: 'Departure Date',
      expectedTime: 'Scheduled Time',
      retDate: 'Return Date',
      retTime: 'Return Time',
      toArrange: 'To be agreed',
      pickupSpot: 'Pick-up Location / Hotel Address',
      passengers: 'Passengers',
      paxUnit: (n) => `${n} ${n === 1 ? 'passenger' : 'passengers'}`,
      flightNumber: 'Flight Number',
      paymentMethod: 'Payment Method',
      cardPayment: 'Credit / Debit Card',
      totalVal: 'Total Amount',
      itineraryHeading: (count) => <><span>📍</span> Full Experience Itinerary ({count} Stops)</>,
      instHeading: 'Important Travel Instructions',
      airportInst: 'At Madeira Airport (FNC): Your driver will be waiting in arrivals with a sign with your name. We track your flight in real-time.',
      hotelInst: 'At Hotel / Pick-up Address: Please be ready at reception or main entrance 5 minutes before scheduled time.',
      saveInst: 'You can save this voucher on your smartphone or print it out to show to your driver.',
      calendarBtn: '📅 Add to Apple / Google Calendar',
      printBtn: '🖨️ Download / Print Voucher (PDF)',
      whatsappBtn: '💬 Confirm on WhatsApp',
      homeBtn: 'Back to Home',
    },
    de: {
      pageTitle: 'Buchung Erfolgreich Bestätigt!',
      subtitle: (name) => <>Vielen Dank, <strong>{name}</strong>. Ihre Fahrt auf Madeira ist gebucht und unser Team informiert.</>,
      emailAlert: (email) => <>Eine Bestätigung wurde an <strong>{email}</strong> gesendet</>,
      officialVoucher: 'Offizieller Digitaler Voucher',
      refLabel: 'Buchungsnummer',
      registered: '● Buchung Bestätigt',
      roundTripBadge: '🔄 Hin- und Rückfahrt',
      holder: 'Reisender',
      contact: 'Kontakt / E-Mail',
      depDate: 'Hinfahrt-Datum',
      expectedTime: 'Abholzeit',
      retDate: 'Rückfahrt-Datum',
      retTime: 'Rückfahrt-Uhrzeit',
      toArrange: 'Nach Vereinbarung',
      pickupSpot: 'Treffpunkt / Hoteladresse',
      passengers: 'Passagiere',
      paxUnit: (n) => `${n} ${n === 1 ? 'Passagier' : 'Passagiere'}`,
      flightNumber: 'Flugnummer',
      paymentMethod: 'Zahlungsmethode',
      cardPayment: 'Kredit- / Debitkarte',
      totalVal: 'Gesamtbetrag',
      itineraryHeading: (count) => <><span>📍</span> Vollständiger Reiseverlauf ({count} Stopps)</>,
      instHeading: 'Wichtige Reisehinweise',
      airportInst: 'Am Flughafen (FNC): Ihr Fahrer erwartet Sie in der Ankunftshalle mit einem Namensschild. Wir überwachen Ihren Flug.',
      hotelInst: 'Am Hotel / Abholadresse: Bitte seien Sie 5 Minuten vor Abfahrt an der Rezeption bereit.',
      saveInst: 'Sie können diesen Voucher auf Ihrem Smartphone speichern oder ausdrucken.',
      calendarBtn: '📅 Zum Kalender hinzufügen',
      printBtn: '🖨️ Voucher Herunterladen / Drucken',
      whatsappBtn: '💬 Über WhatsApp bestätigen',
      homeBtn: 'Zurück zur Startseite',
    },
    fr: {
      pageTitle: 'Réservation Confirmée avec Succès !',
      subtitle: (name) => <>Merci, <strong>{name}</strong>. Votre trajet à Madère est enregistré et notre équipe est informée.</>,
      emailAlert: (email) => <>Un e-mail de confirmation détaillé a été envoyé à <strong>{email}</strong></>,
      officialVoucher: 'Bon Numérique Officiel',
      refLabel: 'Référence',
      registered: '● Réservation Confirmée',
      roundTripBadge: '🔄 Aller-retour',
      holder: 'Titulaire de la Réservation',
      contact: 'Contact / Email',
      depDate: 'Date de départ',
      expectedTime: 'Heure prévue',
      retDate: 'Date de retour',
      retTime: 'Heure de retour',
      toArrange: 'À convenir',
      pickupSpot: 'Lieu de prise en charge / Hôtel',
      passengers: 'Passagers',
      paxUnit: (n) => `${n} ${n === 1 ? 'passager' : 'passagers'}`,
      flightNumber: 'Numéro de vol',
      paymentMethod: 'Mode de paiement',
      cardPayment: 'Carte Bancaire',
      totalVal: 'Montant Total',
      itineraryHeading: (count) => <><span>📍</span> Itinéraire Complet ({count} Arrêts)</>,
      instHeading: 'Instructions Importantes',
      airportInst: 'À l’Aéroport (FNC) : Votre chauffeur vous attendra dans les arrivées avec un panneau à votre nom.',
      hotelInst: 'À l’Hôtel / Adresse : Veuillez patienter à la réception 5 minutes avant l’heure prévue.',
      saveInst: 'Vous pouvez conserver ce bon sur votre téléphone ou l’imprimer.',
      calendarBtn: '📅 Ajouter au Calendrier',
      printBtn: '🖨️ Télécharger / Imprimer (PDF)',
      whatsappBtn: '💬 Confirmer sur WhatsApp',
      homeBtn: 'Retour à l’Accueil',
    },
    es: {
      pageTitle: '¡Reserva Confirmada con Éxito!',
      subtitle: (name) => <>Gracias, <strong>{name}</strong>. Su viaje en Madeira está registrado y nuestro equipo ha sido notificado.</>,
      emailAlert: (email) => <>Se ha enviado un comprobante a <strong>{email}</strong></>,
      officialVoucher: 'Voucher Digital Oficial',
      refLabel: 'Referencia',
      registered: '● Reserva Registrada',
      roundTripBadge: '🔄 Ida y Vuelta',
      holder: 'Titular de la Reserva',
      contact: 'Contacto / Email',
      depDate: 'Fecha del Viaje (Ida)',
      expectedTime: 'Hora Prevista',
      retDate: 'Fecha de Regreso (Vuelta)',
      retTime: 'Hora de Regreso',
      toArrange: 'A coordinar',
      pickupSpot: 'Lugar de Recogida / Hotel',
      passengers: 'Pasajeros',
      paxUnit: (n) => `${n} ${n === 1 ? 'pasajero' : 'pasajeros'}`,
      flightNumber: 'Número de Vuelo',
      paymentMethod: 'Método de Pago',
      cardPayment: 'Tarjeta de Crédito / Débito',
      totalVal: 'Importe Total',
      itineraryHeading: (count) => <><span>📍</span> Itinerario Completo ({count} Paradas)</>,
      instHeading: 'Instrucciones Importantes',
      airportInst: 'En el Aeropuerto (FNC): Su conductor le esperará en llegadas con un cartel con su nombre.',
      hotelInst: 'En el Hotel / Dirección: Por favor espere en recepción 5 minutos antes de la hora prevista.',
      saveInst: 'Puede guardar este voucher en su móvil o imprimirlo para mostrarlo al conductor.',
      calendarBtn: '📅 Añadir al Calendario',
      printBtn: '🖨️ Descargar / Imprimir (PDF)',
      whatsappBtn: '💬 Confirmar en WhatsApp',
      homeBtn: 'Volver a la Página Principal',
    },
  };

  const vT = voucherTexts[bookingLang] || voucherTexts.en;

  // Determine if this booking is actually an airport transfer
  const isAirportBooking = serviceId === 'airport-transfer' || 
    (serviceName && serviceName.toLowerCase().includes('airport')) ||
    (pickup && pickup.toLowerCase().includes('aeroporto')) ||
    Boolean(flightNumber);

  // Match adventure or tour to get the full itinerary
  const matchedAdventure = MADEIRA_ADVENTURES.find((a) => a.id === serviceId || a.title === serviceName || a.titlePt === serviceName);
  const matchedTour = TOURS_DATA.find((t) => t.id === serviceId || t.title === serviceName);
  const itineraryStops = matchedAdventure?.itinerary || matchedTour?.itinerary || null;

  const localizedServiceName = (bookingLang === 'pt' && matchedAdventure?.titlePt) 
    ? matchedAdventure.titlePt 
    : serviceName;

  const voucherWhatsAppMsg = makeWhatsAppUrl(
    `Olá! Acabei de efetuar a reserva ${bookingRef} para ${localizedServiceName} no dia ${bookingDate} às ${bookingTime}${isRoundTrip && returnDate ? ` com regresso a ${returnDate}` : ''}.`
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
          <h1 className="success-title">{vT.pageTitle}</h1>
          <p className="success-subtitle">
            {vT.subtitle(customerName)}
          </p>
          <div className="email-sent-alert">
            <span>✉️</span> {vT.emailAlert(customerEmail)}
          </div>
        </section>

        {/* Digital Voucher Ticket */}
        <section className="voucher-ticket">
          {/* Header */}
          <div className="voucher-header">
            <div>
              <h2 className="voucher-brand-title">{APP_CONFIG.NAME}</h2>
              <p className="voucher-brand-sub">{vT.officialVoucher}</p>
            </div>
            <div className="voucher-ref-box">
              <span className="voucher-ref-label">{vT.refLabel}</span>
              <span className="voucher-ref-code">{bookingRef}</span>
            </div>
          </div>

          {/* Body */}
          <div className="voucher-body">
            <div>
              <h3 className="voucher-service-title">{localizedServiceName}</h3>
              <div className="voucher-pills-row">
                <span className="voucher-status-pill confirmed">{vT.registered}</span>
                {isRoundTrip && (
                  <span className="voucher-status-pill roundtrip">{vT.roundTripBadge}</span>
                )}
              </div>
            </div>

            <div className="voucher-grid">
              <div className="voucher-item">
                <span className="voucher-item-label">{vT.holder}</span>
                <span className="voucher-item-value">{customerName}</span>
              </div>
              <div className="voucher-item">
                <span className="voucher-item-label">{vT.contact}</span>
                <span className="voucher-item-value">{customerEmail}{customerPhone ? ` · ${customerPhone}` : ''}</span>
              </div>
              <div className="voucher-item">
                <span className="voucher-item-label">{vT.depDate}</span>
                <span className="voucher-item-value">{bookingDate}</span>
              </div>
              <div className="voucher-item">
                <span className="voucher-item-label">{vT.expectedTime}</span>
                <span className="voucher-item-value">{bookingTime}</span>
              </div>
              {isRoundTrip && returnDate && (
                <>
                  <div className="voucher-item">
                    <span className="voucher-item-label">{vT.retDate}</span>
                    <span className="voucher-item-value voucher-item-value--return">🔄 {returnDate}</span>
                  </div>
                  <div className="voucher-item">
                    <span className="voucher-item-label">{vT.retTime}</span>
                    <span className="voucher-item-value">{returnTime || vT.toArrange}</span>
                  </div>
                </>
              )}
              <div className="voucher-item voucher-item--full">
                <span className="voucher-item-label">{vT.pickupSpot}</span>
                <span className="voucher-item-value">{pickup}</span>
              </div>
              <div className="voucher-item">
                <span className="voucher-item-label">{vT.passengers}</span>
                <span className="voucher-item-value">{vT.paxUnit(passengers)}</span>
              </div>
              {flightNumber ? (
                <div className="voucher-item">
                  <span className="voucher-item-label">{vT.flightNumber}</span>
                  <span className="voucher-item-value">✈️ {flightNumber}</span>
                </div>
              ) : null}
              <div className="voucher-item">
                <span className="voucher-item-label">{vT.paymentMethod}</span>
                <span className="voucher-item-value">
                  {paymentMethod === 'stripe_card' ? vT.cardPayment : paymentMethod === 'whatsapp_manual' ? 'WhatsApp' : paymentMethod}
                </span>
              </div>
              <div className="voucher-item">
                <span className="voucher-item-label">{vT.totalVal}</span>
                <span className="voucher-item-value voucher-item-value--price">{totalAmount}</span>
              </div>
            </div>

            {/* Full Itinerary Section when available (e.g. Adventures & Tours) */}
            {itineraryStops && itineraryStops.length > 0 && (
              <div className="voucher-itinerary-section">
                <h4 className="voucher-itinerary-title">
                  {vT.itineraryHeading(itineraryStops.length)}
                </h4>
                <div className="voucher-itinerary-timeline">
                  {itineraryStops.map((item, idx) => {
                    const stepNum = item.step || (idx + 1);
                    const stepTitle = (bookingLang === 'pt' && item.titlePt) ? item.titlePt : item.title;
                    const stepDesc = (bookingLang === 'pt' && item.descPt) ? item.descPt : item.desc;
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
            <h4 className="voucher-inst-title">{vT.instHeading}</h4>
            <ul className="voucher-inst-list">
              {isAirportBooking && (
                <li>{vT.airportInst}</li>
              )}
              <li>{vT.hotelInst}</li>
              <li>{vT.saveInst}</li>
            </ul>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="voucher-actions">
          <button
            type="button"
            onClick={() => downloadCalendarEvent({
              booking_ref: bookingRef,
              service_name: localizedServiceName,
              booking_date: bookingDate,
              booking_time: bookingTime,
              pickup_location: pickup,
            })}
            className="voucher-btn voucher-btn--calendar"
          >
            {vT.calendarBtn}
          </button>
          <button type="button" onClick={handlePrint} className="voucher-btn voucher-btn--print">
            {vT.printBtn}
          </button>
          <a
            href={voucherWhatsAppMsg}
            target="_blank"
            rel="noopener noreferrer"
            className="voucher-btn voucher-btn--whatsapp"
          >
            {vT.whatsappBtn}
          </a>
          <Link to="/" className="voucher-btn voucher-btn--home">
            {vT.homeBtn}
          </Link>
        </div>

      </div>
    </div>
  );
}
