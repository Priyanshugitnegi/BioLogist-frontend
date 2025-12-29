import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";
import "./Enquiry.css";

const Enquiry = () => {
  const location = useLocation();
  const enquiry = location.state;

  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!enquiry?.productId || !enquiry?.variantId) {
      alert("Missing product information");
      return;
    }

    const payload = {
      product: Number(enquiry.productId),
      variant: Number(enquiry.variantId),
      name: form.name,
      email: form.email,
      phone: form.company,
      message: form.message,
    };

    try {
      setLoading(true);
      await api.post("/api/enquiry/", payload);
      alert("Enquiry submitted successfully!");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to submit enquiry");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Product Enquiry</h1>
        <p className="subtitle">
          Submit an enquiry for pricing, availability, or technical details.
        </p>

        {enquiry && (
          <div className="enquiry-context">
            <h3>Enquiry Details</h3>
            <p><strong>Product:</strong> {enquiry.productName}</p>
            <p><strong>Catalog No:</strong> {enquiry.catalog}</p>
            <p><strong>Variant:</strong> {enquiry.variant}</p>
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <input
            type="text"
            name="company"
            placeholder="Institution / Company"
            value={form.company}
            onChange={handleChange}
          />

          <textarea
            rows="5"
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Enquiry;
