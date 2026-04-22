import { ContactForm } from "./contact-form";

export function Cta() {
  return (
    <section id="contact" className="section-screen bg-bg">
      <div className="container">
        <div
          className="relative isolate overflow-hidden rounded-[32px] bg-ink text-bg
                     px-5 py-10 sm:px-10 sm:py-14 lg:rounded-[40px] lg:px-16 lg:py-20"
        >
          {/* Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(700px 400px at 20% 0%, hsl(var(--accent) / 0.35), transparent 55%), radial-gradient(700px 400px at 100% 100%, hsl(var(--blue) / 0.22), transparent 55%)",
            }}
          />
          {/* Grid overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--bg) / 0.05) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--bg) / 0.05) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, #000 40%, transparent 75%)",
              maskImage:
                "radial-gradient(ellipse at center, #000 40%, transparent 75%)",
            }}
          />

          <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            {/* Left: message */}
            <div>
              <span className="mono-label !text-bg/60 mb-5 inline-block">
                // let&apos;s build
              </span>
              <h2 className="mb-4 text-hero font-bold text-bg">
                Join the <span className="accent-italic">Adventure.</span>
              </h2>
              <p className="mb-6 max-w-md text-lg text-bg/70 md:text-xl">
                Let&apos;s talk projects. Tell us what you&apos;re building and
                we&apos;ll get back within 24 hours.
              </p>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.06em] text-bg/55">
                <span>hello@marahuyo.studio</span>
                <span aria-hidden="true">·</span>
                <span>Response in &lt; 24h</span>
              </div>
            </div>

            {/* Right: form */}
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
