import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
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

function useStatCountUp(
  start: number,
  target: number,
  duration: number,
  delay: number,
  isInView: boolean,
  shouldReduceMotion: boolean
) {
  const [value, setValue] = useState(shouldReduceMotion ? target : start);

  useEffect(() => {
    if (shouldReduceMotion) {
      setValue(target);
      return;
    }
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const timeoutId = setTimeout(() => {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Cubic ease-out curve
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (target - start) * easeOut);
        setValue(current);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setValue(target);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [start, target, duration, delay, isInView, shouldReduceMotion]);

  return shouldReduceMotion ? target : value;
}

interface StatNumberDisplayProps {
  idx: number;
  isInView: boolean;
  shouldReduceMotion: boolean;
}

function StatNumberDisplay({ idx, isInView, shouldReduceMotion }: StatNumberDisplayProps) {
  const configs = [
    { start: 0, target: 7, type: "years" },
    { start: 0, target: 1, type: "zeroToOne" },
    { start: 0, target: 80, type: "kPlus" },
    { start: 0, target: 12, type: "kPlus" },
    { start: 300, target: 3200, type: "dauGrowth" },
    { start: 0, target: 2, type: "payoutTime" },
  ];

  const cfg = configs[idx];
  const delay = idx * 90;
  const count = useStatCountUp(cfg.start, cfg.target, 1100, delay, isInView, shouldReduceMotion);

  if (cfg.type === "years") {
    return (
      <span className="font-onest text-2xl sm:text-3xl font-bold tracking-tight text-[#042718]">
        {count}+ years
      </span>
    );
  }

  if (cfg.type === "zeroToOne") {
    return (
      <span className="font-onest text-2xl sm:text-3xl font-bold tracking-tight text-[#042718] inline-flex items-center">
        <span>0</span>
        <span className="font-playfair italic font-normal text-[#042718]/70 mx-1 select-none">
          →
        </span>
        <span>{count}</span>
      </span>
    );
  }

  if (cfg.type === "kPlus") {
    return (
      <span className="font-onest text-2xl sm:text-3xl font-bold tracking-tight text-[#042718]">
        {count}K+
      </span>
    );
  }

  if (cfg.type === "dauGrowth") {
    return (
      <span className="font-onest text-2xl sm:text-3xl font-bold tracking-tight text-[#042718] inline-flex items-center">
        <span>300</span>
        <span className="font-playfair italic font-normal text-[#042718]/70 mx-1.5 select-none">
          →
        </span>
        <span>{count.toLocaleString()}+</span>
      </span>
    );
  }

  if (cfg.type === "payoutTime") {
    return (
      <span className="font-onest text-2xl sm:text-3xl font-bold tracking-tight text-[#042718] inline-flex items-center">
        <span>15 days</span>
        <span className="font-playfair italic font-normal text-[#042718]/70 mx-1.5 select-none">
          →
        </span>
        <span>under {count} hrs</span>
      </span>
    );
  }

  return null;
}

function Case01Diagram() {
  return (
    <svg
      viewBox="0 0 480 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto" }}
      className="w-full h-auto mx-auto block"
      aria-hidden="true"
    >
      <g stroke="#9CA3AF" strokeWidth="1.6" fill="#F3F4F6" opacity="0.9">
        <rect x="45" y="40" width="26" height="18" rx="2" transform="rotate(-14 58 49)" />
        <rect x="150" y="35" width="24" height="16" rx="6" transform="rotate(10 162 43)" />
        <path d="M156,49 l-6,8 l10,-3 Z" transform="rotate(10 162 43)" fill="#F3F4F6" stroke="#9CA3AF" />
        <rect x="30" y="130" width="24" height="17" rx="2" transform="rotate(18 42 138)" />
        <rect x="95" y="185" width="26" height="18" rx="2" transform="rotate(-9 108 194)" />
        <rect x="175" y="170" width="24" height="16" rx="6" transform="rotate(14 187 178)" />
        <path d="M181,184 l-6,8 l10,-3 Z" transform="rotate(14 187 178)" fill="#F3F4F6" stroke="#9CA3AF" />
      </g>
      <g stroke="#9CA3AF" strokeWidth="1.4" opacity="0.8">
        <line x1="185" y1="95" x2="200" y2="102" transform="rotate(-16 192 98)" />
        <line x1="185" y1="102" x2="203" y2="97" transform="rotate(-16 192 98)" />
        <line x1="188" y1="109" x2="199" y2="112" transform="rotate(-16 192 98)" />
      </g>
      <g stroke="#9CA3AF" strokeWidth="1.2" fill="none" opacity="0.75" transform="rotate(6 45 95)">
        <rect x="35" y="85" width="20" height="20" rx="2" />
        <line x1="35" y1="95" x2="55" y2="95" />
        <line x1="45" y1="85" x2="45" y2="105" />
      </g>

      <g stroke="#1FAE58" strokeOpacity="0.35" strokeWidth="1.5">
        <line x1="300" y1="60" x2="380" y2="60" />
        <line x1="380" y1="60" x2="460" y2="60" />
        <line x1="300" y1="140" x2="380" y2="140" />
        <line x1="380" y1="140" x2="460" y2="140" />
        <line x1="300" y1="220" x2="380" y2="220" />
        <line x1="380" y1="220" x2="460" y2="220" />
        <line x1="300" y1="60" x2="300" y2="140" />
        <line x1="300" y1="140" x2="300" y2="220" />
        <line x1="380" y1="60" x2="380" y2="140" />
        <line x1="380" y1="140" x2="380" y2="220" />
        <line x1="460" y1="60" x2="460" y2="140" />
        <line x1="460" y1="140" x2="460" y2="220" />
      </g>
      <g fill="#1FAE58">
        <circle cx="300" cy="60" r="6" />
        <circle cx="380" cy="60" r="6" />
        <circle cx="460" cy="60" r="6" />
        <circle cx="300" cy="140" r="6" />
        <circle cx="380" cy="140" r="7.5" />
        <circle cx="460" cy="140" r="6" />
        <circle cx="300" cy="220" r="6" />
        <circle cx="380" cy="220" r="6" />
        <circle cx="460" cy="220" r="6" />
      </g>

      <rect x="230" y="118" width="22" height="15" rx="4" fill="#CDEBD8" stroke="#6FBF8E" strokeWidth="1.4" transform="rotate(-4 241 125)" />
    </svg>
  );
}

