/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      colors: {
        dreams: {
          blue: {
            light: '#93C5FD',
            DEFAULT: '#60A5FA',
            dark: '#3B82F6',
          },
          lilac: {
            light: '#F5E6FF',
            DEFAULT: '#E9D5FF',
            dark: '#D8B4FE',
          },
          bg: {
            light: '#171932',
            DEFAULT: '#0A0A14',
            dark: '#050508',
          },
        },
      },
      zIndex: {
        'modal': '99999',
        'modal-backdrop': '99998',
      },
      keyframes: {
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        gradientMove: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        'progress-bar': 'progress 2s ease-in-out',
        'fade-in': 'fade-in 0.5s ease-out',
        gradientMove: 'gradientMove 3s ease infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 6s ease-in-out infinite 3s',
      },
      backgroundSize: {
        'gradient-large': '400% 400%',
      },
    },
  },
  plugins: [],
};