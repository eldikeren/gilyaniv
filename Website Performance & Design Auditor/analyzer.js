import fs from "fs";
import path from "path";

export class WebsiteAnalyzer {
  constructor() {
    this.auditFiles = [];
    this.analysisResults = {};
  }

  // Find all audit JSON files
  findAuditFiles() {
    const files = fs.readdirSync(".");
    this.auditFiles = files.filter(file => file.startsWith("audit-") && file.endsWith(".json"));
    console.log(`📊 Found ${this.auditFiles.length} audit files: ${this.auditFiles.join(", ")}`);
    return this.auditFiles;
  }

  // Load and parse audit data
  loadAuditData(filename) {
    try {
      const data = fs.readFileSync(filename, "utf8");
      return JSON.parse(data);
    } catch (error) {
      console.error(`❌ Error loading ${filename}:`, error.message);
      return null;
    }
  }

  // Analyze performance metrics
  analyzePerformance(audit) {
    const performance = audit.categories.performance;
    const audits = audit.audits;
    
    const metrics = {
      score: performance.score * 100,
      fcp: audits["first-contentful-paint"]?.numericValue,
      lcp: audits["largest-contentful-paint"]?.numericValue,
      cls: audits["cumulative-layout-shift"]?.numericValue,
      fid: audits["max-potential-fid"]?.numericValue,
      tbt: audits["total-blocking-time"]?.numericValue,
      si: audits["speed-index"]?.numericValue,
      tti: audits["interactive"]?.numericValue
    };

    const issues = [];
    const recommendations = [];

    // Core Web Vitals analysis
    if (metrics.lcp > 2500) {
      issues.push("Poor LCP (Largest Contentful Paint)");
      recommendations.push({
        category: "Performance",
        priority: "High",
        issue: "Slow LCP",
        description: `LCP is ${Math.round(metrics.lcp)}ms (should be < 2500ms)`,
        solutions: [
          "Optimize and compress hero images/videos",
          "Preload critical resources",
          "Use a CDN for faster delivery",
          "Implement lazy loading for non-critical images"
        ]
      });
    }

    if (metrics.cls > 0.1) {
      issues.push("Poor CLS (Cumulative Layout Shift)");
      recommendations.push({
        category: "Performance",
        priority: "High",
        issue: "Layout Shift",
        description: `CLS score is ${metrics.cls.toFixed(3)} (should be < 0.1)`,
        solutions: [
          "Reserve space for images and ads",
          "Avoid inserting content above existing content",
          "Use size attributes for images",
          "Preload web fonts"
        ]
      });
    }

    if (metrics.fid > 100) {
      issues.push("Poor FID (First Input Delay)");
      recommendations.push({
        category: "Performance",
        priority: "Medium",
        issue: "Input Delay",
        description: `FID is ${Math.round(metrics.fid)}ms (should be < 100ms)`,
        solutions: [
          "Reduce JavaScript execution time",
          "Break up long tasks",
          "Use web workers for heavy computations",
          "Defer non-critical JavaScript"
        ]
      });
    }

    return { metrics, issues, recommendations };
  }

  // Analyze accessibility
  analyzeAccessibility(audit) {
    const accessibility = audit.categories.accessibility;
    const audits = audit.audits;
    
    const issues = [];
    const recommendations = [];

    // Color contrast
    if (audits["color-contrast"]?.score < 1) {
      issues.push("Color contrast issues");
      recommendations.push({
        category: "Accessibility",
        priority: "High",
        issue: "Insufficient Color Contrast",
        description: "Text and background colors don't meet WCAG standards",
        solutions: [
          "Increase contrast ratio to at least 4.5:1 for normal text",
          "Use contrast checking tools",
          "Test with color blindness simulators",
          "Provide alternative text for color-coded information"
        ]
      });
    }

    // Missing alt text
    if (audits["image-alt"]?.score < 1) {
      issues.push("Missing alt text");
      recommendations.push({
        category: "Accessibility",
        priority: "High",
        issue: "Missing Alt Text",
        description: "Images lack descriptive alt attributes",
        solutions: [
          "Add descriptive alt text to all images",
          "Use empty alt='' for decorative images",
          "Ensure alt text describes the image content",
          "Test with screen readers"
        ]
      });
    }

    // Tap targets
    if (audits["tap-targets"]?.score < 1) {
      issues.push("Small tap targets");
      recommendations.push({
        category: "Accessibility",
        priority: "Medium",
        issue: "Small Touch Targets",
        description: "Interactive elements are too small for mobile users",
        solutions: [
          "Ensure tap targets are at least 48x48px",
          "Add adequate spacing between interactive elements",
          "Test on actual mobile devices",
          "Consider thumb-friendly navigation"
        ]
      });
    }

    return { 
      score: accessibility.score * 100, 
      issues, 
      recommendations 
    };
  }

