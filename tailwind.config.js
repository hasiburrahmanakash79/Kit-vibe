/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A0B",
        charcoal: "#141416",
        graphite: "#1D1D20",
        line: "rgba(255,255,255,0.08)",
        lineLight: "rgba(10,10,11,0.08)",
        paper: "#FAFAF8",
        pitch: {
          DEFAULT: "#17E06B",
          dark: "#0B7A3C",
          deep: "#063D1F",
          light: "#7BFAB1",
        },
      },
      fontFamily: {
        display: ["Anton", "Arial Narrow", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      borderRadius: {
        card: "14px",
        pill: "999px",
      },
      boxShadow: {
        premium: "0 20px 60px -20px rgba(0,0,0,0.5)",
        glow: "0 0 40px -10px rgba(23,224,107,0.35)",
      },
      backgroundImage: {
        "pitch-gradient": "linear-gradient(135deg, #17E06B 0%, #0B7A3C 100%)",
      },
      keyframes: {
        fadeUp: { "0%": { opacity: 0, transform: "translateY(14px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        scaleIn: { "0%": { opacity: 0, transform: "scale(0.96)" }, "100%": { opacity: 1, transform: "scale(1)" } },
        slideInRight: { "0%": { opacity: 0, transform: "translateX(24px)" }, "100%": { opacity: 1, transform: "translateX(0)" } },
        shimmer: { "0%": { backgroundPosition: "-500px 0" }, "100%": { backgroundPosition: "500px 0" } },
        ticker: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        fadeUp: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
        fadeIn: "fadeIn 0.4s ease both",
        scaleIn: "scaleIn 0.25s cubic-bezier(0.16,1,0.3,1) both",
        slideInRight: "slideInRight 0.3s cubic-bezier(0.16,1,0.3,1) both",
        shimmer: "shimmer 1.8s infinite linear",
        ticker: "ticker 22s linear infinite",
      },
    },
  },
  plugins: [],
};
