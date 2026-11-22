import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import '../Privacy/Privacy.css';

const C = 'Madeira Ride Tours';
const EMAIL = 'info@madeiraridetours.com';
const PHONE = '+351 916 326 716';
const WA = 'https://wa.me/351916326716';
const ODR = 'https://ec.europa.eu/consumers/odr/';

const TOC_IDS = ['servicos','reservas','pagamentos','cancelamento','responsabilidades','meteorologia','passageiros','dados','lei'];

const TERMS = {
  pt: {
    tag: 'Legal · Termos', title: 'Termos e Condições', updated: '22 de novembro de 2026',
    backBtn: '← Voltar ao início', tocTitle: 'Índice',
    intro: `Ao efetuar uma reserva ou utilizar os serviços da ${C}, o cliente aceita os presentes Termos e Condições na íntegra. Recomendamos a leitura antes de concluir qualquer reserva.`,
    toc: ['Os Nossos Serviços','Reservas e Confirmação','Pagamentos','Cancelamento e Reembolsos','Responsabilidades','Condições Meteorológicas','Regras para Passageiros','Dados Pessoais','Lei Aplicável'],
    s1: { h: '1. Os Nossos Serviços', p1: `A ${C} presta os seguintes serviços na Ilha da Madeira, Portugal:`, items: ['Transfers privados de e para o Aeroporto Internacional da Madeira (FNC)','Transfers ponto-a-ponto entre localidades da ilha','Tours privados e excursões personalizadas (Aventuras na Madeira)','Transporte de e para levadas e trilhos pedestres','Tours personalizados à medida do cliente (Custom Tours)'], p2: 'Todos os serviços são 100% privados — nunca partilhamos a viatura com outros clientes sem consentimento expresso.' },
    s2: { h: '2. Reservas e Confirmação', p1: 'Uma reserva considera-se confirmada apenas após:', items: ['Receção do pagamento total ou parcial acordado; ou','Confirmação escrita por WhatsApp ou email pelo nosso serviço'], p2: 'O cliente receberá um voucher de confirmação por email com todos os detalhes da reserva, incluindo referência única, serviço, data, hora e local de pickup.', p3: 'É responsabilidade do cliente verificar a exatidão de todos os dados no voucher e comunicar qualquer erro no prazo de 24 horas.', p4: 'Para concluir a reserva, o cliente fornece voluntariamente os seus dados pessoais (nome, email, telefone). Consulte a nossa', privacyLink: 'Política de Privacidade', p4end: 'para saber como tratamos esses dados.' },
    s3: { h: '3. Pagamentos', p1: 'Aceitamos os seguintes métodos de pagamento:', items: ['Online: Cartão de crédito/débito (Visa, Mastercard) via Stripe — processamento 100% seguro e certificado PCI DSS','Presencial: Numerário (EUR), MB Way, cartão de débito/crédito','Transferência bancária: Mediante acordo prévio'], p2: 'Todos os preços são em Euros (€), por viatura (não por pessoa), e incluem IVA quando aplicável. Os preços são fixos — não existem custos ocultos.', p3: `Os dados de pagamento online são processados exclusivamente pela Stripe, Inc. A ${C} nunca tem acesso aos dados completos do seu cartão.` },
    s4: { h: '4. Política de Cancelamento e Reembolsos', cards: [{ color:'#10b981', icon:'✅', title:'Cancelamento gratuito', text:'Com aviso de 24h ou mais — totalmente gratuito. Reembolso integral em 5–10 dias úteis.' },{ color:'#f59e0b', icon:'⚠️', title:'Cancelamento tardio', text:'Com menos de 24h — pode haver taxa de 50% do valor do serviço.' },{ color:'#ef4444', icon:'❌', title:'No-show', text:'Sem comparência e sem aviso — reserva perdida, sem reembolso.' },{ color:'#4f46e5', icon:'🌧️', title:'Cancelamento por nós', text:'Por avaria ou força maior — reembolso integral ou reagendamento sem custos.' }], contact: `Para cancelamentos contacte-nos por WhatsApp (${PHONE}) ou email (${EMAIL}) o mais cedo possível.` },
    s5: { h: '5. Responsabilidades', p1: `${C} compromete-se a:`, items1: ['Chegar pontualmente ao local de pickup acordado','Utilizar viaturas limpas, seguras e devidamente licenciadas','Condutores com licença de transporte de passageiros válida','Monitorização de voos em tempo real (transfers de aeroporto)','Comunicação prévia em caso de atraso ou imprevisto'], p2: `${C} não se responsabiliza por:`, items2: ['Atrasos por tráfego excecional, acidentes ou fechos de estrada','Objetos pessoais esquecidos na viatura','Consequências de informações incorretas fornecidas pelo cliente','Cancelamentos de programas turísticos externos'] },
    s6: { h: '6. Condições Meteorológicas e Montanha', p1: `Em caso de condições adversas que impeçam a realização segura de um tour, a ${C} reserva-se o direito de:`, items: ['Sugerir rota ou destino alternativo equivalente','Reagendar para data mais favorável, sem custos adicionais','Em última instância, cancelar com reembolso integral'], p2: 'Somos extremamente flexíveis nestas situações — o objetivo é sempre a melhor experiência.' },
    s7: { h: '7. Regras para Passageiros', items: ['Cinto de segurança obrigatório para todos os passageiros','Crianças em cadeiras adequadas à idade (disponíveis mediante pedido)','Proibido fumar (incluindo cigarros eletrónicos) nas viaturas','Álcool durante o serviço é desaconselhado; condutor pode recusar serviço em caso de comportamento inadequado','Animais de estimação permitidos com aviso prévio','Danos causados à viatura são da responsabilidade do cliente'] },
    s8: { h: '8. Dados Pessoais e Privacidade', p1: `Para prestar os nossos serviços, recolhemos nome, email e telefone fornecidos no formulário de reserva, nos termos do RGPD (Reg. UE 2016/679).`, items: ['Processar e confirmar a reserva','Comunicar com o cliente sobre o serviço','Enviar voucher e informações de pickup','Cumprir obrigações legais e fiscais'], p2: 'Os seus dados são armazenados em servidores seguros (Supabase, UE) e nunca vendidos ou partilhados para fins comerciais.', p3: 'Para mais informações sobre os seus direitos, consulte a nossa', privacyLink: 'Política de Privacidade completa', p3end: '.' },
    s9: { h: '9. Lei Aplicável e Resolução de Litígios', p1: 'Os presentes Termos regem-se pela lei portuguesa. Em caso de litígio, as partes tentam resolução amigável em primeira instância.', p2: 'Em alternativa, pode recorrer à plataforma europeia de resolução de litígios:', p3: 'Contacto para reclamações:' },
  },
  en: {
    tag: 'Legal · Terms', title: 'Terms & Conditions', updated: 'November 22, 2026',
    backBtn: '← Back to Home', tocTitle: 'Table of Contents',
    intro: `By making a booking or using the services of ${C}, the customer fully accepts these Terms and Conditions. We recommend reading them before completing any booking.`,
    toc: ['Our Services','Bookings and Confirmation','Payments','Cancellation and Refunds','Responsibilities','Weather Conditions','Passenger Rules','Personal Data','Applicable Law'],
    s1: { h: '1. Our Services', p1: `${C} provides the following services on the Island of Madeira, Portugal:`, items: ['Private transfers to and from Madeira International Airport (FNC)','Point-to-point transfers between island locations','Private tours and personalised excursions (Madeira Adventures)','Transport to and from levadas and hiking trails','Custom tours tailored to the client'], p2: 'All services are 100% private — we never share the vehicle with other clients without express consent.' },
    s2: { h: '2. Bookings and Confirmation', p1: 'A booking is confirmed only upon:', items: ['Receipt of full or agreed partial payment; or','Written confirmation by WhatsApp or email from our service'], p2: 'The customer will receive a confirmation voucher by email with all booking details including unique reference, service, date, time and pickup location.', p3: 'It is the customer\'s responsibility to verify all voucher details and report any errors within 24 hours.', p4: 'To complete the booking, the customer voluntarily provides personal data (name, email, phone). See our', privacyLink: 'Privacy Policy', p4end: 'for details on how we handle this data.' },
    s3: { h: '3. Payments', p1: 'We accept the following payment methods:', items: ['Online: Credit/debit card (Visa, Mastercard) via Stripe — 100% secure, PCI DSS certified','In person: Cash (EUR), MB Way, debit/credit card','Bank transfer: By prior agreement'], p2: 'All prices are in Euros (€) per vehicle (not per person) and include VAT where applicable. Prices are fixed — no hidden costs.', p3: `Online payments are processed exclusively by Stripe, Inc. ${C} never has access to your full card details.` },
    s4: { h: '4. Cancellation and Refund Policy', cards: [{ color:'#10b981', icon:'✅', title:'Free cancellation', text:'With 24+ hours notice — completely free. Full refund within 5–10 business days.' },{ color:'#f59e0b', icon:'⚠️', title:'Late cancellation', text:'Less than 24 hours notice — may incur a 50% cancellation fee.' },{ color:'#ef4444', icon:'❌', title:'No-show', text:'No-show without notice — booking is forfeited, no refund issued.' },{ color:'#4f46e5', icon:'🌧️', title:'Cancelled by us', text:'Due to breakdown or force majeure — full refund or free reschedule.' }], contact: `For cancellations contact us by WhatsApp (${PHONE}) or email (${EMAIL}) as soon as possible.` },
    s5: { h: '5. Responsibilities', p1: `${C} commits to:`, items1: ['Arriving punctually at the agreed pickup location','Using clean, safe and properly licensed vehicles','Drivers with valid passenger transport licences and island experience','Real-time flight monitoring (airport transfers)','Prior communication in case of delay or unexpected events'], p2: `${C} is not responsible for:`, items2: ['Delays from exceptional traffic, accidents or road closures','Personal items left in the vehicle','Consequences of incorrect information provided by the customer','Cancellations of external tourist programmes'] },
    s6: { h: '6. Weather and Mountain Conditions', p1: `If adverse weather prevents the safe completion of a tour, ${C} reserves the right to:`, items: ['Suggest an equivalent alternative route or destination','Reschedule to a more favourable date at no extra cost','As a last resort, cancel with a full refund'], p2: 'We are extremely flexible in these situations — the goal is always to provide the best possible experience.' },
    s7: { h: '7. Passenger Rules', items: ['Seat belts are compulsory for all passengers','Children must travel in age-appropriate seats (available on request)','Smoking (including e-cigarettes) is prohibited inside vehicles','Alcohol consumption is discouraged; driver may refuse service for inappropriate behaviour','Pets are allowed with prior notice','Damage caused to the vehicle by the customer is their responsibility'] },
    s8: { h: '8. Personal Data and Privacy', p1: 'To provide our services we collect name, email and phone number voluntarily submitted in the booking form, in accordance with GDPR (EU Reg. 2016/679).', items: ['Processing and confirming the booking','Communicating with the customer about the service','Sending the voucher and pickup information','Complying with legal and fiscal obligations'], p2: 'Your data is stored on secure servers (Supabase, EU) and is never sold or shared with third parties for commercial purposes.', p3: 'For information about your rights, please see our', privacyLink: 'full Privacy Policy', p3end: '.' },
    s9: { h: '9. Applicable Law and Dispute Resolution', p1: 'These Terms and Conditions are governed by Portuguese law. In the event of a dispute, the parties agree to first attempt an amicable resolution.', p2: 'You may also use the European online dispute resolution platform:', p3: 'Contact for complaints:' },
  },
  de: {
    tag: 'Rechtliches · AGB', title: 'Allgemeine Geschäftsbedingungen', updated: '22. November 2026',
    backBtn: '← Zurück zur Startseite', tocTitle: 'Inhaltsverzeichnis',
    intro: `Mit der Buchung oder Nutzung der Dienste von ${C} akzeptiert der Kunde diese AGB vollständig. Wir empfehlen, diese vor Abschluss einer Buchung zu lesen.`,
    toc: ['Unsere Leistungen','Buchungen und Bestätigung','Zahlungen','Stornierung und Erstattungen','Verantwortlichkeiten','Wetterbedingungen','Fahrgastregeln','Personenbezogene Daten','Anwendbares Recht'],
    s1: { h: '1. Unsere Leistungen', p1: `${C} bietet folgende Dienste auf Madeira, Portugal:`, items: ['Private Transfers zum und vom Flughafen Madeira (FNC)','Punkt-zu-Punkt-Transfers zwischen Orten auf der Insel','Private Touren und individuelle Ausflüge (Madeira Adventures)','Transport zu Levadawegen und Wanderwegen','Individuelle Touren nach Kundenwunsch (Custom Tours)'], p2: 'Alle Dienste sind 100% privat — wir teilen das Fahrzeug niemals ohne Zustimmung mit anderen Kunden.' },
    s2: { h: '2. Buchungen und Bestätigung', p1: 'Eine Buchung gilt erst dann als bestätigt, wenn:', items: ['Die vollständige oder vereinbarte Teilzahlung eingegangen ist; oder','Eine schriftliche Bestätigung per WhatsApp oder E-Mail vorliegt'], p2: 'Der Kunde erhält einen Bestätigungsgutschein per E-Mail mit allen Buchungsdetails einschließlich Referenz, Leistung, Datum, Uhrzeit und Abholort.', p3: 'Es liegt in der Verantwortung des Kunden, alle Daten im Gutschein zu prüfen und Fehler innerhalb von 24 Stunden zu melden.', p4: 'Für die Buchung stellt der Kunde freiwillig seine persönlichen Daten (Name, E-Mail, Telefon) zur Verfügung. Weitere Informationen finden Sie in unserer', privacyLink: 'Datenschutzerklärung', p4end: '.' },
    s3: { h: '3. Zahlungen', p1: 'Wir akzeptieren folgende Zahlungsmethoden:', items: ['Online: Kredit-/Debitkarte (Visa, Mastercard) via Stripe — 100% sicher, PCI DSS zertifiziert','Vor Ort: Bargeld (EUR), MB Way, Debit-/Kreditkarte','Banküberweisung: Nach vorheriger Vereinbarung'], p2: 'Alle Preise sind in Euro (€) pro Fahrzeug (nicht pro Person) und enthalten ggf. Mehrwertsteuer. Preise sind fest — keine versteckten Kosten.', p3: `Online-Zahlungsdaten werden ausschließlich von Stripe, Inc. verarbeitet. ${C} hat keinen Zugriff auf Ihre vollständigen Kartendaten.` },
    s4: { h: '4. Stornierungsbedingungen und Erstattungen', cards: [{ color:'#10b981', icon:'✅', title:'Kostenlose Stornierung', text:'Mit mindestens 24 Stunden Vorankündigung — völlig kostenlos. Vollständige Erstattung innerhalb von 5–10 Werktagen.' },{ color:'#f59e0b', icon:'⚠️', title:'Späte Stornierung', text:'Weniger als 24 Stunden im Voraus — kann einer Gebühr von 50% des Leistungswertes unterliegen.' },{ color:'#ef4444', icon:'❌', title:'No-Show', text:'Nichterscheinen ohne Vorankündigung — Buchung verfallen, keine Erstattung.' },{ color:'#4f46e5', icon:'🌧️', title:'Stornierung durch uns', text:'Bei Panne oder höherer Gewalt — vollständige Erstattung oder kostenlose Umbuchung.' }], contact: `Für Stornierungen kontaktieren Sie uns so früh wie möglich per WhatsApp (${PHONE}) oder E-Mail (${EMAIL}).` },
    s5: { h: '5. Verantwortlichkeiten', p1: `${C} verpflichtet sich:`, items1: ['Pünktlich am vereinbarten Abholort zu erscheinen','Saubere, sichere und ordnungsgemäß zugelassene Fahrzeuge zu nutzen','Fahrer mit gültiger Personenbeförderungslizenz einzusetzen','Flüge in Echtzeit zu überwachen (Flughafentransfers)','Bei Verzögerungen vorab zu kommunizieren'], p2: `${C} haftet nicht für:`, items2: ['Verzögerungen durch außergewöhnlichen Verkehr, Unfälle oder Straßensperrungen','Im Fahrzeug vergessene persönliche Gegenstände','Folgen falscher Angaben des Kunden','Stornierungen externer Tourismusprogramme'] },
    s6: { h: '6. Wetter- und Bergbedingungen', p1: `Bei widrigen Wetterbedingungen, die eine sichere Durchführung einer Tour verhindern, behält sich ${C} das Recht vor:`, items: ['Eine gleichwertige Alternative vorzuschlagen','Den Service auf ein günstigeres Datum ohne Mehrkosten zu verlegen','Als letztes Mittel zu stornieren und den vollen Betrag zu erstatten'], p2: 'Wir sind in solchen Situationen sehr flexibel — das Ziel ist immer das bestmögliche Erlebnis.' },
    s7: { h: '7. Fahrgastregeln', items: ['Sicherheitsgurte für alle Fahrgäste Pflicht','Kinder in altersgerechten Sitzen transportieren (auf Anfrage erhältlich)','Rauchen (einschl. E-Zigaretten) im Fahrzeug verboten','Alkohol während der Fahrt nicht empfohlen; Fahrer kann bei unangemessenem Verhalten den Service verweigern','Haustiere nach Ankündigung erlaubt','Schäden am Fahrzeug durch den Kunden gehen zu dessen Lasten'] },
    s8: { h: '8. Personenbezogene Daten und Datenschutz', p1: 'Zur Leistungserbringung erheben wir Name, E-Mail und Telefonnummer aus dem Buchungsformular gemäß DSGVO (EU-Verordnung 2016/679).', items: ['Verarbeitung und Bestätigung der Buchung','Kommunikation mit dem Kunden über den Service','Versand des Gutscheins und der Abholinformationen','Erfüllung gesetzlicher und steuerlicher Verpflichtungen'], p2: 'Ihre Daten werden auf sicheren Servern (Supabase, EU) gespeichert und niemals für kommerzielle Zwecke verkauft oder weitergegeben.', p3: 'Weitere Informationen zu Ihren Rechten finden Sie in unserer', privacyLink: 'vollständigen Datenschutzerklärung', p3end: '.' },
    s9: { h: '9. Anwendbares Recht und Streitbeilegung', p1: 'Diese AGB unterliegen portugiesischem Recht. Bei Streitigkeiten verpflichten sich die Parteien, zunächst eine gütliche Einigung zu versuchen.', p2: 'Alternativ können Sie die europäische Online-Streitbeilegungsplattform nutzen:', p3: 'Kontakt für Beschwerden:' },
  },
  fr: {
    tag: 'Légal · CGV', title: 'Conditions Générales de Vente', updated: '22 novembre 2026',
    backBtn: '← Retour à l\'accueil', tocTitle: 'Table des matières',
    intro: `En effectuant une réservation ou en utilisant les services de ${C}, le client accepte intégralement les présentes CGV. Nous recommandons de les lire avant de finaliser toute réservation.`,
    toc: ['Nos Services','Réservations et Confirmation','Paiements','Annulation et Remboursements','Responsabilités','Conditions Météorologiques','Règles pour les Passagers','Données Personnelles','Droit Applicable'],
    s1: { h: '1. Nos Services', p1: `${C} propose les services suivants sur l'île de Madère, Portugal :`, items: ['Transferts privés vers/depuis l\'Aéroport International de Madère (FNC)','Transferts point à point entre localités de l\'île','Tours privés et excursions personnalisées (Madeira Adventures)','Transport vers/depuis les levadas et sentiers de randonnée','Tours sur mesure selon les souhaits du client (Custom Tours)'], p2: 'Tous les services sont 100% privés — nous ne partageons jamais le véhicule sans consentement exprès.' },
    s2: { h: '2. Réservations et Confirmation', p1: 'Une réservation est confirmée uniquement après :', items: ['Réception du paiement total ou partiel convenu ; ou','Confirmation écrite par WhatsApp ou e-mail de notre service'], p2: 'Le client recevra un bon de confirmation par e-mail avec tous les détails de la réservation, incluant référence unique, service, date, heure et lieu de prise en charge.', p3: 'Il est de la responsabilité du client de vérifier l\'exactitude de toutes les données et de signaler toute erreur dans les 24 heures.', p4: 'Pour finaliser la réservation, le client fournit volontairement ses données personnelles (nom, e-mail, téléphone). Consultez notre', privacyLink: 'Politique de Confidentialité', p4end: ' pour savoir comment nous traitons ces données.' },
    s3: { h: '3. Paiements', p1: 'Nous acceptons les modes de paiement suivants :', items: ['En ligne : Carte de crédit/débit (Visa, Mastercard) via Stripe — 100% sécurisé, certifié PCI DSS','En personne : Espèces (EUR), MB Way, carte de débit/crédit','Virement bancaire : Sur accord préalable'], p2: 'Tous les prix sont en Euros (€) par véhicule (et non par personne) et incluent la TVA le cas échéant. Prix fixes — aucun frais caché.', p3: `Les données de paiement en ligne sont traitées exclusivement par Stripe, Inc. ${C} n'a jamais accès à vos données de carte complètes.` },
    s4: { h: '4. Politique d\'Annulation et de Remboursement', cards: [{ color:'#10b981', icon:'✅', title:'Annulation gratuite', text:'Avec au moins 24h de préavis — entièrement gratuite. Remboursement intégral sous 5 à 10 jours ouvrables.' },{ color:'#f59e0b', icon:'⚠️', title:'Annulation tardive', text:'Moins de 24h de préavis — peut entraîner des frais de 50% de la valeur du service.' },{ color:'#ef4444', icon:'❌', title:'No-show', text:'Non-présentation sans préavis — réservation perdue, aucun remboursement.' },{ color:'#4f46e5', icon:'🌧️', title:'Annulation de notre part', text:'En cas de panne ou force majeure — remboursement intégral ou reprogrammation sans frais.' }], contact: `Pour les annulations, contactez-nous par WhatsApp (${PHONE}) ou e-mail (${EMAIL}) le plus tôt possible.` },
    s5: { h: '5. Responsabilités', p1: `${C} s'engage à :`, items1: ['Arriver à l\'heure au lieu de prise en charge convenu','Utiliser des véhicules propres, sûrs et dûment immatriculés','Des chauffeurs titulaires d\'une licence de transport de passagers valide','Suivi des vols en temps réel (transferts aéroport)','Communication préalable en cas de retard ou d\'imprévu'], p2: `${C} décline toute responsabilité pour :`, items2: ['Les retards causés par un trafic exceptionnel, accidents ou fermetures de routes','Les objets personnels oubliés dans le véhicule','Les conséquences d\'informations incorrectes fournies par le client','Les annulations de programmes touristiques externes'] },
    s6: { h: '6. Conditions Météorologiques et de Montagne', p1: `En cas de conditions défavorables empêchant la réalisation en toute sécurité d'un tour, ${C} se réserve le droit de :`, items: ['Proposer un itinéraire ou destination alternative équivalente','Reprogrammer le service sans frais supplémentaires','En dernier recours, annuler avec remboursement intégral'], p2: 'Nous sommes extrêmement flexibles dans ces situations — l\'objectif est toujours d\'offrir la meilleure expérience.' },
    s7: { h: '7. Règles pour les Passagers', items: ['Port de la ceinture de sécurité obligatoire pour tous','Enfants en sièges adaptés à leur âge (disponibles sur demande)','Interdit de fumer (y compris e-cigarettes) dans les véhicules','Consommation d\'alcool déconseillée ; le chauffeur peut refuser le service en cas de comportement inapproprié','Animaux autorisés avec préavis','Dommages causés au véhicule par le client à sa charge'] },
    s8: { h: '8. Données Personnelles et Confidentialité', p1: 'Pour fournir nos services, nous collectons nom, e-mail et téléphone fournis dans le formulaire de réservation, conformément au RGPD (Règlement UE 2016/679).', items: ['Traitement et confirmation de la réservation','Communication avec le client au sujet du service','Envoi du bon et des informations de prise en charge','Respect des obligations légales et fiscales'], p2: 'Vos données sont stockées sur des serveurs sécurisés (Supabase, UE) et ne sont jamais vendues ni partagées avec des tiers à des fins commerciales.', p3: 'Pour plus d\'informations sur vos droits, consultez notre', privacyLink: 'Politique de Confidentialité complète', p3end: '.' },
    s9: { h: '9. Droit Applicable et Résolution des Litiges', p1: 'Les présentes CGV sont régies par le droit portugais. En cas de litige, les parties s\'engagent à tenter d\'abord une résolution amiable.', p2: 'Vous pouvez également recourir à la plateforme européenne de règlement des litiges en ligne :', p3: 'Contact pour les réclamations :' },
  },
  es: {
    tag: 'Legal · Términos', title: 'Términos y Condiciones', updated: '22 de noviembre de 2026',
    backBtn: '← Volver al inicio', tocTitle: 'Índice',
    intro: `Al realizar una reserva o utilizar los servicios de ${C}, el cliente acepta íntegramente los presentes Términos y Condiciones. Recomendamos leerlos antes de completar cualquier reserva.`,
    toc: ['Nuestros Servicios','Reservas y Confirmación','Pagos','Cancelación y Reembolsos','Responsabilidades','Condiciones Meteorológicas','Normas para Pasajeros','Datos Personales','Ley Aplicable'],
    s1: { h: '1. Nuestros Servicios', p1: `${C} presta los siguientes servicios en la Isla de Madeira, Portugal:`, items: ['Traslados privados hacia y desde el Aeropuerto Internacional de Madeira (FNC)','Traslados punto a punto entre localidades de la isla','Tours privados y excursiones personalizadas (Madeira Adventures)','Transporte hacia y desde levadas y senderos de montaña','Tours personalizados a medida del cliente (Custom Tours)'], p2: 'Todos los servicios son 100% privados — nunca compartimos el vehículo sin consentimiento expreso.' },
    s2: { h: '2. Reservas y Confirmación', p1: 'Una reserva se confirma únicamente tras:', items: ['Recepción del pago total o parcial acordado; o','Confirmación escrita por WhatsApp o correo electrónico de nuestro servicio'], p2: 'El cliente recibirá un bono de confirmación por correo con todos los detalles de la reserva, incluida referencia única, servicio, fecha, hora y lugar de recogida.', p3: 'Es responsabilidad del cliente verificar la exactitud de todos los datos y comunicar cualquier error en un plazo de 24 horas.', p4: 'Para completar la reserva, el cliente facilita voluntariamente sus datos personales (nombre, correo, teléfono). Consulte nuestra', privacyLink: 'Política de Privacidad', p4end: ' para saber cómo tratamos estos datos.' },
    s3: { h: '3. Pagos', p1: 'Aceptamos los siguientes métodos de pago:', items: ['Online: Tarjeta de crédito/débito (Visa, Mastercard) via Stripe — 100% seguro, certificado PCI DSS','En persona: Efectivo (EUR), MB Way, tarjeta de débito/crédito','Transferencia bancaria: Mediante acuerdo previo'], p2: 'Todos los precios son en Euros (€) por vehículo (no por persona) e incluyen IVA cuando corresponde. Precios fijos — sin costes ocultos.', p3: `Los datos de pago online son procesados exclusivamente por Stripe, Inc. ${C} nunca tiene acceso a los datos completos de su tarjeta.` },
    s4: { h: '4. Política de Cancelación y Reembolsos', cards: [{ color:'#10b981', icon:'✅', title:'Cancelación gratuita', text:'Con 24h o más de antelación — completamente gratuita. Reembolso íntegro en 5–10 días hábiles.' },{ color:'#f59e0b', icon:'⚠️', title:'Cancelación tardía', text:'Menos de 24h de antelación — puede implicar una tarifa del 50% del valor del servicio.' },{ color:'#ef4444', icon:'❌', title:'No presentación', text:'Sin presentarse y sin aviso — reserva perdida, sin reembolso.' },{ color:'#4f46e5', icon:'🌧️', title:'Cancelación por nuestra parte', text:'Por avería o fuerza mayor — reembolso íntegro o reprogramación sin coste adicional.' }], contact: `Para cancelaciones contáctenos por WhatsApp (${PHONE}) o correo (${EMAIL}) lo antes posible.` },
    s5: { h: '5. Responsabilidades', p1: `${C} se compromete a:`, items1: ['Llegar puntualmente al lugar de recogida acordado','Utilizar vehículos limpios, seguros y debidamente homologados','Conductores con licencia de transporte de pasajeros válida','Seguimiento de vuelos en tiempo real (traslados al aeropuerto)','Comunicación previa en caso de retraso o imprevisto'], p2: `${C} no se hace responsable de:`, items2: ['Retrasos por tráfico excepcional, accidentes o cierres de carreteras','Objetos personales olvidados en el vehículo','Consecuencias de información incorrecta facilitada por el cliente','Cancelaciones de programas turísticos externos'] },
    s6: { h: '6. Condiciones Meteorológicas y de Montaña', p1: `En caso de condiciones adversas que impidan la realización segura de un tour, ${C} se reserva el derecho de:`, items: ['Sugerir ruta o destino alternativo equivalente','Reprogramar el servicio sin costes adicionales','Como último recurso, cancelar con reembolso íntegro'], p2: 'Somos extremadamente flexibles en estas situaciones — el objetivo es siempre ofrecer la mejor experiencia posible.' },
    s7: { h: '7. Normas para Pasajeros', items: ['Cinturón de seguridad obligatorio para todos los pasajeros','Niños en sillas adaptadas a su edad (disponibles bajo petición)','Prohibido fumar (incluidos cigarrillos electrónicos) en los vehículos','Se desaconseja el consumo de alcohol; el conductor puede rechazar el servicio por comportamiento inapropiado','Mascotas permitidas con aviso previo','Los daños causados al vehículo por el cliente son responsabilidad del mismo'] },
    s8: { h: '8. Datos Personales y Privacidad', p1: 'Para prestar nuestros servicios recopilamos nombre, correo electrónico y teléfono del formulario de reserva, de conformidad con el RGPD (Reglamento UE 2016/679).', items: ['Procesar y confirmar la reserva','Comunicarse con el cliente sobre el servicio','Enviar el bono e información de recogida','Cumplir con obligaciones legales y fiscales'], p2: 'Sus datos se almacenan en servidores seguros (Supabase, UE) y nunca se venden ni comparten con terceros con fines comerciales.', p3: 'Para más información sobre sus derechos, consulte nuestra', privacyLink: 'Política de Privacidad completa', p3end: '.' },
    s9: { h: '9. Ley Aplicable y Resolución de Disputas', p1: 'Los presentes Términos se rigen por la legislación portuguesa. En caso de disputa, las partes se comprometen a intentar primero una resolución amistosa.', p2: 'Puede también recurrir a la plataforma europea de resolución de disputas en línea:', p3: 'Contacto para reclamaciones:' },
  },
};

