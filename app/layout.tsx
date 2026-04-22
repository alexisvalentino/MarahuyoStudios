import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

/*
 * Hero display face — Nothing's 5x7 pixel font.
 *
 * A deliberately low-res bitmap-style type whose industrial, "terminal
 * HUD" feel matches the tech-studio identity far better than a brush
 * script did. Paired with the ferrofluid blob it reads as "hardware
 * meets software" rather than "calligraphy studio".
 *
 * Loaded locally (self-hosted) so it ships from our own origin rather
 * than a CDN, which:
 *   - works inside the project's CSP (no `https://fonts.gstatic.com`
 *     exception needed),
 *   - eliminates a third-party DNS + TLS roundtrip, and
 *   - guarantees the font is available even if external font hosts
 *     are blocked by the visitor's network/browser (corporate proxies,
 *     privacy extensions, etc.).
 *
 * The exported CSS variable name `--font-hero` is intentionally
 * face-agnostic — if we ever swap the display font again, the
 * consuming CSS (`.font-hero` in globals.css, inline fontFamily in
 * hero.tsx) does not need to change. Only this declaration does.
 *
 * `display: "swap"` shows fallback Figtree immediately and swaps to
 * the pixel font the instant it's parsed — prevents invisible-text
 * flashes on slow connections.
 *
 * `preload: true` lets Next inject a `<link rel="preload">` into the
 * head so the browser fetches the font in parallel with CSS instead
 * of waiting for the first hero paint.
 */
const heroDisplay = localFont({
  src: "./Priston.otf",
  variable: "--font-hero-display",
  display: "swap",
  weight: "400",
  preload: true,
});

const zeroVelo = localFont({
  src: "./zerovelo.ttf",
  variable: "--font-zerovelo",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://marahuyo.studio"),
  title: "Marahuyo Studios — Level Up. Win.",
  description:
    "Marahuyo Studios — next-gen mobile apps for real-world challenges. We craft game-inspired, pixel-perfect experiences that feel immersive, fast, and fun.",
  openGraph: {
    title: "Marahuyo Studios — Level Up. Win.",
    description:
      "Next-gen mobile apps for real-world challenges. Game-inspired UX, engineered by technophiles.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marahuyo Studios — Level Up. Win.",
    description:
      "Next-gen mobile apps for real-world challenges.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fffaf5" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0d0d" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${figtree.variable} ${GeistMono.variable} ${heroDisplay.variable} ${zeroVelo.variable}`}
    >
      <body>
        <ThemeProvider
          attribute="class"
          forcedTheme="dark"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
