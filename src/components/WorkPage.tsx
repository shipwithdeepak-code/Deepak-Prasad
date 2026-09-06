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
    if (category.includes("B2B")) return <Database size={16} className="text-[#15803D]" />;
    if (category.includes("Sports")) return <Activity size={16} className="text-[#0268A1]" />;
    if (category.includes("Automation")) return <Terminal size={16} className="text-[#7E22CE]" />;
    return <Cpu size={16} className="text-[#B45209]" />;
  };

  const getTagBadgeClass = (tag: string) => {
    const t = tag.toLowerCase();
    if (t.includes("ai")) return "bg-[#E0F3FE] text-[#0268A1]";
    if (t.includes("b2b") || t.includes("marketplace")) return "bg-[#DCFCE7] text-[#15803D]";
    if (t.includes("growth") || t.includes("monetization") || t.includes("subscription"))
      return "bg-[#FEF2C6] text-[#B45209]";
    if (t.includes("strategy") || t.includes("connected")) return "bg-[#F3E8FF] text-[#7E22CE]";
    return "bg-[#042718]/5 text-[#042718]/70";
  };

  return (
    <div className="w-full bg-[#FAFDFB] text-[#042718] py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#042718]/5 text-xs font-inter font-semibold text-[#042718]/80 mb-4">
            <span>Portfolio & Product Case Studies</span>
          </div>
          <h1 className="font-onest text-4xl sm:text-5xl font-bold tracking-tight text-[#042718] leading-[1.15] mb-4">
            Selected Work & Case Studies
          </h1>
          <p className="font-inter text-base sm:text-lg text-[#042718]/70 leading-relaxed font-normal">
            A comprehensive record of products I’ve taken from ambiguity to launch, scale or development-ready strategy. Click any case study to read the deep-dive narrative.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-[#042718]/8 pb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-inter font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[#042718] text-white shadow-xs"
                  : "bg-white text-[#042718]/70 hover:text-[#042718] border border-[#042718]/10 hover:border-[#042718]/20"
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
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => {
                onSelectCaseStudy(study);
                onNavigate(`/work/${study.slug}`);
              }}
              className="group cursor-pointer rounded-[24px] bg-white border border-[#042718]/10 p-6 sm:p-10 transition-all duration-300 hover:border-[#188E39]/40 hover:shadow-[0_20px_50px_rgba(4,39,24,0.06)] flex flex-col justify-between relative"
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-onest font-bold text-sm text-[#042718]/40">
                      CASE {study.number}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#042718]/30" />
                    <span className="font-inter text-xs text-[#042718]/60 font-medium">
                      {study.category}
                    </span>
                  </div>

                  {study.isStrategyOnly ? (
                    <span className="px-2.5 py-1 rounded-full bg-[#F3E8FF] text-[#7E22CE] text-xs font-inter font-semibold">
                      Development-Ready Strategy
                    </span>
                  ) : (
                    <span className="font-inter text-xs text-[#042718]/50">
                      {study.timeline}
                    </span>
                  )}
                </div>

                {/* Title and Subtitle */}
                <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] group-hover:text-[#188E39] transition-colors leading-snug mb-2">
                  {study.title}
                </h2>
                <p className="font-inter text-sm sm:text-base font-medium text-[#042718]/80 mb-4 max-w-3xl">
                  {study.subtitle}
                </p>

                {/* Description */}
                <p className="font-inter text-sm text-[#042718]/65 leading-relaxed mb-6 max-w-3xl">
                  {study.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {study.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className={`px-2.5 py-1 rounded-md text-xs font-inter font-medium ${getTagBadgeClass(
                        tag
                      )}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Proof & CTA */}
              <div className="pt-6 border-t border-[#042718]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs sm:text-[13px] font-inter">
                  {study.proofPoints.map((proof, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-1.5 text-[#042718]/85 font-medium">
                      <CheckCircle2 size={14} className="text-[#188E39] shrink-0" />
                      <span>{proof}</span>
                    </div>
                  ))}
                </div>

                <div className="inline-flex items-center gap-1.5 text-sm font-inter font-semibold text-[#042718] group-hover:text-[#188E39] transition-colors shrink-0">
                  <span>Read full case study</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* =========================================================================
            MORE WORK (SECTION 13)
            ========================================================================= */}
        <section id="more-work" className="pt-8 border-t border-[#042718]/10">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-inter font-semibold uppercase tracking-wider text-[#188E39] mb-2">
              <Layers size={14} />
              <span>Secondary & Systems Work</span>
            </div>
            <h2 className="font-onest text-3xl sm:text-4xl font-bold tracking-tight text-[#042718]">
              More work
            </h2>
            <p className="font-inter text-base text-[#042718]/70 mt-2">
              A record of platform extensions, operational pipelines, CRM/ERP integrations, and earlier hardware product initiatives.
            </p>
          </div>

          <div className="flex flex-col gap-12">
            {MORE_WORK_CATEGORIES.map((cat, cIdx) => (
              <div key={cIdx} className="bg-white rounded-[24px] border border-[#042718]/8 p-6 sm:p-8 shadow-2xs">
                <div className="flex items-center gap-3 mb-2">
                  {getCategoryIcon(cat.category)}
                  <h3 className="font-onest text-xl sm:text-2xl font-bold text-[#042718]">
                    {cat.category}
                  </h3>
                </div>
                <p className="font-inter text-xs sm:text-sm text-[#042718]/60 mb-6">
                  {cat.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cat.items.map((item, iIdx) => (
                    <div
                      key={iIdx}
                      className="rounded-[16px] bg-[#FAFDFB] hover:bg-[#F4FAFA] border border-[#042718]/6 p-5 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className="font-onest text-base font-bold text-[#042718]">
                            {item.title}
                          </h4>
                          <span className="text-[11px] font-inter font-semibold text-[#188E39] px-2 py-0.5 rounded-full bg-[#188E39]/10 shrink-0">
                            {item.scope}
                          </span>
                        </div>
                        <p className="font-inter text-xs sm:text-[13px] text-[#042718]/70 leading-relaxed mb-4">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#042718]/5">
                        {item.tags.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-inter font-medium px-2 py-0.5 rounded bg-white text-[#042718]/60 border border-[#042718]/5"
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
