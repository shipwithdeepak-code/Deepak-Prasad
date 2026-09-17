import React, { useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { EXPERIENCE_ROLES } from "../data/caseStudies";
import { downloadResumePDF } from "../utils/downloadResume";
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  GITHUB_URL,
  LINKEDIN_URL,
  LOCATION,
} from "../utils/contact";
import Modal from "./site/v3/Modal";
import { Panel, Tag } from "./site/v3/primitives";

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
const PHONE = "+91 8792964656";

/** What I can be handed, grouped. Longer than the About page's capability
 *  list on purpose: this is the version a recruiter scans against a spec. */
const COMPETENCIES = [
  {
    category: "Product strategy",
    items: [
      "0 to 1 discovery",
      "Market and customer research",
      "Quarterly planning and OKRs",
      "Roadmapping and prioritisation",
      "PRDs and user stories",
      "UAT and adoption tracking",
    ],
  },
  {
    category: "B2B SaaS and marketplaces",
    items: [
      "B2B marketplaces",
      "Enterprise workflows, SAP and Camunda",
      "B2C subscription funnels",
      "Payments and instant payouts",
      "Monetisation and paywalls",
    ],
  },
  {
    category: "AI and data systems",
    items: [
      "Conversational AI, Gemini and ChatGPT",
      "ML product workflows above 90% accuracy",
      "Funnel and cohort retention",
      "LTV and churn modelling",
      "Telemetry and product analytics",
    ],
  },
  {
    category: "Leadership and execution",
    items: [
      "Cross-functional team lead",
      "People management, a six-person pod",
      "ODC and distributed teams",
      "Influence without authority",
      "Agile and scrum ownership",
    ],
  },
];

const TOOLS = [
  "Jira",
  "LeadSquared CRM",
  "Razorpay",
  "Camunda",
  "SAP, basic",
  "Figma",
  "Firebase",
  "Google Analytics",
  "Google Play Console",
];

const DOMAINS = [
  "Consumer subscription",
  "Enterprise B2B",
  "Fintech, lending and BNPL",
  "Healthtech and AI diagnostics",
  "Agri-tech and field operations",
  "IoT and hardware",
];

const EYEBROW =
  "font-mono text-[10.5px] uppercase tracking-[.05em] text-smoke";

/**
 * The CV, in a dialog: the real PDF, or the same record as readable HTML.
 *
 * Two tabs rather than one, because the two audiences want different things.
 * A recruiter wants the file that goes into their system; a hiring manager
 * reading on a phone wants text that reflows, and a PDF in an iframe on a
 * phone is unreadable.
 */
