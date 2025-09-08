// js/header.js (replace fully)
(function(){
  const body = document.body;
  const burger = document.querySelector('.hamburger');
  const nav = document.getElementById('primary-nav');

  // Mobile drawer toggle
  if (burger && nav){
    burger.addEventListener('click', ()=>{
      const open = body.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded', String(open));
    });
    // Close on ESC
    document.addEventListener('keydown', (e)=>{
      if (e.key === 'Escape' && body.classList.contains('nav-open')){
        body.classList.remove('nav-open');
        burger.setAttribute('aria-expanded','false');
      }
    });
    // Close if clicking outside drawer
    document.addEventListener('click', (e)=>{
      if (body.classList.contains('nav-open') && !nav.contains(e.target) && !burger.contains(e.target)){
        body.classList.remove('nav-open');
        burger.setAttribute('aria-expanded','false');
      }
    });
  }

  // Mega menu toggles (desktop + mobile drawer)
  document.querySelectorAll('.mega-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const li = btn.closest('.has-mega');
      const isOpen = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
      // close siblings
      li.parentElement.querySelectorAll('.has-mega').forEach(sib=>{
        if (sib !== li){
          sib.classList.remove('open');
          sib.querySelector('.mega-toggle')?.setAttribute('aria-expanded','false');
        }
      });
    });
  });
})();