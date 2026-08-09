import SectionHeader from '../components/SectionHeader';
import { useScrollReveal } from '../hooks/useScrollReveal';

const SHOP_ITEMS = [
  {
    id: 'shop-1',
    title: 'The Pictures — Print I',
    edition: 'Limited Edition of 25',
    price: '£120',
    size: 'A2 — Giclée on Hahnemühle',
    image: '/projects/the-pictures/IMG_0010.JPG',
  },
  {
    id: 'shop-2',
    title: 'The Pictures — Print II',
    edition: 'Limited Edition of 25',
    price: '£120',
    size: 'A2 — Giclée on Hahnemühle',
    image: '/projects/the-pictures/IMG_0664.JPG',
  },
  {
    id: 'shop-3',
    title: 'Situations — Print I',
    edition: 'Limited Edition of 30',
    price: '£95',
    size: 'A3 — Giclée on Hahnemühle',
    image: '/projects/situations/IMG_2661.JPG',
  },
  {
    id: 'shop-4',
    title: 'Situations — Print II',
    edition: 'Limited Edition of 30',
    price: '£95',
    size: 'A3 — Giclée on Hahnemühle',
    image: '/projects/situations/IMG_2679.JPG',
  },
  {
    id: 'shop-5',
    title: 'Situations — Print III',
    edition: 'Limited Edition of 30',
    price: '£95',
    size: 'A3 — Giclée on Hahnemühle',
    image: '/projects/situations/IMG_2700.JPG',
  },
  {
    id: 'shop-6',
    title: 'The Pictures — Print III',
    edition: 'Limited Edition of 25',
    price: '£120',
    size: 'A2 — Giclée on Hahnemühle',
    image: '/projects/the-pictures/IMG_0670.JPG',
  },
];

function ShopItem({ title, edition, price, size, image, delay }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <article
      ref={ref}
      className={`shop-card${isVisible ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="shop-card__image">
        <img src={image} alt={title} loading="lazy" />
      </div>
      <div className="shop-card__info">
        <h3 className="shop-card__title">{title}</h3>
        <span className="shop-card__edition">{edition}</span>
        <span className="shop-card__size">{size}</span>
        <div className="shop-card__bottom">
          <span className="shop-card__price">{price}</span>
          <button className="shop-card__btn">Enquire</button>
        </div>
      </div>
    </article>
  );
}

export default function ShopPage() {
  return (
    <main className="page-shop">
      <div className="page-hero">
        <div className="page-hero__content">
          <h1 className="page-hero__title anim-reveal">Shop</h1>
          <p className="page-hero__subtitle anim-reveal anim-delay-2">
            Limited edition prints available for purchase.
          </p>
        </div>
      </div>

      <section className="shop-section">
        <SectionHeader index="03" title="Available Prints" />
        <div className="shop-grid">
          {SHOP_ITEMS.map((item, i) => (
            <ShopItem key={item.id} {...item} delay={i * 0.1} />
          ))}
        </div>
      </section>
    </main>
  );
}
