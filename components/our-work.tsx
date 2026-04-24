"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

const PROJECTS = [
  {
    id: "nova",
    title: "Project Nova",
    category: "AI Fintech Dashboard",
    description: "A high-performance trading interface leveraging real-time data and predictive models.",
    tags: ["React", "Python", "WebGL"],
  },
  {
    id: "aether",
    title: "Aether Protocol",
    category: "Decentralized Infrastructure",
    description: "Scalable node management system with an immersive, cognitive dark-mode UI.",
    tags: ["Next.js", "Solidity", "Tailwind"],
  },
  {
    id: "lumina",
    title: "Lumina Engine",
    category: "AI Enterprise Platform",
    description: "An intelligent generative AI dashboard built for speed, scale, and frictionless workflows.",
    tags: ["TypeScript", "AWS", "PostgreSQL"],
  },
];

export function OurWork() {
  return (
    <section id="work" className="section-screen border-t border-border bg-bg">
      <div className="container">
        <div className="mb-8 max-w-xl md:mb-10 border-b border-border/40 pb-4">
          <span className="mono-label">{"// portfolio"}</span>
          <h2 className="mt-2 font-hero text-[clamp(28px,3.5vw,48px)] font-bold text-ink uppercase tracking-wide">
            Featured <span className="text-accent">Work_</span>
          </h2>
          <p className="mt-3 font-mono text-[12px] text-muted md:text-[13px]">
            &gt; Executing high-yield deployments.
          </p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {PROJECTS.map((project) => (
            <article key={project.id} className="group flex flex-col justify-between border border-accent p-5 transition-colors">
              <div>
                <div className="mb-4 flex justify-between">
                  <span className="font-mono text-[11px] font-bold text-accent">[{project.id.toUpperCase()}]</span>
                  <ArrowUpRight className="text-accent transition-colors" size={16} />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-ink mb-1.5">
                  {project.title}
                </h3>
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted mb-4">
                  DIR: {project.category}
                </p>
                <p className="text-[13px] leading-relaxed text-muted mb-6">
                  {project.description}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 border-t border-border/40 pt-3 mt-auto">
                {project.tags.map((tag) => (
                  <span key={tag} className="font-mono text-[9px] font-bold uppercase tracking-widest text-accent transition-colors">
                    /{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
