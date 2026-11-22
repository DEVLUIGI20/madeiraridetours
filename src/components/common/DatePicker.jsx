import { useState, useRef, useEffect, useMemo } from 'react';
import './DatePicker.css';

/**
 * Custom luxury DatePicker component that visually renders blocked/booked dates.
 * Blocked dates appear disabled, grayed out with a red slash or "Esgotado / Blocked" tag.
 */
export default function DatePicker({
  value,
  onChange,
  blockedDates = [],
  minDate = null,
  placeholder = 'dd/mm/aaaa',
  label = null,
  required = false,
  className = '',
  language = 'pt',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Parse current value or start from current month
  const initialDate = useMemo(() => {
    if (value) {
      const parts = value.split('-');
      if (parts.length === 3) {
        return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
      }
    }
    return new Date();
  }, [value]);

  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth()); // 0-indexed

  // Min date boundary
  const minDateObj = useMemo(() => {
    if (minDate) {
      const parts = minDate.split('-');
      if (parts.length === 3) {
        return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]), 0, 0, 0, 0);
      }
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }, [minDate]);

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

  const monthNames = {
    pt: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    es: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  };

  const weekDays = {
    pt: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    de: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    fr: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    es: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
  };

  const currentMonthNames = monthNames[language] || monthNames.en;
  const currentWeekDays = weekDays[language] || weekDays.en;

  const handlePrevMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = (e) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  // Format date helper: YYYY-MM-DD
  const formatISO = (year, monthIndex, day) => {
    const mm = String(monthIndex + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  // Generate calendar grid
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sunday
  // Shift so Monday is index 0
  const startOffset = (firstDayOfWeek + 6) % 7;

  const calendarDays = [];
  // Empty slots before month start
  for (let i = 0; i < startOffset; i++) {
    calendarDays.push({ empty: true, key: `empty-${i}` });
  }

  // Days of current month
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = formatISO(viewYear, viewMonth, d);
    const dayDate = new Date(viewYear, viewMonth, d, 0, 0, 0, 0);

    const isPast = dayDate < minDateObj;
    const isBlocked = blockedDates.includes(dateStr);
    const isSelected = value === dateStr;

    calendarDays.push({
      empty: false,
      day: d,
      dateStr,
      isPast,
      isBlocked,
      isSelected,
      isDisabled: isPast || isBlocked,
      key: dateStr,
    });
  }

  const handleSelectDay = (dayObj) => {
    if (dayObj.isDisabled) return;
    onChange(dayObj.dateStr);
    setIsOpen(false);
  };

  // Display value formatted nicely
  const displayValue = useMemo(() => {
    if (!value) return '';
    const parts = value.split('-');
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`;
    }
    return value;
  }, [value]);

  return (
    <div className={`custom-datepicker-root ${className}`} ref={containerRef}>
      {label && <label className="custom-datepicker-label">{label}</label>}

      {/* Trigger input */}
      <div
        className={`custom-datepicker-trigger ${isOpen ? 'is-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
      >
        <span className={`trigger-text ${!displayValue ? 'is-placeholder' : ''}`}>
          {displayValue || placeholder}
        </span>
      </div>

      {/* Hidden input for HTML form requirement validation if needed */}
      <input
        type="text"
        required={required}
        value={value || ''}
        readOnly
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', width: 0, height: 0 }}
      />

      {/* Popover Calendar Dropdown */}
      {isOpen && (
        <div className="custom-datepicker-dropdown">
          {/* Header Month / Year */}
          <div className="datepicker-header">
            <button
              type="button"
              className="datepicker-nav-btn"
              onClick={handlePrevMonth}
              title="Mês anterior"
            >
              ‹
            </button>
            <div className="datepicker-month-label">
              <strong>{currentMonthNames[viewMonth]}</strong> <span>{viewYear}</span>
            </div>
            <button
              type="button"
              className="datepicker-nav-btn"
              onClick={handleNextMonth}
              title="Mês seguinte"
            >
              ›
            </button>
          </div>

          {/* Weekday headers */}
          <div className="datepicker-weekdays-row">
            {currentWeekDays.map((w, i) => (
              <span key={i} className="datepicker-weekday">
                {w}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="datepicker-days-grid">
            {calendarDays.map((item) => {
              if (item.empty) {
                return <span key={item.key} className="datepicker-day empty" />;
              }

              let statusClass = '';
              if (item.isSelected) statusClass = 'selected';
              else if (item.isBlocked) statusClass = 'blocked';
              else if (item.isPast) statusClass = 'past';

              return (
                <button
                  key={item.key}
                  type="button"
                  disabled={item.isDisabled}
                  onClick={() => handleSelectDay(item)}
                  className={`datepicker-day ${statusClass}`}
                  title={
                    item.isBlocked
                      ? (language === 'pt' ? 'Data Indisponível / Esgotada' : 'Date Unavailable / Fully Booked')
                      : item.dateStr
                  }
                >
                  <span className="day-number">{item.day}</span>
                  {item.isBlocked && <span className="blocked-badge" aria-hidden="true">✕</span>}
                </button>
              );
            })}
          </div>

          {/* Legend footer */}
          <div className="datepicker-legend">
            <span className="legend-item">
              <span className="legend-dot available" />
              {language === 'pt' ? 'Disponível' : 'Available'}
            </span>
            <span className="legend-item">
              <span className="legend-dot blocked" />
              {language === 'pt' ? 'Bloqueada / Esgotada' : 'Blocked / Sold out'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
