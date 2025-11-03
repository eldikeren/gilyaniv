#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Extract full article content from an older version of blog.html that had full articles
"""

import re
import json
import os

def extract_full_articles_from_old_blog(blog_file='blog-old-full.html'):
    """Extract all full articles from the old blog.html file"""
    
    if not os.path.exists(blog_file):
        print(f"Error: {blog_file} not found!")
        return {}
    
    # Try different encodings - but ensure we preserve Hebrew correctly
    content = None
    try:
        # First try UTF-8 (most common)
        with open(blog_file, 'r', encoding='utf-8') as f:
            content = f.read()
        # Check if content looks valid (has Hebrew characters)
        if not any('\u0590' <= c <= '\u05FF' for c in content[:1000]):
            # Try UTF-8-sig (BOM)
            with open(blog_file, 'r', encoding='utf-8-sig') as f:
                content = f.read()
    except Exception as e:
        print(f"Warning: UTF-8 reading failed: {e}, trying alternative encodings...")
        try:
            # Try reading as binary and decode
            with open(blog_file, 'rb') as f:
                raw = f.read()
            content = raw.decode('utf-8')
        except:
            try:
                content = raw.decode('utf-8-sig')
            except:
                print(f"Error: Could not read {blog_file}!")
                return {}
    
    if content is None or len(content) < 100:
        print(f"Error: Could not read valid content from {blog_file}!")
        return {}
    
    # Find all articles with their full content
    # Pattern: <article ... data-title="..." ...> ... <div class="article-content">FULL CONTENT</div> ... </article>
    article_pattern = r'<article[^>]*data-title="([^"]*)"[^>]*>.*?<div class="article-content">(.*?)</div>.*?</article>'
    
    matches = re.finditer(article_pattern, content, re.DOTALL)
    
    full_articles = {}
    
    for match in matches:
        title = match.group(1)
        article_content = match.group(2)
        
        # Clean up the content - remove "קרא עוד" buttons and preview text if any
        article_content = re.sub(r'<a[^>]*href=["\']blog-articles/[^"\']*["\'][^>]*>.*?</a>', '', article_content, flags=re.DOTALL | re.IGNORECASE)
        article_content = re.sub(r'קרא עוד\s*←?\s*', '', article_content)
        article_content = article_content.strip()
        
        # Only add if content is substantial (more than just a preview)
        if len(article_content) > 200:  # More than 200 chars means it's likely full content
            full_articles[title] = article_content
            print(f"Extracted full content for: {title} ({len(article_content)} chars)")
    
    return full_articles

def save_to_json(full_articles, output_file='full-articles-content.json'):
    """Save extracted articles to JSON file"""
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(full_articles, f, ensure_ascii=False, indent=2)
    print(f"\nSaved {len(full_articles)} full articles to {output_file}")

if __name__ == '__main__':
    print("Extracting full articles from old blog.html...")
    full_articles = extract_full_articles_from_old_blog()
    
    if full_articles:
        save_to_json(full_articles)
    else:
        print("No full articles found. Make sure blog-with-full.html exists and contains full articles.")

