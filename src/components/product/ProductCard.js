import React, { useState } from 'react';
import './ProductCard.css';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import Badge from '../common/Badge';
import ProductQuickView from './ProductQuickView';

const ProductCard = ({ 
  product 
}) => {
  const [showQuickView, setShowQuickView] = useState(false);
  
  const { 
    name, 
    image, 
    images, // Firebase format
    price, 
    originalPrice, 
    discount, 
    category,
    rating = 0,
    inStock = true,
    stock // Firebase uses 'stock' number instead of 'inStock' boolean
  } = product;

  // Handle both Firebase format (images array) and legacy format (single image string)
  const productImage = images && images.length > 0 
    ? (images[0].url || images[0]) 
    : image;

  // Determine stock status - Firebase uses numeric stock, legacy uses boolean inStock
  const isInStock = stock !== undefined ? stock > 0 : inStock;

  const handleQuickView = (e) => {
    e.preventDefault();
    setShowQuickView(true);
  };

  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-card-image">
        {discount && (
          <Badge variant="success" className="product-discount-badge">
            -{discount}%
          </Badge>
        )}
        <img src={productImage} alt={name} />
        
        {/* Quick Actions */}
        <div className="product-quick-actions">
          <button className="quick-action-btn" aria-label="Add to wishlist">
            <FiHeart />
          </button>
          <button className="quick-action-btn" aria-label="Quick view" onClick={handleQuickView}>
            <FiEye />
          </button>
          <button className="quick-action-btn primary" aria-label="Add to cart">
            <FiShoppingCart />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-card-info">
        <span className="product-category">{category}</span>
        <h3 className="product-name">{name}</h3>
        
        {/* Rating */}
        <div className="product-rating">
          {[...Array(5)].map((_, index) => (
            <span key={index} className={index < rating ? 'star filled' : 'star'}>
              ★
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="product-price">
          <span className="current-price">₹{price}</span>
          {originalPrice && (
            <span className="original-price">₹{originalPrice}</span>
          )}
        </div>

        {/* Stock Status */}
        {!isInStock && <span className="out-of-stock">Out of Stock</span>}
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <ProductQuickView 
          product={product} 
          onClose={() => setShowQuickView(false)} 
        />
      )}
    </div>
  );
};

export default ProductCard;
