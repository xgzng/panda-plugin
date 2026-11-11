#!/usr/bin/env node
// Grok Build loads Panda through its native skill system. Lifecycle-hook
// stdout is passive in Grok, so this adapter must not register any hooks.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

test('Grok marketplace discovers the bundled Panda skills without lifecycle hooks', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, '.grok-plugin/marketplace.json'), 'utf8'));
  assert.equal(manifest.name, 'panda');
  assert.equal(manifest.plugins.length, 1);
  assert.equal(manifest.plugins[0].name, 'panda');
  assert.equal(manifest.plugins[0].source, './skills');
  assert.equal(manifest.plugins[0].hooks, undefined);
  assert.ok(fs.existsSync(path.join(root, manifest.plugins[0].source, 'panda/SKILL.md')));
});

test('Grok manifest is a skill-only adapter with no lifecycle hooks', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'plugin.json'), 'utf8'));
  assert.equal(manifest.name, 'panda');
  assert.equal(manifest.hooks, undefined);
  assert.equal(manifest.mcpServers, undefined);
  assert.ok(!fs.existsSync(path.join(root, 'hooks', 'hooks.json')));
  assert.ok(!fs.existsSync(path.join(root, '.grok-plugin', 'hooks.json')));
});

test('Panda skill describes its coding triggers for Grok invocation', () => {
  const skill = fs.readFileSync(path.join(root, 'skills', 'panda', 'SKILL.md'), 'utf8');
  assert.match(skill, /description:\s*>\s*\r?\n\s*Use when/i);
  assert.match(skill, /编码、重构、修复、评审、设计、依赖选择/);
  assert.match(skill, /非编码请求不使用/);
  assert.doesNotMatch(skill, /disable-model-invocation:\s*true/i);
});
