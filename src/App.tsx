import React, { useState, useEffect } from "react";
import SiteNavV3 from "./components/site/v3/SiteNavV3";
import SiteFooterV3 from "./components/site/v3/SiteFooterV3";
import HomePage from "./components/HomePage";
import WorkPage from "./components/WorkPage";
import CaseStudyDetailPage from "./components/CaseStudyDetailPage";
import AboutPage from "./components/AboutPage";
import ResumePage from "./components/ResumePage";
import ContactPage from "./components/ContactPage";
import ProductJuryPage from "./components/ProductJuryPage";
import ContactModal from "./components/ContactModal";
import ResumeModal from "./components/ResumeModal";
import CopilotWidget from "./components/CopilotWidget";
import { openCalendly } from "./utils/calendly";
import { applyPageMeta } from "./utils/pageMeta";
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

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  // Sync state with browser popstate
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      setCurrentPath(p && p !== "" ? p : "/");
      const h = window.location.hash.replace("#", "");
      if (h) {
        setTimeout(() => {
          const el = document.getElementById(h);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Handle initial page load with hash in URL
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const h = window.location.hash.replace("#", "");
      if (h) {
        setTimeout(() => {
          const el = document.getElementById(h);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 250);
      }
    }
  }, []);

  // Global Escape key listener for modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        if (isContactModalOpen) setIsContactModalOpen(false);
        if (isResumeModalOpen) setIsResumeModalOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isContactModalOpen, isResumeModalOpen]);

  const scrollToHash = (hash: string, attempts = 0) => {
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else if (attempts < 15) {
      setTimeout(() => scrollToHash(hash, attempts + 1), 70);
    }
  };

  const navigate = (path: string) => {
    const [targetPath, targetHash] = path.split("#");
    const normalizedTargetPath = targetPath === "" ? "/" : targetPath;
    const isSamePage = normalizedTargetPath === currentPath;

    window.history.pushState(null, "", path);
    setCurrentPath(normalizedTargetPath);

    if (targetHash) {
      if (!isSamePage) {
        window.scrollTo({ top: 0 });
      }
      setTimeout(
        () => {
          scrollToHash(targetHash);
        },
        isSamePage ? 40 : 100
      );
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* Selecting a case study used to fill a modal that nothing ever opened.
     The rows navigate to the full page themselves, so this is now only the
     hook the pages are passed. */
  const handleSelectCaseStudy = (_caseStudy: CaseStudyDetail) => {};

  // Every route used to share the homepage title, so the tab, history and
  // bookmarks all read the same thing wherever you were.
  useEffect(() => {
    applyPageMeta(currentPath);
  }, [currentPath]);

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

    // 6. Product Jury Editorial Article Page: /product-jury
    if (currentPath === "/product-jury") {
      return <ProductJuryPage onNavigate={navigate} />;
    }

    // Default: Homepage: /
    return (
      <HomePage
        onNavigate={navigate}
        onSelectCaseStudy={handleSelectCaseStudy}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onOpenContact={() => openCalendly()}
      />
    );
  };

  /* the homepage renders the same nav and footer itself, sequenced with its
     own sections, so the shared chrome stands down there rather than
     rendering a second copy of both */
  const isHome = currentPath === "/";

  return (
    <div className="min-h-screen flex flex-col bg-void-black text-pure-white selection:bg-coral-pulse selection:text-void-black">
      {/* the first stop for a keyboard, so the nav is not re-traversed
          before the content on every page load */}
      <a href="#main" className="dp-skip">Skip to content</a>

      {/* Persistent Navigation */}
      {!isHome && (
        <SiteNavV3
          currentPath={currentPath}
          onNavigate={navigate}
          onOpenContact={() => openCalendly()}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />
      )}

      {/* Main Page View */}
      <main id="main" className="flex-1 w-full">{renderCurrentView()}</main>

      {/* Persistent Footer */}
      {!isHome && (
        <SiteFooterV3 onNavigate={navigate} />
      )}

      {/* Interactive Modals */}
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

      {/* RAG-based AI Copilot Widget */}
      <CopilotWidget
        onOpenBookChat={() => openCalendly()}
        onNavigate={navigate}
        currentPath={currentPath}
      />
    </div>
  );
}
