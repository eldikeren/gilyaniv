// Mega Menu functionality
document.addEventListener('DOMContentLoaded', () => {
  console.log('Mega menu script loaded');
  const megaToggles = document.querySelectorAll('.mega-toggle');
  const megaPanels = document.querySelectorAll('.mega-panel');
  console.log('Found mega toggles:', megaToggles.length);
  console.log('Found mega panels:', megaPanels.length);
  
  // Close all mega panels
  function closeAllMegaPanels() {
    megaToggles.forEach(toggle => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.closest('.has-mega').classList.remove('open');
    });
    megaPanels.forEach(panel => {
      panel.style.display = 'none';
    });
  }
  
  // Handle mega menu toggle clicks
  megaToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const parent = toggle.closest('.has-mega');
      const panel = parent.querySelector('.mega-panel');
      const isOpen = parent.classList.contains('open');
      
      // Close all other panels first
      closeAllMegaPanels();
      
      if (!isOpen) {
        // Open this panel
        parent.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        panel.style.display = 'block';
      }
    });
  });
  
  // Close mega menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-mega')) {
      closeAllMegaPanels();
    }
  });
  
  // Close mega menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllMegaPanels();
    }
  });
  
  // Close mega menu on scroll
  window.addEventListener('scroll', () => {
    closeAllMegaPanels();
  });
  
  // Handle mobile menu toggle (hamburger)
  const hamburger = document.querySelector('.hamburger');
  const primaryNav = document.querySelector('#primary-nav');
  
  console.log('Hamburger found:', !!hamburger);
  console.log('Primary nav found:', !!primaryNav);
  
  if (hamburger && primaryNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = primaryNav.classList.contains('open');
      primaryNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      
      console.log('Mobile menu toggled, isOpen:', !isOpen);
      
      // Close mega panels when mobile menu opens
      if (!isOpen) {
        closeAllMegaPanels();
      }
    });
  }
});
