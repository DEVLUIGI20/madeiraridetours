/**
 * Global application constants.
 */

export const ROUTES = {
  HOME: '/',
  TOURS: '/tours',
  TRANSFERS: '/transfers',
  BOOKING: '/booking',
  BOOKING_SUCCESS: '/booking/success',
  BOOKING_CANCEL: '/booking/cancel',
  CONTACT: '/contact',
  FAQ: '/faq',
  ADMIN: '/admin',
};

export const NAV_LINKS = [
  { label: 'Custom Tours', path: ROUTES.TOURS },
  { label: 'Transfers', path: ROUTES.TRANSFERS },
  { label: 'About us', path: '/#about' },
  { label: 'Booking', path: ROUTES.BOOKING },
  { label: 'FAQ', path: ROUTES.FAQ },
];

export const APP_CONFIG = {
  NAME: 'Madeira Ride Tours',
  TAGLINE: 'A place where nature and adventure unite',
  PHONE: '+351 900 000 000',
  EMAIL: 'info@madeiraridetours.com',
};
