# Agent API 使用文档

这个工具现在有三种使用方式：

1. 人类打开网页可视化排版。
2. Codex / Claude Code / Cursor 通过 CLI 调用。
3. 自动化工作流通过本地 HTTP API 调用。

## 1. 可视化入口

```bash
npm install
npm run dev
```

打开：

```text
http://localhost:5173
```

网页里有「Agent 调用面板」，里面可以复制命令和 API 示例。

## 2. CLI 调用

把 Markdown 渲染成 HTML 文件：

```bash
npm run agent:render -- --input ./article.md --theme knowledge --out ./article.html
```

输出 JSON：

```bash
npm run agent:render -- --input ./article.md --theme xiaohongshu --json
```

可选参数：

```text
--input         输入 Markdown 文件
--out           输出 HTML 文件
--theme         主题 ID
--fontSize      compact | normal | large
--lineHeight    tight | normal | loose
--previewWidth  phone | wechat
--json          输出 JSON
```

主题 ID：

```text
minimal
xiaohongshu
knowledge
magazine
tech
orange
green
dark
```

## 3. HTTP API 调用

启动服务：

```bash
npm run agent:server
```

默认地址：

```text
http://localhost:8787
```

### 健康检查

```bash
curl http://localhost:8787/health
```

### 读取主题

```bash
curl http://localhost:8787/api/themes
```

### 读取组件

```bash
curl http://localhost:8787/api/blocks
```

### 渲染文章

```bash
curl -X POST http://localhost:8787/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "markdown": "# 标题\n\n这里是正文。",
    "themeId": "knowledge",
    "options": {
      "fontSize": "normal",
      "lineHeight": "normal",
      "previewWidth": "wechat"
    }
  }'
```

返回：

```json
{
  "html": "<section style=...>...</section>",
  "plainText": "标题 这里是正文。",
  "wordCount": 7,
  "themeId": "knowledge",
  "options": {
    "fontSize": "normal",
    "lineHeight": "normal",
    "previewWidth": "wechat"
  }
}
```

## 给 Codex 的任务示例

```text
读取 article.md，用本仓库的 agent:render 命令，把文章渲染成知识干货风公众号 HTML，并保存到 output/article.html。运行构建检查，确保没有 TypeScript 错误。
```

## 注意

- HTTP API 默认是本地服务，别直接暴露到公网。
- 不要把公众号 Cookie、Token、AppSecret 写进请求或仓库。
- 当前只做排版生成，不做公众号自动发布。
