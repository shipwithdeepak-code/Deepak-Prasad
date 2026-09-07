import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Clock,
  Zap,
  HelpCircle,
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
    <div className="w-full bg-[#FAFDFB] text-[#042718]">
      {/* =========================================================================
          HERO & HEADER
          ========================================================================= */}
      <section className="pt-10 pb-16 md:pt-14 md:pb-20 border-b border-[#042718]/8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Work Link */}
          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-inter font-medium text-[#042718]/60 hover:text-[#188E39] mb-8 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to selected work</span>
          </button>

          {/* Eyebrow & Status Notice */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-[#042718]/5 text-xs font-inter font-semibold text-[#042718]">
              CASE {caseStudy.number} · {caseStudy.category}
            </span>
            {caseStudy.isStrategyOnly && (
              <span className="px-3 py-1 rounded-full bg-[#F3E8FF] text-[#7E22CE] text-xs font-inter font-semibold">
                Development-Ready Strategy
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="font-onest text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#042718] leading-[1.15] mb-4">
            {caseStudy.title}
          </h1>

          {/* Subtitle */}
          <p className="font-inter text-lg sm:text-xl font-medium text-[#042718]/80 leading-relaxed mb-6">
            {caseStudy.subtitle}
          </p>

          {/* Role and Timeline */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-inter text-[#042718]/60 border-t border-b border-[#042718]/8 py-4 mb-8">
            <div>
              <span className="font-semibold text-[#042718]">Role: </span>
              <span>{caseStudy.role}</span>
            </div>
            <div className="hidden sm:block text-[#042718]/20">•</div>
            <div>
              <span className="font-semibold text-[#042718]">Timeline: </span>
              <span>{caseStudy.timeline}</span>
            </div>
          </div>

          {/* Thesis Callout */}
          <div className="p-6 rounded-[20px] bg-[#F4FAFA] border border-[#042718]/8 mb-8">
            <div className="flex items-center gap-2 text-xs font-inter font-semibold uppercase tracking-wider text-[#188E39] mb-2">
              <Sparkles size={14} />
              <span>Core Product Thesis</span>
            </div>
            <p className="font-onest text-lg sm:text-xl font-bold text-[#042718] leading-snug">
              "{caseStudy.thesis}"
            </p>
            {caseStudy.centralQuestion && (
              <p className="font-inter text-sm text-[#042718]/70 mt-3 pt-3 border-t border-[#042718]/8">
                <span className="font-semibold text-[#042718]">Central Question: </span>
                {caseStudy.centralQuestion}
              </p>
            )}
          </div>

          {/* Strategy Status Callout if applicable */}
          {caseStudy.statusNotice && (
            <div className="p-4 rounded-[16px] bg-[#F3E8FF]/40 border border-[#7E22CE]/20 flex items-start gap-3 text-xs sm:text-sm font-inter text-[#6B21A8] mb-8">
              <AlertTriangle size={18} className="shrink-0 text-[#7E22CE] mt-0.5" />
              <span>{caseStudy.statusNotice}</span>
            </div>
          )}

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-[20px] bg-white border border-[#042718]/8 shadow-2xs">
            {caseStudy.keyStats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="font-onest text-2xl sm:text-3xl font-bold text-[#042718]">
                  {stat.value}
                </span>
                <span className="font-inter text-xs font-semibold text-[#042718]/90 mt-0.5">
                  {stat.label}
                </span>
                {stat.detail && (
                  <span className="font-inter text-[11px] text-[#042718]/50 mt-0.5">
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
                    <span className="font-onest text-sm font-bold text-[#188E39]">
                      {sec.number}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#042718]/30" />
                    <span className="font-inter text-xs uppercase tracking-wider text-[#042718]/50 font-semibold">
                      {sec.title.split(":")[0]}
                    </span>
                  </div>
                  <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718] leading-tight">
                    {sec.title.includes(":") ? sec.title.split(":")[1].trim() : sec.title}
                  </h2>
                  {sec.subtitle && (
                    <p className="font-inter text-base text-[#042718]/70 mt-1 font-medium">
                      {sec.subtitle}
                    </p>
                  )}
                </div>

                {/* Narrative Paragraphs */}
                <div className="flex flex-col gap-4 font-inter text-base sm:text-lg text-[#042718]/80 leading-relaxed mb-6 font-normal">
                  {sec.content.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {/* Workflow Steps Diagram */}
                {sec.workflowSteps && (
                  <div className="my-8 p-6 rounded-[20px] bg-white border border-[#042718]/10 shadow-2xs">
                    <span className="text-xs font-inter font-semibold uppercase tracking-wider text-[#042718]/50 block mb-4">
                      Execution Flow
                    </span>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 relative">
                      {sec.workflowSteps.map((step, sIdx) => (
                        <div key={sIdx} className="flex-1 flex flex-col items-start bg-[#FAFDFB] p-3.5 rounded-xl border border-[#042718]/6">
                          <span className="text-[11px] font-onest font-bold text-[#188E39]">
                            STEP 0{sIdx + 1}
                          </span>
                          <span className="font-onest text-sm font-bold text-[#042718] mt-0.5">
                            {step.label}
                          </span>
                          {step.desc && (
                            <span className="font-inter text-[11px] text-[#042718]/60 mt-1 leading-tight">
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
                    <div className="p-6 rounded-[20px] bg-[#FEF2F2] border border-[#FCA5A5]/30">
                      <span className="text-xs font-inter font-bold uppercase tracking-wider text-[#DC2626] block mb-3">
                        {sec.comparison.before.title}
                      </span>
                      <ul className="flex flex-col gap-2.5">
                        {sec.comparison.before.steps.map((st, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-inter text-[#991B1B]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] mt-1.5 shrink-0" />
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-6 rounded-[20px] bg-[#ECFDF5] border border-[#6EE7B7]/40">
                      <span className="text-xs font-inter font-bold uppercase tracking-wider text-[#059669] block mb-3">
                        {sec.comparison.after.title}
                      </span>
                      <ul className="flex flex-col gap-2.5">
                        {sec.comparison.after.steps.map((st, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm font-inter text-[#065F46] font-medium">
                            <CheckCircle2 size={15} className="text-[#059669] mt-0.5 shrink-0" />
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Evaluation Table if present */}
                {sec.evaluationTable && sec.evaluationTable.length > 0 && (
                  <div className="my-8 rounded-[20px] bg-white border border-[#042718]/10 shadow-2xs overflow-hidden">
                    <div className="p-5 sm:p-6 border-b border-[#042718]/8 flex flex-wrap items-center justify-between gap-3 bg-[#FAFDFB]">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-inter font-semibold uppercase tracking-wider text-[#188E39]">
                          <Sparkles size={14} />
                          <span>Evaluation Benchmark Matrix</span>
                        </div>
                        <h3 className="font-onest text-lg sm:text-xl font-bold text-[#042718] mt-1">
                          Golden Test Set ({sec.evaluationTable.length} Questions)
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-inter font-medium text-[#042718]/70">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECFDF5] text-[#065F46] font-semibold">
                          <CheckCircle2 size={13} />
                          <span>95% Pass Rate (19/20)</span>
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#042718]/5 text-[#042718]/80 font-semibold">
                          <span>0% Hallucinations</span>
                        </span>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs sm:text-sm">
                        <thead>
                          <tr className="border-b border-[#042718]/8 bg-[#042718]/[0.02] text-[#042718]/60 font-inter font-semibold">
                            <th className="py-3 px-4 w-12 text-center">#</th>
                            <th className="py-3 px-4 min-w-[220px]">Test Query</th>
                            <th className="py-3 px-4 min-w-[130px]">Category</th>
                            <th className="py-3 px-4 min-w-[180px]">Target Ground Source</th>
                            <th className="py-3 px-4 text-center w-24">Cosine Sim</th>
                            <th className="py-3 px-4 text-center w-28">Status</th>
                            <th className="py-3 px-4 min-w-[240px]">Verification Notes</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#042718]/6 font-inter">
                          {sec.evaluationTable.map((row) => (
                            <tr key={row.id} className="hover:bg-[#FAFDFB] transition-colors">
                              <td className="py-3 px-4 text-center font-mono text-xs text-[#042718]/50">
                                {String(row.id).padStart(2, "0")}
                              </td>
                              <td className="py-3 px-4 font-medium text-[#042718]">
                                "{row.query}"
                              </td>
                              <td className="py-3 px-4">
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#042718]/5 text-[#042718]/80">
                                  {row.category}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-xs text-[#042718]/70">
                                {row.groundTruthSource}
                              </td>
                              <td className="py-3 px-4 text-center font-mono text-xs font-semibold text-[#042718]">
                                {row.similarity.toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span
                                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                                    row.status === "Pass"
                                      ? "bg-[#ECFDF5] text-[#065F46]"
                                      : row.status.includes("Fallback")
                                      ? "bg-[#FEF3C7] text-[#92400E]"
                                      : "bg-[#FEF2F2] text-[#991B1B]"
                                  }`}
                                >
                                  {row.status === "Pass" ? (
                                    <CheckCircle2 size={12} />
                                  ) : (
                                    <AlertTriangle size={12} />
                                  )}
                                  <span>{row.status}</span>
                                </span>
                              </td>
                              <td className="py-3 px-4 text-xs text-[#042718]/70 leading-relaxed">
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
                        className="p-5 rounded-[18px] bg-white border border-[#042718]/8 shadow-2xs"
                      >
                        <h4 className="font-onest text-base font-bold text-[#042718] mb-1.5 flex items-center gap-2">
                          <CheckCircle2 size={16} className="text-[#188E39] shrink-0" />
                          <span>{h.title}</span>
                        </h4>
                        <p className="font-inter text-xs sm:text-sm text-[#042718]/70 leading-relaxed">
                          {h.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Reflection Quote */}
                {sec.quote && (
                  <div className="my-8 p-6 sm:p-8 rounded-[24px] bg-[#042718] text-white relative overflow-hidden">
                    <Quote size={32} className="text-[#188E39]/40 mb-3" />
                    <p className="font-onest text-lg sm:text-xl font-medium leading-relaxed italic text-white/95">
                      "{sec.quote}"
                    </p>
                    <span className="block font-inter text-xs text-[#A7F3D0] mt-4 font-semibold uppercase tracking-wider">
                      Deepak Prasad · Product Philosophy
                    </span>
                  </div>
                )}

                <div className="w-full h-px bg-[#042718]/8 mt-12" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PREVIOUS / NEXT CASE STUDY PAGINATION
          ========================================================================= */}
      <section className="py-12 bg-white border-t border-[#042718]/8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            type="button"
            onClick={() => {
              onNavigate(`/work/${prevStudy.slug}`);
            }}
            className="flex items-center gap-3 text-left p-4 rounded-xl hover:bg-[#FAFDFB] border border-transparent hover:border-[#042718]/10 transition-all cursor-pointer w-full sm:w-auto"
          >
            <ArrowLeft size={20} className="text-[#188E39]" />
            <div>
              <span className="text-[11px] font-inter font-semibold uppercase tracking-wider text-[#042718]/40 block">
                Previous Case
              </span>
              <span className="font-onest font-bold text-sm text-[#042718]">
                {prevStudy.title}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="text-xs font-inter font-semibold text-[#042718]/60 hover:text-[#042718] transition-colors"
          >
            All Case Studies
          </button>

          <button
            type="button"
            onClick={() => {
              onNavigate(`/work/${nextStudy.slug}`);
            }}
            className="flex items-center justify-end gap-3 text-right p-4 rounded-xl hover:bg-[#FAFDFB] border border-transparent hover:border-[#042718]/10 transition-all cursor-pointer w-full sm:w-auto"
          >
            <div>
              <span className="text-[11px] font-inter font-semibold uppercase tracking-wider text-[#042718]/40 block">
                Next Case
              </span>
              <span className="font-onest font-bold text-sm text-[#042718]">
                {nextStudy.title}
              </span>
            </div>
            <ArrowRight size={20} className="text-[#188E39]" />
          </button>
        </div>
      </section>
    </div>
  );
}
