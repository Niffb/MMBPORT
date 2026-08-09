import SectionHeader from './SectionHeader';
import PlaceholderImg from './PlaceholderImg';
import { useScrollReveal } from '../hooks/useScrollReveal';

const STEPS = [
  {
    num: '01',
    title: 'Research & Observation',
    desc: 'Each body of work begins with sustained observation — of form, light, space, and the quiet tension within ordinary environments.',
  },
  {
    num: '02',
    title: 'Material Exploration',
    desc: 'I work across media to find the material language that best articulates each idea — from charcoal and ink to oil and found objects.',
  },
  {
    num: '03',
    title: 'Iteration & Erasure',
    desc: 'The work evolves through layering and removal. Each piece carries the trace of its own making — the history of decisions visible beneath the surface.',
  },
];

function ProcessStep({ num, title, desc, delay }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`process__step${isVisible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <span className="process__step-num">{num}</span>
      <h3 className="process__step-title">{title}</h3>
      <p className="process__step-desc">{desc}</p>
    </div>
  );
}

export default function Process() {
  const [quoteRef, quoteVisible] = useScrollReveal();
  const [stripRef, stripVisible] = useScrollReveal();

  return (
    <section className="process" id="process">
      <SectionHeader index="03" title="Process" />

      <div className="process__content">
        <div
          ref={quoteRef}
          className={`process__text${quoteVisible ? ' is-visible' : ''}`}
        >
          <blockquote className="process__quote">
            "The work begins with a mark and ends with an erasure. What remains
            is the conversation between the two."
          </blockquote>
        </div>

        <div className="process__steps">
          {STEPS.map((step, i) => (
            <ProcessStep key={step.num} {...step} delay={i * 0.12} />
          ))}
        </div>
      </div>

      <div
        ref={stripRef}
        className={`process__strip${stripVisible ? ' is-visible' : ''}`}
      >
        <PlaceholderImg variant="strip" label="Studio I" />
        <PlaceholderImg variant="strip" label="Studio II" />
        <PlaceholderImg variant="strip" label="Studio III" />
      </div>
    </section>
  );
}
