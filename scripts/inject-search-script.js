/**
 * Inject search script tag into all HTML pages.
 * Adds <script src="/js/site-search.js" defer></script> before </body>.
 * Idempotent — skips files that already have it.
 * Run: node scripts/inject-search-script.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SCRIPT_TAG = '<script src="/js/site-search.js" defer></script>';

// Files to skip (utility pages that don't need search)
const SKIP_FILES = new Set([
  'og-image-generator.html',
  'og-image-template.html',
  'index-staging.html',
]);

let modified = 0;
let skipped = 0;
let alreadyHas = 0;

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  if (content.includes('site-search.js')) {
    alreadyHas++;
    return;
  }

  if (!content.includes('</body>')) {
    console.log('  SKIP (no </body>):', path.relative(ROOT_DIR, filePath));
    skipped++;
    return;
  }

  const updated = content.replace('</body>', SCRIPT_TAG + '\n</body>');
  fs.writeFileSync(filePath, updated, 'utf-8');
  modified++;
}

function processDirectory(dir, subdir) {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  for (const file of files) {
    if (SKIP_FILES.has(file)) {
      skipped++;
      continue;
    }
    processFile(path.join(dir, file));
  }
}

// Process root HTML files
processDirectory(ROOT_DIR);

// Process blog-articles
const blogDir = path.join(ROOT_DIR, 'blog-articles');
if (fs.existsSync(blogDir)) {
  processDirectory(blogDir);
}

console.log(`Done: ${modified} files modified, ${alreadyHas} already had it, ${skipped} skipped`);
