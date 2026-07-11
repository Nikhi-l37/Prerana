import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { menuData, branchData } from '../data/MenuData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import v1 from '../assets/images/v1.jpg';
import v2 from '../assets/images/v2.jpg';
import v from '../assets/images/v.jpg';
import v10 from '../assets/images/v10.webp';

import s from '../assets/images/s11_rotated.webp';
import s2 from '../assets/images/s2.jpg';
import s3 from '../assets/images/s3.jpg';
import s10 from '../assets/images/s10.webp';

import new1 from '../assets/images/new1.webp';
import new2 from '../assets/images/new2.webp';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const BranchPage = () => {
  const { branchId } = useParams();
  const branch = branchData[branchId];
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const branchImages = {
    marathahalli: v1,
    chinnapanahalli: s,
    thanisandra: new1
  };
  const currentImage = branchImages[branchId];
  
  const branchGalleries = {
    marathahalli: [v10, v2, v],
    chinnapanahalli: [s2, s3, s10],
    thanisandra: [new1, new2]
  };
  const galleryImages = branchGalleries[branchId];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!branch) {
    return (
      <div className="branch-not-found">
        <h2>Branch not found</h2>
        <Link to="/" className="map-link-btn">Return to Home</Link>
      </div>
    );
  }

  const categories = ['All', ...Object.keys(menuData)];

  // Filter logic
  const filteredMenu = Object.entries(menuData).map(([categoryName, items]) => {
    // If a specific category is selected and it doesn't match this one, return empty array
    if (selectedCategory !== 'All' && categoryName !== selectedCategory) {
      return [categoryName, []];
    }
    
    // Filter items by search term
    const filteredItems = items.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return [categoryName, filteredItems];
  }).filter(([_, items]) => items.length > 0); // Remove categories with no matching items

  return (
    <div className="branch-page">
      <div className="back-button-container" style={{ paddingBottom: '1rem', paddingLeft: '5%', paddingTop: '75px' }}>
        <button 
          onClick={() => navigate(-1)} 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#d84315',
            fontWeight: '600',
            fontSize: '1.1rem',
            cursor: 'pointer',
            padding: '8px 0',
            transition: 'color 0.2s ease',
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#bf360c'}
          onMouseOut={(e) => e.currentTarget.style.color = '#d84315'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </button>
      </div>

      <motion.header 
        className="branch-header-split"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div className="branch-header-content" variants={fadeUpVariant}>
          <h1>{branch.name}</h1>
          <p>{branch.address}</p>
          <motion.a whileTap={{ scale: 0.95 }} href={branch.mapLink} target="_blank" rel="noopener noreferrer" className="map-link-btn">Open in Google Maps</motion.a>
        </motion.div>
        <motion.div className="branch-header-image" variants={fadeUpVariant}>
          {currentImage && <img src={currentImage} alt={branch.name} />}
        </motion.div>
      </motion.header>

      <motion.section 
        className="branch-map-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariant}
      >
        <iframe 
          title={`${branch.name} Map`}
          src={branch.mapEmbedUrl}
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="branch-map-iframe">
        </iframe>
      </motion.section>

      {/* GALLERY SECTION (Swiper Auto-Loop) */}
      {galleryImages && galleryImages.length > 0 && (
        <section 
          className="branch-gallery-section"
          style={{ 
            padding: '2rem 0', 
            background: 'transparent', 
            maxWidth: '1200px', 
            margin: '0 auto',
            paddingBottom: '4rem'
          }}
        >
          <Swiper
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 15 },
              768: { slidesPerView: 1.5, spaceBetween: 20 },
              1024: { slidesPerView: 2.2, spaceBetween: 30 }
            }}
            centeredSlides={true}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="branch-gallery-swiper"
            style={{ padding: '20px 0' }}
          >
            {[...galleryImages, ...galleryImages].map((img, idx) => (
              <SwiperSlide key={idx} className="review-swiper-slide">
                <img 
                  src={img} 
                  alt={`${branch.name} gallery ${idx + 1}`} 
                  style={{ 
                    width: '100%', 
                    height: '340px', 
                    borderRadius: '15px', 
                    objectFit: 'cover', 
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
                    display: 'block'
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      <section className="branch-menu-section">
        <h2 className="menu-title">Our Menu</h2>
        
        {/* Sticky Filter Bar */}
        <div className="menu-filters-container">
          <div className="category-chips-wrapper">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredMenu.length === 0 ? (
          <div className="no-items-found">
            <p>No dishes found matching your search for "{searchTerm}".</p>
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>Clear Search</button>
          </div>
        ) : (
          filteredMenu.map(([categoryName, items]) => (
            <motion.div 
              key={categoryName} 
              className="menu-category"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              <motion.h3 className="category-title" variants={fadeUpVariant}>{categoryName}</motion.h3>
              <div className="menu-table-container">
                <table className="menu-table">
                  <thead>
                    <tr>
                      <th>Dish Name</th>
                      <th className="price-col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <motion.tr key={idx} variants={fadeUpVariant}>
                        <td className="dish-name-cell">{item.name}</td>
                        <td className="price-cell">₹{item.price}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))
        )}
      </section>
    </div>
  );
};

export default BranchPage;
