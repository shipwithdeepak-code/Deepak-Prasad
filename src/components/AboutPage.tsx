import React from "react";
import { ArrowUpRight, Download, CheckCircle2 } from "lucide-react";
import {
  LEADERSHIP_SECTION,
  HOW_I_WORK_PRINCIPLES,
  CAPABILITY_GROUPS,
} from "../data/caseStudies";
import {
  ImageSlot,
  PageHeader,
  Panel,
  SectionHeader,
  Tag,
} from "./site/v3/primitives";

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenResumeModal?: () => void;
}

const SUPPORTING_THEMES = [
  {
    title: "0→1 product discovery and execution",
    description: "Taking ambiguous charters through discovery, prototyping, validation, and launching systems from scratch.",
  },
  {
    title: "Marketplace and subscription systems",
    description: "Designing multi-sided economic loops, instant settlement, bidding workflows, paywalls, and retention dynamics.",
  },
  {
    title: "Connected hardware and companion apps",
    description: "Bridging physical devices, firmware constraints, and consumer digital interfaces into seamless experiences.",
  },
  {
    title: "Applied AI and intelligent workflows",
    description: "Building production conversational AI features, multi-agent systems, and ML-assisted pricing models with measurable guardrails.",
  },
  {
    title: "Cross-functional product leadership",
    description: "Aligning distributed cross-border pods, engineering, design, operations, and executive leadership toward verified outcomes.",
  },
];

/**
 * About Deepak Prasad.
 *
 * Concise, editorial overview:
 * - Core product philosophy & cross-system focus
 * - 5 core supporting themes
 * - Leadership pod structure
 * - 5 operational principles
 * - Domain capabilities
 * - Direct handoff to the Resume for detailed chronological employment history
 */
