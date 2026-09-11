import {CAPABILITIES} from '~/data/profile';
import {Reveal} from './Reveal';
import {SectionHeader} from './SectionHeader';

/**
 * A matrix, not a skills cloud: five domains on the page grid, each a row of
 * concrete capabilities. Mono type keeps it reading as a specification.
 */
export function CapabilityMatrix() {
  return (
    <section className="shell py-20 md:py-28" aria-labelledby="capability-heading">
      <SectionHeader index="05" id="capability-heading" title="Capabilities" />

      <dl className="border-t border-line">
        {CAPABILITIES.map((c, i) => (
          <Reveal key={c.domain} delay={i * 40}>
            <div className="grid gap-2 border-b border-line py-5 md:grid-cols-[13rem_1fr] md:gap-10 md:py-6">
              <dt className="label pt-1 !tracking-[0.12em] !text-[11px] text-fg">{c.domain}</dt>
              <dd className="m-0">
                <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
                  {c.items.map((item, ii) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="text-[0.9375rem] text-muted">{item}</span>
                      {ii < c.items.length - 1 && (
                        <span aria-hidden="true" className="text-line-strong">
                          ·
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </section>
  );
}
