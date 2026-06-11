# Agent 使用说明

这个仓库是一个微信公众号排版工具，支持人类可视化操作，也支持 Codex、Claude Code、Cursor、自动化脚本等 Agent 调用。

## 项目目标

把 Markdown / 文章内容转换成适合复制到微信公众号后台的富文本 HTML。

## 常用命令

```bash
npm install
npm run dev
npm run build
```

Agent 调用：

```bash
npm run agent:render -- --input ./article.md --theme knowledge --out ./article.html
npm run agent:server
```

## Agent 可调用入口

### 1. CLI 渲染

使用 `scripts/render.mjs`。

输入：Markdown 文件、主题、字号、行距、预览宽度。

输出：HTML 文件或 JSON。

### 2. 本地 HTTP API

使用 `scripts/server.mjs`。

默认地址：

```text
http://localhost:8787
```

主要接口：

- `GET /health`
- `GET /api/manifest`
- `GET /api/themes`
- `GET /api/blocks`
- `POST /api/render`

### 3. 可视化界面

使用：

```bash
npm run dev
```

网页里有「Agent 调用面板」，可以复制 CLI 命令和 HTTP API 示例。

## 修改规则

- 修改排版样式时，优先改 `src/themes/themes.ts` 和 `scripts/wechat-renderer.mjs`，保持浏览器端和 Agent 端一致。
- 新增组件时，同时更新 `src/blocks.ts` 和 `scripts/wechat-renderer.mjs`。
- 修改后运行：

```bash
npm run build
```

## 安全规则

- 不要把微信公众号 AppID、AppSecret、Cookie、Token 写进仓库。
- 这个工具第一阶段只做排版和复制，不直接自动发布公众号。
- 本地 HTTP API 默认只用于本机自动化，不建议直接暴露到公网。
