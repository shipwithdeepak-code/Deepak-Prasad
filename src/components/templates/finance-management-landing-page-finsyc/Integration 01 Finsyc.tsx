"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Star, Sparkles, Cpu, Layers, Database, Activity, Code2, Terminal } from "lucide-react";

interface IntegrationItem {
  id: string;
  name: string;
  description: string;
  category: string;
  iconBg: string;
}

const leftIntegrations: IntegrationItem[] = [
  {
    id: "sql",
    name: "SQL & BigQuery",
    description: "Funnel modeling & cohort analysis",
    category: "Analytics",
    iconBg: "bg-[#00758F]/10 text-[#00758F]",
  },
  {
    id: "mixpanel",
    name: "Mixpanel & Amplitude",
    description: "Behavioral telemetry & loops",
    category: "Telemetry",
    iconBg: "bg-[#7856FF]/10 text-[#7856FF]",
  },
  {
    id: "figma",
    name: "Figma & Design Systems",
    description: "Interactive UX & design tokens",
    category: "Design",
    iconBg: "bg-[#F24E1E]/10 text-[#F24E1E]",
  },
  {
    id: "linear",
    name: "Linear & Jira",
    description: "High-velocity execution & PRDs",
    category: "Execution",
    iconBg: "bg-[#5E6AD2]/10 text-[#5E6AD2]",
  },
];

const rightIntegrations: IntegrationItem[] = [
  {
    id: "gemini",
    name: "OpenAI & Gemini AI",
    description: "AI workflow orchestration & prompts",
    category: "AI & ML",
    iconBg: "bg-[#188E39]/10 text-[#188E39]",
  },
  {
    id: "python",
    name: "Python & Pandas",
    description: "Data modeling & hypothesis testing",
    category: "Data Science",
    iconBg: "bg-[#3776AB]/10 text-[#3776AB]",
  },
  {
    id: "segment",
    name: "Segment & CDP",
    description: "Clean customer data pipelines",
    category: "Data Rails",
    iconBg: "bg-[#52BD95]/10 text-[#52BD95]",
  },
  {
    id: "payments",
    name: "Stripe & UPI Rails",
    description: "Escrow & payout reconciliation",
    category: "Fintech",
    iconBg: "bg-[#635BFF]/10 text-[#635BFF]",
  },
];

const topValues: Record<number, string> = { 0: "0px", 1: "96px", 2: "192px", 3: "288px" };

