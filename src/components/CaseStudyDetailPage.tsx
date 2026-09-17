import React, { useEffect } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CaseStudyDetail } from "../types";
import { ALL_FLAGSHIP_CASE_STUDIES } from "../data/caseStudies";
import { coverFor } from "../utils/covers";
import { ImageSlot, Panel, Tag } from "./site/v3/primitives";

interface CaseStudyDetailPageProps {
  caseStudy: CaseStudyDetail;
  onNavigate: (path: string) => void;
}

const EYEBROW =
  "font-mono text-[10.5px] uppercase leading-[.91] tracking-[.8px] text-smoke";

/**
 * One product, at full length.
 *
 * The page is a column, not a dashboard: the decision spine and the narrative
 * are prose with room around them, and the only things allowed to interrupt
 * are the ones that carry information a paragraph cannot, which is the stats
 * bar, the flow, the before and after, and the evaluation table.
 */
export default function CaseStudyDetailPage({
  caseStudy,
  onNavigate,
}: CaseStudyDetailPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [caseStudy.id]);

  const index = ALL_FLAGSHIP_CASE_STUDIES.findIndex(
    (c) => c.id === caseStudy.id,
  );
  const prevStudy =
    ALL_FLAGSHIP_CASE_STUDIES[
      (index - 1 + ALL_FLAGSHIP_CASE_STUDIES.length) %
        ALL_FLAGSHIP_CASE_STUDIES.length
    ];
  const nextStudy =
    ALL_FLAGSHIP_CASE_STUDIES[(index + 1) % ALL_FLAGSHIP_CASE_STUDIES.length];

  const scope = caseStudy.scope;
  const spine = caseStudy.decisionSpine;
  const spineIsReady = Boolean(spine?.decision?.trim() && spine?.outcome?.trim());
  const cover = coverFor(caseStudy.slug);

  const meta = [
    { label: "Role", value: caseStudy.role },
    { label: "Timeline", value: caseStudy.timeline },
    scope?.team ? { label: "Team", value: scope.team } : null,
    scope?.reportedTo ? { label: "Reported to", value: scope.reportedTo } : null,
    scope?.ownership ? { label: "Owned", value: scope.ownership } : null,
    scope?.collaborators
      ? { label: "With", value: scope.collaborators }
      : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <div className="bg-void-black">
      <section className="v3-atmos v3-atmos-coral border-b border-hairline pt-10 md:pt-14">
        <div className="mx-auto max-w-[900px] px-6 pb-16 md:pb-20">
          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.05em] text-smoke transition-colors duration-200 hover:text-pure-white"
          >
            <ArrowLeft className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
            Back to the work
          </button>

          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className={EYEBROW.replace("text-smoke", "text-coral-pulse")}>
              Case {caseStudy.number}, {caseStudy.category}
            </span>
            {caseStudy.isStrategyOnly && (
              <span className={EYEBROW}>Development ready strategy</span>
            )}
          </div>

          <h1 className="mb-4 text-[clamp(2rem,4.4vw,3rem)] font-normal leading-[1.14] tracking-[.22px] text-pure-white">
            {caseStudy.title}
          </h1>
          <p className="mb-8 max-w-[68ch] text-[17px] leading-relaxed text-ash">
            {caseStudy.subtitle}
          </p>

          {cover && (
            <div className="mb-8 overflow-hidden rounded-2xl">
              <img
                src={cover}
                alt=""
                className="aspect-[21/9] w-full object-cover"
              />
            </div>
          )}

          <dl className="mb-8 grid gap-x-8 gap-y-3 border-y border-hairline py-5 sm:grid-cols-2">
            {meta.map((fact) => (
              <div key={fact.label} className="grid gap-1">
                <dt className={EYEBROW}>{fact.label}</dt>
                <dd className="text-[13.5px] leading-relaxed text-mist">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>

          <Panel loud className="mb-6 bg-ink p-6">
            <span className={`${EYEBROW} mb-2 block`}>The thesis</span>
            <p className="text-xl leading-snug text-pure-white">
              {caseStudy.thesis}
            </p>
            {caseStudy.centralQuestion && (
              <p className="mt-3 border-t border-hairline pt-3 text-sm leading-relaxed text-ash">
                <span className="text-mist">The question: </span>
                {caseStudy.centralQuestion}
              </p>
            )}
          </Panel>

          {caseStudy.statusNotice && (
            <p className="mb-6 rounded-xl bg-ember-hush/40 px-4 py-3 text-sm leading-relaxed text-mist ring-1 ring-coral-pulse/30">
              {caseStudy.statusNotice}
            </p>
          )}

          <Panel className="grid grid-cols-2 gap-6 bg-ink p-6 md:grid-cols-4">
            {caseStudy.keyStats.map((stat) => (
              <div key={stat.label} className="grid gap-1">
                <span className="text-2xl font-normal text-coral-pulse">
                  {stat.value}
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[.05em] text-mist">
                  {stat.label}
                </span>
                {stat.detail && (
                  <span className="text-[11px] leading-relaxed text-smoke">
                    {stat.detail}
                  </span>
                )}
              </div>
            ))}
          </Panel>

          <div className="mt-6 flex flex-wrap gap-2">
            {caseStudy.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </section>

      {spineIsReady && (
        <section
          id="decisions"
          className="scroll-mt-24 border-b border-hairline bg-ink py-14 md:py-20"
        >
          <div className="mx-auto max-w-[900px] px-6">
            <span className={`${EYEBROW} mb-2 block`}>The decision</span>
            <h2 className="mb-8 text-[clamp(1.6rem,3.2vw,2.25rem)] font-normal leading-[1.17] text-pure-white">
              What I chose, and what I turned down.
            </h2>

            <dl className="grid gap-8">
              {spine?.context?.trim() && (
                <div>
                  <dt className={`${EYEBROW} mb-2`}>01 Context</dt>
                  <dd className="text-[17px] leading-relaxed text-ash">
                    {spine.context}
                  </dd>
                </div>
              )}

              {spine?.constraint?.trim() && (
                <div>
                  <dt className={`${EYEBROW} mb-2`}>02 The constraint</dt>
                  <dd className="border-l-2 border-coral-pulse pl-4 text-[17px] leading-relaxed text-mist">
                    {spine.constraint}
                  </dd>
                </div>
              )}

              {spine?.optionsRejected && spine.optionsRejected.length > 0 && (
                <div>
                  <dt className={`${EYEBROW} mb-3`}>03 Options I rejected</dt>
                  <dd className="grid gap-3">
                    {spine.optionsRejected.map((opt) => (
                      <Panel key={opt.option} className="p-4">
                        <p className="text-base font-medium text-pure-white">
                          {opt.option}
                        </p>
                        <p className="mt-1 text-[15px] leading-relaxed text-ash">
                          {opt.why}
                        </p>
                      </Panel>
                    ))}
                  </dd>
                </div>
              )}

              <div>
                <dt className={`${EYEBROW.replace("text-smoke", "text-coral-pulse")} mb-2`}>
                  04 What I decided
                </dt>
                <dd>
                  <p className="text-xl leading-snug text-pure-white">
                    {spine?.decision}
                  </p>
                  {spine?.rationale?.trim() && (
                    <p className="mt-3 text-[17px] leading-relaxed text-ash">
                      {spine.rationale}
                    </p>
                  )}
                </dd>
              </div>

              <div>
                <dt className={`${EYEBROW} mb-2`}>05 What happened</dt>
                <dd className="text-[17px] leading-relaxed text-ash">
                  {spine?.outcome}
                </dd>
              </div>

              {spine?.retrospect?.trim() && (
                <div>
                  <dt className={`${EYEBROW} mb-2`}>
                    06 What I would do differently
                  </dt>
                  <dd className="text-[17px] leading-relaxed text-ash">
                    {spine.retrospect}
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-[900px] gap-16 px-6 md:gap-20">
          {caseStudy.sections.map((sec) => {
            const hasVisual = Boolean(
              sec.workflowSteps || sec.comparison || sec.evaluationTable,
            );
            return (
              <article key={sec.id} id={sec.id} className="min-w-0 scroll-mt-24">
                <div className="mb-6 grid gap-2">
                  <span className={EYEBROW}>{sec.title.split(":")[0]}</span>
                  <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-normal leading-[1.17] text-pure-white">
                    {sec.title.includes(":")
                      ? sec.title.split(":")[1].trim()
                      : sec.title}
                  </h2>
                  {sec.subtitle && (
                    <p className="text-base leading-relaxed text-mist/90">
                      {sec.subtitle}
                    </p>
                  )}
                </div>

                <div className="mb-6 grid gap-4 text-[17px] leading-relaxed text-ash">
                  {sec.content.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                </div>

                {sec.workflowSteps && (
                  <Panel className="my-8 bg-ink p-6">
                    <span className={`${EYEBROW} mb-4 block`}>The flow</span>
                    <div className="grid gap-3 sm:grid-flow-col sm:auto-cols-fr">
                      {sec.workflowSteps.map((step, i) => (
                        <div
                          key={step.label}
                          className="v3-key-quiet grid content-start gap-1 rounded-xl p-3.5"
                        >
                          <span className="font-mono text-[10px] text-coral-pulse">
                            0{i + 1}
                          </span>
                          <span className="text-sm font-medium text-pure-white">
                            {step.label}
                          </span>
                          {step.desc && (
                            <span className="text-[11px] leading-snug text-smoke">
                              {step.desc}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </Panel>
                )}

                {sec.comparison && (
                  <div className="my-8 grid gap-3 md:grid-cols-2">
                    <Panel className="bg-ink p-6">
                      <span className={`${EYEBROW} mb-3 block`}>
                        {sec.comparison.before.title}
                      </span>
                      <ul className="grid gap-2.5">
                        {sec.comparison.before.steps.map((st) => (
                          <li
                            key={st}
                            className="grid grid-cols-[auto_1fr] items-start gap-2 text-sm text-smoke"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 block size-1 rounded-full bg-smoke"
                            />
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </Panel>
                    <Panel loud className="bg-ink p-6">
                      <span
                        className={`${EYEBROW.replace("text-smoke", "text-coral-pulse")} mb-3 block`}
                      >
                        {sec.comparison.after.title}
                      </span>
                      <ul className="grid gap-2.5">
                        {sec.comparison.after.steps.map((st) => (
                          <li
                            key={st}
                            className="grid grid-cols-[auto_1fr] items-start gap-2 text-sm text-mist"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2 block size-1 rounded-full bg-coral-pulse"
                            />
                            <span>{st}</span>
                          </li>
                        ))}
                      </ul>
                    </Panel>
                  </div>
                )}

                {sec.evaluationTable && sec.evaluationTable.length > 0 && (
                  <Panel className="my-8 min-w-0 overflow-hidden bg-ink">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline p-6">
                      <div className="grid gap-1">
                        <span className={EYEBROW}>Golden set</span>
                        <h3 className="text-lg font-normal text-pure-white">
                          {sec.evaluationTable.length} questions, published with
                          the failures
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Tag>19/20 pass</Tag>
                        <Tag>0 hallucinations</Tag>
                      </div>
                    </div>

                    <div className="min-w-0 overflow-x-auto">
                      <table className="w-full border-collapse text-left text-sm">
                        <thead>
                          <tr className="border-b border-hairline bg-void-black/50 font-mono text-[10.5px] uppercase tracking-[.05em] text-smoke">
                            <th className="w-12 px-4 py-3 text-center">#</th>
                            <th className="min-w-[220px] px-4 py-3">Query</th>
                            <th className="min-w-[130px] px-4 py-3">Category</th>
                            <th className="min-w-[180px] px-4 py-3">Ground truth</th>
                            <th className="w-24 px-4 py-3 text-center">Cosine</th>
                            <th className="w-28 px-4 py-3 text-center">Status</th>
                            <th className="min-w-[240px] px-4 py-3">Notes</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-hairline">
                          {sec.evaluationTable.map((row) => (
                            <tr key={row.id}>
                              <td className="px-4 py-3 text-center font-mono text-xs text-smoke">
                                {String(row.id).padStart(2, "0")}
                              </td>
                              <td className="px-4 py-3 text-mist">{row.query}</td>
                              <td className="px-4 py-3 font-mono text-[11px] uppercase tracking-[.05em] text-smoke">
                                {row.category}
                              </td>
                              <td className="px-4 py-3 text-xs text-ash">
                                {row.groundTruthSource}
                              </td>
                              <td className="px-4 py-3 text-center font-mono text-xs text-mist">
                                {row.similarity.toFixed(2)}
                              </td>
                              <td className="px-4 py-3 text-center">
                                <span
                                  className={`font-mono text-[10.5px] uppercase tracking-[.05em] ${
                                    row.status === "Pass"
                                      ? "text-coral-pulse"
                                      : "text-smoke"
                                  }`}
                                >
                                  {row.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-xs leading-relaxed text-ash">
                                {row.notes}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Panel>
                )}

                {/* The data says this section has a diagram and nothing here
                    draws one. The slot names the picture that belongs in it
                    rather than quietly leaving a gap. */}
                {sec.diagramType && !hasVisual && (
                  <ImageSlot
                    className="my-8"
                    label={`${sec.title.split(":")[0]}: the ${sec.diagramType} this section describes.`}
                  />
                )}

                {sec.highlights && sec.highlights.length > 0 && (
                  <div className="my-6 grid gap-3 sm:grid-cols-2">
                    {sec.highlights.map((h) => (
                      <Panel key={h.title} className="bg-ink p-5">
                        <h3 className="mb-1.5 text-base font-medium text-pure-white">
                          {h.title}
                        </h3>
                        <p className="text-[13.5px] leading-relaxed text-ash">
                          {h.desc}
                        </p>
                      </Panel>
                    ))}
                  </div>
                )}

                {sec.quote && (
                  <Panel loud className="my-8 bg-ink p-6 sm:p-8">
                    <p className="text-xl leading-relaxed text-pure-white">
                      {sec.quote}
                    </p>
                    <span
                      className={`${EYEBROW.replace("text-smoke", "text-coral-pulse")} mt-4 block`}
                    >
                      Deepak Prasad
                    </span>
                  </Panel>
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-hairline py-12">
        <div className="mx-auto flex max-w-[900px] flex-wrap items-center justify-between gap-4 px-6">
          <button
            type="button"
            onClick={() => onNavigate(`/work/${prevStudy.slug}`)}
            className="v3-key-quiet grid max-w-[300px] gap-1 rounded-xl p-4 text-left transition-transform duration-200 hover:-translate-y-px"
          >
            <span className={`${EYEBROW} inline-flex items-center gap-2`}>
              <ArrowLeft className="size-3" strokeWidth={1.7} aria-hidden="true" />
              Previous
            </span>
            <span className="text-sm font-medium text-pure-white">
              {prevStudy.title}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate("/work")}
            className="inline-flex items-center gap-2 text-[13px] font-medium text-coral-pulse"
          >
            All the work
            <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate(`/work/${nextStudy.slug}`)}
            className="v3-key-quiet grid max-w-[300px] gap-1 rounded-xl p-4 text-right transition-transform duration-200 hover:-translate-y-px"
          >
            <span className={`${EYEBROW} inline-flex items-center justify-end gap-2`}>
              Next
              <ArrowRight className="size-3" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <span className="text-sm font-medium text-pure-white">
              {nextStudy.title}
            </span>
          </button>
        </div>
      </section>
    </div>
  );
}
