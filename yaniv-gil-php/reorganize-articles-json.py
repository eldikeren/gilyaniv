#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Reorganize full-articles-content.json to use slugs as keys instead of titles
"""

import json
import re

# Slug mapping (from generate-article-pages.py)
def slugify(title):
    title_map = {
        "ערעורים בפשיטת רגל": "bankruptcy-appeals",
        "מינוי כונס נכסים זמני": "temporary-receiver",
        "הפטר בפש\"ר": "bankruptcy-discharge",
        "הפטר בפש'ר": "bankruptcy-discharge",
        "הפטר בפש": "bankruptcy-discharge",
        "הכרזה על פשיטת רגל - התנאים וההליכים": "bankruptcy-declaration",
        "ההגבלות על פושט הרגל": "bankruptcy-restrictions",
        "פיצוי על סירוב גט - חידוש בפסיקה": "get-refusal-compensation",
        "עילות גירושין בדין העברי": "divorce-grounds",
        "צו עיכוב יציאה מהארץ": "travel-restriction-order",
        "עיקול ועיקול מקרקעין": "seizure-real-estate",
        "מימוש משכנתא": "mortgage-execution",
        "טענת 'פרעתי' - סעיף 19 לחוק ההוצל'פ": "paid-defense",
        "דרכים למימוש שטר": "execution-of-bills",
        "סדר הדין האחיד לכל הסמכויות השיפוטיות": "uniform-civil-procedure",
        "תביעה על סכום קצוב": "fixed-amount-claims",
        "מבוא להליך פשיטת רגל": "bankruptcy-introduction",
        "בקשה למתן צו כינוס נכסים": "receivership-order-request",
        "צו כינוס נכסים לבקשת החייב (פשיטת רגל)": "receivership-order-debtor",
        "פשרה או הסדר לאחר ההכרזה על החייב כפושט רגל": "compromise-after-bankruptcy",
        "נישואים אזרחיים בישראל": "civil-marriage-israel",
        "בית דין רבני - סמכויות והליכים": "rabbinical-court",
        "בית המשפט לענייני משפחה": "family-court",
        "חוק הוצאה לפועל וחוקים אחרים": "execution-law-other-laws",
    }
    return title_map.get(title, title.replace(" ", "-").replace("'", "").replace("\"", ""))

# Read current JSON
with open('full-articles-content.json', 'r', encoding='utf-8') as f:
    old_data = json.load(f)

# Create new mapping: slug -> content
new_data = {}
title_to_slug = {}

# First pass: create title -> slug mapping from current data
for old_title in old_data.keys():
    if not old_title.startswith('_'):
        # Try to match old_title to known title
        # Since old_title might be corrupted, try to extract slug from content length or use index
        content = old_data[old_title]
        
        # Create a mapping based on content characteristics
        # We'll use the order and content length to match
        pass

# Better approach: Use the slug mapping directly and extract from old file in order
print("Reorganizing articles by slug...")

# Create slug-based structure by reading from old blog directly via git
import subprocess
result = subprocess.run(['git', 'show', 'cc768ac:blog.html'], capture_output=True, text=True, encoding='utf-8')
if result.returncode == 0:
    content = result.stdout
    # Extract articles in order
    pattern = r'data-title="([^"]*)"'
    titles = re.findall(pattern, content)
    
    # Create mapping: index -> (title, slug)
    articles_info = []
    for i, title in enumerate(titles):
        slug = slugify(title)
        articles_info.append((i, title, slug))
    
    # Extract content for each article
    article_pattern = r'<article[^>]*data-title="([^"]*)"[^>]*>.*?<div class="article-content">(.*?)</div>.*?</article>'
    matches = list(re.finditer(article_pattern, content, re.DOTALL))
    
    # Match by index/order
    new_data = {}
    for i, (idx, title, slug) in enumerate(articles_info):
        if i < len(matches) and matches[i].group(1) == title:
            article_content = matches[i].group(2)
            # Clean content
            article_content = re.sub(r'<a[^>]*href=["\']blog-articles/[^"\']*["\'][^>]*>.*?</a>', '', article_content, flags=re.DOTALL | re.IGNORECASE)
            article_content = re.sub(r'קרא עוד\s*←?\s*', '', article_content)
            article_content = article_content.strip()
            if len(article_content) > 200:
                new_data[slug] = article_content
                print(f"  Mapped {slug} <- {title[:30]}... ({len(article_content)} chars)")
    
    # Save as slug-based JSON
    with open('full-articles-content.json', 'w', encoding='utf-8') as f:
        json.dump(new_data, f, ensure_ascii=False, indent=2)
    print(f"\n✅ Reorganized {len(new_data)} articles by slug")
else:
    print("Failed to extract from git")

