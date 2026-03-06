/* Nav toggle functions - shared across all pages */
window.toggleNavDropdown = function (dropdownId) {
    var dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;
    document.querySelectorAll('[id$="-dropdown"]').forEach(function (dd) {
        if (dd.id !== dropdownId && !dd.id.includes('mobile')) {
            dd.classList.add('hidden');
        }
    });
    dropdown.classList.toggle('hidden');
};

window.toggleCategoryDropdown = function (categoryId, event) {
    if (event) event.stopPropagation();
    var category = document.getElementById(categoryId);
    if (!category) return;
    category.classList.toggle('hidden');
    var icon = event && event.currentTarget ? (event.currentTarget.querySelector('.category-icon') || event.currentTarget.querySelector('.mobile-category-chevron')) : null;
    if (icon) {
        icon.style.transform = category.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
    }
};

window.toggleSubCategory = function (subCategoryId, event) {
    if (event) event.stopPropagation();
    var subCategory = document.getElementById(subCategoryId);
    if (!subCategory) return;
    var isHidden = subCategory.classList.contains('hidden');
    subCategory.classList.toggle('hidden');
    var btn = event ? event.currentTarget : null;
    if (btn && (btn.tagName === 'BUTTON' || btn.querySelector('span'))) {
        var chevron = btn.querySelector('.mobile-category-chevron') || btn;
        if (chevron.tagName === 'SPAN' || chevron.tagName === 'BUTTON') {
            chevron.textContent = isHidden ? '\u25B2' : '\u25BC';
        }
    }
};
