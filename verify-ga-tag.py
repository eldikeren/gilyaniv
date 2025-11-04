#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Verify Google Analytics tag is correctly installed on all pages
"""

import os
import glob
import re

def verify_ga_tag(filepath):
    """Verify Google Analytics tag format matches Google's specification"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if tag exists
        if 'G-1ES9G9LMG6' not in content:
            return False, "Missing tag"
        
        # Check if it's immediately after <head>
        head_match = re.search(r'<head[^>]*>', content, re.IGNORECASE)
        if not head_match:
            return False, "No <head> tag found"
        
        head_pos = head_match.end()
        content_after_head = content[head_pos:head_pos+500]
        
        # Check if Google tag comment is near the start
        if '<!-- Google tag' not in content_after_head:
            return False, "Tag not immediately after <head>"
        
        # Check if format includes blank line between gtag calls
        if re.search(r"gtag\('js', new Date\(\)\);\s*\n\s*gtag\('config'", content):
            return True, "Correct format"
        else:
            return False, "Wrong format - missing blank line"
            
    except Exception as e:
        return False, f"Error: {str(e)}"

def main():
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
    
    blog_articles = glob.glob('blog-articles/*.html')
    all_files = main_pages + blog_articles
    
    print("Verifying Google Analytics tag on all pages...\n")
    
    correct = []
    incorrect = []
    
    for filepath in all_files:
        if not os.path.exists(filepath):
            continue
            
        is_correct, message = verify_ga_tag(filepath)
        if is_correct:
            correct.append(filepath)
            print(f"✅ {filepath}")
        else:
            incorrect.append((filepath, message))
            print(f"❌ {filepath} - {message}")
    
    print(f"\n📊 Summary:")
    print(f"  ✅ Correct: {len(correct)} files")
    print(f"  ❌ Issues: {len(incorrect)} files")
    
    if incorrect:
        print(f"\n⚠️  Files with issues:")
        for filepath, message in incorrect:
            print(f"    - {filepath}: {message}")
        return 1
    else:
        print("\n✅ All files have the correct Google Analytics tag!")
        return 0

if __name__ == '__main__':
    exit(main())

