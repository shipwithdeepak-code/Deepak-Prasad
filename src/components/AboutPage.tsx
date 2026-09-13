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
    <div className="w-full bg-void text-ivory py-12 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Hero with Portrait */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="md:col-span-7 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ghost border border-[var(--rule-strong)] text-xs font-mono uppercase tracking-[0.18em] text-coral mb-4 w-fit">
              <span>About Deepak Prasad</span>
            </div>
            <h1
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ivory leading-[1.15] mb-6"
              style={{ fontVariationSettings: '"wdth" 92' }}
            >
              I like solving problems where the answer isn’t obvious.
            </h1>
            <p className="font-body text-base sm:text-lg text-mute leading-relaxed font-normal mb-4">
              I turn complex customer, business and operational problems into products people use — from AI-powered experiences and subscription businesses to B2B marketplaces and connected ecosystems.
            </p>
            <p className="font-body text-sm sm:text-base text-mute/80 leading-relaxed font-normal">
              Over the past 7+ years, I’ve operated across both India and European markets, building 0→1 products from concept to scale, managing cross-border pods, and designing systems that connect hardware, software, and human operations.
            </p>
          </div>

          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-full aspect-[4/5] rounded-[24px] overflow-hidden border border-[var(--rule-strong)] shadow-xl bg-ghost group">
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
              <div className="about-portrait-fallback hidden w-full h-full flex-col items-center justify-center p-6 text-center bg-void text-ivory">
                <div className="w-16 h-16 rounded-full bg-ghost border border-[var(--rule-strong)] flex items-center justify-center font-display font-bold text-2xl text-coral mb-3">
                  DP
                </div>
                <p className="font-display font-bold text-base text-ivory">Deepak Prasad</p>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-mute mt-1">Senior Product Manager</p>
              </div>
              <div className="absolute bottom-3 left-3 right-3 px-3.5 py-2.5 rounded-xl bg-void/90 backdrop-blur-md text-ivory flex items-center justify-between text-xs font-mono uppercase tracking-[0.12em] border border-[var(--rule)] shadow-xs">
                <span className="font-semibold tracking-tight text-ivory">Deepak Prasad</span>
                <span className="text-coral font-medium text-[11px]">
                  Available for PM roles
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            CAREER EVOLUTION DIAGRAM
            ========================================================================= */}
        <div className="mb-20 p-6 sm:p-8 rounded-[24px] bg-ghost border border-[var(--rule)] shadow-2xs">
          <span className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-coral block mb-2">
            Career Journey & Evolution
          </span>
          <h3
            className="font-display text-xl sm:text-2xl font-bold text-ivory mb-6"
            style={{ fontVariationSettings: '"wdth" 92' }}
          >
            From physical hardware and rural mandis to consumer AI platforms
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {careerEvolutionSteps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col p-3.5 rounded-xl bg-void/60 border border-[var(--rule)]"
              >
                <span className="text-[10px] font-mono font-bold text-coral">
                  0{idx + 1}
                </span>
                <span
                  className="font-display text-xs font-bold text-ivory mt-1 leading-snug"
                  style={{ fontVariationSettings: '"wdth" 92' }}
                >
                  {step.title}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-mute mt-1">
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
            <Briefcase size={20} className="text-coral" />
            <h2
              className="font-display text-2xl sm:text-3xl font-bold text-ivory"
              style={{ fontVariationSettings: '"wdth" 92' }}
            >
              Experience & Roles
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-mute mb-8">
            Product ownership across early-stage ventures, high-growth consumer apps, and scaled B2B platforms.
          </p>

          <div className="flex flex-col gap-8">
            {EXPERIENCE_ROLES.map((role, idx) => (
              <div
                key={idx}
                className="bg-ghost rounded-[24px] border border-[var(--rule)] p-6 sm:p-8 shadow-2xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3
                      className="font-display text-xl sm:text-2xl font-bold text-ivory"
                      style={{ fontVariationSettings: '"wdth" 92' }}
                    >
                      {role.title}
                    </h3>
                    <div className="font-mono text-xs uppercase tracking-[0.14em] font-semibold text-coral mt-0.5">
                      {role.company}
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-ghost border border-[var(--rule)] font-mono text-xs uppercase tracking-[0.12em] font-medium text-ivory">
                      {role.period}
                    </span>
                    <span className="block font-mono text-[11px] uppercase tracking-[0.1em] text-mute mt-1">
                      {role.type}
                    </span>
                  </div>
                </div>

                <p className="font-body text-sm text-mute leading-relaxed mb-6">
                  {role.description}
                </p>

                {role.focus && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {role.focus.map((f, fIdx) => (
                      <span
                        key={fIdx}
                        className="text-[11px] font-mono uppercase tracking-[0.1em] px-2.5 py-0.5 rounded-full bg-ghost text-mute border border-[var(--rule)]"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t border-[var(--rule)]">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-mute mb-3">
                    Key Achievements
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {role.highlights.map((h, hIdx) => (
                      <li
                        key={hIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm font-body text-ivory/85 leading-relaxed"
                      >
                        <CheckCircle2 size={15} className="text-coral mt-0.5 shrink-0" />
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
        <section className="mb-20 p-8 rounded-[24px] bg-ghost border border-[var(--rule)]">
          <div className="flex items-center gap-3 mb-3">
            <Users2 size={20} className="text-coral" />
            <h2
              className="font-display text-2xl sm:text-3xl font-bold text-ivory"
              style={{ fontVariationSettings: '"wdth" 92' }}
            >
              {LEADERSHIP_SECTION.title}
            </h2>
          </div>
          <p className="font-body text-base text-mute mb-6">
            {LEADERSHIP_SECTION.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {LEADERSHIP_SECTION.details.map((d, dIdx) => (
              <div
                key={dIdx}
                className="p-5 rounded-[18px] bg-void/60 border border-[var(--rule)] shadow-2xs"
              >
                <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-coral block mb-2">
                  PILLAR 0{dIdx + 1}
                </span>
                <p className="font-body text-xs sm:text-sm text-mute leading-relaxed">
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
            <Compass size={20} className="text-coral" />
            <h2
              className="font-display text-2xl sm:text-3xl font-bold text-ivory"
              style={{ fontVariationSettings: '"wdth" 92' }}
            >
              How I approach product problems
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-mute mb-8">
            Five core principles governing discovery, architecture, and technology execution.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HOW_I_WORK_PRINCIPLES.map((principle) => (
              <div
                key={principle.number}
                className="bg-ghost rounded-[20px] p-6 border border-[var(--rule)] shadow-2xs"
              >
                <span className="font-mono text-xs uppercase tracking-[0.18em] font-bold text-coral block mb-2">
                  {principle.number}
                </span>
                <h3
                  className="font-display text-base sm:text-lg font-bold text-ivory mb-2"
                  style={{ fontVariationSettings: '"wdth" 92' }}
                >
                  {principle.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-mute leading-relaxed">
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
            <Layers size={20} className="text-coral" />
            <h2
              className="font-display text-2xl sm:text-3xl font-bold text-ivory"
              style={{ fontVariationSettings: '"wdth" 92' }}
            >
              Core Capabilities
            </h2>
          </div>
          <p className="font-body text-sm sm:text-base text-mute mb-8">
            Domain proficiency across the full product lifecycle.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {CAPABILITY_GROUPS.map((group, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[18px] bg-ghost border border-[var(--rule)] shadow-2xs"
              >
                <h3
                  className="font-display text-base font-bold text-ivory mb-3"
                  style={{ fontVariationSettings: '"wdth" 92' }}
                >
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-xs font-mono uppercase tracking-[0.1em] px-2.5 py-1 rounded-md bg-void/50 text-mute border border-[var(--rule)]"
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
        <div className="p-8 rounded-[24px] bg-ghost border border-[var(--rule-strong)] text-ivory flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3
              className="font-display text-xl sm:text-2xl font-bold mb-1 text-ivory"
              style={{ fontVariationSettings: '"wdth" 92' }}
            >
              Want the full career history?
            </h3>
            <p className="font-body text-sm text-mute">
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
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-coral hover:bg-[#F6AE96] text-void font-mono uppercase text-xs tracking-[0.14em] font-semibold transition-colors cursor-pointer active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            >
              <FileDown size={16} />
              <span>Download resume</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate("/contact")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ghost hover:bg-ghost-active border border-[var(--rule)] text-ivory font-mono uppercase text-xs tracking-[0.14em] font-semibold transition-colors cursor-pointer active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
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
