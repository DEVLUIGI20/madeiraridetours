import { useState, useEffect, useRef } from 'react';
import { ROUTES } from '../../constants';
import { getLocalizedTours } from '../../constants/tours';
import { useLanguage } from '../../hooks/useLanguage';
import Button from '../../components/common/Button';
import TourCard from '../../components/common/TourCard';
import AirportTransferSection from '../../components/common/AirportTransferSection';
import AboutSection from '../../components/common/AboutSection';
import heroImg1 from '../../assets/images/madeira-hero.jpg';
import heroImg2 from '../../assets/images/madeira-hero-2.jpg';
import heroImg3 from '../../assets/images/madeira-hero-3.jpg';
import './Home.css';

export default function Home() {
  const { t } = useLanguage();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(null);

  const heroSlides = [
    {
      id: 1,
      title: t('hero.slide1Title'),
      subtitle: t('hero.slide1Subtitle'),
      image: heroImg1,
      ctaText: t('hero.slide1Cta'),
      ctaLink: ROUTES.BOOKING,
    },
    {
      id: 2,
      title: t('hero.slide2Title'),
      subtitle: t('hero.slide2Subtitle'),
      image: heroImg2,
      ctaText: t('hero.slide2Cta'),
      ctaLink: ROUTES.TRANSFERS,
    },
    {
      id: 3,
      title: t('hero.slide3Title'),
      subtitle: t('hero.slide3Subtitle'),
      image: heroImg3,
      ctaText: t('hero.slide3Cta'),
      ctaLink: ROUTES.TOURS,
    },
  ];

  // Build tour data using centralized catalog and translations
  const featuredTours = getLocalizedTours(t);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
  };

  // Auto-play slideshow: transitions smoothly every 5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, heroSlides.length]);

  // Touch gesture support for mobile swipe
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNextSlide();
    } else if (diff < -50) {
      handlePrevSlide();
    }
    touchStartXRef.current = null;
  };

  return (
    <div className="home-page">
      {/* Hero Outer Wrapper: Fills nearly the entire viewport */}
      <section className="hero-wrapper" aria-label="Hero Highlights">
        <div
          className="hero-card"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Horizontal Sliding Track: Slides from side to side */}
          <div
            className="hero-slider-track"
            style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
          >
            {heroSlides.map((slide) => (
              <div className="hero-slide-pane" key={slide.id}>
                {/* Background image layer */}
                <div
                  className="hero-bg-layer"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />

                {/* Dark / Vignette overlay */}
                <div className="hero-overlay" />

                {/* Main Content Area */}
                <div className="hero-content">
                  <h1 className="hero-title">
                    {slide.title.split('\n').map((line, idx) => (
                      <span key={idx}>
                        {line}
                        {idx === 0 && <br />}
                      </span>
                    ))}
                  </h1>
                  <p className="hero-subtitle">{slide.subtitle}</p>
                  <div className="hero-cta">
                    <Button to={slide.ctaLink} variant="primary">
                      {slide.ctaText}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Bar: Slider Controls & Indicator Dots */}
          <div className="hero-bottom-bar">
            <div className="hero-slider-controls">
              <button
                type="button"
                className="hero-arrow-btn"
                onClick={handlePrevSlide}
                aria-label="Slide anterior"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
              <button
                type="button"
                className="hero-arrow-btn"
                onClick={handleNextSlide}
                aria-label="Próximo slide"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              {/* Slide Dots */}
              <div className="hero-dots">
                {heroSlides.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    className={`hero-dot ${dotIdx === currentSlideIndex ? 'active' : ''}`}
                    onClick={() => setCurrentSlideIndex(dotIdx)}
                    aria-label={`Slide ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Airport Transfers Section (Calculator & Highlights) ── */}
      <AirportTransferSection />

      {/* ── Adventures in Madeira Section ── */}
      <section id="adventures" className="adventures-section">
        <div className="adventures-header">
          <h2 className="adventures-title">
            {t('adventures.sectionTitle')}{' '}
            <em>{t('adventures.sectionTitleItalic')}</em>
          </h2>
        </div>

        <div className="tours-grid">
          {featuredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </section>

      {/* ── About Us Section ── */}
      <AboutSection />
    </div>
  );
}