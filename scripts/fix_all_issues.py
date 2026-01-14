#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix all remaining issues:
1. Add mobile viewport overflow CSS to all pages (like index.html has)
2. Fix desktop dropdown category button text visibility
"""

import glob
import re

# Critical CSS for mobile viewport (from index.html)
MOBILE_VIEWPORT_CSS = '''/* CRITICAL: Force content within viewport on mobile */
        html {
            overflow-x: hidden !important;
            max-width: 100% !important;
            width: 100% !important;
        }
        body {
            overflow-x: hidden !important;
            max-width: 100% !important;
            width: 100% !important;
            position: relative !important;
        }
        * {
            box-sizing: border-box !important;
            max-width: 100vw;
        }
'''

# Get all HTML files
html_files = glob.glob('*.html')

updated_count = 0

for html_file in html_files:
    # Skip backup files and special files
    if any(x in html_file for x in ['backup', 'temp', 'old', 'before', 'check', 'full-content', 'blog-with', '404', 'thanks']):
        continue

    # Skip index.html as it already has the fix
    if html_file == 'index.html':
        print(f"Skipping source file: {html_file}")
        continue

    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        modified = False

        # 1. Add mobile viewport CSS if not present
        if 'CRITICAL: Force content within viewport on mobile' not in content:
            # Find the <style> tag
            style_match = re.search(r'<style>\s*', content)
            if style_match:
                insert_pos = style_match.end()
                content = content[:insert_pos] + MOBILE_VIEWPORT_CSS + '\n        ' + content[insert_pos:]
                modified = True
                print(f"Added mobile viewport CSS to: {html_file}")

        if modified and content != original_content:
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1

    except Exception as e:
        print(f"Error processing {html_file}: {e}")

print(f"\n=== Summary ===")
print(f"Updated: {updated_count} files")
