import fs from "fs";
import path from "path";

export class WebsiteAnalyzer {
  constructor() {
    this.auditFiles = [];
    this.analysisResults = {
      overall: {},
      pages: [],
      recommendations: {
        critical: [],
        high: [],
        medium: [],
        low: []
      },
      trends: {},
      summary: {}
    };
  }

  // Find all audit JSON files
  findAuditFiles() {
    const files = fs.readdirSync('.');
    this.auditFiles = files.filter(file => file.startsWith('audit-') && file.endsWith('.json'));
    console.log(`📁 Found ${this.auditFiles.length} audit files`);
    return this.auditFiles;
  }

  // Load and parse audit data
  loadAuditData() {
    const audits = [];
    
    for (const file of this.auditFiles) {
      try {
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        audits.push({
          file,
          url: data.requestedUrl || data.finalUrl,
          timestamp: new Date(data.fetchTime),
          data
        });
      } catch (error) {
        console.error(`❌ Error loading ${file}:`, error.message);
      }
    }
    
    return audits;
  }

  // Analyze performance metrics
  analyzePerformance(audit) {
    const { data } = audit;
    const performance = data.categories?.performance;
    const audits = data.audits || {};
    
    const metrics = {
      score: performance?.score || 0,
      fcp: audits['first-contentful-paint']?.numericValue || 0,
      lcp: audits['largest-contentful-paint']?.numericValue || 0,
      si: audits['speed-index']?.numericValue || 0,
      tbt: audits['total-blocking-time']?.numericValue || 0,
      cls: audits['cumulative-layout-shift']?.numericValue || 0,
      fmp: audits['first-meaningful-paint']?.numericValue || 0,
      tti: audits['interactive']?.numericValue || 0
    };

    const issues = [];
    
    // Performance issues
    if (metrics.fcp > 1800) issues.push({ type: 'critical', message: 'First Contentful Paint is too slow (>1.8s)', value: metrics.fcp });
    if (metrics.lcp > 2500) issues.push({ type: 'high', message: 'Largest Contentful Paint is too slow (>2.5s)', value: metrics.lcp });
    if (metrics.si > 3400) issues.push({ type: 'high', message: 'Speed Index is too slow (>3.4s)', value: metrics.si });
    if (metrics.tbt > 200) issues.push({ type: 'high', message: 'Total Blocking Time is too high (>200ms)', value: metrics.tbt });
    if (metrics.cls > 0.1) issues.push({ type: 'high', message: 'Cumulative Layout Shift is too high (>0.1)', value: metrics.cls });
    if (metrics.tti > 3800) issues.push({ type: 'medium', message: 'Time to Interactive is too slow (>3.8s)', value: metrics.tti });

    return { metrics, issues };
  }

  // Analyze accessibility
  analyzeAccessibility(audit) {
    const { data } = audit;
    const accessibility = data.categories?.accessibility;
    const audits = data.audits || {};
    
    const issues = [];
    
    // Accessibility issues
    if (audits['color-contrast']?.score < 1) {
      issues.push({ type: 'critical', message: 'Color contrast ratio is insufficient for accessibility' });
    }
    if (audits['tap-targets']?.score < 1) {
      issues.push({ type: 'high', message: 'Touch targets are too small (<48px)' });
    }
    if (audits['image-alt']?.score < 1) {
      issues.push({ type: 'high', message: 'Images missing alt text' });
    }
    if (audits['button-name']?.score < 1) {
      issues.push({ type: 'high', message: 'Buttons missing accessible names' });
    }
    if (audits['link-name']?.score < 1) {
      issues.push({ type: 'medium', message: 'Links missing accessible names' });
    }
    if (audits['heading-order']?.score < 1) {
      issues.push({ type: 'medium', message: 'Heading elements not in sequential order' });
    }

    return {
      score: accessibility?.score || 0,
      issues
    };
  }

