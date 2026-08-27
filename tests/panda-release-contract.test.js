#!/usr/bin/env node

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const PANDA_REPO = 'https://github.com/xgzng/panda-plugin';
const PANDA_VERSION = '5.0.5';

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), 'utf8');
}

function json(relPath) {
  return JSON.parse(read(relPath).replace(/^\uFEFF/, ''));
}

test('skill-only installs carry every company rule', () => {
  const companyRules = read('rules/company-core.md')
    .split(/\r?\n/)
    .filter((line) => line.startsWith('- '));
  const skillCopies = [
    'skills/panda/SKILL.md',
    '.openclaw/skills/panda/SKILL.md',
  ];

  assert.ok(companyRules.length >= 7, 'expected the company rule baseline');
  for (const relPath of skillCopies) {
    const skill = read(relPath);
    for (const rule of companyRules) {
      assert.ok(skill.includes(rule), `${relPath} is missing company rule: ${rule}`);
    }
  }
});

test('company security floor preserves the D1-D10 review dimensions', () => {
  const companyRules = read('rules/company-core.md');
  const requiredMarkers = [
    'dfyx_code_security_review',
    'D1-D10',
    'SQL, commands, LDAP, templates, SpEL, and JNDI',
    'token, session, JWT, and filter authentication chain',
    'file operations',
    'outbound requests',
    'cryptography and secure randomness',
    'CORS, Actuator, debug and admin endpoints',
    'business invariants',
    'known CVEs',
  ];

  for (const marker of requiredMarkers) {
    assert.ok(companyRules.includes(marker), `company security floor is missing: ${marker}`);
  }
});

test('quality gates take precedence over reduction metrics', () => {
  const requiredRule = 'LOC, file count, and dependency count are optimization metrics only after correctness, security, regression tests, and project-rule gates pass. Never remove required behavior or safeguards to lower these metrics.';
  const ruleSources = [
    'rules/company-core.md',
    'skills/panda/SKILL.md',
    '.openclaw/skills/panda/SKILL.md',
    'AGENTS.md',
  ];

  for (const relPath of ruleSources) {
    assert.ok(read(relPath).includes(requiredRule), `${relPath} is missing the quality-gate rule`);
  }
});

test('Panda is authoritative when Ponytail is also active', () => {
  const rule = 'When Ponytail is also active, Panda is authoritative: follow Panda when guidance differs, and do not repeat Ponytail\'s minimization pass.';
  const ruleSources = [
    'skills/panda/SKILL.md',
    '.openclaw/skills/panda/SKILL.md',
  ];

  for (const relPath of ruleSources) {
    assert.ok(read(relPath).includes(rule), `${relPath} is missing the Panda precedence rule`);
  }
});

test('Panda constrains every change to the requested scope', () => {
  const requiredMarkers = [
    '## Surgical changes',
    'Every changed line must trace to the user request, a necessary affected call chain, or required verification.',
    'Do not opportunistically refactor, reformat, clean up, or improve adjacent or unrelated code.',
    'Remove only imports, variables, functions, or files made unused by the current change.',
    'Inspect existing worktree changes before editing. Preserve pre-existing user changes;',
    'Cross-module changes are allowed only when required by the real call chain or root cause',
    'Before finishing, inspect the diff and remove changes that cannot be justified by the request, its necessary call chain, or required verification.',
  ];
  const skillCopies = [
    'skills/panda/SKILL.md',
    '.openclaw/skills/panda/SKILL.md',
  ];

  for (const relPath of skillCopies) {
    const skill = read(relPath);
    for (const marker of requiredMarkers) {
      assert.ok(skill.includes(marker), `${relPath} is missing scope control: ${marker}`);
    }
  }
});

