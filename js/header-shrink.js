// /js/header-shrink.js
// Adds .is-shrunk to the header after scrolling a bit

(function () {
  if (window.__HEADER_SHRINK_WIRED__) return;
  window.__HEADER_SHRINK_WIRED__ = true;

  window.initHeaderShrink = function initHeaderShrink() {
    const header = document.getElementById('siteHeader');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 12) header.classList.add('is-shrunk');
      else header.classList.remove('is-shrunk');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialize state
  };

  // If header exists already, init immediately
  if (document.getElementById('siteHeader')) {
    window.initHeaderShrink();
  }
})();
