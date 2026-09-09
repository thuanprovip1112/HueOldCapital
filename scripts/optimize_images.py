#!/usr/bin/env python3
"""
Create thumbnails and WebP versions for images in images/ recursively.

Requires: Pillow
  pip install -r requirements.txt

Run:
  python scripts/optimize_images.py

Outputs in `images/optimized/<relative-path>/` with `_thumb` and `.webp` variants.
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(__file__))
IMG_DIR = os.path.join(ROOT, 'images')
OUT_DIR = os.path.join(IMG_DIR, 'optimized')

THUMB_SIZE = (400, 300)

def ensure(p):
    os.makedirs(p, exist_ok=True)

def process_image(path, rel):
    try:
        im = Image.open(path)
    except Exception as e:
        print('skip', path, e)
        return
    out_folder = os.path.join(OUT_DIR, os.path.dirname(rel))
    ensure(out_folder)
    name, _ = os.path.splitext(os.path.basename(path))
    thumb_path = os.path.join(out_folder, name + '_thumb.jpg')
    webp_path = os.path.join(out_folder, name + '.webp')
    # thumbnail
    im_thumb = im.copy()
    im_thumb.thumbnail(THUMB_SIZE)
    im_thumb.convert('RGB').save(thumb_path, 'JPEG', quality=85)
    # webp
    im.convert('RGB').save(webp_path, 'WEBP', quality=85)
    print('wrote', thumb_path, webp_path)

def main():
    for root, dirs, files in os.walk(IMG_DIR):
        # skip optimized output
        if 'optimized' in root.split(os.sep):
            continue
        for f in files:
            if f.lower().endswith(('.jpg','.jpeg','.png','.webp')):
                path = os.path.join(root, f)
                rel = os.path.relpath(path, IMG_DIR)
                process_image(path, rel)

if __name__ == '__main__':
    main()
