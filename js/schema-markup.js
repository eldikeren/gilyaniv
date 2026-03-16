// Schema Markup for yanivgil.co.il - Dynamic structured data injection
// Adds LegalService, Attorney, FAQPage, and Article schema to all pages
(function() {
    "use strict";

    var BASE_URL = "https://www.yanivgil.co.il";
    var path = window.location.pathname.replace(/\.html$/, "").replace(/\/$/, "") || "/";

    // LegalService + LocalBusiness Schema (all pages)
    var legalService = {
        "@context": "https://schema.org",
        "@type": ["LegalService", "Attorney"],
        "@id": BASE_URL + "/#organization",
        "name": "\u05DE\u05E9\u05E8\u05D3 \u05E2\u05D5\u05F4\u05D3 \u05D5\u05E0\u05D5\u05D8\u05E8\u05D9\u05D5\u05DF \u05D9\u05E0\u05D9\u05D1 \u05D2\u05D9\u05DC \u05D5\u05E9\u05D5\u05EA\u05F3",
        "alternateName": "Yaniv Gil Law Office",
        "url": BASE_URL,
        "logo": BASE_URL + "/images/logo.webp",
        "image": BASE_URL + "/images/yaniv-gil-lawyer.webp",
        "telephone": "+972-54-818-4581",
        "email": "office@yanivgil.co.il",
        "priceRange": "$$",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "\u05D3\u05E8\u05DA \u05DE\u05E0\u05D7\u05DD \u05D1\u05D2\u05D9\u05DF 11",
            "addressLocality": "\u05EA\u05DC \u05D0\u05D1\u05D9\u05D1",
            "addressRegion": "\u05DE\u05D7\u05D5\u05D6 \u05EA\u05DC \u05D0\u05D1\u05D9\u05D1",
            "postalCode": "6522007",
            "addressCountry": "IL"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 32.0853,
            "longitude": 34.7818
        },
        "areaServed": [
            {"@type": "City", "name": "\u05EA\u05DC \u05D0\u05D1\u05D9\u05D1"},
            {"@type": "City", "name": "\u05E8\u05DE\u05EA \u05D2\u05DF"},
            {"@type": "City", "name": "\u05E8\u05D0\u05E9\u05D5\u05DF \u05DC\u05E6\u05D9\u05D5\u05DF"},
            {"@type": "City", "name": "\u05E4\u05EA\u05D7 \u05EA\u05E7\u05D5\u05D5\u05D4"},
            {"@type": "City", "name": "\u05D1\u05EA \u05D9\u05DD"},
            {"@type": "City", "name": "\u05D7\u05D5\u05DC\u05D5\u05DF"},
            {"@type": "City", "name": "\u05D4\u05E8\u05E6\u05DC\u05D9\u05D4"},
            {"@type": "City", "name": "\u05E0\u05EA\u05E0\u05D9\u05D4"},
            {"@type": "City", "name": "\u05D1\u05E0\u05D9 \u05D1\u05E8\u05E7"},
            {"@type": "City", "name": "\u05E8\u05E2\u05E0\u05E0\u05D4"},
            {"@type": "City", "name": "\u05DB\u05E4\u05E8 \u05E1\u05D1\u05D0"},
            {"@type": "City", "name": "\u05D0\u05E9\u05D3\u05D5\u05D3"}
        ],
        "openingHoursSpecification": [{
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Sunday","Monday","Tuesday","Wednesday","Thursday"],
            "opens": "09:00",
            "closes": "18:00"
        }],
        "sameAs": [
            "https://www.facebook.com/yanivgil.co.il/",
            "https://www.instagram.com/yanivgil.co.il/"
        ],
        "knowsAbout": [
            "\u05D3\u05D9\u05E0\u05D9 \u05DE\u05E9\u05E4\u05D7\u05D4",
            "\u05D2\u05D9\u05E8\u05D5\u05E9\u05D9\u05DF",
            "\u05DE\u05D6\u05D5\u05E0\u05D5\u05EA",
            "\u05DE\u05E9\u05DE\u05D5\u05E8\u05EA \u05D9\u05DC\u05D3\u05D9\u05DD",
            "\u05D7\u05DC\u05D5\u05E7\u05EA \u05E8\u05DB\u05D5\u05E9",
            "\u05D4\u05E1\u05DB\u05DD \u05D2\u05D9\u05E8\u05D5\u05E9\u05D9\u05DF",
            "\u05D4\u05E1\u05DB\u05DD \u05DE\u05DE\u05D5\u05DF",
            "\u05D9\u05D3\u05D5\u05E2\u05D9\u05DD \u05D1\u05E6\u05D9\u05D1\u05D5\u05E8",
            "\u05E6\u05D5\u05D5\u05D0\u05D5\u05EA",
            "\u05E0\u05D5\u05D8\u05E8\u05D9\u05D5\u05DF"
        ],
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "\u05E9\u05D9\u05E8\u05D5\u05EA\u05D9\u05DD \u05DE\u05E9\u05E4\u05D8\u05D9\u05D9\u05DD",
            "itemListElement": [
                {"@type":"Offer","itemOffered":{"@type":"Service","name":"\u05D2\u05D9\u05E8\u05D5\u05E9\u05D9\u05DF \u05D5\u05D4\u05E1\u05DB\u05DE\u05D9 \u05D2\u05D9\u05E8\u05D5\u05E9\u05D9\u05DF"}},
                {"@type":"Offer","itemOffered":{"@type":"Service","name":"\u05DE\u05D6\u05D5\u05E0\u05D5\u05EA \u05D0\u05D9\u05E9\u05D4 \u05D5\u05D9\u05DC\u05D3\u05D9\u05DD"}},
                {"@type":"Offer","itemOffered":{"@type":"Service","name":"\u05DE\u05E9\u05DE\u05D5\u05E8\u05EA \u05D9\u05DC\u05D3\u05D9\u05DD \u05D5\u05D4\u05E1\u05D3\u05E8\u05D9 \u05E8\u05D0\u05D9\u05D9\u05D4"}},
                {"@type":"Offer","itemOffered":{"@type":"Service","name":"\u05D7\u05DC\u05D5\u05E7\u05EA \u05E8\u05DB\u05D5\u05E9 \u05D5\u05D0\u05D9\u05D6\u05D5\u05DF \u05DE\u05E9\u05D0\u05D1\u05D9\u05DD"}},
                {"@type":"Offer","itemOffered":{"@type":"Service","name":"\u05D4\u05E1\u05DB\u05DE\u05D9 \u05DE\u05DE\u05D5\u05DF"}},
                {"@type":"Offer","itemOffered":{"@type":"Service","name":"\u05E9\u05D9\u05E8\u05D5\u05EA\u05D9 \u05E0\u05D5\u05D8\u05E8\u05D9\u05D5\u05DF"}}
            ]
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "214",
            "bestRating": "5",
            "worstRating": "1"
        }
    };

    // Person Schema for Attorney
    var attorney = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": BASE_URL + "/#attorney",
        "name": "\u05E2\u05D5\u05F4\u05D3 \u05D9\u05E0\u05D9\u05D1 \u05D2\u05D9\u05DC",
        "alternateName": "Yaniv Gil",
        "jobTitle": "\u05E2\u05D5\u05E8\u05DA \u05D3\u05D9\u05DF \u05D5\u05E0\u05D5\u05D8\u05E8\u05D9\u05D5\u05DF",
        "url": BASE_URL,
        "image": BASE_URL + "/images/yaniv-gil-lawyer.webp",
        "worksFor": {"@id": BASE_URL + "/#organization"}
    };

    // WebSite Schema (homepage only)
    var webSite = null;
    if (path === "/" || path === "/index" || path === "") {
        webSite = {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": BASE_URL + "/#website",
            "name": "\u05DE\u05E9\u05E8\u05D3 \u05E2\u05D5\u05F4\u05D3 \u05D9\u05E0\u05D9\u05D1 \u05D2\u05D9\u05DC",
            "url": BASE_URL,
            "publisher": {"@id": BASE_URL + "/#organization"},
            "inLanguage": "he-IL"
        };
    }

    // FAQPage Schema - auto-detect FAQ sections
    var faqSchema = null;
    var faqItems = [];
    var headings = document.querySelectorAll("h2, h3");
    var faqSection = null;
    for (var i = 0; i < headings.length; i++) {
        var txt = headings[i].textContent;
        if (txt.indexOf("\u05E9\u05D0\u05DC\u05D5\u05EA") > -1 || txt.indexOf("FAQ") > -1) {
            faqSection = headings[i]; break;
        }
    }
    if (faqSection) {
        var parent = faqSection.parentElement;
        if (parent) {
            var details = parent.querySelectorAll("details");
            if (details.length > 0) {
                details.forEach(function(d) {
                    var q = d.querySelector("summary");
                    if (q) {
                        var a = d.cloneNode(true);
                        a.removeChild(a.querySelector("summary"));
                        faqItems.push({"@type":"Question","name":q.textContent.trim(),"acceptedAnswer":{"@type":"Answer","text":a.textContent.trim()}});
                    }
                });
            }
            if (faqItems.length === 0) {
                var sibs = parent.children;
                var found = false, curQ = null;
                for (var j = 0; j < sibs.length; j++) {
                    if (sibs[j] === faqSection) { found = true; continue; }
                    if (!found) continue;
                    var tag = sibs[j].tagName;
                    if (tag === "H3" || tag === "H4") {
                        if (curQ && faqItems.length < 10) faqItems.push(curQ);
                        curQ = {"@type":"Question","name":sibs[j].textContent.trim(),"acceptedAnswer":{"@type":"Answer","text":""}};
                    } else if (curQ && (tag === "P" || tag === "DIV")) {
                        curQ.acceptedAnswer.text += sibs[j].textContent.trim() + " ";
                    } else if (tag === "H2") { break; }
                }
                if (curQ && curQ.acceptedAnswer.text && faqItems.length < 10) faqItems.push(curQ);
            }
        }
    }
    if (faqItems.length >= 2) {
        faqSchema = {"@context":"https://schema.org","@type":"FAQPage","mainEntity":faqItems};
    }

    // Article Schema (content pages with long text)
    var articleSchema = null;
    var isArticle = false;
    var artPatterns = ["/maamar","/madrikh","/guide","/mezonot-","/mishmeret-","/heskem-","/halokat-","/yeduim-","/chalokat-","/chaluka-","/chishov-"];
    for (var k = 0; k < artPatterns.length; k++) {
        if (path.indexOf(artPatterns[k]) > -1) { isArticle = true; break; }
    }
    var mainEl = document.querySelector("main, article, .content, [class*=content]");
    if (mainEl && mainEl.textContent.length > 2000) isArticle = true;
    if (isArticle && path !== "/" && path !== "/index") {
        var pTitle = document.title.split("|")[0].trim();
        var mDesc = "";
        var mEl = document.querySelector("meta[name=description]");
        if (mEl) mDesc = mEl.getAttribute("content");
        var h1El = document.querySelector("h1");
        articleSchema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": h1El ? h1El.textContent.trim() : pTitle,
            "description": mDesc,
            "author": {"@id": BASE_URL + "/#attorney"},
            "publisher": {"@id": BASE_URL + "/#organization"},
            "mainEntityOfPage": {"@type":"WebPage","@id": BASE_URL + path},
            "datePublished": "2024-01-01",
            "dateModified": "2026-03-17",
            "inLanguage": "he-IL"
        };
    }

    // Inject all schemas into head
    function injectSchema(data) {
        if (!data) return;
        var s = document.createElement("script");
        s.type = "application/ld+json";
        s.textContent = JSON.stringify(data);
        document.head.appendChild(s);
    }

    // Check if LegalService already exists
    var existing = document.querySelectorAll("script[type=\"application/ld+json\"]");
    var hasLS = false;
    existing.forEach(function(s) {
        try {
            var d = JSON.parse(s.textContent);
            if (d["@type"] === "LegalService" || (Array.isArray(d["@type"]) && d["@type"].indexOf("LegalService") > -1)) hasLS = true;
        } catch(e) {}
    });

    if (!hasLS) { injectSchema(legalService); injectSchema(attorney); }
    if (webSite) injectSchema(webSite);
    if (faqSchema) injectSchema(faqSchema);
    if (articleSchema) injectSchema(articleSchema);

})();
