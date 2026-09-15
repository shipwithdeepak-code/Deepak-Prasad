import { useEffect, useRef } from "react";

interface FlowerBloomSectionProps {
  onOpenContact?: () => void;
}

export default function FlowerBloomSection({ onOpenContact }: FlowerBloomSectionProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    let frame = 0;
    let raf = 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      frame += 1;
      const time = frame * 0.004;
      image.style.transform = reducedMotion
        ? "scale(1.02) translate3d(0, 0, 0)"
        : `scale(${1.045 + Math.sin(time * 0.72) * 0.018}) translate3d(${Math.sin(time) * 0.55}%, ${Math.cos(time * 0.82) * 0.45}%, 0) rotate(${Math.sin(time * 0.48) * 0.22}deg)`;
      raf = window.requestAnimationFrame(animate);
    };

    animate();
    return () => window.cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A0A0B]" aria-label="Ideas in bloom">
      <div className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 py-7 md:px-12 md:py-9">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_48%,rgba(240,151,122,0.16),transparent_58%)]" />

        <div className="relative z-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
          <span>Deepak Prasad</span>
          <span>Always in bloom ———</span>
        </div>

        <div className="relative flex flex-1 items-center">
          <div className="relative z-20 max-w-[420px] space-y-6 pt-16 md:pt-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">The closing thought</p>
            <h2 className="font-serif text-[clamp(3.5rem,7vw,7.5rem)] font-normal leading-[0.88] tracking-[-0.065em] text-[#f1e9dc]">
              Ideas in<br />bloom.
            </h2>
            <p className="max-w-[300px] text-sm leading-6 text-white/50">I turn complex problems into products people love to use.</p>
            <button type="button" onClick={onOpenContact} className="rounded-full border border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:border-[#F0977A] hover:text-[#F0977A]">
              Let’s talk ↗
            </button>
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center md:justify-end md:pr-[2vw]">
            <div className="relative h-[min(92vw,900px)] w-[min(92vw,900px)] overflow-visible">
              <div className="absolute inset-[8%] rounded-full bg-[#F0977A]/10 blur-3xl" />
              <img
                ref={imageRef}
                src="/flower-hero.png"
                alt="A cinematic coral flower with translucent peach petals"
                className="relative h-full w-full object-contain will-change-transform"
              />
            </div>
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
