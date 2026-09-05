import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { branchMenus, branchData } from '../data/MenuData';
import MenuBook from '../components/MenuBook';

import v1 from '../assets/images/v1.jpg';
import v2 from '../assets/images/v2.jpg';
import v from '../assets/images/v.jpg';
import v10 from '../assets/images/v10.webp';
import s from '../assets/images/s11_rotated.webp';
import s10 from '../assets/images/s10.webp';
import new1 from '../assets/images/new1.webp';
import new2 from '../assets/images/new2.webp';
import new5 from '../assets/images/new5.webp';
import new6 from '../assets/images/new6.webp';
import sNew1 from '../assets/images/s_new_image1..webp';
import sNew2 from '../assets/images/s_new_image2..ebp.webp';

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
    chinnapanahalli: [sNew1, sNew2, s10],
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
    <div className="pt-[85px] sm:pt-[90px] px-[5%] pb-8">

      {/* Top Header Navigation & Title */}
      <div className="flex items-center gap-3.5 mb-7 mt-1">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-[#f0ded4] text-[#d84315] hover:bg-[#fff5ec] hover:border-[#d84315]/40 shadow-sm active:scale-95 transition-all duration-200 cursor-pointer shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#2c1e16] tracking-tight">
          {branch.name}
        </h1>
      </div>

      {/* Branch Details Card */}
      <motion.header
        className="grid grid-cols-1 md:grid-cols-2 items-stretch mb-8 bg-white border border-white/60 rounded-card shadow-card overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div
          className="flex flex-col justify-center p-6 sm:p-8 md:p-12 text-left order-2 md:order-1"
          variants={fadeUpVariant}
        >
          {/* Address */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-[#fff0e6] flex items-center justify-center shrink-0 mt-0.5 text-[#d84315]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8d7063] block mb-0.5">Address</span>
              <p className="text-[1rem] leading-relaxed text-[#5d4a41] font-medium">
                {branch.address}
              </p>
            </div>
          </div>

          {/* Operating Hours / Timing */}
          <div className="flex items-center gap-3.5 mb-6 p-3.5 bg-[#fff8f3] rounded-2xl border border-orange-100">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-emerald-600">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Open Daily</span>
              </div>
              <p className="text-sm md:text-base font-bold text-[#2c1e16]">
                {branch.timing || "11:30 AM – 11:30 PM"}
              </p>
            </div>
          </div>

          {/* Action Buttons (Call & Google Maps) */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full">
            {branch.phone && (
              <motion.a
                whileTap={{ scale: 0.96 }}
                href={`tel:${branch.phone}`}
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-5 py-3 text-white font-semibold rounded-pill transition-all duration-300 hover:-translate-y-0.5 shadow-md text-sm sm:text-base"
                style={{ background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call Now</span>
              </motion.a>
            )}

            <motion.a
              whileTap={{ scale: 0.96 }}
              href={branch.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-5 py-3 text-white font-semibold rounded-pill transition-all duration-300 hover:-translate-y-0.5 shadow-btn-primary text-sm sm:text-base"
              style={{ background: 'linear-gradient(135deg, #e64a19 0%, #bf360c 100%)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Directions</span>
            </motion.a>
          </div>
        </motion.div>
        <motion.div className="min-h-[260px] md:h-auto order-1 md:order-2 overflow-hidden flex items-center justify-center" variants={fadeUpVariant}>
          {currentImage && (
            <img
              src={currentImage}
              alt={branch.name}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center center' }}
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

      {/* Branch Images Infinite Marquee */}
      {galleryImages && galleryImages.length > 0 && (
        <section className="py-8 pb-16 w-screen max-w-[100vw] relative left-1/2 -translate-x-1/2 overflow-hidden text-center">
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-6 text-[#2c1e16] px-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariant}
          >
            {`${branch.name} Images`}
          </motion.h2>

          {/* Seamless Zero-Lag Dual-Track Marquee for Branch Gallery */}
          <div className="marquee-container py-4 w-full">
            <div className="marquee-group-gallery">
              {[...galleryImages, ...galleryImages, ...galleryImages].map((img, idx) => (
                <div
                  key={`branch-img-1-${idx}`}
                  className="w-[280px] sm:w-[340px] md:w-[380px] h-[220px] sm:h-[260px] md:h-[280px] flex-shrink-0 overflow-hidden rounded-[16px] shadow-[0_8px_20px_rgba(0,0,0,0.12)] border border-white/80 transition-transform duration-300 hover:scale-[1.02]"
                >
                  <img
                    src={img}
                    alt={`${branch.name} photo ${idx + 1}`}
                    className="w-full h-full object-cover block select-none pointer-events-none"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            <div className="marquee-group-gallery" aria-hidden="true">
              {[...galleryImages, ...galleryImages, ...galleryImages].map((img, idx) => (
                <div
                  key={`branch-img-2-${idx}`}
                  className="w-[280px] sm:w-[340px] md:w-[380px] h-[220px] sm:h-[260px] md:h-[280px] flex-shrink-0 overflow-hidden rounded-[16px] shadow-[0_8px_20px_rgba(0,0,0,0.12)] border border-white/80 transition-transform duration-300 hover:scale-[1.02]"
                >
                  <img
                    src={img}
                    alt={`${branch.name} photo ${idx + 1}`}
                    className="w-full h-full object-cover block select-none pointer-events-none"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
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
