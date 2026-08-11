import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();

  const handleBackToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePortfolioClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Brand Header Statement */}
        <div className="footer__hero">
          <span className="footer__subtitle">FINE ART & MULTI-DISCIPLINARY PRACTICE</span>
          <h2 className="footer__brand-title">MIA MAYA BEVAN</h2>
        </div>

        {/* Multi-column Grid */}
        <div className="footer__grid">
          <div className="footer__col footer__col--about">
            <p className="footer__tagline">
              Performance, film, sound, sculpture, and costume exploring feminist ideas and female experience.
            </p>
            <div className="footer__location">
              <span className="footer__dot" /> London, United Kingdom
            </div>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Navigation</h4>
            <ul className="footer__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/#portfolio" onClick={handlePortfolioClick}>Portfolio</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/cart">Cart</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Connect</h4>
            <ul className="footer__links">
              <li>
                <a href="mailto:contact@miamayabevan.com" target="_blank" rel="noopener noreferrer">
                  Email Enquiries ↗
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  Instagram ↗
                </a>
              </li>
              <li>
                <a href="https://www.arts.ac.uk/colleges/chelsea-college-of-arts" target="_blank" rel="noopener noreferrer">
                  Chelsea College of Arts ↗
                </a>
              </li>
            </ul>
          </div>

          <div className="footer__col footer__col--action">
            <button className="footer__top-btn" onClick={handleBackToTop} aria-label="Back to top">
              <span className="footer__top-arrow">↑</span>
              <span className="footer__top-text">Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright & credits */}
        <div className="footer__bottom">
          <span className="footer__copy">© {new Date().getFullYear()} Mia Maya Bevan — All Rights Reserved</span>
          <span className="footer__credit">BA Fine Art — UAL</span>
        </div>
      </div>
    </footer>
  );
}
