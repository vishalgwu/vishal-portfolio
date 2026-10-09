import type { Config } from "tailwindcss";

const config: Config = {
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
        obsidian: "#07090e",
        glass: "#0f172a",
        charcoal: "#131a29",
        cyber: "#06b6d4",
        electric: "#8b5cf6",
        glow: "#10b981",
        radiant: "#f43f5e",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      keyframes: {
        blink: { "0%, 49%": { opacity: "1" }, "50%, 100%": { opacity: "0" } },
        float: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%, -3%, 0) scale(1.08)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
        float: "float 14s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
