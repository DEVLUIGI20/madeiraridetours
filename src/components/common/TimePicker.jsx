import { useState, useRef, useEffect, useMemo } from 'react';
import './TimePicker.css';

/**
 * Luxury TimePicker component replacing native browser time inputs.
 * Features a stylish trigger with clock icon, clear time preview,
 * and an intuitive dropdown grid with preset quick times and precise hour/minute selection.
 */
export default function TimePicker({
  value = '10:00',
  onChange,
  className = '',
  required = false,
  language = 'pt',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Parse hour and minute from value (HH:mm)
  const { hour, minute } = useMemo(() => {
    if (!value || typeof value !== 'string' || !value.includes(':')) {
      return { hour: '10', minute: '00' };
    }
    const [h, m] = value.split(':');
    return {
      hour: (h || '10').padStart(2, '0'),
      minute: (m || '00').padStart(2, '0'),
    };
  }, [value]);

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

  const handleSelectHour = (h) => {
    const formatted = `${String(h).padStart(2, '0')}:${minute}`;
    onChange(formatted);
  };

  const handleSelectMinute = (m) => {
    const formatted = `${hour}:${String(m).padStart(2, '0')}`;
    onChange(formatted);
  };

  const hoursList = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
  const minutesList = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

  return (
    <div className={`mrt-timepicker-container ${className}`} ref={containerRef}>
      <button
        type="button"
        className={`mrt-timepicker-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Selecionar hora"
      >
        <span className="mrt-timepicker-display">{value || '10:00'}</span>
        <svg
          className="mrt-timepicker-clock-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </button>

      {/* Hidden input for HTML form compliance */}
      <input type="hidden" value={value} required={required} />

      {isOpen && (
        <div className="mrt-timepicker-dropdown">
          <div className="mrt-tp-header">
            <span className="mrt-tp-title">
              {language === 'pt' ? 'Escolha o Horário' : 'Select Time'}
            </span>
            <span className="mrt-tp-current-badge">{value}</span>
          </div>

          {/* Precision Hour and Minute columns */}
          <div className="mrt-tp-selector-grid">
            {/* Hours Column */}
            <div className="mrt-tp-col">
              <div className="mrt-tp-col-title">
                {language === 'pt' ? 'Hora' : 'Hour'}
              </div>
              <div className="mrt-tp-scroll-list">
                {hoursList.map((h) => {
                  const isSelected = h === hour;
                  return (
                    <button
                      key={h}
                      type="button"
                      className={`mrt-tp-item-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => handleSelectHour(h)}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mrt-tp-colon-divider">:</div>

            {/* Minutes Column */}
            <div className="mrt-tp-col">
              <div className="mrt-tp-col-title">
                {language === 'pt' ? 'Minuto' : 'Min'}
              </div>
              <div className="mrt-tp-scroll-list">
                {minutesList.map((m) => {
                  const isSelected = m === minute;
                  return (
                    <button
                      key={m}
                      type="button"
                      className={`mrt-tp-item-btn ${isSelected ? 'active' : ''}`}
                      onClick={() => handleSelectMinute(m)}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mrt-tp-footer">
            <button
              type="button"
              className="mrt-tp-confirm-btn"
              onClick={() => setIsOpen(false)}
            >
              {language === 'pt' ? 'Confirmar Horário' : 'Set Time'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
