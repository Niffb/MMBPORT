/**
 * Placeholder image with an X marker — used in place of real artwork images.
 * Accepts size variant: 'hero' | 'landscape' | 'portrait' | 'square' | 'strip'
 */
export default function PlaceholderImg({ variant = 'square', label = '' }) {
  return (
    <div className={`placeholder-img placeholder-img--${variant}`}>
      <span className="placeholder-img__x">✕</span>
      {label && <span className="placeholder-img__label">{label}</span>}
    </div>
  );
}
