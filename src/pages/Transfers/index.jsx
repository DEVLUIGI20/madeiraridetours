import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MADEIRA_ADVENTURES, AIRPORT_TRANSFER_LOCATIONS } from '../../constants/transfersCatalog';
import { useLanguage } from '../../hooks/useLanguage';
import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import DestinationDropdown from '../../components/common/DestinationDropdown';
import usePageTitle from '../../hooks/usePageTitle';
import './Transfers.css';

export default function Transfers() {
  const navigate = useNavigate();
  const { currentLang } = useLanguage();

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

  const currentPrice = selectedAdventure
    ? (groupSize === '4' ? selectedAdventure.price4 : selectedAdventure.price8)
    : 0;
  const pickupLoc = AIRPORT_TRANSFER_LOCATIONS.find((l) => l.id === pickupId) || AIRPORT_TRANSFER_LOCATIONS[0];

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
          <ImagePlaceholder alt="Madeira Roads & Transfers" height="100%" />
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
                      allowAirport={true}
                      showPrice={false}
                      showDuration={false}
                    />
                  </div>

                  {/* Date */}
                  <label className="transfer-form-group">
                    <span className="transfer-form-label">
                      {currentLang === 'pt' ? 'Data da Aventura' : currentLang === 'de' ? 'Datum' : currentLang === 'fr' ? 'Date de l’aventure' : 'Date of Adventure'}
                    </span>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="transfer-input"
                    />
                  </label>

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
                    <p className="adv-pickup-desc">{selectedAdventure.pickupArea}</p>

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

                return (
                  <article
                    key={adv.id}
                    className={`adventure-card mini ${isSelected ? 'active-card' : ''}`}
                  >
                    <div className="adventure-media mini">
                      <ImagePlaceholder
                        src={adv.image}
                        alt={adv.title}
                        aspectRatio="16/9"
                      />
                      <span className="adventure-badge">{adv.badge}</span>
                      {isSelected && (
                        <span className="selected-tag">{currentLang === 'pt' ? 'Selecionado' : 'Selected'}</span>
                      )}
                    </div>

                    <div className="adventure-body mini">
                      <h3 className="adventure-name">{adv.title}</h3>

                      <div className="adventure-logistics-bar">
                        <span className="logistics-item">
                          <span className="icon">🕒</span> {adv.pickupTime}
                        </span>
                        <span className="logistics-item">
                          <span className="icon">📍</span> {currentLang === 'pt' ? 'Recolha no Hotel' : 'Hotel Pick-up'}
                        </span>
                      </div>

                      <ul className="adventure-bullets mini">
                        {adv.highlights.slice(0, 3).map((h, idx) => (
                          <li key={idx}>✓ {h}</li>
                        ))}
                      </ul>

                      <div className="adventure-itinerary-action">
                        <button
                          type="button"
                          className="itinerary-link-btn"
                          onClick={() => setModalAdventure(adv)}
                        >
                          <span className="icon">🗺️</span>
                          <span>{currentLang === 'pt' ? `Ver Itinerário (${adv.itinerary.length} paragens)` : `View Full Itinerary (${adv.itinerary.length} stops)`}</span>
                        </button>
                      </div>

                      <div className="adventure-footer mini">
                        <div className="adventure-pricing">
                          <div className="price-line">
                            <span className="pax">1–4 {currentLang === 'pt' ? 'Passageiros' : 'Passengers'}</span>
                            <strong className="amt">{adv.price4}€</strong>
                          </div>
                          <div className="price-line">
                            <span className="pax">5–8 {currentLang === 'pt' ? 'Passageiros' : 'Passengers'}</span>
                            <strong className="amt">{adv.price8}€</strong>
                          </div>
                        </div>

                        <button
                          type="button"
                          className={`adventure-book-btn ${isSelected ? 'active' : ''}`}
                          onClick={() => handleSelectAdventure(adv)}
                          title={isSelected ? 'Click to unselect / Desselecionar' : 'Click to select / Reservar'}
                        >
                          {isSelected 
                            ? (currentLang === 'pt' ? 'Selecionado ✓' : 'Selected ✓') 
                            : (currentLang === 'pt' ? 'Reservar' : 'Book')}
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
      {modalAdventure && (
        <div className="itinerary-modal-backdrop" onClick={() => setModalAdventure(null)}>
          <div className="itinerary-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-badge">{modalAdventure.badge}</span>
                <h3 className="modal-title">{modalAdventure.title}</h3>
                <p className="modal-schedule">
                  🕒 {currentLang === 'pt' ? 'Horário:' : 'Schedule:'} <strong>{modalAdventure.pickupTime}</strong> · {currentLang === 'pt' ? 'Regresso:' : 'Return:'} <strong>{modalAdventure.dropoffTime}</strong>
                </p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setModalAdventure(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <p className="modal-overview">{modalAdventure.overview}</p>

              <h4 className="timeline-title">{currentLang === 'pt' ? 'Paragens & Itinerário Detalhado' : 'Detailed Stops & Itinerary'}</h4>
              <div className="modal-timeline">
                {modalAdventure.itinerary.map((item, idx) => (
                  <div key={idx} className="timeline-step-row">
                    <div className="timeline-step-num">{item.step}</div>
                    <div className="timeline-step-content">
                      <strong className="step-title">{item.title}</strong>
                      <p className="step-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="modal-includes-box">
                <span className="includes-title">{currentLang === 'pt' ? 'O que está incluído:' : "What's Included:"}</span>
                <div className="includes-tags">
                  {modalAdventure.includes.map((inc, i) => (
                    <span key={i} className="include-pill">✓ {inc}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <div className="modal-price-col">
                <span className="from-label">{currentLang === 'pt' ? 'Passeio Privado:' : 'Private Tour:'}</span>
                <strong>{modalAdventure.price4}€</strong> (1–4 {currentLang === 'pt' ? 'Passageiros' : 'Passengers'}) / <strong>{modalAdventure.price8}€</strong> (5–8 {currentLang === 'pt' ? 'Passageiros' : 'Passengers'})
              </div>
              <button
                type="button"
                className="modal-select-cta"
                onClick={() => {
                  handleSelectAdventure(modalAdventure);
                  setModalAdventure(null);
                }}
              >
                {currentLang === 'pt' ? 'Selecionar Esta Aventura →' : 'Select This Adventure →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
