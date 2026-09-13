import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Layers,
  ArrowRight,
  Cpu,
  Users,
  Compass,
  FileCheck,
  Wallet,
  Zap,
} from 'lucide-react';
import { CaseStudyDetail } from '../types';

interface CaseStudyModalProps {
  caseStudy: CaseStudyDetail;
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export default function CaseStudyModal({
  caseStudy,
  isOpen,
  onClose,
  onOpenContact,
}: CaseStudyModalProps) {
  const [activeSectionId, setActiveSectionId] = useState<string>(caseStudy.sections[0]?.id || '');
  const [activeSystemNode, setActiveSystemNode] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keydown', handleKeyDown, true);
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activeSection =
    caseStudy.sections.find((s) => s.id === activeSectionId) || caseStudy.sections[0];

  const systemNodes = [
    {
      title: '1. Sericulture Farmers',
      tool: 'ReshaFarms App & IoT',
      role: 'Upstream Origin',
      desc: 'Vernacular stage-by-stage advisory, weather alerts, and mulberry input procurement. Provides 72h advance harvest signals to mandi hubs.',
      icon: Users,
    },
    {
      title: '2. Mandi Weighing & Intake',
      tool: 'Instant Payouts & Offline Client',
      role: 'Physical Ingestion',
      desc: 'Weighbridge integration logs cocoon crates, initiates automated 99.9% reliable UPI/bank settlement, and issues digital QR lot receipts.',
      icon: Wallet,
    },
    {
      title: '3. Quality Grading & Bidding',
      tool: 'ML Grading & Cocoon Exchange',
      role: 'Transparent Discovery',
      desc: 'Computer vision calculates renditta/defect metrics; certified reelers place real-time bids driving >35% value improvement in pilot auctions.',
      icon: Zap,
    },
    {
      title: '4. Master Silk Weavers',
      tool: 'ReshaSathi Yarn Network',
      role: 'Downstream Fulfillment',
      desc: 'Weavers procure standardized, tested silk yarn with certified denier uniformity, eliminating counterfeit yarn risks.',
      icon: Layers,
    },
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl cursor-pointer"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-5xl h-[92vh] flex flex-col bg-void border border-[var(--rule-strong)] rounded-[28px] shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden text-left select-text relative cursor-default text-ivory"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--rule)] bg-ghost backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-ghost border border-[var(--rule-strong)] flex items-center justify-center text-coral">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-coral">
                  {caseStudy.category}
                </span>
                <span className="text-[var(--rule-strong)]">/</span>
                <span className="text-xs font-mono uppercase tracking-[0.12em] text-mute">{caseStudy.timeline}</span>
              </div>
              <h2
                className="font-display text-base sm:text-lg font-bold text-ivory tracking-tight leading-none mt-0.5"
                style={{ fontVariationSettings: '"wdth" 92' }}
              >
                {caseStudy.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenContact}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-coral/15 hover:bg-coral/25 border border-coral/40 text-coral text-xs font-mono uppercase tracking-[0.12em] font-semibold transition-all cursor-pointer active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            >
              <span>Discuss Strategy</span>
              <ArrowRight size={13} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-ghost hover:bg-ghost-active border border-[var(--rule)] text-mute hover:text-ivory transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Main Body: 2-column layout on desktop */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
          {/* Left Sidebar: Section Index */}
          <div className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-[var(--rule)] bg-void/50 p-4 overflow-y-auto shrink-0 flex lg:flex-col gap-1.5">
            <div className="text-[11px] font-mono font-bold text-mute uppercase tracking-[0.18em] px-2 py-1 hidden lg:block">
              Case Study Outline ({caseStudy.sections.length} Sections)
            </div>
            {caseStudy.sections.map((section) => {
              const isActive = activeSection.id === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSectionId(section.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all duration-200 cursor-pointer shrink-0 lg:shrink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
                    isActive
                      ? 'bg-ghost border border-[var(--rule-strong)] text-ivory font-semibold shadow-xs'
                      : 'text-mute hover:text-ivory hover:bg-ghost border border-transparent'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-coral text-void font-bold' : 'bg-ghost border border-[var(--rule)] text-mute'
                    }`}
                  >
                    {section.number}
                  </span>
                  <span className="truncate flex-1 font-body text-xs">{section.title}</span>
                  {isActive && <ChevronRight size={14} className="text-coral hidden lg:block" />}
                </button>
              );
            })}
          </div>

          {/* Right Area: Active Section Content */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Thesis Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-ghost border border-[var(--rule-strong)]">
              <div className="text-[11px] font-mono font-bold text-coral uppercase tracking-[0.18em] mb-1 flex items-center gap-1.5">
                <Compass size={13} /> Product Thesis
              </div>
              <div
                className="font-display text-base sm:text-lg font-bold text-ivory tracking-tight italic"
                style={{ fontVariationSettings: '"wdth" 92' }}
              >
                "{caseStudy.thesis}"
              </div>
              <p className="font-body text-xs sm:text-sm text-mute mt-1.5 leading-relaxed">
                {caseStudy.subtitle}
              </p>
            </div>

            {/* Verified Key Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {caseStudy.keyStats.map((stat, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-ghost border border-[var(--rule)]"
                >
                  <div className="text-[11px] font-mono uppercase tracking-[0.12em] text-mute mb-1">{stat.label}</div>
                  <div
                    className="text-xl font-display font-bold text-coral"
                    style={{ fontVariationSettings: '"wdth" 92' }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-body text-mute truncate">{stat.detail}</div>
                </div>
              ))}
            </div>

            {/* Current Section Content View */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-ghost text-coral border border-[var(--rule-strong)] uppercase tracking-[0.12em]">
                  Section {activeSection.number}
                </span>
                <h3
                  className="font-display text-xl sm:text-2xl font-bold text-ivory tracking-tight"
                  style={{ fontVariationSettings: '"wdth" 92' }}
                >
                  {activeSection.title}
                </h3>
              </div>

              {activeSection.subtitle && (
                <p className="font-body text-sm font-semibold text-mute italic">
                  {activeSection.subtitle}
                </p>
              )}

              <div className="space-y-3.5 font-body text-sm sm:text-base text-mute/90 leading-relaxed">
                {activeSection.content.map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Highlights or Sub-cards if present */}
              {activeSection.highlights && activeSection.highlights.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {activeSection.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-ghost border border-[var(--rule)] hover:border-coral/40 transition-colors"
                    >
                      <div
                        className="flex items-center gap-2 font-display font-bold text-ivory text-sm mb-1.5"
                        style={{ fontVariationSettings: '"wdth" 92' }}
                      >
                        <CheckCircle2 size={16} className="text-coral shrink-0" />
                        <span>{h.title}</span>
                      </div>
                      <p className="font-body text-xs sm:text-sm text-mute leading-relaxed">{h.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Quote if present */}
              {activeSection.quote && (
                <div className="p-4 sm:p-5 rounded-2xl bg-ghost border-l-4 border-l-coral border-[var(--rule)] my-4">
                  <p
                    className="font-display text-sm sm:text-base text-ivory font-medium italic"
                    style={{ fontVariationSettings: '"wdth" 92' }}
                  >
                    "{activeSection.quote}"
                  </p>
                </div>
              )}

              {/* Evaluation Table if present */}
              {activeSection.evaluationTable && activeSection.evaluationTable.length > 0 && (
                <div className="my-4 rounded-2xl bg-ghost border border-[var(--rule)] overflow-hidden">
                  <div className="p-4 border-b border-[var(--rule)] flex flex-wrap items-center justify-between gap-2 bg-ghost">
                    <div className="text-xs font-mono font-bold text-coral uppercase tracking-[0.16em] flex items-center gap-1.5">
                      <Sparkles size={14} /> Golden Evaluation Test Benchmark (20 Queries)
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-ghost text-coral border border-[var(--rule-strong)] uppercase tracking-[0.1em]">
                      95% Accuracy (19/20 Pass)
                    </span>
                  </div>
                  <div className="overflow-x-auto max-h-80">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="sticky top-0 bg-void text-mute font-mono text-[11px] uppercase tracking-[0.12em] border-b border-[var(--rule)]">
                        <tr>
                          <th className="py-2.5 px-3">#</th>
                          <th className="py-2.5 px-3 min-w-[200px]">Query</th>
                          <th className="py-2.5 px-3">Category</th>
                          <th className="py-2.5 px-3 min-w-[150px]">Ground Source</th>
                          <th className="py-2.5 px-3 text-center">Score</th>
                          <th className="py-2.5 px-3 text-center">Status</th>
                          <th className="py-2.5 px-3 min-w-[200px]">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[var(--rule)] font-body text-xs">
                        {activeSection.evaluationTable.map((row) => (
                          <tr key={row.id} className="hover:bg-ghost-active transition-colors">
                            <td className="py-2.5 px-3 font-mono text-mute">{row.id}</td>
                            <td className="py-2.5 px-3 text-ivory font-medium">"{row.query}"</td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 rounded bg-ghost border border-[var(--rule)] text-mute font-mono text-[10px]">
                                {row.category}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-mute text-[11px]">{row.groundTruthSource}</td>
                            <td className="py-2.5 px-3 text-center font-mono text-coral">
                              {row.similarity.toFixed(2)}
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <span
                                className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase tracking-[0.1em] ${
                                  row.status === "Pass"
                                    ? "bg-ghost border border-coral/40 text-coral"
                                    : "bg-ghost border border-[var(--rule)] text-mute"
                                }`}
                              >
                                {row.status}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-mute text-[11px]">{row.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Special Interactive System Diagram for Section 10 */}
              {activeSection.id === 'the-system' && (
                <div className="p-5 rounded-2xl bg-ghost border border-[var(--rule)] my-4 space-y-4">
                  <div className="text-xs font-mono font-bold text-coral uppercase tracking-[0.16em] flex items-center gap-1.5">
                    <Layers size={14} /> Interactive Multi-Tier Supply Flow
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {systemNodes.map((node, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveSystemNode(index)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
                          activeSystemNode === index
                            ? 'bg-ghost border-coral text-ivory shadow-xs'
                            : 'bg-void/50 border-[var(--rule)] text-mute hover:bg-ghost'
                        }`}
                      >
                        <div className="text-[11px] font-display font-bold text-ivory leading-tight truncate">
                          {node.title}
                        </div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.1em] text-coral font-medium mt-0.5 truncate">
                          {node.tool}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-void border border-[var(--rule)] text-xs sm:text-sm font-body text-ivory/85 leading-relaxed">
                    <div className="font-mono text-xs uppercase tracking-[0.12em] font-bold text-coral mb-1">
                      {systemNodes[activeSystemNode].title} / {systemNodes[activeSystemNode].role}
                    </div>
                    <div>{systemNodes[activeSystemNode].desc}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation footer within case study */}
            <div className="pt-8 border-t border-[var(--rule)] flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  const currentIndex = caseStudy.sections.findIndex((s) => s.id === activeSection.id);
                  if (currentIndex > 0) {
                    setActiveSectionId(caseStudy.sections[currentIndex - 1].id);
                  }
                }}
                disabled={caseStudy.sections.findIndex((s) => s.id === activeSection.id) === 0}
                className="px-4 py-2 rounded-full bg-ghost hover:bg-ghost-active border border-[var(--rule)] disabled:opacity-30 disabled:pointer-events-none text-xs font-mono uppercase tracking-[0.12em] font-semibold text-mute hover:text-ivory transition-colors cursor-pointer active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
              >
                ← Previous Section
              </button>

              <button
                type="button"
                onClick={() => {
                  const currentIndex = caseStudy.sections.findIndex((s) => s.id === activeSection.id);
                  if (currentIndex < caseStudy.sections.length - 1) {
                    setActiveSectionId(caseStudy.sections[currentIndex + 1].id);
                  } else {
                    onOpenContact();
                  }
                }}
                className="px-5 py-2 rounded-full bg-coral hover:bg-[#F6AE96] text-xs font-mono uppercase tracking-[0.14em] font-bold text-void transition-colors cursor-pointer flex items-center gap-1.5 active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
              >
                <span>
                  {caseStudy.sections.findIndex((s) => s.id === activeSection.id) ===
                  caseStudy.sections.length - 1
                    ? 'Connect with Deepak'
                    : 'Next Section →'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
