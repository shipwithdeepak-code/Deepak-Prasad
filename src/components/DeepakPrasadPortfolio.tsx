import { useState, useCallback, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Copy,
  Check,
  Calendar,
  Mail,
  Linkedin,
  Github,
  FileText,
  TrendingUp,
  Layers,
  Cpu,
  Users,
  X,
  Briefcase,
  Target,
  ShieldCheck,
  ChevronRight,
  BarChart3,
  Lightbulb,
  CheckCircle2,
  Workflow,
  Wallet,
  Zap,
  Building,
  Activity,
  Compass,
} from 'lucide-react';
import {
  RESHAMANDI_CASE_STUDY,
  OTHER_CASE_STUDIES,
  EXPERIENCE_ROLES,
  CORE_PRINCIPLES,
} from '../data/caseStudies';
import { CaseStudyDetail } from '../types';
import CaseStudyModal from './CaseStudyModal';
import { CALENDLY_URL } from '../utils/calendly';

export const ALL_CASE_STUDIES: CaseStudyDetail[] = [
  RESHAMANDI_CASE_STUDY,
  ...OTHER_CASE_STUDIES,
];

export const NAV_LINKS = [
  { name: 'Case Study 01', href: '#case-study-01' },
  { name: 'Experience', href: '#experience' },
  { name: 'Philosophy', href: '#philosophy' },
  { name: 'Methodology', href: '#methodology' },
];

export const HERO_METRICS = [
  { value: '99.9%', label: 'Instant Payout Success', sub: 'Zero un-reconciled losses', icon: ShieldCheck },
  { value: '>35%', label: 'Bidding Value Lift', sub: 'Pilot auction discovery', icon: TrendingUp },
  { value: '0 → 1 & Scale', label: 'Ecosystems Shipped', sub: 'B2B & B2C platforms', icon: Workflow },
];

