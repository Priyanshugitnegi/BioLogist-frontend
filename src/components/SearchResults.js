import React from "react";
import { useNavigate } from "react-router-dom";
import "./SearchResults.css";

const SearchResults = ({ results, onClose }) => {
  const navigate = useNavigate();

  const goToProduct = (productId, variantId = null) => {
    if (variantId) {
      navigate(`/product/${productId}?variant=${variantId}`);
    } else {
      navigate(`/product/${productId}`);
    }
    onClose();
  };

  return (
    <div className="search-results">
      {results.map(product => (
        <div key={product.id} className="search-item">
          {/* Product name */}
          <div
            className="search-product"
            onClick={() => goToProduct(product.id)}
          >
            {product.name}
          </div>

          {/* Variants */}
          <div className="search-variants">
            {product.variants.map(variant => (
              <span
                key={variant.id}
                className="variant-chip"
                onClick={() => goToProduct(product.id, variant.id)}
              >
                {variant.display_label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
