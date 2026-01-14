#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Final fix for mobile menu issues:
1. Remove mobile-menu-link class from תחומי התמחות button (so it doesn't close menu)
2. Remove the מדיה link from mobile menu
3. Fix JavaScript to handle dropdown properly
"""

import glob
import re

# Get all HTML files
html_files = glob.glob('*.html')

updated_count = 0

for html_file in html_files:
    # Skip backup files and special files
    if any(x in html_file for x in ['backup', 'temp', 'old', 'before', 'check', 'full-content', 'blog-with', '404', 'thanks', 'accessibility', 'terms', 'privacy']):
        continue

    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        modified = False

        # 1. Remove mobile-menu-link class from the תחומי התמחות button
        # This prevents the menu from closing when clicking the dropdown button
        old_button = 'onclick="toggleNavDropdown(\'mobile-practice-dropdown\')" class="block w-full text-right text-lg text-gray-800 hover:text-[#b8941f] transition-colors duration-200 mobile-menu-link"'
        new_button = 'onclick="toggleNavDropdown(\'mobile-practice-dropdown\')" class="block w-full text-right text-lg"'

        if old_button in content:
            content = content.replace(old_button, new_button)
            modified = True
            print(f"Fixed button class in: {html_file}")

        # 2. Remove the מדיה link from mobile menu
        # Pattern: <li><a href="media.html" class="...mobile-menu-link">מדיה</a></li>
        media_pattern = r'\s*<li><a href="media\.html"[^>]*>מדיה</a></li>'
        if re.search(media_pattern, content):
            content = re.sub(media_pattern, '', content)
            modified = True
            print(f"  Removed media link")

        if modified and content != original_content:
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1

    except Exception as e:
        print(f"Error processing {html_file}: {e}")

print(f"\n=== Summary ===")
print(f"Updated: {updated_count} files")
