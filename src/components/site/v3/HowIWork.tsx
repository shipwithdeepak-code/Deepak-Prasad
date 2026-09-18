import React, { useState, useEffect } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, X, Check } from "lucide-react";

interface PrincipleNote {
  id: string;
  number: string;
  title: string;
  supportingThought: string;
  annotation: string;
  category: string;
  whyItMatters: string;
  howIApplyIt: string[];
  whatItPrevents: string;
  example: string;
  paper: {
    bg: string;
    border: string;
    textColor: string;
    subtextColor: string;
    accentColor: string;
    rotation: string;
    pin: {
      type: "pin" | "tape-and-pin";
      color: string;
      highlight: string;
    };
  };
  // Desktop layout coords on 1280x1020 board
  desktop: {
    left: number;
    top: number;
    width: number;
    height: number;
    // Connector landing point on the note
    attachX: number;
    attachY: number;
    // Connector origin from center box
    originX: number;
    originY: number;
    // Control point for smooth organic curve
    controlX: number;
    controlY: number;
  };
}

const PRINCIPLES: PrincipleNote[] = [
  {
    id: "note-01",
    number: "01",
    title: "Start with the real problem.",
    supportingThought: "Evidence before assumptions.",
    annotation: "Ask what is actually happening before deciding what to build.",
    category: "EVIDENCE & DISCOVERY",
    whyItMatters:
      "Customer interviews, field research, behavioral signals, and operational realities always precede specification. Building an elegant solution to the wrong problem is the single most expensive mistake in product.",
    howIApplyIt: [
      "Map the existing offline or informal workflow before proposing software",
      "Spend hours directly with ground operators, not just dashboard aggregates",
      "Identify the true economic cost and human friction of the bottleneck",
      "Define the atomic, smallest test to validate user adoption early",
    ],
    whatItPrevents: "Building an elegant, polished solution to the wrong problem.",
    example:
      "4:30 AM mandi immersions in Karnataka revealed that weighbridge delays bred farmer distrust; automated instant payouts resolved supplier retention far more than marketing subsidies.",
    paper: {
      bg: "#EDE6D6",
      border: "#DDD2BF",
      textColor: "#1A1814",
      subtextColor: "#4E483F",
      accentColor: "#8C4A3A",
      rotation: "-rotate-[2.8deg]",
      pin: {
        type: "tape-and-pin",
        color: "#FAF7EE",
        highlight: "#FFFFFF",
      },
    },
    desktop: {
      left: 55,
      top: 75,
      width: 295,
      height: 250,
      attachX: 350,
      attachY: 230,
      originX: 430,
      originY: 410,
      controlX: 370,
      controlY: 330,
    },
  },
  {
    id: "note-02",
    number: "02",
    title: "Make complexity usable.",
    supportingThought: "Turn complicated systems into usable products.",
    annotation: "Reduce the cognitive load. Keep the power.",
    category: "SYSTEMS & WORKFLOWS",
    whyItMatters:
      "Enterprise systems, multi-tiered supply chains, and connected hardware involve dense constraints. Great product craftsmanship does not remove power; it removes unnecessary cognitive drag so humans can operate with speed, trust, and certainty.",
    howIApplyIt: [
      "Map the end-to-end operational workflow step-by-step with edge cases",
      "Strip redundant approval handoffs, manual cross-checks, and paper steps",
      "Make hidden system state, errors, and dependencies immediately visible",
      "Design specifically for the operator under real ground pressure and bad wifi",
    ],
    whatItPrevents: "Adding unnecessary UI complexity in the name of sophistication.",
    example:
      "Transformed manual multi-day WhatsApp dispatch approvals into an automated 3-tap weighbridge flow, handling ₹25 Cr/mo with zero training friction.",
    paper: {
      bg: "#E88D77",
      border: "#D47761",
      textColor: "#1C0D0A",
      subtextColor: "#4A2017",
      accentColor: "#1C0D0A",
      rotation: "rotate-[2.2deg]",
      pin: {
        type: "pin",
        color: "#DE432B",
        highlight: "#FFA899",
      },
    },
    desktop: {
      left: 930,
      top: 85,
      width: 295,
      height: 250,
      attachX: 930,
      attachY: 235,
      originX: 850,
      originY: 410,
      controlX: 910,
      controlY: 330,
    },
  },
  {
    id: "note-03",
    number: "03",
    title: "Build toward the smallest useful system.",
    supportingThought: "Start small. Create a path to scale.",
    annotation: "Find the smallest version that proves the direction.",
    category: "0→1 & SCALE",
    whyItMatters:
      "The fastest way to kill an early product is premature scale. We isolate the atomic value exchange, validate user behavior with real usage, and earn the right to build deeper software layer by layer.",
    howIApplyIt: [
      "Define the atomic valuable release that solves one concrete acute pain point",
      "Ruthlessly separate must-have essentials from later optimizations",
      "Make trade-offs explicit and documented across engineering and design pods",
      "Verify repeatable adoption and retention signals before expanding platform code",
    ],
    whatItPrevents: "Overbuilding platform architecture before the product has earned PMF.",
    example:
      "Launched ReshaFarms advisory as a simple localized WhatsApp pilot before investing in an automated 80,000-farmer smartphone companion app.",
    paper: {
      bg: "#A5C4A9",
      border: "#8EB093",
      textColor: "#101D13",
      subtextColor: "#2B4530",
      accentColor: "#101D13",
      rotation: "-rotate-[2deg]",
      pin: {
        type: "pin",
        color: "#5B8760",
        highlight: "#BDE2C2",
      },
    },
    desktop: {
      left: 940,
      top: 385,
      width: 295,
      height: 250,
      attachX: 940,
      attachY: 500,
      originX: 860,
      originY: 490,
      controlX: 900,
      controlY: 500,
    },
  },
  {
    id: "note-04",
    number: "04",
    title: "Measure what changed.",
    supportingThought: "Decide from signals, not assumptions.",
    annotation: "Shipping is not the finish line. Learning is.",
    category: "SIGNALS & IMPACT",
    whyItMatters:
      "Shipping activity is not product impact. We combine quantitative cohort metrics (retention, adoption, SLA uptime, repeat transactions) with direct customer feedback to determine what to iterate, kill, or double down on.",
    howIApplyIt: [
      "Define expected behavioral shifts and measurable success metrics upfront",
      "Track leading adoption and survival indicators rather than vanity volume",
      "Triangulate telemetry funnels with live customer conversation logs",
      "Conduct rigorous post-launch retrospectives to update future product bets",
    ],
    whatItPrevents: "Confusing sprint velocity and feature volume with real product impact.",
    example:
      "Tracked day-30 cohort survival across premium fitness subscribers to isolate paywall fatigue versus workout adherence drop-offs.",
    paper: {
      bg: "#97C2C1",
      border: "#80AFA7",
      textColor: "#0E1C1C",
      subtextColor: "#274848",
      accentColor: "#0E1C1C",
      rotation: "rotate-[2.5deg]",
      pin: {
        type: "pin",
        color: "#388C8B",
        highlight: "#A7EAEA",
      },
    },
    desktop: {
      left: 45,
      top: 385,
      width: 295,
      height: 250,
      attachX: 340,
      attachY: 500,
      originX: 420,
      originY: 490,
      controlX: 380,
      controlY: 500,
    },
  },
  {
    id: "note-05",
    number: "05",
    title: "Use technology where it creates leverage.",
    supportingThought: "Technology should change the economics or experience.",
    annotation: "Use AI and automation only when they create real leverage.",
    category: "AI & LEVERAGE",
    whyItMatters:
      "Technology is an operational lever, not an aesthetic ornament. When deploying AI, agentic workflows, or computer vision, it must measurably reduce unit costs, eliminate latency, or unlock capabilities humans cannot perform alone.",
    howIApplyIt: [
      "Isolate the exact human or operational bottleneck in the value chain",
      "Validate whether automation actually eliminates the constraint reliably",
      "Implement rigorous evaluation benchmarks, edge-case tests, and guardrails",
      "Ensure the human operator maintains intuitive oversight, control, and trust",
    ],
    whatItPrevents: "Adding AI or automation without a clear, defensible product thesis.",
    example:
      "Designed CV cocoon grading at silk mandis to eliminate human broker bias, settling objective pricing in 30 seconds with 94%+ grading accuracy.",
    paper: {
      bg: "#E28277",
      border: "#CE6D63",
      textColor: "#1A0D0A",
      subtextColor: "#4E211A",
      accentColor: "#1A0D0A",
      rotation: "-rotate-[1.6deg]",
      pin: {
        type: "pin",
        color: "#C7382B",
        highlight: "#FFAFA8",
      },
    },
    desktop: {
      left: 175,
      top: 720,
      width: 295,
      height: 250,
      attachX: 360,
      attachY: 720,
      originX: 470,
      originY: 610,
      controlX: 400,
      controlY: 665,
    },
  },
  {
    id: "note-06",
    number: "06",
    title: "Stay close to people and the business.",
    supportingThought: "Useful products work across the whole system.",
    annotation: "Make the trade-offs visible. Make the why defensible.",
    category: "DECISIONS & ALIGNMENT",
    whyItMatters:
      "A product is only durable when it balances customer pain, engineering feasibility, and business economics. Documenting the why and making trade-offs explicit turns distributed cross-functional pods into autonomous owners.",
    howIApplyIt: [
      "Anchor roadmaps in customer problems rather than internal feature wishlists",
      "Make commercial and operational constraints transparent to engineering",
      "Connect every sprint deliverable directly to high-level strategic outcomes",
      "Design for the complete operating system, not just one isolated screen",
    ],
    whatItPrevents: "Optimising one part of the product while damaging the wider system.",
    example:
      "Aligned distributed product, data science, and hardware firmware pods across Bangalore, London, and Berlin through transparent 1-page decision logs.",
    paper: {
      bg: "#DBD4C5",
      border: "#C6BEAC",
      textColor: "#1C1914",
      subtextColor: "#4E473D",
      accentColor: "#1C1914",
      rotation: "rotate-[2deg]",
      pin: {
        type: "pin",
        color: "#2C2B29",
        highlight: "#8E8C88",
      },
    },
    desktop: {
      left: 805,
      top: 720,
      width: 295,
      height: 250,
      attachX: 910,
      attachY: 720,
      originX: 810,
      originY: 610,
      controlX: 880,
      controlY: 665,
    },
  },
];

