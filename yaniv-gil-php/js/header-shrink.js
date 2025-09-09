document.addEventListener('DOMContentLoaded', () => {
  console.log('Header shrink script loaded');
  const header   = document.getElementById('siteHeader');
  const sentinel = document.getElementById('headerSentinel');
  console.log('Header found:', !!header);
  console.log('Sentinel found:', !!sentinel);
  if (!header || !sentinel) return;

  if (!sentinel.offsetHeight) sentinel.style.height = '1px';

  new IntersectionObserver(([entry]) => {
    console.log('Header intersection:', entry.isIntersecting);
    header.classList.toggle('is-compact', !entry.isIntersecting);
  }, { rootMargin: '-1px 0px 0px 0px', threshold: 0 }).observe(sentinel);
});