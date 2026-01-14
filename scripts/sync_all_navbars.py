#!/usr/bin/env python3
"""
Sync BOTH desktop navbar (with dropdown) AND mobile menu from index.html to ALL pages.
This ensures complete consistency across the site.
"""

import glob
import re

# The correct DESKTOP navbar with dropdown from index.html
DESKTOP_NAV_WITH_DROPDOWN = '''<nav class="hidden md:flex flex-1 justify-center" role="navigation" aria-label="תפריט ראשי">
                <ul class="flex gap-6 list-none m-0 p-0 text-gray-600 font-medium">
                    <li><a href="index.html" title="דף הבית" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">בית</a></li>
                    <li><a href="index.html#about" title="אודות המשרד" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">אודות המשרד</a></li>
                    <li><a href="attorneys.html" title="עורכי דין" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">עורכי דין</a></li>
                    <li class="relative group">
                        <button onclick="toggleNavDropdown('practice-dropdown')" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">
                            תחומי התמחות
                            <span class="mr-2 text-xs">▼</span>
                        </button>
                        <div id="practice-dropdown" class="hidden absolute top-full mt-2 right-0 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2" style="max-height: calc(100vh - 120px); overflow-y: auto; overflow-x: hidden;">
                            <!-- דיני משפחה - Collapsible -->
                            <div class="border-b border-gray-200">
                                <button onclick="toggleCategoryDropdown('category-family', event)" class="w-full px-4 py-2 flex items-center justify-between text-right hover:bg-gray-50 transition-colors duration-200">
                                    <h4 class="font-bold text-[#1a1a1a] text-sm">דיני משפחה</h4>
                                    <span class="category-icon text-xs text-gray-500">▼</span>
                                </button>
                                <div id="category-family" class="hidden">
                                    <a href="divorce.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">גירושין</a>
                                    <a href="divorce-agreements.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">הסכמי גירושין</a>
                                    <a href="property-agreements.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">הסכמי ממון</a>
                                    <a href="child-custody.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">משמורת ילדים</a>
                                    <a href="visitation-rights.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">זמני שהות</a>
                                    <a href="child-support.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">מזונות ילדים</a>
                                    <a href="spousal-support.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">מזונות אישה</a>
                                    <a href="guardianship.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">אפוטרופסות</a>
                                </div>
                            </div>
                            <!-- ירושות וצוואות - Collapsible -->
                            <div class="border-b border-gray-200 mt-2">
                                <button onclick="toggleCategoryDropdown('category-inheritance', event)" class="w-full px-4 py-2 flex items-center justify-between text-right hover:bg-gray-50 transition-colors duration-200">
                                    <h4 class="font-bold text-[#1a1a1a] text-sm">ירושות וצוואות</h4>
                                    <span class="category-icon text-xs text-gray-500">▼</span>
                                </button>
                                <div id="category-inheritance" class="hidden">
                                    <a href="will-writing.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">עריכת צוואה</a>
                                    <a href="inheritance-order.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">צו ירושה</a>
                                    <a href="will-probate.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">צו קיום צוואה</a>
                                    <a href="estate-management.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">ניהול עיזבון</a>
                                    <a href="will-contest.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">התנגדות לצוואה</a>
                                    <a href="inheritance-contest.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">התנגדות לצו ירושה</a>
                                </div>
                            </div>
                            <!-- חדלות פירעון והוצאה לפועל - Collapsible -->
                            <div class="border-b border-gray-200 mt-2">
                                <button onclick="toggleCategoryDropdown('category-bankruptcy', event)" class="w-full px-4 py-2 flex items-center justify-between text-right hover:bg-gray-50 transition-colors duration-200">
                                    <h4 class="font-bold text-[#1a1a1a] text-sm">חדלות פירעון והוצאה לפועל</h4>
                                    <span class="category-icon text-xs text-gray-500">▼</span>
                                </button>
                                <div id="category-bankruptcy" class="hidden">
                                    <a href="bankruptcy.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">חדלות פירעון / פשיטת רגל</a>
                                    <a href="execution.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">הוצאה לפועל</a>
                                    <a href="case-consolidation.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">איחוד תיקים</a>
                                    <a href="travel-restriction.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">עיכוב יציאה מהארץ</a>
                                    <a href="debt-cancellation.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">מחיקת חובות</a>
                                    <a href="lien-cancellation.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">ביטול עיקולים</a>
                                    <a href="debt-arrangements.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">הסדרי חוב</a>
                                    <a href="discharge.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-[#c9a55c] hover:text-[#1a1a1a] transition-colors duration-200 text-right">קבלת הפטר</a>
                                </div>
                            </div>
                            <!-- דיני חוזים ודיני מקרקעין - Direct Link (No Collapse) -->
                            <div class="border-b border-gray-200 mt-2">
                                <a href="practice-areas.html#civil-law" class="block w-full px-4 py-2 flex items-center justify-between text-right hover:bg-gray-50 transition-colors duration-200">
                                    <h4 class="font-bold text-[#1a1a1a] text-sm">דיני חוזים ודיני מקרקעין</h4>
                                </a>
                            </div>
                        </div>
                    </li>
                    <li><a href="articles.html" title="פרסומים מקצועיים" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">פרסומים מקצועיים</a></li>
                    <li><a href="blog.html" title="בלוג" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">בלוג</a></li>
                    <li><a href="https://www.lawreviews.co.il/provider/gil-yaniv#reviews" title="ביקורות מלקוחות" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0" target="_blank" rel="noopener">ביקורות מלקוחות</a></li>
                    <li><a href="contact.html" title="צור קשר" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">צור קשר</a></li>
                </ul>
            </nav>'''

