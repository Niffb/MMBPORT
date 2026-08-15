import { useRef, useState, useEffect } from 'react';
import { getAssetUrl } from '../utils/asset';

export default function HorizontalCarousel({ images = [], onImageClick, height = 460 }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScrollability = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate approximate active item
    if (images.length > 0) {
      const itemWidth = scrollWidth / images.length;
      const index = Math.min(images.length - 1, Math.max(0, Math.round(scrollLeft / (itemWidth || 1))));
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    checkScrollability();
    const scroller = scrollRef.current;
    if (!scroller) return;

    scroller.addEventListener('scroll', checkScrollability, { passive: true });
    window.addEventListener('resize', checkScrollability);
    return () => {
      scroller.removeEventListener('scroll', checkScrollability);
      window.removeEventListener('resize', checkScrollability);
    };
  }, [images]);

  const scrollByAmount = (direction) => {
    if (!scrollRef.current) return;
    const shift = scrollRef.current.clientWidth * 0.75 * direction;
    scrollRef.current.scrollBy({ left: shift, behavior: 'smooth' });
  };

  // Mouse Drag to Scroll
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <div className="horizontal-carousel-wrapper">
      {/* Navigation Controls */}
      <div className="horizontal-carousel-nav">
        <span className="horizontal-carousel-hint">Scroll or drag to explore</span>
        <div className="horizontal-carousel-buttons">
          <button
            type="button"
            className="carousel-arrow carousel-arrow--prev"
            onClick={() => scrollByAmount(-1)}
            disabled={!canScrollLeft}
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            type="button"
            className="carousel-arrow carousel-arrow--next"
            onClick={() => scrollByAmount(1)}
            disabled={!canScrollRight}
            aria-label="Next image"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`horizontal-carousel-track ${isDragging ? 'is-dragging' : ''}`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeaveOrUp}
        onMouseUp={handleMouseLeaveOrUp}
        onMouseMove={handleMouseMove}
        style={{ '--carousel-height': `${height}px` }}
      >
        {images.map((imgSrc, idx) => (
          <div key={idx} className="horizontal-carousel-slide">
            <div
              className="horizontal-carousel-img-card"
              onClick={() => onImageClick && onImageClick(imgSrc)}
            >
              <img
                src={getAssetUrl(imgSrc)}
                alt={`Slide ${idx + 1}`}
                loading="lazy"
                draggable={false}
              />
              <div className="carousel-img-overlay">
                <span className="carousel-zoom-icon">⊕ View Fullscreen</span>
                <span className="carousel-index-tag">{idx + 1} / {images.length}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
