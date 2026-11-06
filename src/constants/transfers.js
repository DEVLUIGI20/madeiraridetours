import { makeWhatsAppUrl } from './index';

/**
 * Madeira Airport (FNC) Transfer Destinations and Reference Pricing.
 * Base prices are for 1-4 passengers, One Way.
 */
export const TRANSFER_DESTINATIONS = [
  { id: 'funchal', name: 'Funchal', daytime: 28, night: 38 },
  { id: 'santa-cruz', name: 'Santa Cruz', daytime: 17.5, night: 20 },
  { id: 'machico', name: 'Machico', daytime: 17.5, night: 20 },
  { id: 'santana', name: 'Santana', daytime: 30, night: 38 },
  { id: 'camara-de-lobos', name: 'Câmara de Lobos', daytime: 36, night: 43 },
  { id: 'ribeira-brava', name: 'Ribeira Brava', daytime: 46, night: 55 },
  { id: 'ponta-do-sol', name: 'Ponta do Sol', daytime: 55, night: 66 },
  { id: 'calheta', name: 'Calheta', daytime: 66, night: 76 },
  { id: 'sao-vicente', name: 'São Vicente', daytime: 66, night: 76 },
  { id: 'porto-moniz', name: 'Porto Moniz', daytime: 76, night: 88 },
];

export const WHATSAPP_PHONE = '351916326716';

/**
 * Mountain & Levada Transfer Services Catalog
 */
export const MOUNTAIN_TRANSFERS_CATALOG = [
  {
    id: 'sunrise',
    duration: '4h',
    durationLabelKey: 'levadaTransfers.sunriseTag',
    durationLabelDefault: 'Sunrise',
    titleKey: 'levadaTransfers.sunriseTitle',
    titleDefault: 'Sunrise at Pico do Areeiro',
    highlights: [
      'Funchal → Pico do Areeiro (1818 m)',
      'Early-morning pickup in Funchal',
      'Watch sunrise above the clouds',
      'Stops at panoramic viewpoints',
      'Prices include the round trip',
    ],
    price4: 90,
    price6: 120,
    waText: 'Olá! Gostaria de reservar o transfer Sunrise at Pico do Areeiro (1818m).',
  },
  {
    id: 'sunset',
    duration: '4h',
    durationLabelKey: 'levadaTransfers.sunsetTag',
    durationLabelDefault: 'Sunset',
    titleKey: 'levadaTransfers.sunsetTitle',
    titleDefault: 'Sunset at Pico do Areeiro',
    highlights: [
      'Funchal → Pico do Areeiro (1818 m)',
      'Late-afternoon pickup in Funchal',
      'Watch sunset above the clouds',
      'Stops at panoramic viewpoints',
      'Round trip included',
    ],
    price4: 90,
    price6: 120,
    waText: 'Olá! Gostaria de reservar o transfer Sunset at Pico do Areeiro (1818m).',
  },
  {
    id: 'pr1-trail',
    duration: '5h',
    durationLabelKey: 'levadaTransfers.pr1TrailTag',
    durationLabelDefault: 'PR1 Trail',
    titleKey: 'levadaTransfers.pr1TrailTitle',
    titleDefault: 'Pico Ruivo Transfer (PR1)',
    highlights: [
      'Pico do Areeiro ↔ Achada do Teixeira',
      'Pico do Areeiro → Achada do Teixeira',
      'Achada do Teixeira → Pico do Areeiro',
      'Drop-off at start & pickup at end',
      'Round trip included',
    ],
    price4: 90,
    price6: 120,
    waText: 'Olá! Gostaria de reservar o transfer PR1 Pico Ruivo (Pico do Areeiro ↔ Achada do Teixeira).',
  },
  {
    id: 'pr6-25-fontes',
    duration: '4h',
    durationLabelKey: 'adventures.halfDay',
    durationLabelDefault: 'Half day',
    titleKey: 'levadaTransfers.pr6Title',
    titleDefault: 'PR6 – Levada das 25 Fontes',
    highlights: [
      'Rabaçal laurel forest access',
      'Waterfalls and natural lagoon',
      'About 3h walking trail',
      'Dedicated driver pickup & return',
    ],
    price4: 80,
    price6: 100,
    waText: 'Olá! Gostaria de reservar o transfer para a PR6 – Levada das 25 Fontes (Rabaçal).',
  },
  {
    id: 'pr62-alecrim',
    duration: '4h',
    durationLabelKey: 'adventures.halfDay',
    durationLabelDefault: 'Half day',
    titleKey: 'levadaTransfers.pr62Title',
    titleDefault: 'PR6.2 – Levada do Alecrim',
    highlights: [
      'Rabaçal — flat and easy path',
      'Along levada to Lagoa do Vento',
      'About 3h walking trail',
      'Round trip transfer included',
    ],
    price4: 80,
    price6: 100,
    waText: 'Olá! Gostaria de reservar o transfer para a PR6.2 – Levada do Alecrim (Rabaçal).',
  },
  {
    id: 'pr8-sao-lourenco',
    duration: '4h',
    durationLabelKey: 'adventures.halfDay',
    durationLabelDefault: 'Half day',
    titleKey: 'levadaTransfers.pr8Title',
    titleDefault: 'PR8 – Ponta de São Lourenço',
    highlights: [
      'Eastern peninsula coastal trail',
      'Unique cliffs & ocean views',
      'About 2h30 walking trail',
      'Scheduled drop-off & pickup',
    ],
    price4: 70,
    price6: 90,
    waText: 'Olá! Gostaria de reservar o transfer para a PR8 – Ponta de São Lourenço.',
  },
  {
    id: 'pr9-caldeirao-verde',
    duration: '5h',
    durationLabelKey: 'adventures.fullDay',
    durationLabelDefault: 'Full day',
    titleKey: 'levadaTransfers.pr9Title',
    titleDefault: 'PR9 – Caldeirão Verde',
    highlights: [
      'Queimadas forest park access',
      'Tunnels, streams & 100m waterfall',
      'About 4h30 walking trail',
      'Round trip transfer included',
    ],
    price4: 80,
    price6: 100,
    waText: 'Olá! Gostaria de reservar o transfer para a PR9 – Levada do Caldeirão Verde.',
  },
  {
    id: 'pr18-levada-rei',
    duration: '4h',
    durationLabelKey: 'adventures.halfDay',
    durationLabelDefault: 'Half day',
    titleKey: 'levadaTransfers.pr18Title',
    titleDefault: 'PR18 – Levada do Rei',
    highlights: [
      'Santana laurel-forest trail',
      'Views over the lush north coast',
      'About 3h walking trail',
      'Drop-off and finish pickup',
    ],
    price4: 80,
    price6: 100,
    waText: 'Olá! Gostaria de reservar o transfer para a PR18 – Levada do Rei (Santana).',
  },
];

/**
 * Build localized transfer services list for TourCard rendering
 */
export function getLocalizedTransferServices(t) {
  return MOUNTAIN_TRANSFERS_CATALOG.map((item) => ({
    id: item.id,
    duration: item.duration,
    durationLabel: t(item.durationLabelKey, item.durationLabelDefault),
    title: t(item.titleKey, item.titleDefault),
    highlights: item.highlights,
    images: [],
    price4: item.price4,
    price6: item.price6,
    bookLink: makeWhatsAppUrl(item.waText),
  }));
}
