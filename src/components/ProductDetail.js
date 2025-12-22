import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";

import kitBoxImg from "../assets/kit box.jpeg";
import bufferBottleImg from "../assets/buffer bottle.jpeg";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);

  /* ---------------- FETCH PRODUCT ---------------- */
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/products/${id}/`)
      .then((res) => {
        setProduct(res.data);

        const defaultVariant =
          res.data.variants.find((v) => v.is_default) ||
          res.data.variants[0];

        setSelectedVariant(defaultVariant);
      })
      .catch(console.error);
  }, [id]);

  if (!product || !selectedVariant) {
    return <p>Loading...</p>;
  }

  /* ---------------- IMAGE LOGIC ---------------- */
  const isKit = product.variants.some((v) =>
    ["preps", "plates", "wells", "kits"].includes(
      v.unit?.toLowerCase()
    )
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

          <p>
            <strong>Catalog No:</strong>{" "}
            {selectedVariant.catalog_number}
          </p>

          <p>
            <strong>Category:</strong>{" "}
            {product.category_name}
          </p>

          {product.subcategory_name && (
            <p>
              <strong>Subcategory:</strong>{" "}
              {product.subcategory_name}
            </p>
          )}

          {/* VARIANTS */}
          <div className="variant-section">
            <h3>Available Variants</h3>

            <div className="variant-buttons">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  className={
                    selectedVariant.id === variant.id
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

          {/* PRICE */}
          <div className="price">
            {selectedVariant.price ? (
              <span>₹ {selectedVariant.price}</span>
            ) : (
              <span className="por">Price on Request</span>
            )}
          </div>

          {/* ENQUIRE NOW */}
          <button
            className="enquire-btn"
            onClick={() =>
              navigate("/contact", {
                state: {
                  // 🔥 REQUIRED FOR BACKEND
                  productId: product.id,
                  variantId: selectedVariant.id,

                  // 👌 DISPLAY PURPOSE
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
