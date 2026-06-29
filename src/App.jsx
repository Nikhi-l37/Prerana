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
        <ul className="hidden md:flex gap-10 list-none m-0 p-0 items-center">
          <li><Link to="/" className={`font-medium text-base transition-colors no-underline ${isScrolled ? 'text-gray-800 hover:text-[#d84315]' : 'text-white hover:text-gray-300'}`}>Home</Link></li>
          <li>
            <Link to="/branches" className="header-branches-btn">
              <span className="header-branches-btn-border"><span className="header-branches-btn-rotator"></span></span>
              <span className="header-branches-btn-text">Our Branches</span>
            </Link>
          </li>
          <li><Link to="/#reviews" className={`font-medium text-base transition-colors no-underline ${isScrolled ? 'text-gray-800 hover:text-[#d84315]' : 'text-white hover:text-gray-300'}`}>Reviews</Link></li>
          <li><Link to="/#contact" className={`font-medium text-base transition-colors no-underline ${isScrolled ? 'text-gray-800 hover:text-[#d84315]' : 'text-white hover:text-gray-300'}`}>Contact</Link></li>
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

    </div>
  );
}

export default App;