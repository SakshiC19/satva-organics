import React from 'react';
import './PromotionalBanners.css';

const PromotionalBanners = () => {
  return (
    <section className="promotional-banners">
      <div className="container">
        <div className="banners-grid">
          {/* Banner 1 */}
          <div className="promo-banner banner-1">
            <div className="banner-content">
              <span className="banner-subtitle">Fresh</span>
              <h3 className="banner-title">Bread Products</h3>
              <p className="banner-offer">SALE UP TO 40% OFF</p>
              <button className="banner-btn">DISCOVER SOON</button>
            </div>
            <div className="banner-image">
              <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400" alt="Bread Products" />
            </div>
          </div>

          {/* Banner 2 */}
          <div className="promo-banner banner-2">
            <div className="banner-content">
              <span className="banner-subtitle">Fresh</span>
              <h3 className="banner-title">Chilli Organic</h3>
              <p className="banner-offer">SALE UP TO 70% OFF</p>
              <button className="banner-btn">DISCOVER SOON</button>
            </div>
            <div className="banner-image">
              <img src="https://images.unsplash.com/photo-1588252303782-cb80119abd6d?w=400" alt="Chilli Organic" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanners;
