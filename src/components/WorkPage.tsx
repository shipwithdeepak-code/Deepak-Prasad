import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Layers,
  FileText,
  Filter,
  Terminal,
  Activity,
  Cpu,
  Database,
} from "lucide-react";
import {
  ALL_FLAGSHIP_CASE_STUDIES,
  MORE_WORK_CATEGORIES,
} from "../data/caseStudies";
import { CaseStudyDetail } from "../types";

interface WorkPageProps {
  onNavigate: (path: string) => void;
  onSelectCaseStudy: (caseStudy: CaseStudyDetail) => void;
}

export default function WorkPage({
  onNavigate,
  onSelectCaseStudy,
}: WorkPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "All Flagships" },
    { id: "b2b", label: "B2B & Platforms" },
    { id: "ai", label: "AI & Consumer" },
    { id: "monetization", label: "Monetization & Growth" },
    { id: "connected", label: "Connected Products" },
  ];

  const filteredStudies = ALL_FLAGSHIP_CASE_STUDIES.filter((study) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "b2b") return study.tags.includes("B2B") || study.tags.includes("Marketplace");
    if (selectedCategory === "ai") return study.tags.includes("AI") || study.tags.includes("Conversational AI");
    if (selectedCategory === "monetization") return study.tags.includes("Growth") || study.tags.includes("Monetization");
    if (selectedCategory === "connected") return study.tags.includes("Connected Products") || study.tags.includes("Product Strategy");
    return true;
  });

  const getCategoryIcon = (category: string) => {
    if (category.includes("B2B")) return <Database size={16} className="text-coral" />;
    if (category.includes("Sports")) return <Activity size={16} className="text-coral" />;
    if (category.includes("Automation")) return <Terminal size={16} className="text-coral" />;
    return <Cpu size={16} className="text-coral" />;
  };

  const getTagBadgeClass = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes("ai") || t.includes("strategy")) {
      return "bg-ghost border border-[var(--rule-strong)] text-coral";
    }
    return "bg-ghost border border-[var(--rule)] text-mute";
  };

  return (
    <div className="w-full bg-void text-ivory py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ghost border border-[var(--rule-strong)] text-xs font-mono uppercase tracking-[0.18em] text-coral mb-4">
            <span>Portfolio & Product Case Studies</span>
          </div>
          <h1
            className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ivory leading-[1.15] mb-4"
            style={{ fontVariationSettings: '"wdth" 92' }}
          >
            Selected Work & Case Studies
          </h1>
          <p className="font-body text-base sm:text-lg text-mute leading-relaxed font-normal">
            A comprehensive record of products I’ve taken from ambiguity to launch, scale or development-ready strategy. Click any case study to read the deep-dive narrative.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-[var(--rule)] pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-[0.14em] font-medium transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral active:scale-[.97] ${
                selectedCategory === cat.id
                  ? "bg-coral text-void font-semibold shadow-xs"
                  : "bg-ghost text-mute hover:text-ivory border border-[var(--rule)] hover:border-[var(--rule-strong)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Flagship Case Studies List */}
        <div className="flex flex-col gap-8 mb-24">
          {filteredStudies.map((study, idx) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                onSelectCaseStudy(study);
                onNavigate(`/work/${study.slug}`);
              }}
              className="group cursor-pointer rounded-[24px] bg-ghost border border-[var(--rule)] p-6 sm:p-10 transition-all duration-300 hover:border-coral/40 hover:bg-ghost-active flex flex-col justify-between relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-coral font-medium">
                      CASE {study.number}
                    </span>
                    <span className="text-[var(--rule-strong)]">/</span>
                    <span className="font-mono text-xs text-mute uppercase tracking-[0.14em]">
                      {study.category}
                    </span>
                  </div>

                  {study.isStrategyOnly ? (
                    <span className="px-2.5 py-1 rounded-full bg-ghost border border-[var(--rule-strong)] text-coral text-xs font-mono uppercase tracking-[0.14em]">
                      Development-Ready Strategy
                    </span>
                  ) : (
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-mute">
                      {study.timeline}
                    </span>
                  )}
                </div>

                {/* Title and Subtitle */}
                <h2
                  className="font-display text-2xl sm:text-3xl font-bold text-ivory group-hover:text-coral transition-colors leading-snug mb-2"
                  style={{ fontVariationSettings: '"wdth" 92' }}
                >
                  {study.title}
                </h2>
                <p className="font-body text-sm sm:text-base font-medium text-ivory/80 mb-4 max-w-3xl">
                  {study.subtitle}
                </p>

                {/* Description */}
                <p className="font-body text-sm text-mute leading-relaxed mb-6 max-w-3xl">
                  {study.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {study.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono uppercase tracking-[0.12em] ${getTagBadgeClass(
                        tag
                      )}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Proof & CTA */}
              <div className="pt-6 border-t border-[var(--rule)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs sm:text-[13px] font-body">
                  {study.proofPoints.map((proof, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-1.5 text-ivory/80 font-medium">
                      <CheckCircle2 size={14} className="text-coral shrink-0" />
                      <span>{proof}</span>
                    </div>
                  ))}
                </div>

                <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.16em] font-semibold text-coral group-hover:translate-x-1 transition-transform shrink-0">
                  <span>Read full case study</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* =========================================================================
            MORE WORK (SECTION 13)
            ========================================================================= */}
        <section id="more-work" className="pt-8 border-t border-[var(--rule)]">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.18em] text-coral mb-2">
              <Layers size={14} className="text-coral" />
              <span>Secondary & Systems Work</span>
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ivory"
              style={{ fontVariationSettings: '"wdth" 92' }}
            >
              More work
            </h2>
            <p className="font-body text-base text-mute mt-2">
              A record of platform extensions, operational pipelines, CRM/ERP integrations, and earlier hardware product initiatives.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {MORE_WORK_CATEGORIES.map((cat, cIdx) => (
              <div key={cIdx} className="bg-ghost rounded-[24px] border border-[var(--rule)] p-6 sm:p-8 shadow-2xs">
                <div className="flex items-center gap-3 mb-2">
                  {getCategoryIcon(cat.category)}
                  <h3
                    className="font-display text-xl sm:text-2xl font-bold text-ivory"
                    style={{ fontVariationSettings: '"wdth" 92' }}
                  >
                    {cat.category}
                  </h3>
                </div>
                <p className="font-body text-xs sm:text-sm text-mute mb-6">
                  {cat.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cat.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="rounded-[16px] bg-void/60 hover:bg-ghost border border-[var(--rule)] p-5 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4
                            className="font-display text-base font-bold text-ivory"
                            style={{ fontVariationSettings: '"wdth" 92' }}
                          >
                            {item.title}
                          </h4>
                          <span className="text-[11px] font-mono font-semibold text-coral px-2 py-0.5 rounded-full bg-ghost border border-[var(--rule-strong)] shrink-0 uppercase tracking-[0.12em]">
                            {item.scope}
                          </span>
                        </div>
                        <p className="font-body text-xs sm:text-[13px] text-mute leading-relaxed mb-4">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[var(--rule)]">
                        {item.tags.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-mono uppercase tracking-[0.1em] px-2 py-0.5 rounded bg-ghost text-mute border border-[var(--rule)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
