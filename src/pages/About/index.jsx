import ImagePlaceholder from '../../components/common/ImagePlaceholder';
import './About.css';

export default function About() {
  return (
    <div className="about-mockup-page">
      {/* ── Sub-Hero ── */}
      <section className="about-mockup-hero">
        <div className="about-hero-bg">
          <ImagePlaceholder alt="Madeira Landscape" height="100%" />
          <div className="about-hero-overlay" />
        </div>
        <div className="about-hero-content container-constrained">
          <h1 className="about-hero-title">About MadeiraRideTours</h1>
          <p className="about-hero-subtitle">
            Passion for Madeira, commitment to you.
          </p>
        </div>
      </section>

      {/* ── Narrative & Clean Photo Slot matching Mockup ── */}
      <section className="about-main-section container-constrained">
        <div className="about-mockup-grid">
          <div className="about-mockup-text">
            <span className="about-badge">WHO WE ARE</span>
            <h2>We are a local team passionate about Madeira</h2>
            <p>
              Dedicated to providing unforgettable experiences. With years of experience in tourism,
              we offer personalized tours, reliable transfers and a service you can trust.
            </p>
            <p>
              Born and raised on the island, our certified drivers share authentic stories,
              hidden viewpoint secrets, and the true welcoming spirit of Madeira.
            </p>

            <div className="about-highlights-boxes">
              <div className="about-box">
                <strong>1,000+</strong>
                <span>Happy Travelers</span>
              </div>
              <div className="about-box">
                <strong>100%</strong>
                <span>Private & Flexible</span>
              </div>
              <div className="about-box">
                <strong>5.0 ★</strong>
                <span>Top Rated</span>
              </div>
            </div>
          </div>

          <div className="about-mockup-media">
            <ImagePlaceholder
              alt="Madeira Panoramic View"
              aspectRatio="4/3"
              label="Madeira Team & Nature"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

