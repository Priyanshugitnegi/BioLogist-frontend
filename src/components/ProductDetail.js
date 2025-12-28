import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";

import kitBoxImg from "../assets/kit box.jpeg";
import bufferBottleImg from "../assets/buffer bottle.jpeg";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH PRODUCT (SLUG) ================= */
  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://127.0.0.1:8000/api/products/slug/${slug}/`)
      .then((res) => {
        const data = res.data;
        setProduct(data);

        // ✅ pick default variant or first variant
        const defaultVariant =
          data.variants.find((v) => v.is_default === true) ||
          data.variants[0];

        setSelectedVariant(defaultVariant);
      })
      .catch((err) => {
        console.error("Product fetch error:", err);
        setProduct(null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  /* ================= STATES ================= */
  if (loading) {
    return <div className="product-loading">Loading product…</div>;
  }

  if (!product || !selectedVariant) {
    return <div className="product-error">Product not found.</div>;
  }

  /* ================= IMAGE LOGIC ================= */
  const isKit = product.variants.some((v) =>
    ["kit", "prep", "plate", "well"].some((k) =>
      v.quantity?.toLowerCase().includes(k)
    )
  );

  const image = product.image || (isKit ? kitBoxImg : bufferBottleImg);

  return (
    <div className="product-detail-container">
      <div className="product-detail-grid">

        {/* IMAGE */}
        <div className="product-image">
          <img src={image} alt={product.name} />
        </div>

        {/* INFO */}
        <div className="product-info">
          <h1>{product.name}</h1>

          {/* ✅ CATALOG UPDATES WITH VARIANT */}
          <p className="meta">
            <strong>Catalog No:</strong>{" "}
            {selectedVariant.catalog_number || product.catalog_number}
          </p>

          <p className="meta">
            <strong>Category:</strong> {product.category_name}
          </p>

          {product.subcategory_name && (
            <p className="meta">
              <strong>Subcategory:</strong> {product.subcategory_name}
            </p>
          )}

          {/* VARIANTS — only show if >1 */}
          {product.variants.length > 1 && (
            <div className="variant-section">
              <h3>Available Variants</h3>

              <div className="variant-buttons">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className={`variant-btn ${
                      selectedVariant.id === variant.id ? "active" : ""
                    }`}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.display_label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PRICE */}
          <div className="price">
            {selectedVariant.price ? (
              <span>₹ {Number(selectedVariant.price).toFixed(0)}</span>
            ) : (
              <span className="por">Price on Request</span>
            )}
          </div>

          {/* ENQUIRE */}
          <button
            className="enquire-btn"
            onClick={() =>
              navigate("/contact", {
                state: {
                  productId: product.id,
                  variantId: selectedVariant.id,
                  productName: product.name,
                  catalog: selectedVariant.catalog_number,
                  variant: selectedVariant.display_label,
                },
              })
            }
          >
            Enquire Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
