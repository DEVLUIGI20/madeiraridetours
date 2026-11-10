import { useState } from 'react';
import { APP_CONFIG, makeWhatsAppUrl } from '../../constants';
import { useLanguage } from '../../hooks/useLanguage';
import './Faq.css';

const WHATSAPP_URL = makeWhatsAppUrl('Olá! Tenho uma dúvida sobre os vossos serviços na Madeira.');

const FAQ_CATEGORIES = [
  { id: 'transfers', label: '✈️ Transfers & Airport', labelPt: '✈️ Transfers & Aeroporto', emoji: '✈️' },
  { id: 'tours', label: '🏔️ Tours & Adventures', labelPt: '🏔️ Passeios & Aventuras', emoji: '🏔️' },
  { id: 'booking', label: '📅 Booking & Payment', labelPt: '📅 Reservas & Pagamento', emoji: '📅' },
  { id: 'practical', label: '🧳 Practical Info', labelPt: '🧳 Informações Úteis', emoji: '🧳' },
];

const FAQS = [
  // Transfers & Airport
  {
    id: 1,
    category: 'transfers',
    q: 'How does a Madeira Airport (FNC) transfer work?',
    qPt: 'Como funciona o transfer do Aeroporto da Madeira (FNC)?',
    a: 'After landing, follow the signs to the arrivals hall. Our driver will be waiting for you holding a sign with your name. We monitor your flight in real time — if it is delayed, we adjust without any extra charge. The standard waiting time is 60 minutes from landing.',
    aPt: 'Após aterrar, dirija-se à área das chegadas. O nosso motorista estará à sua espera com uma placa com o seu nome. Acompanhamos o seu voo em tempo real — se atrasar, ajustamos o horário sem custos extra. O tempo de espera padrão incluído é de 60 minutos após a aterragem.'
  },
  {
    id: 2,
    category: 'transfers',
    q: 'What if my flight is delayed?',
    qPt: 'E se o meu voo estiver atrasado?',
    a: 'No problem at all. We track all flights live. We will be there when you land, regardless of delays. You will never be charged extra for waiting caused by flight delays.',
    aPt: 'Sem qualquer problema. Monitorizamos todos os voos ao vivo. Estaremos lá quando aterrar, independentemente do atraso, sem qualquer taxa adicional de espera.'
  },
  {
    id: 3,
    category: 'transfers',
    q: 'Can I book a transfer between locations (not airport)?',
    qPt: 'Posso reservar um transfer entre locais na ilha (sem ser aeroporto)?',
    a: 'Yes! We do point-to-point private transfers anywhere on the island — hotel to hotel, Funchal to Calheta, Caniço to Porto Moniz, and so on. Use the booking form or contact us on WhatsApp for custom routes.',
    aPt: 'Sim! Realizamos transfers privados ponto a ponto em qualquer parte da ilha — hotel para hotel, Funchal para Calheta, Caniço para Porto Moniz, etc. Utilize o formulário ou contacte-nos pelo WhatsApp.'
  },
  {
    id: 4,
    category: 'transfers',
    q: 'Do you offer round-trip (return) transfers?',
    qPt: 'Têm transfers de ida e volta?',
    a: 'Yes. You can book a one-way or round-trip transfer directly from our website. Round-trip bookings are discounted compared to two separate one-way bookings.',
    aPt: 'Sim. Pode reservar transfers só de ida ou ida e volta diretamente no nosso site com tarifas especiais vantajosas.'
  },
  {
    id: 5,
    category: 'transfers',
    q: 'How much luggage can I bring?',
    qPt: 'Quanta bagagem posso levar?',
    a: 'The Standard Van (up to 4 passengers) fits 4 large suitcases + small carry-ons. The Executive Family Van (up to 8 passengers) fits 8 large suitcases. If you have unusual luggage (surfboards, bikes, golf bags), please let us know when booking.',
    aPt: 'A carrinha Standard (até 4 passageiros) leva 4 malas grandes de porão mais bagagens de mão. A carrinha Executiva (até 8 passageiros) transporta 8 malas grandes. Se tiver pranchas ou bicicletas, avise-nos na reserva.'
  },
  // Tours & Adventures
  {
    id: 6,
    category: 'tours',
    q: 'Are your tours private or shared with strangers?',
    qPt: 'Os passeios são privados ou partilhados com estranhos?',
    a: "100% private — always. We never mix groups. The vehicle, the driver and the experience are exclusively yours and your companions'. You set the pace, choose when to stop for photos, coffee or a meal, and customise the route to your preferences.",
    aPt: '100% privados — sempre. Nunca misturamos grupos. A viatura, o motorista e o passeio são exclusivos seus e do seu grupo. Define o ritmo e escolhe onde parar com total liberdade.'
  },
  {
    id: 7,
    category: 'tours',
    q: 'Can we stop wherever we want during a tour?',
    qPt: 'Podemos parar onde quisermos durante o passeio?',
    a: 'Absolutely. All our tours are flexible. We have suggested itineraries, but if you spot a viewpoint, want to stop at a local bakery or spend more time at a particular place, just ask the driver.',
    aPt: 'Com certeza. Todos os nossos passeios são flexíveis. Dispomos de itinerários recomendados, mas se desejar parar num miradouro ou café, basta avisar o motorista.'
  },
  {
    id: 8,
    category: 'tours',
    q: 'Do you provide transport to levadas and hiking trails?',
    qPt: 'Fazem transporte para levadas e trilhos pedestres?',
    a: 'Yes! We specialise in hiking logistics across Madeira. Popular routes include the PR1 (Pico do Areeiro to Pico Ruivo), 25 Fontes, Fanal and many more. We can drop you at the trailhead and pick you up at the exit.',
    aPt: 'Sim! Somos especialistas na logística de caminhadas na Madeira: PR1 (Pico do Areeiro ao Pico Ruivo), 25 Fontes no Rabaçal, Fanal e muitas outras levadas.'
  },
  // Booking & Payment
  {
    id: 12,
    category: 'booking',
    q: 'How do I book? Online only?',
    qPt: 'Como posso reservar? Apenas online?',
    a: 'You can book through our website (online card payment via Stripe), or contact us directly on WhatsApp (+351 916 326 716) or by phone.',
    aPt: 'Pode reservar pelo nosso site (pagamento com cartão via Stripe) ou diretamente pelo WhatsApp (+351 916 326 716).'
  },
  {
    id: 13,
    category: 'booking',
    q: 'What payment methods do you accept?',
    qPt: 'Quais os métodos de pagamento aceites?',
    a: 'Online: Visa, Mastercard and major debit cards via Stripe (100% secure). In person: cash (EUR), MB Way, debit/credit card.',
    aPt: 'Online: Visa, Mastercard e cartões de débito via Stripe (100% seguro). Presencialmente: numerário (€), MB Way ou cartão.'
  },
  {
    id: 14,
    category: 'booking',
    q: 'What is your cancellation policy?',
    qPt: 'Qual é a vossa política de cancelamento?',
    a: 'Free cancellation up to 24 hours before the service. We are very flexible with rescheduling due to weather or personal circumstances.',
    aPt: 'Cancelamento gratuito até 24 horas antes do serviço. Somos muito flexíveis no reagendamento por motivos meteorológicos.'
  },
  // Practical Info
  {
    id: 17,
    category: 'practical',
    q: 'Do you have child seats and baby seats?',
    qPt: 'Disponibilizam cadeirinhas para crianças e bebés?',
    a: 'Yes. We have certified baby seats and booster cushions available at no extra charge. Please let us know when booking.',
    aPt: 'Sim. Dispomos de cadeirinhas homologadas para bebés e assentos de elevação sem qualquer custo adicional.'
  },
  {
    id: 19,
    category: 'practical',
    q: 'Do your drivers speak English?',
    qPt: 'Os motoristas falam outras línguas?',
    a: 'Yes. Our drivers speak English, Portuguese and Spanish.',
    aPt: 'Sim. Os nossos motoristas falam Português, Inglês e Espanhol.'
  },
];

