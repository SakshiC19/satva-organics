import React from 'react';
import './ProductCard.css';
import { FiShoppingCart, FiHeart, FiEye } from 'react-icons/fi';
import Badge from '../common/Badge';

const ProductCard = ({ 
  product 
}) => {
  const { 
    name, 
    image, 
    price, 
    originalPrice, 
    discount, 
    category,
    rating = 0,
    inStock = true 
  } = product;

  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-card-image">
        {discount && (
          <Badge variant="success" className="product-discount-badge">
            -{discount}%
          </Badge>
        )}
        <img src={image} alt={name} />
        
        {/* Quick Actions */}
        <div className="product-quick-actions">
          <button className="quick-action-btn" aria-label="Add to wishlist">
            <FiHeart />
          </button>
          <button className="quick-action-btn" aria-label="Quick view">
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
        {!inStock && <span className="out-of-stock">Out of Stock</span>}
      </div>
    </div>
  );
};

export default ProductCard;
