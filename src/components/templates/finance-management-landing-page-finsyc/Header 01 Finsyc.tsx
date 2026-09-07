"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Menu, X, FileText, Calendar, Mail, Linkedin, Github } from "lucide-react";
import { CALENDLY_URL } from "../../../utils/calendly";

interface HeaderProps {
  className?: string;
  onOpenCaseStudy?: (id?: string) => void;
  onOpenContact?: () => void;
  onOpenResume?: () => void;
}

export default function Header01Finsyc({
  className,
  onOpenCaseStudy,
  onOpenContact,
  onOpenResume,
}: HeaderProps) {
  const [isNavHovered, setIsNavHovered] = useState(false);
  const [isCTAHovered, setIsCTAHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
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

  const navItems = [
    { label: "Work", href: "#flagship-case-study" },
    { label: "ReshaMandi Deep Dive", href: "#flagship-case-study", isCaseStudyTrigger: true },
    { label: "Process", href: "#methodology" },
    { label: "Principles", href: "#principles" },
    { label: "Track Record", href: "#experience" },
    { label: "Advisory", href: "#pricing" },
  ];

  const domainPills = [
    "ReshaMandi B2B Ecosystem",
    "Instant Payouts Engine (99.9%)",
    "Computer Vision ML Grading",
    "Sportstech B2C SaaS",
    "0→1 AI Product Advisory",
    "Multi-Tier Supply Chain",
    "Dynamic Bidding Auctions (>35%)",
  ];

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Onest:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600&display=swap"
        rel="stylesheet"
        crossOrigin="anonymous"
      />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" as const }}
        className={"relative w-full overflow-hidden min-h-[840px] lg:min-h-[920px] bg-[#FAFDFB] " + (className || "")}
      >
        {/* Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {isMounted && (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source
                src="https://cdn.jiro.build/Amox/All%20Images/P01-Header-01-BG.mp4"
                type="video/mp4"
              />
            </video>
          )}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 lg:pt-8 pb-12">
          {/* Navigation Bar */}
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" as const }}
            className="flex items-center justify-between"
          >
            {/* Monogram Logo */}
            <a
              href="#"
              className="flex items-center gap-3 hover:opacity-85 transition-opacity group"
            >
              <div className="w-9 h-9 rounded-full bg-[#042718] flex items-center justify-center font-onest font-bold text-white text-sm shadow-md group-hover:scale-105 transition-transform">
                DP
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-onest text-base font-bold text-[#042718] leading-none">
                    Deepak Prasad
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#188E39] animate-pulse" />
                </div>
                <span className="font-inter text-[11px] text-[#042718]/70 font-medium leading-tight block">
                  Senior Product Manager
                </span>
              </div>
            </a>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center gap-7">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      if (item.isCaseStudyTrigger && onOpenCaseStudy) {
                        e.preventDefault();
                        onOpenCaseStudy("reshamandi-b2b");
                      }
                    }}
                    className="font-inter text-[15px] leading-6 tracking-[-0.3px] text-[#042718] font-normal opacity-80 hover:opacity-100 hover:font-semibold transition-all"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {onOpenResume && (
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="hidden lg:inline-flex items-center gap-1.5 text-[#042718] text-[14px] font-medium px-3.5 py-1.5 rounded-full hover:bg-white/60 transition-colors border border-transparent hover:border-[#042718]/10 cursor-pointer"
                >
                  <FileText size={15} className="text-[#188E39]" />
                  <span>Resume</span>
                </button>
              )}

              <motion.a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener"
                onMouseEnter={() => setIsNavHovered(true)}
                onMouseLeave={() => setIsNavHovered(false)}
                layout
                className={
                  "hidden lg:flex items-center gap-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-[#042718]/15 group cursor-pointer relative h-11 transition-all duration-300 shadow-sm " +
                  (isNavHovered ? "flex-row-reverse pl-1.5 pr-[18px]" : "flex-row pl-[18px] pr-1.5")
                }
              >
                <motion.span
                  layout
                  className="font-inter text-sm font-semibold leading-6 tracking-[-0.3px] text-[#042718]"
                >
                  Book Chat
                </motion.span>

                <motion.div
                  layout
                  className="w-8 h-8 rounded-full bg-[#042718] flex items-center justify-center relative overflow-hidden shrink-0"
                >
                  <motion.div
                    animate={{
                      x: isNavHovered ? [-20, 0] : 0,
                      opacity: isNavHovered ? [0, 1] : 1,
                    }}
                    transition={{ duration: 0.3, delay: isNavHovered ? 0.1 : 0 }}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                </motion.div>
              </motion.a>

              {/* Mobile Menu Toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-[#042718] bg-white/40 backdrop-blur-md rounded-full border border-[#042718]/10 cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </motion.nav>

          {/* Mobile Navigation Drawer */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring" as const, damping: 25, stiffness: 200 }}
                className="fixed inset-0 z-[100] lg:hidden bg-[#FAFDFB] px-6 py-8 flex flex-col gap-8"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#042718] text-white font-bold flex items-center justify-center text-xs">
                      DP
                    </div>
                    <span className="font-onest font-bold text-lg text-[#042718]">Deepak Prasad</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-[#042718] bg-[#042718]/5 rounded-full cursor-pointer"
                  >
                    <X size={24} />
                  </button>
                </div>

                <ul className="flex flex-col gap-5">
                  {navItems.map((item, idx) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 * idx, ease: "easeOut" as const }}
                    >
                      <a
                        href={item.href}
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          if (item.isCaseStudyTrigger && onOpenCaseStudy) {
                            onOpenCaseStudy("reshamandi-b2b");
                          }
                        }}
                        className="font-inter text-xl font-semibold text-[#042718]"
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-auto space-y-3">
                  {onOpenResume && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onOpenResume();
                      }}
                      className="w-full py-3 rounded-full bg-white border border-[#042718]/15 text-[#042718] font-inter font-semibold text-base shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FileText size={18} className="text-[#188E39]" />
                      <span>View Full Resume</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (onOpenCaseStudy) onOpenCaseStudy("reshamandi-b2b");
                    }}
                    className="w-full py-3.5 rounded-full bg-[#188E39] text-white font-inter font-semibold text-base shadow-md cursor-pointer"
                  >
                    Explore ReshaMandi Deep Dive
                  </button>
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3.5 rounded-full bg-[#042718] text-white font-inter font-semibold text-base cursor-pointer text-center block"
                  >
                    Book Strategy Chat
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Hero Content */}
          <div className="flex flex-col items-center mt-10 lg:mt-[70px]">
            {/* Status / Positioning Badge */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" as const }}
              className="flex flex-row items-center gap-1.5 sm:gap-2 px-3.5 sm:px-[16px] py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#042718]/15 mb-6 shadow-xs whitespace-nowrap"
            >
              <div className="flex items-center gap-1.5 shrink-0">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#188E39]" />
                <span className="font-inter text-xs sm:text-sm lg:text-[15px] font-semibold text-[#042718]">
                  Senior Product Manager
                </span>
              </div>
              <span className="text-[#042718]/30 font-bold">•</span>
              <span className="font-inter text-xs sm:text-sm lg:text-[15px] font-normal text-[#042718]/80 shrink-0">
                Data, AI & Operational Systems
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" as const }}
              className="max-w-[900px] w-full text-center font-onest text-[38px] sm:text-[52px] lg:text-[68px] font-semibold leading-[1.08] lg:leading-[74px] tracking-tight lg:tracking-[-3px] text-[#042718]"
            >
              I build complex products from{" "}
              <span className="font-playfair italic font-semibold text-[#000001] opacity-50 tracking-normal lg:tracking-[-3px]">
                ambiguous problems
              </span>{" "}
              — using data, AI and technology.
            </motion.h1>

            {/* Subheading Narrative */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" as const }}
              className="max-w-[680px] w-full text-center mt-5 font-inter text-base sm:text-lg lg:text-[20px] font-normal leading-relaxed lg:leading-[30px] tracking-[-0.4px] text-[#042718]/85"
            >
              Hi, I’m <strong className="font-semibold text-[#042718]">Deepak Prasad</strong>. I create new product experiences, business models, and operational systems that solve hard physical-digital frictions in high-stakes B2B marketplaces and data-driven platforms.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" as const }}
              className="flex flex-col sm:flex-row items-center gap-4 mt-8 lg:mt-10"
            >
              <button
                type="button"
                onClick={() => onOpenCaseStudy && onOpenCaseStudy("reshamandi-b2b")}
                onMouseEnter={() => setIsCTAHovered(true)}
                onMouseLeave={() => setIsCTAHovered(false)}
                className={
                  "flex items-center gap-3 py-2 rounded-full bg-[#042718] group cursor-pointer relative h-14 border border-white/20 transition-all duration-300 shadow-md " +
                  (isCTAHovered ? "flex-row-reverse pl-2 pr-5" : "flex-row pl-5 pr-2")
                }
              >
                <motion.span
                  layout
                  className="font-inter text-base lg:text-[17px] font-semibold leading-[28px] text-white"
                >
                  Explore ReshaMandi Deep Dive
                </motion.span>

                <motion.div
                  layout
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center relative overflow-hidden shrink-0"
                >
                  <motion.div
                    animate={{
                      x: isCTAHovered ? [-24, 0] : 0,
                      opacity: isCTAHovered ? [0, 1] : 1,
                    }}
                    transition={{ duration: 0.3, delay: isCTAHovered ? 0.1 : 0 }}
                  >
                    <ArrowUpRight className="w-4 h-4 text-[#042718]" />
                  </motion.div>
                </motion.div>
              </button>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 px-6 h-14 rounded-full bg-white/70 backdrop-blur-md border border-[#042718]/15 text-[#042718] font-inter font-semibold text-base hover:bg-white transition-all shadow-xs cursor-pointer active:scale-98"
              >
                <Calendar size={17} className="text-[#188E39]" />
                <span>Book Strategy Chat</span>
              </a>
            </motion.div>

            {/* Bottom Marquee / Domain Ticker */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 1, ease: "easeOut" as const }}
              className="mt-16 lg:mt-[100px] flex flex-col items-center gap-6 w-full"
            >
              <div className="px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#042718]/10 shadow-xs">
                <p className="font-inter text-xs sm:text-sm font-semibold tracking-[-0.2px] text-[#042718]/80 text-center">
                  Proven track record across 0→1 discovery, B2B marketplaces, and AI workflow systems
                </p>
              </div>

              <div
                className="w-full overflow-hidden py-2"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                } as React.CSSProperties}
              >
                <motion.div
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    duration: 28,
                    ease: "linear" as const,
                    repeat: Infinity as number,
                  }}
                  className="flex items-center gap-6 sm:gap-10 w-fit whitespace-nowrap"
                >
                  {[...domainPills, ...domainPills].map((pill, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/60 border border-[#042718]/10 shadow-xs text-xs sm:text-sm font-medium text-[#042718]"
                    >
                      <span className="w-2 h-2 rounded-full bg-[#188E39]" />
                      <span>{pill}</span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
