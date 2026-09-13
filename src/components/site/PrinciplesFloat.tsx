import React from "react";
import { useReducedMotion } from "framer-motion";
import { HOW_I_WORK_PRINCIPLES } from "../../data/caseStudies";

/** Scattered, not gridded. Each card sits at its own point in the field and
 *  drifts on its own cycle, so the section never reads as rows and columns.
 *  Below the scatter breakpoint they fall back to a readable stack. */
const SPOTS = [
  { left: "1%",  top: "2%",  w: "30%" },
  { left: "36%", top: "19%", w: "31%" },
  { left: "70%", top: "0%",  w: "29%" },
  { left: "11%", top: "57%", w: "31%" },
  { left: "52%", top: "64%", w: "30%" },
];

/* deliberately unequal, so no two cards ever move together */
const DRIFT = [
  { dur: "8.6s", del: "0s",    y0: -4, y1: 9,   r0: -0.4, r1: 0.5 },
  { dur: "11.2s", del: "-2.4s", y0: 6,  y1: -8,  r0: 0.5,  r1: -0.35 },
  { dur: "9.8s",  del: "-4.1s", y0: -7, y1: 6,   r0: -0.25, r1: 0.45 },
  { dur: "12.4s", del: "-1.3s", y0: 8,  y1: -7,  r0: 0.4,  r1: -0.5 },
  { dur: "10.4s", del: "-5.6s", y0: -6, y1: 10,  r0: -0.5, r1: 0.3 },
];

export default function PrinciplesFloat() {
  const shouldReduceMotion = useReducedMotion();

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
        <p
          className="text-mute"
          style={{ fontSize: "clamp(12.5px,1.2cqw,15px)", lineHeight: 1.65, maxWidth: "58ch", margin: "12px 0 0" }}
        >
          Five consistent product principles refined over seven years of building
          across complex B2B ecosystems and high growth consumer apps.
        </p>

        <div className="dp-scatter" style={{ marginTop: "clamp(26px,3.6cqw,44px)" }}>
          {HOW_I_WORK_PRINCIPLES.map((p, i) => {
            const spot = SPOTS[i % SPOTS.length];
            const d = DRIFT[i % DRIFT.length];
            return (
              <article
                key={p.title}
                className="dp-pcard"
                style={
                  {
                    "--l": spot.left,
                    "--t": spot.top,
                    "--w": spot.w,
                    "--dur": d.dur,
                    "--del": d.del,
                    "--y0": `${d.y0}px`,
                    "--y1": `${d.y1}px`,
                    "--r0": `${d.r0}deg`,
                    "--r1": `${d.r1}deg`,
                    animation: shouldReduceMotion
                      ? "none"
                      : "dp-drift var(--dur) ease-in-out var(--del) infinite alternate",
                  } as React.CSSProperties
                }
              >
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
                <p className="m-0 text-mute" style={{ fontSize: 12.5, lineHeight: 1.6 }}>
                  {p.description}
                </p>
                {p.detail && (
                  <div
                    className="mt-auto italic"
                    style={{
                      paddingTop: 12,
                      borderTop: "1px solid var(--rule)",
                      fontSize: 11.5,
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
