#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Fix mobile menu CSS on all pages to match index.html
Replace the old centered dark-box style with the new full-width white menu
"""

import glob
import re

# Correct mobile menu CSS from index.html
CORRECT_MOBILE_CSS = '''/* Mobile menu styles */
        .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #ffffff;
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
        }
        .mobile-menu-overlay.active {
            transform: translateX(0);
        }
        /* Header section with logo and close button */
        .mobile-menu-overlay > .flex.justify-between {
            background: #ffffff;
            border-bottom: 1px solid #e5e7eb;
        }
        /* Main nav section */
        .mobile-menu-overlay nav {
            background: #ffffff;
            flex: 1;
        }
        .mobile-menu-overlay nav ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .mobile-menu-overlay nav ul li a.mobile-menu-link {
            display: block;
            padding: 1rem;
            background: #1a1a1a !important;
            color: #c9a55c !important;
            text-decoration: none;
            border-radius: 5px;
            margin-bottom: 0.5rem;
            transition: all 0.3s ease;
        }
        .mobile-menu-overlay nav ul li a.mobile-menu-link:hover {
            background: #c9a55c !important;
            color: #1a1a1a !important;
        }
        /* Category dropdown buttons - 2nd hierarchy - MUST be visible */
        .mobile-menu-overlay button[onclick*="toggleCategoryDropdown"],
        #mobile-practice-dropdown .mb-2 > button {
            display: flex !important;
            width: 100% !important;
            padding: 0.75rem 1rem !important;
            background-color: #1a1a1a !important;
            color: #c9a55c !important;
            border: 1px solid #c9a55c !important;
            border-radius: 0.5rem !important;
            font-size: 1rem !important;
            font-weight: 600 !important;
            text-align: right !important;
            cursor: pointer !important;
            justify-content: space-between !important;
            align-items: center !important;
        }
        .mobile-menu-overlay button[onclick*="toggleCategoryDropdown"] span,
        #mobile-practice-dropdown .mb-2 > button span {
            color: #c9a55c !important;
        }
        .mobile-menu-overlay button[onclick*="toggleCategoryDropdown"]:hover,
        #mobile-practice-dropdown .mb-2 > button:hover {
            background-color: #c9a55c !important;
            color: #1a1a1a !important;
        }
        .mobile-menu-overlay button[onclick*="toggleCategoryDropdown"]:hover span,
        #mobile-practice-dropdown .mb-2 > button:hover span {
            color: #1a1a1a !important;
        }
        /* Main dropdown button */
        .mobile-menu-overlay button[onclick*="toggleNavDropdown"] {
            display: block !important;
            width: 100% !important;
            padding: 1rem !important;
            background: #1a1a1a !important;
            color: #c9a55c !important;
            border: none !important;
            border-radius: 5px !important;
            font-size: 1.125rem !important;
            text-align: right !important;
            cursor: pointer !important;
        }
        /* Dropdown container */
        #mobile-practice-dropdown {
            background: #2a2a2a;
            padding: 1rem;
            border-radius: 0.5rem;
            margin-top: 0.5rem;
        }
        /* Sub-links inside category dropdowns */
        #mobile-practice-dropdown a {
            color: #d1d5db !important;
        }
        #mobile-practice-dropdown a:hover {
            color: #c9a55c !important;
            background: rgba(201, 165, 92, 0.1) !important;
        }'''

# Get all HTML files
html_files = glob.glob('*.html')

updated_count = 0

for html_file in html_files:
    # Skip backup files and special files
    if any(x in html_file for x in ['backup', 'temp', 'old', 'before', 'check', 'full-content', 'blog-with', '404', 'thanks']):
        continue

    # Skip index.html as it already has the correct CSS
    if html_file == 'index.html':
        print(f"Skipping source file: {html_file}")
        continue

    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        modified = False

        # Check if the file has the old mobile menu CSS (with rgba background)
        if 'rgba(0, 0, 0, 0.9)' in content:
            # Use regex to find and replace the entire old mobile menu CSS block
            # Pattern matches from "/* Mobile menu styles */" or "/* Full-screen mobile menu */"
            # to ".mobile-menu-links a:hover { ... }"
            pattern = r'/\*\s*(Mobile menu styles|Full-screen mobile menu)\s*\*/\s*\.mobile-menu-overlay\s*\{[^}]+\}[^/]*\.mobile-menu-overlay\.active\s*\{[^}]+\}[^/]*\.mobile-menu-content\s*\{[^}]+\}[^/]*\.mobile-menu-close\s*\{[^}]+\}[^/]*\.mobile-menu-links\s*\{[^}]+\}[^/]*\.mobile-menu-links\s+a\s*\{[^}]+\}[^/]*\.mobile-menu-links\s+a:hover\s*\{[^}]+\}'

            match = re.search(pattern, content, re.DOTALL)
            if match:
                content = content[:match.start()] + CORRECT_MOBILE_CSS + content[match.end():]
                modified = True
                print(f"Replaced old mobile menu CSS in: {html_file}")
            else:
                print(f"Pattern not matched in: {html_file}")

        if modified and content != original_content:
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1

    except Exception as e:
        print(f"Error processing {html_file}: {e}")

print(f"\n=== Summary ===")
print(f"Updated: {updated_count} files")
