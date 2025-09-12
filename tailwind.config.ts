import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'desktop-900': '900px',  // Custom breakpoint
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Custom brand colors (actively used)
        'deep-blue': '#0e4c92',
        'light-gray': '#f8fafc',
        'charcoal': '#1e293b',
        'professional-gray': '#64748b',
        'border-gray': '#e2e8f0',
        'text-blue': '#1d293d',
      },
      fontFamily: {
        'londrina': ['Londrina Solid', 'sans-serif'],
        'bebas-neue': ['var(--font-bebas-neue)', 'Arial', 'sans-serif'],
        'roboto': ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        'heading': ['var(--font-bebas-neue)', 'Arial', 'sans-serif'],
        'body': ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        'ui': ['var(--font-roboto)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-roboto)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xs': '0.25rem',
        'sm': '0.375rem',
        'DEFAULT': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'DEFAULT': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        'card': '0 1px 3px 0 rgb(0 0 0 / 0.05)',
        'hover': '0 4px 12px 0 rgb(0 0 0 / 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    plugin(function({ addBase, addComponents, theme }) {      
      addBase({
        /* Global Styles */
        'html': {
          'scroll-behavior': 'smooth',
          'scroll-padding-top': '120px',
        },
        
        /* Headings */
        'h1, h2, h3, h4, h5, h6': {
          fontFamily: 'var(--font-bebas-neue), Arial, sans-serif',
          fontWeight: '400',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          lineHeight: '1.2',
        },
        
        /* Scrollbar */
        '::-webkit-scrollbar': {
          width: '8px',
        },
        '::-webkit-scrollbar-track': {
          backgroundColor: theme('colors.light-gray'),
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: theme('colors.charcoal'),
          borderRadius: theme('borderRadius.DEFAULT'),
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: theme('colors.deep-blue'),
        },
        
        /* Focus styles */
        '*:focus-visible': {
          outline: `2px solid ${theme('colors.deep-blue')}`,
          outlineOffset: '2px',
        },
        
        /* Interactive elements */
        'button, [role="button"], input[type="submit"], input[type="button"], a, label, select, [role="tab"], [role="menuitem"], [aria-expanded]': {
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out',
        },
        
        /* Disabled states */
        'button:disabled, [role="button"]:disabled, input[type="submit"]:disabled, input[type="button"]:disabled': {
          opacity: '0.5',
          cursor: 'not-allowed',
        },
        
        /* Clickable elements */
        '[onclick], [data-clickable="true"]': {
          cursor: 'pointer',
        },
      })
      
      addComponents({
        /* Typography Classes */
        '.font-heading': {
          fontFamily: 'var(--font-bebas-neue), Arial, sans-serif',
          fontWeight: '400',
          textTransform: 'uppercase',
          letterSpacing: '2px',
        },
        
        '.font-body': {
          fontFamily: 'var(--font-roboto), system-ui, sans-serif',
          fontWeight: '400',
        },
        
        '.font-ui': {
          fontFamily: 'var(--font-roboto), system-ui, sans-serif',
          fontWeight: '500',
        },
        
        /* Navigation and UI elements */
        'nav, button, .btn, [role="button"]': {
          fontFamily: 'var(--font-roboto), system-ui, sans-serif',
          fontWeight: '500',
        },
        
        /* Product cards, pricing, and filters */
        '.product-card, .price, .filter-section': {
          fontFamily: 'var(--font-roboto), system-ui, sans-serif',
        },
        
        /* Footer override */
        'footer': {
          fontFamily: 'var(--font-roboto), system-ui, sans-serif !important',
          textTransform: 'none !important',
          letterSpacing: 'normal !important',
        },
      })
    }),
  ],
}


export default config