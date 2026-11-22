import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import './Privacy.css';

const COMPANY = 'Madeira Ride Tours';
const EMAIL = 'info@madeiraridetours.com';
const PHONE = '+351 916 326 716';
const WEBSITE = 'https://madeiraridetours.com';
const CNPD_URL = 'https://www.cnpd.pt';

const PRIVACY = {
  pt: {
    tag: 'RGPD · Privacidade',
    title: 'Política de Privacidade',
    updated: '22 de novembro de 2026',
    backBtn: '← Voltar ao início',
    tocTitle: 'Índice',
    toc: [
      'Responsável pelo Tratamento',
      'Dados Recolhidos',
      'Finalidades e Base Legal',
      'Retenção de Dados',
      'Partilha de Dados',
      'Transferências Internacionais',
      'Os seus Direitos',
      'Cookies e localStorage',
      'Segurança',
      'Contacto e Reclamações',
    ],
    intro: `A ${COMPANY} respeita a sua privacidade e está empenhada em proteger os seus dados pessoais. Esta Política descreve como recolhemos, utilizamos e protegemos as suas informações, em conformidade com o RGPD (Regulamento UE 2016/679) e a legislação portuguesa aplicável.`,
    s1: {
      h: '1. Responsável pelo Tratamento de Dados',
      p1: `${COMPANY} é o responsável pelo tratamento dos seus dados pessoais, nos termos do Regulamento Geral sobre a Proteção de Dados (RGPD — Regulamento UE 2016/679).`,
      fields: [
        { label: 'Empresa', value: COMPANY },
        { label: 'Atividade', value: 'Transfers privados e tours turísticos na Ilha da Madeira' },
        { label: 'País', value: 'Portugal (União Europeia)' },
      ],
    },
    s2: {
      h: '2. Dados Pessoais Recolhidos',
      p1: 'Recolhemos apenas os dados estritamente necessários para a prestação dos nossos serviços:',
      headers: ['Categoria', 'Dados', 'Quando', 'Obrigatório'],
      rows: [
        ['Identificação', 'Nome completo', 'Formulário de reserva', 'Sim'],
        ['Contacto', 'Endereço de email', 'Formulário de reserva / contacto', 'Sim'],
        ['Contacto', 'Número de telefone / WhatsApp', 'Formulário de reserva / contacto', 'Sim'],
        ['Reserva', 'Data, hora, local de pickup, número de passageiros, serviço', 'Formulário de reserva', 'Sim'],
        ['Pagamento', 'Referência de transação (nunca dados de cartão)', 'Processamento via Stripe', 'Se aplicável'],
        ['Técnicos', 'Endereço IP, browser, preferência de idioma', 'Ao utilizar o website', 'Automático'],
      ],
      note: `Nunca recolhemos dados de cartão de crédito/débito diretamente. Os pagamentos são processados exclusivamente pela Stripe, Inc., que cumpre o padrão PCI DSS nível 1. A ${COMPANY} apenas recebe a referência da transação e o estado do pagamento.`,
    },
    s3: {
      h: '3. Finalidades e Base Legal do Tratamento',
      purposes: [
        { title: 'Execução de contrato', desc: 'Processar a sua reserva, enviar confirmação e voucher, coordenar pickup e serviço contratado.', basis: 'Art. 6.º, n.º 1, al. b) RGPD.' },
        { title: 'Interesse legítimo', desc: 'Gerir o nosso negócio, prevenir fraudes, garantir a segurança do website e melhorar os nossos serviços.', basis: 'Art. 6.º, n.º 1, al. f) RGPD.' },
        { title: 'Obrigação legal', desc: 'Cumprir obrigações fiscais e contabilísticas exigidas pela legislação portuguesa (IRS/IRC, faturação).', basis: 'Art. 6.º, n.º 1, al. c) RGPD.' },
        { title: 'Consentimento', desc: 'Envio de comunicações informativas ou marketing (apenas se autorizado previamente, revogável a qualquer momento).', basis: 'Art. 6.º, n.º 1, al. a) RGPD.' },
      ],
    },
    s4: {
      h: '4. Retenção de Dados',
      p1: 'Conservamos os seus dados pelo tempo estritamente necessário:',
      items: [
        'Dados de reservas e faturação: 10 anos (obrigação legal fiscal — Código do IVA e legislação contabilística portuguesa)',
        'Dados de contacto: 2 anos após o último contacto ou término da relação de serviço',
        'Dados de marketing: Até revogação do consentimento',
        'Dados técnicos (logs de servidor): 90 dias',
        'Dados de pagamento (referências Stripe): Conforme período de conservação da Stripe (máx. 7 anos)',
      ],
      p2: 'Findo o prazo aplicável, os dados são eliminados ou anonimizados de forma segura e irreversível.',
    },
    s5: {
      h: '5. Partilha de Dados com Terceiros',
      p1: 'Não vendemos, alugamos nem cedemos os seus dados pessoais a terceiros para fins comerciais ou de marketing.',
      p2: 'Os seus dados podem ser partilhados exclusivamente com os seguintes parceiros estritamente necessários ao serviço:',
      partners: [
        { name: 'Stripe, Inc.', desc: 'Processamento seguro de pagamentos online (certificado PCI DSS)' },
        { name: 'Supabase, Inc.', desc: 'Armazenamento seguro em base de dados (servidores na UE — Frankfurt)' },
        { name: 'Resend, Inc.', desc: 'Envio de emails transacionais com voucher e detalhes de reserva' },
      ],
      p3: 'Todos os parceiros estão vinculados a acordos de proteção de dados conformes com o RGPD.',
    },
    s6: {
      h: '6. Transferências Internacionais de Dados',
      p1: 'Privilegiamos o armazenamento de dados dentro da União Europeia. Quando terceiros operam fora do EEE, são garantidas as devidas salvaguardas:',
      items: [
        'Supabase: Servidores alojados na União Europeia (Frankfurt, Alemanha).',
        'Stripe & Resend: Transferências ao abrigo das Cláusulas Contratuais Tipo (SCC) da Comissão Europeia e Data Privacy Framework.',
      ],
    },
    s7: {
      h: '7. Os seus Direitos (RGPD)',
      p1: 'Enquanto titular dos dados, tem os seguintes direitos que pode exercer a qualquer momento sem qualquer encargo:',
      rights: [
        { icon: '👁️', title: 'Acesso', desc: 'Solicitar cópia dos dados pessoais que conservamos a seu respeito.' },
        { icon: '✏️', title: 'Retificação', desc: 'Corrigir informações incorretas, incompletas ou desatualizadas.' },
        { icon: '🗑️', title: 'Eliminação', desc: 'Solicitar o apagamento dos dados (salvo obrigações fiscais legais).' },
        { icon: '⏸️', title: 'Limitação', desc: 'Restringir o tratamento dos seus dados nos termos previstos no RGPD.' },
        { icon: '📦', title: 'Portabilidade', desc: 'Receber os seus dados num formato comum e legível por máquina.' },
        { icon: '🚫', title: 'Oposição', desc: 'Opor-se ao tratamento baseado em interesse legítimo ou marketing direto.' },
      ],
      p2: `Para exercer qualquer um destes direitos, basta contactar-nos por email: ${EMAIL}. Respondemos no prazo máximo de 30 dias.`,
      p3: 'Tem ainda o direito de apresentar queixa junto da autoridade de controlo em Portugal: CNPD — Comissão Nacional de Proteção de Dados (www.cnpd.pt).',
    },
    s8: {
      h: '8. Cookies e Armazenamento Local',
      p1: 'Este website utiliza apenas mecanismos de armazenamento técnico estritamente essenciais:',
      headers: ['Mecanismo', 'Finalidade', 'Duração', 'Tipo'],
      rows: [
        ['Sessão de autenticação', 'Manter sessão de administrador protegida', 'Sessão', 'Cookie essencial'],
        ['mrt_preferred_language', 'Memorizar o idioma escolhido pelo visitante', 'Persistente', 'localStorage essencial'],
      ],
      p2: 'Não utilizamos cookies de publicidade, redes sociais nem rastreamento de terceiros (como Facebook Pixel ou tracking analítico invasivo).',
    },
    s9: {
      h: '9. Segurança dos Dados',
      p1: 'Adotamos medidas técnicas e organizacionais avançadas para salvaguardar a confidencialidade dos seus dados:',
      items: [
        'Comunicações 100% encriptadas de ponta a ponta através de HTTPS/TLS.',
        'Acesso restrito ao painel de administração com autenticação reforçada e controlo de acessos.',
        'Pagamentos tokenizados geridos inteiramente pela infraestrutura segura da Stripe.',
        'Políticas de segurança ao nível de linhas na base de dados (Row Level Security - RLS).',
      ],
    },
    s10: {
      h: '10. Contacto e Reclamações',
      p1: 'Para qualquer questão sobre a nossa Política de Privacidade ou sobre o tratamento dos seus dados pessoais:',
      contactItems: [
        `Email: ${EMAIL}`,
        `Telefone / WhatsApp: ${PHONE}`,
        `Website: ${WEBSITE}`,
      ],
      p2: 'Autoridade Nacional de Controlo (Portugal): CNPD — Comissão Nacional de Proteção de Dados (www.cnpd.pt).',
    },
  },

  en: {
    tag: 'GDPR · Privacy',
    title: 'Privacy Policy',
    updated: 'November 22, 2026',
    backBtn: '← Back to Home',
    tocTitle: 'Table of Contents',
    toc: [
      'Data Controller',
      'Personal Data Collected',
      'Purposes and Legal Basis',
      'Data Retention',
      'Data Sharing',
      'International Transfers',
      'Your Rights',
      'Cookies & Storage',
      'Security',
      'Contact & Complaints',
    ],
    intro: `${COMPANY} values your privacy and is committed to protecting your personal data. This Policy explains how we collect, use, and protect your information in compliance with the GDPR (EU Regulation 2016/679) and applicable Portuguese law.`,
    s1: {
      h: '1. Data Controller',
      p1: `${COMPANY} is the controller responsible for your personal data under the General Data Protection Regulation (GDPR — EU Regulation 2016/679).`,
      fields: [
        { label: 'Company', value: COMPANY },
        { label: 'Activity', value: 'Private transfers and guided scenic tours in Madeira Island' },
        { label: 'Country', value: 'Portugal (European Union)' },
      ],
    },
    s2: {
      h: '2. Personal Data Collected',
      p1: 'We collect only the data strictly necessary to deliver our transport and tour services:',
      headers: ['Category', 'Data', 'When Collected', 'Required'],
      rows: [
        ['Identity', 'Full name', 'Booking form', 'Yes'],
        ['Contact', 'Email address', 'Booking form / Contact', 'Yes'],
        ['Contact', 'Phone / WhatsApp number', 'Booking form / Contact', 'Yes'],
        ['Booking', 'Date, time, pickup location, passenger count, tour', 'Booking form', 'Yes'],
        ['Payment', 'Transaction reference (never raw card data)', 'Stripe checkout', 'If applicable'],
        ['Technical', 'IP address, browser, language preference', 'Website browsing', 'Automatic'],
      ],
      note: `We never collect or store full credit or debit card details. Online payments are handled exclusively by Stripe, Inc. (PCI DSS Level 1 certified). ${COMPANY} only receives transaction confirmations and payment status.`,
    },
    s3: {
      h: '3. Purposes and Legal Basis',
      purposes: [
        { title: 'Contract Performance', desc: 'Processing your booking, sending confirmation vouchers, coordinating driver pickup and service.', basis: 'Art. 6(1)(b) GDPR.' },
        { title: 'Legitimate Interest', desc: 'Operating our service securely, fraud prevention, website monitoring and service quality improvement.', basis: 'Art. 6(1)(f) GDPR.' },
        { title: 'Legal Obligation', desc: 'Fulfilling mandatory tax, invoicing, and accounting obligations under Portuguese law.', basis: 'Art. 6(1)(c) GDPR.' },
        { title: 'Consent', desc: 'Sending informational or marketing updates (only with explicit prior opt-in, revocable at any time).', basis: 'Art. 6(1)(a) GDPR.' },
      ],
    },
    s4: {
      h: '4. Data Retention',
      p1: 'We retain your personal data only for as long as strictly necessary:',
      items: [
        'Booking and billing records: 10 years (mandatory statutory period under Portuguese tax and fiscal law)',
        'Contact inquiries: 2 years following the last communication or completed service',
        'Marketing subscriptions: Until consent is withdrawn',
        'Technical server logs: 90 days',
        'Payment transaction records: According to Stripe data retention rules (max 7 years)',
      ],
      p2: 'Upon expiration of the retention period, data is securely erased or irreversibly anonymised.',
    },
    s5: {
      h: '5. Data Sharing with Third Parties',
      p1: 'We never sell, rent, or trade your personal information with third parties for marketing purposes.',
      p2: 'Your data is only shared with trusted service providers essential to deliver our services:',
      partners: [
        { name: 'Stripe, Inc.', desc: 'Secure online payment processing (PCI DSS compliant)' },
        { name: 'Supabase, Inc.', desc: 'Encrypted cloud database storage (EU servers — Frankfurt)' },
        { name: 'Resend, Inc.', desc: 'Transactional email service for booking confirmations and vouchers' },
      ],
      p3: 'All providers are bound by strict Data Processing Agreements (DPA) fully aligned with GDPR standards.',
    },
    s6: {
      h: '6. International Transfers',
      p1: 'Our primary systems and database are hosted within the European Union (Frankfurt, Germany). Where partners operate in the USA, transfers are governed by EU Standard Contractual Clauses (SCC) and the EU-US Data Privacy Framework.',
      items: [
        'Supabase: Data hosted directly in the European Union (Frankfurt, Germany).',
        'Stripe & Resend: Secured through European Commission Standard Contractual Clauses.',
      ],
    },
    s7: {
      h: '7. Your Rights (GDPR)',
      p1: 'Under the GDPR, you have the following rights which can be exercised at any time free of charge:',
      rights: [
        { icon: '👁️', title: 'Access', desc: 'Request a copy of the personal data we hold about you.' },
        { icon: '✏️', title: 'Rectification', desc: 'Request correction of inaccurate, incomplete or outdated records.' },
        { icon: '🗑️', title: 'Erasure', desc: 'Request deletion of your data ("right to be forgotten"), subject to statutory tax duties.' },
        { icon: '⏸️', title: 'Restriction', desc: 'Request restriction of processing under specified statutory circumstances.' },
        { icon: '📦', title: 'Portability', desc: 'Receive your data in a structured, commonly used machine-readable format.' },
        { icon: '🚫', title: 'Objection', desc: 'Object to data processing based on legitimate interests or direct marketing.' },
      ],
      p2: `To exercise any of your rights, contact us at ${EMAIL}. We respond within 30 days.`,
      p3: 'You also have the right to lodge a complaint with the Portuguese supervisory authority: CNPD — Comissão Nacional de Proteção de Dados (www.cnpd.pt).',
    },
    s8: {
      h: '8. Cookies and Local Storage',
      p1: 'This website uses only strictly necessary technical storage mechanisms:',
      headers: ['Mechanism', 'Purpose', 'Duration', 'Type'],
      rows: [
        ['Auth Session', 'Maintain secure administrator backoffice session', 'Session', 'Strictly Essential Cookie'],
        ['mrt_preferred_language', 'Remember the selected language preference', 'Persistent', 'Essential localStorage'],
      ],
      p2: 'We do NOT use third-party advertising cookies, social trackers or invasive analytics (no Facebook Pixel, no tracking cookies).',
    },
    s9: {
      h: '9. Data Security',
      p1: 'We maintain robust technical and organisational security measures to protect your data:',
      items: [
        'Full HTTPS/TLS end-to-end communication encryption.',
        'Protected administrative dashboard with role-based access control and session verification.',
        'Tokenized payments processed exclusively via Stripe (PCI DSS Level 1).',
        'Database Row Level Security (RLS) policies preventing unauthorised record access.',
      ],
    },
    s10: {
      h: '10. Contact and Complaints',
      p1: 'If you have questions regarding this Privacy Policy or wish to exercise your rights:',
      contactItems: [
        `Email: ${EMAIL}`,
        `Phone / WhatsApp: ${PHONE}`,
        `Website: ${WEBSITE}`,
      ],
      p2: 'Data Protection Supervisory Authority (Portugal): CNPD — Comissão Nacional de Proteção de Dados (www.cnpd.pt).',
    },
  },

  de: {
    tag: 'DSGVO · Datenschutz',
    title: 'Datenschutzerklärung',
    updated: '22. November 2026',
    backBtn: '← Zurück zur Startseite',
    tocTitle: 'Inhaltsverzeichnis',
    toc: [
      'Verantwortliche Stelle',
      'Erhobene Daten',
      'Zwecke und Rechtsgrundlage',
      'Speicherdauer',
      'Datenweitergabe',
      'Internationale Übermittlungen',
      'Ihre Rechte',
      'Cookies & Speicher',
      'Datensicherheit',
      'Kontakt & Beschwerden',
    ],
    intro: `${COMPANY} respektiert Ihre Privatsphäre und setzt sich für den Schutz Ihrer personenbezogenen Daten ein. Diese Richtlinie beschreibt die Verarbeitung gemäß DSGVO (EU-Verordnung 2016/679).`,
    s1: {
      h: '1. Verantwortliche Stelle',
      p1: `${COMPANY} ist die verantwortliche Stelle für die Verarbeitung Ihrer Daten im Sinne der DSGVO.`,
      fields: [
        { label: 'Unternehmen', value: COMPANY },
        { label: 'Tätigkeit', value: 'Private Transfers und Rundfahrten auf Madeira' },
        { label: 'Land', value: 'Portugal (Europäische Union)' },
      ],
    },
    s2: {
      h: '2. Erhobene personenbezogene Daten',
      p1: 'Wir erheben nur Daten, die für die Durchführung der gebuchten Leistungen erforderlich sind:',
      headers: ['Kategorie', 'Daten', 'Zeitpunkt', 'Erforderlich'],
      rows: [
        ['Identifikation', 'Vollständiger Name', 'Buchungsformular', 'Ja'],
        ['Kontakt', 'E-Mail-Adresse', 'Buchung / Kontakt', 'Ja'],
        ['Kontakt', 'Telefon / WhatsApp', 'Buchung / Kontakt', 'Ja'],
        ['Buchung', 'Datum, Uhrzeit, Abholort, Personenanzahl, Tour', 'Buchungsformular', 'Ja'],
        ['Zahlung', 'Transaktionsreferenz (keine Kartendaten)', 'Stripe Checkout', 'Falls zutreffend'],
        ['Technisch', 'IP-Adresse, Browser, Spracheinstellung', 'Website-Besuch', 'Automatisch'],
      ],
      note: `Wir erfassen niemals Kreditkartendaten direkt. Online-Zahlungen werden sicher über Stripe, Inc. (PCI DSS Stufe 1 zertifiziert) abgewickelt.`,
    },
    s3: {
      h: '3. Zwecke und Rechtsgrundlagen',
      purposes: [
        { title: 'Vertragserfüllung', desc: 'Bearbeitung der Buchung, Versand von Vouchers und Durchführung des Fahrdienstes.', basis: 'Art. 6 Abs. 1 lit. b DSGVO.' },
        { title: 'Berechtigtes Interesse', desc: 'Sichere Website-Funktion, Betrugsprävention und Qualitätsverbesserung.', basis: 'Art. 6 Abs. 1 lit. f DSGVO.' },
        { title: 'Gesetzliche Pflicht', desc: 'Erfüllung steuerlicher und buchhalterischer Pflichten nach portugiesischem Recht.', basis: 'Art. 6 Abs. 1 lit. c DSGVO.' },
        { title: 'Einwilligung', desc: 'Versand von Newslettern (nur nach vorheriger ausdrücklicher Einwilligung).', basis: 'Art. 6 Abs. 1 lit. a DSGVO.' },
      ],
    },
    s4: {
      h: '4. Speicherdauer',
      p1: 'Ihre Daten werden nur so lange aufbewahrt, wie es für die jeweiligen Zwecke erforderlich ist:',
      items: [
        'Buchungs- und Rechnungsdaten: 10 Jahre (steuerliche Aufbewahrungsfrist in Portugal)',
        'Kontaktanfragen: 2 Jahre nach letzter Korrespondenz',
        'Server-Logs: 90 Tage',
        'Stripe-Transaktionsreferenzen: Gemäß Aufbewahrungsrichtlinien von Stripe (max. 7 Jahre)',
      ],
      p2: 'Nach Ablauf der Fristen werden Daten sicher und irreversibel gelöscht.',
    },
    s5: {
      h: '5. Datenweitergabe an Dritte',
      p1: 'Wir verkaufen oder vermieten Ihre Daten keinesfalls zu Werbezwecken an Dritte.',
      p2: 'Eine Weitergabe erfolgt ausschließlich an ausgewählte Dienstleister:',
      partners: [
        { name: 'Stripe, Inc.', desc: 'Sichere Zahlungsabwicklung (PCI DSS zertifiziert)' },
        { name: 'Supabase, Inc.', desc: 'Verschlüsselte Datenbank in der EU (Frankfurt)' },
        { name: 'Resend, Inc.', desc: 'Zustellung von Buchungsbestätigungen per E-Mail' },
      ],
      p3: 'Alle Auftragsverarbeiter erfüllen die Vorgaben der europäischen DSGVO.',
    },
    s6: {
      h: '6. Internationale Übermittlungen',
      p1: 'Unsere Datenbanken werden in der EU (Frankfurt) gehostet. Bei US-Dienstleistern greifen Standardvertragsklauseln der EU-Kommission.',
      items: [
        'Supabase: Serverstandort Frankfurt (Deutschland, EU).',
        'Stripe & Resend: Abgesichert über EU-Standardvertragsklauseln (SCC).',
      ],
    },
    s7: {
      h: '7. Ihre Rechte (DSGVO)',
      p1: 'Ihnen stehen nach der DSGVO folgende Rechte unentgeltlich zu:',
      rights: [
        { icon: '👁️', title: 'Auskunft', desc: 'Recht auf Bestätigung und Kopie Ihrer verarbeiteten Daten.' },
        { icon: '✏️', title: 'Berichtigung', desc: 'Recht auf Korrektur unrichtiger oder unvollständiger Angaben.' },
        { icon: '🗑️', title: 'Löschung', desc: 'Recht auf Löschung („Recht auf Vergessenwerden“).' },
        { icon: '⏸️', title: 'Einschränkung', desc: 'Recht auf Einschränkung der Datenverarbeitung.' },
        { icon: '📦', title: 'Datenübertragbarkeit', desc: 'Erhalt der Daten in einem strukturierten, maschinenlesbaren Format.' },
        { icon: '🚫', title: 'Widerspruch', desc: 'Widerspruch gegen Verarbeitungen auf Basis berechtigter Interessen.' },
      ],
      p2: `Zur Ausübung Ihrer Rechte wenden Sie sich an ${EMAIL}. Wir antworten innerhalb von 30 Tagen.`,
      p3: 'Zuständige Aufsichtsbehörde: CNPD — Comissão Nacional de Proteção de Dados (www.cnpd.pt).',
    },
    s8: {
      h: '8. Cookies und lokaler Speicher',
      p1: 'Diese Website nutzt ausschließlich technisch notwendige Speichermechanismen:',
      headers: ['Mechanismus', 'Zweck', 'Dauer', 'Typ'],
      rows: [
        ['Auth-Session', 'Sicherung des internen Admin-Bereichs', 'Sitzung', 'Technisch notwendiges Cookie'],
        ['mrt_preferred_language', 'Speicherung der gewählten Sprache', 'Dauerhaft', 'Technisch notwendiges localStorage'],
      ],
      p2: 'Wir setzen keine Werbe-, Tracking- oder Social-Media-Cookies ein.',
    },
    s9: {
      h: '9. Datensicherheit',
      p1: 'Wir schützen Ihre Daten durch moderne technische und organisatorische Maßnahmen:',
      items: [
        'Vollständige Transportverschlüsselung über HTTPS/TLS.',
        'Geschütztes Administrationsportal mit strikter Zugriffskontrolle.',
        'Zahlungen nach PCI DSS Stufe 1 ausschließlich über Stripe.',
        'Row Level Security (RLS) auf Datenbankebene.',
      ],
    },
    s10: {
      h: '10. Kontakt & Beschwerden',
      p1: 'Bei Fragen zum Datenschutz oder zur Geltendmachung Ihrer Rechte:',
      contactItems: [
        `E-Mail: ${EMAIL}`,
        `Telefon / WhatsApp: ${PHONE}`,
        `Website: ${WEBSITE}`,
      ],
      p2: 'Datenschutzbehörde: CNPD — Comissão Nacional de Proteção de Dados (www.cnpd.pt).',
    },
  },

  fr: {
    tag: 'RGPD · Confidentialité',
    title: 'Politique de Confidentialité',
    updated: '22 novembre 2026',
    backBtn: '← Retour à l\'accueil',
    tocTitle: 'Table des matières',
    toc: [
      'Responsable du Traitement',
      'Données Collectées',
      'Finalités et Base Légale',
      'Conservation des Données',
      'Partage des Données',
      'Transferts Internationaux',
      'Vos Droits',
      'Cookies & Stockage',
      'Sécurité des Données',
      'Contact & Réclamations',
    ],
    intro: `${COMPANY} s'engage à protéger la vie privée de ses clients et utilisateurs. La présente politique détaille nos pratiques conformément au RGPD (Règlement UE 2016/679).`,
    s1: {
      h: '1. Responsable du Traitement',
      p1: `${COMPANY} est le responsable du traitement de vos données personnelles au sens du RGPD.`,
      fields: [
        { label: 'Entreprise', value: COMPANY },
        { label: 'Activité', value: 'Transferts privés et excursions touristiques sur l\'île de Madère' },
        { label: 'Pays', value: 'Portugal (Union Européenne)' },
      ],
    },
    s2: {
      h: '2. Données Personnelles Collectées',
      p1: 'Nous collectons uniquement les données strictement indispensables à l\'organisation et réalisation des prestations :',
      headers: ['Catégorie', 'Données', 'Moment de collecte', 'Obligatoire'],
      rows: [
        ['Identité', 'Nom complet', 'Formulaire de réservation', 'Oui'],
        ['Contact', 'Adresse e-mail', 'Réservation / Contact', 'Oui'],
        ['Contact', 'Téléphone / WhatsApp', 'Réservation / Contact', 'Oui'],
        ['Réservation', 'Date, heure, lieu de prise en charge, passagers, tour', 'Formulaire de réservation', 'Oui'],
        ['Paiement', 'Référence de transaction (jamais de données bancaires)', 'Paiement Stripe', 'Si applicable'],
        ['Technique', 'Adresse IP, navigateur, langue préférée', 'Navigation sur le site', 'Automatique'],
      ],
      note: `Nous ne collectons ni ne conservons jamais les numéros de carte bancaire. Les paiements en ligne sont traités de manière sécurisée par Stripe, Inc. (certifié PCI DSS niveau 1).`,
    },
    s3: {
      h: '3. Finalités et Bases Légales',
      purposes: [
        { title: 'Exécution du contrat', desc: 'Gestion des réservations, émission des vouchers et exécution du transport.', basis: 'Art. 6(1)(b) RGPD.' },
        { title: 'Intérêt légitime', desc: 'Sécurité du site, prévention de la fraude et amélioration de nos prestations.', basis: 'Art. 6(1)(f) RGPD.' },
        { title: 'Obligation légale', desc: 'Respect des obligations comptables et fiscales selon le droit portugais.', basis: 'Art. 6(1)(c) RGPD.' },
        { title: 'Consentement', desc: 'Envoi d\'informations ou offres (sur accord exprès préalable, révocable).', basis: 'Art. 6(1)(a) RGPD.' },
      ],
    },
    s4: {
      h: '4. Conservation des Données',
      p1: 'Vos données personnelles sont conservées pendant la durée nécessaire aux finalités prévues :',
      items: [
        'Données de réservation et facturation : 10 ans (obligation légale et fiscale portugaise)',
        'Demandes de contact : 2 ans après le dernier échange',
        'Journaux serveurs : 90 jours',
        'Références de paiement Stripe : Selon les règles de conservation de Stripe (max. 7 ans)',
      ],
      p2: 'À l\'issue de ces délais, les données sont supprimées ou anonymisées de façon définitive.',
    },
    s5: {
      h: '5. Partage des Données avec des Tiers',
      p1: 'Nous ne vendons ni ne louons vos données personnelles à des tiers à des fins publicitaires.',
      p2: 'Vos données sont partagées uniquement avec nos prestataires techniques habilités :',
      partners: [
        { name: 'Stripe, Inc.', desc: 'Passerelle de paiement sécurisée (conforme PCI DSS)' },
        { name: 'Supabase, Inc.', desc: 'Base de données sécurisée (serveurs dans l\'UE — Francfort)' },
        { name: 'Resend, Inc.', desc: 'Envoi des e-mails transactionnels et vouchers de réservation' },
      ],
      p3: 'Tous nos sous-traitants sont soumis à des accords conformes au RGPD.',
    },
    s6: {
      h: '6. Transferts Internationaux',
      p1: 'Les données de réservation sont hébergées dans l\'UE (Francfort). Pour les partenaires basés aux États-Unis, des Clauses Contractuelles Types (CCT) sont en place.',
      items: [
        'Supabase : Hébergement au sein de l\'Union Européenne (Francfort, Allemagne).',
        'Stripe & Resend : Encadrement par Clauses Contractuelles Types de la Commission Européenne.',
      ],
    },
    s7: {
      h: '7. Vos Droits (RGPD)',
      p1: 'Conformément au RGPD, vous disposez des droits suivants à tout moment et sans frais :',
      rights: [
        { icon: '👁️', title: 'Accès', desc: 'Obtenir une copie des données personnelles que nous détenons.' },
        { icon: '✏️', title: 'Rectification', desc: 'Demander la mise à jour ou correction de données inexactes.' },
        { icon: '🗑️', title: 'Effacement', desc: 'Demander la suppression de vos données personnelles.' },
        { icon: '⏸️', title: 'Limitation', desc: 'Demander la limitation temporaire du traitement.' },
        { icon: '📦', title: 'Portabilité', desc: 'Recevoir vos données dans un format standard lisible par machine.' },
        { icon: '🚫', title: 'Opposition', desc: 'S\'opposer au traitement fondé sur l\'intérêt légitime.' },
      ],
      p2: `Pour exercer vos droits, contactez-nous à ${EMAIL}. Nous répondons sous 30 jours.`,
      p3: 'Autorité de contrôle compétente : CNPD — Comissão Nacional de Proteção de Dados (www.cnpd.pt).',
    },
    s8: {
      h: '8. Cookies et Stockage Local',
      p1: 'Ce site internet recourt exclusivement à des éléments de stockage technique indispensables :',
      headers: ['Mécanisme', 'Finalité', 'Durée', 'Type'],
      rows: [
        ['Session Admin', 'Sécuriser l\'accès au panneau d\'administration', 'Session', 'Cookie strictement nécessaire'],
        ['mrt_preferred_language', 'Mémoriser la langue sélectionnée par le visiteur', 'Persistant', 'localStorage essentiel'],
      ],
      p2: 'Aucun cookie publicitaire, traceur invasif ou cookie de réseau social n\'est utilisé sur notre site.',
    },
    s9: {
      h: '9. Sécurité des Données',
      p1: 'Nous mettons en place des protocoles stricts pour protéger vos données :',
      items: [
        'Chiffrement complet des flux web via protocole HTTPS/TLS.',
        'Accès administrateur restreint avec authentification sécurisée.',
        'Paiements entièrement délégués à Stripe selon la norme PCI DSS niveau 1.',
        'Ségrégation des accès en base de données par politiques Row Level Security (RLS).',
      ],
    },
    s10: {
      h: '10. Contact et Réclamations',
      p1: 'Pour toute demande relative à vos données personnelles :',
      contactItems: [
        `E-mail : ${EMAIL}`,
        `Téléphone / WhatsApp : ${PHONE}`,
        `Site Web : ${WEBSITE}`,
      ],
      p2: 'Autorité de contrôle au Portugal : CNPD — Comissão Nacional de Proteção de Dados (www.cnpd.pt).',
    },
  },

  es: {
    tag: 'RGPD · Privacidad',
    title: 'Política de Privacidad',
    updated: '22 de noviembre de 2026',
    backBtn: '← Volver al inicio',
    tocTitle: 'Índice',
    toc: [
      'Responsable del Tratamiento',
      'Datos Recogidos',
      'Finalidades y Base Legal',
      'Conservación de Datos',
      'Destinatarios de Datos',
      'Transferencias Internacionales',
      'Sus Derechos',
      'Cookies y Almacenamiento',
      'Seguridad',
      'Contacto y Reclamaciones',
    ],
    intro: `${COMPANY} respeta su privacidad y está comprometida con la protección de sus datos personales conforme al RGPD (Reglamento UE 2016/679) y la legislación aplicable.`,
    s1: {
      h: '1. Responsable del Tratamiento de Datos',
      p1: `${COMPANY} es el responsable del tratamiento de sus datos personales bajo el RGPD.`,
      fields: [
        { label: 'Empresa', value: COMPANY },
        { label: 'Actividad', value: 'Traslados privados y tours guiados en la Isla de Madeira' },
        { label: 'País', value: 'Portugal (Unión Europea)' },
      ],
    },
    s2: {
      h: '2. Datos Personales Recogidos',
      p1: 'Recogemos únicamente los datos estrictamente necesarios para la prestación de nuestros servicios:',
      headers: ['Categoría', 'Datos', 'Cuándo se recogen', 'Obligatorio'],
      rows: [
        ['Identificación', 'Nombre completo', 'Formulario de reserva', 'Sí'],
        ['Contacto', 'Correo electrónico', 'Formulario de reserva / Contacto', 'Sí'],
        ['Contacto', 'Teléfono / WhatsApp', 'Formulario de reserva / Contacto', 'Sí'],
        ['Reserva', 'Fecha, hora, lugar de recogida, pasajeros, tour', 'Formulario de reserva', 'Sí'],
        ['Pago', 'Referencia de transacción (nunca datos de tarjeta)', 'Procesamiento Stripe', 'Si procede'],
        ['Técnicos', 'Dirección IP, navegador, preferencia de idioma', 'Navegación en el sitio', 'Automático'],
      ],
      note: `Nunca recogemos datos de tarjeta bancaria de forma directa. Los pagos online son gestionados exclusivamente por Stripe, Inc. (certificado PCI DSS nivel 1).`,
    },
    s3: {
      h: '3. Finalidades y Base Legal',
      purposes: [
        { title: 'Ejecución del contrato', desc: 'Gestionar su reserva, emitir confirmaciones/vouchers y coordinar el traslado.', basis: 'Art. 6(1)(b) RGPD.' },
        { title: 'Interés legítimo', desc: 'Garantizar la seguridad web, prevenir fraudes y optimizar el servicio.', basis: 'Art. 6(1)(f) RGPD.' },
        { title: 'Obligación legal', desc: 'Cumplir con las obligaciones fiscales y contables según la legislación portuguesa.', basis: 'Art. 6(1)(c) RGPD.' },
        { title: 'Consentimiento', desc: 'Envío de información o promociones (solo con consentimiento expreso revocable).', basis: 'Art. 6(1)(a) RGPD.' },
      ],
    },
    s4: {
      h: '4. Conservación de Datos',
      p1: 'Conservamos sus datos durante el tiempo estrictamente necesario:',
      items: [
        'Datos de reservas y facturación: 10 años (plazo legal fiscal en Portugal)',
        'Consultas y contactos: 2 años tras la última comunicación',
        'Registros técnicos de servidor: 90 días',
        'Referencias de pago en Stripe: Según normativa de conservación de Stripe (máx. 7 años)',
      ],
      p2: 'Finalizado el plazo, los datos se eliminan o anonimizan de forma segura.',
    },
    s5: {
      h: '5. Destinatarios y Cesión de Datos',
      p1: 'No vendemos ni comercializamos sus datos personales con terceras partes.',
      p2: 'Sus datos se comparten exclusivamente con proveedores tecnológicos indispensables:',
      partners: [
        { name: 'Stripe, Inc.', desc: 'Pasarela de pagos seguros (norma PCI DSS)' },
        { name: 'Supabase, Inc.', desc: 'Base de datos en la nube encriptada (servidores en la UE — Fráncfort)' },
        { name: 'Resend, Inc.', desc: 'Envío de correos transaccionales y vouchers de reserva' },
      ],
      p3: 'Todos los proveedores cuentan con contratos conformes al RGPD.',
    },
    s6: {
      h: '6. Transferencias Internacionales',
      p1: 'Nuestros servidores principales se encuentran en la Unión Europea (Fráncfort, Alemania). Para transferencias con proveedores en EE.UU., se aplican Cláusulas Contractuales Tipo (SCC).',
      items: [
        'Supabase: Alojamiento en la Unión Europea (Fráncfort, Alemania).',
        'Stripe & Resend: Garantizados mediante Cláusulas Contractuales Tipo de la CE.',
      ],
    },
    s7: {
      h: '7. Sus Derechos (RGPD)',
      p1: 'Como titular de los datos, puede ejercer los siguientes derechos de forma gratuita:',
      rights: [
        { icon: '👁️', title: 'Acceso', desc: 'Solicitar copia de los datos personales tratados.' },
        { icon: '✏️', title: 'Rectificación', desc: 'Corregir datos inexactos o incompletos.' },
        { icon: '🗑️', title: 'Supresión', desc: 'Solicitar el borrado de sus datos personales.' },
        { icon: '⏸️', title: 'Limitación', desc: 'Limitar el tratamiento en las circunstancias legales.' },
        { icon: '📦', title: 'Portabilidad', desc: 'Recibir sus datos en formato estructurado y legible.' },
        { icon: '🚫', title: 'Oposición', desc: 'Oponerse a tratamientos basados en interés legítimo.' },
      ],
      p2: `Para ejercer sus derechos, escríbanos a ${EMAIL}. Respondemos en un plazo máximo de 30 días.`,
      p3: 'Autoridad de control: CNPD — Comissão Nacional de Proteção de Dados (www.cnpd.pt).',
    },
    s8: {
      h: '8. Cookies y Almacenamiento Local',
      p1: 'Utilizamos exclusivamente mecanismos de almacenamiento técnico indispensables:',
      headers: ['Mecanismo', 'Finalidad', 'Duración', 'Tipo'],
      rows: [
        ['Sesión Admin', 'Mantener segura la sesión del panel de administración', 'Sesión', 'Cookie estrictamente necesaria'],
        ['mrt_preferred_language', 'Guardar el idioma seleccionado por el usuario', 'Persistente', 'localStorage esencial'],
      ],
      p2: 'No utilizamos cookies de publicidad, redes sociales ni seguimiento invasivo de terceros.',
    },
    s9: {
      h: '9. Seguridad de los Datos',
      p1: 'Aplicamos rigurosas medidas para garantizar la máxima seguridad:',
      items: [
        'Comunicaciones cifradas mediante protocolo HTTPS/TLS.',
        'Panel administrativo blindado con control de accesos.',
        'Cobros seguros delegados íntegramente a Stripe (PCI DSS nivel 1).',
        'Políticas de Row Level Security (RLS) en la base de datos.',
      ],
    },
    s10: {
      h: '10. Contacto y Reclamaciones',
      p1: 'Para dudas o ejercicio de derechos sobre sus datos personales:',
      contactItems: [
        `Email: ${EMAIL}`,
        `Teléfono / WhatsApp: ${PHONE}`,
        `Sitio Web: ${WEBSITE}`,
      ],
      p2: 'Autoridad de control en Portugal: CNPD — Comissão Nacional de Proteção de Dados (www.cnpd.pt).',
    },
  },
};

