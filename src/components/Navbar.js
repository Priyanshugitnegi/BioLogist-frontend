import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import api from "../api/axios";
import { useCart } from "../contexts/CartContext";
import logo from "../assets/logo.png";
import "./Navbar.css";
import SearchDropdown from "./SearchDropdown";

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  /* ---------------- FETCH CATEGORIES (FIXED) ---------------- */
  useEffect(() => {
    api
      .get("/api/categories/")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];
  
        setCategories(data);
        setActiveCategory(data[0] || null);
      })
      .catch((err) => {
        console.error("Failed to fetch categories:", err);
      });
  }, []);

  /* ---------------- HOVER HANDLERS ---------------- */
  const openMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowMegaMenu(true);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => {
      setShowMegaMenu(false);
    }, 200);
  };

  /* ---------------- NAVIGATION ---------------- */
  const goToCategory = (slug) => {
    setShowMegaMenu(false);
    navigate(`/products?category=${slug}`);
  };

  const goToSubcategory = (catSlug, subId) => {
    setShowMegaMenu(false);
    navigate(`/products?category=${catSlug}&sub=${subId}`);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO */}
        <Link to="/" className="logo">
          <img src={logo} alt="BioLogist" />
          <span>BioLogist</span>
        </Link>

        {/* SEARCH */}
        <div className="nav-search-wrapper">
          <SearchDropdown />
        </div>

        {/* NAV LINKS */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>

          {/* PRODUCTS MEGA MENU */}
          <li
            className="mega-dropdown"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            <span className="nav-link">Products</span>

            {showMegaMenu && (
              <div className="mega-menu">
                {/* LEFT: CATEGORIES */}
                <div className="mega-left">
                  <div
                    className="mega-cat"
                    onMouseEnter={() => setActiveCategory(null)}
                    onClick={() => goToCategory("all")}
                  >
                    All Products
                  </div>

                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      className={`mega-cat ${
                        activeCategory?.id === cat.id ? "active" : ""
                      }`}
                      onMouseEnter={() => setActiveCategory(cat)}
                      onClick={() => goToCategory(cat.slug)}
                    >
                      <span>{cat.name}</span>
                      <span className="cat-count">
                        ({cat.product_count || 0})
                      </span>
                    </div>
                  ))}
                </div>

                {/* RIGHT: SUBCATEGORIES */}
                <div className="mega-right">
                  {activeCategory?.subcategories?.length ? (
                    activeCategory.subcategories.map((sub) => (
                      <div
                        key={sub.id}
                        className="mega-sub"
                        onClick={() =>
                          goToSubcategory(activeCategory.slug, sub.id)
                        }
                      >
                        {sub.name}
                      </div>
                    ))
                  ) : (
                    <div className="mega-empty">
                      No subcategories
                    </div>
                  )}
                </div>
              </div>
            )}
          </li>

          <li><Link to="/contact">Contact</Link></li>

          {/* CART */}
          <li className="cart-item">
            <Link to="/cart">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
