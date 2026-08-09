import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const PORTFOLIO_ITEMS = [
  {
    slug: 'upskirt',
    title: 'UpSkirt',
    year: '2026',
    medium: 'Installation, live performance, film projection',
    thumbnail: '/hero-bg.jpg',
  },
  {
    slug: 'fraud-awards',
    title: 'Fraud Awards',
    year: '2024',
    medium: 'Film',
    thumbnail: '/projects/dissertation/film.mp4',
    isVideo: true,
  },
  {
    slug: 'in-front-behind-inside',
    title: 'In Front, Behind, Inside',
    year: '2026',
    medium: 'Film',
    thumbnail: '/projects/thought-and-action/DSC_0189.jpg',
  },
  {
    slug: 'cinemeia',
    title: 'CineMia',
    year: '2026',
    medium: 'Live performance, film projection',
    thumbnail: '/projects/thought-and-action/IMG_5629.jpeg',
  },
  {
    slug: 'spinning-celluloid',
    title: 'Spinning Celluloid',
    year: '2025',
    medium: 'Live performance, costume, sculpture',
    thumbnail: '/projects/spinning-celluloid/spinning.mp4',
    isVideo: true,
  },
  {
    slug: 'the-pictures',
    title: 'The Pictures',
    year: '2025',
    medium: 'Sculpture',
    thumbnail: '/projects/the-pictures/IMG_0010.JPG',
  },
];

function PortfolioRow({ item, index }) {
  const [ref, isVisible] = useScrollReveal();
  const isReversed = index % 2 !== 0;

  return (
    <Link
      to={`/project/${item.slug}`}
      ref={ref}
      className={`pf-row ${isReversed ? 'pf-row--reversed' : ''} ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="pf-row__media">
        {item.isVideo ? (
          <video
            src={item.thumbnail}
            muted
            loop
            playsInline
            autoPlay
            className="pf-row__img"
          />
        ) : (
          <img src={item.thumbnail} alt={item.title} className="pf-row__img" loading="lazy" />
        )}
      </div>
      <div className="pf-row__info">
        <h3 className="pf-row__title">{item.title}, {item.year}</h3>
        <span className="pf-row__medium">{item.medium}</span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const parallaxRef = useRef(null);
  const [aboutRef, aboutVisible] = useScrollReveal();

  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;

    const handleScroll = () => {
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.2}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main>
      {/* ── SECTION 1: HERO BANNER ── */}
      <section className="home-hero" id="hero">
        <div className="home-hero__bg" ref={parallaxRef}>
          <img
            src="/hero-bg.jpg"
            alt="Mia Maya Bevan — Fine Art"
            className="home-hero__bg-image"
          />
        </div>
        <div className="home-hero__overlay" />
        <h1 className="home-hero__name anim-reveal">MIA MAYA BEVAN</h1>
      </section>

      {/* ── SECTION 2: ABOUT ── */}
      <section
        className={`about-section${aboutVisible ? ' is-visible' : ''}`}
        ref={aboutRef}
        id="about"
      >
        <div className="about-section__inner">
          <div className="about-section__portrait">
            <img
              src="/projects/thought-and-action/IMG_5629.jpeg"
              alt="Portrait"
              className="about-section__portrait-img"
            />
          </div>

          <div className="about-section__text">
            <h2 className="about-section__heading">About</h2>
            <p className="about-section__body about-section__body--lead">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="about-section__body">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </p>
            <p className="about-section__body">
              Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
            </p>
            <div className="about-section__cta">
              <Link to="/contact" className="btn-pill">Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: PORTFOLIO FEED ── */}
      <section className="portfolio-feed" id="portfolio">
        <h2 className="portfolio-feed__heading anim-reveal">Portfolio</h2>
        <div className="portfolio-feed__list">
          {PORTFOLIO_ITEMS.map((item, idx) => (
            <PortfolioRow key={item.slug} item={item} index={idx} />
          ))}
        </div>
      </section>
    </main>
  );
}
