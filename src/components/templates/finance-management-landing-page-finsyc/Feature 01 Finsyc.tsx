"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  Camera,
  Layers,
  CheckCircle2,
  BookOpen,
  ArrowRight,
} from "lucide-react";

interface FeatureCardProps {
  key?: React.Key;
  category: string;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  icon: React.ElementType;
  points: string[];
  isHighlighted?: boolean;
  onExplore: () => void;
}

function SubsystemCard({
  category,
  title,
  description,
  metric,
  metricLabel,
  icon: Icon,
  points,
  isHighlighted = false,
  onExplore,
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onExplore}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={
        "relative flex flex-col justify-between p-8 rounded-[30px] border transition-all duration-500 overflow-hidden cursor-pointer group w-full lg:w-[612px] " +
        (isHighlighted
          ? "bg-[#042718] text-white border-[#042718] shadow-xl"
          : "bg-white text-[#042718] border-[#042718]/10 hover:border-[#188E39]/40 shadow-[0_4px_30px_rgba(4,39,24,0.03)] hover:shadow-[0_20px_50px_rgba(4,39,24,0.08)]")
      }
    >
      <div className="flex flex-col">
        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2.5">
            <div
              className={
                "w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 " +
                (isHighlighted ? "bg-white/15 text-white" : "bg-[#E4F2EB] text-[#188E39]")
              }
            >
              <Icon size={20} />
            </div>
            <span
              className={
                "font-inter text-xs font-bold uppercase tracking-wider " +
                (isHighlighted ? "text-[#34D399]" : "text-[#188E39]")
              }
            >
              {category}
            </span>
          </div>

          <div
            className={
              "px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 " +
              (isHighlighted ? "bg-white/10 text-white" : "bg-[#FAFDFB] border border-[#042718]/10 text-[#042718]")
            }
          >
            <span className="font-mono text-sm font-black">{metric}</span>
            <span className="opacity-70 text-[11px] font-normal">{metricLabel}</span>
          </div>
        </div>

        {/* Title */}
        <h3
          className={
            "font-onest text-2xl lg:text-[26px] font-bold tracking-tight leading-snug mb-3 " +
            (isHighlighted ? "text-white" : "text-[#042718]")
          }
        >
          {title}
        </h3>

        {/* Description */}
        <p
          className={
            "font-inter text-sm lg:text-base leading-relaxed mb-6 " +
            (isHighlighted ? "text-white/80" : "text-[#042718]/70")
          }
        >
          {description}
        </p>

        {/* Bullet Points */}
        <ul className="flex flex-col gap-2.5 mb-8">
          {points.map((pt, i) => (
            <li key={i} className="flex items-start gap-2 text-xs lg:text-sm">
              <CheckCircle2
                size={16}
                className={
                  "shrink-0 mt-0.5 " +
                  (isHighlighted ? "text-[#34D399]" : "text-[#188E39]")
                }
              />
              <span className={isHighlighted ? "text-white/90" : "text-[#042718]/80"}>
                {pt}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom CTA Strip */}
      <div className="pt-4 border-t border-current/10 flex items-center justify-between">
        <span
          className={
            "font-inter text-xs font-bold tracking-tight flex items-center gap-1.5 group-hover:gap-2 transition-all " +
            (isHighlighted ? "text-white" : "text-[#042718]")
          }
        >
          <span>Read Full Deep Dive</span>
          <ArrowRight size={14} className={isHighlighted ? "text-[#34D399]" : "text-[#188E39]"} />
        </span>

        <div
          className={
            "w-8 h-8 rounded-full flex items-center justify-center transition-all " +
            (isHighlighted
              ? "bg-white text-[#042718] group-hover:bg-[#34D399]"
              : "bg-[#042718] text-white group-hover:bg-[#188E39]")
          }
        >
          <ArrowUpRight size={15} />
        </div>
      </div>
    </motion.div>
  );
}

export default function Feature01Finsyc({
  className,
  onOpenCaseStudy,
}: {
  className?: string;
  onOpenCaseStudy?: (id?: string) => void;
}) {
  const subsystems: Omit<FeatureCardProps, "onExplore">[] = [
    {
      category: "Subsystem 01 · Fintech & Escrow",
      title: "Instant Payouts Engine at the Weighbridge",
      description:
        "Replaced 15-day delayed broker IOUs with automated, real-time UPI and bank escrow settlement triggered at physical weighing.",
      metric: "99.9%",
      metricLabel: "settlement reliability",
      icon: ShieldCheck,
      isHighlighted: true,
      points: [
        "Eliminated farmer liquidity distress and predatory broker deductions",
        "Weighbridge hardware SDK integrated with automated reconciliation",
        "Zero un-reconciled losses during peak mandi volume spikes",
      ],
    },
    {
      category: "Subsystem 02 · Marketplace Liquidity",
      title: "Dynamic Cocoon Bidding & Auction Exchange",
      description:
        "Engineered transparent, competitive digital auction rooms allowing verified reelers to place live bids on tested lots.",
      metric: ">35%",
      metricLabel: "bidding value lift",
      icon: TrendingUp,
      points: [
        "Real-time price discovery based on objective quality scores",
        "Replaced informal, cartel-prone mandi whisper bidding",
        "Sub-second auction state synchronization over flaky 2G/3G networks",
      ],
    },
    {
      category: "Subsystem 03 · Computer Vision & ML",
      title: "Computer Vision Cocoon Quality Grading",
      description:
        "Productized an ML mobile inspection workflow calculating renditta, shell ratio, and defect counts in under 30 seconds.",
      metric: "<30s",
      metricLabel: "inspection speed",
      icon: Camera,
      points: [
        "Eliminated subjective eye-test disputes between farmers and buyers",
        "Calibrated with central sericulture research station standards",
        "Assisted-operator UI built for high-stress, noisy mandi floor conditions",
      ],
    },
    {
      category: "Subsystem 04 · Multi-Tier Traceability",
      title: "ReshaFarms & ReshaSathi Unified Network",
      description:
        "Built vernacular mobile apps connecting sericulture farmers with advance IoT advisory, linked downstream to master yarn weavers.",
      metric: "4 Tiers",
      metricLabel: "end-to-end synchronized",
      icon: Layers,
      points: [
        "72-hour advance cocoon harvest signals informing mandi logistics",
        "Certified denier yarn quality guarantees for master silk weavers",
        "Single immutable provenance tracking from mulberry leaf to finished sari",
      ],
    },
  ];

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Onest:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600&display=swap"
        rel="stylesheet"
      />

      <section
        id="flagship-case-study"
        className={"w-full bg-[#FAFDFB] py-20 lg:py-32 flex justify-center " + (className || "")}
      >
        <div className="w-full max-w-[1248px] px-6 lg:px-0 flex flex-col items-center">
          {/* Header Tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E4F2EB] border border-[#188E39]/15 mb-6"
          >
            <Sparkles size={14} className="text-[#188E39]" />
            <span className="font-inter text-xs font-bold text-[#188E39] uppercase tracking-wider">
              Flagship Case Study 01
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-[920px] text-center text-[#042718] font-onest text-[34px] sm:text-[46px] lg:text-[56px] font-semibold leading-[1.12] tracking-tight lg:tracking-[-2px] mb-6"
          >
            Digitising India’s Silk Economy with{" "}
            <span className="font-playfair italic font-medium text-black/40">ReshaMandi</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-[720px] text-center text-[#042718]/80 font-inter text-base sm:text-lg leading-relaxed mb-12 lg:mb-16"
          >
            Deepak spearheaded core product workflows across India’s fragile sericulture value chain — architecting high-reliability software that respects harsh physical ground reality.
          </motion.p>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full justify-items-center">
            {subsystems.map((subsystem, idx) => (
              <SubsystemCard
                key={idx}
                {...subsystem}
                onExplore={() => onOpenCaseStudy && onOpenCaseStudy("reshamandi-b2b")}
              />
            ))}
          </div>

          {/* Interactive Deep Dive CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-12 w-full p-6 sm:p-8 rounded-[28px] bg-gradient-to-r from-[#042718] via-[#0b3824] to-[#042718] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-white/10"
          >
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#34D399] shrink-0 hidden sm:flex">
                <BookOpen size={24} />
              </div>
              <div>
                <h4 className="font-onest text-xl font-bold text-white">
                  Explore the Complete 13-Section Product Deep Dive
                </h4>
                <p className="font-inter text-sm text-white/70 mt-1">
                  Covers Field Discovery, 4:30 AM Mandi Dynamics, Architectural Tradeoffs, Fraud Guardrails, and Key PM Learnings.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenCaseStudy && onOpenCaseStudy("reshamandi-b2b")}
              className="px-6 py-3.5 rounded-full bg-[#34D399] hover:bg-[#22c55e] text-[#042718] font-inter font-bold text-sm transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Open 13-Section Deep Dive</span>
              <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
