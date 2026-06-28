import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Branch 1 Images
import v from './v.jpg';
import v1 from './v1.jpg';
import v3 from './v3.jpg';
import v4 from './v4.webp';
import v5 from './v5.jpg';

// Branch 2 Images
import s1 from './s1.jpg';
import s2 from './s2.jpg';
import s3 from './s3.jpg';
import s5 from './s5.webp';
import s6 from './s6.jfif';

const branch1Images = [v, v1, v3, v4, v5];
const branch2Images = [s1, s2, s3, s5, s6];

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) {
    return <div className="image-placeholder">Image Space</div>;
  }

  return (
    <div className="slider-container">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Branch Slide ${index + 1}`}
          className={`slider-image ${index === currentIndex ? 'active' : ''}`}
        />
      ))}
      {images.length > 1 && (
        <div className="slider-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO SECTION */}
      <header className="product-hero" id="home">
        <div className="hero-background-wrapper">
          <img src={v} alt="Hyderabadi Dum Biryani" className="product-hero-media" />
          <div className="product-hero-overlay"></div>
        </div>

        <div className="product-hero-content">
          <span className="hero-badge">Authentic Taste</span>
          <h1 className="product-hero-title">Hyderabadi Dum Biryani</h1>
          <p className="product-hero-subtitle">Cooked on firewood. Experience the rich, traditional flavors crafted with passion.</p>
          <div className="hero-actions">
            <a href="#locations" className="product-hero-btn primary">Find a Branch</a>
            <a href="#reviews" className="product-hero-btn secondary">Read Reviews</a>
          </div>
        </div>
      </header>

      {/* LOCATIONS SECTION */}
      <section className="locations-section" id="locations">
        <h2 className="locations-title">Find Us</h2>
        
        <div className="locations-grid">
          
          {/* BRANCH 1: Marathahalli */}
          <div className="branch-card clickable-card" onClick={() => navigate('/branch/marathahalli')}>
            <ImageSlider images={branch1Images} />
            <div className="branch-card-content">
              <span className="branch-badge active">Now Open</span>
              <h3>Marathahalli Branch</h3>
              <p>182, Service Rd, Manjunatha Layout, Marathahalli, Bengaluru, Karnataka 560037</p>
              <button className="view-branch-btn">View Menu & Details</button>
            </div>
          </div>

          {/* BRANCH 2: Chinnapanahalli */}
          <div className="branch-card clickable-card" onClick={() => navigate('/branch/chinnapanahalli')}>
            <ImageSlider images={branch2Images} />
            <div className="branch-card-content">
              <span className="branch-badge active">Now Open</span>
              <h3>Chinnapanahalli Branch</h3>
              <p>PRERANA Firewood Biryani - Chinnapanahalli, Bengaluru</p>
              <button className="view-branch-btn">View Menu & Details</button>
            </div>
          </div>

          {/* BRANCH 3: Opening Soon */}
          <div className="branch-card">
            <div className="image-placeholder soon-placeholder">
              <span>More goodness coming...</span>
            </div>
            <div className="branch-card-content">
              <span className="branch-badge soon">Opening Soon</span>
              <h3>Third Branch</h3>
              <p>Stay tuned for our new location announcement!</p>
            </div>
          </div>

        </div>
      </section>

      {/* REVIEWS SECTION */}
      <section className="reviews-section" id="reviews">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="reviews-grid">
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p className="review-text">"Absolutely the best authentic firewood biryani I have ever tasted! The aroma is incredible and the meat is so tender."</p>
            <p className="review-author">- Rahul S.</p>
          </div>
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p className="review-text">"Great ambiance and mouth-watering starters. Highly recommend the Guntur Chicken Dry!"</p>
            <p className="review-author">- Priya M.</p>
          </div>
          <div className="review-card">
            <div className="stars">★★★★★</div>
            <p className="review-text">"The true taste of tradition. I drive from across town just for their Dum Biryani. Worth every penny."</p>
            <p className="review-author">- Ankit V.</p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section" id="contact">
        <h2 className="section-title">Get in Touch</h2>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> info@preranafirewoodbiryani.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Open Hours:</strong> 12:00 PM - 11:00 PM</p>
          </div>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <textarea placeholder="Your Message" rows="4" required></textarea>
            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </div>
      </section>

    </>
  );
}

export default Home;
