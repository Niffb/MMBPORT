import SectionHeader from './SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Contact() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="contact" id="contact">
      <SectionHeader index="04" title="Get in Touch" />

      <div
        ref={ref}
        className={`contact__content${isVisible ? ' is-visible' : ''}`}
      >
        <p className="contact__text">
          Open to commissions, collaborations, and exhibition opportunities.
          Let's create something meaningful together.
        </p>
        <a href="mailto:hello@mia.studio" className="contact__email" id="contactEmail">
          hello@mia.studio
        </a>
        <div className="contact__socials">
          <a href="#" className="contact__social">Instagram</a>
          <a href="#" className="contact__social">Behance</a>
          <a href="#" className="contact__social">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
