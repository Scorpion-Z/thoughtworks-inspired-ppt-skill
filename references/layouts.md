# Layouts

Read `layout-lock.md` first. Start from one canonical 12-page suite when generating a deck, then use these skeletons only to extend or replace individual pages. Keep `data-layout` unchanged.

## Pre-flight

Before writing slides:

1. Confirm `templates/index.html` includes `styles/thoughtworks-inspired.css`.
2. Confirm `<body>` uses exactly one `theme-*` class and `data-deck-fit="contain"` unless the user explicitly accepts cropped `cover` mode.
3. Confirm each slide has `class="slide {theme}"` and `data-layout="Txx"`.
4. Confirm title text is a conclusion sentence.
5. Confirm the page rhythm table alternates content shapes.
6. Confirm local images under `images/` use `data-image-slot`.
7. If motion is used, confirm `data-animate` and `data-anim` values are registered in `components.md`.
8. Confirm the deck includes one `.control-help` outside the slide sections and does not show a persistent bottom page rail.

## Recommended 12-Page Template Suites

Use one of these suites when the user asks for a reusable consulting deck. Keep both at 12 pages unless the user asks for a different length.

Executive Transformation Suite for high-level transformation, operating mechanisms, governance, and executive reporting:

```text
T01 -> T02 -> T03 -> T05 -> T07 -> T06 -> T08 -> T11 -> T12 -> T09 -> T13 -> T14
```

Technology Strategy Suite for technology strategy, data/AI platforms, architecture, Technology Radar-style analysis, and engineering roadmaps:

```text
T01 -> T02 -> T03 -> T10 -> T06 -> T13 -> T09 -> T08 -> T04 -> T12 -> T05 -> T14
```

`examples/template-gallery/` shows the two-suite legend, rhythm, and palette options. `examples/full-layout-demo/` remains the complete T01-T14 layout library.

## T01 50/50 Cover

Use for cover pages and strong opening claims.

```html
<section class="slide split" data-layout="T01" data-animate="hero">
  <div class="half paper">
    <div class="kicker" data-anim="up">Digital transformation</div>
    <h1 class="title xl" data-anim="up">以数智化支撑集团经营穿透能力提升</h1>
    <p class="subtitle" data-anim="up">一句说明 deck 的业务目标、范围和方法。</p>
  </div>
  <div class="half visual">
    <div class="signal-system" aria-label="经营转型机制图" data-anim="right">
      <div class="signal-row">
        <div class="signal-node">经营判断</div><div class="signal-link"></div><div class="signal-node">数据证据</div>
      </div>
      <div class="signal-row">
        <div class="signal-node">管理规则</div><div class="signal-link"></div><div class="signal-node">平台能力</div>
      </div>
      <div class="signal-row">
        <div class="signal-node">责任闭环</div><div class="signal-link"></div><div class="signal-node">持续行动</div>
      </div>
    </div>
  </div>
  <div class="footer"><span>Boge PPT style</span><span>01</span></div>
</section>
```

## T02 Executive Summary

Use for 3-4 executive decisions or findings.

For long Chinese titles, insert one intentional `<br />` at a semantic break. Do not allow orphan single-character line breaks.

```html
<section class="slide light content-center" data-layout="T02" data-animate="cascade">
  <div class="kicker" data-anim="up">Executive summary</div>
  <h2 class="title" data-anim="up">核心结论写在标题里，<br />卡片只补充证据和动作</h2>
  <div class="grid-3 body-center">
    <div class="card fill" data-anim="card"><div class="card-title">结论一</div><p class="card-body">短句说明管理含义。</p></div>
    <div class="card fill" data-anim="card"><div class="card-title">结论二</div><p class="card-body">短句说明业务影响。</p></div>
    <div class="card accent" data-anim="card"><div class="card-title">唯一重点</div><p class="card-body">一页最多一个 accent card。</p></div>
  </div>
  <div class="footer"><span>核心判断</span><span>02</span></div>
</section>
```

## T03 Section Divider

Use every 3-5 pages to reset rhythm.

