import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import './TourCard.css';

/**
 * TourCard — displays a single tour with an auto-playing photo slideshow,
 * badge, title, highlights, pricing and a Book button.
 *
 * Props:
 *  - tour: { id, duration, durationLabel, title, highlights[], images[], price4, price6, bookLink }
 *
 * Slideshow behaviour:
 *  - If images[] has 1+ entries, photos cycle automatically every 3.5 s.
 *  - Pauses on hover; left/right arrow buttons allow manual navigation.
 *  - If images[] is empty, shows an animated placeholder.
 */
export default function TourCard({ tour }) {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const {
    duration,
    durationLabel,
    title,
    highlights = [],
    images = [],
    price4,
    price6,
    bookLink = '#',
  } = tour;

  const hasImages = images.length > 0;
  const multipleImages = images.length > 1;

  // Auto-advance slideshow every 3.5 s
  useEffect(() => {
    if (!multipleImages || isPaused) return;

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(timerRef.current);
  }, [multipleImages, isPaused, images.length]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <article className="tour-card">
      {/* ── Photo Slideshow ───────────────────────── */}
      <div
        className="tour-card__photo-wrap"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {hasImages ? (
          <>
            {/* Slide stack — only active image is visible */}
            <div className="tour-card__slides">
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${title} — foto ${i + 1}`}
                  className={`tour-card__slide ${i === activeIndex ? 'active' : ''}`}
                  loading="lazy"
                />
              ))}
            </div>

            {/* Arrow buttons — only shown when multiple images */}
            {multipleImages && (
              <>
                <button
                  type="button"
                  className="tour-card__arrow tour-card__arrow--prev"
                  onClick={handlePrev}
                  aria-label={t('tourCard.prevPhoto')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="tour-card__arrow tour-card__arrow--next"
                  onClick={handleNext}
                  aria-label={t('tourCard.nextPhoto')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {/* Dot indicators */}
                <div className="tour-card__dots">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`tour-card__dot ${i === activeIndex ? 'active' : ''}`}
                      onClick={() => setActiveIndex(i)}
                      aria-label={`Foto ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="tour-card__photo-placeholder" aria-hidden="true" />
        )}

        {/* Duration Badge */}
        <span className="tour-card__badge">
          {duration} · {durationLabel}
        </span>
      </div>

      {/* ── Card Body ─────────────────────────────── */}
      <div className="tour-card__body">
        <h3 className="tour-card__title">{title}</h3>

        {/* Highlights checklist */}
        {highlights.length > 0 && (
          <ul className="tour-card__highlights">
            {highlights.map((item, i) => (
              <li key={i} className="tour-card__highlight-item">
                <span className="tour-card__check" aria-hidden="true">✓</span>
                {item}
              </li>
            ))}
          </ul>
        )}

        {/* Pricing + Book Button */}
        <div className="tour-card__footer">
          <div className="tour-card__pricing">
            <div className="tour-card__price-row">
              <span className="tour-card__price-label">4 {t('tourCard.people')}</span>
              <span className="tour-card__price-amount">{price4}€</span>
            </div>
            <div className="tour-card__price-row">
              <span className="tour-card__price-label">6–8 {t('tourCard.people')}</span>
              <span className="tour-card__price-amount">{price6}€</span>
            </div>
          </div>

          <a
            href={bookLink}
            className="tour-card__book-btn"
            target={bookLink.startsWith('http') ? '_blank' : undefined}
            rel={bookLink.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {t('tourCard.book')}
          </a>
        </div>
      </div>
    </article>
  );
}
