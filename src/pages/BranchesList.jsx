import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BranchCard from '../components/BranchCard';
import { useStoreStatus } from '../hooks/useStoreStatus';

import v1 from '../assets/images/v1.jpg';
import s from '../assets/images/s11_rotated.webp';
import new2 from '../assets/images/new2.webp';

const branch1Images = [v1];
const branch2Images = [s];
const branch3Images = [new2];

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const BranchesList = () => {
  const isOpen = useStoreStatus();
  const navigate = useNavigate();

  return (
    <div className="pt-[85px] sm:pt-[90px] px-[5%] pb-8">
      {/* Top Header Navigation & Title */}
      <div className="flex items-center gap-3.5 mb-8 mt-1">
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
          Our Branches
        </h1>
      </div>

      <section className="locations-section" style={{ background: 'transparent' }}>
        <motion.div 
          className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10 w-full px-5 md:px-[5%]"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUpVariant}>
            <BranchCard 
              name="Marathahalli Branch"
              address="182, Service Rd, Manjunatha Layout, Marathahalli, Bengaluru, Karnataka 560037"
              images={branch1Images}
              path="/branch/marathahalli"
              isOpen={isOpen}
            />
          </motion.div>

          <motion.div variants={fadeUpVariant}>
            <BranchCard 
              name="Chinnapanahalli Branch"
              address="Chinnapanahalli Main Road, Bengaluru"
              images={branch2Images}
              path="/branch/chinnapanahalli"
              isOpen={isOpen}
            />
          </motion.div>

          <motion.div variants={fadeUpVariant}>
            <BranchCard 
              name="Thanisandra Branch"
              address="SH 104, Ashwath Nagar, Thanisandra, Bengaluru, Karnataka 560077"
              images={branch3Images}
              path="/branch/thanisandra"
              isOpen={isOpen}
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default BranchesList;
