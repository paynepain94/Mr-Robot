/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // --- AÑADE ESTA SECCIÓN 'fontFamily' ---
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      // ------------------------------------
      colors: {
        'whatsapp-green': '#25D366',
        'whatsapp-dark': '#075E54',
        'gray-soft': '#F0F0F0',
        'text-dark': '#1A1A1A',
      },
    },
  },
  plugins: [],
}