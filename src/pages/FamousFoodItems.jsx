import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import gunturChicken from '../assets/images/Guntur Chicken.webp';
import chickenMajestic from '../assets/images/Chicken Majestic.webp';
import corianderChicken from '../assets/images/corainder chicken.webp';
import goldenPrawns from '../assets/images/Golden prawns.webp';
import lemonChicken from '../assets/images/Lemon chicken.webp';
import chickenLollipop from '../assets/images/lollipop.webp';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const FAMOUS_ITEMS = [
  {
    name: "Chicken Majestic",
    image: chickenMajestic,
    price: "250",
    description: "A legendary Hyderabad starter! Tender, elongated chicken strips marinated in yogurt and spices, lightly fried, and sautéed with green chilies and curry leaves.",
    tag: "Most Popular"
  },
  {
    name: "Guntur Chicken",
    image: gunturChicken,
    price: "220",
    description: "Traditional dry Andhra chicken preparation exploding with rich red Guntur chili flavors, curry leaves, and a perfect blend of roasted ground spices.",
    tag: "Chef Special"
  },
  {
    name: "Coriander Chicken",
    image: corianderChicken,
    price: "250",
    description: "Succulent cubes of chicken coated in a vibrant green herbal paste of fresh coriander leaves, mint, ginger, and aromatic spices.",
    tag: "Signature Dish"
  },
  {
    name: "Golden Prawns",
    image: goldenPrawns,
    price: "320",
    description: "Jumbo prawns coated in a crispy, golden-fried tempura batter, seasoned lightly to preserve the natural sweet flavor of fresh prawns.",
    tag: "Crispy Delight"
  },
  {
    name: "Lemon Chicken",
    image: lemonChicken,
    price: "220",
    description: "Crispy fried chicken bites tossed in a refreshing, tangy sauce made with fresh lemon juice, garlic, ginger, and cracked black pepper.",
    tag: "Tangy Special"
  },
  {
    name: "Chicken Lollipop",
    image: chickenLollipop,
    price: "230",
    description: "Crispy on the outside, juicy on the inside! Frenched chicken drumettes deep-fried in a spicy, flavorful classic red batter.",
    tag: "All-Time Favorite"
  }
];

const FoodCard = ({ item, index }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <motion.div
      className="bg-white border border-white/60 rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex flex-col h-full hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-300"
      variants={fadeUpVariant}
    >
      {/* Image Section */}
      <div className="relative h-[240px] overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
          onLoad={() => setLoaded(true)}
          loading={index < 3 ? "eager" : "lazy"}
        />
        {/* Shimmer placeholder while loading */}
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(110deg, #ffffff 30%, #f8f8f8 50%, #ffffff 70%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite linear' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e0e0e0" strokeWidth="1.5" opacity="0.8">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}
        {/* Tag Overlay */}
        {item.tag && (
          <span className="absolute top-4 left-4 bg-[#d84315] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
            {item.tag}
          </span>
        )}
        {/* Price Overlay */}
        <span className="absolute bottom-4 right-4 bg-white/95 text-[#d84315] font-extrabold text-[1.1rem] px-4 py-1.5 rounded-lg shadow-md border border-[#d84315]/10">
          ₹{item.price}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8 flex flex-col flex-grow items-center text-center">
        <h3 className="font-extrabold text-[#2c1e16] text-xl md:text-2xl mb-3">
          {item.name}
        </h3>
        <p className="text-[#5d4a41] text-sm md:text-base leading-relaxed mb-6 flex-grow">
          {item.description}
        </p>
        <div className="w-full pt-4 border-t border-[#2c1e16]/5 flex justify-center items-center gap-2 text-xs font-bold text-[#d84315]/80 tracking-wider uppercase">
          <span>★</span>
          <span>Available at all branches</span>
          <span>★</span>
        </div>
      </div>
    </motion.div>
  );
};

const FamousFoodItems = () => {
  const navigate = useNavigate();


  return (
    <div className="pt-[100px] px-[5%] pb-16 min-h-screen">
      {/* Shimmer keyframe */}
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 bg-transparent border-none font-semibold text-[1.1rem] cursor-pointer py-2 mb-8 transition-colors duration-200"
        style={{ color: '#d84315' }}
        onMouseOver={e => e.currentTarget.style.color = '#bf360c'}
        onMouseOut={e => e.currentTarget.style.color = '#d84315'}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      {/* Header Section */}
      <motion.div 
        className="text-center mb-16 max-w-[800px] mx-auto"
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
      >
        <h1 className="text-3xl md:text-[3rem] font-black tracking-tight mb-4 text-[#2c1e16]">
          Famous <span className="text-[#d84315]">Food Items</span>
        </h1>
        <div className="w-24 h-[4px] bg-[#d84315] mx-auto mb-6 rounded-full"></div>
        <p className="text-[1.1rem] md:text-[1.2rem] text-[#5d4a41] leading-relaxed">
          Discover our most-celebrated signature dishes. Hand-crafted with authentic spices, fresh ingredients, and time-honored recipes that make every bite unforgettable.
        </p>
      </motion.div>

      {/* Grid List */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-[1200px] mx-auto"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        {FAMOUS_ITEMS.map((item, index) => (
          <FoodCard key={index} item={item} index={index} />
        ))}
      </motion.div>
    </div>
  );
};

export default FamousFoodItems;
