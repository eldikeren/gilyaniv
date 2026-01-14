#!/usr/bin/env python3
"""
Fix category buttons with full inline styles to ensure visibility
"""

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the dropdown section with fully styled version
old_dropdown = '''                    <div id="mobile-practice-dropdown" class="hidden w-full mt-2">
                        <div class="mb-2">
                            <button onclick="toggleCategoryDropdown('mobile-category-family', event)" class="w-full text-right flex items-center justify-between py-3 px-4 rounded-lg transition-colors duration-200" style="background-color: #1a1a1a !important; color: #c9a54d !important; border: 1px solid #c9a54d !important;">
                                <span style="color: #c9a54d !important;">דיני משפחה</span>
                                <span class="category-icon text-xs ml-2">▼</span>
                            </button>'''

new_dropdown = '''                    <div id="mobile-practice-dropdown" class="hidden w-full mt-2" style="background: #2a2a2a; padding: 1rem; border-radius: 8px;">
                        <div style="margin-bottom: 12px; display: block !important; visibility: visible !important;">
                            <button onclick="toggleCategoryDropdown('mobile-category-family', event)" style="display: flex !important; visibility: visible !important; opacity: 1 !important; width: 100% !important; background-color: #1a1a1a !important; color: #c9a55c !important; border: 2px solid #c9a55c !important; border-radius: 8px !important; padding: 14px 16px !important; font-size: 16px !important; font-weight: bold !important; text-align: right !important; justify-content: space-between !important; align-items: center !important; cursor: pointer !important;">
                                <span style="color: #c9a55c !important; visibility: visible !important; opacity: 1 !important;">דיני משפחה</span>
                                <span style="color: #c9a55c !important; visibility: visible !important; opacity: 1 !important;">▼</span>
                            </button>'''

if old_dropdown in content:
    content = content.replace(old_dropdown, new_dropdown)
    print("Fixed family button")
else:
    print("Family button pattern not found - checking for variations...")

# Fix inheritance button
old_inheritance = '''                        <div class="mb-2">
                            <button onclick="toggleCategoryDropdown('mobile-category-inheritance', event)" class="w-full text-right flex items-center justify-between py-3 px-4 rounded-lg transition-colors duration-200" style="background-color: #1a1a1a !important; color: #c9a54d !important; border: 1px solid #c9a54d !important;">
                                <span style="color: #c9a54d !important;">ירושות וצוואות</span>
                                <span class="category-icon text-xs ml-2">▼</span>
                            </button>'''

new_inheritance = '''                        <div style="margin-bottom: 12px; display: block !important; visibility: visible !important;">
                            <button onclick="toggleCategoryDropdown('mobile-category-inheritance', event)" style="display: flex !important; visibility: visible !important; opacity: 1 !important; width: 100% !important; background-color: #1a1a1a !important; color: #c9a55c !important; border: 2px solid #c9a55c !important; border-radius: 8px !important; padding: 14px 16px !important; font-size: 16px !important; font-weight: bold !important; text-align: right !important; justify-content: space-between !important; align-items: center !important; cursor: pointer !important;">
                                <span style="color: #c9a55c !important; visibility: visible !important; opacity: 1 !important;">ירושות וצוואות</span>
                                <span style="color: #c9a55c !important; visibility: visible !important; opacity: 1 !important;">▼</span>
                            </button>'''

if old_inheritance in content:
    content = content.replace(old_inheritance, new_inheritance)
    print("Fixed inheritance button")

# Fix bankruptcy button
old_bankruptcy = '''                        <div class="mb-2">
                            <button onclick="toggleCategoryDropdown('mobile-category-bankruptcy', event)" class="w-full text-right flex items-center justify-between py-3 px-4 rounded-lg transition-colors duration-200" style="background-color: #1a1a1a !important; color: #c9a54d !important; border: 1px solid #c9a54d !important;">
                                <span style="color: #c9a54d !important;">חדלות פירעון והוצאה לפועל</span>
                                <span class="category-icon text-xs ml-2">▼</span>
                            </button>'''

new_bankruptcy = '''                        <div style="margin-bottom: 12px; display: block !important; visibility: visible !important;">
                            <button onclick="toggleCategoryDropdown('mobile-category-bankruptcy', event)" style="display: flex !important; visibility: visible !important; opacity: 1 !important; width: 100% !important; background-color: #1a1a1a !important; color: #c9a55c !important; border: 2px solid #c9a55c !important; border-radius: 8px !important; padding: 14px 16px !important; font-size: 16px !important; font-weight: bold !important; text-align: right !important; justify-content: space-between !important; align-items: center !important; cursor: pointer !important;">
                                <span style="color: #c9a55c !important; visibility: visible !important; opacity: 1 !important;">חדלות פירעון והוצאה לפועל</span>
                                <span style="color: #c9a55c !important; visibility: visible !important; opacity: 1 !important;">▼</span>
                            </button>'''

if old_bankruptcy in content:
    content = content.replace(old_bankruptcy, new_bankruptcy)
    print("Fixed bankruptcy button")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done!")
