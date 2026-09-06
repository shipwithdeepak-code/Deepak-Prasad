"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Cpu,
  TrendingUp,
  Layers,
  Search,
  Scale,
  Zap,
  Lock,
} from "lucide-react";
import { PRODUCT_PRINCIPLES } from "@/data/caseStudies";

export default function WhyChooseUs01Finsyc({ className }: { className?: string }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Marketplaces", "0→1 Strategy", "AI & ML", "Operations"];

  const filteredPrinciples =
    activeCategory === "All"
      ? PRODUCT_PRINCIPLES
      : PRODUCT_PRINCIPLES.filter((p) =>
          p.tags.some((t) => t.toLowerCase().includes(activeCategory.toLowerCase()))
        );

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Onest:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600&display=swap"
        rel="stylesheet"
      />

      <section
        id="principles"
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
              Operating Philosophy
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-[840px] text-center text-[#042718] font-onest text-[34px] sm:text-[46px] lg:text-[56px] font-semibold leading-[1.12] tracking-tight lg:tracking-[-2px] mb-6"
          >
            Operating principles for building{" "}
            <span className="font-playfair italic font-medium text-black/40">high-leverage</span> systems
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-[700px] text-center text-[#042718]/80 font-inter text-base sm:text-lg leading-relaxed mb-10"
          >
            Evidence-driven, human-centered principles honed from ground-level market discovery and high-stakes operations.
          </motion.p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={
                  "px-4 py-1.5 rounded-full font-inter text-xs font-semibold transition-all cursor-pointer " +
                  (activeCategory === cat
                    ? "bg-[#042718] text-white shadow-sm"
                    : "bg-white text-[#042718]/70 border border-[#042718]/10 hover:border-[#042718]/30")
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Principles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {filteredPrinciples.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * idx }}
                className="flex flex-col justify-between p-8 rounded-[28px] bg-white border border-[#042718]/10 shadow-[0_4px_24px_rgba(4,39,24,0.02)] hover:shadow-[0_16px_40px_rgba(4,39,24,0.06)] hover:border-[#188E39]/30 transition-all group"
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-mono text-xs font-bold text-[#188E39] px-2.5 py-0.5 rounded-full bg-[#E4F2EB]">
                      {item.number}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-inter text-[11px] font-medium text-[#042718]/60 px-2 py-0.5 rounded-md bg-[#FAFDFB] border border-[#042718]/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="font-onest text-xl lg:text-[22px] font-bold text-[#042718] tracking-tight leading-snug mb-3 group-hover:text-[#188E39] transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-inter text-sm lg:text-[15px] text-[#042718]/75 leading-relaxed mb-6">
                    {item.principle}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#042718]/10 flex items-start gap-2 text-xs text-[#042718]/70 italic">
                  <span className="font-semibold not-italic text-[#188E39]">Key Takeaway:</span>
                  <span>{item.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
