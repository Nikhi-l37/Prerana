import React from 'react';

const Footer = () => (
  <footer className="border-t border-[#f0dcc8] px-[5%] pt-16 pb-8 text-center bg-transparent">
    <div className="mb-12 flex flex-col items-center">
      <h4 className="text-[#888] tracking-[2px] text-[0.9rem] font-semibold mb-6 uppercase">FOLLOW US</h4>
      <a
        href="https://www.instagram.com/preranafirewoodbiryani?igsh=cmp2eGFmYjZ4dXJv"
        target="_blank"
        rel="noopener noreferrer"
        className="text-insta inline-block transition-transform duration-300 hover:scale-[1.15] hover:-translate-y-1"
        style={{ color: '#d12a6a' }}
      >
        <svg viewBox="0 0 24 24" width="36" height="36" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      </a>
    </div>
    <div className="border-t border-gray-200 pt-8 flex justify-between items-center flex-wrap gap-6 max-md:flex-col max-md:justify-center max-md:text-center">
      <p className="text-[#777] text-[0.85rem] tracking-[0.5px] font-medium uppercase">
        COPYRIGHT &copy; 2026 PRERANA FIREWOOD BIRYANI - ALL RIGHTS RESERVED.
      </p>
      <div className="flex flex-col text-right max-md:text-center max-md:mt-6">
        <span className="text-[0.7rem] text-[#999] tracking-[1.5px] mb-[2px]">DEVELOPED BY</span>
        <span className="text-[0.95rem] text-[#333] font-bold tracking-[0.5px]">SIVADA NIKHIL REDDY</span>
        <a
          href="mailto:s.nikhilreddy3446@gmail.com"
          className="text-[0.8rem] no-underline mt-1 font-medium transition-colors hover:underline"
          style={{ color: '#d84315' }}
          onMouseOver={e => e.currentTarget.style.color = '#bf360c'}
          onMouseOut={e => e.currentTarget.style.color = '#d84315'}
        >
          s.nikhilreddy3446@gmail.com
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
