#!/usr/bin/env python3
"""
Replace mobile menus on all pages with the full subcategory/pillar version from index.html.
This adds expandable pillar groups (mobile-pillar-group) to all pages.
"""

import os
import re
import glob

BASE_DIR = r"c:\Users\user\Desktop\yaniv"

# The full mobile menu HTML template (from index.html) for ROOT-level pages
MOBILE_MENU_ROOT = '''    <!-- Mobile Menu -->
    <div id="mobile-menu" class="mobile-menu-overlay">
        <div class="flex justify-between items-center p-6 border-b">
            <div class="flex items-center gap-2">
                <a href="index.html" title="דף הבית">
                    <img src="images/new-logo.png?v=2" alt="לוגו משרד עו״ד יניב גיל" style="height: 80px; width: auto;">
                </a>
            </div>
            <button id="close-mobile-menu"
                class="min-w-[48px] min-h-[48px] flex items-center justify-center" style="color: #c9a55c;"
                aria-label="סגור תפריט נייד">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <nav class="p-6">
            <ul class="space-y-4">
                <li><a href="index.html" title="דף הבית"
                        class="block text-lg text-gray-800 hover:text-[#b8941f] transition-colors duration-200 mobile-menu-link">בית</a>
                </li>
                <li><a href="index.html#about" title="אודות המשרד"
                        class="block text-lg text-gray-800 hover:text-[#b8941f] transition-colors duration-200 mobile-menu-link">אודות
                        המשרד</a></li>
                <li><a href="attorneys.html" title="עורכי דין"
                        class="block text-lg text-gray-800 hover:text-[#b8941f] transition-colors duration-200 mobile-menu-link">עורכי
                        דין</a></li>
                <li>
                    <button onclick="toggleNavDropdown('mobile-practice-dropdown')"
                        class="mobile-category-btn block w-full text-right text-lg">תחומי
                        התמחות <span class="mobile-category-chevron">▼</span></button>
                    <div id="mobile-practice-dropdown" class="hidden w-full mt-2 mobile-practice-container">
                        <div class="mb-3">
                            <button onclick="toggleCategoryDropdown('mobile-category-family', event)"
                                class="mobile-category-btn">
                                <span>דיני משפחה</span>
                                <span class="mobile-category-chevron">▼</span>
                            </button>
                            <div id="mobile-category-family" class="hidden mt-2 pr-4">
                                <a href="divorce-guide.html"
                                    class="block py-2 px-4 text-sm text-yellow-400 font-bold hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">המדריך
                                    המלא לגירושין</a>

                                <!-- Mobile: הסכם גירושין -->
                                <div class="mobile-pillar-group">
                                    <div class="flex items-center justify-between">
                                        <a href="heskem-gerushin.html"
                                            class="flex-1 py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c]">הסכם
                                            גירושין</a>
                                        <button onclick="toggleSubCategory('mobile-sub-heskem', event)"
                                            class="px-3 text-lg text-[#c9a55c] font-bold">▼</button>
                                    </div>
                                    <div id="mobile-sub-heskem" class="hidden pr-6 bg-gray-900 rounded">
                                        <a href="mahu-heskem-gerushin.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">מהו
                                            הסכם גירושין</a>
                                        <a href="shlvei-heskem-gerushin.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">שלבי
                                            הסכם</a>
                                        <a href="seifim-hova-heskem.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">סעיפי
                                            חובה</a>
                                    </div>
                                </div>

                                <!-- Mobile: בית דין רבני -->
                                <div class="mobile-pillar-group">
                                    <div class="flex items-center justify-between">
                                        <a href="gerushin-beit-din-rabani.html"
                                            class="flex-1 py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c]">בית דין
                                            רבני</a>
                                        <button onclick="toggleSubCategory('mobile-sub-beitdin', event)"
                                            class="px-3 text-lg text-[#c9a55c] font-bold">▼</button>
                                    </div>
                                    <div id="mobile-sub-beitdin" class="hidden pr-6 bg-gray-900 rounded">
                                        <a href="haget-mah-ze.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">הגט -
                                            מה זה</a>
                                        <a href="smchut-beit-din-rabani.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">סמכות
                                            בית דין</a>
                                        <a href="tahlich-gerushin-beit-din.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">תהליך
                                            גירושין</a>
                                    </div>
                                </div>

                                <!-- Mobile: משמורת ילדים -->
                                <div class="mobile-pillar-group">
                                    <div class="flex items-center justify-between">
                                        <a href="mishmoret-yeladim.html"
                                            class="flex-1 py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c]">משמורת
                                            ילדים</a>
                                        <button onclick="toggleSubCategory('mobile-sub-mishmoret', event)"
                                            class="px-3 text-lg text-[#c9a55c] font-bold">▼</button>
                                    </div>
                                    <div id="mobile-sub-mishmoret" class="hidden pr-6 bg-gray-900 rounded">
                                        <a href="mishmoret-blaudit-vsmeshuteft.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">בלעדית
                                            vs משותפת</a>
                                        <a href="achrayut-horit.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">אחריות
                                            הורית</a>
                                        <a href="horeh-menaker.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">הורה
                                            מנכר</a>
                                    </div>
                                </div>

                                <!-- Mobile: מזונות ילדים -->
                                <div class="mobile-pillar-group">
                                    <div class="flex items-center justify-between">
                                        <a href="mezonot-yeladim.html"
                                            class="flex-1 py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c]">מזונות
                                            ילדים</a>
                                        <button onclick="toggleSubCategory('mobile-sub-mezonot-y', event)"
                                            class="px-3 text-lg text-[#c9a55c] font-bold">▼</button>
                                    </div>
                                    <div id="mobile-sub-mezonot-y" class="hidden pr-6 bg-gray-900 rounded">
                                        <a href="chishov-mezonot-yeladim.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">חישוב
                                            מזונות</a>
                                        <a href="hafchatat-mezonot-yeladim.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">הפחתת
                                            מזונות</a>
                                        <a href="keren-mezonot.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">קרן
                                            מזונות</a>
                                    </div>
                                </div>

                                <!-- Mobile: מזונות אישה -->
                                <div class="mobile-pillar-group">
                                    <div class="flex items-center justify-between">
                                        <a href="mezonot-isha.html"
                                            class="flex-1 py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c]">מזונות
                                            אישה</a>
                                        <button onclick="toggleSubCategory('mobile-sub-mezonot-i', event)"
                                            class="px-3 text-lg text-[#c9a55c] font-bold">▼</button>
                                    </div>
                                    <div id="mobile-sub-mezonot-i" class="hidden pr-6 bg-gray-900 rounded">
                                        <a href="zkaut-mezonot-isha.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">זכאות
                                            למזונות</a>
                                        <a href="chishov-mezonot-isha.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">חישוב
                                            מזונות</a>
                                    </div>
                                </div>

                                <!-- Mobile: חלוקת רכוש -->
                                <div class="mobile-pillar-group">
                                    <div class="flex items-center justify-between">
                                        <a href="chalokat-rechush-gerushin.html"
                                            class="flex-1 py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c]">חלוקת
                                            רכוש</a>
                                        <button onclick="toggleSubCategory('mobile-sub-rechush', event)"
                                            class="px-3 text-lg text-[#c9a55c] font-bold">▼</button>
                                    </div>
                                    <div id="mobile-sub-rechush" class="hidden pr-6 bg-gray-900 rounded">
                                        <a href="izun-mashabim-gerushin.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">איזון
                                            משאבים</a>
                                        <a href="chalokat-dira-gerushin.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">חלוקת
                                            דירה</a>
                                        <a href="chalokat-pansiya-gerushin.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">חלוקת
                                            פנסיה</a>
                                    </div>
                                </div>

                                <!-- Mobile: הסכם ממון -->
                                <div class="mobile-pillar-group">
                                    <div class="flex items-center justify-between">
                                        <a href="heskem-mamon.html"
                                            class="flex-1 py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c]">הסכם
                                            ממון</a>
                                        <button onclick="toggleSubCategory('mobile-sub-mamon', event)"
                                            class="px-3 text-lg text-[#c9a55c] font-bold">▼</button>
                                    </div>
                                    <div id="mobile-sub-mamon" class="hidden pr-6 bg-gray-900 rounded">
                                        <a href="heskem-mamon-lifney-nisuin.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">לפני
                                            נישואין</a>
                                        <a href="hagana-al-esek.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">הגנה על
                                            עסק</a>
                                    </div>
                                </div>

                                <!-- Mobile: סרבנות גט -->
                                <div class="mobile-pillar-group">
                                    <div class="flex items-center justify-between">
                                        <a href="sarvanut-get-agunot.html"
                                            class="flex-1 py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c]">סרבנות
                                            גט</a>
                                        <button onclick="toggleSubCategory('mobile-sub-sarvanut', event)"
                                            class="px-3 text-lg text-[#c9a55c] font-bold">▼</button>
                                    </div>
                                    <div id="mobile-sub-sarvanut" class="hidden pr-6 bg-gray-900 rounded">
                                        <a href="klim-mishpatiyim-sarvan-get.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">כלים
                                            משפטיים</a>
                                        <a href="agunut-ma-laasot.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">עגינות
                                            - מה לעשות</a>
                                    </div>
                                </div>

                                <!-- Mobile: ידועים בציבור -->
                                <div class="mobile-pillar-group">
                                    <div class="flex items-center justify-between">
                                        <a href="yaduyim-batzibur.html"
                                            class="flex-1 py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c]">ידועים
                                            בציבור</a>
                                        <button onclick="toggleSubCategory('mobile-sub-yaduyim', event)"
                                            class="px-3 text-lg text-[#c9a55c] font-bold">▼</button>
                                    </div>
                                    <div id="mobile-sub-yaduyim" class="hidden pr-6 bg-gray-900 rounded">
                                        <a href="zkuyot-yaduyim-batzibur.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">זכויות</a>
                                        <a href="heskem-yaduyim-batzibur.html"
                                            class="block py-1.5 px-4 text-xs text-gray-400 hover:text-[#c9a55c]">הסכם
                                            חיים משותפים</a>
                                    </div>
                                </div>

                                <a href="divorce.html"
                                    class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">גירושין</a>
                                <a href="guardianship.html"
                                    class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">אפוטרופסות</a>
                                <a href="mediation.html"
                                    class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">גישור
                                    משפחתי</a>
                            </div>
                        </div>
                        <div class="mb-3">
                            <button onclick="toggleCategoryDropdown('mobile-category-inheritance', event)"
                                class="mobile-category-btn">
                                <span>ירושות וצוואות</span>
                                <span class="mobile-category-chevron">▼</span>
                            </button>
                            <div id="mobile-category-inheritance" class="hidden mt-2 pr-4">
                                <a href="will-writing.html"
                                    class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">עריכת
                                    צוואה</a>
                                <a href="inheritance-order.html"
                                    class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">צו
                                    ירושה</a>
                                <a href="will-probate.html"
                                    class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">צו
                                    קיום צוואה</a>
                                <a href="estate-management.html"
                                    class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">ניהול
                                    עיזבון</a>
                                <a href="will-contest.html"
                                    class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">התנגדות
                                    לצוואה</a>
                                <a href="inheritance-contest.html"
                                    class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">התנגדות
                                    לצו ירושה</a>
                            </div>
                        </div>
                        <div class="mb-3">
                            <button onclick="toggleCategoryDropdown('mobile-category-bankruptcy', event)"
                                class="mobile-category-btn">
                                <span>חדלות פירעון והוצאה לפועל</span>
                                <span class="mobile-category-chevron">▼</span>
                            </button>
                            <div id="mobile-category-bankruptcy" class="hidden mt-2 pr-4">
                                <a href="bankruptcy.html"
                                    class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">חדלות
                                    פירעון / פשיטת רגל</a>
                                <a href="execution.html"
                                    class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">הוצאה
                                    לפועל</a>
                                <a href="case-consolidation.html"
                                    class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">איחוד
                                    תיקים</a>
                                <a href="travel-restriction.html"
                                    class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">עיכוב
                                    יציאה מהארץ</a>
                                <a href="debt-cancellation.html"
                                    class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">מחיקת
                                    חובות</a>
                                <a href="lien-cancellation.html"
                                    class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">ביטול
                                    עיקולים</a>
                                <a href="debt-arrangements.html"
                                    class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">הסדרי
                                    חוב</a>
                                <a href="discharge.html"
                                    class="block py-2 px-4 text-sm text-gray-300 hover:text-[#c9a55c] hover:bg-gray-800 rounded transition-colors duration-200">קבלת
                                    הפטר</a>
                            </div>
                        </div>
                        <!-- דיני חוזים ודיני מקרקעין - Direct Link (No Collapse) -->
                        <div class="mb-3">
                            <a href="practice-areas.html#civil-law"
                                class="mobile-category-btn block w-full text-right">
                                דיני חוזים ודיני מקרקעין
                            </a>
                        </div>
                    </div>
                </li>
                <li><a href="articles.html" title="פרסומים מקצועיים"
                        class="block text-lg text-gray-800 hover:text-[#b8941f] transition-colors duration-200 mobile-menu-link">פרסומים
                        מקצועיים</a></li>
                <li><a href="blog.html" title="בלוג"
                        class="block text-lg text-gray-800 hover:text-[#b8941f] transition-colors duration-200 mobile-menu-link">בלוג</a>
                </li>
                <li><a href="contact.html" title="צור קשר"
                        class="block text-lg text-gray-800 hover:text-[#b8941f] transition-colors duration-200 mobile-menu-link">צור
                        קשר</a></li>
            </ul>
            <div class="mt-8">
                <a class="block w-full text-center py-3 px-4 bg-[#1a1a1a] text-[#b8941f] border border-[#b8941f] rounded-full hover:bg-[#b8941f] hover:text-[#1a1a1a] transition-colors duration-200"
                    href="tel:0548184581" title="התקשר 054-8184581">התקשר עכשיו</a>
            </div>
        </nav>
    </div>'''


