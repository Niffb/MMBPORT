import SectionHeader from './SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

const EXHIBITIONS = [
  { year: '2024', name: 'New Contemporaries',             venue: 'Institute of Contemporary Arts, London' },
  { year: '2024', name: 'Degree Show',                    venue: 'Slade School of Fine Art' },
  { year: '2023', name: 'Emerging Voices',                venue: 'Saatchi Gallery, London' },
  { year: '2023', name: 'First Prize — Student Art Award', venue: 'Royal Academy of Arts' },
];

function ExhibitionItem({ year, name, venue, delay }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`exhibitions__item${isVisible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <span className="exhibitions__year">{year}</span>
      <span className="exhibitions__name">{name}</span>
      <span className="exhibitions__venue">{venue}</span>
    </div>
  );
}

export default function Exhibitions() {
  return (
    <section className="exhibitions" id="exhibitions">
      <SectionHeader index="—" title="Exhibitions & Awards" />

      <div className="exhibitions__list">
        {EXHIBITIONS.map((item, i) => (
          <ExhibitionItem key={item.name} {...item} delay={i * 0.08} />
        ))}
      </div>
    </section>
  );
}
