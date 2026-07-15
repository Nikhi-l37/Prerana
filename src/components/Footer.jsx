import React from 'react';

const Footer = () => (
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
);

export default Footer;
