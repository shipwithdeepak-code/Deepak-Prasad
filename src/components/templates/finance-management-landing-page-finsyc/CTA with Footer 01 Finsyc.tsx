"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Github, Mail, Sparkles, ArrowUpRight, FileText, Calendar, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { downloadResumePDF } from "@/utils/downloadResume";
import { CALENDLY_URL } from "@/utils/calendly";

interface CTAProps {
  className?: string;
  onOpenContact?: () => void;
  onOpenResume?: () => void;
  onOpenCaseStudy?: (id?: string) => void;
}

export default function CtaWithFooter01Finsyc({
  className,
  onOpenContact,
  onOpenResume,
  onOpenCaseStudy,
}: CTAProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
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
        ease: [0.21, 0.45, 0.32, 0.9] as const,
      },
    },
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600&display=swap"
        rel="stylesheet"
      />

      <footer className={"relative w-full overflow-hidden flex flex-col items-center " + (className || "")}>
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          {isMounted && (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-20"
            >
              <source
                src="https://cdn.jiro.build/Amox/All%20Images/P01-Header-01-BG.mp4"
                type="video/mp4"
              />
            </video>
          )}
          <div className="absolute inset-0 bg-[#FAFDFB]/70" />
          <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-white/5 backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black_40%,transparent)] pointer-events-none" />
        </div>

        {/* CTA SECTION */}
        <section className="w-full relative pt-20 lg:pt-32 pb-0 overflow-hidden flex flex-col items-center">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#FAFDFB] via-[#FAFDFB]/60 to-transparent" />

          <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-[96px] relative z-10 flex flex-col items-center">
            <div className="max-w-[1248px] w-full flex flex-col items-center">
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E4F2EB] border border-[#188E39]/15 mb-6"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#188E39]" />
                <span className="text-[#188E39] text-xs font-inter font-bold uppercase tracking-wider">
                  Open for High-Impact Roles
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="w-full max-w-[820px] text-center text-[#042718] font-semibold text-[38px] md:text-[60px] leading-[1.1] tracking-tight md:tracking-[-2px] mb-4 font-onest"
              >
                Let’s build something <span className="font-playfair italic font-medium text-black/40">extraordinary</span> together
              </motion.h2>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="w-full max-w-[660px] text-center text-[#042718]/80 font-inter text-base md:text-lg leading-relaxed mb-10"
              >
                Looking for a Senior Product Manager who thrives in ambiguity, talks to real users, and builds resilient physical-digital systems? Let’s connect.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener"
                  className="h-14 px-8 rounded-full bg-[#042718] text-white font-inter font-semibold text-base shadow-lg hover:bg-[#042718]/90 transition-all flex items-center gap-3 group cursor-pointer"
                >
                  <Calendar size={18} className="text-[#34D399]" />
                  <span>Book Strategy Chat</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                {onOpenResume && (
                  <button
                    type="button"
                    onClick={onOpenResume}
                    className="h-14 px-8 rounded-full bg-white/70 backdrop-blur-md border border-[#042718]/15 text-[#042718] font-inter font-semibold text-base hover:bg-white transition-all flex items-center gap-2.5 cursor-pointer shadow-xs"
                  >
                    <FileText size={18} className="text-[#188E39]" />
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
              className="w-full lg:w-[1248px] pt-16 lg:pt-24 pb-16 flex flex-col lg:flex-row items-start gap-12 lg:gap-24 border-t border-[#042718]/10 mt-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
            >
              {/* Left Column: Direct Contact Form */}
              <div className="w-full lg:w-[460px] flex flex-col gap-5">
                <motion.div variants={itemVariants} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#042718] text-white font-onest font-bold flex items-center justify-center text-sm">
                    DP
                  </div>
                  <div>
                    <h3 className="text-[#042718] font-onest text-xl font-bold tracking-tight">
                      Deepak Prasad
                    </h3>
                    <p className="text-xs text-[#042718]/60 font-inter">Senior Product Manager</p>
                  </div>
                </motion.div>

                <motion.p
                  variants={itemVariants}
                  className="text-[#042718]/75 font-inter text-sm leading-relaxed"
                >
                  Specializing in complex B2B marketplaces, 0→1 discovery, physical-digital workflow digitisation, and AI model productization.
                </motion.p>

                {/* Direct quick message input */}
                <motion.form
                  variants={itemVariants}
                  onSubmit={handleSubscribe}
                  className="mt-2 relative w-full flex flex-col sm:flex-row items-stretch sm:items-center p-1.5 rounded-[24px] sm:rounded-full border border-[#042718]/15 bg-white/70 backdrop-blur-md shadow-xs"
                >
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email for notes & updates"
                    className="flex-1 bg-transparent border-none outline-none px-4 py-2 font-inter text-sm text-[#042718] placeholder:text-[#042718]/50"
                  />
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-[#042718] px-5 py-2.5 rounded-full text-white font-inter text-xs font-semibold shadow-xs hover:bg-[#042718]/90 transition-all shrink-0 cursor-pointer"
                  >
                    <span>{subscribed ? "Subscribed!" : "Subscribe"}</span>
                    <ArrowRight size={14} />
                  </button>
                </motion.form>
              </div>

              {/* Right Column (Navigation Links) */}
              <div className="lg:ml-auto grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-16 w-full lg:w-auto">
                {/* Navigation */}
                <div className="flex flex-col gap-4">
                  <motion.div variants={itemVariants} className="flex flex-col">
                    <div
                      className="w-6 h-[3px] rounded-full bg-[#188E39] mb-3"
                      aria-hidden="true"
                    />
                    <h4 className="text-[#042718] font-onest text-sm font-bold uppercase tracking-wider">
                      Portfolio
                    </h4>
                  </motion.div>
                  <ul className="flex flex-col gap-2.5">
                    {[
                      { name: "ReshaMandi Deep Dive", href: "#flagship-case-study" },
                      {
                        name: "Resume (Original PDF)",
                        onClick: () => {
                          if (onOpenResume) {
                            onOpenResume();
                          } else {
                            downloadResumePDF();
                          }
                        },
                      },
                      { name: "Product Methodology", href: "#methodology" },
                      { name: "Operating Principles", href: "#principles" },
                      { name: "Key Metrics", href: "#metrics" },
                    ].map((link) => (
                      <motion.li key={link.name} variants={itemVariants}>
                        {link.onClick ? (
                          <button
                            type="button"
                            onClick={link.onClick}
                            className="text-[#042718]/70 font-inter text-sm hover:text-[#188E39] hover:font-medium transition-all text-left cursor-pointer flex items-center gap-1.5"
                          >
                            <Download size={13} className="text-[#188E39]" />
                            <span>{link.name}</span>
                          </button>
                        ) : (
                          <a
                            href={link.href}
                            onClick={(e) => {
                              if (link.name.includes("Deep Dive") && onOpenCaseStudy) {
                                e.preventDefault();
                                onOpenCaseStudy("reshamandi-b2b");
                              }
                            }}
                            className="text-[#042718]/70 font-inter text-sm hover:text-[#042718] hover:font-medium transition-all"
                          >
                            {link.name}
                          </a>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Collaboration */}
                <div className="flex flex-col gap-4">
                  <motion.div variants={itemVariants} className="flex flex-col">
                    <div
                      className="w-6 h-[3px] rounded-full bg-[#188E39] mb-3"
                      aria-hidden="true"
                    />
                    <h4 className="text-[#042718] font-onest text-sm font-bold uppercase tracking-wider">
                      Engage
                    </h4>
                  </motion.div>
                  <ul className="flex flex-col gap-2.5">
                    {[
                      { name: "Full-Time Roles", onClick: onOpenContact },
                      { name: "0→1 Discovery Sprint", onClick: onOpenContact },
                      { name: "Advisory Retainer", onClick: onOpenContact },
                      { name: "Read PM Essays", href: "#writing" },
                    ].map((item, idx) => (
                      <motion.li key={idx} variants={itemVariants}>
                        {item.onClick ? (
                          <button
                            type="button"
                            onClick={item.onClick}
                            className="text-[#042718]/70 font-inter text-sm hover:text-[#042718] hover:font-medium transition-all text-left cursor-pointer"
                          >
                            {item.name}
                          </button>
                        ) : (
                          <a
                            href={item.href}
                            className="text-[#042718]/70 font-inter text-sm hover:text-[#042718] hover:font-medium transition-all"
                          >
                            {item.name}
                          </a>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Social & Contact */}
                <div className="flex flex-col gap-4 col-span-2 sm:col-span-1">
                  <motion.div variants={itemVariants} className="flex flex-col">
                    <div
                      className="w-6 h-[3px] rounded-full bg-[#188E39] mb-3"
                      aria-hidden="true"
                    />
                    <h4 className="text-[#042718] font-onest text-sm font-bold uppercase tracking-wider">
                      Connect
                    </h4>
                  </motion.div>
                  <ul className="flex flex-col gap-2.5">
                    {[
                      {
                        name: "LinkedIn",
                        icon: Linkedin,
                        href: "https://www.linkedin.com/in/prasad-deepak/",
                      },
                      {
                        name: "GitHub",
                        icon: Github,
                        href: "https://github.com/shipwithdeepak-code",
                      },
                      {
                        name: "shipwithdeepak@gmail.com",
                        icon: Mail,
                        onClick: onOpenContact,
                      },
                    ].map((social, idx) => (
                      <motion.li key={idx} variants={itemVariants}>
                        {social.onClick ? (
                          <button
                            type="button"
                            onClick={social.onClick}
                            className="flex items-center gap-2 text-[#042718]/70 font-inter text-sm hover:text-[#042718] transition-all cursor-pointer"
                          >
                            <social.icon size={15} className="text-[#188E39]" />
                            <span>{social.name}</span>
                          </button>
                        ) : (
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[#042718]/70 font-inter text-sm hover:text-[#042718] transition-all"
                          >
                            <social.icon size={15} className="text-[#188E39]" />
                            <span>{social.name}</span>
                          </a>
                        )}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Big Watermark: DEEPAK PRASAD */}
            <div className="w-full max-w-full flex justify-center items-center select-none py-4 sm:py-6 px-4 overflow-hidden">
              <motion.h1
                initial={{ y: "60%", opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.21, 0.45, 0.32, 0.9] as const }}
                className="w-full text-center text-[#042718]/12 font-onest text-[clamp(38px,10vw,150px)] font-bold leading-none tracking-tighter whitespace-nowrap select-none"
              >
                Deepak Prasad
              </motion.h1>
            </div>

            {/* Bottom Copyright Row */}
            <motion.div
              className="w-full lg:w-[1248px] pt-6 pb-4 border-t border-[#042718]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#042718]/60 font-inter"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div>&copy; {new Date().getFullYear()} Deepak Prasad. All rights reserved.</div>
              <div className="flex items-center gap-4">
                <span>Senior Product Manager</span>
                <span>•</span>
                <span>Bengaluru / Remote</span>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </>
  );
}
