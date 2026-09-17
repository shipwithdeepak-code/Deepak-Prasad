import React from "react";

interface BreathingOrbProps {
  /** Stage size in pixels. The orb is inset inside it, the rings are the
   *  stage edge, so this is the full diameter including the outer ring. */
  size?: number;
  className?: string;
}

/**
 * One coral orb, breathing.
 *
 * Twelve seconds per breath, held at the top of the curve for a third of the
 * cycle: slow enough that it reads as respiration rather than a pulse, which
 * is the difference between a living object and a notification badge. It is
 * built from a gradient and two rings, so it costs nothing to run and it is
 * still on the page when WebGL is unavailable or motion is reduced.
 *
 * Deliberately not in the hero. The hero already has a moving surface behind
 * it; a second breathing thing there would split the eye. This is for the
 * sections that are otherwise still.
 */
export default function BreathingOrb({ size = 230, className }: BreathingOrbProps) {
  return (
    <div
      aria-hidden="true"
      className={`v3-orb-stage relative grid place-items-center ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <span className="v3-orb-ring absolute inset-0 rounded-full" />
      <span className="v3-orb-ring-inner absolute inset-[13px] rounded-full" />
      <span className="v3-orb absolute inset-[26px] rounded-full" />
    </div>
  );
}
