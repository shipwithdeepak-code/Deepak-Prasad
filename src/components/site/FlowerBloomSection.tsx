import { useEffect, useRef } from "react";

interface FlowerBloomSectionProps {
  onOpenContact?: () => void;
}

const FLOWER_VIDEO_URL =
  "https://cdn.sceneai.art/backgrounds/d00af118-6586-40b3-b2e7-5b254bc1cf29.mp4";

export default function FlowerBloomSection({ onOpenContact }: FlowerBloomSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      video.pause();
      return;
    }

    const playVideo = () => {
      void video.play().catch(() => {
        // Autoplay can be blocked by the browser; muted inline playback remains available.
      });
    };

    playVideo();
    return () => video.pause();
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A0A0B]" aria-label="Ideas in bloom">
      <div className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 py-7 md:px-12 md:py-9">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_48%,rgba(240,151,122,0.14),transparent_58%)]" />

        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-end overflow-hidden">
          <video
            ref={videoRef}
            className="h-full w-full object-cover object-[68%_50%] opacity-[0.88] md:w-[72%]"
            src={FLOWER_VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="A cinematic flower video moving continuously in the background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-[#0A0A0B]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/55 via-transparent to-[#0A0A0B]/15" />
        </div>

        <div className="relative z-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
          <span>Deepak Prasad</span>
          <span>Always in motion ———</span>
        </div>

        <div className="relative z-20 flex flex-1 items-center">
          <div className="max-w-[420px] space-y-6 pt-16 md:pt-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">The closing thought</p>
            <h2 className="font-serif text-[clamp(3.5rem,7vw,7.5rem)] font-normal leading-[0.88] tracking-[-0.065em] text-[#f1e9dc]">
              Ideas in<br />bloom.
            </h2>
            <p className="max-w-[300px] text-sm leading-6 text-white/50">I turn complex problems into products people love to use.</p>
            <button type="button" onClick={onOpenContact} className="rounded-full border border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:border-[#F0977A] hover:text-[#F0977A]">
              Let’s talk ↗
            </button>
          </div>
        </div>

        <div className="relative z-20 flex items-center justify-between border-t border-white/10 pt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
          <span>From complexity to impact</span>
          <span>Deepak Prasad · 2026</span>
        </div>
      </div>
    </section>
  );
}
