#!/usr/bin/env python3
"""Rebuild sitemap.xml from disk:
  - real per-file lastmod via git log (falls back to mtime)
  - priority + changefreq based on URL importance
  - excludes utility/template/redirected pages
"""
from __future__ import annotations

import json
import re
import subprocess
from datetime import datetime, timezone
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
BASE = "https://www.yanivgil.co.il"


def load_redirect_sources() -> set[str]:
    """Parse vercel.json and return the set of source paths (slug without leading /)
    that are configured as 301/308 redirects — these should be excluded from sitemap."""
    try:
        cfg = json.loads((REPO / "vercel.json").read_text())
        out = set()
        for r in cfg.get("redirects", []):
            src = r.get("source", "").lstrip("/")
            # Strip leading slash and ignore wildcards
            if ":" in src or "*" in src:
                continue
            out.add(src)
        return out
    except Exception:
        return set()

REDIRECT_SOURCES = load_redirect_sources()

# Pages we never want in the sitemap
EXCLUDE_NAMES = {
    "404.html",
    "index-staging.html",
    "_live_divorce.html",
    "og-image-generator.html",
    "og-image-template.html",
    "thanks.html",
    "todah.html",
}
EXCLUDE_PATTERNS = [
    re.compile(r"^_"),                    # underscore-prefixed
    re.compile(r".*-staging\.html$"),
    re.compile(r"^scripts/"),
]
EXCLUDE_DIRS = {"ffmpeg", "yaniv-gil-php", "node_modules", "_seo_changes", "New_content", ".git", "scripts"}

# Priority + changefreq tiers
TIER1 = {"index.html", "divorce.html", "inheritance-wills.html", "bankruptcy.html", "child-custody.html", "contact.html", "attorneys.html"}
TIER2_PREFIX = ("heskem-", "mezonot-", "od-", "chaluka-", "yerusha-")  # primary services
TIER3_PREFIX = ("blog-articles/",)  # blog


def url_priority_freq(rel: str) -> tuple[str, str]:
    name = Path(rel).name
    if rel == "index.html":
        return "1.0", "weekly"
    if name in TIER1:
        return "0.9", "weekly"
    if any(rel.startswith(p) for p in TIER3_PREFIX):
        return "0.6", "monthly"
    if any(name.startswith(p) for p in TIER2_PREFIX):
        return "0.8", "monthly"
    return "0.7", "monthly"


def lastmod_for(path: Path) -> str:
    """Return YYYY-MM-DD from git log (last commit that touched the file) or mtime."""
    try:
        result = subprocess.run(
            ["git", "-C", str(REPO), "log", "-1", "--format=%cs", "--", str(path.relative_to(REPO))],
            capture_output=True, text=True, timeout=10,
        )
        date = result.stdout.strip()
        if date:
            return date
    except Exception:
        pass
    # fallback: file mtime
    return datetime.fromtimestamp(path.stat().st_mtime, tz=timezone.utc).strftime("%Y-%m-%d")


def url_path(path: Path) -> str:
    rel = path.relative_to(REPO).as_posix()
    if rel == "index.html":
        return ""
    if rel.endswith(".html"):
        rel = rel[: -len(".html")]
    return rel


def should_include(path: Path) -> bool:
    rel = path.relative_to(REPO).as_posix()
    if any(part in EXCLUDE_DIRS for part in path.parts):
        return False
    if path.name in EXCLUDE_NAMES:
        return False
    for pat in EXCLUDE_PATTERNS:
        if pat.search(rel):
            return False
    if not path.suffix == ".html":
        return False
    # Skip if this URL is a redirect source (would 301/308)
    slug = url_path(path)
    if slug in REDIRECT_SOURCES:
        return False
    return True


def main():
    files = sorted([p for p in REPO.rglob("*.html") if should_include(p)])
    print(f"Building sitemap from {len(files)} files...")

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for path in files:
        loc = f"{BASE}/{url_path(path)}".rstrip("/")
        if not url_path(path):
            loc = f"{BASE}/"
        prio, freq = url_priority_freq(path.relative_to(REPO).as_posix())
        lines.append("  <url>")
        lines.append(f"    <loc>{loc}</loc>")
        lines.append(f"    <lastmod>{lastmod_for(path)}</lastmod>")
        lines.append(f"    <changefreq>{freq}</changefreq>")
        lines.append(f"    <priority>{prio}</priority>")
        lines.append("  </url>")
    lines.append("</urlset>")

    (REPO / "sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote sitemap.xml — {len(files)} URLs")


if __name__ == "__main__":
    main()
