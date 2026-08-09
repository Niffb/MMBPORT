import SectionHeader from './SectionHeader';
import PlaceholderImg from './PlaceholderImg';
import { useScrollReveal } from '../hooks/useScrollReveal';

const WORKS = [
  { title: 'Untitled No. 1', medium: 'Oil on Canvas — 2024',   variant: 'landscape', size: 'wide',  label: 'Artwork I' },
  { title: 'Figure Study III', medium: 'Charcoal on Paper — 2024', variant: 'portrait',  size: 'tall',  label: 'Artwork II' },
  { title: 'Dissolution',    medium: 'Ink on Paper — 2023',     variant: 'square',    size: '',      label: 'Artwork III' },
  { title: 'Threshold',      medium: 'Mixed Media — 2023',      variant: 'landscape', size: 'wide',  label: 'Artwork IV' },
  { title: 'Remnants',       medium: 'Photography — 2024',      variant: 'portrait',  size: 'tall',  label: 'Artwork V' },
  { title: 'Vessel',         medium: 'Sculpture — 2024',        variant: 'square',    size: '',      label: 'Artwork VI' },
];

function WorkItem({ title, medium, variant, size, label, delay }) {
  const [ref, isVisible] = useScrollReveal();
  const sizeClass = size ? ` work__item--${size}` : '';

  return (
    <article
      ref={ref}
      className={`work__item${sizeClass}${isVisible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <a href="#" className="work__link">
        <PlaceholderImg variant={variant} label={label} />
        <div className="work__info">
          <h3 className="work__title">{title}</h3>
          <span className="work__medium">{medium}</span>
        </div>
        <span className="work__arrow">→</span>
      </a>
    </article>
  );
}

export default function Work() {
  return (
    <section className="work" id="work">
      <SectionHeader index="01" title="Selected Work" />
      <div className="work__grid">
        {WORKS.map((work, i) => (
          <WorkItem key={work.title} {...work} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
