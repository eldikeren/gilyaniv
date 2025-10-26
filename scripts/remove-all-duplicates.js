import fs from 'fs';

// Read the articles.html file
const content = fs.readFileSync('articles.html', 'utf8');

// Extract all articles with their titles
const articleRegex = /<article[^>]*data-title="([^"]*)"[^>]*>[\s\S]*?<\/article>/g;
const articles = [];
let match;

while ((match = articleRegex.exec(content)) !== null) {
    articles.push({
        title: match[1],
        fullMatch: match[0],
        startIndex: match.index,
        endIndex: match.index + match[0].length
    });
}

// Find duplicates
const titleCounts = {};
const duplicates = [];

articles.forEach((article, index) => {
    if (titleCounts[article.title]) {
        titleCounts[article.title].push(article);
        if (titleCounts[article.title].length === 2) {
            duplicates.push({
                title: article.title,
                articles: titleCounts[article.title]
            });
        }
    } else {
        titleCounts[article.title] = [article];
    }
});

console.log('=== REMOVING DUPLICATES ===');
console.log(`Found ${duplicates.length} duplicate titles`);

// Remove duplicates (keep the first occurrence, remove the rest)
let newContent = content;
let removedCount = 0;

duplicates.forEach(dup => {
    console.log(`\nRemoving duplicates for: "${dup.title}"`);
    console.log(`Found ${dup.articles.length} instances`);
    
    // Keep the first one, remove the rest
    for (let i = 1; i < dup.articles.length; i++) {
        const articleToRemove = dup.articles[i];
        console.log(`Removing duplicate at position ${articleToRemove.startIndex}`);
        newContent = newContent.replace(articleToRemove.fullMatch, '');
        removedCount++;
    }
});

// Write the cleaned content back
fs.writeFileSync('articles.html', newContent);

console.log(`\n✅ Removed ${removedCount} duplicate articles`);
console.log(`📄 Updated articles.html`);
