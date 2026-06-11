# 微信公众号排版工具

一个本地可运行、可视化操作、也能被 Codex / 其他 Agent 调用的微信公众号图文排版工具。

这一版参考秀米编辑器的思路：不只是换主题，而是把常用公众号排版拆成可插入的模块，同时提供 CLI 和本地 HTTP API。

## 功能

- 左侧粘贴文章，右侧实时预览
- 支持 Markdown 基础语法
- 9 套排版主题：极简商务、小红书、知识干货、杂志感、科技蓝、暖橙促销、墨绿质感、暗色高级、Fable 橙色知识风
- 组件库一键插入：封面导语、标题块、重点卡片、金句卡片、提醒框、步骤清单、双栏对比、按钮、分割线
- Fable 橙色风组件：橙色编号标题、橙色金句卡片、上下对比卡片、端到端流程图、五段式彩色卡片、四宫格功能卡片、三平台对比卡片、风险提示表格、图注说明
- 可调字体大小、行距、预览宽度
- 一键复制富文本到公众号后台
- 一键复制 HTML 源码
- 一键导出 HTML 文件
- 自动保存本地草稿
- Agent 调用面板：可复制 CLI 命令和 HTTP API 示例
- Codex / 其他 Agent 可调用：CLI + 本地 HTTP API + manifest
- 不登录、不接数据库、不接公众号 API

## 安装运行

```bash
npm install
npm run dev
```

打开终端里显示的本地地址，例如：

```text
http://localhost:5173
```

## 可视化使用

1. 左侧输入或粘贴文章。
2. 选择排版主题。
3. 点击组件库里的模块，一键插入到文章末尾。
4. 右侧实时预览公众号效果。
5. 点击「复制到公众号后台」。
6. 打开微信公众号后台，新建图文，直接粘贴。

## Codex / Agent 调用

### CLI 渲染

```bash
npm run agent:render -- --input ./article.md --theme fable --out ./article.html
```

### 本地 HTTP API

```bash
npm run agent:server
```

然后请求：

```bash
curl -X POST http://localhost:8787/api/render \
  -H "Content-Type: application/json" \
  -d '{"markdown":"# 标题\n\n正文","themeId":"fable"}'
```

更多说明见：

```text
docs/AGENT_API.md
AGENTS.md
agent.manifest.json
```

## 为什么现在不做公众号自动发布？

公众号自动发布需要接入微信公众号接口，涉及 AppID、AppSecret、IP 白名单、素材上传、草稿箱、发布权限等。

现在先解决最高频的问题：排版、预览、复制、Agent 生成 HTML。

## 后续可升级方向

- AI 自动拆小标题
- AI 自动加粗重点句
- AI 自动生成摘要和结尾引导
- 上传图片并插入图文模块
- 文章素材库
- MCP Server 形式封装
- 接入微信公众号草稿箱 API
