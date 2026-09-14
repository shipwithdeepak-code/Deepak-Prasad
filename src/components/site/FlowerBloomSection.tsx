import { useEffect, useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";

interface FlowerBloomSectionProps {
  onOpenContact?: () => void;
}

const petals = Array.from({ length: 18 }, (_, index) => index);

export default function FlowerBloomSection({ onOpenContact }: FlowerBloomSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.45 });
  const flowerScale = useTransform(progress, [0, 0.45, 1], [0.78, 0.94, 1.08]);
  const flowerY = useTransform(progress, [0, 1], [70, -20]);
  const flowerRotate = useTransform(progress, [0, 1], [-5, 4]);
  const glowOpacity = useTransform(progress, [0, 0.35, 0.8, 1], [0.08, 0.2, 0.48, 0.62]);
  const copyOpacity = useTransform(progress, [0.48, 0.68], [0, 1]);
  const copyY = useTransform(progress, [0.48, 0.68], [28, 0]);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => root.dataset.reducedMotion = reduceMotion.matches ? "true" : "false";
    update();
    reduceMotion.addEventListener?.("change", update);
    return () => reduceMotion.removeEventListener?.("change", update);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[220vh] overflow-clip bg-void md:h-[260vh]" aria-label="Ideas in bloom">
      <div className="sticky top-0 flex h-screen min-h-[620px] flex-col justify-between overflow-hidden px-6 py-7 md:px-12 md:py-9">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
          <span>Deepak Prasad</span>
          <span>Scroll to bloom ———</span>
        </div>

        <div className="relative flex flex-1 items-center">
          <div className="relative z-10 max-w-[420px] pt-16 md:pt-0">
            <motion.div style={{ opacity: copyOpacity, y: copyY }} className="space-y-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">The closing thought</p>
              <h2 className="font-serif text-[clamp(3.5rem,7vw,7.5rem)] font-normal leading-[0.88] tracking-[-0.065em] text-[#f1e9dc]">Ideas in<br />bloom.</h2>
              <p className="max-w-[300px] text-sm leading-6 text-white/50">I turn complex problems into products people love to use.</p>
              <button type="button" onClick={onOpenContact} className="rounded-full border border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:border-[#F0977A] hover:text-[#F0977A]">Let’s talk ↗</button>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center md:justify-end md:pr-[4vw]">
            <motion.div style={{ scale: flowerScale, y: flowerY, rotate: flowerRotate }} className="relative h-[min(82vw,720px)] w-[min(82vw,720px)] md:h-[min(68vw,760px)] md:w-[min(68vw,760px)]" aria-hidden="true">
              <motion.div style={{ opacity: glowOpacity }} className="absolute inset-[18%] rounded-full bg-[#d9b783] blur-[90px]" />
              <div className="absolute bottom-[7%] left-1/2 h-[44%] w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#b99b6b] via-[#5c4a32] to-transparent" />
              {petals.map((petal) => {
                const angle = (petal / petals.length) * 360;
                const depth = petal % 3;
                return (
                  <motion.div key={petal} className="absolute left-1/2 top-1/2 origin-bottom" style={{ rotate: angle, x: "-50%", y: "-100%", width: `${25 + depth * 4}%`, height: `${43 + depth * 4}%`, opacity: 0.42 + depth * 0.18 }}>
                    <div className="h-full w-full rounded-[70%_30%_65%_35%] border border-[#e5cda7]/35 bg-gradient-to-br from-[#fff5df]/90 via-[#cdb28a]/65 to-[#55432f]/75 shadow-[inset_-18px_-25px_45px_rgba(35,22,10,.35),inset_15px_12px_35px_rgba(255,244,215,.25)]" />
                  </motion.div>
                );
              })}
              <div className="absolute left-1/2 top-1/2 h-[18%] w-[18%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_35%_30%,#f6dca7,#a77b3f_55%,#342719)] shadow-[0_0_55px_rgba(218,169,92,.25)]" />
            </motion.div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 pt-5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
          <span>From complexity to impact</span>
          <span>Deepak Prasad · 2026</span>
        </div>
      </div>
    </section>
  );
}
