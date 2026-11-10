import { useState } from 'react';
import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import { useLanguage } from '../../hooks/useLanguage';
import './Contact.css';

export default function Contact() {
  const { currentLang } = useLanguage();
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
          <h1 className="contact-hero-title">
            {currentLang === 'pt' ? 'Contacte-nos' : currentLang === 'de' ? 'Kontaktieren Sie uns' : currentLang === 'fr' ? 'Contactez-nous' : currentLang === 'es' ? 'Contáctenos' : 'Contact Us'}
          </h1>
          <p className="contact-hero-subtitle">
            {currentLang === 'pt'
              ? 'Estamos aqui para ajudar! Fale connosco para esclarecer dúvidas, passeios à medida ou reservas.'
              : 'We are here to help! Get in touch for questions, bespoke tours or bookings.'}
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
                <h4>{currentLang === 'pt' ? 'Telefone / WhatsApp' : 'Phone / WhatsApp'}</h4>
                <a href="https://wa.me/351916326716" target="_blank" rel="noreferrer">+351 916 326 716</a>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon">📍</div>
              <div>
                <h4>{currentLang === 'pt' ? 'Localização' : 'Location'}</h4>
                <p>{currentLang === 'pt' ? 'Funchal, Ilha da Madeira, Portugal' : 'Funchal, Madeira Island, Portugal'}</p>
              </div>
            </div>
          </div>

          {/* Center: Message Form */}
          <div className="contact-form-card">
            <h3>{currentLang === 'pt' ? 'Envie-nos uma mensagem' : 'Send us a message'}</h3>

            {submitted ? (
              <div className="contact-success-msg">
                <span>✓</span> {currentLang === 'pt' ? 'Obrigado! Entraremos em contacto brevemente via WhatsApp ou Email.' : 'Thank you! We will get back to you shortly via WhatsApp or Email.'}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-two-cols">
                  <label className="contact-label">
                    <span>{currentLang === 'pt' ? 'Nome *' : 'Name *'}</span>
                    <input
                      type="text"
                      required
                      placeholder={currentLang === 'pt' ? 'O seu nome completo' : 'Your full name'}
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
                  <span>{currentLang === 'pt' ? 'Mensagem *' : 'Message *'}</span>
                  <textarea
                    rows={5}
                    required
                    placeholder={currentLang === 'pt' ? 'Diga-nos o que gostaria de saber ou as datas pretendidas...' : 'Tell us what you would like to know or what dates you have in mind...'}
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    className="contact-textarea"
                  />
                </label>

                <button type="submit" className="contact-submit-btn">
                  {currentLang === 'pt' ? 'Enviar Mensagem →' : 'Send Message →'}
                </button>
              </form>
            )}
          </div>

          {/* Right: Map Slot Placeholder */}
          <div className="contact-map-card">
            <ImagePlaceholder
              alt="Madeira Location Map"
              aspectRatio="1/1"
              label={currentLang === 'pt' ? 'Sede no Funchal' : 'Funchal Headquarters'}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
