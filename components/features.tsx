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
    title: "Mobile mastery.",
    copy: "We design and build next-level mobile apps - pixel-perfect, lightning-fast, and fun to use.",
    bullets: ["Native-quality feel", "Smooth performance", "Release-ready delivery"],
  },
  {
    num: "02",
    title: "Product UX.",
    copy: "Interfaces designed for clarity, speed, and intuitive flows that make complex tasks feel effortless.",
    bullets: ["Clear user journeys", "Low-friction screens", "Strong design-to-dev handoff"],
  },
  {
    num: "03",
    title: "Problem solving.",
    copy: "Real-world issues meet creative, technical solutions - crafted by true technophiles.",
    bullets: ["Practical strategy", "Scalable implementation", "Production-minded execution"],
  },
];

export function Features() {
  return (
    <section id="services" className="section-screen bg-bg">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">
          <div className="max-w-xl">
            <span className="mono-label">{"// services"}</span>
            <h2 className="mt-2 text-[clamp(30px,4vw,52px)] font-bold text-ink">
              What we do best.
            </h2>
            <p className="mt-4 max-w-sm text-sm text-muted md:text-[15px]">
              Three things we do - and do ridiculously well.
            </p>
          </div>

          <div id="services-list">
            {ITEMS.map((item) => (
              <FeatureRow key={item.num} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureRow({ item }: { item: Feature }) {
  return (
    <article className="group py-5 md:py-6">
      <div className="grid gap-3 md:grid-cols-[72px_1fr] md:gap-6">
        <span className="mono-label mt-1 inline-flex">{item.num}</span>

        <div>
          <h3 className="text-[clamp(24px,2.1vw,36px)] font-bold leading-[1.08] tracking-[-0.025em] text-ink transition-colors duration-200 group-hover:text-accent">
            {item.title}
          </h3>
          <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-muted md:text-[15px]">
            {item.copy}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2.5">
            {item.bullets.map((bullet) => (
              <li
                key={bullet}
                className="group/pill relative overflow-hidden rounded-full border border-[#2c2c2c] bg-[#0f0f10] px-2.5 py-[3px] text-[10px] font-medium leading-none text-[#d0d0d0] transition-all duration-300 hover:border-accent/45 hover:text-white"
              >
                <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/pill:opacity-100 [background:linear-gradient(120deg,rgba(255,47,0,0.12),transparent_50%,rgba(0,81,255,0.1))]" />
                <span className="relative">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
