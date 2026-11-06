import { useLanguage } from '../../hooks/useLanguage';
import aboutImg from '../../assets/images/about-pico-clouds.jpg';
import './AboutSection.css';

/**
 * About Us Section with narrative on the left and scenic sunrise photo on the right.
 */
export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="about" className="about-section" aria-label="About Madeira Ride Tours">
      <div className="about-container">
        
        {/* Left Column: Story & Mission */}
        <div className="about-content">
          <h2 className="about-title">
            {t('aboutUs.titlePrefix')}
            <em>{t('aboutUs.titleItalic')}</em>
          </h2>

          <div className="about-paragraphs">
            <p>{t('aboutUs.p1')}</p>
            <p>{t('aboutUs.p2')}</p>
            <p>{t('aboutUs.p3')}</p>
            <p>{t('aboutUs.p4')}</p>
          </div>

          <div className="about-tagline-box">
            <div className="about-tagline-bar" />
            <p className="about-tagline-text">{t('aboutUs.tagline')}</p>
          </div>
        </div>

        {/* Right Column: Scenic Photo over the Clouds */}
        <div className="about-media">
          <div className="about-image-wrapper">
            <img
              src={aboutImg}
              alt="Madeira Ride Tours — Nascer do sol acima das nuvens no Pico do Areeiro"
              className="about-image"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  );
}

