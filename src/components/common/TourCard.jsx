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
    titleEn,
    duration,
    price,
    price4,
    price8,
    rating = 5.0,
    reviewsCount = 100,
    image = null,
  } = tour;

  const displayTitle = currentLang !== 'pt' && titleEn ? titleEn : title;
  const p4 = price4 || price || 90;
  const p8 = price8 || (price ? Math.round(price * 1.33) : 120);
  const lowestPrice = Math.min(p4, p8);
  const fromText = currentLang === 'pt' ? 'desde' : currentLang === 'de' ? 'ab' : currentLang === 'fr' ? 'dès' : currentLang === 'es' ? 'desde' : 'from';
  const bookText = currentLang === 'pt' ? 'Reservar' : currentLang === 'de' ? 'Buchen' : currentLang === 'fr' ? 'Réserver' : currentLang === 'es' ? 'Reservar' : 'Book';

  return (
    <article className="tour-card-mockup">
      {/* Top Image or Placeholder with Heart Icon */}
      <div className="tour-card-mockup__media">
        <ImagePlaceholder
          src={image}
          alt={displayTitle}
          aspectRatio="16/10"
          className="tour-card-mockup__img"
        />
      </div>

      {/* Card Info */}
      <div className="tour-card-mockup__body">
        <h3 className="tour-card-mockup__title">
          <Link to={`/tours/${id}`}>{displayTitle}</Link>
        </h3>

        <div className="tour-card-mockup__meta">
          <span className="tour-card-mockup__duration">{duration}</span>
          <span className="tour-card-mockup__separator">•</span>
          <span className="tour-card-mockup__price">{fromText} <strong>{lowestPrice}€</strong></span>
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
