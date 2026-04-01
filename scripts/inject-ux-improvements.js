src="/images//**
 * inject-ux-improvements.js
 * Batch script to inject UX improvements across all HTML files
 *
 * Usage: node scripts/inject-ux-improvements.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const ROOT_DIR = path.resolve(__dirname, '..');
const BLOG_DIR = path.join(ROOT_DIR, 'blog-articles');
const BREADCRUMB_MAP = require('./breadcrumb-map.json');

const DRY_RUN = process.argv.includes('--dry-run');

// Counters for reporting
let stats = {
  processed: 0,
  breadcrumbsAdded: 0,
  backToTopAdded: 0,
  cssLinksAdded: 0,
  jsLinksAdded: 0,
  authorBoxesAdded: 0,
  errors: 0
};

// CSS files to inject
const CSS_FILES = [
  'css/breadcrumbs.css',
  'css/back-to-top.css',
  'css/progress-bar.css',
  'css/faq-accordion.css'
];

// JS files to inject
const JS_FILES = [
  'js/back-to-top.js',
  'js/progress-bar.js'
];

// Blog-specific CSS/JS
const BLOG_CSS_FILES = [
  '../css/author-box.css'
];

/**
 * Get last git modification date for a file
 */
function getGitLastModified(filePath) {
  try {
    const date = execSync(`git log -1 --format=%ci "${filePath}"`, {
      cwd: ROOT_DIR,
      encoding: 'utf-8'
    }).trim();
    if (date) {
      const d = new Date(date);
      const months = ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
                      'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'];
      return {
        iso: d.toISOString().split('T')[0],
        hebrew: `${months[d.getMonth()]} ${d.getFullYear()}`
      };
    }
  } catch (e) {
    // Fallback to current date
  }
  const now = new Date();
  return {
    iso: now.toISOString().split('T')[0],
    hebrew: 'פברואר 2026'
  };
}

/**
 * Generate breadcrumb HTML
 */
function generateBreadcrumbHtml(filePath, isSubdir = false) {
  const filename = path.basename(filePath);
  const breadcrumbs = BREADCRUMB_MAP[filename];

  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null;
  }

  const prefix = isSubdir ? '../' : '';
  const items = breadcrumbs.map((crumb, index) => {
    if (index === 0) {
      return `<li><a href="${prefix}index.html">${crumb}</a></li>`;
    } else if (index === breadcrumbs.length - 1) {
      return `<li><span aria-current="page">${crumb}</span></li>`;
    } else {
      // Generate href based on crumb
      let href = '';
      switch (crumb) {
        case 'דיני משפחה': href = `${prefix}family-law.html`; break;
        case 'ירושות וצוואות': href = `${prefix}inheritance-wills.html`; break;
        case 'חדלות פירעון': href = `${prefix}insolvency.html`; break;
        default: href = '#';
      }
      return `<li><a href="${href}">${crumb}</a></li>`;
    }
  }).join('\n        ');

  return `
  <!-- Breadcrumbs -->
  <div class="breadcrumbs">
    <nav aria-label="Breadcrumb">
      <ol>
        ${items}
      </ol>
    </nav>
  </div>`;
}

/**
 * Generate back-to-top button HTML
 */
function generateBackToTopHtml() {
  return `
  <!-- Back to Top Button -->
  <button class="back-to-top" aria-label="חזרה לראש הדף">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 15l-6-6-6 6"/>
    </svg>
  </button>`;
}

/**
 * Generate reading progress bar HTML
 */
function generateProgressBarHtml() {
  return `
  <!-- Reading Progress Bar -->
  <div class="reading-progress" role="progressbar" aria-label="התקדמות קריאה"></div>`;
}

/**
 * Generate author box HTML for blog articles
 */
