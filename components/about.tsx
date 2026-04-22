const PARAGRAPHS = [
  <>
    At <strong className="font-bold">Marahuyo Studios</strong>, we believe the
    best products are both powerful <em className="italic text-ink">and</em>{" "}
    fun. We specialize in mobile app development with a uniquely playful,
    game-driven touch.
  </>,
  <>
    Our team brings years of engineering expertise, creative thinking, and a
    passion for tackling real-world problems with technical mastery.
  </>,
  <>
    Ready to collaborate? Let&apos;s turn your vision into something epic — and
    maybe grab a high score along the way.
  </>,
];

export function About() {
  return (
    <section id="about" className="section-screen border-y border-border bg-bg">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="max-w-xl">
            <span className="mono-label">// about</span>
            <h2 className="mt-2 text-[clamp(30px,4vw,52px)] font-bold text-ink">
              Who we <span className="italic">are.</span>
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
