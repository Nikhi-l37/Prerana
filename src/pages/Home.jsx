import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination, EffectFade, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Branch 1 Images
import v1 from '../assets/images/v1.jpg';
import v2 from '../assets/images/v2.jpg';
import v from '../assets/images/v.jpg';

// Branch 2 Images
import s from '../assets/images/s11_rotated.webp';
import s2 from '../assets/images/s2.jpg';
import s3 from '../assets/images/s3.jpg';

// Branch 3 Images
import new1 from '../assets/images/new1.webp';
import new2 from '../assets/images/new2.webp';

// Home Hero Image
import s10 from '../assets/images/s10.webp';

// Logo
import logoImg from '../assets/images/logo.webp';

const branch1Images = [v1];
const branch2Images = [s];
const branch3Images = [new2];
const heroSliderImages = [v1, s10];

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

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const useStoreStatus = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      // Use IST time zone
      const istTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
      const hours = istTime.getHours();
      
      // Open from 11:00 AM to 11:00 PM (11 to 23)
      if (hours >= 11 && hours < 23) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };
    
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return isOpen;
};

const REVIEWS = [
  { text: "Biryani is nice , maintenance and service is excellent and tasty is 😋", author: "Sivada Nikhil Reddy" },
  { text: "Biryani is super delicious worth for the money that you spent. Enough quantity for a single person. Highly recommend to try boneless chicken biryani with glass bottle 7up or Pepsi.", author: "Harsha Vardhan" },
  { text: "If you’re a true biryani lover, this place is a must-visit! The authentic firewood-cooked aroma itself sets the mood before you even take the first bite. The biryani is perfectly spiced, flavorful, and cooked to perfection with tender, juicy pieces. The quantity is satisfying, pricing is reasonable, and the taste feels authentic and homely. The staff is polite and service is quick even during busy hours. One of the best spots in Marathahalli for proper, traditional firewood biryani. Definitely coming back again! 🔥🍗", author: "Pavan Kalyan Munduru" },
  { text: "We had dinner here and the taste of food was good and budget friendly.", author: "Vinay Kumar" },
  { text: "We ordered guntur briyani it was good and service was fab .", author: "B Vaishnavi" },
  { text: "Must Visit for Biryani Lovers. Visited 1st time & its all worth.", author: "Mouneesha P" }
];

const ReviewCard = ({ review, onMoreClick }) => {
  const MAX_LENGTH = 110;
  const shouldTruncate = review.text.length > MAX_LENGTH;
  
  const content = (
    <div className="review-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="stars">★★★★★</div>
      <p className="review-text" style={{ flexGrow: 1, whiteSpace: 'pre-wrap' }}>
        "{shouldTruncate ? review.text.slice(0, MAX_LENGTH) + "..." : review.text}"
        {shouldTruncate && (
          <span 
            onClick={() => onMoreClick(review)} 
            style={{ color: '#d84315', cursor: 'pointer', fontWeight: 'bold', marginLeft: '5px' }}
          >
            more
          </span>
        )}
      </p>
      <p className="review-author" style={{ marginTop: 'auto' }}>- {review.author}</p>
    </div>
  );

  return content;
};

