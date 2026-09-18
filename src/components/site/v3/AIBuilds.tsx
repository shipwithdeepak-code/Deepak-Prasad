import React from "react";
import { ArrowUpRight } from "lucide-react";
import { COPILOT_PIPELINE } from "../../../data/homeV3";
import { PRODUCT_JURY_LIVE_URL } from "../../../utils/productJury";

interface AIBuildsProps {
  onNavigate: (path: string) => void;
  onAsk?: (question?: string) => void;
}

export default function AIBuilds({ onNavigate }: AIBuildsProps) {
  const handleCardClick = () => {
    onNavigate("/product-jury");
  };

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onNavigate("/product-jury");
    }
  };

  return (
    <section
      id="ai-builds"
      aria-label="AI Builds and Shipped Products"
      className="relative overflow-hidden bg-[#040506] py-20 md:py-28"
    >
      {/* Subtle obsidian warm coral atmospheric blur matching WorkRail */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[960px] -translate-x-1/2 rounded-full bg-[#F0977A]/[0.02] blur-[130px]"
      />

      <div className="mx-auto max-w-[1240px] px-6">
        {/* Section Heading & Subheading */}
        <div className="mb-10 max-w-[660px]">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#9C9A95]">
            AI Systems & Workspaces
          </p>
          <h2 className="mt-2.5 text-[clamp(1.75rem,3.2vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[#FAF7F0]">
            Two products I designed and wrote myself.
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-[#9C9A95]">
            One challenges product decisions. The other answers questions about my work.
          </p>
        </div>

        {/* TOP ROW: ONLY ONE WIDE PRODUCT JURY FEATURE CARD (FULL-WIDTH) */}
        <article
          role="button"
          tabIndex={0}
          onClick={handleCardClick}
          onKeyDown={handleCardKeyDown}
          aria-label="View Product Jury: A product decision workspace that challenges assumptions before you ship"
          className="group relative w-full cursor-pointer overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#0A0B0F] p-7 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#F0977A]/35 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0977A]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040506] sm:p-9 md:p-10"
        >
          {/* Subtle dark plum / burgundy undertone layer inspired by Raycast */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#261120]/30 via-transparent to-[#07080A] opacity-75 transition-opacity duration-500 group-hover:opacity-95"
          />

          {/* Warm coral radial light from the upper corner */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-[380px] w-[380px] rounded-full bg-[#F0977A]/[0.06] blur-[90px] transition-opacity duration-500 group-hover:opacity-100"
          />

          {/* Fine radial illumination behind the title zone */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-8 top-12 h-[220px] w-[360px] rounded-full bg-[#F0977A]/[0.035] blur-[75px]"
          />

          {/* Abstract multi-agent constellation / connected-node pattern (Raycast-inspired, subtle & secondary) */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-8 hidden h-[220px] w-[320px] opacity-[0.14] transition-opacity duration-500 group-hover:opacity-[0.22] md:block"
            viewBox="0 0 320 220"
            fill="none"
          >
            {/* Connecting deliberation edges */}
            <path
              d="M160 40 L60 110 L110 180 L220 180 L260 100 Z"
              stroke="#F0977A"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <path d="M160 40 L110 180" stroke="#FAF7F0" strokeWidth="0.75" opacity="0.6" />
            <path d="M160 40 L220 180" stroke="#FAF7F0" strokeWidth="0.75" opacity="0.6" />
            <path d="M60 110 L260 100" stroke="#F0977A" strokeWidth="0.75" opacity="0.4" />
            
            {/* 5 Specialist Seat Nodes */}
            {/* Node 1: Top (Strategy) */}
            <circle cx="160" cy="40" r="4.5" fill="#F0977A" />
            <circle cx="160" cy="40" r="10" stroke="#F0977A" strokeWidth="0.75" opacity="0.5" />
            {/* Node 2: Left (UX) */}
            <circle cx="60" cy="110" r="4" fill="#FAF7F0" />
            <circle cx="60" cy="110" r="8" stroke="#FAF7F0" strokeWidth="0.75" opacity="0.4" />
            {/* Node 3: Bottom Left (Evidence) */}
            <circle cx="110" cy="180" r="4" fill="#F0977A" />
            <circle cx="110" cy="180" r="8" stroke="#F0977A" strokeWidth="0.75" opacity="0.4" />
            {/* Node 4: Bottom Right (Feasibility) */}
            <circle cx="220" cy="180" r="4" fill="#FAF7F0" />
            <circle cx="220" cy="180" r="8" stroke="#FAF7F0" strokeWidth="0.75" opacity="0.4" />
            {/* Node 5: Right (Economics) */}
            <circle cx="260" cy="100" r="4" fill="#F0977A" />
            <circle cx="260" cy="100" r="8" stroke="#F0977A" strokeWidth="0.75" opacity="0.4" />
          </svg>

          {/* CARD CONTENT */}
          <div className="relative z-10">
            {/* Top metadata row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F0977A]/30 bg-[#F0977A]/[0.08] px-3 py-1 font-mono text-[10.5px] font-medium uppercase tracking-[0.08em] text-[#F0977A]">
                <span className="size-1.5 rounded-full bg-[#F0977A]" />
                PRIMARY BUILD · MULTI-AGENT
              </span>

              <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-[#85837D]">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                ACTIVE WORKSPACE
              </span>
            </div>

            {/* Title & Supporting Accent Sentence */}
            <div className="mt-6 max-w-[800px]">
              <h3 className="text-[28px] sm:text-[32px] md:text-[36px] font-medium leading-[1.12] tracking-tight text-[#FAF7F0] transition-colors duration-200 group-hover:text-white">
                Product Jury
              </h3>
              <p className="mt-2 text-[15px] sm:text-[16.5px] font-medium leading-snug text-[#F0977A]">
                A product decision workspace that challenges assumptions before you ship.
              </p>
              <p className="mt-3.5 max-w-[76ch] text-[15px] sm:text-[15.5px] leading-relaxed text-[#9C9A95]">
                A panel of specialist agents examines one product decision from different
                perspectives — UX research, product strategy, evidence quality, engineering
                feasibility, and business impact.
              </p>
            </div>

            {/* Subtle Divider */}
            <div className="my-6 border-t border-white/[0.06] sm:my-7" />

            {/* 5 Specialist Seats Section */}
            <div>
              <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.1em] text-[#85837D]">
                5 SPECIALIST SEATS
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "UX Research",
                  "Product Strategy",
                  "Evidence Quality",
                  "Engineering Feasibility",
                  "Business Impact",
                ].map((seat) => (
                  <span
                    key={seat}
                    className="rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-[#C5C3BE] transition-colors group-hover:border-white/[0.12]"
                  >
                    {seat}
                  </span>
                ))}
              </div>
            </div>

            {/* Subtle Divider / Spacing Break */}
            <div className="my-6 border-t border-white/[0.06] sm:my-7" />

            {/* Supporting Tags */}
            <div className="flex flex-wrap gap-2">
              {[
                "Multi-agent deliberation",
                "Five specialist seats",
                "Evidence-led decisions",
                "Built with Gemini",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 font-mono text-[11px] text-[#9C9A95]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Buttons Row */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              {/* Primary Button */}
              <a
                href={PRODUCT_JURY_LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="group/btn inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl bg-[#FAF7F0] px-5 py-2.5 text-[13.5px] font-medium text-[#0A0B0E] shadow-[0_2px_12px_rgba(0,0,0,0.35)] transition-all duration-200 hover:bg-white hover:shadow-[0_4px_20px_rgba(240,151,122,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0977A]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040506]"
              >
                <span>Try Product Jury</span>
                <ArrowUpRight
                  className="size-3.5 text-[#0A0B0E] transition-transform duration-200 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                  strokeWidth={2.2}
                  aria-hidden="true"
                />
              </a>

              {/* Secondary Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigate("/product-jury");
                }}
                className="group/sec inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-5 py-2.5 text-[13.5px] font-medium text-[#FAF7F0] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-all duration-200 hover:border-white/[0.22] hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0977A]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040506]"
              >
                <span>Read how it was built</span>
                <ArrowUpRight
                  className="size-3.5 text-[#F0977A] transition-transform duration-200 group-hover/sec:-translate-y-0.5 group-hover/sec:translate-x-0.5"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </article>

        {/* LOWER ROW: DIPA WORKFLOW CARD (FULL-WIDTH) */}
        <div className="mt-6 sm:mt-7 w-full rounded-[20px] border border-white/[0.08] bg-[#0A0B0F]/95 p-6 sm:p-7 md:p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md">
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <p className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.1em] text-[#9C9A95]">
              HOW DIPA WORKS · IN-MEMORY RETRIEVAL PIPELINE
            </p>
            <span className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-[0.1em] text-[#85837D]">
              DETERMINISTIC COSINE SCORING
            </span>
          </div>

          {/* Horizontal Sequence Pipeline */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 font-mono text-[11.5px] text-[#9C9A95]">
            {COPILOT_PIPELINE.map((step, i) => (
              <React.Fragment key={step}>
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="text-[#F0977A] font-sans text-xs px-0.5"
                  >
                    &rarr;
                  </span>
                )}
                <span className="rounded-lg border border-white/[0.07] bg-white/[0.04] px-2.5 py-1.5 font-medium text-[#FAF7F0] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
                  {step}
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Supporting Copy */}
          <div className="mt-4 max-w-[80ch]">
            <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[#9C9A95]">
              No vector database. Dipa’s chunks are my own case studies, embedded once at build time
              and scored in memory on every question. Retrieval time is measured per query and shown
              with the answer. If a question falls outside what the record covers, it says so rather
              than inventing one.
              <button
                type="button"
                onClick={() => onNavigate("/work/behind-ai-copilot")}
                className="ml-2 inline-flex items-center gap-1 font-mono text-[11.5px] text-[#F0977A] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F0977A]"
              >
                <span>Read how Dipa was built</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
