#!/usr/bin/env python3
"""Export web-optimized raster assets from the generated article preview.

Mirrors Photoshop Export As / Save for Web workflow:
- 72 DPI metadata
- JPEG quality 78
- WebP quality 80 with alpha support where needed
- @1x and @2x for Retina
"""
from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "assets" / "article-preview-source.png"
# Cursor may save generated images under the projects cache.
CANDIDATES = [
    SRC,
    Path(r"C:\Users\37529\.cursor\projects\c-Users-37529-folio-blog-lab\assets\article-preview-source.png"),
]
OUT = ROOT / "assets" / "raster"
OUT.mkdir(parents=True, exist_ok=True)

# Article card preview: 360x200 @1x, 720x400 @2x (16:9, ~72 CSS px density)
SIZES = {
    "1x": (360, 200),
    "2x": (720, 400),
}


def find_source() -> Path:
    for path in CANDIDATES:
        if path.exists():
            return path
    raise FileNotFoundError("article-preview-source.png not found")


def save_jpeg(im: Image.Image, path: Path, quality: int = 78) -> None:
    rgb = im.convert("RGB")
    rgb.save(
        path,
        format="JPEG",
        quality=quality,
        optimize=True,
        progressive=True,
        dpi=(72, 72),
        subsampling="4:2:0",
    )


def save_webp(im: Image.Image, path: Path, quality: int = 80) -> None:
    im.save(
        path,
        format="WEBP",
        quality=quality,
        method=6,
    )


def save_png(im: Image.Image, path: Path) -> None:
    im.save(path, format="PNG", optimize=True, dpi=(72, 72))


def main() -> None:
    src = Image.open(find_source()).convert("RGB")
    # Cover-crop to 16:9 then downscale.
    target_ratio = 16 / 9
    w, h = src.size
    if w / h > target_ratio:
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        src = src.crop((left, 0, left + new_w, h))
    else:
        new_h = int(w / target_ratio)
        top = (h - new_h) // 2
        src = src.crop((0, top, w, top + new_h))

    for label, size in SIZES.items():
        resized = src.resize(size, Image.Resampling.LANCZOS)
        save_jpeg(resized, OUT / f"article-preview@{label}.jpg", quality=78)
        save_webp(resized, OUT / f"article-preview@{label}.webp", quality=80)

    # Keep a larger master for Figma import (1440x800, JPEG q78 + WebP q80).
    master = src.resize((1440, 800), Image.Resampling.LANCZOS)
    save_jpeg(master, OUT / "article-preview-master.jpg", quality=78)
    save_webp(master, OUT / "article-preview-master.webp", quality=80)

    # Avatar placeholder raster (transparent PNG) at 32/64/128.
    avatar_svg_fallback = ROOT / "assets" / "svg" / "avatar-placeholder.svg"
    # Rasterize a simple circular placeholder without cairosvg: draw with Pillow.
    for px in (32, 64, 128):
        canvas = Image.new("RGBA", (px, px), (0, 0, 0, 0))
        from PIL import ImageDraw

        draw = ImageDraw.Draw(canvas)
        draw.ellipse((0, 0, px - 1, px - 1), fill=(231, 229, 228, 255))
        # Head
        r = px * 0.16
        cx, cy = px / 2, px * 0.40
        draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(168, 162, 158, 255))
        # Shoulders
        body = [
            (px * 0.22, px * 0.98),
            (px * 0.78, px * 0.98),
            (px * 0.70, px * 0.62),
            (px * 0.30, px * 0.62),
        ]
        draw.polygon(body, fill=(168, 162, 158, 255))
        save_png(canvas, OUT / f"avatar-placeholder@{px}.png")
        canvas.convert("RGBA").save(
            OUT / f"avatar-placeholder@{px}.webp",
            format="WEBP",
            quality=80,
            method=6,
        )

    print("Exported raster assets to", OUT)


if __name__ == "__main__":
    main()
