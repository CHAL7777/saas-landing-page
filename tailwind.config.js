/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Important for ThemeProvider
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: "#020617",
          900: "#0f172a",
          800: "#1e293b",
        },
        emerald: {
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'mesh': 'radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.05) 0, transparent 50%), radial-gradient(at 100% 100%, rgba(20, 184, 166, 0.05) 0, transparent 50%)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        'emerald-glow': '0 0 20px rgba(16, 185, 129, 0.3)',
        'emerald-glow-lg': '0 0 40px rgba(16, 185, 129, 0.2)',
      },
    },
  },
  plugins: [],
}