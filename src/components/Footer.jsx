import { Link } from 'react-router-dom';

export default function Footer() {
  const handleBackToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer__inner">
        <Link to="/" className="footer__name">Mia Maya Bevan</Link>
        <span className="footer__copy">© {new Date().getFullYear()} — All rights reserved</span>
        <button className="footer__top" onClick={handleBackToTop} aria-label="Back to top">
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}

