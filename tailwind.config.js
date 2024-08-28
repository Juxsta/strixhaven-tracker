/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    flowbite.content(), // Added Flowbite React content path
  ],
  safelist: [
    'w-64',
    'w-1/2',
    'rounded-l-lg',
    'rounded-r-lg',
    'bg-gray-200',
    'grid-cols-4',
    'grid-cols-7',
    'h-6',
    'leading-6',
    'h-9',
    'leading-9',
    'shadow-lg'
  ],

  // enable dark mode via class strategy
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'cinzel': ['"Cinzel Decorative"', 'cursive'],
        'lora': ['Lora', 'serif'],
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    flowbite.plugin(), // Added Flowbite React plugin
  ]
}