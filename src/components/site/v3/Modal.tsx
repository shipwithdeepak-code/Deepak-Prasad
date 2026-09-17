import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  /** One quiet line under the title. Optional; most dialogs do not need one. */
  subtitle?: string;
  /** Tailwind max-width class. Dialogs that hold a document need more room
   *  than dialogs that hold a form. */
  width?: string;
  children: React.ReactNode;
  /** Rendered at the bottom of the dialog, outside the scrolling body, so a
   *  long document never pushes its own actions out of reach. */
  footer?: React.ReactNode;
  /** Take the full allowed height rather than sizing to content. For a
   *  dialog holding a viewer, where a short first paint then a tall one is
   *  worse than simply being tall. */
  fill?: boolean;
  /** Drop the body padding, for content that manages its own. */
  flush?: boolean;
}

/**
 * The one dialog shell.
 *
 * There were two dialogs on this site and they disagreed about everything:
 * the overlay, the radius, where the close button sat, and whether Escape
 * worked. This owns all of that, so a dialog only has to bring its content.
 *
 * It closes on Escape and on the backdrop, locks the page behind it, moves
 * focus in on open and returns it on close, and traps Tab inside while it is
 * up. A dialog that leaks focus to the page underneath is worse than no
 * dialog, because the keyboard goes somewhere the eye cannot follow.
 */
export default function Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  width = "max-w-xl",
  children,
  footer,
  fill,
  flush,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    restoreTo.current = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const focusables = (): HTMLElement[] => {
      const found = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const out: HTMLElement[] = [];
      if (!found) return out;
      for (let i = 0; i < found.length; i += 1) {
        const el = found[i];
        // offsetParent is null for anything display:none, which is how the
        // hidden half of a toggled panel stays out of the tab order.
        if (el.offsetParent !== null) out.push(el);
      }
      return out;
    };

    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = overflow;
      restoreTo.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[300] flex items-center justify-center bg-void-black/80 p-4 backdrop-blur-xl sm:p-6"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={`v3-key v3-rise flex w-full ${width} ${
          fill ? "h-[min(90vh,940px)]" : "max-h-[min(88vh,900px)]"
        } cursor-default flex-col overflow-hidden rounded-2xl bg-ink text-left`}
      >
        <div className="flex items-start justify-between gap-4 border-b border-hairline px-6 py-5">
          <div className="grid gap-1">
            <h2 className="text-xl font-normal text-pure-white">{title}</h2>
            {subtitle && (
              <p className="font-mono text-[10.5px] uppercase tracking-[.05em] text-smoke">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="-mr-1.5 -mt-1 rounded-lg p-2 text-smoke transition-colors duration-200 hover:bg-white/5 hover:text-pure-white"
          >
            <X className="size-[18px]" strokeWidth={1.7} aria-hidden="true" />
          </button>
        </div>

        <div
          className={`min-h-0 flex-1 overflow-y-auto ${
            flush ? "" : "px-6 py-6"
          }`}
        >
          {children}
        </div>

        {footer && (
          <div className="border-t border-hairline bg-white/[.015] px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
