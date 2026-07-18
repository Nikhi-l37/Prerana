import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import MobileMenuBook from './MobileMenuBook';
import logo from '../assets/images/logo.webp';

// Physical Page component
const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover h-full w-full bg-gradient-to-br from-[#fff7ed] via-[#ffedd5] to-[#fed7aa] text-[#2c1e16] flex flex-col items-center justify-center p-6 md:p-10 relative shadow-[inset_0_0_40px_rgba(216,67,21,0.2)]" ref={ref} data-density="hard">
      {/* Spine shadow */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/20 via-black/5 to-transparent z-10"></div>
      
      {/* Elegant Inner Frame */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full border border-[#d84315]/20 p-2 rounded-sm bg-white/70">
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

const Page = React.forwardRef(({ elements, number, totalPages, isLeftPage, onPageClick }, ref) => {
  const isIndexPage = elements && elements[0] && elements[0].type === 'index-title';

  return (
    <div className={`page ${isLeftPage ? 'page-left' : 'page-right'} h-full w-full bg-gradient-to-br from-[#fff7ed] via-[#ffedd5] to-[#fed7aa] text-[#2c1e16] p-4 md:p-6 relative overflow-hidden`} ref={ref} data-density="soft">
      {/* Spine shadow */}
      <div className={`absolute top-0 bottom-0 w-12 z-10 pointer-events-none ${isLeftPage ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'} from-black/20 to-transparent`}></div>
      
      {/* Frosted inner card */}
      <div className={`relative z-20 flex flex-col h-full w-full border border-[#d84315]/40 bg-white/90 shadow-[0_0_20px_rgba(216,67,21,0.05)] rounded-sm pt-6 pb-16 ${isLeftPage ? 'pl-4 pr-6 md:pl-6 md:pr-10' : 'pr-4 pl-6 md:pr-6 md:pl-10'}`}>
        
        {/* Premium Elegant Restaurant Border Design */}
        {/* Main thin inset border */}
        <div className="absolute inset-2 md:inset-3 border-[1px] border-[#d84315]/30 rounded-sm pointer-events-none"></div>
        
        {/* Decorative Corner Brackets */}
        <div className="absolute top-1.5 left-1.5 md:top-2.5 md:left-2.5 w-4 h-4 md:w-6 md:h-6 border-t-2 border-l-2 border-[#d84315]/50 pointer-events-none"></div>
        <div className="absolute top-1.5 right-1.5 md:top-2.5 md:right-2.5 w-4 h-4 md:w-6 md:h-6 border-t-2 border-r-2 border-[#d84315]/50 pointer-events-none"></div>
        <div className="absolute bottom-1.5 left-1.5 md:bottom-2.5 md:left-2.5 w-4 h-4 md:w-6 md:h-6 border-b-2 border-l-2 border-[#d84315]/50 pointer-events-none"></div>
        <div className="absolute bottom-1.5 right-1.5 md:bottom-2.5 md:right-2.5 w-4 h-4 md:w-6 md:h-6 border-b-2 border-r-2 border-[#d84315]/50 pointer-events-none"></div>

        {/* Small Corner Diamonds */}
        <div className="absolute top-1 left-1 md:top-2 md:left-2 w-1.5 h-1.5 bg-[#d84315]/40 rotate-45 pointer-events-none"></div>
        <div className="absolute top-1 right-1 md:top-2 md:right-2 w-1.5 h-1.5 bg-[#d84315]/40 rotate-45 pointer-events-none"></div>
        <div className="absolute bottom-1 left-1 md:bottom-2 md:left-2 w-1.5 h-1.5 bg-[#d84315]/40 rotate-45 pointer-events-none"></div>
        <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-1.5 h-1.5 bg-[#d84315]/40 rotate-45 pointer-events-none"></div>

        {/* Subtle logo watermark pattern for all pages */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none flex items-center justify-center">
          <img src={logo} alt="" className="w-[200px] h-[200px] object-contain" draggable="false" />
        </div>

        <div className="relative z-30 h-full flex flex-col justify-between">
          <div className={`relative z-30 flex-grow flex flex-col justify-start ${isIndexPage ? 'gap-1.5 md:gap-2' : 'gap-2.5'}`}>
            {elements && elements.map((el, idx) => {
              if (el.type === 'index-title') {
                return (
                  <div key={idx} className="text-center pt-2 pb-4 first:pt-0">
                    <h1 className="text-2xl md:text-3xl font-extrabold text-[#d84315] uppercase tracking-widest">{el.name}</h1>
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d84315]"></div>
                      <span className="text-[#d84315] text-[0.8rem]">♦</span>
                      <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#d84315]"></div>
                    </div>
                  </div>
                );
              }
              
              if (el.type === 'index-item') {
                return (
                  <button 
                    key={idx} 
                    onClick={() => onPageClick && onPageClick(el.targetPage || parseInt(el.pageNum.split('-')[0]))}
                    className="flex justify-between items-end pb-1 text-[0.9rem] md:text-[0.98rem] w-full text-left bg-transparent border-none p-0 cursor-pointer hover:text-[#d84315] group transition-colors font-sans"
                  >
                    <span className="font-semibold text-[#2c1e16] group-hover:text-[#d84315] transition-colors">{el.name}</span>
                    <div className="flex-grow border-b border-dotted border-[#2c1e16]/30 group-hover:border-[#d84315]/30 mx-2 mb-1.5 transition-colors"></div>
                    <span className="font-bold text-[#d84315]">{el.pageNum}</span>
                  </button>
                );
              }

              if (el.type === 'header') {
                return (
                  <div key={idx} className="text-center pt-2 pb-0.5 first:pt-0">
                    <h2 className="text-[1.05rem] md:text-[1.2rem] font-bold text-[#d84315] uppercase tracking-wider">{el.name}</h2>
                    <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#d84315]/50 to-transparent mx-auto mt-1"></div>
                  </div>
                );
              }
              return (
                <div key={idx} className="flex justify-between items-end border-b border-dashed border-[#2c1e16]/20 pb-0.5 hover:border-[#d84315]/50 transition-colors">
                  <span className="font-bold text-[0.88rem] md:text-[0.98rem] bg-transparent pr-2 relative top-[2px]">{el.name}</span>
                  <span className="font-bold text-[0.95rem] md:text-[1.05rem] text-[#d84315] bg-transparent pl-2 relative top-[2px]">₹{el.price}</span>
                </div>
              );
            })}
          </div>
          
          {/* Page Number */}
          {number !== null && number !== undefined && (
            <div className="absolute bottom-[-45px] right-2 text-[#d84315] font-bold text-base opacity-60 z-30 font-serif">
              {number}/{totalPages}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

const BackCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover h-full w-full bg-gradient-to-br from-[#fff7ed] via-[#ffedd5] to-[#fed7aa] text-[#2c1e16] flex flex-col items-center justify-center p-8 relative shadow-[inset_0_0_40px_rgba(216,67,21,0.2)]" ref={ref} data-density="hard">
      {/* Spine shadow for back cover (Spine is on the right side of the inner left page) */}
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/20 via-black/5 to-transparent z-10"></div>
      
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full border border-[#d84315]/20 p-2 rounded-sm bg-white/70">
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
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const handlePageClick = useCallback((pageNum) => {
    const targetFlipIndex = pageNum + 1;
    if (isMobile) {
      setCurrentPage(targetFlipIndex);
    } else {
      if (bookRef.current) {
        bookRef.current.pageFlip().turnToPage(targetFlipIndex);
      }
    }
  }, [isMobile]);

  // Prepare pages dynamically with sequential packing
  const pages = useMemo(() => {
    const flatElements = [];
    Object.entries(menuData).forEach(([category, items]) => {
      items.forEach((item, index) => {
        flatElements.push({
          type: 'item',
          name: item.name,
          price: item.price,
          category: category,
          isFirstOfCategory: index === 0
        });
      });
    });

    const paginatedPages = [];
    const maxUnits = isMobile ? 12 : 14;
    
    let currentPageElements = [];
    let currentUnits = 0;

    flatElements.forEach((el) => {
      let headerToInsert = null;
      if (el.isFirstOfCategory) {
        headerToInsert = { type: 'header', name: el.category };
      }

      const itemUnit = 1.0;
      const headerUnit = 1.8;

      let spaceNeeded = itemUnit;
      if (headerToInsert) {
        spaceNeeded += headerUnit;
      }

      // If adding this exceeds the limit, push current page and start a new one
      if (currentUnits + spaceNeeded > maxUnits) {
        if (currentPageElements.length > 0) {
          paginatedPages.push(currentPageElements);
        }
        currentPageElements = [];
        currentUnits = 0;

        // If we are starting a new page and not inserting a main category header,
        // add a continuation header
        if (!headerToInsert) {
          currentPageElements.push({ type: 'header', name: `${el.category} (Contd.)` });
          currentUnits += headerUnit;
        }
      }

      if (headerToInsert) {
        currentPageElements.push(headerToInsert);
        currentUnits += headerUnit;
      }

      currentPageElements.push(el);
      currentUnits += itemUnit;
    });

    if (currentPageElements.length > 0) {
      paginatedPages.push(currentPageElements);
    }

    // Now calculate category start & end page ranges
    // Since page numbering starts at the items page:
    // So pageIndex 0 (first menu page) will become page number 1.
    const categoryPagesMap = {};
    paginatedPages.forEach((pageElements, pageIndex) => {
      pageElements.forEach(el => {
        if (el.type === 'item' || (el.type === 'header' && !el.name.endsWith('(Contd.)'))) {
          const cat = el.type === 'item' ? el.category : el.name;
          const displayPageNum = pageIndex + 1; // pageIndex 0 becomes page number 1
          if (!categoryPagesMap[cat]) {
            categoryPagesMap[cat] = [];
          }
          if (!categoryPagesMap[cat].includes(displayPageNum)) {
            categoryPagesMap[cat].push(displayPageNum);
          }
        }
      });
    });

    // Create Index Elements
    const indexElements = [
      { type: 'index-title', name: 'Table of Contents' }
    ];
    
    // Group and map categories dynamically for Table of Contents
    const tocGroups = [];
    const categoriesSeen = new Set();
    Object.keys(menuData).forEach((catName) => {
      if (categoriesSeen.has(catName)) return;

      if (catName.includes('Soups')) {
        tocGroups.push({
          displayName: 'Soups',
          originalKeys: ['Non-Veg Soups', 'Veg Soups']
        });
        categoriesSeen.add('Non-Veg Soups');
        categoriesSeen.add('Veg Soups');
      } else if (catName.includes('Tandoori')) {
        tocGroups.push({
          displayName: 'Tandoori Starters',
          originalKeys: ['Tandoori Non-Veg Starters', 'Tandoori Veg Starters']
        });
        categoriesSeen.add('Tandoori Non-Veg Starters');
        categoriesSeen.add('Tandoori Veg Starters');
      } else if (catName.includes('Main Course')) {
        tocGroups.push({
          displayName: 'Main Course',
          originalKeys: ['Non-Veg Main Course', 'Veg Main Course']
        });
        categoriesSeen.add('Non-Veg Main Course');
        categoriesSeen.add('Veg Main Course');
      } else {
        tocGroups.push({
          displayName: catName,
          originalKeys: [catName]
        });
        categoriesSeen.add(catName);
      }
    });

    // Populate TOC elements using grouped category page numbers
    tocGroups.forEach((group) => {
      const allPages = [];
      group.originalKeys.forEach(key => {
        const pageList = categoryPagesMap[key];
        if (pageList) {
          allPages.push(...pageList);
        }
      });

      if (allPages.length > 0) {
        const minPage = Math.min(...allPages);
        const maxPage = Math.max(...allPages);
        const pageRangeStr = minPage === maxPage ? `${minPage}` : `${minPage}-${maxPage}`;
        indexElements.push({ 
          type: 'index-item', 
          name: group.displayName, 
          pageNum: pageRangeStr,
          targetPage: minPage
        });
      }
    });

    // Insert Index Page at index 0 (so it becomes Page 1)
    paginatedPages.unshift(indexElements);

    // CRITICAL: Desktop book must have an EVEN number of inner pages to close properly (left vs right parity).
    if (!isMobile && paginatedPages.length % 2 !== 0) {
      paginatedPages.push([
        { type: 'header', name: 'Our Specialties' }, 
        { type: 'item', name: 'Ask your server for today\'s special items', price: '-' }
      ]);
    }

    return paginatedPages;
  }, [menuData, isMobile]);

  // Memoize rendered pages to avoid recreating on every render
  const renderedPages = useMemo(() => [
    <PageCover key="front-cover" />,
    ...pages.map((elements, index) => {
      const isIndex = elements && elements[0] && elements[0].type === 'index-title';
      return (
        <Page 
          key={`page-${index}`} 
          elements={elements} 
          number={isIndex ? null : index}
          totalPages={pages.length - 1}
          isLeftPage={isMobile ? false : (index % 2 === 0)}
          onPageClick={handlePageClick}
        />
      );
    }),
    <BackCover key="back-cover" />
  ], [pages, isMobile, handlePageClick]);

  if (isMobile) {
    return <MobileMenuBook pages={renderedPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />;
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full overflow-hidden" style={{ perspective: '1500px', contain: 'layout style' }}>
      

      <div className="shadow-2xl rounded-lg">
        <HTMLFlipBook
          width={560}
          height={750}
          size="stretch"
          minWidth={300}
          maxWidth={650}
          minHeight={500}
          maxHeight={850}
          maxShadowOpacity={0.25}
          showCover={true}
          usePortrait={false}
          className="menu-flipbook"
          ref={bookRef}
        >
          {renderedPages}
        </HTMLFlipBook>
      </div>

      <div className="flex justify-center gap-4 mt-8">
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
