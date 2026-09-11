import {EXPERIENCE} from '~/data/profile';
import {Reveal} from './Reveal';
import {SectionHeader} from './SectionHeader';

/**
 * Role → scope → products → evidence, in a scannable grid.
 * A recruiter should be able to read this in under thirty seconds, so each
 * role is capped at a short evidence list rather than a paragraph wall.
 */
export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="rule-t scroll-mt-20 bg-surface-2/40"
      aria-labelledby="experience-heading"
    >
      <div className="shell py-20 md:py-28">
        <SectionHeader
          index="04"
          id="experience-heading"
          title="Experience"
          lede="Seven-plus years across manufacturing platforms, B2B marketplaces, consumer AI and subscription products."
        />

        <ol className="border-t border-line">
          {EXPERIENCE.map((r, i) => (
            <Reveal as="li" key={`${r.company}-${r.period}`} delay={i * 40} className="border-b border-line py-7 md:py-9">
              <div className="grid gap-4 md:grid-cols-[13rem_1fr] md:gap-10">
                {/* when + where */}
                <div>
                  <p className="label !tracking-[0.1em]">{r.period}</p>
                  <p className="mt-2 text-[0.9375rem] font-semibold leading-snug">{r.title}</p>
                  <p className="mt-0.5 text-[0.875rem] text-muted">{r.company}</p>
                </div>

                {/* what */}
                <div className="min-w-0">
                  <p className="text-[0.9375rem] leading-relaxed text-fg">{r.scope}</p>

                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {r.products.map((p) => (
                      <li
                        key={p}
                        className="border border-line bg-surface px-2 py-0.5 font-mono text-[10.5px] tracking-[0.06em] text-muted"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-4 space-y-2.5">
                    {r.evidence.map((e) => (
                      <li key={e} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-line-strong"
                        />
                        <p className="text-[14px] leading-relaxed text-muted">{e}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
