"use client";

type Feature = {
  num: string;
  title: string;
  copy: string;
};

const ITEMS: Feature[] = [
  {
    num: "01",
    title: "Mobile mastery.",
    copy: "We design and build next-level mobile apps — pixel-perfect, lightning-fast, and fun to use.",
  },
  {
    num: "02",
    title: "Product UX.",
    copy: "Interfaces designed for clarity, speed, and intuitive flows that make complex tasks feel effortless.",
  },
  {
    num: "03",
    title: "Problem solving.",
    copy: "Real-world issues meet creative, technical solutions — crafted by true technophiles.",
  },
];

export function Features() {
  return (
    <section id="services" className="section-screen bg-bg">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="max-w-xl">
            <span className="mono-label">// services</span>
            <h2 className="mt-2 text-[clamp(30px,4vw,52px)] font-bold text-ink">
              What we do best.
            </h2>
            <p className="mt-4 max-w-sm text-sm text-muted md:text-[15px]">
              Three things we do — and do ridiculously well.
            </p>
          </div>

          <div id="services-list">
            {ITEMS.map((f) => (
              <FeatureRow key={f.num} {...f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureRow({
  num,
  title,
  copy,
}: Feature) {
  return (
    <article className="group py-6 transition-colors duration-200 lg:py-9">
      <div className="grid gap-3 md:grid-cols-[80px_1fr] md:gap-6">
        <span className="mono-label mt-1 inline-flex">{num}</span>

        <div className="md:pl-5">
          <h3 className="text-[clamp(24px,2.2vw,38px)] font-bold leading-[1.08] tracking-[-0.025em] text-ink transition-colors duration-200 group-hover:text-accent">
            {title}
          </h3>

          <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-muted md:text-[15px]">
            {copy}
          </p>
        </div>
      </div>
    </article>
  );
}
