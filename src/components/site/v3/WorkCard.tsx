import React from "react";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyDetail } from "../../../types";
import { coverFor } from "../../../utils/covers";
import { RAIL_ENTRIES, WORK_FAMILY_LABELS } from "../../../data/homeV3";
import { getProjectLogo } from "./WorkLogos";

interface WorkCardProps {
  key?: React.Key;
  study: CaseStudyDetail;
  onSelect: (study: CaseStudyDetail) => void;
}

interface CardMeta {
  displayTitle: string;
  categoryLabel: string;
  summary: string;
  widgetBadge: string;
  widgetDotColor: "coral" | "emerald";
  primaryMetric: string;
  secondaryProof: string;
  baseBg: string;
  brandOverlayGradient: string;
  accentBorderHover: string;
}

/**
 * Curated palette rules:
 * - ReshaMandi: muted forest green, olive green, deep moss, restrained green accents
 * - Sportstech / connected hardware: deep red, rust, burgundy, brick red, warm coral
 * - Applied AI / Dipa: graphite, charcoal, muted coral, restrained amber
 * - Growth / subscription: deep plum, wine red, burgundy, muted rose
 */
const CARD_METADATA: Record<string, CardMeta> = {
  reshamandi: {
    displayTitle: "ReshaMandi",
    categoryLabel: "B2B Marketplace & Escrow",
    summary:
      "Transforming fragmented silk trading into connected digital workflows across farmers, yards, and finance.",
    widgetBadge: "LIVE YARD ESCROW",
    widgetDotColor: "emerald",
    primaryMetric: "₹20–25 Cr / month",
    secondaryProof: "99.9% reliability • 80,000+ farmers",
    baseBg: "#0B120E",
    brandOverlayGradient:
      "bg-gradient-to-br from-[#163323]/35 via-[#224430]/25 to-[#0F2117]/40",
    accentBorderHover: "group-hover:border-[#386B52]/40",
  },
  subscription: {
    displayTitle: "Ultrahuman Subscription",
    categoryLabel: "Consumer Monetization",
    summary:
      "Designing the end-to-end monetization experience from packaging and paywalls to retention and conversion.",
    widgetBadge: "ANNUAL MONETIZATION",
    widgetDotColor: "coral",
    primaryMetric: "12,401 Paying Members",
    secondaryProof: "€659K FY25 • +81.9% YoY growth",
    baseBg: "#130C12",
    brandOverlayGradient:
      "bg-gradient-to-br from-[#38162F]/35 via-[#4A1D3D]/25 to-[#240D1E]/40",
    accentBorderHover: "group-hover:border-[#7A3664]/40",
  },
  "ai-coach": {
    displayTitle: "Ultrahuman AI Coach",
    categoryLabel: "Conversational Health AI",
    summary:
      "Taking an ambiguous AI opportunity to production, translating metabolic telemetry with strict safety guardrails.",
    widgetBadge: "METABOLIC AI INFERENCE",
    widgetDotColor: "coral",
    primaryMetric: "300 → 3,200+ DAU",
    secondaryProof: "Scaled in 3 months • Guardrailed",
    baseBg: "#130F0D",
    brandOverlayGradient:
      "bg-gradient-to-br from-[#382015]/35 via-[#47291B]/25 to-[#21120B]/40",
    accentBorderHover: "group-hover:border-[#7A4B36]/40",
  },
  "ai-localization": {
    displayTitle: "AI Content Pipeline",
    categoryLabel: "Applied AI & Media Pipeline",
    summary:
      "Re-architecting a 3–4 month video production workflow into an automated AI pipeline across 3 languages.",
    widgetBadge: "MULTILINGUAL SYNTHESIS",
    widgetDotColor: "emerald",
    primaryMetric: "200+ Videos Localised",
    secondaryProof: "3 European languages • 2-week turnaround",
    baseBg: "#101115",
    brandOverlayGradient:
      "bg-gradient-to-br from-[#1E2530]/35 via-[#262E3B]/25 to-[#13171E]/40",
    accentBorderHover: "group-hover:border-[#3E4D61]/40",
  },
  "performance-score": {
    displayTitle: "Performance Score Engine",
    categoryLabel: "Connected Hardware & Algorithms",
    summary:
      "Unifying fragmented biometric streams across ring, M1, and app into a single algorithmic benchmark.",
    widgetBadge: "CROSS-SURFACE BENCHMARK",
    widgetDotColor: "coral",
    primaryMetric: "Five Surfaces • One Score",
    secondaryProof: "Ring, M1, App, Smart Gym • 174K users",
    baseBg: "#140C0E",
    brandOverlayGradient:
      "bg-gradient-to-br from-[#3D1619]/35 via-[#4E1C20]/25 to-[#240C0E]/40",
    accentBorderHover: "group-hover:border-[#6B2C30]/40",
  },
  "behind-ai-copilot": {
    displayTitle: "Dipa AI Copilot",
    categoryLabel: "In-Memory Retrieval Engine",
    summary:
      "Zero-latency, 100% grounded in-memory RAG portfolio intelligence with build-time embeddings and confidence gating.",
    widgetBadge: "GROUNDED RETRIEVAL",
    widgetDotColor: "emerald",
    primaryMetric: "19/20 Golden-Set Accuracy",
    secondaryProof: "45 in-memory chunks • Zero external DBs",
    baseBg: "#101013",
    brandOverlayGradient:
      "bg-gradient-to-br from-[#2A2328]/35 via-[#342732]/25 to-[#181419]/40",
    accentBorderHover: "group-hover:border-[#5E474F]/40",
  },
};

