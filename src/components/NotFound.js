import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="section center" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="container">
        <h1 className="page-title" style={{ fontSize: '4rem', color: '#dc2626' }}>404</h1>
        <h2>Page Not Found</h2>
        <p style={{ margin: '1rem 0 2rem', color: '#64748b' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">Return Home</Link>
      </div>
    </section>
  );
}