import {IDENTITY} from '~/data/profile';

export function Footer({onAskDipa}: {onAskDipa: () => void}) {
  return (
    <footer className="rule-t">
      <div className="shell flex flex-col gap-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.875rem] font-medium">{IDENTITY.name}</p>
          <p className="label mt-1 !text-[10px]">
            Product systems, clearly · {IDENTITY.location}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={onAskDipa}
            className="inline-flex min-h-[44px] cursor-pointer items-center text-[0.875rem] text-muted transition-colors duration-150 hover:text-accent"
          >
            Ask Dīpa ↗
          </button>
          <a
            href="#/"
            className="inline-flex min-h-[44px] items-center text-[0.875rem] text-muted transition-colors duration-150 hover:text-fg"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