function Case02Diagram() {
  return (
    <svg
      viewBox="0 0 480 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto" }}
      className="w-full h-auto mx-auto block"
      aria-hidden="true"
    >
      <circle cx="240" cy="130" r="150" stroke="#1E3A5F" strokeOpacity="0.04" />
      <circle cx="240" cy="130" r="105" stroke="#1E3A5F" strokeOpacity="0.06" />
      <circle cx="240" cy="130" r="60" stroke="#1E3A5F" strokeOpacity="0.08" />
      <circle cx="200" cy="40" r="3" fill="#2563A8" fillOpacity="0.3" />
      <circle cx="330" cy="230" r="3" fill="#2563A8" fillOpacity="0.3" />
      <circle cx="50" cy="140" r="3" fill="#2563A8" fillOpacity="0.3" />
      <circle cx="430" cy="120" r="3" fill="#2563A8" fillOpacity="0.3" />
      <circle cx="240" cy="130" r="46" fill="#2563A8" />
      <g transform="translate(240,130)" stroke="#ffffff" strokeWidth="2" fill="none" strokeLinejoin="round">
        <rect x="-15" y="-11" width="30" height="20" rx="9" />
        <path d="M-5,9 L3,9 L-2,16 Z" fill="#ffffff" stroke="none" />
      </g>
      <circle cx="90" cy="60" r="26" fill="#ffffff" stroke="#2563A8" strokeWidth="2" />
      <g transform="translate(90,60)" stroke="none" fill="#2563A8">
        <path d="M0,7 C-9,-2 -9,-9 -3,-9 C0,-9 0,-6 0,-6 C0,-6 0,-9 3,-9 C9,-9 9,-2 0,7 Z" />
      </g>
      <circle cx="400" cy="55" r="26" fill="#ffffff" stroke="#2563A8" strokeWidth="2" />
      <g transform="translate(400,55)" stroke="#2563A8" strokeWidth="1.8" fill="none" strokeLinejoin="round">
        <path d="M0,-9 L7,-6 L7,1 C7,6 3,9 0,10 C-3,9 -7,6 -7,1 L-7,-6 Z" />
        <polyline points="-3,0 -1,3 4,-3" strokeWidth="1.6" />
      </g>
      <circle cx="80" cy="205" r="26" fill="#ffffff" stroke="#2563A8" strokeWidth="2" />
      <g transform="translate(80,205)" stroke="#2563A8" strokeWidth="1.8" fill="none" strokeLinecap="round">
        <circle cx="0" cy="-4" r="4" fill="#2563A8" stroke="none" />
        <path d="M-7,9 C-7,2 7,2 7,9 Z" />
      </g>
      <circle cx="405" cy="205" r="26" fill="#ffffff" stroke="#E8A33D" strokeWidth="2" />
      <g transform="translate(405,205)" stroke="#E8A33D" strokeWidth="2" strokeLinecap="round">
        <line x1="-7" y1="-4" x2="7" y2="-4" />
        <line x1="-7" y1="0" x2="7" y2="0" />
        <line x1="-7" y1="4" x2="3" y2="4" />
      </g>
    </svg>
  );
}

