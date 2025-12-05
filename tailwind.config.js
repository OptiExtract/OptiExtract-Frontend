/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend Deca", "sans-serif"],
      },
      colors: {
        accent: {
          dark: "var(--accent-dark)",
          mid: "var(--accent-mid)",
        },
        primary: {
          DEFAULT: "var(--primary)",
        },
        neutral: {
          dark: "var(--neutral-dark)",
          light: "var(--neutral-light)",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
