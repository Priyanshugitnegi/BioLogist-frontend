import React, { useEffect, useState, useMemo } from "react";
import api from "../api/axios";
import { Link, useLocation } from "react-router-dom";
import "./Products.css";

import kitBoxImg from "../assets/kit box.jpeg";
import bufferBottleImg from "../assets/buffer bottle.jpeg";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const categorySlug = params.get("category") || "all";
  const subId = params.get("sub");
  const searchQuery = params.get("q")?.toLowerCase() || "";

  /* =======================
     FETCH ALL PRODUCTS
     ======================= */
  useEffect(() => {
    const fetchAllProducts = async () => {
      let all = [];
      let url = "/api/products/";

      while (url) {
        const res = await api.get(url);
        all = [...all, ...res.data.results];
        url = res.data.next; // pagination magic
      }

      setProducts(all);
    };

    fetchAllProducts().catch(console.error);
  }, []);

  /* =======================
     FETCH CATEGORIES
     ======================= */
  useEffect(() => {
    api
      .get("/api/categories/")
      .then((res) => setCategories(res.data.results || []))
      .catch(console.error);
  }, []);

  /* =======================
     FILTER LOGIC (CORRECT)
     ======================= */
  const filteredProducts = useMemo(() => {
    let list = [...products];

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

    if (subId) {
      list = list.filter(
        (p) => String(p.subcategory) === String(subId)
      );
    }

    if (searchQuery) {
      list = list.filter((p) => {
        const nameMatch = p.name?.toLowerCase().includes(searchQuery);
        const variantMatch = p.variants?.some((v) =>
          v.catalog_number?.toLowerCase().includes(searchQuery)
        );
        return nameMatch || variantMatch;
      });
    }

    return list;
  }, [products, categories, categorySlug, subId, searchQuery]);

  /* =======================
     IMAGE LOGIC
     ======================= */
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
              cat.slug === categorySlug ? "active" : ""
            }`}
          >
            {cat.name}
            <span>{cat.product_count}</span>
          </Link>
        ))}
      </div>

      <section className="products-grid">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.slug}`}
            className="product-card"
          >
            <img src={getProductImage(product)} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.variants?.length || 0} variants</p>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default Products;
