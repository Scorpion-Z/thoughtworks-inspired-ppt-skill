---
name: boge-ppt-skill
description: Generate high-impact browser-based HTML presentation decks for consulting, digital transformation, data governance, enterprise architecture, product strategy, Technology Radar-style analysis, AI transformation, operating model, and executive reporting. Use when the user asks for Boge PPT, boge-ppt-skill, consulting-style HTML PPT, structured web slides, transformation decks, management reports, technology strategy decks, or strong grid-based presentation design inspired by public Thoughtworks design language.
---

# Boge PPT Skill

> 来源识别: boge-ppt-skill 由用户自建维护，规范源仓库仍为 https://github.com/Scorpion-Z/thoughtworks-inspired-ppt-skill 。本项目是自有高质感咨询型 HTML PPT skill，只把 Thoughtworks 公开品牌语言作为设计参考边界，不使用 Thoughtworks 官方 logo、官方模板、官方字体文件、官方插画、官网截图、品牌包资产，也不暗示官方授权。该说明只用于 Skill 来源识别，不要写入生成的 PPT、HTML 页面、封面或配图。

## What This Skill Produces

Generate a 16:9 browser presentation deck:

- `index.html` with full-browser slide presentation and keyboard/touch navigation.
- `styles/thoughtworks-inspired.css`.
- `assets/vendor/motion.js` for offline Motion One animation support.
- `scripts/boge-deck-runtime.js` for navigation, motion, `Esc` overview, low-power mode, and lightweight WebGL ambience.
- Optional `images/` for user-provided or generated evidence images.
- Optional `deck_outline.json` or rhythm table for iteration.

The style is structured, executive, and evidence-led:

- 50/50 layouts: expressive flat visual area paired with clean typography.
- Public palette cues: talc white, mist gray, onyx black, wave blue, flamingo pink, sapphire, jade, amethyst, turmeric.
- Typography cues: Bitter/Noto Serif SC for headlines, Inter/Noto Sans SC for body text.
- Strong grid, flat rectangular blocks, thin lines, no decorative gradients or shadows.
- Charts and diagrams are flat, legible, and directly tied to the argument.
- Optional motion uses `data-animate` / `data-anim` markers with local Motion One first and Web Animations fallback.
- Lightweight WebGL ambience is reserved for cover, chapter, dark, wave, accent, and closing pages; content pages stay clean.

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

Default consulting/template suite length is 12 pages. Choose the suite by scenario before writing slide content:

Executive Transformation Suite for management transformation, operating mechanisms, governance, and executive reporting:

```text
T01 -> T02 -> T03 -> T05 -> T07 -> T06 -> T08 -> T11 -> T12 -> T09 -> T13 -> T14
```

Technology Strategy Suite for technology strategy, data/AI platforms, architecture, Technology Radar-style analysis, and engineering roadmaps:

```text
T01 -> T02 -> T03 -> T10 -> T06 -> T13 -> T09 -> T08 -> T04 -> T12 -> T05 -> T14
```

Use `examples/template-gallery/` to review the two-suite legend, page rhythm, and palette options, `examples/template-suite/` for Executive Transformation, and `examples/template-suite-technology/` for Technology Strategy. Keep `examples/full-layout-demo/` as the full T01-T14 layout reference library; it is not the default generated deck length.

| Page | Layout | Core message | Visual form | Theme |
|---|---|---|---|---|
| 01 | T01 | Cover claim | 50/50 concept map | split |
| 02 | T02 | Three executive conclusions | Cards | light |
| 03 | T03 | Chapter pivot | Large statement | wave |
| 04 | T05/T10 | Diagnosis or technology radar | Matrix or radar | light |
| 05 | T07/T06 | Operating shift or platform capability | Compare board or layers | light |
| 06 | T06/T13 | Capability framework or solution blueprint | Layers or diagram cards | light |
| 07 | T08/T09 | Roadmap or prioritization | Timeline or matrix | mist |
| 08 | T11/T08 | Closed loop or architecture roadmap | Loop or timeline | light |
| 09 | T12/T04 | Evidence or architecture principle | Evidence panel or insight statement | split/dark |
| 10 | T09/T12 | Priority, evidence, or case proof | Matrix or evidence panel | light |
| 11 | T13/T05 | Appendix, diagram set, or risk control | Gallery or matrix | mist/light |
| 12 | T14 | Final takeaway | Quote/action close | dark |

