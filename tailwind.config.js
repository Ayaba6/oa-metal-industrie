/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        industrial: {
          blue: '#0B1B3D',      // Bleu sombre de l'en-tête et du footer
          orange: '#FF6B00',    // Orange des boutons et accents
          light: '#F8F9FA',     // Fond clair
          ink: '#060F24',       // Bleu nuit le plus profond (hero, intro)
          steel: '#E9ECF1',     // Gris acier des fonds de section
          line: '#1C2C52',      // Filets sur fond sombre
        }
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Barlow', 'system-ui', 'sans-serif'],
        sans: ['Barlow', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
      },
    },
  },
  plugins: [],
}
