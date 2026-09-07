import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  FileDown,
  Mail,
  Linkedin,
  Compass,
  Users2,
  Briefcase,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  EXPERIENCE_ROLES,
  LEADERSHIP_SECTION,
  HOW_I_WORK_PRINCIPLES,
  CAPABILITY_GROUPS,
} from "../data/caseStudies";

interface AboutPageProps {
  onNavigate: (path: string) => void;
  onOpenResumeModal?: () => void;
}

export default function AboutPage({
  onNavigate,
  onOpenResumeModal,
}: AboutPageProps) {
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === "#experience") {
      const scrollToSection = (retries = 0) => {
        const el = document.getElementById("experience");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else if (retries < 15) {
          setTimeout(() => scrollToSection(retries + 1), 60);
        }
      };
      requestAnimationFrame(() => {
        setTimeout(scrollToSection, 50);
      });
    }
  }, []);

  const careerEvolutionSteps = [
    { title: "Hardware / IoT", context: "LionCircuits APM" },
    { title: "B2B Marketplace", context: "ReshaMandi 80K+ farmers" },
    { title: "Workflow & Payments", context: "Instant Payouts & KYC" },
    { title: "Subscription & Growth", context: "Sportstech 12K+ subscribers" },
    { title: "Connected Products", context: "Performance Score P0" },
    { title: "AI Products", context: "Conversational Coach & Localization" },
  ];

  return (
    <div className="w-full bg-[#FAFDFB] text-[#042718] py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero with Portrait */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="md:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#042718]/5 text-xs font-inter font-semibold text-[#042718]/80 mb-4 w-fit">
              <span>About Deepak Prasad</span>
            </div>
            <h1 className="font-onest text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#042718] leading-[1.15] mb-6">
              I like solving problems where the answer isn’t obvious.
            </h1>
            <p className="font-inter text-base sm:text-lg text-[#042718]/75 leading-relaxed font-normal mb-4">
              I turn complex customer, business and operational problems into products people use — from AI-powered experiences and subscription businesses to B2B marketplaces and connected ecosystems.
            </p>
            <p className="font-inter text-sm sm:text-base text-[#042718]/70 leading-relaxed font-normal">
              Over the past 7+ years, I’ve operated across both India and European markets, building 0→1 products from concept to scale, managing cross-border pods, and designing systems that connect hardware, software, and human operations.
            </p>
          </div>

          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-full aspect-[4/5] rounded-[24px] overflow-hidden border border-[#042718]/15 shadow-xl bg-[#042718]/5 group">
              <img
                src="/deepak_portrait_4x5.jpg"
                alt="Deepak Prasad - Senior Product Manager"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const fallback = target.parentElement?.querySelector(".about-portrait-fallback");
                  if (fallback) (fallback as HTMLElement).style.display = "flex";
                }}
              />
              <div className="about-portrait-fallback hidden w-full h-full flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#042718] to-[#0A3D24] text-white">
                <div className="w-16 h-16 rounded-full bg-[#188E39]/20 border-2 border-[#01bc7c]/40 flex items-center justify-center font-onest font-bold text-2xl text-white mb-3">
                  DP
                </div>
                <p className="font-onest font-bold text-base text-white">Deepak Prasad</p>
                <p className="font-inter text-xs text-white/70 mt-1">Senior Product Manager</p>
              </div>
              <div className="absolute bottom-3 left-3 right-3 px-3.5 py-2.5 rounded-xl bg-[#042718]/85 backdrop-blur-md text-white flex items-center justify-between text-xs font-inter border border-white/10 shadow-xs">
                <span className="font-semibold tracking-tight">Deepak Prasad</span>
                <span className="flex items-center gap-1.5 text-[#01bc7c] font-medium text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#01bc7c] animate-pulse" />
                  Available for PM roles
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CAREER EVOLUTION DIAGRAM
            ========================================================================= */}
        <div className="mb-20 p-6 sm:p-8 rounded-[24px] bg-white border border-[#042718]/10 shadow-2xs">
          <span className="text-xs font-inter font-semibold uppercase tracking-wider text-[#188E39] block mb-2">
            Career Journey & Evolution
          </span>
          <h3 className="font-onest text-xl sm:text-2xl font-bold text-[#042718] mb-6">
            From physical hardware and rural mandis to consumer AI platforms
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {careerEvolutionSteps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col p-3.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/6"
              >
                <span className="text-[10px] font-onest font-bold text-[#188E39]">
                  0{idx + 1}
                </span>
                <span className="font-onest text-xs font-bold text-[#042718] mt-1 leading-snug">
                  {step.title}
                </span>
                <span className="font-inter text-[10px] text-[#042718]/50 mt-1">
                  {step.context}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================================
            EXPERIENCE TIMELINE (STRICTLY ACCURATE, NO MUDRA)
            ========================================================================= */}
        <section id="experience" className="mb-20 scroll-mt-28">
          <div className="flex items-center gap-3 mb-2">
            <Briefcase size={20} className="text-[#188E39]" />
            <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718]">
              Experience & Roles
            </h2>
          </div>
          <p className="font-inter text-sm sm:text-base text-[#042718]/65 mb-8">
            Product ownership across early-stage ventures, high-growth consumer apps, and scaled B2B platforms.
          </p>

          <div className="flex flex-col gap-8">
            {EXPERIENCE_ROLES.map((role, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[24px] border border-[#042718]/8 p-6 sm:p-8 shadow-2xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-onest text-xl sm:text-2xl font-bold text-[#042718]">
                      {role.title}
                    </h3>
                    <div className="font-inter text-sm font-semibold text-[#188E39]">
                      {role.company}
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#042718]/5 font-inter text-xs font-medium text-[#042718]">
                      {role.period}
                    </span>
                    <span className="block font-inter text-[11px] text-[#042718]/50 mt-1">
                      {role.type}
                    </span>
                  </div>
                </div>

                <p className="font-inter text-sm text-[#042718]/70 leading-relaxed mb-6">
                  {role.description}
                </p>

                {role.focus && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {role.focus.map((f, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[11px] font-inter font-medium px-2.5 py-0.5 rounded-full bg-[#F4FAFA] text-[#042718]/80 border border-[#042718]/5"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t border-[#042718]/6">
                  <h4 className="font-inter text-xs font-bold uppercase tracking-wider text-[#042718]/40 mb-3">
                    Key Achievements
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {role.highlights.map((h, hIdx) => (
                      <li
                        key={hIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm font-inter text-[#042718]/80 leading-relaxed"
                      >
                        <CheckCircle2 size={15} className="text-[#188E39] mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            CROSS-BORDER PRODUCT LEADERSHIP (SECTION 16)
            ========================================================================= */}
        <section className="mb-20 p-8 rounded-[24px] bg-[#F4FAFA] border border-[#042718]/8">
          <div className="flex items-center gap-3 mb-3">
            <Users2 size={20} className="text-[#188E39]" />
            <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718]">
              {LEADERSHIP_SECTION.title}
            </h2>
          </div>
          <p className="font-inter text-base text-[#042718]/75 mb-6">
            {LEADERSHIP_SECTION.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LEADERSHIP_SECTION.details.map((d, dIdx) => (
              <div
                key={dIdx}
                className="p-5 rounded-[18px] bg-white border border-[#042718]/8 shadow-2xs"
              >
                <span className="font-onest text-xs font-bold text-[#188E39] block mb-2">
                  PILLAR 0{dIdx + 1}
                </span>
                <p className="font-inter text-xs sm:text-sm text-[#042718]/80 leading-relaxed">
                  {d}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            HOW I WORK (SECTION 17)
            ========================================================================= */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-2">
            <Compass size={20} className="text-[#188E39]" />
            <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718]">
              How I approach product problems
            </h2>
          </div>
          <p className="font-inter text-sm sm:text-base text-[#042718]/65 mb-8">
            Five core principles governing discovery, architecture, and technology execution.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HOW_I_WORK_PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                className="bg-white rounded-[20px] p-6 border border-[#042718]/8 shadow-2xs"
              >
                <span className="font-onest text-sm font-bold text-[#188E39] block mb-2">
                  {principle.number}
                </span>
                <h3 className="font-onest text-base sm:text-lg font-bold text-[#042718] mb-2">
                  {principle.title}
                </h3>
                <p className="font-inter text-xs sm:text-sm text-[#042718]/70 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            CAPABILITIES (SECTION 18)
            ========================================================================= */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-2">
            <Layers size={20} className="text-[#188E39]" />
            <h2 className="font-onest text-2xl sm:text-3xl font-bold text-[#042718]">
              Core Capabilities
            </h2>
          </div>
          <p className="font-inter text-sm sm:text-base text-[#042718]/65 mb-8">
            Domain proficiency across the full product lifecycle.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {CAPABILITY_GROUPS.map((group, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[18px] bg-white border border-[#042718]/8 shadow-2xs"
              >
                <h3 className="font-onest text-base font-bold text-[#042718] mb-3">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs font-inter font-medium px-2.5 py-1 rounded-md bg-[#FAFDFB] text-[#042718]/70 border border-[#042718]/6"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resume & Contact Callout Footer */}
        <div className="p-8 rounded-[24px] bg-[#042718] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-onest text-xl sm:text-2xl font-bold mb-1">
              Want the full career history?
            </h3>
            <p className="font-inter text-sm text-white/70">
              Download my official PDF resume or review career milestones.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                if (onOpenResumeModal) onOpenResumeModal();
                else onNavigate("/resume");
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#188E39] hover:bg-[#15803D] text-white font-inter text-sm font-semibold transition-colors cursor-pointer"
            >
              <FileDown size={16} />
              <span>Download resume</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate("/contact")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white font-inter text-sm font-semibold transition-colors cursor-pointer"
            >
              <span>Contact</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
