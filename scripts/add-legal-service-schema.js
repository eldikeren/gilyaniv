const fs = require('fs');
const path = require('path');

const LEGAL_SERVICE_SCHEMA = '<script type="application/ld+json">\n' +
  '{"@context":"https://schema.org","@type":"LegalService","@id":"https://www.yanivgil.co.il/#legalservice",' +
  '"name":"\u05de\u05e9\u05e8\u05d3 \u05e2\u05d5\"\u05d3 \u05d9\u05e0\u05d9\u05d1 \u05d2\u05d9\u05dc \u05d5\u05e9\u05d5\u05ea'",' +
  '"image":"https://www.yanivgil.co.il/images/yaniv-gil-attorney.jpg",' +
  '"telephone":["+972-3-6092414","+972-54-8184581"],"faxNumber":"+972-3-6092413","email":"yaniv@yanivgil.co.il",' +
  '"url":"https://www.yanivgil.co.il",' +
  '"address":{"@type":"PostalAddress","streetAddress":"\u05d3\u05e8\u05da \u05de\u05e0\u05d7\u05dd \u05d1\u05d2\u05d9\u05df 150, \u05e7\u05d5\u05de\u05d4 7","addressLocality":"\u05ea\u05dc \u05d0\u05d1\u05d9\u05d1","addressRegion":"\u05de\u05d7\u05d5\u05d6 \u05ea\u05dc \u05d0\u05d1\u05d9\u05d1","addressCountry":"IL"},' +
  '"geo":{"@type":"GeoCoordinates","latitude":"32.0636","longitude":"34.7899"},' +
  '"priceRange":"$$",' +
  '"openingHoursSpecification":{"@type":"OpeningHoursSpecification","dayOfWeek":["Sunday","Monday","Tuesday","Wednesday","Thursday"],"opens":"09:00","closes":"18:00"},' +
  '"areaServed":[{"@type":"City","name":"\u05ea\u05dc \u05d0\u05d1\u05d9\u05d1"},{"@type":"City","name":"\u05e8\u05de\u05ea \u05d2\u05df"},{"@type":"City","name":"\u05d2\u05d1\u05e2\u05ea\u05d9\u05d9\u05dd"},{"@type":"City","name":"\u05d4\u05e8\u05e6\u05dc\u05d9\u05d4"},{"@type":"City","name":"\u05e8\u05e2\u05e0\u05e0\u05d4"},{"@type":"City","name":"\u05e4\u05ea\u05d7 \u05ea\u05e7\u05d5\u05d5\u05d4"}]}\n' +
  '<\/script>';

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
  const html = fs.readFileSync(file, 'utf8');
  if (html.includes('"@type":"LegalService"') || html.includes('"@type": "LegalService"')) {
    skipped++;
    continue;
  }
  const newContent = html.replace('</head>', LEGAL_SERVICE_SCHEMA + '\n</head>');
  if (newContent === html) {
    console.log('WARNING: no </head> in', file);
    skipped++;
    continue;
  }
  fs.writeFileSync(file, newContent, 'utf8');
  added++;
  console.log('Added:', file);
}

console.log('DONE: added to ' + added + ' files, skipped ' + skipped);
