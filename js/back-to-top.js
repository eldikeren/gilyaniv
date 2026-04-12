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
// Fix call button text
(function() {
  function fixCallButtons() {
    var links = document.querySelectorAll('a[href="tel:0546003399"]');
    links.forEach(function(link) {
      if (link.textContent.trim() !== '\u05D4\u05EA\u05E7\u05E9\u05E8 \u05E2\u05DB\u05E9\u05D9\u05D5') {
        link.textContent = '\u05D4\u05EA\u05E7\u05E9\u05E8 \u05E2\u05DB\u05E9\u05D9\u05D5';
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixCallButtons);
  } else {
    fixCallButtons();
  }
})();
