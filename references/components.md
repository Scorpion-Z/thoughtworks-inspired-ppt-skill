# Components

Use these classes from `styles/thoughtworks-inspired.css`. Do not invent alternate component systems unless the user explicitly asks for an experimental page.

## Typography

| Role | Class | Rule |
|---|---|---|
| Meta/kicker | `.kicker`, `.meta` | Inter 630, uppercase, short label only |
| Main title | `.title` | Conclusion sentence, Bitter/Noto Serif SC, large and bold |
| Large title | `.title.xl` | Cover or major statement |
| Statement title | `.title.statement` | One idea page or section divider |
| Body lead | `.subtitle`, `.lead` | 1-2 short sentences |
| Body copy | `.copy`, `.card-body` | >= 18px, short lines |
| Footer | `.footer` | Page number/source only |
| Number | `.metric-number` | Large metric, must have supporting context |

## Theme Classes

Each slide needs one visual theme class:

- `light`: white paper page.
- `mist`: light gray page.
- `dark`: black page.
- `wave`: wave blue page.
- `accent`: accent color page.
- `split`: 50/50 full-slide layout.

## Motion Markers

Motion is optional and must remain restrained. Use native deck markers only; lightweight WebGL ambience is allowed only through the shared `boge-deck-runtime.js` on immersive pages. Do not add scroll libraries or per-slide custom animation systems.

```html
<section class="slide light" data-layout="T02" data-animate="cascade">
  <div class="kicker" data-anim="up">Executive summary</div>
  <h2 class="title" data-anim="up">标题必须先表达结论</h2>
  <div class="card fill" data-anim="card">...</div>
</section>
```

Registered `data-animate` recipes:

- `hero`: cover, statement, and major pivot pages.
- `cascade`: cards, matrices, layers, timelines, galleries.
- `directional`: before/after pages with left and right panels.
- `loop`: closed-loop diagrams and node sequences.
- `quote`: final quote or evidence quote pages.
- `timeline`: enhanced T08 roadmap pages with staged reveal.
- `matrix-scan`: diagnosis matrix pages where rows should scan in order.
- `loop-trace`: closed-loop pages where nodes should trace the operating path.
- `spotlight`: pages with one primary focus panel or metric.

Registered `data-anim` tokens:

- `up`: default text entrance.
- `left` / `right`: directional panels.
- `line`: quote line reveal.
- `card`: card or repeated item.
- `row`: table or matrix block.
- `node`: loop or graph node.

Press `B` during preview to toggle static low-power mode. All animated content must remain immediately visible in low-power mode and when `prefers-reduced-motion` is enabled. The shared runtime uses local Motion One first, falls back to Web Animations API, and stops lightweight WebGL ambience in low-power mode.

## Interaction Help

Every HTML deck must include one control hint element. In default `cover` mode it remains visually hidden so it does not cover slide content.

```html
<div class="control-help" id="controlHelp" aria-label="Keyboard and motion controls"></div>
```

Default text:

```text
←/→ 翻页 · 滚轮/滑动 · ESC 预览 · B 静态
```

Low-power/static mode text:

```text
←/→ 翻页 · 滚轮/滑动 · ESC 预览 · B 动态
```

Rules:

- Do not place it inside a slide.
- It must not remain visible over slide content during normal presentation.
- The bottom page rail and external counter are hidden by default.
- Use `Esc` overview for page jumping instead of a persistent red active page indicator.
- `data-deck-fit="cover"` fills the browser by default; `contain` is reserved for full-canvas preview needs.

## ESC Overview

The shared runtime creates an overview layer from the real `.slide` nodes. Do not hand-code overview thumbnails in deck HTML.

Behavior:

- Press `Esc` to open or close full-page preview.
- The current slide thumbnail uses `.overview-card.is-current`.
- Clicking a thumbnail jumps to that slide and closes overview.
- While overview is open, arrow keys, wheel, and touch navigation must not change the active slide.
- In low-power mode, every thumbnail must show final content immediately.

The CSS classes `.overview`, `.overview-grid`, `.overview-card`, `.overview-thumb`, and `.overview-card-meta` are runtime-owned. Do not repurpose them for slide content.

## Vertical Centering

Use `.content-center` on short body slides where the default top-heavy layout leaves the lower half empty. Use `.body-center` on the main content block.

```html
<section class="slide light content-center" data-layout="T02" data-animate="cascade">
  <div class="kicker" data-anim="up">Executive summary</div>
  <h2 class="title" data-anim="up">结论标题保持在上方，主体在安全区内视觉居中</h2>
  <div class="grid-3 body-center">
    ...
  </div>
  <div class="footer"><span>核心判断</span><span>02</span></div>
</section>
```

