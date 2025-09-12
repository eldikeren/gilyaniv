// /js/mega-menu.js
// Accessible Mega Menu + Mobile Nav (works with injected header)

(function () {
  if (window.__MEGA_MENU_WIRED__) return; // avoid double init across pages
  window.__MEGA_MENU_WIRED__ = true;

  window.initMegaMenu = function initMegaMenu() {
    const body        = document.body;
    const mqMobile    = window.matchMedia('(max-width: 768px)');
    const hamburger   = document.querySelector('.hamburger');
    const primaryNav  = document.querySelector('#primary-nav');
    const overlay     = document.getElementById('nav-overlay');
    const megaToggles = Array.from(document.querySelectorAll('.mega-toggle'));
    const megaItems   = Array.from(document.querySelectorAll('.has-mega'));

    // --- helpers ---
    const closeAllMega = () => {
      megaItems.forEach(item => item.classList.remove('open'));
      megaToggles.forEach(btn => btn.setAttribute('aria-expanded', 'false'));
    };
    const openMega = (item, btn) => {
      closeAllMega();
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    };
    const openMobileNav = () => {
      body.classList.add('nav-open');                 // matches CSS
      if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
      closeAllMega();
    };
    const closeMobileNav = () => {
      body.classList.remove('nav-open');              // matches CSS
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
      closeAllMega();
    };
    const isNavOpen = () => body.classList.contains('nav-open');

    // --- mega menu toggle ---
    megaToggles.forEach(btn => {
      const item = btn.closest('.has-mega');
      if (!item) return;

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = item.classList.contains('open');
        if (isOpen) {
          item.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          openMega(item, btn);
        }
      });

      // keyboard
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          item.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
          btn.focus();
        }
      });

      const panel = item.querySelector('.mega-panel');
      if (panel) {
        panel.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
            item.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
            btn.focus();
          }
        });
        panel.addEventListener('focusout', () => {
          setTimeout(() => {
            if (!item.contains(document.activeElement)) {
              item.classList.remove('open');
              btn.setAttribute('aria-expanded', 'false');
            }
          }, 0);
        });
      }
    });

    // close mega on outside click
    document.addEventListener('click', (e) => {
      const insideMega = e.target.closest('.has-mega');
      if (!insideMega) closeAllMega();
    });

    // --- mobile nav / hamburger ---
    if (hamburger && primaryNav) {
      hamburger.addEventListener('click', (e) => {
        e.preventDefault();
        if (isNavOpen()) closeMobileNav();
        else openMobileNav();
      });

      // tap outside drawer to close
      if (overlay) {
        overlay.addEventListener('click', closeMobileNav);
      }

      // clicking outside drawer/hamburger closes
      document.addEventListener('click', (e) => {
        if (!isNavOpen()) return;
        const clickedNav = e.target.closest('#primary-nav');
        const clickedHamburger = e.target.closest('.hamburger');
        if (!clickedNav && !clickedHamburger) closeMobileNav();
      });

      // Escape closes
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isNavOpen()) {
          closeMobileNav();
          hamburger.focus();
        }
      });

      // resize back to desktop closes mobile nav
      const handleResize = () => {
        if (!mqMobile.matches) closeMobileNav();
      };
      if (mqMobile.addEventListener) mqMobile.addEventListener('change', handleResize);
      else window.addEventListener('resize', handleResize);
    }

    // close mega when scrolling
    window.addEventListener('scroll', closeAllMega, { passive: true });
  };

  // If header already exists inline (rare), init immediately
  if (document.querySelector('#primary-nav')) {
    window.initMegaMenu();
  }
})();
