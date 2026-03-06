/* Global Scroll Arrow - shows on left, pulses, hides at bottom */
(function () {
    var btn = document.createElement('button');
    btn.className = 'scroll-indicator';
    btn.setAttribute('aria-label', 'גלול למטה');
    btn.innerHTML = '<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>';
    document.body.appendChild(btn);

    btn.addEventListener('click', function () {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    });

    function check() {
        var scrollBottom = window.scrollY + window.innerHeight;
        var docHeight = document.documentElement.scrollHeight;
        if (docHeight - scrollBottom < 80) {
            btn.classList.add('hidden');
        } else {
            btn.classList.remove('hidden');
        }
    }

    window.addEventListener('scroll', check, { passive: true });
    check();
})();
