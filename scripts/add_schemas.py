#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Add BreadcrumbList and BlogPosting schemas to yanivgil.co.il pages
"""

import os
import re
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
BASE_URL = "https://www.yanivgil.co.il"

# Page categories for BreadcrumbList
BREADCRUMB_CONFIG = {
    # Main pages - Home > Page
    "contact.html": [("בית", "/"), ("צור קשר", None)],
    "blog.html": [("בית", "/"), ("בלוג", None)],
    "articles.html": [("בית", "/"), ("פרסומים מקצועיים", None)],
    "practice-areas.html": [("בית", "/"), ("תחומי התמחות", None)],
    "faq.html": [("בית", "/"), ("שאלות נפוצות", None)],
    "accessibility.html": [("בית", "/"), ("הצהרת נגישות", None)],

    # Family Law pages - Home > Practice Areas > Family Law > Page
    "family-law.html": [("בית", "/"), ("תחומי התמחות", "/practice-areas.html"), ("דיני משפחה", None)],
    "divorce.html": [("בית", "/"), ("דיני משפחה", "/family-law.html"), ("גירושין", None)],
    "divorce-law.html": [("בית", "/"), ("דיני משפחה", "/family-law.html"), ("דיני גירושין", None)],
    "divorce-guide.html": [("בית", "/"), ("דיני משפחה", "/family-law.html"), ("מדריך גירושין", None)],
    "divorce-agreements.html": [("בית", "/"), ("דיני משפחה", "/family-law.html"), ("הסכמי גירושין", None)],
    "child-custody.html": [("בית", "/"), ("דיני משפחה", "/family-law.html"), ("משמורת ילדים", None)],
    "child-support.html": [("בית", "/"), ("דיני משפחה", "/family-law.html"), ("מזונות ילדים", None)],
    "spousal-support.html": [("בית", "/"), ("דיני משפחה", "/family-law.html"), ("מזונות אישה", None)],
    "visitation-rights.html": [("בית", "/"), ("דיני משפחה", "/family-law.html"), ("זמני שהות", None)],
    "property-agreements.html": [("בית", "/"), ("דיני משפחה", "/family-law.html"), ("הסכמי ממון", None)],
    "property-division.html": [("בית", "/"), ("דיני משפחה", "/family-law.html"), ("חלוקת רכוש", None)],
    "guardianship.html": [("בית", "/"), ("דיני משפחה", "/family-law.html"), ("אפוטרופסות", None)],
    "mediation.html": [("בית", "/"), ("דיני משפחה", "/family-law.html"), ("גישור", None)],

    # Inheritance pages - Home > Practice Areas > Inheritance > Page
    "inheritance-wills.html": [("בית", "/"), ("תחומי התמחות", "/practice-areas.html"), ("ירושות וצוואות", None)],
    "will-writing.html": [("בית", "/"), ("ירושות וצוואות", "/inheritance-wills.html"), ("עריכת צוואה", None)],
    "will-probate.html": [("בית", "/"), ("ירושות וצוואות", "/inheritance-wills.html"), ("צו קיום צוואה", None)],
    "will-contest.html": [("בית", "/"), ("ירושות וצוואות", "/inheritance-wills.html"), ("התנגדות לצוואה", None)],
    "inheritance-order.html": [("בית", "/"), ("ירושות וצוואות", "/inheritance-wills.html"), ("צו ירושה", None)],
    "inheritance-contest.html": [("בית", "/"), ("ירושות וצוואות", "/inheritance-wills.html"), ("התנגדות לצו ירושה", None)],
    "estate-management.html": [("בית", "/"), ("ירושות וצוואות", "/inheritance-wills.html"), ("ניהול עיזבון", None)],

    # Insolvency pages - Home > Practice Areas > Insolvency > Page
    "insolvency.html": [("בית", "/"), ("תחומי התמחות", "/practice-areas.html"), ("חדלות פירעון", None)],
    "bankruptcy.html": [("בית", "/"), ("חדלות פירעון", "/insolvency.html"), ("פשיטת רגל", None)],
    "execution.html": [("בית", "/"), ("חדלות פירעון", "/insolvency.html"), ("הוצאה לפועל", None)],
    "case-consolidation.html": [("בית", "/"), ("חדלות פירעון", "/insolvency.html"), ("איחוד תיקים", None)],
    "travel-restriction.html": [("בית", "/"), ("חדלות פירעון", "/insolvency.html"), ("עיכוב יציאה מהארץ", None)],
    "debt-cancellation.html": [("בית", "/"), ("חדלות פירעון", "/insolvency.html"), ("מחיקת חובות", None)],
    "debt-arrangements.html": [("בית", "/"), ("חדלות פירעון", "/insolvency.html"), ("הסדרי חוב", None)],
    "lien-cancellation.html": [("בית", "/"), ("חדלות פירעון", "/insolvency.html"), ("ביטול עיקולים", None)],
    "discharge.html": [("בית", "/"), ("חדלות פירעון", "/insolvency.html"), ("קבלת הפטר", None)],
}

# Blog articles that need BlogPosting schema (22 missing)
BLOG_ARTICLES_NEED_SCHEMA = [
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

def generate_breadcrumb_schema(items):
    """Generate BreadcrumbList JSON-LD schema"""
    list_items = []
    for i, (name, url) in enumerate(items, 1):
        item = {
            "@type": "ListItem",
            "position": i,
            "name": name
        }
        if url:
            item["item"] = f"{BASE_URL}{url}"
        list_items.append(item)

    schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": list_items
    }

    import json
    return json.dumps(schema, ensure_ascii=False, indent=2)

def generate_blogposting_schema(title, description, url, date="2025-01-14"):
    """Generate BlogPosting JSON-LD schema"""
    schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": title,
        "description": description,
        "author": {
            "@type": "Person",
            "name": "עו״ד יניב גיל"
        },
        "publisher": {
            "@type": "Organization",
            "name": "משרד עו״ד יניב גיל ושות'",
            "logo": {
                "@type": "ImageObject",
                "url": f"{BASE_URL}/images/new-logo.png"
            }
        },
        "datePublished": date,
        "url": url,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        }
    }

    import json
    return json.dumps(schema, ensure_ascii=False, indent=2)

def extract_title_and_description(html_content):
    """Extract title and meta description from HTML"""
    title_match = re.search(r'<title>([^<]+)</title>', html_content)
    desc_match = re.search(r'<meta\s+name="description"\s+content="([^"]+)"', html_content)

    title = title_match.group(1) if title_match else "מאמר"
    description = desc_match.group(1) if desc_match else ""

    return title, description

def add_schema_to_page(filepath, schema_json, schema_type="BreadcrumbList"):
    """Add schema to a page if not already present"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if schema already exists
    if f'"@type": "{schema_type}"' in content or f'"@type":"{schema_type}"' in content:
        print(f"  Skipping {filepath.name} - {schema_type} already exists")
        return False

    # Find insertion point (before </head> or after existing schema)
    insert_marker = "</head>"
    if insert_marker not in content:
        print(f"  ERROR: Cannot find </head> in {filepath.name}")
        return False

    # Create the script tag
    script_tag = f'''
    <!-- {schema_type} Schema -->
    <script type="application/ld+json">
    {schema_json}
    </script>
    '''

    # Insert before </head>
    content = content.replace(insert_marker, script_tag + "\n    " + insert_marker)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  Added {schema_type} to {filepath.name}")
    return True

