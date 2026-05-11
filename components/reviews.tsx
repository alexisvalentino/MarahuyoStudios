"use client";

import { Quote } from "lucide-react";

const REVIEWS = [
  {
    id: "rv-01",
    client: "Sarah J.",
    role: "Founder, Creative Agency",
    review: "The custom n8n workflow they built completely automated our onboarding. We saved 40 hours a week and our clients are blown away by the speed.",
  },
  {
    id: "rv-02",
    client: "Marcus T.",
    role: "CEO, E-Commerce Brand",
    review: "Their AI support bot handles 80% of our tier-1 tickets. It's like having a 24/7 customer service team that never sleeps and always knows the right answer.",
  },
  {
    id: "rv-03",
    client: "Elena R.",
    role: "Content Creator",
    review: "The content repurposing engine is insane. One podcast episode now turns into a week's worth of TikToks, reels, and Meta ads automatically.",
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="section-screen border-t border-border bg-bg relative overflow-hidden py-16 md:py-24">
      {/* Background Glow behind the center card */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-[100px] pointer-events-none mix-blend-screen" 
        style={{ background: "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)" }} 
      />

      <div className="container relative z-10 flex flex-col items-center">
        <div className="text-center mb-12 md:mb-16">
          <span className="mono-label mb-4 inline-block">{"// testimonials"}</span>
          <h2 className="font-hero text-[clamp(28px,3.5vw,48px)] font-bold text-ink uppercase tracking-wide">
            Client <span className="text-accent">Signals_</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4 w-full">
          {REVIEWS.map((review, idx) => (
            <article 
              key={review.id} 
              className={`border border-border/50 bg-bg p-6 md:p-8 transition-all duration-500 w-full lg:w-1/3 flex flex-col justify-between
                ${idx === 1 
                  ? 'lg:scale-110 shadow-2xl z-20 border-accent/40 bg-bg/95 backdrop-blur-md' 
                  : 'lg:scale-95 opacity-90 lg:opacity-70 hover:opacity-100 hover:border-accent/30 z-10'
                }
              `}
            >
              <Quote className={`mb-4 md:mb-6 ${idx === 1 ? 'text-accent' : 'text-border'}`} size={32} />
              <p className={`leading-relaxed mb-8 ${idx === 1 ? 'text-[15px] md:text-[16px] text-ink' : 'text-[14px] md:text-[15px] text-ink/80'}`}>
                &quot;{review.review}&quot;
              </p>
              <div>
                <p className="font-bold text-ink text-sm">{review.client}</p>
                <p className="font-mono text-[10px] uppercase text-muted mt-1">{review.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
