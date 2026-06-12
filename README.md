# Thoughtworks Inspired PPT Skill

一个可通过 `npx` 使用的 HTML 演示文稿生成脚手架，用于安装 Thoughtworks-inspired 风格的 Codex PPT skill，也可生成示例 deck。

> 说明：本项目不是 Thoughtworks 官方模板，不包含 Thoughtworks 官方 logo 或专有资产，也不暗示官方授权。它只提供一种受公开设计语言启发的演示文稿风格。

## 最简安装

在你的 Codex 项目根目录执行：

```bash
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill
```

默认安装到：

```text
.codex/skills/thoughtworks-inspired-ppt-skill
```

安装后启动 Codex，并输入：

```text
请读取 .codex/skills/thoughtworks-inspired-ppt-skill/SKILL.md，并按该规范生成 Thoughtworks-inspired 风格 HTML PPT。
```

## 全局安装

如果希望多个项目共用：

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

## 本地开发

```bash
npm install
node ./bin/thoughtworks-ppt-skill.js
node ./bin/thoughtworks-ppt-skill.js init ./demo-deck --demo
```

## 命令说明

```bash
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill install [target-dir]
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill global
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill init <target-dir> [--demo]
```

参数说明：

- 无参数：安装到当前项目 `.codex/skills/thoughtworks-inspired-ppt-skill`。
- `install [target-dir]`：安装到指定目录。
- `global`：安装到用户全局 Codex skills 目录。
- `init <target-dir> --demo`：生成一套示例 HTML deck。

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

推荐提示词：

```text
请调用 thoughtworks-inspired-ppt-skill，将下面材料整理成 HTML 演示文稿。要求：风格简洁、强结构、大标题、黑白灰基础、少量强调色、矢量化图形；每页只表达一个核心观点；标题结论化；语言客观、中性、克制；输出 index.html 和完整 CSS。
```

## 固定版本运行

先在仓库打 tag，例如 `v0.1.1`，之后可使用：

```bash
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill#v0.1.1
```

## 建议仓库 Topics

`ppt` `presentation` `html` `deck` `codex` `skill` `digital-transformation` `thoughtworks-inspired`
