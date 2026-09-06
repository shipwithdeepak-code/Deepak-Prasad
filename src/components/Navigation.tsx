import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X, FileText } from "lucide-react";

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
    { label: "ReshaMandi Deep Dive", path: "/work/reshamandi-b2b" },
    { label: "Process", path: "/#methodology", targetId: "methodology" },
    { label: "Principles", path: "/#principles", targetId: "principles" },
    { label: "Track Record", path: "/about#experience", targetId: "experience" },
    { label: "Advisory", path: "/contact", targetId: "advisory" },
  ];

  const handleLinkClick = (link: { label: string; path: string; targetId?: string }, e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (link.targetId && (currentPath === "/" || currentPath === "")) {
      const el = document.getElementById(link.targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
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
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Monogram Logo */}
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
          <div className="w-9.5 h-9.5 rounded-full bg-[#042718] flex items-center justify-center font-onest font-bold text-white text-sm shadow-xs group-hover:scale-105 transition-transform shrink-0">
            DP
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

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
          {navLinks.map((link) => {
            const isActive =
              currentPath === link.path ||
              (link.path === "/work" && currentPath.startsWith("/work/"));

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

        {/* Action CTAs */}
        <div className="flex items-center gap-3.5">
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

          {/* Book Chat Pill Button */}
          <button
            type="button"
            id="nav-contact-cta"
            onClick={() => {
              if (onOpenContactModal) onOpenContactModal();
              else onNavigate("/contact");
            }}
            onMouseEnter={() => setIsNavHovered(true)}
            onMouseLeave={() => setIsNavHovered(false)}
            className={
              "hidden sm:flex items-center gap-2.5 py-1.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-md border border-[#042718]/15 group cursor-pointer relative h-10 transition-all duration-300 shadow-2xs " +
              (isNavHovered ? "flex-row-reverse pl-1.5 pr-4" : "flex-row pl-4 pr-1.5")
            }
          >
            <span className="font-inter text-xs lg:text-[13px] font-semibold leading-5 text-[#042718]">
              Book Chat
            </span>
            <div className="w-7 h-7 rounded-full bg-[#042718] flex items-center justify-center shrink-0">
              <ArrowUpRight className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#042718] bg-white/80 backdrop-blur-sm rounded-full border border-[#042718]/10 cursor-pointer shadow-2xs"
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

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenContactModal) onOpenContactModal();
                  else onNavigate("/contact");
                }}
                className="w-full py-2.5 rounded-full bg-[#042718] text-white font-inter font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <span>Book Chat</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

