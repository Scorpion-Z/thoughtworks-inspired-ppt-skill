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

## 50/50 Layout

Use 50/50 composition for covers, visual explanations, evidence photos, and quote/photo pages.

```html
<section class="slide split" data-layout="T01">
  <div class="half paper">
    <div class="kicker">Digital transformation</div>
    <h1 class="title xl">标题必须是核心判断</h1>
    <p class="subtitle">一到两句补充说明。</p>
  </div>
  <div class="half visual">
    <div class="tile-field" aria-hidden="true">
      <span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span>
    </div>
  </div>
  <div class="footer"><span>Section</span><span>01</span></div>
</section>
```

Use `.tile-field` or an approved image/diagram. Do not use oblique-shaped decoration.

## Cards

Use cards for 3-4 parallel conclusions.

```html
<div class="grid-3">
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

## Roadmap Timeline

Use for three-stage implementation paths.

```html
<div class="timeline">
  <div class="stage"><div class="stage-title">第一阶段：试点牵引</div><ul><li>选择重点场景</li></ul></div>
  <div class="stage"><div class="stage-title">第二阶段：标准固化</div><ul><li>沉淀规则和接口</li></ul></div>
  <div class="stage"><div class="stage-title">第三阶段：推广优化</div><ul><li>扩展和闭环督办</li></ul></div>
</div>
```

Rules:

- Three stages are the default.
- Each stage should include task, output, or milestone.

## Priority Matrix

Use for value/difficulty or impact/readiness decisions.

```html
<div class="priority-matrix">
  <div class="axis-y">Readiness</div>
  <div class="quadrants">
    <div class="quadrant strong"><span class="dot"></span>优先试点</div>
    <div class="quadrant">重点准备</div>
    <div class="quadrant">暂缓投入</div>
    <div class="quadrant">观察验证</div>
  </div>
  <div></div>
  <div class="axis-x">Business value</div>
</div>
```

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
