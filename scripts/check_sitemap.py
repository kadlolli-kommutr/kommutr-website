#!/usr/bin/env python3
"""Map sitemap <loc> entries to files on disk."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main() -> int:
    text = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    locs = re.findall(r"<loc>\s*([^<]+)\s*</loc>", text)
    fail = 0
    if not locs:
        print("FAIL sitemap has no <loc> entries")
        return 1
    for loc in locs:
        loc = loc.strip()
        if not loc.startswith("https://www.kommutr.com"):
            print(f"FAIL sitemap loc must use https://www.kommutr.com — got {loc}")
            fail += 1
            continue
        path = loc[len("https://www.kommutr.com") :] or "/"
        if path == "/":
            if (ROOT / "index.html").is_file():
                print("OK / → index.html")
            else:
                print("FAIL / missing index.html")
                fail += 1
            continue
        rel = path.strip("/")
        candidates = [ROOT / rel / "index.html", ROOT / f"{rel}.html", ROOT / rel]
        if any(c.exists() for c in candidates):
            print(f"OK {path}")
        else:
            print(f"FAIL {loc} has no matching file")
            fail += 1
    return 1 if fail else 0


if __name__ == "__main__":
    sys.exit(main())
