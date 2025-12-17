import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiShoppingCart, 
  FiUser, 
  FiSearch,
  FiChevronDown,
  FiX
} from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser, logout } = useAuth();

  // Comprehensive category data with subcategories
  const categories = [
    {
      id: 1,
      name: 'Organic Exotic Products',
      slug: 'organic-exotic-products',
      subcategories: [
        'Broccoli',
        'Cherry Tomato',
        'Red Cabbage',
        'Yellow Zucchini',
        'Lettuce Leaf',
        'Beshal',
        'Jalapeno Green Chilli',
        'Bok Choy',
        'Organic Spinach',
        'Organic Roman',
        'Rocket'
      ]
    },
    {
      id: 2,
      name: 'Organic Wood Cold Press Oils Products',
      slug: 'organic-wood-cold-press-oils',
      subcategories: [
        'Coconut Oil',
        'Groundnuts Oil',
        'Sunflower Oil',
        'Safflower Oil'
      ]
    },
    {
      id: 3,
      name: 'Millets Of India',
      slug: 'millets-of-india',
      subcategories: [
        'Sorghum (Jowar)',
        'Pearl Millet (Bajra)',
        'Finger Millet (Ragi)'
      ]
    },
    {
      id: 4,
      name: 'Organic Items',
      slug: 'organic-items',
      subcategories: [
        'Fresh Turmeric',
        'Organic Jaggery',
        'Organic Jaggery Cubes'
      ]
    },
    {
      id: 5,
      name: 'Seeds And Nuts',
      slug: 'seeds-and-nuts',
      subcategories: [
        'Pumpkin Seeds',
        'Sunflower Seeds',
        'Sesame Seeds',
        'Solapuri Peanuts',
        'Chia Seeds',
        'Mustard Seeds'
      ]
    },
    {
      id: 6,
      name: 'Organic Powder',
      slug: 'organic-powder',
      subcategories: [
        'Moringa Leaf Powder',
        'Neem Powder',
        'Amla Powder',
        'Shatavari Powder',
        'Triphala Powder',
        'Turmeric Latte Mix',
        'Organic Jaggery Powder'
      ]
    }
  ];

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
              <span className="logo-icon">🌿</span>
              <span className="logo-text">Satva Organics</span>
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
                    setShowAllCategories(false);
                  }}
                >
                  <button className="nav-link">
                    Category
                    <FiChevronDown className="dropdown-icon" />
                  </button>

                  {/* Category List */}
                  <div className="category-dropdown">
                    <ul className="category-list">
                      {categories.slice(0, showAllCategories ? categories.length : 5).map((category) => (
                        <li 
                          key={category.id}
                          className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
                          onMouseEnter={() => setActiveCategory(category.id)}
                        >
                          <div className="category-link-wrapper">
                            <Link to={`/shop/${category.slug}`} className="category-link">
                              {category.name}
                            </Link>
                            <FiChevronDown className="category-arrow" />
                          </div>

                          {/* Subcategory Dropdown (Accordion style or Bottom) */}
                          {activeCategory === category.id && (
                            <div className="subcategory-dropdown">
                              <ul className="subcategory-list">
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
                      {!showAllCategories && categories.length > 5 && (
                        <li className="category-item view-all-item">
                          <button 
                            className="view-all-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowAllCategories(true);
                            }}
                          >
                            View All Categories
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </li>

                <li className="nav-item">
                  <Link to="/products" className="nav-link">Product</Link>
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
                      <Link to="/orders" className="account-dropdown-link">
                        My Orders
                      </Link>
                      <Link to="/wishlist" className="account-dropdown-link">
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
