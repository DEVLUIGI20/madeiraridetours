import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import './LanguageSelector.css';

/**
 * Minimalist Language Selector.
 * Displays only the uppercase language initials: EN, PT, DE, FR, ES.
 */
export default function LanguageSelector() {
  const { currentLang, currentLangObj, supportedLanguages, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const selectLanguage = (code) => {
    changeLanguage(code);
    setIsOpen(false);
  };

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="lang-selector-wrapper" ref={containerRef}>
      <button
        type="button"
        className={`lang-selector-btn ${isOpen ? 'open' : ''}`}
        onClick={toggleDropdown}
        aria-label="Selecionar idioma"
        aria-expanded={isOpen}
      >
        <span className="lang-code">{currentLangObj.short}</span>
        <span className="lang-chevron">▼</span>
      </button>

      {isOpen && (
        <div className="lang-dropdown" role="menu">
          {supportedLanguages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={`lang-option ${lang.code === currentLang ? 'active' : ''}`}
              onClick={() => selectLanguage(lang.code)}
              role="menuitem"
            >
              <span className="lang-option-code">{lang.short}</span>
              {lang.code === currentLang && <span className="lang-check">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
