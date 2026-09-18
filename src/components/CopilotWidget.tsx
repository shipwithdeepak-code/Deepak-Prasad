import React, { useState, useRef, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import BreathingOrb from "./visuals/BreathingOrb";
import PlasmaRing from "./visuals/PlasmaRing";
import {
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
  currentPath?: string;
}

type OpenCopilotHandler = (initialText?: string) => void;
let globalOpenCopilotHandler: OpenCopilotHandler | null = null;

export function openCopilot(initialText?: string) {
  if (globalOpenCopilotHandler) {
    globalOpenCopilotHandler(initialText);
  } else if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("open-copilot", { detail: { text: initialText } })
    );
  }
}

const STARTER_PROMPTS = [
  "What was Deepak's impact at ReshaMandi?",
  "Why did you build Dipa on RAG, not fine-tuning?",
  "How did the Sportstech AI Coach handle latency?",
  "Explain Deepak's first operating principle",
];

export default function CopilotWidget({
  onOpenBookChat,
  onNavigate,
  currentPath = "/",
}: CopilotWidgetProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);

  /* The hero carries the assistant search bar as its front door, so the floating
     Plasma Ring launcher stands down while the hero is visible on screen and fades up
     once the reader is past it. On non-Hero pages and routes, it is always available. */
  const isHomePage = currentPath === "/";
  const [launcherVisible, setLauncherVisible] = useState(
    () => !isHomePage || (typeof window !== "undefined" && window.scrollY > 200)
  );

  useEffect(() => {
    // If not on homepage, launcher is unconditionally visible everywhere
    if (currentPath !== "/") {
      setLauncherVisible(true);
      return;
    }

    let io: IntersectionObserver | null = null;
    let timer: NodeJS.Timeout | null = null;

    const checkHeroVisibility = () => {
      const hero = document.getElementById("hero");
      if (!hero) {
        // If hero is not in DOM, keep visible
        setLauncherVisible(true);
        return;
      }

      const rect = hero.getBoundingClientRect();
      // Hero is considered active only while occupying the primary screen (bottom extends down).
      // As soon as the user scrolls into Work (rect.bottom <= 120), the plasma launcher is visible.
      // Scrolling back up to the Hero (rect.bottom > 120 && rect.top < window.innerHeight) hides it.
      const isHeroActive = rect.bottom > 120 && rect.top < window.innerHeight;
      setLauncherVisible(!isHeroActive);
    };

    // Run initial check immediately
    checkHeroVisibility();

    // Attach scroll and resize listeners for immediate real-time response across all sections
    window.addEventListener("scroll", checkHeroVisibility, { passive: true });
    window.addEventListener("resize", checkHeroVisibility, { passive: true });

    // Also attach an IntersectionObserver as a complementary trigger
    const hero = document.getElementById("hero");
    if (hero && typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        () => {
          checkHeroVisibility();
        },
        { threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.75, 1.0] }
      );
      io.observe(hero);
    }

    // Re-check after brief timeouts to handle layout settles or image/font loads
    timer = setTimeout(checkHeroVisibility, 100);

    return () => {
      window.removeEventListener("scroll", checkHeroVisibility);
      window.removeEventListener("resize", checkHeroVisibility);
      if (timer) clearTimeout(timer);
      if (io) io.disconnect();
    };
  }, [currentPath]);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [selectedChunk, setSelectedChunk] = useState<RetrievedChunk | null>(null);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "copilot",
      text: "I'm Dipa. Deepak built me: a retrieval assistant over 45 chunks of his own record, scored in memory and generated with Gemini Flash Lite.\n\nAsk me about his work, a number, a decision he got wrong, or how I am put together. Every answer shows the sources it came from, and I will say so when something is outside the record.",
      timestamp: "Just now",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const isDraggingRef = useRef(false);
  const dragStartPosRef = useRef({ x: 0, y: 0 });

  /** The open handler below is registered once, so it cannot close over
   *  handleSend directly without freezing first-render state. */
  const sendRef = useRef<(queryText?: string) => void>(() => {});

  // Wire external openCopilot handler & custom event
  useEffect(() => {
    /** A question handed over from elsewhere on the site is sent, not just
     *  typed into the box. Someone who pressed Enter in the hero has already
     *  asked; making them press send again is a second ask for the same
     *  question. */
    const openWith = (initialText?: string) => {
      setIsOpen(true);
      const text = initialText?.trim();
      if (!text) return;
      requestAnimationFrame(() => sendRef.current(text));
    };
    globalOpenCopilotHandler = openWith;
    const handleCustomEvent = (e: Event) => {
      const custom = e as CustomEvent<{ text?: string }>;
      openWith(custom.detail?.text);
    };
    window.addEventListener("open-copilot", handleCustomEvent);
    return () => {
      globalOpenCopilotHandler = null;
      window.removeEventListener("open-copilot", handleCustomEvent);
    };
  }, []);

  // Click outside to close drawer
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (drawerRef.current && drawerRef.current.contains(target)) {
        return;
      }
      if (launcherRef.current && launcherRef.current.contains(target)) {
        return;
      }
      setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        if (selectedChunk) {
          setSelectedChunk(null);
        } else {
          setIsOpen(false);
          returnFocusToLauncher();
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
        if (inputRef.current) {
          inputRef.current.focus();
          const len = inputRef.current.value.length;
          inputRef.current.setSelectionRange(len, len);
        }
      }, 100);
    }
  }, [isOpen, messages]);

  // Marking the drawer inert on close blanks the focus ring, so the two
  // deliberate close paths (Escape, the Close button) hand focus back to the
  // launcher. Closing by clicking elsewhere leaves focus where the user put it.
  const returnFocusToLauncher = () => {
    requestAnimationFrame(() => launcherRef.current?.focus());
  };

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

  // Keep the handoff pointing at the current closure.
  useEffect(() => {
    sendRef.current = handleSend;
  });

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
              isUser ? "text-pure-white font-medium" : "text-mist "
            }`}
          >
            {renderBold(bulletText)}
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
            isUser ? "text-pure-white font-medium" : "text-mist "
          }`}
        >
          {renderBold(line)}
        </p>
      );
    });
  };

  const renderBold = (str: string) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong
            key={i}
            className="font-medium text-pure-white"
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
      {/* Main Copilot Drawer */}
      <div
        ref={drawerRef}
        id="copilot-window"
        className={`fixed z-[75] right-5 bottom-[84px] sm:right-6 sm:bottom-[96px] max-sm:[bottom:max(84px,calc(env(safe-area-inset-bottom,20px)+64px))] max-sm:[right:max(20px,env(safe-area-inset-right,20px))] sm:[bottom:max(96px,calc(env(safe-area-inset-bottom,24px)+72px))] sm:[right:max(24px,env(safe-area-inset-right,24px))] w-[calc(100vw-32px)] sm:w-[460px] h-[580px] max-h-[calc(100vh-120px)] flex flex-col rounded-2xl bg-[#0D0D10]/95 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.85)] overflow-hidden text-[#F5F5F0] transition-[transform,opacity] duration-300 ease-[var(--ease-out-soft)] ${
          isOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
        style={{
          transformOrigin: "bottom right",
          ...(shouldReduceMotion ? { transition: "none" } : {}),
        }}
        aria-hidden={!isOpen}
        inert={!isOpen}
        role="dialog"
        aria-modal="false"
        aria-label="Dipa, Deepak's retrieval assistant"
      >
        {/* Header */}
        {/* Header. Every child that can shrink does, and the one line that
            cannot be shortened truncates, because the drawer is 460px and
            three actions plus a model name do not fit at any width. */}
        <div className="p-3.5 bg-[#121216]/95 border-b border-[#222227] text-pure-white flex items-center justify-between gap-2 shrink-0 select-none">
          <div className="flex min-w-0 items-center gap-2.5">
            <BreathingOrb size={28} className="shrink-0" />
            <div className="min-w-0">
              <h3 className="truncate text-sm font-medium text-[#F5F5F0]">
                Dipa
              </h3>
              <p className="truncate text-[10.5px] text-[#8E8E93] font-mono uppercase tracking-[.06em]">
                Deepak's archive / 45 chunks
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-0.5">
            <button
              type="button"
              onClick={() => setIsHowItWorksOpen(!isHowItWorksOpen)}
              title="How Dipa works"
              aria-label="How Dipa works"
              className={`min-w-[44px] min-h-[44px] px-2 rounded-lg text-[10.5px] font-mono uppercase tracking-[.05em] flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                isHowItWorksOpen
                  ? "bg-white/[.08] text-[#F5F5F0]"
                  : "text-[#8E8E93] hover:text-[#F5F5F0] hover:bg-white/[.06]"
              }`}
            >
              <Info size={15} strokeWidth={1.7} />
              <span className="hidden sm:inline">How</span>
            </button>

            <button
              type="button"
              onClick={handleResetChat}
              title="Start over"
              aria-label="Start over"
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[#8E8E93] hover:text-[#F5F5F0] hover:bg-white/[.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-pulse cursor-pointer"
            >
              <RotateCcw size={15} />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                returnFocusToLauncher();
              }}
              title="Close Dipa assistant"
              aria-label="Close Dipa assistant"
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-[#8E8E93] hover:text-coral-pulse hover:bg-white/[.06] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-pulse cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

          {/* "How This Works" Collapsible Transparent Architecture Panel */}
          {isHowItWorksOpen && (
            <div className="bg-obsidian border-b border-hairline p-4 shrink-0 overflow-y-auto max-h-[220px] transition-all">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-coral-pulse uppercase tracking-[0.14em]">
                  <Cpu size={14} />
                  <span>How Dipa works</span>
                </div>
                <button
                  onClick={() => {
                    onNavigate("/work/behind-ai-copilot");
                    setIsOpen(false);
                  }}
                  className="font-mono text-[11px] text-coral-pulse hover:opacity-90 flex items-center gap-1 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-pulse rounded-xs"
                >
                  <span>Read Case Study</span>
                  <ArrowRight size={12} />
                </button>
              </div>

              {/* Step-by-Step Transparent Pipeline Diagram */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] ">
                <div className="p-2 rounded-lg bg-void-black v3-key-quiet">
                  <div className="font-mono font-medium text-coral-pulse flex items-center gap-1 mb-0.5 text-[11px]">
                    <span>1. Ingest & Chunk</span>
                  </div>
                  <p className="text-[10px] text-smoke">
                    45 atomic semantic chunks (subsections, not tokens)
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-void-black v3-key-quiet">
                  <div className="font-mono font-medium text-coral-pulse flex items-center gap-1 mb-0.5 text-[11px]">
                    <span>2. Build Embed</span>
                  </div>
                  <p className="text-[10px] text-smoke">
                    gemini-embedding-2 (512-dim) stored in JSON
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-void-black v3-key-quiet">
                  <div className="font-mono font-medium text-coral-pulse flex items-center gap-1 mb-0.5 text-[11px]">
                    <span>3. In-Memory Search</span>
                  </div>
                  <p className="text-[10px] text-smoke">
                    Cosine similarity on CPU in &lt;2ms (No Vector DB)
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-void-black v3-key-quiet">
                  <div className="font-mono font-medium text-coral-pulse flex items-center gap-1 mb-0.5 text-[11px]">
                    <span>4. Confidence Gate</span>
                  </div>
                  <p className="text-[10px] text-smoke">
                    Threshold &ge; 0.68. Unknowns escalate to Book Chat
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-void-black v3-key-quiet">
                  <div className="font-mono font-medium text-coral-pulse flex items-center gap-1 mb-0.5 text-[11px]">
                    <span>5. Strict Grounding</span>
                  </div>
                  <p className="text-[10px] text-smoke">
                    Top 3-4 chunks passed to gemini-3.1-flash-lite
                  </p>
                </div>

                <div className="p-2 rounded-lg bg-void-black v3-key-quiet">
                  <div className="font-mono font-medium text-coral-pulse flex items-center gap-1 mb-0.5 text-[11px]">
                    <span>6. Source Provenance</span>
                  </div>
                  <p className="text-[10px] text-smoke">
                    Citations tagged with exact similarity percentages
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Selected Chunk Modal / Drawer Overlay */}
          {selectedChunk && (
            <div className="absolute inset-0 bg-void-black/80 z-30 flex flex-col justify-end p-3 animate-fade-in">
              <div className="bg-void-black rounded-2xl p-4 shadow-2xl max-h-[80%] overflow-y-auto flex flex-col v3-key-quiet text-pure-white">
                <div className="flex items-center justify-between pb-2 border-b border-hairline">
                  <div>
                    <span className="text-[10px] font-mono font-medium text-coral-pulse uppercase tracking-[0.16em]">
                      Ground Truth Source Chunk
                    </span>
                    <h4
                      className="text-sm font-medium text-pure-white"
                        >
                      {selectedChunk.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => setSelectedChunk(null)}
                    className="p-1 rounded hover:bg-obsidian text-smoke hover:text-pure-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-pulse"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="my-2.5 flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-obsidian v3-key-quiet text-[11px] font-mono text-smoke">
                    {selectedChunk.source}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-obsidian v3-key-quiet text-[11px] font-mono font-medium text-coral-pulse">
                    Match: {(selectedChunk.similarity * 100).toFixed(1)}%
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-obsidian v3-key-quiet text-xs text-mist leading-relaxed font-mono">
                  {selectedChunk.chunk}
                </div>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-hairline">
                  <span className="text-[11px] font-mono text-smoke">
                    Chunk ID: <code className="text-pure-white">{selectedChunk.id}</code>
                  </span>
                  <button
                    onClick={() => setSelectedChunk(null)}
                    className="px-3 py-1 text-xs font-mono uppercase tracking-[0.12em] font-semibold rounded-lg bg-coral-pulse text-void hover:opacity-90 transition-colors cursor-pointer active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-pulse"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-void-black">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Chat Bubble */}
                <div
                  className={`max-w-[88%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-obsidian v3-key-quiet text-pure-white rounded-br-xs shadow-xs"
                      : "bg-obsidian/70 text-pure-white v3-key-quiet rounded-bl-xs shadow-2xs"
                  }`}
                >
                  {formatText(msg.text, msg.sender === "user")}

                  {/* Fallback CTA Button if query went out of bounds */}
                  {msg.fallback && (
                    <div className="mt-3 pt-3 border-t border-hairline flex flex-col gap-2">
                      <div className="text-[11px] font-mono text-coral-pulse flex items-center gap-1.5">
                        <AlertTriangle size={13} className="text-coral-pulse shrink-0" />
                        <span>Question is outside verified portfolio facts.</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={CALENDLY_URL}
                          target="_blank"
                          rel="noopener"
                          onClick={() => {
                            setIsOpen(false);
                            onOpenBookChat?.();
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-coral-pulse hover:opacity-90 text-void font-mono uppercase tracking-[0.12em] font-semibold text-xs transition-colors shadow-xs active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-pulse"
                        >
                          <Calendar size={13} />
                          <span>Book Chat with Deepak</span>
                        </a>
                        <button
                          onClick={() => {
                            onNavigate("/work/behind-ai-copilot");
                            setIsOpen(false);
                          }}
                          className="text-xs font-mono text-coral-pulse hover:opacity-90 font-medium flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-pulse rounded-xs"
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
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-medium text-smoke uppercase tracking-[0.14em] mb-1">
                        <CheckCircle2 size={11} className="text-coral-pulse" />
                        <span>Grounded in {msg.retrievedChunks.length} sources:</span>
                        {msg.retrievalTimeMs && (
                          <span className="text-[9px] text-smoke font-mono">
                            ({msg.retrievalTimeMs}ms retrieval)
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.retrievedChunks.map((chunk, cIdx) => (
                          <button
                            key={cIdx}
                            onClick={() => setSelectedChunk(chunk)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.08em] bg-obsidian hover:bg-white/[.06] v3-key-quiet text-smoke hover:text-pure-white transition-colors shadow-2xs group cursor-pointer active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-pulse"
                            title="Click to view exact ground chunk"
                          >
                            <BookOpen size={10} className="text-coral-pulse" />
                            <span className="truncate max-w-[140px]">{chunk.source}</span>
                            <span className="font-mono text-[9px] text-coral-pulse font-medium">
                              {(chunk.similarity * 100).toFixed(0)}%
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                <span className="text-[10px] font-mono text-smoke mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="p-3.5 rounded-2xl bg-obsidian v3-key-quiet shadow-2xs rounded-bl-xs flex items-center gap-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-coral-pulse rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-2 h-2 bg-coral-pulse rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-2 h-2 bg-coral-pulse rounded-full animate-bounce" />
                  </div>
                  <span className="text-xs text-smoke font-mono">
                    Searching in-memory embeddings...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips */}
          {messages.length <= 2 && !isLoading && (
            <div className="p-3 bg-[#121216]/95 border-t border-[#222227]">
              <div className="text-[10px] font-mono font-medium text-coral-pulse uppercase tracking-[0.16em] mb-2">
                Suggested Questions
              </div>
              <div className="flex flex-wrap gap-1.5">
                {STARTER_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="text-left text-[11px] px-2.5 py-1.5 rounded-full bg-[#18181D] hover:bg-white/[.08] border border-[#26262C] hover:border-coral-pulse/40 text-[#F5F5F0] transition-colors cursor-pointer active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-pulse"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Bar */}
          <div className="p-3 bg-[#121216]/95 border-t border-[#222227] flex items-center gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Deepak's metrics, case studies, RAG..."
              disabled={isLoading}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#09090B] border border-[#24242A] focus:outline-none focus:border-coral-pulse text-xs sm:text-sm text-[#F5F5F0] placeholder:text-[#6E6E73] focus-visible:ring-2 focus-visible:ring-coral-pulse"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl bg-coral-pulse hover:opacity-90 disabled:bg-[#1A1A1F] text-void disabled:text-[#55555B] transition-colors shrink-0 shadow-xs cursor-pointer disabled:cursor-not-allowed active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-pulse"
              aria-label="Send query"
            >
              <Send size={16} />
            </button>
          </div>
        </div>

      {/* Global Plasma Assistant Trigger */}
      <div
        id="dipa-plasma-launcher"
        className={`fixed z-[70] right-5 bottom-5 w-[56px] h-[56px] min-w-[56px] min-h-[56px] sm:right-6 sm:bottom-6 sm:w-[64px] sm:h-[64px] sm:min-w-[64px] sm:min-h-[64px] overflow-visible transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          launcherVisible
            ? "opacity-100 scale-100 pointer-events-auto visible block"
            : "opacity-0 scale-75 pointer-events-none invisible"
        }`}
        style={{
          position: "fixed",
          zIndex: 70,
          overflow: "visible",
          display: "block",
          visibility: launcherVisible ? "visible" : "hidden",
          opacity: launcherVisible ? 1 : 0,
          pointerEvents: launcherVisible ? "auto" : "none",
        }}
      >
        <button
          ref={launcherRef}
          id="dipa-plasma-trigger"
          type="button"
          onClick={() => {
            if (isDraggingRef.current) return;
            setIsOpen((prev) => !prev);
            requestAnimationFrame(() => inputRef.current?.focus());
          }}
          onPointerDown={(e) => {
            dragStartPosRef.current = { x: e.clientX, y: e.clientY };
            isDraggingRef.current = false;
          }}
          onPointerMove={(e) => {
            if (
              Math.hypot(
                e.clientX - dragStartPosRef.current.x,
                e.clientY - dragStartPosRef.current.y
              ) > 5
            ) {
              isDraggingRef.current = true;
            }
          }}
          aria-label="Open Dipa assistant"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          title="Open Dipa assistant"
          className="group relative flex items-center justify-center w-full h-full min-w-full min-h-full p-0 m-0 bg-transparent border-0 outline-none shadow-none cursor-grab active:cursor-grabbing hover:scale-[1.03] transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0977A]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B] focus-visible:rounded-full pointer-events-auto select-none overflow-visible"
        >
          {/* Authentic PlasmaRing living plasma sphere — no artificial ring, border, outline, or glow flash */}
          <div className="relative w-full h-full min-w-0 min-h-0 overflow-visible bg-transparent pointer-events-auto">
            <PlasmaRing
              colors={["#FFAA88", "#F0977A", "#D96B3D", "#A94F35"]}
              density={120}
              speed={100}
              waveHeight={20}
              centerOpacity={35}
              scale={55}
              dragSensitivity={100}
              shouldReduceMotion={shouldReduceMotion}
              className="w-full h-full"
            />
          </div>
        </button>
      </div>
    </>
  );
}
