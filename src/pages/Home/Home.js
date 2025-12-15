import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiTruck, FiShield, FiHeart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { db } from '../../config/firebase';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import ProductCard from '../../components/product/ProductCard';
import PromotionalBanners from '../../components/home/PromotionalBanners';
import NewsletterSection from '../../components/layout/NewsletterSection';
import { useAuth } from '../../contexts/AuthContext';
import { useCategories } from '../../contexts/CategoryContext';
import './Home.css';

const Home = () => {
  const { currentUser } = useAuth();
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

  const handleShopNowClick = (e) => {
    e.preventDefault();
    if (currentUser) {
      navigate('/shop');
    } else {
      navigate('/login');
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

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '500+', label: 'Organic Products' },
    { number: '100+', label: 'Partner Farmers' },
    { number: '50+', label: 'Cities Served' }
  ];

  const testimonials = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      quote: 'Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      name: 'Rosalina D. William',
      role: 'Founder'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      quote: 'Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      name: 'John Anderson',
      role: 'CEO'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      quote: 'Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      name: 'Sarah Mitchell',
      role: 'Marketing Director'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      quote: 'Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      name: 'Michael Chen',
      role: 'Product Manager'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      quote: 'Lorem ipsum dolor sit amet, consectetur adipi sicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      name: 'Emily Roberts',
      role: 'Customer'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <Badge variant="success" size="sm" className="hero-badge">
                100% genuine Products
              </Badge>
              <h1 className="hero-title">
                Tasty & Healthy
                <span className="hero-highlight"> Organic Food</span>
              </h1>
              <div className="hero-actions">
                <Button variant="primary" size="lg" onClick={handleShopNowClick}>
                  Shop Now
                </Button>
              </div>
            </div>

            <div className="hero-image">
              <div className="hero-image-wrapper">
                <div className="hero-placeholder">
                  <img src="/hero-vegetables.png" alt="Fresh Organic Vegetables" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Carousel Dots */}
          <div className="hero-carousel-dots">
            <button className="carousel-dot active" aria-label="Slide 1"></button>
            <button className="carousel-dot" aria-label="Slide 2"></button>
          </div>
        </div>
      </section>

      {/* Promotional Banners (Image 3) */}
      <PromotionalBanners />

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
              onClick={() => {
                const productsSection = document.getElementById('products-section');
                if (productsSection) {
                  productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <p className="section-label">// TESTIMONIALS</p>
            <h2 className="section-title">Clients Feedbacks.</h2>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="testimonial-card">
                  <div className="testimonial-content">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="testimonial-image"
                    />
                    <div className="testimonial-text">
                      <p className="testimonial-quote">
                        {testimonial.quote}
                      </p>
                      <h4 className="testimonial-name">{testimonial.name}</h4>
                      <p className="testimonial-role">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Features Section (Existing) */}
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

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
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
