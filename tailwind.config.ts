import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "3rem",
        xl: "3.5rem",
      },
      screens: {
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        bg: "hsl(var(--bg) / <alpha-value>)",
        "bg-soft": "hsl(var(--bg-soft) / <alpha-value>)",
        ink: "hsl(var(--ink) / <alpha-value>)",
        "ink-2": "hsl(var(--ink-2) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          ink: "hsl(var(--accent-ink) / <alpha-value>)",
        },
        blue: "hsl(var(--blue) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-figtree)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        /*
         * `hero` — display face reserved for the landing hero wordmark.
         * Resolved via the face-agnostic `--font-hero-display` variable
         * declared in app/layout.tsx (currently Nothing 5x7 pixel).
         * Figtree + system fonts are the fallback chain so the heading
         * still renders reasonably if the OTF fails to load or contains
         * no glyph for a given character (bitmap/demo faces often have
         * a limited character set).
         *
         * Note: the hero currently applies `.font-hero` as a hand-written
         * CSS class in globals.css (see reasoning there), not this
         * Tailwind utility. This entry is kept in sync so either access
         * path resolves to the same fallback chain.
         */
        hero: [
          "var(--font-hero-display)",
          "var(--font-figtree)",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        /* `display` is the original hero wordmark size token. The hero
           <h1> currently sets its own size inline (via text-[clamp(...)])
           so this token is effectively unused right now, but we keep it
           at a reasonable "display-sized" clamp so anything else that
           reaches for `text-display` in the future still renders as a
           proper display headline. */
        display: ["clamp(48px, 8vw, 124px)", { lineHeight: "0.92", letterSpacing: "-0.045em" }],
        hero: ["clamp(44px, 7vw, 104px)", { lineHeight: "0.95", letterSpacing: "-0.045em" }],
        section: ["clamp(34px, 4.5vw, 60px)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "24px",
        "3xl": "32px",
      },
      keyframes: {
        pulse: {
          "0%, 100%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 4px hsl(var(--accent) / 0.15)",
          },
          "50%": {
            transform: "scale(1.15)",
            boxShadow: "0 0 0 7px hsl(var(--accent) / 0.08)",
          },
        },
        scroll: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        reveal: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "pulse-dot": "pulse 2s ease-in-out infinite",
        marquee: "scroll 38s linear infinite",
        reveal: "reveal 0.8s cubic-bezier(0.2,0.7,0.2,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
