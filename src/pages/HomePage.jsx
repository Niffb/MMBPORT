import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getAssetUrl } from '../utils/asset';
import PlaceholderImg from '../components/PlaceholderImg';

const PORTFOLIO_ITEMS = [
  {
    slug: 'upskirt',
    title: 'UpSkirt',
    year: '2026',
    medium: 'Live performance, film projection, installation',
    thumbnail: '/projects/upskirt/Screenshot 2026-08-09 at 16.00.22.jpeg',
  },
  {
    slug: 'fraud-awards',
    title: 'Fraud Awards',
    year: '2024',
    medium: 'Film',
    thumbnail: '/projects/fraud-awards/Screenshot 2026-08-09 at 16.13.23.jpg',
  },
  {
    slug: 'in-front-behind-inside',
    title: 'In Front, Behind, Inside',
    year: '2026',
    medium: 'Film & Critical Essay',
    thumbnail: '/projects/dissertation/88923F64-C0F6-4C7F-A6F6-1C0A9B5B44A3.jpg',
  },
  {
    slug: 'cinemeia',
    title: 'CineMia',
    year: '2025',
    medium: 'Live performance, film projection',
    thumbnail: '/projects/thought-and-action/DSC_0189.jpg',
  },
  {
    slug: 'spinning-celluloid',
    title: 'Spinning Celluloid',
    year: '2025',
    medium: 'Live performance, costume, sculpture',
    thumbnail: '/projects/spinning-celluloid/IMG_2415.jpg',
  },
  {
    slug: 'the-pictures',
    title: 'Untitled',
    year: '2025',
    medium: 'Sculpture',
    thumbnail: '/projects/the-pictures/IMG_0670.JPG',
  },
];

function PortfolioRow({ item }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <Link
      to={`/project/${item.slug}`}
      ref={ref}
      className={`pf-row ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="pf-row__media">
        {item.usePlaceholder ? (
          <PlaceholderImg variant="square" label={item.title} />
        ) : item.isVideo ? (
          <video
            src={getAssetUrl(item.thumbnail)}
            muted
            loop
            playsInline
            autoPlay
            className="pf-row__img"
          />
        ) : (
          <img src={getAssetUrl(item.thumbnail)} alt={item.title} className="pf-row__img" loading="lazy" />
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
            src={getAssetUrl('/hero-bg.jpg')}
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
              src={getAssetUrl('/projects/thought-and-action/IMG_5629.jpeg')}
              alt="Portrait"
              className="about-section__portrait-img"
            />
          </div>

          <div className="about-section__text">
            <h2 className="about-section__heading">About</h2>
            <p className="about-section__body about-section__body--lead">
              Mia Maya Bevan is a multi-disciplinary artist working in practice across performance, film, sound, sculpture, and costume.
            </p>
            <p className="about-section__body">
              Many works often combine each of these, expressing Bevan’s interest in multi-media exhibition, live art, video culture, and fashion, largely in discussion of feminist ideas and experiences of the female body.
            </p>
            <p className="about-section__body">
              She is a recent graduate from Chelsea College of Arts, University of the Arts London, achieving a First Class Bachelors Degree in Fine Art and becoming one of four winners of the university’s 2026 BA Fine Art Dean’s Awards, which reward exceptional studentship and achievement throughout the course.
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
          {PORTFOLIO_ITEMS.map((item) => (
            <PortfolioRow key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
