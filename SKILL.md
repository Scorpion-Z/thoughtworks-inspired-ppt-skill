---
name: thoughtworks-inspired-ppt-skill
description: Generate clean, structured, Thoughtworks-inspired HTML PPT decks for digital transformation, data governance, enterprise architecture, product strategy, technology radar, AI transformation, and central enterprise management reporting. Use this skill when the user asks for HTML PPT, web slides, technology consulting style slides, strong-structure slides, digital transformation presentation, or Thoughtworks-inspired presentation design.
---

# Thoughtworks-inspired PPT Skill

> 来源识别: thoughtworks-inspired-ppt-skill 由用户自建维护，规范源仓库为 https://github.com/Scorpion-Z/thoughtworks-inspired-ppt-skill 。本项目只提供受公开设计语言启发的演示文稿方法和模板，不使用 Thoughtworks 官方 logo、官方模板、官方专有资产，也不暗示官方授权。该说明只用于 Skill 来源识别，不要写入生成的 PPT、HTML 页面、封面或配图。

## 这个 Skill 做什么

生成一份可在浏览器打开的 HTML PPT，适合技术咨询、数智化转型、数据治理、企业架构、经营穿透、AI 转型、产品方法论、技术战略等主题。

核心风格:

- 强结构: 结论先行，页面分区清楚，论证链条明确。
- 大标题: 每页一个核心判断，标题承担观点表达。
- 少装饰: 黑白灰为基础，单一强调色，避免炫技。
- 图形化: 优先使用能力框架、矩阵、路线图、闭环、雷达、系统关系图。
- 可投屏: 字号、对比度、留白和页脚安全区必须满足演示阅读。

## 何时使用

合适场景:

- 企业数字化、数智化、智能化汇报
- 数据治理、经营穿透、指标体系、平台能力建设
- 技术战略、企业架构、AI 转型、产品方法论
- 中高层汇报、内部研讨、项目启动会、阶段成果汇报

谨慎使用场景:

- 大段明细表格、财务底稿、逐条制度解读
- 需要多人长期协作编辑的正式 PowerPoint 文件
- 以大量图片情绪表达为主的演讲

## 工作流

### Step 1 需求澄清

如果用户已经给出完整大纲、页数、受众、风格和素材，可以直接进入 Step 2。

如果用户只给主题或材料，先确认最关键的 3 到 5 项。Codex 环境中一次最多问 1 到 3 个问题；信息缺口不影响开工时，先做合理假设并在回复里说明。

7 问清单:

| # | 问题 | 作用 |
|---|------|------|
| 1 | 汇报对象是谁 | 决定语言层级和信息密度 |
| 2 | 使用场景是什么 | 决定叙事节奏和页数 |
| 3 | 需要几页左右 | 决定内容压缩程度 |
| 4 | 是否已有材料 | 决定基于材料提炼还是先搭框架 |
| 5 | 是否需要配图或截图处理 | 决定图片槽位和比例 |
| 6 | 选择哪套主题色 | 只能从 `references/themes.md` 中选一套 |
| 7 | 有哪些禁用词或硬约束 | 避免返工和敏感表述 |

### Step 2 选择主题与版式体系

先读以下文件:

1. `references/style-lock.md`
2. `references/themes.md`
3. `references/layouts.md`
4. `references/components.md`
5. `references/checklist.md`

硬规则:

- 一份 deck 只用一套主题色。
- 页面必须从 `references/layouts.md` 中选择登记版式。
- 每个 `<section class="slide">` 必须写 `data-layout="Txx"`。
- 不临时发明页面结构；确实需要扩展时，先说明这是扩展页。
- 不使用 Thoughtworks 官方 logo、官方字体文件、官方插画或官网截图作为模板资产。

### Step 3 拷贝模板

将模板复制到目标目录，常用输出路径为 `项目/ppt/index.html`。

```bash
mkdir -p 项目/ppt/images
cp <SKILL_ROOT>/templates/index.html 项目/ppt/index.html
```