test('Panda presents Surgical Changes as a core capability', () => {
  const expected = [
    '## Core capabilities',
    '**Surgical Changes:** Keep every changed line tied to the request',
  ];
  const sources = [
    'skills/panda/SKILL.md',
    '.openclaw/skills/panda/SKILL.md',
    'skills/panda-help/SKILL.md',
    '.openclaw/skills/panda-help/SKILL.md',
    'README.md',
  ];

  for (const relPath of sources) {
    const content = read(relPath);
    for (const marker of expected) {
      assert.ok(content.includes(marker), `${relPath} is missing capability summary: ${marker}`);
    }
  }

  assert.match(read('README.zh-CN.md'), /\*\*外科手术式修改：\*\*每一处改动都必须服务于当前需求/);
});

test('Panda discovery descriptions advertise Surgical Changes', () => {
  const canonicalFrontmatter = read('skills/panda/SKILL.md').split('---')[1];
  const openClawFrontmatter = read('.openclaw/skills/panda/SKILL.md').split('---')[1];
  const codexManifest = json('.codex-plugin/plugin.json');

  assert.match(canonicalFrontmatter, /Surgical Changes/);
  assert.match(canonicalFrontmatter, /unrelated/);
  assert.match(openClawFrontmatter, /Surgical Changes/);
  assert.match(openClawFrontmatter, /unrelated/);
  assert.match(codexManifest.description, /Surgical Changes/);
  assert.match(codexManifest.interface.longDescription, /unrelated modules/);
});

test('Panda manifests point users to Panda while preserving upstream notices separately', () => {
  const manifests = [
    'package.json',
    '.codex-plugin/plugin.json',
    '.devin-plugin/plugin.json',
    '.github/plugin/plugin.json',
    '.qoder-plugin/plugin.json',
  ];

  for (const relPath of manifests) {
    const manifest = json(relPath);
    assert.equal(manifest.homepage, PANDA_REPO, `${relPath} homepage`);
    const repository = typeof manifest.repository === 'string'
      ? manifest.repository
      : manifest.repository && manifest.repository.url;
    assert.ok(repository && repository.includes('xgzng/panda-plugin'), `${relPath} repository`);
  }

  const pkg = json('package.json');
  assert.equal(pkg.bugs.url, `${PANDA_REPO}/issues`);
  assert.equal(json('.codex-plugin/plugin.json').interface.websiteURL, PANDA_REPO);
  assert.match(read('THIRD_PARTY_NOTICES.md'), /DietrichGebert\/ponytail/);
});

test('Panda release version is independent and consistent', () => {
  const versionFiles = [
    'package.json',
    '.codex-plugin/plugin.json',
    '.claude-plugin/plugin.json',
    '.devin-plugin/plugin.json',
    '.github/plugin/plugin.json',
    '.qoder-plugin/plugin.json',
    'gemini-extension.json',
    'ponytail-mcp/package.json',
  ];

  for (const relPath of versionFiles) {
    assert.equal(json(relPath).version, PANDA_VERSION, relPath);
  }
  assert.match(read('plugin.yaml'), /^version:\s*5\.0\.5\s*$/m);
  assert.match(read('README.md'), /Panda 5\.0\.5/);
  assert.match(read('README.md'), /Ponytail 4\.9\.0/);
});

test('portability docs never tell Panda users to install Ponytail', () => {
  const docs = read('docs/agent-portability.md');
  assert.doesNotMatch(docs, /plugin install ponytail@ponytail/);
  assert.doesNotMatch(docs, /plugin marketplace add DietrichGebert\/ponytail/);
  assert.doesNotMatch(docs, /skills add https:\/\/github\.com\/DietrichGebert\/ponytail/);
  assert.doesNotMatch(docs, /\.cursor\/rules\/ponytail\.mdc/);
  assert.match(docs, /not yet verified/i);
});

test('Panda distribution excludes upstream marketing and publishing artifacts', () => {
  const removed = [
    '.github/FUNDING.yml',
    '.github/workflows/publish.yml',
    'assets/logo-greenpt.svg',
    'assets/logo-greenpt-dark.svg',
    'assets/waitlist-banner.png',
    'assets/waitlist-banner-es.png',
    'assets/waitlist-banner-ko.png',
  ];

  for (const relPath of removed) {
    assert.equal(fs.existsSync(path.join(root, relPath)), false, relPath);
  }
});
