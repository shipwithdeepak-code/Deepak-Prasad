import React, { useEffect } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Scale,
  Users,
  Brain,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  CheckCircle2,
  FileCheck2,
} from "lucide-react";
import { PRODUCT_JURY_LIVE_URL } from "../utils/productJury";

interface ProductJuryPageProps {
  onNavigate: (path: string) => void;
}

export default function ProductJuryPage({ onNavigate }: ProductJuryPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <article
      id="product-jury-article"
      className="relative min-h-screen bg-[#040506] text-[#FAF7F0] selection:bg-[#F0977A] selection:text-[#040506]"
    >
      {/* Warm coral atmospheric lighting - subtle obsidian glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[560px] w-[1000px] -translate-x-1/2 rounded-full bg-[#F0977A]/[0.025] blur-[140px]"
      />

      <div className="mx-auto max-w-[760px] px-6 pt-16 pb-28 sm:pt-24 sm:pb-36">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="mb-10 flex items-center justify-between gap-4 border-b border-white/[0.07] pb-6">
          <button
            type="button"
            onClick={() => onNavigate("/")}
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#9C9A95] transition-colors hover:text-[#FAF7F0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0977A]/80 focus-visible:rounded"
          >
            <ArrowLeft
              className="size-3.5 transition-transform group-hover:-translate-x-1"
              strokeWidth={1.8}
              aria-hidden="true"
            />
            <span>Back to portfolio</span>
          </button>

          <a
            href={PRODUCT_JURY_LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.04] px-3.5 py-1.5 font-mono text-[11px] font-medium text-[#FAF7F0] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-all duration-200 hover:border-[#F0977A]/50 hover:bg-[#F0977A]/[0.08] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0977A]/80"
          >
            <span>Try Product Jury</span>
            <ArrowUpRight className="size-3 text-[#F0977A]" strokeWidth={2} />
          </a>
        </div>

        {/* Header Eyebrow & Title */}
        <header className="mb-14">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#F0977A]/25 bg-[#F0977A]/[0.06] px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-[#F0977A]">
            <span className="size-1.5 rounded-full bg-[#F0977A]" />
            Architecture & Product Essay
          </div>

          <h1 className="text-[clamp(2.1rem,4.2vw,3.25rem)] font-normal leading-[1.12] tracking-[-0.02em] text-[#FAF7F0]">
            Product Jury: A Multi-Agent Decision Workspace
          </h1>

          <p className="mt-5 text-[18px] leading-relaxed text-[#B0AEA8]">
            Challenging product assumptions before committing engineering cycles.
            How a five-seat panel of specialist agents interrogates product decisions
            from divergent perspectives.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 border-y border-white/[0.07] py-3.5 font-mono text-[11px] text-[#85837D]">
            <span>Deepak Prasad</span>
            <span className="text-white/20">•</span>
            <span>Senior Product Manager</span>
            <span className="text-white/20">•</span>
            <span>Stack: Gemini Pro & Flash, Structured Schemas, TypeScript</span>
          </div>
        </header>

        {/* Main Article Content */}
        <div className="space-y-14 text-[16px] leading-[1.75] text-[#D2CFC9]">
          {/* Section 1: Overview */}
          <section aria-labelledby="section-overview">
            <h2
              id="section-overview"
              className="text-[24px] font-normal tracking-[-0.015em] text-[#FAF7F0] mb-4"
            >
              1. Product Jury Overview
            </h2>
            <p>
              Product Jury is a specialized decision-testing workspace built for product leaders,
              founders, and teams who need rigorous pushback on strategic bets before handing
              requirements to engineering.
            </p>
            <p className="mt-4">
              Instead of relying on single-prompt LLM feedback—which tends to agree with the author,
              smooth over hard edge cases, and flatter the proposal—Product Jury constructs an
              adversarial deliberation bench. Five specialist agents with conflicting operational
              incentives examine the proposal simultaneously, debate points of friction, demand
              concrete evidence, and yield an actionable decision report.
            </p>
          </section>

          {/* Section 2: Why I Built It */}
          <section aria-labelledby="section-why-built">
            <h2
              id="section-why-built"
              className="text-[24px] font-normal tracking-[-0.015em] text-[#FAF7F0] mb-4"
            >
              2. Why I Built It
            </h2>
            <p>
              Over seven years managing products across hardware telemetry, B2B marketplaces, and
              consumer subscriptions, I noticed a repeating failure mode in product organizations:
              decisions are rarely killed or stress-tested at the brief stage.
            </p>
            <p className="mt-4">
              Cross-functional reviews often suffer from social dynamics. Engineers are hesitant to
              challenge strategic assumptions early; business stakeholders focus on projected
              upside without scrutinizing technical debt; researchers point out friction that gets
              deprioritized in rush-to-ship cultures; and leadership often operates on intuitive
              conviction without rigorous falsification criteria.
            </p>
            <p className="mt-4">
              I built Product Jury to simulate the sharpest, most constructive cross-functional room
              imaginable—one available at 11 PM when writing a PRD, before a team commits three
              sprints to a feature that should have been reshaped or discarded.
            </p>
          </section>

          {/* Section 3: The Product Problem */}
          <section aria-labelledby="section-product-problem">
            <h2
              id="section-product-problem"
              className="text-[24px] font-normal tracking-[-0.015em] text-[#FAF7F0] mb-4"
            >
              3. The Core Product Problem
            </h2>
            <div className="rounded-[16px] border border-white/[0.08] bg-[#0E0F14]/90 p-5 font-mono text-[13px] text-[#B0AEA8]">
              <div className="text-[#F0977A] font-medium mb-1">The Sycophancy Defect in Generic AI:</div>
              "Standard LLM assistants default to agreeable synthesis. When asked 'What do you think of this product idea?',
              they provide encouragement, summarize the author's own premises, and append surface-level suggestions.
              True product strategy requires structured dissent."
            </div>
            <p className="mt-5">
              The goal was not to generate generic pros and cons, but to force a collision between
              incompatible perspectives. A feature that delights a user might crush unit economics.
              An architecture that solves an edge case cleanly might bloat the release timeline
              beyond the commercial window. Product Jury surfaces those irreconcilable tensions
              explicitly.
            </p>
          </section>

          {/* Section 4: How Five-Agent Deliberation Works */}
          <section aria-labelledby="section-deliberation">
            <h2
              id="section-deliberation"
              className="text-[24px] font-normal tracking-[-0.015em] text-[#FAF7F0] mb-4"
            >
              4. How the Five-Agent Deliberation Works
            </h2>
            <p>
              Deliberation does not occur in a chaotic group chat where agents ramble over one
              another. It executes in four disciplined phases:
            </p>
            <ol className="mt-4 space-y-4 pl-5 list-decimal text-[#B0AEA8]">
              <li>
                <strong className="text-[#FAF7F0]">Independent Examination:</strong> Each specialist
                agent reads the raw product brief and extracts assumptions directly related to their
                domain, generating a first-order assessment with a confidence rating and flagged risks.
              </li>
              <li>
                <strong className="text-[#FAF7F0]">Cross-Seat Interrogation:</strong> Agents review
                their peers’ initial assessments. The Engineering specialist challenges the UX
                specialist's interaction requirements; the Business specialist interrogates the
                evidence threshold raised by the Data specialist.
              </li>
              <li>
                <strong className="text-[#FAF7F0]">Rebuttal & Compromise Testing:</strong> Each seat
                must defend their non-negotiable constraints and name what minimal evidence or scope
                reduction would satisfy their objections.
              </li>
              <li>
                <strong className="text-[#FAF7F0]">Deliberation Verdict:</strong> A neutral
                synthesizer aggregates consensus, records unresolved dissents, calculates a Decision
                Readiness Score, and compiles clear "Go / No-Go / Pivot" conditions.
              </li>
            </ol>
          </section>

          {/* Section 5: The Role of Each Specialist Agent */}
          <section aria-labelledby="section-specialists">
            <h2
              id="section-specialists"
              className="text-[24px] font-normal tracking-[-0.015em] text-[#FAF7F0] mb-4"
            >
              5. The Specialist Seats
            </h2>
            <p className="mb-6">
              Each juror seat is defined by strict operational mandates, evaluation rubrics, and
              refusal triggers:
            </p>

            <div className="space-y-4">
              <div className="rounded-[16px] border border-white/[0.08] bg-[#0A0B10]/80 p-5 transition-colors hover:border-white/[0.14]">
                <div className="flex items-center gap-2.5 mb-2">
                  <Users className="size-4 text-[#F0977A]" />
                  <h3 className="font-mono text-[14px] uppercase tracking-[0.06em] text-[#FAF7F0]">
                    Seat 01: UX & User Advocacy
                  </h3>
                </div>
                <p className="text-[14px] leading-relaxed text-[#9C9A95]">
                  Focuses on user mental models, cognitive load, adoption friction, and value
                  discovery. Identifies where product complexity is being offloaded onto user
                  effort.
                </p>
              </div>

              <div className="rounded-[16px] border border-white/[0.08] bg-[#0A0B10]/80 p-5 transition-colors hover:border-white/[0.14]">
                <div className="flex items-center gap-2.5 mb-2">
                  <TrendingUp className="size-4 text-[#F0977A]" />
                  <h3 className="font-mono text-[14px] uppercase tracking-[0.06em] text-[#FAF7F0]">
                    Seat 02: Product Strategy & Moat
                  </h3>
                </div>
                <p className="text-[14px] leading-relaxed text-[#9C9A95]">
                  Examines positioning, differentiation, defensibility, and opportunity cost.
                  Questions whether this feature advances a long-term strategic advantage or simply
                  matches a competitor's minor feature.
                </p>
              </div>

              <div className="rounded-[16px] border border-white/[0.08] bg-[#0A0B10]/80 p-5 transition-colors hover:border-white/[0.14]">
                <div className="flex items-center gap-2.5 mb-2">
                  <FileCheck2 className="size-4 text-[#F0977A]" />
                  <h3 className="font-mono text-[14px] uppercase tracking-[0.06em] text-[#FAF7F0]">
                    Seat 03: Evidence & Data Quality
                  </h3>
                </div>
                <p className="text-[14px] leading-relaxed text-[#9C9A95]">
                  Challenges telemetry validity, sample bias, and vanity metrics. Separates
                  correlative signals from causal customer pain and mandates guardrail metrics
                  before shipping.
                </p>
              </div>

              <div className="rounded-[16px] border border-white/[0.08] bg-[#0A0B10]/80 p-5 transition-colors hover:border-white/[0.14]">
                <div className="flex items-center gap-2.5 mb-2">
                  <Cpu className="size-4 text-[#F0977A]" />
                  <h3 className="font-mono text-[14px] uppercase tracking-[0.06em] text-[#FAF7F0]">
                    Seat 04: Engineering Feasibility & Systems
                  </h3>
                </div>
                <p className="text-[14px] leading-relaxed text-[#9C9A95]">
                  Assesses state complexity, distributed latency, external API reliability, and
                  technical maintenance debt. Flags impossible SLA promises and architectural
                  single points of failure.
                </p>
              </div>

              <div className="rounded-[16px] border border-white/[0.08] bg-[#0A0B10]/80 p-5 transition-colors hover:border-white/[0.14]">
                <div className="flex items-center gap-2.5 mb-2">
                  <Scale className="size-4 text-[#F0977A]" />
                  <h3 className="font-mono text-[14px] uppercase tracking-[0.06em] text-[#FAF7F0]">
                    Seat 05: Business & Unit Economics
                  </h3>
                </div>
                <p className="text-[14px] leading-relaxed text-[#9C9A95]">
                  Evaluates monetization impact, pricing power, CAC/LTV dynamics, and customer
                  cannibalization risks. Insists on a clear path to economic durability.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Evidence & Evaluation Approach */}
          <section aria-labelledby="section-evidence">
            <h2
              id="section-evidence"
              className="text-[24px] font-normal tracking-[-0.015em] text-[#FAF7F0] mb-4"
            >
              6. Evidence & Evaluation Approach
            </h2>
            <p>
              A major vulnerability of LLM workflows is hallucinated evidence. In Product Jury,
              jurors are strictly prohibited from inventing customer quotes, benchmark numbers,
              or industry statistics.
            </p>
            <p className="mt-4">
              When an argument hinges on an empirical premise (e.g., "Users will churn if pricing
              is annual-only"), the Evidence juror must classify that claim into one of three
              evidentiary tiers:
            </p>
            <ul className="mt-3 space-y-2 pl-5 list-disc text-[#B0AEA8]">
              <li>
                <span className="text-[#FAF7F0] font-medium">Empirical Fact:</span> Directly backed by
                telemetry, research transcripts, or historical experiments provided in the brief.
              </li>
              <li>
                <span className="text-[#FAF7F0] font-medium">Documented Hypothesis:</span> An explicit
                assumption identified by the team that requires validation testing.
              </li>
              <li>
                <span className="text-[#FAF7F0] font-medium">Unsubstantiated Speculation:</span> A blind
                leap of faith that requires immediate falsification before implementation.
              </li>
            </ul>
          </section>

          {/* Section 7: Architecture Overview */}
          <section aria-labelledby="section-architecture">
            <h2
              id="section-architecture"
              className="text-[24px] font-normal tracking-[-0.015em] text-[#FAF7F0] mb-4"
            >
              7. Technical Architecture Overview
            </h2>
            <p>
              Product Jury is powered by Gemini Pro for high-dimensional analytical reasoning and
              Gemini Flash for rapid round-robin cross-examination steps:
            </p>

            <div className="my-6 rounded-[18px] border border-white/[0.08] bg-[#0B0C10] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#9C9A95] mb-4">
                Pipeline Topology
              </div>
              <div className="flex flex-col gap-2.5 font-mono text-[12px] text-[#B0AEA8]">
                <div className="rounded-lg border border-white/[0.06] bg-[#121318] p-3">
                  <span className="text-[#F0977A]">Input Brief</span> → Structured Schema Parsing
                  & Scope Extraction
                </div>
                <div className="flex justify-center text-[#85837D]">&darr;</div>
                <div className="rounded-lg border border-white/[0.06] bg-[#121318] p-3">
                  <span className="text-[#FAF7F0]">Parallel Seat Generation</span> (5 concurrent Gemini
                  workers with divergent personas)
                </div>
                <div className="flex justify-center text-[#85837D]">&darr;</div>
                <div className="rounded-lg border border-white/[0.06] bg-[#121318] p-3">
                  <span className="text-[#FAF7F0]">Round-Robin Cross Examination</span> (Adversarial
                  critique passing between seats)
                </div>
                <div className="flex justify-center text-[#85837D]">&darr;</div>
                <div className="rounded-lg border border-white/[0.06] bg-[#121318] p-3">
                  <span className="text-[#F0977A]">Synthesis & Scoring Engine</span> (Deterministic
                  scoring matrix & verdict generation)
                </div>
              </div>
            </div>

            <p>
              Outputs adhere to strict JSON schema definitions with validation guarantees, ensuring
              every juror produces formatted risk matrices, confidence intervals, and prerequisite
              checklists rather than conversational fluff.
            </p>
          </section>

          {/* Section 8: Key Product Decisions */}
          <section aria-labelledby="section-decisions">
            <h2
              id="section-decisions"
              className="text-[24px] font-normal tracking-[-0.015em] text-[#FAF7F0] mb-4"
            >
              8. Key Product Decisions Made During the Build
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-[#FAF7F0] mb-1">
                  1. Asynchronous deliberation over live chat rooms
                </h3>
                <p className="text-[14.5px] leading-relaxed text-[#B0AEA8]">
                  Early prototypes used a live conversational chat stream where agents talked in
                  real time. It was entertaining but unhelpful: users spent cognitive energy reading
                  banter rather than evaluating decisions. Switching to a structured, 4-phase
                  asynchronous dossier produced actionable strategy documents.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-[#FAF7F0] mb-1">
                  2. Fixed specialist seats over dynamic user-configured personas
                </h3>
                <p className="text-[14.5px] leading-relaxed text-[#B0AEA8]">
                  Allowing users to invent their own arbitrary personas produced weak, cartoonish
                  critiques. Hardcoding five foundational operational disciplines ensures the five
                  critical business forces are permanently represented without user bias.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-[#FAF7F0] mb-1">
                  3. Preserving dissenting minority opinions
                </h3>
                <p className="text-[14.5px] leading-relaxed text-[#B0AEA8]">
                  Most AI tools average everything into consensus. Product Jury deliberately
                  highlights unresolved minority dissents in bold red/amber flags. If the Engineering
                  seat warns of catastrophic state synchronization failure, the synthesizer is
                  forbidden from overriding it simply because the other four seats are enthusiastic.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9: What I Learned */}
          <section aria-labelledby="section-learned">
            <h2
              id="section-learned"
              className="text-[24px] font-normal tracking-[-0.015em] text-[#FAF7F0] mb-4"
            >
              9. What I Learned
            </h2>
            <p>
              Building Product Jury clarified an essential principle of applied AI systems:{" "}
              <strong className="text-[#FAF7F0]">
                Agent specialization and adversarial tension consistently outperform monolithic
                prompts.
              </strong>
            </p>
            <p className="mt-4">
              When a single model is asked to "be a great product strategist, think about user
              friction, consider code architecture, and verify unit economics," it creates an
              averaged compromise. When you instantiate five separate agents whose explicit goal is
              to protect their individual boundary, the emergent debate matches what happens in
              top-tier product executive reviews.
            </p>
          </section>

          {/* Section 10: Live Product CTA */}
          <section
            aria-labelledby="section-try"
            className="mt-16 rounded-[22px] border border-white/[0.12] bg-[#0E0F14] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.08)] backdrop-blur-md"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-[48ch]">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-[#F0977A] mb-1.5">
                  Live Production Workspace
                </div>
                <h3 className="text-[22px] font-medium tracking-tight text-[#FAF7F0]">
                  Ready to test a product assumption?
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-[#9C9A95]">
                  Drop a feature brief, pricing change, or architecture proposal into the jury and
                  get five specialist perspectives in under three minutes.
                </p>
              </div>

              <div className="flex shrink-0 flex-col sm:items-end gap-3">
                <a
                  href={PRODUCT_JURY_LIVE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#FAF7F0] px-6 py-3.5 text-[14px] font-medium text-[#0A0B0E] shadow-[0_4px_16px_rgba(0,0,0,0.35)] transition-all duration-200 hover:bg-white hover:shadow-[0_6px_22px_rgba(240,151,122,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0977A]/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#040506]"
                >
                  <span>Try Product Jury</span>
                  <ArrowUpRight
                    className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </a>

                <button
                  type="button"
                  onClick={() => onNavigate("/work")}
                  className="font-mono text-[11px] text-[#9C9A95] transition-colors hover:text-[#FAF7F0] focus-visible:outline-none focus-visible:underline"
                >
                  Explore other shipped products &rarr;
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
