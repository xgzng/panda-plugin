# Panda company rules

> TODO: Replace this initial baseline only after formal review by the company's
> architecture, security, and engineering-governance owners.

Apply these rules in every company repository. Also follow the current project's native instructions, such as `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, `.cursor/rules/`, `GEMINI.md`, or `.windsurf/rules/` when the active host loads them.

## Engineering floor

- Understand the affected flow and repository conventions before choosing the smallest solution.
- Before choosing an implementation or editing files, check the current repository and target-file scope for applicable project-instruction entry points such as `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md`, `.cursor/rules/`, `GEMINI.md`, and `.windsurf/rules/`.
- Use instructions already supplied by the host without re-reading them; otherwise read the applicable entry points and only task-relevant files they explicitly reference. Respect nested instruction scope. If none exist, continue with company and Panda rules; do not recursively scan arbitrary rule directories.
- Reuse existing layers, components, utilities, platform capabilities, and installed dependencies.
- Optimize for the smallest compliant implementation, not the fewest lines in isolation.
- Never simplify away security, authorization, trust-boundary validation, error handling, or data integrity.
- Preserve required transactions, idempotency, concurrency controls, compatibility, logs, monitoring, and tests.
- LOC, file count, and dependency count are optimization metrics only after correctness, security, regression tests, and project-rule gates pass. Never remove required behavior or safeguards to lower these metrics.
- Do not bypass established architecture boundaries merely to reduce code.
- Add a dependency, abstraction, or framework only when existing capabilities cannot meet the concrete requirement.

## Security floor

This compact implementation baseline is derived from the company's `dfyx_code_security_review` skill and its D1-D10 review dimensions. It guides development but does not replace a dedicated security review for high-risk changes.

- Treat every external value as untrusted: validate at the trust boundary, use parameterized or structured APIs for SQL, commands, LDAP, templates, SpEL, and JNDI, and reject unsafe or non-allowlisted deserialization.
- Preserve the complete token, session, JWT, and filter authentication chain; enforce server-side authorization for every read and write, including ownership, tenant, object-level permission, IDOR, and mass-assignment controls.
- Constrain file operations with size, type, name, and content validation; generate server-side names, canonicalize paths, and keep upload, download, and extraction inside approved storage roots.
- Constrain outbound requests with approved schemes, hosts, and ports; block loopback, private, link-local, and metadata destinations, revalidate redirects and resolved addresses, and set time and response-size limits.
- Use approved cryptography and secure randomness; never hard-code or log credentials, keys, tokens, or secrets, and never disable TLS or certificate verification.
- Keep production configuration fail-closed and least-privileged: restrict CORS, Actuator, debug and admin endpoints, prevent internal error or stack-trace exposure, and separate secrets from source and logs.
- Protect business invariants with explicit state-transition checks, atomic updates, transactions, idempotency, concurrency control, replay protection, rate or quota limits, and auditable security events where the flow requires them.
- Prefer existing vetted dependencies; before adding or upgrading one, verify publisher, version, known CVEs, license, and lockfile or pinning strategy, and never introduce an untrusted package only to reduce implementation effort.

Precedence: company safety and quality boundaries, then current-project rules, then Panda's minimization advice.
