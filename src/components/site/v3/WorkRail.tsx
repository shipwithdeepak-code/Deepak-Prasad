import React, { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { CaseStudyDetail } from "../../../types";
import { coverFor } from "../../../utils/covers";
import {
  RAIL_ENTRIES,
  WORK_FAMILY_LABELS,
  WorkFamily,
} from "../../../data/homeV3";

interface WorkRailProps {
  caseStudies: CaseStudyDetail[];
  onSelectCaseStudy: (caseStudy: CaseStudyDetail) => void;
  onNavigate: (path: string) => void;
}

const FILTERS: { label: string; family: WorkFamily | null }[] = [
  { label: "All", family: null },
  { label: WORK_FAMILY_LABELS.ai, family: "ai" },
  { label: WORK_FAMILY_LABELS.marketplace, family: "marketplace" },
  { label: WORK_FAMILY_LABELS.growth, family: "growth" },
  { label: WORK_FAMILY_LABELS.hardware, family: "hardware" },
];

/** Everything shipped, including the work that does not have its own page.
 *  The count is stated rather than implied so six cards never read as the
 *  whole record. */
const TOTAL_SHIPPED = 11;

/**
 * The work, as a horizontal rail of covers rather than a grid of summaries.
 *
 * A grid asks you to read six things at once; a rail asks you to move through
 * them. Each card is the real cover art with one glass caption panel over it,
 * carrying the family, the title and the single number that matters.
 */
export default function WorkRail({
  caseStudies,
  onSelectCaseStudy,
  onNavigate,
}: WorkRailProps) {
  const [family, setFamily] = useState<WorkFamily | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0 });

  const visible = caseStudies.filter((cs) => {
    const entry = RAIL_ENTRIES[cs.slug];
    return !family || entry?.family === family;
  });

  /* Mouse drag only. Touch already scrolls the rail natively, and hijacking
     it there costs the momentum the browser gives for free. */
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !railRef.current) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: railRef.current.scrollLeft,
    };
    railRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current.active || !railRef.current) return;
    railRef.current.scrollLeft =
      drag.current.startScroll - (e.clientX - drag.current.startX);
  };

  const endDrag = () => {
    drag.current.active = false;
  };

  return (
    <section id="selected-work" className="v3-atmos v3-atmos-blue py-[104px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-10 grid max-w-[60ch] gap-3.5">
          <p className="font-mono text-[11px] uppercase leading-[.91] tracking-[.8px] text-smoke">
            Products shipped
          </p>
          <h2 className="text-[clamp(1.6rem,3.2vw,2.25rem)] font-normal leading-[1.17] tracking-[.22px] text-pure-white">
            Eleven things that went live and moved a number.
          </h2>
          <p className="text-base leading-relaxed text-ash">
            Not case studies. Product decisions, launches, marketplace and
            subscription systems, connected hardware and applied AI.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-2">
          {FILTERS.map((filter) => {
            const pressed = filter.family === family;
            return (
              <button
                key={filter.label}
                type="button"
                aria-pressed={pressed}
                onClick={() => setFamily(filter.family)}
                className={
                  pressed
                    ? "min-h-9 rounded-full bg-mist px-3.5 py-2 text-[13px] font-medium text-iron"
                    : "v3-key-quiet min-h-9 rounded-full px-3.5 py-2 text-[13px] font-medium text-ash transition-colors duration-200 hover:text-pure-white"
                }
              >
                {filter.label}
              </button>
            );
          })}
          <span
            aria-live="polite"
            className="ml-1.5 font-mono text-[11px] text-smoke"
          >
            {visible.length} of {TOTAL_SHIPPED}
          </span>
        </div>

        <div
          ref={railRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="v3-rail flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto pb-5"
        >
          {visible.map((cs) => {
            const entry = RAIL_ENTRIES[cs.slug];
            const cover = coverFor(cs.slug);
            return (
              <button
                key={cs.slug}
                type="button"
                onClick={() => onSelectCaseStudy(cs)}
                className="group relative isolate h-[400px] w-[300px] flex-none snap-center overflow-hidden rounded-[20px] bg-ink text-left transition-transform duration-[420ms] hover:-translate-y-1.5"
              >
                {cover && (
                  <img
                    src={cover}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 -z-20 size-full object-cover"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(4,5,6,.9) 16%, rgba(4,5,6,.08) 72%)",
                  }}
                />
                <span
                  aria-hidden="true"
                  className="v3-key pointer-events-none absolute inset-0 rounded-[20px]"
                />
                {entry && (
                  <span className="absolute right-4 top-4 rounded-md bg-void-black/60 px-[7px] py-1 font-mono text-[10px] text-ash">
                    {entry.years}
                  </span>
                )}
                <span className="v3-glass absolute inset-x-3 bottom-3 grid gap-2 rounded-[14px] p-4">
                  <em className="font-mono text-[10px] uppercase not-italic tracking-[.05em] text-ash">
                    {entry ? WORK_FAMILY_LABELS[entry.family] : cs.category}
                  </em>
                  <b className="text-[19px] font-normal leading-[1.2] text-pure-white">
                    {cs.title}
                  </b>
                  {entry && (
                    <span className="font-mono text-[11px] text-mist">
                      {entry.metric}
                    </span>
                  )}
                </span>
              </button>
            );
          })}

          {/* The rail holds the six with their own pages. The rest of the
              eleven live on the work page, and the last card says so instead
              of letting the rail end mid-record. */}
          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="v3-key-quiet group grid h-[400px] w-[300px] flex-none snap-center content-end gap-3 rounded-[20px] bg-ink p-6 text-left transition-transform duration-[420ms] hover:-translate-y-1.5"
          >
            <span className="font-mono text-[10px] uppercase tracking-[.05em] text-smoke">
              Everything else
            </span>
            <span className="text-[19px] leading-[1.2] text-pure-white">
              The other five, plus the work without its own page.
            </span>
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-coral-pulse">
              See all work
              <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
