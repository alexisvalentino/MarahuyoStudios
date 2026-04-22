import { FooterBrand } from "./footer-brand";

const COLS = [
  {
    h: "Studio",
    items: [
      { label: "Home", href: "#top" },
      { label: "Services", href: "#services" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    h: "Solutions",
    items: [
      { label: "Mobile Apps", href: "#services" },
      { label: "Consulting", href: "#services" },
      { label: "Case Studies", href: "#services" },
    ],
  },
  {
    h: "About",
    items: [
      { label: "Team", href: "#about" },
      { label: "Careers", href: "#about" },
      { label: "Values", href: "#about" },
    ],
  },
  {
    h: "Connect",
    items: [
      { label: "Twitter", href: "https://twitter.com" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "Email", href: "mailto:hello@marahuyo.studio" },
    ],
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-bg pt-20 pb-8 lg:pt-24">
      <div className="container grid gap-10 pb-14 lg:grid-cols-[1.2fr_2fr] lg:gap-20">
        <div>
          <div className="font-bold tracking-tight">
            Marahuyo Studios<sup className="ml-0.5 text-[0.55em] text-muted">®</sup>
          </div>
          <p className="mt-4 max-w-[40ch] text-[15px] leading-relaxed text-muted">
            Next-gen mobile apps for real-world challenges. Designed and
            engineered with a game-driven touch.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {COLS.map((col) => (
            <div key={col.h}>
              <h4 className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.08em] text-muted">
                {col.h}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.items.map((i) => (
                  <li key={i.label}>
                    <a
                      href={i.href}
                      className="text-[15px] text-ink transition-colors hover:text-accent"
                      {...(i.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {i.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Oversized Hofmann-style wordmark — experimental brand lockup */}
      <div className="container pointer-events-none select-none pb-10 pt-6">
        <FooterBrand />
      </div>

      <div className="container flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-[13px] text-muted sm:flex-row sm:items-center">
        <span>© {year} Marahuyo Studios. All rights reserved.</span>
        <span className="mono-label">Built with Precision.</span>
      </div>
    </footer>
  );
}
