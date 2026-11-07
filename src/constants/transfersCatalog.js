/**
 * Centralized Transfers & Destinations Catalog.
 * Clean, organized definitions for airport and point-to-point transfers.
 */

export const AIRPORT_TRANSFER_LOCATIONS = [
  { id: 'funchal', name: 'Funchal', price: 30, duration: '20 min' },
  { id: 'canico', name: 'Caniço / Garajau', price: 25, duration: '15 min' },
  { id: 'santa-cruz', name: 'Santa Cruz / Machico', price: 18, duration: '10 min' },
  { id: 'camara-de-lobos', name: 'Câmara de Lobos', price: 38, duration: '25 min' },
  { id: 'ribeira-brava', name: 'Ribeira Brava', price: 48, duration: '35 min' },
  { id: 'ponta-do-sol', name: 'Ponta do Sol', price: 55, duration: '40 min' },
  { id: 'calheta', name: 'Calheta', price: 65, duration: '50 min' },
  { id: 'santana', name: 'Santana', price: 40, duration: '30 min' },
  { id: 'sao-vicente', name: 'São Vicente', price: 65, duration: '50 min' },
  { id: 'porto-moniz', name: 'Porto Moniz', price: 80, duration: '65 min' },
];

export const TRANSFER_VEHICLE_TYPES = [
  {
    id: 'standard-van',
    name: 'Private Standard Van',
    capacity: '1–4 Passengers',
    luggage: '4 Large Bags',
    badge: 'Popular',
    image: null,
  },
  {
    id: 'large-van',
    name: 'Executive Family Van',
    capacity: '5–8 Passengers',
    luggage: '8 Large Bags',
    badge: 'Spacious',
    image: null,
  },
];

/**
 * Mountain & Hiking Transfers Catalog
 */
export const MOUNTAIN_TRANSFERS_CATALOG = [
  {
    id: 'sunrise-pico-arieiro',
    title: 'Sunrise at Pico do Areeiro',
    duration: '4h',
    price: 35,
    price4: 90,
    price6: 120,
    highlights: ['Watch sunrise above clouds', 'Pick up in Funchal', 'Round trip included'],
  },
  {
    id: 'sunset-pico-arieiro',
    title: 'Sunset at Pico do Areeiro',
    duration: '4h',
    price: 35,
    price4: 90,
    price6: 120,
    highlights: ['Late-afternoon pickup', 'Watch sunset above clouds', 'Round trip included'],
  },
  {
    id: 'pr1-pico-ruivo',
    title: 'PR1 – Pico do Areeiro to Pico Ruivo',
    duration: '5h',
    price: 35,
    price4: 90,
    price6: 120,
    highlights: ['Trail transfer', 'Achada do Teixeira pickup', 'Flexible schedule'],
  },
  {
    id: 'pr6-25-fontes',
    title: 'PR6 – Levada das 25 Fontes',
    duration: '4h',
    price: 30,
    price4: 80,
    price6: 100,
    highlights: ['Rabaçal valley access', 'Waterfalls lagoon', 'Driver return transfer'],
  },
  {
    id: 'pr8-sao-lourenco',
    title: 'PR8 – Ponta de São Lourenço',
    duration: '4h',
    price: 25,
    price4: 70,
    price6: 90,
    highlights: ['Eastern peninsula trail', 'Scenic coastal cliffs', 'Drop-off & pickup'],
  },
  {
    id: 'pr9-caldeirao-verde',
    title: 'PR9 – Levada do Caldeirão Verde',
    duration: '5h',
    price: 30,
    price4: 80,
    price6: 100,
    highlights: ['Queimadas forest park', '100m waterfall trail', 'Round trip transfer'],
  },
];