def process_breadcrumbs():
    """Add BreadcrumbList schema to all configured pages"""
    print("\n=== Adding BreadcrumbList Schema ===\n")
    count = 0

    for filename, breadcrumb_items in BREADCRUMB_CONFIG.items():
        filepath = BASE_DIR / filename
        if not filepath.exists():
            print(f"  WARNING: {filename} not found")
            continue

        schema_json = generate_breadcrumb_schema(breadcrumb_items)
        if add_schema_to_page(filepath, schema_json, "BreadcrumbList"):
            count += 1

    print(f"\nAdded BreadcrumbList to {count} pages")
    return count

def process_blog_articles():
    """Add BlogPosting and BreadcrumbList schema to blog articles"""
    print("\n=== Adding BlogPosting Schema to Articles ===\n")
    count = 0
    blog_dir = BASE_DIR / "blog-articles"

    for filename in BLOG_ARTICLES_NEED_SCHEMA:
        filepath = blog_dir / filename
        if not filepath.exists():
            print(f"  WARNING: {filename} not found")
            continue

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        title, description = extract_title_and_description(content)
        url = f"{BASE_URL}/blog-articles/{filename}"

        # Add BlogPosting schema
        blogposting_json = generate_blogposting_schema(title, description, url)
        if add_schema_to_page(filepath, blogposting_json, "BlogPosting"):
            count += 1

        # Add BreadcrumbList schema for blog article
        article_name = title.replace(" | משרד עו״ד יניב גיל", "").strip()
        breadcrumb_items = [
            ("בית", "/"),
            ("בלוג", "/blog.html"),
            (article_name[:30] + "..." if len(article_name) > 30 else article_name, None)
        ]
        breadcrumb_json = generate_breadcrumb_schema(breadcrumb_items)
        add_schema_to_page(filepath, breadcrumb_json, "BreadcrumbList")

    print(f"\nAdded BlogPosting to {count} articles")
    return count

def main():
    print("=" * 60)
    print("Schema Addition Script for yanivgil.co.il")
    print("=" * 60)

    # Process main pages with BreadcrumbList
    breadcrumb_count = process_breadcrumbs()

    # Process blog articles with BlogPosting
    blog_count = process_blog_articles()

    print("\n" + "=" * 60)
    print(f"Summary:")
    print(f"  - BreadcrumbList added to: {breadcrumb_count} pages")
    print(f"  - BlogPosting added to: {blog_count} articles")
    print("=" * 60)

if __name__ == "__main__":
    main()
