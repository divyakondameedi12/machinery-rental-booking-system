/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FBF8F1',
          100: '#F5EFE2',
          200: '#EDE2CC',
          300: '#E2D2B0',
        },
        beige: {
          400: '#D4B896',
          500: '#C9A876',
          600: '#B8935E',
        },
        earth: {
          50: '#F6F7F2',
          100: '#E8EBE0',
          200: '#C9D2B8',
          300: '#A7B894',
          400: '#7E9468',
          500: '#5E7A4A',
          600: '#4A6339',
          700: '#3A4F2E',
          800: '#2E3E25',
          900: '#24301D',
        },
        soil: {
          400: '#A98463',
          500: '#8B6B4A',
          600: '#6F5538',
          700: '#564127',
        },
        tractor: {
          500: '#C8362C',
          600: '#B12A22',
          700: '#94221C',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -4px rgba(60, 70, 40, 0.12)',
        'card-hover': '0 12px 32px -6px rgba(60, 70, 40, 0.22)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out both',
        'fade-in': 'fadeIn 0.4s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
