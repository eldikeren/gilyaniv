/**
 * /js/progress-bar.js - Reading progress indicator
 * Shows reading progress as a bar at the top of the page
 */
(function() {
  'use strict';

  const progressBar = document.querySelector('.reading-progress');
  if (!progressBar) return;

  // Check if there's a sticky header and adjust position
  const header = document.querySelector('.site-header');
  if (header) {
    progressBar.classList.add('with-header');
  }

  let ticking = false;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    if (docHeight <= 0) {
      progressBar.style.width = '100%';
      ticking = false;
      return;
    }

    const progress = Math.min((scrollTop / docHeight) * 100, 100);
    progressBar.style.width = `${progress}%`;
    ticking = false;
  }

  // Throttled scroll handler for performance
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });

  // Initial calculation
  updateProgress();
})();
