import React from "react";

/**
 * The approved restrained proof strip directly under the hero.
 * Contains only verified domain categories without unverified metrics or GMV claims.
 */
export default function ProofStrip() {
  const items = [
    "Marketplaces",
    "Connected Hardware",
    "Applied AI",
    "0→1 Builds",
  ];

  return (
    <div className="border-y border-white/[0.06] bg-[#07080a] py-4 px-6">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono tracking-widest text-[#9E9E98] uppercase">
        {items.map((item, index) => (
          <React.Fragment key={item}>
            {index > 0 && (
              <span aria-hidden="true" className="text-white/20 select-none">
                ·
              </span>
            )}
            <span className="text-[#E5E5DF]/75 hover:text-[#F5F5F0] transition-colors">
              {item}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
