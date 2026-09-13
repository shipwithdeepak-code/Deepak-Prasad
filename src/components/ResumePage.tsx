import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FileDown,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Sparkles,
  ExternalLink,
  Eye,
} from "lucide-react";
import { EXPERIENCE_ROLES, CAPABILITY_GROUPS } from "../data/caseStudies";

interface ResumePageProps {
  onNavigate: (path: string) => void;
  onOpenResumeModal?: () => void;
}

export default function ResumePage({
  onNavigate,
  onOpenResumeModal,
}: ResumePageProps) {
  const resumePdfPath = "/Deepak_Prasad_Senior_Product_Manager_Resume.pdf";

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumePdfPath;
    link.download = "Deepak_Prasad_Senior_Product_Manager_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full bg-void text-ivory py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ghost border border-[var(--rule-strong)] text-xs font-mono uppercase tracking-[0.18em] text-coral mb-4">
            <span>Official Curriculum Vitae</span>
          </div>
          <h1
            className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ivory leading-[1.15] mb-4"
            style={{ fontVariationSettings: '"wdth" 92' }}
          >
            Deepak Prasad / Resume
          </h1>
          <p className="font-body text-base sm:text-lg text-mute leading-relaxed font-normal">
            Senior Product Manager building AI-native, data-driven products across B2B and B2C. 7+ years of experience taking complex, ambiguous problems from 0→1 to scale.
          </p>
        </div>

        {/* =========================================================================
            DOWNLOAD CALLOUT CARD (PRIMARY FOCUS OF SECTION 19)
            ========================================================================= */}
        <div className="p-8 rounded-[24px] bg-ghost border border-[var(--rule-strong)] text-ivory mb-16 shadow-md relative overflow-hidden">
          <div className="max-w-xl relative z-10">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-coral mb-2 block">
              Official PDF Resume
            </span>
            <h2
              className="font-display text-2xl sm:text-3xl font-bold leading-snug mb-3 text-ivory"
              style={{ fontVariationSettings: '"wdth" 92' }}
            >
              Want the full career history? Download my resume
            </h2>
            <p className="font-body text-sm sm:text-base text-mute leading-relaxed mb-6">
              Download the official, comprehensive single-page PDF covering full metrics, company tenures, technology stacks, and academic background.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                id="resume-page-direct-download"
                onClick={handleDownload}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-coral hover:bg-[#F6AE96] text-void font-mono uppercase text-xs tracking-[0.14em] font-semibold transition-all duration-200 shadow cursor-pointer active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
              >
                <FileDown size={16} />
                <span>Download resume (PDF)</span>
              </button>

              {onOpenResumeModal && (
                <button
                  type="button"
                  id="resume-page-preview-modal"
                  onClick={onOpenResumeModal}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-ghost hover:bg-ghost-active border border-[var(--rule)] text-ivory font-mono uppercase text-xs tracking-[0.14em] font-semibold transition-all duration-200 cursor-pointer active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                >
                  <Eye size={16} />
                  <span>Preview in-app</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* =========================================================================
            EXECUTIVE CAREER SNAPSHOT
            ========================================================================= */}
        <section className="mb-16">
          <h3
            className="font-display text-xl sm:text-2xl font-bold text-ivory mb-6"
            style={{ fontVariationSettings: '"wdth" 92' }}
          >
            Executive Summary
          </h3>
          <div className="p-6 rounded-[20px] bg-ghost border border-[var(--rule)] shadow-2xs font-body text-sm sm:text-base text-mute leading-relaxed">
            <p className="mb-3">
              Senior Product Manager with 7+ years of experience building complex products from ambiguous problems using data, AI, and technology. Proven track record across 0→1 builds, B2B marketplace digitisation, B2C subscription monetization, and connected hardware ecosystems.
            </p>
            <p>
              Experienced in cross-border product leadership (ODC model partnering between India product pods and European executive teams), mentoring cross-functional pods, and leading technical roadmaps from discovery to deployment.
            </p>
          </div>
        </section>

        {/* Roles Chronology Summary */}
        <section className="mb-16">
          <h3
            className="font-display text-xl sm:text-2xl font-bold text-ivory mb-6"
            style={{ fontVariationSettings: '"wdth" 92' }}
          >
            Career Timeline
          </h3>
          <div className="flex flex-col gap-4">
            {EXPERIENCE_ROLES.map((role, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[18px] bg-ghost border border-[var(--rule)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
              >
                <div>
                  <h4
                    className="font-display text-base sm:text-lg font-bold text-ivory"
                    style={{ fontVariationSettings: '"wdth" 92' }}
                  >
                    {role.title}
                  </h4>
                  <div className="font-mono text-xs uppercase tracking-[0.14em] font-semibold text-coral mt-0.5">
                    {role.company}
                  </div>
                  <p className="font-body text-xs text-mute mt-1 max-w-xl">
                    {role.description}
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="font-mono text-xs uppercase tracking-[0.12em] font-semibold text-ivory block">
                    {role.period}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-mute block mt-1">
                    {role.type.split("·")[0].trim()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Credentials */}
        <section className="mb-12">
          <h3
            className="font-display text-xl sm:text-2xl font-bold text-ivory mb-6"
            style={{ fontVariationSettings: '"wdth" 92' }}
          >
            Education & Background
          </h3>
          <div className="p-6 rounded-[20px] bg-ghost border border-[var(--rule)] shadow-2xs">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap size={20} className="text-coral" />
              <h4
                className="font-display text-base sm:text-lg font-bold text-ivory"
                style={{ fontVariationSettings: '"wdth" 92' }}
              >
                Bachelor of Engineering (B.E.) in Electronics & Communication
              </h4>
            </div>
            <p className="font-body text-xs sm:text-sm text-mute leading-relaxed">
              Visvesvaraya Technological University (VTU) / Technical foundation in signal processing, systems architecture, embedded computing, and software engineering.
            </p>
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-[var(--rule)]">
          <button
            type="button"
            onClick={() => onNavigate("/about")}
            className="font-mono text-xs uppercase tracking-[0.14em] font-semibold text-mute hover:text-coral transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-sm"
          >
            ← Read full story in About
          </button>
          <button
            type="button"
            onClick={() => onNavigate("/contact")}
            className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] font-semibold text-coral hover:text-[#F6AE96] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-sm"
          >
            <span>Get in touch</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
