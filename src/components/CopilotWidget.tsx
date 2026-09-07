import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  X,
  ChevronDown,
  ChevronUp,
  Cpu,
  Database,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  Calendar,
  RotateCcw,
  BookOpen,
  Layers,
  Terminal,
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
  const [isOpen, setIsOpen] = useState(false);
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
              isUser ? "text-white" : "text-[#042718]/90"
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
            isUser ? "text-white font-medium" : "text-[#042718]/90"
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
            className={`font-bold ${
              isUser ? "text-white" : "text-[#042718]"
            }`}
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
            box-shadow: 0 10px 25px -5px rgba(4, 39, 24, 0.4), 0 0 0 0 rgba(1, 188, 124, 0.25);
          }
          50% {
            transform: scale(1.04);
            box-shadow: 0 14px 28px -5px rgba(4, 39, 24, 0.5), 0 0 0 6px rgba(1, 188, 124, 0);
          }
        }
        .animate-copilot-breathe {
          animation: copilot-breathe 3.2s ease-in-out infinite;
        }
      `}</style>

      {/* Floating Circular Photo Trigger Button */}
      {!isOpen && (
        <button
          id="copilot-launcher-btn"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 group flex items-center justify-center w-14 h-14 rounded-full bg-[#042718] text-white shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-300 border-2 border-[#188E39]/40 hover:border-[#188E39]/80 cursor-pointer animate-copilot-breathe overflow-visible"
          aria-label="Open Deepak's AI Copilot"
          title="Open Deepak's AI Copilot"
        >
          {/* Subtle online status indicator dot */}
          <span className="absolute -top-0.5 -right-0.5 z-20 flex h-3.5 w-3.5 pointer-events-none">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#01bc7c] opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#01bc7c] border-2 border-[#FAFDFB]" />
          </span>

          {/* Avatar container - awaiting user-provided data URI in next prompt */}
          <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#042718]">
            <div className="w-full h-full flex items-center justify-center font-onest font-bold text-base text-white tracking-[-0.2px] select-none group-hover:scale-105 transition-transform bg-[#042718]">
              DP
            </div>
          </div>

          {/* Subtle AI Sparkles Badge */}
          <span className="absolute -bottom-0.5 -right-0.5 z-20 w-4.5 h-4.5 rounded-full bg-[#042718] border border-[#01bc7c]/50 flex items-center justify-center shadow-xs">
            <Sparkles size={10} className="text-[#01bc7c] animate-pulse" />
          </span>
        </button>
      )}

      {/* Main Copilot Drawer / Modal */}
      {isOpen && (
        <div
          id="copilot-window"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[460px] h-[620px] max-h-[calc(100vh-48px)] flex flex-col rounded-[24px] bg-[#FFFFFF] border border-[#042718]/15 shadow-2xl overflow-hidden font-inter transition-all duration-300"
        >
          {/* Header */}
          <div className="p-4 bg-[#042718] text-white flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#188E39]/20 border border-[#01bc7c]/40 flex items-center justify-center text-[#01bc7c]">
                <Sparkles size={18} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-onest text-sm sm:text-base font-bold text-white tracking-tight">
                    Deepak's AI Copilot
                  </h3>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#01bc7c]/20 text-[#01bc7c] border border-[#01bc7c]/30">
                    RAG
                  </span>
                </div>
                <p className="text-[11px] text-white/60 font-inter truncate max-w-[240px]">
                  Grounded in 45+ case study chunks · gemini-3.1-flash-lite
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsHowItWorksOpen(!isHowItWorksOpen)}
                title="How this works"
                className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                  isHowItWorksOpen
                    ? "bg-[#01bc7c] text-[#042718] font-bold"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Info size={16} />
                <span className="hidden sm:inline text-[11px]">Architecture</span>
              </button>

              <button
                onClick={handleResetChat}
                title="Reset conversation"
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <RotateCcw size={15} />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close Copilot"
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* "How This Works" Collapsible Transparent Architecture Panel */}
          {isHowItWorksOpen && (
            <div className="bg-[#FAFDFB] border-b border-[#042718]/10 p-4 shrink-0 overflow-y-auto max-h-[220px] transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#188E39] uppercase tracking-wider">
                  <Cpu size={14} />
                  <span>How This Custom RAG Works</span>
                </div>
                <button
                  onClick={() => {
                    onNavigate("/work/behind-ai-copilot");
                    setIsOpen(false);
                  }}
                  className="text-[11px] font-semibold text-[#188E39] hover:underline flex items-center gap-1"
                >
                  <span>Read Case Study</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              {/* Step-by-Step Transparent Pipeline Diagram */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-[#042718] font-inter">
                <div className="p-2 rounded-lg bg-white border border-[#042718]/10">
                  <div className="font-bold text-[#188E39] flex items-center gap-1 mb-0.5">
                    <span>1. Ingest & Chunk</span>
                  </div>
                  <p className="text-[10px] text-[#042718]/70">
                    45 atomic semantic chunks (subsections, not tokens)
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-white border border-[#042718]/10">
                  <div className="font-bold text-[#188E39] flex items-center gap-1 mb-0.5">
                    <span>2. Build Embed</span>
                  </div>
                  <p className="text-[10px] text-[#042718]/70">
                    gemini-embedding-2 (512-dim) stored in JSON
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-white border border-[#042718]/10">
                  <div className="font-bold text-[#188E39] flex items-center gap-1 mb-0.5">
                    <span>3. In-Memory Search</span>
                  </div>
                  <p className="text-[10px] text-[#042718]/70">
                    Cosine similarity on CPU in &lt;2ms (No Vector DB)
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-white border border-[#042718]/10">
                  <div className="font-bold text-[#188E39] flex items-center gap-1 mb-0.5">
                    <span>4. Confidence Gate</span>
                  </div>
                  <p className="text-[10px] text-[#042718]/70">
                    Threshold &ge; 0.68. Unknowns escalate to Book Chat
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-white border border-[#042718]/10">
                  <div className="font-bold text-[#188E39] flex items-center gap-1 mb-0.5">
                    <span>5. Strict Grounding</span>
                  </div>
                  <p className="text-[10px] text-[#042718]/70">
                    Top 3-4 chunks passed to gemini-3.1-flash-lite
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-white border border-[#042718]/10">
                  <div className="font-bold text-[#188E39] flex items-center gap-1 mb-0.5">
                    <span>6. Source Provenance</span>
                  </div>
                  <p className="text-[10px] text-[#042718]/70">
                    Citations tagged with exact similarity percentages
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Selected Chunk Modal / Drawer Overlay */}
          {selectedChunk && (
            <div className="absolute inset-0 bg-[#042718]/60 z-30 flex flex-col justify-end p-3 animate-fade-in">
              <div className="bg-white rounded-2xl p-4 shadow-2xl max-h-[80%] overflow-y-auto flex flex-col border border-[#042718]/15">
                <div className="flex items-center justify-between pb-2 border-b border-[#042718]/10">
                  <div>
                    <span className="text-[10px] font-bold text-[#188E39] uppercase tracking-wider">
                      Ground Truth Source Chunk
                    </span>
                    <h4 className="font-onest text-sm font-bold text-[#042718]">
                      {selectedChunk.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => setSelectedChunk(null)}
                    className="p-1 rounded hover:bg-[#042718]/10 text-[#042718]/70"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="my-2.5 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#042718]/5 text-[11px] font-semibold text-[#042718]/80">
                    {selectedChunk.source}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#ECFDF5] text-[11px] font-bold text-[#065F46]">
                    Match: {(selectedChunk.similarity * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#FAFDFB] border border-[#042718]/10 text-xs text-[#042718]/80 leading-relaxed font-mono">
                  {selectedChunk.chunk}
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#042718]/10">
                  <span className="text-[11px] text-[#042718]/60">
                    Chunk ID: <code className="text-[#042718]">{selectedChunk.id}</code>
                  </span>
                  <button
                    onClick={() => setSelectedChunk(null)}
                    className="px-3 py-1 text-xs font-semibold rounded-lg bg-[#042718] text-white hover:bg-[#188E39] transition-colors"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8FAF9]">
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
                      ? "bg-[#042718] text-white rounded-br-xs shadow-xs"
                      : "bg-white text-[#042718] border border-[#042718]/10 rounded-bl-xs shadow-2xs"
                  }`}
                >
                  {formatText(msg.text, msg.sender === "user")}

                  {/* Fallback CTA Button if query went out of bounds */}
                  {msg.fallback && (
                    <div className="mt-3 pt-3 border-t border-[#042718]/10 flex flex-col gap-2">
                      <div className="text-[11px] text-[#042718]/70 flex items-center gap-1.5">
                        <AlertTriangle size={13} className="text-[#D97706] shrink-0" />
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
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#188E39] hover:bg-[#065F46] text-white font-semibold text-xs transition-colors shadow-xs"
                        >
                          <Calendar size={13} />
                          <span>Book Chat with Deepak</span>
                        </a>
                        <button
                          onClick={() => {
                            onNavigate("/work/behind-ai-copilot");
                            setIsOpen(false);
                          }}
                          className="text-xs text-[#188E39] font-medium hover:underline flex items-center gap-1"
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
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#042718]/60 uppercase tracking-wider mb-1">
                        <CheckCircle2 size={11} className="text-[#188E39]" />
                        <span>Grounded in {msg.retrievedChunks.length} sources:</span>
                        {msg.retrievalTimeMs && (
                          <span className="text-[9px] text-[#042718]/40 lowercase font-mono">
                            ({msg.retrievalTimeMs}ms retrieval)
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.retrievedChunks.map((chunk, cIdx) => (
                          <button
                            key={cIdx}
                            onClick={() => setSelectedChunk(chunk)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-medium bg-white hover:bg-[#ECFDF5] border border-[#042718]/10 text-[#042718]/80 hover:text-[#065F46] hover:border-[#188E39]/40 transition-colors shadow-2xs group"
                            title="Click to view exact ground chunk"
                          >
                            <BookOpen size={10} className="text-[#188E39]" />
                            <span className="truncate max-w-[140px]">{chunk.source}</span>
                            <span className="font-mono text-[9px] text-[#188E39] font-bold">
                              {(chunk.similarity * 100).toFixed(0)}%
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                <span className="text-[10px] text-[#042718]/40 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="p-3.5 rounded-[18px] bg-white border border-[#042718]/10 shadow-2xs rounded-bl-xs flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#188E39] rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-[#188E39] rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-[#188E39] rounded-full animate-bounce" />
                  </div>
                  <span className="text-xs text-[#042718]/60 font-inter font-medium">
                    Searching in-memory embeddings...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips */}
          {messages.length <= 2 && !isLoading && (
            <div className="p-3 bg-white border-t border-[#042718]/8">
              <div className="text-[10px] font-bold text-[#042718]/50 uppercase tracking-wider mb-2">
                Suggested Questions
              </div>
              <div className="flex flex-wrap gap-1.5">
                {STARTER_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="text-left text-[11px] px-2.5 py-1.5 rounded-full bg-[#FAFDFB] hover:bg-[#ECFDF5] border border-[#042718]/10 hover:border-[#188E39]/40 text-[#042718]/80 hover:text-[#065F46] transition-colors"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-[#042718]/10 flex items-center gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Deepak's metrics, case studies, RAG..."
              disabled={isLoading}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/15 focus:outline-none focus:border-[#188E39] focus:ring-1 focus:ring-[#188E39] text-xs sm:text-sm text-[#042718] placeholder-[#042718]/40"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-[#042718] hover:bg-[#188E39] disabled:bg-[#042718]/20 text-white disabled:text-white/40 transition-colors shrink-0 shadow-xs"
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
