import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

interface ContactCTAProps {
  onOpenContact?: () => void;
  onOpenResumeModal?: () => void;
}

/**
 * Final Contact / CTA Section.
 *
 * Full-bleed cinematic closing frame featuring the uploaded coral desert video
 * (/desert-cta-coral.mp4) with its natural coral/terracotta treatment preserved,
 * subtle dark gradient overlays for pristine typography readability, natural blending
 * into the near-black portfolio background, and prefers-reduced-motion support.
 */
export default function ContactCTA({ onOpenContact }: ContactCTAProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

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

  // Ensure autoplay on mount if not reduced motion
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isReducedMotion) {
      video.pause();
    } else {
      video.play().catch(() => {
        // Autoplay policy may defer until user gesture in select browser environments
      });
    }
  }, [isReducedMotion]);

  return (
    <section
      id="contact"
      aria-label="Contact and collaboration"
      className="relative isolate overflow-hidden bg-[#0A0A0B] text-[#FAF7F0] py-28 sm:py-32 md:py-36 lg:py-44"
    >
      {/* =========================================================================
          BACKGROUND VIDEO LAYER: /desert-cta-coral.mp4
          Full-bleed, object-fit: cover, autoplay, muted, loop, playsInline.
          Preserves the coral/terracotta color treatment from the uploaded video.
          ========================================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      >
        {isReducedMotion || videoError ? (
          <picture>
            <source srcSet="/desert-cta-coral-poster.webp" type="image/webp" />
            <img
              src="/desert-cta-coral-poster.jpg"
              alt=""
              width={1920}
              height={1080}
              loading="lazy"
              decoding="async"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
          </picture>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/desert-cta-coral-poster.webp"
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
              videoLoaded ? "opacity-100" : "opacity-90"
            }`}
          >
            <source src="/desert-cta-coral.mp4" type="video/mp4" />
          </video>
        )}
      </div>

      {/* =========================================================================
          SUBTLE DARK GRADIENT OVERLAYS FOR READABILITY & NATURAL BLENDING
          Blends the video naturally into the #0A0A0B portfolio ground without
          visible rectangular borders, cards, or glassmorphism.
          ========================================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] select-none"
      >
        {/* Soft radial vignette behind typography for text contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(10,10,11,0.85) 0%, rgba(10,10,11,0.60) 50%, rgba(10,10,11,0.15) 85%, transparent 100%)",
          }}
        />

        {/* Top feathered edge: seamless blend from preceding section */}
        <div
          className="absolute inset-x-0 top-0 h-36 sm:h-44 md:h-52"
          style={{
            background:
              "linear-gradient(180deg, #0A0A0B 0%, rgba(10,10,11,0.92) 30%, rgba(10,10,11,0.4) 75%, transparent 100%)",
          }}
        />

        {/* Bottom feathered edge: seamless blend into footer */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 sm:h-48 md:h-56"
          style={{
            background:
              "linear-gradient(0deg, #0A0A0B 0%, rgba(10,10,11,0.94) 35%, rgba(10,10,11,0.45) 80%, transparent 100%)",
          }}
        />

        {/* Horizontal side feathers: prevents hard video boundaries on wide viewports */}
        <div
          className="absolute inset-y-0 left-0 w-24 sm:w-36 md:w-48"
          style={{
            background:
              "linear-gradient(90deg, #0A0A0B 0%, rgba(10,10,11,0.6) 40%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24 sm:w-36 md:w-48"
          style={{
            background:
              "linear-gradient(270deg, #0A0A0B 0%, rgba(10,10,11,0.6) 40%, transparent 100%)",
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
