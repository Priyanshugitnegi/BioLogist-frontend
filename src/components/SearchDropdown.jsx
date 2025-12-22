// src/components/SearchDropdown.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiSearch, FiX } from "react-icons/fi";
import "./SearchDropdown.css";

export default function SearchDropdown() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const wrapperRef = useRef(null);

  /* ---------------- SEARCH API (DROPDOWN SUGGESTIONS) ---------------- */
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      axios
        .get(
          `http://127.0.0.1:8000/api/products/search/?q=${encodeURIComponent(
            query.trim()
          )}`
        )
        .then((res) => {
          setResults(res.data.results || []);
          setOpen(true);
        })
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  /* ---------------- CLOSE ON OUTSIDE CLICK ---------------- */
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ---------------- NAVIGATION ---------------- */
  const goToProductsSearch = () => {
    if (!query.trim()) return;
    navigate(`/products?q=${encodeURIComponent(query.trim())}`);
    setOpen(false);
  };

  return (
    <div className="search-wrapper" ref={wrapperRef}>
      {/* INPUT */}
      <div className="search-box">
        <FiSearch size={18} />
        <input
          type="text"
          placeholder="Search kits, reagents, catalog no..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              goToProductsSearch();
            }
          }}
          onFocus={() => results.length && setOpen(true)}
        />
        {query && (
          <button className="clear-btn" onClick={() => setQuery("")}>
            <FiX size={16} />
          </button>
        )}
      </div>

      {/* DROPDOWN (OPTIONAL QUICK JUMP) */}
      {open && (
        <div className="search-dropdown">
          {loading && <div className="search-empty">Searching…</div>}

          {!loading && results.length === 0 && (
            <div className="search-empty">
              No results for “{query}”
            </div>
          )}

          {!loading &&
            results.map((product) =>
              product.variants.map((variant) => (
                <div
                  key={variant.id}
                  className="search-item"
                  onClick={() =>
                    navigate(`/product/${product.id}?variant=${variant.id}`)
                  }
                >
                  <div className="search-left">
                    <div className="search-name">{product.name}</div>
                    <div className="search-meta">
                      {variant.display_label && (
                        <span className="variant-pill">
                          {variant.display_label}
                        </span>
                      )}
                      <span className="catalog-no">
                        Cat No: {variant.catalog_number}
                      </span>
                    </div>
                  </div>

                  <div className="search-right">
                    {variant.price
                      ? `₹${Number(variant.price).toFixed(0)}`
                      : "P.O.R"}
                  </div>
                </div>
              ))
            )}
        </div>
      )}
    </div>
  );
}
