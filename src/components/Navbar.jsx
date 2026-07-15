import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.webp';

const Navbar = () => {
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
    const timer = setTimeout(() => setSplash('moving'), 2500);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [splash]);

  const handleAnimationEnd = useCallback((e) => {
    if (e.animationName === 'logoMoveToNav') {
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
      setIsScrolled(currentScrollY > 100);
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
    <>
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
      <nav
        className={`fixed w-full top-0 z-[100] px-5 md:px-[5%] py-2 md:py-3 flex justify-between items-center transition-all duration-500 ease-in-out ${isScrolled ? 'bg-white/20 backdrop-blur-2xl border-b border-white/20 shadow-sm' : 'bg-transparent'} ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}
        style={{ contain: 'layout' }}
      >
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
    </>
  );
};

export default Navbar;
