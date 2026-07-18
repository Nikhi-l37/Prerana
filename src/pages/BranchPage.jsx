import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { branchMenus, branchData } from '../data/MenuData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import MenuBook from '../components/MenuBook';

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
import new5 from '../assets/images/new5.webp';
import new6 from '../assets/images/new6.webp';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const BranchPage = () => {
  const { branchId } = useParams();
  const branch = branchData[branchId];
  const navigate = useNavigate();

  const branchImages = { marathahalli: v1, chinnapanahalli: s, thanisandra: new2 };
  const currentImage = branchImages[branchId];

  const branchGalleries = {
    marathahalli: [v10, v2, v],
    chinnapanahalli: [s2, s3, s10],
    thanisandra: [new1, new2, new5, new6]
  };
  const galleryImages = branchGalleries[branchId];


  if (!branch) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
        <h2 className="text-2xl font-bold text-brown-base">Branch not found</h2>
        <Link to="/" className="bg-terra-primary text-white px-8 py-3 rounded-pill font-semibold shadow-btn-primary hover:-translate-y-0.5 transition-transform" style={{ background: 'linear-gradient(135deg, #e64a19 0%, #bf360c 100%)' }}>
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-[75px] px-[5%] pb-8">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 bg-transparent border-none font-semibold text-[1.1rem] cursor-pointer py-2 mb-4 transition-colors duration-200"
        style={{ color: '#d84315' }}
        onMouseOver={e => e.currentTarget.style.color = '#bf360c'}
        onMouseOut={e => e.currentTarget.style.color = '#d84315'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* Branch Header — glassmorphism card */}
      <motion.header
        className="grid grid-cols-1 md:grid-cols-2 items-stretch mb-8 bg-white border border-white/60 rounded-card shadow-card overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div
          className="flex flex-col justify-center items-center p-8 md:p-16 text-center order-2 md:order-1"
          variants={fadeUpVariant}
        >
          <h1 className="text-3xl md:text-[2.5rem] font-bold mb-4" style={{ color: '#2c1e16' }}>{branch.name}</h1>
          <p className="text-[1.1rem] mb-6 leading-relaxed text-center" style={{ color: '#5d4a41' }}>{branch.address}</p>
          <motion.a
            whileTap={{ scale: 0.95 }}
            href={branch.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 text-white font-semibold rounded-pill transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] shadow-btn-primary"
            style={{ background: 'linear-gradient(135deg, #e64a19 0%, #bf360c 100%)' }}
          >
            Open in Google Maps
          </motion.a>
        </motion.div>
        <motion.div className="min-h-[300px] md:h-auto order-1 md:order-2" variants={fadeUpVariant}>
          {currentImage && (
            <img
              src={currentImage}
              alt={branch.name}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'right center' }}
              loading="lazy"
            />
          )}
        </motion.div>
      </motion.header>

      {/* Google Map */}
      <motion.section
        className="w-full h-[400px] rounded-card overflow-hidden mb-16 shadow-map"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUpVariant}
      >
        <iframe
          title={`${branch.name} Map`}
          src={branch.mapEmbedUrl}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0"
        />
      </motion.section>

      {/* Gallery Swiper */}
      {galleryImages && galleryImages.length > 0 && (
        <section className="py-8 pb-16 max-w-[1200px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-[#2c1e16]">
            {`${branch.name} Images`}
          </h2>
          <div className="w-16 h-[3px] bg-[#d84315] mx-auto mb-8 rounded-full"></div>
          <Swiper
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 15 },
              768: { slidesPerView: 1.5, spaceBetween: 20 },
              1024: { slidesPerView: 2.2, spaceBetween: 30 }
            }}
            centeredSlides={true}
            loop={false}
            autoplay={{ delay: 3000, disableOnInteraction: true }}
            modules={[Autoplay]}
            className="branch-gallery-swiper"
            style={{ padding: '20px 0' }}
          >
            {galleryImages.map((img, idx) => (
              <SwiperSlide key={idx} className="review-swiper-slide">
                <img
                  src={img}
                  alt={`${branch.name} gallery ${idx + 1}`}
                  className="w-full object-cover rounded-[15px] shadow-[0_8px_16px_rgba(0,0,0,0.15)] block"
                  style={{ height: '340px' }}
                  loading="lazy"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      {/* Interactive 3D Book Menu Section */}
      <section className="mb-16 mt-8">
        <MenuBook menuData={branchMenus[branchId] || branchMenus.marathahalli} />
      </section>
    </div>
  );
};

export default BranchPage;
