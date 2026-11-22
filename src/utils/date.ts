/**
 * 日期格式化。
 *
 * 站点里所有日期都用 `2026-11-21` 这种纯日期写进 frontmatter，
 * 它会被解析成 UTC 零点；所以这里也用 UTC 取年/月/日，
 * 不管本地时区是哪儿、构建机在哪个时区，显示的日期都不会漂一天。
 */

const pad = (n: number) => String(n).padStart(2, '0');

/** 2026-11-21 → 2026.11.21（列表与文章页统一用这个） */
export function formatDate(date: Date): string {
	return `${date.getUTCFullYear()}.${pad(date.getUTCMonth() + 1)}.${pad(date.getUTCDate())}`;
}

/** 2026-11-21 → 2026-11-21（给 <time datetime> 用） */
export function toISODate(date: Date): string {
	return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}
