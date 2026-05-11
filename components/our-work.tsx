"use client";

import { useRef } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";

const PROJECTS = [
  {
    id: "nexus",
    title: "Workflow Nexus",
    category: "AI Business Automation",
    description: "Automated a creative agency's entire onboarding and task delegation workflow using n8n and Make, saving 40+ hours a week.",
    tags: ["n8n", "Make", "OpenAI"],
  },
  {
    id: "echo",
    title: "Echo Support Bot",
    category: "AI Customer Support",
    description: "Trained a custom autonomous agent on a company's 10,000-page knowledge base to handle 85% of tier-1 support tickets.",
    tags: ["Voiceflow", "Pinecone", "LangChain"],
  },
  {
    id: "omni",
    title: "Omni Content Engine",
    category: "AI Content System",
    description: "Built an automated content repurposing pipeline that turns 1 podcast into 30+ clips, articles, and Meta ad variations.",
    tags: ["Higgsfield", "Claude 3", "Activepieces"],
  },
];

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <article className="group relative overflow-hidden flex flex-col justify-between border border-accent/40 p-5 transition-all duration-500 hover:border-accent hover:bg-accent/5 hover:shadow-[0_0_30px_-5px_rgba(255,47,0,0.2)] h-full">
      
      {/* Scanner Line Animation */}
      <div className="pointer-events-none absolute inset-0 -translate-y-full bg-gradient-to-b from-transparent via-accent/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:animate-scan group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-4 flex justify-between">
          <span className="font-mono text-[11px] font-bold text-accent transition-all duration-300 group-hover:tracking-[0.2em] group-hover:text-ink">
            [{project.id.toUpperCase()}]
          </span>
          <ArrowUpRight className="text-accent transition-all duration-300 group-hover:scale-125 group-hover:text-ink group-hover:rotate-12" size={16} />
        </div>
        <h3 className="text-lg font-bold uppercase tracking-tight text-ink mb-1.5 transition-colors duration-300 group-hover:text-accent">
          {project.title}
        </h3>
        <p className="font-mono text-[9px] uppercase tracking-widest text-muted mb-4 transition-colors duration-300 group-hover:text-ink/80">
          DIR: {project.category}
        </p>
        <p className="text-[13px] leading-relaxed text-muted mb-6">
          {project.description}
        </p>
      </div>
      <div className="relative z-10 flex flex-wrap gap-2 border-t border-border/40 pt-3 mt-auto transition-colors duration-300 group-hover:border-accent/40">
        {project.tags.map((tag) => (
          <span key={tag} className="font-mono text-[9px] font-bold uppercase tracking-widest text-accent transition-colors duration-300 group-hover:text-ink">
            /{tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export function OurWork() {
  return (
    <section id="work" className="section-screen border-t border-border bg-bg">
      <div className="container relative">
        <div className="mb-8 border-b border-border/40 pb-4">
          <div className="max-w-xl">
            <span className="mono-label">{"// portfolio"}</span>
            <h2 className="mt-2 font-hero text-[clamp(28px,3.5vw,48px)] font-bold text-ink uppercase tracking-wide">
              Featured <span className="text-accent">Work_</span>
            </h2>
            <p className="mt-3 font-mono text-[12px] text-muted md:text-[13px]">
              &gt; Deploying autonomous systems and AI workflows.
            </p>
          </div>
        </div>

        <div className="pb-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {PROJECTS.map((project) => (
            <div key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