export default function AboutPage({
  onNavigate,
  onOpenResumeModal,
}: AboutPageProps) {
  return (
    <div className="v3-atmos v3-atmos-coral bg-void-black py-16 md:py-24">
      <div className="mx-auto max-w-[1100px] px-6">
        {/* Editorial Header Section */}
        <div className="mb-16 grid items-center gap-12 md:grid-cols-[1.2fr_.8fr]">
          <PageHeader
            eyebrow="ABOUT DEEPAK"
            title="I build products across complex systems, from zero to something people use."
            lede="I’m a Senior Product Manager and product builder working across marketplaces, connected hardware, subscriptions, and applied AI."
          >
            <p className="text-[15px] leading-relaxed text-smoke">
              My work sits at the intersection of customer problems, business models,
              engineering constraints, and thoughtful product experiences. Over seven years
              I have led 0→1 initiatives from concept to production, operated across distributed
              international pods, and built products grounded in deep user empathy and operational reality.
            </p>
          </PageHeader>

          <Panel className="relative overflow-hidden bg-ink" loud>
            <img
              src="/deepak_portrait_4x5.jpg"
              alt="Deepak Prasad"
              className="aspect-[4/5] w-full object-cover object-top"
            />
            <span className="v3-glass absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5">
              <span className="text-[13px] font-medium text-pure-white">
                Deepak Prasad
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[.05em] text-coral-pulse">
                Available for Senior Roles
              </span>
            </span>
          </Panel>
        </div>

        {/* Supporting Themes */}
        <Panel className="mb-20 bg-ink p-6 sm:p-8">
          <SectionHeader
            eyebrow="CORE FOCUS"
            title="What I spend my time building."
            lede="Areas where my product discovery, technical depth, and execution have shipped real systems."
          />
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {SUPPORTING_THEMES.map((theme, i) => (
              <div
                key={theme.title}
                className="v3-key-quiet grid content-start gap-2 rounded-xl p-4 sm:p-5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10.5px] text-coral-pulse">
                    0{i + 1}
                  </span>
                  <span className="size-1.5 rounded-full bg-coral-pulse/60" />
                </div>
                <h3 className="text-[14.5px] font-medium leading-snug text-pure-white">
                  {theme.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-smoke">
                  {theme.description}
                </p>
              </div>
            ))}

            {/* Quick Resume Card */}
            <div className="v3-key-quiet flex flex-col justify-between gap-3 rounded-xl border border-coral-pulse/20 bg-coral-pulse/[0.03] p-4 sm:p-5">
              <div>
                <span className="font-mono text-[10.5px] text-coral-pulse uppercase tracking-wider">
                  Full Career History
                </span>
                <h3 className="mt-2 text-[14.5px] font-medium leading-snug text-pure-white">
                  Chronological Employment Record
                </h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-smoke">
                  Every company, role, date, and metric is documented in detail in my verified Resume.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  onOpenResumeModal ? onOpenResumeModal() : onNavigate("/resume")
                }
                className="inline-flex min-h-[40px] items-center gap-2 text-xs font-mono tracking-wider text-coral-pulse hover:text-white transition-colors"
              >
                <span>OPEN RESUME</span>
                <ArrowUpRight className="size-3.5" />
              </button>
            </div>
          </div>
        </Panel>

        {/* Leadership Section */}
        <section className="mb-20">
          <SectionHeader
            eyebrow="Leadership"
            title={LEADERSHIP_SECTION.title}
            lede={LEADERSHIP_SECTION.description}
          />
          <div className="grid gap-3 md:grid-cols-3">
            {LEADERSHIP_SECTION.details.map((detail, i) => (
              <Panel key={detail} className="bg-ink p-5">
                <span className="mb-2 block font-mono text-[10.5px] uppercase tracking-[.05em] text-coral-pulse">
                  Pillar 0{i + 1}
                </span>
                <p className="text-[13.5px] leading-relaxed text-ash">
                  {detail}
                </p>
              </Panel>
            ))}
          </div>
          <ImageSlot
            className="mt-4"
            ratio="21 / 9"
            label="The pod, or the Germany HQ working session. A wide shot of the team the leadership section describes."
          />
        </section>

        {/* How I Work Principles */}
        <section className="mb-20">
          <SectionHeader
            eyebrow="How I work"
            title="Five principles, and the argument under each."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {HOW_I_WORK_PRINCIPLES.map((principle) => (
              <Panel key={principle.number} className="bg-ink p-6">
                <span className="mb-2 block font-mono text-[10.5px] text-coral-pulse">
                  {principle.number}
                </span>
                <h3 className="mb-2 text-[17px] font-medium text-pure-white">
                  {principle.title}
                </h3>
                <p className="mb-3 text-[13.5px] leading-relaxed text-ash">
                  {principle.description}
                </p>
                <p className="border-t border-hairline pt-3 text-[13px] leading-relaxed text-smoke">
                  {principle.detail}
                </p>
              </Panel>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section className="mb-16">
          <SectionHeader
            eyebrow="Capabilities"
            title="What you can hand me."
            lede="Domain proficiency across the full product lifecycle."
          />
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {CAPABILITY_GROUPS.map((group) => (
              <Panel key={group.category} className="bg-ink p-5">
                <h3 className="mb-3 text-base font-medium text-pure-white">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </Panel>
            ))}
          </div>
        </section>

        {/* Detailed Employment History Banner */}
        <Panel
          loud
          className="flex flex-wrap items-center justify-between gap-6 bg-ink p-8"
        >
          <div className="grid gap-1.5">
            <h3 className="text-xl font-normal text-pure-white">
              Want the full career history?
            </h3>
            <p className="text-sm text-ash">
              The Resume has every role, dated, with the metrics and achievements attached.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a
              href="/Deepak_Prasad_Senior_Product_Manager_Resume.pdf"
              download="Deepak_Prasad_Senior_Product_Manager_Resume.pdf"
              onClick={(e) => {
                if (onOpenResumeModal) {
                  e.preventDefault();
                  onOpenResumeModal();
                }
              }}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-mist px-5 py-2.5 text-sm font-medium text-iron transition-all duration-200 hover:-translate-y-px hover:bg-white cursor-pointer"
            >
              Resume
              <Download className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => onNavigate("/contact")}
              className="v3-key-quiet inline-flex min-h-[44px] items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-ash transition-colors duration-200 hover:text-pure-white cursor-pointer"
            >
              Get in touch
              <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
