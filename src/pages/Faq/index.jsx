import { useState } from 'react';
import { APP_CONFIG, makeWhatsAppUrl } from '../../constants';
import './Faq.css';

const WHATSAPP_URL = makeWhatsAppUrl('Olá! Tenho uma dúvida sobre os vossos serviços na Madeira.');

const FAQ_CATEGORIES = [
  { id: 'transfers', label: '✈️ Transfers & Airport', emoji: '✈️' },
  { id: 'tours', label: '🏔️ Tours & Adventures', emoji: '🏔️' },
  { id: 'booking', label: '📅 Booking & Payment', emoji: '📅' },
  { id: 'practical', label: '🧳 Practical Info', emoji: '🧳' },
];

const FAQS = [
  // Transfers & Airport
  {
    id: 1,
    category: 'transfers',
    q: 'How does a Madeira Airport (FNC) transfer work?',
    a: 'After landing, follow the signs to the arrivals hall. Our driver will be waiting for you holding a sign with your name. We monitor your flight in real time — if it is delayed, we adjust without any extra charge. The standard waiting time is 60 minutes from landing.'
  },
  {
    id: 2,
    category: 'transfers',
    q: 'What if my flight is delayed?',
    a: 'No problem at all. We track all flights live. We will be there when you land, regardless of delays. You will never be charged extra for waiting caused by flight delays.'
  },
  {
    id: 3,
    category: 'transfers',
    q: 'Can I book a transfer between locations (not airport)?',
    a: 'Yes! We do point-to-point private transfers anywhere on the island — hotel to hotel, Funchal to Calheta, Caniço to Porto Moniz, and so on. Use the booking form or contact us on WhatsApp for custom routes.'
  },
  {
    id: 4,
    category: 'transfers',
    q: 'Do you offer round-trip (return) transfers?',
    a: 'Yes. You can book a one-way or round-trip transfer directly from our website. Round-trip bookings are discounted compared to two separate one-way bookings.'
  },
  {
    id: 5,
    category: 'transfers',
    q: 'How much luggage can I bring?',
    a: 'The Standard Van (up to 4 passengers) fits 4 large suitcases + small carry-ons. The Executive Family Van (up to 8 passengers) fits 8 large suitcases. If you have unusual luggage (surfboards, bikes, golf bags), please let us know when booking.'
  },
  // Tours & Adventures
  {
    id: 6,
    category: 'tours',
    q: 'Are your tours private or shared with strangers?',
    a: "100% private — always. We never mix groups. The vehicle, the driver and the experience are exclusively yours and your companions'. You set the pace, choose when to stop for photos, coffee or a meal, and customise the route to your preferences."
  },
  {
    id: 7,
    category: 'tours',
    q: 'Can we stop wherever we want during a tour?',
    a: 'Absolutely. All our tours are flexible. We have suggested itineraries, but if you spot a viewpoint, want to stop at a local bakery or spend more time at a particular place, just ask the driver. That flexibility is exactly why private tours are worth it.'
  },
  {
    id: 8,
    category: 'tours',
    q: 'Do you provide transport to levadas and hiking trails?',
    a: 'Yes! We specialise in hiking logistics across Madeira. Popular routes include the PR1 (drop at Pico do Areeiro, pick up at Achada do Teixeira / Pico Ruivo), 25 Fontes in Rabaçal, Vereda do Fanal and many more. We can drop you at the trailhead and pick you up at the exit — no need to backtrack.'
  },
  {
    id: 9,
    category: 'tours',
    q: 'What is included in an adventure tour?',
    a: 'All adventure tours include: private modern van, certified local driver/guide, door-to-door hotel pickup and drop-off, flexible stops, complimentary bottled water. Entrance fees to attractions, meals and tips are not included unless stated.'
  },
  {
    id: 10,
    category: 'tours',
    q: 'Can I watch the sunrise at Pico do Areeiro?',
    a: 'Yes — this is one of our most popular experiences! We pick you up from your hotel early (around 05:00–05:30), drive you to the summit (1,818 m) and you watch the sunrise above the clouds. It is an unforgettable experience. Book early as spots fill quickly.'
  },
  {
    id: 11,
    category: 'tours',
    q: 'What if the weather is bad on the day of my tour?',
    a: 'Madeira has a unique microclimate. We monitor conditions closely and will always offer an alternative if the original destination is fogged in or unsafe. We can suggest a comparable route or reschedule to a better day at no extra cost. Your experience comes first.'
  },
  // Booking & Payment
  {
    id: 12,
    category: 'booking',
    q: 'How do I book? Online only?',
    a: 'You can book through our website (online card payment via Stripe), or contact us directly on WhatsApp (+351 916 326 716) or by phone. For custom tours or special requests, WhatsApp is the fastest way to get a personalised quote.'
  },
  {
    id: 13,
    category: 'booking',
    q: 'What payment methods do you accept?',
    a: 'Online: Visa, Mastercard and major debit cards via Stripe (100% secure, PCI DSS compliant). In person: cash (EUR), MB Way, debit/credit card. We do not charge extra for card payments.'
  },
  {
    id: 14,
    category: 'booking',
    q: 'What is your cancellation policy?',
    a: 'Free cancellation up to 24 hours before the service. Cancellations within 24 hours may incur a 50% fee. No-show (without prior contact) is non-refundable. We are very flexible with rescheduling due to weather or personal circumstances — just contact us as soon as possible.'
  },
  {
    id: 15,
    category: 'booking',
    q: 'Will I receive a booking confirmation?',
    a: 'Yes. You will receive an email with a booking voucher immediately after payment. This contains your booking reference, service details, date, time and driver contact information. Keep it handy on your phone.'
  },
  {
    id: 16,
    category: 'booking',
    q: 'Are prices per person or per vehicle?',
    a: 'All prices are per vehicle (not per person). So whether you are 1 or 4 people in the standard van, the price is the same. This makes us excellent value for families and groups.'
  },
  // Practical Info
  {
    id: 17,
    category: 'practical',
    q: 'Do you have child seats and baby seats?',
    a: 'Yes. We have certified baby seats (Group 0+/1) and booster cushions available at no extra charge. Please let us know the age and weight of your children when booking so we can prepare the right equipment.'
  },
  {
    id: 18,
    category: 'practical',
    q: 'Are pets allowed?',
    a: 'Small pets in a carrier are welcome. Larger dogs are accepted on request — please inform us when booking. We want your whole family to travel comfortably.'
  },
  {
    id: 19,
    category: 'practical',
    q: 'Do your drivers speak English?',
    a: 'Yes. Our drivers speak English, Portuguese and Spanish. If you need another language, let us know and we will do our best to accommodate.'
  },
  {
    id: 20,
    category: 'practical',
    q: 'What should I wear for a mountain tour?',
    a: "Madeira's mountain zones (Pico do Areeiro, Fanal, Paul da Serra) can be significantly cooler and wetter than the coast. We recommend bringing a light waterproof jacket and comfortable walking shoes even in summer. We will advise you on what to expect for your specific tour."
  },
  {
    id: 21,
    category: 'practical',
    q: 'Is tipping expected?',
    a: 'Tips are never expected but always appreciated. If you had a great experience, a small tip is a kind gesture — typically €5–10 per vehicle for a half-day, €10–20 for a full day. It is entirely optional and at your discretion.'
  },
];

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
