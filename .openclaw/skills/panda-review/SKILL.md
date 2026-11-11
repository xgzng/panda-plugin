---
name: panda-review
description: "Review a change: correctness, security, real load, tests, speed, complexity and unrelated edits. Concrete findings with the smallest fix."
homepage: https://github.com/xgzng/panda-plugin
license: MIT
---

# Panda Review

Review like the senior developer who will be paged when this breaks. Prioritize
correctness, safety, real load, tests, speed, then lean code. Follow company and
applicable project rules. This is a full report, not a session-mode change.

## Understand the change

- Review the user's target: a diff, commit, branch, PR or files. With no target,
  review uncommitted changes, or the last commit if there are none.
- Read the diff, applicable project rules, connected callers and callees, tests,
  README and relevant deployment configuration. Trace input, storage and output.
- Search all callers when a signature, return value or behavior changes.
- State the expected load using repository evidence. Do not invent scale.

## Check

1. **Bug:** wrong result, crash, missed edge case, broken caller or symptom-only fix.
2. **Risk:** injection, secrets, missing authorization or validation, data loss,
   swallowed errors, unsafe write order or missing transaction/idempotency controls.
3. **Scale:** races, unbounded state, repeated cross-process work, N+1 queries,
   expensive algorithms on realistic input, process-local state that must be shared.
4. **Missing test:** risky new logic without a check that fails when it breaks.
   Reuse the existing framework; required tests and fixtures are not bloat.
5. **Speed:** material regressions first; small wins are suggestions, judged against
   the project's latency requirements.
6. **Lean:** delete unused/speculative code, reuse existing helpers (name the path),
   use stdlib/native features, merge duplication that must change together, split
   mixed responsibilities by job. Avoid abstractions or dependencies without need.
7. **Surgical Changes:** identify unrelated formatting, refactoring or cleanup.
   Each changed line must serve the task, a necessary call chain or verification.
   Preserve pre-existing user work; allow explained cross-module root-cause fixes.

## Verify findings

- Every finding needs a reachable input or situation and its concrete bad result.
  Re-read code and confirm the affected caller, value or reference actually exists.
- Before declaring code dead, search tests, fixtures, configuration and dynamic references.
- A `shortcut:` or older `panda:` / `ponytail:` comment naming a limit is a deliberate
  decision, unless expected load crosses that limit.
- Propose the smallest compliant fix, retaining company/project safety boundaries.
  No taste-only style feedback or unsupported worries.

## Report

Use the user's language and plain explanations. Begin with what the change does
in two or three sentences and the load assumed. Group numbered findings by
**Must fix**, **Should fix**, **Nice to have**, omitting empty groups.

Each finding includes a concrete file/line, **What this is**, **Problem**,
**Smallest fix**, and **If skipped**. Maintain continuous numbering so the user can
request specific fixes. Name reusable code paths when suggesting reuse.

End with **Verdict**, potential line reduction only when supported by findings,
and **Not checked** for material gaps. If nothing is found, state what was checked
and that the change looks ready. Do not claim unexecuted tests passed.

Report only. Do not apply fixes or change the active Panda mode.
