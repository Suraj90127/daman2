/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'up-down': {
          '0%, 100%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
      animation: {
        'up-down': 'up-down 0.5s ease-in-out infinite',
        slideUp: 'slideUp 17s linear infinite',
      },
      backgroundImage: {
        'custom-radial-gradient': 'radial-gradient(circle at 100% 0, var(--bg-nav) 9px, var(--bg-blue-500) 3px)',
      }
    },
  },
  plugins: [],
}

