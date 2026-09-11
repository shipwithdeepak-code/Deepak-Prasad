import {CONTACT, IDENTITY, STORY_ARC} from '~/data/profile';
import {HeroSystem} from './HeroSystem';
import {Reveal} from './Reveal';

export function Hero({onContact}: {onContact: () => void}) {
  return (
    <section className="shell pt-10 pb-16 md:pt-20 md:pb-24" aria-labelledby="hero-heading">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* --- copy column --- */}
        <div className="min-w-0">
          <Reveal as="p" className="label">
            {IDENTITY.eyebrow}
          </Reveal>

          <Reveal delay={60}>
            <h1
              id="hero-heading"
              className="mt-5 text-[2.125rem] leading-[1.08] sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.5rem]"
            >
              Building AI-powered products, platforms{' '}
              <span className="serif italic font-normal text-accent">&amp;</span> growth systems.
            </h1>
          </Reveal>

          <Reveal as="p" delay={110} className="measure mt-6 text-[1.0625rem] leading-relaxed text-muted md:text-[1.125rem]">
            {IDENTITY.supporting}
          </Reveal>

          {/* capabilities */}
          <Reveal delay={150} className="mt-7">
            <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
              {IDENTITY.capabilities.map((c, i) => (
                <li key={c} className="flex items-center gap-2.5">
                  <span className="font-mono text-[12px] tracking-[0.06em] text-fg">{c}</span>
                  {i < IDENTITY.capabilities.length - 1 && (
                    <span aria-hidden="true" className="text-line-strong">
                      ·
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* CTAs — one primary, two secondary */}
          <Reveal delay={190} className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href="#work"
              className="inline-flex min-h-[48px] items-center justify-center gap-2 bg-accent px-6 text-[0.9375rem] font-medium text-on-accent transition-colors duration-150 hover:bg-accent-hover"
            >
              View selected work <span aria-hidden="true">→</span>
            </a>
            <button
              type="button"
              onClick={onContact}
              className="inline-flex min-h-[48px] cursor-pointer items-center justify-center gap-2 border border-line-strong px-6 text-[0.9375rem] font-medium transition-colors duration-150 hover:border-accent hover:text-accent"
            >
              Let’s talk <span aria-hidden="true">↗</span>
            </button>
            <a
              href={CONTACT.resume}
              className="inline-flex min-h-[48px] items-center justify-center px-1 text-[0.9375rem] text-muted underline decoration-line-strong underline-offset-4 transition-colors duration-150 hover:text-fg sm:px-2"
            >
              Resume
            </a>
          </Reveal>

          {/* story arc — the spine of the whole site, stated once */}
          <Reveal delay={230} className="mt-12 border-t border-line pt-5">
            <p className="label mb-3">The arc</p>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
              {STORY_ARC.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="font-mono text-[11.5px] tracking-[0.04em] text-muted">
                    {step}
                  </span>
                  {i < STORY_ARC.length - 1 && (
                    <span aria-hidden="true" className="font-mono text-[11px] text-line-strong">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        {/* --- artifact column --- */}
        <Reveal delay={120} className="min-w-0 lg:pt-2">
          <HeroSystem />
        </Reveal>
      </div>
    </section>
  );
}
