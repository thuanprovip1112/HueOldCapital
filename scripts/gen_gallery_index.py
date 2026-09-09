#!/usr/bin/env python3
"""
Generate `images/gallery/index.json` listing image files found in `images/gallery`.

Run from project root:
  python scripts/gen_gallery_index.py

It writes a JSON array of {src, alt} objects.
"""
import os
import json

ROOT = os.path.dirname(os.path.dirname(__file__))
GDIR = os.path.join(ROOT, 'images', 'gallery')
OUT = os.path.join(GDIR, 'index.json')

def main():
    if not os.path.exists(GDIR):
        print('No gallery folder:', GDIR)
        return
    items = []
    for fname in sorted(os.listdir(GDIR)):
        if fname.lower().endswith(('.png','.jpg','.jpeg','.webp','.svg')) and fname != 'index.json':
            path = f'images/gallery/{fname}'
            items.append({'src': path, 'alt': os.path.splitext(fname)[0]})
    with open(OUT, 'w', encoding='utf-8') as fh:
        json.dump(items, fh, ensure_ascii=False, indent=2)
    print('Wrote', OUT)

if __name__ == '__main__':
    main()