```html
<section class="slide wave" data-layout="T03" data-animate="hero">
  <div class="kicker" data-anim="up">Chapter 01</div>
  <h2 class="title statement" data-anim="up">先统一经营语言，再建设经营看板</h2>
  <p class="lead" data-anim="up">短句解释为什么这一章存在。</p>
  <div class="immersive-anchor" data-anim="right" aria-label="章节视觉锚点">
    <div class="anchor-stack">
      <div class="anchor-item"><span class="anchor-index">01</span><span>统一口径</span></div>
      <div class="anchor-item"><span class="anchor-index">02</span><span>明确责任</span></div>
      <div class="anchor-item"><span class="anchor-index">03</span><span>形成闭环</span></div>
    </div>
  </div>
  <div class="footer"><span>章节页</span><span>03</span></div>
</section>
```

## T04 Insight Statement

Use for one important argument with proof points.

```html
<section class="slide dark" data-layout="T04" data-animate="cascade">
  <div class="kicker" data-anim="up">Key insight</div>
  <h2 class="title statement" data-anim="up">系统不能替代管理规则，只能放大已经清晰的规则</h2>
  <div class="grid-3">
    <div class="card ink" data-anim="card"><div class="card-title">证据一</div><p class="card-body">一句话。</p></div>
    <div class="card ink" data-anim="card"><div class="card-title">证据二</div><p class="card-body">一句话。</p></div>
    <div class="card ink" data-anim="card"><div class="card-title">证据三</div><p class="card-body">一句话。</p></div>
  </div>
  <div class="footer"><span>洞察</span><span>04</span></div>
</section>
```

## T05 Diagnosis Matrix

Use for symptom/root cause/action analysis.

```html
<section class="slide light content-center" data-layout="T05" data-animate="cascade">
  <div class="kicker" data-anim="up">Diagnosis</div>
  <h2 class="title" data-anim="up">当前差距集中在口径、来源、责任、校核和闭环五个方面</h2>
  <table class="matrix body-center" data-anim="row">
    <tr><th>问题表现</th><th>深层原因</th><th>改进方向</th></tr>
    <tr><td>口径不一致</td><td>定义和周期未统一</td><td>建立指标口径管理机制</td></tr>
    <tr><td>人工填报多</td><td>源头采集不足</td><td>补强系统接口和质量规则</td></tr>
    <tr><td>异常发现晚</td><td>校核规则未前置</td><td>建立预警和整改闭环</td></tr>
  </table>
  <div class="footer"><span>差距诊断</span><span>05</span></div>
</section>
```

## T06 Capability Framework

Use for operating model, platform architecture, governance stack.

```html
<section class="slide light" data-layout="T06" data-animate="cascade">
  <div class="kicker" data-anim="up">Capability framework</div>
  <h2 class="title" data-anim="up">能力框架应同时覆盖管理机制、业务场景、数据体系、平台能力和安全运维</h2>
  <div class="architecture">
    <div class="layer" data-anim="card"><div class="layer-name">治理机制</div><div class="layer-desc">指标责任、数据责任、调度机制、整改闭环。</div></div>
    <div class="layer" data-anim="card"><div class="layer-name">业务场景</div><div class="layer-desc">经营分析、风险预警、资源配置、督办跟踪。</div></div>
    <div class="layer" data-anim="card"><div class="layer-name">数据体系</div><div class="layer-desc">主数据、指标库、数据质量、权限管理。</div></div>
    <div class="layer" data-anim="card"><div class="layer-name">平台能力</div><div class="layer-desc">数据集成、模型计算、报表服务、移动触达。</div></div>
  </div>
  <div class="footer"><span>能力框架</span><span>06</span></div>
</section>
```

## T07 Before / After

Use for current-to-target comparison.

```html
<section class="slide light content-center" data-layout="T07" data-animate="directional">
  <div class="kicker" data-anim="up">Before / after</div>
  <h2 class="title" data-anim="up">目标不是增加一套报表，而是把经营分析从事后解释推进到前置治理</h2>
  <div class="compare-board body-center">
    <div class="compare-panel" data-anim="left"><div class="card-title">当前状态</div><p class="card-body">多头口径、人工汇总、事后解释、整改跟踪弱。</p></div>
    <div class="compare-divider" data-anim="up">→</div>
    <div class="compare-panel target" data-anim="right"><div class="card-title">目标状态</div><p class="card-body">统一指标、源头采集、异常预警、责任闭环。</p></div>
  </div>
  <div class="footer"><span>模式转变</span><span>07</span></div>
</section>
```

