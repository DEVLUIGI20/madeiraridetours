import { useState, useRef, useEffect } from 'react';
import { AIRPORT_TRANSFER_LOCATIONS, TRANSFER_REGIONS } from '../../constants/transfersCatalog';
import './DestinationDropdown.css';

const AIRPORT_OPTION = {
  id: 'airport',
  name: 'Madeira Airport (FNC)',
  subtitle: 'Cristiano Ronaldo International Airport',
  isAirport: true,
};

/**
 * Modern luxury dropdown for selecting Madeira Transfer Locations.
 * showDuration prop allows hiding the "~20 min" label on pick-up inputs.
 */
export default function DestinationDropdown({
  selectedId,
  tripType = 'one-way',
  onChange,
  label = 'Destination',
  allowAirport = true,
  disabledId = null,
  showPrice = true,
  showDuration = true,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Determine currently selected object
  const isSelectedAirport = selectedId === 'airport';
  const selectedLoc = isSelectedAirport
    ? AIRPORT_OPTION
    : AIRPORT_TRANSFER_LOCATIONS.find((l) => l.id === selectedId) || AIRPORT_TRANSFER_LOCATIONS[0];

  const activePrice = !isSelectedAirport
    ? (tripType === 'round-trip' ? selectedLoc.roundTripPrice : selectedLoc.oneWayPrice)
    : null;

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const q = searchQuery.toLowerCase().trim();

  const isAirportMatch = allowAirport && disabledId !== 'airport' && (
    !q ||
    AIRPORT_OPTION.name.toLowerCase().includes(q) ||
    AIRPORT_OPTION.subtitle.toLowerCase().includes(q) ||
    'airport'.includes(q) ||
    'aeroporto'.includes(q) ||
    'fnc'.includes(q)
  );

  const filteredLocations = AIRPORT_TRANSFER_LOCATIONS.filter((l) => {
    if (l.id === disabledId) return false;
    if (!q) return true;
    return (
      l.name.toLowerCase().includes(q) ||
      (l.subtitle && l.subtitle.toLowerCase().includes(q))
    );
  });

  const handleSelect = (locId) => {
    onChange(locId);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="dest-dropdown-wrapper" ref={dropdownRef}>
      <span className="dest-dropdown-label">{label}</span>

      {/* Trigger Button */}
      <button
        type="button"
        className={`dest-dropdown-trigger ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="trigger-content">
          <div className="trigger-title-row">
            {isSelectedAirport && <span className="trigger-airport-icon">✈</span>}
            <span className="trigger-name">{selectedLoc.name}</span>
            {showPrice && activePrice && (
              <span className="trigger-price-badge">€{activePrice}</span>
            )}
          </div>
          <span className="trigger-sub">
            {selectedLoc.subtitle || (showDuration ? selectedLoc.duration : '')}
          </span>
        </div>

        <svg
          className={`trigger-chevron ${isOpen ? 'rotated' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div className="dest-dropdown-panel animate-pop">
          {/* Quick Search */}
          <div className="dest-search-bar">
            <svg viewBox="0 0 20 20" fill="currentColor" className="search-icon">
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              autoFocus
              className="dest-search-input"
              placeholder="Search Airport, Funchal, Caniço..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                ×
              </button>
            )}
          </div>

          {/* List grouped by Region + Airport */}
          <div className="dest-items-scroll">
            {/* Airport Option */}
            {isAirportMatch && (
              <div className="dest-region-group">
                <div className="dest-region-title">Airport Terminal</div>
                <div
                  className={`dest-option-item ${isSelectedAirport ? 'selected' : ''}`}
                  onClick={() => handleSelect('airport')}
                  role="option"
                  aria-selected={isSelectedAirport}
                >
                  <div className="dest-item-main">
                    <div className="dest-item-name-row">
                      <span className="dest-airport-lead-icon">✈</span>
                      <span className="dest-item-name">{AIRPORT_OPTION.name}</span>
                      <span className="dest-hub-tag">Hub</span>
                    </div>
                    <span className="dest-item-sub">{AIRPORT_OPTION.subtitle}</span>
                  </div>
                  <div className="dest-item-side">
                    <span className="dest-item-badge-free">Main Hub</span>
                  </div>
                </div>
              </div>
            )}

            {filteredLocations.length === 0 && !isAirportMatch ? (
              <div className="dest-no-results">
                No locations matching "{searchQuery}"
              </div>
            ) : (
              TRANSFER_REGIONS.map((region) => {
                const regionItems = filteredLocations.filter((l) => l.region === region.id);
                if (regionItems.length === 0) return null;

                return (
                  <div key={region.id} className="dest-region-group">
                    <div className="dest-region-title">{region.name}</div>
                    {regionItems.map((loc) => {
                      const isSelected = loc.id === selectedId;
                      const price = tripType === 'round-trip' ? loc.roundTripPrice : loc.oneWayPrice;

                      return (
                        <div
                          key={loc.id}
                          className={`dest-option-item ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleSelect(loc.id)}
                          role="option"
                          aria-selected={isSelected}
                        >
                          <div className="dest-item-main">
                            <div className="dest-item-name-row">
                              <span className="dest-item-name">{loc.name}</span>
                              {loc.popular && <span className="dest-popular-tag">Popular</span>}
                            </div>
                            <span className="dest-item-sub">{loc.subtitle}</span>
                          </div>

                          <div className="dest-item-side">
                            {showPrice && <span className="dest-item-price">€{price}</span>}
                            {showDuration && (
                              <span className="dest-item-duration">~{loc.duration}</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
