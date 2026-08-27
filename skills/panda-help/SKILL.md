---
name: panda-help
description: >
  Quick-reference card for all panda modes, skills, and commands.
  One-shot display, not a persistent mode. Trigger: /panda-help,
  "panda help", "what panda commands", "how do I use panda".
---

# Panda Help

Display this reference card when invoked. One-shot, do NOT change mode,
write flag files, or persist anything.

## Core capabilities

- **Minimal implementation:** Reuse first, then add only the minimum compliant code.
- **Surgical Changes:** Keep every changed line tied to the request, its necessary call chain, or required verification; do not casually modify unrelated modules.
- **Quality boundaries:** Security, correctness, project rules, and required tests are never simplified away.

## Levels

| Level | Trigger | What change |
|-------|---------|-------------|
| **Lite** | `/panda lite` | Build what's asked, name the lazier alternative in one line. |
| **Full** | `/panda` | The ladder enforced: YAGNI → stdlib → native → one line → minimum. Default. |
| **Ultra** | `/panda ultra` | YAGNI extremist. Deletion before addition. Challenges requirements before building. |

Level sticks until changed or session end.

## Skills

| Skill | Trigger | What it does |
|-------|---------|--------------|
| **panda** | `/panda` | Minimum compliant implementation plus Surgical Changes scope control. |
| **panda-review** | `/panda-review` | Over-engineering review: `L42: yagni: factory, one product. Inline.` |
| **panda-audit** | `/panda-audit` | Whole-repo over-engineering audit: ranked list of what to delete. |
| **panda-debt** | `/panda-debt` | Harvest `panda:` shortcut comments into a tracked ledger. |
| **panda-gain** | `/panda-gain` | Measured-impact scoreboard: less code, less cost, more speed. |
| **panda-help** | `/panda-help` | This card. |

Codex uses `@panda`, `@panda-review`, and `@panda-help`; Claude Code
and OpenCode use the slash-command forms above (OpenCode ships all six as
slash commands).

## Deactivate

Say "stop panda" or "normal mode". Resume anytime with `/panda`.
`/panda off` also works.

## Configure Default Mode

Default mode = `full`, auto-active every session. Change it:

**Environment variable** (highest priority):
```bash
export PANDA_DEFAULT_MODE=ultra
```

**Config file** (`~/.config/panda/config.json`, Windows: `%APPDATA%\panda\config.json`):
```json
{ "defaultMode": "lite" }
```

Set `"off"` to disable auto-activation on session start, activate manually
with `/panda` when wanted.

Resolution: env var > config file > `full`.

## Update

Enable auto-update once: open `/plugin`, go to Marketplaces, pick panda, Enable auto-update. Claude Code then pulls new versions at startup (run `/reload-plugins` when it prompts). Manual refresh: `/plugin marketplace update panda` then `/reload-plugins`.

If `/plugin` is not recognized, your Claude Code is out of date. Update it (`npm install -g @anthropic-ai/claude-code@latest`, or `brew upgrade claude-code`) and restart. Other hosts use their own update flow.

## More

Full docs: read this plugin's root `README.md`. Upstream examples and benchmark
source: https://github.com/DietrichGebert/ponytail

Panda project and issue tracker: https://github.com/xgzng/panda-plugin
