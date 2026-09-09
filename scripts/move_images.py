#!/usr/bin/env python3
"""
Move image files from project root `images/` into section subfolders and update images_by_section.json paths.

Run from project root:
  python scripts/move_images.py

This script will:
 - create folders under images/ (attractions, history, culture, food)
 - move known files (dainoi*, songhuong*, chuathienmu*, food*) into appropriate folders
 - update images_by_section.json to reflect new paths
"""
import os
import shutil
import json

ROOT = os.path.dirname(os.path.dirname(__file__))
IMG_DIR = os.path.join(ROOT, 'images')
MAP_FILE = os.path.join(ROOT, 'images_by_section.json')

moves = {
    'dainoi': 'attractions',
    'songhuong': 'attractions',
    'chuathienmu': 'attractions',
    'food': 'food'
}

def ensure(dirpath):
    if not os.path.exists(dirpath):
        os.makedirs(dirpath)

def main():
    for folder in set(moves.values()):
        ensure(os.path.join(IMG_DIR, folder))

    # move files matching keys
    for name, dest in moves.items():
        for fname in os.listdir(IMG_DIR):
            if fname.lower().startswith(name) and os.path.isfile(os.path.join(IMG_DIR, fname)):
                src = os.path.join(IMG_DIR, fname)
                dst = os.path.join(IMG_DIR, dest, fname)
                print(f'Moving {src} -> {dst}')
                shutil.move(src, dst)

    # update images_by_section.json paths if present
    if os.path.exists(MAP_FILE):
        data = json.load(open(MAP_FILE, 'r', encoding='utf-8'))
        changed = False
        for section, items in data.items():
            for item in items:
                p = item.get('src','')
                base = os.path.basename(p)
                for key, dest in moves.items():
                    if base.lower().startswith(key):
                        newp = f'images/{dest}/{base}'
                        if p != newp:
                            item['src'] = newp
                            changed = True
        if changed:
            with open(MAP_FILE, 'w', encoding='utf-8') as fh:
                json.dump(data, fh, ensure_ascii=False, indent=2)
            print('Updated', MAP_FILE)

if __name__ == '__main__':
    main()
