import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, FileText } from "lucide-react";

import { CALENDLY_URL } from "../utils/calendly";
import { NAV_LINKS } from "../data/nav";

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

  const navLinks = NAV_LINKS;

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
          : "bg-void/90 backdrop-blur-md border-b border-[var(--rule)] shadow-xs"
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
          className="flex items-center gap-3 hover:opacity-85 transition-opacity group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-void rounded-sm"
          id="nav-logo"
        >
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--rule-strong)] shadow-xs group-hover:scale-105 transition-transform bg-ghost flex items-center justify-center relative">
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
              <div className="nav-dp-fallback hidden w-full h-full items-center justify-center font-display font-bold text-ivory text-sm bg-ghost">
                DP
              </div>
            </div>
            {/* Live status dot on corner */}
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-live border-2 border-void"
              title="Available"
            />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2">
              <span className="font-display text-base font-semibold text-ivory leading-none tracking-[-0.02em]">
                Deepak Prasad
              </span>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute leading-none block mt-1">
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
                className={`font-body text-[14px] sm:text-[15px] leading-6 tracking-tight transition-colors relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-void rounded-sm ${
                  isActive
                    ? "text-coral font-semibold"
                    : "text-ivory/80 font-medium hover:text-ivory"
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
              className="font-mono uppercase text-[11px] tracking-[0.16em] inline-flex items-center gap-2 text-ivory px-3.5 py-1.5 rounded-full border border-[var(--rule-strong)] hover:border-coral transition-all active:scale-[.97] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-void"
            >
              <FileText size={14} className="text-coral" />
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
                "flex items-center gap-2.5 py-1.5 rounded-full bg-coral text-void hover:bg-[#F6AE96] active:scale-[.97] cursor-pointer relative h-10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-void " +
                (isNavHovered ? "flex-row-reverse pl-2 pr-4" : "flex-row pl-4 pr-2")
              }
            >
              <span className="font-mono text-xs uppercase tracking-[0.14em] font-semibold leading-5 text-void">
                Book Chat
              </span>
              <div className="w-7 h-7 rounded-full bg-void text-ivory flex items-center justify-center shrink-0">
                <ArrowUpRight className="w-3.5 h-3.5 text-coral group-hover:scale-110 transition-transform" />
              </div>
            </a>
          </div>

          {/* Mobile Menu Toggle (Strictly hidden on 1024px and above; visible on mobile/tablet) */}
          <button
            type="button"
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="nav-mobile-toggle flex lg:hidden p-2 text-ivory bg-ghost/80 backdrop-blur-sm rounded-full border border-[var(--rule)] cursor-pointer active:scale-[.97] hover:border-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-void shadow-2xs"
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
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-void/95 backdrop-blur-lg border-b border-[var(--rule)] px-6 py-6 flex flex-col gap-5"
          >
            <ul className="flex flex-col gap-3.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.path}
                    onClick={(e) => handleLinkClick(link, e)}
                    className="font-body text-base block py-1 text-ivory font-medium hover:text-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-void rounded-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-[var(--rule)] flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenResumeModal) onOpenResumeModal();
                  else onNavigate("/resume");
                }}
                className="w-full py-2.5 rounded-full bg-ghost border border-[var(--rule-strong)] text-ivory font-mono uppercase text-xs tracking-[0.16em] font-medium flex items-center justify-center gap-2 cursor-pointer active:scale-[.97] hover:border-coral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-void shadow-2xs"
              >
                <FileText size={16} className="text-coral" />
                <span>View Full Resume</span>
              </button>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-full bg-coral text-void font-mono uppercase text-xs tracking-[0.14em] font-semibold flex items-center justify-center gap-2 cursor-pointer active:scale-[.97] hover:bg-[#F6AE96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-void shadow-xs"
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

