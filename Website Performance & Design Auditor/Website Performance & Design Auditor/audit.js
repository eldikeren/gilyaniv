import lighthouse from "lighthouse";
import { launch } from "chrome-launcher";
import fs from "fs";
import { JSDOM } from "jsdom";
import axios from "axios";

export async function analyzeWebsite(url, options = {}) {
  console.log(`🔍 Starting audit for ${url}`);
  const chrome = await launch({ chromeFlags: ["--headless"] });
  const result = await lighthouse(url, {
    port: chrome.port,
    output: "json",
    logLevel: "info",
  });

  const report = JSON.parse(result.report);
  await chrome.kill();

  // Save full Lighthouse report
  fs.writeFileSync(`audit-${new URL(url).hostname}.json`, JSON.stringify(report, null, 2));

  const { performance, accessibility, seo, "best-practices": bestPractices } = report.categories;

  return {
    url,
    scores: {
      performance: performance.score,
      accessibility: accessibility.score,
      seo: seo.score,
      bestPractices: bestPractices.score,
    },
    recommendations: generateRecommendations(report),
  };
}

function generateRecommendations(report) {
  const recs = [];
  const audits = report.audits;

  if (audits["uses-responsive-images"]?.score < 1)
    recs.push("Use responsive and modern image formats (WebP/AVIF).");

  if (audits["largest-contentful-paint"]?.numericValue > 2500)
    recs.push("Improve LCP by compressing hero videos/images and preloading key assets.");

  if (audits["cumulative-layout-shift"]?.numericValue > 0.1)
    recs.push("Fix layout shifts by reserving media space and avoiding late DOM injections.");

  if (audits["first-input-delay"]?.numericValue > 100)
    recs.push("Reduce JS bundle size and defer non-critical scripts.");

  if (audits["color-contrast"]?.score < 1)
    recs.push("Increase text/background contrast for accessibility.");

  if (audits["meta-description"]?.score < 1)
    recs.push("Add meaningful meta descriptions for SEO.");

  if (audits["tap-targets"]?.score < 1)
    recs.push("Ensure mobile tap targets are at least 48x48px.");

  return recs;
}

// Crawl all internal links
export async function crawlLinks(baseUrl, depth = 1) {
  const visited = new Set();
  const toVisit = [baseUrl];
  const pages = [];

  while (toVisit.length && depth > 0) {
    const url = toVisit.pop();
    if (visited.has(url)) continue;
    visited.add(url);
    console.log(`🌐 Crawling: ${url}`);

    try {
      const html = (await axios.get(url)).data;
      const dom = new JSDOM(html);
      const anchors = dom.window.document.querySelectorAll("a[href]");
      for (const a of anchors) {
        const href = new URL(a.href, baseUrl);
        if (href.hostname === new URL(baseUrl).hostname) {
          toVisit.push(href.href);
        }
      }
      pages.push(url);
    } catch (err) {
      console.error(`❌ Failed to load ${url}:`, err.message);
    }
    depth--;
  }

  return pages;
}