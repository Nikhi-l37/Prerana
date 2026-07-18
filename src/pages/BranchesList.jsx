import React, { useEffect } from 'react';
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
              address="PRERANA Firewood Biryani - Chinnapanahalli, Bengaluru"
              images={branch2Images}
              path="/branch/chinnapanahalli"
              isOpen={isOpen}
            />
          </motion.div>

          <motion.div variants={fadeUpVariant}>
            <BranchCard 
              name="Thanisandra Branch"
              address="PRERANA FIREWOOD BIRYANI, SH 104, Ashwath Nagar, Thanisandra, Bengaluru, Karnataka 560077"
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
