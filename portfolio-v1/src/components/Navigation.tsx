import {useEffect, useRef, useState} from 'react';
import {IDENTITY} from '~/data/profile';

const LINKS = [
  {id: 'work', label: 'Work'},
  {id: 'thinking', label: 'Thinking'},
  {id: 'leadership', label: 'Leadership'},
  {id: 'experience', label: 'Experience'},
  {id: 'contact', label: 'Contact'},
];

interface Props {
  onAskDipa: () => void;
}

export function Navigation({onAskDipa}: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close on Escape and restore focus to the trigger — accessible disclosure.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector<HTMLElement>('a,button')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  // Section ids double as routes, so one href works from any page.
  const hrefFor = (id: string) => `#${id}`;

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>

      <header
        className={`sticky top-0 z-40 bg-bg/85 backdrop-blur-sm transition-colors duration-200 ${
          scrolled ? 'border-b border-line' : 'border-b border-transparent'
        }`}
      >
        <nav aria-label="Primary" className="shell flex h-16 items-center justify-between gap-4">
          <a
            href="#/"
            className="group flex items-baseline gap-2.5 whitespace-nowrap"
            aria-label={`${IDENTITY.name} — home`}
          >
            <span className="text-[0.9375rem] font-semibold tracking-tight">
              {IDENTITY.name}
            </span>
            <span className="label hidden !text-[10px] sm:inline">Product Systems</span>
          </a>

          {/* desktop */}
          <div className="hidden items-center gap-6 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={hrefFor(l.id)}
                className="inline-flex min-h-[44px] items-center text-[0.875rem] text-muted transition-colors duration-150 hover:text-fg"
              >
                {l.label}
              </a>
            ))}
            <button
              type="button"
              onClick={onAskDipa}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 border border-line-strong px-3.5 text-[0.875rem] font-medium transition-colors duration-150 hover:border-accent hover:text-accent"
            >
              Ask Dīpa <span aria-hidden="true">↗</span>
            </button>
          </div>

          {/* mobile trigger — 44px touch target */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-mr-2 flex h-11 w-11 cursor-pointer items-center justify-center lg:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-px w-5 bg-fg transition-transform duration-200 ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-5 bg-fg transition-transform duration-200 ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* mobile panel */}
      {open && (
        <div
          id="mobile-nav"
          ref={panelRef}
          className="fixed inset-x-0 top-16 bottom-0 z-30 overflow-y-auto border-t border-line bg-bg lg:hidden"
        >
          <div className="shell flex flex-col py-4">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={hrefFor(l.id)}
                onClick={() => setOpen(false)}
                className="flex min-h-[52px] items-center border-b border-line text-[1.0625rem]"
              >
                {l.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                onAskDipa();
              }}
              className="mt-6 inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2 bg-accent px-5 font-medium text-on-accent"
            >
              Ask Dīpa <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
