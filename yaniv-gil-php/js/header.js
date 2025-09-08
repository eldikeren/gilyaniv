(function() {
  'use strict';

  const body = document.body;
  const burger = document.querySelector('.hamburger');
  const primaryNav = document.getElementById('primary-nav');
  const searchInput = document.getElementById('q');
  const searchSuggest = document.getElementById('search-suggest');

  // Mobile menu toggle
  if (burger && primaryNav) {
    burger.addEventListener('click', function() {
      const isOpen = body.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', String(isOpen));
      
      // Focus management
      if (isOpen) {
        const firstLink = primaryNav.querySelector('a, button');
        if (firstLink) firstLink.focus();
      }
    });
  }

  // Close mobile menu on escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && body.classList.contains('nav-open')) {
      body.classList.remove('nav-open');
      if (burger) burger.setAttribute('aria-expanded', 'false');
      burger.focus();
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (body.classList.contains('nav-open') && 
        !primaryNav.contains(e.target) && 
        !burger.contains(e.target)) {
      body.classList.remove('nav-open');
      if (burger) burger.setAttribute('aria-expanded', 'false');
    }
  });

  // Mega menu toggles
  document.querySelectorAll('.mega-toggle').forEach(function(button) {
    button.addEventListener('click', function() {
      const parentLi = button.closest('.has-mega');
      const isOpen = parentLi.classList.toggle('open');
      button.setAttribute('aria-expanded', String(isOpen));
      
      // Close other mega menus
      parentLi.parentElement.querySelectorAll('.has-mega').forEach(function(sibling) {
        if (sibling !== parentLi) {
          sibling.classList.remove('open');
          const siblingButton = sibling.querySelector('.mega-toggle');
          if (siblingButton) {
            siblingButton.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  });

  // Close mega menus when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.has-mega')) {
      document.querySelectorAll('.has-mega').forEach(function(item) {
        item.classList.remove('open');
        const button = item.querySelector('.mega-toggle');
        if (button) button.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Search functionality
  if (searchInput && searchSuggest) {
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      const query = this.value.trim();
      
      if (!query) {
        searchSuggest.classList.add('hide');
        searchSuggest.innerHTML = '';
        return;
      }
      
      searchTimeout = setTimeout(function() {
        performSearch(query);
      }, 300);
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
      if (!searchInput.contains(e.target) && !searchSuggest.contains(e.target)) {
        searchSuggest.classList.add('hide');
      }
    });

    // Handle keyboard navigation in suggestions
    searchInput.addEventListener('keydown', function(e) {
      const suggestions = searchSuggest.querySelectorAll('a');
      const currentIndex = Array.from(suggestions).indexOf(document.activeElement);
      
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = currentIndex < suggestions.length - 1 ? currentIndex + 1 : 0;
        suggestions[nextIndex].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : suggestions.length - 1;
        suggestions[prevIndex].focus();
      } else if (e.key === 'Escape') {
        searchSuggest.classList.add('hide');
        searchInput.focus();
      }
    });
  }

  // Search function (placeholder - replace with actual search logic)
  function performSearch(query) {
    // This is a placeholder. Replace with actual search implementation
    const mockResults = [
      { title: 'דיני משפחה', url: 'practice-areas.html#family' },
      { title: 'חדלות פירעון', url: 'practice-areas.html#bankruptcy' },
      { title: 'עו"ד יניב גיל', url: 'attorneys.html' },
      { title: 'צור קשר', url: 'contact.html' }
    ].filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    if (mockResults.length === 0) {
      searchSuggest.classList.add('hide');
      searchSuggest.innerHTML = '';
      return;
    }

    const html = '<ul>' + mockResults.map(result => 
      `<li><a href="${result.url}">${result.title}</a></li>`
    ).join('') + '</ul>';
    
    searchSuggest.innerHTML = html;
    searchSuggest.classList.remove('hide');
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add active class to current page navigation
  document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.primary-nav a[href]');
    
    navLinks.forEach(function(link) {
      const href = link.getAttribute('href');
      if (href === currentPage || 
          (currentPage === '' && href === 'index.html') ||
          (currentPage === 'index.html' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  });

  // Header scroll effect (optional)
  let lastScrollTop = 0;
  const header = document.querySelector('.site-header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
      }
      
      lastScrollTop = scrollTop;
    });
  }

})();
