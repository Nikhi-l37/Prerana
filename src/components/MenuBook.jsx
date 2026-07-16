import React, { useRef, useState, useEffect, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import logo from '../assets/images/logo.webp';

/* ────────────────────────────────────────────────────────────
   COVER PAGES — "hard" density so they don't bend during flip
   ──────────────────────────────────────────────────────────── */

const PageCover = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    className="page page-cover"
    data-density="hard"
    style={{
      background: '#2c1e16',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Spine shadow */}
    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 40, background: 'linear-gradient(to right, rgba(0,0,0,0.7), transparent)', zIndex: 10 }} />

    <div style={{ position: 'relative', zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', border: '2px solid rgba(230,74,25,0.3)', borderRadius: 12, padding: '1.5rem' }}>
      <img src={logo} alt="Prerana Logo" style={{ width: '60%', maxWidth: 220, marginBottom: '3rem', filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }} />
      <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 800, letterSpacing: 4, color: '#e64a19', textTransform: 'uppercase', textAlign: 'center', textShadow: '2px 2px 4px rgba(0,0,0,0.5)', margin: 0 }}>Our Menu</h1>
      <div style={{ width: 60, height: 3, background: '#e64a19', margin: '1.5rem 0 1rem' }} />
      <p style={{ color: '#a0522d', fontWeight: 600, letterSpacing: 3, textTransform: 'uppercase', fontSize: '0.8rem', margin: 0 }}>Authentic Firewood Biryani</p>
    </div>
  </div>
));

const BackCover = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    className="page page-cover"
    data-density="hard"
    style={{
      background: '#2c1e16',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Spine shadow */}
    <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 40, background: 'linear-gradient(to left, rgba(0,0,0,0.7), transparent)', zIndex: 10 }} />

    <div style={{ position: 'relative', zIndex: 20, opacity: 0.5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
      <img src={logo} alt="Prerana Logo" style={{ width: 120, marginBottom: 20, filter: 'grayscale(1)' }} />
      <p style={{ letterSpacing: 3, textTransform: 'uppercase', fontSize: '0.75rem', margin: 0 }}>Thank you for dining with us</p>
    </div>
  </div>
));

/* ────────────────────────────────────────────────────────────
   INNER PAGE — uniform padding and heading on every page
   ──────────────────────────────────────────────────────────── */

