# Layout Lock

Use these registered layouts only. Each slide must declare the matching `data-layout`.

| ID | Name | Use For | Required Structure |
|---|---|---|---|
| T01 | 50/50 Cover | Opening title, literal offer, or executive report cover | Left text area + right expressive block/photo/diagram area |
| T02 | Executive Summary | 3-4 top findings or decisions | Conclusion title + 3 or 4 cards |
| T03 | Section Divider | Chapter break or strategic pivot | Dark/wave/accent page + one large statement |
| T04 | Insight Statement | One sharp assertion | Large statement + short proof notes |
| T05 | Diagnosis Matrix | Problem/root cause/action diagnosis | Max 4 columns and 4 body rows |
| T06 | Capability Framework | Operating model, governance stack, architecture layers | 4-6 horizontal layers |
| T07 | Before/After | Current-to-target contrast | Two equal panels + transition logic |
| T08 | Roadmap | Implementation path | Three stages by default |
| T09 | Priority Matrix | Value/difficulty, impact/readiness, risk/control | 2x2 matrix + 3-5 labeled items |
| T10 | Radar | Maturity, technology choices, capability coverage | Radar or ring diagram + legend |
| T11 | Closed Loop | Data or management loop | 4-6 nodes, one loop message |
| T12 | Evidence Photo/Quote | Case proof, quote, customer/user evidence | 50/50 photo/text or quote/evidence panel |
| T13 | Diagram Gallery | Show reusable diagram set or compare visual assets | Diagram cards or chart cards |
| T14 | Closing | Final statement and next actions | Large final message + 2-3 actions |

## Hard Rules

- Do not create `Pxx`, `Sxx`, `TW-NEW`, or unnamed layouts.
- If a user explicitly asks for a new layout, use `data-layout="TX"` and add a comment explaining why it is experimental. Do not make it the default pattern.
- Use the CSS classes defined in `styles/thoughtworks-inspired.css`; do not invent large inline style systems.
- Run `node scripts/validate-thoughtworks-deck.mjs index.html` before delivery.

## Recommended Sequences

Short executive deck:

```text
T01 -> T02 -> T05 -> T06 -> T08 -> T14
```

Executive Transformation 12-page suite:

```text
T01 -> T02 -> T03 -> T05 -> T07 -> T06 -> T08 -> T11 -> T12 -> T09 -> T13 -> T14
```

Technology Strategy 12-page suite:

```text
T01 -> T02 -> T03 -> T10 -> T06 -> T13 -> T09 -> T08 -> T04 -> T12 -> T05 -> T14
```

Standard transformation deck:

```text
T01 -> T02 -> T03 -> T05 -> T07 -> T06 -> T09 -> T08 -> T11 -> T14
```

Technology strategy deck:

```text
T01 -> T02 -> T03 -> T10 -> T06 -> T13 -> T09 -> T08 -> T14
```

Data governance deck:

```text
T01 -> T02 -> T05 -> T06 -> T11 -> T09 -> T08 -> T14
```
