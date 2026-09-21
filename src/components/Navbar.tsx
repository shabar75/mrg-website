import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import './Navbar.css';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/why-mrg', label: 'Why MRG' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" aria-label="MRG Home">
          <div className="navbar__logo">MRG</div>
          <div className="navbar__tagline">COMPLIANCE | LIAISON | SOLUTIONS</div>
        </Link>

        <nav className="navbar__nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/consultation" className="btn btn-gold navbar__cta">
            Get a Consultation
            <ArrowRight size={16} className="btn-arrow" />
          </Link>
        </nav>

        <button
          className="navbar__toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`navbar__mobile ${isOpen ? 'navbar__mobile--open' : ''}`}
        aria-hidden={!isOpen}
      >
        <nav className="navbar__mobile-nav">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `navbar__mobile-link ${isActive ? 'navbar__mobile-link--active' : ''}`
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/consultation" className="btn btn-gold navbar__mobile-cta">
            Get a Consultation
            <ArrowRight size={16} className="btn-arrow" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
