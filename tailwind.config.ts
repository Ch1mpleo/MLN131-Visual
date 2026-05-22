import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        ink: "#1A1A1A",
        paper: "#F5F5DC",
        blood: "#D32F2F",
        crimson: {
          50: "#FDECEC",
          100: "#FAD2D2",
          200: "#F4A0A0",
          300: "#EE6E6E",
          400: "#E34F4F",
          500: "#D32F2F",
          600: "#B71C1C",
          700: "#8B0F0F",
          800: "#5E0A0A",
          900: "#3A0606",
        },
        bone: "#EDE6CE",
        cream: "#F5F5DC",
        smoke: "#2A2A2A",
        flagRed: "#DA251D",
        flagYellow: "#FFCD00",
      },
      fontFamily: {
        headline: ["Epilogue", "Archivo Black", "system-ui", "sans-serif"],
        body: ["Newsreader", "Crimson Text", "Georgia", "serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        monumental: "-0.04em",
      },
      backgroundImage: {
        "grain":
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        "paper":
          "radial-gradient(1200px 600px at 10% 0%, rgba(0,0,0,0.05), transparent), radial-gradient(800px 400px at 90% 100%, rgba(0,0,0,0.07), transparent)",
      },
      keyframes: {
        "flag-wave": {
          "0%, 100%": { transform: "skewY(0deg)" },
          "50%": { transform: "skewY(-1.5deg)" },
        },
        "stamp": {
          "0%": { transform: "scale(3) rotate(-12deg)", opacity: "0" },
          "60%": { transform: "scale(1.05) rotate(-8deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(-8deg)", opacity: "1" },
        },
        "marquee": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "ticker": {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(-50%,0,0)" },
        },
      },
      animation: {
        "flag-wave": "flag-wave 4s ease-in-out infinite",
        stamp: "stamp 650ms cubic-bezier(.2,.8,.2,1) both",
        marquee: "marquee 40s linear infinite",
        ticker: "ticker 30s linear infinite",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
