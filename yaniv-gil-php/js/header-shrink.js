// /js/header-shrink.js
// Uses IntersectionObserver on #headerSentinel to toggle .is-compact on #siteHeader

(function () {
  if (window.__HEADER_SHRINK_WIRED__) return;
  window.__HEADER_SHRINK_WIRED__ = true;

  window.initHeaderShrink = function initHeaderShrink() {
    const header = document.getElementById('siteHeader');
    const sentinel = document.getElementById('headerSentinel');
    if (!header || !sentinel) return;
    if (!sentinel.offsetHeight) sentinel.style.height = '1px';

    const io = new IntersectionObserver(([entry]) => {
      header.classList.toggle('is-compact', !entry.isIntersecting);
    }, { rootMargin: '-1px 0px 0px 0px', threshold: 0 });
    io.observe(sentinel);
  };

  // If elements already exist, init immediately
  if (document.getElementById('siteHeader') && document.getElementById('headerSentinel')) {
    window.initHeaderShrink();
  }
})();
