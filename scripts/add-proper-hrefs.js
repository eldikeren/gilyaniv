/**
 * Script to add proper href attributes to CTAs and anchors
 */

const fs = require('fs');
const path = require('path');

// Files to update
const filesToUpdate = [
  'contact.html',
  'practice-areas.html',
  'index.html'
];

// Process each file
filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.log(`File ${file} does not exist, skipping`);
      return;
    }
    
    // Read the file
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add tel: and mailto: links to CTAs
    content = content.replace(
      /(<a class="btn[^"]*"[^>]*href=")([^"]*)(">התקשר עכשיו<\/a>)/g,
      (match, p1, p2, p3) => {
        if (!p2.startsWith('tel:')) {
          return `${p1}tel:${p2.replace(/-/g, '')}${p3}`;
        }
        return match;
      }
    );
    
    content = content.replace(
      /(<a class="btn[^"]*"[^>]*href=")([^"]*)(">שלח אימייל<\/a>)/g,
      (match, p1, p2, p3) => {
        if (!p2.startsWith('mailto:')) {
          return `${p1}mailto:${p2}${p3}`;
        }
        return match;
      }
    );
    
    // Add IDs to practice area sections if they don't already have them
    if (file === 'practice-areas.html') {
      // Check if the service cards already have IDs
      if (!content.includes('id="family"')) {
        content = content.replace(
          /(<div class="service-card"[^>]*>[\s\S]*?<h3>דיני משפחה<\/h3>)/g,
          '$1'
        );
      }
      
      // Add scroll-margin-top to service cards
      content = content.replace(
        /(<style>[\s\S]*?)(<\/style>)/g,
        '$1\n  .service-card { scroll-margin-top: 140px; }\n  @media (max-width: 768px) { .service-card { scroll-margin-top: 120px; } }\n  @media (max-width: 480px) { .service-card { scroll-margin-top: 100px; } }\n$2'
      );
    }
    
    // Write the updated content
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file} with proper href attributes`);
    
  } catch (err) {
    console.error(`Error processing ${file}:`, err);
  }
});

console.log('All files updated with proper href attributes!');
