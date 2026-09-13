import React from "react";
import HeroFullFace from "./site/HeroFullFace";
import KineticStrip from "./site/KineticStrip";
import WorkFan from "./site/WorkFan";
import PrinciplesFloat from "./site/PrinciplesFloat";
import SiteFooter from "./site/SiteFooter";
import { ALL_FLAGSHIP_CASE_STUDIES } from "../data/caseStudies";
import { CaseStudyDetail } from "../types";

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectCaseStudy: (caseStudy: CaseStudyDetail) => void;
  onOpenResumeModal?: () => void;
  onOpenContact?: () => void;
}

/**
 * Portfolio v2 homepage.
 *
 * One accent on near black, one theme for the whole page. The hero runs
 * straight into the strip, which carries the whole track record, so the
 * work begins the moment the strip ends.
 */
export default function HomePage({
  onNavigate,
  onSelectCaseStudy,
  onOpenResumeModal,
  onOpenContact,
}: HomePageProps) {
  return (
    <div className="bg-void">
      <HeroFullFace
        onNavigate={onNavigate}
        onOpenResumeModal={onOpenResumeModal}
        onOpenContact={onOpenContact}
      />
      <KineticStrip />
      <WorkFan
        caseStudies={ALL_FLAGSHIP_CASE_STUDIES}
        onSelectCaseStudy={onSelectCaseStudy}
        onNavigate={onNavigate}
      />
      <PrinciplesFloat />
      <SiteFooter onOpenContact={onOpenContact} />
    </div>
  );
}
