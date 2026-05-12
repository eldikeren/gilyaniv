#!/usr/bin/env python3
"""Weekly review-count synchronization.

Fetches the latest review count from LawReviews and Google Business Profile,
then updates every hard-coded review count across the site:

  - JSON-LD schema:  "reviewCount": "N", "ratingCount": "N"
  - Hebrew visible text:  N ביקורות, N חוות (דעת/הדעת)
  - "לכל N חוות הדעת" CTA strings
  - LawReviews-link badge counts (data-attrs / inline spans)

Run manually:
    python3 scripts/sync_reviews.py
    python3 scripts/sync_reviews.py --dry-run
    python3 scripts/sync_reviews.py --count 220   # override fetch

Scheduled weekly via .claude/scheduled-tasks (see README at bottom).
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import urllib.request
from datetime import datetime
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
LAWREVIEWS_URL = "https://www.lawreviews.co.il/provider/gil-yaniv"
LOG_FILE = REPO / "scripts" / "sync_reviews.log"
STATE_FILE = REPO / "scripts" / "sync_reviews.state.json"

SKIP_DIRS = {"ffmpeg", "yaniv-gil-php", "node_modules", "_seo_changes", "New_content", ".git", "scripts"}


def fetch_lawreviews_count() -> int | None:
    """Scrape the LawReviews provider page for the total review count."""
    try:
        req = urllib.request.Request(
            LAWREVIEWS_URL,
            headers={"User-Agent": "Mozilla/5.0 (yanivgil-sync-reviews)"},
        )
        with urllib.request.urlopen(req, timeout=15) as r:
            html = r.read().decode("utf-8", errors="ignore")
    except Exception as e:
        print(f"  ! Failed to fetch LawReviews: {e}", file=sys.stderr)
        return None

    # Look for patterns like: "216 חוות", '"reviewCount": 216', "216 ביקור"
    patterns = [
        r'"reviewCount"\s*:\s*"?(\d{2,4})"?',
        r'"ratingCount"\s*:\s*"?(\d{2,4})"?',
        r'(\d{2,4})\s*חוות\s*דעת',
        r'(\d{2,4})\s*ביקורות',
    ]
    for pat in patterns:
        m = re.search(pat, html)
        if m:
            n = int(m.group(1))
            if 50 <= n <= 5000:
                return n
    return None


def html_files() -> list[Path]:
    """All HTML files in the repo, excluding utility/tooling dirs."""
    out = []
    for p in REPO.rglob("*.html"):
        if set(p.parts) & SKIP_DIRS:
            continue
        out.append(p)
    return out


# Replacement specs: (regex pattern, replacement template).
# The replacement template uses {n} which will be substituted with the new count.
REPLACEMENT_SPECS: list[tuple[str, str]] = [
    # JSON-LD schema fields (quoted or unquoted numbers)
    (r'"reviewCount"\s*:\s*"\d{2,4}"', '"reviewCount": "{n}"'),
    (r'"reviewCount"\s*:\s*\d{2,4}', '"reviewCount": {n}'),
    (r'"ratingCount"\s*:\s*"\d{2,4}"', '"ratingCount": "{n}"'),
    (r'"ratingCount"\s*:\s*\d{2,4}', '"ratingCount": {n}'),

    # Visible Hebrew text patterns
    (r'\b\d{2,4}\s*ביקורות', '{n} ביקורות'),
    (r'\b\d{2,4}\s*חוות\s*דעת', '{n} חוות דעת'),

    # CTA: "לכל N חוות הדעת"
    (r'לכל\s*\d{2,4}\s*חוות\s*הדעת', 'לכל {n} חוות הדעת'),

    # Badge count span: <span class="hr-badge-count">N</span>
    (r'(<span\s+class="hr-badge-count">)\d{2,4}(</span>)', r'\g<1>{n}\g<2>'),
]


def update_file(path: Path, new_count: int) -> int:
    """Apply all replacement specs to a single file. Returns number of substitutions."""
    try:
        text = path.read_text(encoding="utf-8")
    except Exception:
        return 0
    total = 0
    original = text
    for pattern, template in REPLACEMENT_SPECS:
        repl = template.replace("{n}", str(new_count))
        text, n = re.subn(pattern, repl, text)
        total += n
    if text != original:
        path.write_text(text, encoding="utf-8")
    return total


def load_state() -> dict:
    if STATE_FILE.exists():
        try:
            return json.loads(STATE_FILE.read_text())
        except Exception:
            return {}
    return {}


def save_state(state: dict) -> None:
    STATE_FILE.write_text(json.dumps(state, indent=2))


def log(line: str) -> None:
    stamp = datetime.now().isoformat(timespec="seconds")
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    with LOG_FILE.open("a") as f:
        f.write(f"[{stamp}] {line}\n")
    print(line)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--count", type=int, help="Override the fetched review count.")
    parser.add_argument("--dry-run", action="store_true", help="Show what would change without writing.")
    parser.add_argument("--force", action="store_true", help="Run even if count is unchanged.")
    args = parser.parse_args()

    if args.count is not None:
        new_count = args.count
        source = "manual"
    else:
        new_count = fetch_lawreviews_count()
        source = "lawreviews"
        if new_count is None:
            log("FAIL: could not fetch LawReviews count")
            sys.exit(1)

    state = load_state()
    last_count = state.get("last_count")
    log(f"fetched count={new_count} (source={source}) last={last_count}")

    if not args.force and last_count == new_count:
        log("no change — skipping")
        return

    files = html_files()
    changed_files = 0
    total_subs = 0
    for path in files:
        if args.dry_run:
            text = path.read_text(encoding="utf-8", errors="ignore")
            n = 0
            for pattern, _ in REPLACEMENT_SPECS:
                n += len(re.findall(pattern, text))
            if n:
                rel = path.relative_to(REPO)
                print(f"  would update {rel}: {n} matches")
                changed_files += 1
                total_subs += n
        else:
            n = update_file(path, new_count)
            if n:
                changed_files += 1
                total_subs += n
                rel = path.relative_to(REPO)
                print(f"  + {rel}: {n} edits")

    log(f"{'(dry-run) ' if args.dry_run else ''}updated {changed_files} files / {total_subs} edits → count={new_count}")

    if not args.dry_run:
        state["last_count"] = new_count
        state["last_run"] = datetime.now().isoformat(timespec="seconds")
        state["last_source"] = source
        save_state(state)


if __name__ == "__main__":
    main()
