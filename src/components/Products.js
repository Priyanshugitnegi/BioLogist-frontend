import React, { useEffect, useState, useMemo } from "react";
import api from "../api/axios";
import { Link, useLocation } from "react-router-dom";
import "./Products.css";

import kitBoxImg from "../assets/kit box.jpeg";
import bufferBottleImg from "../assets/buffer bottle.jpeg";

const normalize = (str) =>
  str?.toLowerCase().replace(/[^a-z0-9]+/g, "-");

const Products = () => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [categories, setCategories] = useState([]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const categorySlug = params.get("category") || "all";
  const subId = params.get("sub");
  const searchQuery = params.get("q")?.toLowerCase() || "";

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    // PRODUCTS (paginated)
    api.get("/api/products/")
      .then((res) => {
        setProducts(res.data.results || []);
        setTotalCount(res.data.count || 0);
      })
      .catch(console.error);

    // CATEGORIES
    api.get("/api/categories/")
      .then((res) => {
        setCategories(res.data.results || []);
      })
      .catch(console.error);
  }, []);

  /* ---------------- FILTER ---------------- */
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (categorySlug !== "all") {
      const selected = categories.find(
        (c) => normalize(c.slug) === normalize(categorySlug)
      );
      if (selected) {
        list = list.filter(
          (p) => String(p.category) === String(selected.id)
        );
      }
    }

    if (subId) {
      list = list.filter(
        (p) => String(p.subcategory) === String(subId)
      );
    }

    if (searchQuery) {
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(searchQuery) ||
          p.variants?.some((v) =>
            v.catalog_number?.toLowerCase().includes(searchQuery)
          )
      );
    }

    return list;
  }, [products, categories, categorySlug, subId, searchQuery]);

  const getProductImage = (product) => {
    const isKit = product.variants?.some((v) =>
      v.quantity?.toLowerCase().includes("kit")
    );
    return isKit ? kitBoxImg : bufferBottleImg;
  };

  return (
    <div className="products-page">
      <header className="products-header">
        <h1>Our Products</h1>
        <p>Premium molecular biology reagents trusted worldwide</p>
      </header>

      {/* CATEGORY BAR */}
      <div className="category-bar">
        <Link
          to="/products"
          className={`category-pill ${categorySlug === "all" ? "active" : ""}`}
        >
          All Products
          <span>{totalCount}</span>
        </Link>

        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/products?category=${cat.slug}`}
            className={`category-pill ${
              normalize(categorySlug) === normalize(cat.slug) ? "active" : ""
            }`}
          >
            {cat.name}
            <span>{cat.product_count}</span>
          </Link>
        ))}
      </div>

      {/* GRID */}
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
              <img src={getProductImage(product)} alt={product.name} />
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="variants">
                {product.variants?.length || 0} variants
              </p>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Products;
