import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./ProductDetail.css";

import kitBoxImg from "../assets/kit box.jpeg";
import bufferBottleImg from "../assets/buffer bottle.jpeg";

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= FETCH PRODUCT (SLUG) ================= */
  useEffect(() => {
    setLoading(true);
    setError(null);
    setProduct(null);
    setSelectedVariant(null);

    api
      .get(`/api/products/slug/${slug}/`)
      .then((res) => {
        const data = res.data;
        setProduct(data);

        if (data.variants?.length > 0) {
          const defaultVariant =
            data.variants.find((v) => v.is_default) ||
            data.variants[0];
          setSelectedVariant(defaultVariant);
        }
      })
      .catch(() => {
        setError("Product not found");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  /* ================= STATES ================= */
  if (loading) {
    return <div className="product-loading">Loading product…</div>;
  }

  if (error || !product) {
    return <div className="product-error">Product not found.</div>;
  }

  const hasVariants = product.variants?.length > 0;

  /* ================= IMAGE LOGIC ================= */
  const isKit =
    hasVariants &&
    product.variants.some((v) =>
      ["kit", "prep", "plate", "well", "kits", "plates", "wells"].some(
        (k) => v.quantity?.toLowerCase().includes(k)
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

          {hasVariants && selectedVariant && (
            <p className="meta">
              <strong>Catalog No:</strong>{" "}
              {selectedVariant.catalog_number}
            </p>
          )}

          <p className="meta">
            <strong>Category:</strong> {product.category_name}
          </p>

          {product.subcategory_name && (
            <p className="meta">
              <strong>Subcategory:</strong> {product.subcategory_name}
            </p>
          )}

          {/* VARIANTS */}
          {hasVariants && product.variants.length > 1 && (
            <div className="variant-section">
              <h3>Available Variants</h3>

              <div className="variant-buttons">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    className={
                      selectedVariant?.id === variant.id
                        ? "variant-btn active"
                        : "variant-btn"
                    }
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
            {hasVariants && selectedVariant?.price ? (
              <span>
                ₹ {Number(selectedVariant.price).toFixed(0)}
              </span>
            ) : (
              <span className="por">Price on Request</span>
            )}
          </div>

          {/* ENQUIRE */}
          <button
            className="enquire-btn"
            onClick={() =>
              navigate("/enquiry", {
                state: {
                  productId: product.id,
                  variantId: selectedVariant?.id || null,
                  productName: product.name,
                  catalog:
                    selectedVariant?.catalog_number || "",
                  variant:
                    selectedVariant?.display_label || "",
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
