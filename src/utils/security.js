/**
 * Input sanitization and security helpers for forms and external inputs.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CLEAN_REGEX = /[^0-9+]/g;

/**
 * Strips potential HTML tags and malicious characters from user text inputs.
 * @param {string} input
 * @returns {string}
 */
export function sanitizeText(input = '') {
  if (typeof input !== 'string') return '';
  return input
    .replace(/[<>]/g, '')
    .trim();
}

/**
 * Validates standard email address format.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email = '') {
  return typeof email === 'string' && EMAIL_REGEX.test(email.trim());
}

/**
 * Validates and normalizes phone number (requires at least 7 digits, supports international prefixes).
 * @param {string} phone
 * @returns {boolean}
 */
export function isValidPhone(phone = '') {
  if (typeof phone !== 'string') return false;
  const digits = phone.replace(/[^0-9]/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

/**
 * Normalizes phone number with optional default country prefix if missing (+351 for Madeira/PT)
 * @param {string} phone
 * @returns {string}
 */
export function formatInternationalPhone(phone = '') {
  const cleaned = phone.trim().replace(/[^\d+]/g, '');
  if (!cleaned) return '';
  if (cleaned.startsWith('+') || cleaned.startsWith('00')) {
    return cleaned;
  }
  // If no prefix given, default to Portugal (+351)
  return `+351 ${cleaned}`;
}

/**
 * Formats phone number for display/links.
 * @param {string} phone
 * @returns {string}
 */
export function cleanPhone(phone = '') {
  return phone.replace(PHONE_CLEAN_REGEX, '');
}

