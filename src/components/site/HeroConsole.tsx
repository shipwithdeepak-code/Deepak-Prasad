import React, { useEffect, useRef, useState } from "react";
import { CornerDownLeft, Download, Search } from "lucide-react";
import HeroShader from "../visuals/HeroShader";

interface HeroConsoleProps {
  onNavigate: (path: string) => void;
  onOpenResumeModal?: () => void;
  /** Hands the question to Dipa. */
  onAsk: (question?: string) => void;
}

const SUGGESTED_PROMPTS = [
  "Explore my marketplace work",
  "See my hardware experience",
  "Ask about my AI builds",
];

const PROOF_ITEMS = [
  "MARKETPLACES",
  "CONNECTED HARDWARE",
  "APPLIED AI",
  "0→1 BUILDS",
];

/**
 * Editorial Hero Console
 *
 * Implements the approved Hero specification:
 * - Near-black obsidian background: #0A0A0B
 * - Full-Screen Shader: Swirl -> ChromaFlow -> FlutedGlass -> FilmGrain (declarative pointer momentum)
 * - Oversized DEEPAK masthead in low-contrast warm ivory/graphite
 * - Real portrait asset (/deepak-hero-sharp.jpg) with multi-point seamless feathering
 *   (28% visual width at 1024px; progressive atmospheric opacity on mobile: 428px -> 0.45, 375px -> 0.28, 320px -> 0.15)
 * - Availability signal: "AVAILABLE FOR SENIOR & LEAD ROLES" (compact "OPEN TO SENIOR ROLES" below 360px)
 * - Exact headline with "intelligent systems." highlighted in warm coral #F0977A
 * - Raycast-inspired CTAs (warm coral "View Work →", neutral outlined "Download CV")
 * - Dipa long search bar with suggestions and responsive placeholder
 * - Proof strip with edge-to-edge background shader
 */
