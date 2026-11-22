import { Link } from 'react-router-dom';
import ImagePlaceholder from './ImagePlaceholder';
import { useLanguage } from '../../hooks/useLanguage';
import './TourCard.css';

/**
 * Translates a PT duration string ("4 horas", "8 horas", "5–6 horas") into the target language.
 * DE, FR, ES, EN each have their own word for "hours".
 */
function translateDuration(duration, lang) {
  if (!duration) return duration;
  if (lang === 'pt') return duration;

  const hourWord = {
    en: 'hours',
    de: 'Stunden',
    fr: 'heures',
    es: 'horas', // same as PT in ES
  }[lang] || 'hours';

  // Replace "horas" (PT) with the target language word
  return duration.replace('horas', hourWord);
}

/**
 * Returns the best-match content for a given language from a map of fields.
 * Falls back: lang-specific → EN → PT
 */
function pick(lang, { pt, en, de, fr, es }) {
  if (lang === 'pt') return pt || en;
  if (lang === 'de') return de || en || pt;
  if (lang === 'fr') return fr || en || pt;
  if (lang === 'es') return es || en || pt;
  return en || pt; // default EN
}

export default function TourCard({ tour }) {
  const { currentLang, t } = useLanguage();
  const {
    id,
    title,
    titleEn,
    titleDe,
    titleFr,
    titleEs,
    subtitle,
    subtitleEn,
    subtitleDe,
    subtitleFr,
    subtitleEs,
    duration,
    price,
    price4,
    price8,
    category,
    highlights = [],
    highlightsEn = [],
    highlightsDe = [],
    highlightsFr = [],
    highlightsEs = [],
    image = null,
  } = tour;

  // Translation object for this section
  const tc = t('tourCard') || {};

  // ── Multilingual content ──────────────────────────────
  const displayTitle = pick(currentLang, {
    pt: title,
    en: titleEn || title,
    de: titleDe || titleEn || title,
    fr: titleFr || titleEn || title,
    es: titleEs || titleEn || title,
  });

  const displaySubtitle = (() => {
    if (currentLang === 'pt') return subtitle !== undefined ? subtitle : subtitleEn;
    if (currentLang === 'de') return subtitleDe || subtitleEn || (titleDe ? '' : subtitle);
    if (currentLang === 'fr') return subtitleFr || subtitleEn || (titleFr ? '' : subtitle);
    if (currentLang === 'es') return subtitleEs || subtitleEn || (titleEs ? '' : subtitle);
    return subtitleEn || (titleEn ? '' : subtitle);
  })();

  const displayHighlights = (() => {
    let list;
    if (currentLang === 'de') {
      list = (highlightsDe && highlightsDe.length > 0) ? highlightsDe : (highlightsEn && highlightsEn.length > 0) ? highlightsEn : highlights;
    } else if (currentLang === 'fr') {
      list = (highlightsFr && highlightsFr.length > 0) ? highlightsFr : (highlightsEn && highlightsEn.length > 0) ? highlightsEn : highlights;
    } else if (currentLang === 'es') {
      list = (highlightsEs && highlightsEs.length > 0) ? highlightsEs : (highlightsEn && highlightsEn.length > 0) ? highlightsEn : highlights;
    } else if (currentLang !== 'pt') {
      list = (highlightsEn && highlightsEn.length > 0) ? highlightsEn : highlights;
    } else {
      list = highlights;
    }
    return (list || []).slice(0, 3);
  })();

  const displayDuration = translateDuration(duration, currentLang);

  // ── Pricing ──────────────────────────────────────────
  const p4 = price4 || price || 90;

  // ── UI labels from translations ──────────────────────
  const categoryKey = `category_${category}`;
  const categoryLabel = tc[categoryKey] || category || '';
  const bookText = tc.book || 'Book';
  const fromText = tc.from || 'from';

  return (
    <article className="tour-card-mockup">
      {/* Media */}
      <div className="tour-card-mockup__media">
        <ImagePlaceholder
          src={image}
          alt={displayTitle}
          aspectRatio="16/10"
          className="tour-card-mockup__img"
        />
        {categoryLabel && (
          <span className="tour-card-mockup__badge">{categoryLabel}</span>
        )}
      </div>

      {/* Body */}
      <div className="tour-card-mockup__body">
        {/* Title */}
        <h3 className="tour-card-mockup__title">
          <Link to={`/tours/${id}`}>{displayTitle}</Link>
        </h3>

        {/* Subtitle */}
        {displaySubtitle && (
          <p className="tour-card-mockup__subtitle">{displaySubtitle}</p>
        )}

        {/* Duration + from price */}
        <div className="tour-card-mockup__meta">
          <span className="tour-card-mockup__duration">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
            </svg>
            {displayDuration}
          </span>
          <span className="tour-card-mockup__separator">•</span>
          <span className="tour-card-mockup__price-inline">
            {fromText} <strong>{p4}€</strong>
          </span>
        </div>

        {/* Highlights */}
        {displayHighlights.length > 0 && (
          <ul className="tour-card-mockup__highlights">
            {displayHighlights.map((h, i) => (
              <li key={i}>
                <span className="tour-card-mockup__check" aria-hidden="true">✓</span>
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Footer: book button */}
        <div className="tour-card-mockup__footer">
          <Link to={`/booking?service=${id}`} className="tour-card-mockup__btn">
            {bookText}
          </Link>
        </div>
      </div>
    </article>
  );
}
