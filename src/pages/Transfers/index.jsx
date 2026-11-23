import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { MADEIRA_ADVENTURES, AIRPORT_TRANSFER_LOCATIONS } from '../../constants/transfersCatalog';
import { getAirportLocations } from '../../services/catalogService';
import { bookingService } from '../../services/bookingService';
import { useLanguage } from '../../hooks/useLanguage';
import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import DestinationDropdown from '../../components/common/DestinationDropdown';
import DatePicker from '../../components/common/DatePicker';
import usePageTitle from '../../hooks/usePageTitle';
import '../../components/common/TourCard.css';
import './Transfers.css';

/**
 * Subcomponente para renderizar a mídia da aventura com slideshow autónomo e isolado
 */
function AdventureCardMedia({ adv, advTitle, isSelected, selectedLabel, advBadge }) {
  const images = Array.isArray(adv.image) ? adv.image : (adv.image ? [adv.image] : []);
  const hasMultipleImages = images.length > 1;
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!hasMultipleImages) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [hasMultipleImages, images.length]);

  return (
    <div className="adventure-media mini">
      {hasMultipleImages ? (
        <div className="tour-card-mockup__slideshow">
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`${advTitle} — ${i + 1}`}
              className={`tour-card-mockup__slide${i === activeIdx ? ' tour-card-mockup__slide--active' : ''}`}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
          <div className="tour-card-mockup__kb-overlay" />
        </div>
      ) : (
        <ImagePlaceholder
          src={images[0] || null}
          alt={advTitle}
          height="140px"
        />
      )}
      <span className="adventure-badge">{advBadge}</span>
      {isSelected && (
        <span className="selected-tag">{selectedLabel}</span>
      )}
      {hasMultipleImages && (
        <div className="tour-card-mockup__dots">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`tour-card-mockup__dot${i === activeIdx ? ' tour-card-mockup__dot--active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIdx(i);
              }}
              aria-label={`Foto ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Transfers() {
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const todayDateStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  usePageTitle(
    currentLang === 'pt'
      ? 'Transfers & Aventuras na Ilha da Madeira'
      : currentLang === 'de'
      ? 'Transfers & Abenteuer auf der Insel Madeira'
      : currentLang === 'fr'
      ? 'Transferts & Aventures sur l’île de Madère'
      : currentLang === 'es'
      ? 'Traslados y Aventuras en la Isla de Madeira'
      : 'Transfers & Adventures in Madeira Island',
    currentLang === 'pt'
      ? 'Transfers para levadas, Pico do Areeiro, Fanal e aeroporto FNC. Viatura privada até 8 passageiros.'
      : 'Transfers to levadas, Pico do Areeiro, Fanal and airport FNC. Private vehicle up to 8 passengers.'
  );

  // Selected adventure state - null on initial load so user chooses an adventure
  const [selectedAdventure, setSelectedAdventure] = useState(null);
  const [modalAdventure, setModalAdventure] = useState(null); // For detailed Itinerary modal popup

  // Form states on the left
  const [pickupId, setPickupId] = useState('funchal');
  const [date, setDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [groupSize, setGroupSize] = useState('4');
  const [locations, setLocations] = useState(AIRPORT_TRANSFER_LOCATIONS);
  const [blockedDates, setBlockedDates] = useState([]);

  useEffect(() => {
    let isMounted = true;
    getAirportLocations().then((liveLocations) => {
      if (isMounted && liveLocations && liveLocations.length > 0) {
        setLocations(liveLocations);
      }
    });
    bookingService.getBlockedDates().then((res) => {
      if (isMounted && res.success && res.data) {
        setBlockedDates(res.data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const pickupLoc = locations.find((l) => l.id === pickupId) || locations[0];

  // Compute price: if an adventure is selected use its price, otherwise use the one‑way price of the chosen pickup location
  const currentPrice = selectedAdventure
    ? (groupSize === '4' ? selectedAdventure.price4 : selectedAdventure.price8)
    : (pickupLoc?.oneWayPrice || 30);

  const handleSelectAdventure = (adv) => {
    if (selectedAdventure?.id === adv.id) {
      setSelectedAdventure(null);
      setSelectedTimeSlot('');
      return;
    }

    setSelectedAdventure(adv);
    setSelectedTimeSlot(adv.timeSlots[0].time);

    const formBox = document.getElementById('transfer-booking-form');
    if (formBox && window.innerWidth < 860) {
      formBox.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClearSelection = () => {
    setSelectedAdventure(null);
    setSelectedTimeSlot('');
  };

  const handleBook = (e) => {
    e.preventDefault();
    if (!selectedAdventure) return;

    if (date && blockedDates.includes(date)) {
      alert(currentLang === 'pt'
        ? `Lamentamos, mas a data ${date} encontra-se esgotada/bloqueada para reservas. Por favor escolha outra data.`
        : `Sorry, date ${date} is unavailable/blocked. Please select another date.`);
      return;
    }

    const queryParams = new URLSearchParams({
      service: selectedAdventure.id,
      adventureTitle: selectedAdventure.title,
      pickup: pickupLoc.name,
      date: date || new Date().toISOString().split('T')[0],
      time: selectedTimeSlot || selectedAdventure.timeSlots[0].time,
      pax: groupSize === '4' ? '4' : '8',
      price: currentPrice.toString(),
      duration: selectedAdventure.duration,
    });

    navigate(`/booking?${queryParams.toString()}`);
  };

  return (
    <div className="transfers-mockup-page">
      {/* ── Sub-Hero Banner ── */}
      <section className="transfers-hero">
        <div className="transfers-hero-bg">
          <ImagePlaceholder
            src="/images/transfers-adventures-hero.jpg"
            alt="Madeira Natural Pools & Adventures"
            height="100%"
          />
          <div className="transfers-hero-overlay" />
        </div>
        <div className="transfers-hero-content container-constrained">
          <h1 className="transfers-hero-title">
            {currentLang === 'pt' ? 'Aventuras na Madeira' : currentLang === 'de' ? 'Abenteuer auf Madeira' : currentLang === 'fr' ? 'Aventures à Madère' : currentLang === 'es' ? 'Aventuras en Madeira' : 'Adventures in Madeira'}
          </h1>
          <p className="transfers-hero-subtitle">
            {currentLang === 'pt'
              ? 'Excursões privadas na ilha, miradouros panorâmicos e transfers porta a porta.'
              : currentLang === 'de'
              ? 'Private Inselausflüge, Touren zu Aussichtspunkten & Tür-zu-Tür-Hoteltransfers.'
              : currentLang === 'fr'
              ? 'Excursions privées sur l’île, visites de belvédères et transferts porte-à-porte.'
              : currentLang === 'es'
              ? 'Excursiones privadas por la isla, miradores panorámicos y traslados puerta a puerta.'
              : 'Private island excursions, scenic viewpoint tours & door-to-door hotel transfers.'}
          </p>
        </div>
      </section>

      {/* ── Main Section: Booking Form (Left) + Super Compact Adventures Grid (Right) ── */}
      <section className="transfers-main-section container-constrained">
        <div className="transfers-adventure-layout">
          {/* Left Form Card: Book Your Adventure */}
          <aside className="transfer-booking-card" id="transfer-booking-form">
            <span className="booking-card-tag">
              {currentLang === 'pt' ? 'EXCURSÃO' : currentLang === 'de' ? 'AUSFLUG' : currentLang === 'fr' ? 'EXCURSION' : 'EXCURSION'}
            </span>
            <h2>
              {currentLang === 'pt' ? 'Reserve a sua Aventura' : currentLang === 'de' ? 'Buchen Sie Ihr Abenteuer' : currentLang === 'fr' ? 'Réservez Votre Aventure' : currentLang === 'es' ? 'Reserve su Aventura' : 'Book Your Adventure'}
            </h2>

            {selectedAdventure ? (
              <>
                {/* Selected Adventure Summary */}
                <div className="selected-adventure-badge">
                  <div className="badge-header">
                    <span className="badge-label">
                      {currentLang === 'pt' ? 'Experiência Selecionada:' : currentLang === 'de' ? 'Gewähltes Erlebnis:' : currentLang === 'fr' ? 'Expérience Sélectionnée:' : 'Selected Experience:'}
                    </span>
                    <div className="badge-actions-group">
                      <span className="badge-duration">{selectedAdventure.badge}</span>
                      <button
                        type="button"
                        className="badge-remove-btn"
                        onClick={handleClearSelection}
                        title={currentLang === 'pt' ? 'Remover seleção' : 'Remove selection'}
                        aria-label="Remove selection"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <strong className="badge-title">{selectedAdventure.title}</strong>
                  <div className="badge-timing-preview">
                    <span>⏱ {currentLang === 'pt' ? 'Recolha:' : 'Selected Pick-up:'} <strong>{selectedTimeSlot}</strong></span>
                  </div>
                </div>

                <form onSubmit={handleBook} className="transfer-form">
                  {/* Pickup Zone Dropdown without duration label */}
                  <div className="transfer-form-group">
                    <DestinationDropdown
                      selectedId={pickupId}
                      tripType="one-way"
                      onChange={(newId) => setPickupId(newId)}
                      label={currentLang === 'pt' ? 'Local de Recolha / Zona' : currentLang === 'de' ? 'Abholort / Zone' : currentLang === 'fr' ? 'Lieu de prise en charge' : 'Pick-up Location / Zone'}
                      allowAirport={false}
                      disabledId="airport"
                      showPrice={false}
                      showDuration={false}
                    />
                  </div>

                  {/* Date */}
                  <div className="transfer-form-group">
                    <span className="transfer-form-label">
                      {currentLang === 'pt' ? 'Data da Aventura' : currentLang === 'de' ? 'Datum' : currentLang === 'fr' ? 'Date de l’aventure' : 'Date of Adventure'}
                    </span>
                    <DatePicker
                      value={date}
                      onChange={(newVal) => setDate(newVal)}
                      blockedDates={blockedDates}
                      minDate={todayDateStr}
                      language={currentLang}
                      placeholder="dd/mm/aaaa"
                    />
                  </div>

                  {/* Shift / Pick-up Time Options */}
                  <div className="transfer-form-group">
                    <span className="transfer-form-label">
                      {selectedAdventure.isHalfDay 
                        ? (currentLang === 'pt' ? 'Hora de Partida (Escolha o Turno)' : 'Departure Time (Choose Shift)') 
                        : (currentLang === 'pt' ? 'Hora de Partida' : 'Departure Time')}
                    </span>

                    {selectedAdventure.isHalfDay ? (
                      <div className="shift-options-grid">
                        {selectedAdventure.timeSlots.map((slot) => {
                          const isActive = selectedTimeSlot === slot.time;
                          return (
                            <button
                              key={slot.id}
                              type="button"
                              className={`shift-pill-btn ${isActive ? 'active' : ''}`}
                              onClick={() => setSelectedTimeSlot(slot.time)}
                            >
                              <span className="shift-label">{slot.label}</span>
                              <strong className="shift-time">{slot.time}</strong>
                              <span className="shift-ret">{currentLang === 'pt' ? 'Regresso' : 'Return'} ~{slot.returnTime}</span>
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="single-shift-box">
                        <span className="shift-label">{currentLang === 'pt' ? 'Partida Dia Inteiro' : 'Full Day Departure'}</span>
                        <strong className="shift-time">{selectedAdventure.timeSlots[0].time}</strong>
                        <span className="shift-ret">{currentLang === 'pt' ? 'Regresso' : 'Return'} ~{selectedAdventure.timeSlots[0].returnTime}</span>
                      </div>
                    )}
                  </div>

                  {/* Group Size / Vehicle Tier */}
                  <div className="transfer-form-group">
                    <span className="transfer-form-label">
                      {currentLang === 'pt' ? 'Passageiros / Viatura' : currentLang === 'de' ? 'Passagiere / Fahrzeug' : 'Passengers / Vehicle Size'}
                    </span>
                    <div className="group-size-toggle">
                      <button
                        type="button"
                        className={`tier-btn ${groupSize === '4' ? 'active' : ''}`}
                        onClick={() => setGroupSize('4')}
                      >
                        <span>1–4 {currentLang === 'pt' ? 'pessoas' : currentLang === 'de' ? 'Personen' : 'people'}</span>
                        <strong>{selectedAdventure.price4}€</strong>
                      </button>
                      <button
                        type="button"
                        className={`tier-btn ${groupSize === '8' ? 'active' : ''}`}
                        onClick={() => setGroupSize('8')}
                      >
                        <span>5–8 {currentLang === 'pt' ? 'pessoas' : currentLang === 'de' ? 'Personen' : 'people'}</span>
                        <strong>{selectedAdventure.price8}€</strong>
                      </button>
                    </div>
                  </div>

                  {/* Highlights & Logistics */}
                  <div className="selected-adv-highlights">
                    <span className="highlights-label">{currentLang === 'pt' ? 'Logística de Recolha:' : 'Pick-up Logistics:'}</span>
                    <p className="adv-pickup-desc">
                      {currentLang === 'pt' 
                        ? `Recolha direta no seu hotel ou alojamento em ${pickupLoc.name}` 
                        : `Direct pick-up at your Hotel / Accommodation in ${pickupLoc.name}`}
                    </p>

                    <div className="adv-itinerary-preview-row">
                      <span className="highlights-label" style={{ margin: 0 }}>{currentLang === 'pt' ? 'Itinerário:' : 'Full Itinerary:'}</span>
                      <button
                        type="button"
                        className="view-full-itinerary-btn"
                        onClick={() => setModalAdventure(selectedAdventure)}
                      >
                        {currentLang === 'pt' ? 'Ver Paragens →' : 'View Stops →'}
                      </button>
                    </div>
                  </div>

                  <div className="transfer-estimate-row">
                    <span>{currentLang === 'pt' ? 'Total Excursão Privada:' : 'Total Private Tour:'}</span>
                    <strong className="estimate-total-val">{currentPrice}€</strong>
                  </div>

                  <button type="submit" className="transfer-submit-btn">
                    {currentLang === 'pt' ? `Reservar Aventura (${currentPrice}€) →` : currentLang === 'de' ? `Abenteuer Buchen (${currentPrice}€) →` : `Book Adventure (${currentPrice}€) →`}
                  </button>
                </form>
              </>
            ) : (
              /* Empty state / placeholder prompt when no adventure is selected */
              <div className="adventure-empty-selection">
                <div className="empty-selection-icon">🧭</div>
                <h3 className="empty-selection-title">
                  {currentLang === 'pt' ? 'Selecione uma Aventura' : currentLang === 'de' ? 'Wählen Sie ein Abenteuer' : currentLang === 'fr' ? 'Sélectionnez une Aventure' : 'Select an Adventure'}
                </h3>
                <p className="empty-selection-desc">
                  {currentLang === 'pt'
                    ? 'Escolha uma das excursões nos cartões ao lado para ver detalhes, configurar horários de recolha e prosseguir para a reserva.'
                    : currentLang === 'de'
                    ? 'Wählen Sie einen Ausflug aus den Karten rechts, um Details zu sehen und zu buchen.'
                    : 'Choose one of the island excursions from the cards on the right to view details, configure pick-up times, and proceed to booking.'}
                </p>
                <div className="empty-selection-hint">
                  <span>👉 {currentLang === 'pt' ? 'Clique em' : 'Click'} <strong>"{currentLang === 'pt' ? 'Reservar' : 'Book'}"</strong> {currentLang === 'pt' ? 'num cartão para começar' : 'on any card to start'}</span>
                </div>
              </div>
            )}
          </aside>

          {/* Right: Adventures Grid */}
          <main className="adventures-showcase-container">
            <div className="adventures-section-header">
              <p className="adventures-subtitle">
                {currentLang === 'pt'
                  ? 'Selecione uma aventura abaixo ou clique em "Ver Itinerário" para consultar todas as paragens panorâmicas.'
                  : 'Select an adventure below or click "View Itinerary" to inspect all scenic stops and timings.'}
              </p>
            </div>

            <div className="adventures-grid">
              {MADEIRA_ADVENTURES.map((adv) => {
                const isSelected = selectedAdventure?.id === adv.id;
                const langSuffix = currentLang.charAt(0).toUpperCase() + currentLang.slice(1);
                const advTitle = (currentLang !== 'en' && adv[`title${langSuffix}`]) ? adv[`title${langSuffix}`] : (adv.titlePt && currentLang === 'pt' ? adv.titlePt : adv.title);
                const advBadge = (currentLang !== 'en' && adv[`badge${langSuffix}`]) ? adv[`badge${langSuffix}`] : (adv.badgePt && currentLang === 'pt' ? adv.badgePt : adv.badge);
                const advOverview = (currentLang !== 'en' && adv[`overview${langSuffix}`]) ? adv[`overview${langSuffix}`] : (adv.overviewPt && currentLang === 'pt' ? adv.overviewPt : adv.overview);
                const advPickup = (currentLang !== 'en' && adv[`pickupTime${langSuffix}`]) ? adv[`pickupTime${langSuffix}`] : (adv.pickupTimePt && currentLang === 'pt' ? adv.pickupTimePt : adv.pickupTime);

                const hotelPickupLabel = {
                  pt: 'Recolha no Hotel',
                  de: 'Hotel-Abholung',
                  fr: 'Prise en charge hôtel',
                  es: 'Recogida en el Hotel',
                  en: 'Hotel Pick-up'
                }[currentLang] || 'Hotel Pick-up';

                const itineraryLabel = {
                  pt: `Ver Itinerário (${adv.itinerary.length} paragens)`,
                  de: `Reiseverlauf ansehen (${adv.itinerary.length} Stopps)`,
                  fr: `Voir l'itinéraire (${adv.itinerary.length} arrêts)`,
                  es: `Ver Itinerario (${adv.itinerary.length} paradas)`,
                  en: `View Full Itinerary (${adv.itinerary.length} stops)`
                }[currentLang] || `View Full Itinerary (${adv.itinerary.length} stops)`;

                const passengersLabel = {
                  pt: 'Passageiros',
                  de: 'Passagiere',
                  fr: 'Passagers',
                  es: 'Pasajeros',
                  en: 'Passengers'
                }[currentLang] || 'Passengers';

                const selectedLabel = {
                  pt: 'Selecionado ✓',
                  de: 'Ausgewählt ✓',
                  fr: 'Sélectionné ✓',
                  es: 'Seleccionado ✓',
                  en: 'Selected ✓'
                }[currentLang] || 'Selected ✓';

                const bookLabel = {
                  pt: 'Reservar',
                  de: 'Buchen',
                  fr: 'Réserver',
                  es: 'Reservar',
                  en: 'Book'
                }[currentLang] || 'Book';

                return (
                  <article
                    key={adv.id}
                    className={`adventure-card mini ${isSelected ? 'active-card' : ''}`}
                  >
                    <AdventureCardMedia
                      adv={adv}
                      advTitle={advTitle}
                      isSelected={isSelected}
                      selectedLabel={selectedLabel}
                      advBadge={advBadge}
                    />

                    <div className="adventure-body mini">
                      <h3 className="adventure-name">{advTitle}</h3>

                      <div className="adventure-logistics-bar">
                        <span className="logistics-item">
                          <span className="icon">🕒</span> {advPickup}
                        </span>
                        <span className="logistics-item">
                          <span className="icon">📍</span> {hotelPickupLabel}
                        </span>
                      </div>

                      <p className="adventure-desc-text">{advOverview}</p>

                      <div className="adventure-itinerary-action">
                        <button
                          type="button"
                          className="itinerary-link-btn"
                          onClick={() => setModalAdventure(adv)}
                        >
                          <span className="icon">🗺️</span>
                          <span>{itineraryLabel}</span>
                        </button>
                      </div>

                      <div className="adventure-footer mini">
                        <div className="adventure-pricing">
                          <div className="price-line">
                            <span className="pax">1–4 {passengersLabel}</span>
                            <strong className="amt">{adv.price4}€</strong>
                          </div>
                          <div className="price-line">
                            <span className="pax">5–8 {passengersLabel}</span>
                            <strong className="amt">{adv.price8}€</strong>
                          </div>
                        </div>

                        <button
                          type="button"
                          className={`adventure-book-btn ${isSelected ? 'active' : ''}`}
                          onClick={() => handleSelectAdventure(adv)}
                          title={isSelected ? 'Click to unselect / Desselecionar' : 'Click to select / Reservar'}
                        >
                          {isSelected ? selectedLabel : bookLabel}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </main>
        </div>
      </section>

      {/* ── Full Itinerary Modal Dialog ── */}
      {modalAdventure && (() => {
        const langSuffix = currentLang.charAt(0).toUpperCase() + currentLang.slice(1);
        const mBadge = (currentLang !== 'en' && modalAdventure[`badge${langSuffix}`]) ? modalAdventure[`badge${langSuffix}`] : (modalAdventure.badgePt && currentLang === 'pt' ? modalAdventure.badgePt : modalAdventure.badge);
        const mTitle = (currentLang !== 'en' && modalAdventure[`title${langSuffix}`]) ? modalAdventure[`title${langSuffix}`] : (modalAdventure.titlePt && currentLang === 'pt' ? modalAdventure.titlePt : modalAdventure.title);
        const mOverview = (currentLang !== 'en' && modalAdventure[`overview${langSuffix}`]) ? modalAdventure[`overview${langSuffix}`] : (modalAdventure.overviewPt && currentLang === 'pt' ? modalAdventure.overviewPt : modalAdventure.overview);
        const mPickup = (currentLang !== 'en' && modalAdventure[`pickupTime${langSuffix}`]) ? modalAdventure[`pickupTime${langSuffix}`] : (modalAdventure.pickupTimePt && currentLang === 'pt' ? modalAdventure.pickupTimePt : modalAdventure.pickupTime);
        const mDropoff = (currentLang !== 'en' && modalAdventure[`dropoffTime${langSuffix}`]) ? modalAdventure[`dropoffTime${langSuffix}`] : (modalAdventure.dropoffTimePt && currentLang === 'pt' ? modalAdventure.dropoffTimePt : modalAdventure.dropoffTime);
        const mIncludes = (currentLang !== 'en' && modalAdventure[`includes${langSuffix}`]) ? modalAdventure[`includes${langSuffix}`] : (modalAdventure.includesPt && currentLang === 'pt' ? modalAdventure.includesPt : modalAdventure.includes);

        const scheduleLabel = { pt: 'Horário:', de: 'Abfahrt:', fr: 'Horaire :', es: 'Horario:', en: 'Schedule:' }[currentLang] || 'Schedule:';
        const returnLabel = { pt: 'Regresso:', de: 'Rückkehr:', fr: 'Retour :', es: 'Regreso:', en: 'Return:' }[currentLang] || 'Return:';
        const timelineTitle = { pt: 'Paragens & Itinerário Detalhado', de: 'Detaillierter Reiseverlauf & Stopps', fr: 'Arrêts & Itinéraire Détaillé', es: 'Paradas e Itinerario Detallado', en: 'Detailed Stops & Itinerary' }[currentLang] || 'Detailed Stops & Itinerary';
        const includesTitle = { pt: 'O que está incluído:', de: 'Was enthalten ist:', fr: 'Ce qui est inclus :', es: 'Qué está incluido:', en: "What's Included:" }[currentLang] || "What's Included:";
        const passengersLabel = { pt: 'Passageiros', de: 'Passagiere', fr: 'Passagers', es: 'Pasajeros', en: 'Passengers' }[currentLang] || 'Passengers';
        const selectCta = { pt: 'Selecionar Aventura →', de: 'Abenteuer Auswählen →', fr: 'Sélectionner cette Excursion →', es: 'Seleccionar Aventura →', en: 'Select Adventure →' }[currentLang] || 'Select Adventure →';

        return (
          <div className="itinerary-modal-backdrop" onClick={() => setModalAdventure(null)}>
            <div className="itinerary-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <div>
                  <span className="modal-badge">{mBadge}</span>
                  <h3 className="modal-title">{mTitle}</h3>
                  <p className="modal-schedule">
                    🕒 {scheduleLabel} <strong>{mPickup}</strong> · {returnLabel} <strong>{mDropoff}</strong>
                  </p>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setModalAdventure(null)}
                  aria-label="Close"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="modal-body">
                <p className="modal-overview">{mOverview}</p>

                <h4 className="timeline-title">{timelineTitle}</h4>
                <div className="modal-timeline">
                  {modalAdventure.itinerary.map((item, idx) => {
                    const stepTitle = (currentLang !== 'en' && item[`title${langSuffix}`]) ? item[`title${langSuffix}`] : (item.titlePt && currentLang === 'pt' ? item.titlePt : item.title);
                    const stepDesc = (currentLang !== 'en' && item[`desc${langSuffix}`]) ? item[`desc${langSuffix}`] : (item.descPt && currentLang === 'pt' ? item.descPt : item.desc);
                    return (
                      <div key={idx} className="timeline-step-row">
                        <div className="timeline-step-num">{item.step}</div>
                        <div className="timeline-step-content">
                          <strong className="step-title">{stepTitle}</strong>
                          <p className="step-desc">{stepDesc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="modal-includes-box">
                  <span className="includes-title">{includesTitle}</span>
                  <div className="includes-tags">
                    {(mIncludes || []).map((inc, i) => (
                      <span key={i} className="include-pill">✓ {inc}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <div className="modal-price-col">
                  <div className="modal-price-row">
                    <span className="pax-tag">1–4 {passengersLabel}:</span>
                    <strong className="pax-val">{modalAdventure.price4}€</strong>
                  </div>
                  <div className="modal-price-row">
                    <span className="pax-tag">5–8 {passengersLabel}:</span>
                    <strong className="pax-val">{modalAdventure.price8}€</strong>
                  </div>
                </div>
                <button
                  type="button"
                  className="modal-select-cta"
                  onClick={() => {
                    handleSelectAdventure(modalAdventure);
                    setModalAdventure(null);
                  }}
                >
                  {selectCta}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
