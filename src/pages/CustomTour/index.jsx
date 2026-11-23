import { useState, useEffect, useRef, useMemo } from 'react';
import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import DatePicker from '../../components/common/DatePicker';
import { useLanguage } from '../../hooks/useLanguage';
import { sendCustomTourRequestEmail } from '../../services/emailService';
import { bookingService } from '../../services/bookingService';
import './CustomTour.css';

// Coordinates (lat, lng) of the most iconic places in Madeira
const ISLAND_POINTS = [
  { id: 'porto-moniz', lat: 32.8683, lng: -17.1683, name: 'Porto Moniz Pools', namePt: 'Piscinas Naturais de Porto Moniz', desc: 'Natural volcanic sea pools', descPt: 'Piscinas vulcânicas naturais' },
  { id: 'fanal', lat: 32.8122, lng: -17.1425, name: 'Fanal Ancient Forest', namePt: 'Floresta Mística do Fanal', desc: 'UNESCO mystical trees', descPt: 'Árvores centenárias da Laurissilva' },
  { id: 'rabacal', lat: 32.7550, lng: -17.1340, name: 'Rabaçal / 25 Fontes', namePt: 'Rabaçal / 25 Fontes', desc: 'Waterfalls and levadas', descPt: 'Cascatas e trilho de levadas' },
  { id: 'cabo-girao', lat: 32.6514, lng: -17.0050, name: 'Cabo Girão Skywalk', namePt: 'Miradouro Cabo Girão', desc: '580m glass cliff platform', descPt: 'Plataforma suspensa de vidro a 580m' },
  { id: 'pico-do-arieiro', lat: 32.7356, lng: -16.9289, name: 'Pico do Arieiro (1818m)', namePt: 'Pico do Arieiro (1818m)', desc: 'Highest drivable peak', descPt: 'O terceiro pico mais alto da ilha' },
  { id: 'santana', lat: 32.8050, lng: -16.8822, name: 'Santana Heritage', namePt: 'Casas Típicas de Santana', desc: 'Traditional thatched houses', descPt: 'Casas tradicionais com colmo' },
  { id: 'sao-lourenco', lat: 32.7431, lng: -16.7028, name: 'Ponta de São Lourenço', namePt: 'Ponta de São Lourenço', desc: 'Dragon tail peninsula', descPt: 'Península vulcânica este' },
  { id: 'curral-das-freiras', lat: 32.7200, lng: -16.9667, name: "Nun's Valley (Curral das Freiras)", namePt: 'Curral das Freiras', desc: 'Deep volcanic valley', descPt: 'Vale profundo rodeado por montanhas' },
  { id: 'seixal', lat: 32.8222, lng: -17.1083, name: 'Seixal Black Sand Beach', namePt: 'Praia de Areia Preta do Seixal', desc: 'Emerald cliffs & waterfalls', descPt: 'Praia negra e cascata do Véu da Noiva' },
];

