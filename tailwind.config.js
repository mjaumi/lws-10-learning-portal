/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        'learning-portal-theme': {
          primary: '#080E1B',
          secondary: '#34B5FD',
          accent: '#DC2626',
          neutral: '#3d4451',
          'base-100': '#0A1121',
          'base-200': '#F43F5E',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}

