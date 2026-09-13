import {useCallback, useEffect, useRef, useState} from 'react';
import {CONFIDENCE_THRESHOLD, SUGGESTED, retrieve, type Entry} from '~/data/dipa';

interface Turn {
  id: number;
  question: string;
  entry: Entry | null;
}

/**
 * Ask Dīpa — portfolio intelligence, not an AI gimmick.
 *
 * An accessible modal dialog: focus is trapped while open, Escape closes,
 * focus returns to the trigger, and the transcript is a live region so
 * answers are announced to screen readers.
 */
export function Dipa({open, onClose}: {open: boolean; onClose: () => void}) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [value, setValue] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const nextId = useRef(0);

  const ask = useCallback((question: string) => {
    const q = question.trim();
    if (!q) return;
    const matches = retrieve(q);
    const best = matches[0];
    const entry = best && best.score >= CONFIDENCE_THRESHOLD ? best.entry : null;
    setTurns((t) => [...t, {id: nextId.current++, question: q, entry}]);
    setValue('');
  }, []);

  // open/close lifecycle: remember trigger, lock scroll, focus the input
  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = '';
      restoreRef.current?.focus?.();
    };
  }, [open]);

  // Escape to close + focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const root = dialogRef.current;
      if (!root) return;
      const focusable = root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [open, onClose]);

  // keep the newest answer in view
  useEffect(() => {
    if (turns.length === 0) return;
    logRef.current?.scrollTo({top: logRef.current.scrollHeight, behavior: 'smooth'});
  }, [turns]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* scrim */}
      <button
        type="button"
        aria-label="Close Ask Dīpa"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-fg/25 backdrop-blur-[2px]"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dipa-title"
        aria-describedby="dipa-desc"
        className="relative flex max-h-[88vh] w-full max-w-[42rem] flex-col border border-line-strong bg-bg shadow-2xl sm:max-h-[80vh]"
      >
        {/* header */}
        <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <h2 id="dipa-title" className="flex items-center gap-2 text-[1.0625rem] font-semibold">
              Ask Dīpa
              <span className="label !text-[9.5px] border border-line px-1.5 py-0.5">
                portfolio intelligence
              </span>
            </h2>
            <p id="dipa-desc" className="mt-1 text-[13px] leading-relaxed text-muted">
              Answers are retrieved from this portfolio’s documented work — not generated.
              If it isn’t documented, Dīpa says so.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="-mr-2 -mt-1 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center text-muted transition-colors hover:text-fg"
          >
            <span className="sr-only">Close</span>
            <span aria-hidden="true" className="text-xl leading-none">
              ×
            </span>
          </button>
        </div>

        {/* transcript */}
        <div ref={logRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {turns.length === 0 ? (
            <div>
              <p className="label mb-3">Try asking</p>
              <ul className="flex flex-col gap-2">
                {SUGGESTED.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => ask(s)}
                      className="w-full cursor-pointer border border-line bg-surface px-3.5 py-3 text-left text-[14px] leading-snug transition-colors duration-150 hover:border-accent hover:text-accent"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div aria-live="polite" className="flex flex-col gap-7">
              {turns.map((t) => (
                <div key={t.id}>
                  <p className="flex gap-2.5 text-[14px] font-medium">
                    <span aria-hidden="true" className="text-accent">
                      ›
                    </span>
                    {t.question}
                  </p>

                  <div className="mt-3 border-l-2 border-accent-line pl-4">
                    {t.entry ? (
                      <>
                        {t.entry.answer.map((para, i) => (
                          <p
                            key={i}
                            className="mb-3 text-[14.5px] leading-[1.65] text-muted last:mb-0"
                          >
                            {para}
                          </p>
                        ))}
                        <p className="label mt-3 !text-[10px]">Source — {t.entry.source}</p>
                        {t.entry.link && (
                          <a
                            href={`#/work/${t.entry.link.slug}`}
                            onClick={onClose}
                            className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent hover:underline"
                          >
                            {t.entry.link.label} <span aria-hidden="true">→</span>
                          </a>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="text-[14.5px] leading-[1.65] text-muted">
                          That isn’t documented in this portfolio, so I won’t guess at it.
                          Dīpa only answers from Deepak’s written case studies, experience
                          and operating principles.
                        </p>
                        <p className="mt-3 text-[14.5px] leading-[1.65] text-muted">
                          I can cover his AI work, subscription and growth, marketplace and
                          payments systems, connected products, leadership model, or career
                          history. For anything else, the best route is a direct conversation.
                        </p>
                        <a
                          href="mailto:shipwithdeepak@gmail.com"
                          className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent hover:underline"
                        >
                          Email Deepak <span aria-hidden="true">→</span>
                        </a>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(value);
          }}
          className="flex items-center gap-2 border-t border-line px-5 py-3.5 sm:px-6"
        >
          <label htmlFor="dipa-input" className="sr-only">
            Ask a question about Deepak’s work
          </label>
          <input
            ref={inputRef}
            id="dipa-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ask about the work…"
            autoComplete="off"
            className="min-h-[44px] w-full min-w-0 bg-transparent text-[15px] text-fg outline-none placeholder:text-muted"
          />
          <button
            type="submit"
            disabled={!value.trim()}
            className="inline-flex h-11 shrink-0 cursor-pointer items-center gap-1.5 bg-accent px-4 text-[14px] font-medium text-on-accent transition-opacity duration-150 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            Ask <span aria-hidden="true">↗</span>
          </button>
        </form>
      </div>
    </div>
  );
}
