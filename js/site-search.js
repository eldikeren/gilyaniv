/**
 * Site Search — Self-contained search feature
 * Injects search button into header, creates modal, uses Fuse.js for fuzzy search.
 */
(function () {
  'use strict';

  var FUSE_CDN = 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.basic.min.js';
  var INDEX_URL = '/js/search-index.json?v=2';
  var CSS_URL = '/css/search-modal.css';
  var MAX_RESULTS = 8;
  var DEBOUNCE_MS = 200;

  var fuse = null;
  var searchData = null;
  var isOpen = false;
  var debounceTimer = null;
  var savedScrollY = 0;

  // --- Icons ---
  var ICON_SEARCH = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';
  var ICON_CLOSE = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';

  // --- Inject CSS ---
  function injectCSS() {
    if (document.querySelector('link[href="' + CSS_URL + '"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = CSS_URL;
    document.head.appendChild(link);
  }

  // --- Load script dynamically ---
  function loadScript(url) {
    return new Promise(function (resolve, reject) {
      if (window.Fuse) { resolve(); return; }
      var s = document.createElement('script');
      s.src = url;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }

  // --- Initialize Fuse.js ---
  function initFuse() {
    if (fuse) return Promise.resolve();
    return Promise.all([
      loadScript(FUSE_CDN),
      fetch(INDEX_URL).then(function (r) { return r.json(); })
    ]).then(function (results) {
      searchData = results[1];
      fuse = new window.Fuse(searchData, {
        keys: [
          { name: 'title', weight: 0.35 },
          { name: 'h1', weight: 0.3 },
          { name: 'description', weight: 0.25 },
          { name: 'excerpt', weight: 0.1 }
        ],
        threshold: 0.4,
        distance: 200,
        minMatchCharLength: 2,
        includeScore: true,
        ignoreLocation: true
      });
    });
  }

  // --- Build DOM ---
  var backdrop, modal, input, resultsContainer, statusEl, triggerBtn;

  function buildModal() {
    // Backdrop
    backdrop = document.createElement('div');
    backdrop.className = 'search-backdrop';
    backdrop.addEventListener('click', closeSearch);
    backdrop.addEventListener('touchend', function (e) {
      e.preventDefault();
      closeSearch();
    });

    // Modal
    modal = document.createElement('div');
    modal.className = 'search-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'חיפוש באתר');
    modal.addEventListener('click', function (e) { e.stopPropagation(); });

    // Input area
    var inputWrap = document.createElement('div');
    inputWrap.className = 'search-input-wrap';
    inputWrap.innerHTML = ICON_SEARCH;

    input = document.createElement('input');
    input.type = 'search';
    input.className = 'search-input';
    input.placeholder = 'חיפוש באתר...';
    input.setAttribute('aria-label', 'חיפוש');
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('autocorrect', 'off');
    input.setAttribute('autocapitalize', 'off');
    input.setAttribute('spellcheck', 'false');
    input.setAttribute('enterkeyhint', 'search');

    var closeBtn = document.createElement('button');
    closeBtn.className = 'search-close-btn';
    closeBtn.setAttribute('aria-label', 'סגור חיפוש');
    closeBtn.innerHTML = ICON_CLOSE;
    closeBtn.addEventListener('click', closeSearch);

    inputWrap.appendChild(input);
    inputWrap.appendChild(closeBtn);

    // Results
    resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    resultsContainer.setAttribute('aria-live', 'polite');

    // Status message (loading / empty)
    statusEl = document.createElement('div');
    statusEl.className = 'search-status';
    resultsContainer.appendChild(statusEl);

    // Keyboard hint
    var hint = document.createElement('div');
    hint.className = 'search-hint';
    hint.innerHTML = '<span><kbd>Esc</kbd> לסגירה</span><span><kbd>↑↓</kbd> ניווט</span><span><kbd>Enter</kbd> בחירה</span>';

    modal.appendChild(inputWrap);
    modal.appendChild(resultsContainer);
    modal.appendChild(hint);

    document.body.appendChild(backdrop);
    document.body.appendChild(modal);

    // Input handler
    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(doSearch, DEBOUNCE_MS);
    });

    // Keyboard navigation
    input.addEventListener('keydown', handleKeyNav);
  }

  // --- Search logic ---
  function doSearch() {
    var query = input.value.trim();
    if (!query || query.length < 2) {
      showStatus('הקלידו לפחות 2 תווים לחיפוש');
      return;
    }

    if (!fuse) {
      showStatus('טוען...');
      initFuse().then(function () { doSearch(); });
      return;
    }

    var results = fuse.search(query).slice(0, MAX_RESULTS);

    if (results.length === 0) {
      showStatus('לא נמצאו תוצאות עבור "' + query + '"');
      return;
    }

    resultsContainer.innerHTML = '';
    results.forEach(function (r, i) {
      var item = r.item;
      var a = document.createElement('a');
      a.className = 'search-result-item';
      a.href = item.url;
      a.setAttribute('tabindex', '0');
      a.setAttribute('data-index', i);

      var titleDiv = document.createElement('div');
      titleDiv.className = 'search-result-title';
      titleDiv.textContent = item.h1 || item.title;

      var excerptDiv = document.createElement('div');
      excerptDiv.className = 'search-result-excerpt';
      excerptDiv.textContent = item.description || item.excerpt;

      a.appendChild(titleDiv);
      a.appendChild(excerptDiv);
      resultsContainer.appendChild(a);
    });
  }

  function showStatus(msg) {
    resultsContainer.innerHTML = '';
    statusEl = document.createElement('div');
    statusEl.className = 'search-status';
    statusEl.textContent = msg;
    resultsContainer.appendChild(statusEl);
  }

  // --- Keyboard navigation ---
  function handleKeyNav(e) {
    var items = resultsContainer.querySelectorAll('.search-result-item');
    if (!items.length) return;

    var focused = resultsContainer.querySelector('.search-result-item:focus');
    var idx = focused ? parseInt(focused.getAttribute('data-index'), 10) : -1;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      var next = idx < items.length - 1 ? idx + 1 : 0;
      items[next].focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (idx <= 0) {
        input.focus();
      } else {
        items[idx - 1].focus();
      }
    } else if (e.key === 'Enter' && focused) {
      e.preventDefault();
      focused.click();
    }
  }

  // --- iOS scroll lock helpers ---
  function lockScroll() {
    savedScrollY = window.pageYOffset || document.documentElement.scrollTop;
    document.body.style.position = 'fixed';
    document.body.style.top = '-' + savedScrollY + 'px';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
  }

  function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.overflow = '';
    window.scrollTo(0, savedScrollY);
  }

  // --- Open / Close ---
  function openSearch() {
    if (isOpen) return;
    isOpen = true;

    // Position modal dynamically below the header
    var header = document.getElementById('site-header');
    var isMobile = window.innerWidth <= 640;

    if (isMobile) {
      // On mobile, position right below header
      var headerH = header ? header.offsetHeight : 0;
      modal.style.top = headerH + 'px';
      modal.style.maxHeight = (window.innerHeight - headerH) + 'px';
    } else if (header) {
      var h = header.offsetHeight + 8;
      modal.style.top = h + 'px';
      modal.style.maxHeight = (window.innerHeight - h - 20) + 'px';
    }

    backdrop.classList.add('active');
    modal.classList.add('active');
    lockScroll();

    // Init Fuse in background
    initFuse();

    // Focus input — delay slightly for iOS to register the DOM change
    setTimeout(function () { input.focus(); }, 50);

    showStatus('הקלידו לפחות 2 תווים לחיפוש');
  }

  function closeSearch() {
    if (!isOpen) return;
    isOpen = false;
    backdrop.classList.remove('active');
    modal.classList.remove('active');
    unlockScroll();
    input.value = '';
    input.blur();
    resultsContainer.innerHTML = '';
    if (triggerBtn) triggerBtn.focus();
  }

  // --- Global keyboard shortcut ---
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) {
      closeSearch();
    }
    // Ctrl+K or Cmd+K to open search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (isOpen) { closeSearch(); } else { openSearch(); }
    }
  });

  // --- Inject search button into header ---
  function injectButton() {
    var header = document.getElementById('site-header');
    if (!header) return false;

    // Find the CTA container (the flex div with the call button)
    var ctaContainer = header.querySelector('.flex.items-center.space-x-4');
    if (!ctaContainer) {
      // Fallback: try other common patterns
      ctaContainer = header.querySelector('.flex.items-center.space-x-reverse');
    }
    if (!ctaContainer) return false;

    triggerBtn = document.createElement('button');
    triggerBtn.id = 'search-trigger';
    triggerBtn.className = 'search-trigger-btn';
    triggerBtn.setAttribute('aria-label', 'חיפוש באתר');
    triggerBtn.setAttribute('title', 'חיפוש באתר');
    triggerBtn.innerHTML = ICON_SEARCH;
    triggerBtn.addEventListener('click', openSearch);

    ctaContainer.insertBefore(triggerBtn, ctaContainer.firstChild);
    return true;
  }

  // --- Inject search + social into mobile menu ---
  function injectMobileMenuExtras() {
    var mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) return;

    var nav = mobileMenu.querySelector('nav');
    if (!nav) return;

    // Avoid double injection
    if (nav.querySelector('.mobile-menu-search-btn')) return;

    // Search button
    var searchDiv = document.createElement('div');
    searchDiv.style.cssText = 'margin-top: 1rem; padding: 0 0.5rem;';

    var mobileSearchBtn = document.createElement('button');
    mobileSearchBtn.className = 'mobile-menu-search-btn';
    mobileSearchBtn.setAttribute('aria-label', 'חיפוש באתר');
    mobileSearchBtn.innerHTML = ICON_SEARCH + '<span style="margin-right:8px">חיפוש באתר</span>';
    mobileSearchBtn.addEventListener('click', function () {
      var menu = document.getElementById('mobile-menu');
      if (menu) {
        menu.classList.remove('active');
        document.body.style.overflow = '';
      }
      setTimeout(openSearch, 150);
    });

    searchDiv.appendChild(mobileSearchBtn);
    nav.appendChild(searchDiv);

    // Social links
    var socialDiv = document.createElement('div');
    socialDiv.style.cssText = 'display:flex;gap:12px;justify-content:center;margin-top:1.5rem;padding:1rem 0;border-top:1px solid rgba(201,165,92,0.2);';
    socialDiv.innerHTML =
      '<a href="https://www.facebook.com/people/%D7%99%D7%A0%D7%99%D7%91-%D7%92%D7%99%D7%9C-%D7%95%D7%A9%D7%95%D7%AA-%D7%9E%D7%A9%D7%A8%D7%93-%D7%A2%D7%95%D7%93/100063695315034/" target="_blank" rel="noopener" title="Facebook" aria-label="Facebook" style="display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;border:1px solid rgba(201,165,92,0.4);color:#c9a55c;transition:all 0.3s;">' +
        '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' +
      '</a>' +
      '<a href="https://www.instagram.com/yanivgiladv/" target="_blank" rel="noopener" title="Instagram" aria-label="Instagram" style="display:flex;align-items:center;justify-content:center;width:44px;height:44px;border-radius:50%;border:1px solid rgba(201,165,92,0.4);color:#c9a55c;transition:all 0.3s;">' +
        '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>' +
      '</a>';

    nav.appendChild(socialDiv);
  }

  // --- Init on DOM ready ---
  function init() {
    injectCSS();
    buildModal();
    injectButton();
    injectMobileMenuExtras();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
