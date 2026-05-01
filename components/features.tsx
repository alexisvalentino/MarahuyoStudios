"use client";

type Feature = {
  num: string;
  title: string;
  copy: string;
  bullets: string[];
};

const ITEMS: Feature[] = [
  {
    num: "01",
    title: "Next-Gen Mobile & Web.",
    copy: "We architect scalable, lightning-fast applications using cutting-edge frameworks. Pixel-perfect on the outside, robust on the inside.",
    bullets: ["Cross-platform scale", "High performance", "Future-proof tech"],
  },
  {
    num: "02",
    title: "Immersive UX/UI.",
    copy: "Interfaces designed for the future. We blend striking aesthetics with cognitive design to create frictionless, hyper-engaging user journeys.",
    bullets: ["Frictionless flows", "Striking aesthetics", "Cognitive design"],
  },
  {
    num: "03",
    title: "Scalable Architecture.",
    copy: "Built to grow. We deploy cloud-native solutions and robust infrastructures that handle complexity with elegant simplicity.",
    bullets: ["Cloud-native", "Robust security", "Enterprise scale"],
  },
];

export function Features() {
  return (
    <section id="services" className="section-screen border-t border-border bg-bg">
      <div className="container">
        <div className="flex flex-col gap-16 md:gap-24 lg:flex-row lg:justify-between">
          <div className="max-w-xl lg:max-w-md">
            <span className="mono-label mb-6 inline-block">{"// services"}</span>
            <h2 className="font-hero text-[clamp(30px,4vw,56px)] font-bold uppercase leading-tight tracking-wide text-ink">
              What we do <span className="text-accent">best.</span>
            </h2>
            <div className="mt-12 md:mt-16">
              <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-muted">
                Arsenal
              </p>
              <p className="text-[15px] font-medium leading-loose text-ink/70">
                {["React", "Next.js", "TypeScript", "Swift", "Kotlin", "Python", "AWS", "Supabase", "Figma"].join(" • ")}
              </p>
            </div>
          </div>

          <div className="flex w-full max-w-xl flex-col gap-12 md:gap-16">
            {ITEMS.map((item) => (
              <article key={item.num} className="group">
                <div className="mb-3 flex items-baseline gap-4">
                  <span className="text-sm font-medium text-accent">{item.num}/</span>
                  <h3 className="text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-accent">
                    {item.title}
                  </h3>
                </div>
                <p className="pl-[34px] text-[15px] leading-relaxed text-muted">
                  {item.copy}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 pl-[34px]">
                  {item.bullets.map((bullet) => (
                    <span key={bullet} className="text-[11px] font-medium uppercase tracking-wider text-ink/60 transition-colors hover:text-accent">
                      {bullet}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
