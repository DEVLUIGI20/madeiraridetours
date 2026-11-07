import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import madeiraMapImg from '../../assets/images/madeira-map.jpg';
import './CustomTour.css';

// Coordinates calibrated against the satellite image of Madeira
const ISLAND_POINTS = [
  { id: 'porto-moniz', name: 'Porto Moniz Pools', top: '22%', left: '23%', desc: 'Natural volcanic sea pools' },
  { id: 'fanal', name: 'Fanal Ancient Forest', top: '30%', left: '29%', desc: 'UNESCO mystical trees' },
  { id: 'rabacal', name: 'Rabaçal / 25 Fontes', top: '48%', left: '33%', desc: 'Waterfalls and levadas' },
  { id: 'cabo-girao', name: 'Cabo Girão Skywalk', top: '75%', left: '56%', desc: '580m glass cliff platform' },
  { id: 'pico-do-arieiro', name: 'Pico do Arieiro (1818m)', top: '56%', left: '63%', desc: 'Highest drivable peak' },
  { id: 'santana', name: 'Santana Heritage', top: '30%', left: '68%', desc: 'Traditional thatched houses' },
  { id: 'sao-lourenco', name: 'Ponta de São Lourenço', top: '48%', left: '89%', desc: 'Dragon tail peninsula' },
];

export default function CustomTour() {
  const navigate = useNavigate();
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
    const pointsList = selectedPoints.map((p) => p.name).join(', ');
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
          <h1 className="custom-tour-title">Custom Tour</h1>
          <p className="custom-tour-subtitle">
            Create your own unique experience. Select the places you want to visit on the map.
          </p>
        </div>
      </section>

      {/* ── Interactive Satellite Map Selector & Your Plan Summary ── */}
      <section className="custom-tour-main container-constrained">
        <div className="custom-tour-layout">
          {/* Left: Satellite Map with Positioned Pins */}
          <div className="map-selector-card">
            <div className="map-selector-header">
              <h3>Select Points on the Map</h3>
              <p>Click on the pins to add or remove places from your custom day itinerary.</p>
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
                  return (
                    <button
                      key={pt.id}
                      type="button"
                      className={`map-pin-btn ${isSelected ? 'active' : ''}`}
                      style={{ top: pt.top, left: pt.left }}
                      onClick={() => togglePoint(pt)}
                      title={pt.name}
                    >
                      <span className="pin-dot">📍</span>
                      <span className="pin-tooltip">{pt.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Your Plan Summary matching Mockup */}
          <div className="plan-summary-card">
            <h3>Your Plan</h3>

            <div className="selected-stops-list">
              {selectedPoints.length === 0 ? (
                <p className="no-stops">No places selected yet. Click points on the map.</p>
              ) : (
                selectedPoints.map((pt, idx) => (
                  <div key={pt.id} className="stop-item">
                    <span className="stop-num">{idx + 1}</span>
                    <div className="stop-details">
                      <strong>{pt.name}</strong>
                      <small>{pt.desc}</small>
                    </div>
                    <button
                      type="button"
                      onClick={() => removePoint(pt.id)}
                      className="stop-remove-btn"
                      title="Remove from plan"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="plan-stats">
              <div className="stat-line">
                <span>Stops Selected:</span>
                <strong>{selectedPoints.length}</strong>
              </div>
              <div className="stat-line">
                <span>Estimated Duration:</span>
                <strong>{selectedPoints.length > 2 ? '6–8 Hours' : '4–5 Hours'}</strong>
              </div>
            </div>

            <button
              type="button"
              disabled={selectedPoints.length === 0}
              onClick={handleRequestQuote}
              className="request-quote-btn"
            >
              Request Quote →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
