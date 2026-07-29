import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import MobileMenuBook from './MobileMenuBook';
import logo from '../assets/images/logo.webp';

// Physical Page component
const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover bg-gradient-to-br from-[#fff7ed] via-[#ffedd5] to-[#fed7aa] text-[#2c1e16] flex flex-col items-center justify-center p-6 md:p-10 shadow-[inset_0_0_40px_rgba(216,67,21,0.2)]" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} ref={ref} data-density="hard">
      {/* Spine shadow */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#9a3412]/15 via-[#9a3412]/5 to-transparent z-10"></div>
      
      {/* Elegant Inner Frame */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full border border-[#d84315]/20 p-2 rounded-sm bg-white/70">
        <div className="flex flex-col items-center justify-center h-full w-full border-[3px] border-double border-[#d84315]/40 rounded-sm p-4 md:p-8 text-center relative overflow-hidden">
          
          {/* Removed background glow to keep it clean */}
          <img src={logo} alt="Prerana Logo" className="w-48 md:w-64 mt-20 md:mt-24 mb-8 relative z-10 transition-transform duration-700 hover:scale-105" />
          
          <div className="relative z-10 flex flex-col items-center">
            <p className="text-[#d84315] text-xs md:text-sm tracking-[0.4em] font-bold mb-3 uppercase">Discover</p>
            <h1 className="text-2xl md:text-3xl font-black tracking-[0.15em] text-[#9a3412] uppercase drop-shadow-md">Our Menu</h1>
            
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
    <div className={`page ${isLeftPage ? 'page-left' : 'page-right'} bg-gradient-to-br from-[#fff7ed] via-[#ffedd5] to-[#fed7aa] text-[#2c1e16] p-4 md:p-6 overflow-hidden`} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} ref={ref} data-density="soft">
      {/* Spine shadow */}
      <div className={`absolute top-0 bottom-0 w-12 z-10 pointer-events-none ${isLeftPage ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'} from-[#9a3412]/15 to-transparent`}></div>
      
      {/* Frosted inner card */}
      <div className={`relative z-20 flex flex-col h-full w-full border border-[#d84315]/40 bg-white/90 shadow-[0_0_20px_rgba(216,67,21,0.05)] rounded-sm pt-6 pb-24 px-5 md:px-8`}>
        
        {/* Premium Elegant Restaurant Border Design */}
        {/* Main thin inset border */}
        <div className="absolute inset-2 md:inset-3 border-[2px] border-[#d84315]/60 rounded-sm pointer-events-none"></div>
        
        {/* Decorative Corner Brackets */}
        <div className="absolute top-1.5 left-1.5 md:top-2.5 md:left-2.5 w-4 h-4 md:w-6 md:h-6 border-t-[3px] border-l-[3px] border-[#d84315]/70 pointer-events-none"></div>
        <div className="absolute top-1.5 right-1.5 md:top-2.5 md:right-2.5 w-4 h-4 md:w-6 md:h-6 border-t-[3px] border-r-[3px] border-[#d84315]/70 pointer-events-none"></div>
        <div className="absolute bottom-1.5 left-1.5 md:bottom-2.5 md:left-2.5 w-4 h-4 md:w-6 md:h-6 border-b-[3px] border-l-[3px] border-[#d84315]/70 pointer-events-none"></div>
        <div className="absolute bottom-1.5 right-1.5 md:bottom-2.5 md:right-2.5 w-4 h-4 md:w-6 md:h-6 border-b-[3px] border-r-[3px] border-[#d84315]/70 pointer-events-none"></div>

        {/* Small Corner Diamonds */}
        <div className="absolute top-1 left-1 md:top-2 md:left-2 w-1.5 h-1.5 bg-[#d84315]/40 rotate-45 pointer-events-none"></div>
        <div className="absolute top-1 right-1 md:top-2 md:right-2 w-1.5 h-1.5 bg-[#d84315]/40 rotate-45 pointer-events-none"></div>
        <div className="absolute bottom-1 left-1 md:bottom-2 md:left-2 w-1.5 h-1.5 bg-[#d84315]/40 rotate-45 pointer-events-none"></div>
        <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 w-1.5 h-1.5 bg-[#d84315]/40 rotate-45 pointer-events-none"></div>

        {/* Subtle logo watermark pattern for all pages */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none flex items-center justify-center">
          <img src={logo} alt="" className="w-[200px] h-[200px] object-contain" draggable="false" />
        </div>

        <div className="relative z-30 h-full flex flex-col justify-start">
          <div className={`relative z-30 flex flex-col justify-start ${isIndexPage ? 'gap-1 md:gap-1.5' : 'gap-1.5 md:gap-1.5'}`}>
            {elements && elements.map((el, idx) => {
              if (el.type === 'index-title') {
                return (
                  <div key={idx} className="text-center pt-2 pb-1 first:pt-0">
                    <h1 className="text-[0.9rem] md:text-[1rem] font-bold text-[#d84315] uppercase tracking-wider">{el.name}</h1>
                    <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#d84315]/50 to-transparent mx-auto mt-1"></div>
                  </div>
                );
              }
              
              if (el.type === 'index-item') {
                return (
                  <button 
                    key={idx} 
                    onClick={() => onPageClick && onPageClick(el.targetFlipIndex)}
                    className="flex justify-between items-end pb-0 text-[0.75rem] md:text-[0.85rem] w-full text-left bg-transparent border-none p-0 cursor-pointer hover:text-[#d84315] group transition-colors font-sans"
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
                    <h2 className="text-[0.9rem] md:text-[1rem] font-bold text-[#d84315] uppercase tracking-wider">{el.name}</h2>
                    <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#d84315]/50 to-transparent mx-auto mt-1"></div>
                  </div>
                );
              }
              return (
                <div key={idx} className="flex justify-between items-end border-b border-dashed border-[#2c1e16]/20 pb-0.5 hover:border-[#d84315]/50 transition-colors">
                  <span className="font-bold text-[0.75rem] md:text-[0.85rem] bg-transparent pr-2 relative top-[2px]">{el.name}</span>
                  <span className="font-bold text-[0.85rem] md:text-[0.95rem] text-[#d84315] bg-transparent pl-2 relative top-[2px]">₹{el.price}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Page Number Placed in the outer page margin */}
      {number !== null && number !== undefined && (
        <div className={`absolute bottom-1 md:bottom-2 ${isLeftPage ? 'left-2 md:left-3' : 'right-2 md:right-3'} text-[#d84315] font-bold text-[0.7rem] md:text-xs opacity-60 z-30 font-serif`}>
          {number} / {totalPages}
        </div>
      )}
    </div>
  );
});

const BackCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover bg-gradient-to-br from-[#fff7ed] via-[#ffedd5] to-[#fed7aa] text-[#2c1e16] flex flex-col items-center justify-center p-8 shadow-[inset_0_0_40px_rgba(216,67,21,0.2)]" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }} ref={ref} data-density="hard">
      {/* Spine shadow for back cover (Spine is on the right side of the inner left page) */}
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#9a3412]/15 via-[#9a3412]/5 to-transparent z-10"></div>
      
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

  const handlePageClick = useCallback((targetFlipIndex) => {
    if (isMobile) {
      setCurrentPage(targetFlipIndex);
    } else {
      if (bookRef.current) {
        bookRef.current.pageFlip().turnToPage(targetFlipIndex);
      }
    }
  }, [isMobile]);

  // Prepare pages dynamically with sequential packing
  const { pages, numTocPages } = useMemo(() => {
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

    // Pre-calculate total units per category for smart page-break decisions
    const categoryTotalUnits = {};
    Object.entries(menuData).forEach(([category, items]) => {
      const hUnit = isMobile ? 1.5 : 1.8;
      let total = hUnit;
      items.forEach(item => {
        total += isMobile ? 1.0 : (item.name.length > 20 ? 1.7 : 1.0);
      });
      categoryTotalUnits[category] = total;
    });

    const paginatedPages = [];
    const maxUnits = isMobile ? 17 : 9;
    
    let currentPageElements = [];
    let currentUnits = 0;

    flatElements.forEach((el) => {
      let headerToInsert = null;
      if (el.isFirstOfCategory) {
        headerToInsert = { type: 'header', name: el.category };
      }

      const itemUnit = isMobile ? 1.0 : (el.name.length > 20 ? 1.7 : 1.0);
      const headerUnit = isMobile ? 1.5 : 1.8;

      // Smart page break: only force a new page if the entire new category
      // won't fit in the remaining space (lets small categories share a page)
      if (headerToInsert && currentPageElements.length > 0) {
        const remainingSpace = maxUnits - currentUnits;
        if (categoryTotalUnits[el.category] > remainingSpace) {
          paginatedPages.push(currentPageElements);
          currentPageElements = [];
          currentUnits = 0;
        }
      }

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

    const tocItems = [];
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
        tocItems.push({ 
          type: 'index-item', 
          name: group.displayName, 
          pageNum: pageRangeStr,
          targetPage: minPage
        });
      }
    });

    const TOC_PAGES = [];
    let currentTocPage = [{ type: 'index-title', name: 'Table of Contents' }];
    const MAX_TOC_ITEMS = 16; // Fits all Thanisandra categories on one TOC page
    
    tocItems.forEach((item) => {
      if (currentTocPage.length >= MAX_TOC_ITEMS) {
        TOC_PAGES.push(currentTocPage);
        currentTocPage = [{ type: 'index-title', name: 'Table of Contents (Contd.)' }];
      }
      currentTocPage.push(item);
    });
    if (currentTocPage.length > 1) {
      TOC_PAGES.push(currentTocPage);
    }

    const numTocPages = TOC_PAGES.length;

    TOC_PAGES.forEach(tocPage => {
       tocPage.forEach(el => {
          if (el.type === 'index-item') {
             el.targetFlipIndex = el.targetPage + numTocPages;
          }
       });
    });

    // Insert Index Pages in reverse so they end up in correct order at the front
    TOC_PAGES.reverse().forEach(tocPage => {
       paginatedPages.unshift(tocPage);
    });

    // CRITICAL: Desktop book must have an EVEN number of inner pages to close properly (left vs right parity).
    if (!isMobile && paginatedPages.length % 2 !== 0) {
      paginatedPages.push([
        { type: 'header', name: 'Enjoy your meal!' }
      ]);
    }

    return { pages: paginatedPages, numTocPages };
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
          number={isIndex ? null : (index - numTocPages + 1)}
          totalPages={pages.length - numTocPages}
          isLeftPage={isMobile ? false : (index % 2 === 0)}
          onPageClick={handlePageClick}
        />
      );
    }),
    <BackCover key="back-cover" />
  ], [pages, numTocPages, isMobile, handlePageClick]);

  if (isMobile) {
    return <MobileMenuBook pages={renderedPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />;
  }

  return (
    <div className="flex flex-col items-center justify-center py-8 w-full overflow-hidden" style={{ perspective: '1500px', contain: 'layout style' }}>
      

      <div className="flex justify-center items-center">
        <HTMLFlipBook
          width={600}
          height={800}
          size="stretch"
          minWidth={300}
          maxWidth={700}
          minHeight={500}
          maxHeight={900}
          maxShadowOpacity={0.25}
          showCover={true}
          usePortrait={false}
          className="menu-flipbook"
          ref={bookRef}
        >
          {renderedPages}
        </HTMLFlipBook>
      </div>

      <div className="flex justify-center gap-4 relative z-40 -mt-8 md:-mt-12">
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
