import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  ALL_FLAGSHIP_CASE_STUDIES,
  MORE_WORK_CATEGORIES,
} from "../data/caseStudies";
import { CaseStudyDetail } from "../types";
import { coverFor } from "../utils/covers";
import { PageHeader, Panel, SectionHeader, Tag } from "./site/v3/primitives";
import { RAIL_ENTRIES, WORK_FAMILY_LABELS, WorkFamily } from "../data/homeV3";

interface WorkPageProps {
  onNavigate: (path: string) => void;
  onSelectCaseStudy: (caseStudy: CaseStudyDetail) => void;
}

const FILTERS: { label: string; family: WorkFamily | null }[] = [
  { label: "All", family: null },
  { label: WORK_FAMILY_LABELS.ai, family: "ai" },
  { label: WORK_FAMILY_LABELS.marketplace, family: "marketplace" },
  { label: WORK_FAMILY_LABELS.growth, family: "growth" },
  { label: WORK_FAMILY_LABELS.hardware, family: "hardware" },
];

/**
 * The work index.
 *
 * The homepage rail is a browse; this is the read. One wide row per product,
 * cover on the left, the decision and the proof on the right, and the whole
 * row is the link. Families here are the same four the homepage filters by,
 * because two vocabularies for one set of products is one too many.
 */
export default function WorkPage({
  onNavigate,
  onSelectCaseStudy,
}: WorkPageProps) {
  const [family, setFamily] = useState<WorkFamily | null>(null);

  const visible = ALL_FLAGSHIP_CASE_STUDIES.filter(
    (study) => !family || RAIL_ENTRIES[study.slug]?.family === family,
  );

  const open = (study: CaseStudyDetail) => {
    onSelectCaseStudy(study);
    onNavigate(`/work/${study.slug}`);
  };

  return (
    <div className="v3-atmos v3-atmos-blue bg-void-black py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <PageHeader
          eyebrow="Products shipped"
          title="Everything that went live, and what it moved."
          lede="Six of these have a page of their own: the decision, what it cost, and the number it changed. The rest are listed underneath."
        />

        <div className="mb-8 flex flex-wrap items-center gap-2">
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
          <span aria-live="polite" className="ml-1.5 font-mono text-[11px] text-smoke">
            {visible.length} of {ALL_FLAGSHIP_CASE_STUDIES.length}
          </span>
        </div>

        <div className="mb-24 grid gap-4">
          {visible.map((study) => {
            const cover = coverFor(study.slug);
            const entry = RAIL_ENTRIES[study.slug];
            return (
              <Panel
                key={study.id}
                role="link"
                tabIndex={0}
                onClick={() => open(study)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    open(study);
                  }
                }}
                className="group grid cursor-pointer overflow-hidden bg-ink transition-transform duration-300 hover:-translate-y-0.5 lg:grid-cols-[300px_1fr]"
              >
                <div className="relative min-h-[180px] overflow-hidden bg-void-black">
                  {cover && (
                    <img
                      src={cover}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-100 lg:absolute lg:inset-0"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(4,5,6,0) 52%, rgba(4,5,6,.8) 100%)",
                    }}
                  />
                </div>

                <div className="grid content-between gap-6 p-6 sm:p-8">
                  <div className="grid gap-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="font-mono text-[10.5px] uppercase tracking-[.05em] text-ash">
                        {entry
                          ? WORK_FAMILY_LABELS[entry.family]
                          : study.category}
                      </span>
                      <span className="font-mono text-[10.5px] uppercase tracking-[.05em] text-smoke">
                        {study.isStrategyOnly
                          ? "Development ready strategy"
                          : study.timeline}
                      </span>
                    </div>
                    <h2 className="text-2xl font-normal leading-[1.17] text-pure-white">
                      {study.title}
                    </h2>
                    <p className="max-w-[68ch] text-[15px] leading-relaxed text-mist/90">
                      {study.subtitle}
                    </p>
                    <p className="max-w-[72ch] text-sm leading-relaxed text-ash">
                      {study.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {study.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-5">
                    <div className="flex flex-wrap gap-x-6 gap-y-1.5">
                      {study.proofPoints.map((proof) => (
                        <span
                          key={proof}
                          className="font-mono text-[11px] text-mist"
                        >
                          {proof}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 text-[13px] font-medium text-coral-pulse">
                      Read it
                      <ArrowUpRight
                        className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </div>
              </Panel>
            );
          })}
        </div>

        <section id="more-work" className="border-t border-hairline pt-16">
          <SectionHeader
            eyebrow="Secondary and systems work"
            title="The rest of the record."
            lede="Platform extensions, operational pipelines, CRM and ERP integrations, and the earlier hardware work. No separate page each; the scope line is the summary."
          />

          <div className="grid gap-10">
            {MORE_WORK_CATEGORIES.map((cat) => (
              <div key={cat.category} className="grid gap-4">
                <div className="grid gap-1.5">
                  <h3 className="text-xl font-normal text-pure-white">
                    {cat.category}
                  </h3>
                  <p className="max-w-[72ch] text-sm leading-relaxed text-ash">
                    {cat.description}
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {cat.items.map((item) => (
                    <Panel
                      key={item.title}
                      className="grid content-between gap-4 bg-ink p-5"
                    >
                      <div className="grid gap-2">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-base font-medium text-pure-white">
                            {item.title}
                          </h4>
                          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[.05em] text-coral-pulse">
                            {item.scope}
                          </span>
                        </div>
                        <p className="text-[13px] leading-relaxed text-ash">
                          {item.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 border-t border-hairline pt-3">
                        {item.tags.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    </Panel>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
