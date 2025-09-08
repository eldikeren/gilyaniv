/* pages-rtl-enhance.js — progressive enhancement, no text changes */

document.addEventListener('DOMContentLoaded', () => {
  const isAttorneys = /\/attorneys\.html(\?|$)/.test(location.pathname);
  const isContact   = /\/contact\.html(\?|$)/.test(location.pathname);
  const isAbout     = /\/about\.html(\?|$)/.test(location.pathname);

  /* ===== /attorneys.html ===== */
  if (isAttorneys) {
    // 1) Hero styling: find the main H1 and wrap it into a hero section
    const main = document.querySelector('main') || document.body;
    const h1 = main.querySelector('h1, h2');
    if (h1 && !document.querySelector('.team-hero')) {
      const hero = document.createElement('section');
      hero.className = 'team-hero';
      hero.innerHTML = `<div class="container inner"><h1>${h1.textContent}</h1><p class="meta">${(h1.nextElementSibling && h1.nextElementSibling.tagName.startsWith('P')) ? h1.nextElementSibling.textContent : ''}</p></div>`;
      main.insertBefore(hero, main.firstChild);
      // hide the original blurb if it was a following <p>
      if (h1.nextElementSibling && h1.nextElementSibling.tagName.startsWith('P')) h1.nextElementSibling.remove();
      h1.remove();
    }

    // 2) Build a grid of lawyer cards from the "עו״ד …" sections
    // Heuristic: each lawyer starts with H3 containing 'עו'ד' or 'עו״ד'
    const blocks = [...document.querySelectorAll('h3')].filter(h => /עו[״']?ד/.test(h.textContent));
    if (blocks.length) {
      const gridWrap = document.createElement('section');
      gridWrap.className = 'team-wrap';
      gridWrap.innerHTML = `<div class="container"><div class="team-grid"></div></div>`;
      const grid = gridWrap.querySelector('.team-grid');

      blocks.forEach(h => {
        // Gather subsequent siblings until the next H3/H2
        const card = document.createElement('article');
        card.className = 'card lawyer-card';

        // Look for an image next to the first profile; fallback to a neutral media box
        let img = h.parentElement.querySelector('img');
        const media = document.createElement('div');
        media.className = 'lawyer-media';
        media.innerHTML = img ? `<img src="${img.getAttribute('src')}" alt="${img.getAttribute('alt')||''}">` : `<div aria-hidden="true" style="width:100%;height:100%"></div>`;
        card.appendChild(media);

        const body = document.createElement('div');
        body.className = 'lawyer-body';
        body.innerHTML = `<h3 class="lawyer-name">${h.textContent}</h3>`;

        // Consume the "title"/first paragraph after the heading
        let cursor = h.nextElementSibling;
        if (cursor && cursor.tagName === 'P') {
          const p = cursor; cursor = cursor.nextElementSibling;
          const t = document.createElement('p'); t.className='lawyer-title'; t.textContent = p.textContent;
          body.appendChild(t);
          p.remove();
        }

        // Collect a UL under this section as tags (specialties)
        let ul = cursor && cursor.tagName === 'UL' ? cursor : null;
        if (ul) {
          const tags = document.createElement('div'); tags.className='lawyer-tags';
          [...ul.querySelectorAll('li')].forEach(li => {
            const span = document.createElement('span');
            span.className='lawyer-tag'; span.textContent = li.textContent.trim();
            tags.appendChild(span);
          });
          body.appendChild(tags);
          ul.remove();
        }

        // Append any remaining P's until the next H3/H2 as short bio
        while (cursor && cursor.tagName !== 'H3' && cursor.tagName !== 'H2') {
          if (cursor.tagName === 'P') {
            const p = document.createElement('p'); p.textContent = cursor.textContent; body.appendChild(p);
            const next = cursor.nextElementSibling; cursor.remove(); cursor = next;
          } else { cursor = cursor.nextElementSibling; }
        }

        // Actions
        const actions = document.createElement('div');
        actions.className = 'lawyer-actions';
        actions.innerHTML = `<a class="btn primary" href="/contact.html">צור קשר</a>`;
        body.appendChild(actions);

        card.appendChild(body);
        grid.appendChild(card);
        h.remove(); // remove original heading (now in card)
      });

      main.insertBefore(gridWrap, main.firstChild.nextSibling);
    }

    // 3) Wrap the "הגישה המקצועית שלנו / זמינות ותמיכה" into a two-column card layout
    const approachH2 = [...document.querySelectorAll('h2, h3')].find(el => /הגישה המקצועית שלנו/.test(el.textContent));
    if (approachH2 && !document.querySelector('.team-approach')) {
      const sec = document.createElement('section');
      sec.className = 'section';
      sec.innerHTML = `<div class="container team-approach">
          <article class="card"><div class="card-body">${approachH2.outerHTML}${approachH2.nextElementSibling?.outerHTML||''}${approachH2.nextElementSibling?.nextElementSibling?.outerHTML||''}</div></article>
          <aside class="card contact-cta"><div class="card-body">
            <p class="kicker">צרו קשר עם עורך דין</p>
            <p>התקשרו עכשיו לייעוץ ראשוני חינם.</p>
            <ul class="info-list">
              <li><strong>טלפון:</strong> 03-609-2414</li>
              <li><strong>אימייל:</strong> ynivgil@gmail.com</li>
              <li><strong>כתובת:</strong> מגדל "WE-TLV", דרך מנחם בגין 150, תל-אביב</li>
            </ul>
            <div class="actions" style="margin-top:10px">
              <a class="btn primary" href="tel:036092414">התקשר עכשיו</a>
              <a class="btn" href="/contact.html">טופס יצירת קשר</a>
            </div>
          </div></aside>
        </div>`;
      // Remove original nodes we just cloned
      approachH2.nextElementSibling?.remove();
      approachH2.nextElementSibling?.remove();
      approachH2.remove();
      document.querySelector('main').appendChild(sec);
    }
  }

  /* ===== /contact.html ===== */
  if (isContact) {
    const main = document.querySelector('main') || document.body;
    const firstH1 = main.querySelector('h1, h2');
    if (firstH1 && !document.querySelector('.contact-hero')) {
      const hero = document.createElement('section');
      hero.className='contact-hero';
      const lead = (firstH1.nextElementSibling && /^p$/i.test(firstH1.nextElementSibling.tagName)) ? firstH1.nextElementSibling.textContent : 'אנחנו כאן לעזור לכם - ייעוץ ראשוני חינם';
      hero.innerHTML = `<div class="container"><div class="section-header"><h1>${firstH1.textContent}</h1><p>${lead}</p></div></div>`;
      main.insertBefore(hero, main.firstChild);
      if (firstH1.nextElementSibling && /^p$/i.test(firstH1.nextElementSibling.tagName)) firstH1.nextElementSibling.remove();
      firstH1.remove();
    }

    // Build a two-column layout: left info cards + right form (from existing DOM)
    if (!document.querySelector('.contact-grid')) {
      // Collect existing blocks we need: phone/email/address/faq/form
      const blocks = [...main.children].filter(n => n.tagName === 'H2' || n.tagName === 'H3' || n.tagName === 'FORM' || n.matches && n.matches('section, article'));
      // container
      const wrap = document.createElement('section');
      wrap.className = 'contact-wrap';
      wrap.innerHTML = `<div class="container contact-grid">
        <div class="left"></div>
        <div class="right"></div>
      </div>`;
      const left = wrap.querySelector('.left');
      const right = wrap.querySelector('.right');

      // Move phone/email/address/faq into cards on the left; move the form to the right
      let cur = main.firstElementChild;
      while (cur) {
        const next = cur.nextElementSibling;
        if (cur.tagName === 'FORM' || /שלחו לנו הודעה/.test(cur.textContent)) {
          // Right column: form
          const art = document.createElement('article'); art.className='card';
          const bod = document.createElement('div'); bod.className='card-body';
          bod.appendChild(cur); art.appendChild(bod); right.appendChild(art);
        } else if (/טלפון|אימייל|כתובת המשרד|שאלות נפוצות/.test(cur.textContent)) {
          const art = document.createElement('article'); art.className='card';
          const bod = document.createElement('div'); bod.className='card-body';
          bod.innerHTML = cur.outerHTML; art.appendChild(bod); left.appendChild(art);
          cur.remove();
        }
        cur = next;
      }

      // Add a compact contact CTA at the top-left for immediate action
      const cta = document.createElement('article');
      cta.className='card contact-cta';
      cta.innerHTML = `<div class="card-body">
        <p class="kicker">פרטי התקשרות</p>
        <ul class="info-list">
          <li><strong>טלפון:</strong> 03-609-2414</li>
          <li><strong>נייד:</strong> 054-8184581</li>
          <li><strong>פקס:</strong> 03-609-2413</li>
          <li><strong>שעות פעילות:</strong> א'-ה' 9:00–18:00</li>
        </ul>
        <div class="actions" style="margin-top:10px">
          <a class="btn primary" href="tel:036092414">התקשר עכשיו</a>
          <a class="btn" href="mailto:ynivgil@gmail.com">שלח אימייל</a>
        </div>
      </div>`;
      left.prepend(cta);
      main.appendChild(wrap);
    }
  }

  /* ===== /about.html ===== */
  if (isAbout) {
    const main = document.querySelector('main') || document.body;
    const firstH1 = main.querySelector('h1, h2');
    if (firstH1 && !document.querySelector('.about-hero')) {
      const hero = document.createElement('section');
      hero.className='about-hero';
      const lead = (firstH1.nextElementSibling && /^p$/i.test(firstH1.nextElementSibling.tagName)) ? firstH1.nextElementSibling.textContent : 'משרד עורכי דין יניב גיל - מקצועיות, אמינות ומצוינות';
      hero.innerHTML = `<div class="container"><div class="section-header"><h1>${firstH1.textContent}</h1><p>${lead}</p></div></div>`;
      main.insertBefore(hero, main.firstChild);
      if (firstH1.nextElementSibling && /^p$/i.test(firstH1.nextElementSibling.tagName)) firstH1.nextElementSibling.remove();
      firstH1.remove();
    }

    // Wrap content sections in cards
    if (!document.querySelector('.about-wrap')) {
      const wrap = document.createElement('section');
      wrap.className = 'about-wrap';
      wrap.innerHTML = `<div class="container about-grid"></div>`;
      const grid = wrap.querySelector('.about-grid');

      // Find all H2 sections and wrap them in cards
      const sections = [...main.querySelectorAll('h2')];
      sections.forEach((h2, index) => {
        const card = document.createElement('article');
        card.className = 'card about-section';
        
        const body = document.createElement('div');
        body.className = 'card-body';
        
        // Collect content until next H2 or end
        let content = h2.outerHTML;
        let next = h2.nextElementSibling;
        while (next && next.tagName !== 'H2') {
          content += next.outerHTML;
          const temp = next.nextElementSibling;
          next.remove();
          next = temp;
        }
        
        body.innerHTML = content;
        card.appendChild(body);
        grid.appendChild(card);
        h2.remove();
      });

      main.appendChild(wrap);
    }
  }
});
