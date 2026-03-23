#!/usr/bin/env node
/**
 * build-search-index.js
 * Scans all HTML pages in the repo and rebuilds js/search-index.json
 * Run: node scripts/build-search-index.js
 * Triggered automatically by GitHub Actions on every push that changes HTML files.
 */

const fs = require('fs');
const path = require('path');

// Pages to exclude from search index
const EXCLUDE = new Set([
  '404.html', 'thanks.html', 'todah.html', 'index-staging.html',
  'og-image-generator.html', 'og-image-template.html', '_live_divorce.html',
  'practice-areas-hub.html'
]);

// Extract text between tags using simple regex (no external deps needed)
function extract(html, tag, attr) {
  if (attr) {
    const re = new RegExp('<' + tag + '[^>]*\\s' + attr + '=["\'\']([^"\'\'>]+)["\'\']', 'i');
    const m = html.match(re);
    return m ? m[1].trim() : '';
  }
  const re = new RegExp('<' + tag + '[^>]*>([\\s\\S]*?)<\\/' + tag + '>', 'i');
  const m = html.match(re);
  return m ? m[1].replace(/<[^>]+>/g, '').replace(/\\s+/g, ' ').trim() : '';
}

function extractExcerpt(html) {
  // Find first <p> with substantial text
  const re = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const text = m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text.length > 40) return text.substring(0, 200);
  }
  return '';
}

function getCategory(url) {
  if (url.includes('mezonot') || url.includes('mezonot')) return 'מזונות';
  if (url.includes('mishmoret')) return 'משמורת';
  if (url.includes('heskem-mamon') || url.includes('heskem-gerushin')) return 'הסכמים';
  if (url.includes('yerusha') || url.includes('will') || url.includes('inheritance')) return 'ירושה';
  if (url.includes('blog-articles')) return 'מאמרים';
  if (url.startsWith('od-gerushin') || url.startsWith('service')) return 'אזורי שירות';
  return 'כללי';
}

const ROOT = path.join(__dirname, '..');
const entries = [];

function scanDir(dir, urlPrefix) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (!file.endsWith('.html')) continue;
    if (EXCLUDE.has(file)) continue;
    if (file.startsWith('_')) continue;

    const filePath = path.join(dir, file);
    const slug = file.replace('.html', '');
    const url = urlPrefix ? urlPrefix + '/' + slug : '/' + slug;

    try {
      const html = fs.readFileSync(filePath, 'utf8');
      const title = extract(html, 'title');
      const h1 = extract(html, 'h1');
      const description = extract(html, 'meta[name="description"]', 'content') ||
                          (() => { const m = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i); return m ? m[1] : ''; })();
      const excerpt = extractExcerpt(html);

      if (!title && !h1) continue; // Skip empty/template pages

      entries.push({ url, title, h1, description, excerpt, category: getCategory(url) });
    } catch (e) {
      console.warn('Skipping', file, ':', e.message);
    }
  }
}

// Scan root HTML files
scanDir(ROOT, '');
// Fix root URL: / not //slug
entries.forEach(e => { if (e.url === '/index') e.url = '/'; });

// Scan blog-articles/
const blogDir = path.join(ROOT, 'blog-articles');
if (fs.existsSync(blogDir)) scanDir(blogDir, '/blog-articles');

// Sort by URL
entries.sort((a, b) => a.url.localeCompare(b.url));

// Write output
const outPath = path.join(ROOT, 'js', 'search-index.json');
fs.writeFileSync(outPath, JSON.stringify(entries, null, 2), 'utf8');
console.log('Search index rebuilt: ' + entries.length + ' entries → ' + outPath);
