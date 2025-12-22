import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./Contact.css";

const Contact = () => {
  const location = useLocation();
  const enquiry = location.state; // passed from Enquire Now

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

    // 🔒 Safety check
    if (!enquiry?.productId || !enquiry?.variantId) {
      alert("Missing product information");
      return;
    }

    const payload = {
      product: Number(enquiry.productId),
      variant: Number(enquiry.variantId),
      name: form.name,
      email: form.email,
      phone: form.company, // optional reuse
      message: form.message,
    };

    try {
      setLoading(true);

      await axios.post(
        "http://127.0.0.1:8000/api/enquiry/",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Enquiry sent successfully!");
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      console.error("Enquiry error:", err.response?.data || err);
      alert("Failed to send enquiry. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1>Contact Us</h1>
        <p className="subtitle">
          Get in touch with our team for pricing, technical support, or bulk enquiries.
        </p>

        {/* PRODUCT CONTEXT */}
        {enquiry && (
          <div className="enquiry-context">
            <h3>Enquiry Details</h3>
            <p><strong>Product:</strong> {enquiry.productName}</p>
            <p><strong>Catalog No:</strong> {enquiry.catalog}</p>
            <p><strong>Variant:</strong> {enquiry.variant}</p>
          </div>
        )}

        {/* CONTACT FORM */}
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
            {loading ? "Sending..." : "Send Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
