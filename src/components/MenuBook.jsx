import React, { useRef, useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import logo from '../assets/images/logo.webp';

// Physical Page component
const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover bg-gradient-to-br from-[#fff7ed] via-[#ffedd5] to-[#fed7aa] text-[#2c1e16] flex flex-col items-center justify-center p-6 md:p-10 relative shadow-[inset_0_0_40px_rgba(216,67,21,0.2)]" ref={ref} data-density="hard">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.08] bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]" style={{ backgroundSize: '300px' }}></div>
      
      {/* Spine shadow */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/20 via-black/5 to-transparent z-10"></div>
      
      {/* Elegant Inner Frame */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full border border-[#d84315]/20 p-2 rounded-sm bg-white/30 backdrop-blur-[2px]">
        <div className="flex flex-col items-center justify-center h-full w-full border-[3px] border-double border-[#d84315]/40 rounded-sm p-4 md:p-8 text-center relative overflow-hidden">
          
          {/* Subtle Glow behind logo */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-400/20 blur-3xl rounded-full pointer-events-none"></div>

          <img src={logo} alt="Prerana Logo" className="w-48 md:w-64 mb-10 drop-shadow-2xl relative z-10 transition-transform duration-700 hover:scale-105" />
          
          <div className="relative z-10 flex flex-col items-center">
            <p className="text-[#d84315] text-xs md:text-sm tracking-[0.4em] font-bold mb-3 uppercase">Discover</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-[0.15em] text-[#9a3412] uppercase drop-shadow-md">Our Menu</h1>
            
            {/* Elegant flourish separator */}
            <div className="flex items-center gap-3 mt-8 opacity-80">
              <div className="w-12 md:w-16 h-[2px] bg-gradient-to-r from-transparent to-[#d84315]"></div>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d84315" strokeWidth="1.5" className="rotate-45"><rect x="4" y="4" width="16" height="16"/></svg>
              <div className="w-12 md:w-16 h-[2px] bg-gradient-to-l from-transparent to-[#d84315]"></div>
            </div>
            
            <p className="mt-8 text-[#9a3412] tracking-[0.25em] uppercase text-[0.65rem] md:text-xs font-semibold opacity-90">Authentic & Crafted</p>
          </div>

        </div>
      </div>
    </div>
  );
});

const Page = React.forwardRef(({ title, items, number, totalPages, isLeftPage }, ref) => {
  return (
    <div className={`page bg-[#fdfaf5] text-[#2c1e16] pt-8 pb-20 ${isLeftPage ? 'pl-6 pr-10 md:pl-8 md:pr-16' : 'pr-6 pl-10 md:pr-8 md:pl-16'} relative overflow-hidden`} ref={ref}>
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]" style={{ backgroundSize: '300px' }}></div>
      
      {/* Book binding shadow: Left page has spine on Right, Right page has spine on Left */}
      <div className={`absolute top-0 bottom-0 w-12 z-10 pointer-events-none ${isLeftPage ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'} from-black/20 to-transparent`}></div>

      <div className="relative z-20 h-full flex flex-col">
        {title && (
          <div className="text-center mb-3 pb-3 border-b-2 border-[#d84315]/20">
            <h2 className="text-2xl md:text-3xl font-bold text-[#d84315] uppercase tracking-wide m-0 leading-tight">{title}</h2>
          </div>
        )}
        
        <div className="flex-grow">
          {items && items.length > 0 ? (
            <ul className="space-y-1">
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
      </div>
      
      {/* Absolute positioned footer always at the bottom right side */}
      <div className="absolute bottom-4 right-6 md:bottom-6 md:right-8 text-sm font-bold text-[#888] z-30">
        {number}/{totalPages}
      </div>
    </div>
  );
});

const BackCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover bg-gradient-to-br from-[#fff7ed] via-[#ffedd5] to-[#fed7aa] text-[#2c1e16] flex flex-col items-center justify-center p-8 relative shadow-[inset_0_0_40px_rgba(216,67,21,0.2)]" ref={ref} data-density="hard">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.08] bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')]" style={{ backgroundSize: '300px' }}></div>
      
      {/* Spine shadow for back cover (Spine is on the right side of the inner left page) */}
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/20 via-black/5 to-transparent z-10"></div>
      
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full border border-[#d84315]/20 p-2 rounded-sm bg-white/30 backdrop-blur-[2px]">
        <div className="flex flex-col items-center justify-center h-full w-full border-[3px] border-double border-[#d84315]/40 rounded-sm p-4 text-center opacity-80">
          <img src={logo} alt="Prerana Logo" className="w-32 mb-6" />
          <p className="tracking-[0.3em] font-semibold text-[#9a3412] uppercase text-sm">Thank you</p>
        </div>
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
  
  const MAX_ITEMS = isMobile ? 10 : 11;
  
  Object.entries(menuData).forEach(([category, items]) => {
    if (items.length > MAX_ITEMS) {
      for (let i = 0; i < items.length; i += MAX_ITEMS) {
        const chunk = items.slice(i, i + MAX_ITEMS);
        const partNum = Math.floor(i / MAX_ITEMS) + 1;
        const totalParts = Math.ceil(items.length / MAX_ITEMS);
        pages.push({
          title: totalParts > 1 ? `${category} (${partNum}/${totalParts})` : category,
          items: chunk,
          number: pageNum++
        });
      }
    } else {
      pages.push({ title: category, items, number: pageNum++ });
    }
  });

  // CRITICAL: A book must have an EVEN number of inner pages to close properly (left vs right parity).
  // Total pages = 1 (Front) + EVEN (Inner) + 1 (Back) = EVEN total pages.
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
          width={isMobile ? windowWidth - 16 : 560}
          height={isMobile ? 720 : 800}
          size="stretch"
          minWidth={300}
          maxWidth={650}
          minHeight={500}
          maxHeight={850}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          usePortrait={true}
          className="menu-flipbook"
          ref={bookRef}
        >
          {/* 0. Front Cover (Right page) */}
          <PageCover />

          {/* 1 to N. Menu Pages (Alternating Left/Right) */}
          {pages.map((page, index) => (
            <Page 
              key={index} 
              title={page.title} 
              items={page.items} 
              number={page.number}
              totalPages={pages.length}
              isLeftPage={index % 2 === 0} // index 0 is child 1 (Left), index 1 is child 2 (Right)
            />
          ))}

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
