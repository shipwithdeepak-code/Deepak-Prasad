"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  Search,
  Compass,
  Zap,
  Network,
  CheckCircle2,
  Users,
  Layers,
  Eye,
  ShieldCheck,
} from "lucide-react";

interface StepItem {
  id: string;
  stepNumber: string;
  label: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: React.ElementType;
  metric: string;
  detailBadge: string;
}

const steps: StepItem[] = [
  {
    id: "discovery",
    stepNumber: "01",
    label: "Ground Discovery",
    title: "4:30 AM Field Research & Ethnographic Mapping",
    description:
      "Deepak embeds directly on mandi floors, operations hubs, and workout floors to observe hundreds of raw, live interactions. Unarticulated operator anxiety and physical bottlenecks are captured before writing a single line of spec.",
    deliverables: [
      "Physical-to-digital floor observation & operational audits",
      "Stakeholder anxiety mapping & shadow banking interviews",
      "Opportunity Solution Trees with prioritized leverage points",
    ],
    icon: Search,
    metric: "100+ Hours",
    detailBadge: "Floor Immersion",
  },
  {
    id: "architecture",
    stepNumber: "02",
    label: "Workflow Architecture",
    title: "Workflow-First Architecture & Physical State Anchors",
    description:
      "“The product wasn’t the app. The workflow was.” Designing state machines that model physical custody transfers, hardware weighing integrations, and offline synchronization resilience for harsh environments.",
    deliverables: [
      "Deterministic state transitions for physical custody & cash handoffs",
      "Hardware SDK integration (weighbridges, thermal receipt printers, QR scanners)",
      "Zero-latency optimistic UI with background sync queues",
    ],
    icon: Compass,
    metric: "99.9%",
    detailBadge: "State Determinism",
  },
  {
    id: "experimentation",
    stepNumber: "03",
    label: "AI & Assisted-Tech",
    title: "Assisted-Tech & Computer Vision Model Productization",
    description:
      "Deploying AI where humans are biased or strained. Building assisted-operator tools that grade quality objectively, provide real-time pricing signals, and introduce automated fraud mitigation safeguards.",
    deliverables: [
      "Computer vision grading models calibrated with national research standards",
      "Assisted-operator UI built for high-glare, noisy rural environments",
      "Real-time fraud heuristics & dual-operator authorization protocols",
    ],
    icon: Zap,
    metric: "<30s Scan",
    detailBadge: "Computer Vision ML",
  },
  {
    id: "scale",
    stepNumber: "04",
    label: "Ecosystem Scale",
    title: "Multi-Tier Synchronization & Network Flywheels",
    description:
      "Scaling the product from single-hub operations into an interconnected ecosystem. Aligning upstream suppliers (farmers) with downstream enterprise buyers (master weavers) on a transparent digital ledger.",
    deliverables: [
      "Multi-persona vernacular apps (Kannada, Telugu, Hindi, English)",
      "Advance harvest forecasting feeds linking farm IoT to mandi logistics",
      "Supply assurance guarantees and automated ERP data exports",
    ],
    icon: Network,
    metric: "4 Tiers",
    detailBadge: "Network Flywheel",
  },
];

