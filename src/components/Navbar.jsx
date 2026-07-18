import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.webp';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const [splash, setSplash] = useState(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('prerana_splash')) return 'done';
    return isHomePage ? 'center' : 'done';
  });

  // Guarantee that the splash flag is saved if we are in 'done' state
  // This prevents the splash logo from blinking if the navbar ever remounts
  useEffect(() => {
    if (splash === 'done' && typeof window !== 'undefined') {
      sessionStorage.setItem('prerana_splash', '1');
    }
  }, [splash]);

  useEffect(() => {
    if (splash === 'done') return;
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => setSplash('moving'), 2500);
    return () => { clearTimeout(timer); document.body.style.overflow = ''; };
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
      setIsNavVisible(!(currentScrollY > lastScrollYRef.current && currentScrollY > 100));
      lastScrollYRef.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset navbar states on route change to prevent transitions and blinking glitches
  useEffect(() => {
    setIsScrolled(false);
    setIsNavVisible(true);
    lastScrollYRef.current = 0;
  }, [location.pathname]);

  const showSplash = splash !== 'done';

  return (
    <>
      {/* SPLASH OVERLAY — complex animation stays in CSS */}
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

      {/* NAVBAR */}
      <nav
        className={`fixed w-full top-0 z-[100] px-5 md:px-[5%] py-2 md:py-3 flex justify-between items-center transition-all duration-500 ease-in-out
          ${isScrolled ? 'backdrop-blur-xl border-b border-white/30 shadow-navbar' : 'bg-transparent'}
          ${isNavVisible ? 'translate-y-0' : '-translate-y-full'}`}
        style={isScrolled ? { background: 'rgba(255, 255, 255, 0.35)', contain: 'layout' } : { contain: 'layout' }}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center no-underline">
            <img
              src={logo}
              alt="Prerana Firewood Biryani Logo"
              className={`navbar-logo ${showSplash ? 'navbar-logo--hidden' : ''}`}
            />
          </Link>
        </div>

        {/* Mobile: Famous Items Button */}
        <div className="md:hidden flex items-center">
          <Link
            to="/famous-items"
            className="header-branches-btn"
            style={{ opacity: showSplash ? 0 : 1 }}
          >
            <span className="header-branches-btn-border"><span className="header-branches-btn-rotator"></span></span>
            <span className="header-branches-btn-text">Famous Items</span>
          </Link>
        </div>

        {/* Desktop: Full Nav */}
        <ul className="hidden md:flex gap-10 list-none m-0 p-0 items-center">
          <li>
            <Link to="/" className="font-semibold text-[0.95rem] text-brown-base no-underline transition-colors duration-200 hover:text-terra-base" style={{ color: '#2c1e16' }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/famous-items" className="header-branches-btn header-branches-btn--desktop">
              <span className="header-branches-btn-border"><span className="header-branches-btn-rotator"></span></span>
              <span className="header-branches-btn-text">Famous Items</span>
            </Link>
          </li>
          <li>
            <Link to="/#order-online" className="font-semibold text-[0.95rem] text-brown-base no-underline transition-colors duration-200 hover:text-terra-base" style={{ color: '#2c1e16' }}>
              Order Online
            </Link>
          </li>
          <li>
            <Link to="/#reviews" className="font-semibold text-[0.95rem] text-brown-base no-underline transition-colors duration-200 hover:text-terra-base" style={{ color: '#2c1e16' }}>
              Reviews
            </Link>
          </li>
          <li>
            <Link to="/#contact" className="font-semibold text-[0.95rem] text-brown-base no-underline transition-colors duration-200 hover:text-terra-base" style={{ color: '#2c1e16' }}>
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