export default function ResumeModal({
  isOpen,
  onClose,
  onOpenContact,
}: ResumeModalProps) {
  const [tab, setTab] = useState<"pdf" | "profile">("pdf");
  const [status, setStatus] = useState<"idle" | "working" | "done">("idle");

  const download = async () => {
    setStatus("working");
    try {
      await downloadResumePDF();
      setStatus("done");
    } catch {
      setStatus("idle");
    } finally {
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  const tabClass = (active: boolean) =>
    `min-h-9 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 ${
      active
        ? "bg-mist text-iron"
        : "v3-key-quiet text-ash hover:text-pure-white"
    }`;

  const link =
    "font-mono text-[11px] text-smoke transition-colors duration-200 hover:text-pure-white";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Deepak Prasad, CV"
      subtitle={`${LOCATION} / ${PHONE}`}
      width="max-w-4xl"
      fill
      flush
      footer={
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4">
            <a className={link} href={CONTACT_MAILTO}>
              {CONTACT_EMAIL}
            </a>
            <a className={link} href={LINKEDIN_URL} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className={link} href={GITHUB_URL} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={download}
              className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-mist px-4 py-2.5 text-[13px] font-medium text-iron transition-all duration-200 hover:-translate-y-px hover:bg-white"
            >
              {status === "working"
                ? "Downloading"
                : status === "done"
                  ? "Downloaded"
                  : "Download the PDF"}
              <Download className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
            </button>
            {/* The in-site path, not Calendly. The dialog is already open;
                throwing a new tab at someone reading a CV is a worse ask than
                a form they can fill in where they are. */}
            <button
              type="button"
              onClick={onOpenContact}
              className="v3-key-quiet inline-flex min-h-10 items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-medium text-ash transition-colors duration-200 hover:text-pure-white"
            >
              Talk about a role
              <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>
      }
    >
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex shrink-0 flex-wrap items-center gap-2 px-6 py-4">
          <button
            type="button"
            aria-pressed={tab === "pdf"}
            onClick={() => setTab("pdf")}
            className={tabClass(tab === "pdf")}
          >
            The PDF
          </button>
          <button
            type="button"
            aria-pressed={tab === "profile"}
            onClick={() => setTab("profile")}
            className={tabClass(tab === "profile")}
          >
            Read it here
          </button>
          <span className={`${EYEBROW} ml-1.5`}>
            {tab === "pdf" ? "Exactly the attached file" : "The same record, reflowed"}
          </span>
        </div>

        {tab === "pdf" ? (
          <div className="min-h-0 flex-1 px-6 pb-6">
            <iframe
              src="/Deepak_Prasad_Senior_Product_Manager_Resume.pdf#toolbar=1&navpanes=0&view=FitH"
              title="Deepak Prasad, CV"
              className="v3-key-quiet size-full min-h-[420px] rounded-xl border-0 bg-void-black"
            />
          </div>
        ) : (
          <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6">
            <div className="grid gap-6">
              <Panel className="grid gap-2 p-5">
                <span className={EYEBROW}>Profile</span>
                <p className="text-sm leading-relaxed text-ash">
                  Senior Product Manager with over seven years building and
                  scaling B2B and B2C products across SaaS, AI, marketplaces,
                  workflow automation and connected products, including a
                  production conversational AI feature and an ML-powered
                  pricing model above 90% accuracy, alongside enterprise
                  workflow automation across CRM, ERP and payments. Known for
                  taking 0 to 1 products from ambiguous charters, managing and
                  mentoring product teams, and bringing automation to complex,
                  non-desk operational workflows.
                </p>
              </Panel>

              <section className="grid gap-3">
                <h3 className={EYEBROW}>Experience</h3>
                {EXPERIENCE_ROLES.map((role) => (
                  <Panel
                    key={`${role.company}-${role.period}`}
                    className="grid gap-3 p-5"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="grid gap-0.5">
                        <span className="text-base font-medium text-pure-white">
                          {role.title}
                        </span>
                        <span className="text-[13px] text-coral-pulse">
                          {role.company}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-smoke">
                        {role.period}
                      </span>
                    </div>
                    <ul className="grid gap-2">
                      {role.highlights.map((h) => (
                        <li
                          key={h}
                          className="grid grid-cols-[auto_1fr] items-start gap-2.5 text-[13px] leading-relaxed text-ash"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-1.5 block size-1 rounded-full bg-coral-pulse"
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 border-t border-hairline pt-3">
                      {role.skills.map((skill) => (
                        <Tag key={skill}>{skill}</Tag>
                      ))}
                    </div>
                  </Panel>
                ))}
              </section>

              <section className="grid gap-3">
                <h3 className={EYEBROW}>Competencies</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {COMPETENCIES.map((group) => (
                    <Panel key={group.category} className="grid gap-3 p-5">
                      <span className="text-sm font-medium text-pure-white">
                        {group.category}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <Tag key={item}>{item}</Tag>
                        ))}
                      </div>
                    </Panel>
                  ))}
                </div>
              </section>

              <section className="grid gap-3">
                <h3 className={EYEBROW}>Tools and domains</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Panel className="grid gap-3 p-5">
                    <span className="text-sm font-medium text-pure-white">
                      Tools and platforms
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {TOOLS.map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </Panel>
                  <Panel className="grid gap-3 p-5">
                    <span className="text-sm font-medium text-pure-white">
                      Domains
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {DOMAINS.map((d) => (
                        <Tag key={d}>{d}</Tag>
                      ))}
                    </div>
                  </Panel>
                </div>
              </section>

              <Panel className="flex flex-wrap items-center justify-between gap-3 p-5">
                <div className="grid gap-0.5">
                  <span className="text-sm font-medium text-pure-white">
                    B.E. Electronics and Communication
                  </span>
                  <span className="text-[13px] text-ash">
                    Visvesvaraya Technological University
                  </span>
                </div>
                <span className="font-mono text-[11px] text-smoke">
                  Graduated 2018
                </span>
              </Panel>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
