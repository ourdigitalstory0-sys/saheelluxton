/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        milky: {
          50: '#FFFFFF',
          100: '#FAF8F5',
          200: '#F4F0E8',
          300: '#ECE6D8',
          400: '#DFD7C2',
          500: '#C8BEA3',
        },
        champagne: {
          50: '#FFFDF7',
          100: '#FFF9E6',
          200: '#FEF0C3',
          300: '#FDE18A',
          400: '#F5C854',
          500: '#D4A017',
          600: '#B8860B',
          700: '#946608',
          800: '#754E0B',
          900: '#543606'
        },
        slateRich: {
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
          500: '#64748B',
          400: '#94A3B8',
        }
      },
      fontFamily: {
        cinzel: ['"Cinzel"', 'serif'],
        garamond: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Montserrat"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'milky-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 50%, #F4F0E8 100%)',
        'champagne-gradient': 'linear-gradient(135deg, #B8860B 0%, #D4A017 50%, #754E0B 100%)',
        'gold-metallic': 'linear-gradient(135deg, #DFB75A 0%, #B8860B 50%, #8C5E0D 100%)',
        'milky-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(250, 248, 245, 0.7) 100%)',
        'milky-mesh': 'radial-gradient(at 15% 15%, rgba(212, 160, 23, 0.12) 0px, transparent 55%), radial-gradient(at 85% 20%, rgba(184, 134, 11, 0.08) 0px, transparent 50%), radial-gradient(at 50% 85%, rgba(244, 240, 232, 0.8) 0px, transparent 60%)'
      },
      boxShadow: {
        'milky-card': '0 20px 45px -15px rgba(15, 23, 42, 0.07), inset 0 1px 2px 0 rgba(255, 255, 255, 0.95)',
        'milky-hover': '0 25px 55px -12px rgba(184, 134, 11, 0.18), 0 0 25px rgba(212, 160, 23, 0.15), inset 0 1px 2px 0 rgba(255, 255, 255, 1)',
        'gold-glow': '0 0 25px rgba(184, 134, 11, 0.3)',
        'gold-glow-lg': '0 0 45px rgba(184, 134, 11, 0.4)',
      }
    },
  },
  plugins: [],
}
