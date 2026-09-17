# Vendored from DietrichGebert/ponytail

Source: https://github.com/DietrichGebert/ponytail (plugin v4.10.0, MIT).
Six skills copied verbatim into `.claude/skills/`, matching how every other
skill in this project is vendored:

    ponytail  ponytail-review  ponytail-audit
    ponytail-debt  ponytail-gain  ponytail-help

The upstream LICENSE sits beside this file.

## What is NOT installed

The upstream project is a Claude Code *plugin*, and a plugin is more than its
skills. Not copied here:

  - `hooks/` — six Node lifecycle hooks that keep the mode always-on, track
    it across turns, propagate it into subagents, and paint a statusline.
  - `.claude-plugin/` — the marketplace and plugin manifests.

Those only take effect when the plugin is installed through Claude Code's own
plugin system, which is a client-side action this repo cannot perform for you:

    /plugin marketplace add DietrichGebert/ponytail
    /plugin install ponytail@ponytail

(Two separate prompts; the install needs `node` on the non-interactive PATH.)

So: the skills below are invokable now, in this repo, by name. The always-on
behaviour is not — that needs the two commands above.

## Why the hooks were reviewed before vendoring

They read environment variables and write local state only. No network calls,
no `child_process`, no `exec`/`spawn`. That is why copying the skills was
judged safe; the hooks themselves are still left to the official installer.
