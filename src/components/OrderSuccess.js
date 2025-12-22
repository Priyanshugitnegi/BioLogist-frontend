// frontend/src/components/OrderSuccess.js
import React from 'react';
import { Link } from 'react-router-dom';
import './OrderSuccess.css'; // Optional: add styles

const OrderSuccess = () => {
  return (
    <div className="order-success">
      <div className="success-icon">Checkmark</div>
      <h1>Payment Successful!</h1>
      <p>Thank you for your order. Your transaction has been completed.</p>
      <p><strong>Order ID:</strong> <span id="order-id">Will be shown after payment</span></p>
      <Link to="/products" className="continue-shopping">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;