const Page = React.forwardRef(({ title, items, number }, ref) => (
  <div
    ref={ref}
    className="page"
    style={{
      background: '#fdfaf5',
      color: '#2c1e16',
      padding: '2.5rem 2rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}
  >
    {/* Full-height content wrapper */}
    <div style={{ position: 'relative', zIndex: 20, height: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* HEADING — fixed height container so every page aligns identically */}
      <div style={{ textAlign: 'center', marginBottom: 16, paddingBottom: 12, borderBottom: '2px solid rgba(216,67,21,0.2)', minHeight: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <h2 style={{ fontSize: 'clamp(1.1rem, 3.5vw, 1.6rem)', fontWeight: 700, color: '#d84315', textTransform: 'uppercase', letterSpacing: 1, margin: 0, lineHeight: 1.2 }}>
          {title || '\u00A0'}
        </h2>
      </div>

      {/* ITEMS LIST */}
      <div style={{ flexGrow: 1, overflowY: 'auto' }}>
        {items && items.length > 0 ? (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {items.map((item, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  borderBottom: '1px dashed rgba(44,30,22,0.15)',
                  padding: '6px 0',
                }}
              >
                <span style={{ fontWeight: 600, fontSize: '0.92rem', color: '#2c1e16' }}>{item.name}</span>
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#d84315', whiteSpace: 'nowrap', marginLeft: 8 }}>₹{item.price}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.15 }}>
            <img src={logo} alt="Prerana Logo" style={{ width: 120, filter: 'grayscale(1)' }} />
          </div>
        )}
      </div>

      {/* PAGE NUMBER */}
      <div style={{ textAlign: 'center', paddingTop: 10, fontSize: '0.8rem', fontWeight: 600, color: '#999', flexShrink: 0 }}>
        — {number} —
      </div>
    </div>
  </div>
));

/* ────────────────────────────────────────────────────────────
   BLANK ENDPAPER — the "inside cover" pages
   ──────────────────────────────────────────────────────────── */

const BlankPage = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    className="page"
    data-density="hard"
    style={{
      background: 'linear-gradient(135deg, #ebd6c5 0%, #dcc6b3 100%)',
      position: 'relative',
      boxShadow: 'inset 0 0 30px rgba(0,0,0,0.08)',
    }}
  />
));

/* ────────────────────────────────────────────────────────────
   MENU BOOK — main component
   ──────────────────────────────────────────────────────────── */

const MenuBook = ({ menuData }) => {
  const bookRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  // Build pages from menu data
  const pages = [];
  let pageNum = 1;
  const MAX_ITEMS_PER_PAGE = isMobile ? 12 : 13;

  Object.entries(menuData).forEach(([category, items]) => {
    if (items.length > MAX_ITEMS_PER_PAGE) {
      // Split large categories across multiple pages
      for (let i = 0; i < items.length; i += MAX_ITEMS_PER_PAGE) {
        const chunk = items.slice(i, i + MAX_ITEMS_PER_PAGE);
        const partNum = Math.floor(i / MAX_ITEMS_PER_PAGE) + 1;
        const totalParts = Math.ceil(items.length / MAX_ITEMS_PER_PAGE);
        pages.push({
          title: totalParts > 1 ? `${category} (${partNum}/${totalParts})` : category,
          items: chunk,
          number: pageNum++,
        });
      }
    } else {
      pages.push({ title: category, items, number: pageNum++ });
    }
  });

  // Ensure even page count for proper book closing
  if (pages.length % 2 !== 0) {
    pages.push({ title: '', items: [], number: pageNum++ });
  }

  const onFlip = useCallback((e) => {
    setCurrentPage(e.data);
  }, []);

  const onInit = useCallback((e) => {
    if (bookRef.current) {
      setTotalPages(bookRef.current.pageFlip().getPageCount());
    }
  }, []);

  // Dimensions
  const bookWidth = isMobile ? Math.min(windowWidth - 32, 380) : 480;
  const bookHeight = isMobile ? Math.round(bookWidth * 1.45) : 680;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 0', width: '100%' }}>

      {/* Instruction text */}
      <p style={{ color: '#a0522d', fontWeight: 600, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.95rem' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
          <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
        </svg>
        Swipe or drag corners to flip pages
      </p>

      {/* The Book */}
      <div style={{ boxShadow: '0 25px 60px rgba(44,30,22,0.25)', borderRadius: 8 }}>
        <HTMLFlipBook
          ref={bookRef}
          width={bookWidth}
          height={bookHeight}
          size="stretch"
          minWidth={280}
          maxWidth={550}
          minHeight={400}
          maxHeight={750}
          showCover={true}
          mobileScrollSupport={true}
          usePortrait={true}
          drawShadow={true}
          maxShadowOpacity={0.4}
          flippingTime={800}
          useMouseEvents={true}
          swipeDistance={30}
          clickEventForward={false}
          startZIndex={0}
          autoSize={true}
          className="menu-flipbook"
          onFlip={onFlip}
          onInit={onInit}
          style={{}}
        >
          {/* Front Cover */}
          <PageCover />

          {/* Inside Front Cover (blank endpaper) */}
          <BlankPage />

          {/* Menu Pages */}
          {pages.map((page, index) => (
            <Page key={index} title={page.title} items={page.items} number={page.number} />
          ))}

          {/* Inside Back Cover (blank endpaper) */}
          <BlankPage />

          {/* Back Cover */}
          <BackCover />
        </HTMLFlipBook>
      </div>

      {/* Navigation Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 24 }}>
        <button
          onClick={() => bookRef.current?.pageFlip().flipPrev()}
          style={{
            padding: '10px 24px',
            background: '#fff',
            border: '1.5px solid rgba(216,67,21,0.25)',
            borderRadius: 100,
            fontWeight: 700,
            color: '#d84315',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          ← Prev
        </button>

        <span style={{ fontSize: '0.85rem', color: '#888', fontWeight: 600, minWidth: 80, textAlign: 'center' }}>
          {currentPage + 1} / {totalPages || '...'}
        </span>

        <button
          onClick={() => bookRef.current?.pageFlip().flipNext()}
          style={{
            padding: '10px 24px',
            background: 'linear-gradient(135deg, #e64a19, #bf360c)',
            border: 'none',
            borderRadius: 100,
            fontWeight: 700,
            color: '#fff',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 15px rgba(216,67,21,0.3)',
          }}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default MenuBook;
