/**
 * Script to replace "חדלות פרעון" with "חדלות פירעון" across all files
 */

const fs = require('fs');
const path = require('path');

// Files to update
const filesToUpdate = [
  'articles.html',
  'index.html',
  'practice-areas.html',
  'contact.html',
  'attorneys.html',
  'media.html',
  'partials/header.html',
  'partials/footer.html'
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
    
    // Replace "חדלות פרעון" with "חדלות פירעון"
    const oldContent = content;
    content = content.replace(/חדלות פרעון/g, 'חדלות פירעון');
    
    // Write the file if changes were made
    if (content !== oldContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file}`);
    } else {
      console.log(`No changes needed in ${file}`);
    }
    
  } catch (err) {
    console.error(`Error processing ${file}:`, err);
  }
});

console.log('All files updated with standardized labels!');
