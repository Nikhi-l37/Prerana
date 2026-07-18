import React, { useState, useEffect } from 'react';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images]);

  if (!images || images.length === 0) {
    return <div className="image-placeholder">Image Space</div>;
  }

  return (
    <div className="slider-container">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Branch Slide ${index + 1}`}
          className={`slider-image ${index === currentIndex ? 'active' : ''}`}
          loading="lazy"
        />
      ))}
      {images.length > 1 && (
        <div className="slider-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
