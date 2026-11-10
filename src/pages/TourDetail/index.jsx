import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TOURS_DATA } from '../../constants/toursCatalog';
import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import { useLanguage } from '../../hooks/useLanguage';
import './TourDetail.css';

export default function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentLang } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'itinerary', 'includes'
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  const tour = TOURS_DATA.find((t) => t.id === id) || TOURS_DATA[0];

  const handleBook = (e) => {
    e.preventDefault();
    navigate(`/booking?service=${tour.id}&date=${date}&pax=${passengers}`);
  };

  return (
    <div className="tour-detail-page">
      {/* ── Sub-Hero with Back Link & Title ── */}
      <section className="tour-detail-hero">
        <div className="tour-detail-hero-bg">
          <ImagePlaceholder
            src={tour.image}
            alt={tour.title}
            height="100%"
          />
          <div className="tour-detail-hero-overlay" />
        </div>

        <div className="tour-detail-hero-content container-constrained">
          <Link to="/tours" className="tour-back-link">
            {currentLang === 'pt' ? '← Voltar aos Passeios' : currentLang === 'de' ? '← Zurück zu Touren' : '← Back to Tours'}
          </Link>
          <div className="tour-header-flex">
            <div>
              <h1 className="tour-detail-title">{tour.title}</h1>
              <p className="tour-detail-subtitle">{tour.subtitle}</p>
              <div className="tour-detail-rating">
                <span className="star-icon">★</span>
                <strong>{tour.rating.toFixed(1)}</strong>
                <span>({tour.reviewsCount} {currentLang === 'pt' ? 'avaliações' : 'reviews'})</span>
              </div>
            </div>

            <div className="tour-header-price-badge">
              <span className="price-from">{currentLang === 'pt' ? 'Desde' : 'From'}</span>
              <strong className="price-val">€{tour.price}</strong>
              <span className="price-unit">{currentLang === 'pt' ? 'por pessoa' : 'per person'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content Grid: Details Tabs + Floating Booking Box ── */}
      <section className="tour-detail-body container-constrained">
        <div className="tour-detail-layout">
          {/* Left: Tabbed Content & Photo Gallery Placeholders */}
          <div className="tour-detail-left">
            <div className="tour-nav-tabs">
              <button
                type="button"
                className={`tour-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                {currentLang === 'pt' ? 'Visão Geral' : currentLang === 'de' ? 'Übersicht' : currentLang === 'fr' ? 'Aperçu' : 'Overview'}
              </button>
              <button
                type="button"
                className={`tour-tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
                onClick={() => setActiveTab('itinerary')}
              >
                {currentLang === 'pt' ? 'Itinerário' : currentLang === 'de' ? 'Reiseplan' : 'Itinerary'}
              </button>
              <button
                type="button"
                className={`tour-tab-btn ${activeTab === 'includes' ? 'active' : ''}`}
                onClick={() => setActiveTab('includes')}
              >
                {currentLang === 'pt' ? 'Incluído' : currentLang === 'de' ? 'Inbegriffen' : 'Includes'}
              </button>
            </div>

            <div className="tour-tab-content">
              {activeTab === 'overview' && (
                <div className="overview-tab-pane">
                  <p className="overview-text">{tour.overview}</p>
                  <h3 className="section-mini-heading">
                    {currentLang === 'pt' ? 'Destaques Principais' : 'Key Highlights'}
                  </h3>
                  <ul className="highlights-list">
                    {tour.highlights.map((h, i) => (
                      <li key={i}>
                        <span className="check-bullet">✓</span> {h}
                      </li>
                    ))}
                  </ul>

                  {/* 4 Photo slots placeholders */}
                  <h3 className="section-mini-heading">
                    {currentLang === 'pt' ? 'Galeria de Fotografias' : 'Photo Gallery'}
                  </h3>
                  <div className="gallery-slots-grid">
                    {[1, 2, 3, 4].map((slot) => (
                      <ImagePlaceholder
                        key={slot}
                        alt={`${tour.title} photo slot ${slot}`}
                        aspectRatio="16/10"
                        label={`Photo ${slot}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'itinerary' && (
                <div className="itinerary-tab-pane">
                  <div className="itinerary-timeline">
                    {tour.itinerary.map((step, idx) => (
                      <div key={idx} className="timeline-item">
                        <div className="timeline-time">{step.time}</div>
                        <div className="timeline-card">
                          <h4>{step.title}</h4>
                          <p>{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'includes' && (
                <div className="includes-tab-pane">
                  <h3 className="section-mini-heading">
                    {currentLang === 'pt' ? 'O Que Está Incluído' : 'What is Included'}
                  </h3>
                  <ul className="includes-list">
                    {tour.includes.map((inc, i) => (
                      <li key={i}>
                        <span className="check-bullet">✓</span> {inc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right: Floating Booking Box */}
          <aside className="tour-detail-right">
            <div className="booking-sidebar-card">
              <h3>{currentLang === 'pt' ? 'Reservar Este Passeio' : 'Book This Tour'}</h3>

              <form onSubmit={handleBook} className="sidebar-form">
                <label className="sidebar-label">
                  <span>{currentLang === 'pt' ? 'Data Pretendida' : 'Select Date'}</span>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="sidebar-input"
                  />
                </label>

                <label className="sidebar-label">
                  <span>{currentLang === 'pt' ? 'Passageiros' : 'Passengers'}</span>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="sidebar-input"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 
                          ? (currentLang === 'pt' ? 'pessoa' : 'person') 
                          : (currentLang === 'pt' ? 'pessoas' : 'people')}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="sidebar-price-breakdown">
                  <div className="breakdown-row">
                    <span>{currentLang === 'pt' ? 'Preço por pessoa' : 'Price per person'}</span>
                    <strong>€{tour.price}</strong>
                  </div>
                  <div className="breakdown-row total">
                    <span>{currentLang === 'pt' ? 'Total Estimado' : 'Estimated Total'}</span>
                    <strong>€{tour.price * passengers}</strong>
                  </div>
                </div>

                <button type="submit" className="sidebar-cta-btn">
                  {currentLang === 'pt' ? 'Reservar Online →' : 'Reserve Online →'}
                </button>
              </form>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

