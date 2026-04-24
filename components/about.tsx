const PARAGRAPHS = [
  <>
    At <strong className="font-bold">Marahuyo Studios</strong>, we don&apos;t just build software; we engineer digital ecosystems. We specialize in crafting high-performance mobile and web applications that push the boundaries of modern design and technology.
  </>,
  <>
    Our team combines elite engineering expertise with visionary design thinking, transforming complex real-world problems into sleek, scalable, and intuitive solutions.
  </>,
  <>
    Ready to build the future? Let&apos;s turn your ambitious vision into a digital reality.
  </>,
];

export function About() {
  return (
    <section id="about" className="section-screen border-y border-border bg-bg">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="max-w-xl">
            <span className="mono-label">{"// about"}</span>
            <h2 className="mt-2 font-hero text-[clamp(30px,4vw,52px)] font-bold text-ink uppercase tracking-wide">
              Who we <span className="italic text-accent">are.</span>
            </h2>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.06em] text-muted">
              Philippines, Remote
            </p>

          </div>

          <div className="flex flex-col gap-5 text-lg font-medium leading-[1.35] tracking-[-0.012em] text-ink sm:gap-6 md:text-2xl">
            {PARAGRAPHS.map((paragraph, index) => (
              <p key={`minimal-copy-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
