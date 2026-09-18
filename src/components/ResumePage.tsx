import React from "react";
import { ArrowUpRight, Download, Eye } from "lucide-react";
import { EXPERIENCE_ROLES } from "../data/caseStudies";
import { PageHeader, Panel, SectionHeader } from "./site/v3/primitives";

interface ResumePageProps {
  onNavigate: (path: string) => void;
  onOpenResumeModal?: () => void;
}

const RESUME_PDF = "/Deepak_Prasad_Senior_Product_Manager_Resume.pdf";

/**
 * The CV, on the web.
 *
 * Short on purpose: the summary, the chronology, the degree, and the file
 * itself. Everything longer lives on About, and repeating it here would make
 * two pages that both have to be kept true.
 */
export default function ResumePage({
  onNavigate,
  onOpenResumeModal,
}: ResumePageProps) {
  const download = () => {
    const link = document.createElement("a");
    link.href = RESUME_PDF;
    link.download = "Deepak_Prasad_Senior_Product_Manager_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="v3-atmos v3-atmos-coral bg-void-black py-16 md:py-24">
      <div className="mx-auto max-w-[940px] px-6">
        <PageHeader
          eyebrow="Curriculum vitae"
          title="Seven years, on one page."
          lede="Senior Product Manager building AI-native, data-driven products across B2B and B2C, taking ambiguous problems from 0 to 1 and then to scale."
        />

        <Panel loud className="mb-16 bg-ink p-8">
          <span className="mb-2 block font-mono text-[10.5px] uppercase tracking-[.05em] text-coral-pulse">
            Official PDF
          </span>
          <h2 className="mb-3 max-w-[28ch] text-2xl font-normal leading-[1.17] text-pure-white">
            The single page with every metric on it.
          </h2>
          <p className="mb-6 max-w-[62ch] text-[15px] leading-relaxed text-ash">
            Full metrics, company tenures, technology stacks and academic
            background, in the version that goes to a recruiter.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              id="resume-page-direct-download"
              onClick={download}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-mist px-[18px] py-3 text-sm font-medium text-iron transition-all duration-200 hover:-translate-y-px hover:bg-white"
            >
              Download the PDF
              <Download className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
            </button>
            {onOpenResumeModal && (
              <button
                type="button"
                id="resume-page-preview-modal"
                onClick={onOpenResumeModal}
                className="v3-key-quiet inline-flex min-h-11 items-center gap-2 rounded-lg px-[18px] py-3 text-sm font-medium text-ash transition-colors duration-200 hover:text-pure-white"
              >
                Read it here first
                <Eye className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
              </button>
            )}
          </div>
        </Panel>

        <section className="mb-16">
          <SectionHeader title="Summary" />
          <Panel className="grid gap-3 bg-ink p-6 text-[15px] leading-relaxed text-ash">
            <p>
              Senior Product Manager with over seven years building complex
              products out of ambiguous problems using data, AI and connected
              technology. 0 to 1 builds, B2B marketplace digitisation, B2C
              subscription monetisation and connected hardware ecosystems.
            </p>
            <p>
              Cross-border product leadership in an ODC model, partnering an
              India product pod with European executive teams, mentoring
              cross-functional groups and owning technical roadmaps from
              discovery to deployment.
            </p>
          </Panel>
        </section>

        <section className="mb-16">
          <SectionHeader title="Chronology" />
          <div className="grid gap-3">
            {EXPERIENCE_ROLES.map((role) => (
              <Panel
                key={`${role.company}-${role.period}`}
                className="flex flex-wrap items-start justify-between gap-4 bg-ink p-6"
              >
                <div className="grid max-w-[62ch] gap-1">
                  <h3 className="text-[17px] font-medium text-pure-white">
                    {role.title}
                  </h3>
                  <span className="text-[13px] text-coral-pulse">
                    {role.company}
                  </span>
                  <p className="mt-1 text-[13px] leading-relaxed text-ash">
                    {role.description}
                  </p>
                </div>
                <div className="grid shrink-0 gap-1 text-left sm:text-right">
                  <span className="font-mono text-[11px] text-mist">
                    {role.period}
                  </span>
                  <span className="font-mono text-[10.5px] uppercase tracking-[.05em] text-smoke">
                    {role.type.split(",")[0].trim()}
                  </span>
                </div>
              </Panel>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <SectionHeader title="Education" />
          <Panel className="grid gap-2 bg-ink p-6">
            <h3 className="text-[17px] font-medium text-pure-white">
              B.E. Electronics and Communication
            </h3>
            <p className="max-w-[72ch] text-sm leading-relaxed text-ash">
              Visvesvaraya Technological University. Signal processing, systems
              architecture, embedded computing and software engineering, which
              is why the hardware products later made sense.
            </p>
          </Panel>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-8">
          <button
            type="button"
            onClick={() => onNavigate("/about")}
            className="text-[13px] font-medium text-ash transition-colors duration-200 hover:text-pure-white"
          >
            The longer version, on About
          </button>
          <button
            type="button"
            onClick={() => onNavigate("/contact")}
            className="inline-flex items-center gap-2 text-[13px] font-medium text-coral-pulse"
          >
            Get in touch
            <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
