#!/usr/bin/env node

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');
const PANDA_REPO = 'https://github.com/xgzng/panda-plugin';
const PANDA_VERSION = '5.0.0';

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
  assert.match(read('plugin.yaml'), /^version:\s*5\.0\.0\s*$/m);
  assert.match(read('README.md'), /Panda 5\.0\.0/);
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
