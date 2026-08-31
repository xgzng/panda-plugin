<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/logo-dark.png">
    <img src="assets/logo.png" width="220" alt="Panda，一位懒惰但可靠的资深工程师">
  </picture>
</p>

<h1 align="center">Panda</h1>

<p align="center">
  <em>懒得写没必要的代码，靠谱地交付正确的代码。</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Codex-plugin-111111?style=flat-square" alt="Codex 插件">
  <img src="https://img.shields.io/badge/Claude_Code-plugin-111111?style=flat-square" alt="Claude Code 插件">
  <img src="https://img.shields.io/badge/license-MIT-111111?style=flat-square" alt="MIT 许可证">
</p>

<p align="center">
  <a href="README.md">English</a> | <strong>简体中文</strong>
</p>

> [!IMPORTANT]
> **Panda 是基于 Dietrich Gebert 创建的 [Ponytail](https://github.com/DietrichGebert/ponytail) 学习、修改而来的衍生项目。**
> 本项目遵循 MIT 许可证进行改造。Dietrich Gebert 与 Ponytail 项目不负责维护或背书 Panda。

Panda 是一套面向 AI 编程 Agent 的规则、Skills、插件和生命周期 Hooks。它让 Codex、Claude Code、Copilot、Gemini 等 Agent 像一位懒惰但可靠的资深工程师：先理解系统，优先复用已有能力，只编写需求真正需要的代码。

实现上可以懒，正确性上绝不偷懒。

当前版本：**Panda 5.0.7**，上游基线为 **Ponytail 4.9.0**。Panda 从该版本
开始使用独立版本号，不再把上游版本号当作自己的发布版本。

## 核心能力

- **最小正确实现：** 先理解真实调用链并复用现有能力，只增加满足边界的最少代码。
- **外科手术式修改：** 每一处改动都必须服务于当前需求、必要调用链或必要验证，不顺手重构、格式化、清理或修改无关模块。
- **项目规则发现：** 进入实现前，检查当前仓库和目标文件作用域内适用的规则入口，以及入口明确引用、与任务相关的规则。
- **质量边界：** 不以减少代码为理由牺牲安全、正确性、公司和项目规则或必要测试。

## Panda 在 Ponytail 基础上的增强

Panda 保留 Ponytail“优先复用、反过度设计”的核心能力，并增加四项面向公司项目的工程约束：

| 增强能力 | 实际效果 |
|---|---|
| **公司安全基线** | 事务、幂等、鉴权、并发控制、日志、监控和必要测试不能为了减少代码而被删除。 |
| **项目规则发现** | 选择实现方案前主动检查适用的 `AGENTS.md`、`CLAUDE.md` 等规则入口，不只依赖宿主碰巧预加载的内容。 |
| **固定规则优先级** | 公司安全与质量边界 ＞ 当前项目规则 ＞ Panda 最小实现建议。 |
| **外科手术式修改** | 修改需求 A 时，只改 A、必要调用链和验证所需代码，不顺手重构、格式化或清理无关模块 B。 |

这些能力属于 Agent 提示词约束和交付前自检，不是文件系统隔离或代码级硬拦截；它们会降低范围漂移风险，同时允许修复确实跨模块的公共根因。

## 这只 Panda

你应该认识这样的工程师：安静、不慌不忙，手里可能还拿着竹子。

你给 Panda 看 50 行新框架代码。它先搜索仓库，找到已有的公共能力，删掉其中 48 行，然后继续休息。

这就是 Panda 的意义。

Panda 不是草率开发，也不是代码高尔夫。它要避免的是臆想出来的抽象、重复实现、不必要的依赖，以及 AI 为了让答案看起来专业而增加的层次。

## 使用前后

你要求增加日期选择器。Agent 可能安装一个库、封装一个组件、增加样式文件、编写时区处理，并创造一块新的维护成本。

使用 Panda 后：

```html
<!-- panda: 浏览器已经提供了 -->
<input type="date">
```

后端项目同样如此：在创建平行架构之前，优先复用当前项目已有的 Facade、Service、Factory、缓存、配置、校验和事务模式。

## 工作原理

编写代码前，Panda 会按照下面的顺序判断，并停在第一个可行方案：

```text
1. 这个功能真的需要吗？       -> 不需要：不做（YAGNI）
2. 仓库里已经有实现吗？       -> 直接复用
3. 标准库能完成吗？           -> 使用标准库
4. 平台有原生能力吗？         -> 使用原生能力
5. 已安装依赖能完成吗？       -> 使用现有依赖
6. 能用很小的实现完成吗？     -> 编写这个小实现
7. 前面都不成立               -> 只增加最少的必要代码
```

这套判断只会在 Agent 理解受影响流程和当前项目规则后执行。Panda 简化的是方案，不是调查过程。

Panda 不会为了少写代码而删除安全、鉴权、信任边界校验、错误处理、数据完整性、事务、幂等、并发控制、兼容性、日志、监控、可访问性或必要测试。

## 安装

生命周期 Hooks 要求系统 `PATH` 中能够找到 Node.js。没有 Node.js 时 Skills 仍可手动使用，但自动激活不会生效。

### Codex

```bash
codex plugin marketplace add xgzng/panda-plugin
codex plugin add panda@panda
```

安装完成后运行 `codex`，打开 `/hooks`，检查并信任其中三个生命周期 Hook，然后新建一个任务。

同一套安装也适用于 Codex Desktop：安装完成后重启应用，Codex Desktop 就会加载插件。

Windows 用户如果遇到 PowerShell 禁止运行 `codex.ps1`，只需把上面两条命令中的 `codex` 改为 `codex.cmd`。这只是换用 Windows 命令入口，安装流程不变。

### Claude Code

把下面两行作为两次独立指令执行：

```text
/plugin marketplace add xgzng/panda-plugin
/plugin install panda@panda
```

Claude Code Desktop 的 Code 页面也使用相同步骤：可以在输入框中分别输入上面两条 `/plugin` 命令，也可以点击输入框旁边的 **+**，选择 **Plugins** -> **Add plugin**；marketplace 可在侧边栏的 **Customize** 中管理。

### 其他 Agent

Panda 保留了 Ponytail 对 GitHub Copilot CLI、Gemini CLI、OpenCode、Pi、Qoder、Hermes、OpenClaw、Grok、Cursor、Windsurf、Cline、Kiro、Devin 以及兼容指令文件的 Agent 的适配。具体文件和命令映射见 [`docs/agent-portability.md`](docs/agent-portability.md)。

## Skills

| Skill | 用途 |
|---|---|
| `panda` | 开发时寻找满足项目约束的最小实现。 |
| `panda-review` | 提交或合并前检查当前 diff 中的过度设计。 |
| `panda-audit` | 审计整个仓库中不必要的复杂度。 |
| `panda-debt` | 汇总代码中的 `panda:` 简化标记，形成技术债清单。 |
| `panda-gain` | 展示 Ponytail 发布的上游基准数据，仅供参考。 |
| `panda-help` | 显示命令、Skill 和模式速查说明。 |

Codex 调用示例：

```text
$panda:panda
$panda:panda-review
$panda:panda-audit
```

## 与 SDD 配合

Panda 可以和 OpenSpec、Superpowers 等 SDD 工具同时使用，但职责不同：

- OpenSpec 负责明确需求、规格、任务和验收条件。
- Superpowers 负责需求分析、计划、测试驱动开发和验证流程。
- Panda 负责公司安全底线、当前项目规则、优先复用和最小正确实现。

Panda 还会约束改动范围：每一处改动必须服务于当前需求或必要调用链，
不得顺手重构、格式化或清理无关代码，并在结束前检查 Diff 是否发生范围
漂移。这是 Agent 规则和自检机制，不是 Git 层面的强制拦截。

安装并启用 Hooks 后，Panda 默认以 `full` 模式持续生效，无需在每个
SDD 阶段重复调用或切换模式。Panda 不会自动启动或替代 OpenSpec、
Superpowers；开发完成后仍需主动调用 `panda-review` 检查过度设计。

推荐流程：

```text
OpenSpec：Explore / Propose -> Design / Tasks -> Apply -> Verify / Archive
Panda：   全程约束公司边界、项目规则、复用和实现复杂度

Superpowers：Brainstorm -> Plan -> Build / TDD -> Verify
Panda：       全程约束公司边界、项目规则、复用和实现复杂度

提交前：panda-review
```

## 模式

默认使用 `full`，并在当前会话持续生效。只有需要调整约束强度或临时
关闭时才切换，不需要按开发阶段切换。

| 模式 | 行为 | Codex 当前会话 | Claude Code 当前会话 |
|---|---|---|---|
| `lite` | 完成需求，并简要指出更简单的替代方案。 | `$panda:panda lite` | `/panda lite` |
| `full` | 强制执行复用和最小实现判断顺序，默认模式。 | `$panda:panda full` | `/panda full` |
| `ultra` | 质疑推测性需求，优先删除再考虑新增。 | `$panda:panda ultra` | `/panda ultra` |
| `off` | 关闭 Panda 的持续指导。 | `$panda:panda off` | `/panda off` |

不带参数调用 `$panda:panda`（Codex）或 `/panda`（Claude Code）可查看
当前模式。会话内切换只持续到会话结束。

永久修改新会话的默认模式：

```text
Codex：$panda:panda default lite
Claude Code：/panda default lite
```

通过 `PANDA_DEFAULT_MODE=lite|full|ultra|off` 设置默认模式，或者创建配置：

```json
{ "defaultMode": "full" }
```

配置路径：

- Windows：`%APPDATA%\panda\config.json`
- macOS/Linux：`~/.config/panda/config.json`

为兼容上游配置和后续合并，Panda 仍接受旧的 `PONYTAIL_*` 环境变量。

## 项目规则

Panda 不会扫描电脑上的所有仓库。在选择实现方案或修改文件前，它会检查当前仓库和目标文件作用域内的项目规则入口，例如 `AGENTS.md`、`CLAUDE.md`、`.github/copilot-instructions.md`、`.cursor/rules/`、`GEMINI.md` 和 `.windsurf/rules/`。宿主已经注入的规则会直接复用；否则只读取适用入口及其明确引用、与当前任务相关的规则文件，不会递归扫描任意规则目录。

公司级公共边界位于 [`rules/company-core.md`](rules/company-core.md)。

规则优先级：

1. 公司安全与质量边界。
2. 当前项目规则与架构。
3. Panda 的最小实现建议。

## 上游基准数据

> [!NOTE]
> 以下数据是 **Ponytail 发布的上游基准测试结果**，不是 Panda、本衍生项目或任何公司仓库的实测结果，也不构成收益承诺。

上游实验在真实 Claude Code 会话中，将使用 Skill 的 Agent 与未使用 Skill 的同一 Agent 进行比较：

| 相比未使用 Skill 的基线 | 新增 LOC | Token | 成本 | 时间 | 安全测试 |
|---|---:|---:|---:|---:|---:|
| **Ponytail 上游结果** | **-54%** | **-22%** | **-20%** | **-27%** | **20/20 通过** |

当任务存在明显的过度构建空间时，例如日期或颜色选择器，减少最明显；原本已经很精简的任务则变化很小。详情见仓库中保留的上游报告 [`benchmarks/results/2026-06-18-agentic.md`](benchmarks/results/2026-06-18-agentic.md) 和 [Ponytail 原项目](https://github.com/DietrichGebert/ponytail)。

## 更新与卸载

刷新 Git marketplace 并重新安装缓存版本：

```bash
codex plugin marketplace upgrade panda
codex plugin remove panda
codex plugin add panda@panda
```

卸载：

```bash
node scripts/uninstall.js
codex plugin remove panda
codex plugin marketplace remove panda
```

如果还需要清除本地模式和配置状态，请在移除插件前先运行清理脚本。

## 开发与验证

```bash
node scripts/check-rule-copies.js
npm test
```

公开 Skill 名称均使用 Panda。部分内部 Hook 文件名、`.ponytail-active` 和 `ponytail-mcp` 目录有意保留上游兼容名称，以减少后续合并 Ponytail 更新时的冲突，并兼容已有会话。

## 来源与许可证

Panda 基于 **Dietrich Gebert** 创建的 **[Ponytail](https://github.com/DietrichGebert/ponytail)** 学习和改造。本仓库在 Ponytail 的基础上增加了 Panda 品牌和面向公司的工程约束。

Ponytail 使用 [MIT License](LICENSE) 发布，原版权和许可证声明均已保留。本仓库中的基准材料属于并描述上游 Ponytail 项目，Panda 不会将这些结果宣称为自己的实测收益。

第三方归属说明见 [`THIRD_PARTY_NOTICES.md`](THIRD_PARTY_NOTICES.md)。

Panda 是独立衍生项目，不由 Dietrich Gebert 或 Ponytail 项目维护、赞助或背书。
