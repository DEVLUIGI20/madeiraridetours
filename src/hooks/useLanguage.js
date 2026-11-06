import { useContext } from 'react';
import { LanguageContext } from '../context/languageContext';

/**
 * Custom hook to access internationalization context.
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