export default function Terms() {
  const { currentLang } = useLanguage();
  const c = TERMS[currentLang] || TERMS.en;

  return (
    <div className="legal-page">
      <div className="legal-hero">
        <div className="container-constrained">
          <span className="legal-tag">{c.tag}</span>
          <h1>{c.title}</h1>
          <p className="legal-updated">{c.updated}</p>
        </div>
      </div>

      <div className="legal-content container-constrained">
        <div className="legal-toc">
          <h3>{c.tocTitle}</h3>
          <ol>
            {c.toc.map((item, i) => (
              <li key={i}><a href={`#${TOC_IDS[i]}`}>{item}</a></li>
            ))}
          </ol>
        </div>

        <div className="legal-body">
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px', fontStyle: 'italic' }}>
            {c.intro}
          </p>

          {/* Section 1 */}
          <section id="servicos">
            <h2>{c.s1.h}</h2>
            <p>{c.s1.p1}</p>
            <ul>{c.s1.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
            <p>{c.s1.p2}</p>
          </section>

          {/* Section 2 */}
          <section id="reservas">
            <h2>{c.s2.h}</h2>
            <p>{c.s2.p1}</p>
            <ul>{c.s2.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
            <p>{c.s2.p2}</p>
            <p>{c.s2.p3}</p>
            <p>{c.s2.p4} <Link to="/privacy">{c.s2.privacyLink}</Link>{c.s2.p4end}</p>
          </section>

          {/* Section 3 */}
          <section id="pagamentos">
            <h2>{c.s3.h}</h2>
            <p>{c.s3.p1}</p>
            <ul>{c.s3.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
            <p>{c.s3.p2}</p>
            <p>{c.s3.p3}</p>
          </section>

          {/* Section 4 — Cancellation cards */}
          <section id="cancelamento">
            <h2>{c.s4.h}</h2>
            <div className="legal-purposes">
              {c.s4.cards.map((card, i) => (
                <div key={i} className="purpose-card" style={{ borderLeftColor: card.color, borderLeftWidth: '3px', borderLeftStyle: 'solid' }}>
                  <strong>{card.icon} {card.title}</strong>
                  <p>{card.text}</p>
                </div>
              ))}
            </div>
            <p style={{ marginTop: '14px' }}>{c.s4.contact}</p>
          </section>

          {/* Section 5 */}
          <section id="responsabilidades">
            <h2>{c.s5.h}</h2>
            <p><strong>{c.s5.p1}</strong></p>
            <ul>{c.s5.items1.map((it, i) => <li key={i}>{it}</li>)}</ul>
            <p><strong>{c.s5.p2}</strong></p>
            <ul>{c.s5.items2.map((it, i) => <li key={i}>{it}</li>)}</ul>
          </section>

          {/* Section 6 */}
          <section id="meteorologia">
            <h2>{c.s6.h}</h2>
            <p>{c.s6.p1}</p>
            <ul>{c.s6.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
            <p>{c.s6.p2}</p>
          </section>

          {/* Section 7 */}
          <section id="passageiros">
            <h2>{c.s7.h}</h2>
            <ul>{c.s7.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
          </section>

          {/* Section 8 */}
          <section id="dados">
            <h2>{c.s8.h}</h2>
            <p>{c.s8.p1}</p>
            <ul>{c.s8.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
            <p>{c.s8.p2}</p>
            <p>{c.s8.p3} <Link to="/privacy">{c.s8.privacyLink}</Link>{c.s8.p3end}</p>
          </section>

          {/* Section 9 */}
          <section id="lei">
            <h2>{c.s9.h}</h2>
            <p>{c.s9.p1}</p>
            <p>{c.s9.p2}{' '}<a href={ODR} target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a></p>
            <p>{c.s9.p3}{' '}<a href={`mailto:${EMAIL}`}>{EMAIL}</a> · <a href={WA}>{PHONE}</a></p>
          </section>
        </div>
      </div>

      <div className="legal-back container-constrained">
        <Link to="/" className="legal-back-btn">{c.backBtn}</Link>
      </div>
    </div>
  );
}
