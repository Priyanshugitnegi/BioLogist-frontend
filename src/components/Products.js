import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "./Products.css";

import kitBoxImg from "../assets/kit box.jpeg";
import bufferBottleImg from "../assets/buffer bottle.jpeg";

/* ---------------- SLUG NORMALIZER (MATCHES DJANGO) ---------------- */
const normalize = (str) =>
  str
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const categorySlug = params.get("category") || "all";
  const subId = params.get("sub");
  const searchQuery = params.get("q")?.toLowerCase() || "";

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/")
      .then((res) => {
        // ✅ FIX: works for paginated & non-paginated APIs
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];
        setProducts(data);
      })
      .catch(console.error);

    axios
      .get("http://127.0.0.1:8000/api/categories/")
      .then((res) => setCategories(res.data))
      .catch(console.error);
  }, []);

  /* ---------------- FILTER PRODUCTS ---------------- */
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // ✅ CATEGORY FILTER (SAFE)
    if (categorySlug !== "all") {
      const normalizedSlug = normalize(categorySlug);
      list = list.filter(
        (p) =>
          p.category_slug &&
          normalize(p.category_slug) === normalizedSlug
      );
    }

    // Subcategory filter
    if (subId) {
      list = list.filter(
        (p) => String(p.subcategory) === String(subId)
      );
    }

    // Search filter
    if (searchQuery) {
      list = list.filter((product) => {
        const nameMatch = product.name
          ?.toLowerCase()
          .includes(searchQuery);

        const variantMatch = product.variants?.some((v) =>
          v.catalog_number?.toLowerCase().includes(searchQuery)
        );

        return nameMatch || variantMatch;
      });
    }

    return list;
  }, [products, categorySlug, subId, searchQuery]);

  /* ---------------- IMAGE LOGIC ---------------- */
  const getProductImage = (product) => {
    const isKit = product.variants?.some((v) =>
      v.quantity?.toLowerCase().includes("prep") ||
      v.quantity?.toLowerCase().includes("kit")
    );

    return isKit ? kitBoxImg : bufferBottleImg;
  };

  /* ---------------- RENDER ---------------- */
  return (
    <div className="products-page">
      <header className="products-header">
        <h1>
          {searchQuery
            ? `Search results for “${searchQuery}”`
            : "Our Products"}
        </h1>
        <p>
          Premium molecular biology reagents trusted by laboratories worldwide
        </p>
      </header>

      {/* CATEGORY BAR */}
      <div className="category-bar">
        <Link
          to="/products"
          className={`category-pill ${
            categorySlug === "all" ? "active" : ""
          }`}
        >
          All Products
          <span>{products.length}</span>
        </Link>

        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.slug}`}
            className={`category-pill ${
              normalize(categorySlug) === normalize(cat.slug)
                ? "active"
                : ""
            }`}
          >
            {cat.name}
            <span>{cat.product_count}</span>
          </Link>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <section className="products-grid">
        {filteredProducts.length === 0 && (
          <div className="no-products">
            No products found.
          </div>
        )}

        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.slug}`}
            className="product-card"
          >
            <div className="product-image">
              <img
                src={getProductImage(product)}
                alt={product.name}
              />
            </div>

            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="variants">
                {product.variants?.length || 0} variant
                {product.variants?.length > 1 ? "s" : ""}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Products;
