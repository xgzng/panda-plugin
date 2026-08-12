# Panda company rules

Apply these rules in every company repository. Also follow the current project's native instructions, such as `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, `.cursor/rules/`, `GEMINI.md`, or `.windsurf/rules/` when the active host loads them.

- Understand the affected flow and repository conventions before choosing the smallest solution.
- Reuse existing layers, components, utilities, platform capabilities, and installed dependencies.
- Optimize for the smallest compliant implementation, not the fewest lines in isolation.
- Never simplify away security, authorization, trust-boundary validation, error handling, or data integrity.
- Preserve required transactions, idempotency, concurrency controls, compatibility, logs, monitoring, and tests.
- Do not bypass established architecture boundaries merely to reduce code.
- Add a dependency, abstraction, or framework only when existing capabilities cannot meet the concrete requirement.

Precedence: company safety and quality boundaries, then current-project rules, then Panda's minimization advice.
