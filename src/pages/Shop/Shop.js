import React, { useState } from 'react';
import { FiGrid, FiList, FiChevronDown } from 'react-icons/fi';
import ProductCard from '../../components/product/ProductCard';
import './Shop.css';

const Shop = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [filters, setFilters] = useState({
    availability: [],
    priceSort: null,
    deals: null
  });

  // Sample products data
  const products = [
    {
      id: 1,
      name: 'Fresh Organic Peach',
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1629828874514-944d8c50f5ac?w=400',
      price: 110,
      originalPrice: 130,
      discount: 15,
      rating: 4.5,
      inStock: true
    },
    {
      id: 2,
      name: 'Organic Papaya',
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400',
      price: 80,
      originalPrice: null,
      discount: null,
      rating: 5,
      inStock: true
    },
    {
      id: 3,
      name: 'Mixed Berries',
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400',
      price: 70,
      originalPrice: 85,
      discount: 18,
      rating: 4.8,
      inStock: true
    },
    {
      id: 4,
      name: 'Fresh Mango',
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400',
      price: 33,
      originalPrice: 39,
      discount: null,
      rating: 4.7,
      inStock: false,
      badge: 'SOLDOUT'
    },
    {
      id: 5,
      name: 'Organic Pears',
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400',
      price: 39,
      originalPrice: null,
      discount: null,
      rating: 4.6,
      inStock: true
    },
    {
      id: 6,
      name: 'Fresh Kiwi',
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=400',
      price: 55,
      originalPrice: 75,
      discount: 27,
      rating: 4.9,
      inStock: true
    },
    {
      id: 7,
      name: 'Pomegranate',
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1615485500834-bc10199bc727?w=400',
      price: 33,
      originalPrice: 39,
      discount: null,
      rating: 4.5,
      inStock: false,
      badge: 'SOLDOUT'
    },
    {
      id: 8,
      name: 'Organic Papaya',
      category: 'Fruits',
      image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=400',
      price: 39,
      originalPrice: null,
      discount: null,
      rating: 4.8,
      inStock: true
    },
    {
      id: 9,
      name: 'Cherry Tomatoes',
      category: 'Vegetables',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400',
      price: 55,
      originalPrice: 75,
      discount: 27,
      rating: 4.7,
      inStock: true
    }
  ];

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

  return (
    <div className="shop-page">
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
                Showing 1 - {products.length} of {products.length} result
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
          <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

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
