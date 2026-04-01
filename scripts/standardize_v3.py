src="/js/import os
import re

root = r"c:\Users\user\Desktop\yaniv"
html_files = [f for f in os.listdir(root) if f.endswith('.html')]

# 1. Define the Premium Header Template
HEADER_TEMPLATE = """
    <header class="site-header fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out py-2 shadow-md" style="background-color: #1a1a2e;" role="banner" id="site-header">
        <div class="container mx-auto px-4 flex justify-between items-center transition-all duration-300 ease-in-out">
            <div style="display: flex; align-items: center; gap: 15px;">
                <a href="index.html" title="דף הבית">
                    <img src="images/new-logo.png?v=12" alt="לוגו משרד עו״ד יניב גיל" class="header-logo" style="margin-left: 10px; display: block;" loading="eager">
                </a>
                <a href="https://www.dunsguide.co.il/business?duns=532460057" target="_blank" rel="noopener noreferrer" class="duns-seal-link" title="Duns & Bradstreet Gold Seal">
                    <img src="images/duns_gold_v5.png" alt="Duns & Bradstreet Gold Seal" class="duns-seal" width="75" height="75">
                </a>
            </div>
            <nav class="hidden md:flex flex-1 justify-center" role="navigation" aria-label="תפריט ראשי">
                <ul class="flex gap-12 items-center list-none m-0 p-0 text-gray-300 font-medium">
                    <li><a href="index.html" title="דף הבית" class="text-lg font-bold transition-all duration-300 hover:opacity-80" style="color: #c9a55c;">בית</a></li>
                    <li><a href="index.html#about" title="אודות המשרד" class="text-lg font-bold transition-all duration-300 hover:opacity-80" style="color: #c9a55c;">אודות המשרד</a></li>
                    <li><a href="attorneys.html" title="עורכי דין" class="text-lg font-bold transition-all duration-300 hover:opacity-80" style="color: #c9a55c;">עורכי דין</a></li>
                    <li class="relative group flex items-center">
                        <button onclick="toggleNavDropdown('practice-dropdown')" class="text-lg font-bold transition-all duration-300 hover:opacity-80 inline-flex items-center" style="color: #c9a55c;">תחומי התמחות <span class="mr-2 text-xs">▼</span></button>
                        <div id="practice-dropdown" class="hidden absolute top-full mt-2 right-0 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2" style="max-height: calc(100vh - 120px); overflow-y: auto;">
                            <div class="megamenu-grid">
                                <div class="category-column">
                                    <div class="category-header"><button onclick="toggleCategoryDropdown('cat-family', event)"><h4>דיני משפחה וגירושין</h4><span class="category-icon">▼</span></button></div>
                                    <div id="cat-family" class="category-content">
                                        <a href="divorce-guide.html" class="menu-item-link featured-link">★ המדריך המלא לגירושין <span class="arrow-link">←</span></a>
                                        <div class="pillar-group">
                                            <div class="flex justify-between items-center"><a href="heskem-gerushin.html" class="menu-item-link">הסכם גירושין</a><button onclick="toggleSubCategory('sub-heskem', event)" class="px-2 text-gold">▼</button></div>
                                            <div id="sub-heskem" class="hidden pl-4 bg-navy-light rounded"><a href="mahu-heskem-gerushin.html" class="menu-item-link">מהו הסכם גירושין</a><a href="shlvei-heskem-gerushin.html" class="menu-item-link">שלבי הסכם</a><a href="seifim-hova-heskem.html" class="menu-item-link">סעיפי חובה</a></div>
                                        </div>
                                        <div class="pillar-group">
                                            <div class="flex justify-between items-center"><a href="gerushin-beit-din-rabani.html" class="menu-item-link">בית דין רבני</a><button onclick="toggleSubCategory('sub-beitdin', event)" class="px-2 text-gold">▼</button></div>
                                            <div id="sub-beitdin" class="hidden pl-4 bg-navy-light rounded"><a href="haget-mah-ze.html" class="menu-item-link">הגט - מה זה</a><a href="smchut-beit-din-rabani.html" class="menu-item-link">סמכות בית דין</a></div>
                                        </div>
                                        <a href="mishmoret-yeladim.html" class="menu-item-link">משמורת ילדים</a>
                                        <a href="mezonot-yeladim.html" class="menu-item-link">מזונות ילדים</a>
                                        <a href="mezonot-isha.html" class="menu-item-link">מזונות אישה</a>
                                        <a href="chalokat-rechush-gerushin.html" class="menu-item-link">חלוקת רכוש</a>
                                        <a href="heskem-mamon.html" class="menu-item-link">הסכם ממון</a>
                                        <a href="sarvanut-get-agunot.html" class="menu-item-link">סרבנות גט</a>
                                        <a href="yaduyim-batzibur.html" class="menu-item-link">ידועים בציבור</a>
                                    </div>
                                </div>
                                <div class="category-column">
                                    <div class="category-header"><button onclick="toggleCategoryDropdown('cat-inheritance', event)"><h4>ירושות וצוואות</h4><span class="category-icon">▼</span></button></div>
                                    <div id="cat-inheritance" class="category-content">
                                        <a href="will-writing.html" class="menu-item-link">עריכת צוואה</a>
                                        <a href="inheritance-order.html" class="menu-item-link">צו ירושה</a>
                                        <a href="will-probate.html" class="menu-item-link">צו קיום צוואה</a>
                                        <a href="estate-management.html" class="menu-item-link">ניהול עיזבון</a>
                                    </div>
                                    <div class="category-header mt-6"><button onclick="toggleCategoryDropdown('cat-bankruptcy', event)"><h4>חדלות פירעון</h4><span class="category-icon">▼</span></button></div>
                                    <div id="cat-bankruptcy" class="category-content">
                                        <a href="bankruptcy.html" class="menu-item-link">חדלות פירעון</a>
                                        <a href="execution.html" class="menu-item-link">הוצאה לפועל</a>
                                        <a href="debt-cancellation.html" class="menu-item-link">מחיקת חובות</a>
                                        <a href="discharge.html" class="menu-item-link">קבלת הפטר</a>
                                    </div>
                                    <div class="category-header mt-6"><a href="practice-areas.html#civil-law" class="menu-item-link" style="padding:0"><h4>מקרקעין וחוזים</h4></a></div>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li><a href="articles.html" title="פרסומים מקצועיים" class="text-lg font-bold transition-all duration-300 hover:opacity-80" style="color: #c9a55c;">פרסומים</a></li>
                    <li><a href="reviews.html" title="ביקורות מלקוחות" class="text-lg font-bold transition-all duration-300 hover:opacity-80" style="color: #c9a55c;">ביקורות</a></li>
                </ul>
            </nav>
            <div class="hidden lg:flex items-center gap-4">
                <a class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-5 py-3 text-base font-medium text-[#c9a55c] transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a]" href="tel:0548184581">התקשר עכשיו</a>
                <button id="mobile-menu-button" class="md:hidden flex items-center p-2 rounded-md text-[#c9a55c] hover:text-[#b8941f]">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
            </div>
            <!-- Mobile Toggle for tablets/smaller screens -->
            <button id="mobile-menu-button-real" class="md:hidden flex items-center p-2 text-[#c9a55c]">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
        </div>
        
        <!-- Mobile Menu Overlay -->
        <div id="mobile-menu" class="mobile-menu-overlay">
            <div class="flex justify-between items-center p-6 border-b border-gray-700 bg-navy">
                <img src="images/new-logo.png?v=12" alt="Logo" style="height: 60px; width: auto;">
                <button id="close-mobile-menu" class="text-gold"><svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <nav class="p-6 overflow-y-auto" style="max-height: calc(100vh - 100px);">
                <ul class="space-y-4 text-right" dir="rtl">
                    <li><a href="index.html" class="block text-2xl text-white">בית</a></li>
                    <li><a href="index.html#about" class="block text-2xl text-white">אודות המשרד</a></li>
                    <li><a href="attorneys.html" class="block text-2xl text-white">עורכי דין</a></li>
                    <li>
                        <button onclick="toggleNavDropdown('mobile-practice-dropdown')" class="flex justify-between items-center w-full text-2xl text-gold">תחומי התמחות <span>▼</span></button>
                        <div id="mobile-practice-dropdown" class="hidden mt-4 space-y-4 pr-4 border-r border-gold/20">
                            <div>
                                <button onclick="toggleCategoryDropdown('mob-cat-family', event)" class="flex justify-between items-center w-full text-xl text-white">דיני משפחה <span class="mobile-category-chevron">▼</span></button>
                                <div id="mob-cat-family" class="hidden mt-2 space-y-2 pr-4">
                                    <a href="divorce-guide.html" class="block text-gold font-bold">★ המדריך המלא לגירושין</a>
                                    <div class="flex justify-between items-center"><a href="heskem-gerushin.html" class="text-gray-300">הסכם גירושין</a><button onclick="toggleSubCategory('mob-sub-heskem', event)" class="text-gold">▼</button></div>
                                    <div id="mob-sub-heskem" class="hidden pl-4 text-sm text-gray-400 space-y-2"><a href="mahu-heskem-gerushin.html" class="block">מהו הסכם גירושין</a><a href="shlvei-heskem-gerushin.html" class="block">שלבי הסכם</a><a href="seifim-hova-heskem.html" class="block">סעיפי חובה</a></div>
                                    <div class="flex justify-between items-center"><a href="gerushin-beit-din-rabani.html" class="text-gray-300">בית דין רבני</a><button onclick="toggleSubCategory('mob-sub-beitdin', event)" class="text-gold">▼</button></div>
                                    <div id="mob-sub-beitdin" class="hidden pl-4 text-sm text-gray-400 space-y-2"><a href="haget-mah-ze.html" class="block">הגט - מה זה</a><a href="smchut-beit-din-rabani.html" class="block">סמכות בית דין</a></div>
                                    <a href="mishmoret-yeladim.html" class="block text-gray-300">משמורת ילדים</a>
                                    <a href="mezonot-yeladim.html" class="block text-gray-300">מזונות ילדים</a>
                                </div>
                            </div>
                            <div>
                                <button onclick="toggleCategoryDropdown('mob-cat-inheritance', event)" class="flex justify-between items-center w-full text-xl text-white">ירושות וצוואות <span class="mobile-category-chevron">▼</span></button>
                                <div id="mob-cat-inheritance" class="hidden mt-2 space-y-2 pr-4">
                                    <a href="will-writing.html" class="block text-gray-300">עריכת צוואה</a>
                                    <a href="inheritance-order.html" class="block text-gray-300">צו ירושה</a>
                                    <a href="will-probate.html" class="block text-gray-300">צו קיום צוואה</a>
                                </div>
                            </div>
                            <div>
                                <button onclick="toggleCategoryDropdown('mob-cat-bankruptcy', event)" class="flex justify-between items-center w-full text-xl text-white">חדלות פירעון <span class="mobile-category-chevron">▼</span></button>
                                <div id="mob-cat-bankruptcy" class="hidden mt-2 space-y-2 pr-4">
                                    <a href="bankruptcy.html" class="block text-gray-300">חדלות פירעון</a>
                                    <a href="execution.html" class="block text-gray-300">הוצאה לפועל</a>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li><a href="articles.html" class="block text-2xl text-white">פרסומים מקצועיים</a></li>
                    <li><a href="reviews.html" class="block text-2xl text-white">ביקורות מלקוחות</a></li>
                    <li><a href="contact.html" class="block text-2xl text-white">צור קשר</a></li>
                </ul>
                <div class="mt-10"><a href="tel:0548184581" class="block w-full text-center py-4 bg-gold text-navy font-bold rounded-xl text-xl">התקשר עכשיו</a></div>
            </nav>
        </div>
    </header>
"""

