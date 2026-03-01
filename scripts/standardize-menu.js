const fs = require('fs');
const path = require('path');

// The standardized navigation menu HTML (from index.html)
const standardNavMenu = `<nav class="hidden md:flex flex-1 justify-center" role="navigation" aria-label="תפריט ראשי">
                <ul class="flex gap-6 list-none m-0 p-0 text-gray-600 font-medium">
                    <li><a href="index.html" title="דף הבית" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">בית</a></li>
                    <li><a href="index.html#about" title="אודות המשרד" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">אודות המשרד</a></li>
                    <li><a href="attorneys.html" title="עורכי דין" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">עורכי דין</a></li>
                    <li class="relative group">
                        <button onclick="toggleNavDropdown('practice-dropdown')" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">תחומי התמחות <span class="mr-2 text-xs">▼</span></button>
                        <div id="practice-dropdown" class="hidden absolute top-full mt-2 right-0 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2" style="max-height: calc(100vh - 120px); overflow-y: auto;">
                            <!-- דיני משפחה - highlighted -->
                            <div class="border-b border-gray-200 bg-amber-50">
                                <button onclick="toggleCategoryDropdown('category-family', event)" class="w-full px-4 py-3 flex items-center justify-between text-right hover:bg-amber-100" style="background: linear-gradient(90deg, #fef3c7, #fff);"><h4 class="font-bold text-[#b8941f] text-sm">דיני משפחה וגירושין</h4><span class="category-icon text-lg text-[#c9a55c] font-bold">▼</span></button>
                                <div id="category-family" class="hidden">
                                    <a href="divorce-guide.html" class="block px-4 py-2 pr-6 text-sm text-[#b8941f] font-bold hover:bg-amber-100 text-right border-b border-gray-100">★ המדריך המלא לגירושין</a>
                                    <div class="pillar-item border-b border-gray-100"><div class="flex items-center justify-between pr-6 hover:bg-gray-50"><a href="heskem-gerushin.html" class="flex-1 py-2 text-sm text-gray-700 hover:text-[#b8941f] font-medium">הסכם גירושין</a><button onclick="toggleSubCategory('sub-heskem-gerushin', event)" class="px-3 py-2 text-lg text-[#c9a55c] font-bold hover:text-[#b8941f]">▼</button></div><div id="sub-heskem-gerushin" class="hidden bg-gray-50 pr-10 py-1"><a href="mahu-heskem-gerushin.html" class="block py-1.5 px-4 text-xs text-gray-600 hover:text-[#b8941f]">מהו הסכם גירושין</a><a href="shlvei-heskem-gerushin.html" class="block py-1.5 px-4 text-xs text-gray-600 hover:text-[#b8941f]">שלבי הסכם</a><a href="seifim-hova-heskem.html" class="block py-1.5 px-4 text-xs text-gray-600 hover:text-[#b8941f]">סעיפי חובה</a></div></div>
                                    <div class="pillar-item border-b border-gray-100"><div class="flex items-center justify-between pr-6 hover:bg-gray-50"><a href="gerushin-beit-din-rabani.html" class="flex-1 py-2 text-sm text-gray-700 hover:text-[#b8941f] font-medium">בית דין רבני</a><button onclick="toggleSubCategory('sub-beit-din', event)" class="px-3 py-2 text-lg text-[#c9a55c] font-bold hover:text-[#b8941f]">▼</button></div><div id="sub-beit-din" class="hidden bg-gray-50 pr-10 py-1"><a href="haget-mah-ze.html" class="block py-1.5 px-4 text-xs text-gray-600 hover:text-[#b8941f]">הגט - מה זה</a><a href="smchut-beit-din-rabani.html" class="block py-1.5 px-4 text-xs text-gray-600 hover:text-[#b8941f]">סמכות בית דין</a></div></div>
                                    <div class="pillar-item border-b border-gray-100"><div class="flex items-center justify-between pr-6 hover:bg-gray-50"><a href="mishmoret-yeladim.html" class="flex-1 py-2 text-sm text-gray-700 hover:text-[#b8941f] font-medium">משמורת ילדים</a><button onclick="toggleSubCategory('sub-mishmoret', event)" class="px-3 py-2 text-lg text-[#c9a55c] font-bold hover:text-[#b8941f]">▼</button></div><div id="sub-mishmoret" class="hidden bg-gray-50 pr-10 py-1"><a href="mishmoret-blaudit-vsmeshuteft.html" class="block py-1.5 px-4 text-xs text-gray-600 hover:text-[#b8941f]">בלעדית vs משותפת</a><a href="achrayut-horit.html" class="block py-1.5 px-4 text-xs text-gray-600 hover:text-[#b8941f]">אחריות הורית</a></div></div>
                                    <div class="pillar-item border-b border-gray-100"><div class="flex items-center justify-between pr-6 hover:bg-gray-50"><a href="mezonot-yeladim.html" class="flex-1 py-2 text-sm text-gray-700 hover:text-[#b8941f] font-medium">מזונות ילדים</a><button onclick="toggleSubCategory('sub-mezonot-yeladim', event)" class="px-3 py-2 text-lg text-[#c9a55c] font-bold hover:text-[#b8941f]">▼</button></div><div id="sub-mezonot-yeladim" class="hidden bg-gray-50 pr-10 py-1"><a href="chishov-mezonot-yeladim.html" class="block py-1.5 px-4 text-xs text-gray-600 hover:text-[#b8941f]">חישוב מזונות</a><a href="hafchatat-mezonot-yeladim.html" class="block py-1.5 px-4 text-xs text-gray-600 hover:text-[#b8941f]">הפחתת מזונות</a></div></div>
                                    <div class="pillar-item border-b border-gray-100"><div class="flex items-center justify-between pr-6 hover:bg-gray-50"><a href="mezonot-isha.html" class="flex-1 py-2 text-sm text-gray-700 hover:text-[#b8941f] font-medium">מזונות אישה</a><button onclick="toggleSubCategory('sub-mezonot-isha', event)" class="px-3 py-2 text-lg text-[#c9a55c] font-bold hover:text-[#b8941f]">▼</button></div><div id="sub-mezonot-isha" class="hidden bg-gray-50 pr-10 py-1"><a href="zkaut-mezonot-isha.html" class="block py-1.5 px-4 text-xs text-gray-600 hover:text-[#b8941f]">זכאות למזונות</a><a href="chishov-mezonot-isha.html" class="block py-1.5 px-4 text-xs text-gray-600 hover:text-[#b8941f]">חישוב מזונות</a></div></div>
                                    <div class="pillar-item border-b border-gray-100"><div class="flex items-center justify-between pr-6 hover:bg-gray-50"><a href="chalokat-rechush-gerushin.html" class="flex-1 py-2 text-sm text-gray-700 hover:text-[#b8941f] font-medium">חלוקת רכוש</a><button onclick="toggleSubCategory('sub-rechush', event)" class="px-3 py-2 text-lg text-[#c9a55c] font-bold hover:text-[#b8941f]">▼</button></div><div id="sub-rechush" class="hidden bg-gray-50 pr-10 py-1"><a href="izun-mashabim-gerushin.html" class="block py-1.5 px-4 text-xs text-gray-600 hover:text-[#b8941f]">איזון משאבים</a><a href="chalokat-dira-gerushin.html" class="block py-1.5 px-4 text-xs text-gray-600 hover:text-[#b8941f]">חלוקת דירה</a></div></div>
                                    <div class="pillar-item border-b border-gray-100"><div class="flex items-center justify-between pr-6 hover:bg-gray-50"><a href="heskem-mamon.html" class="flex-1 py-2 text-sm text-gray-700 hover:text-[#b8941f] font-medium">הסכם ממון</a><button onclick="toggleSubCategory('sub-mamon', event)" class="px-3 py-2 text-lg text-[#c9a55c] font-bold hover:text-[#b8941f]">▼</button></div><div id="sub-mamon" class="hidden bg-gray-50 pr-10 py-1"><a href="heskem-mamon-lifney-nisuin.html" class="block py-1.5 px-4 text-xs text-gray-600 hover:text-[#b8941f]">לפני נישואין</a><a href="hagana-al-esek.html" class="block py-1.5 px-4 text-xs text-gray-600 hover:text-[#b8941f]">הגנה על עסק</a></div></div>
                                    <div class="pillar-item border-b border-gray-100"><div class="flex items-center justify-between pr-6 hover:bg-gray-50"><a href="sarvanut-get-agunot.html" class="flex-1 py-2 text-sm text-gray-700 hover:text-[#b8941f] font-medium">סרבנות גט</a><button onclick="toggleSubCategory('sub-sarvanut', event)" class="px-3 py-2 text-lg text-[#c9a55c] font-bold hover:text-[#b8941f]">▼</button></div><div id="sub-sarvanut" class="hidden bg-gray-50 pr-10 py-1"><a href="klim-mishpatiyim-sarvan-get.html" class="block py-1.5 px-4 text-xs text-gray-600 hover:text-[#b8941f]">כלים משפטיים</a><a href="agunut-ma-laasot.html" class="block py-1.5 px-4 text-xs text-gray-600 hover:text-[#b8941f]">עגינות - מה לעשות</a></div></div>
                                    <div class="pillar-item border-b border-gray-100"><div class="flex items-center justify-between pr-6 hover:bg-gray-50"><a href="yaduyim-batzibur.html" class="flex-1 py-2 text-sm text-gray-700 hover:text-[#b8941f] font-medium">ידועים בציבור</a><button onclick="toggleSubCategory('sub-yaduyim', event)" class="px-3 py-2 text-lg text-[#c9a55c] font-bold hover:text-[#b8941f]">▼</button></div><div id="sub-yaduyim" class="hidden bg-gray-50 pr-10 py-1"><a href="zkuyot-yaduyim-batzibur.html" class="block py-1.5 px-4 text-xs text-gray-600 hover:text-[#b8941f]">זכויות</a><a href="heskem-yaduyim-batzibur.html" class="block py-1.5 px-4 text-xs text-gray-600 hover:text-[#b8941f]">הסכם חיים משותפים</a></div></div>
                                    <a href="divorce.html" class="block px-4 py-2 pr-6 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#b8941f] text-right">גירושין</a>
                                    <a href="guardianship.html" class="block px-4 py-2 pr-6 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#b8941f] text-right">אפוטרופסות</a>
                                    <a href="mediation.html" class="block px-4 py-2 pr-6 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#b8941f] text-right">גישור משפחתי</a>
                                </div>
                            </div>
                            <!-- ירושות וצוואות -->
                            <div class="border-b border-gray-200 mt-2">
                                <button onclick="toggleCategoryDropdown('category-inheritance', event)" class="w-full px-4 py-2 flex items-center justify-between text-right bg-white hover:bg-gray-50"><h4 class="font-bold text-[#1a1a1a] text-sm">ירושות וצוואות</h4><span class="category-icon text-lg text-[#c9a55c] font-bold">▼</span></button>
                                <div id="category-inheritance" class="hidden">
                                    <a href="will-writing.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#b8941f] text-right">עריכת צוואה</a>
                                    <a href="inheritance-order.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#b8941f] text-right">צו ירושה</a>
                                    <a href="will-probate.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#b8941f] text-right">צו קיום צוואה</a>
                                    <a href="estate-management.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#b8941f] text-right">ניהול עיזבון</a>
                                </div>
                            </div>
                            <!-- חדלות פירעון -->
                            <div class="border-b border-gray-200 mt-2">
                                <button onclick="toggleCategoryDropdown('category-bankruptcy', event)" class="w-full px-4 py-2 flex items-center justify-between text-right bg-white hover:bg-gray-50"><h4 class="font-bold text-[#1a1a1a] text-sm">חדלות פירעון והוצאה לפועל</h4><span class="category-icon text-lg text-[#c9a55c] font-bold">▼</span></button>
                                <div id="category-bankruptcy" class="hidden">
                                    <a href="bankruptcy.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#b8941f] text-right">חדלות פירעון / פשיטת רגל</a>
                                    <a href="execution.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#b8941f] text-right">הוצאה לפועל</a>
                                    <a href="debt-cancellation.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#b8941f] text-right">מחיקת חובות</a>
                                    <a href="discharge.html" class="block px-4 py-2 pr-8 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#b8941f] text-right">קבלת הפטר</a>
                                </div>
                            </div>
                            <div class="mt-2 bg-white"><a href="practice-areas.html#civil-law" class="block w-full px-4 py-2 text-right bg-white hover:bg-gray-50"><h4 class="font-bold text-[#1a1a1a] text-sm">דיני חוזים ודיני מקרקעין</h4></a></div>
                        </div>
                    </li>
                    <li><a href="articles.html" title="פרסומים מקצועיים" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">פרסומים מקצועיים</a></li>
                    <li><a href="blog.html" title="בלוג" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">בלוג</a></li>
                    <li><a href="https://www.lawreviews.co.il/provider/gil-yaniv#reviews" title="ביקורות מלקוחות" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0" target="_blank" rel="noopener">ביקורות מלקוחות</a></li>
                    <li><a href="contact.html" title="צור קשר" class="inline-flex items-center justify-center rounded-full border border-[#c9a55c] bg-[#1a1a1a] px-4 py-2 text-sm font-medium text-[#c9a55c] shadow-sm transition-all duration-300 hover:bg-[#c9a55c] hover:text-[#1a1a1a] focus:outline-none focus:ring-0">צור קשר</a></li>
                </ul>
            </nav>`;

