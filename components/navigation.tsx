"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
] as const;

export function Navigation() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState<string>("top");

  // Sticky-nav background on scroll
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + tag document when mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    document.body.classList.toggle("mobile-menu-open", open);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("mobile-menu-open");
    };
  }, [open]);

  // Active section tracking via IntersectionObserver
  const isScrollingRef = React.useRef(false);
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout>();

  React.useEffect(() => {
    const ids = ["top", "services", "work", "reviews", "process", "about", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const closeAnd = (href: string) => () => {
    setOpen(false);
    if (href.startsWith("#")) {
      const id = href.slice(1);
      setActive(id);
      
      // Prevent observer from overriding the active state during smooth scroll
      isScrollingRef.current = true;
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000); // Allow 1s for the smooth scroll to finish

      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 10);
      }
    }
  };

  return (
    <header
      className={[
        "sticky top-0 z-50 relative transition-colors duration-300",
        "backdrop-blur supports-[backdrop-filter]:bg-bg/70",
        scrolled ? "bg-bg/90 border-b border-border" : "bg-bg/60 border-b border-transparent",
      ].join(" ")}
    >
      <div className="container flex h-[72px] items-center justify-between gap-6">
        <a
          href="#top"
          onClick={closeAnd("#top")}
          className="font-bold tracking-tight text-ink"
          aria-label="Marahuyo Studios — home"
        >
          <span>Marahuyo Studios</span>
          <sup className="ml-0.5 text-[0.55em] text-muted">®</sup>
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-7 text-[15px] text-ink-2 min-[1034px]:flex"
        >
          {LINKS.map((l) => {
            const isActive = active === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={closeAnd(l.href)}
                className={[
                  "relative py-2 transition-colors",
                  "after:absolute after:left-0 after:right-0 after:bottom-0.5 after:h-px",
                  "after:bg-current after:origin-left after:transition-transform after:duration-300",
                  isActive ? "text-accent after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100",
                ].join(" ")}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            onClick={closeAnd("#contact")}
            className="btn btn-accent hidden min-[1034px]:inline-flex"
          >
            Initialize AI <ArrowRight size={16} className="arrow" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="menuButton min-[1034px]:hidden"
            data-open={open ? "true" : "false"}
          >
            <span className="top" />
            <span className="mid" />
            <span className="bot" />
          </button>
        </div>
      </div>

      {/* Mobile backdrop: blur/dim page content behind the open drawer */}
      <button
        type="button"
        aria-label="Close menu backdrop"
        onClick={() => setOpen(false)}
        className={[
          "fixed inset-x-0 bottom-0 top-[72px] z-40 border-0 bg-black/35 backdrop-blur-md transition-opacity duration-300 min-[1034px]:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      {/* Mobile drawer */}
      <div
        className={[
          "absolute left-0 right-0 top-full z-50 overflow-hidden border-t border-border bg-bg/95 backdrop-blur supports-[backdrop-filter]:bg-bg/90 shadow-[0_24px_48px_rgba(0,0,0,0.35)] transition-[max-height,opacity,transform] duration-300 ease-out min-[1034px]:hidden",
          open
            ? "max-h-[80vh] opacity-100 pointer-events-auto translate-y-0"
            : "max-h-0 opacity-0 pointer-events-none -translate-y-2",
        ].join(" ")}
      >
        <nav
          className={[
            "container flex flex-col gap-3 py-6 transition-[opacity,transform] duration-300 ease-out",
            open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
          ].join(" ")}
          aria-label="Mobile"
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={closeAnd(l.href)}
              className={[
                "border-b border-border py-3 text-lg font-medium transition-all duration-300 ease-out",
                open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
              ].join(" ")}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeAnd("#contact")}
            className={[
              "btn btn-accent mt-2 w-full justify-center transition-all duration-300 ease-out",
              open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1",
            ].join(" ")}
          >
            Initialize AI <ArrowRight size={16} className="arrow" />
          </a>
        </nav>
      </div>
    </header>
  );
}
