/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── COLORS ─────────────────────────────────────────────────────────────
      colors: {
        // Terracotta / Orange palette
        terra: {
          light:   '#ff7043',   // hero badge text
          base:    '#e64a19',   // primary buttons, contact bg
          mid:     '#d84315',   // secondary border, hover
          dark:    '#bf360c',   // gradient end
          darker:  '#a02800',   // deepest hover
          mobile:  '#ff6b35',   // mobile button start
        },
        // Warm Brown palette
        brown: {
          light:   '#5d4a41',   // secondary text / card descriptions
          sienna:  '#a0522d',   // menu title, prices, chips
          warm:    '#d2691e',   // active chip gradient start
          base:    '#2c1e16',   // body text, headings
          deep:    '#3d2a1f',   // submit button gradient start
          darkest: '#1e130d',   // submit button gradient end
        },
        // Background palette
        vanilla:   '#fcf8f2',   // page body background
        splash:    '#1a0a04',   // splash screen background
        hero:      '#3b1c14',   // hero mobile fallback
        // Status colors
        open:      '#2e7d32',   // "Now Open" badge text
        // Accent
        insta:     '#d12a6a',   // Instagram icon
        star:      '#ffc107',   // review stars desktop
        'star-mobile': '#ff8f00', // review stars mobile
      },

      // ── FONT FAMILY ────────────────────────────────────────────────────────
      fontFamily: {
        sans: ['Inter', '-apple-system', 'sans-serif'],
      },

      // ── FONT SIZES ─────────────────────────────────────────────────────────
      fontSize: {
        'hero-title': ['clamp(3rem,6vw,5rem)', { lineHeight: '1.1', fontWeight: '900' }],
        'hero-title-mobile': ['clamp(2.2rem,9vw,3rem)', {}],
        'hero-sub':   ['clamp(1.1rem,2.5vw,1.4rem)', { lineHeight: '1.6' }],
        'section':    ['clamp(2rem,3vw,3rem)', {}],
      },

      // ── BACKGROUND GRADIENTS ───────────────────────────────────────────────
      backgroundImage: {
        'terra-primary':    'linear-gradient(135deg, #e64a19 0%, #bf360c 100%)',
        'terra-hover':      'linear-gradient(135deg, #d84315 0%, #a02800 100%)',
        'terra-mobile':     'linear-gradient(135deg, #ff6b35 0%, #d84315 100%)',
        'terra-mobile-hover': 'linear-gradient(135deg, #e65100 0%, #bf360c 100%)',
        'submit-btn':       'linear-gradient(135deg, #3d2a1f 0%, #1e130d 100%)',
        'chip-active':      'linear-gradient(135deg, #d2691e 0%, #a0522d 100%)',
        'hero-overlay':     'linear-gradient(135deg, rgba(17,17,17,0.95) 0%, rgba(17,17,17,0.3) 100%)',
        'hero-overlay-mobile': 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.92) 100%)',
        'section-underline': 'linear-gradient(90deg, #ff6b35, #d84315)',
        'soon-placeholder': 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        'spin-border':      'conic-gradient(transparent, transparent, transparent, #ffcc80, #d84315)',
      },

      // ── BOX SHADOWS ────────────────────────────────────────────────────────
      boxShadow: {
        'card':         '0 15px 35px rgba(160,82,45,0.04), 0 5px 15px rgba(44,30,22,0.03)',
        'card-hover':   '0 20px 45px rgba(160,82,45,0.08), 0 10px 20px rgba(44,30,22,0.05)',
        'btn-primary':  '0 8px 25px rgba(230,74,25,0.3)',
        'btn-primary-hover': '0 12px 30px rgba(230,74,25,0.4)',
        'contact-info': '0 15px 35px rgba(230,74,25,0.2)',
        'table':        '0 4px 15px rgba(0,0,0,0.05)',
        'map':          '0 4px 15px rgba(0,0,0,0.08)',
        'view-btn':     '0 6px 20px rgba(160,82,45,0.3)',
        'navbar':       '0 4px 20px rgba(0,0,0,0.05)',
        'chip-active':  '0 8px 20px rgba(160,82,45,0.25)',
        'chip-hover':   '0 8px 15px rgba(160,82,45,0.08)',
        'submit':       '0 4px 15px rgba(44,30,22,0.2)',
      },

      // ── BORDER RADIUS ──────────────────────────────────────────────────────
      borderRadius: {
        'card':   '12px',
        'pill':   '100px',
        'badge':  '50px',
        'contact':'16px',
      },

      // ── TRANSITIONS / TIMING ───────────────────────────────────────────────
      transitionTimingFunction: {
        'spring':  'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth':  'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-in': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'splash':  'cubic-bezier(0.65, 0, 0.35, 1)',
      },

      // ── ANIMATION ─────────────────────────────────────────────────────────
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        spinBorder: {
          '100%': { transform: 'rotate(360deg)' },
        },
        logoAppear: {
          '0%':   { opacity: '0', transform: 'translate(calc(50vw - 50% - 5vw), calc(50vh - 50% - 0.6rem)) scale(2.5)' },
          '70%':  { opacity: '1', transform: 'translate(calc(50vw - 50% - 5vw), calc(50vh - 50% - 0.6rem)) scale(3.7)' },
          '100%': { opacity: '1', transform: 'translate(calc(50vw - 50% - 5vw), calc(50vh - 50% - 0.6rem)) scale(3.5)' },
        },
        logoMoveToNav: {
          '0%':   { transform: 'translate(calc(50vw - 50% - 5vw), calc(50vh - 50% - 0.6rem)) scale(3.5)', opacity: '1' },
          '100%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-up':       'fadeUp 1s ease-out',
        'spin-border':   'spinBorder 2.5s linear infinite',
        'logo-appear':   'logoAppear 0.6s ease-out both',
        'logo-to-nav':   'logoMoveToNav 1.8s cubic-bezier(0.65,0,0.35,1) forwards',
      },

      // ── SPACING OVERRIDES ─────────────────────────────────────────────────
      spacing: {
        '5pct': '5%',   // standard horizontal page padding
        '18':   '4.5rem',
        '22':   '5.5rem',
      },

      // ── BACKDROP BLUR ─────────────────────────────────────────────────────
      backdropBlur: {
        'glass': '12px',
        'nav':   '8px',
      },

      // ── MIN HEIGHT ────────────────────────────────────────────────────────
      minHeight: {
        'hero':        '100vh',
        'hero-mobile': '80vh',
        'branch-img':  '300px',
      },
    },
  },
  plugins: [],
}
