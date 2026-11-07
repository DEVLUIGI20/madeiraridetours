import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import './Footer.css';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  return (
    <footer className="mockup-footer">
      <div className="mockup-footer-container">
        {/* Column 1: Brand & Slogan */}
        <div className="m-footer-col m-footer-brand">
          <Link to={ROUTES.HOME} className="m-footer-logo-link">
            <span className="m-logo-bold">MadeiraRide</span>
            <span className="m-logo-light">Tours</span>
          </Link>
          <p className="m-footer-tagline">Explore · Discover · Experience</p>
        </div>

        <div className="m-footer-divider" />

        {/* Column 2: Quick Links (2 sub-columns) */}
        <div className="m-footer-col m-footer-links-col">
          <h4 className="m-footer-heading">Quick Links</h4>
          <div className="m-footer-links-grid">
            <ul className="m-links-subcol">
              <li><Link to={ROUTES.HOME}>Home</Link></li>
              <li><Link to={ROUTES.TOURS}>Tours</Link></li>
              <li><Link to={ROUTES.TRANSFERS}>Transfers</Link></li>
              <li><Link to={ROUTES.CUSTOM_TOUR || '/custom-tour'}>Custom Tour</Link></li>
            </ul>
            <ul className="m-links-subcol">
              <li><Link to={ROUTES.ABOUT || '/about'}>About</Link></li>
              <li><Link to={ROUTES.CONTACT}>Contact</Link></li>
              <li><Link to={ROUTES.FAQ || '/faq'}>FAQ</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="m-footer-divider" />

        {/* Column 3: Our Services */}
        <div className="m-footer-col m-footer-services-col">
          <h4 className="m-footer-heading">Our Services</h4>
          <ul className="m-services-list">
            <li>
              <Link to={ROUTES.TOURS} className="m-service-item">
                <svg className="m-service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <circle cx="9" cy="10" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                <span>Tours</span>
              </Link>
            </li>
            <li>
              <Link to={ROUTES.TRANSFERS} className="m-service-item">
                <svg className="m-service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C2.1 10.9 2 11.2 2 11.5V16c0 .6.4 1 1 1h2" />
                  <circle cx="7" cy="17" r="2" />
                  <path d="M9 17h6" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
                <span>Transfers</span>
              </Link>
            </li>
            <li>
              <Link to={ROUTES.CUSTOM_TOUR || '/custom-tour'} className="m-service-item">
                <svg className="m-service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                  <line x1="8" y1="2" x2="8" y2="18" />
                  <line x1="16" y1="6" x2="16" y2="22" />
                </svg>
                <span>Custom Tours</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="m-footer-divider" />

        {/* Column 4: Stay Connected & Socials */}
        <div className="m-footer-col m-footer-subscribe-col">
          <h4 className="m-footer-heading">Stay Connected</h4>
          <p className="m-footer-subtext">Get the latest updates and special offers.</p>

          <form className="m-subscribe-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              className="m-subscribe-input"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="m-subscribe-btn">
              Subscribe &rarr;
            </button>
          </form>

          {isSubscribed && (
            <span className="m-subscribe-success">✓ Thank you for subscribing!</span>
          )}

          <div className="m-social-links">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="m-social-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="m-social-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="m-social-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/351916326716"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="m-social-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.954 1.181-.176.2-.351.226-.653.075-.301-.15-1.272-.469-2.423-1.496-.895-.799-1.5-1.787-1.676-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.239-.244-.589-.493-.51-.678-.52h-.578c-.2 0-.527.075-.803.376s-1.054 1.03-1.054 2.511c0 1.482 1.079 2.912 1.23 3.113.15.2 2.123 3.243 5.143 4.548.718.311 1.279.497 1.716.636.722.23 1.378.197 1.9.12.58-.086 1.78-.727 2.03-1.43.251-.703.251-1.306.176-1.43-.075-.126-.276-.201-.577-.352zM12.04 21.787h-.002c-1.734 0-3.434-.466-4.92-1.348l-.353-.209-3.662.96 1.002-3.568-.23-.367a9.742 9.742 0 0 1-1.492-5.185c0-5.385 4.383-9.768 9.771-9.768 2.608 0 5.06 1.016 6.905 2.862a9.704 9.704 0 0 1 2.86 6.906c0 5.387-4.383 9.771-9.77 9.771zm8.31-18.079C18.134 1.493 15.215.334 12.04.334 5.626.334.402 5.556.402 11.972c0 2.05.534 4.053 1.55 5.818L0 24l6.417-1.683c1.706.93 3.63 1.42 5.617 1.42h.005c6.413 0 11.636-5.223 11.636-11.638 0-3.109-1.21-6.031-3.325-8.391z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="m-footer-divider" />

        {/* Column 5: Madeira Mountain Contour Artwork */}
        <div className="m-footer-col m-footer-artwork-col">
          <div className="m-mountain-graphic">
            <svg
              className="m-mountain-svg"
              viewBox="0 0 280 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Back mountain ridge */}
              <path
                d="M10 75 L55 52 L95 62 L150 25 L195 48 L240 32 L275 68"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Foreground dramatic peak */}
              <path
                d="M5 80 L50 60 L85 68 L140 38 L165 12 L195 38 L230 45 L275 75"
                stroke="rgba(255, 255, 255, 0.6)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Ridge highlights */}
              <path
                d="M165 12 L172 26 L168 45 L175 70"
                stroke="rgba(255, 255, 255, 0.28)"
                strokeWidth="1.2"
                strokeDasharray="2 3"
              />
            </svg>
            <div className="m-madeira-tag">
              <span className="m-madeira-script">Madeira</span>
              <span className="m-madeira-subtitle">more than a destination</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mockup-footer-bottom">
        <div className="m-footer-bottom-container">
          <p className="m-bottom-copy">
            &copy; {CURRENT_YEAR} MadeiraRideTours. All rights reserved.
          </p>
          <p className="m-bottom-powered">
            Made with <span className="m-heart">❤</span> | Powered by MadeiraRideTours
          </p>
        </div>
      </div>
    </footer>
  );
}
