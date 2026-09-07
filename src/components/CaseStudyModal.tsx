import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
        className="w-full max-w-5xl h-[92vh] flex flex-col bg-[#0c0f14] border border-white/20 rounded-[28px] shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden text-left select-text relative cursor-default"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.03] backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#01bc7c]/20 border border-[#01bc7c]/40 flex items-center justify-center text-[#01bc7c]">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#01bc7c]">
                  {caseStudy.category}
                </span>
                <span className="text-white/30">•</span>
                <span className="text-xs text-white/60 font-medium">{caseStudy.timeline}</span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-none mt-0.5">
                {caseStudy.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenContact}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#01bc7c]/15 hover:bg-[#01bc7c]/25 border border-[#01bc7c]/40 text-[#01bc7c] text-xs font-bold transition-all cursor-pointer"
            >
              <span>Discuss Strategy</span>
              <ArrowRight size={13} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Main Body: 2-column layout on desktop */}
        <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
          {/* Left Sidebar: Section Index */}
          <div className="w-full lg:w-72 border-b lg:border-b-0 lg:border-r border-white/10 bg-black/30 p-4 overflow-y-auto shrink-0 flex lg:flex-col gap-1.5">
            <div className="text-[11px] font-bold text-white/40 uppercase tracking-wider px-2 py-1 hidden lg:block">
              Case Study Outline ({caseStudy.sections.length} Sections)
            </div>
            {caseStudy.sections.map((section) => {
              const isActive = activeSection.id === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSectionId(section.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all duration-200 cursor-pointer shrink-0 lg:shrink ${
                    isActive
                      ? 'bg-[#01bc7c]/20 border border-[#01bc7c]/50 text-white font-semibold shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                      isActive ? 'bg-[#01bc7c] text-black font-bold' : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {section.number}
                  </span>
                  <span className="truncate flex-1">{section.title}</span>
                  {isActive && <ChevronRight size={14} className="text-[#01bc7c] hidden lg:block" />}
                </button>
              );
            })}
          </div>

          {/* Right Area: Active Section Content */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
            {/* Thesis Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#01bc7c]/15 via-emerald-900/10 to-transparent border border-[#01bc7c]/30">
              <div className="text-[11px] font-bold text-[#01bc7c] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Compass size={13} /> Product Thesis
              </div>
              <div className="text-base sm:text-lg font-bold text-white tracking-tight italic">
                “{caseStudy.thesis}”
              </div>
              <p className="text-xs sm:text-sm text-white/70 mt-1.5 leading-relaxed">
                {caseStudy.subtitle}
              </p>
            </div>

            {/* Verified Key Stats Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {caseStudy.keyStats.map((stat, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs"
                >
                  <div className="text-[11px] text-white/50 font-medium mb-1">{stat.label}</div>
                  <div className="text-xl font-extrabold text-[#01bc7c]">{stat.value}</div>
                  <div className="text-[11px] text-white/60 truncate">{stat.detail}</div>
                </div>
              ))}
            </div>

            {/* Current Section Content View */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#01bc7c]/20 text-[#01bc7c] border border-[#01bc7c]/30">
                  Section {activeSection.number}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {activeSection.title}
                </h3>
              </div>

              {activeSection.subtitle && (
                <p className="text-sm font-semibold text-white/80 italic">
                  {activeSection.subtitle}
                </p>
              )}

              <div className="space-y-3.5 text-sm sm:text-base text-white/80 leading-relaxed">
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
                      className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-[#01bc7c]/40 transition-colors"
                    >
                      <div className="flex items-center gap-2 font-bold text-white text-sm mb-1.5">
                        <CheckCircle2 size={16} className="text-[#01bc7c] shrink-0" />
                        <span>{h.title}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{h.desc}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Quote if present */}
              {activeSection.quote && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border-l-4 border-l-[#01bc7c] border-white/10 my-4">
                  <p className="text-sm sm:text-base text-white/90 font-medium italic">
                    “{activeSection.quote}”
                  </p>
                </div>
              )}

              {/* Evaluation Table if present */}
              {activeSection.evaluationTable && activeSection.evaluationTable.length > 0 && (
                <div className="my-4 rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
                  <div className="p-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-2 bg-white/[0.02]">
                    <div className="text-xs font-bold text-[#01bc7c] uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles size={14} /> Golden Evaluation Test Benchmark (20 Queries)
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#01bc7c]/20 text-[#01bc7c] border border-[#01bc7c]/30">
                      95% Accuracy (19/20 Pass)
                    </span>
                  </div>
                  <div className="overflow-x-auto max-h-80">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead className="sticky top-0 bg-[#042718] text-white/60 border-b border-white/10">
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
                      <tbody className="divide-y divide-white/5">
                        {activeSection.evaluationTable.map((row) => (
                          <tr key={row.id} className="hover:bg-white/[0.02]">
                            <td className="py-2.5 px-3 font-mono text-white/50">{row.id}</td>
                            <td className="py-2.5 px-3 text-white/90 font-medium">"{row.query}"</td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 rounded bg-white/5 text-white/70 text-[10px]">
                                {row.category}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-white/70 text-[11px]">{row.groundTruthSource}</td>
                            <td className="py-2.5 px-3 text-center font-mono text-[#01bc7c]">
                              {row.similarity.toFixed(2)}
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  row.status === "Pass"
                                    ? "bg-[#01bc7c]/20 text-[#01bc7c]"
                                    : "bg-amber-500/20 text-amber-300"
                                }`}
                              >
                                {row.status}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-white/60 text-[11px]">{row.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Special Interactive System Diagram for Section 10 */}
              {activeSection.id === 'the-system' && (
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/15 my-4 space-y-4">
                  <div className="text-xs font-bold text-[#01bc7c] uppercase tracking-wider flex items-center gap-1.5">
                    <Layers size={14} /> Interactive Multi-Tier Supply Flow
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {systemNodes.map((node, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveSystemNode(index)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          activeSystemNode === index
                            ? 'bg-[#01bc7c]/20 border-[#01bc7c] text-white shadow-md'
                            : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        <div className="text-[11px] font-bold text-white leading-tight truncate">
                          {node.title}
                        </div>
                        <div className="text-[10px] text-[#01bc7c] font-medium mt-0.5 truncate">
                          {node.tool}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs sm:text-sm text-white/85 leading-relaxed">
                    <div className="font-bold text-[#01bc7c] mb-1">
                      {systemNodes[activeSystemNode].title} · {systemNodes[activeSystemNode].role}
                    </div>
                    <div>{systemNodes[activeSystemNode].desc}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation footer within case study */}
            <div className="pt-8 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  const currentIndex = caseStudy.sections.findIndex((s) => s.id === activeSection.id);
                  if (currentIndex > 0) {
                    setActiveSectionId(caseStudy.sections[currentIndex - 1].id);
                  }
                }}
                disabled={caseStudy.sections.findIndex((s) => s.id === activeSection.id) === 0}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-xs font-semibold text-white/80 hover:text-white transition-colors cursor-pointer"
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
                className="px-5 py-2 rounded-full bg-[#01bc7c] hover:bg-[#01a26c] text-xs font-bold text-white transition-colors cursor-pointer flex items-center gap-1.5"
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
