import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiShoppingCart, 
  FiUser, 
  FiSearch,
  FiChevronDown,
  FiX,
  FiHeart
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import { useCategories } from '../../contexts/CategoryContext';
import './Header.css';
import logo from '../../assets/logo.png';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser, logout, isAdmin } = useAuth();
  const { categories } = useCategories();



  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setSearchOpen(false);
    setSearchQuery('');
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="header">
      {/* Main Header */}
      <div className="header-main">
        <div className="container">
          <div className="header-main-content">
            {/* Logo */}
            <Link to="/" className="header-logo">
              <img src={logo} alt="Satva Organics" className="logo-image" />
            </Link>

            {/* Navigation */}
            <nav className="header-nav-inline">
              <ul className="nav-menu">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Home</Link>
                </li>

              {/* Category with Nested Categories */}
                <li 
                  className={`nav-item has-dropdown ${activeMenu === 'shop' ? 'active' : ''}`}
                  onMouseEnter={() => setActiveMenu('shop')}
                  onMouseLeave={() => {
                    setActiveMenu(null);
                    setActiveCategory(null);
                  }}
                >
                  <button className="nav-link">
                    Category
                    <FiChevronDown className="dropdown-icon" />
                  </button>

                  {/* Category Dropdown with Right-side Subcategories */}
                  <div className="category-dropdown">
                    <ul className="category-list">
                      {categories.map((category) => (
                        <li 
                          key={category.id}
                          className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
                          onMouseEnter={() => setActiveCategory(category.id)}
                          onMouseLeave={() => setActiveCategory(null)}
                        >
                          <div className="category-link-wrapper">
                            <Link to={`/shop/${category.slug}`} className="category-link">
                              {category.name}
                            </Link>
                            <FiChevronDown className="category-arrow" />
                          </div>

                          {/* Right-side Subcategory Dropdown */}
                          {activeCategory === category.id && (
                            <div className="subcategory-dropdown-right">
                              <ul className="subcategory-list-right">
                                {category.subcategories.map((sub, index) => (
                                  <li key={index}>
                                    <Link to={`/shop/${category.slug}/${sub.toLowerCase().replace(/\s+/g, '-')}`}>
                                      {sub}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </li>
                      ))}
                      
                      {/* View All Button */}
                      <li className="category-item view-all-item">
                        <Link to="/shop" className="view-all-btn">
                          View All Categories
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <button 
                    className="nav-link" 
                    onClick={() => {
                      const productsSection = document.getElementById('products-section');
                      if (productsSection) {
                        productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                  >
                    Products
                  </button>
                </li>

                <li className="nav-item">
                  <Link to="/about" className="nav-link">About</Link>
                </li>

                <li className="nav-item">
                  <Link to="/contact" className="nav-link">Contact</Link>
                </li>
              </ul>
            </nav>

            {/* Header Actions */}
            <div className="header-actions">
              <button 
                className="header-action-btn search-btn" 
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
              >
                <FiSearch />
              </button>
              
              {/* My Account Dropdown */}
              <div 
                className={`account-dropdown-wrapper ${activeMenu === 'account' ? 'active' : ''}`}
                onMouseEnter={() => setActiveMenu('account')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="header-action-btn" aria-label="Account">
                  <FiUser />
                </button>

                <div className="account-dropdown">
                  <h4 className="account-dropdown-title">MY ACCOUNT</h4>
                  {currentUser ? (
                    <>
                      <Link to="/account" className="account-dropdown-link">
                        My Profile
                      </Link>
                      {isAdmin && (
                        <Link to="/admin/dashboard" className="account-dropdown-link admin-link">
                          Admin Dashboard
                        </Link>
                      )}
                      <Link to="/account/orders" className="account-dropdown-link">
                        My Orders
                      </Link>
                      <Link to="/account/wishlist" className="account-dropdown-link">
                        Wishlist
                      </Link>
                      <button onClick={handleLogout} className="account-dropdown-link logout-btn">
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/signup" className="account-dropdown-link">
                        Register
                      </Link>
                      <Link to="/login" className="account-dropdown-link">
                        Login
                      </Link>
                    </>
                  )}
                </div>
              </div>
              
              <Link to="/account/wishlist" className="header-action-btn wishlist-btn" aria-label="Wishlist">
                <FiHeart />
              </Link>
              
              <Link to="/cart" className="header-action-btn cart-btn">
                <FiShoppingCart />
                <span className="cart-badge">0</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Popup */}
      {searchOpen && (
        <div className="search-popup-overlay" onClick={() => setSearchOpen(false)}>
          <div className="search-popup" onClick={(e) => e.stopPropagation()}>
            <button 
              className="search-close" 
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
            >
              <FiX />
            </button>
            <form onSubmit={handleSearch} className="search-popup-form">
              <input
                type="text"
                placeholder="Search our store"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-popup-input"
                autoFocus
              />
              <button type="submit" className="search-popup-button">
                Search
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Backdrop Blur */}
      {activeMenu === 'shop' && <div className="backdrop-blur" />}
    </header>
  );
};

export default Header;
