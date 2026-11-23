/**
 * Centralized Transfers & Destinations Catalog.
 * Clean, organized definitions for airport, point-to-point transfers and Madeira Adventures.
 */

export const TRANSFER_REGIONS = [
  { id: 'funchal', name: 'Funchal & Surroundings' },
  { id: 'east', name: 'East Coast (Santa Cruz, Machico, Caniço)' },
  { id: 'south-west', name: 'South & South-West (Câmara de Lobos, Ribeira Brava, Calheta)' },
  { id: 'north', name: 'North Coast (São Vicente, Santana, Porto Moniz)' },
  { id: 'mountain', name: 'Mountain Peaks & Levada Trails' },
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
    titleDe: 'Cabo Girão Skywalk & Südküsten-Aussichtspunkte',
    titleFr: 'Skywalk de Cabo Girão & Points de Vue du Sud',
    titleEs: 'Cabo Girão Skywalk y Miradores del Sur',
    badge: '4h · Half day',
    badgePt: '4h · Meio dia',
    badgeDe: '4 Std. · Halbtags',
    badgeFr: '4h · Demi-journée',
    badgeEs: '4h · Medio día',
    duration: '4h',
    isHalfDay: true,
    timeSlots: [
      { id: 'morning', label: 'Morning Departure', labelPt: 'Partida de Manhã', labelDe: 'Abfahrt Morgens', labelFr: 'Départ Matin', labelEs: 'Salida de Mañana', time: '09:00', returnTime: '13:00' },
      { id: 'afternoon', label: 'Afternoon Departure', labelPt: 'Partida de Tarde', labelDe: 'Abfahrt Nachmittags', labelFr: 'Départ Après-midi', labelEs: 'Salida de Tarde', time: '14:00', returnTime: '18:00' },
    ],
    pickupTime: '09:00 or 14:00',
    pickupTimePt: '09:00 ou 14:00',
    pickupTimeDe: '09:00 oder 14:00',
    pickupTimeFr: '09:00 ou 14:00',
    pickupTimeEs: '09:00 o 14:00',
    dropoffTime: '13:00 or 18:00',
    dropoffTimePt: '13:00 ou 18:00',
    dropoffTimeDe: '13:00 oder 18:00',
    dropoffTimeFr: '13:00 ou 18:00',
    dropoffTimeEs: '13:00 o 18:00',
    pickupArea: 'Direct pickup at your Hotel / Accommodation in Funchal, Caniço or Câmara de Lobos',
    pickupAreaPt: 'Recolha direta no seu hotel ou alojamento no Funchal, Caniço ou Câmara de Lobos',
    price4: 120,
    price8: 150,
    overview: 'A scenic journey through Madeira’s most dramatic southern sea cliffs, quaint fishing ports and mountain viewpoints.',
    overviewPt: 'Uma viagem panorâmica pelas mais impressionantes falésias do sul da Madeira, portos de pesca típicos e miradouros de montanha.',
    overviewDe: 'Eine malerische Fahrt zu Madeiras spektakulärsten Steilklippen im Süden, idyllischen Fischerdörfern und Aussichtspunkten.',
    overviewFr: 'Un voyage panoramique à travers les plus impressionnantes falaises du sud de Madère, ses ports de pêche typiques et ses belvédères.',
    overviewEs: 'Un viaje panorámico por los acantilados más espectaculares del sur de Madeira, pintorescos puertos pesqueros y miradores de montaña.',
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
    highlightsDe: [
      'Cabo Girão Skywalk (580 m hohe Glasplattform)',
      '360°-Panoramablick am Pico dos Barcelos',
      'Malerisches Fischerdorf Câmara de Lobos',
      'Eira do Serrado mit Blick ins Nonnental (Curral das Freiras)',
    ],
    highlightsFr: [
      'Skywalk de Cabo Girão (plateforme en verre à 580 m)',
      'Point de vue panoramique à 360° du Pico dos Barcelos',
      'Village de pêcheurs pittoresque de Câmara de Lobos',
      'Eira do Serrado surplombant la Vallée des Nonnes (Curral das Freiras)',
    ],
    highlightsEs: [
      'Skywalk de Cabo Girão (plataforma de cristal a 580 m)',
      'Mirador panorámico de 360° de Pico dos Barcelos',
      'Pintoresco pueblo pesquero de Câmara de Lobos',
      'Eira do Serrado con vistas al Valle de las Monjas (Curral das Freiras)',
    ],
    itinerary: [
      { step: '1', title: 'Hotel Pick-up', titlePt: 'Recolha no Hotel', titleDe: 'Abholung vom Hotel', titleFr: 'Prise en charge à l\'hôtel', titleEs: 'Recogida en el Hotel', desc: 'Direct pick-up from your stay in modern air-conditioned vehicle.', descPt: 'Recolha direta no seu alojamento em viatura moderna com ar condicionado.', descDe: 'Direkte Abholung an Ihrer Unterkunft im modernen klimatisierten Fahrzeug.', descFr: 'Prise en charge directe à votre hébergement en véhicule climatisé moderne.', descEs: 'Recogida directa en su alojamiento en vehículo moderno con aire acondicionado.' },
      { step: '2', title: 'Pico dos Barcelos Viewpoint', titlePt: 'Miradouro do Pico dos Barcelos', titleDe: 'Aussichtspunkt Pico dos Barcelos', titleFr: 'Belvédère de Pico dos Barcelos', titleEs: 'Mirador de Pico dos Barcelos', desc: 'Stunning 360-degree amphitheater view over the bay of Funchal.', descPt: 'Espetacular vista panorâmica 360° sobre toda a baía do Funchal.', descDe: 'Herrlicher 360-Grad-Blick über die gesamte Bucht von Funchal.', descFr: 'Superbe vue panoramique à 360° sur toute la baie de Funchal.', descEs: 'Espectacular vista panorámica de 360° sobre toda la bahía de Funchal.' },
      { step: '3', title: 'Eira do Serrado & Nun\'s Valley', titlePt: 'Eira do Serrado & Curral das Freiras', titleDe: 'Eira do Serrado & Nonnental', titleFr: 'Eira do Serrado & Vallée des Nonnes', titleEs: 'Eira do Serrado y Curral das Freiras', desc: 'Dramatic volcanic caldera viewpoint looking 800m down to Curral das Freiras.', descPt: 'Vista deslumbrante sobre a caldeira vulcânica a 800 metros de profundidade.', descDe: 'Spektakulärer Blick 800 Meter tief in die Caldera von Curral das Freiras.', descFr: 'Vue vertigineuse plongeant 800 mètres plus bas sur Curral das Freiras.', descEs: 'Espectacular vista hacia la caldera volcánica a 800 metros de profundidad.' },
      { step: '4', title: 'Câmara de Lobos Village', titlePt: 'Vila de Câmara de Lobos', titleDe: 'Dorf Câmara de Lobos', titleFr: 'Village de Câmara de Lobos', titleEs: 'Pueblo de Câmara de Lobos', desc: 'Walk around the colorful harbor where Winston Churchill painted.', descPt: 'Passeio pela baía colorida onde Winston Churchill pintava.', descDe: 'Spaziergang am malerischen Hafen, wo einst Winston Churchill malte.', descFr: 'Balade autour du port coloré immortalisé par Winston Churchill.', descEs: 'Paseo por el colorido puerto donde pintaba Winston Churchill.' },
      { step: '5', title: 'Cabo Girão Skywalk', titlePt: 'Cabo Girão Skywalk', titleDe: 'Cabo Girão Skywalk', titleFr: 'Skywalk de Cabo Girão', titleEs: 'Skywalk de Cabo Girão', desc: 'Walk on the suspended glass platform over the second highest sea cliff in the world (580m).', descPt: 'Caminhe sobre a plataforma de vidro na segunda falésia marítima mais alta do mundo.', descDe: 'Betreten Sie die gläserne Aussichtsplattform an der 580 m hohen Steilküste.', descFr: 'Avancez sur la plateforme de verre suspendue sur la falaise de 580 m.', descEs: 'Camine sobre la plataforma de cristal en el segundo acantilado marino más alto (580 m).' },
      { step: '6', title: 'Hotel Return', titlePt: 'Regresso ao Hotel', titleDe: 'Rückfahrt zum Hotel', titleFr: 'Retour à l\'hôtel', titleEs: 'Regreso al Hotel', desc: 'Comfortable drop-off back at your hotel or chosen location.', descPt: 'Regresso confortável e seguro ao seu alojamento.', descDe: 'Bequeme und sichere Rückfahrt zu Ihrer Unterkunft.', descFr: 'Retour confortable et en toute sécurité à votre hôtel.', descEs: 'Regreso cómodo y seguro a su alojamiento.' },
    ],
    includes: ['Private Mercedes Van', 'Certified Local Chauffeur/Guide', 'Hotel Pick-up & Drop-off', 'Passenger Insurance'],
    includesPt: ['Carrinha Mercedes Privada', 'Motorista/Guia Local Certificado', 'Recolha e Regresso ao Hotel', 'Seguro de Passageiros'],
    includesDe: ['Privater Mercedes-Van', 'Zertifizierter lokaler Fahrer/Guide', 'Hotel-Abholung & Rückfahrt', 'Insassenversicherung'],
    includesFr: ['Minivan Mercedes privé', 'Chauffeur/guide local certifié', 'Prise en charge et retour à l\'hôtel', 'Assurance passagers'],
    includesEs: ['Furgoneta Mercedes privada', 'Conductor/guía local certificado', 'Recogida y regreso al hotel', 'Seguro de pasajeros'],
    image: [
      '/images/cabo-girao-cliff.jpg',
      '/images/cabo-girao-camara-lobos.jpg',
      '/images/cabo-girao-funchal-view.jpg',
    ],
  },
  {
    id: 'wicker-toboggans-tropical-garden',
    title: 'Wicker Toboggans & Tropical Garden',
    titlePt: 'Carros de Cesto & Jardim Tropical',
    titleDe: 'Korbschlitten & Tropischer Garten',
    titleFr: 'Descente en Luge d\'Osier & Jardin Tropical',
    titleEs: 'Carros de Cesto y Jardín Tropical',
    badge: '4h · Half day',
    badgePt: '4h · Meio dia',
    badgeDe: '4 Std. · Halbtags',
    badgeFr: '4h · Demi-journée',
    badgeEs: '4h · Medio día',
    duration: '4h',
    isHalfDay: true,
    timeSlots: [
      { id: 'morning', label: 'Morning Departure', labelPt: 'Partida de Manhã', labelDe: 'Abfahrt Morgens', labelFr: 'Départ Matin', labelEs: 'Salida de Mañana', time: '09:30', returnTime: '13:30' },
      { id: 'afternoon', label: 'Afternoon Departure', labelPt: 'Partida de Tarde', labelDe: 'Abfahrt Nachmittags', labelFr: 'Départ Après-midi', labelEs: 'Salida de Tarde', time: '14:30', returnTime: '18:30' },
    ],
    pickupTime: '09:30 or 14:30',
    pickupTimePt: '09:30 ou 14:30',
    pickupTimeDe: '09:30 oder 14:30',
    pickupTimeFr: '09:30 ou 14:30',
    pickupTimeEs: '09:30 o 14:30',
    dropoffTime: '13:30 or 18:30',
    dropoffTimePt: '13:30 ou 18:30',
    dropoffTimeDe: '13:30 oder 18:30',
    dropoffTimeFr: '13:30 ou 18:30',
    dropoffTimeEs: '13:30 o 18:30',
    pickupArea: 'Direct pickup at your Hotel / Accommodation in Funchal or Caniço',
    pickupAreaPt: 'Recolha direta no seu hotel ou alojamento no Funchal ou Caniço',
    price4: 80,
    price8: 100,
    overview: 'Discover the hilltop village of Monte, wander exotic gardens and experience the century-old basket toboggan thrill.',
    overviewPt: 'Descubra a histórica vila do Monte, visite jardins exóticos e viva a emoção centenária da descida nos carros de cesto.',
    overviewDe: 'Entdecken Sie das Bergdorf Monte, spazieren Sie durch tropische Gärten und erleben Sie die rasante Korbschlittenfahrt.',
    overviewFr: 'Découvrez le village historique de Monte, parcourez des jardins exotiques et vivez le grand frisson de la luge en osier traditionnelle.',
    overviewEs: 'Descubra el histórico pueblo de Monte, pasee por jardines exóticos y viva la emoción centenaria del descenso en cestos de mimbre.',
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
    highlightsDe: [
      'Traditionelle Korbschlittenfahrt in Monte',
      'Tropischer Garten Monte Palace mit exotischer Flora',
      'Küsten-Aussichtspunkt Pináculo über die Bucht',
      'Cristo Rei Klippen-Aussichtspunkt in Garajau',
    ],
    highlightsFr: [
      'Descente traditionnelle en luge d\'osier à Monte',
      'Jardin Tropical Monte Palace et flore exotique',
      'Belvédère côtier de Pináculo sur Funchal',
      'Statue du Christ Roi et falaise de Garajau',
    ],
    highlightsEs: [
      'Descenso tradicional en carro de cesto en Monte',
      'Jardín Tropical Monte Palace con flora exótica',
      'Mirador costero de Pináculo sobre Funchal',
      'Estatua de Cristo Rei y acantilado de Garajau',
    ],
    itinerary: [
      { step: '1', title: 'Hotel Pick-up', titlePt: 'Recolha no Hotel', titleDe: 'Abholung vom Hotel', titleFr: 'Prise en charge à l\'hôtel', titleEs: 'Recogida en el Hotel', desc: 'Comfortable morning or afternoon departure from your hotel.', descPt: 'Partida confortável de manhã ou à tarde a partir do seu hotel.', descDe: 'Bequeme Abfahrt am Vormittag oder Nachmittag von Ihrem Hotel.', descFr: 'Départ tout confort le matin ou l\'après-midi depuis votre hôtel.', descEs: 'Salida confortable por la mañana o por la tarde desde su hotel.' },
      { step: '2', title: 'Pináculo Viewpoint', titlePt: 'Miradouro do Pináculo', titleDe: 'Aussichtspunkt Pináculo', titleFr: 'Belvédère du Pináculo', titleEs: 'Mirador de Pináculo', desc: 'Cliffside panorama overlooking the entire coastline of southern Madeira.', descPt: 'Vista panorâmica costeira sobre todo o anfiteatro do Funchal.', descDe: 'Küstenpanorama über das gesamte Amphitheater von Funchal.', descFr: 'Panorama grandiose sur toute la baie et la côte sud.', descEs: 'Vista panorámica costera sobre todo el anfiteatro de Funchal.' },
      { step: '3', title: 'Garajau & Cristo Rei', titlePt: 'Garajau & Cristo Rei', titleDe: 'Garajau & Cristo Rei', titleFr: 'Garajau & Christ Roi', titleEs: 'Garajau y Cristo Rei', desc: 'Visit the imposing statue overlooking the Atlantic marine reserve.', descPt: 'Visita à imponente estátua e miradouro sobre a reserva marinha.', descDe: 'Besuch der imposanten Statue über dem Meeresschutzgebiet.', descFr: 'Visite de la statue majestueuse surplombant la réserve marine.', descEs: 'Visita a la imponente estatua con vistas sobre la reserva marina.' },
      { step: '4', title: 'Monte Historic Village & Church', titlePt: 'Vila Histórica & Igreja do Monte', titleDe: 'Historisches Dorf Monte & Kirche', titleFr: 'Village historique de Monte & Église', titleEs: 'Pueblo Histórico de Monte e Iglesia', desc: 'Visit the historic Nossa Senhora do Monte church and gardens.', descPt: 'Visita à emblemática igreja de Nossa Senhora do Monte.', descDe: 'Besuch der historischen Wallfahrtskirche und Gärten.', descFr: 'Visite de l\'église historique Nossa Senhora do Monte.', descEs: 'Visita a la emblemática iglesia de Nossa Senhora do Monte.' },
      { step: '5', title: 'Monte Palace Tropical Gardens', titlePt: 'Jardins Tropicais Monte Palace', titleDe: 'Tropischer Garten Monte Palace', titleFr: 'Jardin Tropical Monte Palace', titleEs: 'Jardines Tropicales Monte Palace', desc: 'Explore lakes, flamingos, mineral museum and oriental gardens.', descPt: 'Explore lagos, cisnes, museu de minerais e jardins orientais.', descDe: 'Erkunden Sie Seen, Flamingos, Mineralienmuseum und Zen-Gärten.', descFr: 'Explorez étangs, flamants roses, musée de minéraux et jardins zen.', descEs: 'Explore lagos, cisnes, museo de minerales y jardines orientales.' },
      { step: '6', title: 'Traditional Toboggan Sledge Ride', titlePt: 'Descida Tradicional em Carro de Cesto', titleDe: 'Traditionelle Korbschlittenfahrt', titleFr: 'Descente traditionnelle en luge d\'osier', titleEs: 'Descenso tradicional en carro de cesto', desc: 'Thrilling downhill slide guided by two traditional "Carreiros".', descPt: 'Descida emocionante pelo asfalto guiada por dois Carreiros do Monte.', descDe: 'Aufregende Talfahrt gesteuert von zwei traditionellen Carreiros.', descFr: 'Descente sensationnelle guidée par deux Carreiros expérimentés.', descEs: 'Emocionante descenso guiado por dos tradicionales Carreiros.' },
      { step: '7', title: 'Hotel Return', titlePt: 'Regresso ao Hotel', titleDe: 'Rückfahrt zum Hotel', titleFr: 'Retour à l\'hôtel', titleEs: 'Regreso al Hotel', desc: 'Meet your private driver at Livramento for the return journey.', descPt: 'Encontro com o motorista no Livramento para regresso ao hotel.', descDe: 'Treffen mit dem Fahrer in Livramento zur entspannten Rückfahrt.', descFr: 'Retrouvez votre chauffeur à Livramento pour le retour à votre hôtel.', descEs: 'Encuentro con el conductor en Livramento para regresar al hotel.' },
    ],
    includes: ['Private Mercedes Van', 'Flexible Guide', 'Hotel Pick-up & Drop-off', 'Scenic Route'],
    includesPt: ['Carrinha Mercedes Privada', 'Guia Flexível', 'Recolha e Regresso ao Hotel', 'Rota Panorâmica'],
    includesDe: ['Privater Mercedes-Van', 'Flexibler Guide', 'Hotelabholung und Rückfahrt', 'Panoramaroute'],
    includesFr: ['Minivan Mercedes privé', 'Guide flexible', 'Prise en charge et retour à l\'hôtel', 'Route panoramique'],
    includesEs: ['Furgoneta Mercedes privada', 'Guía flexible', 'Recogida y regreso al hotel', 'Ruta panorámica'],
    image: [
      '/images/monte-toboggan-carreiros.jpg',
      '/images/monte-palace-tropical-garden.jpg',
      '/images/cristo-rei-garajau-view.jpg',
    ],
  },
  {
    id: 'east-pico-areiro-santana',
    title: 'East: Pico do Areeiro & Santana',
    titlePt: 'Este: Pico do Areeiro & Santana',
    titleDe: 'Ost-Tour: Pico do Areeiro & Santana',
    titleFr: 'Tour de l\'Est : Pico do Areeiro & Santana',
    titleEs: 'Este: Pico do Areeiro y Santana',
    badge: '8h · Full day',
    badgePt: '8h · Dia inteiro',
    badgeDe: '8 Std. · Ganztags',
    badgeFr: '8h · Journée complète',
    badgeEs: '8h · Día entero',
    duration: '8h',
    isHalfDay: false,
    timeSlots: [
      { id: 'full-day', label: 'Full Day Departure', labelPt: 'Partida Dia Inteiro', labelDe: 'Abfahrt Ganztags', labelFr: 'Départ Journée', labelEs: 'Salida Día Completo', time: '09:00', returnTime: '17:00' },
    ],
    pickupTime: '08:45 – 09:15',
    pickupTimePt: '08:45 – 09:15',
    pickupTimeDe: '08:45 – 09:15',
    pickupTimeFr: '08:45 – 09:15',
    pickupTimeEs: '08:45 – 09:15',
    dropoffTime: '17:00 – 17:30',
    dropoffTimePt: '17:00 – 17:30',
    dropoffTimeDe: '17:00 – 17:30',
    dropoffTimeFr: '17:00 – 17:30',
    dropoffTimeEs: '17:00 – 17:30',
    pickupArea: 'Direct hotel pickup island-wide (Funchal, Caniço, Santa Cruz, Machico)',
    pickupAreaPt: 'Recolha em qualquer hotel no Funchal, Caniço, Santa Cruz ou Machico',
    price4: 180,
    price8: 200,
    overview: 'The definitive classic east tour: ascend above the clouds to the third highest peak and discover traditional thatched villages.',
    overviewPt: 'O clássico passeio do lado este: suba acima das nuvens até ao 3º pico mais alto e visite as típicas casas de Santana.',
    overviewDe: 'Der Klassiker im Osten: steigen Sie über die Wolken zum dritthöchsten Gipfel und besuchen Sie traditionelle Strohdachhäuser in Santana.',
    overviewFr: 'Le grand classique de l\'est : montez au-dessus des nuages au 3e plus haut sommet et découvrez les maisons traditionnelles de Santana.',
    overviewEs: 'El tour clásico por el este: ascienda por encima de las nubes al tercer pico más alto y visite las casas tradicionales de Santana.',
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
    highlightsDe: [
      'Pico do Areeiro Aussichtspunkt (1818 m)',
      'Ribeiro Frio Lorbeerwald & Forellenzucht',
      'Gläserner Aussichtspunkt Guindaste über dem Ozean',
      'Traditionelle Strohdachhäuser in Santana',
      'Historische Zuckerrohrmühle in Porto da Cruz',
      'Vulkanische Halbinsel Ponta de São Lourenço',
    ],
    highlightsFr: [
      'Belvédère du Pico do Areeiro (1818 m)',
      'Forêt de lauriers de Ribeiro Frio & élevage de truites',
      'Passerelle de verre du Guindaste au-dessus de l\'océan',
      'Maisons traditionnelles en chaume de Santana',
      'Distillerie historique de canne à sucre à Porto da Cruz',
      'Péninsule volcanique de Ponta de São Lourenço',
    ],
    highlightsEs: [
      'Mirador del Pico do Areeiro (1.818 m)',
      'Laurisilva en Ribeiro Frio y criadero de truchas',
      'Mirador de cristal de Guindaste sobre el océano',
      'Casas tradicionales de colmo en Santana',
      'Histórico molino de caña de azúcar en Porto da Cruz',
      'Península volcánica de Ponta de São Lourenço',
    ],
    itinerary: [
      { step: '1', title: 'Hotel Departure', titlePt: 'Partida do Hotel', titleDe: 'Abfahrt am Hotel', titleFr: 'Départ de l\'hôtel', titleEs: 'Salida del Hotel', desc: 'Pick-up and drive up into the dramatic central mountain range.', descPt: 'Recolha e subida panorâmica até ao maciço montanhoso central.', descDe: 'Abholung und Panoramatour in die zentrale Bergwelt.', descFr: 'Prise en charge et montée panoramique vers la cordillère centrale.', descEs: 'Recogida y subida panorámica hacia las cumbres centrales.' },
      { step: '2', title: 'Pico do Areeiro (1818m)', titlePt: 'Pico do Areeiro (1.818m)', titleDe: 'Pico do Areeiro (1818 m)', titleFr: 'Pico do Areeiro (1818 m)', titleEs: 'Pico do Areeiro (1.818 m)', desc: 'Experience jagged volcanic ridges and sea of clouds.', descPt: 'Desfrute das cristas vulcânicas e do mar de nuvens nos cumes.', descDe: 'Erleben Sie schroffe Grate und das spektakuläre Wolkenmeer.', descFr: 'Admirez les crêtes volcaniques et la mer de nuages.', descEs: 'Disfrute de las crestas volcánicas y el mar de nubes.' },
      { step: '3', title: 'Ribeiro Frio & Balcões', titlePt: 'Ribeiro Frio & Balcões', titleDe: 'Ribeiro Frio & Balcões', titleFr: 'Ribeiro Frio & Balcões', titleEs: 'Ribeiro Frio y Balcões', desc: 'Lush indigenous forest and option for the short Balcões walk.', descPt: 'Floresta autóctone exuberante e visita ao miradouro dos Balcões.', descDe: 'Üppiger Lorbeerwald und Spaziergang zum Aussichtspunkt Balcões.', descFr: 'Forêt luxuriante et courte balade vers le belvédère des Balcões.', descEs: 'Exuberante bosque autóctono y visita al mirador de Balcões.' },
      { step: '4', title: 'Santana Heritage Village', titlePt: 'Vila Tradicional de Santana', titleDe: 'Traditionelles Dorf Santana', titleFr: 'Village traditionnel de Santana', titleEs: 'Pueblo Tradicional de Santana', desc: 'Stop for lunch and visit the iconic triangular thatched cottages.', descPt: 'Paragem para almoço e visita às emblemáticas casas triangulares.', descDe: 'Mittagspause und Besuch der berühmten reetgedeckten Dreieckshäuser.', descFr: 'Pause déjeuner et visite des maisons triangulaires typiques.', descEs: 'Parada para almorzar y visita a las famosas casas triangulares.' },
      { step: '5', title: 'Guindaste Skywalk', titlePt: 'Miradouro do Guindaste', titleDe: 'Guindaste Skywalk', titleFr: 'Passerelle du Guindaste', titleEs: 'Skywalk de Guindaste', desc: 'Glass platform viewpoint jutting out over the north ocean swell.', descPt: 'Passarela de vidro suspensa com vista direta sobre o oceano norte.', descDe: 'Gläserne Plattform mit direktem Blick auf die tosende Nordküste.', descFr: 'Plateforme en verre avançant au-dessus des vagues du nord.', descEs: 'Plataforma de cristal suspendida sobre el océano norte.' },
      { step: '6', title: 'Porto da Cruz & Eagle Rock', titlePt: 'Porto da Cruz & Penha d’Águia', titleDe: 'Porto da Cruz & Adlerfelsen', titleFr: 'Porto da Cruz & Penha d’Águia', titleEs: 'Porto da Cruz y Penha d’Águia', desc: 'Coastal village known for surfing and historical sugarcane mill.', descPt: 'Vila costeira com engenho tradicional de cana-de-açúcar.', descDe: 'Küstendorf mit traditioneller Zuckerrohrmühle.', descFr: 'Village côtier avec moulin traditionnel à canne à sucre.', descEs: 'Pueblo costero con ingenio tradicional de caña de azúcar.' },
      { step: '7', title: 'Ponta de São Lourenço', titlePt: 'Ponta de São Lourenço', titleDe: 'Ponta de São Lourenço', titleFr: 'Ponta de São Lourenço', titleEs: 'Ponta de São Lourenço', desc: 'Semi-arid volcanic peninsula with dramatic contrasting colors.', descPt: 'Península semiárida com falésias vulcânicas e cores contrastantes.', descDe: 'Halbtrockene Vulkanhalbinsel mit kontrastreichen Felsfarben.', descFr: 'Péninsule volcanique aux falaises multicolores saisissantes.', descEs: 'Península volcánica semidesértica con colores contrastantes.' },
      { step: '8', title: 'Drop-off at Stay', titlePt: 'Regresso ao Alojamento', titleDe: 'Rückfahrt zur Unterkunft', titleFr: 'Retour à votre hébergement', titleEs: 'Regreso al Alojamiento', desc: 'Relaxed return drive via Machico and expressway.', descPt: 'Viagem de regresso tranquila pela via rápida.', descDe: 'Entspannte Rückfahrt über Machico und die Schnellstraße.', descFr: 'Retour tranquille par Machico et la voie rapide.', descEs: 'Viaje de regreso tranquilo por la vía rápida.' },
    ],
    includes: ['Full-Day Dedicated Vehicle', 'Certified Guide/Chauffeur', 'Flexible Stops & Photo Opportunities', 'Insurance'],
    includesPt: ['Viatura Exclusiva Todo o Dia', 'Motorista/Guia Certificado', 'Paragens Flexíveis para Fotos', 'Seguro Completo'],
    includesDe: ['Ganztägig exklusiver Minivan', 'Zertifizierter Fahrer/Guide', 'Flexible Fotostopps', 'Vollkaskoversicherung'],
    includesFr: ['Véhicule dédié toute la journée', 'Chauffeur/guide certifié', 'Arrêts photos sur mesure', 'Assurance complète'],
    includesEs: ['Vehículo exclusivo todo el día', 'Conductor/guía certificado', 'Paradas fotográficas flexibles', 'Seguro completo'],
    image: [
      '/images/east-adventure-pico-trail.jpg',
      '/images/east-adventure-santana-houses.jpg',
      '/images/east-adventure-balcoes.jpg',
      '/images/east-adventure-guindaste.jpg',
    ],
  },
  {
    id: 'wild-north-fanal-seixal-porto-moniz',
    title: 'Wild North Madeira: Fanal, Seixal & Porto Moniz',
    titlePt: 'Norte Selvagem: Fanal, Seixal & Porto Moniz',
    titleDe: 'Wilder Norden: Fanal, Seixal & Porto Moniz',
    titleFr: 'Nord Sauvage : Fanal, Seixal & Porto Moniz',
    titleEs: 'Norte Salvaje: Fanal, Seixal y Porto Moniz',
    badge: '8h · Full day',
    badgePt: '8h · Dia inteiro',
    badgeDe: '8 Std. · Ganztags',
    badgeFr: '8h · Journée complète',
    badgeEs: '8h · Día entero',
    duration: '8h',
    isHalfDay: false,
    timeSlots: [
      { id: 'full-day', label: 'Full Day Departure', labelPt: 'Partida Dia Inteiro', labelDe: 'Abfahrt Ganztags', labelFr: 'Départ Journée', labelEs: 'Salida Día Completo', time: '08:45', returnTime: '17:15' },
    ],
    pickupTime: '08:30 – 09:00',
    pickupTimePt: '08:30 – 09:00',
    pickupTimeDe: '08:30 – 09:00',
    pickupTimeFr: '08:30 – 09:00',
    pickupTimeEs: '08:30 – 09:00',
    dropoffTime: '17:00 – 17:30',
    dropoffTimePt: '17:00 – 17:30',
    dropoffTimeDe: '17:00 – 17:30',
    dropoffTimeFr: '17:00 – 17:30',
    dropoffTimeEs: '17:00 – 17:30',
    pickupArea: 'Direct hotel pickup island-wide (Funchal, South Coast & West Coast)',
    pickupAreaPt: 'Recolha em hotéis em toda a ilha (Funchal, Costa Sul e Costa Oeste)',
    price4: 180,
    price8: 200,
    overview: 'Explore the raw mystical nature of the north: ancient laurel trees in fairy-tale mist, black sand beaches and volcanic sea pools.',
    overviewPt: 'Descubra a natureza pura do norte: árvores seculares no Fanal, praia de areia preta no Seixal e piscinas de lava vulcânica.',
    overviewDe: 'Entdecken Sie die wilde Natur des Nordens: uralte Lorbeerbäume im Fanal-Nebel, schwarzen Sandstrand in Seixal und Vulkanbecken.',
    overviewFr: 'Explorez la nature sauvage du nord : arbres centenaires dans la brume du Fanal, plage de sable noir de Seixal et piscines volcaniques.',
    overviewEs: 'Descubra la naturaleza virgen del norte: árboles centenarios en la niebla de Fanal, playa de arena negra en Seixal y piscinas volcánicas.',
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
    highlightsDe: [
      'Mystischer jahrhundertealter Lorbeerwald im Fanal',
      'Schwarzer Sandstrand in Seixal & Brautschleier-Wasserfall',
      'Natürliche vulkanische Felsenbecken in Porto Moniz',
      'Aussichtspunkt auf die Felsnadeln von Ribeira da Janela',
      'Hochebene Paul da Serra (1400 m)',
    ],
    highlightsFr: [
      'Forêt féerique d\'arbres centenaires du Fanal',
      'Plage de sable noir de Seixal et cascade du Voile de la Mariée',
      'Piscines naturelles de lave à Porto Moniz',
      'Point de vue spectaculaire sur les îlots de Ribeira da Janela',
      'Haut plateau de Paul da Serra (1400 m)',
    ],
    highlightsEs: [
      'Místico bosque centenario de Laurisilva en Fanal',
      'Playa de arena negra de Seixal y cascada del Velo de la Novia',
      'Piscinas volcánicas naturales de Porto Moniz',
      'Mirador de los islotes de Ribeira da Janela',
      'Meseta de Paul da Serra a 1.400 metros',
    ],
    itinerary: [
      { step: '1', title: 'Hotel Departure', titlePt: 'Partida do Hotel', titleDe: 'Abfahrt am Hotel', titleFr: 'Départ de l\'hôtel', titleEs: 'Salida del Hotel', desc: 'Scenic journey towards the southwest and up to the central plateau.', descPt: 'Viagem panorâmica em direção ao sudoeste e subida ao planalto.', descDe: 'Panoramareise in den Südwesten und hinauf zur Hochebene.', descFr: 'Trajet panoramique vers le sud-ouest et montée sur le plateau.', descEs: 'Viaje panorámico hacia el suroeste y subida a la meseta.' },
      { step: '2', title: 'Paul da Serra Plateau', titlePt: 'Planalto do Paul da Serra', titleDe: 'Hochebene Paul da Serra', titleFr: 'Plateau de Paul da Serra', titleEs: 'Meseta de Paul da Serra', desc: 'Cross the only high flat plateau on Madeira Island.', descPt: 'Travessia do único planalto plano da ilha da Madeira a 1.400m.', descDe: 'Überquerung der einzigen Hochebene der Insel auf 1400 m.', descFr: 'Traversée du seul haut plateau de l\'île à 1400 m.', descEs: 'Cruce de la única meseta alta de la isla a 1.400 m.' },
      { step: '3', title: 'Fanal Enchanted Forest', titlePt: 'Floresta Encantada do Fanal', titleDe: 'Verzauberter Wald von Fanal', titleFr: 'Forêt enchantée du Fanal', titleEs: 'Bosque encantado de Fanal', desc: 'Walk among 500-year-old Til trees in mystical mountain mist.', descPt: 'Passeio entre tis centenários envoltos no nevoeiro místico.', descDe: 'Spaziergang zwischen 500 Jahre alten Lorbeerbäumen im Nebel.', descFr: 'Promenade parmi les lauriers multicentenaires dans la brume.', descEs: 'Paseo entre árboles centenarios envueltos en niebla mágica.' },
      { step: '4', title: 'Ribeira da Janela Viewpoint', titlePt: 'Miradouro da Ribeira da Janela', titleDe: 'Aussichtspunkt Ribeira da Janela', titleFr: 'Belvédère de Ribeira da Janela', titleEs: 'Mirador de Ribeira da Janela', desc: 'Marvel at dramatic volcanic sea islets rising from the rough ocean.', descPt: 'Espetaculares formações rochosas e ilhéus no mar revolto do norte.', descDe: 'Bestaunen Sie spektakuläre Felsformationen im tosenden Ozean.', descFr: 'Admirez les spectaculaires îlots rocheux émergeant de l\'océan.', descEs: 'Asómbrese con los espectaculares islotes volcánicos en el mar.' },
      { step: '5', title: 'Porto Moniz Volcanic Pools', titlePt: 'Piscinas Vulcânicas de Porto Moniz', titleDe: 'Vulkanbecken Porto Moniz', titleFr: 'Piscines volcaniques de Porto Moniz', titleEs: 'Piscinas volcánicas de Porto Moniz', desc: 'Swim in natural lava pools filled by sea tides & lunch stop.', descPt: 'Tempo para banhos nas piscinas naturais de lava e almoço.', descDe: 'Baden in natürlichen Lava-Pools mit Gezeiten & Mittagspause.', descFr: 'Baignade dans les piscines naturelles de lave et déjeuner.', descEs: 'Baño en las piscinas naturales de lava y almuerzo.' },
      { step: '6', title: 'Seixal Natural Sand Beach', titlePt: 'Praia de Areia Natural do Seixal', titleDe: 'Natursandstrand Seixal', titleFr: 'Plage de sable noir de Seixal', titleEs: 'Playa natural de Seixal', desc: 'Black volcanic sand beach surrounded by lush emerald cliffs.', descPt: 'Praia de areia negra vulcânica cercada por encostas verdejantes.', descDe: 'Schwarzer Lavasandstrand umgeben von smaragdgrünen Klippen.', descFr: 'Plage de sable noir volcanique entourée de falaises verdoyantes.', descEs: 'Playa de arena volcánica negra rodeada de verdes acantilados.' },
      { step: '7', title: 'Bridal Veil Waterfall (Véu da Noiva)', titlePt: 'Cascata do Véu da Noiva', titleDe: 'Wasserfall Véu da Noiva', titleFr: 'Cascade du Voile de la Mariée', titleEs: 'Cascada del Velo de la Novia', desc: 'Legendary waterfall plunging straight into the ocean.', descPt: 'Cascata lendária que desagua diretamente no oceano.', descDe: 'Legendärer Wasserfall, der direkt ins Meer stürzt.', descFr: 'Cascade mythique se jetant directement dans l\'océan.', descEs: 'Mítica cascada que cae directamente en el océano.' },
      { step: '8', title: 'Return via São Vicente', titlePt: 'Regresso por São Vicente', titleDe: 'Rückfahrt über São Vicente', titleFr: 'Retour par São Vicente', titleEs: 'Regreso por São Vicente', desc: 'Comfortable trip back along the northern valley.', descPt: 'Regresso confortável atravessando o vale de São Vicente.', descDe: 'Angenehme Rückfahrt durch das wunderschöne Tal von São Vicente.', descFr: 'Retour très confortable à travers la vallée de São Vicente.', descEs: 'Viaje de regreso cómodo a través del valle de São Vicente.' },
    ],
    includes: ['Full-Day Dedicated Vehicle', 'Certified Guide/Chauffeur', 'Swimming Stop Time in Porto Moniz', 'Insurance'],
    includesPt: ['Viatura Exclusiva Todo o Dia', 'Motorista/Guia Certificado', 'Tempo para Banhos em Porto Moniz', 'Seguro Completo'],
    includesDe: ['Ganztägig exklusives Fahrzeug', 'Zertifizierter Fahrer/Guide', 'Badezeit in Porto Moniz', 'Vollkaskoversicherung'],
    includesFr: ['Véhicule dédié toute la journée', 'Chauffeur/guide certifié', 'Temps de baignade à Porto Moniz', 'Assurance complète'],
    includesEs: ['Vehículo exclusivo todo el día', 'Conductor/guía certificado', 'Tiempo para baños en Porto Moniz', 'Seguro completo'],
    image: [
      '/images/wild-north-fanal-forest.jpg',
      '/images/wild-north-seixal-beach.webp',
      '/images/wild-north-ribeira-janela.webp',
      '/images/wild-north-paul-da-serra.jpg',
    ],
  },
];

