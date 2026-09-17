import React from "react";
import { NAV_LINKS } from "../../../data/nav";

interface SiteNavV3Props {
  onNavigate: (path: string) => void;
  onOpenContact?: () => void;
  /** The route being viewed, so the link that leads back to it is marked
   *  rather than offered. Omitted on the homepage, where no nav link is the
   *  current page. */
  currentPath?: string;
}

/**
 * The one navigation bar on the v3 site.
 *
 * Sticky and full width rather than a floating pill: four real destinations,
 * the availability line, one neutral action. It used to live inside the hero,
 * which meant it scrolled away with it; a visitor three sections down had no
 * way back without scrolling to the top.
 */
export default function SiteNavV3({
  onNavigate,
  onOpenContact,
  currentPath,
}: SiteNavV3Props) {
  return (
    <div className="sticky top-0 z-[60] border-b border-white/[.07] bg-void-black/[.72] backdrop-blur-3xl">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-7 px-6 py-3.5">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("/");
          }}
          className="flex items-center gap-2.5 text-sm font-medium text-pure-white"
        >
          <span
            aria-hidden="true"
            className="block size-2.5 rotate-45 rounded-[2px] bg-coral-pulse"
          />
          Deepak Prasad
        </a>

        <div className="hidden items-center gap-0.5 lg:flex">
          {NAV_LINKS.map((link) => {
            const current = currentPath === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                aria-current={current ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.path);
                }}
                className={`rounded-lg px-2.5 py-1.5 text-[13.5px] font-medium transition-colors duration-200 hover:bg-white/5 hover:text-pure-white ${
                  current ? "bg-white/5 text-pure-white" : "text-ash"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        <span className="ml-auto hidden items-center gap-2 font-mono text-xs tracking-[.03em] text-ash xl:inline-flex">
          {/* The one status dot on the site. It marks a real availability
              state, which is the only thing a coloured dot may do here. */}
          <span
            aria-hidden="true"
            className="block size-1.5 rounded-full bg-[#59d499]"
          />
          OPEN TO SENIOR &amp; LEAD ROLES
        </span>

        <button
          type="button"
          onClick={onOpenContact}
          className="ml-auto inline-flex min-h-9 items-center gap-2 rounded-lg bg-mist px-3.5 py-2 text-[13px] font-medium text-iron transition-all duration-200 hover:-translate-y-px hover:bg-white xl:ml-0"
        >
          Get in touch
        </button>
      </nav>
    </div>
  );
}
