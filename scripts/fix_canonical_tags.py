#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix wrong canonical tags in blog articles
Changes: canonical="/blog.html" → canonical="/blog-articles/[filename].html"
"""

import os
import re
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
BLOG_DIR = BASE_DIR / "blog-articles"
BASE_URL = "https://www.yanivgil.co.il"

# Articles with wrong canonical pointing to /blog.html
ARTICLES_TO_FIX = [
    "bankruptcy-appeals.html",
    "bankruptcy-declaration.html",
    "bankruptcy-discharge.html",
    "bankruptcy-introduction.html",
    "bankruptcy-restrictions.html",
    "civil-marriage-israel.html",
    "compromise-after-bankruptcy.html",
    "divorce-grounds.html",
    "execution-law-other-laws.html",
    "execution-of-bills.html",
    "family-court.html",
    "fixed-amount-claims.html",
    "get-refusal-compensation.html",
    "mortgage-execution.html",
    "paid-defense.html",
    "rabbinical-court.html",
    "receivership-order-debtor.html",
    "receivership-order-request.html",
    "seizure-real-estate.html",
    "temporary-receiver.html",
    "travel-restriction-order.html",
    "uniform-civil-procedure.html",
]

def fix_canonical(filepath):
    """Fix canonical tag to point to the article's own URL"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    filename = filepath.name
    correct_canonical = f'{BASE_URL}/blog-articles/{filename}'

    # Pattern to match wrong canonical
    wrong_pattern = r'<link\s+rel="canonical"\s+href="https://www\.yanivgil\.co\.il/blog\.html">'
    correct_tag = f'<link rel="canonical" href="{correct_canonical}">'

    if re.search(wrong_pattern, content):
        content = re.sub(wrong_pattern, correct_tag, content)

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

        print(f"  Fixed: {filename}")
        return True
    else:
        print(f"  Skipped: {filename} (already correct or different pattern)")
        return False

def main():
    print("=" * 60)
    print("Fixing Canonical Tags in Blog Articles")
    print("=" * 60)

    count = 0
    for filename in ARTICLES_TO_FIX:
        filepath = BLOG_DIR / filename
        if filepath.exists():
            if fix_canonical(filepath):
                count += 1
        else:
            print(f"  WARNING: {filename} not found")

    print(f"\nFixed {count} articles")
    print("=" * 60)

if __name__ == "__main__":
    main()
