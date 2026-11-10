import { NavLink, Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useLanguage } from '../../hooks/useLanguage';
import LanguageSelector from '../common/LanguageSelector';
import './Navbar.css';

export default function Navbar() {
  const { t } = useLanguage();

  const navLinks = [
    { label: t('nav.home') || 'Home', path: ROUTES.HOME },
    { label: t('nav.tours') || 'Tours', path: ROUTES.TOURS },
    { label: t('nav.transfers') || 'Transfers', path: ROUTES.TRANSFERS },
    { label: t('nav.ourTours') || 'Custom Tour', path: '/custom-tour' }
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

        {/* Right side Language Selector */}
        <div className="navbar-right">
          <LanguageSelector />
        </div>
      </div>

      {/* Mobile Horizontal Bar */}
      <nav className="navbar-mobile-nav" aria-label="Mobile Navigation">
        <div className="navbar-mobile-links">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => (isActive ? 'nav-mobile-link active' : 'nav-mobile-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="navbar-mobile-lang">
          <LanguageSelector />
        </div>
      </nav>
    </header>
  );
}
