import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom brand colors
        'deep-blue': '#0e4c92',
        'teal': '#00a8a8',
        'light-gray': '#f5f5f5',
        'charcoal': '#333333',
        
        // Semantic color mappings
        primary: {
          50: '#eff8ff',
          100: '#dbeefe',
          200: '#bfe2fe',
          300: '#93d1fd',
          400: '#60b7fa',
          500: '#3b97f6',
          600: '#2575eb',
          700: '#1d5dd8',
          800: '#1e4bb0',
          900: '#0e4c92', // deep-blue
          950: '#0f2a4a',
        },
        secondary: {
          50: '#ecfffe',
          100: '#cffffe',
          200: '#a5fffd',
          300: '#67fffa',
          400: '#22fff3',
          500: '#00e9de',
          600: '#00bab7',
          700: '#00a8a8', // teal
          800: '#05817e',
          900: '#0a6a68',
          950: '#003d3d',
        },
        neutral: {
          50: '#f9f9f9',
          100: '#f5f5f5', // light-gray
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#333333', // charcoal
          900: '#171717',
          950: '#0a0a0a',
        },
        
        // Component-specific colors derived from brand colors
        background: '#f5f5f5', // light-gray
        foreground: '#333333', // charcoal
        card: '#ffffff',
        'card-foreground': '#333333',
        popover: '#ffffff',
        'popover-foreground': '#333333',
        muted: '#f5f5f5',
        'muted-foreground': '#666666',
        border: '#e5e5e5',
        input: '#ffffff',
        ring: '#0e4c92',
        
        // State colors (keeping good contrast)
        destructive: {
          DEFAULT: '#dc2626',
          foreground: '#ffffff',
        },
        success: {
          DEFAULT: '#16a34a',
          foreground: '#ffffff',
        },
        warning: {
          DEFAULT: '#ea580c',
          foreground: '#ffffff',
        },
        info: {
          DEFAULT: '#0e4c92',
          foreground: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
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
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'brand': '0 4px 14px 0 rgba(14, 76, 146, 0.15)',
        'teal': '0 4px 14px 0 rgba(0, 168, 168, 0.15)',
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
  plugins: [],
}

export default config