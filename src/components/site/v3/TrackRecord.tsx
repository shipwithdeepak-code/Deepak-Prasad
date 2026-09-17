import React from "react";
import { EXPERIENCE_ROLES } from "../../../data/caseStudies";

interface TrackRecordProps {
  onNavigate: (path: string) => void;
}

/**
 * Seven years, five seats, in two columns.
 *
 * A vertical timeline would put a rail down the middle and make five entries
 * look like fifteen. Two columns of equal cards say the same thing in half the
 * scroll, and the mono line at the top and bottom of each card carries the
 * dates and the scale so the prose in between never has to.
 */
export default function TrackRecord({ onNavigate }: TrackRecordProps) {
  return (
    <section
      id="track-record"
      className="border-y border-hairline bg-ink py-[104px]"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-10 grid max-w-[60ch] gap-3.5">
          <p className="font-mono text-[11px] uppercase leading-[.91] tracking-[.8px] text-smoke">
            Track record
          </p>
          <h2 className="text-[clamp(1.6rem,3.2vw,2.25rem)] font-normal leading-[1.17] tracking-[.22px] text-pure-white">
            Seven years, five seats.
          </h2>
        </div>

        <div className="grid gap-3.5 md:grid-cols-2">
          {EXPERIENCE_ROLES.map((role) => (
            <div
              key={`${role.company}-${role.period}`}
              className="v3-key-quiet grid content-start gap-2 rounded-[14px] p-5"
            >
              <span className="font-mono text-[11px] text-smoke">
                {role.period}
              </span>
              <b className="text-[17px] font-medium text-pure-white">
                {role.title}
              </b>
              <span className="text-[13.5px] text-coral-pulse">
                {role.company}
              </span>
              <p className="text-sm leading-relaxed text-ash">
                {role.description}
              </p>
              <span className="font-mono text-[11px] uppercase text-smoke">
                {role.type}
              </span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onNavigate("/about")}
          className="v3-key-quiet mt-6 inline-flex min-h-11 items-center rounded-lg px-[18px] py-3 text-sm font-medium text-ash transition-colors duration-200 hover:text-pure-white"
        >
          The longer version
        </button>
      </div>
    </section>
  );
}
