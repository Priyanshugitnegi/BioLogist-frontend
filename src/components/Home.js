import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

/* =========================
   CATEGORY CARDS CONFIG
========================= */
const CATEGORY_CARDS = [
  {
    name: "Reverse Transcription & RT-PCR",
    slug: "reverse-transcription-rt-pcr",
    image: "/images/reverse-transcription-rt-pcr.jpeg",
  },
  {
    name: "Enzymes / Enzyme Inhibitors / Reagents",
    slug: "enzymes-enzyme-inhibitors-reagents",
    image: "/images/enzymes-enzyme-inhibitors-reagents.jpeg",
  },
  {
    name: "Bio Transformation Kit",
    slug: "bio-transformation-kit",
    image: "/images/bio-transformation-kit.jpeg",
  },
  {
    name: "DNA & RNA Purification (Column System)",
    slug: "dna-rna-purification-kits-column-system",
    image: "/images/dna-rna-column.jpeg",
  },
  {
    name: "PCR & Real-Time PCR",
    slug: "pcr-real-time-pcr",
    image: "/images/pcr-real-time-pcr.jpeg",
  },
  {
    name: "Proteomics",
    slug: "proteomics",
    image: "/images/proteomics.jpeg",
  },
  {
    name: "Nucleic Acid Gel Electrophoresis",
    slug: "nucleic-acid-gel-electrophoresis",
    image: "/images/gel-electrophoresis.jpeg",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* ================= HERO ================= */}
      <section className="home-hero">
        <div className="home-container">
          <h1 className="home-title">
            BioLogist Private Limited<br />
            <span>Precision Biotech Solutions</span>
          </h1>

          <p className="home-subtitle">
            High-quality molecular biology kits, reagents, and buffers
            engineered for accuracy, reproducibility, and efficiency.
          </p>

          <div className="home-actions">
            <Link to="/products" className="btn-primary">
              Browse Products
            </Link>
            <Link to="/contact" className="btn-outline">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* ================= TRUST STRIP ================= */}
      <section className="home-trust">
        <div className="home-container trust-grid">
          <div className="trust-card">
            <h3>High Purity</h3>
            <p>Optimized formulations ensuring maximum yield and integrity.</p>
          </div>
          <div className="trust-card">
            <h3>Validated Protocols</h3>
            <p>Tested across multiple sample types and workflows.</p>
          </div>
          <div className="trust-card">
            <h3>Scalable Workflows</h3>
            <p>From single samples to high-throughput applications.</p>
          </div>
          <div className="trust-card">
            <h3>Expert Support</h3>
            <p>Real scientists. Real support. When you need it.</p>
          </div>
        </div>
      </section>

      {/* ================= PRODUCT CATEGORIES ================= */}
      <section className="category-section">
        <h2 className="section-title">Product Categories</h2>

        <div className="category-grid">
          {CATEGORY_CARDS.map((cat) => (
            <div
              key={cat.slug}
              className="category-card"
              onClick={() =>
                navigate(`/products?category=${cat.slug}`)
              }
            >
              <img src={cat.image} alt={cat.name} />
              <div className="category-overlay">
                <span>{cat.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= SOLUTIONS ================= */}
      <section className="home-solutions">
        <div className="home-container">
          <h2 className="section-title">Our Core Solutions</h2>

          <div className="solutions-grid">
            <div className="solution-box">
              <h4>DNA & RNA Purification</h4>
              <p>Spin columns, magnetic beads, and buffer systems.</p>
            </div>

            <div className="solution-box">
              <h4>PCR & qPCR</h4>
              <p>High-fidelity amplification with consistent performance.</p>
            </div>

            <div className="solution-box">
              <h4>Protein Analysis</h4>
              <p>Western blot reagents, markers, and buffers.</p>
            </div>

            <div className="solution-box">
              <h4>Cloning & Plasmids</h4>
              <p>Plasmid prep kits optimized for yield and purity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="home-cta">
        <div className="home-container cta-box">
          <h2>Ready to streamline your workflow?</h2>
          <Link to="/products" className="btn-primary">
            Browse All Products
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
