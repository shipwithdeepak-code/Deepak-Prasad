import React from "react";

interface SiteNavV3Props {
  onNavigate?: (path: string) => void;
  onOpenContact?: () => void;
  /** The route being viewed. Omitted on the homepage. */
  currentPath?: string;
}

/**
 * Minimal Utility Navigation Layer
 *
 * Implements the minimal floating utility action:
 * - Removed branding/logo, nav links, and availability pill from the header
 * - Positioned as a transparent, borderless overlay over the Hero on homepage
 * - Retains only the restrained 'Get in touch' action at the top-right
 * - Allows the Hero's obsidian background and shader field to extend continuously behind it
 */
export default function SiteNavV3({
  onNavigate,
  onOpenContact,
  currentPath,
}: SiteNavV3Props) {
  const isSubpage = Boolean(currentPath && currentPath !== "/");

  return (
    <header
      className={`w-full ${
        isSubpage
          ? "sticky top-0 z-50 border-b border-white/[0.06] bg-[#0A0A0B]/90 backdrop-blur-sm"
          : "absolute top-0 left-0 right-0 z-50 pointer-events-none bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 sm:h-20 max-w-[1360px] items-center justify-between px-4 sm:px-8 lg:px-14">
        {/* Subpage Back Link: Only rendered on subpages, never on homepage */}
        {isSubpage && onNavigate ? (
          <button
            type="button"
            onClick={() => onNavigate("/")}
            className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#9E9E98] hover:text-[#F5F5F0] transition-colors cursor-pointer"
          >
            <span aria-hidden="true" className="text-[#F0977A]">←</span>
            <span>HOME</span>
          </button>
        ) : (
          <div className="size-0" aria-hidden="true" />
        )}

        {/* Top-Right Action: Restrained, compact 'Get in touch' */}
        <button
          type="button"
          onClick={onOpenContact}
          className="pointer-events-auto inline-flex items-center justify-center rounded-[5px] border border-white/[0.18] bg-transparent hover:bg-white/[0.06] hover:border-white/[0.32] px-3.5 py-1.5 text-xs font-medium text-[#F5F5F0] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0977A]/60 focus-visible:border-[#F0977A] cursor-pointer"
        >
          Get in touch
        </button>
      </div>
    </header>
  );
}
