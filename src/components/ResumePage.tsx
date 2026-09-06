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
    <div className="w-full bg-[#FAFDFB] text-[#042718] py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#042718]/5 text-xs font-inter font-semibold text-[#042718]/80 mb-4">
            <span>Official Curriculum Vitae</span>
          </div>
          <h1 className="font-onest text-4xl sm:text-5xl font-bold tracking-tight text-[#042718] leading-[1.15] mb-4">
            Deepak Prasad — Resume
          </h1>
          <p className="font-inter text-base sm:text-lg text-[#042718]/70 leading-relaxed font-normal">
            Senior Product Manager building AI-native, data-driven products across B2B and B2C. 7+ years of experience taking complex, ambiguous problems from 0→1 to scale.
          </p>
        </div>

        {/* =========================================================================
            DOWNLOAD CALLOUT CARD (PRIMARY FOCUS OF SECTION 19)
            ========================================================================= */}
        <div className="p-8 rounded-[24px] bg-[#042718] text-white mb-16 shadow-md relative overflow-hidden">
          <div className="max-w-xl relative z-10">
            <span className="text-xs font-inter font-semibold uppercase tracking-wider text-[#A7F3D0] mb-2 block">
              Official PDF Resume
            </span>
            <h2 className="font-onest text-2xl sm:text-3xl font-bold leading-snug mb-3">
              Want the full career history? Download my resume
            </h2>
            <p className="font-inter text-sm sm:text-base text-white/70 leading-relaxed mb-6">
              Download the official, comprehensive single-page PDF covering full metrics, company tenures, technology stacks, and academic background.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                id="resume-page-direct-download"
                onClick={handleDownload}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#188E39] hover:bg-[#15803D] text-white font-inter text-sm font-semibold transition-all duration-200 shadow cursor-pointer"
              >
                <FileDown size={16} />
                <span>Download resume (PDF)</span>
              </button>

              {onOpenResumeModal && (
                <button
                  type="button"
                  id="resume-page-preview-modal"
                  onClick={onOpenResumeModal}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-inter text-sm font-semibold transition-all duration-200 cursor-pointer"
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
          <h3 className="font-onest text-xl sm:text-2xl font-bold text-[#042718] mb-6">
            Executive Summary
          </h3>
          <div className="p-6 rounded-[20px] bg-white border border-[#042718]/8 shadow-2xs font-inter text-sm sm:text-base text-[#042718]/80 leading-relaxed">
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
          <h3 className="font-onest text-xl sm:text-2xl font-bold text-[#042718] mb-6">
            Career Timeline
          </h3>
          <div className="flex flex-col gap-4">
            {EXPERIENCE_ROLES.map((role, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[18px] bg-white border border-[#042718]/8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
              >
                <div>
                  <h4 className="font-onest text-base sm:text-lg font-bold text-[#042718]">
                    {role.title}
                  </h4>
                  <div className="font-inter text-xs sm:text-sm font-semibold text-[#188E39]">
                    {role.company}
                  </div>
                  <p className="font-inter text-xs text-[#042718]/60 mt-1 max-w-xl">
                    {role.description}
                  </p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <span className="font-inter text-xs font-semibold text-[#042718]/80 block">
                    {role.period}
                  </span>
                  <span className="font-inter text-[11px] text-[#042718]/50 block">
                    {role.type.split("·")[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Credentials */}
        <section className="mb-12">
          <h3 className="font-onest text-xl sm:text-2xl font-bold text-[#042718] mb-6">
            Education & Background
          </h3>
          <div className="p-6 rounded-[20px] bg-white border border-[#042718]/8 shadow-2xs">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap size={20} className="text-[#188E39]" />
              <h4 className="font-onest text-base sm:text-lg font-bold text-[#042718]">
                Bachelor of Engineering (B.E.) in Electronics & Communication
              </h4>
            </div>
            <p className="font-inter text-xs sm:text-sm text-[#042718]/70">
              Visvesvaraya Technological University (VTU) · Technical foundation in signal processing, systems architecture, embedded computing, and software engineering.
            </p>
          </div>
        </section>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-[#042718]/8">
          <button
            type="button"
            onClick={() => onNavigate("/about")}
            className="font-inter text-sm font-semibold text-[#042718]/60 hover:text-[#042718] transition-colors cursor-pointer"
          >
            ← Read full story in About
          </button>
          <button
            type="button"
            onClick={() => onNavigate("/contact")}
            className="inline-flex items-center gap-1.5 font-inter text-sm font-semibold text-[#188E39] hover:underline cursor-pointer"
          >
            <span>Get in touch</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
