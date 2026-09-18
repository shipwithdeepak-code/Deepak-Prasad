import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

interface ContactCTAProps {
  onOpenContact?: () => void;
  onOpenResumeModal?: () => void;
}

/**
 * Final Contact / CTA Section.
 *
 * Full-bleed cinematic closing frame featuring the uploaded desert video background
 * with muted coral / terracotta color grading, deep obsidian vignettes for pristine
 * readability, smooth slow playback (~0.4x speed), seamless looping, and
 * prefers-reduced-motion handling.
 */
export default function ContactCTA({ onOpenContact }: ContactCTAProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLoopFading, setIsLoopFading] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
      if (videoRef.current) {
        if (e.matches) {
          videoRef.current.pause();
        } else {
          videoRef.current.play().catch(() => {});
        }
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Configure slow atmospheric playback (0.4x) and seamless loop smoothing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const TARGET_PLAYBACK_RATE = 0.4;

    const applySlowRate = () => {
      try {
        video.playbackRate = TARGET_PLAYBACK_RATE;
      } catch {
        // Silently ignore if browser restricts rate change
      }
    };

    // Apply speed immediately and on playback events
    applySlowRate();
    video.addEventListener("loadedmetadata", applySlowRate);
    video.addEventListener("play", applySlowRate);
    video.addEventListener("ratechange", () => {
      if (video.playbackRate !== TARGET_PLAYBACK_RATE) {
        applySlowRate();
      }
    });

    // Seamless loop smoothing: soft 400ms crossfade as video reaches end
    const handleTimeUpdate = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      const timeLeft = video.duration - video.currentTime;
      // When within 0.35s of the loop boundary, initiate a very subtle opacity dip
      if (timeLeft < 0.35 && timeLeft > 0.05) {
        setIsLoopFading(true);
      } else if (isLoopFading && video.currentTime < 0.4) {
        // Just looped back to start: restore full opacity smoothly
        setIsLoopFading(false);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    // If reduced motion is requested, ensure video remains paused
    if (isReducedMotion) {
      video.pause();
    } else {
      video.play().catch(() => {
        // Autoplay may wait for user interaction in some browsers
      });
    }

    return () => {
      video.removeEventListener("loadedmetadata", applySlowRate);
      video.removeEventListener("play", applySlowRate);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [isReducedMotion]);

  return (
    <section
      id="contact"
      aria-label="Contact and collaboration"
      className="relative isolate overflow-hidden bg-[#0A0A0B] text-[#FAF7F0] py-28 sm:py-32 md:py-36 lg:py-44"
    >
      {/* =========================================================================
          LAYER 1: FULL-WIDTH CINEMATIC DESERT VIDEO
          The exact reference video asset with pure, non-destructive color conversion
          from blue/purple to muted warm coral and burnt terracotta.
          - sepia(1): strips 100% of the blue/purple chromatic values
          - hue-rotate(-26deg): rotates golden sepia directly into warm coral/terracotta (12°-15° hue)
          - saturate(1.15): rich depth in the dune contours and horizon atmospheric mist
          - contrast(1.14) & brightness(0.82): preserves deep #0A0809 / #120C0D obsidian darks
          ========================================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/desert-poster.jpg"
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => setVideoError(true)}
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
            videoLoaded ? (isLoopFading ? "opacity-85" : "opacity-95") : "opacity-80"
          }`}
          style={{
            filter: "contrast(1.06) brightness(0.92)",
          }}
        >
          <source src="/desert.mp4" type="video/mp4" />
          <source src="/desert-motion.mp4" type="video/mp4" />
          <source src="/flower-motion.mp4" type="video/mp4" />
          <source src="/purple-desert.mp4" type="video/mp4" />
        </video>
      </div>

      {/* =========================================================================
          LAYER 2: MUTED CORAL & BURNT TERRACOTTA COLOR GRADING OVERLAYS
          Maps the scene strictly to the requested palette:
          - Deep background: #0A0809
          - Near-black brown: #120C0D
          - Dark burnt coral: #3A1D1D
          - Muted coral: #8F5147
          - Soft warm coral highlight: #F0977A
          ========================================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] select-none"
      >
        {/* Coral/terracotta color mapping: enforces restrained coral across sky and contours */}
        <div
          className="absolute inset-0 mix-blend-color opacity-40"
          style={{
            background:
              "linear-gradient(180deg, #120C0D 0%, #3A1D1D 45%, #8F5147 62%, #3A1D1D 80%, #0A0809 100%)",
          }}
        />

        {/* Soft atmospheric horizon glow in warm coral highlight (#F0977A) */}
        <div
          className="absolute inset-0 mix-blend-screen opacity-15"
          style={{
            background:
              "radial-gradient(ellipse 75% 32% at 50% 56%, #F0977A 0%, #8F5147 45%, transparent 75%)",
          }}
        />

        {/* Subtle shadow depth in dark burnt coral / near-black brown */}
        <div
          className="absolute inset-0 mix-blend-multiply opacity-40"
          style={{
            background:
              "linear-gradient(180deg, #0A0809 0%, #120C0D 30%, transparent 55%, #120C0D 85%, #0A0809 100%)",
          }}
        />

        {/* =====================================================================
            SEAMLESS OBSIDIAN BLENDING INTO #0A0A0B PORTFOLIO GROUND
            No visible rectangular boundaries, no card container, no hard edges.
            ===================================================================== */}
        {/* Central obsidian reading well: ensures AAA typography contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 58% at 50% 50%, rgba(10,10,11,0.88) 0%, rgba(10,10,11,0.68) 45%, rgba(10,10,11,0.22) 80%, transparent 100%)",
          }}
        />

        {/* Top feathered edge: seamless blend from preceding section */}
        <div
          className="absolute inset-x-0 top-0 h-36 sm:h-44 md:h-52"
          style={{
            background:
              "linear-gradient(180deg, #0A0A0B 0%, rgba(10,10,11,0.94) 30%, rgba(10,10,11,0.5) 70%, transparent 100%)",
          }}
        />

        {/* Bottom feathered edge: seamless blend into footer */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 sm:h-48 md:h-56"
          style={{
            background:
              "linear-gradient(0deg, #0A0A0B 0%, rgba(10,10,11,0.96) 35%, rgba(10,10,11,0.55) 75%, transparent 100%)",
          }}
        />

        {/* Horizontal side feathers: prevents hard video boundaries on wide viewports */}
        <div
          className="absolute inset-y-0 left-0 w-24 sm:w-36 md:w-48"
          style={{
            background:
              "linear-gradient(90deg, #0A0A0B 0%, rgba(10,10,11,0.7) 45%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24 sm:w-36 md:w-48"
          style={{
            background:
              "linear-gradient(270deg, #0A0A0B 0%, rgba(10,10,11,0.7) 45%, transparent 100%)",
          }}
        />
      </div>

      {/* =========================================================================
          LAYER 3: CENTERED EDITORIAL CONTENT BLOCK
          Typography, hierarchy, and copy strictly preserved as requested:
          - Small eyebrow: “LET’S BUILD SOMETHING USEFUL”
          - Main heading: “Tell me what you are hiring for.”
          - Supporting text: “I will reply with the three most relevant things I have shipped, and whether I am the right fit, including if I am not.”
          - Primary CTA: “Get in touch ↗”
          - Metadata: “Bengaluru / Remote · Replies within 24 hours.”
          ========================================================================= */}
      <div className="relative z-10 mx-auto max-w-[840px] px-6 text-center select-text">
        {/* Eyebrow in muted coral */}
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#F0977A]">
          LET’S BUILD SOMETHING USEFUL
        </span>

        {/* Main Heading in warm ivory */}
        <h2 className="mt-4 text-[clamp(2.1rem,4.8vw,3.6rem)] font-normal leading-[1.12] tracking-tight text-[#F2F2F0]">
          Tell me what you are hiring for.
        </h2>

        {/* Supporting Copy in soft gray */}
        <p className="mt-5 text-[16px] sm:text-[17.5px] leading-relaxed text-[#8F8F8D] max-w-[48ch] mx-auto font-normal">
          I will reply with the three most relevant things I have shipped, and
          whether I am the right fit, including if I am not.
        </p>

        {/* Primary CTA - Single Button: Get in touch ↗ */}
        <div className="mt-9 flex justify-center">
          <button
            type="button"
            onClick={onOpenContact}
            className="group inline-flex items-center gap-2.5 rounded-[9px] bg-[#F0977A] px-7 py-3.5 text-[15px] font-medium text-[#0A0809] shadow-[0_2px_14px_rgba(240,151,122,0.22)] transition-all duration-200 hover:bg-[#F3A68D] hover:shadow-[0_4px_20px_rgba(240,151,122,0.32)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0977A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B]"
          >
            <span>Get in touch</span>
            <ArrowUpRight
              className="size-4 stroke-[2.3] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Location and Response Time Supporting Note */}
        <p className="mt-5 font-mono text-[11px] sm:text-[11.5px] tracking-wide text-[#8F8F8D]/80">
          Bengaluru / Remote · Replies within 24 hours.
        </p>
      </div>
    </section>
  );
}