  // Analyze SEO
  analyzeSEO(audit) {
    const { data } = audit;
    const seo = data.categories?.seo;
    const audits = data.audits || {};
    
    const issues = [];
    
    // SEO issues
    if (audits['meta-description']?.score < 1) {
      issues.push({ type: 'high', message: 'Missing or invalid meta description' });
    }
    if (audits['document-title']?.score < 1) {
      issues.push({ type: 'high', message: 'Missing or invalid document title' });
    }
    if (audits['viewport']?.score < 1) {
      issues.push({ type: 'critical', message: 'Missing viewport meta tag' });
    }
    if (audits['crawlable-anchors']?.score < 1) {
      issues.push({ type: 'medium', message: 'Some links are not crawlable' });
    }
    if (audits['is-crawlable']?.score < 1) {
      issues.push({ type: 'critical', message: 'Page is not crawlable by search engines' });
    }

    return {
      score: seo?.score || 0,
      issues
    };
  }

  // Analyze best practices
  analyzeBestPractices(audit) {
    const { data } = audit;
    const bestPractices = data.categories?.['best-practices'];
    const audits = data.audits || {};
    
    const issues = [];
    
    // Best practices issues
    if (audits['uses-https']?.score < 1) {
      issues.push({ type: 'critical', message: 'Site is not using HTTPS' });
    }
    if (audits['no-vulnerable-libraries']?.score < 1) {
      issues.push({ type: 'high', message: 'Using vulnerable JavaScript libraries' });
    }
    if (audits['csp-xss']?.score < 1) {
      issues.push({ type: 'high', message: 'Missing Content Security Policy' });
    }
    if (audits['uses-responsive-images']?.score < 1) {
      issues.push({ type: 'medium', message: 'Not using responsive images' });
    }
    if (audits['image-aspect-ratio']?.score < 1) {
      issues.push({ type: 'low', message: 'Images have incorrect aspect ratios' });
    }

    return {
      score: bestPractices?.score || 0,
      issues
    };
  }

  // Generate actionable recommendations
  generateRecommendations(audits) {
    const recommendations = {
      critical: [],
      high: [],
      medium: [],
      low: []
    };

    // Performance recommendations
    const performanceIssues = audits.flatMap(audit => audit.performance?.issues || []);
    const lcpIssues = performanceIssues.filter(issue => issue.message.includes('Largest Contentful Paint'));
    const fcpIssues = performanceIssues.filter(issue => issue.message.includes('First Contentful Paint'));
    const clsIssues = performanceIssues.filter(issue => issue.message.includes('Cumulative Layout Shift'));

    if (lcpIssues.length > 0) {
      recommendations.critical.push({
        category: 'Performance',
        title: 'Optimize Largest Contentful Paint (LCP)',
        description: 'LCP is the most important Core Web Vital for user experience',
        actions: [
          'Compress and optimize hero images/videos',
          'Preload critical resources',
          'Use a CDN for faster delivery',
          'Implement lazy loading for non-critical images',
          'Consider using WebP/AVIF formats'
        ],
        impact: 'High - Directly affects user experience and search rankings'
      });
    }

    if (fcpIssues.length > 0) {
      recommendations.high.push({
        category: 'Performance',
        title: 'Improve First Contentful Paint (FCP)',
        description: 'FCP measures how quickly users see content',
        actions: [
          'Minimize render-blocking resources',
          'Optimize critical CSS',
          'Use resource hints (preload, preconnect)',
          'Reduce server response time'
        ],
        impact: 'High - Affects perceived performance'
      });
    }

    if (clsIssues.length > 0) {
      recommendations.high.push({
        category: 'Performance',
        title: 'Fix Cumulative Layout Shift (CLS)',
        description: 'CLS measures visual stability during page load',
        actions: [
          'Set explicit dimensions for images and videos',
          'Reserve space for dynamic content',
          'Avoid inserting content above existing content',
          'Use CSS transforms instead of changing layout properties'
        ],
        impact: 'High - Prevents content jumping and improves UX'
      });
    }

    // Accessibility recommendations
    const accessibilityIssues = audits.flatMap(audit => audit.accessibility?.issues || []);
    const contrastIssues = accessibilityIssues.filter(issue => issue.message.includes('Color contrast'));
    const tapTargetIssues = accessibilityIssues.filter(issue => issue.message.includes('Touch targets'));

    if (contrastIssues.length > 0) {
      recommendations.critical.push({
        category: 'Accessibility',
        title: 'Fix Color Contrast Issues',
        description: 'Ensure text is readable for all users',
        actions: [
          'Increase contrast ratio to at least 4.5:1 for normal text',
          'Use tools like WebAIM Contrast Checker',
          'Test with color blindness simulators',
          'Ensure sufficient contrast for interactive elements'
        ],
        impact: 'Critical - Required for accessibility compliance'
      });
    }

    if (tapTargetIssues.length > 0) {
      recommendations.high.push({
        category: 'Accessibility',
        title: 'Improve Touch Target Sizes',
        description: 'Make interactive elements easier to tap on mobile',
        actions: [
          'Ensure touch targets are at least 48x48px',
          'Add adequate spacing between interactive elements',
          'Test on actual mobile devices',
          'Consider thumb-friendly navigation patterns'
        ],
        impact: 'High - Improves mobile usability'
      });
    }

    // SEO recommendations
    const seoIssues = audits.flatMap(audit => audit.seo?.issues || []);
    const metaDescriptionIssues = seoIssues.filter(issue => issue.message.includes('meta description'));
    const titleIssues = seoIssues.filter(issue => issue.message.includes('document title'));

    if (metaDescriptionIssues.length > 0) {
      recommendations.high.push({
        category: 'SEO',
        title: 'Add Meta Descriptions',
        description: 'Meta descriptions improve click-through rates from search results',
        actions: [
          'Write unique meta descriptions for each page (150-160 characters)',
          'Include target keywords naturally',
          'Make descriptions compelling and action-oriented',
          'Avoid duplicate meta descriptions'
        ],
        impact: 'High - Improves search result appearance and CTR'
      });
    }

    if (titleIssues.length > 0) {
      recommendations.high.push({
        category: 'SEO',
        title: 'Optimize Page Titles',
        description: 'Page titles are crucial for SEO and user experience',
        actions: [
          'Write unique, descriptive titles for each page',
          'Keep titles under 60 characters',
          'Include primary keywords near the beginning',
          'Use brand name consistently'
        ],
        impact: 'High - Critical for search rankings'
      });
    }

    return recommendations;
  }

