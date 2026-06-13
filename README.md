# Boge PPT Skill

![Skill](https://img.shields.io/badge/Skill-Agent-111111?style=flat-square)
![HTML Deck](https://img.shields.io/badge/HTML-Deck-003D4F?style=flat-square)
![Codex](https://img.shields.io/badge/Codex-Supported-222222?style=flat-square)
![Motion](https://img.shields.io/badge/Motion-Offline-634F7D?style=flat-square)
![License](https://img.shields.io/github/license/Scorpion-Z/thoughtworks-inspired-ppt-skill?style=flat-square)

**Boge PPT Skill** is an agent-ready HTML presentation system for building polished consulting decks, transformation reports, strategy narratives, capability maps, roadmaps, and executive briefings.

It gives AI coding agents a strict design system, reusable slide layouts, validation scripts, and a browser-based runtime so generated decks are not just "valid HTML", but presentable, inspectable, and safer to deliver.

> This is an unofficial, user-maintained project. It is inspired by public Thoughtworks design language, but it does not include Thoughtworks official logos, official templates, official font files, official illustrations, website screenshots, brand-pack assets, or any official authorization.

## Why This Exists

Most agent-generated PPT-style HTML has the same problems:

- pages look disconnected from each other;
- titles describe topics instead of making decisions;
- diagrams are decorative rather than explanatory;
- navigation and animation break during live presentation;
- visual quality depends too much on one-off prompting.

Boge PPT Skill turns those concerns into reusable constraints:

- registered layouts from `T01` to `T14`;
- a default 9-page consulting narrative;
- controlled typography, color, spacing, and footer rules;
- optional but restrained motion recipes;
- static validation and Playwright visual regression checks;
- presentation chrome for navigation, page progress, counters, and low-power mode.

## Highlights

- **Agent-first workflow**: designed for Codex, Claude Code, Cursor, and similar coding agents.
- **Browser-native deck**: outputs a self-contained HTML presentation directory.
- **Consulting-grade structure**: conclusion-first writing, evidence-led layouts, matrices, roadmaps, loops, and executive summaries.
- **Reusable template suite**: a production 9-page deck plus a full `T01`-`T14` layout library.
- **Motion with fallback**: local Motion One vendor first, Web Animations API fallback when unavailable.
- **Low-power mode**: press `B` to disable motion and WebGL ambience during presentation.
- **Visual safety net**: screenshot-based checks catch blank pages, hidden animation states, footer overlap, mobile/tablet preview issues, and control overlap.
- **No official asset leakage**: no official Thoughtworks logo, oblique, screenshots, templates, or brand-pack files.

## Quick Start

Install as a Codex skill:

```bash
npx skills add https://github.com/Scorpion-Z/thoughtworks-inspired-ppt-skill --skill boge-ppt-skill
```

If your environment does not provide the `skills` command, install through the package entrypoint:

```bash
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill
```

By default, the skill is installed to:

```text
~/.codex/skills/boge-ppt-skill
```

Then ask your agent:

```text
请读取 ~/.codex/skills/boge-ppt-skill/SKILL.md，并按该规范生成一份咨询型 HTML PPT。
```

## Create A Demo Deck

Clone the repository or use the GitHub package entrypoint:

```bash
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill init my-deck --demo
```

Or from a local checkout:

```bash
npm install
npm run demo
```

The generated deck is a browser presentation:

```text
my-deck/
├── index.html
├── styles/
├── scripts/
├── assets/
└── images/
```

Open `index.html` in a browser, or run a local static server for stricter browser testing.

## Command Reference

```bash
# Install to the default local Codex skill directory
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill

# Install globally when supported by your environment
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill global

# Install to a custom skill directory
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill install .codex/skills/boge-ppt-skill

# Generate a demo deck
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill init my-deck --demo

# Validate the package
npm run check

# Run visual regression checks
npm run visual:template
npm run visual:demo
npm run visual:suite
npm run visual:gallery
```

## Template System

The default reusable deck is **9 pages**. It is long enough for a complete consulting or transformation storyline, but short enough to avoid becoming a layout catalog.

```text
01 Cover
02 Executive summary
03 Diagnosis
04 Capability framework
05 Roadmap
06 Priority matrix
07 Closed loop
08 Key insight
09 Closing
```

Layout sequence:

```text
T01 -> T02 -> T05 -> T06 -> T08 -> T09 -> T11 -> T04 -> T14
```

The repository includes three example surfaces:

| Example | Purpose |
|---|---|
| `examples/template-suite/` | A real 9-page consulting deck template |
| `examples/template-gallery/` | A gallery-style preview of the 9-page suite |
| `examples/full-layout-demo/` | The complete `T01`-`T14` layout library |

## Layout Library

| ID | Layout | Best for |
|---|---|---|
| `T01` | 50/50 Cover | Opening claims, executive report covers |
| `T02` | Executive Summary | 3-4 decisions, findings, or recommendations |
| `T03` | Section Divider | Chapter breaks and narrative pivots |
| `T04` | Insight Statement | One sharp assertion with proof notes |
| `T05` | Diagnosis Matrix | Symptoms, causes, and actions |
| `T06` | Capability Framework | Operating models, governance stacks, architecture layers |
| `T07` | Before / After | Current-to-target transitions |
| `T08` | Roadmap | Three-stage implementation paths |
| `T09` | Priority Matrix | Value/readiness or impact/difficulty decisions |
| `T10` | Radar | Maturity, technology choices, capability coverage |
| `T11` | Closed Loop | Data loops, governance loops, remediation loops |
| `T12` | Evidence Photo / Quote | Case proof, screenshots, or field evidence |
| `T13` | Diagram Gallery | Reusable diagram sets and visual comparisons |
| `T14` | Closing | Final statement and next actions |

## Design Principles

1. **One slide, one message.** Titles should state conclusions, not topics.
2. **Structure before decoration.** Use grids, matrices, diagrams, and evidence blocks before adding visual effects.
3. **One accent per deck.** Keep color purposeful and restrained.
4. **Readable by default.** Body text should stay legible in presentation mode.
5. **Motion clarifies order.** Animation is allowed only when it improves reading sequence.
6. **Presenter controls stay outside the slide.** Page rail, counter, and keyboard hint are presentation chrome, not slide content.
7. **No official assets.** The project stays inside an unofficial, public-design-language boundary.

## Motion And Interaction

Slides may opt into motion through declarative markers:

```html
<section class="slide light" data-layout="T02" data-animate="cascade">
  <div class="kicker" data-anim="up">Executive summary</div>
  <h2 class="title" data-anim="up">核心结论写在标题里</h2>
  <div class="card fill" data-anim="card">...</div>
</section>
```

Registered `data-animate` recipes:

```text
hero, cascade, directional, loop, quote, timeline, matrix-scan, loop-trace, spotlight
```

Registered `data-anim` tokens:

```text
up, left, right, line, card, row, node
```

Runtime controls:

| Control | Behavior |
|---|---|
| `←` / `→` | Previous / next slide |
| Wheel | Slide navigation |
| Touch swipe | Slide navigation |
| `B` | Toggle dynamic/static low-power mode |

The control hint, page rail, and counter are rendered as lower presentation chrome outside the scaled slide canvas, so they do not cover the deck content during Chrome or browser preview.

## Quality Gates

Run checks before publishing or presenting a deck:

```bash
node scripts/validate-thoughtworks-deck.mjs index.html
node scripts/visual-check-deck.mjs index.html
```

Package-level checks:

```bash
npm run check
npm run visual:template
npm run visual:demo
npm run visual:suite
npm run visual:gallery
```

The visual checker uses Playwright to validate:

- exactly one active slide;
- visible text and non-blank pages;
- footer, counter, navigation, and control safety;
- animation final states;
- `B` low-power mode;
- WebGL ambience shutdown in low-power mode;
- mobile and tablet preview smoke checks;
- Chrome-like desktop viewport overlap checks.

## Repository Structure

```text
boge-ppt-skill/
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
    └── template-gallery/
```

## Example Prompts

```text
请使用 boge-ppt-skill，把这份材料整理成 8 页左右的 HTML PPT。
要求：结论先行、强结构、适合央企内部管理汇报、包含诊断矩阵和三阶段路线图。
```

```text
请按 boge-ppt-skill 规范生成一份技术战略汇报 HTML PPT。
需要包含技术雷达、能力框架、优先级矩阵和最终行动建议。
```

```text
请把这份数据治理材料改造成 9 页模板套图。
要求：使用 theme-wave，不使用官方 logo、官网截图或任何品牌包资产。
```

## Development

```bash
npm install
npm run check
npm run visual:template
npm run visual:demo
npm run visual:suite
npm run visual:gallery
```

Generate and validate a demo:

```bash
npm run demo
node ./scripts/validate-thoughtworks-deck.mjs ./demo-deck/index.html
node ./scripts/visual-check-deck.mjs ./demo-deck/index.html
```

## Version Pinning

Use a Git tag when you need reproducible installs:

```bash
npx github:Scorpion-Z/thoughtworks-inspired-ppt-skill#v0.3.0
```

## Compatibility

The package is named `boge-ppt-skill`, but legacy CLI aliases are still available:

```text
boge-ppt-skill
thoughtworks-inspired-ppt-skill
thoughtworks-ppt-skill
```

The GitHub repository name remains `thoughtworks-inspired-ppt-skill` for continuity.

## Suggested Topics

```text
ppt, presentation, html, deck, codex, skill, agent-skill, consulting, digital-transformation, thoughtworks-inspired
```

## License

MIT
