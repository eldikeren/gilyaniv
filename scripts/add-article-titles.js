/**
 * Script to add data-title attributes to all article cards
 */

const fs = require('fs');
const path = require('path');

// Path to the articles.html file
const filePath = path.join(__dirname, '..', 'articles.html');

try {
  // Read the file
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find all article cards and extract their titles
  const articleCardRegex = /<article class="card article-card" data-cat="([^"]+)" data-date="([^"]+)"[^>]*>[\s\S]*?<h3 class="article-title">([^<]+)<\/h3>/g;
  
  // Replace each article card with one that includes the data-title attribute
  content = content.replace(articleCardRegex, (match, cat, date, title) => {
    return `<article class="card article-card" data-cat="${cat}" data-date="${date}" data-title="${title}">`;
  });
  
  // Write the file
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Added data-title attributes to all article cards');
  
} catch (err) {
  console.error('Error processing articles.html:', err);
}
