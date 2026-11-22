import { useState, useRef, useEffect } from 'react';
import './PassengerPicker.css';

/**
 * Luxury PassengerPicker component replacing the native HTML select.
 * Features an elegant trigger with passenger icon, count badge,
 * plus/minus quick increment controls, and instant selection list.
 */
export default function PassengerPicker({
  value = 1,
  onChange,
  className = '',
  language = 'pt',
  min = 1,
  max = 8,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (n) => {
    onChange(n);
    setIsOpen(false);
  };

  const getLabel = (count) => {
    if (language === 'pt') return count === 1 ? 'Passageiro' : 'Passageiros';
    if (language === 'de') return count === 1 ? 'Passagier' : 'Passagiere';
    if (language === 'fr') return count === 1 ? 'Passager' : 'Passagers';
    if (language === 'es') return count === 1 ? 'Pasajero' : 'Pasajeros';
    return count === 1 ? 'Passenger' : 'Passengers';
  };

  const options = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className={`mrt-paxpicker-container ${className}`} ref={containerRef}>
      <button
        type="button"
        className={`mrt-paxpicker-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Selecionar passageiros"
      >
        <div className="mrt-paxpicker-value-group">
          <svg
            className="mrt-paxpicker-user-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="mrt-paxpicker-display">
            <strong>{value}</strong>
          </span>
        </div>

        <svg
          className={`mrt-paxpicker-chevron ${isOpen ? 'open' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <div className="mrt-paxpicker-dropdown">
          {/* List of direct options */}
          <div className="mrt-paxpicker-list">
            {options.map((n) => {
              const isSelected = n === value;
              return (
                <button
                  key={n}
                  type="button"
                  className={`mrt-pax-item-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelect(n)}
                >
                  <span className="mrt-pax-item-num">{n}</span>
                  <span className="mrt-pax-item-text">{getLabel(n)}</span>
                  {isSelected && (
                    <svg
                      className="mrt-pax-check-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
