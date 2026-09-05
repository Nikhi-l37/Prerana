import React from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from './ImageSlider';

const BranchCard = ({ 
  name, 
  address, 
  images, 
  path, 
  isOpen, 
  isComingSoon = false
}) => {
  const cardClass = "bg-white rounded-xl overflow-hidden shadow-[0_8px_20px_rgba(44,30,22,0.05)] border border-[#f5e6db] flex flex-col h-full border-t-4 border-t-[#d84315] transition-all duration-300";

  if (isComingSoon) {
    return (
      <div className={cardClass}>
        <div className="w-full h-[190px] bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] text-[#555] font-semibold text-lg flex items-center justify-center">
          <span>More goodness coming...</span>
        </div>
        <div className="flex flex-col flex-grow p-4 md:p-5 text-center md:text-left items-center md:items-start">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 bg-orange-100 text-orange-600">
            Opening Soon
          </span>
          <h3 className="font-bold text-gray-800 text-lg md:text-xl mb-1 md:mb-2">{name}</h3>
          <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed">{address}</p>
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
      <div className="flex flex-col flex-grow p-4 md:p-5 text-center md:text-left items-center md:items-start">
        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${isOpen ? 'bg-green-100 text-green-700' : 'bg-black/10 text-gray-600'}`}>
          {isOpen ? 'Closes at 11:30 PM' : 'Opens at 11:30 AM'}
        </span>
        <h3 className="font-bold text-gray-800 text-lg md:text-xl mb-1 md:mb-2">{name}</h3>
        <p className="text-gray-600 text-xs md:text-sm mb-3 md:mb-4 leading-relaxed line-clamp-2">{address}</p>
        <span className="mt-auto inline-block text-center bg-gradient-to-br from-[#ff6b35] to-[#d84315] text-white py-2 px-5 rounded-lg font-bold text-sm shadow-[0_4px_12px_rgba(216,67,21,0.25)]">
          View Menu<span className="hidden md:inline"> & Details</span>
        </span>
      </div>
    </Link>
  );
};

export default BranchCard;
