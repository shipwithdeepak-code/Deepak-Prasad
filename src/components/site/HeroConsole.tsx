import React, { useRef, useState } from "react";
import { ArrowRight, CornerDownLeft, Download, Search } from "lucide-react";
import ShaderBackground from "../visuals/ShaderBackground";
import { PROOF_METRICS } from "../../data/homeV3";

interface HeroConsoleProps {
  onNavigate: (path: string) => void;
  onOpenResumeModal?: () => void;
  /** Hands the question to Dipa. The hero does not answer anything itself:
   *  it is the entry point to the retrieval, not a copy of it. */
  onAsk: (question?: string) => void;
}

/** Three routes in, phrased as things a visitor would actually want. Each one
 *  is answerable from the knowledge base behind Dipa. */
const TRY_PROMPTS = [
  "Explore my marketplace work",
  "See my hardware experience",
  "Ask about my AI builds",
];

/** The strip under the fold used to carry four category words. Four words are
 *  not proof. These are the four largest real numbers in the record, and every
 *  one of them is argued for in the case study it came from. */
const HERO_PROOF = PROOF_METRICS.slice(0, 4);

/**
 * The hero.
 *
 * Full-height, portrait right, one ask bar. Composition is unchanged from the
 * deployed version; what changed is everything that was broken in it:
 *
 *  - the wordmark's caps were clipped by the hero's overflow, and it was read
 *    aloud to screen readers while being invisible at 1.14:1 to everyone else
 *  - the portrait was a 295KB PNG with no fetchpriority on the page's LCP
 *    element, which is why this route's LCP was 1,308ms against 432-600ms
 *    everywhere else
 *  - the ask input and its Enter key had no focus indicator at all
 *  - the try-prompts and the Enter key were under the 24px minimum
 */
