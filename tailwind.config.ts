import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0A0F1E", soft: "#0C1326", card: "#101A30" },
        paper: "#E9EEF8",
        muted: "#97A3BC",
        faint: "#6B7790",
        amber: { DEFAULT: "#F2A93B", bright: "#F6BC5C", deep: "#E98F36" },
        cyan: "#5AC8E8",
        mint: "#46D39A",
        coral: "#F47174",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        num: ["var(--font-num)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