  // Generate comprehensive analysis
  analyze() {
    console.log('🔍 Starting comprehensive website analysis...');
    
    // Find and load audit files
    this.findAuditFiles();
    const audits = this.loadAuditData();
    
    if (audits.length === 0) {
      console.log('❌ No audit files found');
      return this.analysisResults;
    }

    // Analyze each page
    const pageAnalyses = audits.map(audit => {
      console.log(`📊 Analyzing ${audit.url}`);
      
      return {
        url: audit.url,
        timestamp: audit.timestamp,
        performance: this.analyzePerformance(audit),
        accessibility: this.analyzeAccessibility(audit),
        seo: this.analyzeSEO(audit),
        bestPractices: this.analyzeBestPractices(audit)
      };
    });

    // Calculate overall scores
    const overallScores = {
      performance: pageAnalyses.reduce((sum, page) => sum + page.performance.metrics.score, 0) / pageAnalyses.length,
      accessibility: pageAnalyses.reduce((sum, page) => sum + page.accessibility.score, 0) / pageAnalyses.length,
      seo: pageAnalyses.reduce((sum, page) => sum + page.seo.score, 0) / pageAnalyses.length,
      bestPractices: pageAnalyses.reduce((sum, page) => sum + page.bestPractices.score, 0) / pageAnalyses.length
    };

    // Generate recommendations
    const recommendations = this.generateRecommendations(pageAnalyses);

    // Compile results
    this.analysisResults = {
      overall: {
        scores: overallScores,
        averageScore: Object.values(overallScores).reduce((sum, score) => sum + score, 0) / 4
      },
      pages: pageAnalyses,
      recommendations,
      summary: {
        totalPages: pageAnalyses.length,
        criticalIssues: recommendations.critical.length,
        highIssues: recommendations.high.length,
        mediumIssues: recommendations.medium.length,
        lowIssues: recommendations.low.length
      }
    };

    return this.analysisResults;
  }

