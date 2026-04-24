"use client";

import * as React from "react";

const TECHNOLOGIES = [
  "React",
  "Next.js",
  "TypeScript",
  "Swift",
  "Kotlin",
  "Python",
  "AWS",
  "Supabase",
  "TailwindCSS",
  "Figma",
];

export function TechStack() {
  return (
    <section className="border-y border-[#d8d2ca] bg-[#f7f2eb] py-4 sm:py-6">
      <div className="container mb-4 text-center">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-muted">
          Our Arsenal
        </span>
      </div>
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee">
          {[...TECHNOLOGIES, ...TECHNOLOGIES, ...TECHNOLOGIES].map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              className="shrink-0 px-6 font-hero text-xl font-medium tracking-wide text-ink/80 sm:px-10 sm:text-2xl transition-colors hover:text-accent"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
