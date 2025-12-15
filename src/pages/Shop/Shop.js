import React, { useState, useEffect } from 'react';
import { FiGrid, FiList, FiChevronDown } from 'react-icons/fi';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import ProductCard from '../../components/product/ProductCard';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import './Shop.css';

const Shop = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [filters, setFilters] = useState({
    availability: [],
    priceSort: null,
    deals: null
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsList);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = (name) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  const handleAvailabilityChange = (value) => {
    const updated = filters.availability.includes(value)
      ? filters.availability.filter(item => item !== value)
      : [...filters.availability, value];
    setFilters({ ...filters, availability: updated });
  };

  const handlePriceSortChange = (value) => {
    setFilters({ ...filters, priceSort: value });
    setActiveDropdown(null);
  };

  const handleDealsChange = (value) => {
    setFilters({ ...filters, deals: value });
    setActiveDropdown(null);
  };

  // Apply filters to products
  const getFilteredProducts = () => {
    let filtered = [...products];

    // Availability filter
    if (filters.availability.length > 0) {
      filtered = filtered.filter(product => {
        const productInStock = product.stock !== undefined ? product.stock > 0 : product.inStock;
        if (filters.availability.includes('inStock') && productInStock) return true;
        if (filters.availability.includes('outOfStock') && !productInStock) return true;
        return false;
      });
    }

    // Price sort
    if (filters.priceSort === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.priceSort === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }

    // Deals filter
    if (filters.deals === 'allDiscounts') {
      filtered = filtered.filter(product => product.discount);
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  if (loading) {
    return (
      <div className="shop-page">
        <Breadcrumbs />
        <div className="container">
          <div className="shop-loading">
            <div className="loading-spinner"></div>
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop-page">
        <Breadcrumbs />
        <div className="container">
          <div className="shop-error">
            <p>{error}</p>
            <button onClick={fetchProducts} className="btn btn-primary">Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <Breadcrumbs />
      <div className="container">
        <div className="shop-layout-full">
          {/* Toolbar with Filters */}
          <div className="shop-toolbar-enhanced">
            <div className="toolbar-filters">
              {/* Availability Dropdown */}
              <div className="filter-dropdown-container">
                <button 
                  className={`filter-dropdown-btn ${activeDropdown === 'availability' ? 'active' : ''}`}
                  onClick={() => toggleDropdown('availability')}
                >
                  Availability <FiChevronDown />
                </button>
                {activeDropdown === 'availability' && (
                  <div className="filter-dropdown-menu">
                    <label className="dropdown-item">
                      <input 
                        type="checkbox" 
                        checked={filters.availability.includes('inStock')}
                        onChange={() => handleAvailabilityChange('inStock')}
                      />
                      <span>In Stock</span>
                    </label>
                    <label className="dropdown-item">
                      <input 
                        type="checkbox" 
                        checked={filters.availability.includes('outOfStock')}
                        onChange={() => handleAvailabilityChange('outOfStock')}
                      />
                      <span>Out of Stock</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Price Dropdown */}
              <div className="filter-dropdown-container">
                <button 
                  className={`filter-dropdown-btn ${activeDropdown === 'price' ? 'active' : ''}`}
                  onClick={() => toggleDropdown('price')}
                >
                  Price <FiChevronDown />
                </button>
                {activeDropdown === 'price' && (
                  <div className="filter-dropdown-menu">
                    <button 
                      className={`dropdown-item-btn ${filters.priceSort === 'lowToHigh' ? 'active' : ''}`}
                      onClick={() => handlePriceSortChange('lowToHigh')}
                    >
                      Low to High
                    </button>
                    <button 
                      className={`dropdown-item-btn ${filters.priceSort === 'highToLow' ? 'active' : ''}`}
                      onClick={() => handlePriceSortChange('highToLow')}
                    >
                      High to Low
                    </button>
                  </div>
                )}
              </div>

              {/* Deals Dropdown */}
              <div className="filter-dropdown-container">
                <button 
                  className={`filter-dropdown-btn ${activeDropdown === 'deals' ? 'active' : ''}`}
                  onClick={() => toggleDropdown('deals')}
                >
                  Deals & Discounts <FiChevronDown />
                </button>
                {activeDropdown === 'deals' && (
                  <div className="filter-dropdown-menu">
                    <button 
                      className={`dropdown-item-btn ${filters.deals === 'allDiscounts' ? 'active' : ''}`}
                      onClick={() => handleDealsChange('allDiscounts')}
                    >
                      All Discounts
                    </button>
                    <button 
                      className={`dropdown-item-btn ${filters.deals === 'todaysDeals' ? 'active' : ''}`}
                      onClick={() => handleDealsChange('todaysDeals')}
                    >
                      Today's Deals
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="toolbar-actions">
              <div className="results-count">
                Showing 1 - {filteredProducts.length} of {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
              </div>
              
              <div className="view-modes">
                <button 
                  className={`view-mode-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <FiGrid />
                </button>
                <button 
                  className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="shop-empty-state">
              <p>No products found matching your filters.</p>
            </div>
          ) : (
            <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="pagination">
            <button className="pagination-btn" aria-label="Previous page">«</button>
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn" aria-label="Next page">»</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
