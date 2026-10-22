import type { Config } from "tailwindcss";

// Calm, near-monochrome palette: warm paper background, white cards, ink text, one blue accent.
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F4F2EE",
        ink: "#191919",
        mute: "#5E6670",
        line: "#E0DFDC",
        chip: "#F3F2EF",
        brand: { DEFAULT: "#0A66C2", dark: "#004182", soft: "#E8F3FF" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      boxShadow: {
        card: "0 0 0 1px rgba(0,0,0,.08)",
        pop: "0 12px 40px rgba(0,0,0,.22)",
      },
      maxWidth: { page: "1128px" },
    },
  },
  plugins: [],
};
export default config;
