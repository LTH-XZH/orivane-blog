#!/usr/bin/env python3
"""
压缩 public/images 里的图片，避免仓库和 C 盘被原图撑爆。

用法：
    python scripts/optimize-images.py            # 压缩 public/images
    python scripts/optimize-images.py 某个目录    # 压缩指定目录
    python scripts/optimize-images.py --dry-run   # 只看会改什么，不动文件

规则：
    · 最大宽度 1600px（超了就等比缩小），高度不限
    · JPEG 质量 82，PNG 开启 optimize
    · 已经比目标小、且宽度够小的图直接跳过
    · 原地覆盖，所以改完记得 git add 再提交

依赖 Pillow：
    pip install pillow
"""

import argparse
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit("缺少 Pillow，先运行：pip install pillow")

MAX_WIDTH = 1600
JPEG_QUALITY = 82
SUFFIXES = {".jpg", ".jpeg", ".png", ".webp"}


def human(num: int) -> str:
    if num > 1024 * 1024:
        return f"{num / 1024 / 1024:.1f} MB"
    return f"{num / 1024:.0f} KB"


def optimize(path: Path, max_width: int, dry: bool) -> tuple[int, int]:
    before = path.stat().st_size
    with Image.open(path) as im:
        width, height = im.size
        if width > max_width:
            ratio = max_width / width
            im = im.resize((max_width, int(height * ratio)), Image.LANCZOS)

        if path.suffix.lower() in {".jpg", ".jpeg"}:
            im = im.convert("RGB")
            save_kwargs = {"quality": JPEG_QUALITY, "optimize": True, "progressive": True}
        elif path.suffix.lower() == ".png":
            save_kwargs = {"optimize": True}
        else:
            save_kwargs = {"quality": JPEG_QUALITY}

        if dry:
            return before, before

        im.save(path, **save_kwargs)

    after = path.stat().st_size
    return before, after


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("target", nargs="?", default="public/images")
    parser.add_argument("--max-width", type=int, default=MAX_WIDTH)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    root = Path(args.target)
    if not root.exists():
        sys.exit(f"目录不存在：{root}")

    files = [p for p in root.rglob("*") if p.suffix.lower() in SUFFIXES and p.is_file()]
    if not files:
        print(f"{root} 里没有图片。")
        return

    total_before = total_after = 0
    changed = 0

    for path in sorted(files):
        before, after = optimize(path, args.max_width, args.dry_run)
        total_before += before
        total_after += after
        rel = path.relative_to(root)
        if after < before * 0.95:
            changed += 1
            print(f"  {rel}  {human(before)} → {human(after)}")
        else:
            print(f"  {rel}  {human(before)}（已够小，跳过）")

    saved = total_before - total_after
    action = "可省" if args.dry_run else "省下"
    print(f"\n{len(files)} 张图，改动 {changed} 张，{action} {human(saved)}")

    if args.dry_run:
        print("这是试运行，文件没有改动。去掉 --dry-run 才会真的写回。")
    elif changed:
        print("改动已写回原文件，记得 git add 再提交。")


if __name__ == "__main__":
    main()
