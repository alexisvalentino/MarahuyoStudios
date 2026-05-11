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
    title: "AI Business Automation.",
    copy: "Building custom workflows via n8n, Make, and Activepieces to replace repetitive, manual business processes.",
    bullets: ["n8n & Make.com", "Workflow mapping", "Time-saving automation"],
  },
  {
    num: "02",
    title: "AI Support Architects.",
    copy: "Training custom AI support bots on your company's knowledge base to handle tickets automatically 24/7.",
    bullets: ["Voiceflow & Botpress", "Vector DBs (Pinecone)", "Autonomous agents"],
  },
  {
    num: "03",
    title: "AI Content & Sales Systems.",
    copy: "Building content repurposing pipelines and AI-powered lead generation. We produce dynamic ads, graphic designs, and custom audio branding (music, jingles, voiceovers) tailored perfectly for your brand.",
    bullets: ["Content engines", "Higgsfield & Runway", "Suno & ElevenLabs", "Meta ads workflows"],
  },
];

export function Features() {
  return (
    <section id="services" className="section-screen border-t border-border bg-bg">
      <div className="container">
        <div className="flex flex-col gap-10 md:gap-16 lg:flex-row lg:justify-between">
          <div className="max-w-xl lg:max-w-md">
            <span className="mono-label mb-6 inline-block">{"// services"}</span>
            <h2 className="font-hero text-[clamp(30px,4vw,56px)] font-bold uppercase leading-tight tracking-wide text-ink">
              What we do <span className="text-accent">best.</span>
            </h2>
            <div className="mt-8 md:mt-12 lg:mt-16">
              <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-widest text-muted">
                Arsenal
              </p>
              <p className="text-[15px] font-medium leading-loose text-ink/70">
                {["Claude 3", "OpenAI", "LangChain", "n8n", "Make", "Cursor", "Vercel AI SDK", "Voiceflow", "Pinecone", "Higgsfield", "Midjourney", "ElevenLabs"].join(" • ")}
              </p>
            </div>
          </div>

          <div className="flex w-full flex-col md:grid md:grid-cols-2 lg:flex lg:flex-col gap-10 md:gap-8 lg:gap-16 lg:max-w-xl">
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
