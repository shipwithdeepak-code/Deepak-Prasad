import React from "react";
import { coverFor } from "../../../utils/covers";
import { AI_BUILDS, COPILOT_PIPELINE } from "../../../data/homeV3";

interface AIBuildsProps {
  onNavigate: (path: string) => void;
  onAsk: (question?: string) => void;
}

/**
 * The two products I wrote myself, and the architecture of the one that is
 * running on this page.
 *
 * The architecture row is the point of the section. Every portfolio can claim
 * an AI project; this one shows the retrieval path, says there is no vector
 * database, and states what happens when a question falls outside the record.
 */
export default function AIBuilds({ onNavigate, onAsk }: AIBuildsProps) {
  return (
    <section
      id="ai-builds"
      className="v3-atmos v3-atmos-coral border-y border-hairline bg-ink py-[104px]"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-10 grid max-w-[60ch] gap-3.5">
          <h2 className="text-[clamp(1.6rem,3.2vw,2.25rem)] font-normal leading-[1.17] tracking-[.22px] text-pure-white">
            Two products I designed and wrote myself.
          </h2>
          <p className="text-base leading-relaxed text-ash">
            One of them is answering questions at the top of this page.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {AI_BUILDS.map((build) => {
            const cover = build.coverSlug ? coverFor(build.coverSlug) : undefined;
            const act = () =>
              build.action.kind === "copilot"
                ? onAsk(build.action.question)
                : onNavigate(build.action.path);
            return (
              <article
                key={build.name}
                className="relative isolate grid min-h-[340px] content-end gap-3 overflow-hidden rounded-[20px] bg-ink p-6"
                /* A build with no cover art gets a coral wash rather than a
                   stand-in image: it fills the frame without implying a
                   screenshot of something that is not finished. */
                style={
                  cover
                    ? undefined
                    : {
                        background:
                          "radial-gradient(86% 70% at 22% 0%, rgba(255,99,99,.14), transparent 64%), #07080a",
                      }
                }
              >
                {cover && (
                  <img
                    src={cover}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 -z-20 size-full object-cover opacity-50"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -z-10"
                  style={{
                    background:
                      "linear-gradient(0deg, rgba(4,5,6,.94) 20%, rgba(4,5,6,.35) 75%)",
                  }}
                />
                <span
                  aria-hidden="true"
                  className="v3-key pointer-events-none absolute inset-0 rounded-[20px]"
                />
                {/* Quiet, not loud. Two coral fills side by side would make
                    the badges the section rather than the products. */}
                <span className="v3-key-quiet absolute left-6 top-6 inline-flex items-center gap-2 rounded-md px-2 py-1 font-mono text-[10px] font-medium text-mist">
                  <span
                    aria-hidden="true"
                    className="block size-1.5 rounded-full bg-coral-pulse"
                  />
                  BUILT BY ME, {build.status.toUpperCase()}
                </span>

                <h3 className="text-2xl font-normal leading-[1.17] text-pure-white">
                  {build.name}
                </h3>
                <p className="max-w-[44ch] text-[15px] leading-relaxed text-ash">
                  {build.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {build.facts.map((fact) => (
                    <span
                      key={fact}
                      className="rounded-md bg-graphite px-[7px] py-1 font-mono text-[10.5px] tracking-[.05em] text-mist"
                    >
                      {fact}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={act}
                  className="mt-1 justify-self-start text-[13px] font-medium text-coral-pulse underline-offset-4 hover:underline"
                >
                  {build.action.kind === "copilot"
                    ? "Ask Dipa about it"
                    : "Read how it was built"}
                </button>
              </article>
            );
          })}
        </div>

        <div className="v3-key-quiet mt-4 rounded-2xl bg-obsidian p-5">
          <p className="mb-3.5 font-mono text-[11px] uppercase leading-[.91] tracking-[.8px] text-smoke">
            How Dipa works
          </p>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11.5px] text-ash">
            {COPILOT_PIPELINE.map((step, i) => (
              <React.Fragment key={step}>
                {i > 0 && (
                  <span aria-hidden="true" className="text-coral-pulse">
                    &rarr;
                  </span>
                )}
                <b className="rounded-md bg-graphite px-[9px] py-[5px] font-medium text-pure-white">
                  {step}
                </b>
              </React.Fragment>
            ))}
          </div>
          <p className="mt-3.5 max-w-[76ch] text-sm leading-relaxed text-ash">
            No vector database. Dipa's chunks are my own case studies,
            embedded once at build time and scored in memory on every
            question.
            Retrieval time is measured per query and shown with the answer. If a
            question falls outside what the record covers, it says so rather
            than inventing one.
          </p>
        </div>
      </div>
    </section>
  );
}
