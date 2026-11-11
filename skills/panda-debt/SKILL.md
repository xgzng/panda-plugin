---
name: panda-debt
description: >
  Harvest `shortcut:`, `panda:` and legacy `ponytail:` comments into a debt ledger, so the
  deliberate shortcuts and deferrals panda leaves behind get tracked instead
  of rotting into "later means never". Use when the user says "panda debt",
  "/panda-debt", "what did panda defer", "list the shortcuts", "panda
  ledger", or "what did we mark to do later". One-shot report, changes nothing.
---

Every deliberate Panda shortcut is marked with a `shortcut:` comment naming
its ceiling and upgrade path. This collects them into one ledger so a deferral
can't quietly become permanent.

## Scan

Search tracked and untracked source while respecting all `.gitignore` files;
skip dependency trees, build output and caches:

`git grep --no-index --exclude-standard -nE '(#|//|/[*]) ?(shortcut|panda|ponytail):'`

Add other comment prefixes if the project's language needs them. When the user
names a custom marker, search that marker instead. Skip notes about keyboard
shortcuts and other hits that are not actual deferrals.

Each hit is one ledger row. The comment prefix keeps prose that merely mentions
the convention out of the ledger.

## Output

One row per marker, grouped by file:

`<file>:<line>, <what was simplified>. ceiling: <the limit named>. upgrade: <the trigger to revisit>.`

The current convention is `shortcut: <ceiling>, <upgrade path>`. Also accept
older `panda:` and `ponytail:` markers without requiring code migration.
Pull the ceiling and the trigger straight from the comment. Want an owner per row too? add
`git blame -L<line>,<line>`.

Flag the rot risk: any deferral comment that names no upgrade path or
trigger gets a `no-trigger` tag, those are the ones that silently rot.

End with `<N> markers, <M> with no trigger.` Nothing found: `No Panda debt. Clean ledger.`

## Boundaries

Reads and reports only, changes nothing. To persist it, ask and it writes the
ledger to a file (e.g. `PANDA-DEBT.md`). One-shot; do not change the session mode.