export default function DeepakPrasadPortfolio() {
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudyDetail>(RESHAMANDI_CASE_STUDY);
  const [copied, setCopied] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalCaseStudy, setModalCaseStudy] = useState<CaseStudyDetail>(RESHAMANDI_CASE_STUDY);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [contactSubject, setContactSubject] = useState<string>('0→1 Product Leadership & Strategy');
  const [contactMessage, setContactMessage] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactSent, setContactSent] = useState<boolean>(false);

  const handleCopySummary = useCallback(() => {
    const textToCopy = `Case Study: ${activeCaseStudy.title} (${activeCaseStudy.category})\nThesis: "${activeCaseStudy.thesis}"\nRole: ${activeCaseStudy.role}\nKey Metric: ${activeCaseStudy.badgeLeft} | ${activeCaseStudy.badgeRight}\n\nSummary:\n${activeCaseStudy.summary}`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [activeCaseStudy]);

  const handleOpenCaseStudyModal = (study: CaseStudyDetail) => {
    setModalCaseStudy(study);
    setIsModalOpen(true);
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setIsContactOpen(false);
      setContactMessage('');
      setContactEmail('');
    }, 2500);
  };

  return (
    <section
      id="deepak-portfolio-hero"
      className="relative min-h-screen w-full overflow-hidden font-sans bg-[#090b0e] text-white selection:bg-[#01bc7c]/30 selection:text-white"
    >
      {/* Scoped CSS for responsive layout balance */}
      <style>{`
        @media (max-width: 1024px) {
          #deepak-hero-main {
            flex-direction: column !important;
            text-align: center !important;
            padding-top: 130px !important;
          }
          #deepak-hero-headline {
            font-size: 38px !important;
            line-height: 1.15 !important;
          }
          #deepak-hero-description {
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
      `}</style>

      {/* 1. Background video + subtle darkening overlay */}
      <video
        id="deepak-bg-video"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-30 mix-blend-screen scale-105 filter blur-[1px]"
      >
        <source
          src="https://cdn.jiro.build/Kelo/i-want-all-the-flowers-in-this-image-to-move-there.mp4"
          type="video/mp4"
        />
      </video>
      <div
        id="deepak-video-overlay"
        className="absolute inset-0 bg-gradient-to-b from-[#090b0e]/85 via-[#090b0e]/75 to-[#090b0e] z-0 pointer-events-none"
      />

      {/* Atmospheric lighting accents */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#01bc7c]/10 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-[#0084ff]/10 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* 2. Floating Pill Navbar */}
      <header className="absolute top-6 md:top-8 left-0 w-full flex justify-center px-4 sm:px-8 md:px-[60px] z-[100]">
        <nav
          id="deepak-navbar"
          className="flex items-center justify-between w-full max-w-[1200px] p-2 pl-4 sm:pl-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
        >
          {/* Monogram / Name */}
          <div
            id="deepak-logo-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#01bc7c] to-[#01a26c] flex items-center justify-center font-extrabold text-white text-sm shadow-[0_0_15px_rgba(1,188,124,0.4)] transition-transform duration-300 group-hover:scale-105">
              DP
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-white text-sm font-bold tracking-tight">Deepak Prasad</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#01bc7c] animate-pulse" />
              </div>
              <span className="text-[11px] text-white/60 font-medium block">Senior Product Manager</span>
            </div>
          </div>

          {/* Navigation links */}
          <div id="deepak-nav-links" className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                id={`deepak-nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                href={link.href}
                className="text-white/70 text-[13px] font-medium hover:text-white transition-all duration-200 relative group/link py-1"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#01bc7c] transition-all duration-300 group-hover/link:w-full" />
              </a>
            ))}
          </div>

          {/* Action buttons */}
          <div id="deepak-nav-right" className="flex items-center gap-2.5 sm:gap-3">
            <button
              id="deepak-resume-btn"
              type="button"
              onClick={() => setIsResumeOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-white/80 text-[13px] font-medium hover:text-white px-3 py-1.5 rounded-full hover:bg-white/5 transition-colors duration-200 cursor-pointer"
            >
              <FileText size={14} className="text-[#01bc7c]" />
              <span>Resume</span>
            </button>
            <a
              id="deepak-get-in-touch-btn"
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener"
              className="bg-white text-black px-4 sm:px-5 py-2 rounded-full text-[13px] font-bold hover:bg-[#01bc7c] hover:text-white transition-all duration-300 shadow-lg shadow-black/30 cursor-pointer active:scale-95 flex items-center gap-1.5"
            >
              <Calendar size={13} />
              <span>Book Chat</span>
            </a>
          </div>
        </nav>
      </header>

      {/* 3. Hero Section */}
      <main
        id="deepak-hero-main"
        className="relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-screen px-6 md:px-12 lg:px-[60px] pt-[135px] md:pt-[145px] pb-16 gap-10 lg:gap-14 max-w-[1340px] mx-auto"
      >
        {/* Left column */}
        <div id="deepak-left-column" className="flex-1 max-w-[640px] mt-4 lg:mt-0 text-left">
          {/* Kicker badge */}
          <motion.div
            id="deepak-role-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-semibold mb-6 shadow-sm"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <span className="text-[#01bc7c] text-sm">✦</span>
            <span>Senior Product Manager · Data, AI & Operational Systems</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#01bc7c] animate-ping" />
          </motion.div>

          {/* Positioning Headline */}
          <motion.h1
            id="deepak-hero-headline"
            className="text-white text-[38px] sm:text-[46px] md:text-[54px] font-black leading-[1.08] tracking-[-0.03em] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            I build complex products from{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#01bc7c] via-[#22d3ee] to-[#3b82f6]">
              ambiguous problems
            </span>{' '}
            — using data, AI and technology.
          </motion.h1>

          {/* Positioning Bio Narrative */}
          <motion.p
            id="deepak-hero-description"
            className="text-white/80 text-base sm:text-lg leading-[1.65] max-w-[560px] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            Hi, I’m <strong className="text-white font-semibold">Deepak Prasad</strong>. I create new
            product experiences, business models, and operational systems that solve hard physical-digital
            frictions in high-stakes B2B marketplaces and data-driven platforms.
          </motion.p>

          {/* Verified High-Impact Metrics Strip */}
          <motion.div
            id="deepak-metrics-strip"
            className="grid grid-cols-3 gap-3 mb-8 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md max-w-[560px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.25,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {HERO_METRICS.map((metric, i) => (
              <div
                key={i}
                className={`text-center sm:text-left ${
                  i === 1 ? 'border-x border-white/10 sm:px-4' : i === 0 ? 'sm:pl-2' : 'sm:pl-2'
                }`}
              >
                <div
                  className={`text-xl sm:text-2xl font-black tracking-tight ${
                    i === 0 ? 'text-[#01bc7c]' : 'text-white'
                  }`}
                >
                  {metric.value}
                </div>
                <div className="text-[11px] sm:text-xs text-white/70 font-semibold">{metric.label}</div>
                <div className="text-[10px] text-white/50 hidden sm:block">{metric.sub}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Row */}
          <motion.div
            id="deepak-cta-row"
            className="flex items-center gap-4 flex-wrap justify-center lg:justify-start mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {/* Primary Action Button */}
            <button
              id="deepak-explore-case-studies-btn"
              type="button"
              onClick={() => handleOpenCaseStudyModal(RESHAMANDI_CASE_STUDY)}
              className="group relative flex items-center gap-3 bg-gradient-to-br from-[#01bc7c] to-[#01a26c] text-white pl-6 pr-5 py-3.5 rounded-full text-[14px] sm:text-[15px] font-bold shadow-[0_10px_30px_-10px_rgba(0,188,125,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(0,188,125,0.7)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <span>Explore ReshaMandi Deep Dive</span>
              <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                <Sparkles
                  size={15}
                  fill="currentColor"
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
            </button>

            {/* Secondary Action Button */}
            <button
              id="deepak-schedule-chat-btn"
              type="button"
              onClick={() => setIsContactOpen(true)}
              className="group flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[14px] sm:text-[15px] font-bold hover:bg-white/20 hover:border-white/30 transition-all duration-300 cursor-pointer active:scale-95"
            >
              <Mail size={16} className="text-[#01bc7c]" />
              <span>Get In Touch</span>
              <ArrowUpRight
                size={16}
                className="text-white/60 group-hover:text-white transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </motion.div>

          {/* Social Credibility Links */}
          <motion.div
            id="deepak-social-links"
            className="flex items-center gap-5 justify-center lg:justify-start text-xs text-white/60 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <span className="flex items-center gap-1.5 text-white/80">
              <ShieldCheck size={14} className="text-[#01bc7c]" /> Open for Leadership & Advisory
            </span>
            <span className="text-white/30">•</span>
            <button
              type="button"
              onClick={() => window.open('https://linkedin.com', '_blank')}
              className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Linkedin size={13} /> LinkedIn
            </button>
            <span className="text-white/30">•</span>
            <button
              type="button"
              onClick={() => window.open('https://github.com', '_blank')}
              className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Github size={13} /> GitHub
            </button>
          </motion.div>
        </div>

        {/* Right column — signature glass phone / interactive product card */}
        <motion.div
          id="deepak-phone-card"
          className="w-full max-w-[430px] shrink-0"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div
            id="deepak-glass-outer-card"
            className="bg-white/10 backdrop-blur-[24px] border-[1.5px] border-white/30 rounded-[28px] p-3.5 shadow-[0_25px_70px_rgba(0,0,30,0.5)] relative overflow-hidden"
          >
            {/* Top decorative gradient sheen */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#01bc7c]/80 to-transparent" />

            {/* Header label in card */}
            <div className="flex items-center justify-between px-2 pt-1 pb-2.5 text-xs text-white/70">
              <span className="font-semibold text-white/90 flex items-center gap-1.5">
                <Briefcase size={13} className="text-[#01bc7c]" /> Flagship PM Case Study
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-[#01bc7c] font-mono font-medium">
                {activeCaseStudy.category.split('&')[0]}
              </span>
            </div>

            {/* Main image / product visual viewport */}
            <div
              id="deepak-main-image-viewport"
              className="relative h-[430px] rounded-[20px] overflow-hidden bg-white/5 border border-white/10 group/viewport"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCaseStudy.id}
                  id={`deepak-active-case-${activeCaseStudy.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={activeCaseStudy.url}
                    alt={activeCaseStudy.title}
                    className="w-full h-full object-cover filter contrast-[1.05]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b0e] via-[#090b0e]/40 to-black/40" />
                </motion.div>
              </AnimatePresence>

              {/* Top-left badge: Impact metric */}
              <div
                id="deepak-badge-impact"
                className="absolute top-3.5 left-3.5 px-3 py-1.5 bg-black/65 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-1.5 text-white shadow-md z-10"
              >
                <span className="text-[12px] font-bold text-[#01bc7c] leading-none">
                  {activeCaseStudy.badgeLeft}
                </span>
              </div>

              {/* Top-right badge: Domain / Mechanism */}
              <div
                id="deepak-badge-status"
                className="absolute top-3.5 right-3.5 px-3 py-1.5 bg-black/65 backdrop-blur-md rounded-full border border-white/20 flex items-center gap-1.5 text-white shadow-md z-10"
              >
                <span className="text-[12px] text-[#22d3ee] leading-none">✦</span>
                <span className="text-[11px] font-semibold leading-none">
                  {activeCaseStudy.badgeRight}
                </span>
              </div>

              {/* Bottom overlay row */}
              <div
                id="deepak-image-bottom-overlay"
                className="absolute bottom-0 left-0 right-0 p-4 pt-12 bg-gradient-to-t from-[#090b0e] via-[#090b0e]/95 to-transparent flex flex-col gap-2.5 z-10"
              >
                {/* Title and Role */}
                <div>
                  <div className="text-[11px] text-[#01bc7c] font-bold tracking-wide uppercase">
                    {activeCaseStudy.role}
                  </div>
                  <h3 className="text-white font-bold text-base leading-snug">
                    {activeCaseStudy.title}
                  </h3>
                </div>

                {/* Product Thesis / Summary */}
                <div className="flex items-start gap-2.5">
                  <div
                    id="deepak-prompt-avatar"
                    className="w-7 h-7 bg-[#01bc7c]/20 border border-[#01bc7c]/40 rounded-full flex items-center justify-center shrink-0 text-[#01bc7c] text-xs backdrop-blur-sm mt-0.5"
                  >
                    <Target size={13} />
                  </div>
                  <p
                    id="deepak-active-prompt-text"
                    className="flex-1 text-white/85 text-[12px] leading-relaxed line-clamp-3 select-text font-normal"
                  >
                    {activeCaseStudy.summary}
                  </p>
                </div>

                {/* Action Buttons: Copy Takeaway & Read Deep Dive */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    id="deepak-copy-summary-btn"
                    type="button"
                    onClick={handleCopySummary}
                    className={`flex-1 py-2 px-3 rounded-xl text-[12px] font-semibold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95 ${
                      copied
                        ? 'bg-[#01bc7c] text-white font-bold'
                        : 'bg-white/15 text-white hover:bg-white/25 border border-white/20'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check size={13} /> Copied Takeaway!
                      </>
                    ) : (
                      <>
                        <Copy size={13} /> Copy Takeaway
                      </>
                    )}
                  </button>

                  <button
                    id="deepak-open-prd-btn"
                    type="button"
                    onClick={() => handleOpenCaseStudyModal(activeCaseStudy)}
                    className="py-2 px-3.5 rounded-xl text-[12px] font-bold bg-white text-black hover:bg-[#01bc7c] hover:text-white transition-all duration-200 flex items-center gap-1 cursor-pointer active:scale-95"
                  >
                    <span>Read Deep Dive</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* Thumbnail Selector Strip (Switch between projects) */}
            <div id="deepak-thumbnail-strip" className="flex gap-2 mt-3">
              {ALL_CASE_STUDIES.map((item) => {
                const isActive = activeCaseStudy.id === item.id;
                return (
                  <button
                    key={item.id}
                    id={`deepak-thumbnail-${item.id}`}
                    type="button"
                    onMouseEnter={() => setActiveCaseStudy(item)}
                    onClick={() => setActiveCaseStudy(item)}
                    className={`flex-1 h-18 rounded-[14px] overflow-hidden cursor-pointer relative transition-all duration-300 p-0 text-left focus:outline-none group/thumb ${
                      isActive
                        ? 'border-2 border-[#01bc7c] scale-[1.03] shadow-[0_0_15px_rgba(1,188,124,0.4)]'
                        : 'border border-white/20 opacity-70 hover:opacity-100 hover:border-white/50'
                    }`}
                  >
                    <img
                      src={item.url}
                      alt={item.label}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/10 transition-colors" />
                    <div className="absolute bottom-1 left-1 right-1 text-[9px] font-bold text-white leading-tight truncate px-1 py-0.5 bg-black/75 rounded backdrop-blur-xs">
                      {item.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </main>

      {/* 4. Flagship Case Study 01 Section: ReshaMandi Narrative */}
      <section
        id="case-study-01"
        className="relative z-10 px-6 md:px-[60px] py-20 border-t border-white/10 bg-black/30 backdrop-blur-md text-left"
      >
        <div className="max-w-[1240px] mx-auto">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#01bc7c] uppercase tracking-wider mb-2">
                <Workflow size={14} /> Flagship Case Study 01
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Digitising a Complex B2B Marketplace
              </h2>
              <p className="text-base sm:text-lg text-white/70 max-w-2xl mt-2 font-medium">
                Transforming an informal, high-friction sericulture supply chain into an orchestrated
                digital workflow.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => handleOpenCaseStudyModal(RESHAMANDI_CASE_STUDY)}
                className="px-6 py-3 rounded-full bg-[#01bc7c] hover:bg-[#01a26c] text-white text-sm font-bold shadow-lg shadow-[#01bc7c]/20 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Read Full 13-Section Deep Dive</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          {/* Thesis Callout Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white/[0.07] via-white/[0.04] to-transparent border border-white/15 mb-10 relative overflow-hidden">
            <div className="text-xs font-mono font-bold text-[#01bc7c] uppercase tracking-wider mb-2">
              Strategic North Star
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white leading-tight italic max-w-3xl">
              “The product wasn’t the app. The workflow was.”
            </div>
            <p className="text-sm sm:text-base text-white/80 mt-3 max-w-3xl leading-relaxed">
              In physical supply chains, software cannot succeed in isolation. True transformation occurs when
              every physical handoff—from weighing crates on the mandi floor to automated escrow settlement—is
              seamlessly reflected in an immutable digital truth.
            </p>
          </div>

          {/* Key Pillars of the Transformation (Grid of 4 Core Subsystems) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#01bc7c]/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#01bc7c]/15 border border-[#01bc7c]/30 flex items-center justify-center text-[#01bc7c] mb-4 group-hover:scale-105 transition-transform">
                <Wallet size={20} />
              </div>
              <div className="text-xs font-mono text-[#01bc7c] font-bold mb-1">Subsystem 01</div>
              <h3 className="text-base font-bold text-white mb-2">Instant Payouts Engine</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                99.9% reliable automated settlement at the weighbridge, turning 15-day delayed broker IOUs into
                instant cash liquidity for farmers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#01bc7c]/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#01bc7c]/15 border border-[#01bc7c]/30 flex items-center justify-center text-[#01bc7c] mb-4 group-hover:scale-105 transition-transform">
                <Zap size={20} />
              </div>
              <div className="text-xs font-mono text-[#01bc7c] font-bold mb-1">Subsystem 02</div>
              <h3 className="text-base font-bold text-white mb-2">Cocoon Bidding Exchange</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Real-time dynamic bidding platform driving &gt;35% transaction value improvement in pilot auctions
                via transparent price discovery.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#01bc7c]/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#01bc7c]/15 border border-[#01bc7c]/30 flex items-center justify-center text-[#01bc7c] mb-4 group-hover:scale-105 transition-transform">
                <Cpu size={20} />
              </div>
              <div className="text-xs font-mono text-[#01bc7c] font-bold mb-1">Subsystem 03</div>
              <h3 className="text-base font-bold text-white mb-2">ML Quality Grading</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                Computer vision testing stations objectively analyzing cocoon shell ratios and yield scores to
                eliminate arbitrary middleman deductions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#01bc7c]/50 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-[#01bc7c]/15 border border-[#01bc7c]/30 flex items-center justify-center text-[#01bc7c] mb-4 group-hover:scale-105 transition-transform">
                <Layers size={20} />
              </div>
              <div className="text-xs font-mono text-[#01bc7c] font-bold mb-1">Subsystem 04</div>
              <h3 className="text-base font-bold text-white mb-2">ReshaFarms & ReshaSathi</h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                End-to-end multi-tier connectivity from farm-level sericulture IoT advisory to downstream master
                weaver yarn procurement.
              </p>
            </div>
          </div>

          {/* Detailed Narrative Highlights */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
              <h3 className="text-xl font-bold text-white">13-Section Deep Narrative Breakdown</h3>
              <span className="text-xs text-white/50 font-medium">
                ReshaMandi · Product Manager (June 2021 – Sept 2023)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {RESHAMANDI_CASE_STUDY.sections.slice(0, 6).map((sec) => (
                <div
                  key={sec.id}
                  onClick={() => handleOpenCaseStudyModal(RESHAMANDI_CASE_STUDY)}
                  className="p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#01bc7c]/60 hover:bg-white/[0.07] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-mono text-[#01bc7c] font-bold">Section {sec.number}</span>
                    <ArrowUpRight
                      size={13}
                      className="text-white/40 group-hover:text-white transition-colors"
                    />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{sec.title}</h4>
                  <p className="text-xs text-white/60 line-clamp-2">{sec.subtitle || sec.content[0]}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/60">
                Covers Environment, Field Research, Transformation, KYC, Bidding, ML Pricing, Decisions & Trade-offs, Impact & Reflection.
              </span>
              <button
                type="button"
                onClick={() => handleOpenCaseStudyModal(RESHAMANDI_CASE_STUDY)}
                className="text-xs font-bold text-[#01bc7c] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Open Interactive Viewer</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Experience & Proven Roles Section */}
      <section
        id="experience"
        className="relative z-10 px-6 md:px-[60px] py-20 border-t border-white/10 bg-[#090b0e] text-left"
      >
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-bold text-[#01bc7c] uppercase tracking-wider mb-2">
                Track Record & Timeline
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Product Experience & Leadership
              </h2>
            </div>
            <p className="text-sm text-white/60 max-w-md">
              A track record of taking complex, ambiguous spaces and turning them into scalable systems with
              tangible business outcomes.
            </p>
          </div>

          <div className="space-y-6">
            {EXPERIENCE_ROLES.map((role, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <span>{role.title}</span>
                      {role.type.includes('Flagship') && (
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#01bc7c]/20 text-[#01bc7c] border border-[#01bc7c]/30 font-mono">
                          Flagship
                        </span>
                      )}
                    </h3>
                    <div className="text-sm text-[#01bc7c] font-semibold">{role.company}</div>
                  </div>
                  <div className="text-xs font-mono text-white/60 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 w-fit">
                    {role.period}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-4">
                  {role.description}
                </p>

                <div className="space-y-2 mb-5">
                  {role.highlights.map((item, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/70">
                      <CheckCircle2 size={15} className="text-[#01bc7c] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
                  {role.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80 text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Product Philosophy & Operating Principles */}
      <section
        id="philosophy"
        className="relative z-10 px-6 md:px-[60px] py-20 border-t border-white/10 bg-black/40 backdrop-blur-md text-left"
      >
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="text-xs font-bold text-[#01bc7c] uppercase tracking-wider mb-2">
                Operating Principles
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                How Deepak Approaches Product Strategy
              </h2>
            </div>
            <p className="text-sm text-white/60 max-w-md">
              Evidence-driven, human-centered principles honed from ground-level market discovery and high-scale
              operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CORE_PRINCIPLES.map((principle, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#01bc7c]/50 transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#01bc7c]/15 border border-[#01bc7c]/30 flex items-center justify-center text-[#01bc7c] mb-5 group-hover:scale-105 transition-transform font-mono font-bold text-sm">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{principle.title}</h3>
                <p className="text-sm text-white/75 leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="relative z-10 px-6 py-12 border-t border-white/10 text-center text-xs text-white/50 bg-[#090b0e]">
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#01bc7c] text-white flex items-center justify-center font-bold text-xs">
              DP
            </div>
            <div className="text-left">
              <div className="text-white/90 font-bold">Deepak Prasad</div>
              <div className="text-white/50 text-[11px]">Senior Product Manager</div>
            </div>
          </div>

          <div className="text-white/60">
            “I build complex products from ambiguous problems — using data, AI and technology.”
          </div>

          <div className="flex items-center gap-4">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener"
              className="text-white/80 hover:text-[#01bc7c] transition-colors cursor-pointer font-medium"
            >
              Book Chat
            </a>
            <span>•</span>
            <button
              onClick={() => setIsResumeOpen(true)}
              className="text-white/80 hover:text-[#01bc7c] transition-colors cursor-pointer font-medium"
            >
              View Resume
            </button>
          </div>
        </div>
      </footer>

      {/* Flagship / Selected Case Study Modal */}
      <CaseStudyModal
        caseStudy={modalCaseStudy}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onOpenContact={() => {
          setIsModalOpen(false);
          setIsContactOpen(true);
        }}
      />

      {/* Contact / Chat Scheduler Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-[#10141a] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-left select-text relative"
            >
              <button
                type="button"
                onClick={() => setIsContactOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="w-10 h-10 rounded-full bg-[#01bc7c]/20 border border-[#01bc7c]/40 flex items-center justify-center text-[#01bc7c] mb-3">
                <Calendar size={18} />
              </div>

              <h2 className="text-2xl font-bold text-white mb-1">Connect with Deepak Prasad</h2>
              <p className="text-sm text-white/70 mb-6">
                Open for Senior Product Leadership roles, complex workflow & marketplace advisory, and technology collaboration.
              </p>

              {contactSent ? (
                <div className="p-6 rounded-2xl bg-[#01bc7c]/20 border border-[#01bc7c] text-center">
                  <Check size={32} className="text-[#01bc7c] mx-auto mb-2" />
                  <h4 className="text-lg font-bold text-white mb-1">Message Sent!</h4>
                  <p className="text-sm text-white/80">
                    Deepak will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="space-y-4 text-sm">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      Discussion Topic
                    </label>
                    <select
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white focus:outline-none focus:border-[#01bc7c]"
                    >
                      <option value="Senior PM / Leadership Role" className="bg-[#10141a]">
                        Senior Product Leadership Role
                      </option>
                      <option value="0→1 Product & Marketplace Advisory" className="bg-[#10141a]">
                        0→1 Product & Marketplace Advisory
                      </option>
                      <option value="AI & Operational System Design" className="bg-[#10141a]">
                        AI & Operational System Design
                      </option>
                      <option value="Product Strategy Coffee Chat" className="bg-[#10141a]">
                        Product Strategy Coffee Chat
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#01bc7c]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      Message / Project Context
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Hi Deepak, let's discuss your experience in complex workflows..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/40 focus:outline-none focus:border-[#01bc7c]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-gradient-to-r from-[#01bc7c] to-[#01a26c] text-white font-bold text-sm hover:shadow-[0_10px_30px_rgba(1,188,124,0.5)] transition-all cursor-pointer active:scale-98"
                  >
                    Send Invitation
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Resume Viewer Modal */}
      <AnimatePresence>
        {isResumeOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#10141a] border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl text-left select-text relative"
            >
              <button
                type="button"
                onClick={() => setIsResumeOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#01bc7c]/20 border border-[#01bc7c]/40 flex items-center justify-center text-[#01bc7c] font-black text-lg">
                  DP
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Deepak Prasad</h2>
                  <p className="text-xs text-[#01bc7c] font-semibold">
                    Senior Product Manager · Data, AI & Complex Workflows
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-sm text-white/80">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 text-[#01bc7c]">
                    Positioning & Summary
                  </h4>
                  <p className="text-xs leading-relaxed text-white/70">
                    I build complex products from ambiguous problems — using data, AI and technology to create new product experiences, business models and operational systems. Proven track record across B2B marketplaces, fintech instant payments, sericulture supply chains, and B2C engagement.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 text-[#01bc7c]">
                    Core Competencies
                  </h4>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {[
                      'B2B Marketplace Workflows',
                      'Instant Payouts & Fintech Infra',
                      '0→1 Product Discovery',
                      'ML Quality & Pricing Models',
                      'B2C SaaS & Retention Loops',
                      'Field Research & Ground Realities',
                      'Opportunity Solution Trees',
                      'Cross-functional Execution',
                    ].map((skill, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-white/90"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 text-[#01bc7c]">
                    Work Experience
                  </h4>
                  <div className="space-y-3">
                    {EXPERIENCE_ROLES.map((role, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-white text-xs sm:text-sm">
                            {role.title} · <span className="text-[#01bc7c]">{role.company}</span>
                          </span>
                          <span className="text-[11px] text-white/50">{role.period}</span>
                        </div>
                        <p className="text-xs text-white/70">{role.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-white/50">Available for immediate discussions</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsResumeOpen(false);
                    setIsContactOpen(true);
                  }}
                  className="px-4 py-2 rounded-full bg-[#01bc7c] text-white text-xs font-bold hover:bg-[#01a26c] transition-colors cursor-pointer"
                >
                  Contact Deepak
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