const Home = () => {
  const navigate = useNavigate();
  const isOpen = useStoreStatus();
  const { hash } = useLocation();
  const [selectedReview, setSelectedReview] = useState(null);

  // Scroll to hash elements automatically
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          // Subtract the height of the sticky navbar (e.g. 80px) for smooth alignment
          const yOffset = -80; 
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    const subject = encodeURIComponent(`New Contact Form Submission from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    
    window.location.href = `mailto:Preranafirewoodbiryani@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <>
      {/* HERO SECTION */}
      <header className="product-hero" id="home" style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <motion.div 
          className="product-hero-content"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginTop: '4rem' }}
        >
          <motion.img 
            src={logoImg} 
            alt="Prerana Firewood Biryani Logo" 
            style={{ width: '70%', maxWidth: '250px', height: 'auto', dropShadow: '0 10px 20px rgba(0,0,0,0.1)', marginBottom: '2rem' }}
            variants={fadeUpVariant}
          />
          <motion.p className="product-hero-subtitle" variants={fadeUpVariant}>Cooked on firewood. Experience the rich, traditional flavors crafted with passion. Discover the authentic taste of true biryani.</motion.p>
          <motion.div className="hero-actions" variants={fadeUpVariant} style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/branches" className="product-hero-btn primary">Find a Branch</Link>
            <Link to="/#contact" className="product-hero-btn secondary">Contact Us</Link>
          </motion.div>
        </motion.div>
      </header>

      {/* LOCATIONS SECTION */}
      <section className="locations-section" id="locations">
        <motion.h2 
          className="locations-title"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          Find Us
        </motion.h2>
        
        {/* DESKTOP GRID VIEW */}
        <motion.div 
          className="locations-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUpVariant} whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
            <div className="branch-card">
              <ImageSlider images={branch1Images} />
              <div className="branch-card-content">
                <span className={`branch-badge ${isOpen ? 'active' : 'closed'}`}>
                  {isOpen ? 'Now Open' : 'Opens at 11:00 AM'}
                </span>
                <h3>Marathahalli Branch</h3>
                <p>182, Service Rd, Manjunatha Layout, Marathahalli, Bengaluru, Karnataka 560037</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariant} whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
            <div className="branch-card">
              <ImageSlider images={branch2Images} />
              <div className="branch-card-content">
                <span className={`branch-badge ${isOpen ? 'active' : 'closed'}`}>
                  {isOpen ? 'Now Open' : 'Opens at 11:00 AM'}
                </span>
                <h3>Chinnapanahalli Branch</h3>
                <p>PRERANA Firewood Biryani - Chinnapanahalli, Bengaluru</p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariant} whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
            <div className="branch-card">
              <ImageSlider images={branch3Images} />
              <div className="branch-card-content">
                <span className={`branch-badge ${isOpen ? 'active' : 'closed'}`}>
                  {isOpen ? 'Now Open' : 'Opens at 11:00 AM'}
                </span>
                <h3>Thanisandra Branch</h3>
                <p>PRERANA FIREWOOD BIRYANI, SH 104, Ashwath Nagar, Thanisandra, Bengaluru, Karnataka 560077</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* MOBILE SWIPER VIEW */}
        <Swiper
          effect={'creative'}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={false}
          creativeEffect={{
            limitProgress: 2,
            prev: {
              translate: ['-75%', 0, -200],
              opacity: 0.35,
            },
            next: {
              translate: ['75%', 0, -200],
              opacity: 0.35,
            },
          }}
          modules={[EffectCreative, Pagination]}
          className="branches-swiper mobile-only"
        >
          {/* BRANCH 1: Marathahalli */}
          <SwiperSlide className="branch-swiper-slide">
            <div className="branch-card" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}>
              <ImageSlider images={branch1Images} />
              <div className="branch-card-content">
                <span className={`branch-badge ${isOpen ? 'active' : 'closed'}`}>
                  {isOpen ? 'Now Open' : 'Opens at 11:00 AM'}
                </span>
                <h3>Marathahalli Branch</h3>
                <p>182, Service Rd, Manjunatha Layout, Marathahalli</p>
              </div>
            </div>
          </SwiperSlide>

          {/* BRANCH 2: Chinnapanahalli */}
          <SwiperSlide className="branch-swiper-slide">
            <div className="branch-card" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}>
              <ImageSlider images={branch2Images} />
              <div className="branch-card-content">
                <span className={`branch-badge ${isOpen ? 'active' : 'closed'}`}>
                  {isOpen ? 'Now Open' : 'Opens at 11:00 AM'}
                </span>
                <h3>Chinnapanahalli Branch</h3>
                <p>PRERANA Firewood Biryani - Chinnapanahalli</p>
              </div>
            </div>
          </SwiperSlide>

          {/* BRANCH 3: Thanisandra */}
          <SwiperSlide className="branch-swiper-slide">
            <div className="branch-card" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}>
              <ImageSlider images={branch3Images} />
              <div className="branch-card-content">
                <span className={`branch-badge ${isOpen ? 'active' : 'closed'}`}>
                  {isOpen ? 'Now Open' : 'Opens at 11:00 AM'}
                </span>
                <h3>Thanisandra Branch</h3>
                <p>PRERANA FIREWOOD BIRYANI, SH 104, Ashwath Nagar, Thanisandra</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* REVIEWS SECTION */}
      <section className="reviews-section" id="reviews">
        <motion.h2 
          className="section-title"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          What Our Customers Say
        </motion.h2>
        
        {/* DESKTOP GRID VIEW */}
        <motion.div 
          className="reviews-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {REVIEWS.map((review, idx) => (
            <motion.div key={idx} variants={fadeUpVariant} style={{ height: '100%' }}>
              <ReviewCard review={review} onMoreClick={setSelectedReview} />
            </motion.div>
          ))}
        </motion.div>

        {/* MOBILE SWIPER VIEW */}
        <Swiper
          slidesPerView={1.3}
          centeredSlides={true}
          loop={true}
          spaceBetween={20}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="reviews-swiper mobile-only"
        >
          {REVIEWS.map((review, idx) => (
            <SwiperSlide key={idx} className="review-swiper-slide">
              <ReviewCard review={review} onMoreClick={setSelectedReview} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* CONTACT SECTION */}
      <section className="contact-section" id="contact">
        <motion.h2 
          className="section-title"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          Get in Touch
        </motion.h2>
        <motion.div 
          className="contact-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div variants={fadeUpVariant} className="contact-info">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> Preranafirewoodbiryani@gmail.com</p>
            <p><strong>Phone:</strong> 8884523789, 8886097771</p>
            <p><strong>Open Hours:</strong> 11:00 AM - 11:00 PM</p>
          </motion.div>
          <motion.form variants={fadeUpVariant} className="contact-form" onSubmit={handleContactSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" rows="4" required></textarea>
            <motion.button whileTap={{ scale: 0.95 }} type="submit" className="submit-btn">Send Message</motion.button>
          </motion.form>
        </motion.div>
      </section>

      {/* REVIEW MODAL */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div 
            className="review-modal-overlay" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999,
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              padding: '20px'
            }}
            onClick={() => setSelectedReview(null)}
          >
            <motion.div 
              className="review-card"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{ 
                maxWidth: '500px', width: '100%', maxHeight: '80vh', overflowY: 'auto',
                backgroundColor: '#fff', borderRadius: '15px', padding: '30px',
                position: 'relative', margin: '0'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="stars">★★★★★</div>
              <p className="review-text" style={{ whiteSpace: 'pre-wrap', marginBottom: '20px', flexGrow: 0 }}>
                "{selectedReview.text}"
              </p>
              <p className="review-author" style={{ fontWeight: 'bold' }}>- {selectedReview.author}</p>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button 
                  onClick={() => setSelectedReview(null)}
                  style={{ 
                    background: 'none', color: '#d84315', 
                    fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem',
                    padding: '10px 20px', borderRadius: '5px',
                    border: '2px solid #d84315'
                  }}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Home;
