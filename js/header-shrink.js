// /js/header-shrink.js
// Uses IntersectionObserver on #headerSentinel to toggle .is-compact on #siteHeader

(function () {
  if (window.__HEADER_SHRINK_WIRED__) return;
  window.__HEADER_SHRINK_WIRED__ = true;

  window.initHeaderShrink = function initHeaderShrink() {
    // ✅ FIXED: Only select header without data-noheader attribute
    const header = document.querySelector('#siteHeader:not([data-noheader])');
    const sentinel = document.getElementById('headerSentinel');
    
    if (!header || !sentinel) {
      console.warn('Header or sentinel not found, retrying...');
      // Retry after a short delay in case elements are being loaded asynchronously
      setTimeout(window.initHeaderShrink, 300);
      return;
    }
    
    if (!sentinel.offsetHeight) sentinel.style.height = '1px';
    console.log('Header shrink initialized');

    const io = new IntersectionObserver(([entry]) => {
      header.classList.toggle('is-compact', !entry.isIntersecting);
    }, { rootMargin: '-1px 0px 0px 0px', threshold: 0 });
    io.observe(sentinel);
  };

  // If elements already exist, init immediately
  // ✅ FIXED: Only select header without data-noheader attribute
  if (document.querySelector('#siteHeader:not([data-noheader])') && document.getElementById('headerSentinel')) {
    window.initHeaderShrink();
  } else {
    console.log('Header shrink initialized (retry)');
    setTimeout(window.initHeaderShrink, 500);
  }
})();