/**
 * Realistic Physical Pin or Tape Attachment
 */
function PinAttachment({
  type,
  color,
  highlight,
}: {
  type: "pin" | "tape-and-pin";
  color: string;
  highlight: string;
}) {
  return (
    <div
      className="pointer-events-none absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center select-none"
      aria-hidden="true"
    >
      {/* Translucent Masking Tape with textured fibrous edges */}
      {type === "tape-and-pin" && (
        <div
          className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4.5 bg-[#FFF9EA]/45 backdrop-blur-[0.5px] border-y border-white/30 shadow-[0_1px_3px_rgba(0,0,0,0.4)] -rotate-3 rounded-[1px]"
          style={{
            backgroundImage:
              "linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)",
            backgroundSize: "6px 6px",
          }}
        />
      )}

      {/* Spherical metallic thumbtack with specular highlight */}
      <div
        className="relative size-3.5 sm:size-4 rounded-full shadow-[0_3px_6px_rgba(0,0,0,0.85),0_1px_2px_rgba(0,0,0,0.95)] transition-transform duration-200"
        style={{
          background: `radial-gradient(circle at 35% 28%, ${highlight} 0%, ${color} 65%, #0A0A0B 100%)`,
        }}
      >
        <span
          className="absolute left-1 top-0.5 size-1 rounded-full bg-white/80 blur-[0.25px]"
          aria-hidden="true"
        />
      </div>

      {/* Pin shaft contact depression shadow on paper */}
      <div className="-mt-0.5 h-1 w-2.5 rounded-full bg-black/60 blur-[0.6px]" />
    </div>
  );
}

/**
 * Editorial Working Wall - How I Work
 */
export default function HowIWork() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activeIndex = PRINCIPLES.findIndex((p) => p.id === activeId);
  const activeNote = activeIndex >= 0 ? PRINCIPLES[activeIndex] : null;

  // Keyboard navigation & Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeId !== null) {
        setActiveId(null);
      } else if (e.key === "ArrowLeft" && activeId !== null) {
        handlePrev();
      } else if (e.key === "ArrowRight" && activeId !== null) {
        handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeId, activeIndex]);

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveId(PRINCIPLES[activeIndex - 1].id);
    } else {
      setActiveId(PRINCIPLES[PRINCIPLES.length - 1].id);
    }
  };

  const handleNext = () => {
    if (activeIndex >= 0 && activeIndex < PRINCIPLES.length - 1) {
      setActiveId(PRINCIPLES[activeIndex + 1].id);
    } else {
      setActiveId(PRINCIPLES[0].id);
    }
  };

  return (
    <section
      id="principles"
      aria-label="How I Work - Six Principles"
      className="relative overflow-hidden bg-[#07080A] pt-20 pb-28 md:pt-28 md:pb-36 lg:pb-44 select-none"
      style={{
        // Subtle dark studio graph paper grid
        backgroundImage: `
          radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to right, rgba(255, 255, 255, 0.018) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.018) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px, 64px 64px, 64px 64px",
      }}
    >
      {/* Ambient atmospheric lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-0 -z-10 h-[580px] w-[640px] rounded-full bg-[#F0977A]/[0.024] blur-[150px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-0 -z-10 h-[520px] w-[580px] rounded-full bg-[#7DA89B]/[0.02] blur-[150px]"
      />

      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-10">
        {/* TOP EDITORIAL MASTHEAD ROW */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-4">
          <div className="flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[#9E9E98]">
            <span className="size-2 rounded-full bg-[#F0977A]" aria-hidden="true" />
            <span>A WORKING WALL</span>
            <span className="text-white/20">·</span>
            <span>6 PRINCIPLES</span>
            <span className="hidden md:inline text-white/20">·</span>
            <span className="hidden md:inline">
              BUILT THROUGH MARKETPLACES, SUBSCRIPTIONS, HARDWARE AND AI
            </span>
          </div>

          <div className="font-mono text-[11px] tracking-wider text-[#9E9E98] flex items-center gap-2">
            <span>Click any note to explore the full principle</span>
            <span className="text-[#F0977A]">↗</span>
          </div>
        </div>

        {/* =========================================================================
            DESKTOP WORKING WALL COMPOSITION (Centered thesis + Surrounding Notes)
            Canvas Size: 1280px wide x 1020px tall
            ========================================================================= */}
        <div className="relative min-h-[1020px] hidden lg:block mx-auto max-w-[1280px]">
          {/* =======================================================================
              CONNECTOR SYSTEM: Guaranteed pixel-perfect lines from center to notes
              Sitting behind the sticky notes, above the grid
              ======================================================================= */}
          <svg
            className="pointer-events-none absolute inset-0 w-full h-[1020px] z-0 overflow-visible"
            viewBox="0 0 1280 1020"
            fill="none"
            aria-hidden="true"
          >
            {PRINCIPLES.map((note) => {
              const isHighlight = activeId === note.id || hoveredId === note.id;
              const isFaded = (activeId !== null || hoveredId !== null) && !isHighlight;
              const d = `M ${note.desktop.originX},${note.desktop.originY} Q ${note.desktop.controlX},${note.desktop.controlY} ${note.desktop.attachX},${note.desktop.attachY}`;

              return (
                <g key={`connector-${note.id}`} className="transition-all duration-300">
                  {/* Subtle glow when active/hovered */}
                  {isHighlight && (
                    <path
                      d={d}
                      stroke="#F0977A"
                      strokeWidth="4"
                      strokeOpacity="0.3"
                      strokeLinecap="round"
                    />
                  )}
                  {/* Main Connector Path */}
                  <path
                    d={d}
                    stroke={isHighlight ? "#F0977A" : "#FAF7F0"}
                    strokeWidth={isHighlight ? "2" : "1.2"}
                    strokeOpacity={isHighlight ? "0.95" : isFaded ? "0.15" : "0.38"}
                    strokeDasharray="4 4"
                    strokeLinecap="round"
                  />
                  {/* Endpoint Marker directly touching the note boundary */}
                  <circle
                    cx={note.desktop.attachX}
                    cy={note.desktop.attachY}
                    r={isHighlight ? 3.5 : 2.5}
                    fill={isHighlight ? "#F0977A" : "#FAF7F0"}
                    fillOpacity={isHighlight ? 1 : isFaded ? 0.2 : 0.6}
                  />
                </g>
              );
            })}
          </svg>

          {/* =======================================================================
              UPPER-MIDDLE HANDWRITTEN STATEMENT (Filling the empty space intentionally)
              ======================================================================= */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-[135px] z-0 text-center select-none font-['Caveat',cursive] text-[#FAF7F0]/65 pointer-events-none"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            <p className="text-[21px] xl:text-[22px] leading-tight -rotate-1 tracking-wide">
              Better problems.
              <br />
              Better products.
              <br />
              <span className="text-[#F0977A]/90">More useful systems.</span>
            </p>
            <div className="w-24 h-0.5 mx-auto mt-1.5 border-b border-white/20" />
          </div>

          {/* =======================================================================
              CENTER STATEMENT: Protected safe zone in the middle of the wall
              Left: 420px, Top: 370px, Width: 440px
              ======================================================================= */}
          <div
            className="absolute left-[420px] top-[370px] w-[440px] text-center z-10 select-text pointer-events-auto"
            style={{ minHeight: "260px" }}
          >
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F0977A]">
              HOW I WORK
            </span>

            <h2 className="mt-3 text-[34px] xl:text-[37px] font-normal leading-[1.14] tracking-tight text-[#FAF7F0]">
              Six principles I keep coming back{" "}
              <span className="relative inline-block">
                to.
                {/* Chalk-like hand-drawn underline */}
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#F0977A] overflow-visible"
                  viewBox="0 0 100 8"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 2,5 Q 50,7 98,4 Q 60,3 15,6"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            <p className="mt-4 text-[14px] leading-relaxed text-[#9E9E98] max-w-[390px] mx-auto">
              Not a framework I downloaded. A working set of rules shaped by shipping real products.
            </p>

            <p
              className="mt-3 text-[17px] text-[#FAF7F0]/70 italic font-['Caveat',cursive]"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              “Things I write down before I ship.”
            </p>
          </div>

          {/* =======================================================================
              HANDWRITTEN CHALK ANNOTATIONS IN SAFE VISIBLE NEGATIVE SPACES
              ======================================================================= */}

          {/* Upper-Left: Don't fall in love with the solution */}
          <div
            className="absolute left-10 top-2 z-0 text-[#FAF7F0]/65 select-none font-['Caveat',cursive]"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            <p className="text-[20px] leading-tight -rotate-4">
              Don't fall
              <br />
              in love with
              <br />
              the solution.
            </p>
            <svg
              className="w-10 h-8 mt-1 ml-4 text-[#FAF7F0]/40"
              viewBox="0 0 50 40"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 5,5 C 20,20 30,25 45,30"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path d="M 37,25 L 46,31 L 40,36" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Upper-Right: Complex ≠ Complicated + Venn diagram (fully visible, inside border) */}
          <div
            className="absolute right-8 top-2 z-0 text-[#FAF7F0]/65 select-none font-['Caveat',cursive]"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            <div className="flex items-center gap-5">
              <div className="text-center">
                <p className="text-[19px] leading-none -rotate-2">
                  Complex
                  <br />
                  <span className="text-[15px] text-[#F0977A]">≠</span>
                  <br />
                  Complicated.
                </p>
                <div className="w-10 h-0.5 mx-auto mt-1 border-b border-[#FAF7F0]/40" />
              </div>

              {/* Venn diagram: People / Product / Business */}
              <div className="relative size-20">
                <svg className="size-full opacity-50 text-[#FAF7F0]" viewBox="0 0 100 100" fill="none">
                  <circle cx="40" cy="40" r="26" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="65" cy="40" r="26" stroke="currentColor" strokeWidth="1.2" />
                  <circle cx="52" cy="65" r="26" stroke="currentColor" strokeWidth="1.2" />
                  <text x="25" y="32" fontSize="9" fill="currentColor" fontFamily="'Caveat', cursive">
                    People
                  </text>
                  <text x="66" y="32" fontSize="9" fill="currentColor" fontFamily="'Caveat', cursive">
                    Product
                  </text>
                  <text x="36" y="80" fontSize="9" fill="currentColor" fontFamily="'Caveat', cursive">
                    Business
                  </text>
                </svg>
                <p className="text-[12px] text-right mt-0.5 text-[#FAF7F0]/75">
                  Better products live here ↗
                </p>
              </div>
            </div>
          </div>

          {/* Middle-Left: Adoption? Retention? Real impact? */}
          <div
            className="absolute left-10 top-[650px] z-0 text-[#FAF7F0]/65 select-none font-['Caveat',cursive]"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            <div className="flex items-end gap-1.5 h-8 mb-1 pl-1">
              <div className="w-2 h-4 border border-[#FAF7F0]/40 bg-white/10" />
              <div className="w-2 h-6 border border-[#FAF7F0]/40 bg-white/10" />
              <div className="w-2 h-8 border border-[#FAF7F0]/50 bg-[#F0977A]/20" />
            </div>
            <p className="text-[18px] leading-tight -rotate-2">
              Adoption?
              <br />
              Retention?
              <br />
              <span className="text-[#F0977A]">Real impact?</span>
            </p>
          </div>

          {/* Middle-Right: Small steps compound */}
          <div
            className="absolute right-10 top-[650px] z-0 text-[#FAF7F0]/65 select-none font-['Caveat',cursive]"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            <p className="text-[19px] leading-tight rotate-2">
              Small steps
              <br />
              compound.
            </p>
            <svg
              className="w-8 h-6 mt-1 text-[#FAF7F0]/40"
              viewBox="0 0 40 30"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 35,5 C 25,18 15,20 5,22"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path d="M 12,17 L 4,23 L 10,28" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </div>

          {/* Lower-Left: AI is a leverage tool. Leverage is the outcome. */}
          <div
            className="absolute left-8 top-[785px] z-0 text-[#FAF7F0]/65 select-none font-['Caveat',cursive]"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            <p className="text-[19px] leading-tight -rotate-3">
              AI is a leverage tool.
              <br />
              <span className="text-[#F0977A]/90">Leverage is the outcome.</span>
            </p>
            <svg
              className="w-12 h-5 mt-1 text-[#FAF7F0]/40"
              viewBox="0 0 60 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 5,8 C 22,16 40,16 52,11"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path d="M 44,7 L 53,11 L 45,16" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </div>

          {/* Lower-Right: Users. Operators. Business. A better product. */}
          <div
            className="absolute right-8 top-[785px] z-0 text-right text-[#FAF7F0]/65 select-none font-['Caveat',cursive]"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            <p className="text-[18px] leading-snug rotate-1">
              Users.
              <br />
              Operators.
              <br />
              Business.
              <br />
              <span className="text-[#F0977A]">A better product.</span>
            </p>
          </div>

          {/* Bottom-Left Stamp: Product Thinking */}
          <div className="absolute left-8 top-[980px] z-0 text-[#9E9E98]/50 select-none font-mono text-[9.5px] uppercase tracking-[0.12em]">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="size-1 rounded-full bg-[#F0977A]/60" />
              <span>PRODUCT THINKING</span>
            </div>
            <div>REAL CONTEXT · MEANINGFUL OUTCOMES</div>
          </div>

          {/* =======================================================================
              THE SIX STICKY NOTES POSITIONED WITH EXACT PIXEL COORDINATES
              ======================================================================= */}
          {PRINCIPLES.map((note) => (
            <div
              key={note.id}
              style={{
                position: "absolute",
                left: `${note.desktop.left}px`,
                top: `${note.desktop.top}px`,
                width: `${note.desktop.width}px`,
              }}
              onMouseEnter={() => setHoveredId(note.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <StickyNoteCard
                note={note}
                isActive={activeId === note.id}
                isDimmed={activeId !== null && activeId !== note.id}
                onSelect={() => setActiveId(activeId === note.id ? null : note.id)}
              />
            </div>
          ))}
        </div>

        {/* =========================================================================
            TABLET & MOBILE RESPONSIVE WORKING WALL (< 1024px)
            Natural vertical stacking with tactile paper rotations and doodles
            ========================================================================= */}
        <div className="block lg:hidden">
          {/* Mobile Center Heading at the Top */}
          <div className="text-center max-w-[560px] mx-auto mb-8">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F0977A]">
              HOW I WORK
            </span>

            <h2 className="mt-3 text-[26px] sm:text-[32px] font-normal leading-[1.15] text-[#FAF7F0]">
              Six principles I keep coming back{" "}
              <span className="relative inline-block">
                to.
                <svg
                  className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#F0977A]"
                  viewBox="0 0 100 8"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 2,5 Q 50,7 98,4"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>

            <p className="mt-3.5 text-[14px] leading-relaxed text-[#9E9E98]">
              Not a framework I downloaded. A working set of rules shaped by shipping real products.
            </p>

            <p
              className="mt-2 text-[16px] text-[#FAF7F0]/70 italic font-['Caveat',cursive]"
              style={{ fontFamily: "'Caveat', cursive" }}
            >
              “Things I write down before I ship.”
            </p>
          </div>

          {/* Upper-Middle Statement placed above notes on mobile */}
          <div
            className="mb-8 text-center text-[#FAF7F0]/70 font-['Caveat',cursive] text-[18px] sm:text-[20px] leading-snug"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Better problems · Better products · <span className="text-[#F0977A]">More useful systems.</span>
          </div>

          {/* Mobile Sticky Notes Layout: 1 col on mobile, 2 col on tablet */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 max-w-[720px] mx-auto">
            {PRINCIPLES.map((note) => (
              <div key={note.id} className="flex justify-center">
                <div className="w-full max-w-[340px]">
                  <StickyNoteCard
                    note={note}
                    isActive={activeId === note.id}
                    isDimmed={activeId !== null && activeId !== note.id}
                    onSelect={() => setActiveId(activeId === note.id ? null : note.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            EXPANDED WORKING NOTE INSPECTION MODAL (TACTILE PAPER SHEET)
            ========================================================================= */}
        {activeNote && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`dialog-title-${activeNote.id}`}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setActiveId(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[680px] max-h-[90vh] overflow-y-auto rounded-[12px] p-6 sm:p-9 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] border border-white/20 select-text animate-in zoom-in-95 duration-200"
              style={{
                backgroundColor: activeNote.paper.bg,
                color: activeNote.paper.textColor,
              }}
            >
              {/* Pushpin at top of expanded note */}
              <PinAttachment
                type={activeNote.paper.pin.type}
                color={activeNote.paper.pin.color}
                highlight={activeNote.paper.pin.highlight}
              />

              {/* Top Navigation & Close Bar */}
              <div className="flex items-center justify-between border-b border-black/15 pb-4 mb-6">
                <div className="flex items-center gap-2 font-mono text-[11px] font-bold tracking-wider opacity-70">
                  <span>NOTE {activeNote.number}</span>
                  <span>·</span>
                  <span>{activeNote.category}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex size-8 items-center justify-center rounded border border-black/20 hover:bg-black/10 transition-colors cursor-pointer"
                    aria-label="Previous principle"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex size-8 items-center justify-center rounded border border-black/20 hover:bg-black/10 transition-colors cursor-pointer"
                    aria-label="Next principle"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveId(null)}
                    className="inline-flex size-8 items-center justify-center rounded border border-black/20 hover:bg-black/10 transition-colors cursor-pointer ml-2"
                    aria-label="Close expanded note"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              {/* Note Title & Supporting Thought */}
              <div className="mb-6">
                <h3
                  id={`dialog-title-${activeNote.id}`}
                  className="text-[28px] sm:text-[32px] font-bold leading-tight tracking-tight font-['Caveat',cursive]"
                  style={{ fontFamily: "'Caveat', cursive" }}
                >
                  {activeNote.title}
                </h3>
                <p className="mt-1 text-[15px] sm:text-[16px] font-medium opacity-85">
                  {activeNote.supportingThought}
                </p>
              </div>

              {/* Handwritten Sticky Annotation */}
              <div className="mb-6 rounded-lg bg-black/[0.07] border border-black/10 p-3.5 italic font-['Caveat',cursive] text-[19px] sm:text-[20px] leading-snug">
                “{activeNote.annotation}”
              </div>

              {/* Detailed Breakdown Sections */}
              <div className="space-y-5 text-[14px] sm:text-[14.5px] leading-relaxed">
                <div>
                  <h4 className="font-mono text-[10.5px] font-bold uppercase tracking-wider opacity-60 mb-1.5">
                    THE REASONING / WHY IT MATTERS
                  </h4>
                  <p className="opacity-90">{activeNote.whyItMatters}</p>
                </div>

                <div>
                  <h4 className="font-mono text-[10.5px] font-bold uppercase tracking-wider opacity-60 mb-2">
                    HOW I APPLY IT
                  </h4>
                  <ul className="space-y-2">
                    {activeNote.howIApplyIt.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-1 flex size-3.5 shrink-0 items-center justify-center rounded-full bg-black/15">
                          <Check className="size-2.5 stroke-[2.5]" />
                        </span>
                        <span className="opacity-90">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-lg bg-black/[0.06] p-3.5">
                    <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A32A1C] mb-1">
                      WHAT IT PREVENTS
                    </h4>
                    <p className="text-[13px] font-medium opacity-90">
                      {activeNote.whatItPrevents}
                    </p>
                  </div>

                  <div className="rounded-lg bg-black/[0.06] p-3.5">
                    <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">
                      GROUND CONTEXT
                    </h4>
                    <p className="text-[13px] leading-snug opacity-90">
                      {activeNote.example}
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer action */}
              <div className="mt-8 pt-4 border-t border-black/15 flex items-center justify-between text-xs font-mono opacity-70">
                <span>PRESS ESC OR ARROW KEYS</span>
                <button
                  type="button"
                  onClick={() => setActiveId(null)}
                  className="font-bold underline hover:opacity-100 cursor-pointer"
                >
                  Return to wall
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Individual Sticky Note Card Component
 */
function StickyNoteCard({
  note,
  isActive,
  isDimmed,
  onSelect,
}: {
  note: PrincipleNote;
  isActive: boolean;
  isDimmed: boolean;
  onSelect: () => void;
}) {
  return (
    <article
      role="button"
      tabIndex={0}
      aria-expanded={isActive}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={`group relative w-full ${note.paper.rotation} ${
        isDimmed ? "opacity-35 blur-[0.3px]" : "opacity-100"
      } ${
        isActive
          ? "ring-2 ring-[#F0977A] scale-[1.03] z-30"
          : "hover:-translate-y-1.5 hover:scale-[1.02] z-20"
      } transition-all duration-200 cursor-pointer select-none rounded-[6px] p-5 sm:p-6 shadow-[0_16px_32px_-8px_rgba(0,0,0,0.85),0_4px_12px_rgba(0,0,0,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0977A]`}
      style={{
        backgroundColor: note.paper.bg,
        color: note.paper.textColor,
        border: `1px solid ${note.paper.border}`,
        boxShadow:
          "0 18px 36px -10px rgba(0,0,0,0.85), 0 4px 14px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2)",
      }}
    >
      {/* Physical Pin / Masking Tape */}
      <PinAttachment
        type={note.paper.pin.type}
        color={note.paper.pin.color}
        highlight={note.paper.pin.highlight}
      />

      {/* Subtle paper fiber texture & top gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[6px] bg-gradient-to-b from-white/[0.18] via-transparent to-black/[0.12]"
      />

      {/* Folded corner illusion at bottom-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 size-6 rounded-br-[6px] bg-gradient-to-tl from-black/25 via-transparent to-transparent"
      />

      {/* Note Header: Number & Category */}
      <div className="relative z-10 flex items-center justify-between mb-3 border-b border-black/10 pb-2">
        <span
          className="text-[20px] font-bold tracking-tight font-['Caveat',cursive]"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          {note.number}
        </span>
        <span className="font-mono text-[9.5px] uppercase tracking-wider opacity-60">
          {note.category}
        </span>
      </div>

      {/* Handwritten Title */}
      <div className="relative z-10">
        <h3
          className="text-[22px] sm:text-[24px] font-bold leading-[1.18] tracking-tight font-['Caveat',cursive]"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          {note.title}
        </h3>

        {/* Hand-drawn scribble underline */}
        <div className="w-16 h-0.5 mt-1 border-b border-black/25" />

        {/* Clean supporting thought */}
        <p className="mt-3 text-[13px] sm:text-[13.5px] font-medium leading-snug opacity-85">
          {note.supportingThought}
        </p>
      </div>

      {/* Bottom affordance: EXPLORE ↗ */}
      <div className="relative z-10 mt-6 pt-2.5 border-t border-black/10 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] font-semibold opacity-75 group-hover:opacity-100 transition-opacity">
          EXPLORE
        </span>
        <ArrowUpRight className="size-3.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
    </article>
  );
}
