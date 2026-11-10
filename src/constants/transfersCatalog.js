/**
 * Centralized Transfers & Destinations Catalog.
 * Clean, organized definitions for airport, point-to-point transfers and Madeira Adventures.
 */

export const TRANSFER_REGIONS = [
  { id: 'funchal', name: 'Funchal & Surroundings' },
  { id: 'east', name: 'East Coast (Santa Cruz, Machico, Caniço)' },
  { id: 'south-west', name: 'South & South-West (Câmara de Lobos, Ribeira Brava, Calheta)' },
  { id: 'north', name: 'North Coast (São Vicente, Santana, Porto Moniz)' },
];

/**
 * Adventures in Madeira — Private Excursions & Signature Tours
 * Detailed with step-by-step full itineraries & shift slot choices (Morning vs Afternoon for half-day)
 */
export const MADEIRA_ADVENTURES = [
  {
    id: 'cabo-girao-southern-viewpoints',
    title: 'Cabo Girão Skywalk & Southern Viewpoints',
    titlePt: 'Cabo Girão Skywalk & Miradouros do Sul',
    badge: '4h · Half day',
    badgePt: '4h · Meio dia',
    duration: '4h',
    isHalfDay: true,
    timeSlots: [
      { id: 'morning', label: 'Morning Departure', labelPt: 'Partida de Manhã', time: '09:00', returnTime: '13:00' },
      { id: 'afternoon', label: 'Afternoon Departure', labelPt: 'Partida de Tarde', time: '14:00', returnTime: '18:00' },
    ],
    pickupTime: '09:00 or 14:00',
    pickupTimePt: '09:00 ou 14:00',
    dropoffTime: '13:00 or 18:00',
    dropoffTimePt: '13:00 ou 18:00',
    pickupArea: 'Direct pickup at your Hotel / Accommodation in Funchal, Caniço or Câmara de Lobos',
    pickupAreaPt: 'Recolha direta no seu hotel ou alojamento no Funchal, Caniço ou Câmara de Lobos',
    price4: 120,
    price8: 150,
    overview: 'A scenic journey through Madeira’s most dramatic southern sea cliffs, quaint fishing ports and mountain viewpoints.',
    overviewPt: 'Uma viagem panorâmica pelas mais impressionantes falésias do sul da Madeira, portos de pesca típicos e miradouros de montanha.',
    highlights: [
      'Cabo Girão Skywalk (580m glass platform)',
      'Pico dos Barcelos 360° panoramic viewpoint',
      'Picturesque fishing village of Câmara de Lobos',
      'Eira do Serrado looking down into Nun\'s Valley (Curral das Freiras)',
    ],
    highlightsPt: [
      'Cabo Girão Skywalk (plataforma de vidro suspensa a 580m)',
      'Miradouro panorâmico 360° do Pico dos Barcelos',
      'Aldeia piscatória típica de Câmara de Lobos',
      'Eira do Serrado com vista para o Curral das Freiras',
    ],
    itinerary: [
      { step: '1', title: 'Hotel Pick-up', titlePt: 'Recolha no Hotel', desc: 'Direct pick-up from your stay in modern air-conditioned vehicle.', descPt: 'Recolha direta no seu alojamento em viatura moderna com ar condicionado.' },
      { step: '2', title: 'Pico dos Barcelos Viewpoint', titlePt: 'Miradouro do Pico dos Barcelos', desc: 'Stunning 360-degree amphitheater view over the bay of Funchal.', descPt: 'Espetacular vista panorâmica 360° sobre toda a baía do Funchal.' },
      { step: '3', title: 'Eira do Serrado & Nun\'s Valley', titlePt: 'Eira do Serrado & Curral das Freiras', desc: 'Dramatic volcanic caldera viewpoint looking 800m down to Curral das Freiras.', descPt: 'Vista deslumbrante sobre a caldeira vulcânica a 800 metros de profundidade.' },
      { step: '4', title: 'Câmara de Lobos Village', titlePt: 'Vila de Câmara de Lobos', desc: 'Walk around the colorful harbor where Winston Churchill painted.', descPt: 'Passeio pela baía colorida onde Winston Churchill pintava.' },
      { step: '5', title: 'Cabo Girão Skywalk', titlePt: 'Cabo Girão Skywalk', desc: 'Walk on the suspended glass platform over the second highest sea cliff in the world (580m).', descPt: 'Caminhe sobre a plataforma de vidro na segunda falésia marítima mais alta do mundo.' },
      { step: '6', title: 'Hotel Return', titlePt: 'Regresso ao Hotel', desc: 'Comfortable drop-off back at your hotel or chosen location.', descPt: 'Regresso confortável e seguro ao seu alojamento.' },
    ],
    includes: ['Private Mercedes Van', 'Certified Local Chauffeur/Guide', 'Hotel Pick-up & Drop-off', 'Passenger Insurance'],
    includesPt: ['Carrinha Mercedes Privada', 'Motorista/Guia Local Certificado', 'Recolha e Regresso ao Hotel', 'Seguro de Passageiros'],
    image: null,
  },
  {
    id: 'wicker-toboggans-tropical-garden',
    title: 'Wicker Toboggans & Tropical Garden',
    titlePt: 'Carros de Cesto & Jardim Tropical',
    badge: '4h · Half day',
    badgePt: '4h · Meio dia',
    duration: '4h',
    isHalfDay: true,
    timeSlots: [
      { id: 'morning', label: 'Morning Departure', labelPt: 'Partida de Manhã', time: '09:30', returnTime: '13:30' },
      { id: 'afternoon', label: 'Afternoon Departure', labelPt: 'Partida de Tarde', time: '14:30', returnTime: '18:30' },
    ],
    pickupTime: '09:30 or 14:30',
    pickupTimePt: '09:30 ou 14:30',
    dropoffTime: '13:30 or 18:30',
    dropoffTimePt: '13:30 ou 18:30',
    pickupArea: 'Direct pickup at your Hotel / Accommodation in Funchal or Caniço',
    pickupAreaPt: 'Recolha direta no seu hotel ou alojamento no Funchal ou Caniço',
    price4: 80,
    price8: 100,
    overview: 'Discover the hilltop village of Monte, wander exotic gardens and experience the century-old basket toboggan thrill.',
    overviewPt: 'Descubra a histórica vila do Monte, visite jardins exóticos e viva a emoção centenária da descida nos carros de cesto.',
    highlights: [
      'Traditional wicker toboggan ride in Monte',
      'Monte Palace Tropical Garden & exotic flora',
      'Pináculo coastal viewpoint over Funchal bay',
      'Cristo Rei sacred cliff viewpoint in Garajau',
    ],
    highlightsPt: [
      'Descida tradicional de carro de cesto no Monte',
      'Jardim Tropical Monte Palace com flora exótica',
      'Miradouro costeiro do Pináculo sobre o Funchal',
      'Estátua do Cristo Rei e falésia do Garajau',
    ],
    itinerary: [
      { step: '1', title: 'Hotel Pick-up', titlePt: 'Recolha no Hotel', desc: 'Comfortable morning or afternoon departure from your hotel.', descPt: 'Partida confortável de manhã ou à tarde a partir do seu hotel.' },
      { step: '2', title: 'Pináculo Viewpoint', titlePt: 'Miradouro do Pináculo', desc: 'Cliffside panorama overlooking the entire coastline of southern Madeira.', descPt: 'Vista panorâmica costeira sobre todo o anfiteatro do Funchal.' },
      { step: '3', title: 'Garajau & Cristo Rei', titlePt: 'Garajau & Cristo Rei', desc: 'Visit the imposing statue overlooking the Atlantic marine reserve.', descPt: 'Visita à imponente estátua e miradouro sobre a reserva marinha.' },
      { step: '4', title: 'Monte Historic Village & Church', titlePt: 'Vila Histórica & Igreja do Monte', desc: 'Visit the historic Nossa Senhora do Monte church and gardens.', descPt: 'Visita à emblemática igreja de Nossa Senhora do Monte.' },
      { step: '5', title: 'Monte Palace Tropical Gardens', titlePt: 'Jardins Tropicais Monte Palace', desc: 'Explore lakes, flamingos, mineral museum and oriental gardens.', descPt: 'Explore lagos, cisnes, museu de minerais e jardins orientais.' },
      { step: '6', title: 'Traditional Toboggan Sledge Ride', titlePt: 'Descida Tradicional em Carro de Cesto', desc: 'Thrilling downhill slide guided by two traditional "Carreiros".', descPt: 'Descida emocionante pelo asfalto guiada por dois Carreiros do Monte.' },
      { step: '7', title: 'Hotel Return', titlePt: 'Regresso ao Hotel', desc: 'Meet your private driver at Livramento for the return journey.', descPt: 'Encontro com o motorista no Livramento para regresso ao hotel.' },
    ],
    includes: ['Private Mercedes Van', 'Flexible Guide', 'Hotel Pick-up & Drop-off', 'Scenic Route'],
    includesPt: ['Carrinha Mercedes Privada', 'Guia Flexível', 'Recolha e Regresso ao Hotel', 'Rota Panorâmica'],
    image: null,
  },
  {
    id: 'east-pico-areiro-santana',
    title: 'East: Pico do Areeiro & Santana',
    titlePt: 'Este: Pico do Areeiro & Santana',
    badge: '8h · Full day',
    badgePt: '8h · Dia inteiro',
    duration: '8h',
    isHalfDay: false,
    timeSlots: [
      { id: 'full-day', label: 'Full Day Departure', labelPt: 'Partida Dia Inteiro', time: '09:00', returnTime: '17:00' },
    ],
    pickupTime: '08:45 – 09:15',
    pickupTimePt: '08:45 – 09:15',
    dropoffTime: '17:00 – 17:30',
    dropoffTimePt: '17:00 – 17:30',
    pickupArea: 'Direct hotel pickup island-wide (Funchal, Caniço, Santa Cruz, Machico)',
    pickupAreaPt: 'Recolha em qualquer hotel no Funchal, Caniço, Santa Cruz ou Machico',
    price4: 180,
    price8: 200,
    overview: 'The definitive classic east tour: ascend above the clouds to the third highest peak and discover traditional thatched villages.',
    overviewPt: 'O clássico passeio do lado este: suba acima das nuvens até ao 3º pico mais alto e visite as típicas casas de Santana.',
    highlights: [
      'Pico do Areeiro viewpoint (1818m high)',
      'Ribeiro Frio laurissilva & trout ponds',
      'Guindaste cliff viewpoint above the ocean',
      'Traditional Santana thatched heritage houses',
      'Historic rum distillery in Porto da Cruz',
      'Ponta de São Lourenço volcanic peninsula',
    ],
    highlightsPt: [
      'Miradouro do Pico do Areeiro a 1.818 metros',
      'Floresta da Laurissilva no Ribeiro Frio e viveiro de trutas',
      'Miradouro de vidro suspenso do Guindaste',
      'Casas tradicionais de colmo em Santana',
      'Engenho histórico de cana-de-açúcar no Porto da Cruz',
      'Península vulcânica da Ponta de São Lourenço',
    ],
    itinerary: [
      { step: '1', title: 'Hotel Departure', titlePt: 'Partida do Hotel', desc: 'Pick-up and drive up into the dramatic central mountain range.', descPt: 'Recolha e subida panorâmica até ao maciço montanhoso central.' },
      { step: '2', title: 'Pico do Areeiro (1818m)', titlePt: 'Pico do Areeiro (1.818m)', desc: 'Experience jagged volcanic ridges and sea of clouds.', descPt: 'Desfrute das cristas vulcânicas e do mar de nuvens nos cumes.' },
      { step: '3', title: 'Ribeiro Frio & Balcões', titlePt: 'Ribeiro Frio & Balcões', desc: 'Lush indigenous forest and option for the short Balcões walk.', descPt: 'Floresta autóctone exuberante e visita ao miradouro dos Balcões.' },
      { step: '4', title: 'Santana Heritage Village', titlePt: 'Vila Tradicional de Santana', desc: 'Stop for lunch and visit the iconic triangular thatched cottages.', descPt: 'Paragem para almoço e visita às emblemáticas casas triangulares.' },
      { step: '5', title: 'Guindaste Skywalk', titlePt: 'Miradouro do Guindaste', desc: 'Glass platform viewpoint jutting out over the north ocean swell.', descPt: 'Passarela de vidro suspensa com vista direta sobre o oceano norte.' },
      { step: '6', title: 'Porto da Cruz & Eagle Rock', titlePt: 'Porto da Cruz & Penha d’Águia', desc: 'Coastal village known for surfing and historical sugarcane mill.', descPt: 'Vila costeira com engenho tradicional de cana-de-açúcar.' },
      { step: '7', title: 'Ponta de São Lourenço', titlePt: 'Ponta de São Lourenço', desc: 'Semi-arid volcanic peninsula with dramatic contrasting colors.', descPt: 'Península semiárida com falésias vulcânicas e cores contrastantes.' },
      { step: '8', title: 'Drop-off at Stay', titlePt: 'Regresso ao Alojamento', desc: 'Relaxed return drive via Machico and expressway.', descPt: 'Viagem de regresso tranquila pela via rápida.' },
    ],
    includes: ['Full-Day Dedicated Vehicle', 'Certified Guide/Chauffeur', 'Flexible Stops & Photo Opportunities', 'Insurance'],
    includesPt: ['Viatura Exclusiva Todo o Dia', 'Motorista/Guia Certificado', 'Paragens Flexíveis para Fotos', 'Seguro Completo'],
    image: null,
  },
  {
    id: 'wild-north-fanal-seixal-porto-moniz',
    title: 'Wild North Madeira: Fanal, Seixal & Porto Moniz',
    titlePt: 'Norte Selvagem: Fanal, Seixal & Porto Moniz',
    badge: '8h · Full day',
    badgePt: '8h · Dia inteiro',
    duration: '8h',
    isHalfDay: false,
    timeSlots: [
      { id: 'full-day', label: 'Full Day Departure', labelPt: 'Partida Dia Inteiro', time: '08:45', returnTime: '17:15' },
    ],
    pickupTime: '08:30 – 09:00',
    pickupTimePt: '08:30 – 09:00',
    dropoffTime: '17:00 – 17:30',
    dropoffTimePt: '17:00 – 17:30',
    pickupArea: 'Direct hotel pickup island-wide (Funchal, South Coast & West Coast)',
    pickupAreaPt: 'Recolha em hotéis em toda a ilha (Funchal, Costa Sul e Costa Oeste)',
    price4: 180,
    price8: 200,
    overview: 'Explore the raw mystical nature of the north: ancient laurel trees in fairy-tale mist, black sand beaches and volcanic sea pools.',
    overviewPt: 'Descubra a natureza pura do norte: árvores seculares no Fanal, praia de areia preta no Seixal e piscinas de lava vulcânica.',
    highlights: [
      'Fanal mystical ancient laurissilva forest',
      'Seixal black sand beach & Bride\'s Veil waterfall',
      'Porto Moniz natural volcanic rock pools',
      'Ribeira da Janela sea stacks viewpoint',
      'Paul da Serra high plateau (1400m)',
    ],
    highlightsPt: [
      'Floresta mística centenária do Fanal',
      'Praia de areia preta do Seixal e cascata do Véu da Noiva',
      'Piscinas vulcânicas naturais de Porto Moniz',
      'Miradouro dos ilhéus da Ribeira da Janela',
      'Planalto do Paul da Serra a 1.400 metros',
    ],
    itinerary: [
      { step: '1', title: 'Hotel Departure', titlePt: 'Partida do Hotel', desc: 'Scenic journey towards the southwest and up to the central plateau.', descPt: 'Viagem panorâmica em direção ao sudoeste e subida ao planalto.' },
      { step: '2', title: 'Paul da Serra Plateau', titlePt: 'Planalto do Paul da Serra', desc: 'Cross the only high flat plateau on Madeira Island.', descPt: 'Travessia do único planalto plano da ilha da Madeira a 1.400m.' },
      { step: '3', title: 'Fanal Enchanted Forest', titlePt: 'Floresta Encantada do Fanal', desc: 'Walk among 500-year-old Til trees in mystical mountain mist.', descPt: 'Passeio entre tis centenários envoltos no nevoeiro místico.' },
      { step: '4', title: 'Ribeira da Janela Viewpoint', titlePt: 'Miradouro da Ribeira da Janela', desc: 'Marvel at dramatic volcanic sea islets rising from the rough ocean.', descPt: 'Espetaculares formações rochosas e ilhéus no mar revolto do norte.' },
      { step: '5', title: 'Porto Moniz Volcanic Pools', titlePt: 'Piscinas Vulcânicas de Porto Moniz', desc: 'Swim in natural lava pools filled by sea tides & lunch stop.', descPt: 'Tempo para banhos nas piscinas naturais de lava e almoço.' },
      { step: '6', title: 'Seixal Natural Sand Beach', titlePt: 'Praia de Areia Natural do Seixal', desc: 'Black volcanic sand beach surrounded by lush emerald cliffs.', descPt: 'Praia de areia negra vulcânica cercada por encostas verdejantes.' },
      { step: '7', title: 'Bridal Veil Waterfall (Véu da Noiva)', titlePt: 'Cascata do Véu da Noiva', desc: 'Legendary waterfall plunging straight into the ocean.', descPt: 'Cascata lendária que desagua diretamente no oceano.' },
      { step: '8', title: 'Return via São Vicente', titlePt: 'Regresso por São Vicente', desc: 'Comfortable trip back along the northern valley.', descPt: 'Regresso confortável atravessando o vale de São Vicente.' },
    ],
    includes: ['Full-Day Dedicated Vehicle', 'Certified Guide/Chauffeur', 'Swimming Stop Time in Porto Moniz', 'Insurance'],
    includesPt: ['Viatura Exclusiva Todo o Dia', 'Motorista/Guia Certificado', 'Tempo para Banhos em Porto Moniz', 'Seguro Completo'],
    image: null,
  },
];