  // Analyze SEO
  analyzeSEO(audit) {
    const seo = audit.categories.seo;
    const audits = audit.audits;
    
    const issues = [];
    const recommendations = [];

    // Meta description
    if (audits["meta-description"]?.score < 1) {
      issues.push("Missing meta description");
      recommendations.push({
        category: "SEO",
        priority: "Medium",
        issue: "Missing Meta Description",
        description: "Page lacks a meta description tag",
        solutions: [
          "Add unique meta descriptions (150-160 characters)",
          "Include target keywords naturally",
          "Write compelling descriptions that encourage clicks",
          "Avoid duplicate meta descriptions across pages"
        ]
      });
    }

    // Title tag
    if (audits["document-title"]?.score < 1) {
      issues.push("Missing or poor title tag");
      recommendations.push({
        category: "SEO",
        priority: "High",
        issue: "Title Tag Issues",
        description: "Page title is missing or not optimized",
        solutions: [
          "Add unique, descriptive title tags (50-60 characters)",
          "Include primary keywords near the beginning",
          "Make titles compelling and click-worthy",
          "Avoid keyword stuffing"
        ]
      });
    }

    // Heading structure
    if (audits["heading-order"]?.score < 1) {
      issues.push("Poor heading structure");
      recommendations.push({
        category: "SEO",
        priority: "Medium",
        issue: "Heading Structure",
        description: "Headings don't follow proper hierarchy",
        solutions: [
          "Use H1 for main page title",
          "Follow logical heading order (H1 > H2 > H3)",
          "Don't skip heading levels",
          "Use headings to structure content logically"
        ]
      });
    }

    return { 
      score: seo.score * 100, 
      issues, 
      recommendations 
    };
  }

  // Analyze best practices
  analyzeBestPractices(audit) {
    const bestPractices = audit.categories["best-practices"];
    const audits = audit.audits;
    
    const issues = [];
    const recommendations = [];

    // HTTPS
    if (audits["is-on-https"]?.score < 1) {
      issues.push("Not using HTTPS");
      recommendations.push({
        category: "Security",
        priority: "High",
        issue: "HTTP Instead of HTTPS",
        description: "Site is not using secure HTTPS protocol",
        solutions: [
          "Install SSL certificate",
          "Redirect all HTTP traffic to HTTPS",
          "Update internal links to use HTTPS",
          "Test HTTPS implementation thoroughly"
        ]
      });
    }

    // Console errors
    if (audits["no-console-time"]?.score < 1) {
      issues.push("Console errors present");
      recommendations.push({
        category: "Best Practices",
        priority: "Medium",
        issue: "Console Errors",
        description: "JavaScript errors detected in browser console",
        solutions: [
          "Fix JavaScript errors and warnings",
          "Remove console.log statements from production",
          "Implement proper error handling",
          "Test in multiple browsers"
        ]
      });
    }

    return { 
      score: bestPractices.score * 100, 
      issues, 
      recommendations 
    };
  }

  // Generate comprehensive analysis
  analyzeWebsite(filename) {
    const audit = this.loadAuditData(filename);
    if (!audit) return null;

    const url = audit.finalUrl || filename;
    console.log(`\n🔍 Analyzing: ${url}`);

    const analysis = {
      url,
      timestamp: new Date().toISOString(),
      performance: this.analyzePerformance(audit),
      accessibility: this.analyzeAccessibility(audit),
      seo: this.analyzeSEO(audit),
      bestPractices: this.analyzeBestPractices(audit)
    };

    // Calculate overall score
    analysis.overallScore = Math.round(
      (analysis.performance.metrics.score + 
       analysis.accessibility.score + 
       analysis.seo.score + 
       analysis.bestPractices.score) / 4
    );

    return analysis;
  }

  // Generate priority-based action plan
  generateActionPlan(analyses) {
    const allRecommendations = [];
    
    analyses.forEach(analysis => {
      [
        ...analysis.performance.recommendations,
        ...analysis.accessibility.recommendations,
        ...analysis.seo.recommendations,
        ...analysis.bestPractices.recommendations
      ].forEach(rec => {
        allRecommendations.push({
          ...rec,
          url: analysis.url
        });
      });
    });

    // Group by priority
    const highPriority = allRecommendations.filter(r => r.priority === "High");
    const mediumPriority = allRecommendations.filter(r => r.priority === "Medium");
    const lowPriority = allRecommendations.filter(r => r.priority === "Low");

    return {
      highPriority,
      mediumPriority,
      lowPriority,
      totalIssues: allRecommendations.length
    };
  }

