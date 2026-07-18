import React from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from './ImageSlider';

const BranchCard = ({ 
  name, 
  address, 
  images, 
  path, 
  isOpen, 
  isComingSoon = false,
  isMobile = false
}) => {
  const cardClass = "bg-white rounded-xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex flex-col h-full border-t-4 border-[#d84315] transition-all duration-300";

  if (isComingSoon) {
    return (
      <div className={cardClass}>
        <div className="w-full h-[220px] bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] text-[#555] font-semibold text-lg flex items-center justify-center">
          <span>More goodness coming...</span>
        </div>
        <div className="flex flex-col flex-grow p-5 md:p-8 text-center md:text-left items-center md:items-start">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-3 bg-orange-100 text-orange-600">
            Opening Soon
          </span>
          <h3 className="font-bold text-gray-800 text-xl md:text-2xl mb-2 md:mb-4">{name}</h3>
          <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">{address}</p>
        </div>
      </div>
    );
  }

  return (
    <Link 
      to={path}
      className={`${cardClass} clickable-card hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)]`}
    >
      <ImageSlider images={images} />
      <div className="flex flex-col flex-grow p-5 md:p-8 text-center md:text-left items-center md:items-start">
        <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold mb-3 ${isOpen ? 'bg-green-100 text-green-700' : 'bg-black/10 text-gray-600'}`}>
          {isOpen ? 'Now Open' : 'Opens at 11:00 AM'}
        </span>
        <h3 className="font-bold text-gray-800 text-xl md:text-2xl mb-2 md:mb-4">{name}</h3>
        <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">{address}</p>
        <span className="mt-auto inline-block text-center bg-gradient-to-br from-[#ff6b35] to-[#d84315] text-white py-2.5 px-6 rounded-lg font-bold shadow-[0_4px_15px_rgba(216,67,21,0.3)]">
          View Menu<span className="hidden md:inline"> & Details</span>
        </span>
      </div>
    </Link>
  );
};

export default BranchCard;
