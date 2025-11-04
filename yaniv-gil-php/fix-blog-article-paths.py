#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix broken image paths in blog article pages
"""

import os
import glob
import re

def fix_image_paths(filepath):
    """Fix image paths in blog article pages"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Fix favicon paths - should be ../images/ not images/
        # Pattern: href="images/new-logo.png" or href='images/new-logo.png'
        content = re.sub(r'href=["\']images/new-logo\.png["\']', r'href="../images/new-logo.png"', content)
        content = re.sub(r'href=["\']images/new-logo\.png["\']', r'href="../images/new-logo.png"', content)
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"  ✅ Fixed: {filepath}")
            return True
        else:
            print(f"  ✓ Already correct: {filepath}")
            return False
            
    except Exception as e:
        print(f"  ❌ Error: {filepath} - {str(e)}")
        return False

def main():
    blog_articles = glob.glob('blog-articles/*.html')
    
    print(f"Fixing image paths in {len(blog_articles)} blog article pages...\n")
    
    fixed_count = 0
    for article in blog_articles:
        if fix_image_paths(article):
            fixed_count += 1
    
    print(f"\n✅ Complete! Fixed {fixed_count} files.")

if __name__ == '__main__':
    main()

