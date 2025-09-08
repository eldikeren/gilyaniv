// header-shrink.js
(function(){
  const header = document.getElementById('siteHeader');
  const sentinel = document.getElementById('headerSentinel');
  if (!header || !sentinel) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const io = new IntersectionObserver((entries)=>{
    const e = entries[0];
    // When sentinel is OUT of view, page has scrolled –> compact header
    if (!e.isIntersecting) header.classList.add('is-compact');
    else header.classList.remove('is-compact');
  }, { rootMargin: '-1px 0px 0px 0px', threshold: 0 });

  io.observe(sentinel);

  // Optional: respect reduced motion by disabling transitions (already handled in CSS)
  prefersReduced.addEventListener?.('change', () => {/* CSS handles it */});
})();
