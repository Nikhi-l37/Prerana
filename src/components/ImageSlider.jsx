import React, { useState, useEffect } from 'react';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[220px] md:h-[250px] bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center text-gray-500 font-semibold text-lg">
        Image Space
      </div>
    );
  }

  return (
    <div className="relative w-full h-[220px] md:h-[250px] overflow-hidden bg-black rounded-t-xl group">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentIndex ? 'bg-[#d84315] scale-125' : 'bg-white/40'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
            ></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
