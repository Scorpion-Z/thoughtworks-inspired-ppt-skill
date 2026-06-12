# Components

本文件定义 Thoughtworks-inspired HTML PPT 的常用组件。生成页面时优先使用这些组件，减少临场发明。

## 字体

- 英文标题：Bitter、Georgia、serif fallback。
- 英文正文：Inter、Arial、Helvetica、sans-serif。
- 中文标题：Source Han Serif SC、Noto Serif CJK SC、宋体类 fallback。
- 中文正文：Source Han Sans SC、Noto Sans CJK SC、Microsoft YaHei、PingFang SC。

## 字号

| 类型 | 建议字号 |
|------|----------|
| 封面标题 | 48 到 64px |
| 页面标题 | 34 到 44px |
| 小标题 | 20 到 24px |
| 正文 | 18 到 24px |
| 图注 | 14 到 16px |
| 页脚 | 12 到 14px |

## 基础组件

### Kicker

用于页眉小标签，承载章节、页面类型或英文关键词。

```html
<div class="kicker">Executive summary</div>
```

规则：短、明确、不要写成长句。

### Title

用于页面核心判断。

```html
<h2 class="title">当前差距集中在口径、来源、责任、校核和闭环五个方面</h2>
```

规则：标题承担观点表达，避免只写名词。

### Card

用于三到四个并列要点。

```html
<div class="card">
  <div class="card-title">统一口径</div>
  <div class="card-body">明确指标定义、统计周期、数据来源和责任部门。</div>
</div>
```

规则：卡片数量超过 4 个，优先拆页。

### Emphasis Card

用于唯一重点。

```html
<div class="card emphasis">
  <div class="card-title">穿透闭环</div>
  <div class="card-body">从结果展示走向异常识别、原因分析、责任落实和整改跟踪。</div>
</div>
```

规则：一页最多一个 emphasis card。

### Matrix

用于问题诊断、对标分析、责任分工。

```html
<table class="matrix">
  <tr><th>问题表现</th><th>深层原因</th><th>改进方向</th></tr>
  <tr><td>手工填报比例高</td><td>源头采集不足</td><td>补强系统接口</td></tr>
</table>
```

规则：最多 4 行 4 列，超出后拆页。

### Timeline

用于三阶段推进。

```html
<div class="timeline">
  <div class="stage"><div class="stage-title">第一阶段</div><ul><li>试点牵引</li></ul></div>
  <div class="stage"><div class="stage-title">第二阶段</div><ul><li>标准固化</li></ul></div>
  <div class="stage"><div class="stage-title">第三阶段</div><ul><li>推广优化</li></ul></div>
</div>
```

规则：三阶段最稳，四阶段需压缩文案。

### Architecture Layer

用于能力框架和平台架构。

```html
<div class="architecture">
  <div class="layer"><div class="layer-name">治理机制</div><div class="layer-desc">指标责任、数据责任、调度机制、整改闭环。</div></div>
</div>
```

规则：每层只写职责和能力，不写长解释。

### Diagram Card

用于展示内置 SVG 图例。

```html
<div class="diagram-card">
  <img src="assets/diagrams/roadmap.svg" />
  <div>三阶段路线图</div>
</div>
```

规则：SVG 图内文字少，复杂说明放在 HTML 文本里。

## 对齐规则

1. 页眉、标题、内容区左边线保持一致。
2. 卡片等高，标题和正文统一起点。
3. 图文页优先让正文块与图片底部对齐。
4. 页脚不承载重要结论。
5. 图片和图表最低处不能压到页脚安全区。
