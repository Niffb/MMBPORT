import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      document.body.style.overflow = prev ? '' : 'hidden';
      return !prev;
    });
  };

  return (
    <>
      <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
        <Link to="/" className="nav__logo">
          MIA MAYA BEVAN
        </Link>

        <div className="nav__links">
          <Link
            to="/"
            className={`nav__link${location.pathname === '/' ? ' nav__link--active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/#portfolio"
            className="nav__link"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Portfolio
          </Link>
          <Link
            to="/contact"
            className={`nav__link${location.pathname === '/contact' ? ' nav__link--active' : ''}`}
          >
            Contact
          </Link>
          <Link
            to="/shop"
            className={`nav__link${location.pathname === '/shop' ? ' nav__link--active' : ''}`}
          >
            Shop
          </Link>
          <Link
            to="/cart"
            className={`nav__link${location.pathname === '/cart' ? ' nav__link--active' : ''}`}
          >
            Cart
          </Link>
        </div>

        <button
          className={`nav__menu-btn${menuOpen ? ' nav__menu-btn--active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' mobile-menu--open' : ''}`}>
        <div className="mobile-menu__inner">
          <Link to="/" className="mobile-menu__link">Home</Link>
          <Link to="/#portfolio" className="mobile-menu__link">Portfolio</Link>
          <Link to="/contact" className="mobile-menu__link">Contact</Link>
          <Link to="/shop" className="mobile-menu__link">Shop</Link>
        </div>
      </div>
    </>
  );
}
