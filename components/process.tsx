"use client";

import { TerrainGrid } from "./terrain-grid";

const STEPS = [
  {
    num: "01",
    title: "Discovery & Strategy",
    copy: "We align on your vision, map the technical blueprint, and define the architecture for scale.",
  },
  {
    num: "02",
    title: "UI/UX Prototyping",
    copy: "Visualizing the interface. We craft high-fidelity prototypes focused on cognitive design and frictionless flows.",
  },
  {
    num: "03",
    title: "Engineering",
    copy: "Writing scalable, robust code. Our elite team builds the engine that powers your digital experience.",
  },
  {
    num: "04",
    title: "Deployment & Scale",
    copy: "Rigorous testing followed by a seamless launch. We ensure your product is ready for the real world.",
  },
];

export function Process() {
  return (
    <section id="process" className="section-screen border-t border-border bg-bg relative overflow-hidden">
      <TerrainGrid />

      <div className="container relative z-10">
        <div className="relative mb-12 inline-block md:mb-16">
          {/* Dark contrast halo to ensure text is readable over the sun */}
          <div className="absolute -inset-4 md:-inset-12 -z-10 rounded-full bg-bg/80 opacity-80 blur-2xl md:blur-3xl" aria-hidden="true" />
          
          <span className="mono-label relative z-10">{"// process"}</span>
          <h2 className="relative z-10 mt-2 font-hero text-[clamp(28px,3.5vw,48px)] font-bold uppercase tracking-wide text-ink">
            How we <span className="text-accent">build.</span>
          </h2>
        </div>

        <div className="grid gap-x-8 gap-y-10 md:gap-x-10 md:gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <div key={step.num} className="group flex flex-col">
              <span className="mb-3 inline-block font-mono text-[11px] font-semibold tracking-[0.15em] text-accent/80 transition-colors duration-300 group-hover:text-accent">
                {step.num}
              </span>
              <h3 className="mb-3 text-lg font-bold tracking-tight text-ink sm:text-xl">
                {step.title}
              </h3>
              <p className="max-w-[280px] text-[14px] leading-relaxed text-muted">
                {step.copy}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
