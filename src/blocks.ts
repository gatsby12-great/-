import type { LayoutBlock } from './types';

export const layoutBlocks: LayoutBlock[] = [
  {
    id: 'lead-card',
    group: '开头',
    name: '封面导语',
    description: '适合放在文章开头，先把问题讲清楚。',
    snippet: `<section class="lead-card">
  <p>这里写一段文章导语，直接点出读者现在遇到的问题。</p>
</section>`
  },
  {
    id: 'title-underline',
    group: '标题',
    name: '编号标题',
    description: '适合方法论、步骤型文章的小标题。',
    snippet: `<section class="block-title-underline">
  <p>01</p>
  <h2>这里写小标题</h2>
</section>`
  },
  {
    id: 'quote-card',
    group: '内容块',
    name: '金句卡片',
    description: '突出一句话观点。',
    snippet: `<section class="quote-card">
  <p>这里写一句最想让用户记住的话。</p>
</section>`
  },
  {
    id: 'number-card',
    group: '内容块',
    name: '重点卡片',
    description: '适合结论、判断标准、核心观点。',
    snippet: `<section class="number-card">
  <strong>核心判断</strong>
  <p>这里写你的重点内容。</p>
</section>`
  },
  {
    id: 'tips-card',
    group: '内容块',
    name: '提醒框',
    description: '适合注意事项、避坑提醒。',
    snippet: `<section class="tips-card">
  <strong>重点提醒</strong>
  <p>这里写提醒内容。</p>
</section>`
  },
  {
    id: 'step-list',
    group: '结构',
    name: '步骤清单',
    description: '适合流程、方法、执行步骤。',
    snippet: `<ol class="step-list">
  <li>第一步：写清楚要做什么</li>
  <li>第二步：写清楚为什么做</li>
  <li>第三步：写清楚怎么执行</li>
</ol>`
  },
  {
    id: 'two-column',
    group: '结构',
    name: '双栏对比',
    description: '适合对比错误做法和正确做法。',
    snippet: `<section class="two-column">
  <section class="column-card">
    <strong>错误做法</strong>
    <p>这里写常见错误。</p>
  </section>
  <section class="column-card">
    <strong>正确做法</strong>
    <p>这里写更好的做法。</p>
  </section>
</section>`
  },
  {
    id: 'divider',
    group: '装饰',
    name: '图文分割线',
    description: '适合段落切换。',
    snippet: `<section class="soft-divider"><span>✦</span></section>`
  },
  {
    id: 'tagline',
    group: '装饰',
    name: '小标签',
    description: '适合章节前的小提示。',
    snippet: `<p><span class="mini-tag">这一段很重要</span></p>`
  },
  {
    id: 'button',
    group: '转化',
    name: '结尾按钮',
    description: '适合文章末尾引导行动。',
    snippet: `<p class="button-wrap"><a class="wechat-button" href="#">点击这里了解更多</a></p>`
  },
  {
    id: 'fable-title',
    group: 'Fable 橙色风',
    name: '橙色编号标题',
    description: '模仿上传示例里的 01 + 标题结构。',
    snippet: `<section class="fable-title-row">
  <section class="fable-title-num">01</section>
  <h2 class="fable-title-text">这里写小标题</h2>
</section>`
  },
  {
    id: 'fable-punchline',
    group: 'Fable 橙色风',
    name: '橙色金句卡片',
    description: '浅橙底 + 左侧橙色竖线，用来突出核心判断。',
    snippet: `<section class="fable-punchline-card">
  <p>这里写一句最有记忆点的判断。</p>
</section>`
  },
  {
    id: 'fable-compare-stack',
    group: 'Fable 橙色风',
    name: '上下对比卡片',
    description: '适合旧方案 vs 新方案、软件 vs Skill、错误做法 vs 正确做法。',
    snippet: `<section class="fable-compare-stack">
  <section class="fable-compare-muted">
    <p><strong>🔧 旧方法</strong></p>
    <p>这里写旧方法的问题。</p>
  </section>
  <section class="fable-arrow">▼</section>
  <section class="fable-compare-highlight">
    <p><strong>🧠 新方法</strong></p>
    <p>这里写新方法的优势。</p>
  </section>
</section>`
  },
  {
    id: 'fable-flow',
    group: 'Fable 橙色风',
    name: '端到端流程图',
    description: '适合解释自动化流程、工具链、Agent 执行步骤。',
    snippet: `<section class="fable-flow">
  <section class="fable-flow-start">🎙️ 输入：录一段口播，交给 AI</section>
  <section class="fable-flow-arrow">↓</section>
  <section class="fable-flow-step"><strong>第 1 步 · 听懂</strong><span>语音转文字，自动识别口头禅和重复句。</span></section>
  <section class="fable-flow-arrow">↓</section>
  <section class="fable-flow-step green"><strong>第 2 步 · 重组</strong><span>把散乱内容整理成钩子、痛点、转折、干货和引导。</span></section>
  <section class="fable-flow-arrow">↓</section>
  <section class="fable-flow-step red"><strong>第 3 步 · 守门</strong><span>发布前检查风险词、导流词和不适合表达。</span></section>
  <section class="fable-flow-arrow">↓</section>
  <section class="fable-flow-end">📦 输出：成稿 + 排版 + 标题 + 摘要</section>
</section>`
  },
  {
    id: 'fable-five-grid',
    group: 'Fable 橙色风',
    name: '五段式彩色卡片',
    description: '适合展示 Hook / Pain / Turn / Value / CTA 这种结构。',
    snippet: `<section class="fable-five-grid">
  <section class="fable-mini-card orange"><p><strong>Hook 钩子</strong></p><p>前 3 秒留住人</p></section>
  <section class="fable-mini-card amber"><p><strong>Pain 痛点</strong></p><p>说出用户的难</p></section>
  <section class="fable-mini-card green"><p><strong>Turn 转折</strong></p><p>直到我发现</p></section>
  <section class="fable-mini-card blue"><p><strong>Value 干货</strong></p><p>核心价值交付</p></section>
  <section class="fable-mini-card purple"><p><strong>CTA 引导</strong></p><p>评论 / 收藏 / 关注</p></section>
</section>`
  },
  {
    id: 'fable-four-grid',
    group: 'Fable 橙色风',
    name: '四宫格功能卡片',
    description: '适合展示四个功能、四个模块、四种能力。',
    snippet: `<section class="fable-four-grid">
  <section class="fable-feature-card"><p><strong>🎞️ 功能一</strong></p><p>这里写第一项功能说明。</p></section>
  <section class="fable-feature-card"><p><strong>📑 功能二</strong></p><p>这里写第二项功能说明。</p></section>
  <section class="fable-feature-card"><p><strong>😊 功能三</strong></p><p>这里写第三项功能说明。</p></section>
  <section class="fable-feature-card"><p><strong>🎵 功能四</strong></p><p>这里写第四项功能说明。</p></section>
</section>`
  },
  {
    id: 'fable-platforms',
    group: 'Fable 橙色风',
    name: '三平台对比卡片',
    description: '适合公众号、小红书、抖音、视频号等平台规格对比。',
    snippet: `<section class="fable-platform-grid">
  <section class="fable-platform-card red"><p><strong>📕 小红书</strong></p><p>3:4 图文感，适合收藏和搜索。</p></section>
  <section class="fable-platform-card dark"><p><strong>🎵 抖音</strong></p><p>9:16 沉浸式，适合短视频推荐流。</p></section>
  <section class="fable-platform-card green"><p><strong>💬 视频号</strong></p><p>社交链分发，适合私域和信任传播。</p></section>
</section>`
  },
  {
    id: 'fable-risk-table',
    group: 'Fable 橙色风',
    name: '风险提示表格',
    description: '适合做平台规则、风险词、发布前检查清单。',
    snippet: `<table class="fable-risk-table">
  <tbody>
    <tr><th>级别</th><th>类别</th><th>处理建议</th></tr>
    <tr><td>🚫 硬拦截</td><td>极限表达</td><td>改成更稳妥的描述。</td></tr>
    <tr><td>⚠️ 软提醒</td><td>标题过猛</td><td>降低承诺感，保留观点感。</td></tr>
    <tr><td>✅ 可通过</td><td>普通表述</td><td>保持自然，不要过度营销。</td></tr>
  </tbody>
</table>`
  },
  {
    id: 'fable-caption',
    group: 'Fable 橙色风',
    name: '图注说明',
    description: '适合放在流程图、表格、对比图下面。',
    snippet: `<p class="fable-caption">▲ 这里写图注说明，让读者一眼看懂这张图在表达什么</p>`
  }
];
