"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  X,
  FileText,
  Mail,
  Linkedin,
  Github,
  Phone,
  MapPin,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Briefcase,
  Layers,
  Wrench,
  Download,
} from "lucide-react";
import { EXPERIENCE_ROLES } from "@/data/caseStudies";
import { downloadResumePDF } from "@/utils/downloadResume";
import { CALENDLY_URL } from "@/utils/calendly";
import { CONTACT_EMAIL, CONTACT_MAILTO, GITHUB_URL, LINKEDIN_URL } from "../utils/contact";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const RESUME_TEXT = `DEEPAK P
Senior Product Manager | B2B & B2C | AI | Product Strategy & Roadmapping
Bengaluru, India • +91 8792964656 • ${CONTACT_EMAIL} • linkedin.com/in/prasad-deepak • github.com/shipwithdeepak-code

PROFILE
Senior Product Manager with 7+ years building and scaling B2B and B2C products across SaaS, AI, marketplaces, workflow automation and connected products, including a production conversational AI feature and an ML-powered pricing model, alongside enterprise workflow automation across CRM, ERP and payments systems. Skilled at reading market trends and customer pain points and turning them into scalable product solutions, owning quarterly planning and roadmap creation through customer interviews, UAT, launch and adoption tracking. Known for taking 0→1 products from ambiguous charters, managing and mentoring product teams, and bringing automation to complex, non-desk operational workflows.

WORK EXPERIENCE
1. Product Consultant | Independent (via Tejmonvi Softwares) [May 2026 – Present]
Bengaluru, India | Advising early-stage ventures across healthtech, fintech, and consumer platforms
• Lead product strategy for TNSQAI, a pre-commercial AI-powered radiology diagnostics company. Benchmarked 7 global radiology AI players and defined a Now/Next/Later product roadmap, translating AI model evaluation outputs from the ML team into go-to-market decisions.
• Advise early-stage founders in parallel across an M&A marketplace platform and a global music-rights platform, translating ambiguous priorities into structured requirements and execution roadmaps.

2. Senior Product Manager | Sportstech [Oct 2024 – May 2026]
Bengaluru, India | Digital sports subscription platform (iOS & Android), via Tejmonvi Softwares (ODC) | 174,000+ users
• Owned end-to-end subscription strategy for a B2C SaaS platform serving 174,180 freemium users and 12,401 paying subscribers, generating €659K in FY2025 subscription revenue. Subscribers grew 81.9% YoY, with yearly-plan retention reaching 96.8%.
• Led the 0→1 development of an in-app AI Coach, defining conversational AI use cases, user flows, context and data requirements, and quality guardrails. Launched on Gemini as the primary model with ChatGPT as fallback, and scaled adoption from ~300 to 3,200+ DAU within roughly 3 months through iterative improvements.
• Owned quarterly planning and roadmap creation for the subscription domain, defining pricing, free/paid packaging, trial design, paywalls and renewal experiences, and establishing product metrics across conversion, churn, retention and LTV.
• Owned product-performance tracking across engagement, subscription and acquisition funnels using DAU/MAU, conversion, retention and churn metrics to inform roadmap prioritisation and post-launch iteration. Product reached 3,033 DAU and 27,001 MAU (an 11% DAU/MAU ratio).
• Designed an AI-assisted content-localisation workflow that shipped 200+ videos in roughly 3 weeks (about 10× faster than the prior process), supporting launches in Italian, French and Spanish.
• Operated in an ODC model, leading the India-based product and engineering team while sales and operations sat at company HQ in Germany. Directly managed and mentored a 6-person cross-functional pod (3 PMs, Growth, Content), growing their scope and ownership while setting OKRs and reporting KPIs to leadership.

3. Product Manager | Sportstech [Aug 2023 – Sep 2024]
Bengaluru, India
• Joined as the first Product Manager on the team and built the platform 0→1 from scratch, designing signup, onboarding and subscription flows (pricing, packaging, trial, paywall, checkout) with no prior playbook and defining retention and conversion metrics from first principles.
• Conducted customer interviews and synthesised feedback, app reviews and behavioural data to prioritise fixes. Translated requirements into PRDs, user stories and acceptance criteria, partnering with engineering and design through discovery, UAT, launch and post-launch iteration.

4. Product Manager | ReshaMandi [Jun 2021 – Sep 2023]
Bengaluru, India | Enterprise B2B agri-tech & silk marketplace | ₹2,000 Cr platform | ~1.1 Lakh stakeholders across 5 business verticals (incl. 80K+ farmers via ReshaFarms)
• Owned product delivery across a complex B2B marketplace ecosystem spanning farmers, buyers, field operations, sales, finance and customer support, translating fragmented offline workflows into scalable digital products.
• Digitised end-to-end workflows across onboarding, KYC, lead generation, purchase and sales orders, logistics and payments, integrating LeadSquared CRM, Razorpay, SAP and Camunda across business, IT and vendor teams. Identified payment delays as a trust and operational bottleneck and owned an instant-payout workflow that automated approval-to-bank settlement, as disbursement volume grew from roughly ₹10–15Cr to ₹20–25Cr per month.
• Conducted direct field research with farmers, agents and operations teams, regularly travelling to collection centres and grounding roadmap and design decisions in direct observation and user feedback rather than assumptions.
• Built a real-time cocoon bidding workflow 0→1, replacing manual buyer discovery and negotiation with a structured Scan → Bid → Watch → Win → Pay experience and configurable auction rules. The pilot ran roughly 3 sessions a day and lifted transaction value more than 35% versus the prior baseline.
• Partnered with the ML team to define an image-based cocoon pricing solution, translating field-level pricing and quality-assessment challenges into an AI-assisted product workflow (>90% model accuracy).

5. Associate Product Manager | LionCircuits [Jul 2018 – May 2020]
Bengaluru, India | IoT, AI & PCB manufacturing platform
• Led concept-to-launch of a B2B Assembly Ordering Platform, contributing to a 40% increase in monthly orders. Built an auto-quote generation and BOM-scrubbing tool, plus a Raspberry Pi-based AI proof-of-concept for facial-recognition traffic monitoring.

CORE COMPETENCIES
• Product Strategy: Product Strategy, Market & Customer Research, Customer Interviews, Quarterly Planning, Roadmapping, Prioritisation, 0→1 Product Development, PRDs, User Stories, UAT, Adoption Tracking
• B2B SaaS / B2C: B2B SaaS Platforms, B2C Subscription Products, Enterprise Workflow Automation, Marketplace Products, Payments, Monetisation
• AI / Data: AI Product Strategy, Conversational AI, AI-Enabled Workflows, ML Product Development, Product Analytics, Funnel Analysis, Retention, Churn, LTV
• Leadership: Cross-functional Leadership (Eng, Design, Sales, CS), People Management & Mentoring, Stakeholder Management, OKRs, Influence Without Authority, Agile/Scrum

SKILLS & TOOLS
• Tools & Platforms: Jira, SAP (basic), Camunda, LeadSquared CRM, Razorpay, Figma, Firebase, Google Analytics, Google Play Console
• Domains: Consumer Subscription, Enterprise B2B, Fintech (Instant Payouts & Escrow), Healthtech/AI, Agri-Tech/Field Ops, IoT/Hardware

EDUCATION
• Bachelor of Engineering (B.E.) | Visvesvaraya Technological University (VTU) | 2018`;

