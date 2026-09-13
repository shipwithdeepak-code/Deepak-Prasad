import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { NAV_LINKS } from "../../data/nav";

interface HeroFullFaceProps {
  onNavigate: (path: string) => void;
  onOpenResumeModal?: () => void;
  onOpenContact?: () => void;
}



const ASSISTANT_LINES = [
  "ask me anything about how I work",
  "what kind of team suits me?",
  "why build AI myself?",
];

/** The teaser: the top of the strip's number row, clipped by the hero's
 *  bottom edge. It previews the metrics rather than repeating the words the
 *  strip's second row already carries. */
const TEASER_WORDS = ["80K+ FARMERS", "12K+ SUBSCRIBERS", "2 HRS PAYOUT"];

export default function HeroFullFace({
  onNavigate,
  onOpenResumeModal,
  onOpenContact,
}: HeroFullFaceProps) {
  const shouldReduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement | null>(null);
  const [typed, setTyped] = useState("");

  /* the carried light: a spring-followed glow, so it lags and settles
     rather than snapping to the pointer */
  useEffect(() => {
    const el = heroRef.current;
    if (!el || shouldReduceMotion) return;
    let tx = 60, ty = 40, cx = 60, cy = 40;
    let raf: number | null = null;

    const tick = () => {
      cx += (tx - cx) * 0.11;
      cy += (ty - cy) * 0.11;
      el.style.setProperty("--lx", `${cx.toFixed(2)}%`);
      el.style.setProperty("--ly", `${cy.toFixed(2)}%`);
      if (Math.abs(tx - cx) > 0.08 || Math.abs(ty - cy) > 0.08) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = null;
      }
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [shouldReduceMotion]);

  /* the assistant line, typing and deleting */
  useEffect(() => {
    if (shouldReduceMotion) {
      setTyped(ASSISTANT_LINES[0]);
      return;
    }
    let qi = 0, ci = 0, deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const loop = () => {
      const q = ASSISTANT_LINES[qi % ASSISTANT_LINES.length];
      if (!deleting) {
        ci++;
        setTyped(q.slice(0, ci));
        if (ci >= q.length) {
          deleting = true;
          timer = setTimeout(loop, 2100);
          return;
        }
      } else {
        ci--;
        setTyped(q.slice(0, ci));
        if (ci <= 0) {
          deleting = false;
          qi++;
          timer = setTimeout(loop, 250);
          return;
        }
      }
      timer = setTimeout(loop, deleting ? 18 : 54);
    };
    timer = setTimeout(loop, 400);
    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="dp-hero relative isolate overflow-hidden bg-void text-ivory
                 flex flex-col justify-end cursor-crosshair"
      style={{
        containerType: "inline-size",
        minHeight: "clamp(620px, 64cqw, 760px)",
        paddingBottom: "calc(clamp(30px,3.9cqw,46px) + clamp(14px,1.8cqw,22px))",
      }}
    >
      {/* the orbit, the one ring the accent is allowed */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[41%] z-[1] aspect-square rounded-full pointer-events-none"
        style={{
          width: "86cqw",
          transform: "translate(-50%,-50%)",
          border: "1px dotted rgba(240,151,122,.26)",
          animation: shouldReduceMotion ? "none" : "dp-spin 68s linear infinite",
        }}
      />

      {/* the name, behind him */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[25%] z-[2] pointer-events-none select-none"
        style={{ transform: "translateX(-50%)" }}
      >
        <p
          className="dp-chrome-text font-display m-0 whitespace-nowrap"
          style={{
            fontWeight: 900,
            fontVariationSettings: '"wdth" 112',
            letterSpacing: "-.055em",
            lineHeight: 0.78,
            fontSize: "23cqw",
          }}
        >
          Deepak
        </p>
      </div>

      {/* the page ground, cut to his outline, above the letters and below
          the photograph: nothing can surface on his face */}
      <div
        aria-hidden
        className="dp-figure-mask dp-hero-portrait absolute z-[2] overflow-hidden pointer-events-none bg-void"
        style={{ right: "2%", top: 0, width: "46cqw", height: "84%" }}
      />

      {/* the photograph, masked to the same outline. full hair, both sides
          of the face, and a soft edge that dissolves into the page */}
      <figure
        className="dp-hero-portrait absolute z-[3] overflow-hidden pointer-events-none m-0"
        style={{ right: "2%", top: 0, width: "46cqw", height: "84%" }}
      >
        <img
          src="/deepak_portrait_4x5.jpg"
          alt="Deepak Prasad"
          className="dp-figure-mask block w-full h-full object-cover"
          style={{
            objectPosition: "50% 14%",
            filter: "grayscale(1) contrast(1.18) brightness(1.04)",
          }}
        />
      </figure>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[4] pointer-events-none"
        style={{
          height: "30%",
          background: "linear-gradient(180deg,transparent,var(--color-void) 86%)",
        }}
      />

      {!shouldReduceMotion && (
        <div
          aria-hidden
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            background:
              "radial-gradient(circle clamp(150px,22cqw,280px) at var(--lx,60%) var(--ly,40%)," +
              "rgba(255,255,255,.1),rgba(255,255,255,.025) 46%,transparent 74%)",
          }}
        />
      )}

      {/* nav */}
      <nav
        className="absolute inset-x-0 top-0 z-[9] flex items-center justify-between gap-4"
        style={{ padding: "clamp(13px,2.2cqw,24px) clamp(15px,2.5cqw,32px)" }}
      >
        <span
          className="font-mono uppercase text-ivory"
          style={{ fontSize: "clamp(8.5px,.88cqw,11px)", letterSpacing: ".24em" }}
        >
          Deepak Prasad
        </span>
        <div
          className="hidden sm:flex font-medium"
          style={{ gap: "clamp(9px,1.6cqw,22px)", fontSize: "clamp(10.5px,1.08cqw,13.5px)" }}
        >
          {NAV_LINKS.map((n) => (
            <button
              key={n.label}
              type="button"
              onClick={() => onNavigate(n.path)}
              className="dp-navlink relative pb-0.5 cursor-pointer"
              style={{ color: "rgba(242,242,240,.8)" }}
            >
              {n.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onOpenResumeModal}
          className="font-mono uppercase rounded-full border cursor-pointer
                     transition-[transform,border-color] duration-200 active:scale-[.97]
                     hover:border-coral"
          style={{
            fontSize: "clamp(8px,.85cqw,10.5px)",
            letterSpacing: ".16em",
            color: "var(--color-ivory)",
            borderColor: "rgba(242,242,240,.32)",
            padding: "6px 13px",
          }}
        >
          Resume
        </button>
      </nav>

      {/* the same routes for a thumb: the desktop row is hidden below 640px,
          and until now nothing replaced it on this page */}
      <nav
        className="sm:hidden absolute inset-x-0 z-[9] flex items-center justify-center flex-wrap font-mono uppercase"
        style={{
          top: "clamp(44px,7cqw,64px)",
          gap: "clamp(4px,2cqw,14px)",
          fontSize: 11,
          letterSpacing: ".14em",
        }}
        aria-label="Sections"
      >
        {NAV_LINKS.map((nItem) => (
          <button
            key={nItem.label}
            type="button"
            onClick={() => onNavigate(nItem.path)}
            className="cursor-pointer"
            style={{
              color: "rgba(242,242,240,.78)",
              minHeight: 44,
              padding: "0 10px",
              background: "none",
              border: 0,
            }}
          >
            {nItem.label}
          </button>
        ))}
      </nav>

      {/* the floor: headline left, support right */}
      <div
        className="dp-hero-floor relative z-[8] grid items-end"
        style={{
          padding: "0 clamp(15px,2.5cqw,32px)",
          gridTemplateColumns: "minmax(0,1.15fr) minmax(0,.85fr)",
          gap: "clamp(14px,2.4cqw,34px)",
        }}
      >
        <div>
          <span
            className="flex items-center font-mono uppercase"
            style={{
              gap: "11px",
              fontSize: "clamp(8px,.85cqw,10.5px)",
              letterSpacing: ".16em",
              color: "rgba(242,242,240,.72)",
            }}
          >
            <i
              className="block flex-none origin-left"
              style={{
                width: 44,
                height: 1,
                background: "var(--color-coral)",
                animation: shouldReduceMotion ? "none" : "dp-bar-in .8s var(--ease-out-soft) both",
              }}
            />
            <span className="block flex-none rounded-full bg-live" style={{ width: 6, height: 6 }} />
            Available for senior and lead product roles
          </span>

          <h1
            className="font-display text-ivory"
            style={{
              fontWeight: 640,
              fontVariationSettings: '"wdth" 94',
              letterSpacing: "-.022em",
              lineHeight: 1.04,
              margin: "clamp(11px,1.8cqw,20px) 0 0",
              fontSize: "clamp(25px,4.55cqw,58px)",
              animation: shouldReduceMotion ? "none" : "dp-rise .85s var(--ease-out-soft)",
            }}
          >
            <span className="block">I build products for</span>
            <span className="block">the people software</span>
            <span className="block">
              usually{" "}
              <i
                className="font-display not-italic"
                style={{
                  fontStyle: "italic",
                  fontWeight: 600,
                  letterSpacing: "-.03em",
                  color: "var(--color-coral)",
                }}
              >
                ignores
              </i>
              .
            </span>
          </h1>
        </div>

        <div>
          <p
            className="text-mute"
            style={{
              fontSize: "clamp(11.5px,1.18cqw,14.5px)",
              lineHeight: 1.62,
              maxWidth: "34ch",
            }}
          >
            Senior product manager, seven years across marketplaces, AI and
            subscription products. Now building AI tools of my own.
          </p>
          <div
            className="flex font-semibold"
            style={{
              gap: "clamp(11px,1.7cqw,20px)",
              fontSize: "clamp(11px,1.12cqw,14px)",
              marginTop: "clamp(9px,1.5cqw,15px)",
            }}
          >
            <button
              type="button"
              onClick={() => onNavigate("/work")}
              className="dp-link dp-link-primary text-ivory cursor-pointer"
            >
              See the work
            </button>
            <button
              type="button"
              onClick={onOpenContact}
              className="dp-link cursor-pointer"
              style={{ color: "rgba(242,242,240,.48)" }}
            >
              Let us talk
            </button>
          </div>

          <div
            className="flex items-center gap-2 font-mono text-ivory"
            style={{
              border: "1px solid rgba(240,151,122,.3)",
              background: "rgba(10,10,11,.6)",
              backdropFilter: "blur(6px)",
              padding: "10px 12px",
              fontSize: "clamp(9.5px,1.02cqw,12.5px)",
              marginTop: "clamp(11px,1.7cqw,16px)",
            }}
          >
            <b className="text-coral">&gt;</b>
            <span className="whitespace-nowrap overflow-hidden" style={{ minHeight: "1.3em" }}>
              {typed}
            </span>
            <span
              className="inline-block bg-coral align-[-2px]"
              style={{
                width: 6,
                height: "1.02em",
                animation: shouldReduceMotion ? "none" : "dp-caret .9s steps(1) infinite",
              }}
            />
          </div>
        </div>
      </div>

      {/* the strip, beginning inside the hero */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[7] overflow-hidden pointer-events-none"
        style={{ height: "clamp(30px,3.9cqw,46px)", borderTop: "1px solid var(--rule)" }}
      >
        <div
          className="dp-teaser-line flex whitespace-nowrap"
          style={{ paddingTop: "clamp(5px,.7cqw,9px)" }}
        >
          {[...TEASER_WORDS, ...TEASER_WORDS].map((w, i) => (
            <React.Fragment key={i}>
              <span
                className="font-display"
                style={{
                  fontWeight: 800,
                  fontVariationSettings: '"wdth" 86',
                  letterSpacing: "-.042em",
                  fontSize: "clamp(34px,8.2cqw,102px)",
                  lineHeight: 0.94,
                  paddingRight: ".26em",
                  color: "transparent",
                  WebkitTextStroke: "1.1px rgba(242,242,240,.22)",
                }}
              >
                {w}
              </span>
              <i
                className="flex-none self-center"
                style={{
                  width: 1,
                  height: ".46em",
                  background: "rgba(240,151,122,.4)",
                  marginRight: ".26em",
                }}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
