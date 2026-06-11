import { marked } from 'marked';

export const DEFAULT_OPTIONS = {
  fontSize: 'normal',
  lineHeight: 'normal',
  previewWidth: 'wechat'
};

const commonTagStyles = {
  p: 'margin: 0 0 16px; line-height: 1.95; font-size: 16px;',
  strong: 'font-weight: 700;',
  em: 'font-style: italic;',
  ul: 'margin: 0 0 18px 20px; padding: 0;',
  ol: 'margin: 0 0 18px 20px; padding: 0;',
  li: 'margin: 8px 0; line-height: 1.85;',
  blockquote: 'margin: 18px 0; padding: 12px 16px; border-left: 4px solid #d0d7de; background: #f6f8fa; color: #4b5563;',
  hr: 'border: none; border-top: 1px solid #e5e7eb; margin: 28px 0;',
  code: 'font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 14px; background: #f3f4f6; padding: 2px 5px; border-radius: 4px;',
  pre: 'margin: 18px 0; padding: 14px; background: #111827; color: #f9fafb; border-radius: 10px; overflow-x: auto; line-height: 1.75;',
  img: 'max-width: 100%; height: auto; display: block; margin: 16px auto; border-radius: 8px;',
  a: 'color: inherit; text-decoration: none;',
  table: 'width: 100%; border-collapse: collapse; margin: 20px 0 10px; font-size: 14px;',
  th: 'padding: 10px 8px; text-align: left; font-weight: 800;',
  td: 'padding: 10px 8px; line-height: 1.7;'
};

function classStyles(accent, soft, text, surface) {
  return {
    'lead-card': `margin: 20px 0 24px; padding: 18px 18px; border-radius: 16px; background: ${soft}; color: ${text}; border: 1px solid ${accent}22;`,
    'block-title-underline': `margin: 32px 0 18px; padding: 0 0 10px; border-bottom: 2px solid ${accent};`,
    'quote-card': `margin: 22px 0; padding: 18px; border-radius: 18px; background: ${surface}; color: ${text}; border-left: 5px solid ${accent}; box-shadow: 0 8px 28px rgba(15, 23, 42, 0.08);`,
    'number-card': `margin: 20px 0; padding: 18px; border-radius: 18px; background: ${surface}; color: ${text}; border: 1px solid ${accent}33; box-shadow: 0 8px 28px rgba(15, 23, 42, 0.06);`,
    'tips-card': `margin: 20px 0; padding: 16px 18px; border-radius: 16px; background: ${soft}; color: ${text}; border: 1px dashed ${accent};`,
    'soft-divider': `margin: 30px 0; text-align: center; color: ${accent}; letter-spacing: 10px; font-size: 18px;`,
    'mini-tag': `display: inline-block; padding: 5px 11px; border-radius: 999px; background: ${soft}; color: ${accent}; font-size: 13px; font-weight: 700;`,
    'button-wrap': 'margin: 28px 0; text-align: center;',
    'wechat-button': `display: inline-block; padding: 10px 20px; border-radius: 999px; background: ${accent}; color: #ffffff; font-size: 15px; font-weight: 700;`,
    'two-column': 'margin: 22px 0; display: flex; gap: 12px;',
    'column-card': `flex: 1; padding: 15px; border-radius: 16px; background: ${surface}; border: 1px solid ${accent}26;`,
    'step-list': `margin: 20px 0; padding: 18px 18px 18px 36px; border-radius: 18px; background: ${soft}; color: ${text};`,
    'fable-title-row': 'margin: 32px 0 16px; text-align: left; font-size: 0;',
    'fable-title-num': `display: inline-block; background: ${accent}; color: #ffffff; font-size: 15px; line-height: 1.4; font-weight: 800; padding: 4px 14px; border-radius: 4px; vertical-align: middle;`,
    'fable-title-text': 'display: inline-block; font-size: 20px; font-weight: 850; color: #222222; margin: 0 0 0 10px; line-height: 1.45; vertical-align: middle;',
    'fable-punchline-card': `background: ${soft}; border-left: 4px solid ${accent}; padding: 16px 18px; margin: 0 0 28px; border-radius: 0 8px 8px 0;`,
    'fable-compare-stack': 'margin: 0 0 18px;',
    'fable-compare-muted': 'background: #f7f7f7; border-radius: 10px; padding: 16px 18px; margin-bottom: 10px; color: #666666;',
    'fable-arrow': `text-align: center; margin: 6px 0; color: ${accent}; font-size: 22px; line-height: 1;`,
    'fable-compare-highlight': `background: ${soft}; border: 1px solid #ffd9c4; border-radius: 10px; padding: 16px 18px; color: #a8552f;`,
    'fable-flow': 'margin: 0 0 8px;',
    'fable-flow-start': 'background: #2b2b2b; color: #ffffff; border-radius: 10px; padding: 12px 16px; text-align: center; font-weight: 800; font-size: 15px;',
    'fable-flow-end': 'background: #2b2b2b; color: #ffffff; border-radius: 10px; padding: 12px 16px; text-align: center; font-weight: 800; font-size: 15px;',
    'fable-flow-arrow': 'text-align: center; line-height: 1; margin: 4px 0; color: #cccccc; font-size: 18px;',
    'fable-flow-step': 'background: #eef4ff; border-radius: 10px; padding: 12px 16px; color: #555555; font-size: 14px;',
    green: 'background: #f0fdf4; color: #555555;',
    red: 'background: #fef2f2; color: #555555;',
    blue: 'background: #2563eb; color: #ffffff;',
    orange: 'background: #ff6b35; color: #ffffff;',
    amber: 'background: #f59e0b; color: #ffffff;',
    purple: 'background: #9333ea; color: #ffffff;',
    dark: 'background: #2b2b2b; color: #ffffff;',
    'fable-five-grid': 'display: flex; flex-wrap: wrap; margin: 0 0 8px;',
    'fable-mini-card': 'flex: 1 1 0%; min-width: 110px; text-align: center; padding: 10px 4px; border-radius: 8px; margin: 3px;',
    'fable-four-grid': 'display: flex; flex-wrap: wrap; margin: 0 0 8px;',
    'fable-feature-card': 'flex: 1 1 0%; min-width: 46%; background: #f7f7f7; border-radius: 10px; padding: 14px 16px; margin: 3px; color: #777777;',
    'fable-platform-grid': 'display: flex; flex-wrap: wrap; margin: 0 0 8px;',
    'fable-platform-card': 'flex: 1 1 0%; min-width: 30%; border-radius: 10px; padding: 14px 10px; margin: 3px; text-align: center; background: #f7f7f7; border: 1px solid #dddddd;',
    'fable-risk-table': 'width: 100%; border-collapse: collapse; font-size: 14px; margin: 0 0 8px; overflow: hidden;',
    'fable-caption': 'margin: 8px 0 16px; text-align: center; font-size: 13px; color: #aaaaaa; line-height: 1.7;'
  };
}

