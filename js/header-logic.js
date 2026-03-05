/**
 * Header & Navigation Logic for Yaniv Gil Law Office
 * Handles: Shrinking header, Dropdown menus, Duns seal visibility
 */

(function () {
    'use strict';

    // 1. Shrinking Header Logic
    function handleScroll() {
        const header = document.getElementById('site-header');
        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add('scrolled', 'py-1', 'shadow-xl');
            header.classList.remove('py-2', 'shadow-md');
        } else {
            header.classList.remove('scrolled', 'py-1', 'shadow-xl');
            header.classList.add('py-2', 'shadow-md');
        }
    }

    // 2. Duns Seal Logic (Hide on scroll down, show on scroll up)
    let lastScrollY = window.scrollY;
    function handleSealVisibility() {
        const seal = document.querySelector('.duns-seal-link');
        if (!seal) return;

        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            seal.classList.add('seal-hidden');
        } else if (currentScrollY < lastScrollY) {
            seal.classList.remove('seal-hidden');
        }
        lastScrollY = currentScrollY;
    }

    // 3. Navigation Dropdown Toggles
    window.toggleNavDropdown = function (dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        if (!dropdown) return;

        // Close other top-level dropdowns
        document.querySelectorAll('[id$="-dropdown"]').forEach(dd => {
            if (dd.id !== dropdownId && !dd.id.includes('mobile')) {
                dd.classList.add('hidden');
            }
        });

        dropdown.classList.toggle('hidden');
    };

    window.toggleCategoryDropdown = function (categoryId, event) {
        if (event) event.stopPropagation();
        const category = document.getElementById(categoryId);
        if (!category) return;

        category.classList.toggle('hidden');

        const icon = event?.currentTarget?.querySelector('.category-icon') ||
            event?.currentTarget?.querySelector('.mobile-category-chevron');
        if (icon) {
            icon.style.transform = category.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    };

    window.toggleSubCategory = function (subCategoryId, event) {
        if (event) event.stopPropagation();
        const subCategory = document.getElementById(subCategoryId);
        if (!subCategory) return;

        const isHidden = subCategory.classList.contains('hidden');
        subCategory.classList.toggle('hidden');

        const btn = event?.currentTarget;
        if (btn && (btn.tagName === 'BUTTON' || btn.querySelector('span'))) {
            const chevron = btn.querySelector('.mobile-category-chevron') || btn;
            if (chevron.tagName === 'SPAN' || chevron.tagName === 'BUTTON') {
                chevron.textContent = isHidden ? '▲' : '▼';
            }
        }
    };

    // 4. Mobile Menu Toggle
    function initMobileMenu() {
        const openBtn = document.getElementById('mobile-menu-button');
        const closeBtn = document.getElementById('close-mobile-menu');
        const menu = document.getElementById('mobile-menu');

        if (openBtn && menu) {
            openBtn.onclick = () => {
                menu.classList.add('active');
                document.body.style.overflow = 'hidden';
            };
        }

        if (closeBtn && menu) {
            closeBtn.onclick = () => {
                menu.classList.remove('active');
                document.body.style.overflow = '';
            };
        }

        // Close on click outside or link click
        if (menu) {
            menu.onclick = (e) => {
                if (e.target === menu) {
                    menu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            };
            menu.querySelectorAll('a').forEach(link => {
                link.onclick = () => {
                    menu.classList.remove('active');
                    document.body.style.overflow = '';
                };
            });
        }
    }

    // 5. Initialize
    window.addEventListener('scroll', () => {
        handleScroll();
        handleSealVisibility();
    }, { passive: true });

    document.addEventListener('DOMContentLoaded', () => {
        handleScroll();
        initMobileMenu();

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('[id$="-dropdown"]') && !e.target.closest('button[onclick*="Dropdown"]')) {
                document.querySelectorAll('[id$="-dropdown"]').forEach(dd => dd.classList.add('hidden'));
            }
        });
    });

})();
