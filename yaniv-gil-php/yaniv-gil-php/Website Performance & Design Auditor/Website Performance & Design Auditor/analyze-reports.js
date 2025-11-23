#!/usr/bin/env node

import WebsiteAnalyzer from './analyzer.js';

const analyzer = new WebsiteAnalyzer();

console.log('🎯 Website Performance & Design Analysis Tool');
console.log('==============================================\n');

// Generate comprehensive analysis and report
const results = analyzer.generateReport();

// Save detailed JSON report
const reportFile = analyzer.saveReport(`audit-analysis-${new Date().toISOString().split('T')[0]}.json`);

console.log(`\n📊 Analysis Summary:`);
console.log(`• Total pages analyzed: ${results.summary.totalPages}`);
console.log(`• Overall average score: ${(results.overall.averageScore * 100).toFixed(1)}%`);
console.log(`• Critical issues found: ${results.summary.criticalIssues}`);
console.log(`• High priority issues: ${results.summary.highIssues}`);
console.log(`• Detailed report saved: ${reportFile}`);

// Exit with appropriate code based on critical issues
if (results.summary.criticalIssues > 0) {
  console.log('\n⚠️  Critical issues detected - immediate action required!');
  process.exit(1);
} else if (results.summary.highIssues > 0) {
  console.log('\n📋 High priority issues found - address soon.');
  process.exit(0);
} else {
  console.log('\n✅ No critical or high priority issues found!');
  process.exit(0);
}