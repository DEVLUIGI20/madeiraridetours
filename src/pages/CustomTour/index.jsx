import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import { useLanguage } from '../../hooks/useLanguage';
import madeiraMapImg from '../../assets/images/madeira-map.jpg';
import './CustomTour.css';

// Coordinates calibrated against the satellite image of Madeira
const ISLAND_POINTS = [
  { id: 'porto-moniz', name: 'Porto Moniz Pools', namePt: 'Piscinas Naturais de Porto Moniz', top: '22%', left: '23%', desc: 'Natural volcanic sea pools', descPt: 'Piscinas vulcânicas naturais' },
  { id: 'fanal', name: 'Fanal Ancient Forest', namePt: 'Floresta Mística do Fanal', top: '30%', left: '29%', desc: 'UNESCO mystical trees', descPt: 'Árvores centenárias da Laurissilva' },
  { id: 'rabacal', name: 'Rabaçal / 25 Fontes', namePt: 'Rabaçal / 25 Fontes', top: '48%', left: '33%', desc: 'Waterfalls and levadas', descPt: 'Cascatas e trilho de levadas' },
  { id: 'cabo-girao', name: 'Cabo Girão Skywalk', namePt: 'Miradouro Cabo Girão', top: '75%', left: '56%', desc: '580m glass cliff platform', descPt: 'Plataforma suspensa de vidro a 580m' },
  { id: 'pico-do-arieiro', name: 'Pico do Arieiro (1818m)', namePt: 'Pico do Arieiro (1818m)', top: '56%', left: '63%', desc: 'Highest drivable peak', descPt: 'O terceiro pico mais alto da ilha' },
  { id: 'santana', name: 'Santana Heritage', namePt: 'Casas Típicas de Santana', top: '30%', left: '68%', desc: 'Traditional thatched houses', descPt: 'Casas tradicionais com colmo' },
  { id: 'sao-lourenco', name: 'Ponta de São Lourenço', namePt: 'Ponta de São Lourenço', top: '48%', left: '89%', desc: 'Dragon tail peninsula', descPt: 'Península vulcânica este' },
];

export default function CustomTour() {
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const [selectedPoints, setSelectedPoints] = useState([
    ISLAND_POINTS[4], // Pico do Arieiro
    ISLAND_POINTS[5], // Santana
    ISLAND_POINTS[0], // Porto Moniz
  ]);

  const togglePoint = (pt) => {
    if (selectedPoints.some((p) => p.id === pt.id)) {
      setSelectedPoints((prev) => prev.filter((p) => p.id !== pt.id));
    } else {
      setSelectedPoints((prev) => [...prev, pt]);
    }
  };

  const removePoint = (id) => {
    setSelectedPoints((prev) => prev.filter((p) => p.id !== id));
  };

  const handleRequestQuote = () => {
    const pointsList = selectedPoints.map((p) => (currentLang === 'pt' ? p.namePt || p.name : p.name)).join(', ');
    navigate(`/booking?service=custom&notes=${encodeURIComponent(pointsList)}`);
  };

  return (
    <div className="custom-tour-page">
      {/* ── Sub-Hero ── */}
      <section className="custom-tour-hero">
        <div className="custom-tour-hero-bg">
          <ImagePlaceholder alt="Madeira Topography" height="100%" />
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

      {/* ── Interactive Satellite Map Selector & Your Plan Summary ── */}
      <section className="custom-tour-main container-constrained">
        <div className="custom-tour-layout">
          {/* Left: Satellite Map with Positioned Pins */}
          <div className="map-selector-card">
            <div className="map-selector-header">
              <h3>{currentLang === 'pt' ? 'Selecione os Pontos no Mapa' : 'Select Points on the Map'}</h3>
              <p>
                {currentLang === 'pt'
                  ? 'Clique nos marcadores para adicionar ou remover pontos do seu itinerário personalizado.'
                  : 'Click on the pins to add or remove places from your custom day itinerary.'}
              </p>
            </div>

            <div className="custom-map-canvas">
              <div className="island-map-container">
                <img
                  src={madeiraMapImg}
                  alt="Madeira Satellite Island Map"
                  className="satellite-map-img"
                />

                {/* Interactive Points calibrated on the satellite map */}
                {ISLAND_POINTS.map((pt) => {
                  const isSelected = selectedPoints.some((p) => p.id === pt.id);
                  const nameText = currentLang === 'pt' ? pt.namePt || pt.name : pt.name;
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      className={`map-pin-btn ${isSelected ? 'active' : ''}`}
                      style={{ top: pt.top, left: pt.left }}
                      onClick={() => togglePoint(pt)}
                      title={nameText}
                    >
                      <span className="pin-dot">📍</span>
                      <span className="pin-tooltip">{nameText}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Your Plan Summary matching Mockup */}
          <div className="plan-summary-card">
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

            <button
              type="button"
              disabled={selectedPoints.length === 0}
              onClick={handleRequestQuote}
              className="request-quote-btn"
            >
              {currentLang === 'pt' ? 'Pedir Proposta com Este Roteiro →' : 'Request Quote →'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
