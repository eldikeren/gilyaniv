(function() {
  'use strict';

  var style = document.createElement('style');
  style.textContent = `
    .hero-reviews {
      background: linear-gradient(135deg, #0a1628 0%, #1a2744 100%);
      padding: 40px 16px 32px;
      direction: rtl;
      text-align: center;
      position: relative;
      overflow: hidden;
      font-family: "Heebo", "Assistant", Arial, sans-serif;
    }
    .hero-reviews::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: radial-gradient(ellipse at center, rgba(212,175,55,0.08) 0%, transparent 70%);
      pointer-events: none;
    }
    .hr-badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(212,175,55,0.3);
      border-radius: 50px;
      padding: 10px 24px;
      margin-bottom: 28px;
    }
    .hr-badge-stars { color: #d4af37; font-size: 20px; letter-spacing: 2px; }
    .hr-badge-text { color: #fff; font-size: 15px; font-weight: 500; }
    .hr-badge-count { color: #d4af37; font-weight: 700; }
    .hr-cards {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
      max-width: 1100px;
      margin: 0 auto 28px;
    }
    .hr-card {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 16px;
      padding: 28px 22px 22px;
      flex: 1;
      min-width: 280px;
      max-width: 340px;
      text-align: right;
      transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .hr-card:hover {
      transform: translateY(-4px);
      border-color: rgba(212,175,55,0.4);
      box-shadow: 0 8px 32px rgba(212,175,55,0.08);
    }
    .hr-card-stars { color: #d4af37; font-size: 15px; letter-spacing: 2px; margin-bottom: 14px; }
    .hr-card-text {
      color: rgba(255,255,255,0.85);
      font-size: 15px;
      line-height: 1.75;
      margin-bottom: 18px;
      min-height: 78px;
    }
    .hr-card-author {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
      padding-top: 14px;
      border-top: 1px solid rgba(255,255,255,0.08);
    }
    .hr-card-name { color: #d4af37; font-size: 14px; font-weight: 600; }
    .hr-card-loc { color: rgba(255,255,255,0.45); font-size: 12px; }
    .hr-locations {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
      max-width: 700px;
      margin: 0 auto 24px;
    }
    .hr-loc-tag {
      background: rgba(212,175,55,0.08);
      border: 1px solid rgba(212,175,55,0.18);
      color: rgba(255,255,255,0.65);
      font-size: 13px;
      padding: 5px 16px;
      border-radius: 20px;
      white-space: nowrap;
    }
    .hr-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #d4af37;
      text-decoration: none;
      font-size: 15px;
      font-weight: 500;
      padding: 10px 28px;
      border: 1px solid rgba(212,175,55,0.3);
      border-radius: 30px;
      transition: all 0.3s ease;
    }
    .hr-link:hover {
      background: rgba(212,175,55,0.12);
      border-color: #d4af37;
      color: #fff;
    }
    @media (max-width: 768px) {
      .hero-reviews { padding: 28px 14px 24px; }
      .hr-cards { flex-direction: column; align-items: center; gap: 14px; }
      .hr-card { min-width: unset; max-width: 100%; width: 100%; }
      .hr-card-text { min-height: unset; }
      .hr-badge { padding: 8px 16px; }
      .hr-badge-text { font-size: 13px; }
    }
  `;
  document.head.appendChild(style);

  var reviews = [
    {
      text: '\u05ea\u05d5\u05ea\u05d7! \u05e9\u05de\u05d7 \u05e9\u05d1\u05d7\u05e8\u05ea\u05d9 \u05d1\u05d5 \u05dc\u05d9\u05d9\u05e6\u05d2 \u05d0\u05d5\u05ea\u05d9 \u05d1\u05d1\u05d9\u05ea \u05d3\u05d9\u05df \u05dc\u05e2\u05e0\u05d9\u05d9\u05e0\u05d9 \u05de\u05e9\u05e4\u05d7\u05d4. \u05de\u05e7\u05e6\u05d5\u05e2\u05d9 \u05de\u05d0\u05d5\u05d3, \u05e2\u05d5\u05e8\u05da \u05d3\u05d9\u05df \u05de\u05e6\u05d5\u05d9\u05df.',
      name: '\u05d3\u05d5\u05d3\u05d5',
      location: '\u05d1\u05d0\u05e8 \u05d9\u05e2\u05e7\u05d1'
    },
    {
      text: '\u05d0\u05d9\u05e9 \u05de\u05e7\u05e6\u05d5\u05e2 \u05de\u05e2\u05d5\u05dc\u05d4, \u05e7\u05e9\u05d5\u05d1, \u05d0\u05db\u05e4\u05ea\u05d9 \u05d5\u05e1\u05d1\u05dc\u05e0\u05d9. \u05dc\u05d9\u05d5\u05d5\u05d4 \u05d5\u05e2\u05d3\u05db\u05df \u05dc\u05db\u05dc \u05d0\u05d5\u05e8\u05da \u05d4\u05ea\u05d4\u05dc\u05d9\u05da. \u05de\u05de\u05dc\u05d9\u05e5 \u05d1\u05d7\u05d5\u05dd!',
      name: '\u05e1\u05d2\u05dc \u05d9\u05d5\u05e0\u05ea\u05df',
      location: '\u05e7\u05d9\u05e1\u05e8\u05d9\u05d4'
    },
    {
      text: '\u05d9\u05e0\u05d9\u05d1 \u05d0\u05ea\u05d4 \u05d4\u05d0\u05d9\u05e9 \u05e9\u05e8\u05d0\u05d4 \u05d0\u05ea \u05d4\u05d0\u05d5\u05e8 \u05d1\u05e7\u05e6\u05d4 \u05d4\u05de\u05e0\u05d4\u05e8\u05d4 \u05e9\u05dc\u05d9. \u05ea\u05d5\u05d3\u05d4 \u05e2\u05dc \u05d4\u05dc\u05d9\u05d5\u05d5\u05d9 \u05d5\u05d4\u05ea\u05de\u05d9\u05db\u05d4.',
      name: '\u05d1.',
      location: '\u05e4\u05ea\u05d7 \u05ea\u05e7\u05d5\u05d5\u05d4'
    }
  ];

  var locations = [
    '\u05ea\u05dc \u05d0\u05d1\u05d9\u05d1', '\u05e8\u05de\u05ea \u05d2\u05df', '\u05e4\u05ea\u05d7 \u05ea\u05e7\u05d5\u05d5\u05d4',
    '\u05d4\u05e8\u05e6\u05dc\u05d9\u05d4', '\u05d7\u05d5\u05dc\u05d5\u05df', '\u05e8\u05de\u05ea \u05d4\u05e9\u05e8\u05d5\u05df',
    '\u05d2\u05d1\u05e2\u05ea\u05d9\u05d9\u05dd', '\u05d1\u05e0\u05d9 \u05d1\u05e8\u05e7', '\u05d2\u05d5\u05e9 \u05d3\u05df'
  ];

  var section = document.createElement('section');
  section.className = 'hero-reviews';
  section.setAttribute('aria-label', 'customer reviews');

  var html = '<div class="hr-badge">';
  html += '<span class="hr-badge-stars">\u2605\u2605\u2605\u2605\u2605</span>';
  html += '<span class="hr-badge-text">\u05d3\u05d9\u05e8\u05d5\u05d2 <span class="hr-badge-count">5.0</span> \u00b7 <span class="hr-badge-count">214</span> \u05d7\u05d5\u05d5\u05ea \u05d3\u05e2\u05ea</span>';
  html += '</div>';
  html += '<div class="hr-cards">';

  reviews.forEach(function(r) {
    html += '<div class="hr-card">';
    html += '<div class="hr-card-stars">\u2605\u2605\u2605\u2605\u2605</div>';
    html += '<div class="hr-card-text">"' + r.text + '"</div>';
    html += '<div class="hr-card-author">';
    html += '<span class="hr-card-loc">' + r.location + '</span>';
    html += '<span class="hr-card-name">' + r.name + '</span>';
    html += '</div></div>';
  });

  html += '</div>';
  html += '<div class="hr-locations">';
  locations.forEach(function(loc) {
    html += '<span class="hr-loc-tag">' + loc + '</span>';
  });
  html += '</div>';
  html += '<a href="https://www.lawreviews.co.il/provider/gil-yaniv" target="_blank" rel="noopener" class="hr-link">';
  html += '\u05dc\u05db\u05dc 214 \u05d7\u05d5\u05d5\u05ea \u05d4\u05d3\u05e2\u05ea \u05d1-LawReviews \u2190';
  html += '</a>';

  section.innerHTML = html;

  var heroSection = document.querySelector('section.relative');
  if (heroSection && heroSection.parentNode) {
    heroSection.parentNode.insertBefore(section, heroSection.nextSibling);
  }
})();
