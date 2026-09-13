import {PROOF_POINTS} from '~/data/profile';
import {Metric} from './Metric';
import {Reveal} from './Reveal';

/**
 * Evidence instead of biography — placed immediately after the hero.
 *
 * The legend is not decoration: it is the mechanism that keeps the numbers
 * honest, distinguishing personal contribution from company outcomes.
 */
export function ProofWall() {
  return (
    <section className="rule-t rule-b bg-surface-2/40" aria-labelledby="proof-heading">
      <div className="shell py-14 md:py-20">
        <h2 id="proof-heading" className="sr-only">
          Evidence
        </h2>

        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {PROOF_POINTS.map((p, i) => (
            <Reveal
              key={p.label}
              delay={i * 40}
              className="border-t border-line pt-5 first:border-t-0 sm:border-t sm:first:border-t"
            >
              <Metric
                size="lg"
                value={p.value}
                label={p.label}
                note={p.note}
                attribution={p.attribution}
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 border-t border-line pt-5">
          <p className="measure text-[13px] leading-relaxed text-muted">
            <span
              aria-hidden="true"
              className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent-line align-middle"
            />
            marks work I personally owned or led.
            <span
              aria-hidden="true"
              className="ml-3 mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-line-strong align-middle"
            />
            marks product or company outcomes during my tenure — real, but not
            mine alone. Where a number belongs to a team or a business rather
            than to me, this site says so.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
