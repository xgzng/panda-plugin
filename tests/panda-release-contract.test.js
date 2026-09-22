#!/usr/bin/env node

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { getPonytailInstructions } = require('../hooks/ponytail-instructions');

const root = path.join(__dirname, '..');
const PANDA_REPO = 'https://github.com/xgzng/panda-plugin';
const PANDA_VERSION = '5.0.8';

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), 'utf8');
}

function json(relPath) {
  return JSON.parse(read(relPath).replace(/^\uFEFF/, ''));
}

test('skill-only installs carry every company rule', () => {
  const requiredMarkers = [
    '在选择最小方案前，先理解受影响流程和仓库约定。',
    '检查当前仓库及目标文件作用域内适用的项目规则入口',
    '优先复用已有分层、组件、工具类、平台能力和已安装依赖。',
    '保留需求所需的事务、幂等、并发控制、兼容性、日志、监控和测试。',
    '不得仅为了减少代码而绕过既有架构边界。',
    '所有外部输入都视为不可信',
    '通过显式状态流转检查、原子更新、事务、幂等、并发控制',
  ];
  const skillCopies = [
    'skills/panda/SKILL.md',
    '.openclaw/skills/panda/SKILL.md',
  ];

  for (const relPath of skillCopies) {
    const skill = read(relPath);
    for (const marker of requiredMarkers) {
      assert.ok(skill.includes(marker), `${relPath} is missing company rule: ${marker}`);
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
  const englishRule = 'LOC, file count, and dependency count are optimization metrics only after correctness, security, regression tests, and project-rule gates pass. Never remove required behavior or safeguards to lower these metrics.';
  const chineseRule = 'LOC、文件数和依赖数只有在正确性、安全性、回归测试和项目规则门禁通过后，才是优化指标。不得为了降低指标而删除必要行为或保护措施。';
  const englishSources = [
    'rules/company-core.md',
    'AGENTS.md',
  ];
  const chineseSources = ['skills/panda/SKILL.md', '.openclaw/skills/panda/SKILL.md'];

  for (const relPath of englishSources) {
    assert.ok(read(relPath).includes(englishRule), `${relPath} is missing the quality-gate rule`);
  }
  for (const relPath of chineseSources) {
    assert.ok(read(relPath).includes(chineseRule), `${relPath} is missing the Chinese quality-gate rule`);
  }
});

test('Panda checks applicable project-rule entry points before implementation', () => {
  const requiredMarkers = [
    'Before choosing an implementation or editing files, check the current repository and target-file scope for applicable project-instruction entry points',
    'Use instructions already supplied by the host without re-reading them',
    'Respect nested instruction scope.',
    'If none exist, continue with company and Panda rules; do not recursively scan arbitrary rule directories.',
  ];
  const englishSources = ['rules/company-core.md', 'AGENTS.md'];
  const chineseMarkers = [
    '检查当前仓库及目标文件作用域内适用的项目规则入口',
    '宿主已经提供的规则直接使用，不重复读取',
    '遵守嵌套规则的作用域。',
    '不要递归扫描任意规则目录。',
  ];
  const chineseSources = ['skills/panda/SKILL.md', '.openclaw/skills/panda/SKILL.md'];

  for (const relPath of englishSources) {
    const rules = read(relPath);
    for (const marker of requiredMarkers) {
      assert.ok(rules.includes(marker), `${relPath} is missing project-rule discovery guidance: ${marker}`);
    }
  }
  for (const relPath of chineseSources) {
    const rules = read(relPath);
    for (const marker of chineseMarkers) {
      assert.ok(rules.includes(marker), `${relPath} is missing Chinese project-rule guidance: ${marker}`);
    }
  }
});

test('every active Panda mode injects project-rule discovery guidance', () => {
  const marker = '在选择实现或编辑文件前，检查当前仓库及目标文件作用域内适用的项目规则入口';

  for (const mode of ['lite', 'full', 'ultra']) {
    assert.ok(getPonytailInstructions(mode).includes(marker), `${mode} is missing project-rule discovery guidance`);
  }
});

test('Panda is authoritative when Ponytail is also active', () => {
  const rule = 'Ponytail 与 Panda 同时生效时，以 Panda 为最终工程约束；两者规则不一致时遵循 Panda，并且不要重复执行 Ponytail 的最小化检查。';
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
    '## 外科手术式修改',
    '每一处改动都必须能够追溯到用户需求、必要的受影响调用链或必要验证。',
    '不顺手重构、重新格式化、清理或优化相邻及无关代码。',
    '只清理由本次改动直接造成的无用 import、变量、函数或文件。',
    '编辑前检查工作区已有改动并予以保留。',
    '只有真实调用链或根因要求时，才允许跨模块修改',
    '结束前检查 Diff，移除无法由当前需求、必要调用链或必要验证解释的改动。',
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
  const chineseExpected = [
    '## 核心能力',
    '**Surgical Changes（外科手术式修改）：**每一处改动都必须服务于当前需求',
  ];
  const chineseSources = ['skills/panda/SKILL.md', '.openclaw/skills/panda/SKILL.md'];
  const englishExpected = [
    '## Core capabilities',
    '**Surgical Changes:** Keep every changed line tied to the request',
  ];
  const englishSources = [
    'skills/panda-help/SKILL.md',
    '.openclaw/skills/panda-help/SKILL.md',
    'README.md',
  ];

  for (const relPath of chineseSources) {
    const content = read(relPath);
    for (const marker of chineseExpected) {
      assert.ok(content.includes(marker), `${relPath} is missing capability summary: ${marker}`);
    }
  }
  for (const relPath of englishSources) {
    const content = read(relPath);
    for (const marker of englishExpected) {
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
  assert.match(canonicalFrontmatter, /无关模块/);
  assert.match(openClawFrontmatter, /Surgical Changes/);
  assert.match(openClawFrontmatter, /unrelated/);
  assert.match(codexManifest.description, /Surgical Changes/);
  assert.match(codexManifest.interface.longDescription, /unrelated modules/);
});

test('Codex default prompts fit the interface limit and preserve Panda guidance', () => {
  const prompts = json('.codex-plugin/plugin.json').interface.defaultPrompt;

  assert.ok(Array.isArray(prompts), 'defaultPrompt must be an array');
  assert.ok(prompts.length <= 3, 'Codex supports at most three default prompts');
  for (const prompt of prompts) {
    assert.ok(prompt.length <= 128, `default prompt exceeds 128 characters: ${prompt}`);
  }

  const combined = prompts.join(' ');
  assert.match(combined, /Panda mode/);
  assert.match(combined, /over-engineering/);
  assert.match(combined, /unrelated changes/);
  assert.match(combined, /smallest correct and compliant implementation/);
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
  assert.match(read('plugin.yaml'), /^version:\s*5\.0\.8\s*$/m);
  assert.match(read('README.md'), /Panda 5\.0\.8/);
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
