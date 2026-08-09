import { useEffect } from 'react';

export default function LightboxModal({ item, onClose, onPrev, onNext, hasPrev, hasNext }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!item) return null;

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close lightbox">
          ✕
        </button>

        {hasPrev && (
          <button className="lightbox-nav lightbox-nav--prev" onClick={onPrev} aria-label="Previous image">
            ←
          </button>
        )}

        {hasNext && (
          <button className="lightbox-nav lightbox-nav--next" onClick={onNext} aria-label="Next image">
            →
          </button>
        )}

        <div className="lightbox-media-container">
          <img src={item.src} alt={item.label || 'Artwork'} className="lightbox-image" />
        </div>

        {item.label && <div className="lightbox-caption">{item.label}</div>}
      </div>
    </div>
  );
}
