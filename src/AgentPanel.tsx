import { copyPlainText } from './lib/copyRichText';
import type { EditorOptions, ThemeId } from './types';

type AgentPanelProps = {
  themeId: ThemeId;
  options: EditorOptions;
  previewHtml: string;
};

export function AgentPanel({ themeId, options, previewHtml }: AgentPanelProps) {
  const payload = JSON.stringify({
    markdown: '# 标题\n\n这里是正文。',
    themeId,
    options
  }, null, 2);

  const cliCommand = `npm run agent:render -- --input ./article.md --theme ${themeId} --fontSize ${options.fontSize} --lineHeight ${options.lineHeight} --previewWidth ${options.previewWidth} --out ./article.html`;

  const serverCommand = 'npm run agent:server';

  const curlCommand = `curl -X POST http://localhost:8787/api/render \\\n  -H "Content-Type: application/json" \\\n  -d '${payload.replace(/'/g, "'\\''")}'`;

  const shortHtml = previewHtml.length > 420 ? `${previewHtml.slice(0, 420)}...` : previewHtml;

  return (
    <section className="agent-panel">
      <div className="agent-panel-header">
        <div>
          <p className="eyebrow">Agent callable</p>
          <h2>Codex / 其他 Agent 调用面板</h2>
          <p>同一套排版能力，可以走可视化页面，也可以走 CLI 或本地 HTTP API。</p>
        </div>
        <button className="secondary-button" onClick={() => copyPlainText(previewHtml)}>复制当前 HTML</button>
      </div>

      <div className="agent-grid">
        <article className="agent-card">
          <strong>CLI 渲染</strong>
          <p>适合 Codex 直接把 Markdown 文件转成公众号 HTML。</p>
          <pre>{cliCommand}</pre>
          <button className="ghost-button" onClick={() => copyPlainText(cliCommand)}>复制命令</button>
        </article>

        <article className="agent-card">
          <strong>HTTP 服务</strong>
          <p>适合 n8n、脚本、其他 Agent 通过接口调用。</p>
          <pre>{serverCommand}</pre>
          <button className="ghost-button" onClick={() => copyPlainText(serverCommand)}>复制命令</button>
        </article>

        <article className="agent-card wide">
          <strong>POST /api/render</strong>
          <p>输入 markdown/theme/options，返回 html/plainText/wordCount。</p>
          <pre>{curlCommand}</pre>
          <button className="ghost-button" onClick={() => copyPlainText(curlCommand)}>复制 curl</button>
        </article>

        <article className="agent-card wide">
          <strong>当前 HTML 预览片段</strong>
          <p>Agent 可以把这个结果保存为 HTML 文件，或者继续交给发布/入库流程。</p>
          <pre>{shortHtml}</pre>
        </article>
      </div>
    </section>
  );
}
