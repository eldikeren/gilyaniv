const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// Get all HTML files
let files = fs.readdirSync(rootDir)
    .filter(f => f.endsWith('.html'))
    .map(f => path.join(rootDir, f));

// Add blog-articles
const blogDir = path.join(rootDir, 'blog-articles');
if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir)
        .filter(f => f.endsWith('.html'))
        .map(f => path.join(blogDir, f));
    files.push(...blogFiles);
}

let fixedCount = 0;

files.forEach(filePath => {
    const fileName = path.basename(filePath);

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // Skip if doesn't have the problematic pattern
        if (!content.includes('background-color: #1a1a1a')) {
            return;
        }

        const original = content;

        // Pattern to match the entire problematic CSS block (handles multiline and inline)
        // This matches from "/* Category dropdown buttons" to the closing of #mobile-practice-dropdown a:hover
        const pattern1 = /\/\* Category dropdown buttons[^\*]*\*\/[\s\S]*?#mobile-practice-dropdown a:hover\s*\{[^}]*\}/g;

        // Pattern for single-line compact CSS
        const pattern2 = /\.mobile-menu-overlay button\[onclick\*="toggleCategoryDropdown"\][^}]+background-color:\s*#1a1a1a[^}]+\}[\s\S]*?#mobile-practice-dropdown a:hover\s*\{[^}]*\}/g;

        // Pattern 3: Match individual lines with black background in mobile menu styles
        const pattern3 = /\.mobile-menu-overlay button\[onclick\*="toggleCategoryDropdown"\][^{]*\{[^}]*background-color:\s*#1a1a1a[^}]*\}/g;
        const pattern4 = /#mobile-practice-dropdown \.mb-2\s*>\s*button\s*\{[^}]*background-color:\s*#1a1a1a[^}]*\}/g;
        const pattern5 = /\.mobile-menu-overlay button\[onclick\*="toggleNavDropdown"\][^{]*\{[^}]*background:\s*#1a1a1a[^}]*\}/g;
        const pattern6 = /#mobile-practice-dropdown\s*\{[^}]*background:\s*#2a2a2a[^}]*\}/g;

        // Replace all patterns
        content = content.replace(pattern1, '/* Mobile menu styles - see css/mobile-menu.css */');
        content = content.replace(pattern2, '');
        content = content.replace(pattern3, '');
        content = content.replace(pattern4, '');
        content = content.replace(pattern5, '');
        content = content.replace(pattern6, '');

        // Clean up any remaining explicit black background rules
        content = content.replace(/background-color:\s*#1a1a1a\s*!important;/g, 'background-color: transparent !important;');
        content = content.replace(/background:\s*#2a2a2a\s*;/g, 'background: #fffef7;');
        content = content.replace(/background:\s*#1a1a1a\s*!important;/g, 'background: transparent !important;');

        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✓ Fixed: ${fileName}`);
            fixedCount++;
        }
    } catch (err) {
        console.error(`✗ Error ${fileName}: ${err.message}`);
    }
});

console.log(`\n=== Fixed ${fixedCount} files ===`);
