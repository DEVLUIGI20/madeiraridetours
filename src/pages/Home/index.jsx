import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TOURS_DATA } from '../../constants/toursCatalog';
import { AIRPORT_TRANSFER_LOCATIONS } from '../../constants/transfersCatalog';
import { getAirportLocations } from '../../services/catalogService';
import { useLanguage } from '../../hooks/useLanguage';
import TourCard from '../../components/common/TourCard';
import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import DestinationDropdown from '../../components/common/DestinationDropdown';
import usePageTitle from '../../hooks/usePageTitle';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const { t, currentLang } = useLanguage();
  usePageTitle(
    t('hero.slide1Title')?.replace('\n', ' ') || 'Transfers Privados & Passeios na Madeira',
    t('hero.slide1Subtitle') || 'Transfers privados com motoristas profissionais na Ilha da Madeira.'
  );

  // Transfers routing: Origin is fixed to Airport (FNC)
  const fromLoc = 'airport';
  const [destLoc, setDestLoc] = useState('funchal');
  const [tripType, setTripType] = useState('one-way');
  const [date, setDate] = useState('');
  const [pickupTime, setPickupTime] = useState('10:00'); // Time of pickup requested
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('14:00');
  const [passengers, setPassengers] = useState(1);
  const [locations, setLocations] = useState(AIRPORT_TRANSFER_LOCATIONS);

  useEffect(() => {
    let isMounted = true;
    getAirportLocations().then((liveLocations) => {
      if (isMounted && liveLocations && liveLocations.length > 0) {
        setLocations(liveLocations);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const featuredTours = TOURS_DATA.filter((t) => t.featured);

  // Dynamic pricing calculation directly synced with Supabase live locations
  const selectedLocation = locations.find((l) => l.id === destLoc) || locations[0];
  const estimatedPrice = selectedLocation
    ? (tripType === 'round-trip' ? selectedLocation.roundTripPrice : selectedLocation.oneWayPrice)
    : 30;
  const estimatedDuration = selectedLocation?.duration || '~25 min';

  const getLabel = (id) => {
    if (id === 'airport') return 'Madeira Airport (FNC)';
    const found = locations.find((l) => l.id === id);
    return found ? found.name : id;
  };

  const handleBook = (e) => {
    e.preventDefault();
    const originLabel = getLabel(fromLoc);
    const destLabel = getLabel(destLoc);

    const queryParams = new URLSearchParams({
      service: fromLoc === 'airport' || destLoc === 'airport' ? 'airport-transfer' : 'point-to-point-transfer',
      from: originLabel,
      dropoff: destLabel,
      tripType,
      date: date || new Date().toISOString().split('T')[0],
      time: pickupTime,
      pax: passengers.toString(),
      price: estimatedPrice.toString(),
      duration: estimatedDuration,
    });

    if (tripType === 'round-trip' && returnDate) {
      queryParams.append('returnDate', returnDate);
      queryParams.append('returnTime', returnTime);
    }

    navigate(`/booking?${queryParams.toString()}`);
  };

  return (
    <div className="home-mockup">
      {/* ── 1. Hero Section with Background Canvas & Floating Booking Bar ── */}
      <section className="home-hero">
        <div className="home-hero__bg">
          <ImagePlaceholder
            alt="Madeira Panoramic Banner"
            className="home-hero__img"
            height="100%"
          />
          <div className="home-hero__overlay" />
        </div>

        <div className="home-hero__content container-constrained">
          <span className="home-hero__tag">{currentLang === 'pt' ? 'EXPLORAR A MADEIRA' : 'EXPLORE MADEIRA'}</span>
          <h1 className="home-hero__title">
            {currentLang === 'pt' ? (
              <>Passeios Inesquecíveis<br />& Transfers</>
            ) : currentLang === 'de' ? (
              <>Unvergessliche Touren<br />& Transfers</>
            ) : currentLang === 'fr' ? (
              <>Circuits Inoubliables<br />& Transferts</>
            ) : currentLang === 'es' ? (
              <>Tours Inolvidables<br />& Traslados</>
            ) : (
              <>Unforgettable Tours<br />& Transfers</>
            )}
          </h1>
          <p className="home-hero__subtitle">
            {currentLang === 'pt'
              ? 'Transfers privados e pontuais do aeroporto e por toda a Madeira com preços fixos garantidos.'
              : currentLang === 'de'
              ? 'Zuverlässige private Flughafen- und Inseltransfers mit festen Festpreisen im Voraus.'
              : currentLang === 'fr'
              ? 'Transferts privés fiables depuis l’aéroport et sur toute l’île avec des tarifs fixes.'
              : currentLang === 'es'
              ? 'Traslados privados confiables desde el aeropuerto y por toda la isla con precios fijos.'
              : 'Reliable private airport & island-wide transfers between any zones with upfront fixed prices.'}
          </p>

          {/* Trip Type Selector (One-way / Round-trip) */}
          <div className="home-trip-type-toggle">
            <button
              type="button"
              className={`trip-type-btn ${tripType === 'one-way' ? 'active' : ''}`}
              onClick={() => setTripType('one-way')}
            >
              {currentLang === 'pt' ? 'Ida' : currentLang === 'de' ? 'Einfache Fahrt' : currentLang === 'fr' ? 'Aller simple' : currentLang === 'es' ? 'Solo ida' : 'One Way'}
            </button>
            <button
              type="button"
              className={`trip-type-btn ${tripType === 'round-trip' ? 'active' : ''}`}
              onClick={() => setTripType('round-trip')}
            >
              {currentLang === 'pt' ? 'Ida e Volta' : currentLang === 'de' ? 'Hin- und Rückfahrt' : currentLang === 'fr' ? 'Aller-retour' : currentLang === 'es' ? 'Ida y vuelta' : 'Round Trip'}
            </button>
          </div>

          {/* Floating Booking Bar */}
          <form onSubmit={handleBook} className={`home-search-bar ${tripType === 'round-trip' ? 'home-search-bar--roundtrip' : ''}`}>
            {/* FROM - Fixed Departure from Airport */}
            <div className="search-field search-field--fixed-airport">
              <span className="search-field__label">
                {currentLang === 'pt' ? 'Partida (Aeroporto)' : currentLang === 'de' ? 'Abfahrt (Flughafen)' : currentLang === 'fr' ? 'Départ (Aéroport)' : currentLang === 'es' ? 'Origen (Aeropuerto)' : 'From (Partida)'}
              </span>
              <div className="search-field__fixed-val">
                <span className="fixed-val__icon">✈️</span>
                <div className="fixed-val__text">
                  <strong>Madeira Airport (FNC)</strong>
                  <small>{currentLang === 'pt' ? 'Aeroporto Internacional Cristiano Ronaldo' : 'Cristiano Ronaldo International Airport'}</small>
                </div>
              </div>
            </div>

            {/* DESTINATION - Rich Dropdown */}
            <div className="search-field search-field--custom-dropdown">
              <DestinationDropdown
                selectedId={destLoc}
                tripType={tripType}
                onChange={(newId) => setDestLoc(newId)}
                label={currentLang === 'pt' ? 'Destino' : currentLang === 'de' ? 'Zielort' : currentLang === 'fr' ? 'Destination' : currentLang === 'es' ? 'Destino' : 'Destination'}
                allowAirport={false}
                disabledId="airport"
                showPrice={true}
                showDuration={true}
              />
            </div>

            {/* DATE */}
            <div className="search-field search-field--date search-field--departure-date">
              <span className="search-field__label">
                {tripType === 'round-trip'
                  ? (currentLang === 'pt' ? 'Data de Partida (Ida)' : currentLang === 'de' ? 'Hinfahrt-Datum' : currentLang === 'fr' ? 'Date de départ' : 'Departure Date')
                  : (currentLang === 'pt' ? 'Data da Viagem' : currentLang === 'de' ? 'Datum' : currentLang === 'fr' ? 'Date' : 'Date')}
              </span>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="search-field__input"
              />
            </div>

            {/* TIME OF PICKUP */}
            <div className="search-field search-field--time search-field--departure-time">
              <span className="search-field__label">
                {currentLang === 'pt' ? 'Hora de Recolha' : currentLang === 'de' ? 'Abholzeit' : currentLang === 'fr' ? 'Heure de départ' : 'Pick-up Time'}
              </span>
              <input
                type="time"
                required
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="search-field__input"
              />
            </div>

            {/* RETURN DATE & TIME (If Round Trip) */}
            {tripType === 'round-trip' && (
              <>
                <div className="search-field search-field--date search-field--return-date">
                  <span className="search-field__label">
                    {currentLang === 'pt' ? 'Data de Regresso (Volta)' : currentLang === 'de' ? 'Rückfahrt-Datum' : currentLang === 'fr' ? 'Date de retour' : 'Return Date'}
                  </span>
                  <input
                    type="date"
                    required
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="search-field__input"
                  />
                </div>
                <div className="search-field search-field--time search-field--return-time">
                  <span className="search-field__label">
                    {currentLang === 'pt' ? 'Hora de Regresso' : currentLang === 'de' ? 'Rückfahrt-Uhrzeit' : currentLang === 'fr' ? 'Heure de retour' : 'Return Time'}
                  </span>
                  <input
                    type="time"
                    required
                    value={returnTime}
                    onChange={(e) => setReturnTime(e.target.value)}
                    className="search-field__input"
                  />
                </div>
              </>
            )}

            {/* PASSENGERS */}
            <div className="search-field search-field--pax">
              <span className="search-field__label">
                {currentLang === 'pt' ? 'Passageiros' : currentLang === 'de' ? 'Passagiere' : currentLang === 'fr' ? 'Passagers' : 'Passengers'}
              </span>
              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="search-field__input search-field__input--pax"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 
                      ? (currentLang === 'pt' ? 'Passageiro' : currentLang === 'de' ? 'Passagier' : currentLang === 'fr' ? 'Passager' : 'Passenger')
                      : (currentLang === 'pt' ? 'Passageiros' : currentLang === 'de' ? 'Passagiere' : currentLang === 'fr' ? 'Passagers' : 'Passengers')}
                  </option>
                ))}
              </select>
            </div>

            {/* BOOK BUTTON WITH LIVE PRICE */}
            <button type="submit" className="home-search-btn home-book-btn">
              <span>{currentLang === 'pt' ? 'Reservar' : currentLang === 'de' ? 'Buchen' : currentLang === 'fr' ? 'Réserver' : currentLang === 'es' ? 'Reservar' : 'Book'} (€{estimatedPrice})</span>
              <span aria-hidden="true">→</span>
            </button>
          </form>
        </div>
      </section>

      {/* ── 2. Four Feature Value Props ── */}
      <section className="home-features container-constrained">
        <div className="home-features__grid">
          <div className="feature-item">
            <span className="feature-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </span>
            <div>
              <h3 className="feature-item__title">
                {currentLang === 'pt' ? 'Pagamentos Seguros' : currentLang === 'de' ? 'Sichere Zahlungen' : currentLang === 'fr' ? 'Paiements Sécurisés' : 'Secure Payments'}
              </h3>
              <p className="feature-item__desc">
                {currentLang === 'pt' ? 'Processado via Stripe' : currentLang === 'de' ? 'Über Stripe' : currentLang === 'fr' ? 'Propulsé par Stripe' : 'Powered by Stripe'}
              </p>
            </div>
          </div>

          <div className="feature-item">
            <span className="feature-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <div>
              <h3 className="feature-item__title">
                {currentLang === 'pt' ? 'Apoio 24/7' : currentLang === 'de' ? '24/7 Kundenservice' : currentLang === 'fr' ? 'Support 24/7' : '24/7 Support'}
              </h3>
              <p className="feature-item__desc">
                {currentLang === 'pt' ? 'Sempre disponíveis para ajudar' : currentLang === 'de' ? 'Wir helfen gerne' : currentLang === 'fr' ? 'À votre écoute' : "We're here to help"}
              </p>
            </div>
          </div>

          <div className="feature-item">
            <span className="feature-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </span>
            <div>
              <h3 className="feature-item__title">
                {currentLang === 'pt' ? 'Passeios de Topo' : currentLang === 'de' ? 'Bestbewertete Touren' : currentLang === 'fr' ? 'Circuits Populaires' : 'Top Rated Tours'}
              </h3>
              <p className="feature-item__desc">
                {currentLang === 'pt' ? '5.0 de mais de 1.000 avaliações' : currentLang === 'de' ? '5.0 aus 1.000+ Bewertungen' : currentLang === 'fr' ? '5.0 sur 1 000+ avis' : '5.0 from 1,000+ reviews'}
              </p>
            </div>
          </div>

          <div className="feature-item">
            <span className="feature-item__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </span>
            <div>
              <h3 className="feature-item__title">
                {currentLang === 'pt' ? 'Transfers Confortáveis' : currentLang === 'de' ? 'Komfortable Transfers' : currentLang === 'fr' ? 'Transferts Confortables' : 'Comfortable Transfers'}
              </h3>
              <p className="feature-item__desc">
                {currentLang === 'pt' ? 'Viagens seguras e com estilo' : currentLang === 'de' ? 'Stilvoll und sicher reisen' : currentLang === 'fr' ? 'Voyagez avec confort et sécurité' : 'Travel in style & safety'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Popular Tours: Our Top Experiences ── */}
      <section className="home-top-experiences container-constrained">
        <div className="section-head">
          <div>
            <span className="section-head__tag">
              {currentLang === 'pt' ? 'PASSEIOS POPULARES' : currentLang === 'de' ? 'BELIEBTE TOUREN' : currentLang === 'fr' ? 'CIRCUITS POPULAIRES' : 'POPULAR TOURS'}
            </span>
            <h2 className="section-head__title">
              {currentLang === 'pt' ? 'As Nossas Melhores Experiências' : currentLang === 'de' ? 'Unsere besten Erlebnisse' : currentLang === 'fr' ? 'Nos Meilleures Expériences' : 'Our Top Experiences'}
            </h2>
          </div>
          <Link to="/tours" className="section-head__all-link">
            {currentLang === 'pt' ? 'Ver Todos os Passeios →' : currentLang === 'de' ? 'Alle Touren ansehen →' : currentLang === 'fr' ? 'Voir Tous les Circuits →' : 'View All Tours →'}
          </Link>
        </div>

        <div className="experiences-grid">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>
    </div>
  );
}
