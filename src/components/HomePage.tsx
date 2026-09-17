import React from "react";
import HeroConsole from "./site/HeroConsole";
import SiteNavV3 from "./site/v3/SiteNavV3";
import WorkRail from "./site/v3/WorkRail";
import AIBuilds from "./site/v3/AIBuilds";
import HowIWork from "./site/v3/HowIWork";
import TrackRecord from "./site/v3/TrackRecord";
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
 * The order is an argument: Dipa is the claim, the strip is the
 * evidence, the rail is the record, the builds are the proof that I write the
 * things I talk about, the principles are how, and the track record is where.
 * Each section is one idea, and nothing repeats a number another one already
 * made.
 */
export default function HomePage({
  onNavigate,
  onSelectCaseStudy,
  onOpenResumeModal,
  onOpenContact,
}: HomePageProps) {
  return (
    <div className="bg-void-black">
      <SiteNavV3 onNavigate={onNavigate} onOpenContact={onOpenContact} />
      <HeroConsole
        onNavigate={onNavigate}
        onOpenResumeModal={onOpenResumeModal}
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
      <TrackRecord onNavigate={onNavigate} />
      <ContactCTA
        onOpenContact={onOpenContact}
        onOpenResumeModal={onOpenResumeModal}
      />
      <SiteFooterV3 onNavigate={onNavigate} />
    </div>
  );
}
