import React, { useState } from "react";
import { HOW_I_WORK_PRINCIPLES } from "../../../data/caseStudies";

/**
 * Five principles around one breathing orb.
 *
 * The principles flank the orb rather than stacking under a heading, so the
 * section has a centre to rest on. Pressing one opens the longer form of it
 * underneath: the short line is the claim, the detail is the argument, and
 * putting both on screen at once would make ten paragraphs of it.
 */
export default function HowIWork() {
  const [open, setOpen] = useState<string | null>(null);

  const column = (principles: typeof HOW_I_WORK_PRINCIPLES) => (
    <div className="grid gap-3.5">
      {principles.map((principle) => {
        const isOpen = open === principle.number;
        return (
          <button
            key={principle.number}
            type="button"
            aria-expanded={isOpen}
            onClick={() => setOpen(isOpen ? null : principle.number)}
            className="v3-principle rounded-[14px] bg-transparent px-[18px] py-4 text-left"
          >
            <b className="block text-[15.5px] font-medium text-pure-white">
              {principle.title}
            </b>
            <span className="mt-1.5 block text-[13px] leading-normal text-smoke">
              {principle.description}
            </span>
            {isOpen && (
              <span className="v3-rise mt-3 block border-t border-hairline pt-3 text-[13px] leading-relaxed text-ash">
                {principle.detail}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <section id="principles" className="v3-atmos v3-atmos-mint py-[104px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="mb-10 grid max-w-[60ch] gap-3.5">
          <p className="font-mono text-[11px] uppercase leading-[.91] tracking-[.8px] text-smoke">
            How I work
          </p>
          <h2 className="text-[clamp(1.6rem,3.2vw,2.25rem)] font-normal leading-[1.17] tracking-[.22px] text-pure-white">
            Five rules I have actually been held to.
          </h2>
          <p className="text-base leading-relaxed text-ash">
            Press one to open the argument behind it.
          </p>
        </div>

        <div className="grid items-start gap-4 lg:grid-cols-2">
          {column(HOW_I_WORK_PRINCIPLES.slice(0, 3))}
          {column(HOW_I_WORK_PRINCIPLES.slice(3))}
        </div>
      </div>
    </section>
  );
}
