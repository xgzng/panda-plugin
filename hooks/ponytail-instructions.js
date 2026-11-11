#!/usr/bin/env node
// Shared Panda instruction builder for Claude hooks and Pi extension.

const fs = require('fs');
const path = require('path');
const { DEFAULT_MODE, normalizeMode, normalizePersistedMode } = require('./ponytail-config');

const INDEPENDENT_MODES = new Set(['review']);
const SKILL_PATH = path.join(__dirname, '..', 'skills', 'panda', 'SKILL.md');
const COMPANY_RULES_PATH = path.join(__dirname, '..', 'rules', 'company-core.md');

function readCompanyRules() {
  try {
    return fs.readFileSync(COMPANY_RULES_PATH, 'utf8').trim();
  } catch (_) {
    return [
      '# Panda company rules',
      '',
      'Follow the current project rules and preserve security, correctness, compatibility, and required operational controls.',
    ].join('\n');
  }
}

function withCompanyRules(body) {
  const text = String(body || '').trim();
  return /^#{1,2} (?:Company rules|Panda company rules|公司规则)/m.test(text)
    ? text
    : text + '\n\n' + readCompanyRules();
}

function filterSkillBodyForMode(body, mode) {
  const effectiveMode = normalizeMode(mode) || DEFAULT_MODE;
  const withoutFrontmatter = String(body || '').replace(/^---[\s\S]*?---\s*/, '');

  // Only the intensity table rows and worked examples are mode-specific, and
  // both are keyed by a mode name (lite/full/ultra). A bullet whose label is
  // not a mode — e.g. "No unrequested abstractions: ..." — is a normal rule
  // and must be kept verbatim.
  return withoutFrontmatter
    .split(/\r?\n/)
    .filter((line) => {
      const tableLabel = line.match(/^\|\s*\*\*(.+?)\*\*\s*\|/);
      if (tableLabel) {
        const labelMode = normalizeMode(tableLabel[1].trim());
        if (labelMode) return labelMode === effectiveMode;
      }

      // Require a quoted value: every worked example is `- lite: "..."`. Without
      // this, an ordinary rule bullet that happens to start with a mode word
      // (e.g. "- Full: ...") is silently dropped in every other mode — it looks
      // like a worked example but is really prose meant to survive verbatim.
      const exampleLabel = line.match(/^-\s*([^:]+):\s*"/);
      if (exampleLabel) {
        const labelMode = normalizeMode(exampleLabel[1].trim());
        if (labelMode) return labelMode === effectiveMode;
      }

      return true;
    })
    .join('\n');
}

function getFallbackInstructions(mode) {
  // The compact rules are the fallback source, so upstream fixes apply here too.
  let compact;
  try {
    compact = fs.readFileSync(path.join(__dirname, '..', 'AGENTS.md'), 'utf8')
      .replace(/\n\n\(Yes, this file also applies[^\n]*\)/, '').trim();
  } catch (_) {
    compact = [
      '# Panda',
      'Complete the task with the smallest compliant implementation and existing capabilities.',
      'Before implementation, read applicable project-rule entry points and task-relevant referenced rules; reuse host-provided instructions.',
      'Surgical Changes: preserve user edits; change only the request, necessary call chains and verification. Check the final diff for unrelated edits.',
      'Preserve security, correctness, transactions, idempotency, concurrency controls, logs, monitoring and required tests.',
      'Company safety/quality boundaries > current-project rules > Panda minimization.',
      'When Ponytail is also active, apply Panda and do one minimization pass.',
    ].join('\n');
  }
  return 'PANDA MODE ACTIVE — level: ' + mode + '\n\n' +
    withCompanyRules(compact) + '\n\nCurrent level: **' + mode + '**. Switch: /panda lite|full|ultra.\n' +
    (mode === 'lite' ? 'Build the request; suggest a smaller alternative without imposing it.'
      : mode === 'ultra' ? 'Challenge speculative scope while completing every explicit requirement.'
      : 'Choose the smallest complete, compliant implementation.');
}

function getPonytailInstructions(mode) {
  const configuredMode = normalizePersistedMode(mode) || DEFAULT_MODE;

  if (configuredMode === 'off') return '';

  if (INDEPENDENT_MODES.has(configuredMode)) {
    return 'PANDA MODE ACTIVE — level: ' + configuredMode + '. Behavior defined by /panda-' + configuredMode + ' skill.\n\n' + readCompanyRules();
  }

  const effectiveMode = normalizeMode(configuredMode) || DEFAULT_MODE;

  try {
    return 'PANDA MODE ACTIVE — level: ' + effectiveMode + '\n\n' +
      withCompanyRules(filterSkillBodyForMode(
        fs.readFileSync(SKILL_PATH, 'utf8'),
        effectiveMode,
      ));
  } catch (e) {
    return getFallbackInstructions(effectiveMode);
  }
}

module.exports = {
  filterSkillBodyForMode,
  getFallbackInstructions,
  getPonytailInstructions,
  withCompanyRules,
};
