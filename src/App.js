import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Enquiry from "./components/Enquiry";
import OrderSuccess from "./components/OrderSuccess";
import About from "./components/About";

import Login from "./pages/Login";     // ✅ CUSTOMER LOGIN
import Signup from "./pages/Signup";   // ✅ CUSTOMER SIGNUP

import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />

      <main>
        <Routes>
          {/* ================= PUBLIC ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />

          {/* ================= CART ================= */}
          <Route path="/cart" element={<Cart />} />

          {/* ================= ENQUIRY ================= */}
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/contact" element={<Enquiry />} />

          {/* ================= AUTH ================= */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ================= OTHER ================= */}
          <Route path="/order-success" element={<OrderSuccess />} />

          {/* ================= 404 ================= */}
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
  );
}

export default App;
