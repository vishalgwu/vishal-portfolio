import type { Config } from "tailwindcss";

const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    extend: {
      colors: {
        bg: v("bg"),
        surface: v("surface"),
        surface2: v("surface2"),
        ink: v("ink"),
        ink2: v("ink2"),
        line: v("line"),
        brand: v("brand"),
        solid: "#0a66c2",
        solidhover: "#004182",
        sky: "#70b5f9",
        sun: "#f5b942",
        mint: "#57d29b",
        pink: "#ff8fc0",
        lime: "#c8f169",
      },
      fontFamily: {
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(3%, -4%, 0) scale(1.1)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        },
        pop: {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "70%": { transform: "scale(1.12)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        float: "float 12s ease-in-out infinite",
        wiggle: "wiggle 2.4s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        pop: "pop 0.35s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
