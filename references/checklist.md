# Checklist

Run this checklist before delivery. P0 items must pass.

## P0 Must Pass

### 1. Registered Layouts

- Every slide uses `<section class="slide ... " data-layout="Txx">`.
- `Txx` is one of `T01` through `T14`.
- No invented `Pxx`, `Sxx`, `TW-NEW`, or unnamed page structure.
- Run:

```bash
node scripts/validate-thoughtworks-deck.mjs path/to/index.html
```

### 2. No Official Asset Leakage

- No Thoughtworks official logo.
- No official deck template screenshots.
- No official website screenshots.
- No copied brand-pack illustration, photography, or texture.
- No oblique-shaped decoration. The oblique belongs to official logo usage; use block grids, panels, or evidence images instead.

### 3. Typography

- Headlines use Bitter or Noto Serif SC Black fallback.
- Body uses Inter or Noto Sans SC fallback.
- Headline text is black or white wherever possible.
- Accent color is limited to callouts, numbers, bullets, diagram focus, or one phrase.
- Body text is >= 18px.
- Caption/footer text is >= 14px.
- No text overlaps footer or navigation.

### 4. Color

- Exactly one `body.theme-*` class per deck.
- Use one primary accent only.
- Do not use multiple bright colors as decoration.
- Flamingo pink, turmeric, jade, and sapphire should not carry small white text.
- Dark pages use onyx black or wave blue, not arbitrary gradients.

### 5. Composition

- 50/50 layouts keep clear text and visual areas.
- Cards are rectangular, flat, and aligned.
- No rounded cards, heavy shadows, gradient blobs, emoji, or decorative stock art.
- Tables stay within 4 columns and 4 body rows.
- Dense content is split into multiple slides.

### 6. Content Integrity

- No invented data.
- Unsupported claims are marked as "建议", "待核实", "可进一步调研", or "需材料确认".
- Titles are conclusion sentences.
- Each slide has one message only.
- Technical claims connect to business value, mechanism, boundary, or implementation path.

### 7. Motion Safety

- `data-animate` only uses registered recipes: `cascade`, `hero`, `quote`, `directional`, `loop`, `timeline`, `matrix-scan`, `loop-trace`, `spotlight`.
- `data-anim` only uses registered tokens: `up`, `left`, `right`, `line`, `card`, `row`, `node`.
- Animated content is decorative in sequence only; the page must remain readable when animation is disabled.
- Pressing `B` toggles low-power/static mode.
- Pressing `Esc` opens and closes full-page overview.
- Overview thumbnail count equals slide count; exactly one thumbnail is current.
- Clicking an overview thumbnail jumps to that slide and closes overview.
- While overview is open, arrow, wheel, and touch navigation do not change the active slide.
- In low-power mode and `prefers-reduced-motion`, every `data-anim` element is immediately visible.
- In low-power mode, the lightweight WebGL ambience is stopped.
- A single `.control-help` exists, includes `ESC 预览`, and switches between `B 静态` and `B 动态`, but is auto-hidden in normal presentation.
- Default presentation hides the bottom page rail and external counter; no red active page indicator is visible.
- `data-deck-fit="contain"` is the default; desktop full-screen, mobile, and tablet viewports must keep the whole 16:9 slide visible. Use `cover` only when cropping is explicitly accepted.

## P1 Visual Quality

1. Page rhythm includes at least one dark/wave/accent page and one `T03` divider for decks with 8+ slides.
2. No more than four consecutive pages use the same visual shape.
3. Card titles line up across a grid.
4. Diagrams are flat, readable, and not overloaded with SVG text.
5. Images are rectangular and bound to a specific slot.
6. Footers stay stable across all pages.
7. Motion helps reveal reading order; it must not hide final state, delay core claims, or create distracting background movement.
8. Short card, matrix, roadmap, before/after, and closed-loop pages use `.content-center` / `.body-center` when the default layout leaves excessive lower whitespace.
9. The reusable template suites are 12 pages each; the 14-page T01-T14 demo is treated as a layout library.
10. T08 uses `.roadmap-track` with stage number, action list, and output block; it does not use the old top-heavy `.timeline` alone.
11. Executive Transformation uses `T01 -> T02 -> T03 -> T05 -> T07 -> T06 -> T08 -> T11 -> T12 -> T09 -> T13 -> T14`.
12. Technology Strategy uses `T01 -> T02 -> T03 -> T10 -> T06 -> T13 -> T09 -> T08 -> T04 -> T12 -> T05 -> T14`.

## P2 Delivery Checks

1. Replace `<title>[必填] 替换为 PPT 标题</title>`.
2. Search for placeholders:

```bash
rg "\\[必填\\]|TODO|Lorem|Click to add" path/to/index.html
```

3. Run static validation:

```bash
node scripts/validate-thoughtworks-deck.mjs path/to/index.html
```

4. Run visual regression:

```bash
node scripts/visual-check-deck.mjs path/to/index.html
```

5. Review generated screenshots and `report.json`.
6. Confirm `report.json` has no low-power failures, overview failures, or unrevealed animated elements.
7. Confirm `report.json.viewportChecks` show the full slide inside 1920x1080, 1440x900, 1512x982, 1280x720, mobile, and tablet viewports.
8. Open `index.html` in a browser.
9. Test arrow keys, wheel navigation, touch if relevant, `Esc` overview, and `B` low-power toggle.
10. Confirm no bottom red page rail, external counter, or persistent control help overlays the slide.
11. Inspect every slide at 100% browser zoom after scaling.

## P3 Writing Tone

Prefer:

- 统一指标口径
- 明确数据责任
- 压降人工填报
- 强化源头采集
- 建立质量校核
- 形成闭环督办
- 支撑经营穿透
- 以重点场景牵引

Avoid:

- 颠覆式变革
- 世界一流方案
- 全面赋能所有业务
- 一屏统管全部问题
- 简单通过上系统解决管理问题
- 用 AI 全面替代人工管理
