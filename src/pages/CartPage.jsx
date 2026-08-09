import { Link } from 'react-router-dom';

const MOCK_CART_ITEMS = [
  {
    id: 1,
    title: 'Untitled Study I',
    edition: 'Edition 1 of 10',
    size: '40 × 50 cm',
    price: '£180',
    thumbnail: '/projects/thought-and-action/DSC_0189.jpg',
  },
  {
    id: 2,
    title: 'Spinning Celluloid — Still',
    edition: 'Edition 3 of 15',
    size: '30 × 40 cm',
    price: '£120',
    thumbnail: '/projects/the-pictures/IMG_0010.JPG',
  },
];

export default function CartPage() {
  const subtotal = MOCK_CART_ITEMS.reduce((sum, item) => {
    const num = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
    return sum + num;
  }, 0);

  return (
    <main className="page-cart">
      <div className="page-hero">
        <div className="page-hero__content">
          <h1 className="page-hero__title">Cart</h1>
          <p className="page-hero__subtitle">
            {MOCK_CART_ITEMS.length} {MOCK_CART_ITEMS.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </div>

      <div className="cart-section">
        <div className="cart-list">
          {MOCK_CART_ITEMS.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item__img">
                <img src={item.thumbnail} alt={item.title} />
              </div>
              <div className="cart-item__details">
                <h3 className="cart-item__title">{item.title}</h3>
                <span className="cart-item__meta">{item.edition}</span>
                <span className="cart-item__meta">{item.size}</span>
              </div>
              <div className="cart-item__qty">
                <button className="cart-item__qty-btn" disabled>−</button>
                <span className="cart-item__qty-val">1</span>
                <button className="cart-item__qty-btn" disabled>+</button>
              </div>
              <span className="cart-item__price">{item.price}</span>
              <button className="cart-item__remove" aria-label="Remove item">✕</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="cart-summary__row">
            <span>Subtotal</span>
            <span className="cart-summary__price">£{subtotal}</span>
          </div>
          <div className="cart-summary__row cart-summary__row--muted">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="cart-summary__row cart-summary__row--total">
            <span>Total</span>
            <span className="cart-summary__price">£{subtotal}</span>
          </div>
          <button className="cart-summary__checkout">Checkout</button>
          <Link to="/shop" className="cart-summary__continue">← Continue Shopping</Link>
        </div>
      </div>
    </main>
  );
}
