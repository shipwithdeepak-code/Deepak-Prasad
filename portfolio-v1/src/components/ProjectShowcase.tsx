import {CASE_STUDIES} from '~/data/cases';
import {Reveal} from './Reveal';
import {SectionHeader} from './SectionHeader';

/**
 * Editorial showcase — deliberately not a card grid.
 *
 * Each project is a full-width record on the page's grid: index, headline,
 * proof, and a condensed view of its system flow. The system preview is the
 * "visual artifact" for each project — it shows the shape of the problem
 * rather than a screenshot of a UI.
 */
export function ProjectShowcase() {
  return (
    <section id="work" className="shell scroll-mt-20 py-20 md:py-28" aria-labelledby="work-heading">
      <SectionHeader
        index="01"
        id="work-heading"
        title="Selected work"
        lede="Five products, each a different kind of ambiguity. The through-line is the method, not the domain."
      />

      <ol className="border-t border-line">
        {CASE_STUDIES.map((c, i) => (
          <Reveal as="li" key={c.slug} delay={i * 50} className="border-b border-line">
            <a
              href={`#/work/${c.slug}`}
              className="group block py-8 transition-colors duration-200 md:py-10"
            >
              <div className="grid gap-5 md:grid-cols-[3.5rem_1fr_auto] md:gap-8">
                {/* index */}
                <span className="label pt-1.5 md:pt-2">{c.number}</span>

                {/* body */}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <span className="font-mono text-[12px] tracking-[0.08em] text-fg">
                      {c.title}
                    </span>
                    <span aria-hidden="true" className="text-line-strong">
                      ·
                    </span>
                    <span className="label !tracking-[0.08em]">{c.category}</span>
                    {c.status && (
                      <span className="border border-line-strong px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                        Not launched
                      </span>
                    )}
                  </div>

                  <h3 className="measure mt-3 text-[1.375rem] leading-[1.2] transition-colors duration-200 group-hover:text-accent md:text-[1.75rem]">
                    {c.headline}
                  </h3>

                  <p className="measure mt-3 text-[0.9375rem] leading-relaxed text-muted">
                    {c.deck}
                  </p>

                  {/* condensed flow — the artifact preview */}
                  <ol
                    aria-label={`${c.title} system flow`}
                    className="mt-5 flex flex-wrap items-center gap-x-1.5 gap-y-1.5"
                  >
                    {c.heroFlow.nodes.slice(0, 6).map((n, ni) => (
                      <li key={n.label} className="flex items-center gap-1.5">
                        {ni > 0 && (
                          <span
                            aria-hidden="true"
                            className="font-mono text-[10px] text-line-strong"
                          >
                            →
                          </span>
                        )}
                        <span
                          className={`border px-2 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] ${
                            n.tone === 'accent' || n.tone === 'gate'
                              ? 'border-accent-line bg-accent-soft text-accent'
                              : 'border-line bg-surface text-muted'
                          }`}
                        >
                          {n.label}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* proof */}
                <div className="md:w-48 md:text-right">
                  <ul className="flex flex-wrap gap-x-4 gap-y-1 md:block">
                    {c.metrics.slice(0, 2).map((m) => (
                      <li key={m.label} className="md:mb-3">
                        <span className="serif block text-[1.125rem] leading-tight text-fg tabular-nums">
                          {m.value}
                        </span>
                        <span className="label !text-[10px]">{m.label}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent">
                    Read case study
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
