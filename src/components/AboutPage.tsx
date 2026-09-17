import React from "react";
import { ArrowUpRight, Download } from "lucide-react";
import {
  EXPERIENCE_ROLES,
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

/** The shape of the seven years, in six steps. Each one names the thing that
 *  changed, not the job title, because the titles repeat and the problems do
 *  not. */
const CAREER_STEPS = [
  { title: "Hardware and IoT", context: "LionCircuits, APM" },
  { title: "B2B marketplace", context: "ReshaMandi, 80,000+ farmers" },
  { title: "Workflow and payments", context: "Instant payouts and KYC" },
  { title: "Subscription and growth", context: "Sportstech, 12,401 paying" },
  { title: "Connected products", context: "Performance Score, P0" },
  { title: "AI products", context: "Conversational coach, localisation" },
];

/**
 * About.
 *
 * The record in full: how the work changed shape over seven years, every seat
 * with what was actually achieved in it, how a cross-border pod was run, the
 * five principles, and what I can be handed.
 */
export default function AboutPage({
  onNavigate,
  onOpenResumeModal,
}: AboutPageProps) {
  return (
    <div className="v3-atmos v3-atmos-coral bg-void-black py-16 md:py-24">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="mb-20 grid items-center gap-12 md:grid-cols-[1.2fr_.8fr]">
          <PageHeader
            eyebrow="About"
            title="I like problems where the answer is not obvious."
            lede="I turn complex customer, business and operational problems into products people use: applied AI, subscription businesses, B2B marketplaces and connected ecosystems."
          >
            <p className="text-[15px] leading-relaxed text-smoke">
              Over seven years I have worked across Indian and European markets,
              built 0 to 1 products from concept to scale, run cross-border
              pods, and designed systems that join hardware, software and the
              people operating them.
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
                Open to senior roles
              </span>
            </span>
          </Panel>
        </div>

        <Panel className="mb-20 bg-ink p-6 sm:p-8">
          <SectionHeader
            eyebrow="Career journey"
            title="From rural mandis and circuit boards to consumer AI."
          />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {CAREER_STEPS.map((step, i) => (
              <div
                key={step.title}
                className="v3-key-quiet grid content-start gap-1.5 rounded-xl p-3.5"
              >
                <span className="font-mono text-[10px] text-coral-pulse">
                  0{i + 1}
                </span>
                <span className="text-xs font-medium leading-snug text-pure-white">
                  {step.title}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[.05em] text-smoke">
                  {step.context}
                </span>
              </div>
            ))}
          </div>
        </Panel>

        <section id="experience" className="mb-20 scroll-mt-24">
          <SectionHeader
            eyebrow="Experience"
            title="Every seat, and what actually happened in it."
            lede="Product ownership across early-stage ventures, high-growth consumer apps and scaled B2B platforms."
          />

          <div className="grid gap-4">
            {EXPERIENCE_ROLES.map((role) => (
              <Panel
                key={`${role.company}-${role.period}`}
                className="bg-ink p-6 sm:p-8"
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div className="grid gap-1">
                    <h3 className="text-xl font-normal text-pure-white">
                      {role.title}
                    </h3>
                    <span className="text-[13.5px] text-coral-pulse">
                      {role.company}
                    </span>
                  </div>
                  <div className="grid gap-1 text-left sm:text-right">
                    <span className="font-mono text-[11px] text-smoke">
                      {role.period}
                    </span>
                    <span className="font-mono text-[10.5px] uppercase tracking-[.05em] text-smoke">
                      {role.type}
                    </span>
                  </div>
                </div>

                <p className="mb-5 max-w-[76ch] text-sm leading-relaxed text-ash">
                  {role.description}
                </p>

                {role.focus && (
                  <div className="mb-5 flex flex-wrap gap-2">
                    {role.focus.map((f) => (
                      <Tag key={f}>{f}</Tag>
                    ))}
                  </div>
                )}

                <div className="border-t border-hairline pt-5">
                  <p className="mb-3 font-mono text-[10.5px] uppercase tracking-[.05em] text-smoke">
                    What happened
                  </p>
                  <ul className="grid gap-2.5">
                    {role.highlights.map((h) => (
                      <li
                        key={h}
                        className="grid grid-cols-[auto_1fr] items-start gap-2.5 text-sm leading-relaxed text-mist/90"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 block size-1 rounded-full bg-coral-pulse"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Panel>
            ))}
          </div>
        </section>

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

        <Panel
          loud
          className="flex flex-wrap items-center justify-between gap-6 bg-ink p-8"
        >
          <div className="grid gap-1.5">
            <h3 className="text-xl font-normal text-pure-white">
              Want the full career history?
            </h3>
            <p className="text-sm text-ash">
              The PDF has every role, dated, with the numbers attached.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() =>
                onOpenResumeModal ? onOpenResumeModal() : onNavigate("/resume")
              }
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-mist px-[18px] py-3 text-sm font-medium text-iron transition-all duration-200 hover:-translate-y-px hover:bg-white"
            >
              Download CV
              <Download className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => onNavigate("/contact")}
              className="v3-key-quiet inline-flex min-h-11 items-center gap-2 rounded-lg px-[18px] py-3 text-sm font-medium text-ash transition-colors duration-200 hover:text-pure-white"
            >
              Contact
              <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
}
