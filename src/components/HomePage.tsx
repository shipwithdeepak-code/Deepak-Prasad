import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
  Layers,
  FileText,
  Compass,
  Zap,
} from "lucide-react";
import { ALL_FLAGSHIP_CASE_STUDIES, HOW_I_WORK_PRINCIPLES } from "../data/caseStudies";
import { CaseStudyDetail } from "../types";

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectCaseStudy: (caseStudy: CaseStudyDetail) => void;
  onOpenResumeModal?: () => void;
}

export default function HomePage({
  onNavigate,
  onSelectCaseStudy,
  onOpenResumeModal,
}: HomePageProps) {
  const [hoveredCaseId, setHoveredCaseId] = useState<string | null>(null);

  const domainPills = [
    "ReshaMandi B2B Ecosystem",
    "Instant Payouts Engine (99.9%)",
    "Computer Vision ML Grading",
    "Sportstech B2C SaaS",
    "0→1 AI Product Advisory",
    "Multi-Tier Supply Chain",
    "Dynamic Bidding Auctions (>35%)",
  ];

  const proofStripMetrics = [
    { value: "7+ years", label: "Product experience", detail: "Across India & Europe" },
    { value: "0→1", label: "AI, SaaS & platforms", detail: "Concept to production" },
    { value: "200+", label: "AI-localized videos", detail: "In ~3 weeks across 3 languages" },
    { value: "12K+", label: "Paid subscribers", detail: "€659K FY25 subscription revenue" },
    { value: "80K+", label: "Farmers served", detail: "Through ReshaFarms lifecycle" },
  ];

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
    <div className="w-full bg-[#FAFDFB] text-[#042718]">
      {/* =========================================================================
          1. HERO SECTION (CENTERED COMPOSITION INTEGRATED WITH TOP NAVIGATION)
          ========================================================================= */}
      <section className="relative -mt-20 pt-28 pb-16 md:pt-36 md:pb-24 min-h-[calc(100vh)] flex flex-col justify-center items-center overflow-hidden border-b border-[#042718]/5 bg-[#FAFDFB]">
        {/* Earlier Original Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://cdn.jiro.build/Amox/All%20Images/P01-Header-01-BG.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center my-auto w-full">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xs border border-[#042718]/10 text-xs sm:text-sm font-inter font-semibold text-[#042718]/80 mb-6 shadow-2xs mx-auto"
          >
            <span className="w-2 h-2 rounded-full bg-[#188E39]" />
            <span>Senior Product Manager · AI · 0→1 · B2B & B2C</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="font-onest text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#042718] leading-[1.1] mb-6 max-w-4xl mx-auto text-center"
          >
            I&apos;m mostly just someone who stays{" "}
            <span className="font-playfair italic font-medium text-[#042718]/70">
              curious
            </span>
            .{" "}
            <span className="font-playfair italic font-medium text-[#042718]/70">
              Stubborn
            </span>{" "}
            enough not to stop asking &apos;why.&apos;
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-inter text-lg sm:text-xl text-[#042718]/80 leading-relaxed mb-8 max-w-3xl mx-auto text-center font-normal"
          >
            I&apos;m{" "}
            <span className="font-playfair italic font-medium text-[#042718]">
              Deepak
            </span>
            , a Senior Product Manager, though most days it just feels like staying curious long enough to build things that actually work. 7+ years across marketplaces, AI features, and subscription products. Not because I had all the answers. Because I kept asking questions until the product matched reality.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12 sm:mb-16"
          >
            <button
              type="button"
              id="hero-view-work-cta"
              onClick={() => onNavigate("/work")}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#042718] hover:bg-[#063b25] text-white font-inter text-sm font-semibold transition-all duration-200 shadow-sm hover:shadow cursor-pointer"
            >
              <span>View Selected Work</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              id="hero-about-cta"
              onClick={() => onNavigate("/about")}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/90 hover:bg-white border border-[#042718]/15 text-[#042718] font-inter text-sm font-semibold transition-all duration-200 cursor-pointer shadow-2xs backdrop-blur-xs"
            >
              <span>About Me</span>
              <ArrowUpRight size={15} className="text-[#042718]/60" />
            </button>
          </motion.div>

          {/* Domain Ticker Marquee */}
          <div
            className="w-full max-w-4xl mx-auto overflow-hidden py-1"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            } as React.CSSProperties}
          >
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 24,
                ease: "linear",
                repeat: Infinity,
              }}
              className="flex items-center gap-3 w-fit whitespace-nowrap mx-auto"
            >
              {[...domainPills, ...domainPills].map((pill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-xs border border-[#042718]/10 shadow-2xs text-xs sm:text-sm font-medium text-[#042718]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#188E39]" />
                  <span>{pill}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. HOMEPAGE PROOF STRIP (RESTRAINED, ELEGANT, NOT DASHBOARD-Y)
          ========================================================================= */}
      <section id="methodology" className="py-10 bg-white border-b border-[#042718]/8 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#042718]/8">
            {proofStripMetrics.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-start ${idx > 0 ? "md:pl-6 pt-4 md:pt-0" : ""}`}
              >
                <span className="font-onest text-2xl sm:text-3xl font-bold tracking-tight text-[#042718]">
                  {item.value}
                </span>
                <span className="font-inter text-xs sm:text-[13px] font-semibold text-[#042718]/90 mt-0.5">
                  {item.label}
                </span>
                <span className="font-inter text-[11px] text-[#042718]/50 mt-0.5">
                  {item.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SELECTED WORK SECTION (5 FLAGSHIP CASE STUDIES)
          ========================================================================= */}
      <section id="selected-work" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-inter font-semibold uppercase tracking-wider text-[#188E39] mb-2">
              <Sparkles size={14} />
              <span>Flagship Case Studies</span>
            </div>
            <h2 className="font-onest text-3xl sm:text-4xl font-bold tracking-tight text-[#042718]">
              Selected work
            </h2>
            <p className="font-inter text-base text-[#042718]/70 mt-2 max-w-xl">
              A selection of products I’ve taken from ambiguity to launch, scale or development-ready strategy.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="inline-flex items-center gap-2 text-sm font-inter font-semibold text-[#042718] hover:text-[#188E39] transition-colors cursor-pointer group shrink-0"
          >
            <span>Explore all projects</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* The 5 Flagship Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ALL_FLAGSHIP_CASE_STUDIES.map((study, idx) => {
            const isFullWidth = idx === 0; // Feature ReshaMandi as primary anchor
            return (
              <motion.article
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                onMouseEnter={() => setHoveredCaseId(study.id)}
                onMouseLeave={() => setHoveredCaseId(null)}
                onClick={() => {
                  onSelectCaseStudy(study);
                  onNavigate(`/work/${study.slug}`);
                }}
                className={`group cursor-pointer rounded-[24px] bg-white border border-[#042718]/10 p-6 sm:p-8 transition-all duration-300 hover:border-[#188E39]/40 hover:shadow-[0_16px_40px_rgba(4,39,24,0.06)] flex flex-col justify-between relative overflow-hidden ${
                  isFullWidth ? "lg:col-span-2 bg-gradient-to-br from-white to-[#F4FAFA]" : ""
                }`}
              >
                {/* Header row: Number, Category, Strategy notice badge */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-onest font-bold text-sm text-[#042718]/40">
                        {study.number}
                      </span>
                      <span className="font-inter text-xs text-[#042718]/60 font-medium">
                        {study.category}
                      </span>
                    </div>

                    {study.isStrategyOnly && (
                      <span className="px-2.5 py-1 rounded-full bg-[#F3E8FF] text-[#7E22CE] text-[11px] font-inter font-semibold">
                        Development-Ready Strategy
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] group-hover:text-[#188E39] transition-colors leading-snug mb-3">
                    {study.title}
                  </h3>

                  {/* Description */}
                  <p className="font-inter text-sm sm:text-base text-[#042718]/70 leading-relaxed mb-6 max-w-2xl">
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

                {/* Proof Highlights Footer */}
                <div className="pt-6 border-t border-[#042718]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-inter">
                    {study.proofPoints.map((proof, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-1.5 text-[#042718]/80 font-medium">
                        <CheckCircle2 size={13} className="text-[#188E39] shrink-0" />
                        <span>{proof}</span>
                      </div>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs font-inter font-semibold text-[#042718] group-hover:text-[#188E39] transition-colors shrink-0">
                    <span>Read case study</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. HOW I WORK (5 PRINCIPLES)
          ========================================================================= */}
      <section id="principles" className="py-20 bg-[#F4FAFA] border-y border-[#042718]/8 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-inter font-semibold uppercase tracking-wider text-[#188E39] mb-2">
              <Compass size={14} />
              <span>Operating Principles</span>
            </div>
            <h2 className="font-onest text-3xl sm:text-4xl font-bold tracking-tight text-[#042718]">
              How I approach product problems
            </h2>
            <p className="font-inter text-base text-[#042718]/70 mt-2">
              Five consistent product principles refined over 7+ years of building across complex B2B ecosystems and high-growth consumer apps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOW_I_WORK_PRINCIPLES.map((principle, idx) => (
              <div
                key={principle.number}
                className={`bg-white rounded-[20px] p-6 border border-[#042718]/8 shadow-2xs flex flex-col justify-between ${
                  idx === 4 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-onest text-sm font-bold text-[#188E39]">
                      {principle.number}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#188E39]/40" />
                  </div>
                  <h3 className="font-onest text-lg font-bold text-[#042718] leading-snug mb-2">
                    {principle.title}
                  </h3>
                  <p className="font-inter text-xs sm:text-sm text-[#042718]/70 leading-relaxed mb-4">
                    {principle.description}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#042718]/5 text-[11px] font-inter text-[#042718]/50 italic">
                  {principle.detail}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => onNavigate("/about")}
              className="inline-flex items-center gap-2 text-sm font-inter font-semibold text-[#042718] hover:text-[#188E39] transition-colors cursor-pointer"
            >
              <span>Learn more about my background and leadership approach</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. MORE WORK TEASER STRIP
          ========================================================================= */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[24px] bg-[#042718] text-white p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative overflow-hidden">
          <div className="max-w-xl z-10">
            <span className="text-xs font-inter font-semibold uppercase tracking-wider text-[#A7F3D0] mb-2 block">
              Beyond Flagships
            </span>
            <h3 className="font-onest text-2xl sm:text-3xl font-bold leading-tight mb-3">
              Looking for more B2B, Sportstech, or Automation work?
            </h3>
            <p className="font-inter text-sm sm:text-base text-white/70 leading-relaxed">
              Explore 15+ additional projects across supply-chain platforms, connected health integrations, internal workflow engines, and early IoT hardware products.
            </p>
          </div>

          <div className="shrink-0 z-10">
            <button
              type="button"
              onClick={() => onNavigate("/work")}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white text-[#042718] hover:bg-[#FAFDFB] font-inter text-sm font-semibold transition-all duration-200 cursor-pointer shadow-md"
            >
              <span>Explore all work</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
