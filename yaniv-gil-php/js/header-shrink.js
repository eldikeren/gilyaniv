// js/header-shrink.js
document.addEventListener('DOMContentLoaded', () => {
  const header   = document.getElementById('siteHeader');
  const sentinel = document.getElementById('headerSentinel');
  if (!header || !sentinel) return;

  // Ensure the sentinel exists & has size (also set in CSS)
  if (!sentinel.offsetHeight) sentinel.style.height = '1px';

  // Shrink header when sentinel leaves viewport
  const io = new IntersectionObserver(([entry]) => {
    header.classList.toggle('is-compact', !entry.isIntersecting);
  }, { rootMargin: '-1px 0px 0px 0px', threshold: 0 });

  io.observe(sentinel);

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
  document.querySelectorAll('.mega-toggle').forEach(btn => {
    const li = btn.closest('.has-mega');
    const pane = li?.querySelector('.mega-panel');
    
    if (li && btn && pane) {
      const closeMega = () => { 
        li.classList.remove('open'); 
        btn.setAttribute('aria-expanded','false'); 
      };
      
      btn.addEventListener('click', () => {
        const open = li.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(open));
        
        // Close siblings
        li.parentElement.querySelectorAll('.has-mega').forEach(sib => {
          if (sib !== li) {
            sib.classList.remove('open');
            sib.querySelector('.mega-toggle')?.setAttribute('aria-expanded','false');
          }
        });
      });
      
      // Close on outside click, Escape, or scroll
      document.addEventListener('click', (e) => { 
        if (!li.contains(e.target)) closeMega(); 
      });
      document.addEventListener('keydown', (e) => { 
        if (e.key === 'Escape') closeMega(); 
      });
    }
  });

  // Close mega on scroll (optional polish)
  const megaLI  = document.querySelector('.has-mega');
  const megaBtn = document.querySelector('.mega-toggle');
  const closeMega = () => {
    if (megaLI && megaBtn) {
      megaLI.classList.remove('open');
      megaBtn.setAttribute('aria-expanded','false');
    }
  };
  window.addEventListener('scroll', closeMega, { passive:true });
});