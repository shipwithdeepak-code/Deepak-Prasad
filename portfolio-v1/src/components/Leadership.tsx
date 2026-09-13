import {LEADERSHIP} from '~/data/profile';
import {Reveal} from './Reveal';
import {SectionHeader} from './SectionHeader';

/**
 * Leadership shown as an operating model rather than adjectives.
 * The flow is the argument: two organisations with no reporting line between
 * them, and a prioritization layer that had to be built rather than assumed.
 */
export function Leadership() {
  return (
    <section
      id="leadership"
      className="shell scroll-mt-20 py-20 md:py-28"
      aria-labelledby="leadership-heading"
    >
      <SectionHeader index="03" id="leadership-heading" title={LEADERSHIP.headline} />

      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        {/* the model */}
        <Reveal>
          <p className="measure text-[1.0625rem] leading-relaxed text-muted">{LEADERSHIP.model}</p>

          <ul className="mt-8 space-y-5">
            {LEADERSHIP.practices.map((d) => (
              <li key={d} className="flex gap-3.5 border-t border-line pt-5">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent-line" />
                <p className="text-[0.9375rem] leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* the org flow */}
        <Reveal delay={80}>
          <figure className="m-0 border border-line bg-surface p-5 sm:p-7">
            <figcaption className="label mb-6 border-b border-line pb-3">
              fig. 02 — the alignment path
            </figcaption>

            <ol className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-[7px] top-4 bottom-4 w-px bg-line"
              />
              {LEADERSHIP.flow.map((n, i) => (
                <li key={n.place} className="relative pl-8 pb-8 last:pb-0">
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 ${
                      i === 1 ? 'border-accent bg-accent' : 'border-line-strong bg-bg'
                    }`}
                  />
                  <p
                    className={`font-mono text-[12.5px] font-medium uppercase tracking-[0.1em] ${
                      i === 1 ? 'text-accent' : 'text-fg'
                    }`}
                  >
                    {n.place}
                  </p>
                  <p className="label mt-1 !text-[10px]">{n.detail}</p>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{n.body}</p>
                </li>
              ))}
            </ol>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