export const AIRPORT_TRANSFER_LOCATIONS = [
  // Funchal & Arredores
  {
    id: 'funchal',
    name: 'Funchal',
    subtitle: 'Capital & Hotel Zone',
    region: 'funchal',
    oneWayPrice: 35,
    roundTripPrice: 60,
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
    name: 'Caniço / Garajau',
    subtitle: 'Reis Magos & Ponta da Oliveira',
    region: 'east',
    oneWayPrice: 30,
    roundTripPrice: 50,
    duration: '15 min',
    popular: true,
  },
  {
    id: 'santa-cruz',
    name: 'Santa Cruz',
    subtitle: 'Near Airport Beach Area',
    region: 'east',
    oneWayPrice: 25,
    roundTripPrice: 45,
    duration: '10 min',
    popular: true,
  },
  {
    id: 'machico',
    name: 'Machico',
    subtitle: 'Sandy Bay & Historic Center',
    region: 'east',
    oneWayPrice: 30,
    roundTripPrice: 55,
    duration: '15 min',
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
    subtitle: 'Fishing Village & Cabo Girão',
    region: 'south-west',
    oneWayPrice: 45,
    roundTripPrice: 80,
    duration: '30 min',
    popular: true,
  },
  {
    id: 'ribeira-brava',
    name: 'Ribeira Brava',
    subtitle: 'Central South Coast',
    region: 'south-west',
    oneWayPrice: 50,
    roundTripPrice: 90,
    duration: '35 min',
    popular: false,
  },
  {
    id: 'ponta-do-sol',
    name: 'Ponta do Sol',
    subtitle: 'Sunniest Spot on the Island',
    region: 'south-west',
    oneWayPrice: 60,
    roundTripPrice: 110,
    duration: '45 min',
    popular: true,
  },
  {
    id: 'calheta',
    name: 'Calheta',
    subtitle: 'Marina, Sand Beach & Resorts',
    region: 'south-west',
    oneWayPrice: 70,
    roundTripPrice: 130,
    duration: '55 min',
    popular: true,
  },
  {
    id: 'paul-do-mar',
    name: 'Paul do Mar / Jardim',
    subtitle: 'Surfing Coast & Sunsets',
    region: 'south-west',
    oneWayPrice: 80,
    roundTripPrice: 150,
    duration: '65 min',
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
    subtitle: 'Traditional Thatched Houses',
    region: 'north',
    oneWayPrice: 60,
    roundTripPrice: 110,
    duration: '45 min',
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
    subtitle: 'Lava Caves & North Coast',
    region: 'north',
    oneWayPrice: 75,
    roundTripPrice: 140,
    duration: '60 min',
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

  // Centro da Ilha, Picos & Trilhos
  {
    id: 'curral-das-freiras',
    name: "Curral das Freiras (Nun's Valley)",
    subtitle: 'Deep Volcanic Valley & Eira do Serrado',
    region: 'funchal',
    oneWayPrice: 40,
    roundTripPrice: 75,
    duration: '30 min',
    popular: true,
  },
  {
    id: 'pico-do-arieiro',
    name: 'Pico do Arieiro (1818m)',
    subtitle: 'Sunrise, Sunset & PR1 Trailhead',
    region: 'mountain',
    oneWayPrice: 45,
    roundTripPrice: 85,
    duration: '40 min',
    popular: true,
  },
  {
    id: 'achada-do-teixeira',
    name: 'Achada do Teixeira / Pico Ruivo',
    subtitle: 'PR1.2 Trailhead to Highest Peak',
    region: 'mountain',
    oneWayPrice: 65,
    roundTripPrice: 120,
    duration: '55 min',
    popular: false,
  },
  {
    id: 'rabacal',
    name: 'Rabaçal / 25 Fontes',
    subtitle: 'PR6 & PR6.1 Levada Walks & Waterfalls',
    region: 'mountain',
    oneWayPrice: 60,
    roundTripPrice: 110,
    duration: '50 min',
    popular: true,
  },
  {
    id: 'fanal',
    name: 'Fanal Ancient Forest',
    subtitle: 'UNESCO Mystical Laurel Trees (Laurissilva)',
    region: 'mountain',
    oneWayPrice: 70,
    roundTripPrice: 130,
    duration: '55 min',
    popular: true,
  },
  {
    id: 'queimadas',
    name: 'Queimadas (Caldeirão Verde)',
    subtitle: 'PR9 Levada do Caldeirão Verde Trailhead',
    region: 'mountain',
    oneWayPrice: 50,
    roundTripPrice: 95,
    duration: '45 min',
    popular: false,
  },
  {
    id: 'ponta-de-sao-lourenco',
    name: 'Ponta de São Lourenço (PR8)',
    subtitle: 'Eastern Dragon Tail Peninsula Trail',
    region: 'east',
    oneWayPrice: 32,
    roundTripPrice: 60,
    duration: '25 min',
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