export default function HeroConsole({
  onNavigate,
  onOpenResumeModal,
  onAsk,
}: HeroConsoleProps) {
  const [query, setQuery] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isNarrowMobile, setIsNarrowMobile] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const img = new Image();
    img.src = "/deepak-hero-transparent.png";
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    if (img.complete) {
      setImageLoaded(true);
    }

    const checkWidth = () => {
      setIsNarrowMobile(window.innerWidth < 400);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

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
    <header id="hero" className="relative isolate overflow-hidden bg-[#0A0A0B] w-full min-h-[100svh] flex flex-col justify-between">
      {/* 
        LAYER 1: Full-Screen Edge-to-Edge Shader Background
        Exact order: Swirl -> ChromaFlow -> FlutedGlass -> FilmGrain
        Declarative cursor reactivity via ChromaFlow (no manual mouse listeners).
        Obsidian base (#0A0A0B), warm charcoal, restrained coral (#F0977A).
      */}
      <HeroShader className="z-0 opacity-80" />

      {/* Atmospheric depth & text legibility vignettes */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-[#0A0A0B] via-transparent to-[#0A0A0B]/40 opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] bg-radial-[circle_at_25%_65%] from-transparent via-[#0A0A0B]/25 to-[#0A0A0B]/75"
      />

      {/* 
        LAYER 2: Oversized DEEPAK PRASAD Masthead
        Spans high across the viewport on ONE SINGLE LINE in low-contrast warm ivory/graphite.
        Connected naturally with the content grid: left edge sits ~90–105px to the
        right of the headline's left edge on desktop, extending horizontally across
        and partially behind the portrait on the right without splitting.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-3 sm:top-5 md:top-6 lg:top-8 inset-x-0 mx-auto w-full max-w-[1360px] px-4 sm:px-8 lg:px-14 z-10 overflow-hidden select-none"
      >
        <div className="pl-0 sm:pl-6 md:pl-12 lg:pl-[92px] xl:pl-[102px]">
          <span className="hero-wordmark inline-block text-[clamp(2.35rem,7.8vw,7.6rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.035em] text-[#F5F5F0]/[0.07] whitespace-nowrap">
            DEEPAK PRASAD
          </span>
        </div>
      </div>

      {/* 
        LAYER 3: Real Transparent Portrait Integration (/deepak-hero-transparent.png)
        - Scaled up 10–15% for prominent, natural framing in the right third
        - Positioned slightly further toward the right edge with a small safe margin
        - Soft multi-directional CSS mask on <img> softly dissolves top hair, outer sides, and bottom hoodie
        - True alpha transparency over obsidian shader background; zero rectangular container or dark box
      */}
      <img
        src="/deepak-hero-transparent.png"
        alt="Deepak Prasad"
        aria-hidden="true"
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        className={`pointer-events-none absolute right-0 sm:right-[0.5%] md:right-[0.5%] lg:right-[0.8%] xl:right-[1%] 2xl:right-[1.2%] top-[100px] sm:top-[90px] md:top-[82px] lg:top-[74px] xl:top-[68px] z-20 w-[70vw] sm:w-[54vw] md:w-[400px] md:max-w-[425px] lg:w-[490px] lg:max-w-[520px] xl:w-[clamp(480px,44vw,635px)] xl:max-w-[635px] h-auto object-contain object-bottom filter grayscale contrast-[1.08] brightness-[1.18] transition-opacity duration-700 bg-transparent select-none ${
          imageLoaded && !imageError
            ? "opacity-25 sm:opacity-35 md:opacity-100"
            : "opacity-0"
        }`}
        style={{
          maskImage:
            "radial-gradient(ellipse 68% 72% at 52% 44%, black 50%, rgba(0, 0, 0, 0.9) 66%, rgba(0, 0, 0, 0.45) 82%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 66%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 68% 72% at 52% 44%, black 50%, rgba(0, 0, 0, 0.9) 66%, rgba(0, 0, 0, 0.45) 82%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 12%, black 66%, transparent 95%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "destination-in",
        }}
        draggable={false}
      />

      {/* Main Foreground Container: Layers 5, 6 */}
      <div className="relative z-30 mx-auto w-full max-w-[1360px] flex-1 flex flex-col justify-end px-4 sm:px-8 lg:px-14 pt-20 sm:pt-24 lg:pt-28 pb-6 sm:pb-8 md:pb-10">
        <div className="flex flex-col gap-6 sm:gap-8 md:gap-9">
          {/* Headline, Role & Action CTAs */}
          <div className="flex flex-col items-start max-w-[720px] lg:max-w-[780px] xl:max-w-[840px]">
            {/* Main Headline: Exactly two lines on desktop, keeping "intelligent systems." intact */}
            <h1 className="text-[clamp(1.85rem,3.8vw,3.35rem)] font-medium leading-[1.14] tracking-[-0.025em] text-[#F5F5F0]">
              I build products where complex workflows{" "}
              <span className="block sm:inline">
                meet <span className="text-[#F0977A] whitespace-nowrap">intelligent systems.</span>
              </span>
            </h1>

            {/* Supporting Role Line */}
            <p className="mt-3.5 sm:mt-4 max-w-[48ch] text-[15px] sm:text-[16.5px] leading-relaxed text-[#9E9E98]">
              Senior Product Manager building marketplaces,{" "}
              <span className="hidden sm:inline">connected </span>hardware, and{" "}
              <span className="hidden sm:inline">applied </span>AI.
            </p>

            {/* Action CTAs (Raycast-inspired polish) */}
            <div className="mt-6 sm:mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onNavigate("/work")}
                className="group inline-flex min-h-[48px] sm:min-h-[46px] items-center justify-center gap-2 rounded-lg bg-[#F0977A] px-6 py-3 text-sm font-semibold text-[#0A0A0B] transition-all duration-200 hover:-translate-y-px hover:bg-[#E28468] hover:shadow-[0_0_20px_rgba(240,151,122,0.22)] cursor-pointer"
              >
                <span>View Work</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </button>
              <a
                href="/Deepak_Prasad_Senior_Product_Manager_Resume.pdf"
                download="Deepak_Prasad_Senior_Product_Manager_Resume.pdf"
                onClick={(e) => {
                  if (onOpenResumeModal) {
                    e.preventDefault();
                    onOpenResumeModal();
                  }
                }}
                className="group inline-flex min-h-[48px] sm:min-h-[46px] items-center justify-center gap-2 rounded-lg border border-white/[0.14] bg-white/[0.02] px-6 py-3 text-sm font-medium text-[#F5F5F0] transition-all duration-200 hover:-translate-y-px hover:border-[#F0977A]/50 hover:text-white cursor-pointer"
              >
                <span>Download CV</span>
                <Download className="size-3.5 text-[#9E9E98] group-hover:text-[#F0977A] transition-colors" strokeWidth={1.8} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* 
            LAYER 6: Interactive Dipa Horizontal Search Bar
            Desktop: Long horizontal bar positioned comfortably in lower section.
            Structure: ● ASK DIPA  |  search icon  Ask Dipa about my products, decisions, and systems...  Enter ↵
            Mobile: Full-width bar, enter indicator hidden on narrow screens to keep input readable.
          */}
          <div className="w-full max-w-[700px] xl:max-w-[740px]">
            <div
              role="search"
              onClick={() => inputRef.current?.focus()}
              className="dipa-container group relative flex items-center gap-2.5 sm:gap-3 rounded-full border border-white/[0.14] bg-[#121316] hover:bg-[#15161A] hover:border-white/[0.28] px-3.5 sm:px-4 py-2.5 sm:py-3 transition-all duration-200 focus-within:border-[#F0977A]/70 focus-within:bg-[#16171B] focus-within:ring-1 focus-within:ring-[#F0977A]/35 cursor-text"
            >
              {/* Dipa label badge: ASK DIPA with coral status dot */}
              <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.10] bg-white/[0.05] px-2.5 py-1 text-[10.5px] sm:text-[11px] font-mono font-semibold tracking-wider text-[#E5E5DF] uppercase select-none transition-colors group-hover:border-white/[0.16] group-focus-within:border-[#F0977A]/40">
                <span className="size-2 rounded-full bg-[#F0977A]" aria-hidden="true" />
                <span className="hidden min-[380px]:inline">ASK DIPA</span>
                <span className="min-[380px]:hidden">DIPA</span>
              </div>

              {/* Subtle divider on larger screens */}
              <span className="hidden min-[480px]:block h-4 w-px bg-white/[0.12]" aria-hidden="true" />

              {/* Search icon */}
              <Search
                className="size-4 shrink-0 text-[#E5E5DF]/75 group-hover:text-[#F0977A] group-focus-within:text-[#F0977A] transition-colors"
                strokeWidth={2}
                aria-hidden="true"
              />

              {/* Form & Input field with prominent invitation */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  ask(query);
                }}
                className="flex flex-1 items-center gap-2 min-w-0"
                style={{ outline: "none", boxShadow: "none", border: "none" }}
              >
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  autoComplete="off"
                  placeholder={
                    isNarrowMobile
                      ? "Ask Dipa about my products..."
                      : "Ask Dipa about my products, decisions, and systems..."
                  }
                  aria-label="Ask Dipa about my products, decisions, and systems"
                  className="dipa-input min-w-0 flex-1 bg-transparent text-[13.5px] sm:text-[14px] text-[#F5F5F0] placeholder:text-[#B8B8B2] border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 caret-[#F0977A] font-normal selection:bg-[#F0977A]/30"
                  style={{ outline: "none", boxShadow: "none", border: "none" }}
                />

                {/* Enter indicator & compact submit button: hidden below 400px to keep field spacious */}
                <button
                  type="submit"
                  aria-label="Ask Dipa (Press Enter)"
                  className="hidden min-[400px]:inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.14] bg-white/[0.05] px-2.5 py-1 text-[11px] font-mono text-[#E5E5DF] transition-all duration-150 group-hover:border-white/30 group-focus-within:border-[#F0977A]/50 group-focus-within:text-[#F0977A] hover:bg-white/[0.09] hover:text-[#F5F5F0] cursor-pointer"
                >
                  <span className="hidden sm:inline font-medium">Enter</span>
                  <CornerDownLeft className="size-3" strokeWidth={2} aria-hidden="true" />
                </button>
              </form>
            </div>

            {/* Actionable prompt text links below the bar */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 px-2 text-[12px] sm:text-[12.5px] text-[#9E9E98]">
              <span className="text-[11px] font-mono text-[#9E9E98]/65 uppercase tracking-wider select-none">
                Try:
              </span>
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => ask(prompt)}
                  className="group/btn inline-flex items-center gap-1 text-[#E5E5DF]/85 hover:text-[#F0977A] focus-visible:text-[#F0977A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F0977A] rounded px-1 py-0.5 transition-colors cursor-pointer text-left underline-offset-4 hover:underline"
                >
                  <span>{prompt}</span>
                  <span className="text-[10px] opacity-0 group-hover/btn:opacity-100 transition-opacity text-[#F0977A]" aria-hidden="true">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 
        LAYER 7: Proof Strip
        Anchored at the base of the Hero with edge-to-edge shader running behind it.
        Desktop: Single horizontal strip.
        Mobile: Clean 2-line wrap with comfortable readable font size (never shrunk to micro-text).
      */}
      <div className="relative z-30 w-full border-t border-white/[0.06] bg-[#07080a]/50 py-3 sm:py-3.5 px-4 sm:px-6 backdrop-blur-xs">
        {/* Desktop / Tablet single row */}
        <div className="hidden sm:flex mx-auto max-w-[1200px] flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[11px] font-mono tracking-widest text-[#9E9E98] uppercase">
          {PROOF_ITEMS.map((item, index) => (
            <React.Fragment key={item}>
              {index > 0 && (
                <span aria-hidden="true" className="text-white/20 select-none">
                  ·
                </span>
              )}
              <span className="text-[#E5E5DF]/75 hover:text-[#F5F5F0] transition-colors">
                {item}
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Mobile clean 2-line wrap with comfortable readable size */}
        <div className="sm:hidden flex flex-col items-center gap-1 text-[10.5px] font-mono tracking-wider text-[#9E9E98] uppercase text-center">
          <div className="flex items-center gap-2">
            <span className="text-[#E5E5DF]/80">MARKETPLACES</span>
            <span aria-hidden="true" className="text-white/20 select-none">·</span>
            <span className="text-[#E5E5DF]/80">CONNECTED HARDWARE</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#E5E5DF]/80">APPLIED AI</span>
            <span aria-hidden="true" className="text-white/20 select-none">·</span>
            <span className="text-[#E5E5DF]/80">0→1 BUILDS</span>
          </div>
        </div>
      </div>
    </header>
  );
}