export default function HeroConsole({
  onNavigate,
  onOpenResumeModal,
  onAsk,
}: HeroConsoleProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const ask = (question: string) => {
    const text = question.trim();
    if (!text) {
      inputRef.current?.focus();
      return;
    }
    onAsk(text);
    setQuery("");
  };

  /* The hero is one screen MINUS the sticky nav above it. At a flat 100svh the
     proof rail, which is the last row inside the hero, landed 65px below the
     fold on every viewport: the one strip carrying real numbers was the one
     thing you had to scroll to find. */
  return (
    <header className="relative isolate flex min-h-[calc(100svh-65px)] w-full flex-col overflow-hidden bg-[var(--hero-canvas)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-[.22]"
      >
        <ShaderBackground className="block size-full" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, var(--hero-canvas) 4%, rgba(10,10,11,.55) 34%, transparent 72%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(circle at 26% 62%, rgba(10,10,11,.25), rgba(10,10,11,.88) 72%)",
        }}
      />

      {/* The portrait. Served as WebP at a tenth of the PNG's weight, with the
          dimensions declared so it can never shift the layout, and marked as
          the priority fetch because it is this page's LCP element.
          It is still a 500px source: it will only be sharp on a high-density
          display once a larger export exists, and the srcset below is where
          that file goes. */}
      <picture>
        <source srcSet="/deepak-hero-portrait.webp" type="image/webp" />
        <img
          src="/deepak-hero-transparent.png"
          alt="Deepak Prasad"
          width={500}
          height={500}
          fetchPriority="high"
          decoding="async"
          className="pointer-events-none absolute right-0 top-[76px] z-[2] sm:top-[68px] h-auto w-[min(634px,62vw)] select-none sm:w-[min(634px,44vw)] lg:right-[0.5%]"
          style={{
            /* The cut-out is a rectangle. Against a lit background its lower
               edge reads as a crop line, so it is faded rather than ended. */
            maskImage:
              "linear-gradient(to bottom, #000 62%, rgba(0,0,0,.45) 84%, transparent 97%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 62%, rgba(0,0,0,.45) 84%, transparent 97%)",
          }}
        />
      </picture>

      <div className="relative z-10 mx-auto flex w-full max-w-[1248px] flex-1 flex-col justify-end px-6">
        {/* Decoration, not content: it repeats the name in the tab title, the
            logo and the footer, and at 1.14:1 nobody reads it. */}
        <span
          aria-hidden="true"
          className="hero-wordmark pointer-events-none absolute left-6 top-8 select-none text-[clamp(2.35rem,7.8vw,7.6rem)] font-extrabold uppercase leading-[.85] tracking-[-.035em] text-[rgba(245,245,240,.07)]"
        >
          Deepak Prasad
        </span>

        <div className="max-w-[860px] pb-9 pt-24">
          <h1 className="text-[clamp(1.85rem,3.8vw,3.35rem)] font-medium leading-[1.14] tracking-[-.025em] text-[var(--hero-ink)]">
            I build products where complex workflows meet{" "}
            <span className="whitespace-nowrap text-[var(--hero-accent)]">
              intelligent systems.
            </span>
          </h1>

          <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-[var(--hero-muted)] sm:text-[16.5px]">
            Senior Product Manager building marketplaces, connected hardware,
            and applied AI.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate("/work")}
              className="group inline-flex min-h-11 items-center gap-2 rounded-lg bg-[var(--hero-accent)] px-[18px] py-3 text-sm font-semibold text-[var(--hero-canvas)] transition-transform duration-200 hover:-translate-y-px"
            >
              View Work
              <ArrowRight
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={2.2}
                aria-hidden="true"
              />
            </button>
            <button
              type="button"
              onClick={onOpenResumeModal}
              className="v3-key-quiet inline-flex min-h-11 items-center gap-2 rounded-lg px-[18px] py-3 text-sm font-medium text-[var(--hero-ink)] transition-colors duration-200 hover:bg-white/5"
            >
              Download CV
              <Download className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>

          <form
            className="hero-ask v3-key-quiet mt-8 flex max-w-[740px] items-center gap-3 rounded-xl bg-black/30 px-3 py-2.5 backdrop-blur-xl transition-shadow duration-300"
            onSubmit={(e) => {
              e.preventDefault();
              ask(query);
            }}
          >
            <span className="inline-flex shrink-0 items-center gap-2 rounded-md bg-white/[.06] px-2 py-1 font-mono text-[11px] font-semibold tracking-[.05em] text-[var(--hero-soft)]">
              <span
                aria-hidden="true"
                className="block size-1.5 rounded-full bg-[var(--hero-accent)]"
              />
              ASK DIPA
            </span>
            <Search
              className="size-4 shrink-0 text-[var(--hero-muted)]"
              strokeWidth={1.7}
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              autoComplete="off"
              id="hero-ask-dipa"
              aria-label="Ask Dipa about my products, decisions and systems"
              placeholder="Ask Dipa about my products, decisions, and systems..."
              className="min-w-0 flex-1 bg-transparent py-1.5 text-[14px] text-[var(--hero-ink)] caret-[var(--hero-accent)] outline-none placeholder:text-[var(--hero-muted)]"
            />
            <button
              type="submit"
              aria-label="Ask Dipa"
              className="inline-flex min-h-8 shrink-0 items-center gap-1.5 rounded-md bg-white/[.06] px-2.5 py-1.5 font-mono text-[11px] font-medium text-[var(--hero-soft)] transition-colors duration-200 hover:bg-white/[.12]"
            >
              <span className="hidden sm:inline">Enter</span>
              <CornerDownLeft className="size-3" strokeWidth={2} aria-hidden="true" />
            </button>
          </form>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
            <span className="select-none font-mono text-[11px] uppercase tracking-[.05em] text-[var(--hero-muted)]">
              Try:
            </span>
            {TRY_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => ask(prompt)}
                className="group/btn inline-flex min-h-6 items-center gap-1.5 rounded py-1 text-[12.5px] text-[var(--hero-soft)] transition-colors duration-200 hover:text-[var(--hero-ink)]"
              >
                {prompt}
                <span
                  aria-hidden="true"
                  className="text-[10px] text-[var(--hero-accent)] opacity-0 transition-opacity duration-200 group-hover/btn:opacity-100"
                >
                  →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* The bottom rail. Four category words used to sit here, in the highest
          value strip on the page, carrying no number at all. */}
      <div className="relative z-10 border-t border-white/[.07] bg-black/20 py-3.5 backdrop-blur-xl">
        {/* The assistant launcher is fixed to the bottom right; without this the
              last metric runs underneath it on a phone. */}
          <div className="mx-auto flex max-w-[1248px] flex-wrap items-baseline justify-center gap-x-7 gap-y-1.5 pl-6 pr-[76px] sm:pr-6">
          {HERO_PROOF.map((metric) => (
            <span key={metric.value} className="flex items-baseline gap-2">
              <b className="text-[15px] font-medium tabular-nums text-[var(--hero-ink)]">
                {metric.value}
              </b>
              <span className="font-mono text-[10.5px] uppercase tracking-[.05em] text-[var(--hero-muted)]">
                {metric.label}
              </span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
