# Orivane

一个编辑式个人博客：强排版、低噪音、为中文长文优化。设计规范见 [`design/DESIGN.md`](design/DESIGN.md)，视觉样张见 [`design/preview.html`](design/preview.html)（浏览器直接打开，右上角 ◐ 切深浅色）。

Astro 静态站 · 无框架岛 · 首屏 JS 只有主题切换那一小段。

## 命令

| 命令 | 作用 |
| :-- | :-- |
| `npm install` | 装依赖 |
| `npm run dev` | 本地开发，`localhost:4321` |
| `npm run build` | 构建到 `./dist/` |
| `npm run preview` | 预览构建产物 |

后台跑开发服务器时：`astro dev --background`，配套 `astro dev status` / `astro dev logs` / `astro dev stop`。

## 写一篇文章

> 完整的写作指南（座右铭在哪改、怎么加分类、怎么放图片、上线流程）见 [`docs/写作指南.md`](docs/写作指南.md)。

在 `src/content/blog/` 新建 `.md`（或 `.mdx`），frontmatter 只有这几项：

```yaml
---
title: '中文网页排版笔记'
description: '一句话摘要，会出现在列表和页面描述里。'
pubDate: '2026-10-08'
updatedDate: '2026-10-12' # 可选
category: '笔记' # 可选，新写一个词就等于新开一个分类
tags: ['排版', 'CSS'] # 可选
draft: false # 可选，true = 只在 dev 里看得到
---
```

日期**请写 `2026-10-08` 这种纯日期**。它按 UTC 零点解析、按 UTC 格式化，换时区、换构建机都不会漂一天；写成 `Oct 8 2026` 反而会被当成本地时间。

`##` 是文章里的一级分节（前面会自动带一条 2px 的强调色短线），`###` 是次级标题。想在正文里插一段脚注式说明，用 `<p class="note">…</p>`。

## 想改哪里

| 想改 | 改哪 |
| :-- | :-- |
| 站名、导航、页脚链接 | `src/consts.ts` |
| 颜色、字号、行高、阅读宽度 | `src/styles/global.css` 顶部「01 设计令牌」 |
| 座右铭、首页签名、Hero 文案 | `src/pages/index.astro` 里的 `.home-hero` |
| 关于页 | `src/pages/about.astro` |
| 换字体 | `global.css` 里的 `--font-sans` / `--font-display` / `--font-ui` / `--font-mono` |

**加背景 / 纸纹**：把 `global.css` 里的 `--bg-image: none;` 换成 `url("/bg.jpg")`（图片放 `public/`），其余不用动。也可以直接在 `:root` 里改 `--bg` 的底色。

**加深色模式的第二强调色**：在 `html[data-theme="dark"]` 里覆盖对应的 `--accent` 即可。全站只有这一个颜色情绪，加第二个之前先想清楚。

**代码块配色**：双主题在 `astro.config.mjs` 的 `markdown.shikiConfig.themes` 里换（`github-light` / `github-dark`），颜色由 `.prose pre.astro-code span` 读取 `--shiki-*` 变量，别在 CSS 里写死。

## 目录

```text
design/            设计规范与样张
src/
  components/      Nav · Footer · PostList · PostHeader 相关 · 主题切换
  content/blog/    文章（Markdown / MDX）
  layouts/         BaseLayout（骨架）· BlogPost（文章页）
  pages/           index · blog/ · about · rss.xml
  styles/          global.css（全部样式）
  utils/           日期格式化、阅读时长、文章筛选
```

## 还没做的

按 `design/DESIGN.md` §4 的 P1/P2：右侧 sticky TOC、上一篇/下一篇、标签页、分页、404、Pagefind 搜索、动态 OG 图、图片灯箱。

`astro.config.mjs` 里的 `site` 已经是 `https://orivane.me`，canonical、RSS、sitemap 都跟着它走；换域名只改这一行。部署（Cloudflare Pages + 阿里云改 NS）的逐步操作见 [`docs/deploy.md`](docs/deploy.md)。
