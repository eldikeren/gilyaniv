
import os
import re

def fix_practice_areas():
    files = ['practice-areas.html']
    
    for filename in files:
        if not os.path.exists(filename):
            continue
            
        print(f"Processing {filename}...")
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()

        # Define replacements for the 3 categories
        # use dotall to capture multi-line or single-line
        
        # Family Law
        pattern_family = r'(<button\s+onclick="toggleCategoryDropdown\(\'mobile-category-family\', event\)"\s+class=")([^"]+)(".*?>)'
        replacement = r'\1w-full text-right flex items-center justify-between py-3 px-4 text-[#b8941f] bg-[#1a1a1a] rounded-lg" style="background-color: #1a1a1a !important; color: #b8941f !important; display: flex !important; visibility: visible !important; width: 100% !important;\3'
        
        new_content = re.sub(pattern_family, replacement, content, flags=re.DOTALL)
        
        # Inheritance
        pattern_inheritance = r'(<button\s+onclick="toggleCategoryDropdown\(\'mobile-category-inheritance\', event\)"\s+class=")([^"]+)(".*?>)'
        new_content = re.sub(pattern_inheritance, replacement, new_content, flags=re.DOTALL)
        
        # Bankruptcy
        pattern_bankruptcy = r'(<button\s+onclick="toggleCategoryDropdown\(\'mobile-category-bankruptcy\', event\)"\s+class=")([^"]+)(".*?>)'
        new_content = re.sub(pattern_bankruptcy, replacement, new_content, flags=re.DOTALL)

        if new_content != content:
            print(f"Fixed {filename}")
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
        else:
            print(f"No changes made to {filename} (Pattern not found?)")

if __name__ == "__main__":
    fix_practice_areas()
