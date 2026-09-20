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
        // Warm paper the whole interface sits on.
        paper: {
          DEFAULT: "#FAF6F1",
          panel: "#F8F7F1",
          deep: "#F1EBE3",
        },
        // Near-black brown used for product names and the wordmark.
        ink: "#1F100C",
        // Brand brown: section titles, active navigation, stamp outlines.
        cocoa: {
          DEFAULT: "#693F2B",
          soft: "#8A6F63",
        },
        // Solid buttons.
        bark: "#3F251E",
        // Secondary copy and eyebrow labels.
        taupe: {
          DEFAULT: "#8B7974",
          deep: "#423E3B",
        },
        // Ink of the red rubber stamps.
        stamp: "#A73D2C",
        // The bars that frame the app: header and footer.
        chrome: {
          bg: "#FAF5EF",
          ink: "#2F1A13",
        },
        line: {
          DEFAULT: "#E3DAD0",
          soft: "#EFE8E0",
        },
      },
      fontFamily: {
        // The mockups are set in a tight grotesk; these are the closest faces
        // present on every device, so the demo needs no webfont round-trip.
        sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      letterSpacing: {
        signage: "0.2em",
        wide2: "0.08em",
      },
      keyframes: {
        stamp: {
          "0%": { transform: "scale(1.5) rotate(-14deg)", opacity: "0" },
          "60%": { transform: "scale(0.95) rotate(-3deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(-3deg)", opacity: "1" },
        },
        pageIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        stamp: "stamp 320ms cubic-bezier(0.2, 0.8, 0.3, 1) both",
        "page-in": "pageIn 240ms ease-out both",
        "fade-in": "fadeIn 200ms ease-out both",
        "slide-up": "slideUp 240ms cubic-bezier(0.2, 0.8, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