export default function CustomTour() {
  const { currentLang } = useLanguage();
  const todayDateStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});

  const [selectedPoints, setSelectedPoints] = useState([
    ISLAND_POINTS[4], // Pico do Arieiro
    ISLAND_POINTS[5], // Santana
    ISLAND_POINTS[0], // Porto Moniz
  ]);

  // Contact form state
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formPickup, setFormPickup] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formPax, setFormPax] = useState('4');
  const [blockedDates, setBlockedDates] = useState([]);

  useEffect(() => {
    bookingService.getBlockedDates().then((res) => {
      if (res.success && res.data) setBlockedDates(res.data);
    });
  }, []);

  // Submission state
  const [submitState, setSubmitState] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

  const togglePoint = (pt) => {
    setSelectedPoints((prev) => {
      const exists = prev.some((p) => p.id === pt.id);
      return exists ? prev.filter((p) => p.id !== pt.id) : [...prev, pt];
    });
  };

  const removePoint = (id) => {
    setSelectedPoints((prev) => prev.filter((p) => p.id !== id));
  };

  const handleRequestQuote = async (e) => {
    e.preventDefault();
    if (selectedPoints.length === 0 || !formName || !formEmail) return;

    setSubmitState('sending');

    const stops = selectedPoints.map((p) => (currentLang === 'pt' ? p.namePt || p.name : p.name));

    const payload = {
      customer_name: formName,
      customer_email: formEmail,
      customer_phone: formPhone,
      pickup_location: formPickup,
      selected_points: stops,
      date: formDate,
      passengers: formPax,
      notes: formNotes,
      language: currentLang,
    };

    // Save to Supabase + attempt email dispatch in parallel
    const [emailResult, dbResult] = await Promise.allSettled([
      sendCustomTourRequestEmail(payload),
      bookingService.saveCustomTourRequest(payload),
    ]);

    const emailOk = emailResult.status === 'fulfilled' && emailResult.value?.success;
    const dbOk = dbResult.status === 'fulfilled' && dbResult.value?.success;

    // Show success if either the email was sent or the request was saved into DB
    if (emailOk || dbOk) {
      setSubmitState('success');
    } else {
      setSubmitState('error');
    }
  };

  // Initialize interactive Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const L = window.L;
    if (!L) return;

    // Center on Madeira Island - adjusted to show full island
    const map = L.map(mapContainerRef.current, {
      center: [32.76, -17.00],
      zoom: 10,
      minZoom: 9,
      maxZoom: 16,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    mapInstanceRef.current = map;

    // Free OpenStreetMap tile layer - no API key required
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abc',
      maxZoom: 19,
    }).addTo(map);

    // Ensure map renders correctly after container settles
    setTimeout(() => {
      map.invalidateSize();
    }, 150);

    // Initial markers creation
    ISLAND_POINTS.forEach((pt) => {
      const markerEl = document.createElement('div');
      markerEl.className = 'custom-leaflet-pin';
      markerEl.innerHTML = `<span class="pin-inner-dot">📍</span>`;

      const icon = L.divIcon({
        className: 'custom-map-divicon',
        html: markerEl,
        iconSize: [34, 34],
        iconAnchor: [17, 34],
      });

      const marker = L.marker([pt.lat, pt.lng], { icon }).addTo(map);

      marker.on('click', () => {
        togglePoint(pt);
      });

      marker.bindTooltip(`<strong>${pt.name}</strong>`, {
        direction: 'top',
        offset: [0, -28],
      });

      markersRef.current[pt.id] = { marker, markerEl };
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Sync marker tooltip language & selected state styling
  useEffect(() => {
    ISLAND_POINTS.forEach((pt) => {
      const item = markersRef.current[pt.id];
      if (item) {
        const isSelected = selectedPoints.some((p) => p.id === pt.id);
        if (isSelected) {
          item.markerEl.classList.add('selected');
        } else {
          item.markerEl.classList.remove('selected');
        }

        const label = currentLang === 'pt' ? pt.namePt : pt.name;
        item.marker.setTooltipContent(`<strong>${label}</strong>`);
      }
    });
  }, [selectedPoints, currentLang]);

  return (
    <div className="custom-tour-page">
      {/* ── Sub-Hero ── */}
      <section className="custom-tour-hero">
        <div className="custom-tour-hero-bg">
          <ImagePlaceholder
            src="/images/custom-tour-hero-banner.jpg"
            alt="Ponta de São Lourenço Cliffs — Custom Tour"
            height="100%"
          />
          <div className="custom-tour-hero-overlay" />
        </div>
        <div className="custom-tour-hero-content container-constrained">
          <h1 className="custom-tour-title">
            {currentLang === 'pt' ? 'Passeio Personalizado' : currentLang === 'de' ? 'Individuelle Tour' : currentLang === 'fr' ? 'Circuit Sur Mesure' : 'Custom Tour'}
          </h1>
          <p className="custom-tour-subtitle">
            {currentLang === 'pt'
              ? 'Crie a sua própria experiência. Escolha no mapa os locais imperdíveis que deseja visitar.'
              : 'Create your own unique experience. Select the places you want to visit on the map.'}
          </p>
        </div>
      </section>

      {/* ── Interactive Map & Your Plan Summary ── */}
      <section className="custom-tour-main container-constrained">
        <div className="custom-tour-layout">
          {/* Left: Dynamic Leaflet Map */}
          <div className="map-selector-card">
            <div className="map-selector-header">
              <h3>{currentLang === 'pt' ? 'Mapa Interativo da Ilha da Madeira' : 'Interactive Madeira Island Map'}</h3>
              <p>
                {currentLang === 'pt'
                  ? 'Arraste o mapa, use o zoom e clique nos pontos turísticos para adicionar ou remover do seu roteiro.'
                  : 'Drag the map, zoom in/out and click markers to add or remove destinations from your custom itinerary.'}
              </p>
            </div>

            <div className="custom-leaflet-wrapper">
              <div ref={mapContainerRef} className="leaflet-map-element" />
            </div>

            {/* Quick Chips below the map for easy mobile tapping */}
            <div className="map-quick-chips">
              <span className="chips-title">{currentLang === 'pt' ? 'Locais Populares:' : 'Popular Spots:'}</span>
              <div className="chips-scroll">
                {ISLAND_POINTS.map((pt) => {
                  const isSelected = selectedPoints.some((p) => p.id === pt.id);
                  const nameText = currentLang === 'pt' ? pt.namePt || pt.name : pt.name;
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      className={`map-chip-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => togglePoint(pt)}
                    >
                      <span>{isSelected ? '✓' : '+'}</span> {nameText}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Your Plan Summary + Quote Request Form */}
          <aside className="plan-summary-card">
            <h3>{currentLang === 'pt' ? 'O Seu Roteiro' : 'Your Plan'}</h3>

            <div className="selected-stops-list">
              {selectedPoints.length === 0 ? (
                <p className="no-stops">
                  {currentLang === 'pt' ? 'Nenhum local selecionado. Clique nos pontos do mapa.' : 'No places selected yet. Click points on the map.'}
                </p>
              ) : (
                selectedPoints.map((pt, idx) => (
                  <div key={pt.id} className="stop-item">
                    <span className="stop-num">{idx + 1}</span>
                    <div className="stop-details">
                      <strong>{currentLang === 'pt' ? pt.namePt || pt.name : pt.name}</strong>
                      <small>{currentLang === 'pt' ? pt.descPt || pt.desc : pt.desc}</small>
                    </div>
                    <button
                      type="button"
                      onClick={() => removePoint(pt.id)}
                      className="stop-remove-btn"
                      title={currentLang === 'pt' ? 'Remover do plano' : 'Remove from plan'}
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="plan-stats">
              <div className="stat-line">
                <span>{currentLang === 'pt' ? 'Paragens Selecionadas:' : 'Stops Selected:'}</span>
                <strong>{selectedPoints.length}</strong>
              </div>
              <div className="stat-line">
                <span>{currentLang === 'pt' ? 'Duração Estimada:' : 'Estimated Duration:'}</span>
                <strong>
                  {selectedPoints.length > 2
                    ? (currentLang === 'pt' ? '6–8 Horas' : '6–8 Hours')
                    : (currentLang === 'pt' ? '4–5 Horas' : '4–5 Hours')}
                </strong>
              </div>
            </div>

            {/* Success state */}
            {submitState === 'success' ? (
              <div className="quote-success-box">
                <span className="quote-success-icon">✓</span>
                <h4>{currentLang === 'pt' ? 'Pedido Enviado!' : currentLang === 'de' ? 'Anfrage gesendet!' : currentLang === 'fr' ? 'Demande envoyée !' : currentLang === 'es' ? '¡Solicitud enviada!' : 'Request Sent!'}</h4>
                <p>
                  {currentLang === 'pt'
                    ? 'Obrigado! Irá receber um email com o orçamento para o seu tour personalizado. O nosso condutor entrará em contacto brevemente.'
                    : currentLang === 'de'
                    ? 'Vielen Dank! Sie erhalten in Kürze eine E-Mail mit Ihrem individuellen Tour-Angebot.'
                    : currentLang === 'fr'
                    ? 'Merci ! Vous recevrez bientôt un e-mail avec le devis pour votre circuit personnalisé.'
                    : currentLang === 'es'
                    ? '¡Gracias! Recibirá pronto un email con el presupuesto para su tour personalizado.'
                    : 'Thank you! You will receive an email with your personalised tour quote shortly. Our driver will contact you soon.'}
                </p>
              </div>
            ) : (
              /* Contact form */
              <form className="quote-request-form" onSubmit={handleRequestQuote}>
                <div className="quote-form-group">
                  <label className="quote-form-label">
                    {currentLang === 'pt' ? 'Nome Completo *' : currentLang === 'de' ? 'Vollständiger Name *' : currentLang === 'fr' ? 'Nom complet *' : currentLang === 'es' ? 'Nombre completo *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="quote-form-input"
                    placeholder={currentLang === 'pt' ? 'O seu nome' : 'Your name'}
                  />
                </div>
                <div className="quote-form-group">
                  <label className="quote-form-label">
                    {currentLang === 'pt' ? 'Email *' : 'Email *'}
                  </label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="quote-form-input"
                    placeholder="email@example.com"
                  />
                </div>
                <div className="quote-form-group">
                  <label className="quote-form-label">
                    {currentLang === 'pt' ? 'Telefone / WhatsApp' : currentLang === 'de' ? 'Telefon / WhatsApp' : currentLang === 'fr' ? 'Téléphone / WhatsApp' : currentLang === 'es' ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp'}
                  </label>
                  <input
                    type="tel"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="quote-form-input"
                    placeholder="+351 ..."
                  />
                </div>
                <div className="quote-form-group">
                  <label className="quote-form-label">
                    {currentLang === 'pt' ? 'Local de Recolha (Hotel / Morada) *' : currentLang === 'de' ? 'Abholort (Hotel / Adresse) *' : currentLang === 'fr' ? 'Lieu de prise en charge (Hôtel / Adresse) *' : currentLang === 'es' ? 'Lugar de recogida (Hotel / Dirección) *' : 'Pickup Location (Hotel / Address) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formPickup}
                    onChange={(e) => setFormPickup(e.target.value)}
                    className="quote-form-input"
                    placeholder={currentLang === 'pt' ? 'Ex: Hotel Savoy Palace, Funchal' : 'e.g. Savoy Palace Hotel, Funchal'}
                  />
                </div>
                <div className="quote-form-group">
                  <label className="quote-form-label">
                    {currentLang === 'pt' ? 'Data Pretendida' : currentLang === 'de' ? 'Gewünschtes Datum' : currentLang === 'fr' ? 'Date souhaitée' : currentLang === 'es' ? 'Fecha deseada' : 'Preferred Date'}
                  </label>
                  <DatePicker
                    value={formDate}
                    onChange={(newDate) => setFormDate(newDate)}
                    blockedDates={blockedDates}
                    minDate={todayDateStr}
                    language={currentLang}
                    placeholder="dd/mm/aaaa"
                  />
                </div>
                <div className="quote-form-group">
                  <label className="quote-form-label">
                    {currentLang === 'pt' ? 'Nº de Passageiros' : currentLang === 'de' ? 'Passagieranzahl' : currentLang === 'fr' ? 'Nombre de passagers' : currentLang === 'es' ? 'Nº de pasajeros' : 'Number of Passengers'}
                  </label>
                  <select value={formPax} onChange={(e) => setFormPax(e.target.value)} className="quote-form-input">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>{n} {currentLang === 'pt' ? (n === 1 ? 'passageiro' : 'passageiros') : (n === 1 ? 'passenger' : 'passengers')}</option>
                    ))}
                  </select>
                </div>
                <div className="quote-form-group">
                  <label className="quote-form-label">
                    {currentLang === 'pt' ? 'Notas Adicionais' : currentLang === 'de' ? 'Zusätzliche Hinweise' : currentLang === 'fr' ? 'Notes supplémentaires' : currentLang === 'es' ? 'Notas adicionales' : 'Additional Notes'}
                  </label>
                  <textarea
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    className="quote-form-input"
                    rows={3}
                    placeholder={currentLang === 'pt' ? 'Requisitos especiais, horário preferido...' : 'Special requirements, preferred time...'}
                  />
                </div>

                {submitState === 'error' && (
                  <p className="quote-error-msg">
                    {currentLang === 'pt' ? 'Erro ao enviar. Tente novamente ou contacte-nos via WhatsApp.' : 'Error sending request. Please try again or contact us via WhatsApp.'}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={selectedPoints.length === 0 || submitState === 'sending'}
                  className="request-quote-btn"
                >
                  {submitState === 'sending'
                    ? (currentLang === 'pt' ? 'A enviar...' : 'Sending...')
                    : (currentLang === 'pt' ? 'Pedir Orçamento para Este Roteiro →' : currentLang === 'de' ? 'Angebot anfordern →' : currentLang === 'fr' ? 'Demander un devis →' : currentLang === 'es' ? 'Solicitar presupuesto →' : 'Request Quote for This Itinerary →')}
                </button>
              </form>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
