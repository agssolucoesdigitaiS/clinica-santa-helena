/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F5F0',
        sage: { DEFAULT: '#A6BDB5', soft: '#C9D8D2', ink: '#5E7A71' },
        petrol: '#334C4B',
        sand: { DEFAULT: '#D8C5B3', soft: '#EADFD3' },
        mist: '#E5E9E7',
        deep: '#22302F',
        clinical: '#FFFFFF',
      },
      fontFamily: {
        display: ['"DM Sans"', 'system-ui', 'sans-serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
      fontSize: {
        'fluid-xs': 'clamp(0.75rem, 0.72rem + 0.15vw, 0.85rem)',
        'fluid-sm': 'clamp(0.9rem, 0.86rem + 0.2vw, 1rem)',
        'fluid-base': 'clamp(1rem, 0.95rem + 0.25vw, 1.15rem)',
        'fluid-lg': 'clamp(1.15rem, 1.05rem + 0.5vw, 1.45rem)',
        'fluid-xl': 'clamp(1.5rem, 1.2rem + 1.4vw, 2.4rem)',
        'fluid-2xl': 'clamp(2rem, 1.4rem + 2.8vw, 3.8rem)',
        'fluid-3xl': 'clamp(2.5rem, 1.5rem + 4.6vw, 5.6rem)',
        'fluid-4xl': 'clamp(2.6rem, 1.2rem + 6.4vw, 7.4rem)',
      },
      borderRadius: { organic: '42% 58% 46% 54% / 52% 44% 56% 48%' },
      boxShadow: {
        soft: '0 20px 60px -24px rgba(34,48,47,0.25)',
        float: '0 12px 40px -12px rgba(34,48,47,0.22)',
      },
      transitionTimingFunction: { organic: 'cubic-bezier(0.22, 1, 0.36, 1)' },
    },
  },
  plugins: [],
};
