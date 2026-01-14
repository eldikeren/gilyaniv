#!/usr/bin/env python3
"""
Fix Mobile Menu Colors - Add inline styles to ensure category buttons have gold text on dark background
"""

import os
import re
from pathlib import Path

def fix_mobile_menu_colors(html_content):
    """
    Add inline styles to mobile category buttons to ensure golden text on dark background
    """
    
    # Pattern to find mobile category buttons without inline styles
    patterns = [
        # Pattern 1: Buttons with 'mobile-category-' id references (most common)
        (
            r'(<button\s+onclick="toggleCategoryDropdown\(\'mobile-category-(?:family|inheritance|bankruptcy)\',\s*event\)"\s+class="[^"]*"\s*)(?!style=)(\>)',
            r'\1style="background-color: #1a1a1a !important; color: #b8941f !important; display: flex !important; visibility: visible !important; width: 100% !important;" \2'
        ),
        # Pattern 2: Buttons that already have style but might be incomplete
        (
            r'(<button\s+onclick="toggleCategoryDropdown\(\'mobile-category-(?:family|inheritance|bankruptcy)\',\s*event\)"\s+class="[^"]*"\s+)style="([^"]*)"(\>)',
            lambda m: f'{m.group(1)}style="background-color: #1a1a1a !important; color: #b8941f !important; display: flex !important; visibility: visible !important; width: 100% !important;" {m.group(3)}'
        ),
    ]
    
    modified_content = html_content
    changes_made = 0
    
    for pattern, replacement in patterns:
        if callable(replacement):
            # Use re.sub with callback for pattern 2
            new_content = re.sub(pattern, replacement, modified_content, flags=re.MULTILINE)
        else:
            # Use normal replacement for pattern 1
            new_content = re.sub(pattern, replacement, modified_content, flags=re.MULTILINE)
        
        if new_content != modified_content:
            changes_made += 1
            modified_content = new_content
    
    return modified_content, changes_made

def main():
    """
    Main function to process all HTML files
    """
    # Get the project root directory
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    
    # Find all HTML files
    html_files = list(project_root.glob('*.html'))
    
    total_files_processed = 0
    total_changes_made = 0
    
    print("🔧 Fixing Mobile Menu Colors...")
    print("=" * 60)
    
    for html_file in html_files:
        try:
            # Read the file
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Fix the content
            modified_content, changes = fix_mobile_menu_colors(content)
            
            # Write back only if changes were made
            if changes > 0:
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(modified_content)
                
                total_files_processed += 1
                total_changes_made += changes
                print(f"✅ {html_file.name}: {changes} button(s) fixed")
            else:
                print(f"⚪ {html_file.name}: No changes needed")
        
        except Exception as e:
            print(f"❌ Error processing {html_file.name}: {str(e)}")
    
    print("=" * 60)
    print(f"✨ Complete! Fixed {total_changes_made} buttons in {total_files_processed} files")

if __name__ == "__main__":
    main()
