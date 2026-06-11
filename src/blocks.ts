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
  }
];
