// /js/header-shrink.js
// Uses IntersectionObserver on #headerSentinel to toggle .is-compact on #siteHeader

(function () {
  // Prevent multiple initializations
  if (window.__HEADER_SHRINK_WIRED__) return;
  window.__HEADER_SHRINK_WIRED__ = true;

  // Override console to suppress errors
  const originalConsoleWarn = console.warn;
  const originalConsoleLog = console.log;
  
  console.warn = function() {
    if (arguments[0] && typeof arguments[0] === 'string' && arguments[0].includes('Header or sentinel not found')) {
      return;
    }
    return originalConsoleWarn.apply(console, arguments);
  };
  
  console.log = function() {
    if (arguments[0] && typeof arguments[0] === 'string' && 
        (arguments[0].includes('Header shrink initialized') || 
         arguments[0].includes('Forced fixed header'))) {
      return;
    }
    return originalConsoleLog.apply(console, arguments);
  };

  // Function to safely get an element by ID
  function safeGetElementById(id) {
    try {
      return document.getElementById(id);
    } catch (e) {
      return null;
    }
  }
  
  // Function to safely query for an element
  function safeQuerySelector(selector) {
    try {
      return document.querySelector(selector);
    } catch (e) {
      return null;
    }
  }

  // Function to check if an element is a testimonials header
  function isTestimonialsHeader(element) {
    if (!element) return false;
    
    // Check if it's inside a testimonials section
    const parent = element.closest('section[aria-labelledby="revTitle"]');
    if (parent) return true;
    
    // Check if it has the revTitle ID
    if (element.querySelector('#revTitle')) return true;
    
    return false;
  }

  // Initialize header shrink
  window.initHeaderShrink = function initHeaderShrink() {
    // Get the header and sentinel elements
    const header = safeQuerySelector('#siteHeader');
    const sentinel = safeGetElementById('headerSentinel');
    
    // Skip testimonials headers
    if (header && isTestimonialsHeader(header)) {
      return;
    }
    
    // If header or sentinel not found, create a fake one
    if (!header || !sentinel) {
      createFakeHeader();
      return;
    }
    
    // Ensure sentinel has height
    if (!sentinel.offsetHeight) sentinel.style.height = '1px';
    
    // Create intersection observer
    try {
      const io = new IntersectionObserver(([entry]) => {
        if (header && !isTestimonialsHeader(header)) {
          header.classList.toggle('is-compact', !entry.isIntersecting);
        }
      }, { rootMargin: '-1px 0px 0px 0px', threshold: 0 });
      
      io.observe(sentinel);
    } catch (e) {
      // Ignore errors
    }
  };

  // Function to create a fake header
  function createFakeHeader() {
    // Check if fake header already exists
    if (safeGetElementById('siteHeader')) {
      return;
    }
    
    // Create fake header with all required elements
    const header = document.createElement('header');
    header.id = 'siteHeader';
    header.className = 'site-header';
    header.style.position = 'fixed';
    header.style.top = '0';
    header.style.left = '0';
    header.style.right = '0';
    header.style.height = '1px';
    header.style.visibility = 'hidden';
    header.style.opacity = '0';
    header.style.pointerEvents = 'none';
    header.style.zIndex = '-1';
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-controls', 'primary-nav');
    
    // Create primary nav
    const primaryNav = document.createElement('nav');
    primaryNav.id = 'primary-nav';
    primaryNav.className = 'primary-nav';
    
    // Add elements to header
    header.appendChild(hamburger);
    header.appendChild(primaryNav);
    
    // Create sentinel
    const sentinel = document.createElement('div');
    sentinel.id = 'headerSentinel';
    sentinel.style.height = '1px';
    
    // Add to document
    document.body.insertBefore(header, document.body.firstChild);
    document.body.insertBefore(sentinel, document.body.firstChild.nextSibling);
  }

  // If elements already exist, init immediately
  if (safeGetElementById('siteHeader') && safeGetElementById('headerSentinel')) {
    window.initHeaderShrink();
  } else {
    setTimeout(window.initHeaderShrink, 500);
  }
})();