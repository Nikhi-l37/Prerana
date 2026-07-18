import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';

import ImageSlider from '../components/ImageSlider';
import { useStoreStatus } from '../hooks/useStoreStatus';
import { REVIEWS } from '../data/reviews';

// Branch Images
import v1 from '../assets/images/v1.jpg';
import s from '../assets/images/s11_rotated.webp';
import new2 from '../assets/images/new2.webp';
import s10 from '../assets/images/s10.webp';
import logoImg from '../assets/images/logo.webp';

const branch1Images = [v1];
const branch2Images = [s];
const branch3Images = [new2];

// ── Animation Variants ────────────────────────────────────────────
const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

// ── ReviewCard Component ──────────────────────────────────────────
const ReviewCard = ({ review, onMoreClick }) => {
  const MAX_LENGTH = 110;
  const shouldTruncate = review.text.length > MAX_LENGTH;
  return (
    <div className="review-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div className="stars">★★★★★</div>
      <p className="review-text" style={{ flexGrow: 1, whiteSpace: 'pre-wrap' }}>
        "{shouldTruncate ? review.text.slice(0, MAX_LENGTH) + '...' : review.text}"
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
};

// ── Home Page ─────────────────────────────────────────────────────
const Home = () => {
  const isOpen = useStoreStatus();
  const { hash } = useLocation();
  const [selectedReview, setSelectedReview] = useState(null);

  // Scroll to hash anchor on navigation
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
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

  const handleOrderRedirect = (e, platform) => {
    e.preventDefault();
    
    let webUrl;
    if (platform === 'zomato') {
      webUrl = 'https://www.zomato.com/bangalore/restaurants?q=Prerana+Firewood+Biryani';
    } else {
      webUrl = 'https://www.swiggy.com/search?query=Prerana+Firewood+Biryani';
    }
    
    // Open directly in a new tab — fast and reliable on all devices
    window.open(webUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      {/* ── HERO SECTION ─────────────────────────────────────────── */}
      <header className="product-hero" id="home" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '4rem' }}>
        <img
          src={logoImg}
          alt="Prerana Firewood Biryani Logo"
          style={{ width: '70%', maxWidth: '250px', height: 'auto', marginBottom: '2rem' }}
          loading="eager"
        />
        <div
          className="product-hero-content"
          style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
        >
          <p className="product-hero-subtitle">
            Cooked on firewood. Experience the rich, traditional flavors crafted with passion. Discover the authentic taste of true biryani.
          </p>
          <div className="hero-actions" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/branches" className="product-hero-btn primary">Find a Branch</Link>
            <Link to="/#contact" className="product-hero-btn secondary">Contact Us</Link>
          </div>
        </div>
      </header>

      {/* ── LOCATIONS SECTION ────────────────────────────────────── */}
      <section className="locations-section" id="locations">
        <motion.h2
          className="locations-title"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          Find Us
        </motion.h2>

        {/* Desktop Grid */}
        <motion.div
          className="locations-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {[
            { images: branch1Images, name: 'Marathahalli Branch', address: '182, Service Rd, Manjunatha Layout, Marathahalli, Bengaluru, Karnataka 560037' },
            { images: branch2Images, name: 'Chinnapanahalli Branch', address: 'PRERANA Firewood Biryani - Chinnapanahalli, Bengaluru' },
            { images: branch3Images, name: 'Thanisandra Branch', address: 'PRERANA FIREWOOD BIRYANI, SH 104, Ashwath Nagar, Thanisandra, Bengaluru, Karnataka 560077' },
          ].map((branch) => (
            <motion.div key={branch.name} variants={fadeUpVariant}>
              <div className="branch-card">
                <ImageSlider images={branch.images} />
                <div className="branch-card-content">
                  <span className={`branch-badge ${isOpen ? 'active' : 'closed'}`}>
                    {isOpen ? 'Now Open' : 'Opens at 11:00 AM'}
                  </span>
                  <h3>{branch.name}</h3>
                  <p>{branch.address}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Swiper */}
        <Swiper
          effect="creative"
          centeredSlides={true}
          slidesPerView="auto"
          loop={false}
          creativeEffect={{
            limitProgress: 2,
            prev: { translate: ['-75%', 0, -200], opacity: 0.35 },
            next: { translate: ['75%', 0, -200], opacity: 0.35 },
          }}
          modules={[EffectCreative, Pagination]}
          className="branches-swiper mobile-only"
        >
          {[
            { images: branch1Images, name: 'Marathahalli Branch', address: '182, Service Rd, Manjunatha Layout, Marathahalli' },
            { images: branch2Images, name: 'Chinnapanahalli Branch', address: 'PRERANA Firewood Biryani - Chinnapanahalli' },
            { images: branch3Images, name: 'Thanisandra Branch', address: 'PRERANA FIREWOOD BIRYANI, SH 104, Ashwath Nagar, Thanisandra' },
          ].map((branch) => (
            <SwiperSlide key={branch.name} className="branch-swiper-slide">
              <div className="branch-card" style={{ display: 'flex', flexDirection: 'column', color: 'inherit' }}>
                <ImageSlider images={branch.images} />
                <div className="branch-card-content">
                  <span className={`branch-badge ${isOpen ? 'active' : 'closed'}`}>
                    {isOpen ? 'Now Open' : 'Opens at 11:00 AM'}
                  </span>
                  <h3>{branch.name}</h3>
                  <p>{branch.address}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ── ORDER ONLINE SECTION ─────────────────────────────────── */}
      <section className="py-16 border-t border-b border-[#d84315]/10" id="order-online">
        <div className="max-w-6xl mx-auto px-5 md:px-[5%] text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-[#2c1e16] tracking-wide"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            Order Online
          </motion.h2>
          <motion.div 
            className="w-24 h-[3px] bg-gradient-to-r from-transparent via-[#d84315] to-transparent mx-auto mb-8"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          />
          <motion.p
            className="text-[1.1rem] text-[#5d4a41] max-w-2xl mx-auto mb-12 leading-relaxed"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            Craving our authentic firewood biryani? Get your favorite dishes delivered hot and fresh straight to your doorstep via Zomato or Swiggy.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center items-stretch gap-8 max-w-3xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {/* Zomato Card */}
            <motion.div
              variants={fadeUpVariant}
              className="w-full sm:w-1/2 p-8 rounded-2xl bg-white border border-[#E23744]/20 shadow-[0_8px_30px_rgba(226,55,68,0.04)] hover:shadow-[0_15px_35px_rgba(226,55,68,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between items-center text-center"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#E23744]/10 flex items-center justify-center mb-6">
                  <img 
                    src="https://cdn.simpleicons.org/zomato/E23744" 
                    alt="Zomato" 
                    className="w-8 h-8 object-contain" 
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#2c1e16] mb-3">Zomato</h3>
                <p className="text-[0.95rem] text-[#5d4a41] leading-relaxed mb-8">
                  Enjoy super-fast delivery, real-time tracking, and exclusive discounts when ordering through Zomato.
                </p>
              </div>
              <a
                href="https://www.zomato.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleOrderRedirect(e, 'zomato')}
                className="w-full py-3.5 bg-[#E23744] text-white font-bold rounded-xl hover:bg-[#c82733] transition-colors shadow-[0_4px_20px_rgba(226,55,68,0.25)] flex items-center justify-center gap-2"
              >
                Order on Zomato
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>

            {/* Swiggy Card */}
            <motion.div
              variants={fadeUpVariant}
              className="w-full sm:w-1/2 p-8 rounded-2xl bg-white border border-[#FC8019]/20 shadow-[0_8px_30px_rgba(252,128,25,0.04)] hover:shadow-[0_15px_35px_rgba(252,128,25,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between items-center text-center"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#FC8019]/10 flex items-center justify-center mb-6">
                  <img 
                    src="https://cdn.simpleicons.org/swiggy/FC8019" 
                    alt="Swiggy" 
                    className="w-8 h-8 object-contain" 
                  />
                </div>
                <h3 className="text-2xl font-bold text-[#2c1e16] mb-3">Swiggy</h3>
                <p className="text-[0.95rem] text-[#5d4a41] leading-relaxed mb-8">
                  Get your favorite biryanis delivered hot from the firewood clay pots straight to your table via Swiggy.
                </p>
              </div>
              <a
                href="https://www.swiggy.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => handleOrderRedirect(e, 'swiggy')}
                className="w-full py-3.5 bg-[#FC8019] text-white font-bold rounded-xl hover:bg-[#e46f10] transition-colors shadow-[0_4px_20px_rgba(252,128,25,0.25)] flex items-center justify-center gap-2"
              >
                Order on Swiggy
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── REVIEWS SECTION ──────────────────────────────────────── */}
      <section className="reviews-section" id="reviews">
        <motion.h2
          className="section-title"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          What Our Customers Say
        </motion.h2>

        {/* Desktop Grid */}
        <motion.div
          className="reviews-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {REVIEWS.map((review, idx) => (
            <motion.div key={idx} variants={fadeUpVariant} style={{ height: '100%' }}>
              <ReviewCard review={review} onMoreClick={setSelectedReview} />
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Swiper */}
        <Swiper
          slidesPerView={1.3}
          centeredSlides={true}
          loop={true}
          spaceBetween={20}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
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

      {/* ── CONTACT SECTION ──────────────────────────────────────── */}
      <section className="contact-section" id="contact">
        <motion.h2
          className="section-title"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          Get in Touch
        </motion.h2>
        <motion.div
          className="contact-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
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

      {/* ── REVIEW MODAL ─────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}
            onClick={() => setSelectedReview(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ maxWidth: '500px', width: '100%', maxHeight: '80vh', overflowY: 'auto', backgroundColor: '#fff', borderRadius: '15px', padding: '30px', position: 'relative' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="stars">★★★★★</div>
              <p className="review-text" style={{ whiteSpace: 'pre-wrap', marginBottom: '20px' }}>"{selectedReview.text}"</p>
              <p className="review-author" style={{ fontWeight: 'bold' }}>- {selectedReview.author}</p>
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  onClick={() => setSelectedReview(null)}
                  style={{ background: 'none', color: '#d84315', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', padding: '10px 20px', borderRadius: '5px', border: '2px solid #d84315' }}
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
};

export default Home;
