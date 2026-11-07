import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TOURS_DATA } from '../../constants/toursCatalog';
import TourCard from '../../components/common/TourCard';
import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();
  const [fromLoc, setFromLoc] = useState('Funchal');
  const [destLoc, setDestLoc] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  const featuredTours = TOURS_DATA.filter((t) => t.featured);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/booking?from=${encodeURIComponent(fromLoc)}&dest=${encodeURIComponent(destLoc)}&date=${date}&pax=${passengers}`);
  };

  return (
    <div className="home-mockup">
      {/* ── 1. Hero Section with Background Canvas & Floating Search Bar ── */}
      <section className="home-hero">
        <div className="home-hero__bg">
          {/* Neutral gray/slate gradient placeholder ready for scenic banner */}
          <ImagePlaceholder
            alt="Madeira Panoramic Banner"
            className="home-hero__img"
            height="100%"
          />
          <div className="home-hero__overlay" />
        </div>

        <div className="home-hero__content container-constrained">
          <span className="home-hero__tag">EXPLORE MADEIRA</span>
          <h1 className="home-hero__title">
            Unforgettable Tours<br />& Transfers
          </h1>
          <p className="home-hero__subtitle">
            Discover the best of Madeira with our guided tours, private transfers and custom experiences.
          </p>

          {/* Floating Search Bar */}
          <form onSubmit={handleSearch} className="home-search-bar">
            <div className="search-field">
              <span className="search-field__label">From</span>
              <select
                value={fromLoc}
                onChange={(e) => setFromLoc(e.target.value)}
                className="search-field__input"
              >
                <option value="Funchal">Funchal</option>
                <option value="FNC Airport">FNC Airport</option>
                <option value="Caniço">Caniço</option>
                <option value="Santa Cruz">Santa Cruz</option>
                <option value="Calheta">Calheta</option>
              </select>
            </div>

            <div className="search-field">
              <span className="search-field__label">Destination</span>
              <input
                type="text"
                placeholder="Select destination"
                value={destLoc}
                onChange={(e) => setDestLoc(e.target.value)}
                className="search-field__input"
              />
            </div>

            <div className="search-field">
              <span className="search-field__label">Date</span>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="search-field__input"
              />
            </div>

            <div className="search-field">
              <span className="search-field__label">Passengers</span>
              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="search-field__input"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'person' : 'people'}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="home-search-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <span>Search Tours</span>
            </button>
          </form>
        </div>
      </section>

      {/* ── 2. Trust & Value Props Bar (4 Columns matching Mockup) ── */}
      <section className="home-props container-constrained">
        <div className="props-grid">
          <div className="prop-item">
            <div className="prop-icon">🔒</div>
            <div>
              <h4>Secure Payments</h4>
              <p>Powered by Stripe</p>
            </div>
          </div>

          <div className="prop-item">
            <div className="prop-icon">🎧</div>
            <div>
              <h4>24/7 Support</h4>
              <p>We are here to help</p>
            </div>
          </div>

          <div className="prop-item">
            <div className="prop-icon">⭐</div>
            <div>
              <h4>Top Rated Tours</h4>
              <p>5.0 from 1,000+ reviews</p>
            </div>
          </div>

          <div className="prop-item">
            <div className="prop-icon">🚐</div>
            <div>
              <h4>Comfortable Transfers</h4>
              <p>Travel in style & safety</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Our Top Experiences Section ── */}
      <section className="home-experiences container-constrained">
        <div className="home-section-header">
          <div>
            <span className="section-pretitle">POPULAR TOURS</span>
            <h2 className="section-title">Our Top Experiences</h2>
          </div>
          <Link to="/tours" className="section-view-all">
            View All Tours →
          </Link>
        </div>

        <div className="tours-grid-mockup">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>
    </div>
  );
}
