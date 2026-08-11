import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ShopPage() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <main className="page-shop">
      <div className="page-hero">
        <div className="page-hero__content">
          <h1 className="page-hero__title anim-reveal">Shop</h1>
          <p className="page-hero__subtitle anim-reveal anim-delay-2">
            Limited edition prints and original works.
          </p>
        </div>
      </div>

      <section className="shop-section">
        <div
          ref={ref}
          className={`shop-empty${isVisible ? ' is-visible' : ''}`}
        >
          <h2 className="shop-empty__title">Currently No Items Available</h2>
          <p className="shop-empty__desc">
            There are currently no items available for purchase. Please check back later or get in touch for custom print enquiries and commissions.
          </p>
          <div className="shop-empty__cta">
            <Link to="/contact" className="btn-pill">Contact for Enquiries</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
