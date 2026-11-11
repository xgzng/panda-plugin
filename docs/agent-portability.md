# Agent portability

Panda keeps Ponytail's thin-adapter model: `skills/` and `hooks/` contain the
shared behavior, while host-specific manifests expose it to each agent.

Support labels describe Panda validation, not Ponytail upstream support:

- **Verified**: Panda's install or adapter tests have run successfully.
- **Contract-tested**: repository tests validate the adapter structure.
- **Inherited, not yet verified**: retained/adapted from Ponytail v5.3.3 but not tested
  end to end as Panda on that host.

| Host | Panda entry points | Status and usage |
|---|---|---|
| Codex / Codex Desktop | `.agents/plugins/marketplace.json`, `.codex-plugin/plugin.json`, `skills/`, `hooks/` | **Verified on Windows** with an isolated fresh install from `xgzng/panda-plugin`; Hook compatibility is contract-tested. macOS uses the same two Codex commands from the README but is not yet verified on a Mac. |
| Claude Code / Desktop | `.claude-plugin/marketplace.json`, `.claude-plugin/plugin.json`, `skills/`, `hooks/` | **Contract-tested** lifecycle hooks and official `claude plugin test` UI harness (Claude 2.1.311); not yet verified in a live interactive account. The band requires Claude 2.1.290+; other hosts do not receive the band UI. |
| GitHub Copilot CLI | `.github/plugin/`, `commands/`, `skills/`, `hooks/copilot-hooks.json` | **Contract-tested; not yet verified** end to end. Candidate commands: `copilot plugin marketplace add xgzng/panda-plugin` then `copilot plugin install panda@panda`. |
| Gemini CLI | `gemini-extension.json`, `AGENTS.md`, `commands/`, `skills/` | **Contract-tested; not yet verified** end to end. The extension loads `AGENTS.md` as context. |
| OpenCode | `.opencode/plugins/ponytail.mjs`, `.opencode/plugins/index.js`, `.opencode/command/`, `skills/`, `hooks/` | **Contract-tested** for V1/V2 and compaction; not yet verified end to end. The internal filename remains upstream-compatible; public commands use Panda. |
| Pi | `pi-extension/`, `skills/`, `hooks/` | **Contract-tested; not yet verified** end to end. |
| Hermes Agent | `plugin.yaml`, `__init__.py`, `skills/` | **Contract-tested; not yet verified** end to end. Public commands and skill names use Panda. |
| Grok Build | `plugin.json`, `.grok-plugin/marketplace.json`, `skills/`, `commands/` | **Contract-tested; not yet verified** end to end. Do not publish an installation command until the Panda repository form has been tested on Grok. |
| Kimi Code | `.kimi-plugin/plugin.json`, `skills/`, `AGENTS.md` | **Contract-tested; not yet verified** end to end. Kimi discovers the six Panda skills and uses its native rules mechanism. |
| Qoder | `.qoder/rules/panda.md`, `.qoder-plugin/plugin.json`, `hooks/qoder-hooks.json`, `skills/` | **Contract-tested; not yet verified** end to end. |
| Devin CLI | `.devin-plugin/plugin.json`, `skills/` | **Inherited, not yet verified** as Panda. |
| OpenClaw | `.openclaw/skills/panda*/SKILL.md` | **Generated and contract-tested; not yet published or verified** through ClawHub. Install from this repository manually until Panda packages are published. |
| Cursor | `.cursor/rules/panda.mdc` or `hooks/cursor-hooks.json` via `scripts/cursor-hooks.js` | Rule copy and installer lifecycle are **contract-tested**; not yet verified interactively. Install user hooks with `node scripts/cursor-hooks.js install`; add `--project` for workspace hooks. Use `node scripts/cursor-hooks.js uninstall` (with the same scope) to remove only Panda hooks. An always-on Panda rule suppresses duplicate injection and cannot be disabled with a mode command; remove that rule first if switching to hook-managed modes. |
| Windsurf | `.windsurf/rules/panda.md` | Rule copy is contract-tested; host behavior is not yet verified as Panda. |
| Cline | `.clinerules/panda.md` | Rule copy is contract-tested; host behavior is not yet verified as Panda. |
| Kiro | `.kiro/steering/panda.md` | Rule copy is contract-tested; host behavior is not yet verified as Panda. |
| GitHub Copilot Chat | `.github/copilot-instructions.md` | Rule copy is contract-tested; host behavior is not yet verified as Panda. |
| Generic instruction hosts | `AGENTS.md` or a matching rule file | Instruction-only fallback. The host must load the file through its own project-rule mechanism. |

## Project rules

Panda does not scan arbitrary repositories or parse every host's rule format.
Before implementation it asks the agent to confirm applicable native instructions,
such as `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`,
`.cursor/rules/`, `GEMINI.md`, or `.windsurf/rules/`. Reuse host-injected rules;
otherwise read applicable entry points and only relevant explicit references,
including scoped nested rules. No entry point means continue under company/Panda
rules, not a scan of arbitrary rule directories.

## Adapter rule

The Claude band records metrics locally by default. An empty webhook URL sends
nothing; if a webhook is configured, task names are included only when
`sendNames` is explicitly `true`, including when the host omits this option.

Keep adapters thin. Point skill-capable hosts at `skills/`, Hook-capable hosts
at `hooks/`, and instruction-only hosts at the synchronized `AGENTS.md` copies.
Never claim a host is verified until Panda's actual install and activation flow
has been exercised there.

## Portable behavior

- `skills/panda/SKILL.md`: company-aware minimum implementation mode
- `skills/panda-review/SKILL.md`: change quality, security, scope and complexity review
- `skills/panda-audit/SKILL.md`: whole-repository quality and complexity audit
- `skills/panda-debt/SKILL.md`: collect `shortcut:`, `panda:` and legacy `ponytail:` deferrals
- `skills/panda-gain/SKILL.md`: Ponytail upstream benchmark reference
- `skills/panda-help/SKILL.md`: usage reference
- `AGENTS.md`: synchronized instruction-only fallback
