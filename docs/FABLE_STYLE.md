# Fable 橙色知识风

这套主题用于模仿上传示例里的公众号知识长文排版。

## 视觉特征

- 主色：橙色 `#ff6b35`
- 浅底：`#fff7f2`
- 正文：灰黑色 `#3f3f3f`
- 标题：编号色块 + 小标题
- 卡片：浅底、圆角、竖线、轻量阴影
- 流程：深色起点 / 过程步骤 / 深色终点

## 适合内容

- Skill / Agent / 自动化流程说明
- AI 工具复盘
- 工作流拆解
- 方法论长文
- 产品功能介绍

## 组件

- 橙色编号标题：`fable-title-row`
- 橙色金句卡片：`fable-punchline-card`
- 上下对比卡片：`fable-compare-stack`
- 端到端流程图：`fable-flow`
- 五段式彩色卡片：`fable-five-grid`
- 四宫格功能卡片：`fable-four-grid`
- 三平台对比卡片：`fable-platform-grid`
- 风险提示表格：`fable-risk-table`
- 图注说明：`fable-caption`

## Agent 调用示例

```bash
npm run agent:render -- --input ./article.md --theme fable --out ./article.html
```

HTTP API：

```bash
curl -X POST http://localhost:8787/api/render \
  -H "Content-Type: application/json" \
  -d '{"markdown":"# 标题\n\n正文","themeId":"fable"}'
```