  // Generate detailed report
  generateReport() {
    const results = this.analyze();
    
    console.log('\n' + '='.repeat(80));
    console.log('🎯 WEBSITE PERFORMANCE & DESIGN AUDIT REPORT');
    console.log('='.repeat(80));
    
    console.log(`\n📊 OVERALL SCORES:`);
    console.log(`Performance: ${(results.overall.scores.performance * 100).toFixed(1)}%`);
    console.log(`Accessibility: ${(results.overall.scores.accessibility * 100).toFixed(1)}%`);
    console.log(`SEO: ${(results.overall.scores.seo * 100).toFixed(1)}%`);
    console.log(`Best Practices: ${(results.overall.scores.bestPractices * 100).toFixed(1)}%`);
    console.log(`Average Score: ${(results.overall.averageScore * 100).toFixed(1)}%`);

    console.log(`\n📈 SUMMARY:`);
    console.log(`Pages Analyzed: ${results.summary.totalPages}`);
    console.log(`Critical Issues: ${results.summary.criticalIssues}`);
    console.log(`High Priority Issues: ${results.summary.highIssues}`);
    console.log(`Medium Priority Issues: ${results.summary.mediumIssues}`);
    console.log(`Low Priority Issues: ${results.summary.lowIssues}`);

    // Critical recommendations
    if (results.recommendations.critical.length > 0) {
      console.log('\n🚨 CRITICAL RECOMMENDATIONS:');
      results.recommendations.critical.forEach((rec, index) => {
        console.log(`\n${index + 1}. ${rec.title} (${rec.category})`);
        console.log(`   ${rec.description}`);
        console.log(`   Impact: ${rec.impact}`);
        console.log(`   Actions:`);
        rec.actions.forEach(action => console.log(`   • ${action}`));
      });
    }

    // High priority recommendations
    if (results.recommendations.high.length > 0) {
      console.log('\n⚠️  HIGH PRIORITY RECOMMENDATIONS:');
      results.recommendations.high.forEach((rec, index) => {
        console.log(`\n${index + 1}. ${rec.title} (${rec.category})`);
        console.log(`   ${rec.description}`);
        console.log(`   Impact: ${rec.impact}`);
        console.log(`   Actions:`);
        rec.actions.forEach(action => console.log(`   • ${action}`));
      });
    }

    // Medium priority recommendations
    if (results.recommendations.medium.length > 0) {
      console.log('\n📋 MEDIUM PRIORITY RECOMMENDATIONS:');
      results.recommendations.medium.forEach((rec, index) => {
        console.log(`\n${index + 1}. ${rec.title} (${rec.category})`);
        console.log(`   ${rec.description}`);
        console.log(`   Impact: ${rec.impact}`);
        console.log(`   Actions:`);
        rec.actions.forEach(action => console.log(`   • ${action}`));
      });
    }

    // Page-by-page breakdown
    console.log('\n📄 PAGE-BY-PAGE ANALYSIS:');
    results.pages.forEach((page, index) => {
      console.log(`\n${index + 1}. ${page.url}`);
      console.log(`   Performance: ${(page.performance.metrics.score * 100).toFixed(1)}%`);
      console.log(`   Accessibility: ${(page.accessibility.score * 100).toFixed(1)}%`);
      console.log(`   SEO: ${(page.seo.score * 100).toFixed(1)}%`);
      console.log(`   Best Practices: ${(page.bestPractices.score * 100).toFixed(1)}%`);
      
      const allIssues = [
        ...page.performance.issues,
        ...page.accessibility.issues,
        ...page.seo.issues,
        ...page.bestPractices.issues
      ];
      
      if (allIssues.length > 0) {
        console.log(`   Issues: ${allIssues.length}`);
        allIssues.slice(0, 3).forEach(issue => {
          console.log(`   • ${issue.message}`);
        });
        if (allIssues.length > 3) {
          console.log(`   • ... and ${allIssues.length - 3} more issues`);
        }
      }
    });

    console.log('\n' + '='.repeat(80));
    console.log('✅ Analysis complete! Focus on critical and high-priority issues first.');
    console.log('='.repeat(80));

    return results;
  }

  // Save detailed report to file
  saveReport(filename = 'audit-analysis-report.json') {
    const results = this.analyze();
    fs.writeFileSync(filename, JSON.stringify(results, null, 2));
    console.log(`📄 Detailed report saved to: ${filename}`);
    return filename;
  }
}

// Export for use in other modules
export default WebsiteAnalyzer;