export default function ResumeModal({
  isOpen,
  onClose,
  onOpenContact,
}: ResumeModalProps) {
  const [activeTab, setActiveTab] = useState<"pdf" | "structured">("pdf");
  const [downloadStatus, setDownloadStatus] = useState<
    "idle" | "downloading" | "done"
  >("idle");

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = async () => {
    setDownloadStatus("downloading");
    try {
      await downloadResumePDF();
      setDownloadStatus("done");
    } catch {
      setDownloadStatus("idle");
    } finally {
      setTimeout(() => setDownloadStatus("idle"), 2500);
    }
  };

  const competencies = [
    {
      category: "Product Strategy",
      items: [
        "0→1 Product Discovery",
        "Market & Customer Research",
        "Quarterly Planning & OKRs",
        "Roadmapping & Prioritisation",
        "PRDs & User Stories",
        "UAT & Adoption Tracking",
      ],
    },
    {
      category: "B2B SaaS & Marketplaces",
      items: [
        "B2B Marketplaces",
        "Enterprise Workflows (SAP/Camunda)",
        "B2C Subscription Funnels",
        "Payments & Instant Payouts",
        "Monetisation & Paywalls",
      ],
    },
    {
      category: "AI & Data Systems",
      items: [
        "Conversational AI (Gemini / ChatGPT)",
        "ML Product Workflows (>90% Accuracy)",
        "Funnel & Cohort Retention",
        "LTV & Churn Modeling",
        "Telemetry & Product Analytics",
      ],
    },
    {
      category: "Leadership & Execution",
      items: [
        "Cross-functional Team Lead",
        "People Management & Mentoring (6-person pod)",
        "ODC & Distributed Teams",
        "Influence Without Authority",
        "Agile / Scrum Ownership",
      ],
    },
  ];

  const toolsAndDomains = {
    tools: [
      "Jira",
      "LeadSquared CRM",
      "Razorpay",
      "Camunda",
      "SAP (basic)",
      "Figma",
      "Firebase",
      "Google Analytics",
      "Google Play Console",
    ],
    domains: [
      "Consumer Subscription",
      "Enterprise B2B",
      "Fintech (Lending/BNPL)",
      "Healthtech / AI Diagnostics",
      "Agri-Tech / Field Operations",
      "IoT & Hardware",
    ],
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md cursor-pointer"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl h-[92vh] bg-void rounded-[20px] border border-[var(--rule-strong)] shadow-2xl overflow-hidden flex flex-col text-left cursor-default text-ivory"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--rule)] bg-ghost shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-void border border-[var(--rule)] flex items-center justify-center text-coral">
              <FileText size={20} />
            </div>
            <div>
              <h3
                className="font-display text-lg font-bold text-ivory"
                style={{ fontVariationSettings: '"wdth" 92' }}
              >
                Deepak P / Senior Product Manager
              </h3>
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-mute">
                B2B & B2C / AI & Machine Learning / Product Strategy & Roadmapping
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher Tabs */}
            <div className="flex items-center bg-void p-1 rounded-full border border-[var(--rule)] text-xs font-mono uppercase tracking-[0.1em]">
              <button
                type="button"
                onClick={() => setActiveTab("pdf")}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
                  activeTab === "pdf"
                    ? "bg-ghost text-ivory font-semibold shadow-xs border border-[var(--rule-strong)]"
                    : "text-mute hover:text-ivory"
                }`}
              >
                <FileText size={12} className={activeTab === "pdf" ? "text-coral" : ""} />
                <span>Original PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("structured")}
                className={`px-3 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
                  activeTab === "structured"
                    ? "bg-ghost text-ivory font-semibold shadow-xs border border-[var(--rule-strong)]"
                    : "text-mute hover:text-ivory"
                }`}
              >
                <Layers size={12} className={activeTab === "structured" ? "text-coral" : ""} />
                <span className="hidden sm:inline">Structured Profile</span>
                <span className="sm:hidden">Profile</span>
              </button>
            </div>

            {/* Direct Download Button */}
            <button
              type="button"
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-full bg-coral hover:bg-[#F6AE96] text-void font-mono uppercase text-xs tracking-[0.14em] font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
              title="Download Resume PDF"
            >
              <Download size={13} />
              <span>
                {downloadStatus === "downloading"
                  ? "Downloading..."
                  : downloadStatus === "done"
                  ? "Downloaded!"
                  : "Download PDF"}
              </span>
            </button>

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener"
              className="px-4 py-1.5 rounded-full bg-ghost hover:bg-ghost-active border border-[var(--rule)] text-ivory font-mono uppercase text-xs tracking-[0.14em] font-semibold transition-all cursor-pointer hidden lg:flex items-center gap-1.5 active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            >
              <span>Book Chat</span>
              <ArrowRight size={13} />
            </a>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-ghost text-mute hover:text-ivory transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        {activeTab === "pdf" ? (
          <div className="flex-1 flex flex-col bg-void p-3 sm:p-5 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 mb-3 bg-ghost rounded-2xl border border-[var(--rule)] text-xs font-mono uppercase tracking-[0.12em] text-mute shadow-xs shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-ivory">Original Executive Resume (PDF)</span>
                <span className="text-mute">/</span>
                <span className="text-mute">Standard 2-Page Format</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-mute">Exact attached PDF</span>
              </div>
            </div>

            <div className="flex-1 w-full bg-void rounded-2xl border border-[var(--rule)] overflow-hidden shadow-sm relative flex flex-col">
              <iframe
                src="/Deepak_Prasad_Senior_Product_Manager_Resume.pdf#toolbar=1&navpanes=0&view=FitH"
                title="Deepak Prasad Original Resume PDF"
                className="w-full h-full min-h-[500px] flex-1 border-0"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-8 bg-void">
          {/* Contact & Profile Quick Bar */}
          <div className="p-5 rounded-2xl bg-ghost border border-[var(--rule)] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--rule)] text-xs font-mono uppercase tracking-[0.12em] text-mute">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="flex items-center gap-1 font-medium text-ivory">
                  <MapPin size={14} className="text-coral" /> Bengaluru, India
                </span>
                <a
                  href="tel:+918792964656"
                  className="flex items-center gap-1 hover:text-coral transition-colors"
                >
                  <Phone size={14} className="text-coral" /> +91 8792964656
                </a>
                <a
                  href={CONTACT_MAILTO}
                  className="flex items-center gap-1 hover:text-coral font-medium text-ivory transition-colors"
                >
                  <Mail size={14} className="text-coral" /> {CONTACT_EMAIL}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-coral hover:text-[#F6AE96] font-semibold transition-colors"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
                <span className="text-mute">/</span>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-mute hover:text-coral font-semibold transition-colors"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-coral mb-1.5 flex items-center gap-1.5">
                <Sparkles size={14} /> Profile Summary
              </h4>
              <p className="font-body text-xs sm:text-sm text-mute leading-relaxed">
                Senior Product Manager with <strong className="text-ivory font-semibold">7+ years</strong> building and scaling B2B and B2C products across SaaS, AI, marketplaces, workflow automation and connected products, including a production conversational AI feature (in-app AI Coach with Gemini + ChatGPT fallback) and an ML-powered pricing model (&gt;90% accuracy), alongside enterprise workflow automation across CRM, ERP and payments systems. Skilled at reading market trends and customer pain points and turning them into scalable product solutions, owning quarterly planning and roadmap creation through customer interviews, UAT, launch and adoption tracking. Known for taking 0→1 products from ambiguous charters, managing and mentoring product teams, and bringing automation to complex, non-desk operational workflows.
              </p>
            </div>
          </div>

          {/* Work Experience Timeline */}
          <div>
            <h4
              className="font-display text-base font-bold text-ivory mb-4 flex items-center gap-2"
              style={{ fontVariationSettings: '"wdth" 92' }}
            >
              <Briefcase size={18} className="text-coral" />
              <span>Work Experience</span>
            </h4>

            <div className="space-y-6">
              {EXPERIENCE_ROLES.map((role, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-ghost border border-[var(--rule)] shadow-xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div>
                      <h5
                        className="font-display text-lg font-bold text-ivory"
                        style={{ fontVariationSettings: '"wdth" 92' }}
                      >
                        {role.title} / <span className="font-mono text-coral text-sm uppercase tracking-[0.12em] font-semibold">{role.company}</span>
                      </h5>
                      <p className="font-mono text-xs uppercase tracking-[0.1em] text-mute font-medium mt-0.5">
                        {role.type}
                      </p>
                    </div>

                    <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-void border border-[var(--rule)] text-mute w-fit">
                      {role.period}
                    </span>
                  </div>

                  <p className="font-body text-xs sm:text-sm text-mute leading-relaxed italic">
                    "{role.description}"
                  </p>

                  <ul className="space-y-2 pt-1">
                    {role.highlights.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-body text-mute/90 leading-relaxed">
                        <CheckCircle2 size={15} className="text-coral shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {role.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase tracking-[0.1em] bg-void text-mute border border-[var(--rule)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Competencies Matrix */}
          <div>
            <h4
              className="font-display text-base font-bold text-ivory mb-4 flex items-center gap-2"
              style={{ fontVariationSettings: '"wdth" 92' }}
            >
              <Layers size={18} className="text-coral" />
              <span>Core Competencies</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {competencies.map((group, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-ghost border border-[var(--rule)] space-y-2.5"
                >
                  <h5 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-coral">
                    {group.category}
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item, iIdx) => (
                      <span
                        key={iIdx}
                        className="px-2.5 py-1 rounded-lg bg-void text-ivory font-body text-xs font-medium border border-[var(--rule)] shadow-2xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Domains */}
          <div>
            <h4
              className="font-display text-base font-bold text-ivory mb-4 flex items-center gap-2"
              style={{ fontVariationSettings: '"wdth" 92' }}
            >
              <Wrench size={18} className="text-coral" />
              <span>Skills, Platforms & Domains</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-ghost border border-[var(--rule)] space-y-2">
                <h5 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-coral">
                  Tools & Platforms
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {toolsAndDomains.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-void text-ivory font-mono uppercase tracking-[0.08em] text-xs font-medium border border-[var(--rule)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-ghost border border-[var(--rule)] space-y-2">
                <h5 className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-coral">
                  Domains & Verticals
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {toolsAndDomains.domains.map((d, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-void text-ivory font-body text-xs font-medium border border-[var(--rule)]"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Education */}
          <div className="p-5 rounded-2xl bg-ghost border border-[var(--rule)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-void border border-[var(--rule)] flex items-center justify-center text-coral">
                <GraduationCap size={20} />
              </div>
              <div>
                <h5
                  className="font-display text-sm font-bold text-ivory"
                  style={{ fontVariationSettings: '"wdth" 92' }}
                >
                  Bachelor of Engineering (B.E.)
                </h5>
                <p className="font-body text-xs text-mute">
                  Visvesvaraya Technological University (VTU)
                </p>
              </div>
            </div>
            <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-void border border-[var(--rule)] text-mute w-fit">
              Graduated 2018
            </span>
          </div>
        </div>
        )}

        {/* Footer Bar */}
        <div className="px-6 py-4 border-t border-[var(--rule)] bg-ghost flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 text-xs text-mute font-mono uppercase tracking-[0.1em]">
            <span>Bengaluru, India</span>
            <span className="text-mute">/</span>
            <a
              href={CONTACT_MAILTO}
              className="text-coral font-medium hover:text-[#F6AE96] transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              className="px-4 py-2 rounded-full bg-coral hover:bg-[#F6AE96] text-void font-mono uppercase tracking-[0.14em] text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-2xs active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            >
              <Download size={14} />
              <span>
                {downloadStatus === "downloading"
                  ? "Downloading..."
                  : downloadStatus === "done"
                  ? "Downloaded!"
                  : "Download Resume (PDF)"}
              </span>
            </button>

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener"
              className="px-5 py-2 rounded-full bg-ghost hover:bg-ghost-active border border-[var(--rule)] text-ivory font-mono uppercase tracking-[0.14em] text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            >
              <span>Discuss Role / Interview</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

