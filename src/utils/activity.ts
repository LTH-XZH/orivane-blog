import type { CollectionEntry } from 'astro:content';
import { toISODate } from './date';

type Post = CollectionEntry<'blog'>;

export interface ActivityDay {
	/** 2026-11-21 */
	date: string;
	count: number;
	/** 有内容的日子给一个跳转地址；单篇直接去文章，多篇去当天汇总页 */
	href?: string;
}

/** 按发布日分组（UTC，与文章日期对齐） */
export function groupPostsByDate(posts: Post[]): Map<string, Post[]> {
	const map = new Map<string, Post[]>();
	for (const post of posts) {
		const key = toISODate(post.data.pubDate);
		const list = map.get(key);
		if (list) list.push(post);
		else map.set(key, [post]);
	}
	return map;
}

/**
 * 生成"最近活跃"方格图的数据：从 weeks 周前的周一开始，一天一格。
 * 用 UTC 计算，跟文章日期（UTC 零点）对齐，换时区不会错位。
 */
export function buildActivity(posts: Post[], weeks = 26): ActivityDay[] {
	const byDate = groupPostsByDate(posts);

	const now = new Date();
	const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

	// 终点取"今天"和"最新一篇文章"里更晚的那个：
	// 免得刚写好的文章日期比 UTC 的今天还新，被挡在窗口外。
	const latest = posts.reduce((acc, post) => Math.max(acc, post.data.pubDate.getTime()), 0);
	const end = Math.max(today, latest);

	const dayOfWeek = (new Date(end).getUTCDay() + 6) % 7; // 周一 = 0
	const daysBack = dayOfWeek + (weeks - 1) * 7;

	const days: ActivityDay[] = [];
	for (let i = 0; i <= daysBack; i++) {
		const date = toISODate(new Date(end - (daysBack - i) * 86_400_000));
		const dayPosts = byDate.get(date) ?? [];

		days.push({
			date,
			count: dayPosts.length,
			href:
				dayPosts.length === 1
					? `/blog/${dayPosts[0].id}/`
					: dayPosts.length > 1
						? `/days/${date}/`
						: undefined,
		});
	}

	return days;
}
