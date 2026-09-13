import React, { useState, useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Send,
  X,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  Calendar,
  RotateCcw,
  BookOpen,
} from "lucide-react";
import { CALENDLY_URL } from "../utils/calendly";

interface RetrievedChunk {
  id: string;
  source: string;
  title: string;
  category: string;
  chunk: string;
  similarity: number;
}

interface Message {
  id: string;
  sender: "user" | "copilot";
  text: string;
  timestamp: string;
  fallback?: boolean;
  retrievedChunks?: RetrievedChunk[];
  topSimilarity?: number;
  retrievalTimeMs?: number;
  totalTimeMs?: number;
}

interface CopilotWidgetProps {
  onOpenBookChat: () => void;
  onNavigate: (path: string) => void;
}

const STARTER_PROMPTS = [
  "What was Deepak's impact at ReshaMandi?",
  "Why choose RAG over fine-tuning for this site?",
  "How did the Sportstech AI Coach handle latency?",
  "Explain Deepak's first operating principle",
];

export default function CopilotWidget({
  onOpenBookChat,
  onNavigate,
}: CopilotWidgetProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);

  /* The hero carries the assistant as its front door, so the floating
     launcher stands down while the hero is on screen and fades up once the
     reader is past it. On pages with no hero it is always available. */
  const [launcherVisible, setLauncherVisible] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero || typeof IntersectionObserver === "undefined") {
      setLauncherVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setLauncherVisible(!entry.isIntersecting),
      { threshold: 0.12 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [selectedChunk, setSelectedChunk] = useState<RetrievedChunk | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "copilot",
      text: "Hi! I'm Deepak’s AI Copilot. I'm a custom Retrieval-Augmented Generation (RAG) assistant running on Gemini Flash Lite and an in-memory cosine similarity engine.\n\nAsk me anything about Deepak’s work, metrics, operating principles, or the architecture of this portfolio copilot.",
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        if (selectedChunk) {
          setSelectedChunk(null);
        } else {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isOpen, selectedChunk]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, messages]);

  const handleSend = async (queryText?: string) => {
    const textToSend = (queryText || input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = {
      id: "user-" + Date.now(),
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!queryText) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/copilot/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: textToSend }),
      });

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();

      const copilotMessage: Message = {
        id: "copilot-" + Date.now(),
        sender: "copilot",
        text: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        fallback: data.fallback,
        retrievedChunks: data.retrievedChunks,
        topSimilarity: data.topSimilarity,
        retrievalTimeMs: data.retrievalTimeMs,
        totalTimeMs: data.totalTimeMs,
      };

      setMessages((prev) => [...prev, copilotMessage]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: "error-" + Date.now(),
          sender: "copilot",
          text: "I encountered a transient network connection error while communicating with the retrieval server. Please try asking again or feel free to book a chat directly with Deepak.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          fallback: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "welcome-" + Date.now(),
        sender: "copilot",
        text: "Chat cleared. Ask me anything about Deepak’s case studies, leadership track record, or this copilot's architecture.",
        timestamp: "Just now",
      },
    ]);
    setSelectedChunk(null);
  };

  const formatText = (content: string, isUser: boolean = false) => {
    // Simple markdown paragraph and list formatter
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      if (line.startsWith("* ") || line.startsWith("- ")) {
        const bulletText = line.substring(2);
        return (
          <li
            key={idx}
            className={`ml-4 list-disc text-sm my-1 leading-relaxed ${
              isUser ? "text-ivory font-medium" : "text-ivory/90 font-body"
            }`}
          >
            {renderBold(bulletText, isUser)}
          </li>
        );
      }
      if (line.trim() === "") {
        return <div key={idx} className="h-2" />;
      }
      return (
        <p
          key={idx}
          className={`text-sm leading-relaxed my-1 ${
            isUser ? "text-ivory font-medium" : "text-ivory/90 font-body"
          }`}
        >
          {renderBold(line, isUser)}
        </p>
      );
    });
  };

  const renderBold = (str: string, isUser: boolean = false) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong
            key={i}
            className="font-bold text-ivory"
          >
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <>
      <style>{`
        @keyframes copilot-breathe {
          0%, 100% {
            transform: scale(1);
            opacity: .55;
          }
          50% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        /* the ring is a pseudo-element, so the breath animates transform and
           opacity only, never box-shadow */
        .animate-copilot-breathe::after {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 9999px;
          border: 2px solid rgba(240, 151, 122, .5);
          animation: copilot-breathe 3.2s ease-in-out infinite;
          pointer-events: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-copilot-breathe::after { animation: none; opacity: .4; transform: none; }
        }
      `}</style>

      {/* Floating Circular Photo Trigger Button */}
      {!isOpen && (
        <button
          id="copilot-launcher-btn"
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-5 right-5 z-40 group flex items-center justify-center w-14 h-14 rounded-full bg-void text-ivory active:scale-[.97] border-2 border-coral/40 hover:border-coral cursor-pointer ${shouldReduceMotion ? "" : "animate-copilot-breathe"} overflow-visible transition-opacity duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral ${launcherVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          aria-label="Open Deepak's AI Copilot"
          title="Open Deepak's AI Copilot"
        >
          {/* Avatar container */}
          <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-void">
            <div className="w-full h-full flex items-center justify-center font-mono font-bold text-sm text-ivory select-none group-hover:scale-105 transition-transform bg-void">
              DP
            </div>
          </div>

          {/* AI Sparkles Badge */}
          <span className="absolute -bottom-0.5 -right-0.5 z-20 w-4.5 h-4.5 rounded-full bg-void border border-coral/50 flex items-center justify-center shadow-xs">
            <Sparkles size={10} className={`text-coral ${shouldReduceMotion ? "" : "animate-pulse"}`} />
          </span>
        </button>
      )}

      {/* Main Copilot Drawer / Modal */}
      {isOpen && (
        <div
          id="copilot-window"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[460px] h-[620px] max-h-[calc(100vh-48px)] flex flex-col rounded-[24px] bg-void border border-[var(--rule-strong)] shadow-2xl overflow-hidden font-body transition-all duration-300 text-ivory"
        >
          {/* Header */}
          <div className="p-4 bg-ghost border-b border-[var(--rule)] text-ivory flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-void border border-[var(--rule)] flex items-center justify-center text-coral">
                <Sparkles size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3
                    className="font-display text-sm sm:text-base font-bold text-ivory tracking-tight"
                    style={{ fontVariationSettings: '"wdth" 92' }}
                  >
                    Deepak's AI Copilot
                  </h3>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-void text-coral border border-[var(--rule)]">
                    RAG
                  </span>
                </div>
                <p className="text-[11px] text-mute font-mono uppercase tracking-[0.08em] truncate max-w-[240px]">
                  Grounded in 45+ case study chunks / gemini-3.1-flash-lite
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsHowItWorksOpen(!isHowItWorksOpen)}
                title="How this works"
                className={`p-1.5 rounded-lg text-xs font-mono uppercase tracking-[0.1em] flex items-center gap-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral ${
                  isHowItWorksOpen
                    ? "bg-coral text-void font-bold"
                    : "text-mute hover:text-ivory hover:bg-ghost-active"
                }`}
              >
                <Info size={16} />
                <span className="hidden sm:inline text-[11px]">Architecture</span>
              </button>

              <button
                onClick={handleResetChat}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-mute hover:text-ivory hover:bg-ghost-active transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
              >
                <RotateCcw size={15} />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close Copilot"
                className="p-1.5 rounded-lg text-mute hover:text-ivory hover:bg-ghost-active transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* "How This Works" Collapsible Transparent Architecture Panel */}
          {isHowItWorksOpen && (
            <div className="bg-ghost border-b border-[var(--rule)] p-4 shrink-0 overflow-y-auto max-h-[220px] transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-coral uppercase tracking-[0.14em]">
                  <Cpu size={14} />
                  <span>How This Custom RAG Works</span>
                </div>
                <button
                  onClick={() => {
                    onNavigate("/work/behind-ai-copilot");
                    setIsOpen(false);
                  }}
                  className="font-mono text-[11px] text-coral hover:text-[#F6AE96] flex items-center gap-1 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-xs"
                >
                  <span>Read Case Study</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              {/* Step-by-Step Transparent Pipeline Diagram */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-body">
                <div className="p-2 rounded-lg bg-void border border-[var(--rule)]">
                  <div className="font-mono font-bold text-coral flex items-center gap-1 mb-0.5 text-[11px]">
                    <span>1. Ingest & Chunk</span>
                  </div>
                  <p className="text-[10px] text-mute">
                    45 atomic semantic chunks (subsections, not tokens)
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-void border border-[var(--rule)]">
                  <div className="font-mono font-bold text-coral flex items-center gap-1 mb-0.5 text-[11px]">
                    <span>2. Build Embed</span>
                  </div>
                  <p className="text-[10px] text-mute">
                    gemini-embedding-2 (512-dim) stored in JSON
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-void border border-[var(--rule)]">
                  <div className="font-mono font-bold text-coral flex items-center gap-1 mb-0.5 text-[11px]">
                    <span>3. In-Memory Search</span>
                  </div>
                  <p className="text-[10px] text-mute">
                    Cosine similarity on CPU in &lt;2ms (No Vector DB)
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-void border border-[var(--rule)]">
                  <div className="font-mono font-bold text-coral flex items-center gap-1 mb-0.5 text-[11px]">
                    <span>4. Confidence Gate</span>
                  </div>
                  <p className="text-[10px] text-mute">
                    Threshold &ge; 0.68. Unknowns escalate to Book Chat
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-void border border-[var(--rule)]">
                  <div className="font-mono font-bold text-coral flex items-center gap-1 mb-0.5 text-[11px]">
                    <span>5. Strict Grounding</span>
                  </div>
                  <p className="text-[10px] text-mute">
                    Top 3-4 chunks passed to gemini-3.1-flash-lite
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-void border border-[var(--rule)]">
                  <div className="font-mono font-bold text-coral flex items-center gap-1 mb-0.5 text-[11px]">
                    <span>6. Source Provenance</span>
                  </div>
                  <p className="text-[10px] text-mute">
                    Citations tagged with exact similarity percentages
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Selected Chunk Modal / Drawer Overlay */}
          {selectedChunk && (
            <div className="absolute inset-0 bg-black/80 z-30 flex flex-col justify-end p-3 animate-fade-in">
              <div className="bg-void rounded-2xl p-4 shadow-2xl max-h-[80%] overflow-y-auto flex flex-col border border-[var(--rule-strong)] text-ivory">
                <div className="flex items-center justify-between pb-2 border-b border-[var(--rule)]">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-coral uppercase tracking-[0.16em]">
                      Ground Truth Source Chunk
                    </span>
                    <h4
                      className="font-display text-sm font-bold text-ivory"
                      style={{ fontVariationSettings: '"wdth" 92' }}
                    >
                      {selectedChunk.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => setSelectedChunk(null)}
                    className="p-1 rounded hover:bg-ghost text-mute hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="my-2.5 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-ghost border border-[var(--rule)] text-[11px] font-mono text-mute">
                    {selectedChunk.source}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-ghost border border-[var(--rule)] text-[11px] font-mono font-bold text-coral">
                    Match: {(selectedChunk.similarity * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-ghost border border-[var(--rule)] text-xs text-ivory/90 leading-relaxed font-mono">
                  {selectedChunk.chunk}
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-[var(--rule)]">
                  <span className="text-[11px] font-mono text-mute">
                    Chunk ID: <code className="text-ivory">{selectedChunk.id}</code>
                  </span>
                  <button
                    onClick={() => setSelectedChunk(null)}
                    className="px-3 py-1 text-xs font-mono uppercase tracking-[0.12em] font-semibold rounded-lg bg-coral text-void hover:bg-[#F6AE96] transition-colors cursor-pointer active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-void">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Chat Bubble */}
                <div
                  className={`max-w-[88%] p-3.5 rounded-[18px] text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-ghost border border-[var(--rule-strong)] text-ivory rounded-br-xs shadow-xs"
                      : "bg-ghost/70 text-ivory border border-[var(--rule)] rounded-bl-xs shadow-2xs"
                  }`}
                >
                  {formatText(msg.text, msg.sender === "user")}

                  {/* Fallback CTA Button if query went out of bounds */}
                  {msg.fallback && (
                    <div className="mt-3 pt-3 border-t border-[var(--rule)] flex flex-col gap-2">
                      <div className="text-[11px] font-mono text-coral flex items-center gap-1.5">
                        <AlertTriangle size={13} className="text-coral shrink-0" />
                        <span>Question is outside verified portfolio facts.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={CALENDLY_URL}
                          target="_blank"
                          rel="noopener"
                          onClick={() => {
                            setIsOpen(false);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coral hover:bg-[#F6AE96] text-void font-mono uppercase tracking-[0.12em] font-semibold text-xs transition-colors shadow-xs active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                        >
                          <Calendar size={13} />
                          <span>Book Chat with Deepak</span>
                        </a>
                        <button
                          onClick={() => {
                            onNavigate("/work/behind-ai-copilot");
                            setIsOpen(false);
                          }}
                          className="text-xs font-mono text-coral hover:text-[#F6AE96] font-medium flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-xs"
                        >
                          <span>See Fallback Design</span>
                          <ArrowRight size={11} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Grounded Source Badges (Transparency Layer) */}
                {msg.sender === "copilot" &&
                  msg.retrievedChunks &&
                  msg.retrievedChunks.length > 0 && (
                    <div className="mt-2 ml-1 max-w-[92%]">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-mute uppercase tracking-[0.14em] mb-1">
                        <CheckCircle2 size={11} className="text-coral" />
                        <span>Grounded in {msg.retrievedChunks.length} sources:</span>
                        {msg.retrievalTimeMs && (
                          <span className="text-[9px] text-mute/60 font-mono">
                            ({msg.retrievalTimeMs}ms retrieval)
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.retrievedChunks.map((chunk, cIdx) => (
                          <button
                            key={cIdx}
                            onClick={() => setSelectedChunk(chunk)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.08em] bg-ghost hover:bg-ghost-active border border-[var(--rule)] text-mute hover:text-ivory transition-colors shadow-2xs group cursor-pointer active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                            title="Click to view exact ground chunk"
                          >
                            <BookOpen size={10} className="text-coral" />
                            <span className="truncate max-w-[140px]">{chunk.source}</span>
                            <span className="font-mono text-[9px] text-coral font-bold">
                              {(chunk.similarity * 100).toFixed(0)}%
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                <span className="text-[10px] font-mono text-mute mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="p-3.5 rounded-[18px] bg-ghost border border-[var(--rule)] shadow-2xs rounded-bl-xs flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-coral rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-coral rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-coral rounded-full animate-bounce" />
                  </div>
                  <span className="text-xs text-mute font-mono">
                    Searching in-memory embeddings...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips */}
          {messages.length <= 2 && !isLoading && (
            <div className="p-3 bg-ghost border-t border-[var(--rule)]">
              <div className="text-[10px] font-mono font-bold text-coral uppercase tracking-[0.16em] mb-2">
                Suggested Questions
              </div>
              <div className="flex flex-wrap gap-1.5">
                {STARTER_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="text-left text-[11px] px-2.5 py-1.5 rounded-full bg-void hover:bg-ghost-active border border-[var(--rule)] hover:border-coral/40 text-ivory font-body transition-colors cursor-pointer active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Bar */}
          <div className="p-3 bg-ghost border-t border-[var(--rule)] flex items-center gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Deepak's metrics, case studies, RAG..."
              disabled={isLoading}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-void border border-[var(--rule)] focus:outline-none focus:border-coral font-body text-xs sm:text-sm text-ivory placeholder:text-mute/50 focus-visible:ring-2 focus-visible:ring-coral"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-coral hover:bg-[#F6AE96] disabled:bg-ghost text-void disabled:text-mute transition-colors shrink-0 shadow-xs cursor-pointer disabled:cursor-not-allowed active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
              aria-label="Send query"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
