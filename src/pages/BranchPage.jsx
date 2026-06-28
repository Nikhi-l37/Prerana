import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { menuData, branchData } from '../data/MenuData';

import branch1Img from '../assets/images/v1.jpg';
import branch2Img from '../assets/images/s.webp';

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
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const branchImages = {
    marathahalli: branch1Img,
    chinnapanahalli: branch2Img
  };
  const currentImage = branchImages[branchId];

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

      <section className="branch-menu-section">
        <h2 className="menu-title">Our Menu</h2>
        
        {/* Sticky Filter Bar */}
        <div className="menu-filters-container">
          <div className="search-bar-wrapper">
            <input 
              type="text" 
              className="menu-search-input" 
              placeholder="Search for a dish... (e.g. Chicken, Paneer)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
              <div className="menu-items-grid">
                {items.map((item, idx) => (
                  <motion.div key={idx} className="menu-item-card" variants={fadeUpVariant}>
                    <div className="menu-item-info">
                      <h4>{item.name} - ₹{item.price}</h4>
                      <ul className="menu-item-desc">
                        <li>Authentic preparation</li>
                        <li>Secret spice blend</li>
                        <li>Fresh ingredients</li>
                      </ul>
                    </div>
                    <div className="menu-item-image-placeholder">
                      {/* Placeholder for future images */}
                      <span>{item.name} Image Coming Soon</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </section>
    </div>
  );
};

export default BranchPage;
