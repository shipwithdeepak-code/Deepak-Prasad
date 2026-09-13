import type {Flow, NodeTone} from '~/data/cases';

/**
 * SystemDiagram — the site's signature artifact.
 *
 * Renders a product/architecture flow as an ordered list on a vertical spine:
 * index rail, node label, and an explanatory note. It reads as a technical
 * document rather than decoration.
 *
 * Accessibility notes:
 *  - semantic <ol>/<li>, so the sequence is conveyed without sight;
 *  - tone is never signalled by colour alone — each special node carries a
 *    text marker ("gate", "primary", "end") as well;
 *  - pure CSS/DOM, no SVG viewBox to break at narrow widths.
 */

const TONE_MARK: Record<NodeTone, string | null> = {
  default: null,
  gate: 'gate',
  accent: 'primary path',
  terminal: 'end',
};

function nodeClasses(tone: NodeTone) {
  if (tone === 'accent' || tone === 'gate') {
    return 'border-accent-line bg-accent-soft';
  }
  return 'border-line bg-surface';
}

export function SystemDiagram({flow, className = ''}: {flow: Flow; className?: string}) {
  return (
    <figure className={`not-prose ${className}`}>
      <ol className="relative m-0 list-none p-0">
        {/* the spine */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-[15px] top-3 bottom-3 w-px bg-line"
        />

        {flow.nodes.map((node, i) => {
          const tone: NodeTone = node.tone ?? 'default';
          const mark = TONE_MARK[tone];
          const isLoopSource = flow.loop?.from === i;

          return (
            <li key={`${node.label}-${i}`} className="relative pl-11 pb-5 last:pb-0">
              {/* index marker */}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-0.5 flex h-8 w-8 items-center justify-center rounded-full border font-mono text-[11px] font-medium tabular-nums ${nodeClasses(
                  tone,
                )} ${tone === 'accent' || tone === 'gate' ? 'text-accent' : 'text-muted'}`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className="pt-1">
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span className="font-mono text-[13px] font-medium uppercase tracking-[0.08em] text-fg">
                    {node.label}
                  </span>
                  {mark && (
                    <span className="label !text-[10px] text-accent">[{mark}]</span>
                  )}
                </div>
                {node.note && (
                  <p className="mt-1 text-[13.5px] leading-relaxed text-muted">{node.note}</p>
                )}
                {isLoopSource && flow.loop && (
                  <p className="mt-2 flex items-center gap-2 font-mono text-[11px] text-accent">
                    <span aria-hidden="true">↺</span>
                    {flow.loop.label}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {flow.caption && (
        <figcaption className="mt-5 border-t border-line pt-3 text-[13px] leading-relaxed text-muted">
          {flow.caption}
        </figcaption>
      )}
    </figure>
  );
}
