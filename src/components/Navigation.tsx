import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, FileText } from "lucide-react";

import { CALENDLY_URL } from "../utils/calendly";

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenResumeModal?: () => void;
  onOpenContactModal?: () => void;
}

export default function Navigation({
  currentPath,
  onNavigate,
  onOpenResumeModal,
  onOpenContactModal,
}: NavigationProps) {
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: "Work", path: "/work", targetId: "selected-work" },
    { label: "Process", path: "/#methodology", targetId: "methodology" },
    { label: "Principles", path: "/#principles", targetId: "principles" },
    { label: "Track Record", path: "/about#experience", targetId: "experience" },
  ];

  const handleLinkClick = (link: { label: string; path: string; targetId?: string }, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    const [targetPath, targetHash] = link.path.split("#");
    const normalizedTargetPath = targetPath === "" ? "/" : targetPath;
    const currentBase = currentPath.split("#")[0] || "/";
    const hash = targetHash || link.targetId;

    if (normalizedTargetPath === currentBase && hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.replaceState(null, "", link.path);
        return;
      }
    }

    onNavigate(link.path);
  };

  const isTransparent = currentPath === "/" && !isScrolled;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isTransparent
          ? "bg-transparent border-transparent"
          : "bg-[#FAFDFB]/85 backdrop-blur-md border-b border-[#042718]/10 shadow-xs"
      }`}
    >
      <style>{`
        @media (max-width: 1023px) {
          .nav-desktop-only {
            display: none !important;
          }
          .nav-mobile-toggle {
            display: flex !important;
          }
        }
        @media (min-width: 1024px) {
          .nav-desktop-only {
            display: flex !important;
          }
          .nav-mobile-toggle {
            display: none !important;
          }
        }
      `}</style>
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Avatar Photo Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setIsMobileMenuOpen(false);
            onNavigate("/");
          }}
          className="flex items-center gap-3 hover:opacity-85 transition-opacity group"
          id="nav-logo"
        >
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[#042718]/15 shadow-xs group-hover:scale-105 transition-transform bg-[#042718] flex items-center justify-center relative">
              <img
                src="/images/deepak-prasad.jpg"
                alt="Deepak Prasad"
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover object-center block"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const fallback = target.parentElement?.querySelector(".nav-dp-fallback");
                  if (fallback) (fallback as HTMLElement).style.display = "flex";
                }}
              />
              <div className="nav-dp-fallback hidden w-full h-full items-center justify-center font-onest font-bold text-white text-sm bg-[#042718]">
                DP
              </div>
            </div>
            {/* Green available status dot on corner */}
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#188E39] border-2 border-[#FAFDFB]"
              title="Available"
            />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-onest text-base font-bold text-[#042718] leading-none tracking-[-0.2px]">
                Deepak Prasad
              </span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#188E39] animate-pulse" />
            </div>
            <span className="font-inter text-[12px] text-[#042718]/70 font-medium leading-none block mt-1">
              Senior Product Manager
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (Strictly hidden below 1024px) */}
        <nav id="desktop-nav-links" className="nav-desktop-only hidden lg:flex items-center gap-7 xl:gap-8">
          {navLinks.map((link) => {
            const [linkPath] = link.path.split("#");
            const currentBase = currentPath.split("#")[0] || "/";
            const isActive =
              link.path === "/work"
                ? currentBase.startsWith("/work")
                : link.path.includes("#")
                ? false
                : currentBase === linkPath;

            return (
              <a
                key={link.label}
                href={link.path}
                onClick={(e) => handleLinkClick(link, e)}
                id={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={`font-inter text-[14px] sm:text-[15px] leading-6 tracking-[-0.2px] transition-all relative py-1 ${
                  isActive
                    ? "text-[#042718] font-semibold"
                    : "text-[#042718]/80 font-medium hover:text-[#042718]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action CTAs & Mobile Toggle */}
        <div className="flex items-center gap-3.5">
          {/* Desktop CTAs (Strictly hidden below 1024px) */}
          <div id="desktop-nav-ctas" className="nav-desktop-only hidden lg:flex items-center gap-3.5">
            <button
              type="button"
              id="nav-resume-button"
              onClick={() => {
                if (onOpenResumeModal) onOpenResumeModal();
                else onNavigate("/resume");
              }}
              className="inline-flex items-center gap-2 text-[#042718] text-[14px] font-medium px-3.5 py-1.5 rounded-full hover:bg-white/60 transition-colors border border-transparent hover:border-[#042718]/10 cursor-pointer"
            >
              <FileText size={16} className="text-[#188E39]" />
              <span>Resume</span>
            </button>

            {/* Book Chat Pill Link */}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener"
              id="nav-contact-cta"
              onMouseEnter={() => setIsNavHovered(true)}
              onMouseLeave={() => setIsNavHovered(false)}
              className={
                "flex items-center gap-2.5 py-1.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-md border border-[#042718]/15 group cursor-pointer relative h-10 transition-all duration-300 shadow-2xs " +
                (isNavHovered ? "flex-row-reverse pl-1.5 pr-4" : "flex-row pl-4 pr-1.5")
              }
            >
              <span className="font-inter text-xs lg:text-[13px] font-semibold leading-5 text-[#042718]">
                Book Chat
              </span>
              <div className="w-7 h-7 rounded-full bg-[#042718] flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
              </div>
            </a>
          </div>

          {/* Mobile Menu Toggle (Strictly hidden on 1024px and above; visible on mobile/tablet) */}
          <button
            type="button"
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="nav-mobile-toggle flex lg:hidden p-2 text-[#042718] bg-white/80 backdrop-blur-sm rounded-full border border-[#042718]/10 cursor-pointer shadow-2xs"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#FAFDFB]/95 backdrop-blur-lg border-b border-[#042718]/10 px-6 py-6 flex flex-col gap-5"
          >
            <ul className="flex flex-col gap-3.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.path}
                    onClick={(e) => handleLinkClick(link, e)}
                    className="font-inter text-base block py-1 text-[#042718] font-medium hover:text-[#188E39]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-[#042718]/10 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenResumeModal) onOpenResumeModal();
                  else onNavigate("/resume");
                }}
                className="w-full py-2.5 rounded-full bg-white border border-[#042718]/15 text-[#042718] font-inter font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <FileText size={16} className="text-[#188E39]" />
                <span>View Full Resume</span>
              </button>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-full bg-[#042718] text-white font-inter font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Book Chat</span>
                <ArrowUpRight size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

