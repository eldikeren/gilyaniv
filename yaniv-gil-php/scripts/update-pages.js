/**
 * Script to update all pages with consistent header, footer, and styling
 */

const fs = require('fs');
const path = require('path');

// Pages to update
const pagesToUpdate = [
  'attorneys.html',
  'contact.html',
  'practice-areas.html',
  'articles.html',
  'media.html'
];

// CSS and JS to include in all pages
const commonHead = `
    <!-- ✅ CONSOLE SILENCER: Load this before anything else -->
    <script src="/js/console-silencer.js?v=2025-09-13c"></script>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>משרד עו"ד יניב גיל - מומחים בדיני משפחה, חדלות פירעון וסדר דין אזרחי</title>

    <link rel="icon" type="image/png" href="images/logo.png">
    <link rel="stylesheet" href="css/design-tokens.css?v=2">
    <link rel="stylesheet" href="css/base.css?v=2">
    <link rel="stylesheet" href="css/pages-rtl.css?v=2">
    <link rel="stylesheet" href="css/mobile-responsive.css?v=2">
    <link rel="stylesheet" href="css/home-rtl.css?v=1">
    <link rel="stylesheet" href="/css/pw-rtl.css?v=2025-09-13a">
    <link rel="stylesheet" href="/css/header-premium.css?v=2025-09-13a">
    
    <!-- ✅ COMPLETELY NEW APPROACH: Load our fixed scripts -->
    <script defer src="/js/mega-menu.js?v=2025-09-13b"></script>
    <script defer src="/js/header-shrink.js?v=2025-09-13b"></script>
    <script defer src="/js/header-loader.js?v=2025-09-13b"></script>

    <style>
    body {
      padding-top: 120px !important;
      font-family: 'Heebo', Arial, sans-serif;
    }
    @media (max-width: 768px) {
      body { padding-top: 100px !important; }
    }
    @media (max-width: 480px) {
      body { padding-top: 90px !important; }
    }
    
    .section-header h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #0a3d62;
      font-weight: 700;
    }
    
    /* Card styling */
    .card {
      background: #fff;
      border: 1px solid #e6e7eb;
      border-radius: 12px;
      padding: 1.5rem;
      box-shadow: 0 6px 16px rgba(0,0,0,0.08);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.12);
    }
    
    /* Footer styling */
    .site-footer {
      background: #0a3d62;
      color: #fff;
      padding: 3rem 0;
      margin-top: 3rem;
    }
    
    .site-footer .container {
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    
    .site-footer ul {
      display: flex;
      gap: 1.5rem;
      margin: 0;
      padding: 0;
      list-style: none;
      justify-content: center;
    }
    
    .site-footer a {
      color: #fff;
      text-decoration: none;
    }
    
    .site-footer a:hover {
      text-decoration: underline;
    }
    </style>
`;

// Header structure
const headerStructure = `
    <!-- Use header-loader.js to load the header -->
    <div id="header-root"></div>
    
    <!-- Skip link for accessibility -->
    <a class="skip-link visually-hidden" href="#main">דלג לתוכן הראשי</a>

    <main id="main">
`;

// Footer structure
const footerStructure = `
    </main>

    <!-- ===== Footer ===== -->
    <footer class="site-footer">
        <div class="container">
            <ul>
                <li><a href="about.html">אודות המשרד</a></li>
                <li><a href="index.html#testimonials-section">ביקורות לקוחות</a></li>
            </ul>
        </div>
    </footer>

    <!-- ✅ SIMPLIFIED SCRIPT for smooth scrolling -->
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // Add active class to current page in navigation
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const navLinks = document.querySelectorAll('nav a');
            
            navLinks.forEach(link => {
                if (link.getAttribute('href') === currentPage) {
                    link.classList.add('active');
                }
            });
        });
    </script>
`;

// Process each page
pagesToUpdate.forEach(page => {
  const filePath = path.join(__dirname, '..', page);
  
  try {
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Extract the title if it exists
    let title = '';
    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    if (titleMatch && titleMatch[1]) {
      title = titleMatch[1];
    }
    
    // Extract the main content
    let mainContent = '';
    const bodyMatch = content.match(/<body>([\s\S]*?)<\/body>/);
    
    if (bodyMatch && bodyMatch[1]) {
      // Try to extract just the main content, excluding header and footer
      const mainMatch = bodyMatch[1].match(/<main[\s\S]*?>([\s\S]*?)<\/main>/);
      
      if (mainMatch && mainMatch[1]) {
        mainContent = mainMatch[1];
      } else {
        // If no main tag, try to extract content between header and footer
        const contentMatch = bodyMatch[1].match(/<header[\s\S]*?<\/header>([\s\S]*?)<footer/);
        if (contentMatch && contentMatch[1]) {
          mainContent = contentMatch[1];
        } else {
          // Fallback: use everything but try to remove header and footer
          mainContent = bodyMatch[1]
            .replace(/<header[\s\S]*?<\/header>/, '')
            .replace(/<footer[\s\S]*?<\/footer>/, '');
        }
      }
    }
    
    // Create the new page content
    const newContent = `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>${commonHead.replace('משרד עו"ד יניב גיל - מומחים בדיני משפחה', title || 'משרד עו"ד יניב גיל - מומחים בדיני משפחה')}
</head>
<body>${headerStructure}${mainContent}${footerStructure}
</body>
</html>`;
    
    // Write the file
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${page}`);
    
  } catch (err) {
    console.error(`Error processing ${page}:`, err);
  }
});

console.log('All pages updated successfully!');
