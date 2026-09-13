import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/** Three rows travelling in opposite directions. Scroll velocity drives
 *  speed and skew. The metrics live in the number row, so the strip is the
 *  whole track record and the work begins the moment it ends. */
const ROWS: { kind: "solid" | "out" | "num"; speed: number; items: React.ReactNode[] }[] = [
  {
    kind: "solid",
    speed: -1,
    items: ["MARKETPLACES", "AI", "ZERO TO ONE"],
  },
  {
    kind: "out",
    speed: 1.5,
    items: ["SUBSCRIPTION", "SUPPLY CHAIN", "LOCALISATION"],
  },
  {
    kind: "num",
    speed: -2.1,
    items: [
      <><em>7+</em> YEARS</>,
      <><em>80K+</em> FARMERS</>,
      <><em>12K+</em> SUBSCRIBERS</>,
      <><em>99.9%</em> PAYOUT UPTIME</>,
      <><em>3,200+</em> DAILY ACTIVES</>,
      <><em>2 HRS</em> PAYOUT, WAS 15 DAYS</>,
    ],
  },
];

/** The four claims worth keeping still. The marquee carries all six terms;
 *  these four are the ones a reader should never miss because they were
 *  mid-slide. */
const HEADLINE_METRICS = [
  { value: "80K+", label: "Farmers onboarded" },
  { value: "12K+", label: "Paid subscribers" },
  { value: "2 hrs", label: "Payout, was 15 days" },
  { value: "3,200+", label: "Daily actives" },
];

export default function KineticStrip() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const bands: HTMLElement[] = Array.from(
      section.querySelectorAll<HTMLElement>(".dp-band")
    );
    const teasers: HTMLElement[] = Array.from(
      document.querySelectorAll<HTMLElement>(".dp-teaser-line")
    );
    if (!bands.length) return;

    const offs = bands.map(() => 0);
    let teaserOff = 0;
    let last = window.scrollY;
    let vel = 0;
    let raf: number | null = null;
    let running = false;

    const step = (el: HTMLElement, cur: number, speed: number, half: number, boost: number) => {
      let next = cur - (0.42 + Math.abs(boost) * 0.11) * speed * 0.6;
      if (next <= -half) next += half;
      if (next >= 0) next -= half;
      el.style.transform =
        `translate3d(${next.toFixed(2)}px,0,0) skewX(${(-boost * 0.03).toFixed(2)}deg)`;
      return next;
    };

    const tick = () => {
      const y = window.scrollY;
      vel += (y - last - vel) * 0.14;
      last = y;
      const boost = Math.max(-22, Math.min(22, vel));

      bands.forEach((b, i) => {
        const seg = b.firstElementChild as HTMLElement | null;
        const half = seg?.getBoundingClientRect().width || 1;
        offs[i] = step(b, offs[i], Number(b.dataset.speed) || 1, half, boost);
      });
      teasers.forEach((t) => {
        teaserOff = step(t, teaserOff, 1.5, (t.scrollWidth || 2) / 2, boost);
      });

      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !running) {
            running = true;
            last = window.scrollY;
            raf = requestAnimationFrame(tick);
          } else if (!e.isIntersecting && raf) {
            cancelAnimationFrame(raf);
            raf = null;
            running = false;
          }
        });
      },
      { rootMargin: "160px" }
    );
    io.observe(section);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [shouldReduceMotion]);

  const wordStyle: React.CSSProperties = {
    fontWeight: 800,
    fontVariationSettings: '"wdth" 86',
    letterSpacing: "-.042em",
    fontSize: "clamp(34px,8.2cqw,102px)",
    lineHeight: 0.94,
    paddingRight: ".26em",
  };

  return (
    <section
      ref={sectionRef}
      id="track-record"
      className="relative overflow-hidden bg-void text-ivory"
      style={{
        containerType: "inline-size",
        padding: "clamp(26px,3.8cqw,48px) 0 clamp(28px,4cqw,54px)",
      }}
    >
      {shouldReduceMotion && (
        <div
          className="flex flex-wrap items-baseline"
          style={{ gap: "18px 34px", padding: "0 clamp(18px,4cqw,52px)" }}
        >
          {ROWS.flatMap((row) =>
            row.items.map((item, i) => (
              <span
                key={`${row.kind}-${i}`}
                className={`font-display dp-word-${row.kind}`}
                style={{
                  fontWeight: 800,
                  fontVariationSettings: '"wdth" 86',
                  letterSpacing: "-.03em",
                  fontSize: "clamp(18px,2.4cqw,30px)",
                  lineHeight: 1.1,
                  ...(row.kind === "num" ? { fontVariantNumeric: "tabular-nums" } : null),
                }}
              >
                {item}
              </span>
            ))
          )}
        </div>
      )}

      {!shouldReduceMotion && ROWS.map((row, ri) => (
        <React.Fragment key={ri}>
          {ri > 0 && (
            <div
              aria-hidden
              style={{ height: 1, background: "var(--rule)", marginBlock: "clamp(9px,1.4cqw,16px)" }}
            />
          )}
          <div className="dp-band flex whitespace-nowrap will-change-transform" data-speed={row.speed}>
            {[0, 1].map((copy) => (
              <div className="flex items-center flex-none" key={copy} aria-hidden={copy === 1}>
                {row.items.map((item, i) => (
                  <React.Fragment key={i}>
                    <span
                      className={`font-display dp-word-${row.kind}`}
                      style={{
                        ...wordStyle,
                        ...(row.kind === "num" ? { fontVariantNumeric: "tabular-nums" } : null),
                      }}
                    >
                      {item}
                    </span>
                    {/* a hairline, not a dot: the brief bans decorative dots
                        and middle-dot separators */}
                    <i
                      className="flex-none self-center"
                      style={{
                        width: 1,
                        height: ".46em",
                        background: "rgba(240,151,122,.55)",
                        marginRight: ".26em",
                      }}
                    />
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}
      {/* the marquee is atmosphere; these are the claims, and they hold
          still long enough to be read */}
      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
          gap: "1px",
          background: "var(--rule)",
          borderTop: "1px solid var(--rule)",
          borderBottom: "1px solid var(--rule)",
          marginTop: "clamp(18px,2.6cqw,32px)",
        }}
      >
        {HEADLINE_METRICS.map((m) => (
          <div key={m.label} className="bg-void" style={{ padding: "clamp(14px,2cqw,22px) clamp(16px,2.4cqw,26px)" }}>
            <b
              className="block font-display text-coral"
              style={{ fontWeight: 800, fontSize: 28, letterSpacing: "-.03em", lineHeight: 1 }}
            >
              {m.value}
            </b>
            <span
              className="font-mono uppercase text-mute"
              style={{ fontSize: 10, letterSpacing: ".16em", display: "block", marginTop: 8 }}
            >
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
