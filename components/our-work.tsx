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
  {
    id: "matrix",
    title: "LeadGen Matrix",
    category: "AI Sales & Ads",
    description: "Engineered a dynamic ad-generation workflow that automatically A/B tests generated visuals, decreasing CPA by 65%.",
    tags: ["Midjourney", "Meta API", "DALL-E 3"],
  },
  {
    id: "pulse",
    title: "Pulse Sonic ID",
    category: "Custom Audio Branding",
    description: "Produced a suite of 50+ unique sonic brand identities and AI voiceovers for an enterprise marketing firm in record time.",
    tags: ["Suno AI", "ElevenLabs", "Logic Pro"],
  },
  {
    id: "founder",
    title: "Founder Stack MVP",
    category: "Full-Stack AI SaaS",
    description: "Designed and launched a fully functional AI-powered SaaS product for a non-technical founder in just 14 days.",
    tags: ["Next.js", "Vercel AI SDK", "Supabase"],
  },
];

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  return (
    <article className="group flex flex-col justify-between border border-accent p-5 transition-colors hover:bg-accent/5 h-full">
      <div>
        <div className="mb-4 flex justify-between">
          <span className="font-mono text-[11px] font-bold text-accent">[{project.id.toUpperCase()}]</span>
          <ArrowUpRight className="text-accent transition-colors group-hover:scale-110" size={16} />
        </div>
        <h3 className="text-lg font-bold uppercase tracking-tight text-ink mb-1.5">
          {project.title}
        </h3>
        <p className="font-mono text-[9px] uppercase tracking-widest text-muted mb-4">
          DIR: {project.category}
        </p>
        <p className="text-[13px] leading-relaxed text-muted mb-6">
          {project.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-border/40 pt-3 mt-auto">
        {project.tags.map((tag) => (
          <span key={tag} className="font-mono text-[9px] font-bold uppercase tracking-widest text-accent transition-colors">
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
      </div>
        
      {/* Desktop Endless Marquee Container (lg and up) */}
      <div className="relative overflow-hidden w-full hidden lg:block">
        {/* Fading Edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />
        
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] pb-6">
          {[...PROJECTS, ...PROJECTS].map((project, idx) => (
            <div key={`${project.id}-${idx}`} className="shrink-0 w-[380px] mr-6">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile & Tablet Grid Container (below lg) */}
      <div className="container lg:hidden">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4 pb-6">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
