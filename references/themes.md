# Themes

Choose exactly one theme for each deck. These palettes use the public Thoughtworks color names and HEX values from the public brand guidelines, but this skill does not ship official assets.

## Core Palette

| Token | Color | HEX | Use |
|---|---|---|---|
| talc white | white | `#FFFFFF` | Main paper background |
| mist gray | light gray | `#EDF1F3` | Soft panel background |
| onyx black | black | `#000000` | Main text and dark pages |
| flamingo pink | pink | `#F2617A` | Highlight, CTA, one emphasis phrase |
| wave blue | deep blue | `#003D4F` | Dark theme, executive pages, quote panels |
| turmeric yellow | ochre | `#CC850A` | Caution or market signal |
| jade green | green | `#6B9E78` | Governance, sustainability, controls |
| sapphire blue | cyan-blue | `#47A1AD` | Data, platform, AI, technology |
| amethyst purple | purple | `#634F7D` | Product, organization, change themes |

## Theme 1 Wave Executive

Default for strategy, executive reporting, enterprise architecture, and transformation decks.

```css
body.theme-wave {
  --accent: #003D4F;
  --accent-contrast: #FFFFFF;
  --accent-secondary: #F2617A;
}
```

Use wave blue for dark panels and flamingo pink for a small callout only.

## Theme 2 Flamingo Decision

For sharp decisions, calls to action, change moments, and issue escalation.

```css
body.theme-flamingo {
  --accent: #F2617A;
  --accent-contrast: #000000;
  --accent-secondary: #003D4F;
}
```

Do not set normal body text in flamingo pink. It is not suitable for small text.

## Theme 3 Sapphire Platform

For data governance, AI transformation, digital platforms, and operating dashboards.

```css
body.theme-sapphire {
  --accent: #47A1AD;
  --accent-contrast: #000000;
  --accent-secondary: #634F7D;
}
```

Use sapphire for diagram nodes and platform panels; keep text black or white.

## Theme 4 Jade Governance

For governance, risk, controls, ESG, data quality, and operating mechanisms.

```css
body.theme-jade {
  --accent: #6B9E78;
  --accent-contrast: #000000;
  --accent-secondary: #003D4F;
}
```

Use jade for control checkpoints and quality gates.

## Theme 5 Amethyst Product

For product strategy, organization design, culture change, and innovation.

```css
body.theme-amethyst {
  --accent: #634F7D;
  --accent-contrast: #FFFFFF;
  --accent-secondary: #F2617A;
}
```

Use amethyst on dark pages and pair it with black/white typography.

## Theme 6 Turmeric Warning

For risk, timing pressure, market signals, and "why now" pages.

```css
body.theme-turmeric {
  --accent: #CC850A;
  --accent-contrast: #000000;
  --accent-secondary: #003D4F;
}
```

Use turmeric sparingly. It is a signal color, not a full-deck background color.

## Selection Rules

1. If the user does not choose, default to `theme-wave`.
2. Use `theme-sapphire` for data, AI, platform, and engineering strategy.
3. Use `theme-jade` for governance, risk, and quality.
4. Use `theme-amethyst` for product, culture, and organizational change.
5. Use `theme-flamingo` only when the deck needs strong decision emphasis.
6. Use `theme-turmeric` only for warning or urgency narratives.
7. Never mix multiple `body.theme-*` classes in one deck.
8. Do not accept arbitrary custom HEX values unless the user explicitly prioritizes client-brand adaptation over the Boge PPT / Thoughtworks-inspired design boundary.

## Suite Palette Mapping

Executive Transformation Suite:

| Palette | Use |
|---|---|
| `theme-wave` | Default executive transformation,经营穿透, management reporting |
| `theme-jade` | Governance, quality, risk, controls, sustainability |
| `theme-flamingo` | Decision escalation, change urgency, focused call to action |

Technology Strategy Suite:

| Palette | Use |
|---|---|
| `theme-sapphire` | Default technology strategy, data/AI platform, architecture |
| `theme-amethyst` | Product innovation, organization change, platform adoption |
| `theme-turmeric` | Risk, timing pressure, technical debt, migration urgency |

Each generated deck still uses exactly one `body.theme-*` class. Palette variants are starting points for the whole deck, not per-slide color mixing.
