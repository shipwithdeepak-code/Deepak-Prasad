import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface FlowerBloomSectionProps {
  onOpenContact?: () => void;
}

const petals = Array.from({ length: 18 }, (_, index) => index);

export default function FlowerBloomSection({ onOpenContact }: FlowerBloomSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 45, damping: 28, mass: 0.9 });

  const bloomScale = useTransform(progress, [0, 0.28, 0.62, 1], [0.48, 0.72, 1, 1.18]);
  const bloomY = useTransform(progress, [0, 0.5, 1], [180, 0, -70]);
  const bloomRotate = useTransform(progress, [0, 0.5, 1], [-18, 0, 12]);
  const bloomOpacity = useTransform(progress, [0, 0.12, 0.3, 0.88, 1], [0, 0.55, 1, 1, 0.72]);
  const copyOpacity = useTransform(progress, [0.12, 0.26, 0.7, 0.84], [0, 1, 1, 0]);
  const copyY = useTransform(progress, [0.12, 0.26], [40, 0]);

  return (
    <section ref={sectionRef} className="relative h-[230vh] overflow-clip bg-[#0A0A0B]" aria-label="Ideas in bloom">
      <div className="sticky top-0 flex h-screen min-h-[620px] flex-col justify-between overflow-hidden px-6 py-7 md:px-12 md:py-9">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_48%,rgba(240,151,122,0.12),transparent_58%)]" />

        <div className="relative z-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
          <span>Deepak Prasad</span>
          <span>Scroll to bloom ———</span>
        </div>

        <div className="relative flex flex-1 items-center">
          <motion.div style={{ opacity: copyOpacity, y: copyY }} className="relative z-20 max-w-[420px] space-y-6 pt-16 md:pt-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">The closing thought</p>
            <h2 className="font-serif text-[clamp(3.5rem,7vw,7.5rem)] font-normal leading-[0.88] tracking-[-0.065em] text-[#f1e9dc]">Ideas in<br />bloom.</h2>
            <p className="max-w-[300px] text-sm leading-6 text-white/50">I turn complex problems into products people love to use.</p>
            <button type="button" onClick={onOpenContact} className="rounded-full border border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:border-[#F0977A] hover:text-[#F0977A]">Let’s talk ↗</button>
          </motion.div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center md:justify-end md:pr-[3vw]">
            <motion.div style={{ scale: bloomScale, y: bloomY, rotate: bloomRotate, opacity: bloomOpacity }} className="relative h-[min(94vw,860px)] w-[min(94vw,860px)] md:h-[min(76vw,900px)] md:w-[min(76vw,900px)]" aria-hidden="true">
              <svg viewBox="0 0 800 800" className="h-full w-full overflow-visible" role="presentation">
                <defs>
                  <radialGradient id="coralPetal" cx="38%" cy="28%" r="78%">
                    <stop offset="0%" stopColor="#F8C4B0" />
                    <stop offset="38%" stopColor="#F0977A" />
                    <stop offset="78%" stopColor="#B85F4B" />
                    <stop offset="100%" stopColor="#351B18" />
                  </radialGradient>
                  <radialGradient id="coralCore">
                    <stop offset="0%" stopColor="#FFE0C9" />
                    <stop offset="35%" stopColor="#F0977A" />
                    <stop offset="100%" stopColor="#5A2922" />
                  </radialGradient>
                  <filter id="softBloom" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="8" />
                  </filter>
                </defs>
                <circle cx="400" cy="400" r="265" fill="#F0977A" opacity="0.07" filter="url(#softBloom)" />
                {petals.map((petal) => {
                  const angle = petal * 20;
                  const scale = 0.88 + (petal % 4) * 0.045;
                  return (
                    <g key={petal} transform={`translate(400 400) rotate(${angle}) scale(${scale})`}>
                      <ellipse cx="0" cy="-155" rx="92" ry="230" fill="url(#coralPetal)" opacity={0.36 + (petal % 5) * 0.09} transform={`rotate(${petal % 3 === 0 ? -12 : petal % 3 === 1 ? 4 : 16})`} />
                      <ellipse cx="0" cy="-112" rx="58" ry="170" fill="none" stroke="#F8B49B" strokeOpacity="0.24" strokeWidth="2" />
                    </g>
                  );
                })}
                {petals.slice(0, 10).map((petal) => (
                  <ellipse key={`inner-${petal}`} cx="400" cy="300" rx="54" ry="150" fill="url(#coralPetal)" opacity="0.8" transform={`rotate(${petal * 36} 400 400)`} />
                ))}
                <circle cx="400" cy="400" r="78" fill="url(#coralCore)" />
                <circle cx="400" cy="400" r="34" fill="#F8C4B0" opacity="0.65" />
              </svg>
              <div className="absolute inset-[20%] rounded-full bg-[#F0977A] opacity-[0.12] blur-[100px]" />
            </motion.div>
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
