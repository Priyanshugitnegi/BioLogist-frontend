// frontend/src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Enquiry from "./components/Enquiry"; // ✅ CHANGED
import OrderSuccess from "./components/OrderSuccess";
import About from "./components/About";

import "./App.css";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />

            {/* SLUG-BASED ROUTING */}
            <Route path="/product/:slug" element={<ProductDetail />} />

            <Route path="/cart" element={<Cart />} />

            {/* ✅ ENQUIRY ROUTES */}
            <Route path="/enquiry" element={<Enquiry />} />
            <Route path="/contact" element={<Enquiry />} /> {/* backward support */}

            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/about" element={<About />} />

            <Route
              path="*"
              element={
                <div style={{ padding: "4rem", textAlign: "center" }}>
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