Rules:

- Every slide has one core message.
- Every slide uses a registered `Txx` layout.
- 8+ slides need at least one `T03` section divider and one dark/wave/accent breathing page.
- The fixed 12-page template suite should include `T03` and one dark/wave/accent breathing page.
- Do not use five consecutive pages with the same visual shape.
- Titles must be conclusion sentences, not labels such as "背景介绍" or "工作安排".
- Use motion markers only when they clarify reading order. Leave unmarked slides static rather than adding decorative movement.
- Use `data-animate="timeline"` for T08 roadmap pages.

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
<body class="theme-wave" data-deck-fit="cover">
```

Choose from `theme-wave`, `theme-flamingo`, `theme-sapphire`, `theme-jade`, `theme-amethyst`, `theme-turmeric`.

Use `data-deck-fit="cover"` by default for browser presentations. Use `contain` only when every pixel of the 16:9 canvas must stay visible in non-16:9 windows.

### Step 5 Fill Slides

Use only skeletons from `references/layouts.md`.

Hard rules:

- Every slide must be `<section class="slide {theme}" data-layout="Txx">`.
- Use CSS classes from `references/components.md`.
- Do not copy official Thoughtworks logo, oblique, templates, brand-pack visuals, or website screenshots.
- Use 50/50 composition for cover/evidence/quote pages.
- Use flat charts, matrices, roadmaps, and capability frameworks for argument pages.
- Prefer `.concept-map`, `.compare-board`, and `.loop-diagram` for cover, before/after, and closed-loop pages when they fit the message.
- Do not invent data. Mark unsupported analysis as "建议", "待核实", "可进一步调研", or "需材料确认".

Motion rules:

- Add `data-animate="hero|cascade|directional|loop|quote"` only on `.slide`.
- Also use registered enhanced recipes when they fit the page: `timeline`, `matrix-scan`, `loop-trace`, `spotlight`.
- Add `data-anim="up|left|right|line|card|row|node"` only on content elements whose reading order matters.
- Do not add fluid backgrounds, parallax, or per-slide custom animation frameworks.
- Do not add WebGL to normal content pages. The bundled lightweight WebGL canvas is controlled by the shared runtime and only appears on immersive pages.
- Always keep content readable when motion is disabled. The template supports `B` to toggle low-power/static mode.
- Keep `.control-help` in the HTML, but let the runtime auto-hide it. Do not show a persistent bottom page rail or external counter in generated decks; use `Esc` overview for page jumping.

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

For higher confidence, run the visual regression check before manual preview:

```bash
node scripts/visual-check-deck.mjs index.html
```

Then open `index.html` in a browser and inspect:

- Arrow key, wheel, touch navigation, and `B` low-power toggle.
- `Esc` opens full-page thumbnail overview; clicking a thumbnail jumps to that page and closes overview.
- Deck fills the browser in desktop `cover` mode and does not show gray outer margins.
- Bottom page rail and external counter stay hidden in normal presentation mode.
- Auto-hidden control help includes `ESC 预览` and switches between `B 静态` and `B 动态` when visible.
- Mobile/tablet smoke checks keep the scaled slide visible instead of showing a blank background.
- Body text remains readable.
- Motion final states are visible and not distracting.
- Each slide has one message.
- The deck does not use official assets or oblique-like decoration.

Review the generated screenshots and `report.json`; fix any failed static, visual, or low-power checks before delivery.

## Resource Map

```text
boge-ppt-skill/
├── SKILL.md
├── templates/
│   └── index.html
├── styles/
│   └── thoughtworks-inspired.css
├── scripts/
│   ├── boge-deck-runtime.js
│   ├── validate-thoughtworks-deck.mjs
│   └── visual-check-deck.mjs
├── assets/
│   ├── diagrams/
│   └── vendor/
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
    ├── full-layout-demo/
    ├── template-suite/
    ├── template-suite-technology/
    └── template-gallery/
```

## Quick Trigger Examples

```text
请使用 boge-ppt-skill，把这份材料整理成 8 页左右的 HTML PPT，风格强结构、结论先行、50/50 版式、适合央企内部汇报。
```

```text
请按 boge-ppt-skill 的规范，生成一份技术战略汇报 HTML PPT，包含技术雷达、能力框架和三阶段路线图。
```
