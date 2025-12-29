<ul className="nav-links">
  <li><Link to="/">Home</Link></li>

  {/* PRODUCTS MEGA MENU */}
  <li
    className="mega-dropdown"
    onMouseEnter={openMenu}
    onMouseLeave={closeMenu}
  >
    <span className="nav-link">Products</span>

    {showMegaMenu && (
      <div className="mega-menu">
        <div className="mega-left">
          <div
            className="mega-cat"
            onMouseEnter={() => setActiveCategory(null)}
            onClick={() => goToCategory("all")}
          >
            All Products
          </div>

          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`mega-cat ${
                activeCategory?.id === cat.id ? "active" : ""
              }`}
              onMouseEnter={() => setActiveCategory(cat)}
              onClick={() => goToCategory(cat.slug)}
            >
              <span>{cat.name}</span>
              <span className="cat-count">
                ({cat.product_count || 0})
              </span>
            </div>
          ))}
        </div>

        <div className="mega-right">
          {activeCategory?.subcategories?.length ? (
            activeCategory.subcategories.map((sub) => (
              <div
                key={sub.id}
                className="mega-sub"
                onClick={() =>
                  goToSubcategory(activeCategory.slug, sub.id)
                }
              >
                {sub.name}
              </div>
            ))
          ) : (
            <div className="mega-empty">No subcategories</div>
          )}
        </div>
      </div>
    )}
  </li>

  {/* ENQUIRY */}
  <li>
    <Link to="/enquiry">Enquiry</Link>
  </li>

  {/* CART */}
  <li className="cart-item">
    <Link to="/cart">
      <ShoppingCart size={24} />
      {cartCount > 0 && (
        <span className="cart-badge">{cartCount}</span>
      )}
    </Link>
  </li>
</ul>