function buildTheme(id, name, description, accent, soft, text, surface, pageBg) {
  return {
    id,
    name,
    description,
    containerStyle: `max-width: 677px; margin: 0 auto; padding: 24px 18px; color: ${text}; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif; background: ${pageBg};`,
    tagStyles: {
      ...commonTagStyles,
      h1: `font-size: 24px; line-height: 1.45; margin: 0 0 24px; font-weight: 900; color: ${text};`,
      h2: `font-size: 20px; line-height: 1.55; margin: 30px 0 16px; padding-left: 12px; border-left: 4px solid ${accent}; font-weight: 850; color: ${text};`,
      h3: `font-size: 17px; line-height: 1.6; margin: 24px 0 12px; font-weight: 800; color: ${accent};`,
      strong: `font-weight: 850; color: ${accent};`
    },
    classStyles: classStyles(accent, soft, text, surface)
  };
}

export const themes = [
  buildTheme('minimal', '极简商务风', '适合正式干货、客户方案、商业观点。', '#111827', '#f3f4f6', '#1f2937', '#ffffff', '#ffffff'),
  buildTheme('xiaohongshu', '小红书风', '适合轻松表达、观点图文、种草感内容。', '#e11d48', '#ffe4e6', '#3f3f46', '#ffffff', '#fff7f7'),
  buildTheme('knowledge', '知识干货风', '适合方法论、教程、系统拆解类文章。', '#0284c7', '#e0f2fe', '#243042', '#ffffff', '#f8fafc'),
  buildTheme('magazine', '杂志感', '适合人物故事、品牌介绍、深度文章。', '#7c3aed', '#ede9fe', '#2e293b', '#ffffff', '#faf7ff'),
  buildTheme('tech', '科技蓝', '适合 AI、工具、自动化、产品说明。', '#2563eb', '#dbeafe', '#172554', '#ffffff', '#f8fbff'),
  buildTheme('orange', '暖橙促销', '适合活动介绍、课程招募、转化型文章。', '#ea580c', '#ffedd5', '#431407', '#ffffff', '#fff8f1'),
  buildTheme('green', '墨绿质感', '适合品牌调性、生活方式、长期主义内容。', '#047857', '#d1fae5', '#1f3d32', '#ffffff', '#f7fffb'),
  buildTheme('dark', '暗色高级', '适合高端感、反差感、观点型长文。', '#f59e0b', '#292524', '#fef3c7', '#1c1917', '#0c0a09'),
  buildTheme('fable', 'Fable 橙色知识风', '模仿示例文章的橙色知识长文排版，适合 Skill、Agent、自动化流程类内容。', '#ff6b35', '#fff7f2', '#3f3f3f', '#ffffff', '#ffffff')
];

