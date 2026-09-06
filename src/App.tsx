import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import WorkPage from "./components/WorkPage";
import CaseStudyDetailPage from "./components/CaseStudyDetailPage";
import AboutPage from "./components/AboutPage";
import ResumePage from "./components/ResumePage";
import ContactPage from "./components/ContactPage";
import CaseStudyModal from "./components/CaseStudyModal";
import ContactModal from "./components/ContactModal";
import ResumeModal from "./components/ResumeModal";
import {
  ALL_FLAGSHIP_CASE_STUDIES,
  RESHAMANDI_CASE_STUDY,
} from "./data/caseStudies";
import { CaseStudyDetail } from "./types";

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const p = window.location.pathname;
      return p && p !== "" ? p : "/";
    }
    return "/";
  });

  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState(false);
  const [selectedModalCaseStudy, setSelectedModalCaseStudy] =
    useState<CaseStudyDetail>(RESHAMANDI_CASE_STUDY);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Sync state with browser popstate
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      setCurrentPath(p && p !== "" ? p : "/");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path === currentPath) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.history.pushState(null, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectCaseStudy = (caseStudy: CaseStudyDetail) => {
    setSelectedModalCaseStudy(caseStudy);
  };

  // Resolve current active route
  const renderCurrentView = () => {
    // 1. Case Study Dedicated Page: /work/:slug
    if (currentPath.startsWith("/work/")) {
      const slug = currentPath.replace("/work/", "").toLowerCase();
      const matched = ALL_FLAGSHIP_CASE_STUDIES.find(
        (c) => c.slug.toLowerCase() === slug || c.id.toLowerCase() === slug
      );
      if (matched) {
        return (
          <CaseStudyDetailPage caseStudy={matched} onNavigate={navigate} />
        );
      }
      // Fallback to ReshaMandi if slug not recognized
      return (
        <CaseStudyDetailPage
          caseStudy={RESHAMANDI_CASE_STUDY}
          onNavigate={navigate}
        />
      );
    }

    // 2. Work Index Page: /work
    if (currentPath === "/work") {
      return (
        <WorkPage
          onNavigate={navigate}
          onSelectCaseStudy={handleSelectCaseStudy}
        />
      );
    }

    // 3. About Page: /about
    if (currentPath === "/about") {
      return (
        <AboutPage
          onNavigate={navigate}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />
      );
    }

    // 4. Resume Page: /resume
    if (currentPath === "/resume") {
      return (
        <ResumePage
          onNavigate={navigate}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />
      );
    }

    // 5. Contact Page: /contact
    if (currentPath === "/contact") {
      return <ContactPage onNavigate={navigate} />;
    }

    // Default: Homepage: /
    return (
      <HomePage
        onNavigate={navigate}
        onSelectCaseStudy={handleSelectCaseStudy}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFDFB] text-[#042718] selection:bg-[#188E39]/20 selection:text-[#042718]">
      {/* Persistent Navigation */}
      <Navigation
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Main Page View */}
      <main className="flex-1 w-full">{renderCurrentView()}</main>

      {/* Persistent Footer */}
      <Footer
        onNavigate={navigate}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Interactive Modals */}
      <CaseStudyModal
        caseStudy={selectedModalCaseStudy}
        isOpen={isCaseStudyModalOpen}
        onClose={() => setIsCaseStudyModalOpen(false)}
        onOpenContact={() => {
          setIsCaseStudyModalOpen(false);
          setIsContactModalOpen(true);
        }}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onOpenContact={() => {
          setIsResumeModalOpen(false);
          setIsContactModalOpen(true);
        }}
      />
    </div>
  );
}
