import React, { useEffect, useRef } from "react";
import { Linkedin, Github, Mail, ArrowUpRight, ArrowDown } from "lucide-react";
import { downloadResumePDF } from "../../utils/downloadResume";
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  GITHUB_URL,
  LINKEDIN_URL,
  LOCATION,
  RESPONSE_TIME,
} from "../../utils/contact";

interface SiteFooterProps {
  onOpenContact?: () => void;
  onAskDipa?: () => void;
}

export default function SiteFooter({ onOpenContact, onAskDipa }: SiteFooterProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* The footer is on every route, so an eagerly loaded background video is
     629KB every visitor pays for before they have scrolled anywhere near it.
     Nothing is fetched until the footer is one viewport away; playback stops
     when it leaves, and reduced motion gets the poster frame only. */
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let near = false;

    const sync = () => {
      if (motionQuery.matches) {
        video.pause();
        return;
      }
      if (near) {
        if (!video.currentSrc) video.load();
        video.play().catch(() => {
          /* autoplay policy: the poster frame is the fallback */
        });
      } else {
        video.pause();
      }
    };

    if (typeof IntersectionObserver === "undefined") {
      near = true;
      sync();
    } else {
      const io = new IntersectionObserver(
        ([entry]) => {
          near = entry.isIntersecting;
          sync();
        },
        { rootMargin: "100% 0px" }
      );
      io.observe(section);
      motionQuery.addEventListener("change", sync);
      return () => {
        io.disconnect();
        motionQuery.removeEventListener("change", sync);
      };
    }

    motionQuery.addEventListener("change", sync);
    return () => motionQuery.removeEventListener("change", sync);
  }, []);

  return (
    <footer
      id="site-footer"
      ref={sectionRef}
      aria-label="Site footer and contact"
      className="relative isolate overflow-hidden bg-void text-ivory select-none-desktop"
      style={{ minHeight: "clamp(560px, 56.25vw, 1010px)" }}
    >
      {/* Background layer: z-0 */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-void" />

      {/* Video Container Layer: z-0 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster="/flower-poster.jpg"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover object-right"
        >
          <source src="/flower-motion.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlays to seamlessly blend video with void black background: z-[1] */}
        {/* Left-to-right fade to preserve text contrast on the left */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(90deg, #0A0A0B 0%, #0A0A0B 30%, rgba(10,10,11,0.88) 48%, rgba(10,10,11,0.34) 66%, rgba(10,10,11,0.06) 84%, transparent 100%)",
          }}
        />

        {/* Top edge fade */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-24 z-[1]"
          style={{
            background:
              "linear-gradient(180deg, #0A0A0B 0%, transparent 100%)",
          }}
        />

        {/* Bottom edge fade */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 z-[1]"
          style={{
            background:
              "linear-gradient(0deg, #0A0A0B 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Main Content Layout Container: z-10 */}
      <div className="relative z-10 mx-auto flex min-h-[clamp(560px,56.25vw,1010px)] w-full max-w-7xl flex-col justify-between px-6 py-12 sm:px-10 md:px-14 lg:px-16">
        {/* Top spacer to balance vertical optical center */}
        <div className="hidden lg:block h-6" />

        {/* Center Main Content Grid: Headline + Paragraph + Actions + Metadata */}
        <div className="my-auto max-w-2xl py-8 lg:py-12">
          {/* Main Headline */}
          <h2
            className="font-display font-bold text-ivory tracking-[-0.03em] leading-[1.08]"
            style={{
              fontSize: "clamp(34px, 4.4vw, 56px)",
            }}
          >
            <span>Let us build something</span>
            <br />
            <span
              className="italic font-display font-medium"
              style={{ color: "var(--color-coral)" }}
            >
              extraordinary
            </span>{" "}
            <span>together</span>
          </h2>

          {/* Subheading / Value Proposition */}
          <p
            className="mt-6 max-w-xl font-body text-base sm:text-lg leading-[1.65] text-white/75"
            style={{ fontVariationSettings: '"wdth" 96' }}
          >
            Looking for a Senior Product Manager who thrives in ambiguity, talks
            to real users, and builds resilient physical digital systems? Let us
            connect.
          </p>

          {/* Action Button Row */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Primary Action Button */}
            <button
              type="button"
              onClick={onOpenContact}
              className="cursor-pointer inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-[0.14em] font-semibold text-void transition-[filter,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:brightness-105 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
              style={{
                backgroundColor: "var(--color-coral)",
                boxShadow: "0 4px 20px rgba(240, 151, 122, 0.28)",
              }}
              aria-label="Open contact modal to discuss working together"
            >
              <span>LET US TALK</span>
              <ArrowUpRight size={15} strokeWidth={2.4} aria-hidden="true" />
            </button>

            {/* LinkedIn Icon Button */}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Deepak Prasad on LinkedIn (opens in a new tab)"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-void/60 text-ivory backdrop-blur-xs transition-[border-color,background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-white/50 hover:bg-white/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            >
              <Linkedin size={16} aria-hidden="true" />
            </a>

            {/* GitHub Icon Button */}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Deepak Prasad on GitHub (opens in a new tab)"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-void/60 text-ivory backdrop-blur-xs transition-[border-color,background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-white/50 hover:bg-white/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            >
              <Github size={16} aria-hidden="true" />
            </a>

            {/* Resume Download Action */}
            <button
              type="button"
              onClick={() => {
                downloadResumePDF();
              }}
              className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-white/25 bg-void/60 px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] font-medium text-ivory backdrop-blur-xs transition-[border-color,background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-white/60 hover:bg-white/10 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
              aria-label="Download Deepak Prasad's product management resume as PDF"
            >
              <span>DOWNLOAD RESUME</span>
              <ArrowDown size={14} strokeWidth={2.2} aria-hidden="true" />
            </button>

            {/* Direct Email Action Button */}
            <a
              href={CONTACT_MAILTO}
              aria-label={`Send direct email to Deepak Prasad at ${CONTACT_EMAIL}`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-void/60 text-ivory backdrop-blur-xs transition-[border-color,background-color,transform] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-white/50 hover:bg-white/10 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
            >
              <Mail size={16} aria-hidden="true" />
            </a>
          </div>

          {/* Contact Details & SLA Metadata Row */}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white/55">
            <a
              href={CONTACT_MAILTO}
              className="text-white/70 hover:text-coral transition-colors underline-offset-4 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            <span>{RESPONSE_TIME}</span>
            <span>{LOCATION}</span>
          </div>
        </div>

        {/* Bottom Footer Bar */}
        <div className="mt-12 w-full border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
            {/* Left Copyright */}
            <div>
              &copy; {new Date().getFullYear()} DEEPAK PRASAD. ALL RIGHTS RESERVED.
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
