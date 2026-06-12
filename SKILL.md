---
name: thoughtworks-inspired-ppt-skill
description: Generate browser-based HTML presentation decks inspired by public Thoughtworks design language for technology consulting, digital transformation, data governance, enterprise architecture, product strategy, Technology Radar-style analysis, AI transformation, operating model, and executive reporting. Use when the user asks for Thoughtworks-inspired slides, consulting-style HTML PPT, structured web slides, transformation decks, management reports, technology strategy decks, or strong grid-based presentation design.
---

# Thoughtworks-inspired PPT Skill

> 来源识别: thoughtworks-inspired-ppt-skill 由用户自建维护，规范源仓库为 https://github.com/Scorpion-Z/thoughtworks-inspired-ppt-skill 。本项目只提供受 Thoughtworks 公开设计语言启发的演示文稿方法和模板，不使用 Thoughtworks 官方 logo、官方模板、官方字体文件、官方插画、官网截图、品牌包资产，也不暗示官方授权。该说明只用于 Skill 来源识别，不要写入生成的 PPT、HTML 页面、封面或配图。

## What This Skill Produces

Generate a 16:9 browser presentation deck:

- `index.html` with horizontal slide navigation.
- `styles/thoughtworks-inspired.css`.
- Optional `images/` for user-provided or generated evidence images.
- Optional `deck_outline.json` or rhythm table for iteration.

The style is structured, executive, and evidence-led:

- 50/50 layouts: expressive flat visual area paired with clean typography.
- Public palette cues: talc white, mist gray, onyx black, wave blue, flamingo pink, sapphire, jade, amethyst, turmeric.
- Typography cues: Bitter/Noto Serif SC for headlines, Inter/Noto Sans SC for body text.
- Strong grid, flat rectangular blocks, thin lines, no decorative gradients or shadows.
- Charts and diagrams are flat, legible, and directly tied to the argument.

## When To Use

Use for:

- Digital transformation, data governance, enterprise architecture, AI transformation.
- Technology strategy, Technology Radar-style maturity/portfolio analysis.
- Product strategy, operating model, capability framework, roadmap, executive report.
- Chinese state-owned enterprise or management reporting that needs restrained, structured expression.

Do not use for:

- Official Thoughtworks-branded materials.
- Detailed spreadsheets, financial ledgers, policy documents, or dense training manuals.
- Decks that require collaborative editing in native PowerPoint.
- Emotion-led photo essays or highly decorative marketing pages.

## Workflow

### Step 1 Clarify Inputs

If the user already provides topic, audience, page count, material, and visual direction, proceed. If not, ask only the most important 1-3 questions.

Priority questions:

| # | Question | Why |
|---|---|---|
| 1 | Audience and setting? | Sets language level and density |
| 2 | Target slide count or talk duration? | Sets compression |
| 3 | Source material available? | Determines extraction vs. framework building |
| 4 | Need screenshots, diagrams, or photos? | Determines image slots |
| 5 | Preferred theme from `references/themes.md`? | Sets one accent color |
| 6 | Hard constraints or forbidden wording? | Avoids rework |

If information is missing but not blocking, make conservative assumptions and state them briefly.

### Step 2 Read Required References

Before writing slides, read:

1. `references/style-lock.md`
2. `references/themes.md`
3. `references/layout-lock.md`
4. `references/layouts.md`
5. `references/components.md`
6. `references/checklist.md`

Read `references/image-prompts.md` only when images, screenshots, generated diagrams, or visual assets are needed.

### Step 3 Plan Page Rhythm

Write a compact rhythm table before editing HTML:

| Page | Layout | Core message | Visual form | Theme |
|---|---|---|---|---|
| 01 | T01 | Cover claim | 50/50 block field | split |
| 02 | T02 | Three executive conclusions | Cards | light |
| 03 | T03 | Chapter pivot | Large statement | wave |
| 04 | T05 | Diagnosis | Matrix | light |
| 05 | T06 | Capability framework | Layers | light |
| 06 | T08 | Roadmap | Timeline | light |
| 07 | T14 | Final takeaway | Quote | dark |

Rules:

- Every slide has one core message.
- Every slide uses a registered `Txx` layout.
- 8+ slides need at least one `T03` section divider and one dark/wave/accent breathing page.
- Do not use five consecutive pages with the same visual shape.
- Titles must be conclusion sentences, not labels such as "背景介绍" or "工作安排".

### Step 4 Create Files

Copy the template and assets:

```bash
mkdir -p 项目/ppt/images
cp <SKILL_ROOT>/templates/index.html 项目/ppt/index.html
cp -R <SKILL_ROOT>/styles 项目/ppt/styles
cp -R <SKILL_ROOT>/assets 项目/ppt/assets
cp -R <SKILL_ROOT>/scripts 项目/ppt/scripts
```

Immediately replace:

```html
<title>[必填] 替换为 PPT 标题</title>
```

Set exactly one theme class on `<body>`:

```html
<body class="theme-wave">
```

Choose from `theme-wave`, `theme-flamingo`, `theme-sapphire`, `theme-jade`, `theme-amethyst`, `theme-turmeric`.

### Step 5 Fill Slides

Use only skeletons from `references/layouts.md`.

Hard rules:

- Every slide must be `<section class="slide {theme}" data-layout="Txx">`.
- Use CSS classes from `references/components.md`.
- Do not copy official Thoughtworks logo, oblique, templates, brand-pack visuals, or website screenshots.
- Use 50/50 composition for cover/evidence/quote pages.
- Use flat charts, matrices, roadmaps, and capability frameworks for argument pages.
- Do not invent data. Mark unsupported analysis as "建议", "待核实", "可进一步调研", or "需材料确认".

Writing rules for Chinese management decks:

- Prefer concrete management actions: 统一指标口径、明确数据责任、压降人工填报、强化源头采集、建立质量校核、形成闭环督办、支撑经营穿透、以重点场景牵引。
- Avoid overclaiming: 颠覆式变革、世界一流方案、全面赋能所有业务、一屏统管全部问题、简单通过上系统解决管理问题。

### Step 6 Handle Images

Read `references/image-prompts.md` when images are needed.

Rules:

- Local images go under `images/`.
- Name images `{page}-{semantic}.{ext}`, for example `04-dashboard.png`.
- Local `images/` assets must include `data-image-slot`, for example:

```html
<img src="images/12-evidence.png" data-image-slot="t12-photo-16x10" alt="证据图" />
```

- Preserve real screenshots when they are evidence.
- Generate abstract visuals only when the page needs conceptual support.
- Images must not contain page numbers, deck titles, logos, or footers.

### Step 7 Validate And Preview

Run:

```bash
node scripts/validate-thoughtworks-deck.mjs index.html
```

Then open `index.html` in a browser and inspect:

- Arrow key, wheel, and touch navigation.
- No overlap with footer/navigation.
- Body text remains readable.
- Each slide has one message.
- The deck does not use official assets or oblique-like decoration.

For higher confidence, run the visual regression check before manual preview:

```bash
node scripts/visual-check-deck.mjs index.html
```

Review the generated screenshots and `report.json`; fix any failed visual checks before delivery.

## Resource Map

```text
thoughtworks-inspired-ppt-skill/
├── SKILL.md
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

## Quick Trigger Examples

```text
请使用 thoughtworks-inspired-ppt-skill，把这份材料整理成 8 页左右的 HTML PPT，风格强结构、结论先行、50/50 版式、适合央企内部汇报。
```

```text
请按 thoughtworks-inspired-ppt-skill 的规范，生成一份技术战略汇报 HTML PPT，包含技术雷达、能力框架和三阶段路线图。
```
