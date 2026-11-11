#!/usr/bin/env node
// Kimi consumes the existing rule entry and skill directories without a new runtime.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, '..');

test('Kimi manifest uses Panda company rules and all six skills', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, '.kimi-plugin/plugin.json'), 'utf8'));
  assert.equal(manifest.name, 'panda');
  const rules = path.resolve(root, manifest.systemPromptPath);
  assert.ok(fs.statSync(rules).size < 32 * 1024, 'Kimi ignores oversized system prompts');
  assert.match(fs.readFileSync(rules, 'utf8'), /Panda company rules/);
  for (const name of ['panda', 'panda-review', 'panda-audit', 'panda-debt', 'panda-gain', 'panda-help']) {
    assert.ok(fs.existsSync(path.join(root, manifest.skills, name, 'SKILL.md')), `${name} must ship`);
  }
});
