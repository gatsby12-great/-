import type { ThemeId, WechatTheme } from '../types';

const commonTagStyles: Record<string, string> = {
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
  a: 'color: inherit; text-decoration: none;'
};

function classStyles(accent: string, soft: string, text: string, surface: string): Record<string, string> {
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
    'step-list': `margin: 20px 0; padding: 18px 18px 18px 36px; border-radius: 18px; background: ${soft}; color: ${text};`
  };
}

function buildTheme(id: ThemeId, name: string, description: string, accent: string, soft: string, text: string, surface: string, pageBg: string): WechatTheme {
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

export const themes: WechatTheme[] = [
  buildTheme('minimal', '极简商务风', '适合正式干货、客户方案、商业观点。', '#111827', '#f3f4f6', '#1f2937', '#ffffff', '#ffffff'),
  buildTheme('xiaohongshu', '小红书风', '适合轻松表达、观点图文、种草感内容。', '#e11d48', '#ffe4e6', '#3f3f46', '#ffffff', '#fff7f7'),
  buildTheme('knowledge', '知识干货风', '适合方法论、教程、系统拆解类文章。', '#0284c7', '#e0f2fe', '#243042', '#ffffff', '#f8fafc'),
  buildTheme('magazine', '杂志感', '适合人物故事、品牌介绍、深度文章。', '#7c3aed', '#ede9fe', '#2e293b', '#ffffff', '#faf7ff'),
  buildTheme('tech', '科技蓝', '适合 AI、工具、自动化、产品说明。', '#2563eb', '#dbeafe', '#172554', '#ffffff', '#f8fbff'),
  buildTheme('orange', '暖橙促销', '适合活动介绍、课程招募、转化型文章。', '#ea580c', '#ffedd5', '#431407', '#ffffff', '#fff8f1'),
  buildTheme('green', '墨绿质感', '适合品牌调性、生活方式、长期主义内容。', '#047857', '#d1fae5', '#1f3d32', '#ffffff', '#f7fffb'),
  buildTheme('dark', '暗色高级', '适合高端感、反差感、观点型长文。', '#f59e0b', '#292524', '#fef3c7', '#1c1917', '#0c0a09')
];

export function getTheme(themeId: ThemeId): WechatTheme {
  return themes.find((theme) => theme.id === themeId) ?? themes[0];
}
