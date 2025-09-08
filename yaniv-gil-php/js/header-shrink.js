document.addEventListener('DOMContentLoaded', () => {
  const header   = document.getElementById('siteHeader');
  const sentinel = document.getElementById('headerSentinel');
  if (!header || !sentinel) return;

  if (!sentinel.offsetHeight) sentinel.style.height = '1px';

  new IntersectionObserver(([entry]) => {
    header.classList.toggle('is-compact', !entry.isIntersecting);
  }, { rootMargin: '-1px 0px 0px 0px', threshold: 0 }).observe(sentinel);
});