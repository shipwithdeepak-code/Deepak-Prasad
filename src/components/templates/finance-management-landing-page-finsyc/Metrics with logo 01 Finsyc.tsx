"use client";

import React, { useEffect, useRef } from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { ArrowUpRight, Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";

interface CounterProps {
  value: number;
  suffix: string;
}

function Counter({ value, suffix }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const display = useTransform(spring, (current: number) => {
    // Check if original value was a decimal
    if (value % 1 !== 0) {
      return (current).toFixed(1);
    }
    return Math.floor(current).toString();
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  return (
    <div ref={ref} className="flex items-baseline">
      <motion.span className="text-[#042718] font-onest text-[56px] font-semibold leading-[64px] tracking-[-2px]">
        {display}
      </motion.span>
      <span className="text-[#042718]/40 font-onest text-[56px] font-semibold leading-[64px] tracking-[-2px]">
        {suffix}
      </span>
    </div>
  );
}

interface MetricsProps {
  className?: string;
  onOpenCaseStudy?: (id?: string) => void;
}

export default function MetricsWithLogo01Finsyc({
  className,
  onOpenCaseStudy,
}: MetricsProps) {
  const [isBtnHovered, setIsBtnHovered] = React.useState(false);

  const metrics = [
    {
      value: 99.9,
      suffix: "%",
      title: "Instant Payout Reliability",
      description:
        "Engineered automated weighbridge escrow settlement replacing delayed broker IOUs with zero un-reconciled liquidity loss.",
      icon: ShieldCheck,
      highlight: "Escrow Rails",
    },
    {
      value: 35,
      suffix: "%+",
      title: "Bidding Value Lift",
      description:
        "Introduced dynamic real-time cocoon bidding auctions, creating transparent price discovery for mandi operators.",
      icon: Zap,
      highlight: "Auction Liquidity",
    },
    {
      value: 4,
      suffix: " Tiers",
      title: "Supply Ecosystem Unified",
      description:
        "Connected sericulture farmers, mandi weigh stations, certified reelers, and master weavers onto a single immutable ledger.",
      icon: Layers,
      highlight: "Physical-to-Digital",
    },
  ];

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Onest:wght@400;500;600;700&display=swap"
        rel="stylesheet"
        crossOrigin="anonymous"
      />

      <section
        id="metrics"
        className={"w-full bg-[#FAFDFB] py-16 lg:py-24 flex justify-center " + (className || "")}
      >
        <div className="w-full max-w-[1248px] px-6 lg:px-0 flex flex-col items-center">
          {/* Header Row */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
            <div className="flex flex-col items-start gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E4F2EB] border border-[#188E39]/15">
                <Sparkles className="w-3.5 h-3.5 text-[#188E39]" />
                <span className="font-inter text-xs font-semibold text-[#188E39] uppercase tracking-wider">
                  Measurable PM Impact
                </span>
              </div>

              <h2 className="text-[#042718] font-onest text-[32px] sm:text-[42px] lg:text-[48px] font-semibold leading-[1.15] tracking-[-1.5px] max-w-[620px]">
                Proven results across{" "}
                <i className="text-[rgba(0,0,0,0.40)] font-playfair font-normal">complex systems</i> & operational scales
              </h2>
            </div>

            {/* Action CTA Button */}
            <motion.button
              type="button"
              onClick={() => onOpenCaseStudy && onOpenCaseStudy("reshamandi-b2b")}
              onMouseEnter={() => setIsBtnHovered(true)}
              onMouseLeave={() => setIsBtnHovered(false)}
              className={
                "flex items-center gap-3 py-2 rounded-full border border-[#042718]/15 bg-white shadow-xs group cursor-pointer transition-all duration-300 h-12 " +
                (isBtnHovered ? "flex-row-reverse pl-2 pr-5 bg-[#042718] text-white" : "flex-row pl-5 pr-2 text-[#042718]")
              }
            >
              <span className="font-inter text-sm font-semibold tracking-[-0.3px]">
                Explore Case Study Deep Dive
              </span>

              <div
                className={
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 " +
                  (isBtnHovered ? "bg-white text-[#042718]" : "bg-[#042718] text-white")
                }
              >
                <ArrowUpRight size={16} />
              </div>
            </motion.button>
          </div>

          {/* 3 Metric Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {metrics.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * idx }}
                className="flex flex-col p-8 rounded-[28px] bg-white border border-[#042718]/10 shadow-[0_4px_24px_rgba(4,39,24,0.03)] hover:shadow-[0_12px_40px_rgba(4,39,24,0.08)] transition-all group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#E4F2EB] flex items-center justify-center text-[#188E39]">
                    <m.icon size={20} />
                  </div>
                  <span className="font-inter text-[11px] font-bold uppercase tracking-wider text-[#188E39] px-2.5 py-1 rounded-full bg-[#E4F2EB]/60 border border-[#188E39]/10">
                    {m.highlight}
                  </span>
                </div>

                <Counter value={m.value} suffix={m.suffix} />

                <h3 className="mt-3 text-[#042718] font-onest text-xl font-bold tracking-tight">
                  {m.title}
                </h3>

                <p className="mt-2 text-[#042718]/70 font-inter text-sm leading-relaxed">
                  {m.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
