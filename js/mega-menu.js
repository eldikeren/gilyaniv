// Accessible Mega Menu + Mobile Nav
document.addEventListener('DOMContentLoaded', () => {
  const body        = document.body;
  const mqMobile    = window.matchMedia('(max-width: 768px)');
  const hamburger   = document.querySelector('.hamburger');
  const primaryNav  = document.querySelector('#primary-nav');
  const megaToggles = Array.from(document.querySelectorAll('.mega-toggle'));
  const megaItems   = Array.from(document.querySelectorAll('.has-mega'));
  
  // --- Helpers ---
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
    body.classList.add('nav-open');                 // ✅ matches CSS
    if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    closeAllMega();                                 // avoid double menus
  };
  const closeMobileNav = () => {
    body.classList.remove('nav-open');              // ✅ matches CSS
    if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
  };
  const isNavOpen = () => body.classList.contains('nav-open');

  // --- Mega menu (desktop & mobile) ---
  megaToggles.forEach(btn => {
    const item = btn.closest('.has-mega');
    if (!item) return;

    // Click toggles open/close
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

    // Keyboard support
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

  // Close mega on outside click
  document.addEventListener('click', (e) => {
    const insideMega = e.target.closest('.has-mega');
    if (!insideMega) closeAllMega();
  });

  // --- Mobile nav (hamburger) ---
  if (hamburger && primaryNav) {
    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      if (isNavOpen()) closeMobileNav();
      else openMobileNav();
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
      if (!isNavOpen()) return;
      const clickedNav = e.target.closest('#primary-nav');
      const clickedHamburger = e.target.closest('.hamburger');
      if (!clickedNav && !clickedHamburger) closeMobileNav();
    });

    // Esc closes the mobile nav
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isNavOpen()) {
        closeMobileNav();
        hamburger.focus();
      }
    });

    // On resize to desktop, ensure nav is closed
    const handleResize = () => {
      if (!mqMobile.matches) closeMobileNav();
    };
    mqMobile.addEventListener ? mqMobile.addEventListener('change', handleResize)
                              : window.addEventListener('resize', handleResize);
  }

  // Close all open mega panels on scroll
  window.addEventListener('scroll', closeAllMega, { passive: true });
});
