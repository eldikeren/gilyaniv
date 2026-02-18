#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Add LegalService with AggregateRating schema to practice area pages
"""

import os
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
BASE_URL = "https://www.yanivgil.co.il"

# Practice area pages with their service types
PRACTICE_PAGES = {
    "family-law.html": {
        "name": "דיני משפחה - משרד עו״ד יניב גיל",
        "description": "משרד עורכי דין מומחה בדיני משפחה, גירושין, משמורת ילדים, מזונות והסכמי ממון.",
        "services": ["דיני משפחה", "גירושין", "משמורת ילדים", "מזונות", "הסכמי ממון", "הסכמי גירושין"]
    },
    "divorce-law.html": {
        "name": "דיני גירושין - משרד עו״ד יניב גיל",
        "description": "משרד עורכי דין מומחה בהליכי גירושין, הסכמי גירושין וייצוג בבית המשפט לענייני משפחה.",
        "services": ["גירושין", "הסכמי גירושין", "דיני משפחה", "חלוקת רכוש"]
    },
    "inheritance-wills.html": {
        "name": "ירושות וצוואות - משרד עו״ד יניב גיל",
        "description": "משרד עורכי דין מומחה בעריכת צוואות, צווי ירושה, התנגדויות לצוואה וניהול עיזבון.",
        "services": ["ירושות", "צוואות", "צו ירושה", "צו קיום צוואה", "ניהול עיזבון", "התנגדות לצוואה"]
    },
    "insolvency.html": {
        "name": "חדלות פירעון - משרד עו״ד יניב גיל",
        "description": "משרד עורכי דין מומחה בחדלות פירעון, פשיטת רגל, מחיקת חובות והסדרי חוב.",
        "services": ["חדלות פירעון", "פשיטת רגל", "מחיקת חובות", "הוצאה לפועל", "הסדרי חוב", "ביטול עיקולים"]
    }
}

def generate_legalservice_schema(page_config, url):
    """Generate LegalService JSON-LD schema with AggregateRating"""
    import json

    schema = {
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": page_config["name"],
        "description": page_config["description"],
        "url": url,
        "provider": {
            "@type": "LegalService",
            "name": "משרד עו״ד יניב גיל ושות'",
            "url": BASE_URL
        },
        "serviceType": page_config["services"],
        "areaServed": {
            "@type": "Country",
            "name": "ישראל"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "50",
            "bestRating": "5",
            "worstRating": "1"
        }
    }

    return json.dumps(schema, ensure_ascii=False, indent=2)

def add_schema_to_page(filepath, schema_json):
    """Add LegalService schema to a page"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if LegalService schema already exists
    if '"@type": "LegalService"' in content:
        # Check if aggregateRating exists
        if '"aggregateRating"' in content:
            print(f"  Skipping {filepath.name} - LegalService with AggregateRating already exists")
            return False
        else:
            print(f"  WARNING: {filepath.name} has LegalService but no AggregateRating - manual check needed")
            return False

    # Find insertion point (before </head>)
    insert_marker = "</head>"
    if insert_marker not in content:
        print(f"  ERROR: Cannot find </head> in {filepath.name}")
        return False

    # Create the script tag
    script_tag = f'''
    <!-- LegalService with AggregateRating Schema -->
    <script type="application/ld+json">
    {schema_json}
    </script>
    '''

    # Insert before </head>
    content = content.replace(insert_marker, script_tag + "\n    " + insert_marker)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  Added LegalService with AggregateRating to {filepath.name}")
    return True

def main():
    print("=" * 60)
    print("Adding LegalService + AggregateRating Schema")
    print("=" * 60)

    count = 0
    for filename, config in PRACTICE_PAGES.items():
        filepath = BASE_DIR / filename
        if not filepath.exists():
            print(f"  WARNING: {filename} not found")
            continue

        url = f"{BASE_URL}/{filename}"
        schema_json = generate_legalservice_schema(config, url)
        if add_schema_to_page(filepath, schema_json):
            count += 1

    print(f"\nAdded LegalService schema to {count} pages")
    print("=" * 60)

if __name__ == "__main__":
    main()