function Case03Diagram() {
  return (
    <svg
      viewBox="0 0 480 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto" }}
      className="w-full h-auto mx-auto block"
      aria-hidden="true"
    >
      <circle cx="240" cy="130" r="150" stroke="#8A5A16" strokeOpacity="0.04" />
      <circle cx="240" cy="130" r="105" stroke="#8A5A16" strokeOpacity="0.06" />
      <circle cx="240" cy="130" r="60" stroke="#8A5A16" strokeOpacity="0.08" />
      <circle cx="200" cy="40" r="3" fill="#E0A23E" fillOpacity="0.35" />
      <circle cx="330" cy="230" r="3" fill="#E0A23E" fillOpacity="0.35" />
      <circle cx="50" cy="140" r="3" fill="#E0A23E" fillOpacity="0.35" />
      <circle cx="430" cy="120" r="3" fill="#E0A23E" fillOpacity="0.35" />
      <circle cx="240" cy="130" r="46" fill="#E0A23E" />
      <g transform="translate(240,130)" stroke="#ffffff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="-8,5 0,-8 8,5" />
        <line x1="0" y1="-8" x2="0" y2="10" />
      </g>
      <circle cx="90" cy="60" r="26" fill="#ffffff" stroke="#E0A23E" strokeWidth="2" />
      <g transform="translate(90,60)" stroke="#E0A23E" strokeWidth="1.8" fill="none" strokeLinejoin="round">
        <rect x="-7" y="-1" width="14" height="10" rx="2" />
        <path d="M-4,-1 L-4,-5 C-4,-9 4,-9 4,-5 L4,-1" />
      </g>
      <circle cx="400" cy="55" r="26" fill="#ffffff" stroke="#E0A23E" strokeWidth="2" />
      <g transform="translate(400,55)" stroke="#E0A23E" strokeWidth="1.6" fill="none">
        <rect x="-8" y="-7" width="16" height="15" rx="2" />
        <line x1="-8" y1="-2" x2="8" y2="-2" />
        <line x1="-4" y1="-9" x2="-4" y2="-6" />
        <line x1="4" y1="-9" x2="4" y2="-6" />
      </g>
      <circle cx="80" cy="205" r="26" fill="#ffffff" stroke="#E0A23E" strokeWidth="2" />
      <g transform="translate(80,205)" stroke="none" fill="#E0A23E">
        <path d="M0,7 C-9,-2 -9,-9 -3,-9 C0,-9 0,-6 0,-6 C0,-6 0,-9 3,-9 C9,-9 9,-2 0,7 Z" />
      </g>
      <circle cx="405" cy="205" r="26" fill="#ffffff" stroke="#E0A23E" strokeWidth="2" />
      <g transform="translate(405,205)" stroke="#E0A23E" strokeWidth="1.8" fill="none">
        <circle cx="-4" cy="0" r="6" />
        <circle cx="4" cy="0" r="6" />
      </g>
    </svg>
  );
}

