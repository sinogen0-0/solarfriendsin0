import React, { useMemo, useState } from 'react';
import { storeCatalog } from '../data/storeProducts';
import ceramicArt from '../data/ceramicArt';

const products = storeCatalog;

const soldItems = ceramicArt.map((item) => ({
  id: `ceramic-${item.id}`,
  name: item.title,
  description: item.description,
  images: item.images && item.images.length ? item.images.map((entry) => entry.imageUrl) : [item.imageUrl],
  sold: true
}));

const shippingOptions = [
  { id: 'pickup', label: 'Local pickup', price: 0 },
  { id: 'ground', label: 'Ground shipping', price: 18 },
  { id: 'priority', label: 'Priority shipping', price: 32 }
];

const defaultForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postalCode: '',
  shipping: 'ground'
};

const formatMoney = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);

export default function StoreFront() {
  const [cart, setCart] = useState({});
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState(null);
  const [selectedImages, setSelectedImages] = useState(() =>
    Object.fromEntries(products.map((product) => [product.id, 0]))
  );

  const cartItems = useMemo(
    () =>
      products
        .filter((product) => cart[product.id])
        .map((product) => ({ ...product, quantity: cart[product.id] })),
    [cart]
  );

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const activeShipping = shippingOptions.find((option) => option.id === form.shipping) || shippingOptions[1];
  const total = subtotal + activeShipping.price;

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '', cart: '' }));
  };

  const handleAddToCart = (productId) => {
    setCart((current) => ({
      ...current,
      [productId]: (current[productId] || 0) + 1
    }));
    setErrors((current) => ({ ...current, cart: '' }));
  };

  const handleSelectImage = (productId, index) => {
    setSelectedImages((current) => ({
      ...current,
      [productId]: index
    }));
  };

  const handleNextImage = (productId, direction) => {
    setSelectedImages((current) => {
      const product = products.find((entry) => entry.id === productId);
      const gallery = product && product.images && product.images.length ? product.images : [product?.image];
      const validGallery = gallery.filter(Boolean);
      const currentIndex = current[productId] ?? 0;
      const nextIndex = validGallery.length
        ? (currentIndex + direction + validGallery.length) % validGallery.length
        : 0;

      return {
        ...current,
        [productId]: nextIndex
      };
    });
  };

  const handleAdjustQuantity = (productId, delta) => {
    setCart((current) => {
      const nextQuantity = (current[productId] || 0) + delta;
      if (nextQuantity <= 0) {
        const nextCart = { ...current };
        delete nextCart[productId];
        return nextCart;
      }
      return { ...current, [productId]: nextQuantity };
    });
  };

  const validateOrder = () => {
    const nextErrors = {};

    if (!cartItems.length) {
      nextErrors.cart = 'Pick at least one vessel before checking out.';
    }
    if (!form.name.trim()) {
      nextErrors.name = 'Please add your name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Use a valid email address.';
    }
    if (!form.phone.trim()) {
      nextErrors.phone = 'A phone number helps confirm your shipment.';
    }
    if (!form.address.trim()) {
      nextErrors.address = 'Shipping address is required.';
    }
    if (!form.city.trim()) {
      nextErrors.city = 'City is required.';
    }
    if (!form.state.trim()) {
      nextErrors.state = 'State or region is required.';
    }
    if (!form.postalCode.trim()) {
      nextErrors.postalCode = 'Postal code is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateOrder()) {
      return;
    }

    const orderNumber = `SF-${Date.now().toString().slice(-6)}`;

    setConfirmation({
      orderNumber,
      buyer: form.name,
      email: form.email,
      shipping: activeShipping.label,
      total,
      items: cartItems
    });
    setCart({});
    setForm(defaultForm);
    setErrors({});
  };

  return (
    <section className="section-wrap store-page">
      <div className="store-intro">
        <div>
          <p className="eyebrow">CERAMICS STORE</p>
        </div>
      </div>

      <div className="store-layout">
        <div className="store-product-grid">
          {products.map((product) => {
            const gallery = product.images && product.images.length ? product.images : [product.image];
            const mainImage = gallery[selectedImages[product.id] ?? 0] || gallery[0];

            return (
              <article className="store-product-card" key={product.id}>
                <div className={`product-image-carousel ${gallery.length > 1 ? 'has-carousel' : ''}`} aria-live="polite">
                  <img src={mainImage} alt={`${product.name} view ${selectedImages[product.id] + 1 || 1}`} loading="lazy" />

                  {gallery.length > 1 ? (
                    <>
                      <button
                        type="button"
                        className="carousel-arrow carousel-arrow-prev"
                        onClick={() => handleNextImage(product.id, -1)}
                        aria-label={`Previous image for ${product.name}`}
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        className="carousel-arrow carousel-arrow-next"
                        onClick={() => handleNextImage(product.id, 1)}
                        aria-label={`Next image for ${product.name}`}
                      >
                        ›
                      </button>

                      <div className="carousel-dots" aria-label={`${product.name} image gallery`}>
                        {gallery.map((image, index) => (
                          <button
                            key={`${product.id}-dot-${index}`}
                            type="button"
                            className={`carousel-dot ${selectedImages[product.id] === index ? 'is-active' : ''}`}
                            onClick={() => handleSelectImage(product.id, index)}
                            aria-label={`View image ${index + 1} of ${product.name}`}
                          />
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
                <div className="store-product-copy">
                  <div className="product-row">
                    <h3>{product.name}</h3>
                    <span>{formatMoney(product.price)}</span>
                  </div>
                  <p>{product.description}</p>
                  <button type="button" className="button button-quiet" onClick={() => handleAddToCart(product.id)}>
                    Add to cart
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {soldItems.length ? (
          <div className="store-sold-section">
            <p className="eyebrow">FROM THE ARCHIVE</p>
            <h2>Older pieces, already found a home.</h2>
            <div className="store-product-grid store-sold-grid">
              {soldItems.map((item) => (
                <article className="store-product-card is-sold" key={item.id}>
                  <div className="sold-image-wrap">
                    <img src={item.images[0]} alt={item.name} loading="lazy" />
                    <span className="sold-badge">Sold</span>
                  </div>
                  <div className="store-product-copy">
                    <div className="product-row">
                      <h3>{item.name}</h3>
                    </div>
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        <aside className="cart-panel">
          <h2>Cart</h2>
          {cartItems.length === 0 ? (
            <p className="empty-state">No pieces selected yet. Choose a vessel to begin your order.</p>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{formatMoney(item.price)} each</span>
                  </div>
                  <div className="quantity-controls">
                    <button type="button" onClick={() => handleAdjustQuantity(item.id, -1)} aria-label={`Decrease quantity for ${item.name}`}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => handleAdjustQuantity(item.id, 1)} aria-label={`Increase quantity for ${item.name}`}>
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {errors.cart ? <p className="error-text">{errors.cart}</p> : null}

          <div className="totals-box">
            <div className="total-row">
              <span>Subtotal</span>
              <strong>{formatMoney(subtotal)}</strong>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <strong>{formatMoney(activeShipping.price)}</strong>
            </div>
            <div className="total-row grand-total">
              <span>Total</span>
              <strong>{formatMoney(total)}</strong>
            </div>
          </div>

          <form className="checkout-form" onSubmit={handleSubmit} noValidate>
            <div className="field-row">
              <label className="field">
                <span>Name</span>
                <input name="name" value={form.name} onChange={handleFieldChange} placeholder="Your name" />
                {errors.name ? <small className="error-text">{errors.name}</small> : null}
              </label>
            </div>

            <div className="field-row two-up">
              <label className="field">
                <span>Email</span>
                <input name="email" type="email" value={form.email} onChange={handleFieldChange} placeholder="you@example.com" />
                {errors.email ? <small className="error-text">{errors.email}</small> : null}
              </label>
              <label className="field">
                <span>Phone</span>
                <input name="phone" value={form.phone} onChange={handleFieldChange} placeholder="(555) 123-4567" />
                {errors.phone ? <small className="error-text">{errors.phone}</small> : null}
              </label>
            </div>

            <label className="field">
              <span>Street address</span>
              <input name="address" value={form.address} onChange={handleFieldChange} placeholder="123 River St" />
              {errors.address ? <small className="error-text">{errors.address}</small> : null}
            </label>

            <div className="field-row two-up">
              <label className="field">
                <span>City</span>
                <input name="city" value={form.city} onChange={handleFieldChange} placeholder="Minneapolis" />
                {errors.city ? <small className="error-text">{errors.city}</small> : null}
              </label>
              <label className="field">
                <span>State / region</span>
                <input name="state" value={form.state} onChange={handleFieldChange} placeholder="MN" />
                {errors.state ? <small className="error-text">{errors.state}</small> : null}
              </label>
            </div>

            <label className="field">
              <span>Postal code</span>
              <input name="postalCode" value={form.postalCode} onChange={handleFieldChange} placeholder="55414" />
              {errors.postalCode ? <small className="error-text">{errors.postalCode}</small> : null}
            </label>

            <div className="shipping-options">
              {shippingOptions.map((option) => (
                <label className="shipping-option" key={option.id}>
                  <input
                    type="radio"
                    name="shipping"
                    value={option.id}
                    checked={form.shipping === option.id}
                    onChange={handleFieldChange}
                  />
                  <span>{option.label}</span>
                  <strong>{option.price === 0 ? 'Free' : formatMoney(option.price)}</strong>
                </label>
              ))}
            </div>

            <button type="submit" className="button button-primary checkout-button" disabled={!cartItems.length}>
              Validate and confirm order
            </button>
          </form>

          {confirmation ? (
            <div className="confirmation-card">
              <p className="eyebrow">ORDER CONFIRMED</p>
              <h3>#{confirmation.orderNumber}</h3>
              <p>Thank you, {confirmation.buyer}. Your order is staged for review and a studio email will be sent to {confirmation.email} with shipping details.</p>
              <ul>
                {confirmation.items.map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>
              <div className="confirmation-row">
                <span>Shipping</span>
                <strong>{confirmation.shipping}</strong>
              </div>
              <div className="confirmation-row grand-total">
                <span>Total</span>
                <strong>{formatMoney(confirmation.total)}</strong>
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}