export const blocks = [
  { id: 'lead-card', group: '开头', name: '封面导语', snippet: '<section class="lead-card">\n  <p>这里写一段文章导语。</p>\n</section>' },
  { id: 'title-underline', group: '标题', name: '编号标题', snippet: '<section class="block-title-underline">\n  <p>01</p>\n  <h2>这里写小标题</h2>\n</section>' },
  { id: 'quote-card', group: '内容块', name: '金句卡片', snippet: '<section class="quote-card">\n  <p>这里写一句金句。</p>\n</section>' },
  { id: 'number-card', group: '内容块', name: '重点卡片', snippet: '<section class="number-card">\n  <strong>核心判断</strong>\n  <p>这里写重点内容。</p>\n</section>' },
  { id: 'tips-card', group: '内容块', name: '提醒框', snippet: '<section class="tips-card">\n  <strong>重点提醒</strong>\n  <p>这里写提醒内容。</p>\n</section>' },
  { id: 'step-list', group: '结构', name: '步骤清单', snippet: '<ol class="step-list">\n  <li>第一步</li>\n  <li>第二步</li>\n</ol>' },
  { id: 'fable-title', group: 'Fable 橙色风', name: '橙色编号标题', snippet: '<section class="fable-title-row">\n  <section class="fable-title-num">01</section>\n  <h2 class="fable-title-text">这里写小标题</h2>\n</section>' },
  { id: 'fable-punchline', group: 'Fable 橙色风', name: '橙色金句卡片', snippet: '<section class="fable-punchline-card">\n  <p>这里写一句最有记忆点的判断。</p>\n</section>' },
  { id: 'fable-flow', group: 'Fable 橙色风', name: '端到端流程图', snippet: '<section class="fable-flow">\n  <section class="fable-flow-start">🎙️ 输入：录一段内容，交给 AI</section>\n  <section class="fable-flow-arrow">↓</section>\n  <section class="fable-flow-step"><strong>第 1 步 · 听懂</strong><span>识别内容，整理结构。</span></section>\n  <section class="fable-flow-arrow">↓</section>\n  <section class="fable-flow-end">📦 输出：成稿 + 排版 + 标题</section>\n</section>' }
];

export function getTheme(themeId = 'minimal') {
  return themes.find((theme) => theme.id === themeId) ?? themes[0];
}

function mergeInlineStyle(attrs, style) {
  if (/style\s*=\s*"/i.test(attrs)) {
    return attrs.replace(/style\s*=\s*"([^"]*)"/i, (_, existing) => `style="${existing}; ${style}"`);
  }
  return `${attrs} style="${style}"`;
}

function styleTag(html, tag, style) {
  const re = new RegExp(`<${tag}(\\s[^>]*)?>`, 'gi');
  return html.replace(re, (match, attrs = '') => `<${tag}${mergeInlineStyle(attrs, style)}>`);
}

function styleClass(html, className, style) {
  const re = new RegExp(`<([a-zA-Z0-9]+)([^>]*class="[^"]*\\b${className}\\b[^"]*"[^>]*)>`, 'g');
  return html.replace(re, (_, tag, attrs) => `<${tag}${mergeInlineStyle(attrs, style)}>`);
}

function stripScripts(html) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/\son[a-z]+="[^"]*"/gi, '')
    .replace(/javascript:/gi, '');
}

export function renderWechatHtml(markdown = '', themeId = 'minimal', options = DEFAULT_OPTIONS) {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options };
  const theme = getTheme(themeId);
  const fontSize = mergedOptions.fontSize === 'compact' ? '15px' : mergedOptions.fontSize === 'large' ? '17px' : '16px';
  const lineHeight = mergedOptions.lineHeight === 'tight' ? '1.75' : mergedOptions.lineHeight === 'loose' ? '2.1' : '1.95';
  const maxWidth = mergedOptions.previewWidth === 'phone' ? '390px' : '677px';

  marked.setOptions({ gfm: true, breaks: true });
  let html = marked.parse(markdown || '');
  html = stripScripts(html);

  Object.entries(theme.tagStyles).forEach(([tag, style]) => {
    html = styleTag(html, tag, style);
  });

  Object.entries(theme.classStyles).forEach(([className, style]) => {
    html = styleClass(html, className, style);
  });

  html = styleTag(html, 'p', `font-size: ${fontSize}; line-height: ${lineHeight};`);
  html = styleTag(html, 'li', `font-size: ${fontSize}; line-height: ${lineHeight};`);

  return `<section style="${theme.containerStyle} max-width: ${maxWidth};">${html}</section>`;
}

export function htmlToPlainText(html = '') {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

export function renderPayload(payload = {}) {
  const markdown = payload.markdown ?? '';
  const themeId = payload.themeId ?? 'minimal';
  const options = { ...DEFAULT_OPTIONS, ...(payload.options ?? {}) };
  const html = renderWechatHtml(markdown, themeId, options);
  const plainText = htmlToPlainText(html);
  return {
    html,
    plainText,
    wordCount: plainText.replace(/\s/g, '').length,
    themeId,
    options
  };
}
