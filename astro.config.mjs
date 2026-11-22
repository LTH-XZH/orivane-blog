// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// 正式域名。canonical、RSS、sitemap 都从这里取，换域名只改这一行。
	site: 'https://orivane.me',
	// 关掉开发工具栏（底部那条悬浮胶囊，只在 npm run dev 时出现）
	devToolbar: { enabled: false },
	integrations: [mdx(), sitemap()],
	markdown: {
		// 代码块双主题：亮暗切换由 CSS 里的 --shiki-* 变量完成，不重排不高亮两次
		shikiConfig: {
			themes: {
				light: 'github-light',
				dark: 'github-dark',
			},
			defaultColor: false,
		},
	},
});
