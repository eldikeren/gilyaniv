#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Add blog article pages to sitemap.xml"""

import os
import xml.etree.ElementTree as ET
from datetime import datetime

# Blog articles directory
blog_dir = "blog-articles"
sitemap_file = "sitemap.xml"

# Get all HTML files in blog-articles directory
blog_articles = []
if os.path.exists(blog_dir):
    for filename in os.listdir(blog_dir):
        if filename.endswith('.html'):
            blog_articles.append(filename)

# Read existing sitemap
tree = ET.parse(sitemap_file)
root = tree.getroot()

# Namespace
ns = {'': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
for elem in root.iter():
    if '}' in elem.tag:
        elem.tag = elem.tag.split('}')[1]

# Today's date
today = datetime.now().strftime('%Y-%m-%d')

# Add blog articles
for article in sorted(blog_articles):
    url_elem = ET.SubElement(root, 'url')
    loc = ET.SubElement(url_elem, 'loc')
    article_url = f"https://www.yanivgil.co.il/blog-articles/{article}"
    loc.text = article_url
    lastmod = ET.SubElement(url_elem, 'lastmod')
    lastmod.text = today
    changefreq = ET.SubElement(url_elem, 'changefreq')
    changefreq.text = 'monthly'
    priority = ET.SubElement(url_elem, 'priority')
    priority.text = '0.7'

# Write back
tree.write(sitemap_file, encoding='utf-8', xml_declaration=True)
print(f"✅ Added {len(blog_articles)} blog articles to sitemap.xml")

