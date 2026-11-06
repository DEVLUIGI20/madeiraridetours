import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useLanguage } from '../../hooks/useLanguage';
import './Footer.css';

const CURRENT_YEAR = new Date().getFullYear();

/**
 * Reusable Footer component.
 */
export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Brand Information */}
        <div className="footer-brand">
          <div className="footer-brand-title">
            <span>Madeira Ride Tours</span>
          </div>
          <p className="footer-desc">
            {t('footer.desc')}
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3>{t('footer.navTitle')}</h3>
          <ul>
            <li><Link to={ROUTES.HOME}>{t('footer.home')}</Link></li>
            <li><Link to="/#about">{t('nav.aboutUs')}</Link></li>
            <li><Link to={ROUTES.FAQ}>{t('nav.faq')}</Link></li>
            <li><Link to={ROUTES.TOURS}>{t('footer.ourTours')}</Link></li>
            <li><Link to={ROUTES.TRANSFERS}>{t('footer.transfers')}</Link></li>
            <li><Link to={ROUTES.BOOKING}>{t('footer.booking')}</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-col">
          <h3>{t('footer.servicesTitle')}</h3>
          <ul>
            <li><Link to={ROUTES.TOURS}>{t('footer.islandTours')}</Link></li>
            <li><Link to={ROUTES.TRANSFERS}>{t('footer.airportTransfers')}</Link></li>
            <li><Link to={ROUTES.TOURS}>{t('footer.levadas')}</Link></li>
            <li><Link to={ROUTES.CONTACT}>{t('footer.customRides')}</Link></li>
          </ul>
        </div>

        {/* Contacts */}
        <div className="footer-col">
          <h3>{t('footer.contactsTitle')}</h3>
          <ul>
            <li>ðŸ“ž +351 916 326 716</li>
            <li>âœ‰ï¸ info@madeiraridetours.com</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Â© {CURRENT_YEAR} Madeira Ride Tours. {t('footer.rights')}</p>
        <p>Madeira Island, Portugal</p>
      </div>
    </footer>
  );
}
