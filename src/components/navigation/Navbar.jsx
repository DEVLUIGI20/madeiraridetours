import { NavLink, Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useLanguage } from '../../hooks/useLanguage';
import LanguageSelector from '../common/LanguageSelector';
import './Navbar.css';

export default function Navbar() {
  const { t } = useLanguage();

  const navLinks = [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Tours', path: ROUTES.TOURS },
    { label: 'Transfers', path: ROUTES.TRANSFERS },
    { label: 'Custom Tour', path: '/custom-tour' }
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Brand Logo with Mountain Icon matching Mockup */}
        <div className="navbar-left">
          <Link to={ROUTES.HOME} className="navbar-brand">
            <span className="navbar-brand-icon" aria-hidden="true">
              <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
            </span>
            <span className="navbar-brand-name">MadeiraRideTours</span>
          </Link>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="navbar-center" aria-label="Main Navigation">
          <ul className="navbar-nav">
            {navLinks.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Section: Language Selector + Book Now Pill Button */}
        <div className="navbar-right">
          <LanguageSelector />
          <Link to={ROUTES.BOOKING} className="navbar-book-btn">
            {t('Book Now')} →
          </Link>
        </div>
      </div>

      {/* Mobile Horizontal Bar */}
      <nav className="navbar-mobile-nav" aria-label="Mobile Navigation">
        {navLinks.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => (isActive ? 'nav-mobile-link active' : 'nav-mobile-link')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
