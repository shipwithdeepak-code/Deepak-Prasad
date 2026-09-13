import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Linkedin,
  Github,
  Mail,
  Sparkles,
  ArrowUpRight,
  FileText,
  Calendar,
  Download,
} from "lucide-react";
import { CALENDLY_URL } from "../utils/calendly";
import { downloadResumePDF } from "../utils/downloadResume";
import { CONTACT_EMAIL, CONTACT_MAILTO, GITHUB_URL, LINKEDIN_URL } from "../utils/contact";

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenResumeModal?: () => void;
  onOpenContactModal?: () => void;
  onSelectCaseStudy?: (id?: string) => void;
}

export default function Footer({
  onNavigate,
  onOpenResumeModal,
  onOpenContactModal,
  onSelectCaseStudy,
}: FooterProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmailInput("");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const elementId = href.replace("#", "");
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      } else {
        onNavigate("/" + href);
      }
    } else {
      onNavigate(href);
    }
  };

  return (
    <footer className="relative w-full overflow-hidden flex flex-col items-center bg-void text-ivory">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {isMounted && (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-15"
          >
            <source
              src="https://cdn.jiro.build/Amox/All%20Images/P01-Header-01-BG.mp4"
              type="video/mp4"
            />
          </video>
        )}
        <div className="absolute inset-0 bg-void/85" />
        <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-void/40 backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_40%,transparent)]" />
      </div>

      {/* CTA SECTION */}
      <section className="w-full relative pt-20 lg:pt-32 pb-0 overflow-hidden flex flex-col items-center">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-void via-void/70 to-transparent pointer-events-none" />

        <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-[96px] relative z-10 flex flex-col items-center">
          <div className="max-w-[1248px] w-full flex flex-col items-center">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-ghost border border-[var(--rule-strong)] mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-coral" />
              <span className="text-coral text-xs font-mono font-medium uppercase tracking-[0.18em]">
                Open for High-Impact Roles
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="w-full max-w-[820px] text-center text-ivory font-display font-semibold text-[38px] md:text-[60px] leading-[1.1] tracking-tight md:tracking-[-2px] mb-4"
              style={{ fontVariationSettings: '"wdth" 92' }}
            >
              Let’s build something{" "}
              <i
                className="font-display not-italic"
                style={{ fontStyle: "italic", fontWeight: 600, color: "var(--color-coral)" }}
              >
                extraordinary
              </i>{" "}
              together
            </motion.h2>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="w-full max-w-[660px] text-center text-mute font-body text-base md:text-lg leading-relaxed mb-10"
            >
              Looking for a Senior Product Manager who thrives in ambiguity,
              talks to real users, and builds resilient physical-digital
              systems? Let’s connect.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row items-center gap-4"
            >
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="footer-book-strategy-chat-cta"
                className="h-14 px-8 rounded-full bg-coral text-void font-mono uppercase text-xs tracking-[0.14em] font-semibold hover:bg-[#F6AE96] active:scale-[.97] transition-all flex items-center gap-3 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-void shadow-xs"
              >
                <Calendar size={18} className="text-void" />
                <span>Book Strategy Chat</span>
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>

              {onOpenResumeModal && (
                <button
                  type="button"
                  id="footer-view-resume-cta"
                  onClick={onOpenResumeModal}
                  className="h-14 px-8 rounded-full bg-ghost/80 backdrop-blur-md border border-[var(--rule-strong)] text-ivory font-mono uppercase text-xs tracking-[0.16em] font-semibold hover:border-coral active:scale-[.97] transition-all flex items-center gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 focus-visible:ring-offset-void shadow-xs"
                >
                  <FileText size={18} className="text-coral" />
                  <span>View Full Resume</span>
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER LINKS SECTION */}
      <div className="relative w-full flex flex-col items-center">
        <div className="relative z-10 w-full max-w-[1440px] px-6 lg:px-[96px] pt-16 pb-8 flex flex-col items-start bg-transparent">
          {/* Content Row */}
          <motion.div
            className="w-full lg:w-[1248px] pt-16 lg:pt-24 pb-16 flex flex-col lg:flex-row items-start gap-12 lg:gap-24 border-t border-[var(--rule)] mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {/* Left Column: Direct Contact Form */}
            <div className="w-full lg:w-[460px] flex flex-col gap-5">
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-ghost border border-[var(--rule-strong)] text-ivory font-display font-bold flex items-center justify-center text-sm">
                  DP
                </div>
                <div>
                  <h3 className="text-ivory font-display text-xl font-bold tracking-tight">
                    Deepak Prasad
                  </h3>
                  <p className="text-xs text-mute font-mono uppercase tracking-[0.18em]">
                    Senior Product Manager
                  </p>
                </div>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="text-mute font-body text-sm leading-relaxed"
              >
                Specializing in complex B2B marketplaces, 0→1 discovery,
                physical-digital workflow digitisation, and AI model productization.
              </motion.p>

              {/* Direct quick message input */}
              <motion.form
                variants={itemVariants}
                onSubmit={handleSubscribe}
                className="mt-2 relative w-full flex flex-col sm:flex-row items-stretch sm:items-center p-1.5 rounded-[24px] sm:rounded-full border border-[var(--rule-strong)] bg-ghost backdrop-blur-md shadow-xs"
              >
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email for notes & updates"
                  className="flex-1 bg-transparent border-none outline-none px-4 py-2 font-body text-sm text-ivory placeholder:text-mute focus-visible:outline-none"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-coral px-5 py-2.5 rounded-full text-void font-mono uppercase text-xs tracking-[0.14em] font-semibold shadow-xs hover:bg-[#F6AE96] active:scale-[.97] transition-all shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                >
                  <span>{subscribed ? "Subscribed!" : "Subscribe"}</span>
                  <ArrowRight size={14} />
                </button>
              </motion.form>
            </div>

            {/* Right Columns (Navigation Links) */}
            <div className="lg:ml-auto grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-16 w-full lg:w-auto">
              {/* Column 1: Portfolio */}
              <div className="flex flex-col gap-4">
                <motion.div variants={itemVariants} className="flex flex-col">
                  <div
                    className="w-6 h-[2px] rounded-full bg-coral mb-3"
                    aria-hidden="true"
                  />
                  <h4 className="text-ivory font-mono text-xs font-semibold uppercase tracking-[0.18em]">
                    Portfolio
                  </h4>
                </motion.div>
                <ul className="flex flex-col gap-2.5">
                  {[
                    {
                      name: "ReshaMandi Deep Dive",
                      href: "/work",
                      onClick: () => {
                        if (onSelectCaseStudy) {
                          onSelectCaseStudy("01");
                        } else {
                          handleNavClick("#flagship-case-study");
                        }
                      },
                    },
                    {
                      name: "Download Resume (PDF)",
                      onClick: () => {
                        downloadResumePDF();
                      },
                      icon: Download,
                    },
                    { name: "Product Methodology", href: "/about" },
                    { name: "Operating Principles", href: "/#principles" },
                    { name: "Key Metrics", href: "/#track-record" },
                  ].map((link) => (
                    <motion.li key={link.name} variants={itemVariants}>
                      {link.onClick ? (
                        <button
                          type="button"
                          onClick={link.onClick}
                          className="text-mute font-body text-sm hover:text-coral transition-colors text-left cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-sm"
                        >
                          {link.icon && (
                            <link.icon size={13} className="text-coral" />
                          )}
                          <span>{link.name}</span>
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(link.href);
                          }}
                          className="text-mute font-body text-sm hover:text-coral transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-sm"
                        >
                          {link.name}
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Column 2: Engage */}
              <div className="flex flex-col gap-4">
                <motion.div variants={itemVariants} className="flex flex-col">
                  <div
                    className="w-6 h-[2px] rounded-full bg-coral mb-3"
                    aria-hidden="true"
                  />
                  <h4 className="text-ivory font-mono text-xs font-semibold uppercase tracking-[0.18em]">
                    Engage
                  </h4>
                </motion.div>
                <ul className="flex flex-col gap-2.5">
                  {[
                    {
                      name: "Full-Time Roles",
                      onClick: () => {
                        if (onOpenContactModal) onOpenContactModal();
                        else window.open(CALENDLY_URL, "_blank");
                      },
                    },
                    {
                      name: "0→1 Discovery Sprint",
                      onClick: () => {
                        if (onOpenContactModal) onOpenContactModal();
                        else window.open(CALENDLY_URL, "_blank");
                      },
                    },
                    {
                      name: "Advisory Retainer",
                      onClick: () => {
                        if (onOpenContactModal) onOpenContactModal();
                        else window.open(CALENDLY_URL, "_blank");
                      },
                    },
                    { name: "Read PM Essays", href: "/#principles" },
                  ].map((item, idx) => (
                    <motion.li key={idx} variants={itemVariants}>
                      {item.onClick ? (
                        <button
                          type="button"
                          onClick={item.onClick}
                          className="text-mute font-body text-sm hover:text-coral transition-colors text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-sm"
                        >
                          {item.name}
                        </button>
                      ) : (
                        <a
                          href={item.href}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item.href!);
                          }}
                          className="text-mute font-body text-sm hover:text-coral transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-sm"
                        >
                          {item.name}
                        </a>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Connect */}
              <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
                <motion.div variants={itemVariants} className="flex flex-col">
                  <div
                    className="w-6 h-[2px] rounded-full bg-coral mb-3"
                    aria-hidden="true"
                  />
                  <h4 className="text-ivory font-mono text-xs font-semibold uppercase tracking-[0.18em]">
                    Connect
                  </h4>
                </motion.div>
                <ul className="flex flex-col gap-2.5">
                  {[
                    {
                      name: "LinkedIn",
                      icon: Linkedin,
                      href: LINKEDIN_URL,
                    },
                    {
                      name: "GitHub",
                      icon: Github,
                      href: GITHUB_URL,
                    },
                    {
                      name: CONTACT_EMAIL,
                      icon: Mail,
                      href: CONTACT_MAILTO,
                    },
                  ].map((social, idx) => (
                    <motion.li key={idx} variants={itemVariants}>
                      <a
                        href={social.href}
                        target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                        className="flex items-center gap-2 text-mute font-body text-sm hover:text-coral transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-sm"
                      >
                        <social.icon size={15} className="text-coral" />
                        <span>{social.name}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Big Watermark: DEEPAK PRASAD */}
          <div className="w-full max-w-full flex justify-center items-center select-none py-4 sm:py-6 px-4 overflow-hidden">
            <motion.div
              aria-hidden="true"
              initial={{ y: "60%", opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              className="w-full text-center text-ivory/[0.05] font-display text-[clamp(38px,10vw,150px)] font-bold leading-none tracking-tighter whitespace-nowrap select-none"
              style={{ fontVariationSettings: '"wdth" 92' }}
            >
              Deepak Prasad
            </motion.div>
          </div>

          {/* Bottom Copyright Row */}
          <motion.div
            className="w-full lg:w-[1248px] pt-6 pb-4 border-t border-[var(--rule)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.12em] text-mute"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              &copy; {new Date().getFullYear()} Deepak Prasad. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span>Senior Product Manager</span>
              <span>/</span>
              <span>Bengaluru / Remote</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
