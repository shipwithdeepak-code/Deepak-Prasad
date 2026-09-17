import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, CornerDownLeft, Download, Search } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import ShaderBackground from "../visuals/ShaderBackground";

interface HeroConsoleProps {
  onNavigate: (path: string) => void;
  onOpenResumeModal?: () => void;
  /** Hands the question to the real copilot. The hero does not answer
   *  anything itself: it is the entry point to the RAG, not a copy of it. */
  onAsk: (question?: string) => void;
}

/** Real questions, rotated through the bar so it reads as something you type
 *  into. Each one is answerable from the knowledge base behind the copilot. */
const QUESTIONS = [
  "What did you decide at ReshaMandi?",
  "Have you managed people?",
  "Show me a decision you got wrong",
  "What have you built yourself?",
  "Which of these moved a real number?",
];

/** The chips ask what the rotating bar does not, so the two sets never show
 *  the same string twice within one screen. */
const CHIPS = [
  "How does this copilot work?",
  "What are you looking for next?",
  "Where have you led a team?",
];

/** Capability facts, not per-query claims. 45 is the real chunk count in
 *  ragKnowledgeBase.json, and the copilot really does cite the chunks it
 *  used. Nothing here asserts a latency the hero never measured. */
const COPILOT_FACTS = ["45 sources", "Cites every answer", "Built by me"];

/**
 * v3 hero.
 *
 * Two columns rather than one centred stack: the headline holds the left over
 * the sharp sliver of the portrait, the console holds the right. The hero is
 * sized to its content instead of the viewport so the proof strip below it is
 * always reachable without scrolling.
 *
 * The input and the answer share one surface on purpose. Floating them apart
 * reads as a search box with some text under it; joined, it reads as one
 * instrument.
 */
export default function HeroConsole({
  onNavigate,
  onOpenResumeModal,
  onAsk,
}: HeroConsoleProps) {
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [hint, setHint] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(
      () => setHint((i) => (i + 1) % QUESTIONS.length),
      3800,
    );
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  const ask = (question: string) => {
    const text = question.trim();
    if (!text) {
      inputRef.current?.focus();
      return;
    }
    onAsk(text);
    setQuery("");
  };

  return (
    <header className="relative isolate overflow-hidden bg-void-black">
      {/* Fluted glass, greyscale, moving slowly enough to be noticed rather
          than watched. It sits under the portrait so the face stays the
          subject and the glass stays the surface. */}
      <ShaderBackground className="pointer-events-none absolute inset-0 z-0 block size-full opacity-[.32]" />

      {/* Portrait as atmosphere. Greyscale and blurred in the asset itself,
          not at runtime: a large CSS blur repaints on every frame the hero
          animates, and this one never changes. */}
      <div
        aria-hidden="true"
        className="v3-hero-photo pointer-events-none absolute inset-0 z-[1] bg-cover mix-blend-screen"
      />
      {/* One sharp band of the real photograph. A blurred portrait on its own
          reads as a stock background; a single crisp edge says it is a person. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[34%] bg-cover opacity-55 md:block"
        style={{
          backgroundImage: "url('/deepak-hero-sharp.jpg')",
          backgroundPosition: "60% 16%",
          maskImage:
            "linear-gradient(90deg, #000 0%, #000 34%, transparent 98%)",
          WebkitMaskImage:
            "linear-gradient(90deg, #000 0%, #000 34%, transparent 98%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(132% 98% at 44% 32%, transparent 26%, rgba(4,5,6,.78) 74%, #040506 100%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-14 px-6 pb-18 pt-20 md:grid-cols-2 md:pb-20 md:pt-24">
        <div className="grid gap-6">
          <h1 className="max-w-[24ch] text-[clamp(1.75rem,3.4vw,2.625rem)] font-normal leading-[1.17] tracking-[.22px] text-pure-white">
            Eleven products shipped. Ask{" "}
            <span className="text-coral-pulse">the archive</span> anything.
          </h1>
          <p className="max-w-[38ch] text-base leading-relaxed text-ash">
            Marketplaces, subscription, connected hardware and applied AI. Two
            of them I designed and wrote myself.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigate("/work")}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-mist px-[18px] py-3 text-sm font-medium text-iron transition-all duration-200 hover:-translate-y-px hover:bg-white"
            >
              See the work
              <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onOpenResumeModal}
              className="v3-key-quiet inline-flex min-h-11 items-center gap-2 rounded-lg px-[18px] py-3 text-sm font-medium text-ash transition-colors duration-200 hover:text-pure-white"
            >
              Download CV
              <Download className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="grid gap-3">
          <div className="v3-key overflow-hidden rounded-2xl bg-ink/[.62] backdrop-blur-2xl">
            <form
              className="v3-ask relative flex items-center gap-3 border-b border-white/[.08] px-4 py-[15px]"
              onSubmit={(e) => {
                e.preventDefault();
                ask(query);
              }}
            >
              <Search
                className="size-[17px] shrink-0 text-coral-pulse"
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <div className="relative min-w-0 flex-1">
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  autoComplete="off"
                  aria-label="Ask the copilot about my work"
                  className="w-full bg-transparent text-[15.5px] text-pure-white caret-coral-pulse outline-none"
                />
                {/* The rotating question sits behind a real input rather than
                    in its placeholder, because a placeholder cannot crossfade. */}
                {query === "" && (
                  <span
                    key={hint}
                    aria-hidden="true"
                    className="v3-hint pointer-events-none absolute inset-y-0 left-0 flex items-center truncate text-[15.5px] text-ash"
                  >
                    {QUESTIONS[hint]}
                  </span>
                )}
              </div>
              <button
                type="submit"
                aria-label="Ask the copilot"
                className="rounded-md bg-coral-pulse px-2 py-1.5 text-void-black transition-opacity duration-200 hover:opacity-90"
              >
                <CornerDownLeft className="size-3" strokeWidth={1.7} aria-hidden="true" />
              </button>
            </form>

            <div className="grid gap-3 px-[18px] pb-4 pt-5">
              <p className="text-[19px] leading-[1.32] tracking-[.2px] text-pure-white">
                A retrieval copilot over everything I have shipped.
              </p>
              <p className="text-[14.5px] leading-relaxed text-ash">
                Ask it about a decision, a number, or something I got wrong. It
                answers from my own case studies and shows you the sources it
                used. I built it.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-white/[.07] bg-white/[.015] px-[18px] py-3">
              {COPILOT_FACTS.map((fact) => (
                <span
                  key={fact}
                  className="rounded-md bg-graphite px-1.5 py-1 font-mono text-[10.5px] tracking-[.05em] text-mist"
                >
                  {fact}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {CHIPS.map((question) => (
              <button
                key={question}
                type="button"
                onClick={() => ask(question)}
                className="v3-key-quiet min-h-9 rounded-full px-3.5 py-2 text-[12.5px] font-medium text-ash transition-all duration-200 hover:-translate-y-px hover:text-pure-white"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