export default function HowItWorks01Finsyc({ className }: { className?: string }) {
  const [activeStepId, setActiveStepId] = useState<string>("discovery");
  const activeStep = steps.find((s) => s.id === activeStepId) || steps[0];

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Onest:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600&display=swap"
        rel="stylesheet"
      />

      <section
        id="methodology"
        className={"w-full bg-[#FAFDFB] py-20 lg:py-32 flex justify-center border-t border-[#042718]/5 " + (className || "")}
      >
        <div className="w-full max-w-[1248px] px-6 lg:px-0 flex flex-col items-center">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E4F2EB] border border-[#188E39]/15 mb-6"
          >
            <Sparkles size={14} className="text-[#188E39]" />
            <span className="font-inter text-xs font-bold text-[#188E39] uppercase tracking-wider">
              Product Methodology
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-[840px] text-center text-[#042718] font-onest text-[34px] sm:text-[46px] lg:text-[56px] font-semibold leading-[1.15] tracking-tight lg:tracking-[-2px] mb-6"
          >
            From Ambiguity to Scalable Systems in{" "}
            <span className="font-playfair italic font-medium text-black/40">4 rigorous</span> phases
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-[700px] text-center text-[#042718]/80 font-inter text-base sm:text-lg leading-relaxed mb-12 lg:mb-16"
          >
            A disciplined, evidence-based product framework honed across high-stakes physical marketplaces, AI workflows, and data platforms.
          </motion.p>

          {/* Step Selector Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 w-full mb-8">
            {steps.map((step) => {
              const isActive = activeStep.id === step.id;
              const Icon = step.icon;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStepId(step.id)}
                  className={
                    "flex flex-col items-start p-5 rounded-[22px] border transition-all duration-300 text-left cursor-pointer relative overflow-hidden " +
                    (isActive
                      ? "bg-[#042718] text-white border-[#042718] shadow-lg scale-[1.02]"
                      : "bg-white text-[#042718] border-[#042718]/10 hover:border-[#188E39]/40 hover:bg-[#F4FAF6]")
                  }
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <span
                      className={
                        "font-mono text-xs font-bold px-2 py-0.5 rounded-full " +
                        (isActive ? "bg-white/20 text-white" : "bg-[#042718]/5 text-[#042718]/70")
                      }
                    >
                      {step.stepNumber}
                    </span>
                    <Icon
                      size={18}
                      className={isActive ? "text-[#34D399]" : "text-[#188E39]"}
                    />
                  </div>

                  <span className="font-onest text-base font-bold tracking-tight">
                    {step.label}
                  </span>

                  <span
                    className={
                      "font-inter text-xs mt-1 truncate w-full " +
                      (isActive ? "text-white/70" : "text-[#042718]/50")
                    }
                  >
                    {step.detailBadge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed Active Step Stage Showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="w-full p-8 lg:p-12 rounded-[32px] bg-white border border-[#042718]/10 shadow-[0_12px_48px_rgba(4,39,24,0.04)] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Details Column */}
              <div className="lg:col-span-7 flex flex-col items-start">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-mono text-xs font-black text-[#188E39] px-2.5 py-1 rounded-full bg-[#E4F2EB]">
                    PHASE {activeStep.stepNumber}
                  </span>
                  <span className="font-inter text-xs font-semibold text-[#042718]/60 uppercase tracking-wider">
                    {activeStep.detailBadge}
                  </span>
                </div>

                <h3 className="font-onest text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#042718] tracking-tight leading-tight mb-4">
                  {activeStep.title}
                </h3>

                <p className="font-inter text-base sm:text-lg text-[#042718]/80 leading-relaxed mb-6">
                  {activeStep.description}
                </p>

                <div className="w-full pt-4 border-t border-[#042718]/10">
                  <h4 className="font-inter text-xs font-bold uppercase tracking-wider text-[#042718]/60 mb-3">
                    Key Artifacts & Execution Focus
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {activeStep.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-[#042718]/85">
                        <CheckCircle2 size={17} className="text-[#188E39] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Visual Summary Card */}
              <div className="lg:col-span-5 flex flex-col justify-center p-8 rounded-[24px] bg-[#FAFDFB] border border-[#042718]/10 shadow-inner">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-inter text-xs font-bold uppercase text-[#042718]/50">
                    Phase Metric
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#E4F2EB] flex items-center justify-center text-[#188E39]">
                    <Sparkles size={16} />
                  </div>
                </div>

                <div className="font-onest text-4xl sm:text-5xl font-extrabold text-[#042718] tracking-tight mb-2">
                  {activeStep.metric}
                </div>

                <div className="font-inter text-sm font-semibold text-[#188E39] mb-4">
                  Target Outcome Standard
                </div>

                <p className="font-inter text-xs text-[#042718]/70 leading-relaxed">
                  Every phase is bound to quantitative telemetry and continuous qualitative feedback loops from operators on the ground.
                </p>

                <div className="mt-6 pt-4 border-t border-[#042718]/10 flex items-center gap-2 text-xs font-bold text-[#042718]">
                  <ShieldCheck size={16} className="text-[#188E39]" />
                  <span>Evidence-Driven Product Rigor</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
