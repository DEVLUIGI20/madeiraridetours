import { useState, useRef, useCallback, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { MAP_LOCATIONS } from '../../constants/mapLocations';
import { ROUTES } from '../../constants';
import mapBg from '../../assets/images/madeira-map.jpg';
import './InteractiveMapSection.css';

export default function InteractiveMapSection() {
  const { currentLang, t } = useLanguage();
  const [activeLocation, setActiveLocation] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [balloonPos, setBalloonPos] = useState({ x: 0, y: 0, alignClass: '' });

  const dragStartRef = useRef({ x: 0, y: 0 });
  const wrapperRef = useRef(null);
  const closeTimerRef = useRef(null);

  const cancelClose = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback((delay = 240) => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      setActiveLocation(null);
    }, delay);
  }, [cancelClose]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const filteredLocations = MAP_LOCATIONS.filter((loc) => {
    if (filterType === 'all') return true;
    return loc.type === filterType;
  });

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.35, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.35, 1);
      if (next === 1) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    cancelClose();
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    setActiveLocation(null);
  };

  const handleMouseDown = (e) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - panPosition.x,
      y: e.clientY - panPosition.y,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || zoomLevel <= 1) return;
    setPanPosition({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Compute balloon position in wrapper coordinates from pin element
  const openBalloon = useCallback((loc, pinEl) => {
    cancelClose();
    if (!wrapperRef.current || !pinEl) return;
    const wrapRect = wrapperRef.current.getBoundingClientRect();
    const pinRect = pinEl.getBoundingClientRect();

    const cx = pinRect.left + pinRect.width / 2 - wrapRect.left;
    const cy = pinRect.top - wrapRect.top;

    const wrapW = wrapRect.width;
    const balloonW = 250;
    const classes = [];

    // Horizontal boundaries
    if (cx + balloonW / 2 > wrapW - 16) {
      classes.push('align-right');
    } else if (cx - balloonW / 2 < 16) {
      classes.push('align-left');
    }

    // Flip below only if practically touching the top border
    if (cy < 80) {
      classes.push('align-bottom');
    }

    setBalloonPos({
      x: Math.round(cx),
      y: Math.round(cy),
      alignClass: classes.join(' '),
    });
    setActiveLocation(loc);
  }, [cancelClose]);

  // Localized balloon content
  const balloonI18n = activeLocation
    ? (activeLocation.i18n?.[currentLang] || activeLocation.i18n?.['en'] || activeLocation.i18n?.['pt'] || {})
    : {};
  const balloonTitle = balloonI18n.title || activeLocation?.title || '';
  const balloonCategory = balloonI18n.category || activeLocation?.category || '';
  const balloonRegion = balloonI18n.region || activeLocation?.region || '';
  const balloonSpec = balloonI18n.shortSpec || activeLocation?.shortSpec || '';
  const balloonDesc = balloonI18n.description || activeLocation?.description || '';
  const balloonIsLugar = activeLocation?.type === 'lugar';

  return (
    <section className="interactive-map-section" id="island-map" aria-label="Mapa da Madeira">
      <div className="interactive-map-container">

        {/* ── Section Header ── */}
        <div className="map-section-header">
          <h2 className="map-section-title">
            {t('mapSection.titleMain')}{' '}
            <em>{t('mapSection.titleItalic')}</em>
          </h2>
          <p className="map-section-subtitle">
            {t('mapSection.subtitle')}
          </p>
          <p className="map-section-hint">
            {t('mapSection.hint')}
          </p>
        </div>

        {/* ── Interactive Map Viewport ── */}
        <div
          ref={wrapperRef}
          className={`map-card-wrapper ${isDragging ? 'grabbing' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            handleMouseUp();
            scheduleClose(150);
          }}
        >
          {/* Top Right Zoom Controls */}
          <div className="map-zoom-controls" aria-label="Controlos de zoom">
            <button
              type="button"
              className="map-zoom-btn"
              onClick={handleZoomIn}
              aria-label="Aumentar zoom (+)"
              title="Aumentar zoom (+)"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <div className="map-zoom-divider" />
            <button
              type="button"
              className="map-zoom-btn"
              onClick={handleZoomOut}
              aria-label="Diminuir zoom (-)"
              title="Diminuir zoom (-)"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <div className="map-zoom-divider" />
            <button
              type="button"
              className="map-zoom-btn map-zoom-btn--reset"
              onClick={handleResetZoom}
              aria-label="Repor vista do mapa"
              title="Repor mapa"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          </div>

          {/* Clip container keeps the map image and pins inside the card shape */}
          <div className="map-canvas-clip">
            {/* Scalable & Pannable Canvas */}
            <div
              className="map-canvas"
              style={{
                transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
              }}
            >
              <img
                src={mapBg}
                alt="Fotografia de Satélite da Ilha da Madeira com pontos de interesse"
                className="map-bg-image"
                draggable="false"
              />

              {filteredLocations.map((loc) => {
                const isSelected = activeLocation?.id === loc.id;
                const isLugar = loc.type === 'lugar';

                return (
                  <div
                    key={loc.id}
                    className={`map-pin-anchor ${isSelected ? 'active' : ''}`}
                    style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                    onMouseEnter={(e) => openBalloon(loc, e.currentTarget)}
                    onMouseLeave={() => scheduleClose(240)}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isSelected) {
                        cancelClose();
                        setActiveLocation(null);
                      } else {
                        openBalloon(loc, e.currentTarget);
                      }
                    }}
                  >
                    <button
                      type="button"
                      className={`map-marker-pin map-marker-pin--${loc.type} ${isSelected ? 'is-active' : ''}`}
                      aria-label={`${loc.title} (${isLugar ? t('mapSection.places') : t('mapSection.levadas')})`}
                    >
                      {isSelected && <span className={`marker-glow marker-glow--${loc.type}`} />}
                      <svg
                        className="marker-svg"
                        viewBox="0 0 28 34"
                        width="24"
                        height="29"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <radialGradient id={`sh-${loc.id}`} cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="rgba(0, 0, 0, 0.45)" />
                            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
                          </radialGradient>
                          <linearGradient id={`grad-lugar-${loc.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fde047" />
                            <stop offset="100%" stopColor="#eab308" />
                          </linearGradient>
                          <linearGradient id={`grad-levada-${loc.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#34d399" />
                            <stop offset="100%" stopColor="#059669" />
                          </linearGradient>
                        </defs>
                        <ellipse cx="14" cy="31" rx="6" ry="2.2" fill={`url(#sh-${loc.id})`} />
                        <path
                          d="M14 2C7.925 2 3 6.925 3 13c0 7.8 9.2 15.6 10.3 16.5.4.35 1 .35 1.4 0C15.8 28.6 25 20.8 25 13c0-6.075-4.925-11-11-11z"
                          fill={isLugar ? `url(#grad-lugar-${loc.id})` : `url(#grad-levada-${loc.id})`}
                          stroke="#ffffff"
                          strokeWidth="2.2"
                          strokeLinejoin="round"
                        />
                        {isLugar ? (
                          <circle cx="14" cy="13" r="3.6" fill="#1e293b" />
                        ) : (
                          <text
                            x="14"
                            y="15.6"
                            textAnchor="middle"
                            fill="#ffffff"
                            fontSize="7"
                            fontWeight="900"
                            fontFamily="system-ui, -apple-system, sans-serif"
                            letterSpacing="-0.5px"
                          >
                            PR
                          </text>
                        )}
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── BALLOON rendered OUTSIDE the scaled canvas, inside wrapper ── */}
          {activeLocation && (
            <div
              className={`map-info-balloon map-info-balloon--fixed ${balloonPos.alignClass}`}
              style={{
                left: `${balloonPos.x}px`,
                top: `${balloonPos.y}px`,
              }}
              onMouseEnter={cancelClose}
              onMouseLeave={() => scheduleClose(240)}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="balloon-top">
                <span className={`balloon-badge balloon-badge--${activeLocation.type}`}>
                  {balloonIsLugar ? (
                    <>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                      <span>{balloonCategory}</span>
                    </>
                  ) : (
                    <>
                      <span className="badge-pr-pill">PR</span>
                      <span>{balloonCategory}</span>
                    </>
                  )}
                </span>
                {balloonRegion && (
                  <span className="balloon-region">{balloonRegion}</span>
                )}
                <button
                  type="button"
                  className="balloon-close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    cancelClose();
                    setActiveLocation(null);
                  }}
                  aria-label="Fechar"
                >
                  ×
                </button>
              </div>

              <h4 className="balloon-title">{balloonTitle}</h4>

              {balloonSpec && (
                <div className="balloon-spec-pill">
                  <span className="spec-bullet" />
                  <span>{balloonSpec}</span>
                </div>
              )}

              <p className="balloon-desc">{balloonDesc}</p>

              <div className="balloon-footer">
                <a href={ROUTES.BOOKING} className="balloon-cta-btn">
                  <span>{t('mapSection.bookTransfer')}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* ── Bottom Legend & Filter Bar ── */}
        <div className="map-legend-bar">
          <button
            type="button"
            className={`map-legend-item ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            <span className="legend-all-icon">🌐</span>
            <span>{t('mapSection.all')} ({MAP_LOCATIONS.length})</span>
          </button>

          <button
            type="button"
            className={`map-legend-item ${filterType === 'lugar' ? 'active' : ''}`}
            onClick={() => setFilterType('lugar')}
          >
            <span className="legend-dot legend-dot--yellow" />
            <span>{t('mapSection.places')} ({MAP_LOCATIONS.filter((l) => l.type === 'lugar').length})</span>
          </button>

          <button
            type="button"
            className={`map-legend-item ${filterType === 'levada' ? 'active' : ''}`}
            onClick={() => setFilterType('levada')}
          >
            <span className="legend-dot legend-dot--green" />
            <span>{t('mapSection.levadas')} ({MAP_LOCATIONS.filter((l) => l.type === 'levada').length})</span>
          </button>
        </div>

      </div>
    </section>
  );
}
