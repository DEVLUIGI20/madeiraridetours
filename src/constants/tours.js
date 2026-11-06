import { ROUTES, makeWhatsAppUrl } from './index';

/**
 * Raw tour catalog definitions with translation keys and reference pricing.
 */
export const TOURS_CATALOG = [
  {
    id: 'cabo-girao',
    duration: '4h',
    isFullDay: false,
    titleKey: 'adventures.tour1Title',
    highlightKeys: [
      'adventures.tour1H1',
      'adventures.tour1H2',
      'adventures.tour1H3',
      'adventures.tour1H4',
    ],
    price4: 120,
    price6: 150,
  },
  {
    id: 'monte-toboggan',
    duration: '4h',
    isFullDay: false,
    titleKey: 'adventures.tour2Title',
    highlightKeys: [
      'adventures.tour2H1',
      'adventures.tour2H2',
      'adventures.tour2H3',
      'adventures.tour2H4',
    ],
    price4: 80,
    price6: 100,
  },
  {
    id: 'east-santana',
    duration: '8h',
    isFullDay: true,
    titleKey: 'adventures.tour3Title',
    highlightKeys: [
      'adventures.tour3H1',
      'adventures.tour3H2',
      'adventures.tour3H3',
      'adventures.tour3H4',
      'adventures.tour3H5',
      'adventures.tour3H6',
    ],
    price4: 180,
    price6: 200,
  },
  {
    id: 'wild-north',
    duration: '8h',
    isFullDay: true,
    titleKey: 'adventures.tour4Title',
    highlightKeys: [
      'adventures.tour4H1',
      'adventures.tour4H2',
      'adventures.tour4H3',
      'adventures.tour4H4',
      'adventures.tour4H5',
    ],
    price4: 180,
    price6: 200,
  },
];

/**
 * Helper to build localized tours list for rendering
 */
export function getLocalizedTours(t) {
  return TOURS_CATALOG.map((tour) => ({
    id: tour.id,
    duration: tour.duration,
    durationLabel: tour.isFullDay
      ? t('adventures.fullDay', 'Full day')
      : t('adventures.halfDay', 'Half day'),
    title: t(tour.titleKey),
    highlights: tour.highlightKeys.map((k) => t(k)),
    images: [],
    price4: tour.price4,
    price6: tour.price6,
    bookLink: makeWhatsAppUrl(`Olá! Gostaria de saber mais e reservar o tour "${t(tour.titleKey)}".`),
    bookingRoute: ROUTES.BOOKING,
  }));
}
