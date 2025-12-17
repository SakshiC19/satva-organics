import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTruck, FiShield, FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../config/firebase';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import { useCategories } from '../../contexts/CategoryContext';
import ProductCard from '../../components/product/ProductCard';
import HeroSlider from '../../components/home/HeroSlider';
import PromotionalBanners from '../../components/home/PromotionalBanners';
import NewsletterSection from '../../components/layout/NewsletterSection';
import Card from '../../components/common/Card';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoadingProducts(true);
      const productsCollection = collection(db, 'products');
      const productsQuery = query(productsCollection, limit(4));
      const productsSnapshot = await getDocs(productsQuery);
      const productsList = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setFeaturedProducts(productsList);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoadingProducts(false);
    }
  };



  const { categories: contextCategories } = useCategories();
  
  const categories = [
    { name: 'All Products', link: '/shop' },
    ...(contextCategories || []).map(cat => ({
      name: cat.name,
      link: `/shop?category=${cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')}`,
      // Add icon if available in context, or fallback logic could be added here
    }))
  ];

  const features = [
    {
      icon: <FiShield />,
      title: '100% Organic',
      description: 'Certified organic products from trusted farmers'
    },
    {
      icon: <FiTruck />,
      title: 'Free Delivery',
      description: 'Free delivery on orders above ₹500'
    },
    {
      icon: <FiHeart />,
      title: 'Farm Fresh',
      description: 'Directly from farms to your doorstep'
    }
  ];



  return (
    <div className="home-page">
      {/* Hero Section */}
      <HeroSlider />

      {/* PromotionalBanners */}
      <PromotionalBanners />

      {/* Best Seller Section */}
      <section className="best-seller-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Best Seller</h2>
            <div className="section-divider">
               <div className="section-divider-icon"></div>
            </div>
          </div>
          <div className="products-grid">
            {loadingProducts ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                <p>Loading products...</p>
              </div>
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                <p>No products available yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Our Products Section */}
      <section className="products-section" id="products-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Products</h2>
          </div>

          {/* Product Tabs */}
          <div className="product-tabs-container">
            <button className="tab-scroll-btn left tab-prev" aria-label="Scroll left">
              <FiChevronLeft />
            </button>

            <Swiper
              modules={[Navigation]}
              spaceBetween={15}
              slidesPerView={2}
              navigation={{
                prevEl: '.tab-prev',
                nextEl: '.tab-next',
              }}
              breakpoints={{
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="product-tabs-swiper"
            >
              {categories.map((cat, index) => (
                <SwiperSlide key={index}>
                  <button className={`product-tab ${index === 0 ? 'active' : ''}`}>
                    {cat.name}
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
            
            <button className="tab-scroll-btn right tab-next" aria-label="Scroll right">
              <FiChevronRight />
            </button>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {loadingProducts ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                <p>Loading products...</p>
              </div>
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem' }}>
                <p>No products available yet.</p>
              </div>
            )}
          </div>

          {/* View All Button */}
          <div className="products-view-all">
            <button 
              className="btn btn-outline btn-lg"
              onClick={() => navigate('/shop')}
            >
              View All Products
            </button>
          </div>
        </div>
      </section>



      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <Card key={index} className="feature-card" padding="md">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section (Image 0) */}
      <NewsletterSection />
    </div>
  );
};

export default Home;
