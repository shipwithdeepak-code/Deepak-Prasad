"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowUpRight, Check, Compass, Users, Layers, Zap } from "lucide-react";

interface EngagementPlan {
  name: string;
  badge: string;
  description: string;
  duration: string;
  scopeHighlights: string[];
  idealFor: string;
  isPopular?: boolean;
}

const plans: EngagementPlan[] = [
  {
    name: "0→1 Product Discovery & MVP",
    badge: "Sprint & Discovery",
    description: "Rapidly de-risk ambiguous product opportunities with grounded research, fast prototypes, and structured thesis validation.",
    duration: "4 - 8 Weeks",
    idealFor: "Seed to Series A founders validating new concepts or AI features",
    scopeHighlights: [
      "User & operator field research interviews",
      "Opportunity Solution Trees & PRD definition",
      "Interactive high-fidelity prototypes & clickable MVPs",
      "Telemetry & analytics instrumentation plan",
      "Initial usability testing & PMF signals",
    ],
  },
  {
    name: "Senior Product Leadership",
    badge: "Full-Time Role",
    description: "End-to-end PM ownership spearheading complex marketplaces, B2B workflow systems, or high-retention consumer SaaS.",
    duration: "Full-Time",
    idealFor: "Scaleups needing an experienced Senior PM to own high-stakes systems",
    isPopular: true,
    scopeHighlights: [
      "Complete roadmap ownership & stakeholder alignment",
      "Direct collaboration with Engineering, Design & Ops",
      "Core marketplace liquidity & escrow workflow systems",
      "Machine learning & computer vision model productization",
      "Continuous data telemetry, A/B testing & cohort analysis",
    ],
  },
  {
    name: "Marketplace & Systems Advisory",
    badge: "Strategic Advisory",
    description: "Weekly or bi-weekly strategic advisory on physical-digital workflows, fraud mitigation, and operational scale.",
    duration: "Retainer / Advisory",
    idealFor: "Leadership teams wanting experienced product architecture reviews",
    scopeHighlights: [
      "Product roadmap & architecture critiques",
      "Physical-to-digital custody workflow reviews",
      "Assisted-tech & AI automation feasibility audits",
      "Escrow & payment reconciliation system design",
      "Mentorship for junior & mid-level product managers",
    ],
  },
];

