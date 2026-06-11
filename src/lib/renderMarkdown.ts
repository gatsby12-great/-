import { marked } from 'marked';
import DOMPurify from 'dompurify';
import type { WechatTheme } from '../types';

marked.setOptions({
  gfm: true,
  breaks: true
});

function mergeStyle(element: HTMLElement, style: string) {
  const oldStyle = element.getAttribute('style') ?? '';
  const separator = oldStyle.trim().endsWith(';') || oldStyle.trim() === '' ? '' : '; ';
  element.setAttribute('style', `${oldStyle}${separator}${style}`.trim());
}

function applyInlineStyles(root: HTMLElement, theme: WechatTheme) {
  mergeStyle(root, theme.containerStyle);

  const allElements = root.querySelectorAll<HTMLElement>('*');
  allElements.forEach((element) => {
    const tagName = element.tagName.toLowerCase();
    const style = theme.tagStyles[tagName];

    if (style) {
      mergeStyle(element, style);
    }

    if (tagName === 'pre') {
      const code = element.querySelector<HTMLElement>('code');
      if (code) {
        code.setAttribute('style', 'font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 14px; background: transparent; color: inherit; padding: 0;');
      }
    }
  });
}

export function renderMarkdownToWechatHtml(markdown: string, theme: WechatTheme) {
  const rawHtml = marked.parse(markdown || '', { async: false }) as string;
  const cleanHtml = DOMPurify.sanitize(rawHtml, {
    USE_PROFILES: { html: true }
  });

  const wrapper = document.createElement('section');
  wrapper.innerHTML = cleanHtml;
  applyInlineStyles(wrapper, theme);

  return wrapper.outerHTML;
}

export function htmlToPlainText(html: string) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent ?? '';
}
