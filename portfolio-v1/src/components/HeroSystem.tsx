/**
 * HeroSystem — the hero "artifact".
 *
 * Deliberately not a brain, orb, sphere or abstract gradient. It is a schematic
 * of how the work actually operates: a user meets a product, the product is fed
 * by a data/AI loop, that produces a decision, which produces an outcome.
 *
 * Built from DOM + hairlines rather than an SVG viewBox so it reflows cleanly
 * from 375px to desktop without scaling type down.
 */

const CHAIN = [
  {k: 'USER', note: 'Arrives with a problem, not a spec'},
  {k: 'PRODUCT', note: 'Surface, workflow, boundaries'},
] as const;

const TAIL = [
  {k: 'DECISION', note: 'What the system should do'},
  {k: 'OUTCOME', note: 'What measurably changed'},
] as const;

function Node({
  k,
  note,
  strong = false,
}: {
  k: string;
  note: string;
  strong?: boolean;
}) {
  return (
    <div
      className={`border px-4 py-3 ${
        strong ? 'border-accent-line bg-accent-soft' : 'border-line bg-surface'
      }`}
    >
      <p
        className={`font-mono text-[12px] font-medium tracking-[0.12em] ${
          strong ? 'text-accent' : 'text-fg'
        }`}
      >
        {k}
      </p>
      <p className="mt-1 text-[12.5px] leading-snug text-muted">{note}</p>
    </div>
  );
}

function Connector({label}: {label?: string}) {
  return (
    <div aria-hidden="true" className="flex items-center gap-2 py-1.5 pl-4">
      <span className="block h-4 w-px bg-line-strong" />
      {label && <span className="label !text-[9.5px]">{label}</span>}
    </div>
  );
}

export function HeroSystem() {
  return (
    <figure className="m-0 border border-line bg-surface-2/60 p-4 sm:p-6">
      <figcaption className="mb-4 flex items-baseline justify-between gap-3 border-b border-line pb-3">
        <span className="label">fig. 01 — operating model</span>
        <span className="label !text-[9.5px] !tracking-[0.1em]">how the work runs</span>
      </figcaption>

      <div>
        <Node {...CHAIN[0]} />
        <Connector />
        <Node {...CHAIN[1]} />
        <Connector label="informs" />

        {/* DATA ↔ AI — the bidirectional pair */}
        <div className="border border-accent-line bg-accent-soft p-3">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <div className="min-w-0">
              <p className="font-mono text-[12px] font-medium tracking-[0.12em] text-accent">
                DATA
              </p>
              <p className="mt-1 text-[12px] leading-snug text-muted">
                Behaviour, telemetry, context
              </p>
            </div>
            <span
              aria-hidden="true"
              className="px-1 font-mono text-[15px] leading-none text-accent"
            >
              ↔
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[12px] font-medium tracking-[0.12em] text-accent">
                AI
              </p>
              <p className="mt-1 text-[12px] leading-snug text-muted">
                Bounded by product rules
              </p>
            </div>
          </div>
          <p className="mt-3 border-t border-accent-line/40 pt-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-accent">
            each constrains the other
          </p>
        </div>

        <Connector label="produces" />
        <Node {...TAIL[0]} />
        <Connector />
        <Node {...TAIL[1]} strong />
      </div>

      {/* screen-reader summary of the schematic */}
      <p className="sr-only">
        Diagram: a user meets the product; the product is informed by a bidirectional
        loop between data and AI, where each constrains the other; that produces a
        decision, which produces a measurable outcome.
      </p>
    </figure>
  );
}