function PlanCard({
  plan,
  isVisualActive,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  plan: EngagementPlan;
  isVisualActive: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={
        "relative flex flex-col justify-between items-start w-full lg:w-[404px] p-8 rounded-[30px] border transition-all duration-500 overflow-hidden cursor-pointer group " +
        (isVisualActive
          ? "border-transparent shadow-2xl bg-[#042718] text-white"
          : "border-[#042718]/10 bg-white text-[#042718] hover:border-[#188E39]/40 shadow-[0_4px_30px_rgba(4,39,24,0.03)]")
      }
      animate={{
        y: isVisualActive ? -8 : 0,
      }}
      transition={{ duration: 0.4, ease: [0.21, 0.45, 0.32, 0.9] as const }}
    >
      <div className="relative z-10 w-full flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between w-full mb-4">
          <span
            className={
              "font-inter text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full " +
              (isVisualActive ? "bg-[#34D399]/20 text-[#34D399]" : "bg-[#E4F2EB] text-[#188E39]")
            }
          >
            {plan.badge}
          </span>

          <span
            className={
              "font-mono text-xs font-semibold " +
              (isVisualActive ? "text-white/60" : "text-[#042718]/60")
            }
          >
            {plan.duration}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <h3
            className={
              "font-onest text-[24px] font-bold leading-tight tracking-tight " +
              (isVisualActive ? "text-white" : "text-[#042718]")
            }
          >
            {plan.name}
          </h3>
          <p
            className={
              "font-inter text-sm leading-relaxed " +
              (isVisualActive ? "text-white/80" : "text-[#042718]/70")
            }
          >
            {plan.description}
          </p>
        </div>

        <div
          className={
            "my-6 border-t w-full transition-colors duration-300 " +
            (isVisualActive ? "border-white/15" : "border-[#042718]/10")
          }
        />

        {/* Ideal For */}
        <div className="mb-6">
          <span
            className={
              "font-inter text-[11px] font-bold uppercase tracking-wider block mb-1 " +
              (isVisualActive ? "text-white/60" : "text-[#042718]/50")
            }
          >
            BEST SUITED FOR
          </span>
          <p
            className={
              "font-inter text-xs leading-relaxed " +
              (isVisualActive ? "text-white/90" : "text-[#042718]/80 font-medium")
            }
          >
            {plan.idealFor}
          </p>
        </div>

        {/* CTA Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          onMouseEnter={() => setIsBtnHovered(true)}
          onMouseLeave={() => setIsBtnHovered(false)}
          className={
            "flex items-center justify-between self-stretch rounded-full border transition-all duration-300 relative overflow-hidden h-12 px-4 " +
            (isVisualActive
              ? "bg-[#34D399] border-[#34D399] text-[#042718] font-bold"
              : "bg-[#042718] border-[#042718] text-white")
          }
        >
          <span className="font-inter text-sm font-semibold">Discuss Engagement</span>
          <div
            className={
              "flex items-center justify-center w-8 h-8 rounded-full transition-all " +
              (isVisualActive ? "bg-[#042718] text-white" : "bg-white text-[#042718]")
            }
          >
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </div>
        </button>

        {/* Features List */}
        <div className="mt-8 flex flex-col">
          <p
            className={
              "font-inter text-[11px] font-bold uppercase tracking-wider mb-4 " +
              (isVisualActive ? "text-white/60" : "text-[#042718]/50")
            }
          >
            KEY DELIVERABLES
          </p>

          <ul className="flex flex-col gap-3">
            {plan.scopeHighlights.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div
                  className={
                    "mt-0.5 flex items-center justify-center w-4 h-4 rounded-full shrink-0 " +
                    (isVisualActive ? "text-[#34D399]" : "text-[#188E39]")
                  }
                >
                  <Check size={14} strokeWidth={3} />
                </div>
                <span
                  className={
                    "font-inter text-xs lg:text-[13px] leading-snug " +
                    (isVisualActive ? "text-white/85" : "text-[#042718]/80")
                  }
                >
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing01Finsyc({
  className,
  onOpenContact,
}: {
  className?: string;
  onOpenContact?: () => void;
}) {
  const [activePlan, setActivePlan] = useState("Senior Product Leadership");
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Onest:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600&display=swap"
        rel="stylesheet"
      />

      <section
        id="pricing"
        className={"w-full bg-[#FAFDFB] py-20 lg:py-32 flex justify-center border-t border-[#042718]/5 " + (className || "")}
      >
        <div className="w-full max-w-[1248px] px-6 lg:px-0 flex flex-col items-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E4F2EB] border border-[#188E39]/15 mb-6"
          >
            <Sparkles size={14} className="text-[#188E39]" />
            <span className="font-inter text-xs font-bold text-[#188E39] uppercase tracking-wider">
              Engagement & Collaboration
            </span>
          </motion.div>

          <motion.h2
            initial={{ y: 24, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="w-full max-w-[840px] text-center text-[#042718] font-onest text-[34px] sm:text-[46px] lg:text-[56px] font-semibold leading-[1.12] tracking-tight lg:tracking-[-2px] mb-6"
          >
            Ways to <span className="font-playfair italic font-medium text-black/40">collaborate</span> with Deepak
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-[640px] text-center font-inter text-base sm:text-lg leading-relaxed text-[#042718]/80 mb-14"
          >
            Available for full-time Senior Product Manager leadership, 0→1 discovery sprints, and strategic operational architecture advisory.
          </motion.p>

          <div className="flex flex-col lg:flex-row gap-6 w-full justify-center">
            {plans.map((plan, idx) => {
              const isVisualActive = hoveredPlan ? hoveredPlan === plan.name : activePlan === plan.name;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + idx * 0.1,
                    ease: [0.21, 0.45, 0.32, 0.9] as const,
                  }}
                  className="w-full lg:w-auto"
                >
                  <PlanCard
                    plan={plan}
                    isVisualActive={isVisualActive}
                    onClick={() => onOpenContact && onOpenContact()}
                    onMouseEnter={() => setHoveredPlan(plan.name)}
                    onMouseLeave={() => setHoveredPlan(null)}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
