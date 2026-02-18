/**
 * /js/back-to-top.js - Back to top button functionality
 * Shows/hides button based on scroll position, smooth scrolls to top on click
 */
(function() {
  'use strict';

  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  const threshold = 500; // Show button after scrolling 500px
  let ticking = false;

  function toggleVisibility() {
    if (window.scrollY > threshold) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
    ticking = false;
  }

  // Throttled scroll handler for performance
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(toggleVisibility);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Smooth scroll to top on click
  btn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Keyboard accessibility - Enter/Space triggers click
  btn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.click();
    }
  });

  // Initial check in case page is already scrolled
  toggleVisibility();
})();
