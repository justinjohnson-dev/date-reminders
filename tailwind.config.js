module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  darkMode: 'media', // or 'class'
  theme: {
    extend: {
      width: {
        'half-screen': '50vw',
      },
      translate: {
        '9/10': '90%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
