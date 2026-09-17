import React from "react";
import { PROOF_METRICS } from "../../../data/homeV3";

/**
 * The track record in one moving line, directly under the hero.
 *
 * The list is rendered twice and the track translates by exactly -50%, so the
 * loop closes on itself with no visible seam. It pauses on hover, because a
 * figure you are trying to read should stop moving when you reach for it.
 */
export default function ProofStrip() {
  const cells = PROOF_METRICS.concat(PROOF_METRICS);

  return (
    <div className="v3-marquee overflow-hidden border-y border-hairline bg-ink py-5">
      <div className="v3-marquee-track">
        {cells.map((metric, i) => (
          <span
            key={`${metric.value}-${i}`}
            /* The second copy is decoration: a screen reader should hear the
               ten figures once, not twenty. */
            aria-hidden={i >= PROOF_METRICS.length ? "true" : undefined}
            className="flex items-baseline gap-2.5 whitespace-nowrap px-[26px]"
          >
            <b className="text-[17px] font-medium tabular-nums text-pure-white">
              {metric.value}
            </b>
            <span className="font-mono text-[10.5px] uppercase text-smoke">
              {metric.label}
            </span>
            <span aria-hidden="true" className="ml-[26px] text-graphite">
              |
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
