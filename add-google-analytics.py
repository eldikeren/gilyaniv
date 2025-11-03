#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script to add Google Analytics tag to all HTML pages
"""

import os
import re
import glob

# Google Analytics tag
GOOGLE_TAG = """    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-1ES9G9LMG6"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-1ES9G9LMG6');
    </script>"""

def add_google_tag_to_file(filepath):
    """Add Google Analytics tag to a single HTML file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if Google tag already exists
        if 'G-1ES9G9LMG6' in content or 'googletagmanager.com/gtag' in content:
            print(f"  ⏭️  Skipping {filepath} - Google tag already exists")
            return False
        
        # Find the <head> tag and add the Google tag right after it
        # Pattern: <head> followed by optional whitespace and optional <meta> tags
        pattern = r'(<head[^>]*>)'
        match = re.search(pattern, content, re.IGNORECASE)
        
        if match:
            head_pos = match.end()
            # Insert Google tag right after <head>
            new_content = content[:head_pos] + '\n' + GOOGLE_TAG + '\n' + content[head_pos:]
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"  ✅ Added Google tag to {filepath}")
            return True
        else:
            print(f"  ⚠️  Could not find <head> tag in {filepath}")
            return False
            
    except Exception as e:
        print(f"  ❌ Error processing {filepath}: {e}")
        return False

def main():
    # Main HTML pages
    main_pages = [
        'index.html',
        'about.html',
        'attorneys.html',
        'practice-areas.html',
        'articles.html',
        'blog.html',
        'media.html',
        'contact.html',
        'family-law.html',
        'divorce-law.html',
        'inheritance-wills.html',
        'insolvency.html',
    ]
    
    # Blog article pages
    blog_articles = glob.glob('blog-articles/*.html')
    
    print("Adding Google Analytics tag to all HTML pages...\n")
    
    total_updated = 0
    
    # Process main pages
    print("Main pages:")
    for page in main_pages:
        if os.path.exists(page):
            if add_google_tag_to_file(page):
                total_updated += 1
        else:
            print(f"  ⚠️  File not found: {page}")
    
    # Process blog articles
    print(f"\nBlog articles ({len(blog_articles)} files):")
    for article in blog_articles:
        if add_google_tag_to_file(article):
            total_updated += 1
    
    print(f"\n✅ Complete! Updated {total_updated} files with Google Analytics tag.")

if __name__ == '__main__':
    main()