# Re-define Regexes
HEADER_RE = re.compile(r'<header.*?</header>', re.DOTALL)
SCRIPTS_RE = re.compile(r'<!-- Scripts -->.*?</body>|<!-- Scripts at the bottom -->.*?</body>|<script>.*?</script>(\s*<script.*?</script>)*\s*</body>', re.DOTALL)

for f in html_files:
    path = os.path.join(root, f)
    with open(path, 'r', encoding='utf-8', errors='replace') as file:
        content = file.read()
    
    # 1. Replace header
    content = HEADER_RE.sub(HEADER_TEMPLATE, content, count=1)
    
    # 2. Inject central JS logic
    new_scripts = """
    <script src="js/header-logic.js?v=12"></script>
    <script src="js/back-to-top.js?v=12"></script>
    <script src="js/progress-bar.js?v=12"></script>
    <script>
        // Smooth scroll for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        const yOffset = -96;
                        const y = targetElement.getBoundingClientRect().top + window.scrollY + yOffset;
                        window.scrollTo({top: y, behavior: 'smooth'});
                    }
                }
            });
        });

        function scrollToNextSection() {
            const mainContent = document.querySelector('main section:nth-child(2)');
            if (mainContent) {
                const yOffset = -96;
                const y = mainContent.getBoundingClientRect().top + window.scrollY + yOffset;
                window.scrollTo({top: y, behavior: 'smooth'});
            }
        }
        
        // Final Fix: The mobile menu button in the template
        const btnReal = document.getElementById('mobile-menu-button-real');
        const btnNav = document.getElementById('mobile-menu-button');
        const menu = document.getElementById('mobile-menu');
        const close = document.getElementById('close-mobile-menu');
        if(btnReal && menu) btnReal.onclick = () => menu.classList.add('active');
        if(btnNav && menu) btnNav.onclick = () => menu.classList.add('active');
        if(close && menu) close.onclick = () => menu.classList.remove('active');
    </script>
</body>"""

    if SCRIPTS_RE.search(content):
        content = SCRIPTS_RE.sub(new_scripts, content)
    else:
        content = content.replace('</body>', new_scripts)

    # 3. Handle index.html khusus: remove About link from hero
    if f == 'index.html':
        # Remove anything relating to "למד עוד על המשרד" button
        content = re.sub(r'<a[^>]*href="#about"[^>]*>למד עוד על המשרד</a>', '', content)
        # Handle variations of that button
        content = re.sub(r'<a[^>]*href="#about"[^>]*>אודות המשרד</a>', '', content)

    # 4. Global Hero Fixes
    content = content.replace('h-80vh', 'h-[90vh]')
    # Ensure has-hero-first is present
    if 'has-hero-first' not in content:
        content = content.replace('<main>', '<main class="has-hero-first">')
        content = content.replace('<main id="main-content">', '<main id="main-content" class="has-hero-first">')

    # 5. Fix Megamenu CSS inclusion
    if 'megamenu.css' not in content:
        content = content.replace('</head>', '    <link rel="stylesheet" href="css/megamenu.css?v=12">\n</head>')

    with open(path, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f"Standardized {f}")

print("Done.")
