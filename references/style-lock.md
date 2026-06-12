# Style Lock

Generate Thoughtworks-inspired decks with public-brand-language constraints, not official template reproduction.

## Source Boundary

Use these public cues only:

- Typography: Bitter Bold for English headlines, Inter for body and callouts, Noto Serif SC Black for simplified Chinese headlines, Noto Sans SC for simplified Chinese body text.
- Palette: talc white, mist gray, onyx black, flamingo pink, wave blue, turmeric yellow, jade green, sapphire blue, amethyst purple.
- Design method: use 50/50 canvas division and repeated rectangular blocks to pair expressive visual areas with clean typography areas.
- Presentation style: simple bold text areas, flat graphics, consistent diagrams, strong legibility.

Do not use Thoughtworks official logo, official deck templates, official illustration files, official photography library, website screenshots, brand-pack assets, or the official oblique as decoration. This skill is only style-inspired.

## Visual Rules

1. Use one core message per slide.
2. Make every title a conclusion or decision sentence, not a weak topic label.
3. Use one theme accent per deck; do not mix multiple accent colors for decoration.
4. Set major headlines in black or white whenever possible; use accent color for callouts, numbers, bullets, diagram nodes, and one highlighted phrase only.
5. Use flat rectangular areas, thin lines, large type, and generous whitespace.
6. Do not use gradients, heavy shadows, rounded cards, emoji, decorative stock imagery, or oblique-like marks.
7. Use photos only when they are real evidence or case context; never crop them into circles, triangles, or arbitrary shapes.
8. Prefer vector-like diagrams, capability frameworks, matrices, roadmaps, radar views, data loops, and evidence panels.
9. Keep page numbers and source notes in a stable footer. Do not place conclusions in the footer.
10. Presentation readability wins over density: body text >= 18px, captions and footers >= 14px.

## Layout Rules

1. Every slide must use `<section class="slide ... " data-layout="Txx">`.
2. Use only registered layouts from `references/layout-lock.md` unless the user explicitly asks for an experimental layout.
3. Keep theme rhythm varied: 8+ slides need at least one dark/wave/accent page and one `T03` section divider.
4. Do not use more than four cards in one row. Split dense material into two pages.
5. Tables max out at 4 columns and 4 body rows. Beyond that, use grouped cards or an appendix.
6. Diagram labels should remain readable HTML text when possible; do not hide dense labels inside tiny SVG text.
7. Image pages must define `data-image-slot` on local `images/` assets.

## Content Rules

1. Do not invent data.
2. Mark unsupported analysis as "建议", "待核实", "可进一步调研", or "需材料确认".
3. For state-owned enterprise or executive reporting, use restrained management language: responsibilities, mechanisms, scenarios, paths, controls, and evidence.
4. Avoid consulting slogans that overpromise: "颠覆式", "一屏统管全部问题", "全面赋能所有业务", "世界一流方案".
5. Connect technical claims to business value, management mechanism, operating boundary, and implementation path.

## Generation Order

1. Read `style-lock.md`, `themes.md`, `layout-lock.md`, `layouts.md`, `components.md`, and `checklist.md`.
2. Choose one theme from `themes.md`.
3. Draft a page rhythm table with page number, layout id, core message, visual form, and theme class.
4. Copy `templates/index.html`, replace the title placeholder, and replace demo slides.
5. Use layout skeletons from `layouts.md`.
6. Run `node scripts/validate-thoughtworks-deck.mjs path/to/index.html`.
7. Open the HTML in a browser and inspect every slide.
