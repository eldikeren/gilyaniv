// /js/header-loader.js
// Injects /partials/header.html into <div id="header-root"></div> on every page
// and initializes menu behavior.

(function () {
  const run = async () => {
    const slot = document.getElementById('header-root');
    if (!slot) return;

    try {
      const res = await fetch('/partials/header.html', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      slot.innerHTML = await res.text();

      // Ensure sentinel exists immediately after the injected header
      const after = document.getElementById('headerSentinel');
      if (!after) {
        const s = document.createElement('div');
        s.id = 'headerSentinel';
        s.setAttribute('aria-hidden', 'true');
        s.style.height = '1px';
        slot.insertAdjacentElement('afterend', s);
      }

      // Initialize after injection
      if (window.initMegaMenu) window.initMegaMenu();
      if (window.initHeaderShrink) window.initHeaderShrink();
    } catch (e) {
      console.error('Failed to load header:', e);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