const CASE_HEADER_CONFIGS: Record<
  string,
  {
    gradient: string;
    watermarkColor: string;
  }
> = {
  "01": {
    gradient: "linear-gradient(135deg, #E4F5EA, #CDEBD8)",
    watermarkColor: "text-[#0F3D2E]/[0.10]",
  },
  "02": {
    gradient: "linear-gradient(135deg, #EAF2FB, #D6E6F7)",
    watermarkColor: "text-[#1E3A5F]/[0.10]",
  },
  "03": {
    gradient: "linear-gradient(135deg, #FDF1E0, #FBE4C0)",
    watermarkColor: "text-[#8A5A16]/[0.12]",
  },
};

// Full-bleed hero photo overrides for specific case cards (replaces the abstract
// icon-cluster diagram for that card only). Add an entry here per case as its
// photo treatment is finalized.
const CASE_HEADER_PHOTOS: Record<string, { src: string; alt: string }> = {
  "02": {
    src: "/images/ai-coach-hero.jpg",
    alt: "AI Coach live workout dashboard overlaying real-time heart rate, steps, body composition and nutrition data",
  },
  "03": {
    src: "/images/subscription-hero.jpg",
    alt: "Subscription upgrade paywall screen shown on a phone, held mid-workout, listing premium plan benefits and pricing",
  },
};

function getCaseDiagram(studyNumber: string) {
  switch (studyNumber) {
    case "01":
      return <Case01Diagram />;
    case "02":
      return <Case02Diagram />;
    case "03":
      return <Case03Diagram />;
    default:
      return null;
  }
}

