#!/usr/bin/env python3
"""
Ensure navbar consistency across all pages.
Uses the navbar style from index.html as the standard.
"""

import glob
import re

# Pages to process
html_files = glob.glob('*.html')

# The standard desktop navbar HTML (dark buttons style from index.html)
standard_desktop_nav = '''<nav class="hidden md:flex flex-1 justify-center" role="navigation" aria-label="תפריט ראשי">
                <ul class="flex gap-6 list-none m-0 p-0 text-gray-600 font-medium">
                    <li><a href="index.html" title="דף הבית" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">בית</a></li>
                    <li><a href="index.html#about" title="אודות המשרד" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">אודות המשרד</a></li>
                    <li><a href="attorneys.html" title="עורכי דין" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">עורכי דין</a></li>
                    <li><a href="practice-areas.html" title="תחומי התמחות" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">תחומי התמחות</a></li>
                    <li><a href="articles.html" title="פרסומים מקצועיים" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">פרסומים מקצועיים</a></li>
                    <li><a href="blog.html" title="בלוג" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">בלוג</a></li>
                    <li><a href="https://www.lawreviews.co.il/provider/gil-yaniv#reviews" title="ביקורות מלקוחות" target="_blank" rel="noopener" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">ביקורות מלקוחות</a></li>
                    <li><a href="contact.html" title="צור קשר" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">צור קשר</a></li>
                </ul>
            </nav>'''

# Pattern to find the old nav (simple white style)
old_nav_patterns = [
    # Pattern 1: Simple nav without buttons
    r'<nav class="hidden md:flex flex-1 justify-center">\s*<ul class="flex gap-6 list-none m-0 p-0 text-gray-600 font-medium">.*?</ul>\s*</nav>',
    # Pattern 2: With role attribute but no buttons
    r'<nav class="hidden md:flex flex-1 justify-center" role="navigation"[^>]*>\s*<ul class="flex gap-6 list-none m-0 p-0 text-gray-600 font-medium">(?:(?!inline-flex).)*?</ul>\s*</nav>',
]

processed = 0
skipped = 0

for html_file in html_files:
    # Skip backup files and special files
    if any(x in html_file for x in ['backup', 'temp', 'old', 'before', 'check', 'full-content', 'blog-with', '404', 'thanks']):
        skipped += 1
        continue

    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        modified = False

        # Check if this file has the old simple nav (not the button style)
        # The key identifier is having links without the "inline-flex" button class
        if '<nav class="hidden md:flex' in content:
            # Check if it's the OLD style (simple links, not buttons)
            if 'hover:text-[#b8941f] transition-colors duration-200">בית</a>' in content:
                # This is the old white navbar style - needs updating
                # Find and replace the nav section
                for pattern in old_nav_patterns:
                    if re.search(pattern, content, re.DOTALL):
                        content = re.sub(pattern, standard_desktop_nav, content, flags=re.DOTALL)
                        modified = True
                        break

        if modified:
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated navbar: {html_file}")
            processed += 1
        else:
            # Check if it already has the button style
            if 'inline-flex items-center justify-center rounded-full border border-[#c9a55c]' in content:
                print(f"Already consistent: {html_file}")
            else:
                print(f"No nav found or different structure: {html_file}")

    except Exception as e:
        print(f"Error processing {html_file}: {e}")

print(f"\nProcessed {processed} files, skipped {skipped}")