## T08 Roadmap

Use for implementation path. Three stages are the default.

```html
<section class="slide mist content-center visual-depth" data-layout="T08" data-animate="timeline">
  <div class="kicker" data-anim="up">Roadmap</div>
  <h2 class="title" data-anim="up">按照试点先行、标准固化、全面推广三阶段推进</h2>
  <div class="roadmap-track body-center" data-anim="line">
    <div class="roadmap-stage" data-anim="node">
      <div class="roadmap-index">01</div>
      <div class="roadmap-meta">0-3M</div>
      <div class="stage-title">第一阶段：试点牵引</div>
      <ul><li>选择重点场景</li><li>形成规则样板</li></ul>
      <div class="roadmap-output" data-anim="card">输出：样板页面 / 口径清单</div>
    </div>
    <div class="roadmap-stage is-focus" data-anim="node">
      <div class="roadmap-index">02</div>
      <div class="roadmap-meta">3-9M</div>
      <div class="stage-title">第二阶段：标准固化</div>
      <ul><li>沉淀指标库</li><li>打通关键接口</li></ul>
      <div class="roadmap-output" data-anim="card">输出：指标库 / 接口清单</div>
    </div>
    <div class="roadmap-stage" data-anim="node">
      <div class="roadmap-index">03</div>
      <div class="roadmap-meta">9M+</div>
      <div class="stage-title">第三阶段：推广优化</div>
      <ul><li>扩展板块</li><li>闭环督办</li></ul>
      <div class="roadmap-output" data-anim="card">输出：推广机制 / 闭环看板</div>
    </div>
  </div>
  <div class="footer"><span>实施路径</span><span>08</span></div>
</section>
```

## T09 Priority Matrix

Use for priority decisions.

```html
<section class="slide light" data-layout="T09">
  <div class="kicker">Prioritization</div>
  <h2 class="title">优先选择高价值、可验证、责任边界清晰的场景作为试点</h2>
  <div class="priority-matrix">
    <div class="axis-y">Readiness</div>
    <div class="quadrants">
      <div class="quadrant strong">
        <div class="quadrant-title"><span class="dot"></span>优先试点</div>
        <div class="priority-items"><span class="priority-item"><span class="priority-index">01</span>经营看板</span><span class="priority-item"><span class="priority-index">02</span>异常预警</span></div>
      </div>
      <div class="quadrant">
        <div class="quadrant-title">重点准备</div>
        <div class="priority-items"><span class="priority-item"><span class="priority-index">03</span>指标库</span></div>
      </div>
      <div class="quadrant">
        <div class="quadrant-title">暂缓投入</div>
        <div class="priority-items"><span class="priority-item"><span class="priority-index">04</span>低频报表</span></div>
      </div>
      <div class="quadrant">
        <div class="quadrant-title">观察验证</div>
        <div class="priority-items"><span class="priority-item"><span class="priority-index">05</span>辅助分析</span></div>
      </div>
    </div>
    <div></div>
    <div class="axis-x">Business value</div>
  </div>
  <div class="footer"><span>优先级</span><span>09</span></div>
</section>
```

## T14 Closing

Use for final statement and next actions.

```html
<section class="slide dark" data-layout="T14" data-animate="quote">
  <div class="kicker" data-anim="up">Closing</div>
  <div class="quote"><span data-anim="line">最后一页收束为一个可执行判断。</span></div>
  <div class="quote-source" data-anim="up">下一步建议用 2-3 个动作承接。</div>
  <div class="closing-actions" data-anim="card">
    <div class="closing-action"><strong>规则</strong>统一口径和责任边界。</div>
    <div class="closing-action"><strong>场景</strong>优先验证高价值闭环。</div>
    <div class="closing-action"><strong>机制</strong>沉淀可推广的运行标准。</div>
  </div>
  <div class="footer"><span>总结页</span><span>14</span></div>
</section>
```

