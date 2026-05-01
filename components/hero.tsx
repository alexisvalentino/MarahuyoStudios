"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import * as React from "react";
import { HeroBlob } from "./hero-blob";




export function Hero() {
  return (
    <section
      id="top"
      className="section-hero relative"
      style={{
        backgroundImage:
          "radial-gradient(1200px 600px at 80% -10%, hsl(var(--accent) / 0.18), transparent 60%), radial-gradient(900px 500px at -10% 40%, hsl(var(--blue) / 0.06), transparent 60%)",
      }}
    >
      {/* Background Blob - Hidden on mobile, visible on tablets and up */}
      <div className="absolute inset-0 m-auto hidden sm:block w-full max-w-[800px] aspect-square pointer-events-none">
        <HeroBlob className="absolute inset-0" />
      </div>

      {/* Fills the hero space; stays centered vertically */}
      <div className="hero-inner container relative flex min-h-0 flex-1 flex-col justify-center items-center px-4 py-8 sm:px-6 md:py-12 min-[1034px]:py-20">
        <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="hero-title mb-4 sm:mb-6 leading-[1.06] tracking-[-0.02em] text-accent drop-shadow-sm">
            <span className="block font-hero text-ink font-normal tracking-[0.02em] uppercase break-words">
              Marahuyo <span className="inline-block">Studios</span>
            </span>
          </h1>

          <p className="hero-subtitle mx-auto mb-6 sm:mb-8 max-w-[540px] lg:max-w-[720px] text-sm font-medium leading-[1.5] text-ink-2 [letter-spacing:-0.015em] sm:text-base md:text-lg lg:text-xl backdrop-blur-[1px] bg-bg/30 p-2 rounded-xl">
            Architecting the future of digital experiences. We engineer high-performance software for the next generation of startups and enterprises.
          </p>

          <div className="hero-actions flex flex-wrap justify-center gap-3">
            <a href="#contact" className="btn btn-accent justify-center shadow-lg pointer-events-auto">
              Initiate Project <ArrowRight size={16} className="arrow" />
            </a>
            <a href="#work" className="btn btn-ghost justify-center backdrop-blur-md bg-bg/50 pointer-events-auto">
              View Portfolio <ArrowUpRight size={16} className="arrow" />
            </a>
          </div>
        </div>
      </div>

    </section>
  );
}

