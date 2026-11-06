import { NavLink, Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useLanguage } from '../../hooks/useLanguage';
import LanguageSelector from '../common/LanguageSelector';
import './Navbar.css';

/**
 * Reusable Navbar component.
 * Features a circular logo badge on the left, centered multilingual navigation in the middle,
 * and the automatic Language Selector on the right.
 */
export default function Navbar() {
  const { t } = useLanguage();
  const location = useLocation();

  const navItems = [
    { label: t('nav.ourTours'), path: ROUTES.TOURS },
    { label: t('nav.transfers'), path: ROUTES.TRANSFERS },
    { label: t('nav.aboutUs'), path: '/#about' },
    { label: t('nav.booking'), path: ROUTES.BOOKING },
    { label: t('nav.faq'), path: ROUTES.FAQ },
  ];

  const handleNavClick = (e, path) => {
    if (path.includes('#')) {
      const [targetPath, hash] = path.split('#');
      const isHome = location.pathname === '/' || location.pathname === '';
      const isTargetHome = targetPath === '/' || targetPath === '';

      if (isHome && isTargetHome) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        window.history.pushState(null, '', `#${hash}`);
      }
    }
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Left Column: Brand Logo (Round badge / ball) */}
        <div className="navbar-left">
          <Link to={ROUTES.HOME} className="navbar-brand">
            <span className="navbar-brand-text">
              Madeira Ride Tours
            </span>
          </Link>
        </div>

        {/* Center Column: Navigation Links (Centred!) */}
        <nav className="navbar-center" aria-label="Main Navigation">
          <ul className="navbar-nav">
            {navItems.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={({ isActive }) =>
                    isActive && !link.path.includes('#') ? 'nav-link active' : 'nav-link'
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right Column: Language Selector with automatic browser detection */}
        <div className="navbar-right">
          <LanguageSelector />
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar for small screens */}
      <nav className="navbar-mobile-nav" aria-label="Mobile Navigation">
        {navItems.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={(e) => handleNavClick(e, link.path)}
            className={({ isActive }) =>
              isActive && !link.path.includes('#') ? 'nav-link active' : 'nav-link'
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
