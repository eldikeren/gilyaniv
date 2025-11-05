#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Update sitemap.xml to include all blog article pages
"""

import xml.etree.ElementTree as ET
from datetime import datetime
import os

# All slugs for blog articles (from generate-article-pages.py slugify function)
BLOG_ARTICLE_SLUGS = [
    "bankruptcy-appeals",
    "temporary-receiver",
    "bankruptcy-discharge",
    "bankruptcy-declaration",
    "bankruptcy-restrictions",
    "get-refusal-compensation",
    "divorce-grounds",
    "travel-restriction-order",
    "seizure-real-estate",
    "mortgage-execution",
    "paid-defense",
    "execution-of-bills",
    "uniform-civil-procedure",
    "fixed-amount-claims",
    "bankruptcy-introduction",
    "receivership-order-request",
    "receivership-order-debtor",
    "compromise-after-bankruptcy",
    "civil-marriage-israel",
    "rabbinical-court",
    "family-court",
    "execution-law-other-laws",
]

def create_sitemap():
    """Create/update sitemap.xml with all pages"""
    
    # Base URL
    base_url = "https://www.yanivgil.co.il"
    today = datetime.now().strftime("%Y-%m-%d")
    
    # Create root element
    urlset = ET.Element("urlset")
    urlset.set("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9")
    
    # Main pages
    main_pages = [
        ("index.html", "daily", "1.0"),
        ("about.html", "monthly", "0.9"),
        ("attorneys.html", "monthly", "0.9"),
        ("practice-areas.html", "monthly", "0.9"),
        ("articles.html", "weekly", "0.8"),
        ("blog.html", "daily", "0.9"),
        ("media.html", "monthly", "0.7"),
        ("contact.html", "monthly", "0.8"),
        # Practice area pages
        ("family-law.html", "monthly", "0.9"),
        ("divorce-law.html", "monthly", "0.9"),
        ("inheritance-wills.html", "monthly", "0.9"),
        ("insolvency.html", "monthly", "0.9"),
    ]
    
    # Add main pages
    for page, changefreq, priority in main_pages:
        url = ET.SubElement(urlset, "url")
        ET.SubElement(url, "loc").text = f"{base_url}/{page}"
        ET.SubElement(url, "lastmod").text = today
        ET.SubElement(url, "changefreq").text = changefreq
        ET.SubElement(url, "priority").text = priority
    
    # Add blog article pages
    for slug in BLOG_ARTICLE_SLUGS:
        url = ET.SubElement(urlset, "url")
        ET.SubElement(url, "loc").text = f"{base_url}/blog-articles/{slug}.html"
        ET.SubElement(url, "lastmod").text = today
        ET.SubElement(url, "changefreq").text = "monthly"
        ET.SubElement(url, "priority").text = "0.7"
    
    # Create XML tree
    tree = ET.ElementTree(urlset)
    ET.indent(tree, space="  ")
    
    # Write to file
    with open("sitemap.xml", "wb") as f:
        tree.write(f, encoding="utf-8", xml_declaration=True)
    
    total_urls = len(main_pages) + len(BLOG_ARTICLE_SLUGS)
    print(f"✅ Created sitemap.xml with {total_urls} URLs")
    print(f"   - {len(main_pages)} main pages")
    print(f"   - {len(BLOG_ARTICLE_SLUGS)} blog article pages")

if __name__ == "__main__":
    create_sitemap()

