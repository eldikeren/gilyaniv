#!/usr/bin/env python3
"""Replace Tailwind CDN with production CSS in all HTML files"""
import os
import re

def replace_tailwind_in_file(filepath):
    """Replace Tailwind CDN with production CSS link"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Replace Tailwind CDN script with CSS link
        # Match various formats
        patterns = [
            (r'<script[^>]*src=["\']https://cdn\.tailwindcss\.com["\'][^>]*></script>', 
             '<link rel="stylesheet" href="css/tailwind.css">'),
            (r'<!-- Tailwind CSS CDN -->\s*<script[^>]*src=["\']https://cdn\.tailwindcss\.com["\'][^>]*></script>',
             '<!-- Tailwind CSS Production Build -->\n    <link rel="stylesheet" href="css/tailwind.css">'),
        ]
        
        for pattern, replacement in patterns:
            content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)
        
        # For blog articles, adjust path to use ../css/tailwind.css
        if 'blog-articles' in filepath:
            content = content.replace('href="css/tailwind.css"', 'href="../css/tailwind.css"')
        
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False

def main():
    """Find and update all HTML files"""
    html_files = []
    
    # Find all HTML files
    for root, dirs, files in os.walk('.'):
        # Skip node_modules and other build directories
        if 'node_modules' in root or '.git' in root:
            continue
        
        for file in files:
            if file.endswith('.html'):
                filepath = os.path.join(root, file)
                html_files.append(filepath)
    
    updated = 0
    for filepath in html_files:
        if replace_tailwind_in_file(filepath):
            print(f"✓ Updated: {filepath}")
            updated += 1
    
    print(f"\n✓ Total files updated: {updated}/{len(html_files)}")

if __name__ == '__main__':
    main()

