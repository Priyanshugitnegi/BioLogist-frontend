// src/components/Header.js
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem('biologist-cart') || '[]');
      setCartCount(cart.length);
    };
    updateCart();
    window.addEventListener('storage', updateCart);
    return () => window.removeEventListener('storage', updateCart);
  }, []);

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo-link">
          <img src={logo} alt="BioLogist Logo" className="logo-img" />
          <div className="brand-text">
            <h1 className="brand-name">BioLogist</h1>
            <p className="tagline">Accuracy is Our Concern</p>
          </div>
        </Link>

        <button 
          className="menu-toggle" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? '×' : '☰'}
        </button>

        <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/products" className="nav-link" onClick={() => setIsOpen(false)}>Products</Link>
          <Link to="/team" className="nav-link" onClick={() => setIsOpen(false)}>Team</Link>
          <Link to="/cart" className="nav-link cart-link" onClick={() => setIsOpen(false)}>
            Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}