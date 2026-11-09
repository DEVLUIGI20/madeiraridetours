import { Link } from 'react-router-dom';
import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import { makeWhatsAppUrl } from '../../constants';
import './About.css';

const WHATSAPP_URL = makeWhatsAppUrl('Olá! Gostaria de mais informações sobre os vossos serviços na Madeira.');

export default function About() {
  return (
    <div className="about-mockup-page">

      {/* ── Sub-Hero ── */}
      <section className="about-mockup-hero">
        <div className="about-hero-bg">
          <ImagePlaceholder alt="Madeira Mountain Landscape" height="100%" />
          <div className="about-hero-overlay" />
        </div>
        <div className="about-hero-content container-constrained">
          <span className="about-hero-tag">QUEM SOMOS · WHO WE ARE</span>
          <h1 className="about-hero-title">About Madeira Ride Tours</h1>
          <p className="about-hero-subtitle">
            Your local experts for private transfers, island adventures and unforgettable excursions in Madeira.
          </p>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="about-main-section container-constrained">
        <div className="about-mockup-grid">
          <div className="about-mockup-text">
            <span className="about-badge">OUR STORY</span>
            <h2>Born and raised on the island we love</h2>
            <p>
              Madeira Ride Tours was founded with a simple mission: to share the authentic beauty of our island with visitors from around the world. As a local family-run business, we know every mountain road, hidden viewpoint and secret levada path that most tourists never discover.
            </p>
            <p>
              With over <strong>6 years of experience</strong> and more than <strong>1,000 happy travellers</strong>, we have built our reputation on punctuality, safety and genuinely personalised service. When you travel with us, you are not just a booking reference — you are a guest.
            </p>
            <p>
              We operate a fleet of modern, climate-controlled Mercedes-Benz vehicles, all fully licensed and insured for passenger transport in Portugal. Our drivers are certified, multilingual and passionate about showing you the best of Madeira.
            </p>

            <div className="about-highlights-boxes">
              <div className="about-box">
                <strong>6+</strong>
                <span>Years of Experience</span>
              </div>
              <div className="about-box">
                <strong>1,000+</strong>
                <span>Happy Travellers</span>
              </div>
              <div className="about-box">
                <strong>5.0 ★</strong>
                <span>Top Rated</span>
              </div>
              <div className="about-box">
                <strong>100%</strong>
                <span>Private &amp; Flexible</span>
              </div>
            </div>
          </div>

          <div className="about-mockup-media">
            <ImagePlaceholder
              alt="Madeira Ride Tours driver and van"
              aspectRatio="4/3"
              label="Our Team & Fleet"
            />
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="about-why-section">
        <div className="container-constrained">
          <div className="about-why-header">
            <span className="about-badge">WHY CHOOSE US</span>
            <h2>What makes us different</h2>
            <p>We are not a large agency. We are a small, dedicated team that treats every client like a local friend.</p>
          </div>

          <div className="about-features-grid">
            <div className="about-feature-card">
              <div className="about-feature-icon">🛡️</div>
              <h3>Licensed &amp; Insured</h3>
              <p>All our vehicles hold valid Portuguese tourism transport licences (TVDE/Aluguer). Full insurance coverage on every journey.</p>
            </div>
            <div className="about-feature-card">
              <div className="about-feature-icon">⏱️</div>
              <h3>Always Punctual</h3>
              <p>We monitor your flight in real time. If your plane is delayed, we wait — with no extra charge. You should never worry about missing a pickup.</p>
            </div>
            <div className="about-feature-card">
              <div className="about-feature-icon">🗣️</div>
              <h3>Multilingual Team</h3>
              <p>Our drivers speak <strong>English, Portuguese and Spanish</strong>, making every conversation comfortable for international visitors.</p>
            </div>
            <div className="about-feature-card">
              <div className="about-feature-icon">🌿</div>
              <h3>Local Knowledge</h3>
              <p>We know the best sunrise spots, the quietest levadas and the authentic restaurants that tourists rarely find. That local edge makes all the difference.</p>
            </div>
            <div className="about-feature-card">
              <div className="about-feature-icon">👨‍👩‍👧</div>
              <h3>Family Friendly</h3>
              <p>Baby seats, booster cushions and patience for families with young children — all included at no extra charge. Just ask when you book.</p>
            </div>
            <div className="about-feature-card">
              <div className="about-feature-icon">💬</div>
              <h3>24/7 WhatsApp Support</h3>
              <p>Have a question at midnight before your sunrise tour? We answer. Need to change your pickup time? No problem. We are always available on WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Fleet ── */}
      <section className="about-fleet-section container-constrained">
        <span className="about-badge">OUR VEHICLES</span>
        <h2>Comfortable, modern and always clean</h2>
        <p className="about-fleet-desc">We operate two categories of vehicle to suit any group size:</p>

        <div className="about-fleet-grid">
          <div className="about-fleet-card">
            <div className="about-fleet-media">
              <ImagePlaceholder alt="Mercedes-Benz V-Class Private Transfer" aspectRatio="16/9" label="Private Standard Van" />
              <span className="about-fleet-badge">Popular</span>
            </div>
            <div className="about-fleet-body">
              <h3>Private Standard Van</h3>
              <p>Up to <strong>4 passengers</strong> + 4 large suitcases. Climate controlled, leather seats, charging ports. Perfect for couples, families and small groups.</p>
              <ul>
                <li>✓ Mercedes-Benz V-Class or equivalent</li>
                <li>✓ Air conditioning</li>
                <li>✓ Complimentary water</li>
                <li>✓ Door-to-door service</li>
              </ul>
            </div>
          </div>
          <div className="about-fleet-card">
            <div className="about-fleet-media">
              <ImagePlaceholder alt="Mercedes-Benz Sprinter Group Transfer" aspectRatio="16/9" label="Executive Family Van" />
              <span className="about-fleet-badge">Spacious</span>
            </div>
            <div className="about-fleet-body">
              <h3>Executive Family Van</h3>
              <p>Up to <strong>8 passengers</strong> + 8 large suitcases. Ideal for larger families, groups of friends or corporate travel.</p>
              <ul>
                <li>✓ Mercedes-Benz Sprinter or equivalent</li>
                <li>✓ Extra luggage capacity</li>
                <li>✓ Air conditioning</li>
                <li>✓ Complimentary water</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="about-cta-section">
        <div className="container-constrained about-cta-inner">
          <div>
            <h2>Ready to explore Madeira with us?</h2>
            <p>Book your private transfer or adventure online, or send us a message on WhatsApp — we reply fast.</p>
          </div>
          <div className="about-cta-buttons">
            <Link to="/transfers" className="about-cta-primary">Book a Transfer</Link>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="about-cta-whatsapp">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.954 1.181-.176.2-.351.226-.653.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.787-1.676-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.239-.244-.589-.493-.51-.678-.52h-.578c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.482 1.079 2.912 1.23 3.113.15.2 2.123 3.243 5.143 4.548.718.311 1.279.497 1.716.636.722.23 1.378.197 1.9.12.58-.086 1.78-.727 2.03-1.43.251-.703.251-1.306.176-1.43-.075-.126-.276-.201-.577-.352zM12.04 21.787h-.002c-1.734 0-3.434-.466-4.92-1.348l-.353-.209-3.662.96 1.002-3.568-.23-.367a9.742 9.742 0 0 1-1.492-5.185c0-5.385 4.383-9.768 9.771-9.768 2.608 0 5.06 1.016 6.905 2.862a9.704 9.704 0 0 1 2.86 6.906c0 5.387-4.383 9.771-9.77 9.771zm8.31-18.079C18.134 1.493 15.215.334 12.04.334 5.626.334.402 5.556.402 11.972c0 2.05.534 4.053 1.55 5.818L0 24l6.417-1.683c1.706.93 3.63 1.42 5.617 1.42h.005c6.413 0 11.636-5.223 11.636-11.638 0-3.109-1.21-6.031-3.325-8.391z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
