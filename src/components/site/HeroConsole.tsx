import React from "react";
import { ArrowUpRight, CornerDownLeft, Download, Search } from "lucide-react";
import { NAV_LINKS } from "../../data/nav";

interface HeroConsoleProps {
  onNavigate: (path: string) => void;
  onOpenResumeModal?: () => void;
  onOpenContact?: () => void;
}

/** The one answer the console shows before anyone types. A visitor who never
 *  touches the input still gets the strongest thing the archive can say.
 *  The rest of the set, and the typing that reaches it, lands with the
 *  interaction step. */
const DEFAULT_ANSWER = {
  question: "What have you shipped?",
  claim: "Eleven products across marketplaces, subscription, hardware and applied AI.",
  context:
    "A B2B trading marketplace moving ₹20-25 Cr a month, a subscription business at €659K FY2025, an AI coach, and the workflow automation underneath all of it.",
  facts: ["11 products", "5 categories", "2018 to 2026"],
};

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
  onOpenContact,
}: HeroConsoleProps) {
  return (
    <header className="relative isolate overflow-hidden bg-void-black">
      {/* Portrait as atmosphere. Greyscale and blurred in the asset itself,
          not at runtime: a large CSS blur repaints on every frame the hero
          animates, and this one never changes. */}
      <div
        aria-hidden="true"
        className="v3-hero-photo pointer-events-none absolute inset-0 z-0 bg-cover mix-blend-screen"
      />
      {/* One sharp band of the real photograph. A blurred portrait on its own
          reads as a stock background; a single crisp edge says it is a person. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-0 hidden w-[34%] bg-cover opacity-55 md:block"
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
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(132% 98% at 44% 32%, transparent 26%, rgba(4,5,6,.78) 74%, #040506 100%)",
        }}
      />

      {/* Navigation. Flat and full width rather than a floating pill: five
          real destinations, the availability line, one neutral action. */}
      <nav className="relative z-10 border-b border-white/[.07] backdrop-blur-3xl">
        <div className="mx-auto flex max-w-[1200px] items-center gap-7 px-6 py-3.5">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate("/");
            }}
            className="flex items-center gap-2.5 text-sm font-medium text-pure-white"
          >
            <span
              aria-hidden="true"
              className="block size-2.5 rotate-45 rounded-[2px] bg-coral-pulse"
            />
            Deepak Prasad
          </a>

          <div className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.path);
                }}
                className="rounded-lg px-2.5 py-1.5 text-[13.5px] font-medium text-ash transition-colors duration-200 hover:bg-white/5 hover:text-pure-white"
              >
                {link.label}
              </a>
            ))}
          </div>

          <span className="ml-auto hidden items-center gap-2 font-mono text-xs tracking-[.03em] text-ash xl:inline-flex">
            {/* The one status dot on the page. It marks a real availability
                state, which is the only thing a coloured dot may do here. */}
            <span
              aria-hidden="true"
              className="block size-1.5 rounded-full bg-[#59d499]"
            />
            OPEN TO SENIOR &amp; LEAD ROLES
          </span>

          <button
            type="button"
            onClick={onOpenContact}
            className="ml-auto inline-flex min-h-9 items-center gap-2 rounded-lg bg-mist px-3.5 py-2 text-[13px] font-medium text-iron transition-all duration-200 hover:-translate-y-px hover:bg-white xl:ml-0"
          >
            Get in touch
          </button>
        </div>
      </nav>

      <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-14 px-6 pb-18 pt-20 md:grid-cols-2 md:pb-20 md:pt-24">
        <div className="grid gap-6">
          <h1 className="max-w-[24ch] text-[clamp(1.75rem,3.4vw,2.625rem)] font-normal leading-[1.17] tracking-[.22px] text-pure-white">
            Eleven products shipped. Ask the archive anything.
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

        <div>
          <div className="v3-key overflow-hidden rounded-2xl bg-ink/[.62] backdrop-blur-2xl">
            <div className="flex items-center gap-3 border-b border-white/[.08] px-4 py-[15px]">
              <Search
                className="size-[17px] shrink-0 text-coral-pulse"
                strokeWidth={1.7}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1 truncate text-[15.5px] text-ash">
                {DEFAULT_ANSWER.question}
              </span>
              <span className="rounded-md bg-graphite px-1.5 py-1 font-mono text-[10px] text-smoke">
                <CornerDownLeft className="size-3" strokeWidth={1.7} aria-hidden="true" />
              </span>
            </div>

            <div className="grid min-h-[150px] content-start gap-3 px-[18px] pb-4 pt-5">
              <p className="text-[19px] leading-[1.32] tracking-[.2px] text-pure-white">
                {DEFAULT_ANSWER.claim}
              </p>
              <p className="text-[14.5px] leading-relaxed text-ash">
                {DEFAULT_ANSWER.context}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 border-t border-white/[.07] bg-white/[.015] px-[18px] py-3">
              <span className="rounded-md px-1.5 py-1 font-mono text-[10.5px] tracking-[.05em] text-smoke ring-1 ring-inset ring-white/10">
                FROM THE ARCHIVE
              </span>
              {DEFAULT_ANSWER.facts.map((fact) => (
                <span
                  key={fact}
                  className="rounded-md bg-graphite px-1.5 py-1 font-mono text-[10.5px] tracking-[.05em] text-mist"
                >
                  {fact}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
