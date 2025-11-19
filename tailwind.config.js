/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          dark: "var(--accent-dark)",
          mid: "var(--accent-mid)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          500: "var(--primary)",
        },
        neutral: {
          dark: "var(--neutral-dark)",
          light: "var(--neutral-light)",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(to bottom right, var(--accent-dark), #101828)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