# CSS for desktop dropdown
DESKTOP_DROPDOWN_CSS = '''
        /* Desktop dropdown styles */
        #practice-dropdown {
            scrollbar-width: thin;
            scrollbar-color: #c9a55c #f3f4f6;
        }
        #practice-dropdown::-webkit-scrollbar {
            width: 6px;
        }
        #practice-dropdown::-webkit-scrollbar-track {
            background: #f3f4f6;
            border-radius: 3px;
        }
        #practice-dropdown::-webkit-scrollbar-thumb {
            background: #c9a55c;
            border-radius: 3px;
        }
        .category-icon {
            transition: transform 0.2s ease;
        }
        .category-icon.open {
            transform: rotate(180deg);
        }
'''

# JavaScript for desktop dropdown (category toggle)
DESKTOP_JS = '''
        // Desktop navigation dropdown functionality
        function toggleNavDropdown(dropdownId) {
            const dropdown = document.getElementById(dropdownId);
            if (!dropdown) return;

            // Close all other dropdowns first
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

        // Desktop category dropdown functionality (nested collapse)
        function toggleCategoryDropdown(categoryId, event) {
            if (event) event.stopPropagation();
            const category = document.getElementById(categoryId);
            if (!category) return;

            // Find the button that triggered this
            const button = event ? event.target.closest('button') : null;
            const icon = button ? button.querySelector('.category-icon') : null;

            // Toggle category
            if (category.classList.contains('hidden')) {
                category.classList.remove('hidden');
                if (icon) icon.classList.add('open');
            } else {
                category.classList.add('hidden');
                if (icon) icon.classList.remove('open');
            }
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', function(event) {
            const practiceButton = event.target.closest('button[onclick*="practice-dropdown"]');
            const practiceDropdown = document.getElementById('practice-dropdown');
            const mobileButton = event.target.closest('button[onclick*="mobile-practice-dropdown"]');
            const mobileDropdown = document.getElementById('mobile-practice-dropdown');

            if (!practiceButton && practiceDropdown && !practiceDropdown.contains(event.target)) {
                practiceDropdown.classList.add('hidden');
            }

            if (!mobileButton && mobileDropdown && !mobileDropdown.contains(event.target)) {
                mobileDropdown.classList.add('hidden');
            }
        });
'''

# Get all HTML files
html_files = glob.glob('*.html')

updated_count = 0

for html_file in html_files:
    # Skip backup files and special files
    if any(x in html_file for x in ['backup', 'temp', 'old', 'before', 'check', 'full-content', 'blog-with', '404', 'thanks', 'accessibility', 'terms', 'media', 'privacy']):
        continue

    # Skip index.html as it's the source
    if html_file == 'index.html':
        print(f"Skipping source file: {html_file}")
        continue

    try:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        modified = False

        # 1. Replace DESKTOP navbar
        if '<nav class="hidden md:flex' in content:
            # Check if it already has the dropdown
            if 'id="practice-dropdown"' not in content:
                # Pattern to find OLD desktop nav (without dropdown)
                # Matches: <nav class="hidden md:flex flex-1 justify-center"...>...<ul>...</ul>...</nav>
                old_nav_pattern = r'<nav class="hidden md:flex flex-1 justify-center"[^>]*>\s*<ul class="flex gap-6[^"]*"[^>]*>.*?</ul>\s*</nav>'

                match = re.search(old_nav_pattern, content, re.DOTALL)
                if match:
                    content = content[:match.start()] + DESKTOP_NAV_WITH_DROPDOWN + content[match.end():]
                    modified = True
                    print(f"Replaced desktop nav in: {html_file}")

        # 2. Add CSS for desktop dropdown if not present
        if modified and '#practice-dropdown' not in content:
            # Find </style> tag to insert CSS before it
            style_end = content.find('</style>')
            if style_end > 0:
                content = content[:style_end] + DESKTOP_DROPDOWN_CSS + '\n    ' + content[style_end:]
                print(f"  Added dropdown CSS")

        # 3. Replace/Update JavaScript functions
        if modified:
            # Remove old toggleNavDropdown and toggleCategoryDropdown if present
            content = re.sub(r'\s*// Navigation dropdown functionality for mobile menu\s*function toggleNavDropdown\(dropdownId\).*?function toggleCategoryDropdown\(categoryId, event\).*?\}\s*\}', '', content, flags=re.DOTALL)

            # Add our comprehensive JS before the last </script>
            if 'function toggleNavDropdown' not in content:
                body_pos = content.rfind('</body>')
                if body_pos > 0:
                    last_script_end = content.rfind('</script>', 0, body_pos)
                    if last_script_end > 0:
                        content = content[:last_script_end] + DESKTOP_JS + '\n    ' + content[last_script_end:]
                        print(f"  Added dropdown JS")

        if modified:
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1
        else:
            if 'id="practice-dropdown"' in content:
                print(f"Already has dropdown: {html_file}")
            else:
                print(f"No desktop nav found: {html_file}")

    except Exception as e:
        print(f"Error processing {html_file}: {e}")

print(f"\n=== Summary ===")
print(f"Updated: {updated_count} files")
