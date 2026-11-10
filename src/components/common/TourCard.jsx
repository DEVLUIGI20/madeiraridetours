import { Link } from 'react-router-dom';
import ImagePlaceholder from './ImagePlaceholder';
import { useLanguage } from '../../hooks/useLanguage';
import './TourCard.css';

/**
 * Modern TourCard matching the Mockup:
 * - Top image slot (placeholder or user image)
 * - Heart / Favorite badge
 * - Title, duration, rating and "from €XX" price tag
 * - Direct link to Tour details or Instant booking
 */
export default function TourCard({ tour }) {
  const { currentLang } = useLanguage();
  const {
    id,
    title,
    duration,
    price,
    rating = 5.0,
    reviewsCount = 100,
    image = null,
  } = tour;

  const bookText = currentLang === 'pt' ? 'Reservar' : currentLang === 'de' ? 'Buchen' : currentLang === 'fr' ? 'Réserver' : currentLang === 'es' ? 'Reservar' : 'Book';
  const fromText = currentLang === 'pt' ? 'desde' : currentLang === 'de' ? 'ab' : currentLang === 'fr' ? 'dès' : currentLang === 'es' ? 'desde' : 'from';

  return (
    <article className="tour-card-mockup">
      {/* Top Image or Placeholder with Heart Icon */}
      <div className="tour-card-mockup__media">
        <ImagePlaceholder
          src={image}
          alt={title}
          aspectRatio="16/10"
          className="tour-card-mockup__img"
        />
        <button
          type="button"
          className="tour-card-mockup__fav"
          aria-label="Add to favorites"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>

      {/* Card Info */}
      <div className="tour-card-mockup__body">
        <h3 className="tour-card-mockup__title">
          <Link to={`/tours/${id}`}>{title}</Link>
        </h3>

        <div className="tour-card-mockup__meta">
          <span className="tour-card-mockup__duration">{duration}</span>
          <span className="tour-card-mockup__separator">•</span>
          <span className="tour-card-mockup__price">{fromText} <strong>€{price}</strong></span>
        </div>

        <div className="tour-card-mockup__footer">
          <div className="tour-card-mockup__rating">
            <span className="tour-card-mockup__star" aria-hidden="true">★</span>
            <strong>{rating.toFixed(1)}</strong>
            <span className="tour-card-mockup__reviews">({reviewsCount})</span>
          </div>

          <Link to={`/booking?service=${id}`} className="tour-card-mockup__btn">
            {bookText}
          </Link>
        </div>
      </div>
    </article>
  );
}
