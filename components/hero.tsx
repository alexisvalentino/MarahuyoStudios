 "use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import * as React from "react";
import type { CSSProperties } from "react";
import { HeroBlob } from "./hero-blob";



const MARQUEE_ITEMS = [
  "Full-Stack Mastery",
  "Enterprise-Grade Architecture",
  "Cloud-Native Systems",
  "Precision Engineering",
  "Marahuyo Studios",
];

const STATS = [
  { value: "∞", label: "Precision" },
  { value: "Elite", label: "Engineering Team" },
  { value: "< 24h", label: "Delivery Cycles" },
];

export function Hero() {
  return (
    <section
      id="top"
      className="section-hero"
      style={{
        backgroundImage:
          "radial-gradient(1200px 600px at 80% -10%, hsl(var(--accent) / 0.18), transparent 60%), radial-gradient(900px 500px at -10% 40%, hsl(var(--blue) / 0.06), transparent 60%)",
      }}
    >
      {/* Fills space above the marquee; stays centered vertically */}
      <div className="hero-inner container flex min-h-0 flex-1 flex-col justify-center px-4 py-4 sm:px-6 sm:py-6 md:py-7 min-[1034px]:py-8">
        <div className="hero-grid grid w-full gap-6 md:gap-8 min-[1034px]:grid-cols-2 min-[1034px]:items-center min-[1034px]:gap-12">
          {/* Left: heading + CTAs */}
          <div className="text-center min-[1034px]:text-left">
            <MobileBlobOrbit />
            <h1 className="hero-title mb-3 text-[clamp(36px,7vw,76px)] min-[1034px]:text-[clamp(56px,5.5vw,68px)] leading-[1.06] tracking-[-0.02em] text-accent sm:mb-4">
              <span className="block font-hero text-ink font-normal tracking-[0.02em] uppercase">
                <span>Tatak</span>
                <span className="ml-[0.24em] inline-block">Lokal</span>
              </span>
            </h1>

            <p className="hero-subtitle mx-auto mb-5 max-w-[560px] text-base font-medium leading-[1.35] text-ink-2 [letter-spacing:-0.015em] sm:mb-6 sm:text-lg md:text-xl min-[1034px]:mx-0">
              Architecting the future of digital experiences. We engineer high-performance software for the next generation of startups and enterprises.
            </p>

            <div className="hero-actions flex flex-nowrap justify-center gap-2.5 sm:gap-3 min-[1034px]:justify-start">
              <a href="#contact" className="btn btn-accent justify-center">
                Initiate Project <ArrowRight size={16} className="arrow" />
              </a>
              <a href="#work" className="btn btn-ghost justify-center">
                View Portfolio <ArrowUpRight size={16} className="arrow" />
              </a>
            </div>
          </div>

          {/* Right: animated raymarched blob (follows the cursor) */}
          <div className="relative hidden aspect-square w-full min-[1034px]:block">
            <HeroBlob className="absolute inset-0" />
            <OrbitStats />
          </div>
        </div>
      </div>

      <div className="border-y border-[#d8d2ca] bg-[#f7f2eb] py-2.5 sm:py-4">
        <div className="overflow-hidden">
          <div className="flex w-max animate-marquee">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
              <span
                key={`${item}-${idx}`}
                className="shrink-0 px-5 font-mono text-xs uppercase tracking-[0.12em] text-[#201f1d] sm:px-6 sm:text-sm"
              >
                {item}
                <span className="ml-5 text-[#ff3b14] sm:ml-6">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileBlobOrbit() {
  const blobRef = React.useRef<HTMLDivElement>(null);
  const [orbitRadius, setOrbitRadius] = React.useState(92);

  React.useEffect(() => {
    const el = blobRef.current;
    if (!el) return;

    const updateRadius = () => {
      const size = Math.min(el.clientWidth, el.clientHeight);
      // Keep orbit hugging the blob while avoiding label collision.
      const next = Math.max(74, Math.min(126, size * 0.45));
      setOrbitRadius(next);
    };

    updateRadius();

    const observer = new ResizeObserver(() => updateRadius());
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={blobRef}
      className="hero-mobile-blob relative mx-auto mb-4 aspect-square hidden md:block min-[1034px]:hidden"
    >
      <HeroBlob className="absolute inset-0" />
      <OrbitStats orbitRadius={orbitRadius} compact />
    </div>
  );
}

function OrbitStats({
  orbitRadius = 170,
  compact = false,
}: {
  orbitRadius?: number;
  compact?: boolean;
}) {
  const orbitDurationSeconds = 20;
  const angleStep = 360 / STATS.length;
  const orbitDistance = `${orbitRadius}px`;
  const orbitDiameter = `${orbitRadius * 2}px`;

  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border/45"
        style={{ width: orbitDiameter, height: orbitDiameter }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-0 w-0"
        style={
          {
            animation: `spin ${orbitDurationSeconds}s linear infinite`,
            "--orbit-radius": orbitDistance,
            "--orbit-radius-neg": `calc(${orbitDistance} * -1)`,
          } as CSSProperties
        }
      >
        {STATS.map((item, index) => (
          <div
            key={item.label}
            className="absolute left-0 top-0"
            style={{
              transform: `${compact ? "translate(-50%, -50%) " : ""}rotate(${index * angleStep}deg) translateY(var(--orbit-radius-neg))`,
              transformOrigin: "center",
            }}
          >
            <div style={{ transform: `rotate(-${index * angleStep}deg)` }}>
              <div
                className={[
                  "border-l-2 border-border/80 bg-bg/65 text-left backdrop-blur-[2px]",
                  compact ? "pl-2" : "pl-2.5",
                ].join(" ")}
                style={{ animation: `spin ${orbitDurationSeconds}s linear infinite reverse` }}
              >
                <strong
                  className={[
                    "block font-bold leading-none tracking-[-0.02em] text-ink",
                    compact ? "text-xs" : "text-base",
                  ].join(" ")}
                >
                  {item.value}
                </strong>
                <span
                  className={[
                    "mt-1 block whitespace-nowrap font-mono uppercase tracking-[0.06em] text-muted",
                    compact ? "text-[8px]" : "text-[10px]",
                  ].join(" ")}
                >
                  {item.label}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
