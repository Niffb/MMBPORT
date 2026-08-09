import SectionHeader from './SectionHeader';
import PlaceholderImg from './PlaceholderImg';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function About() {
  const [portraitRef, portraitVisible] = useScrollReveal();
  const [textRef, textVisible] = useScrollReveal();

  return (
    <section className="about" id="about">
      <SectionHeader index="02" title="About" />

      <div className="about__content">
        <div
          ref={portraitRef}
          className={`about__portrait${portraitVisible ? ' is-visible' : ''}`}
        >
          <PlaceholderImg variant="portrait" label="Portrait" />
        </div>

        <div
          ref={textRef}
          className={`about__text${textVisible ? ' is-visible' : ''}`}
        >
          <p className="about__intro">
            I'm Mia — a fine art student based in London, working across painting,
            drawing, sculpture, and mixed media.
          </p>
          <p className="about__body">
            My practice interrogates the threshold between materiality and absence.
            Through gestural mark-making and deliberate erasure, I seek to reveal the
            tension that exists in incomplete forms — the weight of what's suggested
            but never fully resolved.
          </p>
          <p className="about__body">
            Currently completing my BFA with a focus on contemporary abstraction and
            process-driven work.
          </p>

          <div className="about__details">
            <Detail label="Education" value="BFA Fine Art, Slade School" />
            <Detail label="Based In" value="London, UK" />
            <Detail label="Media" value="Painting, Drawing, Sculpture" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Detail({ label, value }) {
  return (
    <div className="about__detail">
      <span className="about__detail-label">{label}</span>
      <span className="about__detail-value">{value}</span>
    </div>
  );
}
