import type {ReactNode} from 'react';

interface Props {
  index: string;
  title: string;
  lede?: ReactNode;
  id?: string;
}

/**
 * Every major section is numbered like a document chapter — the editorial
 * spine that holds the page together in place of decorative dividers.
 */
export function SectionHeader({index, title, lede, id}: Props) {
  return (
    <header className="mb-10 md:mb-14">
      <div className="flex items-baseline gap-4">
        <span className="label shrink-0 pt-1">{index}</span>
        <h2 id={id} className="text-[1.75rem] leading-[1.15] md:text-[2.25rem]">
          {title}
        </h2>
      </div>
      {lede && (
        <p className="measure mt-4 pl-0 text-[1.0625rem] leading-relaxed text-muted md:pl-[calc(2.5rem+1rem)]">
          {lede}
        </p>
      )}
    </header>
  );
}
