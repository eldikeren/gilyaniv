/**
 * /js/toc-scroll-spy.js - Scroll spy for sticky TOC
 * Highlights current section in table of contents based on scroll position
 */
(function() {
  'use strict';

  const tocLinks = document.querySelectorAll('.toc-link, .toc-sidebar .toc-link, .toc-sidebar-fixed .toc-link');
  const mobileToc = document.querySelector('.toc-mobile');
  if (!tocLinks.length) return;

  // Get all section IDs from TOC links
  const sections = [];
  tocLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const section = document.querySelector(href);
      if (section) {
        sections.push({
          id: href.substring(1),
          element: section,
          link: link
        });
      }
    }
  });

  if (!sections.length) return;

  const headerHeight = 120; // Account for sticky header + buffer
  let ticking = false;

  // Create "Back to TOC" button for mobile
  if (mobileToc) {
    const backToTocBtn = document.createElement('button');
    backToTocBtn.className = 'back-to-toc-btn';
    backToTocBtn.innerHTML = 'תוכן העניינים ▲';
    backToTocBtn.setAttribute('aria-label', 'חזרה לתוכן העניינים');
    document.body.appendChild(backToTocBtn);

    // Show/hide based on scroll position
    function updateBackToTocVisibility() {
      const tocPosition = mobileToc.getBoundingClientRect().top + window.scrollY;
      const isMobile = window.innerWidth < 1024;
      if (isMobile && window.scrollY > tocPosition + 300) {
        backToTocBtn.classList.add('visible');
      } else {
        backToTocBtn.classList.remove('visible');
      }
    }

    // Click handler - scroll to TOC and open it
    backToTocBtn.addEventListener('click', function() {
      const tocPosition = mobileToc.offsetTop - 80;
      window.scrollTo({
        top: tocPosition,
        behavior: 'smooth'
      });
      // Open the TOC after scrolling
      setTimeout(() => {
        mobileToc.setAttribute('open', '');
      }, 400);
    });

    window.addEventListener('scroll', updateBackToTocVisibility, { passive: true });
    window.addEventListener('resize', updateBackToTocVisibility, { passive: true });
  }

  function updateActiveLink() {
    const scrollTop = window.scrollY + headerHeight + 50; // 50px buffer

    // Find current section
    let currentSection = null;
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section.element.offsetTop <= scrollTop) {
        currentSection = section;
        break;
      }
    }

    // Remove active class from all links
    tocLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Add active class to current section's link
    if (currentSection) {
      // Find all links to this section (desktop + mobile)
      document.querySelectorAll(`a[href="#${currentSection.id}"]`).forEach(link => {
        link.classList.add('active');
      });
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateActiveLink);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Smooth scroll for TOC links
  tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const isMobile = window.innerWidth < 1024;
          // Large offset for mobile due to tall header with CTA button
          const offset = isMobile ? 850 : 160;
          const targetPosition = target.offsetTop - offset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Close mobile TOC if open
          if (mobileToc && mobileToc.hasAttribute('open')) {
            mobileToc.removeAttribute('open');
          }

          // Update URL hash without jumping
          history.pushState(null, null, href);
        }
      }
    });
  });

  // Initial check
  updateActiveLink();
})();
