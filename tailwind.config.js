/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "mihoyo-en": ["MihoyoFont-EN", "system-ui", "sans-serif"],
        "mihoyo-id": ["MihoyoFont-ID", "system-ui", "sans-serif"],
        "mihoyo-jp": ["MihoyoFont-JP", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