export default function HomePage({
  onNavigate,
  onSelectCaseStudy,
  onOpenResumeModal,
}: HomePageProps) {
  const [hoveredCaseId, setHoveredCaseId] = useState<string | null>(null);
  const statsSectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(statsSectionRef, { once: true, amount: 0.15 });
  const shouldReduceMotion = Boolean(useReducedMotion());

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
    {
      value: "7+ years",
      label: "Product experience",
      detail: "Across India & Europe",
    },
    {
      value: "0→1",
      label: "AI, SaaS & platforms",
      detail: "Concept to production",
    },
    {
      value: "80K+",
      label: "Farmers served",
      detail: "From offline silk trade to a connected platform",
    },
    {
      value: "12K+",
      label: "Paid subscribers",
      detail: "Built the subscription business from 0",
    },
    {
      value: "300 → 3,200+",
      label: "DAU growth",
      detail: "AI Coach adoption since launch",
    },
    {
      value: "15 days → under 2 hrs",
      label: "Farmer payout time",
      detail: "99.9% success, fully automated",
    },
  ];

  return (
    <div className="w-full bg-[#FAFDFB] text-[#042718]">
      {/* =========================================================================
          1. HERO SECTION (CENTERED COMPOSITION INTEGRATED WITH TOP NAVIGATION)
          ========================================================================= */}
      <section className="relative -mt-20 pt-28 pb-16 md:pt-36 md:pb-24 min-h-[calc(100vh)] flex flex-col justify-center items-center overflow-hidden bg-[#FAFDFB]">
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

        {/* Soft gradient fade at bottom to blend smoothly into stats section background */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 md:h-28 bg-gradient-to-b from-transparent via-[#FAF8F5]/60 to-[#FAF8F5] pointer-events-none z-1"
          aria-hidden="true"
        />

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
      <section
        ref={statsSectionRef}
        id="methodology"
        className="py-12 md:py-16 bg-[#FAF8F5] border-b border-[#042718]/8 scroll-mt-24 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 sm:gap-y-8 md:gap-y-0">
            {proofStripMetrics.map((item, idx) => (
              <motion.div
                key={idx}
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : shouldReduceMotion
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 12 }
                }
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : {
                        duration: 0.5,
                        delay: idx * 0.09,
                        ease: [0.16, 1, 0.3, 1],
                      }
                }
                className={`flex flex-col items-start ${
                  idx % 3 !== 0 ? "md:border-l md:border-[#042718]/8 md:pl-8 lg:pl-10" : "md:pr-6 lg:pr-8"
                } ${
                  idx === 1 || idx === 4 ? "md:pr-6 lg:pr-8" : ""
                } ${
                  idx >= 3 ? "md:border-t md:border-[#042718]/8 md:pt-7" : "md:pb-7"
                } ${
                  idx % 2 === 1 ? "sm:max-md:border-l sm:max-md:border-[#042718]/8 sm:max-md:pl-6" : "sm:max-md:pr-6"
                } ${
                  idx >= 2 ? "sm:max-md:border-t sm:max-md:border-[#042718]/8 sm:max-md:pt-5" : "sm:max-md:pb-5"
                } ${
                  idx > 0 ? "max-sm:border-t max-sm:border-[#042718]/8 max-sm:pt-4" : ""
                }`}
              >
                <StatNumberDisplay
                  idx={idx}
                  isInView={isInView}
                  shouldReduceMotion={shouldReduceMotion}
                />

                {/* Thin sage/moss accent line beneath each stat number */}
                <motion.div
                  initial={shouldReduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
                  animate={
                    isInView
                      ? { scaleX: 1 }
                      : shouldReduceMotion
                      ? { scaleX: 1 }
                      : { scaleX: 0 }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : {
                          duration: 0.6,
                          delay: idx * 0.09 + 0.12,
                          ease: [0.16, 1, 0.3, 1],
                        }
                  }
                  style={{ transformOrigin: "left" }}
                  className="h-[1.5px] w-12 sm:w-14 bg-[#6E8864]/40 my-2.5 rounded-full"
                  aria-hidden="true"
                />

                <span className="font-inter text-xs sm:text-[13px] font-semibold text-[#042718]/90 mt-0.5">
                  {item.label}
                </span>
                <span className="font-inter text-[11px] text-[#042718]/50 mt-0.5">
                  {item.detail}
                </span>
              </motion.div>
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

        {/* Flagship Cards Grid: Large featured card for case 01, two smaller cards for 02/03 below */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ALL_FLAGSHIP_CASE_STUDIES.slice(0, 3).map((study, idx) => {
            const isFullWidth = idx === 0; // Feature ReshaMandi as primary anchor
            const headerConfig = CASE_HEADER_CONFIGS[study.number] || {
              gradient: "linear-gradient(135deg, #E4F5EA, #CDEBD8)",
              watermarkColor: "text-[#0F3D2E]/[0.10]",
            };

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
                className={`group cursor-pointer rounded-[24px] bg-white border border-[#042718]/10 overflow-hidden flex flex-col justify-between relative transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:border-[#188E39]/40 hover:shadow-[0_24px_48px_-12px_rgba(4,39,24,0.18)] ${
                  isFullWidth ? "lg:col-span-2 bg-gradient-to-br from-white to-[#F4FAFA]" : ""
                }`}
              >
                {/* Visual Header Area: Case 01 full-bleed photo vs Case 02/03 floating diagram */}
                {isFullWidth ? (
                  <div className="relative w-full h-[320px] sm:h-[360px] overflow-hidden bg-[#0F3D2E]/10 select-none">
                    {/* Full-bleed Photo with subtle zoom on hover */}
                    <img
                      src="/images/reshamandi-lifecycle.jpg"
                      alt="ReshaMandi Sericulture Lifecycle"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-[250ms] ease-out group-hover:scale-[1.04]"
                    />

                    {/* Soft dark-green gradient overlay across bottom third only */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(11, 61, 31, 0.55) 0%, rgba(11, 61, 31, 0) 100%)",
                      }}
                      aria-hidden="true"
                    />

                    {/* The quiet "01" case-number watermark mark: low-opacity, tucked in corner over bright sky */}
                    <span
                      className="absolute top-3 right-4 sm:top-4 sm:right-6 font-onest font-bold text-lg sm:text-xl text-white/45 select-none pointer-events-none tracking-wider drop-shadow-sm"
                      aria-hidden="true"
                    >
                      {study.number}
                    </span>

                    {/* Hover cue: bottom-left "View case study" pill */}
                    <div className="absolute bottom-4 left-5 sm:bottom-6 sm:left-8 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] ease-out pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-[#042718] font-inter text-xs font-semibold shadow-md">
                        <span>View case study</span>
                        <ArrowRight size={13} className="text-[#188E39]" />
                      </span>
                    </div>
                  </div>
                ) : CASE_HEADER_PHOTOS[study.number] ? (
                  <div className="relative w-full h-[260px] sm:h-[300px] overflow-hidden bg-[#0F3D2E]/10 select-none">
                    {/* Full-bleed Photo with subtle zoom on hover */}
                    <img
                      src={CASE_HEADER_PHOTOS[study.number].src}
                      alt={CASE_HEADER_PHOTOS[study.number].alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center transition-transform duration-[250ms] ease-out group-hover:scale-[1.04]"
                    />

                    {/* Soft dark overlay across bottom third only, for numeral legibility */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(4, 39, 24, 0.55) 0%, rgba(4, 39, 24, 0) 100%)",
                      }}
                      aria-hidden="true"
                    />

                    {/* Case-number badge: solid chip so it stays legible over a busy photo */}
                    <span
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 font-onest font-bold text-xs sm:text-sm text-white select-none pointer-events-none tracking-wider bg-[#042718]/60 backdrop-blur-sm rounded-full px-2.5 py-1"
                      aria-hidden="true"
                    >
                      {study.number}
                    </span>

                    {/* Hover cue: bottom-left "View case study" pill */}
                    <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-[250ms] ease-out pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-[#042718] font-inter text-xs font-semibold shadow-md">
                        <span>View case study</span>
                        <ArrowRight size={13} className="text-[#188E39]" />
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    className="relative w-full border-b border-[#042718]/8 flex items-center justify-center overflow-hidden py-8 sm:py-10 md:py-12 px-4 sm:px-6"
                    style={{ background: headerConfig.gradient }}
                  >
                    {/* Large background/watermark numeral in the corner */}
                    <span
                      className={`absolute top-2 right-4 sm:top-3 sm:right-6 font-onest font-black text-6xl sm:text-7xl lg:text-8xl select-none pointer-events-none tracking-tighter leading-none ${headerConfig.watermarkColor}`}
                      aria-hidden="true"
                    >
                      {study.number}
                    </span>

                    {/* Floating White Card containing the colored diagram */}
                    <div className="relative z-1 w-full bg-white rounded-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-white/80 p-5 sm:p-6 transition-shadow duration-200 group-hover:shadow-[0_12px_28px_rgba(0,0,0,0.11)] max-w-[440px]">
                      {getCaseDiagram(study.number)}
                    </div>
                  </div>
                )}

                {/* Card Content: Tightened padding and gaps for Case 01, standard for Case 02/03 */}
                <div
                  className={`flex flex-col justify-between flex-1 ${
                    isFullWidth ? "py-7 sm:py-8 px-6 sm:px-10" : "p-6 sm:p-8"
                  }`}
                >
                  <div>
                    {/* Header row: Category, logo-credit badge, and Strategy notice badge */}
                    <div className={`flex items-center justify-between gap-2 ${isFullWidth ? "mb-2.5" : "mb-4"}`}>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-inter text-xs text-[#042718]/60 font-medium">
                          {study.category}
                        </span>
                        {isFullWidth && (
                          <span className="px-2 py-0.5 rounded text-[11px] font-inter font-semibold bg-[#188E39]/10 text-[#0d5924] border border-[#188E39]/20">
                            at ReshaMandi
                          </span>
                        )}
                      </div>

                      {study.isStrategyOnly && (
                        <span className="px-2.5 py-1 rounded-full bg-[#F3E8FF] text-[#7E22CE] text-[11px] font-inter font-semibold">
                          Development-Ready Strategy
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-onest text-2xl sm:text-3xl font-bold text-[#042718] group-hover:text-[#188E39] transition-colors leading-snug ${
                        isFullWidth ? "mb-2" : "mb-3"
                      }`}
                    >
                      {study.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`font-inter text-sm sm:text-base text-[#042718]/70 leading-relaxed max-w-3xl ${
                        isFullWidth ? "mb-4" : "mb-6"
                      }`}
                    >
                      {study.description}
                    </p>

                    {/* Case 01: OUTCOME METRICS AS THE VISUAL HOOK (Positioned directly below description, above tags) */}
                    {isFullWidth && (
                      <div className="w-full bg-[#F3F8F1] border border-[#188E39]/15 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-4">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-6">
                          <div>
                            <div className="font-onest font-bold text-[28px] sm:text-[32px] leading-none text-[#188E39] tracking-tight">
                              80K+
                            </div>
                            <div className="font-inter text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#042718]/60 mt-1.5">
                              farmers
                            </div>
                          </div>
                          <div className="sm:border-l sm:border-[#188E39]/15 sm:pl-6 max-sm:border-t max-sm:border-[#188E39]/15 max-sm:pt-3">
                            <div className="font-onest font-bold text-[28px] sm:text-[32px] leading-none text-[#188E39] tracking-tight">
                              ₹20–25 Cr/mo
                            </div>
                            <div className="font-inter text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#042718]/60 mt-1.5">
                              disbursement volume
                            </div>
                          </div>
                          <div className="sm:border-l sm:border-[#188E39]/15 sm:pl-6 max-sm:border-t max-sm:border-[#188E39]/15 max-sm:pt-3">
                            <div className="font-onest font-bold text-[28px] sm:text-[32px] leading-none text-[#188E39] tracking-tight">
                              &gt;35%
                            </div>
                            <div className="font-inter text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#042718]/60 mt-1.5">
                              bidding transaction-value uplift
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Restyled Tag Pills */}
                    <div className={`flex flex-wrap gap-2 ${isFullWidth ? "mb-4" : "mb-6"}`}>
                      {study.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md text-xs font-inter font-medium bg-[#188E39]/[0.08] text-[#0d5924] border border-[#188E39]/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Case 01 CTA line vs Case 02/03 Proof Highlights Footer */}
                  {isFullWidth ? (
                    <div className="pt-3 border-t border-[#042718]/8 flex items-center justify-between mt-auto">
                      <span className="font-inter text-xs text-[#042718]/50 hidden sm:inline">
                        Full marketplace architecture &amp; operational systems
                      </span>
                      <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-inter font-semibold text-[#042718] group-hover:text-[#188E39] transition-colors ml-auto">
                        <span>Read case study</span>
                        <ArrowRight
                          size={15}
                          className="group-hover:translate-x-1.5 transition-transform duration-[250ms] ease-out"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="pt-6 border-t border-[#042718]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto">
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
                  )}
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
