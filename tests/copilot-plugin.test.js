#!/usr/bin/env node
// Smoke test for the Copilot plugin adapter: keep command wiring minimal and
// ensure the debt command is part of the shared command surface.

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

test('Codex local marketplace points at the repository plugin root', () => {
  const marketplace = JSON.parse(fs.readFileSync(path.join(root, '.agents', 'plugins', 'marketplace.json'), 'utf8'));
  const panda = marketplace.plugins.find((plugin) => plugin.name === 'panda');
  assert.ok(panda, 'Panda must be listed in the Codex marketplace');
  assert.deepEqual(panda.source, { source: 'local', path: '.' });
});
const REQUIRED_COMMAND_FILES = [
  'panda.toml',
  'panda-review.toml',
  'panda-audit.toml',
  'panda-debt.toml',
  'panda-gain.toml',
  'panda-help.toml',
];

function readJSON(relPath) {
  return JSON.parse(fs.readFileSync(path.join(root, relPath), 'utf8'));
}

test('copilot plugin command directory includes panda-debt', () => {
  const manifest = readJSON('.github/plugin/plugin.json');
  assert.equal(manifest.name, 'panda');
  assert.equal(manifest.commands, 'commands/');

  for (const file of REQUIRED_COMMAND_FILES) {
    assert.ok(
      fs.existsSync(path.join(root, manifest.commands, file)),
      `missing command file: ${manifest.commands}${file}`,
    );
  }
});
