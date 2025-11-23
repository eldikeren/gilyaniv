#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Update all Google Analytics tags to match Google's exact specification
"""

import os
import re
import glob

# Exact Google Analytics tag format from Google
EXACT_GOOGLE_TAG = """    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-1ES9G9LMG6"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-1ES9G9LMG6');
    </script>"""

def update_ga_tag_in_file(filepath):
    """Update Google Analytics tag to exact format"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if Google tag exists
        if 'G-1ES9G9LMG6' not in content:
            print(f"  ⚠️  No Google tag found in {filepath}")
            return False
        
        # Pattern to match the entire Google Analytics tag block
        # This matches from the comment to the closing script tag
        pattern = r'<!-- Google tag \(gtag\.js\) -->\s*<script async src="https://www\.googletagmanager\.com/gtag/js\?id=G-1ES9G9LMG6"></script>\s*<script>.*?gtag\(\'config\', \'G-1ES9G9LMG6\'\);\s*</script>'
        
        # Check if it already has the exact format (with blank line)
        if 'gtag(\'js\', new Date());\n\n      gtag(\'config\'' in content:
            print(f"  ✓ Already correct format: {filepath}")
            return False
        
        # Replace the tag block
        new_content = re.sub(pattern, EXACT_GOOGLE_TAG, content, flags=re.DOTALL)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"  ✅ Updated: {filepath}")
            return True
        else:
            print(f"  ⚠️  Could not update: {filepath}")
            return False
            
    except Exception as e:
        print(f"  ❌ Error processing {filepath}: {e}")
        return False

def main():
    main_pages = [
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
    
    blog_articles = glob.glob('blog-articles/*.html')
    
    print("Updating Google Analytics tags to exact Google specification...\n")
    
    total_updated = 0
    
    # Update main pages (skip index.html - already updated)
    print("Main pages:")
    for page in main_pages:
        if os.path.exists(page):
            if update_ga_tag_in_file(page):
                total_updated += 1
    
    # Update blog articles
    print(f"\nBlog articles ({len(blog_articles)} files):")
    for article in blog_articles:
        if update_ga_tag_in_file(article):
            total_updated += 1
    
    print(f"\n✅ Complete! Updated {total_updated} files with exact Google Analytics tag format.")

if __name__ == '__main__':
    main()

