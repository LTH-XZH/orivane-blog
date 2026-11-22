// 站点级常量：站名、导航、页脚都在这儿，改名不用翻组件。

export const SITE_TITLE = 'Orivane';
export const SITE_LOCALE = 'zh-CN';
export const SITE_DESCRIPTION = '关于工程、阅读与生活的一些长文。不定期更新，不追热点。';

/** 页脚左侧那句自我介绍 */
export const SITE_FOOTER_NOTE = '用 Astro 构建';

/** 对外联系邮箱：改这里，关于页会跟着变 */
export const CONTACT_EMAIL = 'xzh_orivane@163.com';

/** GitHub 主页：只改这一行，显示名会自动取地址最后一段 */
export const GITHUB_URL = 'https://github.com/LTH-XZH';
export const GITHUB_HANDLE = GITHUB_URL.replace(/\/+$/, '').split('/').pop() ?? 'orivane';

/**
 * 评论系统选择：
 *   'giscus'  GitHub Discussions —— 免后端，但访客要登录 GitHub
 *   'twikoo'  腾讯云开发 / Mongo —— 输昵称就能评论（匿名）
 *   'waline'  Vercel + 免费数据库 —— 输昵称就能评论（匿名）
 *   'none'    关闭评论区
 */
export const COMMENT_PROVIDER: 'giscus' | 'twikoo' | 'waline' | 'none' = 'giscus';

/**
 * Giscus（当前启用）。四项都填好才会生效：
 *   repo      '用户名/仓库名'（必须 public，且打开 Discussions）
 *   repoId / categoryId  在 giscus.app 上填仓库后生成的那串 ID
 */
export const GISCUS = {
	repo: 'LTH-XZH/orivane-blogs-comments',
	repoId: 'R_kgDOV2ldkA',
	category: 'Announcements',
	categoryId: 'DIC_kwDOV2ldkM4DLpmn',
};

/** Twikoo：填部署好之后拿到的环境 ID 或 Vercel 地址 */
export const TWIKOO = {
	envId: '',
};

/** Waline：填部署好之后拿到的 serverURL，例如 https://xxx.vercel.app */
export const WALINE = {
	serverURL: '',
};

/** 顶部导航：hideOnMobile 的项在窄屏收起 */
export const NAV_LINKS: { href: string; label: string; hideOnMobile?: boolean }[] = [
	{ href: '/blog/', label: '文章' },
	{ href: '/categories/', label: '分类' },
	{ href: '/about/', label: '关于' },
	{ href: '/rss.xml', label: 'RSS', hideOnMobile: true },
];

/** 页脚链接，external 的会走新窗口 */
export const FOOTER_LINKS: { href: string; label: string; external?: boolean }[] = [
	{ href: '/rss.xml', label: 'RSS' },
	{ href: GITHUB_URL, label: 'GitHub', external: true },
	{ href: '/about/', label: '关于' },
];