def find_mobile_menu_div(content, start_pos):
    """Find the complete <div id="mobile-menu" ...>...</div> including nested divs."""
    # Find the opening tag
    div_start = content.find('<div id="mobile-menu"', start_pos)
    if div_start == -1:
        return None, None

    # Count nested divs to find matching close
    depth = 0
    i = div_start
    while i < len(content):
        if content[i:i+4] == '<div':
            depth += 1
        elif content[i:i+6] == '</div>':
            depth -= 1
            if depth == 0:
                return div_start, i + 6
        i += 1
    return None, None


def replace_mobile_menu(filepath, is_blog=False):
    """Replace mobile menu in a single file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Choose template based on whether it's a blog article
    if is_blog:
        # For blog articles, use ../ prefix for all internal links
        template = MOBILE_MENU_ROOT.replace('href="index.html', 'href="../index.html')
        template = template.replace('href="divorce-guide.html', 'href="../divorce-guide.html')
        template = template.replace('href="heskem-gerushin.html', 'href="../heskem-gerushin.html')
        template = template.replace('href="mahu-heskem-gerushin.html', 'href="../mahu-heskem-gerushin.html')
        template = template.replace('href="shlvei-heskem-gerushin.html', 'href="../shlvei-heskem-gerushin.html')
        template = template.replace('href="seifim-hova-heskem.html', 'href="../seifim-hova-heskem.html')
        template = template.replace('href="gerushin-beit-din-rabani.html', 'href="../gerushin-beit-din-rabani.html')
        template = template.replace('href="haget-mah-ze.html', 'href="../haget-mah-ze.html')
        template = template.replace('href="smchut-beit-din-rabani.html', 'href="../smchut-beit-din-rabani.html')
        template = template.replace('href="tahlich-gerushin-beit-din.html', 'href="../tahlich-gerushin-beit-din.html')
        template = template.replace('href="mishmoret-yeladim.html', 'href="../mishmoret-yeladim.html')
        template = template.replace('href="mishmoret-blaudit-vsmeshuteft.html', 'href="../mishmoret-blaudit-vsmeshuteft.html')
        template = template.replace('href="achrayut-horit.html', 'href="../achrayut-horit.html')
        template = template.replace('href="horeh-menaker.html', 'href="../horeh-menaker.html')
        template = template.replace('href="mezonot-yeladim.html', 'href="../mezonot-yeladim.html')
        template = template.replace('href="chishov-mezonot-yeladim.html', 'href="../chishov-mezonot-yeladim.html')
        template = template.replace('href="hafchatat-mezonot-yeladim.html', 'href="../hafchatat-mezonot-yeladim.html')
        template = template.replace('href="keren-mezonot.html', 'href="../keren-mezonot.html')
        template = template.replace('href="mezonot-isha.html', 'href="../mezonot-isha.html')
        template = template.replace('href="zkaut-mezonot-isha.html', 'href="../zkaut-mezonot-isha.html')
        template = template.replace('href="chishov-mezonot-isha.html', 'href="../chishov-mezonot-isha.html')
        template = template.replace('href="chalokat-rechush-gerushin.html', 'href="../chalokat-rechush-gerushin.html')
        template = template.replace('href="izun-mashabim-gerushin.html', 'href="../izun-mashabim-gerushin.html')
        template = template.replace('href="chalokat-dira-gerushin.html', 'href="../chalokat-dira-gerushin.html')
        template = template.replace('href="chalokat-pansiya-gerushin.html', 'href="../chalokat-pansiya-gerushin.html')
        template = template.replace('href="heskem-mamon.html', 'href="../heskem-mamon.html')
        template = template.replace('href="heskem-mamon-lifney-nisuin.html', 'href="../heskem-mamon-lifney-nisuin.html')
        template = template.replace('href="hagana-al-esek.html', 'href="../hagana-al-esek.html')
        template = template.replace('href="sarvanut-get-agunot.html', 'href="../sarvanut-get-agunot.html')
        template = template.replace('href="klim-mishpatiyim-sarvan-get.html', 'href="../klim-mishpatiyim-sarvan-get.html')
        template = template.replace('href="agunut-ma-laasot.html', 'href="../agunut-ma-laasot.html')
        template = template.replace('href="yaduyim-batzibur.html', 'href="../yaduyim-batzibur.html')
        template = template.replace('href="zkuyot-yaduyim-batzibur.html', 'href="../zkuyot-yaduyim-batzibur.html')
        template = template.replace('href="heskem-yaduyim-batzibur.html', 'href="../heskem-yaduyim-batzibur.html')
        template = template.replace('href="divorce.html', 'href="../divorce.html')
        template = template.replace('href="guardianship.html', 'href="../guardianship.html')
        template = template.replace('href="mediation.html', 'href="../mediation.html')
        template = template.replace('href="will-writing.html', 'href="../will-writing.html')
        template = template.replace('href="inheritance-order.html', 'href="../inheritance-order.html')
        template = template.replace('href="will-probate.html', 'href="../will-probate.html')
        template = template.replace('href="estate-management.html', 'href="../estate-management.html')
        template = template.replace('href="will-contest.html', 'href="../will-contest.html')
        template = template.replace('href="inheritance-contest.html', 'href="../inheritance-contest.html')
        template = template.replace('href="bankruptcy.html', 'href="../bankruptcy.html')
        template = template.replace('href="execution.html', 'href="../execution.html')
        template = template.replace('href="case-consolidation.html', 'href="../case-consolidation.html')
        template = template.replace('href="travel-restriction.html', 'href="../travel-restriction.html')
        template = template.replace('href="debt-cancellation.html', 'href="../debt-cancellation.html')
        template = template.replace('href="lien-cancellation.html', 'href="../lien-cancellation.html')
        template = template.replace('href="debt-arrangements.html', 'href="../debt-arrangements.html')
        template = template.replace('href="discharge.html', 'href="../discharge.html')
        template = template.replace('href="practice-areas.html', 'href="../practice-areas.html')
        template = template.replace('href="attorneys.html', 'href="../attorneys.html')
        template = template.replace('href="articles.html', 'href="../articles.html')
        template = template.replace('href="blog.html', 'href="../blog.html')
        template = template.replace('href="contact.html', 'href="../contact.html')
        template = template.replace('src="images/', 'src="../images/')
    else:
        template = MOBILE_MENU_ROOT

    replacements = 0

    # Find all mobile menu divs and replace them
    # First, handle the comment + div pattern
    # Remove any preceding comment like <!-- Mobile Menu --> or <!-- Full-screen Mobile Menu Overlay -->
    # Then replace the div

    # Strategy: find all <div id="mobile-menu" occurrences and replace each one
    search_pos = 0
    new_content = ""

    while True:
        div_start, div_end = find_mobile_menu_div(content, search_pos)
        if div_start is None:
            new_content += content[search_pos:]
            break

        # Check for preceding comment to also replace
        pre_text = content[max(0, div_start - 200):div_start]
        comment_match = re.search(r'<!--\s*(Mobile Menu|Full-screen Mobile Menu Overlay)[^>]*-->\s*$', pre_text)

        if comment_match:
            actual_start = div_start - len(pre_text) + comment_match.start()
        else:
            actual_start = div_start

        new_content += content[search_pos:actual_start]
        new_content += template
        search_pos = div_end
        replacements += 1

    content = new_content

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return replacements
    return 0


def main():
    # Process root-level HTML files (excluding index.html which already has the full menu)
    root_files = glob.glob(os.path.join(BASE_DIR, "*.html"))

    updated_root = 0
    skipped = []
    errors = []

    for filepath in sorted(root_files):
        filename = os.path.basename(filepath)
        # Skip index.html (already has full menu) and index-staging.html
        if filename in ('index.html', 'index-staging.html'):
            skipped.append(filename)
            continue

        try:
            count = replace_mobile_menu(filepath, is_blog=False)
            if count > 0:
                updated_root += 1
                print(f"  Updated: {filename} ({count} menu(s) replaced)")
            else:
                print(f"  No menu found: {filename}")
        except Exception as e:
            errors.append((filename, str(e)))
            print(f"  ERROR: {filename} - {e}")

    # Process blog-articles HTML files
    blog_dir = os.path.join(BASE_DIR, "blog-articles")
    blog_files = glob.glob(os.path.join(blog_dir, "*.html"))

    updated_blog = 0

    for filepath in sorted(blog_files):
        filename = os.path.basename(filepath)
        try:
            count = replace_mobile_menu(filepath, is_blog=True)
            if count > 0:
                updated_blog += 1
                print(f"  Updated blog: {filename} ({count} menu(s) replaced)")
            else:
                print(f"  No menu found blog: {filename}")
        except Exception as e:
            errors.append((f"blog-articles/{filename}", str(e)))
            print(f"  ERROR blog: {filename} - {e}")

    print(f"\n=== SUMMARY ===")
    print(f"Root-level pages updated: {updated_root}")
    print(f"Blog articles updated: {updated_blog}")
    print(f"Skipped: {skipped}")
    print(f"Errors: {len(errors)}")
    for fn, err in errors:
        print(f"  {fn}: {err}")


if __name__ == "__main__":
    main()
