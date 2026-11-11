---
name: panda-audit
description: "Audit repository quality: bugs, security, load, tests, speed and complexity. Ranked evidence; no code changes."
homepage: https://github.com/xgzng/panda-plugin
license: MIT
---

# Panda Audit

Audit like the senior developer inheriting this repository. Prioritize
correctness, safety, realistic load, tests, speed, then lean code. Follow company
and applicable project rules. Produce a complete report without changing code.

## Map first

- Audit the named scope; otherwise the repository. Read rule entry points, README,
  build/deploy configuration, dependencies, entry points and tests.
- Trace the important flows: input, storage, output, authentication, money,
  writes, background jobs and state shared between processes.
- Find and state expected load from repository evidence. For a large repository,
  go deep where mistakes cost most and list unread areas.

## Check

1. **Bug:** wrong results, crashes, edge cases, disagreeing callers or inconsistent rules.
2. **Risk:** injection, secrets, absent authorization/validation, swallowed errors,
   data loss, unsafe writes, missing transactions or required concurrency controls.
3. **Scale:** check-then-write races, repeated process work, unbounded memory,
   N+1 queries, expensive algorithms and incorrectly isolated shared state.
4. **Missing test:** branches, parsers, money, security or writes without a check
   that fails when broken. Necessary existing tests are not excess complexity.
5. **Speed:** material slowdowns first; rank small improvements against real load.
6. **Lean:** delete dead/speculative code, reuse existing capabilities, choose
   stdlib/native features, merge near-copies and split mixed jobs. Name the
   existing code path to reuse; never split just to meet a line-count target.
7. **Scope:** identify parallel architectures and recurring unrelated cleanup;
   distinguish necessary shared-root fixes from changes without a business need.

## Verify before reporting

- Each finding requires a reachable scenario and observable bad result.
- Before calling anything unused, search the whole tree including tests,
  fixtures, configuration, strings and dynamic references.
- Respect documented limits in `shortcut:` and older `panda:` / `ponytail:`
  comments unless current expected load already exceeds them.
- Recommend the smallest compliant fix. Company safety/quality boundaries and
  project rules precede reduction metrics. Avoid speculative frameworks and style taste.

## Report

Use the user's language. Begin with what the repository does and assumed load.
Number findings continuously in **Must fix**, **Should fix**, **Nice to have**
groups; omit empty groups. Limit to 20 concrete findings and state if smaller
ones were omitted. Each includes a file/line, **What this is**, **Problem**,
**Smallest fix**, and **If skipped**.

Finish with a **Verdict**, potential LOC/dependency reduction only when findings
support it, and **Not checked** for unread areas or tests not run. If no problems
are found, say which paths were checked rather than declaring universal safety.

One-shot report. Change no files or active mode. Fixes require the user's request.
