// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LOGO & DESCRIPTION */}
        <div className="footer-section logo-section">
          <Link to="/" className="footer-logo">
            <img src={logo} alt="BioLogist" className="footer-logo-img" />
            <span className="footer-brand">BioLogist</span>
          </Link>
          <p className="footer-desc">
            Your trusted partner in molecular biology solutions. High‑quality reagents, kits, and services for modern labs.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
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
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        {/* CATEGORIES */}
        <div className="footer-section">
          <h3 className="footer-title">Categories</h3>
          <ul className="footer-links">
            <li><Link to="/products?category=RNA">RNA Extraction</Link></li>
            <li><Link to="/products?category=PCR">PCR & qPCR</Link></li>
            <li><Link to="/products?category=Protein">Protein Analysis</Link></li>
            <li><Link to="/products?category=Cloning">Cloning Kits</Link></li>
            <li><Link to="/products?category=Genomics">Genomics</Link></li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div className="footer-section">
          <h3 className="footer-title">Get in Touch</h3>
          <div className="contact-item">
            <Mail size={18} />
            <span>support@biologist.com</span>
          </div>
          <div className="contact-item">
            <Phone size={18} />
            <span>+91 98765 43210</span>
          </div>
          <div className="contact-item">
            <MapPin size={18} />
            <span>Mumbai, India</span>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>&copy; 2025 BioLogist. All rights reserved.</p>
        <div className="footer-legal">
          <Link to="/privacy">Privacy Policy</Link>
          <span>•</span>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;