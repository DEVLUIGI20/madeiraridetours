import { useState } from 'react';
import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import './Contact.css';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="contact-mockup-page">
      {/* ── Sub-Hero ── */}
      <section className="contact-mockup-hero">
        <div className="contact-hero-bg">
          <ImagePlaceholder alt="Madeira Coast" height="100%" />
          <div className="contact-hero-overlay" />
        </div>
        <div className="contact-hero-content container-constrained">
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-subtitle">
            We are here to help! Get in touch for questions, bespoke tours or bookings.
          </p>
        </div>
      </section>

      {/* ── Contact Layout matching Mockup: Info Cards + Form + Map Slot ── */}
      <section className="contact-main container-constrained">
        <div className="contact-mockup-layout">
          {/* Left Info Column */}
          <div className="contact-info-col">
            <div className="contact-info-card">
              <div className="contact-info-icon">✉️</div>
              <div>
                <h4>Email</h4>
                <a href="mailto:info@madeiraridetours.com">info@madeiraridetours.com</a>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">📞</div>
              <div>
                <h4>Phone / WhatsApp</h4>
                <a href="https://wa.me/351916326716" target="_blank" rel="noreferrer">+351 916 326 716</a>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">📍</div>
              <div>
                <h4>Location</h4>
                <p>Funchal, Madeira Island, Portugal</p>
              </div>
            </div>
          </div>

          {/* Center: Message Form */}
          <div className="contact-form-card">
            <h3>Send us a message</h3>

            {submitted ? (
              <div className="contact-success-msg">
                <span>✓</span> Thank you! We will get back to you shortly via WhatsApp or Email.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-two-cols">
                  <label className="contact-label">
                    <span>Name *</span>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className="contact-input"
                    />
                  </label>

                  <label className="contact-label">
                    <span>Email *</span>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      className="contact-input"
                    />
                  </label>
                </div>

                <label className="contact-label">
                  <span>Message *</span>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us what you would like to know or what dates you have in mind..."
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    className="contact-textarea"
                  />
                </label>

                <button type="submit" className="contact-submit-btn">
                  Send Message →
                </button>
              </form>
            )}
          </div>

          {/* Right: Map Slot Placeholder */}
          <div className="contact-map-card">
            <ImagePlaceholder
              alt="Madeira Location Map"
              aspectRatio="1/1"
              label="Funchal Headquarters"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
