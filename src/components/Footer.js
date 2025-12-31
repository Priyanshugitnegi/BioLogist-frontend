import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import logo from "../assets/logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LOGO & DESCRIPTION */}
        <div className="footer-section logo-section">
          <Link to="/" className="footer-logo">
            <img
              src={logo}
              alt="BioLogist Private Limited"
              className="footer-logo-img"
            />
            <span className="footer-brand">
              BioLogist Private Limited
            </span>
          </Link>

          <p className="footer-desc">
            BioLogist Private Limited delivers high-quality molecular biology
            kits, reagents, and solutions designed for precision,
            reproducibility, and efficiency in modern laboratories.
          </p>

          <div className="social-links">
            <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <Linkedin size={20} />
            </a>
            <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-section">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/enquiry">Enquiry</Link></li>
          </ul>
        </div>

        {/* PRODUCT CATEGORIES */}
        <div className="footer-section">
          <h3 className="footer-title">Product Categories</h3>
          <ul className="footer-links">
            <li>
              <Link to="/products?category=reverse-transcription-rt-pcr">
                Reverse Transcription & RT-PCR
              </Link>
            </li>
            <li>
              <Link to="/products?category=pcr-real-time-pcr">
                PCR & Real-Time PCR
              </Link>
            </li>
            <li>
              <Link to="/products?category=proteomics">
                Proteomics
              </Link>
            </li>
            <li>
              <Link to="/products?category=dna-rna-purification-kits-column-system">
                DNA & RNA Purification
              </Link>
            </li>
            <li>
              <Link to="/products?category=bio-transformation-kit">
                Bio Transformation Kits
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div className="footer-section">
          <h3 className="footer-title">Get in Touch</h3>

          <div className="contact-item">
            <Mail size={18} />
            <a href="mailto:support@biologistinfo.com">
              support@biologistinfo.com
            </a>
          </div>

          <div className="contact-item">
            <Phone size={18} />
            <a href="tel:+919876543210">
              +91 98765 43210
            </a>
          </div>

          <div className="contact-item">
            <MapPin size={18} />
            <span>India</span>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} BioLogist Private Limited.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