// Get all HTML files in root directory
const rootDir = path.join(__dirname, '..');
const files = fs.readdirSync(rootDir)
    .filter(f => f.endsWith('.html') && !f.includes('staging'))
    .map(f => path.join(rootDir, f));

// Also add blog-articles folder
const blogDir = path.join(rootDir, 'blog-articles');
if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir)
        .filter(f => f.endsWith('.html'))
        .map(f => path.join(blogDir, f));
    files.push(...blogFiles);
}

let updatedCount = 0;
let skippedCount = 0;

files.forEach(filePath => {
    const fileName = path.basename(filePath);

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Pattern to match the nav element
        const navPattern = /<nav class="hidden md:flex[^>]*>[\s\S]*?<\/nav>/;

        if (navPattern.test(content)) {
            const originalContent = content;
            content = content.replace(navPattern, standardNavMenu);

            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`✓ Updated: ${fileName}`);
                updatedCount++;
            } else {
                console.log(`- Skipped (no change): ${fileName}`);
                skippedCount++;
            }
        } else {
            console.log(`⚠ No nav found: ${fileName}`);
            skippedCount++;
        }
    } catch (err) {
        console.error(`✗ Error processing ${fileName}: ${err.message}`);
    }
});

console.log(`\n=== Summary ===`);
console.log(`Updated: ${updatedCount} files`);
console.log(`Skipped: ${skippedCount} files`);
console.log(`Total: ${files.length} files processed`);
