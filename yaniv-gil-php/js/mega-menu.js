// Mega Menu functionality
document.addEventListener('DOMContentLoaded', () => {
  const megaToggles = document.querySelectorAll('.mega-toggle');
  const megaPanels = document.querySelectorAll('.mega-panel');
  
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
  
  // Handle mobile menu toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      mobileMenuToggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      
      // Close mega panels when mobile menu opens
      if (!isOpen) {
        closeAllMegaPanels();
      }
    });
  }
});
