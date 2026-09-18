import React from "react";
import HeroConsole from "./site/HeroConsole";
import SiteNavV3 from "./site/v3/SiteNavV3";
import WorkRail from "./site/v3/WorkRail";
import AIBuilds from "./site/v3/AIBuilds";
import HowIWork from "./site/v3/HowIWork";
import ContactCTA from "./site/v3/ContactCTA";
import SiteFooterV3 from "./site/v3/SiteFooterV3";
import { openCopilot } from "./CopilotWidget";
import { ALL_FLAGSHIP_CASE_STUDIES } from "../data/caseStudies";
import { CaseStudyDetail } from "../types";

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectCaseStudy: (caseStudy: CaseStudyDetail) => void;
  onOpenResumeModal?: () => void;
  onOpenContact?: () => void;
}

/**
 * Portfolio v3 homepage.
 *
 * Clean, focused narrative:
 * 1. Hero with focused CTAs (View Work & About Me) and Dipa search
 * 2. WorkRail (flagship shipped products & deep dives)
 * 3. AI Builds (Product Jury primary feature & Dipa in-memory retrieval pipeline)
 * 4. How I Work (core principles)
 * 5. Contact CTA & Footer
 */
export default function HomePage({
  onNavigate,
  onSelectCaseStudy,
  onOpenResumeModal,
  onOpenContact,
}: HomePageProps) {
  return (
    <div className="bg-void-black">
      <SiteNavV3
        onNavigate={onNavigate}
        onOpenContact={onOpenContact}
        onOpenResumeModal={onOpenResumeModal}
      />
      <HeroConsole
        onNavigate={onNavigate}
        onAsk={(question) => openCopilot(question)}
      />
      <WorkRail
        caseStudies={ALL_FLAGSHIP_CASE_STUDIES}
        onSelectCaseStudy={onSelectCaseStudy}
        onNavigate={onNavigate}
      />
      <AIBuilds
        onNavigate={onNavigate}
        onAsk={(question) => openCopilot(question)}
      />
      <HowIWork />
      <ContactCTA
        onOpenContact={onOpenContact}
        onOpenResumeModal={onOpenResumeModal}
      />
      <SiteFooterV3 onNavigate={onNavigate} />
    </div>
  );
}
