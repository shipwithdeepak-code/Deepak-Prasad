import {useEffect} from 'react';
import {Metric} from '~/components/Metric';
import {Reveal} from '~/components/Reveal';
import {SystemDiagram} from '~/components/SystemDiagram';
import {CASE_STUDIES, CHAPTER_LABEL, type CaseStudy} from '~/data/cases';

function Meta({k, v}: {k: string; v: string}) {
  return (
    <div className="border-t border-line pt-3">
      <dt className="label !text-[10px]">{k}</dt>
      <dd className="mt-1 m-0 text-[0.875rem] leading-snug text-fg">{v}</dd>
    </div>
  );
}

function ContributionColumn({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: 'mine' | 'team' | 'constraints';
}) {
  return (
    <div>
      <h3 className="label !text-[10px] mb-3 flex items-center gap-2">
        <span
          aria-hidden="true"
          className={`inline-block h-1.5 w-1.5 rounded-full ${
            tone === 'mine' ? 'bg-accent-line' : 'bg-line-strong'
          }`}
        />
        {title}
      </h3>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it} className="text-[13.5px] leading-relaxed text-muted">
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CaseStudyPage({study}: {study: CaseStudy}) {
  useEffect(() => {
    document.title = `${study.title} — ${study.headline} · Deepak Prasad`;
    return () => {
      document.title = 'Deepak Prasad — Product Systems, Clearly';
    };
  }, [study]);

  const idx = CASE_STUDIES.findIndex((c) => c.slug === study.slug);
  const next = CASE_STUDIES[(idx + 1) % CASE_STUDIES.length];

  return (
    <article>
      {/* ---------- header ---------- */}
      <header className="shell pt-10 pb-14 md:pt-14 md:pb-20">
        <a
          href="#work"
          className="label inline-flex min-h-[44px] items-center gap-2 transition-colors duration-150 hover:text-accent"
        >
          <span aria-hidden="true">←</span> All work
        </a>

        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="serif text-[1.25rem] text-accent tabular-nums">{study.number}</span>
          <span aria-hidden="true" className="text-line-strong">
            /
          </span>
          <span className="label !tracking-[0.1em]">{study.category}</span>
        </div>

        <h1 className="measure mt-4 text-[2rem] leading-[1.1] md:text-[2.875rem]">
          {study.headline}
        </h1>

        <p className="measure mt-5 text-[1.0625rem] leading-relaxed text-muted md:text-[1.125rem]">
          {study.deck}
        </p>

        {study.status && (
          <p className="mt-6 inline-flex flex-wrap items-center gap-2 border border-line-strong bg-surface-2 px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 bg-line-strong" />
            {study.status}
          </p>
        )}

        <dl className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          <Meta k="Role" v={study.role} />
          <Meta k="Company" v={study.company} />
          <Meta k="Timeline" v={study.timeline} />
          <Meta k="Focus" v={study.tags.join(' · ')} />
        </dl>
      </header>

      {/* ---------- metrics ---------- */}
      <section className="rule-t rule-b bg-surface-2/40" aria-labelledby="cs-metrics">
        <div className="shell py-12 md:py-14">
          <h2 id="cs-metrics" className="sr-only">
            Key numbers
          </h2>
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {study.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 40} className="border-t border-line pt-4">
                <Metric
                  value={m.value}
                  label={m.label}
                  note={m.note}
                  attribution={m.attribution}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- contribution ---------- */}
      <section className="shell py-14 md:py-20" aria-labelledby="cs-contribution">
        <h2 id="cs-contribution" className="label mb-8">
          Role &amp; attribution
        </h2>
        <div className="grid gap-10 border-t border-line pt-8 md:grid-cols-3 md:gap-12">
          <ContributionColumn title="What I owned" items={study.contribution.mine} tone="mine" />
          <ContributionColumn
            title="What the team owned"
            items={study.contribution.team}
            tone="team"
          />
          <ContributionColumn
            title="Constraints"
            items={study.contribution.constraints}
            tone="constraints"
          />
        </div>
      </section>

      {/* ---------- chapters ---------- */}
      <div className="shell pb-16 md:pb-24">
        {study.chapters.map((ch, i) => (
          <Reveal
            key={ch.key}
            as="section"
            className="grid gap-6 border-t border-line py-10 md:grid-cols-[10rem_1fr] md:gap-12 md:py-14"
          >
            <div className="md:sticky md:top-24 md:self-start">
              <p className="label !tracking-[0.12em] text-accent">
                {String(i + 1).padStart(2, '0')} · {CHAPTER_LABEL[ch.key]}
              </p>
            </div>

            <div className="min-w-0">
              <h2 className="text-[1.375rem] leading-snug md:text-[1.625rem]">{ch.title}</h2>

              {ch.body.map((p, pi) => (
                <p
                  key={pi}
                  className="measure mt-4 text-[1rem] leading-[1.75] text-muted"
                >
                  {p}
                </p>
              ))}

              {ch.points && (
                <ul className="mt-7 grid gap-5 sm:grid-cols-2">
                  {ch.points.map((pt) => (
                    <li key={pt.t} className="border-t border-line pt-4">
                      <h3 className="text-[0.9375rem] font-semibold leading-snug">{pt.t}</h3>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{pt.d}</p>
                    </li>
                  ))}
                </ul>
              )}

              {ch.flow && (
                <div className="mt-8 border border-line bg-surface p-5 sm:p-7">
                  <SystemDiagram flow={ch.flow} />
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {/* ---------- next ---------- */}
      <section className="rule-t" aria-labelledby="cs-next">
        <div className="shell py-12 md:py-16">
          <h2 id="cs-next" className="label mb-5">
            Next case study
          </h2>
          <a href={`#/work/${next.slug}`} className="group block border-t border-line pt-6">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="serif text-[1.125rem] text-accent tabular-nums">
                {next.number}
              </span>
              <span className="font-mono text-[12px] tracking-[0.08em]">{next.title}</span>
            </div>
            <p className="measure mt-3 text-[1.25rem] leading-snug transition-colors duration-200 group-hover:text-accent md:text-[1.5rem]">
              {next.headline}
            </p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent">
              Read
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </span>
          </a>
        </div>
      </section>
    </article>
  );
}
