/**
 * SEO Enhancements for yanivgil.co.il
 * Adds: BreadcrumbList schema, robots meta, hreflang, canonical fix
 * Loaded dynamically via conversion-tracking.js
 */
(function() {
  'use strict';

  var SITE_URL = 'https://www.yanivgil.co.il';
  var SITE_NAME = '\u05E2\u05D5\u0022\u05D3 \u05D9\u05E0\u05D9\u05D1 \u05D2\u05D9\u05DC';
  var path = window.location.pathname;
  var isHomepage = (path === '/' || path === '/index.html' || path === '/index');

  // ========== 1. BreadcrumbList Schema ==========
  function addBreadcrumbSchema() {
    var items = [];
    // Always start with homepage
    items.push({
      '@type': 'ListItem',
      'position': 1,
      'name': '\u05E2\u05DE\u05D5\u05D3 \u05E8\u05D0\u05E9\u05D9',
      'item': SITE_URL + '/'
    });

    if (!isHomepage) {
      // Determine category from URL pattern
      var category = getCategoryFromPath(path);
      var position = 2;

      if (category) {
        items.push({
          '@type': 'ListItem',
          'position': position,
          'name': category.name,
          'item': SITE_URL + category.url
        });
        position++;
      }

      // Current page
      var pageTitle = document.title.split('|')[0].trim();
      items.push({
        '@type': 'ListItem',
        'position': position,
        'name': pageTitle
      });
    }

    if (items.length > 1) {
      injectJsonLd({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': items
      });
    }
  }

  function getCategoryFromPath(p) {
    // Family law pages
    if (p.match(/gerushin|girushin|divorce/)) {
      return { name: '\u05D2\u05D9\u05E8\u05D5\u05E9\u05D9\u05DF', url: '/practice-areas-hub' };
    }
    if (p.match(/yerusha|trusha|inheritance|will|zavaa|tzavaa/i)) {
      return { name: '\u05D9\u05E8\u05D5\u05E9\u05D4 \u05D5\u05E6\u05D5\u05D5\u05D0\u05D5\u05EA', url: '/practice-areas-hub' };
    }
    if (p.match(/mezonot|mazon|alimony/i)) {
      return { name: '\u05DE\u05D6\u05D5\u05E0\u05D5\u05EA', url: '/practice-areas-hub' };
    }
    if (p.match(/mishmoret|custody|yeladim/i)) {
      return { name: '\u05DE\u05E9\u05DE\u05D5\u05E8\u05EA', url: '/practice-areas-hub' };
    }
    if (p.match(/heskem|agreement|hozeh/i)) {
      return { name: '\u05D4\u05E1\u05DB\u05DE\u05D9 \u05DE\u05DE\u05D5\u05DF', url: '/practice-areas-hub' };
    }
    if (p.match(/notari|notar/i)) {
      return { name: '\u05E0\u05D5\u05D8\u05E8\u05D9\u05D5\u05DF', url: '/practice-areas-hub' };
    }
    if (p.match(/rekush|property|dira|apartment/i)) {
      return { name: '\u05E8\u05DB\u05D5\u05E9 \u05D5\u05D7\u05DC\u05D5\u05E7\u05EA \u05E8\u05DB\u05D5\u05E9', url: '/practice-areas-hub' };
    }
    if (p.match(/hadlut|hadlat|insolvency|pshita/i)) {
      return { name: '\u05D7\u05D3\u05DC\u05D5\u05EA \u05E4\u05D9\u05E8\u05E2\u05D5\u05DF', url: '/practice-areas-hub' };
    }
    if (p.match(/mishpaha|family/i)) {
      return { name: '\u05D3\u05D9\u05E0\u05D9 \u05DE\u05E9\u05E4\u05D7\u05D4', url: '/practice-areas-hub' };
    }
    // City-based pages (od-gerushin-ramatgan, etc.)
    if (p.match(/^\/(od-|oid-)/)) {
      return { name: '\u05E2\u05D5\u05E8\u05DB\u05D9 \u05D3\u05D9\u05DF \u05DC\u05E4\u05D9 \u05D0\u05D6\u05D5\u05E8', url: '/practice-areas-hub' };
    }
    // Blog/articles
    if (p.match(/blog|article|maamar/i)) {
      return { name: '\u05DE\u05D0\u05DE\u05E8\u05D9\u05DD', url: '/practice-areas-hub' };
    }
    // Default: all content pages link back to practice areas
    return { name: '\u05EA\u05D7\u05D5\u05DE\u05D9 \u05E2\u05D9\u05E1\u05D5\u05E7', url: '/practice-areas-hub' };
  }

  // ========== 2. Fix Canonical URLs (remove .html) ==========
  function fixCanonicalUrl() {
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      var href = canonical.href;
      // Remove .html extension for clean URLs (Vercel cleanUrls: true)
      if (href.endsWith('.html') && !href.endsWith('index.html')) {
        canonical.href = href.replace(/\.html$/, '');
      }
    } else {
      // Add canonical if missing
      var link = document.createElement('link');
      link.rel = 'canonical';
      var cleanPath = path.replace(/\.html$/, '').replace(/\/index$/, '/');
      link.href = SITE_URL + cleanPath;
      document.head.appendChild(link);
    }
  }

  // ========== 3. Add Robots Meta Tag ==========
  function addRobotsMeta() {
    if (!document.querySelector('meta[name="robots"]')) {
      var meta = document.createElement('meta');
      meta.name = 'robots';
      // Check if page should be noindexed
      var noindexPages = ['/404', '/thanks', '/og-image-generator', '/og-image-template', '/index-staging'];
      var shouldNoindex = noindexPages.some(function(p) { return path.indexOf(p) === 0; });
      meta.content = shouldNoindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
      document.head.appendChild(meta);
    }
  }

  // ========== 4. Add Hreflang Tag ==========
  function addHreflang() {
    if (!document.querySelector('link[hreflang]')) {
      // Hebrew language tag
      var link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = 'he';
      var cleanPath = path.replace(/\.html$/, '').replace(/\/index$/, '/');
      link.href = SITE_URL + cleanPath;
      document.head.appendChild(link);

      // x-default (same as he since site is Hebrew only)
      var linkDefault = document.createElement('link');
      linkDefault.rel = 'alternate';
      linkDefault.hreflang = 'x-default';
      linkDefault.href = SITE_URL + cleanPath;
      document.head.appendChild(linkDefault);
    }
  }

  // ========== 5. Ensure HTML lang and dir attributes ==========
  function ensureHtmlAttributes() {
    var html = document.documentElement;
    if (!html.getAttribute('lang') || html.getAttribute('lang') !== 'he') {
      html.setAttribute('lang', 'he');
    }
    if (!html.getAttribute('dir') || html.getAttribute('dir') !== 'rtl') {
      html.setAttribute('dir', 'rtl');
    }
  }

  // ========== 6. Add preconnect hints for performance ==========
  function addPreconnectHints() {
    var domains = [
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];
    domains.forEach(function(domain) {
      if (!document.querySelector('link[rel="preconnect"][href="' + domain + '"]')) {
        var link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        if (domain.indexOf('gstatic') > -1) link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });
  }

  // ========== Helper: Inject JSON-LD ==========
  function injectJsonLd(data) {
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  // ========== Initialize All Enhancements ==========
  function init() {
    try {
      fixCanonicalUrl();
      addRobotsMeta();
      addHreflang();
      ensureHtmlAttributes();
      addPreconnectHints();
      addBreadcrumbSchema();
    } catch(e) {
      // Silent fail - don't break the page
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
