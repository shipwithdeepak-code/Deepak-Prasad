import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";

interface FlowerBloomSectionProps {
  onOpenContact?: () => void;
}

const bloomFrames = Array.from({ length: 6 }, (_, index) => `/images/bloom/bloom-${index}.webp`);

export default function FlowerBloomSection({ onOpenContact }: FlowerBloomSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [assetsReady, setAssetsReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [framePair, setFramePair] = useState({ current: 0, next: 1, mix: 0 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 52, damping: 30, mass: 0.8 });

  const flowerScale = useTransform(progress, [0, 0.24, 0.58, 1], [0.58, 0.78, 1, 1.18]);
  const flowerY = useTransform(progress, [0, 0.45, 1], [150, 8, -55]);
  const flowerX = useTransform(progress, [0, 0.45, 1], [110, 25, -18]);
  const flowerRotate = useTransform(progress, [0, 0.45, 1], [-11, 0, 5]);
  const flowerBlur = useTransform(progress, [0, 0.2, 0.55, 1], ["blur(8px)", "blur(2px)", "blur(0px)", "blur(1px)"]);
  const copyOpacity = useTransform(progress, [0.1, 0.25, 0.68, 0.82], [0, 1, 1, 0]);
  const copyY = useTransform(progress, [0.1, 0.25], [42, 0]);
  const atmosphereOpacity = useTransform(progress, [0, 0.35, 1], [0.12, 0.45, 0.72]);
  const vignetteOpacity = useTransform(progress, [0, 0.5, 1], [0.7, 0.35, 0.85]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const images = bloomFrames.map((src) => {
      const image = new Image();
      image.decoding = "async";
      image.src = src;
      return image;
    });

    Promise.all(images.map((image) => new Promise<void>((resolve) => {
      if (image.complete) return resolve();
      image.onload = () => resolve();
      image.onerror = () => resolve();
    }))).then(() => {
      if (!cancelled) setAssetsReady(images.every((image) => image.naturalWidth > 0));
    });

    return () => { cancelled = true; };
  }, []);

  useMotionValueEvent(progress, "change", (value) => {
    if (reducedMotion) return;
    const clamped = Math.min(0.9999, Math.max(0, value));
    const position = clamped * (bloomFrames.length - 1);
    const current = Math.floor(position);
    setFramePair({
      current,
      next: Math.min(current + 1, bloomFrames.length - 1),
      mix: position - current,
    });
  });

  const currentOpacity = reducedMotion ? 0 : 1 - framePair.mix;
  const nextOpacity = reducedMotion ? 1 : framePair.mix;
  const currentScale = 1 - framePair.mix * 0.035;
  const nextScale = 0.965 + framePair.mix * 0.035;

  return (
    <section
      ref={sectionRef}
      className="relative h-[230vh] overflow-clip bg-[#0A0A0B] md:h-[270vh]"
      aria-label="Ideas in bloom"
    >
      <div className="sticky top-0 flex h-screen min-h-[620px] flex-col justify-between overflow-hidden px-6 py-7 md:px-12 md:py-9">
        <div className="pointer-events-none absolute inset-0 bg-[#0A0A0B]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_48%,rgba(240,151,122,0.1),transparent_58%)]" />
        <motion.div
          style={{ opacity: atmosphereOpacity }}
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_68%_55%,rgba(240,151,122,0.18),transparent_38%)]"
        />

        <div className="relative z-20 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
          <span>Deepak Prasad</span>
          <span>Scroll to bloom ———</span>
        </div>

        <div className="relative flex flex-1 items-center">
          <motion.div
            style={{ opacity: copyOpacity, y: copyY }}
            className="relative z-20 max-w-[420px] space-y-6 pt-16 md:pt-0"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">The closing thought</p>
            <h2 className="font-serif text-[clamp(3.5rem,7vw,7.5rem)] font-normal leading-[0.88] tracking-[-0.065em] text-[#f1e9dc]">
              Ideas in<br />bloom.
            </h2>
            <p className="max-w-[300px] text-sm leading-6 text-white/50">I turn complex problems into products people love to use.</p>
            <button
              type="button"
              onClick={onOpenContact}
              className="rounded-full border border-white/20 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:border-[#F0977A] hover:text-[#F0977A]"
            >
              Let’s talk ↗
            </button>
          </motion.div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center md:justify-end md:pr-[3vw]">
            <motion.div
              style={{ scale: flowerScale, x: flowerX, y: flowerY, rotate: flowerRotate, filter: flowerBlur }}
              className="relative h-[min(92vw,820px)] w-[min(92vw,820px)] md:h-[min(74vw,860px)] md:w-[min(74vw,860px)]"
              aria-hidden="true"
            >
              {assetsReady ? (
                <>
                  <motion.img
                    src={bloomFrames[framePair.current]}
                    alt=""
                    className="absolute inset-[-8%] h-[116%] w-[116%] object-contain mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_42%,rgba(0,0,0,0.94)_64%,rgba(0,0,0,0.5)_80%,transparent_100%)]"
                    style={{ opacity: currentOpacity, scale: currentScale }}
                    draggable={false}
                  />
                  <motion.img
                    src={bloomFrames[framePair.next]}
                    alt=""
                    className="absolute inset-[-8%] h-[116%] w-[116%] object-contain mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,black_42%,rgba(0,0,0,0.94)_64%,rgba(0,0,0,0.5)_80%,transparent_100%)]"
                    style={{ opacity: nextOpacity, scale: nextScale }}
                    draggable={false}
                  />
                  <div className="absolute inset-[4%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(240,151,122,0.16),transparent_62%)] mix-blend-screen blur-[70px]" />
                </>
              ) : (
                <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(ellipse_at_center,#ead8b7_0%,#a78b61_30%,#30261b_64%,transparent_72%)] opacity-80 blur-[1px]" />
              )}
              <motion.div
                style={{ opacity: vignetteOpacity }}
                className="absolute inset-[-12%] rounded-full bg-[radial-gradient(ellipse_at_center,transparent_48%,rgba(10,10,11,0.22)_70%,#0A0A0B_91%)]"
              />
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
