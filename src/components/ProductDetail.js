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
  const [error, setError] = useState(null);

  useEffect(() => {
    setProduct(null);
    setSelectedVariant(null);
    setError(null);

    axios
      .get(`http://127.0.0.1:8000/api/products/slug/${slug}/`)
      .then((res) => {
        setProduct(res.data);

        if (res.data.variants?.length > 0) {
          const defaultVariant =
            res.data.variants.find(v => v.is_default) ||
            res.data.variants[0];

          setSelectedVariant(defaultVariant);
        }
      })
      .catch(() => {
        setError("Product not found");
      });
  }, [slug]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  const hasVariants = product.variants?.length > 0;

  /* IMAGE LOGIC */
  const isKit = hasVariants && product.variants.some(v =>
    ["preps", "plates", "wells", "kits"].includes(v.unit?.toLowerCase())
  );

  const image = isKit ? kitBoxImg : bufferBottleImg;

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

          {hasVariants && (
            <p>
              <strong>Catalog No:</strong>{" "}
              {selectedVariant.catalog_number}
            </p>
          )}

          <p>
            <strong>Category:</strong> {product.category_name}
          </p>

          {product.subcategory_name && (
            <p>
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
              <span>₹ {selectedVariant.price}</span>
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
                  variantId: selectedVariant?.id || null,
                  productName: product.name,
                  catalog: selectedVariant?.catalog_number || "",
                  variant: selectedVariant?.display_label || "",
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
