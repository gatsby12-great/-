import type { ThemeId, WechatTheme } from '../types';

const commonTagStyles: Record<string, string> = {
  article: '',
  p: 'margin: 0 0 16px; line-height: 1.95; font-size: 16px;',
  strong: 'font-weight: 700;',
  em: 'font-style: italic;',
  ul: 'margin: 0 0 18px 20px; padding: 0;',
  ol: 'margin: 0 0 18px 20px; padding: 0;',
  li: 'margin: 6px 0; line-height: 1.85;',
  blockquote: 'margin: 18px 0; padding: 12px 16px; border-left: 4px solid #d0d7de; background: #f6f8fa; color: #4b5563;',
  hr: 'border: none; border-top: 1px solid #e5e7eb; margin: 28px 0;',
  code: 'font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 14px; background: #f3f4f6; padding: 2px 5px; border-radius: 4px;',
  pre: 'margin: 18px 0; padding: 14px; background: #111827; color: #f9fafb; border-radius: 10px; overflow-x: auto; line-height: 1.75;',
  img: 'max-width: 100%; height: auto; display: block; margin: 16px auto; border-radius: 8px;',
  a: 'color: #2563eb; text-decoration: none;'
};

export const themes: WechatTheme[] = [
  {
    id: 'minimal',
    name: '极简商务风',
    description: '适合干货文章、客户方案、正式公众号内容。',
    containerStyle: 'max-width: 677px; margin: 0 auto; padding: 24px 18px; color: #1f2937; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif; background: #ffffff;',
    tagStyles: {
      ...commonTagStyles,
      h1: 'font-size: 24px; line-height: 1.45; margin: 0 0 24px; font-weight: 800; color: #111827;',
      h2: 'font-size: 20px; line-height: 1.55; margin: 30px 0 16px; padding-left: 12px; border-left: 4px solid #111827; font-weight: 800; color: #111827;',
      h3: 'font-size: 17px; line-height: 1.6; margin: 24px 0 12px; font-weight: 700; color: #111827;',
      strong: 'font-weight: 800; color: #111827;'
    }
  },
  {
    id: 'xiaohongshu',
    name: '小红书风',
    description: '适合轻松表达、观点文、图文感公众号。',
    containerStyle: 'max-width: 677px; margin: 0 auto; padding: 24px 18px; color: #3f3f46; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif; background: #fff7f7;',
    tagStyles: {
      ...commonTagStyles,
      p: 'margin: 0 0 18px; line-height: 2; font-size: 16px;',
      h1: 'font-size: 24px; line-height: 1.45; margin: 0 0 22px; font-weight: 900; color: #be123c;',
      h2: 'font-size: 19px; line-height: 1.55; margin: 30px 0 16px; padding: 8px 14px; border-radius: 999px; background: #ffe4e6; color: #be123c; font-weight: 800; display: inline-block;',
      h3: 'font-size: 17px; line-height: 1.6; margin: 24px 0 12px; color: #be123c; font-weight: 800;',
      strong: 'font-weight: 900; color: #e11d48; background: linear-gradient(transparent 60%, #fecdd3 0);',
      blockquote: 'margin: 18px 0; padding: 14px 16px; border-left: none; border-radius: 14px; background: #ffffff; color: #52525b; box-shadow: 0 6px 18px rgba(244, 63, 94, 0.08);'
    }
  },
  {
    id: 'knowledge',
    name: '知识干货风',
    description: '适合方法论、教程、系统拆解类文章。',
    containerStyle: 'max-width: 677px; margin: 0 auto; padding: 24px 18px; color: #243042; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif; background: #f8fafc;',
    tagStyles: {
      ...commonTagStyles,
      p: 'margin: 0 0 16px; line-height: 1.95; font-size: 16px;',
      h1: 'font-size: 24px; line-height: 1.45; margin: 0 0 24px; font-weight: 900; color: #0f172a;',
      h2: 'font-size: 19px; line-height: 1.55; margin: 32px 0 16px; padding: 10px 14px; background: #e0f2fe; border-left: 5px solid #0284c7; color: #0f172a; font-weight: 850;',
      h3: 'font-size: 17px; line-height: 1.6; margin: 24px 0 12px; font-weight: 800; color: #075985;',
      strong: 'font-weight: 850; color: #0369a1;',
      blockquote: 'margin: 18px 0; padding: 14px 16px; border-left: 4px solid #38bdf8; background: #ecfeff; color: #334155;'
    }
  }
];

export function getTheme(themeId: ThemeId): WechatTheme {
  return themes.find((theme) => theme.id === themeId) ?? themes[0];
}
