import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { TOURS_DATA } from '../../constants/toursCatalog';
import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import './TourDetail.css';

export default function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
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
            ← Back to Tours
          </Link>
          <div className="tour-header-flex">
            <div>
              <h1 className="tour-detail-title">{tour.title}</h1>
              <p className="tour-detail-subtitle">{tour.subtitle}</p>
              <div className="tour-detail-rating">
                <span className="star-icon">★</span>
                <strong>{tour.rating.toFixed(1)}</strong>
                <span>({tour.reviewsCount} reviews)</span>
              </div>
            </div>

            <div className="tour-header-price-badge">
              <span className="price-from">From</span>
              <strong className="price-val">€{tour.price}</strong>
              <span className="price-unit">per person</span>
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
                Overview
              </button>
              <button
                type="button"
                className={`tour-tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
                onClick={() => setActiveTab('itinerary')}
              >
                Itinerary
              </button>
              <button
                type="button"
                className={`tour-tab-btn ${activeTab === 'includes' ? 'active' : ''}`}
                onClick={() => setActiveTab('includes')}
              >
                Includes
              </button>
            </div>

            <div className="tour-tab-content">
              {activeTab === 'overview' && (
                <div className="overview-tab-pane">
                  <p className="overview-text">{tour.overview}</p>
                  <h3 className="section-mini-heading">Key Highlights</h3>
                  <ul className="highlights-list">
                    {tour.highlights.map((h, i) => (
                      <li key={i}>
                        <span className="check-bullet">✓</span> {h}
                      </li>
                    ))}
                  </ul>

                  {/* 4 Photo slots placeholders as seen in mockup */}
                  <h3 className="section-mini-heading">Photo Gallery</h3>
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
                  <h3 className="section-mini-heading">What is Included</h3>
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

          {/* Right: Floating Booking Box matching Mockup */}
          <aside className="tour-detail-right">
            <div className="booking-sidebar-card">
              <h3>Book This Tour</h3>

              <form onSubmit={handleBook} className="sidebar-form">
                <label className="sidebar-label">
                  <span>Select Date</span>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="sidebar-input"
                  />
                </label>

                <label className="sidebar-label">
                  <span>Passengers</span>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="sidebar-input"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'person' : 'people'}
                      </option>
                    ))}
                  </select>
                </label>

                <div className="sidebar-price-breakdown">
                  <div className="breakdown-row">
                    <span>Price per person</span>
                    <strong>€{tour.price}</strong>
                  </div>
                  <div className="breakdown-row total">
                    <span>Estimated Total</span>
                    <strong>€{tour.price * passengers}</strong>
                  </div>
                </div>

                <button type="submit" className="sidebar-cta-btn">
                  Reserve Online →
                </button>
              </form>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

