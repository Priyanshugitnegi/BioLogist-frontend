// src/components/Cart.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  if (cart.length === 0 || cartCount === 0) {
    return (
      <section className="cart-empty">
        <div className="container text-center">
          <h2>Your Cart is Empty</h2>
          <p>Add some products to get started!</p>
          <Link to="/products" className="btn btn-primary">Shop Now</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="container">
        <h1 className="cart-title">Your Cart ({cartCount} items)</h1>

        <div className="cart-items">
          {cart.map(item => (
            <div key={item.variantId} className="cart-item">   {/* ← FIXED */}

              <img
                src={item.image || '/placeholder.jpg'}
                alt={item.name}
                className="cart-item-img"
              />

              <div className="cart-item-details">
                <h4 className="cart-item-name">
                  {item.name} {item.volume_ml && `(${item.volume_ml} ml)`}
                </h4>
                {item.catalog_number && (
                  <p className="catalog-number">Cat. No: {item.catalog_number}</p>
                )}
                <p className="cart-item-price">₹{Number(item.price).toFixed(2)}</p>
              </div>

              <div className="cart-item-actions">
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.variantId, item.quantity - 1)}  // ← FIXED
                  disabled={item.quantity <= 1}
                >
                  −
                </button>
                <span className="qty">{item.quantity}</span>
                <button
                  className="qty-btn"
                  onClick={() => updateQuantity(item.variantId, item.quantity + 1)}  // ← FIXED
                >
                  +
                </button>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.variantId)}   // ← FIXED
                >
                  Remove
                </button>
              </div>

              <div className="cart-item-total">
                ₹{(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="cart-total">
            <strong>Total: ₹{Number(cartTotal).toFixed(2)}</strong>
          </div>
          <Link to="/checkout" className="btn btn-primary checkout-btn">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;