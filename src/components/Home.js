import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">

      {/* HERO */}
      <section className="home-hero">
        <div className="home-container">
          <h1 className="home-title">
            Precision Biotech Solutions<br />
            <span>Built for Modern Laboratories</span>
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

      {/* TRUST STRIP */}
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

      {/* SOLUTIONS */}
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

      {/* CTA STRIP */}
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
