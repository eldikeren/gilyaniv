(function(){
  const buttons = Array.from(document.querySelectorAll('.filter-btn'));
  const grid = document.getElementById('mediaGrid');
  const cards = () => Array.from(grid.querySelectorAll('.media-card')); // live getter
  const emptyState = document.getElementById('emptyState');
  const sortSelect = document.getElementById('sortMedia');

  // Filter behavior (single-select)
  buttons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      buttons.forEach(b=>{
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed','false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed','true');

      const filter = btn.dataset.filter;
      let visibleCount = 0;
      cards().forEach(card=>{
        const type = card.dataset.type || '';
        const show = (filter === 'all') || (type === filter);
        card.hidden = !show; // semantic hiding
        if (show) visibleCount++;
      });
      emptyState.hidden = visibleCount !== 0; // MDN: hidden toggles rendering
    });
  });

  // Sorting
  const collator = new Intl.Collator('he', { sensitivity:'base' }); // Hebrew-aware sort
  function sortCards(mode){
    const arr = cards();
    const byDate = (a,b) => new Date(b.dataset.date||0) - new Date(a.dataset.date||0);
    const byDateAsc = (a,b) => new Date(a.dataset.date||0) - new Date(b.dataset.date||0);
    const byTitle = (a,b) => collator.compare(
      a.querySelector('.title')?.textContent.trim() || '',
      b.querySelector('.title')?.textContent.trim() || ''
    );
    const byTitleDesc = (a,b) => -byTitle(a,b);

    let cmp = byDate;
    if (mode==='oldest') cmp = byDateAsc;
    if (mode==='az') cmp = byTitle;
    if (mode==='za') cmp = byTitleDesc;

    arr.sort(cmp).forEach(card => grid.appendChild(card)); // reorder DOM
  }
  sortSelect.addEventListener('change', e => sortCards(e.target.value));
  sortCards('newest'); // initial

  // Add category tags to titles
  document.querySelectorAll('.media-card').forEach(card=>{
    const type = card.dataset.type;
    const h = card.querySelector('.title');
    if (type && h && !h.querySelector('.tag')){
      const span = document.createElement('span');
      span.className = 'tag'; span.textContent = type;
      h.appendChild(span);
    }
  });

})();