  // Generate detailed report
  generateReport() {
    console.log("\n" + "=".repeat(80));
    console.log("🎯 WEBSITE PERFORMANCE & DESIGN AUDIT REPORT");
    console.log("=".repeat(80));

    const auditFiles = this.findAuditFiles();
    if (auditFiles.length === 0) {
      console.log("❌ No audit files found. Run the audit first.");
      return;
    }

    const analyses = auditFiles.map(file => this.analyzeWebsite(file)).filter(Boolean);
    const actionPlan = this.generateActionPlan(analyses);

    // Summary
    console.log("\n📊 EXECUTIVE SUMMARY");
    console.log("-".repeat(50));
    analyses.forEach(analysis => {
      console.log(`\n🌐 ${analysis.url}`);
      console.log(`   Overall Score: ${analysis.overallScore}%`);
      console.log(`   Performance: ${Math.round(analysis.performance.metrics.score)}%`);
      console.log(`   Accessibility: ${Math.round(analysis.accessibility.score)}%`);
      console.log(`   SEO: ${Math.round(analysis.seo.score)}%`);
      console.log(`   Best Practices: ${Math.round(analysis.bestPractices.score)}%`);
    });

    // High Priority Issues
    console.log("\n🚨 HIGH PRIORITY ISSUES");
    console.log("-".repeat(50));
    if (actionPlan.highPriority.length === 0) {
      console.log("✅ No high priority issues found!");
    } else {
      actionPlan.highPriority.forEach((rec, index) => {
        console.log(`\n${index + 1}. ${rec.issue} (${rec.category})`);
        console.log(`   📍 ${rec.url}`);
        console.log(`   📝 ${rec.description}`);
        console.log(`   💡 Solutions:`);
        rec.solutions.forEach(solution => console.log(`      • ${solution}`));
      });
    }

    // Medium Priority Issues
    console.log("\n⚠️  MEDIUM PRIORITY ISSUES");
    console.log("-".repeat(50));
    if (actionPlan.mediumPriority.length === 0) {
      console.log("✅ No medium priority issues found!");
    } else {
      actionPlan.mediumPriority.forEach((rec, index) => {
        console.log(`\n${index + 1}. ${rec.issue} (${rec.category})`);
        console.log(`   📍 ${rec.url}`);
        console.log(`   📝 ${rec.description}`);
        console.log(`   💡 Solutions:`);
        rec.solutions.forEach(solution => console.log(`      • ${solution}`));
      });
    }

    // Performance Insights
    console.log("\n⚡ PERFORMANCE INSIGHTS");
    console.log("-".repeat(50));
    analyses.forEach(analysis => {
      const perf = analysis.performance.metrics;
      console.log(`\n🌐 ${analysis.url}`);
      console.log(`   First Contentful Paint: ${Math.round(perf.fcp)}ms`);
      console.log(`   Largest Contentful Paint: ${Math.round(perf.lcp)}ms`);
      console.log(`   Cumulative Layout Shift: ${perf.cls?.toFixed(3) || 'N/A'}`);
      console.log(`   Total Blocking Time: ${Math.round(perf.tbt)}ms`);
    });

    // Action Plan Summary
    console.log("\n📋 ACTION PLAN SUMMARY");
    console.log("-".repeat(50));
    console.log(`Total Issues Found: ${actionPlan.totalIssues}`);
    console.log(`High Priority: ${actionPlan.highPriority.length}`);
    console.log(`Medium Priority: ${actionPlan.mediumPriority.length}`);
    console.log(`Low Priority: ${actionPlan.lowPriority.length}`);

    // Save detailed report
    const reportData = {
      timestamp: new Date().toISOString(),
      summary: analyses.map(a => ({
        url: a.url,
        overallScore: a.overallScore,
        performance: Math.round(a.performance.metrics.score),
        accessibility: Math.round(a.accessibility.score),
        seo: Math.round(a.seo.score),
        bestPractices: Math.round(a.bestPractices.score)
      })),
      actionPlan,
      detailedAnalyses: analyses
    };

    fs.writeFileSync("audit-report.json", JSON.stringify(reportData, null, 2));
    console.log("\n💾 Detailed report saved to: audit-report.json");

    return reportData;
  }
}

// Run analysis if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const analyzer = new WebsiteAnalyzer();
  analyzer.generateReport();
}