function generateAuthorBoxHtml() {
  return `
      <!-- Author Box -->
      <aside class="author-box">
        <div class="author-avatar">
          <img src="../images/yaniv-gil-attorney.webp" alt="עו״ד יניב גיל" width="96" height="96" loading="lazy">
        </div>
        <div class="author-info">
          <h4>עו״ד יניב גיל</h4>
          <p>עורך דין מומחה בדיני משפחה, חדלות פירעון וירושות עם למעלה מ-20 שנות ניסיון. בעל משרד בתל אביב המתמחה בייצוג לקוחות בתיקים מורכבים.</p>
          <a href="../attorneys.html" class="author-link">
            קראו עוד על עו״ד יניב גיל
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </a>
        </div>
      </aside>`;
}

/**
 * Check if CSS link already exists
 */
function hasCssLink(html, cssFile) {
  return html.includes(`href="${cssFile}"`) || html.includes(`href="./${cssFile}"`);
}

/**
 * Check if JS link already exists
 */
function hasJsLink(html, jsFile) {
  return html.includes(`src="${jsFile}"`) || html.includes(`src="./${jsFile}"`);
}

/**
 * Process a single HTML file
 */
function processHtmlFile(filePath, isSubdir = false) {
  const filename = path.basename(filePath);
  let html = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  const prefix = isSubdir ? '../' : '';

  console.log(`Processing: ${filename}`);

  // 1. Add CSS links if not present
  CSS_FILES.forEach(cssFile => {
    const cssPath = isSubdir ? `../${cssFile}` : cssFile;
    if (!hasCssLink(html, cssPath)) {
      const insertPoint = html.lastIndexOf('</head>');
      if (insertPoint !== -1) {
        html = html.slice(0, insertPoint) +
               `  <link rel="stylesheet" href="${cssPath}">\n  ` +
               html.slice(insertPoint);
        modified = true;
        stats.cssLinksAdded++;
      }
    }
  });

  // 2. Add JS links if not present
  JS_FILES.forEach(jsFile => {
    const jsPath = isSubdir ? `../${jsFile}` : jsFile;
    if (!hasJsLink(html, jsPath)) {
      const insertPoint = html.lastIndexOf('</body>');
      if (insertPoint !== -1) {
        html = html.slice(0, insertPoint) +
               `  <script src="${jsPath}"></script>\n  ` +
               html.slice(insertPoint);
        modified = true;
        stats.jsLinksAdded++;
      }
    }
  });

  // 3. Add breadcrumbs if not present
  if (!html.includes('class="breadcrumbs"')) {
    const breadcrumbHtml = generateBreadcrumbHtml(filePath, isSubdir);
    if (breadcrumbHtml) {
      // Insert after <main> or first <section>
      const mainMatch = html.match(/<main[^>]*>/i);
      const sectionMatch = html.match(/<section[^>]*>/i);

      if (mainMatch) {
        const insertPoint = html.indexOf(mainMatch[0]) + mainMatch[0].length;
        html = html.slice(0, insertPoint) + breadcrumbHtml + html.slice(insertPoint);
        modified = true;
        stats.breadcrumbsAdded++;
      } else if (sectionMatch) {
        const insertPoint = html.indexOf(sectionMatch[0]);
        html = html.slice(0, insertPoint) + breadcrumbHtml + '\n  ' + html.slice(insertPoint);
        modified = true;
        stats.breadcrumbsAdded++;
      }
    }
  }

  // 4. Add back-to-top button if not present (for long pages)
  const isLongPage = filename.includes('guide') ||
                     filename.includes('divorce-guide') ||
                     isSubdir; // blog articles

  if (isLongPage && !html.includes('class="back-to-top"')) {
    const insertPoint = html.lastIndexOf('</body>');
    if (insertPoint !== -1) {
      html = html.slice(0, insertPoint) +
             generateBackToTopHtml() + '\n  ' +
             html.slice(insertPoint);
      modified = true;
      stats.backToTopAdded++;
    }
  }

  // 5. Add progress bar for long content pages
  if (isLongPage && !html.includes('class="reading-progress"')) {
    const bodyMatch = html.match(/<body[^>]*>/i);
    if (bodyMatch) {
      const insertPoint = html.indexOf(bodyMatch[0]) + bodyMatch[0].length;
      html = html.slice(0, insertPoint) + generateProgressBarHtml() + html.slice(insertPoint);
      modified = true;
    }
  }

  // 6. Add author box for blog articles (if not present)
  if (isSubdir && !html.includes('class="author-box"')) {
    // Find the end of article content (before footer or related articles)
    const footerMatch = html.match(/<footer[^>]*>/i);
    const relatedMatch = html.match(/<section[^>]*class="[^"]*related[^"]*"[^>]*>/i);

    let insertPoint = -1;
    if (relatedMatch) {
      insertPoint = html.indexOf(relatedMatch[0]);
    } else if (footerMatch) {
      insertPoint = html.indexOf(footerMatch[0]);
    }

    if (insertPoint !== -1) {
      html = html.slice(0, insertPoint) + generateAuthorBoxHtml() + '\n\n    ' + html.slice(insertPoint);
      modified = true;
      stats.authorBoxesAdded++;

      // Also add author-box CSS
      if (!hasCssLink(html, '../css/author-box.css')) {
        const headEnd = html.lastIndexOf('</head>');
        if (headEnd !== -1) {
          html = html.slice(0, headEnd) +
                 `  <link rel="stylesheet" href="../css/author-box.css">\n  ` +
                 html.slice(headEnd);
        }
      }
    }
  }

  // Save if modified
  if (modified) {
    if (DRY_RUN) {
      console.log(`  [DRY RUN] Would update: ${filename}`);
    } else {
      fs.writeFileSync(filePath, html, 'utf-8');
      console.log(`  Updated: ${filename}`);
    }
    stats.processed++;
  } else {
    console.log(`  No changes needed: ${filename}`);
  }
}

