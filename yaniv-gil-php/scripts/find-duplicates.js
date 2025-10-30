import fs from 'fs';

// Read the articles.html file
const content = fs.readFileSync('articles.html', 'utf8');

// Extract all data-title attributes
const titleRegex = /data-title="([^"]*)"/g;
const titles = [];
let match;

while ((match = titleRegex.exec(content)) !== null) {
    titles.push(match[1]);
}

// Find duplicates
const titleCounts = {};
const duplicates = [];

titles.forEach((title, index) => {
    if (titleCounts[title]) {
        titleCounts[title].push(index);
        if (titleCounts[title].length === 2) {
            duplicates.push({
                title: title,
                positions: titleCounts[title]
            });
        }
    } else {
        titleCounts[title] = [index];
    }
});

console.log('=== DUPLICATE ARTICLES FOUND ===');
duplicates.forEach(dup => {
    console.log(`\nTitle: "${dup.title}"`);
    console.log(`Positions: ${dup.positions.join(', ')}`);
});

console.log(`\nTotal articles: ${titles.length}`);
console.log(`Duplicate titles: ${duplicates.length}`);
