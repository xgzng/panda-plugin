#!/usr/bin/env python3
from collections import deque
from pathlib import Path
import sys

from PIL import Image


def remove_connected_background(image):
    rgb = image.convert("RGB")
    width, height = rgb.size
    pixels = rgb.load()
    outside = bytearray(width * height)
    queue = deque()

    def enqueue(x, y):
        index = y * width + x
        if outside[index]:
            return
        r, g, b = pixels[x, y]
        if min(r, g, b) < 232 or max(r, g, b) - min(r, g, b) > 18:
            return
        outside[index] = 1
        queue.append((x, y))

    for x in range(width):
        enqueue(x, 0)
        enqueue(x, height - 1)
    for y in range(height):
        enqueue(0, y)
        enqueue(width - 1, y)

    while queue:
        x, y = queue.popleft()
        if x:
            enqueue(x - 1, y)
        if x + 1 < width:
            enqueue(x + 1, y)
        if y:
            enqueue(x, y - 1)
        if y + 1 < height:
            enqueue(x, y + 1)

    rgba = image.convert("RGBA")
    alpha = rgba.getchannel("A")
    alpha_pixels = alpha.load()
    for y in range(height):
        row = y * width
        for x in range(width):
            if outside[row + x]:
                alpha_pixels[x, y] = 0
    rgba.putalpha(alpha)
    return rgba


def render(source, destination, size):
    image = Image.open(source)
    # The source is square with a large margin and a watermark in the bottom-right.
    image = image.crop((430, 420, 1618, 1250))
    image = remove_connected_background(image)
    bounds = image.getchannel("A").getbbox()
    if not bounds:
        raise RuntimeError("No foreground found in source image")
    image = image.crop(bounds)

    inner = round(size * 0.82)
    image.thumbnail((inner, inner), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (255, 255, 255, 0))
    canvas.alpha_composite(image, ((size - image.width) // 2, (size - image.height) // 2))
    canvas.save(destination, optimize=True, compress_level=9)


def main():
    if len(sys.argv) != 3:
        raise SystemExit("usage: process-logo.py SOURCE OUTPUT_DIRECTORY")
    source = Path(sys.argv[1])
    output = Path(sys.argv[2])
    output.mkdir(parents=True, exist_ok=True)
    render(source, output / "logo.png", 512)
    render(source, output / "logo-small.png", 128)
    render(source, output / "logo-dark.png", 512)


if __name__ == "__main__":
    main()
