/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all React files
    "./public/index.html",       // Include your public HTML file
  ],
  theme: {
    extend: {}, // Add custom theme extensions here, if needed
  },
  plugins: [],
};
