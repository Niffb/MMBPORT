import { useEffect, useRef } from 'react';
import PlaceholderImg from './PlaceholderImg';

export default function Hero() {
  const imageRef = useRef(null);

  // Parallax on hero image (desktop only)
  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop || !imageRef.current) return;

    const handleScroll = () => {
      const rate = window.scrollY * 0.15;
      imageRef.current.style.transform = `translateY(${rate}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" id="hero">
      <div className="hero__content">
        <div className="hero__label anim-reveal">Fine Art Portfolio</div>
        <h1 className="hero__title">
          <span className="anim-reveal anim-delay-1">Between</span>
          <span className="anim-reveal anim-delay-2"><em>presence</em></span>
          <span className="anim-reveal anim-delay-3">& absence</span>
        </h1>
        <p className="hero__subtitle anim-reveal anim-delay-4">
          Exploring the boundaries of form, texture, and the quiet spaces where meaning emerges.
        </p>
      </div>

      <div className="hero__image-block anim-reveal anim-delay-3" ref={imageRef}>
        <PlaceholderImg variant="hero" label="Featured Work" />
      </div>

      <div className="hero__scroll-indicator">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
}
