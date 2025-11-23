import { analyzeWebsite, crawlLinks } from "./audit.js";

const BASE_URL = process.argv[2];
if (!BASE_URL) throw new Error("Please provide a website URL, e.g. node index.js https://example.com");

(async () => {
  const pages = await crawlLinks(BASE_URL, 3);
  console.log(`Found ${pages.length} pages`);

  const results = [];
  for (const page of pages) {
    const r = await analyzeWebsite(page);
    results.push(r);
  }

  console.log("=== Audit Summary ===");
  for (const r of results) {
    console.log(`\n${r.url}`);
    console.log(`Performance: ${r.scores.performance * 100}%`);
    console.log(`Accessibility: ${r.scores.accessibility * 100}%`);
    console.log(`SEO: ${r.scores.seo * 100}%`);
    console.log(`Best Practices: ${r.scores.bestPractices * 100}%`);
    console.log("Recommendations:");
    r.recommendations.forEach((x) => console.log(" - " + x));
  }
})();