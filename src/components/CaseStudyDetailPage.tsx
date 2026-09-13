import React, { useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Quote,
} from "lucide-react";
import { CaseStudyDetail } from "../types";
import { ALL_FLAGSHIP_CASE_STUDIES } from "../data/caseStudies";

interface CaseStudyDetailPageProps {
  caseStudy: CaseStudyDetail;
  onNavigate: (path: string) => void;
}

export default function CaseStudyDetailPage({
  caseStudy,
  onNavigate,
}: CaseStudyDetailPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [caseStudy.id]);

  // Find adjacent case studies for next/previous navigation
  const currentIndex = ALL_FLAGSHIP_CASE_STUDIES.findIndex(
    (c) => c.id === caseStudy.id
  );
  const nextStudy =
    ALL_FLAGSHIP_CASE_STUDIES[(currentIndex + 1) % ALL_FLAGSHIP_CASE_STUDIES.length];
  const prevStudy =
    ALL_FLAGSHIP_CASE_STUDIES[
      (currentIndex - 1 + ALL_FLAGSHIP_CASE_STUDIES.length) %
        ALL_FLAGSHIP_CASE_STUDIES.length
    ];

  return (
    <div className="w-full bg-void text-ivory">
      {/* =========================================================================
          HERO & HEADER
          ========================================================================= */}
      <section className="pt-10 pb-16 md:pt-14 md:pb-20 border-b border-[var(--rule)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Work Link */}
          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-mute hover:text-coral mb-8 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-sm"
          >
            <ArrowLeft size={15} />
            <span>Back to selected work</span>
          </button>

          {/* Eyebrow & Status Notice */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-xs font-mono uppercase tracking-[0.18em] text-coral font-medium">
              CASE {caseStudy.number} / {caseStudy.category}
            </span>
            {caseStudy.isStrategyOnly && (
              <span className="text-xs font-mono uppercase tracking-[0.16em] text-mute">
                Development-Ready Strategy
              </span>
            )}
          </div>

          {/* Title */}
          <h1
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ivory leading-[1.15] mb-4"
            style={{ fontVariationSettings: '"wdth" 92' }}
          >
            {caseStudy.title}
          </h1>

          {/* Subtitle */}
          <p className="font-body text-lg sm:text-xl font-medium text-mute leading-relaxed mb-6">
            {caseStudy.subtitle}
          </p>

          {/* Role and Timeline */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono uppercase tracking-[0.12em] text-mute border-t border-b border-[var(--rule)] py-4 mb-8">
            <div>
              <span className="font-semibold text-ivory">Role: </span>
              <span>{caseStudy.role}</span>
            </div>
            <div className="hidden sm:block text-mute">/</div>
            <div>
              <span className="font-semibold text-ivory">Timeline: </span>
              <span>{caseStudy.timeline}</span>
            </div>
          </div>

          {/* Thesis Callout */}
          <div className="p-6 rounded-[20px] bg-ghost border border-[var(--rule)] mb-8">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.18em] text-coral mb-2">
              <Sparkles size={14} className="text-coral" />
              <span>Core Product Thesis</span>
            </div>
            <p
              className="font-display text-lg sm:text-xl font-bold text-ivory leading-snug"
              style={{ fontVariationSettings: '"wdth" 92' }}
            >
              "{caseStudy.thesis}"
            </p>
            {caseStudy.centralQuestion && (
              <p className="font-body text-sm text-mute mt-3 pt-3 border-t border-[var(--rule)]">
                <span className="font-semibold text-ivory">Central Question: </span>
                {caseStudy.centralQuestion}
              </p>
            )}
          </div>

          {/* Strategy Status Callout if applicable */}
          {caseStudy.statusNotice && (
            <div className="p-4 rounded-[20px] bg-ghost border border-coral/30 flex items-start gap-3 text-xs sm:text-sm font-body text-ivory/90 mb-8">
              <AlertTriangle size={18} className="shrink-0 text-coral mt-0.5" />
              <span>{caseStudy.statusNotice}</span>
            </div>
          )}

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-[20px] bg-ghost border border-[var(--rule)] shadow-2xs">
            {caseStudy.keyStats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span
                  className="font-display text-2xl sm:text-3xl font-bold text-coral"
                  style={{ fontVariationSettings: '"wdth" 92' }}
                >
                  {stat.value}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-ivory mt-0.5 font-semibold">
                  {stat.label}
                </span>
                {stat.detail && (
                  <span className="font-body text-[11px] text-mute mt-0.5">
                    {stat.detail}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          NARRATIVE SECTIONS (EDITORIAL LAYOUT, NOT EXCESSIVE CARDS)
          ========================================================================= */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-16 md:gap-20">
            {caseStudy.sections.map((sec) => (
              <article key={sec.id} id={sec.id} className="scroll-mt-24">
                {/* Section header */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-mute font-semibold">
                      {sec.title.split(":")[0]}
                    </span>
                  </div>
                  <h2
                    className="font-display text-2xl sm:text-3xl font-bold text-ivory leading-tight"
                    style={{ fontVariationSettings: '"wdth" 92' }}
                  >
                    {sec.title.includes(":") ? sec.title.split(":")[1].trim() : sec.title}
                  </h2>
                  {sec.subtitle && (
                    <p className="font-body text-base text-mute/90 mt-1 font-medium">
                      {sec.subtitle}
                    </p>
                  )}
                </div>

                {/* Narrative Paragraphs */}
                <div className="flex flex-col gap-4 font-body text-base sm:text-lg text-mute leading-relaxed mb-6 font-normal">
                  {sec.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Workflow Steps Diagram */}
                {sec.workflowSteps && (
                  <div className="my-8 p-6 rounded-[20px] bg-ghost border border-[var(--rule)] shadow-2xs">
                    <span className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-mute block mb-4">
                      Execution Flow
                    </span>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 relative">
                      {sec.workflowSteps.map((step, sIdx) => (
                        <div key={sIdx} className="flex-1 flex flex-col items-start bg-void/60 p-3.5 rounded-xl border border-[var(--rule)]">
                          <span className="text-[11px] font-mono font-bold text-coral">
                            STEP 0{sIdx + 1}
                          </span>
                          <span
                            className="font-display text-sm font-bold text-ivory mt-0.5"
                            style={{ fontVariationSettings: '"wdth" 92' }}
                          >
                            {step.label}
                          </span>
                          {step.desc && (
                            <span className="font-body text-[11px] text-mute mt-1 leading-tight">
                              {step.desc}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Before vs After Comparison */}
                {sec.comparison && (
                  <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 rounded-[20px] bg-ghost border border-[var(--rule)]">
                      <span className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-mute block mb-3">
                        {sec.comparison.before.title}
                      </span>
                      <ul className="flex flex-col gap-2.5">
                        {sec.comparison.before.steps.map((st, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-body text-mute">
                            <span className="w-1.5 h-1.5 rounded-full bg-mute/40 mt-1.5 shrink-0" />
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 rounded-[20px] bg-ghost border border-[var(--rule-strong)]">
                      <span className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-coral block mb-3">
                        {sec.comparison.after.title}
                      </span>
                      <ul className="flex flex-col gap-2.5">
                        {sec.comparison.after.steps.map((st, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-body text-ivory/90 font-medium">
                            <CheckCircle2 size={15} className="text-coral mt-0.5 shrink-0" />
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Evaluation Table if present */}
                {sec.evaluationTable && sec.evaluationTable.length > 0 && (
                  <div className="my-8 rounded-[20px] bg-ghost border border-[var(--rule)] shadow-2xs overflow-hidden">
                    <div className="p-5 sm:p-6 border-b border-[var(--rule)] flex flex-wrap items-center justify-between gap-3 bg-ghost">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.18em] text-coral">
                          <Sparkles size={14} className="text-coral" />
                          <span>Evaluation Benchmark Matrix</span>
                        </div>
                        <h3
                          className="font-display text-lg sm:text-xl font-bold text-ivory mt-1"
                          style={{ fontVariationSettings: '"wdth" 92' }}
                        >
                          Golden Test Set ({sec.evaluationTable.length} Questions)
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-mute">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ghost border border-[var(--rule-strong)] text-coral font-semibold uppercase tracking-[0.12em]">
                          <CheckCircle2 size={13} className="text-coral" />
                          <span>95% Pass Rate (19/20)</span>
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-ghost border border-[var(--rule)] text-mute font-semibold uppercase tracking-[0.12em]">
                          <span>0% Hallucinations</span>
                        </span>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-[var(--rule)] bg-void/50 text-mute font-mono uppercase tracking-[0.14em] text-[11px] font-semibold">
                            <th className="py-3 px-4 w-12 text-center">#</th>
                            <th className="py-3 px-4 min-w-[220px]">Test Query</th>
                            <th className="py-3 px-4 min-w-[130px]">Category</th>
                            <th className="py-3 px-4 min-w-[180px]">Target Ground Source</th>
                            <th className="py-3 px-4 text-center w-24">Cosine Sim</th>
                            <th className="py-3 px-4 text-center w-28">Status</th>
                            <th className="py-3 px-4 min-w-[240px]">Verification Notes</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[var(--rule)] font-body">
                          {sec.evaluationTable.map((row) => (
                            <tr key={row.id} className="hover:bg-ghost-active transition-colors">
                              <td className="py-3 px-4 text-center font-mono text-xs text-mute">
                                {String(row.id).padStart(2, "0")}
                              </td>
                              <td className="py-3 px-4 font-medium text-ivory">
                                "{row.query}"
                              </td>
                              <td className="py-3 px-4">
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-[0.1em] font-semibold bg-ghost border border-[var(--rule)] text-mute">
                                  {row.category}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-xs text-mute">
                                {row.groundTruthSource}
                              </td>
                              <td className="py-3 px-4 text-center font-mono text-xs font-semibold text-ivory">
                                {row.similarity.toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span
                                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono uppercase tracking-[0.1em] font-semibold ${
                                    row.status === "Pass"
                                      ? "bg-ghost border border-coral/40 text-coral"
                                      : "bg-ghost border border-[var(--rule)] text-mute"
                                  }`}
                                >
                                  {row.status === "Pass" ? (
                                    <CheckCircle2 size={12} className="text-coral" />
                                  ) : (
                                    <AlertTriangle size={12} />
                                  )}
                                  <span>{row.status}</span>
                                </span>
                              </td>
                              <td className="py-3 px-4 text-xs text-mute leading-relaxed">
                                {row.notes}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Highlights Grid */}
                {sec.highlights && sec.highlights.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                    {sec.highlights.map((h, hIdx) => (
                      <div
                        key={hIdx}
                        className="p-5 rounded-[20px] bg-ghost border border-[var(--rule)] shadow-2xs"
                      >
                        <h3
                          className="font-display text-base font-bold text-ivory mb-1.5 flex items-center gap-2"
                          style={{ fontVariationSettings: '"wdth" 92' }}
                        >
                          <CheckCircle2 size={16} className="text-coral shrink-0" />
                          <span>{h.title}</span>
                        </h3>
                        <p className="font-body text-xs sm:text-sm text-mute leading-relaxed">
                          {h.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reflection Quote */}
                {sec.quote && (
                  <div className="my-8 p-6 sm:p-8 rounded-[20px] bg-ghost border border-[var(--rule-strong)] text-ivory relative overflow-hidden">
                    <Quote size={32} className="text-coral/30 mb-3" />
                    <p
                      className="font-display text-lg sm:text-xl font-medium leading-relaxed italic text-ivory"
                      style={{ fontVariationSettings: '"wdth" 92' }}
                    >
                      "{sec.quote}"
                    </p>
                    <span className="block font-mono text-xs text-coral mt-4 font-semibold uppercase tracking-[0.18em]">
                      Deepak Prasad / Product Philosophy
                    </span>
                  </div>
                )}

                <div className="w-full h-px bg-[var(--rule)] mt-12" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PREVIOUS / NEXT CASE STUDY PAGINATION
          ========================================================================= */}
      <section className="py-12 bg-void border-t border-[var(--rule)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            type="button"
            onClick={() => {
              onNavigate(`/work/${prevStudy.slug}`);
            }}
            className="flex items-center gap-3 text-left p-4 rounded-xl hover:bg-ghost border border-[var(--rule)] hover:border-coral/40 transition-all cursor-pointer w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
          >
            <ArrowLeft size={20} className="text-coral" />
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-mute block">
                Previous Case
              </span>
              <span
                className="font-display font-bold text-sm text-ivory"
                style={{ fontVariationSettings: '"wdth" 92' }}
              >
                {prevStudy.title}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="text-xs font-mono font-semibold uppercase tracking-[0.14em] text-mute hover:text-coral transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-sm"
          >
            All Case Studies
          </button>

          <button
            type="button"
            onClick={() => {
              onNavigate(`/work/${nextStudy.slug}`);
            }}
            className="flex items-center justify-end gap-3 text-right p-4 rounded-xl hover:bg-ghost border border-[var(--rule)] hover:border-coral/40 transition-all cursor-pointer w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
          >
            <div>
              <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.16em] text-mute block">
                Next Case
              </span>
              <span
                className="font-display font-bold text-sm text-ivory"
                style={{ fontVariationSettings: '"wdth" 92' }}
              >
                {nextStudy.title}
              </span>
            </div>
            <ArrowRight size={20} className="text-coral" />
          </button>
        </div>
      </section>
    </div>
  );
}
