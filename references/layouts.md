# Layouts

Read `layout-lock.md` first. Copy one skeleton, then replace text and assets. Keep `data-layout` unchanged.

## Pre-flight

Before writing slides:

1. Confirm `templates/index.html` includes `styles/thoughtworks-inspired.css`.
2. Confirm each slide has `class="slide {theme}"` and `data-layout="Txx"`.
3. Confirm title text is a conclusion sentence.
4. Confirm the page rhythm table alternates content shapes.
5. Confirm local images under `images/` use `data-image-slot`.

## T01 50/50 Cover

Use for cover pages and strong opening claims.

```html
<section class="slide split" data-layout="T01">
  <div class="half paper">
    <div class="kicker">Digital transformation</div>
    <h1 class="title xl">以数智化支撑集团经营穿透能力提升</h1>
    <p class="subtitle">一句说明 deck 的业务目标、范围和方法。</p>
  </div>
  <div class="half visual">
    <div class="tile-field" aria-hidden="true">
      <span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span>
    </div>
  </div>
  <div class="footer"><span>Thoughtworks-inspired style</span><span>01</span></div>
</section>
```

## T02 Executive Summary

Use for 3-4 executive decisions or findings.

For long Chinese titles, insert one intentional `<br />` at a semantic break. Do not allow orphan single-character line breaks.

```html
<section class="slide light" data-layout="T02">
  <div class="kicker">Executive summary</div>
  <h2 class="title">核心结论写在标题里，<br />卡片只补充证据和动作</h2>
  <div class="grid-3">
    <div class="card fill"><div class="card-title">结论一</div><p class="card-body">短句说明管理含义。</p></div>
    <div class="card fill"><div class="card-title">结论二</div><p class="card-body">短句说明业务影响。</p></div>
    <div class="card accent"><div class="card-title">唯一重点</div><p class="card-body">一页最多一个 accent card。</p></div>
  </div>
  <div class="footer"><span>核心判断</span><span>02</span></div>
</section>
```

## T03 Section Divider

Use every 3-5 pages to reset rhythm.

```html
<section class="slide wave" data-layout="T03">
  <div class="kicker">Chapter 01</div>
  <h2 class="title statement">先统一经营语言，再建设经营看板</h2>
  <p class="lead">短句解释为什么这一章存在。</p>
  <div class="footer"><span>章节页</span><span>03</span></div>
</section>
```

## T04 Insight Statement

Use for one important argument with proof points.

```html
<section class="slide dark" data-layout="T04">
  <div class="kicker">Key insight</div>
  <h2 class="title statement">系统不能替代管理规则，只能放大已经清晰的规则</h2>
  <div class="grid-3">
    <div class="card ink"><div class="card-title">证据一</div><p class="card-body">一句话。</p></div>
    <div class="card ink"><div class="card-title">证据二</div><p class="card-body">一句话。</p></div>
    <div class="card ink"><div class="card-title">证据三</div><p class="card-body">一句话。</p></div>
  </div>
  <div class="footer"><span>洞察</span><span>04</span></div>
</section>
```

## T05 Diagnosis Matrix

Use for symptom/root cause/action analysis.

```html
<section class="slide light" data-layout="T05">
  <div class="kicker">Diagnosis</div>
  <h2 class="title">当前差距集中在口径、来源、责任、校核和闭环五个方面</h2>
  <table class="matrix">
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
<section class="slide light" data-layout="T06">
  <div class="kicker">Capability framework</div>
  <h2 class="title">能力框架应同时覆盖管理机制、业务场景、数据体系、平台能力和安全运维</h2>
  <div class="architecture">
    <div class="layer"><div class="layer-name">治理机制</div><div class="layer-desc">指标责任、数据责任、调度机制、整改闭环。</div></div>
    <div class="layer"><div class="layer-name">业务场景</div><div class="layer-desc">经营分析、风险预警、资源配置、督办跟踪。</div></div>
    <div class="layer"><div class="layer-name">数据体系</div><div class="layer-desc">主数据、指标库、数据质量、权限管理。</div></div>
    <div class="layer"><div class="layer-name">平台能力</div><div class="layer-desc">数据集成、模型计算、报表服务、移动触达。</div></div>
  </div>
  <div class="footer"><span>能力框架</span><span>06</span></div>
</section>
```

## T07 Before / After

Use for current-to-target comparison.

```html
<section class="slide light" data-layout="T07">
  <div class="kicker">Before / after</div>
  <h2 class="title">目标不是增加一套报表，而是把经营分析从事后解释推进到前置治理</h2>
  <div class="grid-2">
    <div class="card fill"><div class="card-title">当前状态</div><p class="card-body">多头口径、人工汇总、事后解释、整改跟踪弱。</p></div>
    <div class="card accent"><div class="card-title">目标状态</div><p class="card-body">统一指标、源头采集、异常预警、责任闭环。</p></div>
  </div>
  <div class="footer"><span>模式转变</span><span>07</span></div>
</section>
```

## T08 Roadmap

Use for implementation path. Three stages are the default.

```html
<section class="slide light" data-layout="T08">
  <div class="kicker">Roadmap</div>
  <h2 class="title">按照试点先行、标准固化、全面推广三阶段推进</h2>
  <div class="timeline">
    <div class="stage"><div class="stage-title">第一阶段：试点牵引</div><ul><li>选择重点场景</li><li>形成规则样板</li></ul></div>
    <div class="stage"><div class="stage-title">第二阶段：标准固化</div><ul><li>沉淀指标库</li><li>打通关键接口</li></ul></div>
    <div class="stage"><div class="stage-title">第三阶段：推广优化</div><ul><li>扩展板块</li><li>闭环督办</li></ul></div>
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
      <div class="quadrant strong"><span class="dot"></span>优先试点：高价值、高准备度</div>
      <div class="quadrant">重点准备：高价值、低准备度</div>
      <div class="quadrant">暂缓投入：低价值、低准备度</div>
      <div class="quadrant">观察验证：低价值、高准备度</div>
    </div>
    <div></div>
    <div class="axis-x">Business value</div>
  </div>
  <div class="footer"><span>优先级</span><span>09</span></div>
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
<section class="slide light" data-layout="T11">
  <div class="kicker">Closed loop</div>
  <h2 class="title">闭环不是多一个流程图，而是让异常识别、责任落实和整改验证进入同一机制</h2>
  <div class="grid-4">
    <div class="card fill"><div class="card-title">采集</div><p class="card-body">源头系统和填报入口。</p></div>
    <div class="card fill"><div class="card-title">校核</div><p class="card-body">质量规则和异常识别。</p></div>
    <div class="card fill"><div class="card-title">分析</div><p class="card-body">原因定位和影响评估。</p></div>
    <div class="card accent"><div class="card-title">督办</div><p class="card-body">责任落实和整改验证。</p></div>
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
<section class="slide dark" data-layout="T14">
  <div class="kicker">Closing</div>
  <div class="quote">工具的价值，取决于它和组织运行方式、管理规则、数据责任之间的匹配程度。</div>
  <div class="quote-source">下一步：用重点场景验证规则，用真实数据验证机制。</div>
  <div class="footer"><span>结束页</span><span>14</span></div>
</section>
```
