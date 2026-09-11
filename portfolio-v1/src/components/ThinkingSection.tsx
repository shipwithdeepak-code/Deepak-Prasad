import {PRINCIPLES} from '~/data/profile';
import {Reveal} from './Reveal';
import {SectionHeader} from './SectionHeader';

/**
 * The most editorial moment on the site: four principles, set large, with room
 * to breathe. Serif numerals against the sans body create the print-essay
 * register the rest of the page deliberately holds back from.
 */
export function ThinkingSection() {
  return (
    <section
      id="thinking"
      className="rule-t scroll-mt-20 bg-surface-2/40"
      aria-labelledby="thinking-heading"
    >
      <div className="shell py-20 md:py-28">
        <SectionHeader
          index="02"
          id="thinking-heading"
          title="How I think"
          lede="Four operating principles. They are the reason the case studies above look the way they do."
        />

        <div className="grid gap-x-14 gap-y-12 md:grid-cols-2 md:gap-y-16">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.n} delay={i * 60} className="border-t border-line pt-6">
              <div className="flex items-baseline gap-4">
                <span
                  className="serif shrink-0 text-[1.75rem] leading-none text-accent tabular-nums"
                  aria-hidden="true"
                >
                  {p.n}
                </span>
                <h3 className="text-[1.25rem] leading-snug md:text-[1.375rem]">{p.title}</h3>
              </div>
              <p className="mt-4 text-[1rem] leading-[1.7] text-muted md:pl-[calc(1.75rem+1rem)]">
                {p.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
