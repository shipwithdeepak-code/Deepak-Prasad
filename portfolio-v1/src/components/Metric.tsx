import {ATTRIBUTION_LABEL, type Attribution} from '~/data/profile';

interface Props {
  value: string;
  label: string;
  note?: string;
  attribution?: Attribution;
  /** Larger treatment for the homepage proof wall. */
  size?: 'md' | 'lg';
}

/**
 * A metric always carries its attribution.
 *
 * This is a content-integrity decision expressed in the component API: it is
 * not possible to render a number on this site without saying whose outcome
 * it was. Credibility matters more than an impressive-sounding figure.
 */
export function Metric({value, label, note, attribution, size = 'md'}: Props) {
  const isLarge = size === 'lg';

  return (
    <div className="flex h-full flex-col">
      <p
        className={`serif tabular-nums text-fg ${
          isLarge
            ? 'text-[2rem] leading-[1.05] md:text-[2.5rem]'
            : 'text-[1.5rem] leading-[1.1] md:text-[1.75rem]'
        }`}
      >
        {value}
      </p>
      <p className="mt-2 text-[0.9375rem] font-medium leading-snug text-fg">{label}</p>

      {note && <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{note}</p>}

      {attribution && (
        <p className="label mt-auto pt-3 !text-[10px] !tracking-[0.12em]">
          <span
            aria-hidden="true"
            className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full align-middle ${
              attribution === 'context' ? 'bg-line-strong' : 'bg-accent-line'
            }`}
          />
          {ATTRIBUTION_LABEL[attribution]}
        </p>
      )}
    </div>
  );
}
