const https = require('https');
const fs = require('fs');
const path = require('path');

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  // Fetch the LegalService schema directly from the live indexed page
  // This avoids any string-escaping issues with Hebrew characters
  console.log('Fetching LegalService schema from live site...');
  const html = await fetchUrl('https://www.yanivgil.co.il/mishmoret-yeladim');
  
  const scriptTags = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      const obj = JSON.parse(m[1]);
      if (obj['@type'] === 'LegalService') {
        scriptTags.push(m[0]);
      }
    } catch(e) {}
  }
  
  if (scriptTags.length === 0) {
    console.error('ERROR: Could not find LegalService schema on live site');
    process.exit(1);
  }
  
  const legalServiceSchemaTag = scriptTags[0];
  console.log('Found LegalService schema tag (' + legalServiceSchemaTag.length + ' chars)');
  
  function findHtmlFiles(dir) {
    const results = [];
    let entries;
    try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch(e) { return results; }
    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...findHtmlFiles(fullPath));
      } else if (entry.name.endsWith('.html')) {
        results.push(fullPath);
      }
    }
    return results;
  }
  
  const htmlFiles = findHtmlFiles('.');
  let added = 0, skipped = 0;
  
  for (const file of htmlFiles) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('"@type":"LegalService"') || content.includes('"@type": "LegalService"')) {
      skipped++;
      continue;
    }
    const newContent = content.replace('</head>', legalServiceSchemaTag + '\n</head>');
    if (newContent === content) {
      console.log('WARNING: no </head> found in ' + file);
      skipped++;
      continue;
    }
    fs.writeFileSync(file, newContent, 'utf8');
    added++;
    console.log('Added schema to: ' + file);
  }
  
  console.log('DONE: added LegalService schema to ' + added + ' files, skipped ' + skipped);
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
