import { useMemo, useState } from 'react';
import { sampleArticle } from './sample';
import { copyRichText } from './lib/copyRichText';
import { exportHtmlFile } from './lib/exportHtml';
import { htmlToPlainText, renderMarkdownToWechatHtml } from './lib/renderMarkdown';
import { getTheme, themes } from './themes/themes';
import type { ThemeId } from './types';

export default function App() {
  const [article, setArticle] = useState(sampleArticle);
  const [themeId, setThemeId] = useState<ThemeId>('minimal');
  const [copyStatus, setCopyStatus] = useState('复制到公众号后台');

  const theme = getTheme(themeId);

  const previewHtml = useMemo(() => {
    return renderMarkdownToWechatHtml(article, theme);
  }, [article, theme]);

  async function handleCopy() {
    try {
      await copyRichText(previewHtml, htmlToPlainText(previewHtml));
      setCopyStatus('已复制，去公众号后台粘贴');
      window.setTimeout(() => setCopyStatus('复制到公众号后台'), 1800);
    } catch (error) {
      console.error(error);
      setCopyStatus('复制失败，请手动选择右侧内容复制');
      window.setTimeout(() => setCopyStatus('复制到公众号后台'), 2400);
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Wechat Layout Tool</p>
          <h1>微信公众号排版工具</h1>
          <p className="subtitle">文章 / Markdown → 公众号富文本 → 一键复制粘贴</p>
        </div>

        <div className="actions">
          <button className="secondary-button" onClick={() => exportHtmlFile(previewHtml)}>
            导出 HTML
          </button>
          <button className="primary-button" onClick={handleCopy}>
            {copyStatus}
          </button>
        </div>
      </header>

      <section className="theme-panel">
        {themes.map((item) => (
          <button
            key={item.id}
            className={item.id === themeId ? 'theme-card active' : 'theme-card'}
            onClick={() => setThemeId(item.id)}
          >
            <strong>{item.name}</strong>
            <span>{item.description}</span>
          </button>
        ))}
      </section>

      <section className="workspace">
        <div className="editor-card">
          <div className="panel-title">
            <span>输入文章</span>
            <button className="ghost-button" onClick={() => setArticle('')}>
              清空
            </button>
          </div>

          <textarea
            value={article}
            onChange={(event) => setArticle(event.target.value)}
            spellCheck={false}
            placeholder="把公众号文章粘贴到这里，支持 Markdown 格式。"
          />
        </div>

        <div className="preview-card">
          <div className="panel-title">
            <span>公众号预览</span>
            <span className="hint">当前模板：{theme.name}</span>
          </div>

          <div className="wechat-preview" dangerouslySetInnerHTML={{ __html: previewHtml }} />
        </div>
      </section>
    </main>
  );
}
