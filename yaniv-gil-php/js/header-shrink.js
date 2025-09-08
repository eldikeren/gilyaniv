// header-shrink.js
document.addEventListener('DOMContentLoaded', () => {
  const header   = document.getElementById('siteHeader');
  const sentinel = document.getElementById('headerSentinel');
  if (!header || !sentinel) return;

  // Ensure sentinel is visible to the observer
  sentinel.style.height = sentinel.offsetHeight ? sentinel.style.height : '1px';

  // Shrink header when the top sentinel scrolls out of view
  const io = new IntersectionObserver(([entry]) => {
    header.classList.toggle('is-compact', !entry.isIntersecting);
  }, { rootMargin: '-1px 0px 0px 0px', threshold: 0 });
  io.observe(sentinel);
  // IntersectionObserver is more performant than scroll handlers for this job.

  // Mobile hamburger → slide-in primary nav
  const burger = document.querySelector('.hamburger');
  const primaryNav = document.getElementById('primary-nav');
  if (burger && primaryNav) {
    burger.addEventListener('click', () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      document.body.classList.toggle('nav-open', !expanded);
    });
  }

  // Mega menu ("תחומי התמחות") toggle with proper aria-expanded
  const megaLI   = document.querySelector('.has-mega');
  const megaBtn  = document.querySelector('.mega-toggle');
  const megaPane = megaLI?.querySelector('.mega-panel');

  if (megaLI && megaBtn && megaPane) {
    const closeMega = () => { megaLI.classList.remove('open'); megaBtn.setAttribute('aria-expanded','false'); };
    megaBtn.addEventListener('click', () => {
      const open = megaLI.classList.toggle('open');
      megaBtn.setAttribute('aria-expanded', String(open));
    });
    // Close on outside click, Escape, or scroll
    document.addEventListener('click', (e) => { if (!megaLI.contains(e.target)) closeMega(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMega(); });
    window.addEventListener('scroll', () => { closeMega(); }, { passive:true });
  }
});
