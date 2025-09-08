const fs = require('fs');
const path = require('path');

// Emoji regex pattern - covers most emoji ranges
const EMOJI_REGEX = /[\u{1F000}-\u{1FAFF}\u{1F300}-\u{1F6FF}\u{1F900}-\u{1F9FF}\u{2600}-\u{27BF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{1F200}-\u{1F2FF}\u{1F300}-\u{1F5FF}\u{1F600}-\u{1F64F}\u{1F650}-\u{1F67F}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1FB00}-\u{1FBFF}\u{1FC00}-\u{1FCFF}\u{1FD00}-\u{1FDFF}\u{1FE00}-\u{1FEFF}\u{1FF00}-\u{1FFFF}]/gu;

function removeEmojisFromFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const cleanedContent = content.replace(EMOJI_REGEX, '');
    
    if (content !== cleanedContent) {
      fs.writeFileSync(filePath, cleanedContent, 'utf8');
      console.log(`Cleaned emojis from: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dirPath) {
  let cleanedCount = 0;
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip node_modules and other common directories
        if (!['node_modules', '.git', 'dist', 'build'].includes(item)) {
          cleanedCount += processDirectory(fullPath);
        }
      } else if (stat.isFile()) {
        // Process HTML, CSS, JS, and PHP files
        const ext = path.extname(item).toLowerCase();
        if (['.html', '.css', '.js', '.php', '.md', '.txt'].includes(ext)) {
          if (removeEmojisFromFile(fullPath)) {
            cleanedCount++;
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${dirPath}:`, error.message);
  }
  
  return cleanedCount;
}

// Run the emoji removal
console.log('Starting emoji removal process...');
const cleanedCount = processDirectory('.');
console.log(`Emoji removal complete. Files modified: ${cleanedCount}`);
