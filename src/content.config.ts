import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 文章字段就这六个。定死它们，以后换皮肤、加 TOC、加标签页都不用改内容。
 * 日期请写 `2026-11-21` 这种纯日期（解析成 UTC 零点，跨时区不会漂一天）。
 */
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		/** 分类：一篇只属于一个分类，会自动生成 /categories/<分类>/ 页面 */
		category: z.string().default('未分类'),
		tags: z.array(z.string()).default([]),
		/** true = 只有 `astro dev` 能看到，正式构建不出现 */
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog };
