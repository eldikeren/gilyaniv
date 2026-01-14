#!/usr/bin/env python3
"""
Sync mobile menu from index.html to ALL other pages.
This script copies the FULL mobile menu with dropdowns from index.html to all pages.
"""

import glob
import re

# The correct full mobile menu HTML from index.html
FULL_MOBILE_MENU = '''    <!-- Mobile Menu -->
    <div id="mobile-menu" class="mobile-menu-overlay">
        <div class="flex justify-between items-center p-6 border-b">
            <div class="flex items-center gap-2">
                <a href="index.html" title="דף הבית">
                    <img src="images/new-logo.png" alt="לוגו משרד עו״ד יניב גיל" class="h-10 w-auto">
                </a>
                <a href="index.html" title="דף הבית">
                    <img src="images/Yaniv-Gil-Law-Office-Notary_text.avif" alt="משרד עו״ד יניב גיל ושות׳" class="h-8 w-auto">
                </a>
            </div>
            <button id="close-mobile-menu" class="text-gray-500 hover:text-gray-700 min-w-[48px] min-h-[48px] flex items-center justify-center" aria-label="סגור תפריט נייד">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <nav class="p-6">
            <ul class="space-y-4">
                <li><a href="index.html" title="דף הבית" class="block text-lg text-gray-800 hover:text-[#b8941f] transition-colors duration-200 mobile-menu-link">בית</a></li>
                <li><a href="index.html#about" title="אודות המשרד" class="block text-lg text-gray-800 hover:text-[#b8941f] transition-colors duration-200 mobile-menu-link">אודות המשרד</a></li>
                <li><a href="attorneys.html" title="עורכי דין" class="block text-lg text-gray-800 hover:text-[#b8941f] transition-colors duration-200 mobile-menu-link">עורכי דין</a></li>
                <li>
                    <button onclick="toggleNavDropdown('mobile-practice-dropdown')" class="block w-full text-right text-lg text-gray-800 hover:text-[#b8941f] transition-colors duration-200 mobile-menu-link" style="background: #1a1a1a; color: #c9a55c; border: none; cursor: pointer; padding: 1rem; text-align: right; font-size: 1.125rem; line-height: 1.75rem;">תחומי התמחות <span style="margin-right: 0.5rem;">▼</span></button>
                    <div id="mobile-practice-dropdown" class="hidden w-full mt-2" style="background: #2a2a2a; padding: 1rem; border-radius: 8px;">
                        <div style="margin-bottom: 12px; display: block !important; visibility: visible !important;">
                            <button onclick="toggleCategoryDropdown('mobile-category-family', event)" style="display: flex !important; visibility: visible !important; opacity: 1 !important; width: 100% !important; background-color: #1a1a1a !important; color: #c9a55c !important; border: 2px solid #c9a55c !important; border-radius: 8px !important; padding: 14px 16px !important; font-size: 16px !important; font-weight: bold !important; text-align: right !important; justify-content: space-between !important; align-items: center !important; cursor: pointer !important;">
                                <span style="color: #c9a55c !important; visibility: visible !important; opacity: 1 !important;">דיני משפחה</span>
                                <span style="color: #c9a55c !important; visibility: visible !important; opacity: 1 !important;">▼</span>
                            </button>
                            <div id="mobile-category-family" class="hidden mt-2 pr-4">
                                <a href="divorce.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">גירושין</a>
                                <a href="divorce-agreements.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">הסכמי גירושין</a>
                                <a href="property-agreements.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">הסכמי ממון</a>
                                <a href="child-custody.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">משמורת ילדים</a>
                                <a href="visitation-rights.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">זמני שהות</a>
                                <a href="child-support.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">מזונות ילדים</a>
                                <a href="spousal-support.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">מזונות אישה</a>
                                <a href="guardianship.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">אפוטרופסות</a>
                            </div>
                        </div>
                        <div style="margin-bottom: 12px; display: block !important; visibility: visible !important;">
                            <button onclick="toggleCategoryDropdown('mobile-category-inheritance', event)" style="display: flex !important; visibility: visible !important; opacity: 1 !important; width: 100% !important; background-color: #1a1a1a !important; color: #c9a55c !important; border: 2px solid #c9a55c !important; border-radius: 8px !important; padding: 14px 16px !important; font-size: 16px !important; font-weight: bold !important; text-align: right !important; justify-content: space-between !important; align-items: center !important; cursor: pointer !important;">
                                <span style="color: #c9a55c !important; visibility: visible !important; opacity: 1 !important;">ירושות וצוואות</span>
                                <span style="color: #c9a55c !important; visibility: visible !important; opacity: 1 !important;">▼</span>
                            </button>
                            <div id="mobile-category-inheritance" class="hidden mt-2 pr-4">
                                <a href="will-writing.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">עריכת צוואה</a>
                                <a href="inheritance-order.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">צו ירושה</a>
                                <a href="will-probate.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">צו קיום צוואה</a>
                                <a href="estate-management.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">ניהול עיזבון</a>
                                <a href="will-contest.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">התנגדות לצוואה</a>
                                <a href="inheritance-contest.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">התנגדות לצו ירושה</a>
                            </div>
                        </div>
                        <div style="margin-bottom: 12px; display: block !important; visibility: visible !important;">
                            <button onclick="toggleCategoryDropdown('mobile-category-bankruptcy', event)" style="display: flex !important; visibility: visible !important; opacity: 1 !important; width: 100% !important; background-color: #1a1a1a !important; color: #c9a55c !important; border: 2px solid #c9a55c !important; border-radius: 8px !important; padding: 14px 16px !important; font-size: 16px !important; font-weight: bold !important; text-align: right !important; justify-content: space-between !important; align-items: center !important; cursor: pointer !important;">
                                <span style="color: #c9a55c !important; visibility: visible !important; opacity: 1 !important;">חדלות פירעון והוצאה לפועל</span>
                                <span style="color: #c9a55c !important; visibility: visible !important; opacity: 1 !important;">▼</span>
                            </button>
                            <div id="mobile-category-bankruptcy" class="hidden mt-2 pr-4">
                                <a href="bankruptcy.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">חדלות פירעון / פשיטת רגל</a>
                                <a href="execution.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">הוצאה לפועל</a>
                                <a href="case-consolidation.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">איחוד תיקים</a>
                                <a href="travel-restriction.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">עיכוב יציאה מהארץ</a>
                                <a href="debt-cancellation.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">מחיקת חובות</a>
                                <a href="lien-cancellation.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">ביטול עיקולים</a>
                                <a href="debt-arrangements.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">הסדרי חוב</a>
                                <a href="discharge.html" class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">קבלת הפטר</a>
                            </div>
                        </div>
                        <!-- דיני חוזים ודיני מקרקעין - Direct Link (No Collapse) -->
                        <div class="mb-2">
                            <a href="practice-areas.html#civil-law" class="block w-full text-right py-3 px-4 text-white font-bold text-base bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                                דיני חוזים ודיני מקרקעין
                            </a>
                        </div>
                    </div>
                </li>
                <li><a href="articles.html" title="פרסומים מקצועיים" class="block text-lg text-gray-800 hover:text-[#b8941f] transition-colors duration-200 mobile-menu-link">פרסומים מקצועיים</a></li>
                <li><a href="blog.html" title="בלוג" class="block text-lg text-gray-800 hover:text-[#b8941f] transition-colors duration-200 mobile-menu-link">בלוג</a></li>
                <li><a href="media.html" class="block text-lg text-gray-800 hover:text-[#b8941f] transition-colors duration-200 mobile-menu-link">מדיה</a></li>
                <li><a href="contact.html" title="צור קשר" class="block text-lg text-gray-800 hover:text-[#b8941f] transition-colors duration-200 mobile-menu-link">צור קשר</a></li>
            </ul>
            <div class="mt-8">
                <a class="block w-full text-center py-3 px-4 bg-[#1a1a1a] text-[#b8941f] border border-[#b8941f] rounded-full hover:bg-[#b8941f] hover:text-[#1a1a1a] transition-colors duration-200" href="tel:0548184581" title="התקשר 054-8184581">התקשר עכשיו</a>
            </div>
        </nav>
    </div>'''

# JavaScript functions needed for dropdown functionality
DROPDOWN_JS = '''
        // Navigation dropdown functionality
        function toggleNavDropdown(dropdownId) {
            const dropdown = document.getElementById(dropdownId);
            if (!dropdown) return;

            // Close all other dropdowns
            const allDropdowns = document.querySelectorAll('[id$="-dropdown"]');
            allDropdowns.forEach(dd => {
                if (dd.id !== dropdownId) {
                    dd.classList.add('hidden');
                }
            });

            // Toggle current dropdown
            const isHidden = dropdown.classList.contains('hidden');
            if (isHidden) {
                dropdown.classList.remove('hidden');
            } else {
                dropdown.classList.add('hidden');
            }
        }

        // Category dropdown functionality (nested collapse)
        function toggleCategoryDropdown(categoryId, event) {
            if (event) event.stopPropagation();
            const category = document.getElementById(categoryId);
            if (!category) return;

            // Toggle category
            if (category.classList.contains('hidden')) {
                category.classList.remove('hidden');
            } else {
                category.classList.add('hidden');
            }
        }
'''

# Get all HTML files
html_files = glob.glob('*.html')

updated_count = 0
skipped_count = 0

for html_file in html_files:
    # Skip backup files and special files
    if any(x in html_file for x in ['backup', 'temp', 'old', 'before', 'check', 'full-content', 'blog-with', '404', 'thanks']):
        skipped_count += 1
        continue

    # Skip index.html as it's the source
    if html_file == 'index.html':
        print(f"Skipping source file: {html_file}")
        continue

    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        modified = False

        # Check if file has any mobile menu
        if 'id="mobile-menu"' in content:
            # Try multiple patterns to find and replace the mobile menu

            # Pattern 1: OLD STYLE - Simple mobile menu with mobile-menu-content
            # <!-- Full-screen Mobile Menu Overlay -->
            # <div id="mobile-menu" class="mobile-menu-overlay">
            #     <button id="close-mobile-menu" class="mobile-menu-close">&times;</button>
            #     <div class="mobile-menu-content">
            #         <div class="mobile-menu-links">
            #             <a href="..." class="mobile-menu-link">...</a>
            #         </div>
            #     </div>
            # </div>
            old_pattern = r'(<!-- Full-screen Mobile Menu Overlay -->|<!-- Mobile Menu Overlay -->|<!-- Mobile Menu -->)?\s*<div id="mobile-menu" class="mobile-menu-overlay">\s*<button id="close-mobile-menu"[^>]*>[^<]*</button>\s*<div class="mobile-menu-content">\s*<div class="mobile-menu-links">.*?</div>\s*</div>\s*</div>'

            match = re.search(old_pattern, content, re.DOTALL)
            if match:
                content = content[:match.start()] + FULL_MOBILE_MENU + content[match.end():]
                modified = True
                print(f"Replaced OLD mobile menu in: {html_file}")
            else:
                # Pattern 2: NEW STYLE with nav structure (like index.html)
                new_pattern = r'<!-- Mobile Menu -->\s*<div id="mobile-menu" class="mobile-menu-overlay">.*?</nav>\s*</div>'
                match = re.search(new_pattern, content, re.DOTALL)
                if match:
                    # Check if it's already the full version
                    if 'mobile-practice-dropdown' not in match.group():
                        content = content[:match.start()] + FULL_MOBILE_MENU + content[match.end():]
                        modified = True
                        print(f"Replaced NEW style mobile menu in: {html_file}")
                    else:
                        print(f"Already has full mobile menu: {html_file}")

        # Check if we need to add the dropdown JS functions
        if 'function toggleNavDropdown' not in content:
            # Find a good place to add the JS
            # Look for the mobile menu JS section or just before </script>
            if 'DOMContentLoaded' in content and 'mobileMenu' in content.lower():
                # Find the end of the mobile menu JS section
                dom_loaded_match = re.search(r"document\.addEventListener\('DOMContentLoaded'[^}]*\}\);", content, re.DOTALL)
                if dom_loaded_match:
                    insert_pos = dom_loaded_match.end()
                    content = content[:insert_pos] + DROPDOWN_JS + content[insert_pos:]
                    if modified:
                        print(f"  Added dropdown JS functions")
                    modified = True

        if modified:
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1
        else:
            if 'mobile-practice-dropdown' in content and 'toggleNavDropdown' in content:
                print(f"Already complete: {html_file}")
            elif 'id="mobile-menu"' not in content:
                print(f"No mobile menu found: {html_file}")
            else:
                print(f"Could not match pattern in: {html_file}")

    except Exception as e:
        print(f"Error processing {html_file}: {e}")

print(f"\n=== Summary ===")
print(f"Updated: {updated_count} files")
print(f"Skipped: {skipped_count} files")
