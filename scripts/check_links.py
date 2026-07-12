#!/usr/bin/env python3
"""Check local href/src targets in HTML files exist on disk."""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKIP = ("http://", "https://", "mailto:", "tel:", "data:")


def html_files() -> list[Path]:
    files: list[Path] = []
    for pattern in ("*.html", "*/*.html", "*/*/*.html"):
        files.extend(ROOT.glob(pattern))
    # unique, stable
    return sorted({f.resolve() for f in files})


def resolve_target(html: Path, href: str) -> Path | None:
    path = href.split("?")[0].split("#")[0]
    if not path or path == "/":
        return ROOT / "index.html"
    if path.startswith("/"):
        rel = path[1:]
        if path.endswith("/"):
            return ROOT / rel / "index.html"
        return ROOT / rel
    return (html.parent / path).resolve()


def main() -> int:
    fail = 0
    ok = 0
    seen: set[tuple[str, str]] = set()
    for html in html_files():
        text = html.read_text(encoding="utf-8", errors="replace")
        hrefs = re.findall(r"""(?:href|src)=["']([^"']+)["']""", text, flags=re.I)
        for href in hrefs:
            if href.startswith(SKIP) or href.startswith("#") or href.startswith("//"):
                continue
            key = (str(html.relative_to(ROOT)), href)
            if key in seen:
                continue
            seen.add(key)
            target = resolve_target(html, href)
            if target is None:
                print(f"FAIL {key[0]}: cannot resolve {href}")
                fail += 1
                continue
            try:
                target.relative_to(ROOT.resolve())
            except ValueError:
                print(f"FAIL {key[0]}: escapes repo {href}")
                fail += 1
                continue
            if target.exists():
                print(f"OK {key[0]} → {href}")
                ok += 1
            else:
                # directory index fallback
                if href.endswith("/") and (ROOT / href.strip("/") / "index.html").exists():
                    print(f"OK {key[0]} → {href}")
                    ok += 1
                else:
                    print(f"FAIL {key[0]}: missing {href}")
                    fail += 1
    return 1 if fail else 0


if __name__ == "__main__":
    sys.exit(main())
