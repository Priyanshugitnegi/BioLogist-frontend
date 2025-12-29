import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import api from "../api/axios";
import { useCart } from "../contexts/CartContext";
import logo from "../assets/logo.png";
import "./Navbar.css";
import SearchDropdown from "./SearchDropdown";
import { isAuthenticated, logout } from "../utils/auth"; // ✅ ADD

const Navbar = () => {
  const [categories, setCategories] = useState([]);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  const { cartCount } = useCart();

  /* ================= FETCH CATEGORIES ================= */
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
      .catch((err) => console.error("Category fetch failed", err));
  }, []);

  /* ================= HOVER HANDLERS ================= */
  const openMenu = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowMegaMenu(true);
  };

  const closeMenu = () => {
    timeoutRef.current = setTimeout(() => {
      setShowMegaMenu(false);
    }, 200);
  };

  /* ================= NAVIGATION ================= */
  const goToCategory = (slug) => {
    setShowMegaMenu(false);
    navigate(`/products?category=${slug}`);
  };

  const goToSubcategory = (catSlug, subId) => {
    setShowMegaMenu(false);
    navigate(`/products?category=${catSlug}&sub=${subId}`);
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    logout();
    navigate("/");
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

          {/* PRODUCTS */}
          <li
            className="mega-dropdown"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            <Link to="/products" className="nav-link">
              Products
            </Link>

            {showMegaMenu && (
              <div className="mega-menu">
                <div className="mega-left">
                  <div
                    className="mega-cat"
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
                      No subcategories available
                    </div>
                  )}
                </div>
              </div>
            )}
          </li>

          <li><Link to="/enquiry">Enquiry</Link></li>

          {/* 🔐 AUTH */}
          {isAuthenticated() ? (
            <li
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              Logout
            </li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}

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
