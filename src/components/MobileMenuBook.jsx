import React, { useCallback } from 'react';

const MobileMenuBook = ({ pages, currentPage, setCurrentPage }) => {

  const handleNext = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, pages.length - 1));
  }, [pages.length, setCurrentPage]);

  const handlePrev = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  }, [setCurrentPage]);

  return (
    <div className="flex flex-col items-center justify-center py-4 w-full overflow-hidden">

      {/* Book Container — no perspective/preserve-3d on parent for perf */}
      <div 
        className="relative w-[calc(100vw-32px)] max-w-[450px] h-[560px] rounded-lg"
        style={{ contain: 'layout style' }}
      >
        {pages.map((page, index) => {
          const isFlipped = index < currentPage;
          const isActive = index === currentPage;
          // Only render pages within ±1 of current to save DOM/paint cost
          const isNearby = Math.abs(index - currentPage) <= 1;
          
          if (!isNearby) return null;
          
          return (
            <div
              key={index}
              className="absolute inset-0 rounded-lg bg-[#ffedd5] mobile-page-flip"
              style={{
                transformOrigin: 'left center',
                zIndex: pages.length - index,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                pointerEvents: isActive ? 'auto' : 'none',
                willChange: isNearby ? 'transform' : 'auto',
                contain: 'layout paint',
              }}
            >
              <div className="w-full h-full pointer-events-none">
                {page}
              </div>
              
              {/* Touch zones for click-to-flip */}
              {isActive && (
                <>
                  <div 
                    className="absolute top-0 left-0 w-1/2 h-full z-50 cursor-pointer" 
                    onClick={handlePrev}
                    aria-label="Previous Page"
                  />
                  <div 
                    className="absolute top-0 right-0 w-1/2 h-full z-50 cursor-pointer" 
                    onClick={handleNext}
                    aria-label="Next Page"
                  />
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-8">
        <button 
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`px-6 py-2 rounded-full font-bold shadow-md transition-all active:scale-95 border ${currentPage === 0 ? 'bg-white/50 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-[#d84315] hover:shadow-lg border-[#d84315]/20'}`}
        >
          &larr; Prev
        </button>
        <button 
          onClick={handleNext}
          disabled={currentPage === pages.length - 1}
          className={`px-6 py-2 rounded-full font-bold shadow-md transition-all active:scale-95 ${currentPage === pages.length - 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#d84315] text-white hover:shadow-lg'}`}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default MobileMenuBook;
