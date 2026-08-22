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
        }
      }
    },
  },
  plugins: [],
}