Rules:

- Use on card, matrix, roadmap, before/after, and closed-loop pages when content is short.
- Do not use on dense architecture or evidence pages unless visual checks confirm no overflow.
- Footer remains fixed to the slide bottom safe area.

## 50/50 Layout

Use 50/50 composition for covers, visual explanations, evidence photos, and quote/photo pages.

```html
<section class="slide split" data-layout="T01" data-animate="hero">
  <div class="half paper">
    <div class="kicker" data-anim="up">Digital transformation</div>
    <h1 class="title xl" data-anim="up">标题必须是核心判断</h1>
    <p class="subtitle" data-anim="up">一到两句补充说明。</p>
  </div>
  <div class="half visual">
    <div class="concept-map" aria-label="核心概念关系图" data-anim="right">
      <div class="concept-row">
        <div class="concept-node">规则</div><div class="concept-switch"></div><div class="concept-node muted">动作</div>
      </div>
      <div class="concept-row">
        <div class="concept-node">数据</div><div class="concept-switch"></div><div class="concept-node muted">证据</div>
      </div>
      <div class="concept-row">
        <div class="concept-node">机制</div><div class="concept-switch"></div><div class="concept-node muted">闭环</div>
      </div>
    </div>
  </div>
  <div class="footer"><span>Section</span><span>01</span></div>
</section>
```

Prefer `.concept-map`, approved flat diagrams, or evidence images. `.tile-field` remains allowed for radar/demo placeholders, but should not be the default cover visual. Do not use oblique-shaped decoration.

## Concept Map

Use for 50/50 covers and explanation pages where two vocabularies, states, or responsibilities are being mapped.

```html
<div class="concept-map" aria-label="表达与接收关系图" data-anim="right">
  <div class="concept-row">
    <div class="concept-node">建议</div><div class="concept-switch"></div><div class="concept-node muted">意见</div>
  </div>
</div>
```

Rules:

- Keep to 3-4 rows.
- Each node should be one short phrase.
- Use the cross block as a translation or mismatch marker, not as official-brand oblique decoration.

## Cards

Use cards for 3-4 parallel conclusions.

```html
<div class="grid-3 body-center">
  <div class="card fill">
    <div class="card-title">统一口径</div>
    <p class="card-body">明确指标定义、统计周期、数据来源和责任部门。</p>
  </div>
  <div class="card accent">
    <div class="card-title">唯一重点</div>
    <p class="card-body">一页最多一个 accent card。</p>
  </div>
</div>
```

Rules:

- Use `.card.fill` for normal repeated cards.
- Use `.card.ink` for one dark emphasis card.
- Use `.card.accent` for one highlighted card.
- Do not mix more than one accent card on a slide.

## Matrix

Use a matrix only for compact diagnosis.

```html
<table class="matrix">
  <tr><th>问题表现</th><th>深层原因</th><th>改进方向</th></tr>
  <tr><td>口径不一致</td><td>定义和周期未统一</td><td>建立指标口径管理机制</td></tr>
</table>
```

Rules:

- Maximum 4 columns.
- Maximum 4 body rows.
- Do not put long paragraphs in cells.

## Architecture Layers

Use for capability frameworks and operating models.

```html
<div class="architecture">
  <div class="layer">
    <div class="layer-name">治理机制</div>
    <div class="layer-desc">指标责任、数据责任、调度机制、整改闭环。</div>
  </div>
</div>
```

Rules:

- Use 4-6 layers.
- Each layer states role and responsibility, not a long explanation.

## Roadmap Track

Use for three-stage implementation paths.

```html
<section class="slide mist content-center visual-depth" data-layout="T08" data-animate="timeline">
  <div class="kicker" data-anim="up">Roadmap</div>
  <h2 class="title" data-anim="up">按照试点先行、标准固化、推广优化三阶段推进</h2>
  <div class="roadmap-track body-center" data-anim="line">
    <div class="roadmap-stage" data-anim="node">
      <div class="roadmap-index">01</div>
      <div class="roadmap-meta">0-3M</div>
      <div class="stage-title">试点牵引</div>
      <ul><li>选择重点场景</li><li>形成规则样板</li></ul>
      <div class="roadmap-output" data-anim="card">输出：样板页面 / 口径清单</div>
    </div>
  </div>
  <div class="footer"><span>实施路径</span><span>08</span></div>
</section>
```