/**
 * Main execution
 */
function main() {
  console.log('='.repeat(60));
  console.log('UX Improvements Injection Script');
  console.log('='.repeat(60));

  if (DRY_RUN) {
    console.log('\n[DRY RUN MODE - No files will be modified]\n');
  }

  // Process root HTML files
  console.log('\n--- Processing root HTML files ---\n');
  const rootFiles = fs.readdirSync(ROOT_DIR)
    .filter(f => f.endsWith('.html') && !f.startsWith('_') && !f.includes('staging'));

  rootFiles.forEach(file => {
    try {
      processHtmlFile(path.join(ROOT_DIR, file), false);
    } catch (e) {
      console.error(`  Error processing ${file}: ${e.message}`);
      stats.errors++;
    }
  });

  // Process blog articles
  console.log('\n--- Processing blog articles ---\n');
  if (fs.existsSync(BLOG_DIR)) {
    const blogFiles = fs.readdirSync(BLOG_DIR)
      .filter(f => f.endsWith('.html'));

    blogFiles.forEach(file => {
      try {
        processHtmlFile(path.join(BLOG_DIR, file), true);
      } catch (e) {
        console.error(`  Error processing blog/${file}: ${e.message}`);
        stats.errors++;
      }
    });
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('Summary:');
  console.log('='.repeat(60));
  console.log(`Files processed: ${stats.processed}`);
  console.log(`Breadcrumbs added: ${stats.breadcrumbsAdded}`);
  console.log(`Back-to-top buttons added: ${stats.backToTopAdded}`);
  console.log(`CSS links added: ${stats.cssLinksAdded}`);
  console.log(`JS links added: ${stats.jsLinksAdded}`);
  console.log(`Author boxes added: ${stats.authorBoxesAdded}`);
  console.log(`Errors: ${stats.errors}`);

  if (DRY_RUN) {
    console.log('\n[DRY RUN - Run without --dry-run to apply changes]');
  }
}

main();
