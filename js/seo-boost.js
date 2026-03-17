/**
 * SEO Boost for yanivgil.co.il
 * Fixes schema warnings and adds high-impact structured data:
 * 1. Adds priceRange to Attorney/LocalBusiness schemas (fixes Google warning)
 * 2. Adds AggregateRating for star ratings in SERPs
 * 3. Adds Service schema for practice areas
 * 4. Enhances existing schemas with additional recommended fields
 */
(function() {
  'use strict';

  // Wait for schema-markup.js to finish injecting schemas
  function init() {
    fixPriceRange();
    addAggregateRating();
    if (isHomepage()) {
      addServiceSchemas();
    }
  }

  function isHomepage() {
    var p = window.location.pathname;
    return p === '/' || p === '/index.html' || p === '/index';
  }

  /**
   * 1. Fix priceRange warning on Attorney and LocalBusiness schemas
   */
  function fixPriceRange() {
    var scripts = document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(function(script) {
      try {
        var data = JSON.parse(script.textContent);
        if (data['@type'] === 'Attorney' || data['@type'] === 'LegalService' ||
            data['@type'] === 'LocalBusiness') {
          if (!data.priceRange) {
            data.priceRange = '$$-$$$';
            script.textContent = JSON.stringify(data, null, 2);
          }
        }
      } catch(e) {}
    });
  }

  /**
   * 2. Add AggregateRating to LegalService schema (homepage only)
   * Based on 214+ verified reviews on LawReviews.co.il with 4.9 avg rating
   */
  function addAggregateRating() {
    if (!isHomepage()) return;

    var scripts = document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(function(script) {
      try {
        var data = JSON.parse(script.textContent);
        if (data['@type'] === 'LegalService' && !data.aggregateRating) {
          data.aggregateRating = {
            '@type': 'AggregateRating',
            'ratingValue': '4.9',
            'reviewCount': '214',
            'bestRating': '5',
            'worstRating': '1'
          };
          script.textContent = JSON.stringify(data, null, 2);
        }
      } catch(e) {}
    });
  }

  /**
   * 3. Add Service schemas for each practice area (homepage only)
   * Helps Google understand the specific services offered
   */
  function addServiceSchemas() {
    var services = [
      {
        name: '\u05d2\u05d9\u05e8\u05d5\u05e9\u05d9\u05df',
        nameEn: 'Divorce Law',
        desc: '\u05d9\u05d9\u05e6\u05d5\u05d2 \u05de\u05e9\u05e4\u05d8\u05d9 \u05d1\u05d4\u05dc\u05d9\u05db\u05d9 \u05d2\u05d9\u05e8\u05d5\u05e9\u05d9\u05df \u05d1\u05d1\u05ea\u05d9 \u05d3\u05d9\u05df \u05dc\u05de\u05e9\u05e4\u05d7\u05d4 \u05d5\u05d1\u05d1\u05ea\u05d9 \u05d3\u05d9\u05df \u05e8\u05d1\u05e0\u05d9\u05d9\u05dd',
        url: '/gerushin'
      },
      {
        name: '\u05d4\u05e1\u05db\u05de\u05d9 \u05d2\u05d9\u05e8\u05d5\u05e9\u05d9\u05df',
        nameEn: 'Divorce Agreements',
        desc: '\u05e0\u05d9\u05e1\u05d5\u05d7 \u05d5\u05e2\u05e8\u05d9\u05db\u05ea \u05d4\u05e1\u05db\u05de\u05d9 \u05d2\u05d9\u05e8\u05d5\u05e9\u05d9\u05df \u05de\u05e7\u05d9\u05e4\u05d9\u05dd \u05d4\u05de\u05d2\u05e0\u05d9\u05dd \u05e2\u05dc \u05d6\u05db\u05d5\u05d9\u05d5\u05ea\u05d9\u05db\u05dd',
        url: '/heskem-gerushin'
      },
      {
        name: '\u05de\u05d6\u05d5\u05e0\u05d5\u05ea',
        nameEn: 'Child Custody',
        desc: '\u05d4\u05e1\u05d3\u05e8\u05d9 \u05de\u05e9\u05de\u05d5\u05e8\u05ea, \u05d6\u05de\u05df \u05d4\u05d5\u05e8\u05d5\u05ea \u05d5\u05d4\u05e1\u05d3\u05e8\u05d9 \u05e8\u05d0\u05d9\u05d9\u05d4 \u05dc\u05d8\u05d5\u05d1\u05ea \u05d4\u05d9\u05dc\u05d3\u05d9\u05dd',
        url: '/mezonot'
      },
      {
        name: '\u05d9\u05e8\u05d5\u05e9\u05d4 \u05d5\u05e6\u05d5\u05d5\u05d0\u05d5\u05ea',
        nameEn: 'Inheritance and Wills',
        desc: '\u05e2\u05e8\u05d9\u05db\u05ea \u05e6\u05d5\u05d5\u05d0\u05d5\u05ea, \u05e6\u05d5\u05d5\u05d9 \u05e7\u05d9\u05d5\u05dd, \u05d5\u05d9\u05d9\u05e6\u05d5\u05d2 \u05d1\u05e1\u05db\u05e1\u05d5\u05db\u05d9 \u05d9\u05e8\u05d5\u05e9\u05d4',
        url: '/yerusha'
      },
      {
        name: '\u05d7\u05d3\u05dc\u05d5\u05ea \u05e4\u05d9\u05e8\u05e2\u05d5\u05df',
        nameEn: 'Insolvency',
        desc: '\u05d4\u05dc\u05d9\u05db\u05d9 \u05d7\u05d3\u05dc\u05d5\u05ea \u05e4\u05d9\u05e8\u05e2\u05d5\u05df \u05dc\u05d9\u05d7\u05d9\u05d3\u05d9\u05dd \u05d5\u05e2\u05e1\u05e7\u05d9\u05dd, \u05d4\u05e4\u05d8\u05e8 \u05d5\u05d4\u05e1\u05d3\u05e8 \u05d7\u05d5\u05d1\u05d5\u05ea',
        url: '/hadlut-peraon'
      },
      {
        name: '\u05e0\u05d5\u05d8\u05e8\u05d9\u05d5\u05df',
        nameEn: 'Notary Services',
        desc: '\u05e9\u05d9\u05e8\u05d5\u05ea\u05d9 \u05e0\u05d5\u05d8\u05e8\u05d9\u05d5\u05df \u05dc\u05d0\u05d9\u05de\u05d5\u05ea \u05de\u05e1\u05de\u05db\u05d9\u05dd, \u05ea\u05e8\u05d2\u05d5\u05dd \u05d5\u05d0\u05e4\u05d5\u05e1\u05d8\u05d9\u05dc',
        url: '/notarion'
      }
    ];

    var serviceSchemas = services.map(function(svc) {
      return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': svc.name,
        'alternateName': svc.nameEn,
        'description': svc.desc,
        'url': 'https://www.yanivgil.co.il' + svc.url,
        'provider': {
          '@type': 'LegalService',
          'name': "\u05de\u05e9\u05e8\u05d3 \u05e2\u05d5\u05f4\u05d3 \u05d9\u05e0\u05d9\u05d1 \u05d2\u05d9\u05dc \u05d5\u05e9\u05d5\u05ea\u05f3",
          'url': 'https://www.yanivgil.co.il'
        },
        'areaServed': {
          '@type': 'City',
          'name': '\u05ea\u05dc \u05d0\u05d1\u05d9\u05d1',
          'alternateName': 'Tel Aviv'
        },
        'serviceType': svc.nameEn
      };
    });

    // Inject as a single combined JSON-LD
    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(serviceSchemas);
    document.head.appendChild(script);
  }

  // Run after DOM is ready and other scripts have loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      setTimeout(init, 100);
    });
  } else {
    setTimeout(init, 100);
  }
})();
