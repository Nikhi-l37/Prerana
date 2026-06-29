import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
import s from '../assets/images/s.webp';
import s2 from '../assets/images/s2.jpg';
import s3 from '../assets/images/s3.jpg';

// Home Hero Image
import s10 from '../assets/images/s10.webp';

// Logo
import logoImg from '../assets/images/logo.webp';

const branch1Images = [v1, v2, v];
const branch2Images = [s, s2, s3, s10];
const branch3Images = [v1, s]; // Fallback images for the new branch until specific ones are provided
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

const Home = () => {
  const navigate = useNavigate();
  const isOpen = useStoreStatus();
  const { hash } = useLocation();

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
      <header className="product-hero" id="home">
        <div className="hero-background-wrapper">
          <Swiper
            modules={[Autoplay, EffectFade]}
            effect="fade"
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            allowTouchMove={false}
            className="hero-swiper"
          >
            {heroSliderImages.map((imgSrc, idx) => (
              <SwiperSlide key={idx} className="hero-swiper-slide">
                <img src={imgSrc} alt={`Hero Background ${idx + 1}`} className="product-hero-media" />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="product-hero-overlay"></div>
        </div>

        <motion.div 
          className="product-hero-content"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="product-hero-title" variants={fadeUpVariant}>Prerana Firewood Biryani</motion.h1>
          <motion.p className="product-hero-subtitle" variants={fadeUpVariant}>Cooked on firewood. Experience the rich, traditional flavors crafted with passion.</motion.p>
          <motion.div className="hero-actions" variants={fadeUpVariant}>
            <Link to="/#locations" className="product-hero-btn primary">Find a Branch</Link>
            <Link to="/#reviews" className="product-hero-btn secondary">Read Reviews</Link>
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
          <motion.div variants={fadeUpVariant} whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }} className="branch-card clickable-card" onClick={() => navigate('/branch/marathahalli')}>
            <ImageSlider images={branch1Images} />
              <div className="branch-card-content">
                <span className={`branch-badge ${isOpen ? 'active' : 'closed'}`}>
                  {isOpen ? 'Now Open' : 'Opens at 11:00 AM'}
                </span>
                <h3>Marathahalli Branch</h3>
              <p>182, Service Rd, Manjunatha Layout, Marathahalli, Bengaluru, Karnataka 560037</p>
              <button className="view-branch-btn">View Menu & Details</button>
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariant} whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }} className="branch-card clickable-card" onClick={() => navigate('/branch/chinnapanahalli')}>
            <ImageSlider images={branch2Images} />
              <div className="branch-card-content">
                <span className={`branch-badge ${isOpen ? 'active' : 'closed'}`}>
                  {isOpen ? 'Now Open' : 'Opens at 11:00 AM'}
                </span>
                <h3>Chinnapanahalli Branch</h3>
              <p>PRERANA Firewood Biryani - Chinnapanahalli, Bengaluru</p>
              <button className="view-branch-btn">View Menu & Details</button>
            </div>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="branch-card">
            <div className="image-placeholder soon-placeholder">
              <span>More goodness coming...</span>
            </div>
            <div className="branch-card-content">
              <span className="branch-badge soon">Opening Soon</span>
              <h3>Thanisandra Branch</h3>
              <p>SH 104, Ashwath Nagar, Thanisandra, Bengaluru, Karnataka 560077</p>
            </div>
          </motion.div>
        </motion.div>

        {/* MOBILE SWIPER VIEW */}
        <Swiper
          effect={'creative'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          loop={true}
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
          <SwiperSlide className="branch-swiper-slide" onClick={() => navigate('/branch/marathahalli')}>
            <div className="branch-card clickable-card">
              <ImageSlider images={branch1Images} />
              <div className="branch-card-content">
                <span className={`branch-badge ${isOpen ? 'active' : 'closed'}`}>
                  {isOpen ? 'Now Open' : 'Opens at 11:00 AM'}
                </span>
                <h3>Marathahalli Branch</h3>
                <p>182, Service Rd, Manjunatha Layout, Marathahalli</p>
                <button className="view-branch-btn">View Menu</button>
              </div>
            </div>
          </SwiperSlide>

          {/* BRANCH 2: Chinnapanahalli */}
          <SwiperSlide className="branch-swiper-slide" onClick={() => navigate('/branch/chinnapanahalli')}>
            <div className="branch-card clickable-card">
              <ImageSlider images={branch2Images} />
              <div className="branch-card-content">
                <span className={`branch-badge ${isOpen ? 'active' : 'closed'}`}>
                  {isOpen ? 'Now Open' : 'Opens at 11:00 AM'}
                </span>
                <h3>Chinnapanahalli Branch</h3>
                <p>PRERANA Firewood Biryani - Chinnapanahalli</p>
                <button className="view-branch-btn">View Menu</button>
              </div>
            </div>
          </SwiperSlide>

          {/* BRANCH 3: Opening Soon */}
          <SwiperSlide className="branch-swiper-slide">
            <div className="branch-card">
              <div className="image-placeholder soon-placeholder">
                <span>More goodness coming...</span>
              </div>
              <div className="branch-card-content">
                <span className="branch-badge soon">Opening Soon</span>
                <h3>Thanisandra Branch</h3>
                <p>SH 104, Ashwath Nagar, Thanisandra, Bengaluru, Karnataka 560077</p>
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
          <motion.div variants={fadeUpVariant} className="review-card">
            <div className="stars">★★★★★</div>
            <p className="review-text">"Absolutely the best authentic firewood biryani I have ever tasted! The aroma is incredible and the meat is so tender."</p>
            <p className="review-author">- Rahul S.</p>
          </motion.div>
          <motion.div variants={fadeUpVariant} className="review-card">
            <div className="stars">★★★★★</div>
            <p className="review-text">"Great ambiance and mouth-watering starters. Highly recommend the Guntur Chicken Dry!"</p>
            <p className="review-author">- Priya M.</p>
          </motion.div>
          <motion.div variants={fadeUpVariant} className="review-card">
            <div className="stars">★★★★★</div>
            <p className="review-text">"The true taste of tradition. I drive from across town just for their Dum Biryani. Worth every penny."</p>
            <p className="review-author">- Ankit V.</p>
          </motion.div>
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
          <SwiperSlide className="review-swiper-slide">
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p className="review-text">"Absolutely the best authentic firewood biryani I have ever tasted! The aroma is incredible and the meat is so tender."</p>
              <p className="review-author">- Rahul S.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="review-swiper-slide">
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p className="review-text">"Great ambiance and mouth-watering starters. Highly recommend the Guntur Chicken Dry!"</p>
              <p className="review-author">- Priya M.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="review-swiper-slide">
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p className="review-text">"The true taste of tradition. I drive from across town just for their Dum Biryani. Worth every penny."</p>
              <p className="review-author">- Ankit V.</p>
            </div>
          </SwiperSlide>
          {/* Duplicated slides to ensure Swiper loop works flawlessly on auto-play */}
          <SwiperSlide className="review-swiper-slide">
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p className="review-text">"Absolutely the best authentic firewood biryani I have ever tasted! The aroma is incredible and the meat is so tender."</p>
              <p className="review-author">- Rahul S.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="review-swiper-slide">
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p className="review-text">"Great ambiance and mouth-watering starters. Highly recommend the Guntur Chicken Dry!"</p>
              <p className="review-author">- Priya M.</p>
            </div>
          </SwiperSlide>
          <SwiperSlide className="review-swiper-slide">
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <p className="review-text">"The true taste of tradition. I drive from across town just for their Dum Biryani. Worth every penny."</p>
              <p className="review-author">- Ankit V.</p>
            </div>
          </SwiperSlide>
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
            <p><strong>Open Hours:</strong> 12:00 PM - 11:00 PM</p>
          </motion.div>
          <motion.form variants={fadeUpVariant} className="contact-form" onSubmit={handleContactSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" rows="4" required></textarea>
            <motion.button whileTap={{ scale: 0.95 }} type="submit" className="submit-btn">Send Message</motion.button>
          </motion.form>
        </motion.div>
      </section>

    </>
  );
}

export default Home;
