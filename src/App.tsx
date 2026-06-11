import { useEffect, useMemo, useState } from 'react';
import { layoutBlocks } from './blocks';
import { copyPlainText, copyRichText } from './lib/copyRichText';
import { exportHtmlFile } from './lib/exportHtml';
import { htmlToPlainText, renderMarkdownToWechatHtml } from './lib/renderMarkdown';
import { sampleArticle } from './sample';
import { getTheme, themes } from './themes/themes';
import type { EditorOptions, ThemeId } from './types';

const STORAGE_KEY = 'wechat-layout-tool-draft';
const DEFAULT_OPTIONS: EditorOptions = {
  fontSize: 'normal',
  lineHeight: 'normal',
  previewWidth: 'wechat'
};

export default function App() {
  const [article, setArticle] = useState(sampleArticle);
  const [themeId, setThemeId] = useState<ThemeId>('minimal');
  const [options, setOptions] = useState<EditorOptions>(DEFAULT_OPTIONS);
  const [status, setStatus] = useState('复制到公众号后台');
  const [showSource, setShowSource] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setArticle(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, article);
  }, [article]);

  const theme = getTheme(themeId);

  const previewHtml = useMemo(() => {
    return renderMarkdownToWechatHtml(article, theme, options);
  }, [article, theme, options]);

  const groups = Array.from(new Set(layoutBlocks.map((block) => block.group)));
  const wordCount = article.replace(/\s/g, '').length;

  function insertBlock(snippet: string) {
    setArticle((current) => `${current.trimEnd()}\n\n${snippet}\n`);
  }

  async function handleCopyRichText() {
    try {
      await copyRichText(previewHtml, htmlToPlainText(previewHtml));
      setStatus('已复制，去公众号后台粘贴');
      window.setTimeout(() => setStatus('复制到公众号后台'), 1800);
    } catch (error) {
      console.error(error);
      setStatus('复制失败，请手动选择右侧复制');
      window.setTimeout(() => setStatus('复制到公众号后台'), 2400);
    }
  }

  async function handleCopyHtml() {
    await copyPlainText(previewHtml);
    setStatus('HTML 源码已复制');
    window.setTimeout(() => setStatus('复制到公众号后台'), 1600);
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Wechat Layout Tool · v0.2</p>
          <h1>微信公众号排版工具</h1>
          <p className="subtitle">Markdown 写作 + 秀米式组件插入 + 公众号富文本复制</p>
        </div>

        <div className="actions">
          <button className="secondary-button" onClick={() => setShowSource((value) => !value)}>
            {showSource ? '看预览' : '看源码'}
          </button>
          <button className="secondary-button" onClick={handleCopyHtml}>
            复制 HTML
          </button>
          <button className="secondary-button" onClick={() => exportHtmlFile(previewHtml)}>
            导出 HTML
          </button>
          <button className="primary-button" onClick={handleCopyRichText}>
            {status}
          </button>
        </div>
      </header>

      <section className="toolbar-panel">
        <label>
          主题
          <select value={themeId} onChange={(event) => setThemeId(event.target.value as ThemeId)}>
            {themes.map((item) => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </label>

        <label>
          字号
          <select value={options.fontSize} onChange={(event) => setOptions({ ...options, fontSize: event.target.value as EditorOptions['fontSize'] })}>
            <option value="compact">紧凑</option>
            <option value="normal">正常</option>
            <option value="large">偏大</option>
          </select>
        </label>

        <label>
          行距
          <select value={options.lineHeight} onChange={(event) => setOptions({ ...options, lineHeight: event.target.value as EditorOptions['lineHeight'] })}>
            <option value="tight">紧凑</option>
            <option value="normal">正常</option>
            <option value="loose">舒展</option>
          </select>
        </label>

        <label>
          预览宽度
          <select value={options.previewWidth} onChange={(event) => setOptions({ ...options, previewWidth: event.target.value as EditorOptions['previewWidth'] })}>
            <option value="wechat">公众号宽</option>
            <option value="phone">手机窄屏</option>
          </select>
        </label>

        <button className="ghost-button" onClick={() => setArticle(sampleArticle)}>恢复样例</button>
        <button className="ghost-button" onClick={() => setArticle('')}>清空</button>
        <span className="counter">{wordCount} 字</span>
      </section>

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

      <section className="workspace three-columns">
        <div className="editor-card">
          <div className="panel-title">
            <span>输入文章</span>
            <span className="hint">支持 Markdown + HTML 组件</span>
          </div>

          <textarea
            value={article}
            onChange={(event) => setArticle(event.target.value)}
            spellCheck={false}
            placeholder="把公众号文章粘贴到这里，支持 Markdown 格式。"
          />
        </div>

        <aside className="block-card">
          <div className="panel-title">
            <span>排版组件</span>
            <span className="hint">一键插入</span>
          </div>

          <div className="block-list">
            {groups.map((group) => (
              <section key={group} className="block-group">
                <h3>{group}</h3>
                {layoutBlocks.filter((block) => block.group === group).map((block) => (
                  <button key={block.id} className="block-item" onClick={() => insertBlock(block.snippet)}>
                    <strong>{block.name}</strong>
                    <span>{block.description}</span>
                  </button>
                ))}
              </section>
            ))}
          </div>
        </aside>

        <div className="preview-card">
          <div className="panel-title">
            <span>{showSource ? 'HTML 源码' : '公众号预览'}</span>
            <span className="hint">当前模板：{theme.name}</span>
          </div>

          {showSource ? (
            <textarea className="source-view" readOnly value={previewHtml} />
          ) : (
            <div className="wechat-preview" dangerouslySetInnerHTML={{ __html: previewHtml }} />
          )}
        </div>
      </section>
    </main>
  );
}
