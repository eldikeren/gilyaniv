// /js/header-loader.js
// Injects /partials/header.html into <div id="header-root"></div> on every page
// and initializes menu behavior.

(function () {
  // ✅ FIXED: Add function to mark all headers in the testimonials section
  const markTestimonialHeaders = () => {
    const testimonialHeaders = document.querySelectorAll('section[aria-labelledby="revTitle"] header, section[aria-labelledby="revTitle"] .section-header');
    testimonialHeaders.forEach(header => {
      header.setAttribute('data-noheader', 'true');
    });
  };

  const run = async () => {
    const slot = document.getElementById('header-root');
    if (!slot) return;

    try {
      // ✅ FIXED: Mark testimonial headers before loading the main header
      markTestimonialHeaders();
      
      const res = await fetch('/partials/header.html', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      slot.innerHTML = await res.text();

      // ✅ FIXED: Mark testimonial headers again after loading the main header
      markTestimonialHeaders();


      // Ensure sentinel exists immediately after the injected header
      const after = document.getElementById('headerSentinel');
      if (!after) {
        const s = document.createElement('div');
        s.id = 'headerSentinel';
        s.setAttribute('aria-hidden', 'true');
        s.style.height = '1px';
        slot.insertAdjacentElement('afterend', s);
      }

      // ✅ FIXED: Mark testimonial headers one more time
      markTestimonialHeaders();
      
      // Initialize after injection
      if (window.initMegaMenu) window.initMegaMenu();
      if (window.initHeaderShrink) window.initHeaderShrink();
      
      // ✅ FIXED: Log success
      console.log('Header loaded successfully');
    } catch (e) {
      console.error('Failed to load header:', e);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
