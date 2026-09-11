import {useEffect, useRef} from 'react';

/**
 * Scroll reveal — 12px fade, per the design-system motion tier (2/10, subtle).
 *
 * Content is never dependent on JS or motion to become readable:
 *  - if IntersectionObserver is unavailable, elements are shown immediately;
 *  - if the user prefers reduced motion, the CSS forces the final state.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      el.dataset.shown = 'true';
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.shown = 'true';
            observer.unobserve(entry.target);
          }
        }
      },
      {rootMargin: '0px 0px -8% 0px', threshold: 0.05},
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