function FaqItem({ item, currentLang }) {
  const [open, setOpen] = useState(false);
  const qText = currentLang === 'pt' && item.qPt ? item.qPt : item.q;
  const aText = currentLang === 'pt' && item.aPt ? item.aPt : item.a;

  return (
    <div className={`faq-item-card ${open ? 'open' : ''}`}>
      <button
        type="button"
        className="faq-item-trigger"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
      >
        <span className="faq-item-q">{qText}</span>
        <span className="faq-chevron">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="faq-item-answer">
          <p>{aText}</p>
        </div>
      )}
    </div>
  );
}

export default function Faq() {
  const { currentLang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('transfers');

  const filtered = FAQS.filter((f) => f.category === activeCategory);

  return (
    <div className="faq-standalone-page">

      {/* Hero */}
      <section className="faq-hero">
        <div className="container-constrained">
          <span className="faq-hero-tag">
            {currentLang === 'pt' ? 'CENTRO DE AJUDA' : 'HELP CENTER'}
          </span>
          <h1>
            {currentLang === 'pt' ? 'Perguntas ' : 'Frequently Asked '}
            <em>{currentLang === 'pt' ? 'Frequentes' : 'Questions'}</em>
          </h1>
          <p className="faq-hero-desc">
            {currentLang === 'pt'
              ? 'Tudo o que precisa de saber sobre transfers privados, passeios e aventuras na Madeira.'
              : 'Everything you need to know about private transfers, island tours and adventures in Madeira.'}
          </p>
        </div>
      </section>

      {/* Category Tabs + Questions */}
      <section className="faq-main container-constrained">
        <div className="faq-category-tabs">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`faq-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {currentLang === 'pt' ? cat.labelPt : cat.label}
            </button>
          ))}
        </div>

        <div className="faq-questions-list">
          {filtered.map((item) => (
            <FaqItem key={item.id} item={item} currentLang={currentLang} />
          ))}
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="faq-cta-section">
        <div className="container-constrained faq-cta-inner">
          <div className="faq-cta-text">
            <h2>{currentLang === 'pt' ? 'Ainda tem dúvidas?' : 'Still have questions?'}</h2>
            <p>
              {currentLang === 'pt'
                ? 'Respondemos no WhatsApp 7 dias por semana, geralmente em poucos minutos. Atendimento humano por pessoas da nossa equipa.'
                : 'We answer WhatsApp messages 7 days a week, usually within minutes. No bots — a real person from our team.'}
            </p>
          </div>
          <div className="faq-cta-actions">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="faq-whatsapp-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
                <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.954 1.181-.176.2-.351.226-.653.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.787-1.676-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.239-.244-.589-.493-.51-.678-.52h-.578c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.482 1.079 2.912 1.23 3.113.15.2 2.123 3.243 5.143 4.548.718.311 1.279.497 1.716.636.722.23 1.378.197 1.9.12.58-.086 1.78-.727 2.03-1.43.251-.703.251-1.306.176-1.43-.075-.126-.276-.201-.577-.352zM12.04 21.787h-.002c-1.734 0-3.434-.466-4.92-1.348l-.353-.209-3.662.96 1.002-3.568-.23-.367a9.742 9.742 0 0 1-1.492-5.185c0-5.385 4.383-9.768 9.771-9.768 2.608 0 5.06 1.016 6.905 2.862a9.704 9.704 0 0 1 2.86 6.906c0 5.387-4.383 9.771-9.77 9.771zm8.31-18.079C18.134 1.493 15.215.334 12.04.334 5.626.334.402 5.556.402 11.972c0 2.05.534 4.053 1.55 5.818L0 24l6.417-1.683c1.706.93 3.63 1.42 5.617 1.42h.005c6.413 0 11.636-5.223 11.636-11.638 0-3.109-1.21-6.031-3.325-8.391z"/>
              </svg>
              {currentLang === 'pt' ? 'Conversar no WhatsApp' : 'Chat on WhatsApp'}
            </a>
            <a href={`tel:${APP_CONFIG.PHONE_RAW}`} className="faq-phone-btn">
              📞 {APP_CONFIG.PHONE}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item-card ${open ? 'open' : ''}`}>
      <button
        type="button"
        className="faq-item-trigger"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
      >
        <span className="faq-item-q">{item.q}</span>
        <span className="faq-chevron">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="faq-item-answer">
          <p>{item.a}</p>
        </div>
      )}
    </div>
  );
}

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState('transfers');

  const filtered = FAQS.filter((f) => f.category === activeCategory);

  return (
    <div className="faq-standalone-page">

      {/* Hero */}
      <section className="faq-hero">
        <div className="container-constrained">
          <span className="faq-hero-tag">HELP CENTER</span>
          <h1>Frequently Asked <em>Questions</em></h1>
          <p className="faq-hero-desc">
            Everything you need to know about private transfers, island tours and adventures in Madeira.
          </p>
        </div>
      </section>

      {/* Category Tabs + Questions */}
      <section className="faq-main container-constrained">
        <div className="faq-category-tabs">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`faq-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="faq-questions-list">
          {filtered.map((item) => (
            <FaqItem key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="faq-cta-section">
        <div className="container-constrained faq-cta-inner">
          <div className="faq-cta-text">
            <h2>Still have questions?</h2>
            <p>We answer WhatsApp messages 7 days a week, usually within minutes. No bots — a real person from our team.</p>
          </div>
          <div className="faq-cta-actions">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="faq-whatsapp-btn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
                <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.954 1.181-.176.2-.351.226-.653.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.787-1.676-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.239-.244-.589-.493-.51-.678-.52h-.578c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.482 1.079 2.912 1.23 3.113.15.2 2.123 3.243 5.143 4.548.718.311 1.279.497 1.716.636.722.23 1.378.197 1.9.12.58-.086 1.78-.727 2.03-1.43.251-.703.251-1.306.176-1.43-.075-.126-.276-.201-.577-.352zM12.04 21.787h-.002c-1.734 0-3.434-.466-4.92-1.348l-.353-.209-3.662.96 1.002-3.568-.23-.367a9.742 9.742 0 0 1-1.492-5.185c0-5.385 4.383-9.768 9.771-9.768 2.608 0 5.06 1.016 6.905 2.862a9.704 9.704 0 0 1 2.86 6.906c0 5.387-4.383 9.771-9.77 9.771zm8.31-18.079C18.134 1.493 15.215.334 12.04.334 5.626.334.402 5.556.402 11.972c0 2.05.534 4.053 1.55 5.818L0 24l6.417-1.683c1.706.93 3.63 1.42 5.617 1.42h.005c6.413 0 11.636-5.223 11.636-11.638 0-3.109-1.21-6.031-3.325-8.391z"/>
              </svg>
              Chat on WhatsApp
            </a>
            <a href={`tel:${APP_CONFIG.PHONE_RAW}`} className="faq-phone-btn">
              📞 {APP_CONFIG.PHONE}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
