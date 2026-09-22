#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function read(relPath) {
  return fs.readFileSync(path.join(root, relPath), 'utf8').replace(/\r\n/g, '\n').trim();
}

function stripFrontmatter(text) {
  return text.replace(/^---\n[\s\S]*?\n---\n*/, '').trim();
}

const agents = read('AGENTS.md');
const canonical = agents.replace(/\n\n\(Yes, this file also applies[^\n]*\)/, '').trim();

// Compact copies: same body as AGENTS.md, host-specific frontmatter stripped.
const copies = [
  ['.cursor/rules/panda.mdc', stripFrontmatter],
  ['.windsurf/rules/panda.md', text => text.trim()],
  ['.clinerules/panda.md', text => text.trim()],
  ['.agents/rules/panda.md', text => text.trim()],
  ['.qoder/rules/panda.md', text => text.trim()],
  ['.github/copilot-instructions.md', text => text.trim()],
  ['.kiro/steering/panda.md', stripFrontmatter],
];

let failed = false;

for (const [relPath, normalize] of copies) {
  const actual = normalize(read(relPath));
  if (actual !== canonical) {
    console.error(`${relPath} drifted from AGENTS.md`);
    failed = true;
  }
}

// SKILL.md is the runtime source of truth and is longer than the compact body,
// so it cannot be byte-compared. ponytail: canary, not full equality. Assert the
// load-bearing rules survive verbatim in both the source and AGENTS.md. Changing
// a rule's wording trips this, which is the reminder to propagate it everywhere.
// Upgrade path: generate the copies from SKILL.md if this ever misses a real drift.
const INVARIANTS = [
  ['in this codebase', '代码库里已经有了吗'],
  ['naive heuristic', '`panda:` 注释说明上限和升级条件'],
  ['ONE runnable check', '没有验证的非平凡代码不算完成'],
  ['flimsier algorithm', '更脆弱的算法'],
  // the four "not lazy about" safety carve-outs: pin each so a reword in either
  // file can't silently drop one. Only validation was pinned before. These are the
  // continuous substrings present in both files ("prevents data loss" because the
  // full "error handling that prevents data loss" wraps a line in SKILL.md).
  ['input validation at trust boundaries', '信任边界的输入校验'],
  ['prevents data loss', '防止数据丢失'],
  ['security', '安全'],
  ['accessibility', '无障碍'],
  ['Lazy code without its check is unfinished', '没有验证的非平凡代码不算完成'],
  ['Before choosing an implementation or editing files, check the current repository and target-file scope for applicable project-instruction entry points', '在选择实现或编辑文件前，检查当前仓库及目标文件作用域内适用的项目规则入口'],
  ['If none exist, continue with company and Panda rules; do not recursively scan arbitrary rule directories.', '未发现入口时，继续执行公司规则和 Panda 规则；不要递归扫描任意规则目录。'],
  ['Preserve required transactions, idempotency, concurrency controls, compatibility, logs, monitoring, and tests.', '保留需求所需的事务、幂等、并发控制、兼容性、日志、监控和测试。'],
  ['LOC, file count, and dependency count are optimization metrics only after correctness, security, regression tests, and project-rule gates pass.', 'LOC、文件数和依赖数只有在正确性、安全性、回归测试和项目规则门禁通过后，才是优化指标。'],
  ['Precedence: company safety and quality boundaries, then current-project rules,', '裁决顺序：公司安全与质量边界 > 当前项目规则 > Panda 最小实现建议。'],
];

const skill = read('skills/panda/SKILL.md');
for (const [agentsPhrase, skillPhrase] of INVARIANTS) {
  if (!agents.includes(agentsPhrase)) {
    console.error(`AGENTS.md is missing rule invariant: "${agentsPhrase}"`);
    failed = true;
  }
  if (!skill.includes(skillPhrase)) {
    console.error(`skills/panda/SKILL.md is missing rule invariant: "${skillPhrase}"`);
    failed = true;
  }
}

if (failed) {
  console.error('Update the copied rule text, AGENTS.md, or SKILL.md so the shared rules match.');
  process.exit(1);
}

console.log(`Rule copies match AGENTS.md; ${INVARIANTS.length} rule invariants present in SKILL.md and AGENTS.md.`);
