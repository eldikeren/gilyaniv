/**
 * cookie-consent.js — תקנה 13 לתקנות הגנת הפרטיות (אבטחת מידע), תשע"ז-2017
 * Israeli cookie regulation compliance popup for yanivgil.co.il
 * v1.0 | 2026
 *
 * Behaviour:
 *  - Shows a banner on first visit if no consent is stored
 *  - Stores choice in localStorage under key 'cookieConsent' ('accepted' | 'declined')
 *  - If declined: removes GA/GTM scripts and blocks further analytics loading
 *  - If accepted: nothing extra needed (GTM/GA already load normally)
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'cookieConsent';
  var CONSENT_VERSION = '1'; // bump when policy changes

  /* ── helpers ── */
  function getConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var obj = JSON.parse(raw);
      if (obj.version !== CONSENT_VERSION) return null; // policy changed
      return obj.choice; // 'accepted' | 'declined'
    } catch (e) { return null; }
  }

  function setConsent(choice) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        choice: choice,
        version: CONSENT_VERSION,
        ts: new Date().toISOString()
      }));
    } catch (e) {}
  }

  /* ── block analytics when declined ── */
  function blockAnalytics() {
    // Prevent GA4 / GTM from firing
    window['ga-disable-G-1ES9G9LMG6'] = true;
    window.dataLayer = window.dataLayer || [];
    // Prevent future pushes from triggering
    var noop = function () {};
    window.gtag = noop;
  }

  /* ── apply stored consent on page load ── */
  var stored = getConsent();
  if (stored === 'declined') {
    blockAnalytics();
    return; // nothing more to do — no banner needed
  }
  if (stored === 'accepted') {
    return; // consent already given — banner not needed
  }

  /* ── Build and inject the banner ── */
  function createBanner() {
    var style = document.createElement('style');
    style.textContent = [
      '#ck13-overlay{',
        'position:fixed;inset:0;background:rgba(0,0,0,0.55);',
        'z-index:99998;display:flex;align-items:flex-end;',
        'justify-content:center;padding:0 0 0 0;',
        'font-family:"Heebo",sans-serif;direction:rtl;',
      '}',
      '#ck13-banner{',
        'background:#1a1a2e;color:#e2e8f0;',
        'width:100%;max-width:100%;padding:20px 24px 22px;',
        'border-top:3px solid #c9a55c;',
        'box-shadow:0 -4px 24px rgba(0,0,0,0.4);',
        'display:flex;flex-wrap:wrap;align-items:center;gap:14px 20px;',
      '}',
      '#ck13-text{flex:1 1 280px;font-size:0.88rem;line-height:1.6;color:#cbd5e1;}',
      '#ck13-text a{color:#c9a55c;text-decoration:underline;}',
      '#ck13-actions{display:flex;gap:10px;flex-wrap:wrap;}',
      '#ck13-accept{',
        'background:#c9a55c;color:#1a1a2e;border:none;',
        'padding:10px 22px;border-radius:6px;font-size:0.9rem;',
        'font-weight:700;cursor:pointer;font-family:inherit;',
        'transition:background 0.2s;',
      '}',
      '#ck13-accept:hover{background:#e0bc6e;}',
      '#ck13-decline{',
        'background:transparent;color:#94a3b8;',
        'border:1px solid #475569;',
        'padding:10px 18px;border-radius:6px;font-size:0.85rem;',
        'cursor:pointer;font-family:inherit;',
        'transition:color 0.2s,border-color 0.2s;',
      '}',
      '#ck13-decline:hover{color:#e2e8f0;border-color:#94a3b8;}',
      '@media(max-width:600px){',
        '#ck13-banner{flex-direction:column;align-items:flex-start;}',
        '#ck13-actions{width:100%;}',
        '#ck13-accept,#ck13-decline{flex:1;text-align:center;}',
      '}'
    ].join('');
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.id = 'ck13-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'הסכמה לשימוש בעוגיות');

    var banner = document.createElement('div');
    banner.id = 'ck13-banner';

    var privacyUrl = '/privacy-policy';

    var textEl = document.createElement('p');
    textEl.id = 'ck13-text';
    textEl.innerHTML =
      '<strong style="color:#c9a55c;">הודעה על שימוש בעוגיות (תקנה 13)</strong><br>' +
      'אתר זה משתמש בעוגיות לניתוח תנועה (Google Analytics) ולמעקב המרות. ' +
      'השימוש כפוף ל<a href="' + privacyUrl + '" target="_blank">מדיניות הפרטיות</a> שלנו. ' +
      'לחיצה על "מאשר" מהווה הסכמה לשימוש בעוגיות שאינן חיוניות לפעילות האתר.';

    var actions = document.createElement('div');
    actions.id = 'ck13-actions';

    var acceptBtn = document.createElement('button');
    acceptBtn.id = 'ck13-accept';
    acceptBtn.textContent = 'מאשר';
    acceptBtn.setAttribute('type', 'button');

    var declineBtn = document.createElement('button');
    declineBtn.id = 'ck13-decline';
    declineBtn.textContent = 'מסרב';
    declineBtn.setAttribute('type', 'button');

    actions.appendChild(acceptBtn);
    actions.appendChild(declineBtn);
    banner.appendChild(textEl);
    banner.appendChild(actions);
    overlay.appendChild(banner);
    document.body.appendChild(overlay);

    /* button handlers */
    function dismiss() {
      overlay.style.transition = 'opacity 0.3s';
      overlay.style.opacity = '0';
      setTimeout(function () {
        if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      }, 320);
    }

    acceptBtn.addEventListener('click', function () {
      setConsent('accepted');
      dismiss();
      // GA/GTM already running — nothing extra needed
    });

    declineBtn.addEventListener('click', function () {
      setConsent('declined');
      blockAnalytics();
      dismiss();
    });
  }

  /* wait for DOM to be ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBanner);
  } else {
    createBanner();
  }

})();
