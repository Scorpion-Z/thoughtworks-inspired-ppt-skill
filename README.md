# Thoughtworks Inspired PPT Skill

![Skill](https://img.shields.io/badge/Skill-Agent-111111?style=flat-square)
![HTML Deck](https://img.shields.io/badge/HTML-Deck-0A7CFF?style=flat-square)
![Codex](https://img.shields.io/badge/Codex-Supported-222222?style=flat-square)
![License](https://img.shields.io/github/license/Scorpion-Z/thoughtworks-inspired-ppt-skill?style=flat-square)

一个适配 Codex、Claude Code、Cursor 等 Agent 环境的 HTML PPT Skill，用于生成 **Thoughtworks-inspired 风格** 的网页演示文稿、结构图、路线图、能力框架图和汇报型封面。

> 说明：本项目不是 Thoughtworks 官方模板，不包含 Thoughtworks 官方 logo、官方字体文件、官方插画或专有资产，也不暗示官方授权。它只提供一种受公开设计语言启发的演示文稿方法和模板。

## 30 秒开始

推荐安装方式：

```bash
npx skills add https://github.com/Scorpion-Z/thoughtworks-inspired-ppt-skill --skill thoughtworks-inspired-ppt-skill
```

如果你的本地环境没有 `skills` 命令，或希望精确安装到 Codex 项目目录，使用：

```bash
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill
```

默认安装到：

```text
.codex/skills/thoughtworks-inspired-ppt-skill
```

安装后在 Codex 中输入：

```text
请读取 .codex/skills/thoughtworks-inspired-ppt-skill/SKILL.md，并按该规范生成 Thoughtworks-inspired 风格 HTML PPT。
```

## 直接发给 Agent 的安装提示

```text
帮我安装 thoughtworks-inspired-ppt-skill。请把 https://github.com/Scorpion-Z/thoughtworks-inspired-ppt-skill 克隆到 .codex/skills/thoughtworks-inspired-ppt-skill，安装完成后检查 SKILL.md、templates/、styles/、assets/、references/ 是否存在。
```

已经安装过的话，用这段话更新：

```text
帮我更新 thoughtworks-inspired-ppt-skill。请进入 .codex/skills/thoughtworks-inspired-ppt-skill 执行 git pull，然后告诉我当前最新 commit。
```

## 全局安装

```bash
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill global
```

默认安装到：

```text
~/.codex/skills/thoughtworks-inspired-ppt-skill
```

## 指定安装目录

```bash
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill install .codex/skills/thoughtworks-inspired-ppt-skill
```

## 生成示例 deck

```bash
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill init my-deck --demo
open my-deck/index.html
```

## 适合场景

| 任务 | 推荐方式 |
|------|----------|
| 数智化转型汇报 | 使用 T01/T02/T05/T06/T08 组合 |
| 数据治理研究 | 使用矩阵、闭环、责任模型和能力框架 |
| 企业架构规划 | 使用分层架构、系统关系图和路线图 |
| 经营穿透专题 | 使用指标链路、质量校核、闭环督办表达 |
| 技术战略汇报 | 使用技术雷达、路线图、能力地图 |
| 央企内部管理汇报 | 使用客观、中性、克制表达，减少装饰 |

## 设计基线

- 大标题，结论先行。
- 强网格，信息分组清楚。
- 黑白灰为基础，单一强调色。
- 少阴影、少渐变、少装饰图。
- 每页只表达一个核心观点。
- 图形服务逻辑，优先使用结构图和信息图。
- 版式从 `references/layouts.md` 选择。
- 生成后对照 `references/checklist.md` 自检。

## 视觉系统

内置 4 套主题色，详见 `references/themes.md`：

1. Consulting Red
2. Product Violet
3. Digital Cyan
4. Governance Green

一份 deck 只使用一套主题色。强调色只用于关键结论、重要数字、风险提示、路线节点和图形焦点。

## 图例

项目内置 SVG 图例：

- `assets/diagrams/capability-framework.svg`
- `assets/diagrams/roadmap.svg`
- `assets/diagrams/radar.svg`
- `assets/diagrams/matrix.svg`
- `assets/diagrams/data-loop.svg`

这些图例会复制到生成目录，可直接嵌入 HTML 页面，也可作为设计参考。

## 使用流程

Skill 本身是结构化工作流，Agent 会逐步完成：

1. 需求澄清：受众、场景、页数、素材、配图、主题色、硬约束。
2. 选择主题：从 `references/themes.md` 选择一套。
3. 规划节奏：先写页面节奏表，再写 HTML。
4. 拷贝模板：使用 `templates/index.html`。
5. 挑选版式：从 `references/layouts.md` 中选 T01 到 T12。
6. 填充内容：标题结论化，正文短句化，图形结构化。
7. 可选配图：按 `references/image-prompts.md` 生成或重画图例。
8. 质量自检：执行 `references/checklist.md`。
9. 浏览器预览：逐页检查字号、留白、对齐和页脚安全区。

## 目录结构

```text
thoughtworks-inspired-ppt-skill/
├── SKILL.md
├── README.md
├── package.json
├── bin/
│   └── thoughtworks-ppt-skill.js
├── templates/
│   └── index.html
├── styles/
│   └── thoughtworks-inspired.css
├── assets/
│   └── diagrams/
│       ├── capability-framework.svg
│       ├── roadmap.svg
│       ├── radar.svg
│       ├── matrix.svg
│       └── data-loop.svg
├── references/
│   ├── style-lock.md
│   ├── components.md
│   ├── layouts.md
│   ├── themes.md
│   ├── image-prompts.md
│   └── checklist.md
└── examples/
    ├── sample_input.md
    └── sample_deck_outline.json
```

## 示例请求

```text
请使用 thoughtworks-inspired-ppt-skill，把这份材料整理成 8 页左右的 HTML PPT，风格简洁、强结构、大标题、黑白灰基础、少量强调色，适合央企内部汇报。
```

```text
请按 thoughtworks-inspired-ppt-skill 的规范，生成一份技术咨询风格的数智化转型汇报 PPT，输出 index.html。
```

```text
请基于这份研究材料生成一份技术雷达风格的汇报 PPT，重点展示现状、差距、能力框架、路线图和下一步任务。
```

## 本地开发

```bash
npm install
node ./bin/thoughtworks-ppt-skill.js doctor
node ./bin/thoughtworks-ppt-skill.js init ./demo-deck --demo
```

## 固定版本运行

先在仓库打 tag，例如 `v0.2.0`，之后可使用：

```bash
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill#v0.2.0
```

## 建议仓库 Topics

`ppt` `presentation` `html` `deck` `codex` `skill` `agent-skill` `digital-transformation` `thoughtworks-inspired`
