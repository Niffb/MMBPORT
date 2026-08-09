import SectionHeader from '../components/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ContactPage() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <main className="page-contact">
      <div className="page-hero">
        <div className="page-hero__content">
          <h1 className="page-hero__title anim-reveal">Contact</h1>
          <p className="page-hero__subtitle anim-reveal anim-delay-2">
            Open to commissions, collaborations, and exhibition opportunities.
          </p>
        </div>
      </div>

      <section className="contact-section">
        <SectionHeader index="04" title="Get in Touch" />

        <div
          ref={ref}
          className={`contact-body${isVisible ? ' is-visible' : ''}`}
        >
          <div className="contact-body__left">
            <p className="contact-body__text">
              Whether you're interested in commissioning a piece, collaborating
              on a project, or just want to say hello — I'd love to hear from
              you. I typically respond within 48 hours.
            </p>

            <a href="mailto:hello@miamaya.studio" className="contact-body__email">
              hello@miamaya.studio
            </a>

            <div className="contact-body__socials">
              <a href="#" className="contact-body__social">Instagram</a>
              <a href="#" className="contact-body__social">Behance</a>
              <a href="#" className="contact-body__social">LinkedIn</a>
            </div>
          </div>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="contact-form__group">
              <label className="contact-form__label" htmlFor="contact-name">Name</label>
              <input className="contact-form__input" type="text" id="contact-name" placeholder="Your name" />
            </div>
            <div className="contact-form__group">
              <label className="contact-form__label" htmlFor="contact-email">Email</label>
              <input className="contact-form__input" type="email" id="contact-email" placeholder="your@email.com" />
            </div>
            <div className="contact-form__group">
              <label className="contact-form__label" htmlFor="contact-subject">Subject</label>
              <input className="contact-form__input" type="text" id="contact-subject" placeholder="Commission, collaboration, etc." />
            </div>
            <div className="contact-form__group">
              <label className="contact-form__label" htmlFor="contact-message">Message</label>
              <textarea className="contact-form__textarea" id="contact-message" rows="5" placeholder="Tell me about your project or enquiry..." />
            </div>
            <button type="submit" className="contact-form__submit">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
