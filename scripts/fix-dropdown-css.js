const fs = require('fs');
const path = require('path');

// This script fixes the CSS selectors that are too broad and apply mobile styles to desktop dropdowns

// Get all HTML files in root directory
const rootDir = path.join(__dirname, '..');
const files = fs.readdirSync(rootDir)
    .filter(f => f.endsWith('.html') && !f.includes('staging') && !f.startsWith('yaniv-gil-php'))
    .map(f => path.join(rootDir, f));

// Add blog-articles folder
const blogDir = path.join(rootDir, 'blog-articles');
if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir)
        .filter(f => f.endsWith('.html'))
        .map(f => path.join(blogDir, f));
    files.push(...blogFiles);
}

console.log(`Processing ${files.length} files...`);

let updatedCount = 0;

files.forEach(filePath => {
    const fileName = path.basename(filePath);

    try {
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;

        // Pattern 1: Remove the problematic CSS block that targets ALL toggleCategoryDropdown buttons
        // This pattern applies gold/border styling to desktop buttons which should be white
        content = content.replace(
            /\/\* CRITICAL: Force 2nd hierarchy category buttons to be visible \*\/\s*#mobile-practice-dropdown \.mb-2>button,\s*\.mobile-menu-overlay \.mb-2>button,\s*button\[onclick\*="toggleCategoryDropdown"\] \{[^}]+\}\s*#mobile-practice-dropdown \.mb-2>button span,\s*\.mobile-menu-overlay \.mb-2>button span,\s*button\[onclick\*="toggleCategoryDropdown"\] span \{[^}]+\}/g,
            `/* Category dropdown styling - Mobile only */
        .mobile-menu-overlay button[onclick*="toggleCategoryDropdown"],
        #mobile-practice-dropdown .mb-2>button {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
            width: 100% !important;
            padding: 0.75rem 1rem !important;
            background-color: #2d2d2d !important;
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
            visibility: visible !important;
            opacity: 1 !important;
        }`
        );

        // Pattern 2: Remove standalone button[onclick*="toggleCategoryDropdown"] rules without mobile prefix
        // This catches any remaining problematic patterns
        content = content.replace(
            /\n\s*button\[onclick\*="toggleCategoryDropdown"\]\s*\{[^}]+\}/g,
            ''
        );

        // Pattern 3: Fix .mobile-menu-links backgrounds from #1a1a1a to a proper mobile dark
        content = content.replace(
            /\.mobile-menu-links a \{\s*display: block;\s*padding: 1rem;\s*background: #1a1a1a;/g,
            '.mobile-menu-links a {\n            display: block;\n            padding: 1rem;\n            background: #2d2d2d;'
        );

        content = content.replace(
            /\.mobile-menu-links button\.mobile-menu-link,\s*nav button\.mobile-menu-link \{\s*display: block;\s*padding: 1rem;\s*background: #1a1a1a;/g,
            '.mobile-menu-links button.mobile-menu-link,\n        nav button.mobile-menu-link {\n            display: block;\n            padding: 1rem;\n            background: #2d2d2d;'
        );

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
