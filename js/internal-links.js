/**
 * Internal Links Component for yanivgil.co.il
 * Purpose: Dynamically inject contextual internal links on every page
 * to improve Google crawling and indexing of all 200+ pages.
 *
 * INSTALLATION: Add this script tag before </body> on all pages:
 * <script src="/js/internal-links.js" defer></script>
 *
 * Or add to the site's common footer/template.
 */

(function() {
  'use strict';

  // Topic cluster definitions with all unindexed pages
  const clusters = {
    mezonot_isha: {
      title: 'מזונות אישה',
      hub: '/mezonot-isha',
      pages: [
        { url: '/mezonot-isha', text: 'מזונות אישה - מדריך מקיף' },
        { url: '/mezonot-isha-mishmoret', text: 'מזונות אישה ומשמורת' },
        { url: '/mezonot-isha-nisuin-arochim', text: 'מזונות אישה בנישואין ארוכים' },
        { url: '/mezonot-isha-nisuin-ktzarim', text: 'מזונות אישה בנישואין קצרים' },
        { url: '/mezonot-zmaniim', text: 'מזונות זמניים' },
        { url: '/mezonot-retroaktivim', text: 'מזונות רטרואקטיביים' },
        { url: '/mezonot-isha-madur', text: 'מזונות אישה - מדור' },
        { url: '/mezonot-isha-hashlama', text: 'מזונות אישה - השלמה' },
        { url: '/mezonot-isha-yerusha', text: 'מזונות אישה וירושה' },
        { url: '/mezonot-isha-gdola', text: 'מזונות אישה - מבוגרת' },
        { url: '/mezonot-isha-beit-din', text: 'מזונות אישה בבית דין' },
        { url: '/mezonot-isha-tluyim', text: 'מזונות אישה תלויים' },
        { url: '/mezonot-isha-hozer', text: 'מזונות אישה - החזר' }
      ]
    },
    mezonot_yeladim: {
      title: 'מזונות ילדים',
      hub: '/mezonot-yeladim',
      pages: [
        { url: '/mezonot-yeladim', text: 'מזונות ילדים - מדריך מקיף' },
        { url: '/chishov-mezonot-yeladim', text: 'חישוב מזונות ילדים' },
        { url: '/hagdalat-mezonot-yeladim', text: 'הגדלת מזונות ילדים' },
        { url: '/hafchatat-mezonot-yeladim', text: 'הפחתת מזונות ילדים' },
        { url: '/mezonot-yeladim-gil-0-6', text: 'מזונות ילדים גיל 0-6' },
        { url: '/mezonot-yeladim-gil-6-18', text: 'מזונות ילדים גיל 6-18' },
        { url: '/mezonot-yeled-holeh', text: 'מזונות ילד חולה' },
        { url: '/mezonot-yeladim-boger', text: 'מזונות ילדים בגירים' },
        { url: '/mezonot-yeladim-mishmoret-meshuteft', text: 'מזונות ילדים במשמורת משותפת' },
        { url: '/mezonot-yeladim-sherut-leumi', text: 'מזונות ילדים בשירות לאומי' },
        { url: '/mezonot-yeladim-bituach-leumi', text: 'מזונות ילדים וביטוח לאומי' }
      ]
    },
    mishmoret: {
      title: 'משמורת ילדים',
      hub: '/mishmoret-yeladim',
      pages: [
        { url: '/mishmoret-yeladim', text: 'משמורת ילדים - מדריך מקיף' },
        { url: '/mishmoret-blaudit-vsmeshuteft', text: 'משמורת בלעדית ומשותפת' },
        { url: '/mishmoret-em-av', text: 'משמורת אם מול אב' },
        { url: '/mishmoret-gil-harach', text: 'משמורת גיל הרך' },
        { url: '/mishmoret-gil-hitbagrot', text: 'משמורת גיל ההתבגרות' },
        { url: '/mishmoret-meshuteft-tnai', text: 'תנאי משמורת משותפת' },
        { url: '/mishmoret-hashlama', text: 'השלמת משמורת' },
        { url: '/shinui-mishmoret', text: 'שינוי משמורת' },
        { url: '/mishmoret-savim', text: 'משמורת סבים' }
      ]
    },
    heskem_gerushin: {
      title: 'הסכם גירושין',
      hub: '/heskem-gerushin',
      pages: [
        { url: '/heskem-gerushin', text: 'הסכם גירושין - מדריך מקיף' },
        { url: '/heskem-gerushin-im-yeladim', text: 'הסכם גירושין עם ילדים' },
        { url: '/heskem-gerushin-lelo-yeladim', text: 'הסכם גירושין ללא ילדים' },
        { url: '/heskem-gerushin-lelo-od', text: 'הסכם גירושין ללא עורך דין' },
        { url: '/heskem-gerushin-mahir', text: 'הסכם גירושין מהיר' },
        { url: '/heskem-gerushin-chaluka-dira', text: 'הסכם גירושין וחלוקת דירה' },
        { url: '/heskem-gerushin-dugma', text: 'הסכם גירושין - דוגמה' },
        { url: '/heskem-gerushin-hafarat', text: 'הפרת הסכם גירושין' },
        { url: '/heskem-gerushin-batel', text: 'ביטול הסכם גירושין' },
        { url: '/heskem-gerushin-shinui', text: 'שינוי הסכם גירושין' }
      ]
    },
    heskem_mamon: {
      title: 'הסכם ממון',
      hub: '/heskem-mamon',
      pages: [
        { url: '/heskem-mamon', text: 'הסכם ממון - מדריך מקיף' },
        { url: '/heskem-mamon-bemashluch', text: 'הסכם ממון במשלוח' },
        { url: '/heskem-mamon-dira-yarasha', text: 'הסכם ממון דירה וירושה' },
        { url: '/heskem-mamon-esek', text: 'הסכם ממון ועסק' },
        { url: '/heskem-mamon-nisuin-shniyim', text: 'הסכם ממון בנישואין שניים' },
        { url: '/heskem-mamon-zchuyot-sotzialiyot', text: 'הסכם ממון וזכויות סוציאליות' },
        { url: '/heskem-mamon-dugma', text: 'הסכם ממון - דוגמה' },
        { url: '/heskem-mamon-leachar-nisuin', text: 'הסכם ממון לאחר נישואין' },
        { url: '/heskem-mamon-bitcoin', text: 'הסכם ממון וביטקוין' }
      ]
    },
    chalokat_rechush: {
      title: 'חלוקת רכוש',
      hub: '/property-division',
      pages: [
        { url: '/property-division', text: 'חלוקת רכוש בגירושין' },
        { url: '/chalokat-esek-gerushin', text: 'חלוקת עסק בגירושין' },
        { url: '/chalokat-hovot-gerushin', text: 'חלוקת חובות בגירושין' },
        { url: '/chaluka-bitcoin-matbeot', text: 'חלוקת ביטקוין ומטבעות' },
        { url: '/chaluka-zchuyot-sotzialiyot', text: 'חלוקת זכויות סוציאליות' },
        { url: '/chaluka-dira-meshuteft', text: 'חלוקת דירה משותפת' },
        { url: '/chaluka-kesef-bbank', text: 'חלוקת כסף בבנק' },
        { url: '/chaluka-rechush-yerusha', text: 'חלוקת רכוש ירושה' }
      ]
    },
    yaduyim: {
      title: 'ידועים בציבור',
      hub: '/yaduyim-batzibur',
      pages: [
        { url: '/yaduyim-batzibur', text: 'ידועים בציבור - מדריך מקיף' },
        { url: '/yaduyim-batzibur-bituach-leumi', text: 'ידועים בציבור וביטוח לאומי' },
        { url: '/yaduyim-lo-yecholim-lehitnashe', text: 'ידועים בציבור שלא יכולים להינשא' },
        { url: '/prida-yaduyim-batzibur', text: 'פרידה ידועים בציבור' },
        { url: '/yerusha-yaduyim-batzibur', text: 'ירושה ידועים בציבור' }
      ]
    },
    core_services: {
      title: 'תחומי התמחות',
      hub: '/family-law',
      pages: [
        { url: '/family-law', text: 'דיני משפחה' },
        { url: '/divorce-lawyer-tel-aviv', text: 'עורך דין גירושין תל אביב' },
        { url: '/execution', text: 'הוצאה לפועל' },
        { url: '/reviews', text: 'חוות דעת לקוחות' },
        { url: '/service-areas', text: 'אזורי שירות' },
        { url: '/mediation', text: 'גישור' },
        { url: '/bankruptcy', text: 'חדלות פירעון' },
        { url: '/debt-cancellation', text: 'ביטול חובות' },
        { url: '/travel-restriction', text: 'עיכוב יציאה מהארץ' },
        { url: '/insolvency', text: 'פשיטת רגל' },
        { url: '/inheritance', text: 'דיני ירושה' },
        { url: '/will-contest', text: 'עריכת צוואה' }
      ]
    },
    service_areas: {
      title: 'אזורי שירות',
      hub: '/service-areas',
      pages: [
        { url: '/od-gerushin-telaviv', text: 'עורך דין גירושין תל אביב' },
        { url: '/od-gerushin-gush-dan', text: 'עורך דין גירושין גוש דן' },
        { url: '/od-gerushin-ramatgan', text: 'עורך דין גירושין רמת גן' },
        { url: '/od-beit-din-rabani', text: 'עורך דין בית דין רבני' },
        { url: '/od-chaluka-rechush', text: 'עורך דין חלוקת רכוש' },
        { url: '/od-heskem-mamon', text: 'עורך דין הסכם ממון' },
        { url: '/od-mezonot-isha', text: 'עורך דין מזונות אישה' },
        { url: '/od-mezonot-yeladim', text: 'עורך דין מזונות ילדים' },
        { url: '/od-mishmoret-yeladim-telaviv', text: 'עורך דין משמורת ילדים תל אביב' },
        { url: '/od-sarvanut-get', text: 'עורך דין סרבנות גט' },
        { url: '/od-yduim-baziber', text: 'עורך דין ידועים בציבור' }
      ]
    },
    blog: {
      title: 'מאמרים',
      hub: '/blog',
      pages: [
        { url: '/blog', text: 'בלוג משפטי' },
        { url: '/blog-articles/child-support-calculation', text: 'חישוב מזונות ילדים' },
        { url: '/blog-articles/consensual-divorce', text: 'גירושין בהסכמה' },
        { url: '/blog-articles/family-mediation-vs-court', text: 'גישור משפחתי מול בית משפט' },
        { url: '/blog-articles/financial-agreement-guide', text: 'מדריך הסכם ממון' },
        { url: '/blog-articles/hague-convention', text: 'אמנת האג' },
        { url: '/blog-articles/joint-custody-guide', text: 'מדריך משמורת משותפת' },
        { url: '/blog-articles/property-division-divorce', text: 'חלוקת רכוש בגירושין' },
        { url: '/blog-articles/relocation-after-divorce', text: 'מעבר דירה אחרי גירושין' }
      ]
    }
  };

  // Determine current page's cluster(s) based on URL
  function getCurrentClusters() {
    var path = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '');
    if (!path) path = '/';

    var matched = [];
    for (var key in clusters) {
      var cluster = clusters[key];
      for (var i = 0; i < cluster.pages.length; i++) {
        if (cluster.pages[i].url === path) {
          matched.push(key);
          break;
        }
      }
    }
    return matched;
  }

  // Get related clusters for cross-linking
  function getRelatedClusters(currentKeys) {
    var relations = {
      mezonot_isha: ['mezonot_yeladim', 'heskem_gerushin', 'chalokat_rechush'],
      mezonot_yeladim: ['mezonot_isha', 'mishmoret', 'heskem_gerushin'],
      mishmoret: ['mezonot_yeladim', 'heskem_gerushin', 'core_services'],
      heskem_gerushin: ['mezonot_isha', 'mezonot_yeladim', 'chalokat_rechush'],
      heskem_mamon: ['chalokat_rechush', 'heskem_gerushin', 'yaduyim'],
      chalokat_rechush: ['heskem_mamon', 'heskem_gerushin', 'core_services'],
      yaduyim: ['heskem_mamon', 'chalokat_rechush', 'core_services'],
      core_services: ['heskem_gerushin', 'mishmoret', 'mezonot_yeladim'],
      service_areas: ['core_services', 'heskem_gerushin', 'mezonot_yeladim'],
      blog: ['core_services', 'heskem_gerushin', 'mezonot_yeladim']
    };

    var related = [];
    for (var i = 0; i < currentKeys.length; i++) {
      var rels = relations[currentKeys[i]] || [];
      for (var j = 0; j < rels.length; j++) {
        if (related.indexOf(rels[j]) === -1 && currentKeys.indexOf(rels[j]) === -1) {
          related.push(rels[j]);
        }
      }
    }
    return related.slice(0, 3);
  }

  // Build and inject the links section
  function injectLinks() {
    var currentClusters = getCurrentClusters();
    var path = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '');
    if (!path) path = '/';

    // If page is not in any cluster, show general navigation
    if (currentClusters.length === 0) {
      currentClusters = ['core_services'];
    }

    var relatedKeys = getRelatedClusters(currentClusters);

    // Build HTML
    var html = '<section class="internal-links-section" dir="rtl" style="' +
      'max-width:1200px;margin:40px auto;padding:30px 20px;' +
      'border-top:2px solid #c5a55a;font-family:Arial,sans-serif;">';

    // Current cluster links
    for (var c = 0; c < currentClusters.length; c++) {
      var cluster = clusters[currentClusters[c]];
      if (!cluster) continue;
      html += '<div style="margin-bottom:25px;">';
      html += '<h3 style="color:#1a3a5c;font-size:20px;margin-bottom:12px;">' +
        cluster.title + ' - \u05D3\u05E4\u05D9\u05DD \u05E0\u05D5\u05E1\u05E4\u05D9\u05DD</h3>';
      html += '<div style="display:flex;flex-wrap:wrap;gap:8px;">';
      for (var i = 0; i < cluster.pages.length; i++) {
        var page = cluster.pages[i];
        if (page.url === path) continue; // Skip current page
        html += '<a href="' + page.url + '" style="' +
          'display:inline-block;padding:6px 14px;' +
          'background:#f5f0e8;color:#1a3a5c;text-decoration:none;' +
          'border-radius:20px;font-size:14px;border:1px solid #ddd;' +
          'transition:all 0.2s;">' + page.text + '</a>';
      }
      html += '</div></div>';
    }

    // Related cluster links
    if (relatedKeys.length > 0) {
      html += '<div style="margin-top:20px;padding-top:20px;border-top:1px solid #eee;">';
      html += '<h3 style="color:#1a3a5c;font-size:18px;margin-bottom:12px;">\u05E0\u05D5\u05E9\u05D0\u05D9\u05DD \u05E7\u05E9\u05D5\u05E8\u05D9\u05DD</h3>';
      html += '<div style="display:flex;flex-wrap:wrap;gap:8px;">';
      for (var r = 0; r < relatedKeys.length; r++) {
        var relCluster = clusters[relatedKeys[r]];
        if (!relCluster) continue;
        // Show hub page + 2-3 top sub-pages
        var showPages = relCluster.pages.slice(0, 4);
        for (var p = 0; p < showPages.length; p++) {
          var rPage = showPages[p];
          if (rPage.url === path) continue;
          html += '<a href="' + rPage.url + '" style="' +
            'display:inline-block;padding:6px 14px;' +
            'background:#fff;color:#1a3a5c;text-decoration:none;' +
            'border-radius:20px;font-size:13px;border:1px solid #c5a55a;' +
            'transition:all 0.2s;">' + rPage.text + '</a>';
        }
      }
      html += '</div></div>';
    }

    // Always add service area links for local SEO
    if (currentClusters.indexOf('service_areas') === -1) {
      html += '<div style="margin-top:20px;padding-top:15px;border-top:1px solid #eee;">';
      html += '<h4 style="color:#666;font-size:15px;margin-bottom:8px;">\u05D0\u05D6\u05D5\u05E8\u05D9 \u05E9\u05D9\u05E8\u05D5\u05EA</h4>';
      html += '<div style="display:flex;flex-wrap:wrap;gap:6px;">';
      var saPages = clusters.service_areas.pages.slice(0, 6);
      for (var s = 0; s < saPages.length; s++) {
        if (saPages[s].url === path) continue;
        html += '<a href="' + saPages[s].url + '" style="' +
          'display:inline-block;padding:4px 10px;' +
          'color:#666;text-decoration:none;font-size:12px;' +
          'border:1px solid #eee;border-radius:15px;">' +
          saPages[s].text + '</a>';
      }
      html += '</div></div>';
    }

    html += '</section>';

    // Find the best insertion point (before footer or at end of main content)
    var footer = document.querySelector('footer') || document.querySelector('.footer');
    var main = document.querySelector('main') || document.querySelector('.main-content') || document.querySelector('#content');

    var container = document.createElement('div');
    container.innerHTML = html;

    if (footer) {
      footer.parentNode.insertBefore(container, footer);
    } else if (main) {
      main.appendChild(container);
    } else {
      document.body.appendChild(container);
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectLinks);
  } else {
    injectLinks();
  }
})();
