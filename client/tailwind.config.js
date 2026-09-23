/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0f1c33',
        navy2: '#132542',
        navyDeep: '#0a1424',
        cream: '#f7f3ec',
        cream2: '#f0e9dc',
        gold: '#c9a227',
        goldLight: '#e0c766',
        ink: '#1c2430',
        mid: '#5b6472',
        soft: '#8891a0',
        line: 'rgba(15,28,51,0.10)',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      maxWidth: { page: '1180px' },
      boxShadow: {
        card: '0 10px 30px rgba(15,28,51,0.08)',
        cardHover: '0 20px 45px rgba(15,28,51,0.14)',
        gold: '0 0 0 1px rgba(201,162,39,0.4), 0 10px 30px rgba(201,162,39,0.18)',
      },
    },
  },
  plugins: [],
};
