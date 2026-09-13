/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0B0B",
          soft: "#111111",
          line: "#151515",
        },
        gold: {
          light: "#F0CF65",
          DEFAULT: "#D4AF37",
          deep: "#C9A227",
          bright: "#E0B83F",
        },
        cream: {
          DEFAULT: "#F8F6F0",
          soft: "#F3EFE5",
          line: "#E7E4DC",
        },
        stone: {
          light: "#777777",
          DEFAULT: "#555555",
          dark: "#333333",
        },
        // Editorial Broadsheet palette (redesign, homepage onward)
        brand: {
          primary: "#93000b",
          primaryContainer: "#b91c1c",
          onPrimary: "#ffffff",
          onPrimaryContainer: "#ffcdc7",
          secondary: "#565e74",
          tertiary: "#763300",
          tertiaryContainer: "#9b4500",
          ink: "#141b2b",
          inkVariant: "#5b403d",
          surface: "#f9f9ff",
          surfaceLowest: "#ffffff",
          surfaceLow: "#f1f3ff",
          surfaceContainer: "#e9edff",
          surfaceHigh: "#e1e8fd",
          surfaceHighest: "#dce2f7",
          outline: "#8f6f6c",
          outlineVariant: "#e4beb9",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        headline: ["var(--font-merriweather)", "Georgia", "serif"],
        broadsheet: ["var(--font-public-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        editorial: "1400px",
      },
      borderRadius: {
        card: "8px",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        reveal: {
          "0%": { opacity: 0, transform: "translateY(14px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        reveal: "reveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};