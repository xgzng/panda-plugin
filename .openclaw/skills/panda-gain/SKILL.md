---
name: panda-gain
description: "Show the upstream Ponytail benchmark as a reference scoreboard. Not a Panda or per-repository measurement."
homepage: https://github.com/xgzng/panda-plugin
license: MIT
---

# Panda Gain

Display the upstream reference scoreboard below. Do not change mode, write flag
files, or persist anything.

```text
Panda reference - Ponytail upstream benchmark

Lines of code   -53%
Output tokens   -45%
AI cost         -26%
Completion time -41%
Hidden checks   97% passed (baseline 96%)
Risky logic tested 98% (baseline 68%)
```

Source: Ponytail 5's published 2026-10-07 agentic benchmark: 39 tasks, five
runs each, Claude Code with Opus 5.5 and default effort. Reduction figures are
geometric means of per-task median ratios, not total-token reductions. Read
`benchmarks/results/2026-10-07-agentic.md` for scope and uncertainty.

State that these figures come from Ponytail's agentic benchmark and are not
Panda measurements or current-repository savings. Never invent a per-repository
savings number because no observed baseline exists for code that was not built.
The six-task security subset passed 30/30 runs; this does not establish universal
production safety. Do not relabel upstream results as Panda measurements.

For repository evidence, point to `panda-debt` for counted deferrals and
`panda-audit` for current simplification opportunities.

One-shot display. Change nothing.