## T10 Radar

Use for technology/capability maturity. Keep the radar simple.

```html
<section class="slide light" data-layout="T10">
  <div class="kicker">Radar</div>
  <h2 class="title">能力成熟度应区分立即采用、试点验证、持续评估和谨慎推进</h2>
  <div class="panel-50">
    <div class="visual-panel">
      <div class="tile-field" aria-hidden="true">
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
        <span></span><span></span><span></span><span></span>
      </div>
    </div>
    <div class="text-panel">
      <div class="metric"><div class="metric-number">4</div><div class="metric-label">Adopt / Trial / Assess / Caution 四类判断</div></div>
      <p class="copy">如果需要真实雷达图，可引用 `assets/diagrams/radar.svg` 或按同一风格重画。</p>
    </div>
  </div>
  <div class="footer"><span>技术雷达</span><span>10</span></div>
</section>
```

## T11 Closed Loop

Use for management loops, data quality loops, issue remediation loops.

```html
<section class="slide light content-center" data-layout="T11" data-animate="loop">
  <div class="kicker" data-anim="up">Closed loop</div>
  <h2 class="title" data-anim="up">闭环不是多一个流程图，而是让异常识别、责任落实和整改验证进入同一机制</h2>
  <div class="loop-diagram body-center">
    <div class="loop-node" data-anim="node"><div class="loop-index">01</div><div class="loop-title">采集</div><p class="loop-copy">源头系统和填报入口。</p></div>
    <div class="loop-node" data-anim="node"><div class="loop-index">02</div><div class="loop-title">校核</div><p class="loop-copy">质量规则和异常识别。</p></div>
    <div class="loop-node" data-anim="node"><div class="loop-index">03</div><div class="loop-title">分析</div><p class="loop-copy">原因定位和影响评估。</p></div>
    <div class="loop-node focus" data-anim="node"><div class="loop-index">04</div><div class="loop-title">督办</div><p class="loop-copy">责任落实和整改验证。</p></div>
  </div>
  <div class="footer"><span>闭环机制</span><span>11</span></div>
</section>
```

## T12 Evidence Photo / Quote

Use for evidence, product screenshot, case quote, or field observation.

```html
<section class="slide split" data-layout="T12">
  <div class="half paper">
    <div class="kicker">Evidence</div>
    <h2 class="title">证据页必须说明这张图证明了什么</h2>
    <p class="lead">不要把图片当装饰。用一到两句解释它与结论的关系。</p>
  </div>
  <div class="half paper">
    <div class="image-frame r-16x10">
      <img src="images/12-evidence.png" data-image-slot="t12-photo-16x10" alt="证据图" />
    </div>
  </div>
  <div class="footer"><span>证据页</span><span>12</span></div>
</section>
```

## T13 Diagram Gallery

Use to show reusable diagrams or compare visual assets.

```html
<section class="slide mist" data-layout="T13">
  <div class="kicker">Diagram examples</div>
  <h2 class="title">图形应服务论证链条，而不是填充页面</h2>
  <div class="diagram-row">
    <div class="diagram-card"><img src="assets/diagrams/roadmap.svg" alt="路线图" /><div>三阶段路线图</div></div>
    <div class="diagram-card"><img src="assets/diagrams/radar.svg" alt="雷达图" /><div>能力雷达图</div></div>
  </div>
  <div class="footer"><span>图例</span><span>13</span></div>
</section>
```

## T14 Closing

Use for final message and next actions.

```html
<section class="slide dark" data-layout="T14" data-animate="quote">
  <div class="kicker" data-anim="up">Closing</div>
  <div class="quote"><span data-anim="line">工具的价值，取决于它和组织运行方式、管理规则、数据责任之间的匹配程度。</span></div>
  <div class="quote-source" data-anim="up">下一步：用重点场景验证规则，用真实数据验证机制。</div>
  <div class="footer"><span>结束页</span><span>14</span></div>
</section>
```
