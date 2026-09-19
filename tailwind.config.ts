import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#10141C",
          soft: "#1A2029",
          line: "#2A3240",
        },
        ivory: {
          DEFAULT: "#F6F4EF",
          deep: "#ECE8DF",
          line: "#DCD6C9",
        },
        gold: {
          DEFAULT: "#C49A52",
          soft: "#D8B87C",
          deep: "#9A7737",
        },
        teal: {
          DEFAULT: "#73BFC6",
          deep: "#3E8B93",
        },
      },
      fontFamily: {
        display: ["Didot", "Bodoni MT", "Georgia", "Times New Roman", "serif"],
        sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      letterSpacing: {
        signage: "0.22em",
        wide2: "0.14em",
      },
      transitionDuration: {
        200: "200ms",
      },
      keyframes: {
        stamp: {
          "0%": { transform: "scale(1.6) rotate(-12deg)", opacity: "0" },
          "60%": { transform: "scale(0.94) rotate(-3deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(-3deg)", opacity: "1" },
        },
        pageIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        stamp: "stamp 320ms cubic-bezier(0.2, 0.8, 0.3, 1) both",
        "page-in": "pageIn 240ms ease-out both",
        "fade-in": "fadeIn 200ms ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
