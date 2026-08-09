import { Link } from 'react-router-dom';

export default function Footer() {
  const handleBackToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__inner">
        <Link to="/" className="footer__name">Mia Maya</Link>
        <span className="footer__copy">© 2026 — All rights reserved</span>
        <a href="#" className="footer__top" onClick={handleBackToTop}>
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