export default function WorkCard({ study, onSelect }: WorkCardProps) {
  const entry = RAIL_ENTRIES[study.slug];
  const cover = coverFor(study.slug);
  const meta = CARD_METADATA[study.slug] || {
    displayTitle: study.title,
    categoryLabel: entry ? WORK_FAMILY_LABELS[entry.family] : study.category,
    summary: study.description || study.subtitle,
    widgetBadge: "SHIPPED PRODUCT",
    widgetDotColor: "coral" as const,
    primaryMetric: entry?.metric || "Live in Production",
    secondaryProof: entry?.years || "Production",
    baseBg: "#0E0F14",
    brandOverlayGradient: "bg-gradient-to-br from-white/[0.04] to-transparent",
    accentBorderHover: "group-hover:border-white/[0.18]",
  };

  return (
    <button
      type="button"
      onClick={() => onSelect(study)}
      aria-label={`View project details for ${meta.displayTitle}`}
      className={`group relative flex h-[480px] w-[min(340px,calc(100vw-48px))] flex-none cursor-pointer snap-start flex-col justify-between overflow-hidden rounded-[22px] border border-white/[0.08] p-5 text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:border-white/[0.18] ${meta.accentBorderHover} hover:shadow-[0_22px_44px_-12px_rgba(0,0,0,0.75),inset_0_1px_0_0_rgba(255,255,255,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0977A]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040506] motion-reduce:transform-none motion-reduce:transition-none sm:w-[370px]`}
      style={{ backgroundColor: meta.baseBg }}
    >
      {/* LAYER 1: Base Dark Card Background (applied via style={{ backgroundColor }}) */}

      {/* LAYER 2: Existing Image as the Main Visual Texture */}
      {cover && (
        <img
          src={cover}
          alt=""
          width={1160}
          height={725}
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute inset-0 size-full object-cover object-center opacity-40 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:opacity-55 motion-reduce:transform-none"
        />
      )}

      {/* LAYER 3: Subtle Brand-Color Overlay (15–35% opacity cinematic tint) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 ${meta.brandOverlayGradient} transition-opacity duration-500 group-hover:opacity-90`}
      />

      {/* LAYER 4: Dark Readability Gradient (protects header at top and metric widget at bottom) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050608]/85 via-[#050608]/45 to-[#050608]/95"
      />

      {/* FOREGROUND CONTENT */}
      {/* Top Header & Description Section */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 overflow-hidden">
            {/* Brand Logo Squircle */}
            <div className="flex size-10 shrink-0 items-center justify-center rounded-[12px] border border-white/[0.10] bg-white/[0.05] p-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-colors duration-[350ms] group-hover:border-white/[0.20] group-hover:bg-white/[0.10]">
              {getProjectLogo(study.slug)}
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-[16.5px] font-medium tracking-tight text-[#FAF7F0] transition-colors duration-[300ms] group-hover:text-white">
                {meta.displayTitle}
              </h3>
              <p className="truncate font-mono text-[10px] uppercase tracking-[0.08em] text-[#9C9A95]">
                {meta.categoryLabel}
              </p>
            </div>
          </div>

          {/* Action Button Affordance (visual affordance; clicking anywhere navigates) */}
          <div
            aria-hidden="true"
            className="flex size-8 shrink-0 items-center justify-center rounded-[10px] border border-white/[0.10] bg-white/[0.05] text-[#9C9A95] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-white/[0.22] group-hover:bg-white/[0.10] group-hover:text-[#FAF7F0] motion-reduce:transform-none"
          >
            <ArrowUpRight className="size-4" strokeWidth={1.8} />
          </div>
        </div>

        {/* Description Summary */}
        <p className="mt-3.5 line-clamp-2 text-[13.5px] leading-relaxed text-[#B0AEA8] transition-colors duration-[300ms] group-hover:text-[#E2DFD8]">
          {meta.summary}
        </p>
      </div>

      {/* LAYER 5: Existing Glass-Edged Metric Panel at the Bottom */}
      <div className="relative z-10 rounded-[14px] border border-white/[0.10] bg-[#0A0B10]/85 p-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:border-white/[0.18] group-hover:bg-[#0C0D14]/92">
        <div className="mb-1 flex items-center justify-between gap-1.5">
          <div className="flex items-center gap-1.5">
            <span
              className={`size-1.5 rounded-full ${
                meta.widgetDotColor === "emerald"
                  ? "bg-[#59D499]"
                  : "bg-[#F0977A]"
              }`}
            />
            <span className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-[#9C9A95]">
              {meta.widgetBadge}
            </span>
          </div>
          {entry?.years && (
            <span className="font-mono text-[10px] text-[#85837D]">
              {entry.years}
            </span>
          )}
        </div>

        <div className="truncate text-[15.5px] font-medium tracking-tight text-[#FAF7F0]">
          {meta.primaryMetric}
        </div>

        <div className="mt-0.5 truncate font-mono text-[10.5px] text-[#A09D96]">
          {meta.secondaryProof}
        </div>
      </div>
    </button>
  );
}
