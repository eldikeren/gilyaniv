/**
 * Site Search — Self-contained search feature
 * Injects search button into header, creates modal, uses Fuse.js for fuzzy search.
 */
(function () {
  'use strict';

  var FUSE_CDN = 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.basic.min.js';
  var INDEX_URL = '/js/search-index.json';
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

  // --- Init on DOM ready ---
  function init() {
    injectCSS();
    buildModal();
    injectButton();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