Rules:

- Three stages are the default.
- Each stage should include task, output, or milestone.
- T08 must use `.content-center`, `.body-center`, `.roadmap-track`, and `data-animate="timeline"`.
- Use one `.roadmap-stage.is-focus` to show the current or most important stage.

## Priority Matrix

Use for value/difficulty or impact/readiness decisions.

```html
<div class="priority-matrix">
  <div class="axis-y">Readiness</div>
  <div class="quadrants">
    <div class="quadrant strong">
      <div class="quadrant-title"><span class="dot"></span>优先试点</div>
      <div class="priority-items"><span class="priority-item"><span class="priority-index">01</span>经营看板</span></div>
    </div>
    <div class="quadrant"><div class="quadrant-title">重点准备</div></div>
    <div class="quadrant"><div class="quadrant-title">暂缓投入</div></div>
    <div class="quadrant"><div class="quadrant-title">观察验证</div></div>
  </div>
  <div></div>
  <div class="axis-x">Business value</div>
</div>
```

Rules:

- Include 3-5 numbered decision items; do not leave the quadrants as empty labels.
- Use `.quadrant-title`, `.priority-items`, `.priority-item`, and `.priority-index` for readable item placement.
- Keep each item to one short phrase.

## Immersive Anchors And Closing Actions

Use `.immersive-anchor` on T03 pages and `.closing-actions` on T14 pages when the page otherwise leaves excessive lower whitespace.

```html
<div class="immersive-anchor" data-anim="right">
  <div class="anchor-stack">
    <div class="anchor-item"><span class="anchor-index">01</span><span>统一口径</span></div>
  </div>
</div>
```

Rules:

- Anchors support rhythm only; they must not introduce new arguments.
- Keep closing actions to 2-3 concrete next moves.
- Do not use official logos, oblique marks, or decorative images.

## Compare Board

Use for `T07` before/after pages instead of a generic two-card grid when the page is about a change in behavior, operating mode, or relationship.

```html
<div class="compare-board">
  <div class="compare-panel" data-anim="left">
    <div class="card-title">当前状态</div>
    <p class="card-body">多头口径、人工汇总、事后解释。</p>
  </div>
  <div class="compare-divider" data-anim="up">→</div>
  <div class="compare-panel target" data-anim="right">
    <div class="card-title">目标状态</div>
    <p class="card-body">统一指标、源头采集、异常预警。</p>
  </div>
</div>
```

Rules:

- Use `data-animate="directional"` on the slide.
- Left panel describes the current or draining pattern; right panel states the target mode.
- Keep the divider as a simple arrow or short transition word.

## Loop Diagram

Use for `T11` closed-loop pages where the argument depends on sequence and feedback.

```html
<div class="loop-diagram">
  <div class="loop-node" data-anim="node">
    <div class="loop-index">01</div>
    <div class="loop-title">采集</div>
    <p class="loop-copy">源头系统和填报入口。</p>
  </div>
  <div class="loop-node focus" data-anim="node">
    <div class="loop-index">04</div>
    <div class="loop-title">督办</div>
    <p class="loop-copy">责任落实和整改验证。</p>
  </div>
</div>
```

Rules:

- Use `data-animate="loop"` on the slide.
- Use 4 nodes by default; 5-6 only if labels stay readable.
- One node may use `.focus` to identify the operational handoff or final target.

## Images

Use `.image-frame` for local images. Local `images/` assets must include `data-image-slot`.

```html
<div class="image-frame r-16x10">
  <img src="images/04-evidence.png" data-image-slot="t12-photo-16x10" alt="现场证据" />
</div>
```

Use `.image-frame.contain` for screenshots, diagrams, and dense UI images that must not be cropped.

## Diagram Cards

Use diagram cards for reusable SVG or image assets.

```html
<div class="diagram-row">
  <div class="diagram-card">
    <img src="assets/diagrams/roadmap.svg" alt="三阶段路线图" />
    <div>三阶段路线图</div>
  </div>
</div>
```

Rules:

- Diagrams should be flat and rectangular.
- Avoid tiny SVG labels; move complex explanation into HTML text.
- Do not use icons or diagrams that look like official Thoughtworks assets.

## Alignment Rules

1. Kicker, title, content, and footer should share a stable left edge.
2. 50/50 pages use equal halves unless a registered layout says otherwise.
3. Card grids use equal heights.
4. Image bottoms must stay above the footer safety zone.
5. Page content should not extend below 640px in the 1280x720 canvas.
