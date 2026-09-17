import React, { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { HOW_I_WORK_PRINCIPLES } from "../../data/caseStudies";

/** Scattered, not gridded. Each card sits at its own point in the field and
 *  drifts on its own cycle, so the section never reads as rows and columns.
 *  Below the scatter breakpoint they fall back to a readable stack. */
const SPOTS = [
  { left: "0%",  top: "1%",  w: "31%" },
  { left: "35%", top: "14%", w: "30%" },
  { left: "69%", top: "4%",  w: "30%" },
  { left: "13%", top: "51%", w: "31%" },
  { left: "51%", top: "60%", w: "32%" },
];

/* the brief's stagger: one reveal on entry, then the field holds still so
   the cards can be read */
const STAGGER_MS = 55;

export default function PrinciplesFloat() {
  const shouldReduceMotion = useReducedMotion();
  const fieldRef = React.useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = React.useState(false);

  useEffect(() => {
    const el = fieldRef.current;
    if (!el || shouldReduceMotion || typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRevealed(true);
        io.disconnect();
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shouldReduceMotion]);

  return (
    <section
      id="principles"
      className="relative overflow-hidden bg-void text-ivory scroll-mt-24"
      style={{ containerType: "inline-size" }}
    >
      <div style={{ padding: "clamp(30px,4.6cqw,64px) clamp(18px,4cqw,52px)" }}>
        <div
          className="flex items-center font-mono uppercase"
          style={{ gap: 11, fontSize: "clamp(8px,.85cqw,10.5px)", letterSpacing: ".18em", color: "rgba(242,242,240,.7)" }}
        >
          <i className="flex-none" style={{ width: 44, height: 1, background: "var(--color-coral)" }} />
          Operating Principles
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
          How I approach product problems
        </h2>

        <div ref={fieldRef} className="dp-scatter" style={{ marginTop: "clamp(26px,3.6cqw,44px)" }}>
          {HOW_I_WORK_PRINCIPLES.map((p, i) => {
            const spot = SPOTS[i % SPOTS.length];
            return (
              <article
                key={p.title}
                className="dp-pcard"
                style={
                  {
                    "--l": spot.left,
                    "--t": spot.top,
                    "--w": spot.w,
                    opacity: revealed || shouldReduceMotion ? 1 : 0,
                    transform:
                      revealed || shouldReduceMotion ? "none" : "translate3d(0,16px,0)",
                    transition: shouldReduceMotion
                      ? "none"
                      : `opacity .62s var(--ease-out-soft) ${i * STAGGER_MS}ms, transform .62s var(--ease-out-soft) ${i * STAGGER_MS}ms`,
                  } as React.CSSProperties
                }
              >
                <span
                  className="font-mono uppercase text-mute"
                  style={{ fontSize: 10, letterSpacing: ".14em", display: "block", marginBottom: 10 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className="font-display text-ivory"
                  style={{
                    margin: "0 0 8px",
                    fontWeight: 640,
                    fontVariationSettings: '"wdth" 92',
                    fontSize: "clamp(15.5px,1.75cqw,19px)",
                    letterSpacing: "-.02em",
                    lineHeight: 1.25,
                  }}
                >
                  {p.title}
                </h3>
                <p className="m-0 text-mute" style={{ fontSize: "clamp(12.5px,1.15cqw,14.5px)", lineHeight: 1.6 }}>
                  {p.description}
                </p>
                {p.detail && (
                  <div
                    className="mt-auto italic"
                    style={{
                      paddingTop: 12,
                      borderTop: "1px solid var(--rule)",
                      fontSize: "clamp(11.5px,1.05cqw,13px)",
                      lineHeight: 1.6,
                      color: "rgba(242,242,240,.5)",
                    }}
                  >
                    {p.detail}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
