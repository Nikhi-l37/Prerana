import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import BranchPage from './pages/BranchPage';
import BranchesList from './pages/BranchesList';
import './styles/app.css';
import logo from './assets/images/logo.webp';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // 'center' = logo visible at center, 'moving' = animating to navbar, 'done' = finished
  const [splash, setSplash] = useState(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('prerana_splash')) {
      return 'done';
    }
    return isHomePage ? 'center' : 'done';
  });

  useEffect(() => {
    if (splash === 'done') return;

    document.body.style.overflow = 'hidden';

    // After 1.5s of showing centered logo, start the move animation
    const timer = setTimeout(() => {
      setSplash('moving');
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [splash]);

  // Called when the CSS move animation finishes
  const handleAnimationEnd = useCallback((e) => {
    if (e.animationName === 'logoMoveToNav') {
      // First fade out the overlay smoothly, THEN remove from DOM
      setSplash('fading');
      setTimeout(() => {
        setSplash('done');
        document.body.style.overflow = '';
        sessionStorage.setItem('prerana_splash', '1');
      }, 200);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update background blur state
      setIsScrolled(currentScrollY > 100);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const showSplash = splash !== 'done';

  return (
    <div className="app-container">

      {/* SPLASH OVERLAY */}
      {showSplash && (
        <div className={`splash-overlay ${splash === 'moving' || splash === 'fading' ? 'splash-overlay--moving' : ''} ${splash === 'fading' ? 'splash-overlay--fading' : ''}`}>
          <div className={`splash-bg ${splash === 'moving' || splash === 'fading' ? 'splash-bg--hide' : ''}`} />
          <img
            src={logo}
            alt="Prerana Logo"
            className={`splash-logo ${splash === 'center' ? 'splash-logo--center' : ''} ${splash === 'moving' ? 'splash-logo--move' : ''}`}
            onAnimationEnd={handleAnimationEnd}
          />
        </div>
      )}

      {/* GLOBAL NAVBAR */}
      <nav className={`fixed w-full top-0 z-[100] px-5 md:px-[5%] py-2 md:py-3 flex justify-between items-center transition-all duration-500 ease-in-out ${isScrolled ? 'bg-white/20 backdrop-blur-2xl border-b border-white/20 shadow-sm' : 'bg-transparent'} ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`} style={{contain: 'layout'}}>
        <div className="flex items-center">
          <Link to="/" className="flex items-center no-underline">
            <img
              src={logo}
              alt="Prerana Firewood Biryani Logo"
              className={`navbar-logo ${showSplash ? 'navbar-logo--hidden' : ''}`}
            />
          </Link>
        </div>
        
        {/* Mobile View: Dedicated Branches Button */}
        <div className="md:hidden flex items-center">
          <Link 
            to="/branches" 
            className="header-branches-btn"
            style={{ opacity: showSplash ? 0 : 1 }}
          >
            <span className="header-branches-btn-border"><span className="header-branches-btn-rotator"></span></span>
            <span className="header-branches-btn-text">Branches</span>
          </Link>
        </div>

        {/* Desktop View: Full Navigation */}
        <ul className="desktop-nav-links">
          <li><Link to="/" className="desktop-nav-link">Home</Link></li>
          <li>
            <Link to="/branches" className="header-branches-btn header-branches-btn--desktop">
              <span className="header-branches-btn-border"><span className="header-branches-btn-rotator"></span></span>
              <span className="header-branches-btn-text">Our Branches</span>
            </Link>
          </li>
          <li><Link to="/#reviews" className="desktop-nav-link">Reviews</Link></li>
          <li><Link to="/#contact" className="desktop-nav-link">Contact</Link></li>
        </ul>
      </nav>

      {/* PAGE CONTENT */}
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/branches" element={<BranchesList />} />
          <Route path="/branch/:branchId" element={<BranchPage />} />
        </Routes>
      </div>

      {/* GLOBAL FOOTER */}
      <footer className="global-footer">
        <div className="footer-content">
          <h4 className="footer-title">FOLLOW US</h4>
          <a 
            href="https://www.instagram.com/preranafirewoodbiryani?igsh=cmp2eGFmYjZ4dXJv" 
            target="_blank" 
            rel="noopener noreferrer"
            className="insta-link"
          >
            <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="insta-icon">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        </div>
        <div className="footer-bottom">
          <p className="copyright">COPYRIGHT &copy; 2026 PRERANA FIREWOOD BIRYANI - ALL RIGHTS RESERVED.</p>
          <div className="developer-credit">
            <span className="powered-by">DEVELOPED BY</span>
            <span className="dev-name">SIVADA NIKHIL REDDY</span>
            <a href="mailto:s.nikhilreddy3446@gmail.com" className="dev-email">s.nikhilreddy3446@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;