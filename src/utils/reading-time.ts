/**
 * 中文友好的阅读时长估算：汉字按 350 字/分钟，西文按 200 词/分钟。
 * 只是个粗略提示，不需要精确——别为了它引依赖。
 */

const CJK = /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g;

export function readingTime(body: string): number {
	const cjk = body.match(CJK)?.length ?? 0;
	const latin = body.replace(CJK, ' ').match(/[A-Za-z0-9]+/g)?.length ?? 0;
	const minutes = cjk / 350 + latin / 200;
	return Math.max(1, Math.round(minutes));
}
