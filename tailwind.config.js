/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#0f172a',
        'sidebar-hover': '#1e293b',
        'sidebar-active': '#1d4ed8',
        brand: '#2563eb',
        'brand-light': '#dbeafe',
      },
    },
  },
  plugins: [],
};