export default function Integration01Finsyc({ className }: { className?: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
      setWindowWidth(window.innerWidth);
    }, 0);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isLargeScreen = isMounted && windowWidth >= 1024;

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Onest:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600&display=swap"
        rel="stylesheet"
        crossOrigin="anonymous"
      />

      <section
        id="stack"
        className={"w-full bg-[#FAFDFB] py-20 lg:py-32 overflow-hidden relative flex justify-center border-t border-[#042718]/5 " + (className || "")}
      >
        <div className="w-full max-w-[1440px] px-6 lg:px-[96px]">
          <div className="w-full max-w-[1248px] mx-auto">
            {/* Header Content */}
            <div className="flex flex-col items-center text-center mb-12 md:mb-[80px]">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4F2EB] border border-[#188E39]/15 mb-6"
              >
                <Sparkles className="w-4 h-4 text-[#188E39]" />
                <span className="text-[#188E39] text-[13px] font-inter font-bold uppercase tracking-wider">
                  Product Craft & Stack
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-[34px] sm:text-[44px] md:text-[54px] font-onest font-semibold text-[#042619] leading-[1.12] tracking-tight md:tracking-[-2px] mb-6 max-w-3xl text-center"
              >
                Modern tools for rigorous{" "}
                <span className="font-playfair italic font-medium text-black/40">discovery, telemetry & execution</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[15px] md:text-[18px] text-[#042619]/80 leading-relaxed max-w-[640px] font-inter font-normal text-center"
              >
                Deepak blends deep analytical querying, behavioral telemetry, AI prompt engineering, and operational system design to ship with certainty.
              </motion.p>
            </div>

            {/* Integration Visualization */}
            <div className="relative w-full max-w-[1240px] mx-auto min-h-[400px] lg:h-[368px] flex items-center justify-center">
              {/* Desktop Only SVG Visualization */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
                viewBox="0 0 1240 368"
              >
                <defs>
                  <linearGradient id="line-gradient-left" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#188E39" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#188E39" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="line-gradient-right" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#188E39" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#188E39" stopOpacity="0.5" />
                  </linearGradient>
                </defs>

                {/* Left Connection Paths */}
                {[225, 195, 165, 135].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const startX = 620 + 84 * Math.cos(rad);
                  const startY = 184 + 84 * Math.sin(rad);
                  const cardY = [40, 136, 232, 328][i];
                  const dPath = "M " + startX + " " + startY + " Q " + (startX - 150) + " " + startY + " 280 " + cardY;
                  return (
                    <React.Fragment key={"path-left-" + i}>
                      <path
                        d={dPath}
                        stroke="url(#line-gradient-left)"
                        fill="none"
                        strokeWidth="1.8"
                        strokeDasharray="4 4"
                        opacity="0.9"
                      />
                      <motion.circle r="3.5" fill="#188E39">
                        <animateMotion
                          dur="3.5s"
                          repeatCount="indefinite"
                          path={dPath}
                          begin={i * 0.4 + "s"}
                        />
                      </motion.circle>
                    </React.Fragment>
                  );
                })}

                {/* Right Connection Paths */}
                {[-45, -15, 15, 45].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const startX = 620 + 84 * Math.cos(rad);
                  const startY = 184 + 84 * Math.sin(rad);
                  const cardY = [40, 136, 232, 328][i];
                  const dPath = "M " + startX + " " + startY + " Q " + (startX + 150) + " " + startY + " 960 " + cardY;
                  return (
                    <React.Fragment key={"path-right-" + i}>
                      <path
                        d={dPath}
                        stroke="url(#line-gradient-right)"
                        fill="none"
                        strokeWidth="1.8"
                        strokeDasharray="4 4"
                        opacity="0.9"
                      />
                      <motion.circle r="3.5" fill="#188E39">
                        <animateMotion
                          dur="3.5s"
                          repeatCount="indefinite"
                          path={dPath}
                          begin={(i * 0.4 + 0.2) + "s"}
                        />
                      </motion.circle>
                    </React.Fragment>
                  );
                })}

                {/* Static Connection Dots at Seal */}
                {[225, 195, 165, 135, -45, -15, 15, 45].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  return (
                    <motion.circle
                      key={"seal-dot-" + i}
                      cx={620 + 84 * Math.cos(rad)}
                      cy={184 + 84 * Math.sin(rad)}
                      r="4"
                      fill="#188E39"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2.5, repeat: Infinity as number, delay: i * 0.2 }}
                    />
                  );
                })}
              </svg>

              {/* Visualization Container */}
              <div className="w-full flex flex-col lg:block relative z-10 lg:h-full">
                {/* Left column items */}
                <div className="flex flex-wrap lg:grid justify-center gap-4 lg:absolute lg:left-0 lg:top-0 lg:h-full lg:w-[280px] mb-8 lg:mb-0">
                  {leftIntegrations.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
                      viewport={{ once: true }}
                      className={
                        "w-[260px] sm:w-[280px] h-[76px] lg:h-[80px] bg-white rounded-[20px] p-3.5 lg:p-4 flex items-center gap-3.5 shadow-[0_4px_20px_rgba(4,39,24,0.02)] group hover:shadow-[0_12px_40px_rgba(4,39,24,0.06)] transition-all cursor-default border border-[#042619]/10 lg:absolute"
                      }
                      style={{ top: isLargeScreen ? topValues[idx] : undefined }}
                    >
                      <div className={"w-10 h-10 rounded-xl flex items-center justify-center shrink-0 " + item.iconBg}>
                        <Activity size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#042619] font-onest font-bold text-[14px] lg:text-[15px] leading-tight">
                          {item.name}
                        </span>
                        <span className="text-[#042619]/60 text-[11px] lg:text-[12px] font-inter mt-0.5">
                          {item.description}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Center Seal */}
                <div className="flex items-center justify-center py-8 lg:py-0 lg:absolute lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
                  <div className="relative w-[110px] lg:w-[130px] h-[110px] lg:h-[130px] flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                      transition={{ duration: 4, repeat: Infinity as number, ease: "easeInOut" as const }}
                      className="absolute inset-0 -m-8 lg:-m-[58px] rounded-full bg-[#E5F2EB]/60 shadow-[inset_0_0_40px_rgba(24,142,57,0.05)]"
                    />
                    <div className="absolute inset-0 -m-4 lg:-m-[32px] rounded-full bg-white/40 backdrop-blur-[1px]" />

                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: "spring" as const, stiffness: 260, damping: 22 }}
                      viewport={{ once: true }}
                      className="w-full h-full rounded-full bg-[#042718] shadow-[0_12px_48px_rgba(24,142,57,0.2)] flex flex-col items-center justify-center relative z-10 text-white"
                    >
                      <span className="font-onest font-black text-2xl tracking-tight">DP</span>
                      <span className="font-inter text-[9px] font-bold text-[#34D399] uppercase tracking-wider">
                        Product Hub
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Right column items */}
                <div className="flex flex-wrap lg:grid justify-center gap-4 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-[280px] mt-8 lg:mt-0">
                  {rightIntegrations.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
                      viewport={{ once: true }}
                      className={
                        "w-[260px] sm:w-[280px] h-[76px] lg:h-[80px] bg-white rounded-[20px] p-3.5 lg:p-4 flex items-center gap-3.5 shadow-[0_4px_20px_rgba(4,39,24,0.02)] group hover:shadow-[0_12px_40px_rgba(4,39,24,0.06)] transition-all cursor-default border border-[#042619]/10 lg:absolute"
                      }
                      style={{ top: isLargeScreen ? topValues[idx] : undefined }}
                    >
                      <div className={"w-10 h-10 rounded-xl flex items-center justify-center shrink-0 " + item.iconBg}>
                        <Code2 size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[#042619] font-onest font-bold text-[14px] lg:text-[15px] leading-tight">
                          {item.name}
                        </span>
                        <span className="text-[#042619]/60 text-[11px] lg:text-[12px] font-inter mt-0.5">
                          {item.description}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Info */}
            <div className="flex flex-col items-center mt-12 md:mt-[80px] gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#188E39]/15 bg-white/70 shadow-xs"
              >
                <ShieldCheck className="w-5 h-5 text-[#188E39]" />
                <p className="text-[13px] md:text-[14px] font-inter text-[#042619]/80">
                  <span className="text-[#188E39] font-bold">End-to-End Ownership:</span>{" "}
                  From whiteboard discovery to telemetry instrumentation and post-launch A/B tests.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
