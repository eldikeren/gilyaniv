/**
 * Script to add consistent card styling across all pages
 */

const fs = require('fs');
const path = require('path');

// Files to update
const filesToUpdate = [
  'about.html',
  'media.html',
  'articles.html',
  'practice-areas.html',
  'contact.html',
  'attorneys.html',
  'index.html'
];

// Card styling to add
const cardStyle = `
<style>
  .card{background:#fff;border:1px solid #e6e7eb;border-radius:12px;padding:20px;
    box-shadow:0 6px 18px rgba(0,0,0,.06); transition: transform 0.3s ease, box-shadow 0.3s ease;}
  .card:hover{transform:translateY(-5px);box-shadow:0 12px 24px rgba(0,0,0,.12);}
  .grid{display:grid;gap:20px;}
  @media (min-width:900px){ .grid.cols-3{grid-template-columns:repeat(3,1fr)} }
  @media (min-width:900px){ .grid.cols-4{grid-template-columns:repeat(4,1fr)} }
  @media (min-width:900px){ .grid.cols-2{grid-template-columns:repeat(2,1fr)} }
  @media (max-width:899px){ .grid{grid-template-columns:1fr} }
</style>
`;

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
    
    // Add card styling if it doesn't already exist
    if (!content.includes('.card{background:#fff;border:1px solid #e6e7eb;border-radius:12px;')) {
      content = content.replace('</head>', `${cardStyle}\n</head>`);
      
      // Update contact page to use grid and card classes
      if (file === 'contact.html') {
        // Find the contact info section and wrap it in grid cols-3
        content = content.replace(
          /<section class="contact-info">\s*<div class="container">/g,
          '<section class="contact-info">\n<div class="container">\n<div class="grid cols-3">'
        );
        
        // Add card class to contact info items and close the grid div
        content = content.replace(
          /<div class="contact-item">/g,
          '<div class="contact-item card">'
        );
        
        // Close the grid div
        content = content.replace(
          /<\/section>\s*<!-- Contact Form -->/g,
          '</div>\n</section>\n\n<!-- Contact Form -->'
        );
      }
      
      // Update media page to use grid and card classes
      if (file === 'media.html') {
        // Find the media grid section and add grid class
        content = content.replace(
          /<div class="media-grid">/g,
          '<div class="media-grid grid cols-3">'
        );
        
        // Add card class to media items
        content = content.replace(
          /<article class="media-item">/g,
          '<article class="media-item card">'
        );
      }
      
      // Write the updated content
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file} with card styling`);
    } else {
      console.log(`Card styling already exists in ${file}, skipping`);
    }
    
  } catch (err) {
    console.error(`Error processing ${file}:`, err);
  }
});

console.log('All pages updated with consistent card styling!');
