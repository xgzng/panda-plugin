<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo-dark.png">
    <img src="assets/logo.png" width="180" alt="Panda company coding guardrails">
  </picture>
</p>

# Panda

Panda is the company AI coding guardrail plugin derived from
[Ponytail](https://github.com/DietrichGebert/ponytail). It makes coding agents
read the current project's rules, reuse existing capabilities, and choose the
smallest compliant implementation without removing safety or operational
controls.

## What it enforces

1. Understand the affected flow and current project rules.
2. Reuse existing code, standard libraries, platform features, and installed dependencies.
3. Add only the minimum code required by the concrete task.
4. Preserve security, validation, transactions, idempotency, concurrency controls, compatibility, logs, monitoring, and tests.
5. Respect established architecture boundaries.

Project-specific rules remain owned by each repository. Hosts load files such
as `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, and
`.cursor/rules/` through their native mechanisms. Panda adds the shared company
rules in [`rules/company-core.md`](rules/company-core.md); it does not scan all
projects under `D:\Project`.

Precedence: company safety and quality boundaries, current-project rules, then
Panda's minimization advice.

## Skills

| Skill | Use |
|---|---|
| `panda` | Use during development to choose the smallest compliant implementation. |
| `panda-review` | Review the current diff for over-engineering before commit or merge. |
| `panda-audit` | Audit the whole repository for unnecessary complexity. |
| `panda-debt` | Report deliberate `panda:` simplification markers and legacy `ponytail:` markers. |
| `panda-gain` | Show Ponytail's published benchmark as reference data, not repository savings. |
| `panda-help` | Show the command and mode reference. |

Supported modes: `lite`, `full` (default), `ultra`, and `off`.

## Install

Publish this repository to the company Git service before team rollout. Replace
`COMPANY_GIT/Panda/panda-plugin` below with the actual repository path.

### Claude Code

```text
/plugin marketplace add COMPANY_GIT/Panda/panda-plugin
/plugin install panda@panda
```

### Codex

```powershell
codex plugin marketplace add COMPANY_GIT/Panda/panda-plugin
codex plugin add panda@panda
```

Restart Codex after installation. In Codex, invoke skills with
`$panda:panda`, `$panda:panda-review`, or the other names shown by the client.

### Other hosts

The repository retains the upstream adapters for GitHub Copilot CLI, Gemini,
OpenCode, Pi, Qoder, Hermes, OpenClaw, Grok, Cursor, Windsurf, Cline, Kiro,
Devin, and other instruction-file compatible agents. See
[`docs/agent-portability.md`](docs/agent-portability.md) for the mapping. For
instruction-only hosts, copy that host's Panda rule file from this repository.

## Configuration

Set the default mode with `PANDA_DEFAULT_MODE=lite|full|ultra|off`, or:

```json
{ "defaultMode": "full" }
```

Config path:

- Windows: `%APPDATA%\panda\config.json`
- macOS/Linux: `~/.config/panda/config.json`

Legacy `PONYTAIL_*` environment variables and `.ponytail-active` session files
remain supported to reduce upstream merge conflicts and preserve compatibility.

## Benchmark attribution

The bundled benchmark material and the values shown by `panda-gain` are from
upstream Ponytail, not measurements of Panda or any company repository. The
published agentic benchmark reports averages of 54% less added LOC, 22% fewer
tokens, 20% lower cost, and 27% less completion time while its safety tier
passed 20/20 checks. Treat these as upstream reference results, not promised
company savings. See
[`benchmarks/results/2026-06-18-agentic.md`](benchmarks/results/2026-06-18-agentic.md)
and [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).

## Development and validation

```powershell
node scripts/check-rule-copies.js
npm test
```

Regenerate the logos from the approved source image:

```powershell
python scripts/process-logo.py <source-image> assets
```

Public Skill names are Panda-branded. Hook filenames, `.ponytail-active`, and
the `ponytail-mcp` directory intentionally retain upstream-compatible internal
names. Do not rename those only for cosmetics.

Panda retains Ponytail's MIT license. See [`LICENSE`](LICENSE) and
[`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md).
