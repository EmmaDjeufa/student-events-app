/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',    // bleu étudiant dynamique
        secondary: '#fbbf24',  // jaune solaire
        accent: '#10b981',     // vert fun
      },
    },
  },
  plugins: [],
}
