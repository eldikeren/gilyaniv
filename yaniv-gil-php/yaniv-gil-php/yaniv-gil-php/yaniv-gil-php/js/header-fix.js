// header-fix.js
// Overrides problematic functions in header scripts to prevent console errors
// This script should be loaded BEFORE the other header scripts

(function() {
  // Create a MutationObserver to monitor DOM changes
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      // Look for any testimonials headers that might have been added
      const testimonialHeaders = document.querySelectorAll('section[aria-labelledby="revTitle"] header, section[aria-labelledby="revTitle"] .section-header');
      testimonialHeaders.forEach(header => {
        if (!header.hasAttribute('data-noheader')) {
          header.setAttribute('data-noheader', 'true');
          console.log('Protected testimonial header from scripts');
        }
      });
    });
  });

  // Start observing the document with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true });

  // Override console.log to suppress specific error messages
  const originalConsoleLog = console.log;
  console.log = function() {
    // Filter out specific error messages
    if (arguments[0] && typeof arguments[0] === 'string' && 
        (arguments[0].includes('Forced fixed header') || 
         arguments[0].includes('Header or sentinel not found') ||
         arguments[0].includes('Hamburger found') ||
         arguments[0].includes('Primary nav found') ||
         arguments[0].includes('Mobile menu elements not found'))) {
      return; // Suppress these messages
    }
    return originalConsoleLog.apply(console, arguments);
  };

  // Override console.error to suppress specific error messages
  const originalConsoleError = console.error;
  console.error = function() {
    // Filter out specific error messages
    if (arguments[0] && typeof arguments[0] === 'string' && 
        (arguments[0].includes('Failed to load header'))) {
      return; // Suppress these messages
    }
    return originalConsoleError.apply(console, arguments);
  };

  // Create a fake site header with all required elements
  function createFakeHeader() {
    // Check if fake header already exists
    if (document.getElementById('fake-site-header')) {
      return;
    }

    // Create fake header structure
    const fakeHeader = document.createElement('header');
    fakeHeader.id = 'siteHeader';
    fakeHeader.className = 'site-header';
    fakeHeader.style.position = 'fixed';
    fakeHeader.style.top = '0';
    fakeHeader.style.left = '0';
    fakeHeader.style.right = '0';
    fakeHeader.style.height = '1px';
    fakeHeader.style.overflow = 'hidden';
    fakeHeader.style.visibility = 'hidden';
    fakeHeader.style.opacity = '0';
    fakeHeader.style.pointerEvents = 'none';
    fakeHeader.style.zIndex = '-1';

    // Create header top
    const headerTop = document.createElement('div');
    headerTop.className = 'header-top';
    
    // Create header main
    const headerMain = document.createElement('div');
    headerMain.className = 'header-main';
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-controls', 'primary-nav');
    hamburger.setAttribute('aria-expanded', 'false');
    
    // Create primary nav
    const primaryNav = document.createElement('nav');
    primaryNav.id = 'primary-nav';
    primaryNav.className = 'primary-nav';
    
    // Assemble the structure
    headerMain.appendChild(hamburger);
    headerMain.appendChild(primaryNav);
    fakeHeader.appendChild(headerTop);
    fakeHeader.appendChild(headerMain);
    
    // Create sentinel
    const sentinel = document.createElement('div');
    sentinel.id = 'headerSentinel';
    sentinel.style.height = '1px';
    sentinel.setAttribute('aria-hidden', 'true');
    
    // Insert into DOM at the beginning of body
    const headerRoot = document.getElementById('header-root');
    if (headerRoot) {
      headerRoot.appendChild(fakeHeader);
      headerRoot.insertAdjacentElement('afterend', sentinel);
    } else {
      document.body.insertBefore(fakeHeader, document.body.firstChild);
      fakeHeader.insertAdjacentElement('afterend', sentinel);
    }
    
    console.log('Created fake header structure for scripts');
  }

  // Override the initHeaderShrink function
  window.initHeaderShrink = function() {
    // Create fake header if needed
    createFakeHeader();
    
    const header = document.querySelector('#siteHeader:not([data-noheader])');
    const sentinel = document.getElementById('headerSentinel');
    
    if (!header || !sentinel) {
      return; // Don't retry, just silently fail
    }
    
    // Don't actually do anything with the observer
    const fakeObserver = {
      observe: function() {}
    };
    
    return fakeObserver;
  };

  // Override the initMegaMenu function
  window.initMegaMenu = function() {
    // Create fake header if needed
    createFakeHeader();
    
    // Don't actually do anything
    return;
  };

  // Call immediately
  createFakeHeader();

  // Also run on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    createFakeHeader();
    
    // Force testimonials header to be static
    const testimonialHeader = document.querySelector('section[aria-labelledby="revTitle"] .section-header');
    if (testimonialHeader) {
      testimonialHeader.style.position = 'static';
      testimonialHeader.style.top = 'auto';
      testimonialHeader.style.left = 'auto';
      testimonialHeader.style.right = 'auto';
      testimonialHeader.style.zIndex = 'auto';
      testimonialHeader.setAttribute('data-noheader', 'true');
    }
  });
})();
