#!/usr/bin/env node

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.join(__dirname, '..');

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), 'utf8');
}

test('Panda main skill is presented in Chinese without changing command literals', () => {
  for (const relPath of ['skills/panda/SKILL.md', '.openclaw/skills/panda/SKILL.md']) {
    const skill = read(relPath);
    for (const marker of [
      '# Panda',
      '## 核心能力',
      '## 最小完整方案',
      '## 外科手术式修改',
      '## 公司规则',
      '### 安全底线',
      '/panda lite|full|ultra',
    ]) {
      assert.ok(skill.includes(marker), `${relPath} is missing Chinese marker: ${marker}`);
    }
  }
});
