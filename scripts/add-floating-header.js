/**
 * Script to add floating header style and script to all HTML pages
 */

const fs = require('fs');
const path = require('path');

// HTML files to update (excluding partials and test files)
const pagesToUpdate = [
  'about.html',
  'media.html',
  'articles.html',
  'practice-areas.html',
  'contact.html',
  'attorneys.html',
  'index.html'
];

// Style to add before </head>
const headerStyle = `
<style>
  :root{ --border:#e6e7eb; --glass:rgba(255,255,255,.92); }
  .site-header{position:sticky;top:0;z-index:4000;background:var(--glass);
    -webkit-backdrop-filter:saturate(120%) blur(8px);backdrop-filter:saturate(120%) blur(8px);
    transition:box-shadow .22s,background-color .22s,padding .22s}
  .header-top{height:40px;border-bottom:1px solid var(--border);transition:height .22s,opacity .22s}
  .header-main .header-main-inner{padding-block:16px;transition:padding .22s}
  .logo .logo-mark{height:48px;transition:height .22s}
  .site-header.is-compact{box-shadow:0 10px 28px rgba(0,0,0,.07)}
  .site-header.is-compact .header-top{height:0;opacity:0;border:0;overflow:hidden}
  .site-header.is-compact .header-main .header-main-inner{padding-block:8px}
  .has-mega{position:relative}
  .mega-panel{position:absolute;top:calc(100% + 10px);inset-inline-end:0;z-index:5000;display:none;
    width:min(86vw,880px);background:#fff;border:1px solid var(--border);border-radius:12px;
    box-shadow:0 30px 60px rgba(0,0,0,.16),0 6px 14px rgba(0,0,0,.08);padding:16px}
  .has-mega.open>.mega-panel{display:block}
  .site-header,.header-top,.header-main{overflow:visible}
  #headerSentinel{height:1px}
</style>
`;

// Script to add before </body>
const headerScript = `
<script>
document.addEventListener('DOMContentLoaded',()=>{
  const header=document.getElementById('siteHeader');
  const s=document.getElementById('headerSentinel');
  if(!header||!s){return}
  if(!s.offsetHeight){s.style.height='1px'}
  new IntersectionObserver(([e])=>{
    header.classList.toggle('is-compact', !e.isIntersecting);
  },{rootMargin:'-1px 0px 0px 0px'}).observe(s);
});
</script>
`;

// Process each page
pagesToUpdate.forEach(page => {
  const filePath = path.join(__dirname, '..', page);
  
  try {
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add style before </head>
    if (!content.includes(':root{ --border:#e6e7eb; --glass:rgba(255,255,255,.92); }')) {
      content = content.replace('</head>', `${headerStyle}\n</head>`);
    }
    
    // Add script before </body>
    if (!content.includes('document.addEventListener(\'DOMContentLoaded\',()=>{')) {
      content = content.replace('</body>', `${headerScript}\n</body>`);
    }
    
    // Ensure header has correct ID and class
    if (!content.includes('id="siteHeader"') && content.includes('<header')) {
      content = content.replace(/<header([^>]*)>/g, '<header id="siteHeader" class="site-header"$1>');
    }
    
    // Ensure headerSentinel exists
    if (!content.includes('id="headerSentinel"') && content.includes('</header>')) {
      content = content.replace('</header>', '</header>\n<div id="headerSentinel" aria-hidden="true"></div>');
    }
    
    // Write the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${page}`);
    
  } catch (err) {
    console.error(`Error processing ${page}:`, err);
  }
});

console.log('All pages updated with floating header style and script!');
