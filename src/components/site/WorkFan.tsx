import React, { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CaseStudyDetail } from "../../types";

interface WorkFanProps {
  caseStudies: CaseStudyDetail[];
  onSelectCaseStudy: (caseStudy: CaseStudyDetail) => void;
  onNavigate: (path: string) => void;
}

/** Cards on an arc: the active one upright and centred, its neighbours
 *  rotated, pushed out, dropped and dimmed. Offsets wrap, so the deck is
 *  endless and there are always cards on both sides. */
export default function WorkFan({ caseStudies, onSelectCaseStudy, onNavigate }: WorkFanProps) {
  const shouldReduceMotion = useReducedMotion();
  const fanRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const n = caseStudies.length;

  /* pointer lean: the whole deck leans toward the cursor, so moving the
     mouse across it moves the cards without changing the selection */
  const leanRef = useRef(0);

  const go = useCallback(
    (d: number) => setActive((a) => (((a + d) % n) + n) % n),
    [n]
  );

  const layout = useCallback(() => {
    const fan = fanRef.current;
    if (!fan) return;
    const cards: HTMLElement[] = Array.from(
      fan.querySelectorAll<HTMLElement>(".dp-fcard")
    );
    const narrow = fan.clientWidth < 560;
    const ang = narrow ? 9 : 7;
    const gap = narrow ? 30 : 74;
    const lift = narrow ? 16 : 13;
    const shrink = 0.055;
    const lean = leanRef.current;

    cards.forEach((c, i) => {
      let o = (((i - active) % n) + n) % n;
      if (o > n / 2) o -= n;
      const a = Math.abs(o);
      c.style.transform =
        `rotate(${o * ang + lean * 0.6}deg) ` +
        `translateX(${o * gap + lean * 9}px) ` +
        `translateY(${a * lift}px) scale(${1 - a * shrink})`;
      c.style.opacity = String(a > 2 ? 0 : 1 - a * 0.3);
      c.style.zIndex = String(50 - a);
      c.setAttribute("aria-hidden", o === 0 ? "false" : "true");
      c.classList.toggle("dp-fcard-on", o === 0);
    });
  }, [active, n]);

  useEffect(() => {
    layout();
    window.addEventListener("resize", layout);
    return () => window.removeEventListener("resize", layout);
  }, [layout]);

  /* One gesture moves one card. A wheel gesture arrives as a burst of
     events, so the deck steps on the first of them and then waits for the
     burst to end rather than stepping once per event.

     The deck is endless, so consuming the wheel forever would trap the
     page. Once a run of steps in one direction has been round the whole
     deck, the wheel goes back to the page until the reader changes
     direction or comes back to the section. */
  useEffect(() => {
    const fan = fanRef.current;
    if (!fan || shouldReduceMotion) return;
    const GESTURE_END_MS = 140;
    let consuming = false;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let runDir = 0;
    let runLength = 0;

    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 8) return;
      const dir = delta > 0 ? 1 : -1;

      if (dir !== runDir) {
        runDir = dir;
        runLength = 0;
      }
      /* every card has been past the middle: the page takes the wheel back */
      if (runLength >= n) return;

      e.preventDefault();
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        consuming = false;
        idleTimer = null;
      }, GESTURE_END_MS);

      if (consuming) return;
      consuming = true;
      runLength += 1;
      go(dir);
    };

    const onMove = (e: PointerEvent) => {
      const r = fan.getBoundingClientRect();
      const t = (e.clientX - r.left) / r.width - 0.5;
      leanRef.current = Math.max(-1, Math.min(1, t * 2));
      layout();
    };
    const onLeave = () => {
      leanRef.current = 0;
      layout();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) return;
        runDir = 0;
        runLength = 0;
      },
      { threshold: 0.2 }
    );
    io.observe(fan);

    fan.addEventListener("wheel", onWheel, { passive: false });
    fan.addEventListener("pointermove", onMove);
    fan.addEventListener("pointerleave", onLeave);
    return () => {
      io.disconnect();
      if (idleTimer) clearTimeout(idleTimer);
      fan.removeEventListener("wheel", onWheel);
      fan.removeEventListener("pointermove", onMove);
      fan.removeEventListener("pointerleave", onLeave);
    };
  }, [go, layout, n, shouldReduceMotion]);

  /* drag */
  useEffect(() => {
    const fan = fanRef.current;
    if (!fan) return;
    let sx: number | null = null;
    const down = (e: PointerEvent) => { sx = e.clientX; };
    const up = (e: PointerEvent) => {
      if (sx === null) return;
      const dx = e.clientX - sx;
      sx = null;
      if (Math.abs(dx) > 42) go(dx < 0 ? 1 : -1);
    };
    const cancel = () => { sx = null; };
    fan.addEventListener("pointerdown", down);
    fan.addEventListener("pointerup", up);
    fan.addEventListener("pointercancel", cancel);
    return () => {
      fan.removeEventListener("pointerdown", down);
      fan.removeEventListener("pointerup", up);
      fan.removeEventListener("pointercancel", cancel);
    };
  }, [go]);

  return (
    <section
      id="selected-work"
      className="relative overflow-hidden bg-void text-ivory scroll-mt-24"
      style={{ containerType: "inline-size" }}
    >
      <div style={{ padding: "clamp(30px,4.6cqw,64px) clamp(18px,4cqw,52px)" }}>
        <div
          className="flex items-center font-mono uppercase"
          style={{ gap: 11, fontSize: "clamp(8px,.85cqw,10.5px)", letterSpacing: ".18em", color: "rgba(242,242,240,.7)" }}
        >
          <i className="flex-none" style={{ width: 44, height: 1, background: "var(--color-coral)" }} />
          Flagship Case Studies
        </div>
        <h2
          className="font-display text-ivory"
          style={{
            fontWeight: 640,
            fontVariationSettings: '"wdth" 92',
            fontSize: "clamp(22px,3.1cqw,36px)",
            letterSpacing: "-.03em",
            lineHeight: 1.05,
            margin: "12px 0 0",
          }}
        >
          Selected work
        </h2>
        <p
          className="text-mute"
          style={{ fontSize: "clamp(12.5px,1.2cqw,15px)", lineHeight: 1.65, maxWidth: "58ch", margin: "12px 0 0" }}
        >
          A selection of products I have taken from ambiguity to launch, scale or
          development ready strategy.
        </p>

        <div className="relative" style={{ padding: "clamp(24px,3.4cqw,40px) 0 clamp(12px,1.8cqw,20px)" }}>
          <div
            ref={fanRef}
            tabIndex={0}
            role="group"
            aria-label="Selected work, use the arrow keys"
            className="relative select-none cursor-grab active:cursor-grabbing focus:outline-none"
            style={{ height: "clamp(370px,45cqw,480px)", perspective: "1400px", touchAction: "pan-y" }}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
              if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
            }}
          >
            {caseStudies.map((cs, i) => (
              <article
                key={cs.id}
                className="dp-fcard absolute left-1/2 top-1/2 flex flex-col gap-[9px] rounded-[20px] cursor-pointer"
                onClick={() => {
                  if (i !== active) {
                    setActive(i);
                    return;
                  }
                  onSelectCaseStudy(cs);
                  onNavigate(`/work/${cs.slug}`);
                }}
                style={{
                  width: "clamp(205px,24cqw,290px)",
                  height: "clamp(280px,33cqw,385px)",
                  marginLeft: "calc(clamp(205px,24cqw,290px) / -2)",
                  marginTop: "calc(clamp(280px,33cqw,385px) / -2)",
                  border: "1px solid var(--rule)",
                  background: "#0E0F11",
                  padding: "clamp(13px,1.7cqw,20px)",
                  transformOrigin: "50% 135%",
                  transition: shouldReduceMotion
                    ? "none"
                    : "transform .75s var(--ease-out-soft), opacity .75s var(--ease-out-soft), border-color .4s ease",
                  boxShadow: "0 18px 40px rgba(0,0,0,.45)",
                }}
              >
                <div
                  className="flex-none rounded-[12px] overflow-hidden"
                  style={{ aspectRatio: "16/10", border: "1px solid var(--rule)" }}
                >
                  <div
                    className="w-full h-full flex items-center justify-center font-mono uppercase"
                    style={{
                      fontSize: 9,
                      letterSpacing: ".14em",
                      color: "rgba(242,242,240,.32)",
                      background:
                        "repeating-linear-gradient(135deg,rgba(242,242,240,.05) 0 10px,transparent 10px 20px)",
                    }}
                  >
                    {cs.timeline}
                  </div>
                </div>
                <span
                  className="font-mono uppercase text-coral"
                  style={{ fontSize: 9, letterSpacing: ".14em" }}
                >
                  {cs.category}
                </span>
                <h3
                  className="font-display m-0 text-ivory"
                  style={{
                    fontWeight: 640,
                    fontVariationSettings: '"wdth" 92',
                    fontSize: "clamp(14.5px,1.6cqw,18px)",
                    letterSpacing: "-.02em",
                    lineHeight: 1.22,
                  }}
                >
                  {cs.title}
                </h3>
                <p className="m-0 text-mute" style={{ fontSize: 11.5, lineHeight: 1.5 }}>
                  {cs.role}
                </p>
                <div
                  className="mt-auto grid rounded-[2px] overflow-hidden"
                  style={{ gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "var(--rule)", border: "1px solid var(--rule)" }}
                >
                  {(cs.keyStats || []).slice(0, 3).map((s, k) => (
                    <div key={k} className="bg-void" style={{ padding: "7px 8px" }}>
                      <b className="block font-display text-coral" style={{ fontWeight: 700, fontSize: 13, letterSpacing: "-.02em" }}>
                        {s.value}
                      </b>
                      <span className="font-mono uppercase text-mute" style={{ fontSize: 7.5, letterSpacing: ".1em" }}>
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div
            className="flex items-center justify-between gap-4 flex-wrap"
            style={{ paddingInline: "clamp(2px,1cqw,8px)", marginTop: "clamp(10px,1.6cqw,18px)" }}
          >
            <div className="flex items-center gap-[9px]">
              <button type="button" aria-label="Previous" onClick={() => go(-1)} className="dp-farrow">
                <ArrowLeft size={15} />
              </button>
              <button type="button" aria-label="Next" onClick={() => go(1)} className="dp-farrow">
                <ArrowRight size={15} />
              </button>
              <span
                className="font-mono text-mute tabular-nums"
                style={{ fontSize: 11, letterSpacing: ".14em", minWidth: "5ch" }}
              >
                {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
            </div>
            <button type="button" onClick={() => onNavigate("/work")} className="dp-fall">
              Explore all projects <ArrowRight size={14} className="dp-fall-ar" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
