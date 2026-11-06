import { useState, useEffect, useCallback, useMemo } from 'react';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../constants/translations';
import { LanguageContext } from './languageContext';

const STORAGE_KEY = 'mrt_preferred_language';

/**
 * Automatically detects the client's language based on browser settings.
 */
function detectBrowserLanguage() {
  if (typeof window === 'undefined' || !navigator) {
    return 'en';
  }

  // 1. Check saved choice in localStorage
  try {
    const savedLang = localStorage.getItem(STORAGE_KEY);
    if (savedLang && SUPPORTED_LANGUAGES.some((l) => l.code === savedLang)) {
      return savedLang;
    }
  } catch {
    // Ignore storage errors
  }

  // 2. Check browser languages
  const clientLangs = navigator.languages || [navigator.language || 'en'];
  for (const lang of clientLangs) {
    const primaryCode = lang.split('-')[0].toLowerCase();
    if (SUPPORTED_LANGUAGES.some((l) => l.code === primaryCode)) {
      return primaryCode;
    }
  }

  // 3. Fallback to English as primary international tourism language
  return 'en';
}

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(detectBrowserLanguage);

  useEffect(() => {
    // Sync html tag lang attribute
    document.documentElement.lang = currentLang;
  }, [currentLang]);

  const changeLanguage = useCallback((newLang) => {
    if (SUPPORTED_LANGUAGES.some((l) => l.code === newLang)) {
      setCurrentLang(newLang);
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
      } catch {
        // Ignore localStorage quota / access issues
      }
    }
  }, []);

  /**
   * Helper function to translate keys using dot notation (e.g. 'nav.ourTours').
   */
  const t = useCallback(
    (keyPath) => {
      const keys = keyPath.split('.');
      
      const getNested = (obj) => {
        let current = obj;
        for (const k of keys) {
          if (!current || typeof current !== 'object') return null;
          current = current[k];
        }
        return current;
      };

      // Try current language first, fallback to English
      const val = getNested(TRANSLATIONS[currentLang]) || getNested(TRANSLATIONS['en']);
      return val !== null && val !== undefined ? val : keyPath;
    },
    [currentLang]
  );

  const currentLangObj = useMemo(
    () => SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0],
    [currentLang]
  );

  const contextValue = useMemo(
    () => ({
      currentLang,
      currentLangObj,
      supportedLanguages: SUPPORTED_LANGUAGES,
      changeLanguage,
      t,
    }),
    [currentLang, currentLangObj, changeLanguage, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

