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

安装完成后运行 `codex`，打开 `/hooks`，检查并信任其中两个生命周期 Hook，然后新建一个任务。

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

## 模式

| 模式 | 行为 |
|---|---|
| `lite` | 完成需求，并简要指出更简单的替代方案。 |
| `full` | 强制执行复用和最小实现判断顺序，默认模式。 |
| `ultra` | 质疑推测性需求，优先删除再考虑新增。 |
| `off` | 关闭 Panda 的持续指导。 |

通过 `PANDA_DEFAULT_MODE=lite|full|ultra|off` 设置默认模式，或者创建配置：

```json
{ "defaultMode": "full" }
```

配置路径：

- Windows：`%APPDATA%\panda\config.json`
- macOS/Linux：`~/.config/panda/config.json`

为兼容上游配置和后续合并，Panda 仍接受旧的 `PONYTAIL_*` 环境变量。

## 项目规则

Panda 不会扫描电脑上的所有仓库。它通过当前 Agent 原生的项目规则机制工作，包括 `AGENTS.md`、`CLAUDE.md`、`.github/copilot-instructions.md`、`.cursor/rules/`、`GEMINI.md` 和 `.windsurf/rules/`。

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