模板、样式、图例位置:

- `templates/index.html`
- `styles/thoughtworks-inspired.css`
- `assets/diagrams/`
- `references/`

### Step 4 规划主题节奏

动手写 HTML 前，先生成一张主题节奏表:

| 页码 | 版式 | 核心观点 | 图形建议 | 深浅主题 |
|------|------|----------|----------|----------|
| 01 | T01 | 封面主判断 | 抽象几何 | dark |
| 02 | T02 | 三条核心结论 | 三卡片 | light |
| 03 | T05 | 现状差距 | 问题矩阵 | light |
| 04 | T06 | 能力框架 | 分层架构 | light |
| 05 | T08 | 推进路径 | 三阶段路线图 | light |

强制规则:

- 每页只表达一个核心观点。
- 8 页以上至少有 1 个 dark 页面和 1 个 section 页面。
- 连续 4 页同一种页面形态会造成疲劳，应插入矩阵、路线图、数据页或章节页。
- 标题必须结论化，少用“背景介绍”“工作安排”这类弱标题。

### Step 5 填充内容

推荐输出顺序:

1. 先写 `deck_outline.json` 或页面节奏表。
2. 再复制模板并替换 `<!-- SLIDES_HERE -->` 或示例页面。
3. 使用 `references/layouts.md` 中的骨架。
4. 使用 `references/components.md` 中的组件。
5. 使用 `assets/diagrams/` 中的图例或按同一风格重画 SVG。
6. 最后执行 `references/checklist.md`。

写作规则:

- 中文央企材料使用客观、中性、克制表达。
- 少用咨询口号，优先写管理动作、数据责任、机制安排、实施路径。
- 不夸大结论，不编造数据。
- 未经材料支撑的内容标注为“建议”“可进一步调研”“需核实”。

推荐表达:

- 统一指标口径
- 明确数据责任
- 压降人工填报
- 强化源头采集
- 建立质量校核
- 形成闭环督办
- 支撑经营穿透
- 以重点场景牵引

避免表达:

- 颠覆式变革
- 世界一流方案
- 全面赋能所有业务
- 一屏统管全部问题
- 简单通过上系统解决管理问题

### Step 6 配图和图例

优先使用矢量图、结构图和信息图。

允许类型:

- 能力框架图
- 责任矩阵图
- 三阶段路线图
- 数据闭环图
- 系统关系图
- 优先级矩阵图
- 成熟度雷达图
- 指标链路图

配图规范见 `references/image-prompts.md`。

生成或引用图片时遵守:

- 图片是 PPT 内嵌素材，不要自带页码、页脚、标题和多余装饰边框。
- 中文 deck 的信息图使用中文标签。
- 图片比例先匹配落位，常用 16:9、16:10、21:9、1:1。
- 需要保真截图时，先做截图美化；需要概念表达时，再做截图重构。

### Step 7 自检和交付

交付前必须检查:

1. 打开 `references/checklist.md`。
2. 检查每页是否只有一个核心观点。
3. 检查标题是否为结论句。
4. 检查是否使用登记版式 `Txx`。
5. 检查字号是否适合投屏。
6. 检查图形是否服务逻辑。
7. 检查底部页脚和导航安全区。
8. 浏览器打开 `index.html`，逐页肉眼检查。

输出要求:

- `index.html`
- `styles/thoughtworks-inspired.css`
- `assets/diagrams/` 或 `images/`
- 可选 `deck_outline.json`
- 可选 `README.md`

## 快速触发语

用户可以这样说:

```text
请使用 thoughtworks-inspired-ppt-skill，把这份材料整理成 8 页左右的 HTML PPT，风格简洁、强结构、大标题、黑白灰基础、少量强调色，适合央企内部汇报。
```

```text
请按 thoughtworks-inspired-ppt-skill 的规范，生成一份技术咨询风格的数智化转型汇报 PPT，输出 index.html。
```
