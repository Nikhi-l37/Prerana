import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BranchCard from '../components/BranchCard';
import logoImg from '../assets/images/logo.webp';

import v1 from '../assets/images/v1.jpg';
import s from '../assets/images/s11_rotated.webp';

const branch1Images = [v1];
const branch2Images = [s];

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

const BranchesList = () => {
  const isOpen = useStoreStatus();
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="branch-page">
      <div className="back-button-container" style={{ paddingBottom: '0', paddingLeft: '5%', paddingTop: '75px' }}>
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

      <motion.div 
        className="branch-header-split" style={{ gridTemplateColumns: '1fr', textAlign: 'center', minHeight: 'auto', paddingTop: '1rem', paddingBottom: '2rem', background: 'transparent', boxShadow: 'none' }}
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
      >
        <div className="branch-header-content" style={{ padding: '0 2rem' }}>
          <img src={logoImg} alt="Prerana Firewood Biryani" style={{ height: '220px', width: 'auto', margin: '0 auto', objectFit: 'contain' }} />
        </div>
      </motion.div>

      <section className="locations-section" style={{ padding: '2rem 0', background: 'transparent' }}>
        <motion.div 
          className="branches-page-grid px-5 md:px-[5%]"
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
              address="SH 104, Ashwath Nagar, Thanisandra, Bengaluru, Karnataka 560077"
              isComingSoon={true}
            />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default BranchesList;
