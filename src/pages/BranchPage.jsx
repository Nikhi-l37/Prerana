import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { menuData, branchData } from '../data/MenuData';

import branch1Img from '../assets/images/v1.jpg';
import branch2Img4 from '../assets/images/s11_rotated.webp';

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
    marathahalli: branch1Img,
    chinnapanahalli: branch2Img4
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

      {/* Branch Reviews Section */}
      <section className="branch-reviews-section" style={{ paddingBottom: '4rem' }}>
        <h2 className="menu-title" style={{ marginTop: '2rem' }}>What Our Customers Say</h2>
        <div className="reviews-grid">
          {[
            { 
              text: "If you’re a true biryani lover, this place is a must-visit! The authentic firewood-cooked aroma itself sets the mood... The biryani is perfectly spiced, flavorful, and cooked to perfection. One of the best spots for proper, traditional firewood biryani. 🔥🍗", 
              author: "Pavan Kalyan Munduru" 
            },
            { 
              text: "Biryani is super delicious worth for the money that you spent. Enough quantity for a single person. Highly recommend to try boneless chicken biryani.", 
              author: "Harsha Vardhan" 
            },
            { 
              text: "Biryani is nice, maintenance and service is excellent and tasty is 😋", 
              author: "Sivada Nikhil Reddy" 
            },
            { 
              text: "We ordered guntur briyani it was good and service was fab .", 
              author: "B Vaishnavi" 
            }
          ].map((review, idx) => (
            <motion.div 
              key={idx} 
              className="review-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUpVariant}
            >
              <div className="stars">★★★★★</div>
              <p className="review-text">"{review.text}"</p>
              <p className="review-author">- {review.author}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BranchPage;
