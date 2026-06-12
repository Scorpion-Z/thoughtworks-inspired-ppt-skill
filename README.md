# Thoughtworks Inspired PPT Skill

![Skill](https://img.shields.io/badge/Skill-Agent-111111?style=flat-square)
![HTML Deck](https://img.shields.io/badge/HTML-Deck-003D4F?style=flat-square)
![Codex](https://img.shields.io/badge/Codex-Supported-222222?style=flat-square)
![License](https://img.shields.io/github/license/Scorpion-Z/thoughtworks-inspired-ppt-skill?style=flat-square)

一个适配 Codex、Claude Code、Cursor 等 Agent 环境的 HTML PPT Skill，用于生成受 Thoughtworks 公开设计语言启发的网页演示文稿、结构图、路线图、能力框架图、技术雷达和管理汇报封面。

> 本项目不是 Thoughtworks 官方模板，不包含 Thoughtworks 官方 logo、官方模板、官方字体文件、官方插画、官网截图或专有资产，也不暗示官方授权。它只提供一种受公开设计语言启发的演示文稿方法和模板。

## 30 秒开始

推荐安装方式：

```bash
npx skills add https://github.com/Scorpion-Z/thoughtworks-inspired-ppt-skill --skill thoughtworks-inspired-ppt-skill
```

如果你的环境没有 `skills` 命令，或希望精确安装到当前 Codex 项目目录，使用：

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

## 常用命令

```bash
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill global
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill install .codex/skills/thoughtworks-inspired-ppt-skill
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill init my-deck --demo
node ./bin/thoughtworks-ppt-skill.js doctor
node ./scripts/validate-thoughtworks-deck.mjs ./templates/index.html
npm run check
npm run visual:demo
```

## 适合场景

| 任务 | 推荐方式 |
|------|----------|
| 数智化转型汇报 | T01/T02/T03/T05/T06/T08/T14 |
| 数据治理研究 | T05/T06/T09/T11/T13 |
| 企业架构规划 | T06/T07/T08/T13 |
| 经营穿透专题 | T02/T05/T06/T08/T11 |
| 技术战略汇报 | T03/T04/T10/T13/T08 |
| 央企内部管理汇报 | 客观、中性、克制表达，减少装饰 |

## 设计基线

- 50/50 画布方法：表达性视觉区域 + 干净文本区域。
- 大标题结论先行，每页一个核心判断。
- 使用公开色板命名：talc white、mist gray、onyx black、wave blue、flamingo pink、sapphire、jade、amethyst、turmeric。
- 一份 deck 只使用一个主强调色。
- 使用登记版式 T01-T14，不临场发明页面结构。
- 图形服务逻辑，优先使用结构图、信息图、矩阵、路线图、雷达和闭环图。
- 交付前按顺序执行静态校验、视觉检查和浏览器抽查。

## 使用流程

1. 需求澄清：受众、场景、页数、素材、配图、主题色、硬约束。
2. 读取规范：`style-lock.md`、`themes.md`、`layout-lock.md`、`layouts.md`、`components.md`、`checklist.md`。
3. 规划节奏：先写页面节奏表，再写 HTML。
4. 拷贝模板：使用 `templates/index.html`。
5. 挑选版式：从 `references/layouts.md` 中选 T01 到 T14。
6. 填充内容：标题结论化，正文短句化，图形结构化。
7. 可选配图：按 `references/image-prompts.md` 生成、裁切或安放图片。
8. 静态校验：运行 `node scripts/validate-thoughtworks-deck.mjs index.html`。
9. 视觉检查：运行 `node scripts/visual-check-deck.mjs index.html`，检查截图和报告。
10. 浏览器抽查：检查字号、留白、对齐、页脚安全区和横向导航。

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
├── scripts/
│   ├── validate-thoughtworks-deck.mjs
│   └── visual-check-deck.mjs
├── assets/
│   └── diagrams/
├── references/
│   ├── style-lock.md
│   ├── themes.md
│   ├── layout-lock.md
│   ├── layouts.md
│   ├── components.md
│   ├── image-prompts.md
│   ├── image-guide.md
│   └── checklist.md
└── examples/
    └── full-layout-demo/
```

## 示例请求

```text
请使用 thoughtworks-inspired-ppt-skill，把这份材料整理成 8 页左右的 HTML PPT，风格强结构、结论先行、50/50 版式、适合央企内部汇报。
```

```text
请按 thoughtworks-inspired-ppt-skill 的规范，生成一份技术战略汇报 HTML PPT，包含技术雷达、能力框架和三阶段路线图。
```

## 本地开发

```bash
npm install
npm run check
npm run visual:template
npm run visual:demo
npm run demo
node ./scripts/validate-thoughtworks-deck.mjs ./demo-deck/index.html
node ./scripts/visual-check-deck.mjs ./demo-deck/index.html
```

## 固定版本运行

先在仓库打 tag，例如 `v0.3.0`，之后可使用：

```bash
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill#v0.3.0
```

## 建议仓库 Topics

`ppt` `presentation` `html` `deck` `codex` `skill` `agent-skill` `digital-transformation` `thoughtworks-inspired`
