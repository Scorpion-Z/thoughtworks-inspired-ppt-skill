# Thoughtworks-inspired PPT Skill

## Purpose

Generate HTML-based presentation decks inspired by a clean technology-consulting presentation style. This skill is designed for digital transformation, data governance, enterprise architecture, product strategy, agile delivery, AI transformation, technology radar, and operating model topics.

This is not an official Thoughtworks template. Do not use Thoughtworks logos, official proprietary assets, or imply official endorsement. Use only a Thoughtworks-inspired visual and narrative style.

## Core Style

Use a clean, modern, structured, high-contrast presentation style.

Principles:

1. One slide, one core message.
2. Use large, conclusion-oriented titles.
3. Use black, white, gray, and limited high-contrast accent colors.
4. Prefer vector diagrams, structure maps, matrices, flow diagrams, capability maps, radar diagrams, timelines, and architecture views.
5. Avoid decorative stock photos, complex gradients, excessive shadows, heavy borders, and dense paragraphs.
6. Use generous whitespace.
7. Make every visual element serve the argument.
8. Use neutral, professional, technology-consulting language.
9. Avoid empty slogans and exaggerated claims.
10. Every slide must have a clear role in the story line.

## Typography

Use this font logic:

- English headline: Bitter, Georgia, or serif fallback.
- English body: Inter, Arial, Helvetica, sans-serif.
- Chinese headline: Source Han Serif SC, Noto Serif CJK SC, SimSun, or serif fallback.
- Chinese body: Source Han Sans SC, Noto Sans CJK SC, Microsoft YaHei, PingFang SC, sans-serif.

Suggested sizes:

- Cover title: 48 to 64 px.
- Slide title: 34 to 44 px.
- Section label: 20 to 24 px.
- Body text: 18 to 24 px.
- Notes and captions: 13 to 16 px.

## Color System

Base colors:

- Background: #FFFFFF or #F7F7F4
- Main text: #111111
- Secondary text: #4A4A4A
- Hairline: #D8D8D2
- Dark panel: #111111

Accent colors:

- Deep red: #BD4257
- Violet: #6B4EFF
- Cyan: #00A8A8
- Yellow: #F6C945
- Green: #2E7D32

Use only one primary accent color per deck. A second accent color is allowed only for contrast in diagrams.

## Page Layout Rules

Use 16:9 layout.

Each slide should include:

- A strong title.
- A short subtitle or framing sentence when needed.
- A clear content area.
- Optional small footer with page section or source note.

Grid:

- Page padding: 56 px left and right.
- Top title area: 80 to 120 px.
- Main content area: 70 percent of page height.
- Footer area: 24 to 36 px.

Never fill the whole slide with text. Split dense content into multiple slides.

## Narrative Structure

For strategy and transformation topics, use this default structure:

1. Cover
2. Executive summary
3. Why this matters
4. Current situation
5. Key problems
6. Root-cause diagnosis
7. Target state
8. Capability framework
9. Priority scenarios
10. Implementation roadmap
11. Governance mechanism
12. Risks and safeguards
13. Next steps
14. Closing

For a short deck, compress it to:

1. Cover
2. Core conclusion
3. Current situation and gap
4. Target framework
5. Key tasks
6. Roadmap
7. Closing

## Slide Types

Supported slide types:

- cover
- executive-summary
- section
- insight
- diagnosis
- matrix
- architecture
- roadmap
- radar
- closing

## Content Writing Rules

Use objective, neutral, boardroom-ready language.

Avoid empty consulting buzzwords. Prefer concrete expressions:

- clarify indicator ownership
- unify data definitions
- reduce manual reporting
- strengthen source data control
- establish closed-loop management
- improve cross-level visibility
- support management decision-making

For Chinese central enterprise reporting, use restrained language:

- 建议
- 需要
- 逐步形成
- 有序推进
- 以重点场景牵引
- 以管理规则固化数据规则
- 以数据质量支撑经营穿透

## Diagram Rules

Prefer simple vector diagrams.

Allowed diagram types:

- Layered architecture
- Value chain
- Capability map
- Responsibility matrix
- Roadmap
- Closed-loop process
- Data flow
- Governance model
- Maturity radar
- Prioritization matrix

Do not create decorative diagrams that do not add meaning.

## Output Requirements

When generating a deck, produce:

1. `index.html`
2. `styles/thoughtworks-inspired.css`
3. Optional `deck_outline.json`
4. Optional `README.md`

The HTML should be self-contained enough to open in a browser.

All slides should use semantic sections:

```html
<section class="slide cover"></section>
<section class="slide insight"></section>
<section class="slide matrix"></section>
<section class="slide roadmap"></section>
```

## Quality Checklist

Before finishing, check:

- Does every slide have one clear message?
- Are titles conclusion-oriented?
- Is the slide too text-heavy?
- Are colors restrained?
- Are diagrams useful?
- Is the tone professional and objective?
- Is the structure suitable for leadership reporting?
- Are claims supported by the input material?
- Are uncertain points clearly marked as assumptions or pending validation?
