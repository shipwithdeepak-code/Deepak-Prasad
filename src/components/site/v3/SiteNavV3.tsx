import React from "react";

interface SiteNavV3Props {
  onNavigate?: (path: string) => void;
  onOpenContact?: () => void;
  onOpenResumeModal?: () => void;
  /** The route being viewed. Omitted on the homepage. */
  currentPath?: string;
}

/**
 * Minimal Utility Navigation Layer
 *
 * Implements the approved minimal floating utility action:
 * - Top-right contains strictly two actions: 'Resume' and 'Get in touch'
 * - 'Resume' is a quiet, text-based navigation action with min 44px touch target
 * - 'Get in touch' is a slightly more prominent, restrained bordered action
 * - Positioned as a transparent overlay over Hero on homepage, sticky on subpages
 * - Accessible focus rings in warm coral (#F0977A)
 */
export default function SiteNavV3({
  onNavigate,
  onOpenContact,
  onOpenResumeModal,
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
            className="group pointer-events-auto inline-flex min-h-[44px] items-center gap-2 text-xs font-mono tracking-widest text-[#9E9E98] hover:text-[#F5F5F0] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F0977A]"
          >
            <span aria-hidden="true" className="text-[#F0977A]">←</span>
            <span>HOME</span>
          </button>
        ) : (
          <div className="size-0" aria-hidden="true" />
        )}

        {/* Top-Right Navbar CTA Group: Exactly 'Resume' and 'Get in touch' */}
        <div className="pointer-events-auto flex items-center gap-3 sm:gap-4">
          {/* Action 1: Resume (Quiet, text-based navigation action) */}
          <a
            href="/Deepak_Prasad_Senior_Product_Manager_Resume.pdf"
            download="Deepak_Prasad_Senior_Product_Manager_Resume.pdf"
            onClick={(e) => {
              if (onOpenResumeModal) {
                e.preventDefault();
                onOpenResumeModal();
              }
            }}
            className="inline-flex min-h-[44px] items-center justify-center px-2.5 py-1.5 text-xs sm:text-[13px] font-medium text-[#9E9E98] hover:text-[#FAF7F0] focus-visible:text-[#F0977A] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#F0977A] rounded cursor-pointer select-none"
            aria-label="Resume (view or download PDF)"
          >
            Resume
          </a>

          {/* Action 2: Get in touch (Restrained, bordered utility action) */}
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex min-h-[44px] items-center justify-center rounded-[5px] border border-white/[0.18] bg-transparent hover:bg-white/[0.06] hover:border-white/[0.32] px-3.5 py-1.5 text-xs sm:text-[13px] font-medium text-[#F5F5F0] hover:text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F0977A]/60 focus-visible:border-[#F0977A] cursor-pointer select-none"
            aria-label="Get in touch"
          >
            Get in touch
          </button>
        </div>
      </div>
    </header>
  );
}
