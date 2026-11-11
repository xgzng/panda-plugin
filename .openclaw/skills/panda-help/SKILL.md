---
name: panda-help
description: "Quick reference for Panda modes, skills, and commands. One-shot display."
homepage: https://github.com/xgzng/panda-plugin
license: MIT
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
| **panda-review** | `/panda-review` | Quality review: bugs, security, realistic load, tests, complexity and unrelated edits. |
| **panda-audit** | `/panda-audit` | Repository quality audit, ranked by concrete risk and reuse opportunities. |
| **panda-debt** | `/panda-debt` | Harvest `shortcut:`, `panda:` and legacy `ponytail:` deferrals into a ledger. |
| **panda-gain** | `/panda-gain` | Ponytail 5 upstream benchmark reference; not measured Panda savings. |
| **panda-help** | `/panda-help` | This card. |

Codex uses `$panda:panda`, `$panda:panda-review`, and `$panda:panda-help`.
Claude Code and OpenCode use the slash-command forms above. One-shot skills
do not replace the current lite/full/ultra/off setting.

## Claude Code band

Claude Code 2.1.290+ terminal/desktop Code sessions can show local cost, tokens,
agent time, heuristic reuse and test status. `/panda band` toggles visibility;
`/panda band on|off` sets it; `/panda band import` imports past sessions.
This UI is not available in Codex, VS Code chat, cloud sessions or `claude -p`.
Task rows stay in the Panda config directory's `band/` by default, with no
webhook. History cost can be estimated; reuse does not currently count Java.

## Deactivate

Say "stop panda" or "normal mode". Resume anytime with `/panda`.
`/panda off` also works.

## Configure Default Mode

With trusted lifecycle hooks, new sessions start at `full` unless configured
otherwise. Instruction-only hosts need their native rule-loading mechanism.
To persist a default: `/panda default lite` in Claude Code, or
`$panda:panda default lite` in Codex. A plain `/panda full` changes live state
only. Live state is project-scoped where the host provides a project directory;
concurrent sessions in the same project still share it. Change it:

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
