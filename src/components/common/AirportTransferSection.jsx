import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { TRANSFER_DESTINATIONS, WHATSAPP_PHONE } from '../../constants/transfers';
import airportImgDefault from '../../assets/images/madeira-airport.jpg';
import './AirportTransferSection.css';

/**
 * Format price: integers as 28€, decimals as 17,5€
 */
function formatPrice(amount) {
  if (amount == null) return '—';
  const rounded = Math.round(amount * 10) / 10;
  return Number.isInteger(rounded)
    ? `${rounded}€`
    : `${rounded.toString().replace('.', ',')}€`;
}

export default function AirportTransferSection({ airportImage = airportImgDefault }) {
  const { t } = useLanguage();
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState('porto-moniz');
  const [tripType, setTripType] = useState('one-way'); // 'one-way' | 'return'
  const [passengers, setPassengers] = useState('1-4'); // '1-4' | '5-8'

  const currentDestination =
    TRANSFER_DESTINATIONS.find((d) => d.id === selectedMunicipalityId) ||
    TRANSFER_DESTINATIONS[0];

  // Calculate pricing based on selections
  const tripMultiplier = tripType === 'return' ? 2 : 1;
  const paxMultiplier = passengers === '5-8' ? 1.25 : 1;

  const daytimePrice = currentDestination.daytime * tripMultiplier * paxMultiplier;
  const nightPrice = currentDestination.night * tripMultiplier * paxMultiplier;

  // WhatsApp pre-filled message URL
  const destinationName = currentDestination.name;
  const tripTypeLabel = tripType === 'return' ? t('airportTransfers.returnTrip') : t('airportTransfers.oneWay');
  const paxLabel = passengers === '5-8' ? t('airportTransfers.passengers8') : t('airportTransfers.passengers4');

  const waMessage = encodeURIComponent(
    `Olá! Gostaria de reservar um Transfer do Aeroporto da Madeira (FNC) para ${destinationName} (${tripTypeLabel}, ${paxLabel}). Por favor confirmem disponibilidade.`
  );
  const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${waMessage}`;

  const features = [
    t('airportTransfers.f1'),
    t('airportTransfers.f2'),
    t('airportTransfers.f3'),
    t('airportTransfers.f4'),
    t('airportTransfers.f5'),
    t('airportTransfers.f6'),
  ];

  return (
    <section className="airport-transfers-section" id="airport-transfers" aria-label="Airport Transfers">
      <div className="airport-transfers-container">

        {/* ── TOP BANNER: Overview & Highlights ── */}
        <div className="transfer-hero-card">
          <div className="transfer-hero-grid">
            {/* Left: Airport Image or Placeholder */}
            <div className="transfer-hero-photo-wrap">
              {airportImage ? (
                <img
                  src={airportImage}
                  alt="Aeroporto da Madeira Funchal"
                  className="transfer-hero-img"
                  loading="lazy"
                />
              ) : (
                <div className="transfer-hero-img-placeholder">
                  <span className="placeholder-tag">✈️ Madeira Airport (FNC)</span>
                </div>
              )}
            </div>

            {/* Right: Content & Benefits */}
            <div className="transfer-hero-content">
              <span className="transfer-hero-tag">{t('airportTransfers.tag')}</span>
              <h2 className="transfer-hero-title">
                {t('airportTransfers.titleMain')}{' '}
                <em>{t('airportTransfers.titleItalic')}</em>
              </h2>
              <p className="transfer-hero-subtitle">
                {t('airportTransfers.subtitle')}
              </p>

              {/* 2-Column Features Checklist */}
              <ul className="transfer-features-list">
                {features.map((item, idx) => (
                  <li key={idx} className="transfer-feature-item">
                    <span className="transfer-check-icon" aria-hidden="true">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Action Buttons */}
              <div className="transfer-hero-actions">
                <a href="#transfers-calculator" className="btn-request-quote">
                  {t('airportTransfers.requestQuote')}
                </a>
                <a href="tel:+351916326716" className="btn-call-now">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {t('airportTransfers.callNow')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM CARD: Interactive Price Calculator ── */}
        <div className="transfer-calc-card" id="transfers-calculator">
          <div className="transfer-calc-header">
            <h3 className="transfer-calc-title">{t('airportTransfers.calcTitle')}</h3>
            <p className="transfer-calc-subtitle">{t('airportTransfers.calcSubtitle')}</p>
          </div>

          <div className="transfer-calc-layout">
            {/* Left: Municipality Selector & Filter Toggles */}
            <div className="transfer-calc-controls">
              <span className="calc-group-label">{t('airportTransfers.chooseMunicipality')}</span>

              {/* Municipality Pills */}
              <div className="municipality-pills">
                {TRANSFER_DESTINATIONS.map((dest) => {
                  const isSelected = dest.id === selectedMunicipalityId;
                  return (
                    <button
                      key={dest.id}
                      type="button"
                      className={`municipality-pill ${isSelected ? 'active' : ''}`}
                      onClick={() => setSelectedMunicipalityId(dest.id)}
                    >
                      {dest.name}
                    </button>
                  );
                })}
              </div>

              {/* Segmented Controls: Trip Type & Capacity */}
              <div className="calc-toggles-row">
                {/* Trip Type */}
                <div className="calc-segmented">
                  <button
                    type="button"
                    className={`calc-segment-btn ${tripType === 'one-way' ? 'active' : ''}`}
                    onClick={() => setTripType('one-way')}
                  >
                    {t('airportTransfers.oneWay')}
                  </button>
                  <button
                    type="button"
                    className={`calc-segment-btn ${tripType === 'return' ? 'active' : ''}`}
                    onClick={() => setTripType('return')}
                  >
                    {t('airportTransfers.returnTrip')}
                  </button>
                </div>

                {/* Capacity */}
                <div className="calc-segmented">
                  <button
                    type="button"
                    className={`calc-segment-btn ${passengers === '1-4' ? 'active' : ''}`}
                    onClick={() => setPassengers('1-4')}
                  >
                    {t('airportTransfers.passengers4')}
                  </button>
                  <button
                    type="button"
                    className={`calc-segment-btn ${passengers === '5-8' ? 'active' : ''}`}
                    onClick={() => setPassengers('5-8')}
                  >
                    {t('airportTransfers.passengers8')}
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Dark Pricing Summary Card */}
            <div className="transfer-summary-box">
              <div className="summary-route">
                {t('airportTransfers.airportRoute')} {tripType === 'return' ? '↔' : '→'}{' '}
                {destinationName.toUpperCase()}
              </div>

              <div className="summary-prices">
                <div className="summary-price-row">
                  <span className="summary-price-label">{t('airportTransfers.daytime')}</span>
                  <span className="summary-price-value">{formatPrice(daytimePrice)}</span>
                </div>
                <div className="summary-price-row">
                  <span className="summary-price-label">{t('airportTransfers.night')}</span>
                  <span className="summary-price-value">{formatPrice(nightPrice)}</span>
                </div>
              </div>

              <p className="summary-disclaimer">
                {t('airportTransfers.disclaimer')}
              </p>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-book"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.972.531 1.768.795 2.796.795 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.782-5.767-5.782zm7.747 5.766c-.001 4.274-3.478 7.75-7.747 7.75-1.335 0-2.591-.351-3.69-.963l-4.341 1.137 1.161-4.227c-.705-1.156-1.107-2.508-1.107-3.702 0-4.275 3.477-7.751 7.752-7.751 4.273 0 7.772 3.481 7.972 7.756zm-4.733 2.148c-.198-.1-.41-.144-.658-.239-.148-.057-.282-.095-.417.143-.135.238-.344.477-.478.619-.134.143-.27.167-.468.072-.198-.095-.836-.308-1.593-.983-.589-.526-.987-1.176-1.103-1.374-.116-.198-.012-.305.087-.404.089-.089.198-.232.297-.348.099-.116.132-.198.198-.33.066-.132.033-.247-.016-.346-.05-.099-.446-1.074-.611-1.472-.161-.387-.324-.334-.446-.34-.115-.006-.247-.008-.379-.008s-.347.05-.529.247c-.182.198-.694.678-.694 1.653s.711 1.917.81 2.05c.099.132 1.399 2.137 3.39 2.996 1.99.859 1.99.573 2.348.54.359-.033 1.157-.473 1.322-.929.165-.456.165-.847.116-.946z"/>
                </svg>
                {t('airportTransfers.bookWhatsApp')}
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
