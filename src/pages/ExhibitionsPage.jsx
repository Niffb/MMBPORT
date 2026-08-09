import SectionHeader from '../components/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

const EXHIBITIONS = [
  { year: '2025', name: 'Women Making Image: In Front, Behind, Inside', venue: 'Degree Show — Dissertation Film', type: 'Film Screening' },
  { year: '2024', name: 'Thought and Action',                          venue: 'Tate — Lee Miller Exhibition Response', type: 'Film' },
  { year: '2024', name: 'Spinning Celluloid',                          venue: 'Studio Exhibition',                     type: 'Film Installation' },
  { year: '2024', name: 'The Pictures',                                venue: 'Group Exhibition',                      type: 'Photography & Video' },
  { year: '2023', name: 'Situations',                                  venue: 'Open Studios',                          type: 'Photography' },
];

function ExhibitionItem({ year, name, venue, type, delay }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`exh-item${isVisible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <span className="exh-item__year">{year}</span>
      <div className="exh-item__main">
        <span className="exh-item__name">{name}</span>
        <span className="exh-item__venue">{venue}</span>
      </div>
      <span className="exh-item__type">{type}</span>
    </div>
  );
}

export default function ExhibitionsPage() {
  return (
    <main className="page-exhibitions">
      <div className="page-hero">
        <div className="page-hero__content">
          <h1 className="page-hero__title anim-reveal">Exhibitions</h1>
          <p className="page-hero__subtitle anim-reveal anim-delay-2">
            Screenings, shows, and selected presentations.
          </p>
        </div>
      </div>

      <section className="exh-section">
        <SectionHeader index="—" title="Exhibitions & Screenings" />
        <div className="exh-list">
          {EXHIBITIONS.map((item, i) => (
            <ExhibitionItem key={item.name} {...item} delay={i * 0.08} />
          ))}
        </div>
      </section>
    </main>
  );
}
