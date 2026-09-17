import React from "react";

/**
 * The parts every v3 page repeats.
 *
 * These exist so a heading, a panel and a chip are the same object on five
 * pages rather than five near-misses. Nothing here holds content; each page
 * passes its own.
 */

export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="mb-12 grid max-w-[62ch] gap-3.5">
      {eyebrow && (
        <p className="font-mono text-[11px] uppercase leading-[.91] tracking-[.8px] text-smoke">
          {eyebrow}
        </p>
      )}
      <h1 className="text-[clamp(2rem,4.2vw,3rem)] font-normal leading-[1.14] tracking-[.22px] text-pure-white">
        {title}
      </h1>
      {lede && (
        <p className="text-[17px] leading-relaxed text-ash">{lede}</p>
      )}
      {children}
    </header>
  );
}

/** A section heading below the page title. */
export function SectionHeader({
  eyebrow,
  title,
  lede,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="mb-10 grid max-w-[60ch] gap-3.5">
      {eyebrow && (
        <p className="font-mono text-[11px] uppercase leading-[.91] tracking-[.8px] text-smoke">
          {eyebrow}
        </p>
      )}
      <h2 className="text-[clamp(1.6rem,3.2vw,2.25rem)] font-normal leading-[1.17] tracking-[.22px] text-pure-white">
        {title}
      </h2>
      {lede && <p className="text-base leading-relaxed text-ash">{lede}</p>}
    </div>
  );
}

/** The key-shadow frame. `loud` is the full stack, the default is the quiet
 *  one; a page of loud frames reads as a spreadsheet. */
export function Panel({
  loud,
  className = "",
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { loud?: boolean }) {
  return (
    <div
      className={`${loud ? "v3-key" : "v3-key-quiet"} rounded-2xl ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

/** A compact mono tag. Quiet by construction: it annotates, never competes. */
export function Tag({ children }: { children?: React.ReactNode; key?: React.Key }) {
  return (
    <span className="rounded-md bg-graphite px-[7px] py-1 font-mono text-[10.5px] tracking-[.05em] text-mist">
      {children}
    </span>
  );
}

/**
 * A slot for an image that does not exist yet.
 *
 * It states what belongs there rather than rendering grey noise, so the page
 * can be reviewed with the images missing and the asset list can be read off
 * the page itself. Drop the real file in and replace the slot; nothing else
 * about the layout changes, because the slot holds the final aspect ratio.
 */
export function ImageSlot({
  label,
  ratio = "16 / 9",
  className = "",
}: {
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={`v3-slot grid place-items-center overflow-hidden rounded-2xl px-6 text-center ${className}`}
      style={{ aspectRatio: ratio }}
    >
      <span className="grid gap-1.5">
        <span className="font-mono text-[10px] uppercase tracking-[.8px] text-coral-pulse">
          Image to come
        </span>
        <span className="font-mono text-[11px] leading-relaxed text-smoke">
          {label}
        </span>
      </span>
    </div>
  );
}
