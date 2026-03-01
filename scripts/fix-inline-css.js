const fs = require('fs');
const path = require('path');

// Pattern to match the problematic inline CSS block
const cssPatterns = [
    // Pattern 1: Category dropdown buttons with black backgrounds
    /\/\* Category dropdown buttons[^]*?#mobile-practice-dropdown a:hover \{[^}]+\}/g,
    // Pattern 2: Alternative patterns
    /\.mobile-menu-overlay button\[onclick\*="toggleCategoryDropdown"\][^}]+\}[^]*?#mobile-practice-dropdown a:hover \{[^}]+\}/g
];

// Simpler approach: Replace the specific block
const oldCssBlock = `/* Category dropdown buttons - 2nd hierarchy - MUST be visible */
        .mobile-menu-overlay button[onclick*="toggleCategoryDropdown"],
        #mobile-practice-dropdown .mb-2>button {
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
        #mobile-practice-dropdown .mb-2>button span {
            color: #c9a55c !important;
        }

        .mobile-menu-overlay button[onclick*="toggleCategoryDropdown"]:hover,
        #mobile-practice-dropdown .mb-2>button:hover {
            background-color: #c9a55c !important;
            color: #1a1a1a !important;
        }

        .mobile-menu-overlay button[onclick*="toggleCategoryDropdown"]:hover span,
        #mobile-practice-dropdown .mb-2>button:hover span {
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
            color: #e5e7eb !important;
        }

        #mobile-practice-dropdown a:hover {
            color: #c9a55c !important;
            background: #3a3a3a !important;
        }`;

const newCssBlock = `/* Mobile menu styles moved to css/mobile-menu.css */`;

// Alternative block pattern (slightly different formatting)
const altCssBlock = `.mobile-menu-overlay button[onclick*="toggleCategoryDropdown"], #mobile-practice-dropdown .mb-2 > button { display: flex !important; width: 100% !important; padding: 0.75rem 1rem !important; background-color: #1a1a1a !important; color: #c9a55c !important; border: 1px solid #c9a55c !important; border-radius: 0.5rem !important; font-size: 1rem !important; font-weight: 600 !important; text-align: right !important; cursor: pointer !important; justify-content: space-between !important; align-items: center !important; }
        .mobile-menu-overlay button[onclick*="toggleCategoryDropdown"] span, #mobile-practice-dropdown .mb-2 > button span { color: #c9a55c !important; }
        .mobile-menu-overlay button[onclick*="toggleCategoryDropdown"]:hover, #mobile-practice-dropdown .mb-2 > button:hover { background-color: #c9a55c !important; color: #1a1a1a !important; }
        .mobile-menu-overlay button[onclick*="toggleCategoryDropdown"]:hover span, #mobile-practice-dropdown .mb-2 > button:hover span { color: #1a1a1a !important; }
        .mobile-menu-overlay button[onclick*="toggleNavDropdown"] { display: block !important; width: 100% !important; padding: 1rem !important; background: #1a1a1a !important; color: #c9a55c !important; border: none !important; border-radius: 5px !important; font-size: 1.125rem !important; text-align: right !important; cursor: pointer !important; }
        #mobile-practice-dropdown { background: #2a2a2a; padding: 1rem; border-radius: 0.5rem; margin-top: 0.5rem; }
        #mobile-practice-dropdown a { color: #d1d5db !important; }
        #mobile-practice-dropdown a:hover { color: #c9a55c !important; background: rgba(201, 165, 92, 0.1) !important; }`;

// Get all HTML files
const rootDir = path.join(__dirname, '..');
const files = fs.readdirSync(rootDir)
    .filter(f => f.endsWith('.html') && !f.includes('staging'))
    .map(f => path.join(rootDir, f));

// Add blog-articles
const blogDir = path.join(rootDir, 'blog-articles');
if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir)
        .filter(f => f.endsWith('.html'))
        .map(f => path.join(blogDir, f));
    files.push(...blogFiles);
}

let updatedCount = 0;

files.forEach(filePath => {
    const fileName = path.basename(filePath);

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // Try to replace the CSS block
        if (content.includes('background-color: #1a1a1a !important') &&
            content.includes('toggleCategoryDropdown')) {

            // Replace the long format
            content = content.replace(oldCssBlock, newCssBlock);

            // Also replace the compact format
            content = content.replace(altCssBlock, newCssBlock);

            // Use regex for any remaining variations
            content = content.replace(
                /\.mobile-menu-overlay button\[onclick\*="toggleCategoryDropdown"\][^{]*\{[^}]*background-color: #1a1a1a[^}]*\}[\s\S]*?#mobile-practice-dropdown a:hover \{[^}]+\}/g,
                newCssBlock
            );
        }

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✓ Fixed: ${fileName}`);
            updatedCount++;
        }
    } catch (err) {
        console.error(`✗ Error: ${fileName}: ${err.message}`);
    }
});

console.log(`\n=== Summary ===`);
console.log(`Fixed: ${updatedCount} files`);
