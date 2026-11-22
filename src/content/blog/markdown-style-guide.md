---
title: 'Markdown 写作清单'
description: '这个站支持哪些写法，以及它们各自长什么样。'
pubDate: '2026-09-12'
category: '开始写作の示例文'
tags: ['Markdown', '写作']
---

写文章只用 Markdown，不碰 HTML。这篇把常用的写法列一遍，也顺便当排版的验收样张——每一节的样式都是我想要的，看到不对就是 CSS 出问题了。

## 标题层级

文章标题由 frontmatter 的 `title` 决定，正文里从 `##` 开始用。`##` 是分节，前面会自动带一条强调色短线；`###` 是次级标题，再往下就用得很少了。

### 这是三级标题

正文里的粗体用 `**加粗**`，斜体用 `*倾斜*`，行内代码用反引号，比如 `npm run build`。

## 图片

图片按正文宽度显示，不加圆角、不居中放大：

![博客占位图](../../assets/blog-placeholder-about.jpg)

## 引用

> 排版不是装饰，是让读者忘记排版。
>
> —— 某个深夜改 CSS 的人

## 表格

| 用途 | 文件位置 | 备注 |
| :-- | :-- | :-- |
| 文章 | `src/content/blog/` | 一个文件一篇 |
| 组件 | `src/components/` | 可复用 |
| 样式 | `src/styles/global.css` | 全站唯一 |

## 代码块

```html
<!doctype html>
<html lang="zh-CN">
	<head>
		<meta charset="utf-8" />
		<title>示例</title>
	</head>
	<body>
		<p>一段代码</p>
	</body>
</html>
```

## 列表

有序列表：

1. 先写标题
2. 再写摘要
3. 最后才是正文

无序列表：

- 不要为了凑字数加列表
- 列表项不超过一行最好
	- 嵌套也可以，但别太深

## 其他零碎

行内键盘按键：<kbd>Ctrl</kbd> + <kbd>S</kbd>。

标记重点：<mark>这句话是重点</mark>。

缩写：<abbr title="Cascading Style Sheets">CSS</abbr> 并不难。

化学式与上标：H<sub>2</sub>O、X<sup>2</sup>。

## 一篇好文章的样子

写完最后一段，回头检查三件事：**标题是否准确、摘要是否诚实、有没有一句话是多余的**。第三件最难，也最值得做。
