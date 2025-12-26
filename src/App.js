// frontend/src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Products from './components/Products';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Contact from './components/Contact';
import OrderSuccess from './components/OrderSuccess';
import About from './components/About';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />

            {/* 🔥 FIX: slug instead of id */}
            <Route path="/product/:slug" element={<ProductDetail />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/about" element={<About />} />

            <Route
              path="*"
              element={
                <div style={{ padding: '4rem', textAlign: 'center' }}>
                  <h1>404</h1>
                  <p>Page Not Found</p>
                  <a href="/">Go Home</a>
                </div>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
