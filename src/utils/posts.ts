import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * 取文章，按发布时间倒序。
 * 草稿（draft: true）只在 `astro dev` 时出现，正式构建自动过滤掉。
 */
export async function getPublishedPosts(): Promise<CollectionEntry<'blog'>[]> {
	const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}
