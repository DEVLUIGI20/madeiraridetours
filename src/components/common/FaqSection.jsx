import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import './FaqSection.css';

export default function FaqSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0); // first item open by default

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
  ];

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="faq-section" aria-label="Frequently Asked Questions">
      <div className="faq-container">

        {/* Section Header */}
        <div className="faq-header">
          <h2 className="faq-title">
            {t('faq.titleMain')}{' '}
            <em>{t('faq.titleItalic')}</em>
          </h2>
          <p className="faq-subtitle">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Accordion List */}
        <div className="faq-accordion">
          {faqs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-item ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => handleToggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="faq-question-text">{item.q}</span>
                  <span className="faq-icon-wrapper" aria-hidden="true">
                    <svg
                      className="faq-chevron"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                <div
                  id={`faq-answer-${idx}`}
                  className="faq-answer-wrapper"
                  style={{
                    maxHeight: isOpen ? '260px' : '0',
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="faq-answer-content">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Help Box */}
        <div className="faq-help-card">
          <div className="faq-help-text">
            <span className="faq-help-icon">💬</span>
            <div>
              <h4 className="faq-help-title">{t('faq.helpTitle')}</h4>
              <p className="faq-help-desc">{t('faq.helpDesc')}</p>
            </div>
          </div>
          <div className="faq-help-actions">
            <a
              href="https://wa.me/351916326716?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20os%20servi%C3%A7os%20da%20Madeira%20Ride%20Tours."
              target="_blank"
              rel="noopener noreferrer"
              className="faq-whatsapp-btn"
            >
              <span>WhatsApp</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

