<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo-dark.png">
    <img src="assets/logo.png" width="220" alt="Panda, the lazy but reliable senior engineer">
  </picture>
</p>

<h1 align="center">Panda</h1>

<p align="center">
  <em>Lazy enough to avoid unnecessary code. Reliable enough to ship the right code.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Codex-plugin-111111?style=flat-square" alt="Codex plugin">
  <img src="https://img.shields.io/badge/Claude_Code-plugin-111111?style=flat-square" alt="Claude Code plugin">
  <img src="https://img.shields.io/badge/license-MIT-111111?style=flat-square" alt="MIT license">
</p>

<p align="center">
  <strong>English</strong> | <a href="README.zh-CN.md">简体中文</a>
</p>

> [!IMPORTANT]
> **Panda is a derivative project based on [Ponytail](https://github.com/DietrichGebert/ponytail) by Dietrich Gebert.**
> It was created by studying and adapting Ponytail under the MIT License. Dietrich Gebert and the Ponytail project do not maintain or endorse this fork.

Panda is a set of rules, skills, plugins, and lifecycle hooks for AI coding
agents. It gives Codex, Claude Code, Copilot, Gemini, and other agents the
instincts of a lazy but dependable senior engineer: understand the system
first, reuse what already works, and write only the code the task actually
needs.

Lazy about implementation. Never lazy about correctness.

Current release: **Panda 5.1.0**, adapted from the stable **Ponytail 5.3.3**
release. Panda versions track this derivative independently. See the
[release notes](docs/releases/5.1.0.md) for changes and compatibility limits.

This release updates implementation rules, expands review/audit to quality and
security, fixes mode persistence across projects and compaction, adds Cursor
hooks and OpenCode 2 support, and adapts the Claude Code task band/board. Panda's
Chinese main Skill, company baseline, project-rule discovery and Surgical Changes
remain in place.

## Core capabilities

- **Minimal implementation:** Understand the real flow, reuse existing capabilities, and add only the minimum compliant code.
- **Surgical Changes:** Keep every changed line tied to the request, its necessary call chain, or required verification; do not casually refactor, format, clean up, or modify unrelated modules.
- **Project-rule discovery:** Before implementation, check the active repository and target-file scope for applicable instruction entry points and their task-relevant references.
- **Quality boundaries:** Never trade security, correctness, company and project rules, or required tests for fewer lines.

## What Panda adds to Ponytail

Panda keeps Ponytail's reuse-first, anti-over-engineering approach and adds four company-oriented guardrails:

| Addition | Effect |
|---|---|
| **Company safety baseline** | Transactions, idempotency, authorization, concurrency controls, logging, monitoring, and required tests cannot be simplified away. |
| **Project-rule discovery** | Before selecting an implementation, the agent checks applicable `AGENTS.md`, `CLAUDE.md`, and other native rule entry points instead of relying only on rules the host happened to preload. |
| **Fixed precedence** | Company safety and quality boundaries > current-project rules > Panda's minimization advice. |
| **Surgical Changes** | Requirement A changes only the code required for A, its necessary call chain, and verification; unrelated module B is not casually refactored, formatted, or cleaned up. |

These are Agent instructions and self-checks, not a filesystem sandbox or hard code-level blocker. They reduce scope drift while still allowing necessary cross-module root-cause fixes.

## The Panda

You know this engineer. Quiet. Unhurried. Possibly holding bamboo.

You show Panda fifty lines of new framework code. Panda looks through the
repository, finds the helper that already exists, removes forty-eight lines,
and goes back to doing nothing.

That is the point.

Panda does not mean careless code or code golf. It means avoiding speculative
abstractions, duplicate implementations, unnecessary dependencies, and layers
that exist only because an AI agent wanted its answer to look impressive.

## Before / after

You ask for a date picker. The agent installs a library, creates a wrapper,
adds a stylesheet, writes timezone glue, and introduces a new maintenance
surface.

With Panda:

```html
<!-- panda: the browser already has one -->
<input type="date">
```

The same rule applies to backend systems: reuse the current Facade, Service,
Factory, cache, configuration, validation, and transaction patterns before
inventing a parallel architecture.

## How it works

Before writing code, Panda stops at the first rung that holds:

```text
1. Does this need to exist?       -> no: skip it (YAGNI)
2. Already in this repository?    -> reuse it
3. Standard library does it?      -> use it
4. Native platform feature?       -> use it
5. Installed dependency does it?  -> use it
6. A very small implementation?   -> write that
7. Only then                      -> add the minimum necessary code
```

The ladder runs only after the agent understands the affected flow and the
current project's rules. Panda shortens the solution, not the investigation.

Panda never simplifies away security, authorization, trust-boundary
validation, error handling, data integrity, transactions, idempotency,
concurrency controls, compatibility, logging, monitoring, accessibility, or
required tests.

## Install

Node.js must be available on `PATH` for lifecycle hooks. The skills still work
without hooks, but automatic activation will not.

### Codex

```bash
codex plugin marketplace add xgzng/panda-plugin
codex plugin add panda@panda
```

Run `codex` and open `/hooks`, review and trust its three lifecycle hooks, and
start a new thread.

This same install also covers the Codex desktop app: restart the app after
installing and it picks up the plugin.

On Windows, if PowerShell blocks `codex.ps1`, run the same two commands with
`codex.cmd` instead. This changes only the executable name, not the install
process.

### Claude Code

Run these as two separate prompts:

```text
/plugin marketplace add xgzng/panda-plugin
/plugin install panda@panda
```

The same steps work in the Claude Code Desktop app's Code tab: type the two
`/plugin` commands above into the prompt box, or click the **+** button, choose
**Plugins** -> **Add plugin**, and manage marketplaces from **Customize** in
the sidebar.

### Other agents

Panda retains Ponytail's adapters for GitHub Copilot CLI, Gemini CLI,
OpenCode, Pi, Qoder, Hermes, OpenClaw, Grok, Cursor, Windsurf, Cline, Kiro,
Devin, and instruction-file compatible agents. See
[`docs/agent-portability.md`](docs/agent-portability.md) for the file and
command mapping.

## Skills

| Skill | Purpose |
|---|---|
| `panda` | Use during development to find the smallest compliant implementation. |
| `panda-review` | Review a change for bugs, security, real load, tests, complexity and unrelated edits. |
| `panda-audit` | Audit repository quality and complexity, ranked by concrete risk. |
| `panda-debt` | Harvest `shortcut:`, `panda:` and legacy `ponytail:` deferrals into a debt ledger. |
| `panda-gain` | Show Ponytail's published upstream benchmark as reference data. |
| `panda-help` | Display the command and mode reference. |

Codex examples:

```text
$panda:panda
$panda:panda-review
$panda:panda-audit
```

## Using Panda with SDD

Panda works alongside SDD tools such as OpenSpec and Superpowers. Their roles
are complementary:

- OpenSpec defines requirements, specifications, tasks, and acceptance criteria.
- Superpowers drives discovery, planning, test-driven development, and verification.
- Panda enforces company safety boundaries, current-project rules, reuse, and the
  smallest correct implementation.

Panda also constrains the change surface: every changed line must serve the
request or a necessary call chain. It does not opportunistically refactor,
reformat, or clean up unrelated code, and it checks the final diff for scope
drift. This is Agent guidance and self-review, not a hard Git enforcement rule.

After installation with trusted hooks, Panda stays active in the default `full`
mode. It does not need to be invoked or switched at every SDD stage. Panda does
not start or replace OpenSpec or Superpowers; invoke `panda-review` explicitly
after implementation to check the diff for over-engineering.

Recommended flow:

```text
OpenSpec: Explore / Propose -> Design / Tasks -> Apply -> Verify / Archive
Panda:    Enforce company boundaries, project rules, reuse, and complexity throughout

Superpowers: Brainstorm -> Plan -> Build / TDD -> Verify
Panda:       Enforce company boundaries, project rules, reuse, and complexity throughout

Before commit: panda-review
```

## Modes

The default is `full`, and the selected mode persists for the current session.
Switch only when changing the enforcement level or disabling Panda, not between
development stages.

| Mode | Behaviour | Codex, current session | Claude Code, current session |
|---|---|---|---|
| `lite` | Build the requested solution and briefly identify the simpler alternative. | `$panda:panda lite` | `/panda lite` |
| `full` | Enforce the reuse and minimum-implementation ladder. Default. | `$panda:panda full` | `/panda full` |
| `ultra` | Challenge speculative requirements and prefer deletion before addition. | `$panda:panda ultra` | `/panda ultra` |
| `off` | Disable persistent Panda guidance. | `$panda:panda off` | `/panda off` |

Call `$panda:panda` in Codex or `/panda` in Claude Code without an argument to
show the current mode when active, or enable the default mode when off.
Live mode state is isolated per project and survives context compaction;
concurrent sessions in the same project still share it. Permanent defaults are
separate from this live state.

To change the default for new sessions permanently:

```text
Codex: $panda:panda default lite
Claude Code: /panda default lite
```

Set the default with `PANDA_DEFAULT_MODE=lite|full|ultra|off`, or create:

```json
{ "defaultMode": "full" }
```

Configuration paths:

- Windows: `%APPDATA%\panda\config.json`
- macOS/Linux: `~/.config/panda/config.json`

Legacy `PONYTAIL_*` environment variables remain accepted for compatibility
with upstream configuration and future merges.

## Claude Code task band and board

Claude Code **2.1.290+** can display task cost, input/output/cache token counts,
agent time, a heuristic reuse count and last test status above the prompt.
Buttons switch level, run review/audit, copy Markdown and open the local board.
`/panda band` toggles it; `/panda band on|off` sets visibility;
`/panda band import` imports past Claude Code sessions.

This UI supports Claude Code terminal and desktop Code sessions, not Codex,
VS Code chat, cloud sessions or `claude -p`. Other hosts still receive the
Panda rules and Skills supported by their adapters.

Metrics and task names stay locally under the Panda config directory's `band/`
folder (`%APPDATA%/panda/band/` on Windows, `~/.config/panda/band/` on macOS/Linux;
`XDG_CONFIG_HOME` takes precedence). No webhook is configured. Sending metrics
requires an explicit HTTPS webhook; task-name sharing defaults to off. Hiding
the band does not disable its ledger; set the plugin's `ledger` option to false
to stop future row writes.

Historical imports may estimate cost using upstream's frozen 2026-10-17 rates;
they are not a verified bill, especially for custom providers. Reuse is a
heuristic for supported languages, not proof of quality or a Java/TBS reuse rate.
Usage observations alone cannot prove savings without comparable baseline tasks.

## Project rules

Panda does not scan every repository on the machine. Before choosing an
implementation or editing files, it checks the active repository and target-file
scope for native project-rule entry points such as `AGENTS.md`, `CLAUDE.md`,
`.github/copilot-instructions.md`, `.cursor/rules/`, `GEMINI.md`, and
`.windsurf/rules/`. It reuses instructions already supplied by the host; otherwise
it reads applicable entry points and only task-relevant files they explicitly
reference. It does not recursively scan arbitrary rule directories.

The shared company boundaries live in
[`rules/company-core.md`](rules/company-core.md).

Precedence:

1. Company safety and quality boundaries.
2. Current-project rules and architecture.
3. Panda's minimization advice.

## Upstream benchmark

> [!NOTE]
> The following figures are **Ponytail's published upstream benchmark results**. They are not measurements of Panda, this fork, or any company repository, and they are not a promise of future savings.

The upstream agentic benchmark used real Claude Code sessions against the same
agent without the skill:

| Compared with no-skill baseline | LOC | Output tokens | Cost | Time | Hidden checks |
|---|---:|---:|---:|---:|---:|
| **Ponytail 5 upstream result** | **-53%** | **-45%** | **-26%** | **-41%** | **97% passed** |

The largest reductions appeared where agents had obvious over-building traps,
such as date pickers and color pickers. Tasks that were already minimal showed
little or no reduction. These are geometric means of per-task median ratios,
from 39 tasks with five runs each (Opus 5.5 in Claude Code). The limited security
subset passed 30/30 runs; this is not universal production-safety evidence.
See the bundled upstream write-up at
[`benchmarks/results/2026-10-07-agentic.md`](benchmarks/results/2026-10-07-agentic.md)
and the original [Ponytail repository](https://github.com/DietrichGebert/ponytail).

## Update and uninstall

Refresh the Git marketplace and reinstall the cached version:

```bash
codex plugin marketplace upgrade panda
codex plugin remove panda
codex plugin add panda@panda
```

Uninstall:

```bash
node scripts/uninstall.js
codex plugin remove panda
codex plugin marketplace remove panda
```

Run the cleanup script before removing the plugin if you also want its local
mode/configuration state removed.

## Development

```bash
node scripts/check-rule-copies.js
node scripts/check-versions.js
npm test
npm run test:band
```

`npm run test:band` needs Claude Code with `plugin test` support and runs mocked
UI/metrics tests without model calls. Core tests use Node.js and existing
Python/Pandas correctness fixtures. Adapter tests simulate behavior and contracts;
all listed clients have not been tested interactively.

Public skill names use Panda. Some internal Hook filenames, `.ponytail-active`,
and the `ponytail-mcp` directory intentionally retain upstream-compatible
names to make future Ponytail merges smaller and preserve existing sessions.

## Origin and license

Panda is based on **[Ponytail](https://github.com/DietrichGebert/ponytail)**,
created by **Dietrich Gebert**. This repository studies, adapts, and extends
Ponytail with Panda branding and company-oriented engineering boundaries.

Ponytail is distributed under the [MIT License](LICENSE). The original
copyright and license notice are preserved. Benchmark material in this
repository belongs to and describes the upstream Ponytail project; Panda does
not claim those results as its own.

See [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md) for the explicit
third-party attribution.

Panda is an independent derivative and is not maintained, sponsored, or
endorsed by Dietrich Gebert or the Ponytail project.
