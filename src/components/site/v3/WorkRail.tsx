import React, { useRef, useState, useEffect, useCallback } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CaseStudyDetail } from "../../../types";
import { RAIL_ENTRIES, WorkFamily } from "../../../data/homeV3";
import WorkCard from "./WorkCard";
import { AllWorkLogo } from "./WorkLogos";

interface WorkRailProps {
  caseStudies: CaseStudyDetail[];
  onNavigate: (path: string) => void;
}

const FILTERS: { label: string; family: WorkFamily | null }[] = [
  { label: "All", family: null },
  { label: "Applied AI", family: "ai" },
  { label: "Marketplace", family: "marketplace" },
  { label: "Growth", family: "growth" },
  { label: "Connected Hardware", family: "hardware" },
];

export default function WorkRail({
  caseStudies,
  onNavigate,
}: WorkRailProps) {
  const [activeFamily, setActiveFamily] = useState<WorkFamily | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setShouldReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Mouse drag state tracking (8px delta distinguishes intentional drags from clicks)
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const hasDragged = useRef(false);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const visibleStudies = caseStudies.filter((cs) => {
    const entry = RAIL_ENTRIES[cs.slug];
    return !activeFamily || entry?.family === activeFamily;
  });

  const checkScrollBounds = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    checkScrollBounds();
    el.addEventListener("scroll", checkScrollBounds, { passive: true });
    window.addEventListener("resize", checkScrollBounds);
    return () => {
      el.removeEventListener("scroll", checkScrollBounds);
      window.removeEventListener("resize", checkScrollBounds);
    };
  }, [checkScrollBounds, visibleStudies.length]);

  const scrollRail = (direction: "prev" | "next") => {
    const el = railRef.current;
    if (!el) return;
    const scrollAmount = direction === "next" ? 390 : -390;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0 || !railRef.current) return;
    isMouseDown.current = true;
    startX.current = e.pageX - railRef.current.offsetLeft;
    startScrollLeft.current = railRef.current.scrollLeft;
    hasDragged.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current || !railRef.current) return;
    const x = e.pageX - railRef.current.offsetLeft;
    const delta = x - startX.current;
    if (Math.abs(delta) > 8) {
      hasDragged.current = true;
      railRef.current.scrollLeft = startScrollLeft.current - delta;
    }
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
    setTimeout(() => {
      hasDragged.current = false;
    }, 60);
  };

  const handleCardClick = (study: CaseStudyDetail) => {
    if (hasDragged.current) return;
    if (study.url && study.url.startsWith("http")) {
      window.open(study.url, "_blank", "noopener,noreferrer");
    } else {
      onNavigate(`/work/${study.slug}`);
    }
  };

  const handleCompleteRecordClick = () => {
    if (hasDragged.current) return;
    onNavigate("/work");
  };

  return (
    <section
      id="selected-work"
      aria-label="Selected Work"
      className="relative bg-[#040506] py-20 md:py-28 overflow-hidden"
    >
      {/* Subtle obsidian atmospheric ambient blur */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[#F0977A]/[0.018] blur-[120px]"
      />

      {/* Section Header & Filter Capsule (aligned to max-w-[1240px]) */}
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="mb-4 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-[62ch]">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#9C9A95]">
              Products shipped
            </p>
            <h2 className="mt-2.5 text-[clamp(1.75rem,3.2vw,2.5rem)] font-normal leading-[1.15] tracking-[-0.015em] text-[#FAF7F0]">
              Eleven things that went live and moved a number.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#9C9A95]">
              Not case studies. Product decisions, launches, marketplace and
              subscription systems, connected hardware and applied AI.
            </p>
          </div>

          {/* Filter Bar Capsule (Contains exclusively the 5 filter options) */}
          <div className="self-start lg:self-end">
            <div
              role="tablist"
              aria-label="Filter products by family"
              className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-white/[0.08] bg-[#111216]/90 p-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md scrollbar-none"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {FILTERS.map((filter) => {
                const isActive = filter.family === activeFamily;
                return (
                  <button
                    key={filter.label}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      if (activeFamily === filter.family) return;
                      setActiveFamily(filter.family);
                      if (railRef.current) {
                        railRef.current.scrollTo({ left: 0, behavior: "smooth" });
                      }
                    }}
                    className={`relative min-h-[34px] rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0977A]/80 ${
                      isActive
                        ? "text-[#0A0B0E]"
                        : "text-[#9C9A95] hover:text-[#FAF7F0]"
                    }`}
                  >
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 -z-10 rounded-full bg-[#FAF7F0] shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-all duration-200"
                      />
                    )}
                    <span className="relative z-10 whitespace-nowrap">
                      {filter.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 
        Continuous Horizontal Card Track:
        Starts aligned with the 1240px container margin on the left,
        and flows smoothly edge-to-edge across the screen on the right.
        Generous py-8 (32px vertical clearance) prevents any card hover lift or focus ring clipping.
      */}
      <div
        ref={railRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        tabIndex={0}
        aria-label="Product Showcase Carousel. Use left/right arrow keys or drag to scroll."
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollRail("next");
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollRail("prev");
          }
        }}
        className="flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto pb-8 pt-8 outline-none select-none scrollbar-none active:cursor-grabbing pl-6 sm:pl-[max(1.5rem,calc((100vw-1240px)/2+1.5rem))] pr-6 sm:pr-[max(1.5rem,calc((100vw-1240px)/2+1.5rem))]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div
          key={activeFamily || "all"}
          className="flex snap-x snap-mandatory gap-5 transition-opacity duration-300 animate-in fade-in motion-reduce:animate-none"
        >
          {visibleStudies.map((study) => (
              <WorkCard
                key={study.slug}
                study={study}
                onSelect={handleCardClick}
              />
            ))}

            {/* 7th Card: "The Complete Record" with matching 5-layer visual continuity */}
            <button
              type="button"
              onClick={handleCompleteRecordClick}
              aria-label="View the complete record of all 11 products"
              className="group relative flex h-[480px] w-[min(340px,calc(100vw-48px))] flex-none cursor-pointer snap-start flex-col justify-between overflow-hidden rounded-[22px] border border-white/[0.08] p-5 text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-white/[0.18] hover:shadow-[0_22px_44px_-12px_rgba(0,0,0,0.75),inset_0_1px_0_0_rgba(255,255,255,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0977A]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040506] motion-reduce:transform-none motion-reduce:transition-none sm:w-[370px]"
              style={{ backgroundColor: "#0E0F14" }}
            >
              {/* Visual Texture: Architecture Grid Pattern */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] opacity-40 transition-opacity duration-500 group-hover:opacity-60"
              />

              {/* Subtle Graphite / Neutral Brand Overlay */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#22242E]/30 via-[#2C2E3A]/20 to-[#121318]/40"
              />

              {/* Dark Readability Gradient */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050608]/85 via-[#050608]/45 to-[#050608]/95"
              />

              {/* Top Header Row & Description */}
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] border border-white/[0.10] bg-white/[0.05] p-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-colors duration-[350ms] group-hover:border-white/[0.20] group-hover:bg-white/[0.10]">
                      <AllWorkLogo />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-[16.5px] font-medium tracking-tight text-[#FAF7F0] transition-colors duration-[300ms] group-hover:text-white">
                        The Complete Record
                      </h3>
                      <p className="truncate font-mono text-[10px] uppercase tracking-[0.08em] text-[#9C9A95]">
                        Archive & Strategy
                      </p>
                    </div>
                  </div>

                  {/* Action Button Affordance */}
                  <div
                    aria-hidden="true"
                    className="flex size-8 shrink-0 items-center justify-center rounded-[10px] border border-white/[0.10] bg-white/[0.05] text-[#9C9A95] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-white/[0.22] group-hover:bg-white/[0.10] group-hover:text-[#FAF7F0] motion-reduce:transform-none"
                  >
                    <ArrowUpRight className="size-4" strokeWidth={1.8} />
                  </div>
                </div>

                <p className="mt-3.5 line-clamp-2 text-[13.5px] leading-relaxed text-[#B0AEA8] transition-colors duration-[300ms] group-hover:text-[#E2DFD8]">
                  Five additional products and systems across B2B hardware, workflow engines, and enterprise platforms.
                </p>
              </div>

              {/* Bottom Grounded Widget Area */}
              <div className="relative z-10 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-[10px] border border-white/[0.08] bg-[#0A0B10]/80 p-2.5 backdrop-blur-sm transition-colors duration-200 group-hover:border-white/[0.14]">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.05em] text-[#9C9A95]">
                      Hardware
                    </span>
                    <span className="text-[12px] font-medium text-[#FAF7F0]">
                      LionCircuits PCB
                    </span>
                  </div>
                  <div className="rounded-[10px] border border-white/[0.08] bg-[#0A0B10]/80 p-2.5 backdrop-blur-sm transition-colors duration-200 group-hover:border-white/[0.14]">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.05em] text-[#9C9A95]">
                      Workflow
                    </span>
                    <span className="text-[12px] font-medium text-[#FAF7F0]">
                      Camunda BPM
                    </span>
                  </div>
                  <div className="rounded-[10px] border border-white/[0.08] bg-[#0A0B10]/80 p-2.5 backdrop-blur-sm transition-colors duration-200 group-hover:border-white/[0.14]">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.05em] text-[#9C9A95]">
                      Compliance
                    </span>
                    <span className="text-[12px] font-medium text-[#FAF7F0]">
                      Digital KYC & Escrow
                    </span>
                  </div>
                  <div className="rounded-[10px] border border-white/[0.08] bg-[#0A0B10]/80 p-2.5 backdrop-blur-sm transition-colors duration-200 group-hover:border-white/[0.14]">
                    <span className="block font-mono text-[9px] uppercase tracking-[0.05em] text-[#9C9A95]">
                      Agritech
                    </span>
                    <span className="text-[12px] font-medium text-[#FAF7F0]">
                      Yarn IoT Quality
                    </span>
                  </div>
                </div>

                {/* Direct Action Button Affordance */}
                <div
                  aria-hidden="true"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[12px] border border-white/[0.12] bg-white/[0.06] py-2.5 text-[13px] font-medium text-[#FAF7F0] shadow-[0_4px_12px_rgba(0,0,0,0.3),inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-[300ms] group-hover:border-white/[0.22] group-hover:bg-white/[0.1] group-hover:text-white"
                >
                  <span>See all 11 products</span>
                  <ArrowUpRight className="size-3.5" strokeWidth={1.8} />
                </div>
              </div>
            </button>
        </div>
      </div>

      {/* Bottom Carousel Controls & Navigation (aligned with max-w-[1240px]) */}
      <div className="mx-auto max-w-[1240px] px-6">
        <div className="flex items-center justify-between border-t border-white/[0.06] pt-6">
          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="group inline-flex items-center gap-2 text-[13.5px] font-medium text-[#9C9A95] transition-colors duration-200 hover:text-[#FAF7F0]"
          >
            <span>Browse all products and systems</span>
            <ArrowUpRight
              className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={2}
              aria-hidden="true"
            />
          </button>

          {/* Left / Right Chevron Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollRail("prev")}
              disabled={!canScrollLeft}
              aria-label="Scroll carousel left"
              className="flex size-9 items-center justify-center rounded-full border border-white/[0.08] bg-[#111216]/80 text-[#9C9A95] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all duration-200 hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-[#FAF7F0] disabled:pointer-events-none disabled:opacity-25"
            >
              <ChevronLeft className="size-4" strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollRail("next")}
              disabled={!canScrollRight}
              aria-label="Scroll carousel right"
              className="flex size-9 items-center justify-center rounded-full border border-white/[0.08] bg-[#111216]/80 text-[#9C9A95] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all duration-200 hover:border-white/[0.16] hover:bg-white/[0.06] hover:text-[#FAF7F0] disabled:pointer-events-none disabled:opacity-25"
            >
              <ChevronRight className="size-4" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
