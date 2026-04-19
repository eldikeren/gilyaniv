/**
 * Yael AI Chat Widget
 * Floating button → opens /ai-assistance as a modal iframe
 */
(function () {
  'use strict';

  var CHAT_URL = '/ai-assistance';
  var Z_INDEX  = 9998;

  // ── Styles ──────────────────────────────────────────────────────────────
  var css = [
    // Floating button
    '#yael-chat-btn{',
      'position:fixed;bottom:24px;left:24px;z-index:' + Z_INDEX + ';',
      'display:flex;align-items:center;gap:10px;',
      'background:#1a2744;color:#fff;border:none;cursor:pointer;',
      'border-radius:999px;padding:12px 20px 12px 14px;',
      'box-shadow:0 4px 20px rgba(0,0,0,0.35);',
      'font-family:Assistant,Heebo,sans-serif;font-size:15px;font-weight:600;',
      'transition:transform .2s,box-shadow .2s;',
      'text-decoration:none;',
    '}',
    '#yael-chat-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,0.4);}',
    '#yael-chat-btn .yael-avatar{',
      'width:36px;height:36px;border-radius:50%;object-fit:cover;',
      'border:2px solid #c9a55c;flex-shrink:0;',
    '}',
    '#yael-chat-btn .yael-label{line-height:1.2;text-align:right;}',
    '#yael-chat-btn .yael-label span{display:block;}',
    '#yael-chat-btn .yael-label .yael-name{font-size:14px;color:#c9a55c;}',
    '#yael-chat-btn .yael-label .yael-desc{font-size:12px;color:#e2e8f0;font-weight:400;}',
    // Pulse ring
    '#yael-chat-btn::before{',
      'content:"";position:absolute;inset:-4px;border-radius:999px;',
      'border:2px solid #c9a55c;opacity:0;',
      'animation:yael-pulse 2.5s ease-in-out infinite;',
    '}',
    '@keyframes yael-pulse{0%,100%{opacity:0;transform:scale(1)}50%{opacity:.45;transform:scale(1.04)}}',
    // Modal overlay
    '#yael-modal{',
      'display:none;position:fixed;inset:0;z-index:' + (Z_INDEX + 1) + ';',
      'background:rgba(0,0,0,.55);backdrop-filter:blur(4px);',
      'align-items:flex-end;justify-content:flex-start;',
      'padding:0 0 20px 20px;',
    '}',
    '#yael-modal.open{display:flex;}',
    '#yael-modal-box{',
      'width:420px;height:680px;max-width:calc(100vw - 40px);max-height:calc(100vh - 40px);',
      'background:#fff;border-radius:20px;overflow:hidden;',
      'box-shadow:0 20px 60px rgba(0,0,0,.5);',
      'display:flex;flex-direction:column;',
      'animation:yael-slide-up .3s ease;',
    '}',
    '@keyframes yael-slide-up{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}',
    '#yael-modal-header{',
      'display:flex;align-items:center;justify-content:space-between;',
      'padding:14px 16px;background:#1a2744;',
      'flex-shrink:0;',
    '}',
    '#yael-modal-header .yael-header-info{display:flex;align-items:center;gap:10px;}',
    '#yael-modal-header img{width:40px;height:40px;border-radius:50%;border:2px solid #c9a55c;object-fit:cover;}',
    '#yael-modal-header .hd-text{color:#fff;font-family:Assistant,Heebo,sans-serif;}',
    '#yael-modal-header .hd-text .hd-name{font-size:15px;font-weight:700;color:#c9a55c;}',
    '#yael-modal-header .hd-text .hd-sub{font-size:12px;color:#94a3b8;}',
    '#yael-close{',
      'background:none;border:none;cursor:pointer;color:#94a3b8;',
      'font-size:22px;line-height:1;padding:4px;transition:color .15s;',
    '}',
    '#yael-close:hover{color:#fff;}',
    '#yael-iframe{flex:1;border:none;width:100%;}',
    '@media(max-width:480px){',
      '#yael-modal{padding:0;align-items:flex-end;justify-content:center;}',
      '#yael-modal-box{width:100%;max-width:100%;border-radius:20px 20px 0 0;height:88vh;max-height:88vh;}',
      '#yael-chat-btn{bottom:16px;left:16px;padding:10px 16px 10px 12px;}',
    '}',
  ].join('');

  function injectStyles() {
    var s = document.createElement('style');
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ── DOM ──────────────────────────────────────────────────────────────────
  var avatarSrc = '/ai-assistance/_next/static/media/yael-thinking.jpeg';
  // Fallback avatar — inline SVG data-URI if image fails
  var avatarFallback = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Ccircle cx='18' cy='18' r='18' fill='%231a2744'/%3E%3Ctext x='18' y='23' text-anchor='middle' font-size='16' fill='%23c9a55c' font-family='Arial'%3E%D7%99%3C/text%3E%3C/svg%3E";

  function buildWidget() {
    // Floating button
    var btn = document.createElement('button');
    btn.id = 'yael-chat-btn';
    btn.setAttribute('aria-label', 'פתח את יעל — עזרה משפטית ראשונית חכמה');
    btn.innerHTML = [
      '<img class="yael-avatar" src="' + avatarSrc + '" alt="יעל" onerror="this.src=\'' + avatarFallback + '\'">',
      '<div class="yael-label">',
        '<span class="yael-name">שאלי את יעל ✨</span>',
        '<span class="yael-desc">בדיקה משפטית ראשונית חינם</span>',
      '</div>',
    ].join('');

    // Modal
    var modal = document.createElement('div');
    modal.id = 'yael-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'יעל — עזרה משפטית ראשונית');

    modal.innerHTML = [
      '<div id="yael-modal-box">',
        '<div id="yael-modal-header">',
          '<div class="yael-header-info">',
            '<img src="' + avatarSrc + '" alt="יעל" onerror="this.src=\'' + avatarFallback + '\'">',
            '<div class="hd-text">',
              '<div class="hd-name">יעל — עזרה משפטית ראשונית</div>',
              '<div class="hd-sub">עו״ד יניב גיל ושות׳</div>',
            '</div>',
          '</div>',
          '<button id="yael-close" aria-label="סגור">✕</button>',
        '</div>',
        '<iframe id="yael-iframe" title="יעל AI" allow="camera;microphone"></iframe>',
      '</div>',
    ].join('');

    document.body.appendChild(btn);
    document.body.appendChild(modal);

    var iframe = document.getElementById('yael-iframe');
    var iframeLoaded = false;

    // Open
    btn.addEventListener('click', function () {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      if (!iframeLoaded) {
        iframe.src = CHAT_URL;
        iframeLoaded = true;
      }
      btn.style.display = 'none';
    });

    // Close button
    document.getElementById('yael-close').addEventListener('click', closeModal);

    // Close on backdrop click
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      btn.style.display = '';
    }
  }

  // ── Boot ─────────────────────────────────────────────────────────────────
  function init() {
    injectStyles();
    buildWidget();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
