# Image Prompts

Use images as evidence, diagrams, or abstract backgrounds. Do not create assets that look official or imply Thoughtworks authorization.

## Core Rules

1. Images must not include page numbers, deck titles, footers, logos, or decorative badges.
2. Chinese decks use Chinese labels in generated infographics; English decks use English labels.
3. Match image ratio to the layout slot before generating or cropping.
4. Use real screenshots or photos only when they are evidence. Do not restyle evidence until it changes meaning.
5. Use generated abstraction for AI, data, platform, and conceptual topics.
6. Do not generate human photos for corporate proof unless the user provides the people/photo source and usage rights.
7. Do not crop photos into circles, triangles, polygons, or arbitrary logo-like shapes.

## Common Slots

| Slot | Ratio | Use |
|---|---|---|
| `t01-cover-visual-1x1` | 1:1 | Cover block-grid or abstract visual |
| `t10-radar-16x9` | 16:9 | Radar or maturity visual |
| `t12-photo-16x10` | 16:10 | Evidence photo or screenshot |
| `t12-screenshot-16x10` | 16:10 | Product/dashboard screenshot |
| `t13-diagram-16x9` | 16:9 | Flat diagram or infographic |
| `t13-gallery-3x2` | 3:2 | Reusable diagram card |

Local images under `images/` must include the slot:

```html
<img src="images/12-evidence.png" data-image-slot="t12-photo-16x10" alt="证据图" />
```

## Abstract Visual Prompt

Use for T01 cover or chapter visuals.

```text
Abstract corporate technology visual, 50/50 block composition, flat rectangular shapes, talc white, mist gray, wave blue and one flamingo pink accent, high contrast, no logo, no text, no rounded corners, no gradient, 16:10.
```

## Capability Framework Prompt

Use for T06/T13 framework images when SVG assets are not enough.

```text
Flat vector capability framework diagram for an executive presentation, Chinese labels, 5 horizontal layers, black and white base, one wave blue accent, clean grid, high legibility, no logo, no page title, 16:9.
```

## Roadmap Prompt

Use for T08 roadmap images.

```text
Flat three-stage roadmap infographic, Chinese labels, tasks outputs milestones, 50/50 design logic, black text on white, one sapphire blue accent, no logo, no footer, no decorative icons, 16:9.
```

## Screenshot Framing Prompt

Use only when the screenshot is evidence and must remain readable.

```text
Place the provided screenshot on a clean presentation canvas, preserve all screenshot text and data, add generous white/mist-gray margin, thin rectangular keyline, no shadow, no rounded corners, no logo, 16:10.
```

## Do Not Generate

- Official Thoughtworks wordmark or oblique.
- Brand-pack illustrations or photography imitations.
- Fake client dashboards with invented data unless the user asks for a clearly fictional mockup.
- People images presented as real employees.
- Images with unreadable text, tiny charts, or arbitrary icons.