export const AIRPORT_TRANSFER_LOCATIONS = [
  // Funchal & Arredores
  {
    id: 'funchal',
    name: 'Funchal',
    subtitle: 'Centre, Lido & Hotel Zone',
    region: 'funchal',
    oneWayPrice: 30,
    roundTripPrice: 55,
    duration: '20 min',
    popular: true,
  },
  {
    id: 'monte',
    name: 'Monte / Santo António',
    subtitle: 'Upper Funchal & Hills',
    region: 'funchal',
    oneWayPrice: 35,
    roundTripPrice: 65,
    duration: '25 min',
    popular: false,
  },

  // Zona Leste & Proximidades
  {
    id: 'canico',
    name: 'Caniço',
    subtitle: 'Garajau & Caniço de Baixo',
    region: 'east',
    oneWayPrice: 25,
    roundTripPrice: 45,
    duration: '15 min',
    popular: true,
  },
  {
    id: 'santa-cruz',
    name: 'Santa Cruz',
    subtitle: 'Airport Town & Coast',
    region: 'east',
    oneWayPrice: 18,
    roundTripPrice: 32,
    duration: '10 min',
    popular: true,
  },
  {
    id: 'machico',
    name: 'Machico',
    subtitle: 'Historic Bay & Sandy Beach',
    region: 'east',
    oneWayPrice: 20,
    roundTripPrice: 36,
    duration: '12 min',
    popular: false,
  },
  {
    id: 'canical',
    name: 'Caniçal',
    subtitle: 'Ponta de São Lourenço Gateway',
    region: 'east',
    oneWayPrice: 28,
    roundTripPrice: 50,
    duration: '20 min',
    popular: false,
  },

  // Zona Sul e Sudoeste
  {
    id: 'camara-de-lobos',
    name: 'Câmara de Lobos',
    subtitle: 'Fishing Town & Cabo Girão',
    region: 'south-west',
    oneWayPrice: 38,
    roundTripPrice: 70,
    duration: '25 min',
    popular: true,
  },
  {
    id: 'ribeira-brava',
    name: 'Ribeira Brava',
    subtitle: 'South Central Valley',
    region: 'south-west',
    oneWayPrice: 48,
    roundTripPrice: 90,
    duration: '35 min',
    popular: false,
  },
  {
    id: 'ponta-do-sol',
    name: 'Ponta do Sol',
    subtitle: 'Sunny Village & Digital Nomad Hub',
    region: 'south-west',
    oneWayPrice: 55,
    roundTripPrice: 100,
    duration: '40 min',
    popular: true,
  },
  {
    id: 'calheta',
    name: 'Calheta',
    subtitle: 'Vila, Marina, Prazeres & Arco',
    region: 'south-west',
    oneWayPrice: 65,
    roundTripPrice: 120,
    duration: '50 min',
    popular: true,
  },
  {
    id: 'paul-do-mar',
    name: 'Paul do Mar / Jardim do Mar',
    subtitle: 'Surfing Village & Sunsets',
    region: 'south-west',
    oneWayPrice: 75,
    roundTripPrice: 140,
    duration: '60 min',
    popular: false,
  },
  {
    id: 'ponta-do-pargo',
    name: 'Ponta do Pargo',
    subtitle: 'Western Lighthouse & Cliffs',
    region: 'south-west',
    oneWayPrice: 85,
    roundTripPrice: 160,
    duration: '70 min',
    popular: false,
  },

  // Costa Norte & Noroeste
  {
    id: 'santana',
    name: 'Santana',
    subtitle: 'Traditional Thatched Houses & Forest',
    region: 'north',
    oneWayPrice: 45,
    roundTripPrice: 85,
    duration: '35 min',
    popular: true,
  },
  {
    id: 'porto-da-cruz',
    name: 'Porto da Cruz',
    subtitle: 'Eagle Rock & Sugar Mill',
    region: 'north',
    oneWayPrice: 35,
    roundTripPrice: 65,
    duration: '25 min',
    popular: false,
  },
  {
    id: 'sao-vicente',
    name: 'São Vicente',
    subtitle: 'Lava Caves & North Valley',
    region: 'north',
    oneWayPrice: 65,
    roundTripPrice: 120,
    duration: '50 min',
    popular: false,
  },
  {
    id: 'seixal',
    name: 'Seixal',
    subtitle: 'Black Sand Beach & Waterfalls',
    region: 'north',
    oneWayPrice: 75,
    roundTripPrice: 140,
    duration: '60 min',
    popular: true,
  },
  {
    id: 'porto-moniz',
    name: 'Porto Moniz',
    subtitle: 'Famous Volcanic Natural Pools',
    region: 'north',
    oneWayPrice: 85,
    roundTripPrice: 160,
    duration: '65 min',
    popular: true,
  },
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
    highlights: ['Late-afternoon pickup', 'Watch sunrise above clouds', 'Round trip included'],
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

/**
 * Calculates accurate transfer price between any two locations in Madeira.
 */
export function calculateTransferPrice(fromId, destId, tripType = 'one-way') {
  if (fromId === destId) {
    return { oneWay: 20, roundTrip: 35, duration: '10 min' };
  }

  // If one of them is the Airport
  if (fromId === 'airport' || destId === 'airport') {
    const zoneId = fromId === 'airport' ? destId : fromId;
    const loc = AIRPORT_TRANSFER_LOCATIONS.find((l) => l.id === zoneId) || AIRPORT_TRANSFER_LOCATIONS[0];
    const price = tripType === 'round-trip' ? loc.roundTripPrice : loc.oneWayPrice;
    return {
      price,
      oneWay: loc.oneWayPrice,
      roundTrip: loc.roundTripPrice,
      duration: loc.duration,
    };
  }

  // Point-to-Point Transfer between two island locations
  const locA = AIRPORT_TRANSFER_LOCATIONS.find((l) => l.id === fromId) || AIRPORT_TRANSFER_LOCATIONS[0];
  const locB = AIRPORT_TRANSFER_LOCATIONS.find((l) => l.id === destId) || AIRPORT_TRANSFER_LOCATIONS[1];

  if (locA.region === locB.region) {
    const oneWay = 25;
    const roundTrip = 45;
    const price = tripType === 'round-trip' ? roundTrip : oneWay;
    return { price, oneWay, roundTrip, duration: '15-20 min' };
  }

  let basePrice = 35;
  let estDuration = '25-35 min';

  const isNorthA = locA.region === 'north';
  const isNorthB = locB.region === 'north';
  const isEastA = locA.region === 'east';
  const isEastB = locB.region === 'east';
  const isSouthWestA = locA.region === 'south-west';
  const isSouthWestB = locB.region === 'south-west';

  if ((isEastA && isSouthWestB) || (isSouthWestA && isEastB)) {
    basePrice = locB.id === 'calheta' || locA.id === 'calheta' ? 55 : 40;
    estDuration = '30-40 min';
  } else if (isNorthA || isNorthB) {
    basePrice = 65;
    estDuration = '45-60 min';
  } else {
    basePrice = Math.max(locA.oneWayPrice, locB.oneWayPrice);
    estDuration = locA.duration || locB.duration;
  }

  const roundTripPrice = Math.round(basePrice * 1.8);
  const price = tripType === 'round-trip' ? roundTripPrice : basePrice;

  return {
    price,
    oneWay: basePrice,
    roundTrip: roundTripPrice,
    duration: estDuration,
  };
}