const TOC_IDS = [
  'responsavel',
  'dados',
  'finalidades',
  'retencao',
  'partilha',
  'transferencias',
  'direitos',
  'cookies',
  'seguranca',
  'contacto',
];

export default function Privacy() {
  const { currentLang } = useLanguage();
  const c = PRIVACY[currentLang] || PRIVACY.en;

  return (
    <div className="legal-page">
      <div className="legal-hero">
        <div className="container-constrained">
          <span className="legal-tag">{c.tag}</span>
          <h1>{c.title}</h1>
          <p className="legal-updated">
            {c.updated.includes(':') ? c.updated : `Última atualização / Last updated: ${c.updated}`}
          </p>
        </div>
      </div>

      <div className="legal-content container-constrained">
        <div className="legal-toc">
          <h3>{c.tocTitle}</h3>
          <ol>
            {c.toc.map((item, idx) => (
              <li key={TOC_IDS[idx]}>
                <a href={`#${TOC_IDS[idx]}`}>{item}</a>
              </li>
            ))}
          </ol>
        </div>

        <div className="legal-body">
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '24px', fontStyle: 'italic' }}>
            {c.intro}
          </p>

          {/* Section 1: Data Controller */}
          <section id="responsavel">
            <h2>{c.s1.h}</h2>
            <p>{c.s1.p1}</p>
            <ul>
              {c.s1.fields.map((f, i) => (
                <li key={i}>
                  <strong>{f.label}:</strong> {f.value}
                </li>
              ))}
              <li>
                <strong>Email:</strong> <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <strong>WhatsApp:</strong>{' '}
                <a href="https://wa.me/351916326716" target="_blank" rel="noopener noreferrer">
                  {PHONE}
                </a>
              </li>
              <li>
                <strong>Website:</strong>{' '}
                <a href={WEBSITE} target="_blank" rel="noopener noreferrer">
                  {WEBSITE}
                </a>
              </li>
            </ul>
          </section>

          {/* Section 2: Data Collected */}
          <section id="dados">
            <h2>{c.s2.h}</h2>
            <p>{c.s2.p1}</p>
            <table className="legal-table">
              <thead>
                <tr>
                  {c.s2.headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.s2.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="legal-note">
              ⚠️ <strong>{c.s2.note}</strong>
            </p>
          </section>

          {/* Section 3: Purposes and Legal Basis */}
          <section id="finalidades">
            <h2>{c.s3.h}</h2>
            <div className="legal-purposes">
              {c.s3.purposes.map((p, i) => (
                <div key={i} className="purpose-card">
                  <strong>{p.title}</strong>
                  <p>
                    {p.desc} <em>{p.basis}</em>
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Retention */}
          <section id="retencao">
            <h2>{c.s4.h}</h2>
            <p>{c.s4.p1}</p>
            <ul>
              {c.s4.items.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
            <p>{c.s4.p2}</p>
          </section>

          {/* Section 5: Sharing */}
          <section id="partilha">
            <h2>{c.s5.h}</h2>
            <p>
              <strong>{c.s5.p1}</strong>
            </p>
            <p>{c.s5.p2}</p>
            <ul>
              {c.s5.partners.map((pt, i) => (
                <li key={i}>
                  <strong>{pt.name}</strong> — {pt.desc}
                </li>
              ))}
            </ul>
            <p>{c.s5.p3}</p>
          </section>

          {/* Section 6: International Transfers */}
          <section id="transferencias">
            <h2>{c.s6.h}</h2>
            <p>{c.s6.p1}</p>
            <ul>
              {c.s6.items.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </section>

          {/* Section 7: Rights */}
          <section id="direitos">
            <h2>{c.s7.h}</h2>
            <p>{c.s7.p1}</p>
            <div className="rights-grid">
              {c.s7.rights.map((r, i) => (
                <div key={i} className="right-item">
                  <span className="right-icon">{r.icon}</span>
                  <strong>{r.title}</strong>
                  <p>{r.desc}</p>
                </div>
              ))}
            </div>
            <p>
              {c.s7.p2}
            </p>
            <p>
              {c.s7.p3}{' '}
              (<a href={CNPD_URL} target="_blank" rel="noopener noreferrer">www.cnpd.pt</a>).
            </p>
          </section>

          {/* Section 8: Cookies */}
          <section id="cookies">
            <h2>{c.s8.h}</h2>
            <p>{c.s8.p1}</p>
            <table className="legal-table">
              <thead>
                <tr>
                  {c.s8.headers.map((h, i) => (
                    <th key={i}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.s8.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p>{c.s8.p2}</p>
          </section>

          {/* Section 9: Security */}
          <section id="seguranca">
            <h2>{c.s9.h}</h2>
            <p>{c.s9.p1}</p>
            <ul>
              {c.s9.items.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </section>

          {/* Section 10: Contact */}
          <section id="contacto">
            <h2>{c.s10.h}</h2>
            <p>{c.s10.p1}</p>
            <ul>
              {c.s10.contactItems.map((ci, i) => (
                <li key={i}>{ci}</li>
              ))}
            </ul>
            <p>{c.s10.p2}</p>
          </section>
        </div>
      </div>

      <div className="legal-back container-constrained">
        <Link to="/" className="legal-back-btn">
          {c.backBtn}
        </Link>
      </div>
    </div>
  );
}
