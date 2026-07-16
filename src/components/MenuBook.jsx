import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import logo from '../assets/images/logo.webp';

// Physical Page component
const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover bg-[#2c1e16] text-white flex flex-col items-center justify-center p-8 relative border border-[#1a110c] shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]" ref={ref} data-density="hard">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" style={{ backgroundSize: '200px' }}></div>
      <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-black/80 to-transparent z-10"></div>
      
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full border-2 border-[#e64a19]/30 rounded-lg p-6">
        <img src={logo} alt="Prerana Logo" className="w-48 md:w-64 mb-12 drop-shadow-2xl" />
        <h1 className="text-3xl md:text-5xl font-bold tracking-widest text-[#e64a19] uppercase text-center" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>Our Menu</h1>
        <div className="w-16 h-1 bg-[#e64a19] mt-8 mb-4"></div>
        <p className="text-[#a0522d] font-semibold tracking-widest uppercase text-sm md:text-base">Authentic Firewood Biryani</p>
      </div>
    </div>
  );
});

const Page = React.forwardRef(({ title, items, number, isLeftPage }, ref) => {
  return (
    <div className={`page bg-[#fdfaf5] text-[#2c1e16] py-10 ${isLeftPage ? 'pl-6 pr-10 md:pl-8 md:pr-16' : 'pr-6 pl-10 md:pr-8 md:pl-16'} relative overflow-hidden`} ref={ref}>
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]" style={{ backgroundSize: '300px' }}></div>
      
      {/* Book binding shadow: Left page has spine on Right, Right page has spine on Left */}
      <div className={`absolute top-0 bottom-0 w-12 z-10 pointer-events-none ${isLeftPage ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'} from-black/20 to-transparent`}></div>

      <div className="relative z-20 h-full flex flex-col">
        {title && (
          <div className="text-center mb-6 pb-4 border-b-2 border-[#d84315]/20">
            <h2 className="text-2xl md:text-3xl font-bold text-[#d84315] uppercase tracking-wide m-0 leading-tight">{title}</h2>
          </div>
        )}
        
        <div className="flex-grow">
          {items && items.length > 0 ? (
            <ul className="space-y-4">
              {items.map((item, idx) => (
                <li key={idx} className="flex justify-between items-end border-b border-dashed border-[#2c1e16]/20 pb-1 hover:border-[#d84315]/50 transition-colors">
                  <span className="font-bold text-[1rem] md:text-[1.1rem] bg-[#fdfaf5] pr-2 relative top-[4px]">{item.name}</span>
                  <span className="font-bold text-[1.1rem] md:text-[1.2rem] text-[#d84315] bg-[#fdfaf5] pl-2 relative top-[4px]">₹{item.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="h-full flex items-center justify-center opacity-30">
               <img src={logo} alt="Prerana Logo" className="w-32 grayscale" />
            </div>
          )}
        </div>
        
        <div className="mt-auto text-center pt-4 text-sm font-semibold text-[#888]">
          - {number} -
        </div>
      </div>
    </div>
  );
});

const BackCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover bg-[#2c1e16] text-white flex flex-col items-center justify-center p-8 relative border border-[#1a110c] shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]" ref={ref} data-density="hard">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" style={{ backgroundSize: '200px' }}></div>
      <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-black/80 to-transparent z-10"></div>
      
      <div className="relative z-20 flex flex-col items-center justify-center text-center opacity-50">
        <img src={logo} alt="Prerana Logo" className="w-32 mb-6 grayscale" />
        <p className="tracking-widest uppercase text-sm">Thank you for dining with us</p>
      </div>
    </div>
  );
});

const MenuBook = ({ menuData }) => {
  const bookRef = useRef();
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  
  // Prepare pages
  const pages = [];
  let pageNum = 1;
  
  Object.entries(menuData).forEach(([category, items]) => {
    // If a category has many items, split it into two pages
    if (items.length > 11) {
      const half = Math.ceil(items.length / 2);
      pages.push({ title: `${category} (1/2)`, items: items.slice(0, half), number: pageNum++ });
      pages.push({ title: `${category} (2/2)`, items: items.slice(half), number: pageNum++ });
    } else {
      pages.push({ title: category, items, number: pageNum++ });
    }
  });

  // CRITICAL: A book must have an EVEN number of inner pages to close properly (left vs right parity).
  if (pages.length % 2 !== 0) {
    pages.push({ title: "", items: [], number: pageNum++ });
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full overflow-hidden" style={{ perspective: '1500px' }}>
      
      <p className="text-[#a0522d] font-semibold mb-6 flex items-center gap-2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3v18"/><path d="M3 15h16"/><path d="m20 18-3 3-3-3"/></svg>
        Swipe or click corners to turn pages
      </p>
      
      <div className="shadow-2xl rounded-lg">
        <HTMLFlipBook
          width={isMobile ? Math.min(windowWidth - 40, 400) : 450}
          height={isMobile ? 600 : 680}
          size="stretch"
          minWidth={300}
          maxWidth={550}
          minHeight={500}
          maxHeight={800}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          usePortrait={true}
          className="menu-flipbook"
          ref={bookRef}
        >
          {/* 0. Front Cover (Right page) */}
          <PageCover />

          {/* 1. Blank inner front cover (Left page) */}
          <div className="page bg-[#ebd6c5] relative shadow-[inset_0_0_30px_rgba(0,0,0,0.1)]" data-density="hard">
             <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/20 to-transparent"></div>
          </div>

          {/* 2 to N. Menu Pages (Alternating Right/Left) */}
          {pages.map((page, index) => (
            <Page 
              key={index} 
              title={page.title} 
              items={page.items} 
              number={page.number} 
              isLeftPage={index % 2 !== 0} // index 0 is child 2 (Right), index 1 is child 3 (Left)
            />
          ))}

          {/* N+1. Blank inner back cover (Right page) */}
          <div className="page bg-[#ebd6c5] relative shadow-[inset_0_0_30px_rgba(0,0,0,0.1)]" data-density="hard">
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/20 to-transparent"></div>
          </div>

          {/* N+2. Back Cover (Left page) */}
          <BackCover />
        </HTMLFlipBook>
      </div>

      <div className="flex gap-4 mt-8">
        <button 
          onClick={() => bookRef.current.pageFlip().flipPrev()}
          className="px-6 py-2 bg-white rounded-full font-bold text-[#d84315] shadow-md hover:shadow-lg transition-all active:scale-95 border border-[#d84315]/20"
        >
          &larr; Prev Page
        </button>
        <button 
          onClick={() => bookRef.current.pageFlip().flipNext()}
          className="px-6 py-2 bg-[#d84315] text-white rounded-full font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          Next Page &rarr;
        </button>
      </div>
      
    </div>
  );
};

export default MenuBook;
