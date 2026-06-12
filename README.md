# Thoughtworks Inspired PPT Skill

一个可通过 `npx` 使用的 HTML 演示文稿生成脚手架，用于创建 Thoughtworks-inspired 风格的 PPT skill 和示例 deck。

> 说明：本项目不是 Thoughtworks 官方模板，不包含 Thoughtworks 官方 logo 或专有资产，也不暗示官方授权。它只提供一种受公开设计语言启发的演示文稿风格。

## 安装与使用

从 npm 安装后：

```bash
npx thoughtworks-inspired-ppt-skill init my-deck --demo
```

从 GitHub 直接使用：

```bash
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill init my-deck --demo
```

本地开发时：

```bash
npm install
node ./bin/thoughtworks-ppt-skill.js init ./demo-deck --demo
```

生成后打开：

```bash
open ./demo-deck/index.html
```

## 命令

```bash
thoughtworks-ppt-skill init <target-dir> [--demo]
```

参数说明：

- `target-dir`：输出目录。
- `--demo`：生成一套示例 deck，包含封面、核心判断、差距诊断、能力框架、路线图、图例页、结束页。

## 适用场景

- 数智化转型汇报
- 数据治理研究
- 企业架构规划
- 技术战略汇报
- AI 转型方案
- 敏捷与产品方法论汇报
- 央企内部管理汇报

## 视觉原则

- 大标题
- 强结构
- 少装饰
- 重留白
- 黑白灰为主
- 少量高对比强调色
- 图形服务逻辑
- 每页只表达一个核心观点

## 图例

项目内置 SVG 图例：

- `assets/diagrams/capability-framework.svg`
- `assets/diagrams/roadmap.svg`
- `assets/diagrams/radar.svg`
- `assets/diagrams/matrix.svg`
- `assets/diagrams/data-loop.svg`

这些图例会被复制到生成目录，可直接嵌入 HTML 页面，也可作为设计参考。

## 作为 Codex Skill 使用

将本仓库复制到 Codex 可识别的 skills 目录后，让 Codex 阅读 `SKILL.md`，并使用 `templates/index.html` 与 `styles/thoughtworks-inspired.css` 生成页面。

推荐提示词：

```text
请调用 thoughtworks-inspired-ppt-skill，将下面材料整理成 HTML 演示文稿。要求：风格简洁、强结构、大标题、黑白灰基础、少量强调色、矢量化图形；每页只表达一个核心观点；标题结论化；语言客观、中性、克制；输出 index.html 和完整 CSS。
```


## GitHub 直接运行

```bash
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill init my-deck --demo
```

固定版本运行示例：

```bash
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill#v0.1.0 init my-deck --demo
```

## 建议仓库 Topics

`ppt` `presentation` `html` `deck` `codex` `skill` `digital-transformation` `thoughtworks-inspired`
