/**
 * Search Index Generator
 * Scans all HTML files and generates a JSON index for client-side search.
 * Run: node scripts/generate-search-index.js
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_PATH = path.join(ROOT_DIR, 'js', 'search-index.json');

// Files to exclude from the search index
const EXCLUDE_FILES = new Set([
  '404.html',
  'og-image-generator.html',
  'og-image-template.html',
  'index-staging.html',
  'thanks.html',
]);

function extractTag(html, regex) {
  const match = html.match(regex);
  return match ? match[1].trim() : '';
}

function stripHtml(str) {
  return str.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function extractExcerpt(html, maxLen = 200) {
  // Try to find content inside <main> first
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const content = mainMatch ? mainMatch[1] : html;

  // Find paragraphs with substantial text (>30 chars after stripping)
  const paragraphs = content.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
  for (const p of paragraphs) {
    const text = stripHtml(p);
    if (text.length > 30) {
      return text.length > maxLen ? text.slice(0, maxLen) + '...' : text;
    }
  }
  return '';
}

function processFile(filePath, baseUrl) {
  const html = fs.readFileSync(filePath, 'utf-8');

  const title = extractTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description = extractTag(html, /<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i)
    || extractTag(html, /<meta\s+content=["']([\s\S]*?)["']\s+name=["']description["']/i);
  const h1 = stripHtml(extractTag(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i));
  const excerpt = extractExcerpt(html);

  // Skip pages with no meaningful content
  if (!title && !h1) return null;

  return {
    title: stripHtml(title),
    description,
    h1,
    url: baseUrl,
    excerpt
  };
}

function getCleanUrl(filename, subdir) {
  // Convert filename to clean URL path
  const base = filename.replace(/\.html$/, '');
  if (subdir) {
    return `/${subdir}/${base}`;
  }
  if (base === 'index') return '/';
  return `/${base}`;
}

function main() {
  const index = [];

  // Process root HTML files
  const rootFiles = fs.readdirSync(ROOT_DIR).filter(f => f.endsWith('.html'));
  for (const file of rootFiles) {
    if (EXCLUDE_FILES.has(file)) continue;
    const entry = processFile(path.join(ROOT_DIR, file), getCleanUrl(file));
    if (entry) index.push(entry);
  }

  // Process blog-articles
  const blogDir = path.join(ROOT_DIR, 'blog-articles');
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.html'));
    for (const file of blogFiles) {
      const entry = processFile(path.join(blogDir, file), getCleanUrl(file, 'blog-articles'));
      if (entry) index.push(entry);
    }
  }

  // Sort by title for consistency
  index.sort((a, b) => a.title.localeCompare(b.title, 'he'));

  // Write output
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(index, null, 0), 'utf-8');

  const sizeKB = (fs.statSync(OUTPUT_PATH).size / 1024).toFixed(1);
  console.log(`Search index generated: ${index.length} pages, ${sizeKB}KB`);
  console.log(`Output: ${OUTPUT_PATH}`);
}

main();
