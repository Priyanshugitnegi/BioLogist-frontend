// src/components/SearchBar.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createPortal } from 'react-dom';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // -------------------------------------------------
  // 1. Debounced API call
  // -------------------------------------------------
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setShow(false);
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      axios
        .get(`http://127.0.0.1:8000/api/products/search/?q=${encodeURIComponent(query)}`)
        .then(res => {
          const results = res.data.results || [];
          setSuggestions(results);
          setShow(true);               // ALWAYS SHOW WHEN WE HAVE DATA
        })
        .catch(() => {
          setSuggestions([]);
          setShow(false);
        })
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // -------------------------------------------------
  // 2. Click-outside handler
  // -------------------------------------------------
  useEffect(() => {
    const handler = e => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // -------------------------------------------------
  // 3. Render
  // -------------------------------------------------
  return (
    <>
      {/* INPUT */}
      <div ref={inputRef} style={{ position: 'relative', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'white',
            borderRadius: 50,
            border: '2px solid #ddd',
            overflow: 'hidden',
          }}
        >
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShow(true)}
            style={{
              flex: 1,
              padding: '12px 16px',
              border: 'none',
              outline: 'none',
              fontSize: 16,
            }}
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setShow(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: '0 12px',
                cursor: 'pointer',
                fontSize: 20,
                color: '#999',
              }}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* DROPDOWN – PORTAL + SUPER HIGH Z-INDEX */}
      {show &&
        createPortal(
          <div
            style={{
              position: 'fixed',
              top: inputRef.current
                ? inputRef.current.getBoundingClientRect().bottom + window.scrollY + 4
                : 0,
              left: inputRef.current
                ? inputRef.current.getBoundingClientRect().left + window.scrollX
                : 0,
              width: inputRef.current ? inputRef.current.offsetWidth : 360,
              background: 'white',
              border: '3px solid red',               // RED BORDER – you WILL see it
              borderRadius: '0 0 16px 16px',
              maxHeight: 340,
              overflow: 'auto',
              zIndex: 2147483647,                    // MAX POSSIBLE Z-INDEX
              boxShadow: '0 12px 24px rgba(0,0,0,.2)',
            }}
          >
            {loading ? (
              <div style={{ padding: 16, textAlign: 'center', color: '#666' }}>
                Searching…
              </div>
            ) : suggestions.length > 0 ? (
              suggestions.map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    navigate(`/product/${p.id}`);
                    setQuery('');
                    setShow(false);
                  }}
                  style={{
                    padding: '14px 16px',
                    borderBottom: '1px solid #eee',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f0f0ff')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'white')}
                >
                  <div>
                    <div style={{ fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: '#777' }}>{p.category}</div>
                  </div>
                  <div style={{ color: '#2c7', fontWeight: 700 }}>₹{p.price}</div>
                </div>
              ))
            ) : (
              <div style={{ padding: 16, color: '#999', textAlign: 'center' }}>
                No results for “{query}”
              </div>
            )}
          </div>,
          document.body
        )}
    </>
  );
}