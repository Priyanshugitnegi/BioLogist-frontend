import React, { useEffect, useState, useMemo } from "react";
import api from "../api/axios";
import { Link, useLocation } from "react-router-dom";
import "./Products.css";

import kitBoxImg from "../assets/kit box.jpeg";
import bufferBottleImg from "../assets/buffer bottle.jpeg";

/* ---------------- SLUG NORMALIZER ---------------- */
const normalize = (str) =>
  str
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(0); // ✅ NEW

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const categorySlug = params.get("category") || "all";
  const subId = params.get("sub");
  const searchQuery = params.get("q")?.toLowerCase() || "";

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    // PRODUCTS (paginated-safe)
    api
      .get("/api/products/")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
          setTotalCount(res.data.length);
        } else {
          setProducts(res.data.results || []);
          setTotalCount(res.data.count || 0);
        }
      })
      .catch(console.error);

    // CATEGORIES
    api
      .get("/api/categories/")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];
        setCategories(data);
      })
      .catch(console.error);
  }, []);

  /* ---------------- FILTER PRODUCTS ---------------- */
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // CATEGORY FILTER (slug → id)
    if (categorySlug !== "all") {
      const selectedCategory = categories.find(
        (c) => c.slug === categorySlug
      );

      if (selectedCategory) {
        list = list.filter(
          (p) => String(p.category) === String(selectedCategory.id)
        );
      }
    }

    // SUBCATEGORY FILTER
    if (subId) {
      list = list.filter(
        (p) => String(p.subcategory) === String(subId)
      );
    }

    // SEARCH FILTER
    if (searchQuery) {
      list = list.filter((p) => {
        const nameMatch = p.name
          ?.toLowerCase()
          .includes(searchQuery);

        const variantMatch = p.variants?.some((v) =>
          v.catalog_number
            ?.toLowerCase()
            .includes(searchQuery)
        );

        return nameMatch || variantMatch;
      });
    }

    return list;
  }, [products, categories, categorySlug, subId, searchQuery]);

  /* ---------------- IMAGE LOGIC ---------------- */
  const getProductImage = (product) => {
    const isKit = product.variants?.some((v) =>
      v.quantity?.toLowerCase().includes("kit") ||
      v.quantity?.toLowerCase().includes("prep")
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
        <p>Premium molecular biology reagents trusted worldwide</p>
      </header>

      <div className="category-bar">
        <Link
          to="/products"
          className={`category-pill ${
            categorySlug === "all" ? "active" : ""
          }`}
        >
          All Products
          <span>{totalCount}</span> {/* ✅ FIXED */}
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
            <span>{cat.product_count || 0}</span>
          </Link>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      <section className="products-grid">
        {filteredProducts.length === 0 && (
          <div className="no-products">No products found.</div>
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
                {product.variants?.length !== 1 && "s"}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Products;
