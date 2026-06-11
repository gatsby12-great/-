import { marked } from 'marked';
import DOMPurify from 'dompurify';
import type { EditorOptions, WechatTheme } from '../types';

marked.setOptions({
  gfm: true,
  breaks: true
});

function mergeStyle(element: HTMLElement, style: string) {
  const oldStyle = element.getAttribute('style') ?? '';
  const separator = oldStyle.trim().endsWith(';') || oldStyle.trim() === '' ? '' : '; ';
  element.setAttribute('style', `${oldStyle}${separator}${style}`.trim());
}

function optionStyle(options: EditorOptions) {
  const fontSize = options.fontSize === 'compact' ? '15px' : options.fontSize === 'large' ? '17px' : '16px';
  const lineHeight = options.lineHeight === 'tight' ? '1.75' : options.lineHeight === 'loose' ? '2.1' : '1.95';
  const maxWidth = options.previewWidth === 'phone' ? '390px' : '677px';

  return { fontSize, lineHeight, maxWidth };
}

function applyInlineStyles(root: HTMLElement, theme: WechatTheme, options: EditorOptions) {
  const optionsStyle = optionStyle(options);
  mergeStyle(root, theme.containerStyle);
  mergeStyle(root, `max-width: ${optionsStyle.maxWidth};`);

  const allElements = root.querySelectorAll<HTMLElement>('*');
  allElements.forEach((element) => {
    const tagName = element.tagName.toLowerCase();
    const tagStyle = theme.tagStyles[tagName];

    if (tagStyle) {
      mergeStyle(element, tagStyle);
    }

    element.classList.forEach((className) => {
      const classStyle = theme.classStyles[className];
      if (classStyle) {
        mergeStyle(element, classStyle);
      }
    });

    if (tagName === 'p' || tagName === 'li') {
      mergeStyle(element, `font-size: ${optionsStyle.fontSize}; line-height: ${optionsStyle.lineHeight};`);
    }

    if (tagName === 'pre') {
      const code = element.querySelector<HTMLElement>('code');
      if (code) {
        code.setAttribute('style', 'font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 14px; background: transparent; color: inherit; padding: 0;');
      }
    }
  });
}

export function renderMarkdownToWechatHtml(markdown: string, theme: WechatTheme, options: EditorOptions) {
  const rawHtml = marked.parse(markdown || '', { async: false }) as string;
  const cleanHtml = DOMPurify.sanitize(rawHtml, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ['class', 'href', 'target']
  });

  const wrapper = document.createElement('section');
  wrapper.innerHTML = cleanHtml;
  applyInlineStyles(wrapper, theme, options);

  return wrapper.outerHTML;
}

export function htmlToPlainText(html: string) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent ?? '';
}
