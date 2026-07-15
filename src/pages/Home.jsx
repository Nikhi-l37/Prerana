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
      {/* ── HERO SECTION ─────────────────────────────────────────── */}
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
            style={{ width: '70%', maxWidth: '250px', height: 'auto', marginBottom: '2rem' }}
            variants={fadeUpVariant}
            loading="lazy"
          />
          <motion.p className="product-hero-subtitle" variants={fadeUpVariant}>
            Cooked on firewood. Experience the rich, traditional flavors crafted with passion. Discover the authentic taste of true biryani.
          </motion.p>
          <motion.div className="hero-actions" variants={fadeUpVariant} style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/branches" className="product-hero-btn primary">Find a Branch</Link>
            <Link to="/#contact" className="product-hero-btn secondary">Contact Us</Link>
          </motion.div>
        </motion.div>
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
            <motion.div key={branch.name} variants={fadeUpVariant} whileHover={{ y: -5 }} whileTap={{ scale: 0.98 }}>
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
