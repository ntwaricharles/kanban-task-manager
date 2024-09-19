module.exports = {
  darkMode: 'class',  // Enable dark mode via a CSS class
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      screens: { // Customize screen breakpoints for responsiveness
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
      colors: {
        'dark-gray': '#20212C',
        'darker-blue': '#000112',
        'light-purple': '#A8A4FF',
        'dark-purple': '#635FC7',
        'dark': '#2B2C37',
        'grayish-dark': '#3E3F4E',
        'grayish-blue': '#828FA3',
        'light-grayish-blue': '#E4EBFA',
        'lighter-grayish-blue': '#F4F7FD',
        'white': '#FFFFFF',
        'red': '#EA5555',
        'light-red': '#FF9898',
      },
    },
  },
  plugins: [],
};
