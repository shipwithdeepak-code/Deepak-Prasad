import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface FlowerBloomSectionProps {
  onOpenContact?: () => void;
}

const bloomFrames = Array.from({ length: 6 }, (_, index) => `/images/bloom/bloom-${index}.webp`);

export default function FlowerBloomSection({ onOpenContact }: FlowerBloomSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [frame, setFrame] = useState(0);
  const [assetsReady, setAssetsReady] = useState(false);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.45 });
  const flowerScale = useTransform(progress, [0, 0.45, 1], [0.78, 0.94, 1.08]);
  const flowerY = useTransform(progress, [0, 1], [70, -20]);
  const flowerRotate = useTransform(progress, [0, 1], [-5, 4]);
  const copyOpacity = useTransform(progress, [0.48, 0.68], [0, 1]);
  const copyY = useTransform(progress, [0.48, 0.68], [28, 0]);

  useEffect(() => {
    let cancelled = false;
    const images = bloomFrames.map((src) => {
      const image = new Image();
      image.src = src;
      return image;
    });
    Promise.all(images.map((image) => new Promise<void>((resolve) => {
      image.onload = () => resolve();
      image.onerror = () => resolve();
    }))).then(() => {
      if (!cancelled) setAssetsReady(images.every((image) => image.complete && image.naturalWidth > 0));
    });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const unsubscribe = progress.on("change", (value) => {
      setFrame(Math.min(5, Math.max(0, Math.round(value * 5))));
    });
    return unsubscribe;
  }, [progress]);

  return (
    <section ref={sectionRef} className="relative h-[220vh] overflow-clip bg-void md:h-[260vh]" aria-label="Ideas in bloom">
      <div className="sticky top-0 flex h-screen min-h-[620px] flex-col justify-between overflow-hidden px-6 py-7 md:px-12 md:py-9">
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
          <span>Deepak Prasad</span>
          <span>Scroll to bloom ———</span>
        </div>

        <div className="relative flex flex-1 items-center">
          <motion.div style={{ opacity: copyOpacity, y: copyY }} className="relative z-10 max-w-[420px] space-y-6 pt-16 md:pt-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">The closing thought</p>
            <h2 className="font-serif text-[clamp(3.5rem,7vw,7.5rem)] font-normal leading-[0.88] tracking-[-0.065em] text-[#f1e9dc]">Ideas in<br />bloom.</h2>
            <p className="max-w-[300px] text-sm leading-6 text-white/50">I turn complex problems into products people love to use.</p>
            <button type="button" onClick={onOpenContact} className="rounded-full border border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:border-[#F0977A] hover:text-[#F0977A]">Let’s talk ↗</button>
          </motion.div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center md:justify-end md:pr-[4vw]">
            <motion.div style={{ scale: flowerScale, y: flowerY, rotate: flowerRotate }} className="relative h-[min(82vw,720px)] w-[min(82vw,720px)] md:h-[min(68vw,760px)] md:w-[min(68vw,760px)]" aria-hidden="true">
              {assetsReady ? (
                <img src={bloomFrames[frame]} alt="" className="absolute inset-0 h-full w-full object-contain" draggable={false} />
              ) : (
                <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(ellipse_at_center,#ead8b7_0%,#a78b61_30%,#30261b_64%,transparent_72%)] opacity-80 blur-[1px]" />
              )}
              <div className="absolute inset-[18%] rounded-full bg-[#d9b783] opacity-20 blur-[90px]" />
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
