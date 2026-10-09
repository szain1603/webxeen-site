/* Webxeen site logic. Text comes from content.js, prices/links from config.js. */
(function () {
  'use strict';
  var CFG = window.WEBXEEN_CONFIG, TXT = window.WEBXEEN_CONTENT;
  var doc = document, root = doc.documentElement;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var saveData = !!(navigator.connection && navigator.connection.saveData);
  var MOBILE = window.matchMedia('(max-width: 768px)');
  var P = CFG.pricing;
  var store = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
                set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };
  var lang = TXT[store.get('wx-lang')] ? store.get('wx-lang') : 'en';
  var region = store.get('wx-region') || P.defaultRegion || 'pk';

  /* ---------- helpers ---------- */
  var fmt = function (n) { return Number(n).toLocaleString('en-US'); };
  var usdFrom = 'USD ' + Math.min.apply(null, P.plans.map(function (p) { return p.monthlyUSD; }));
  function fill(s) {
    return String(s)
      .replace(/\{trial\}/g, P.trialDays).replace(/\{yearly\}/g, P.yearlyFreeMonths)
      .replace(/\{extra\}/g, P.extraReplyPrice).replace(/\{usdFrom\}/g, usdFrom)
      .replace(/\{year\}/g, new Date().getFullYear());
  }
  function get(path, l) {
    return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, TXT[l || lang]);
  }
  function h(tag, attrs, html) {
    var e = doc.createElement(tag);
    for (var k in attrs || {}) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }
  var EN = TXT.en;

  /* ---------- icons ---------- */
  var ICON = {
    memory: '<path d="M12 8v4l3 2"/><circle cx="12" cy="12" r="9"/><path d="M3 12h2M19 12h2"/>',
    undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h11a5 5 0 0 1 0 10h-4"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    flag: '<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
    clock: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>'
  };
  var PIC = {
    bubbles: '<div class="pic pic-b"><span>Price?</span><span>Price??</span><span>Rate kya hai?</span><span>Price?</span><span>Hello?</span><i class="moon"></i></div>',
    missed: '<div class="pic pic-m"><i class="ring"></i><b class="x">!</b><span class="gone">Customer left</span></div>',
    fake: '<div class="pic pic-f"><span class="shot"><i></i><i></i><i></i><i></i></span><i class="scan"></i><b class="warn">!</b></div>'
  };

  /* ---------- build lists once (texts filled by data-i18n) ---------- */
  function build() {
    var facts = $('#facts');
    EN.facts.forEach(function (f, i) {
      var val = f.text || (f.num + (f.suffix || ''));
      var d = h('div', { 'class': 'fact', 'data-reveal-item': '' },
        '<b' + (f.num != null ? ' data-count="' + f.num + '" data-suffix="' + (f.suffix || '') + '"' : '') + '>' + val + '</b><span data-i18n="facts.' + i + '.label"></span>');
      facts.appendChild(d);
    });
    var pg = $('#probGrid');
    EN.problem.items.forEach(function (it, i) {
      pg.appendChild(h('article', { 'class': 'prob', 'data-reveal-item': '' },
        '<div aria-hidden="true">' + PIC[it.icon] + '</div><h3 data-i18n="problem.items.' + i + '.title"></h3><p data-i18n="problem.items.' + i + '.text"></p>'));
    });
    var st = $('#steps');
    EN.how.steps.forEach(function (s, i) {
      st.appendChild(h('li', { 'class': 'step', 'data-step': i },
        '<span class="n" aria-hidden="true">' + (i + 1) + '</span><div><h3 data-i18n="how.steps.' + i + '.title"></h3><p data-i18n="how.steps.' + i + '.text"></p></div>'));
    });
    var fs = $('#features');
    EN.features.forEach(function (f, i) {
      var k = 'features.' + i + '.';
      var list = (f.bullets || []).map(function (b, j) { return '<li data-i18n="' + k + 'bullets.' + j + '"></li>'; }).join('');
      var cmds = (f.commands || []).map(function (c) { return '<code>' + c + '</code>'; }).join('');
      var sec = h('section', { 'class': 'feat' + (i % 2 ? ' rev' : ''), id: 'feature-' + f.id, 'aria-labelledby': 'ft-' + f.id },
        '<div class="wrap feat-in">' +
          '<div class="feat-text" data-feat-text>' +
            '<p class="eyebrow" data-i18n="' + k + 'eyebrow"></p>' +
            '<h2 id="ft-' + f.id + '" data-i18n="' + k + 'title"></h2>' +
            '<p data-i18n="' + k + 'text"></p>' +
            (list ? '<ul class="ticks' + (f.id === 'd' ? ' warn' : '') + '">' + list + '</ul>' : '') +
            (cmds ? '<div class="cmds" aria-label="Commands">' + cmds + '</div>' : '') +
            (f.note ? '<p class="note' + (f.id === 'e' ? ' em' : '') + '"><span aria-hidden="true">' + (f.id === 'd' ? '⚠️' : '✅') + '</span><span data-i18n="' + k + 'note"></span></p>' : '') +
          '</div>' +
          '<div class="vframe" data-feat-media role="img" data-i18n-aria="' + k + 'videoLabel">' +
            '<video class="vid" data-v="' + f.id + '" muted loop playsinline preload="none" disablepictureinpicture aria-hidden="true" tabindex="-1"></video>' +
          '</div>' +
        '</div>');
      fs.appendChild(sec);
    });
    var fg = $('#fgrid');
    EN.grid.items.forEach(function (it, i) {
      fg.appendChild(h('article', { 'class': 'fcard', 'data-reveal-item': '' },
        '<span class="fi" aria-hidden="true"><svg viewBox="0 0 24 24">' + ICON[it.icon] + '</svg></span><h3 data-i18n="grid.items.' + i + '.title"></h3><p data-i18n="grid.items.' + i + '.text"></p>'));
    });
    var sl = $('#soonList');
    EN.soon.items.forEach(function (it, i) {
      sl.appendChild(h('li', { 'data-reveal-item': '' },
        '<em data-i18n="soon.badge"></em><b data-i18n="soon.items.' + i + '.title"></b><span data-i18n="soon.items.' + i + '.text"></span>'));
    });
    var pl = $('#plans');
    P.plans.forEach(function (p) {
      var feats = (EN.pricing.features[p.id] || []).map(function (x, j) {
        return '<li data-i18n="pricing.features.' + p.id + '.' + j + '"></li>';
      }).join('');
      pl.appendChild(h('article', { 'class': 'plan' + (p.popular ? ' pop' : ''), 'data-reveal-item': '' },
        (p.popular ? '<span class="ribbon" data-i18n="pricing.popular"></span>' : '') +
        '<h3 data-i18n="pricing.names.' + p.id + '"></h3>' +
        '<p class="price" data-price="' + p.id + '"></p><p class="setup" data-setup="' + p.id + '"></p>' +
        '<ul class="ticks">' + feats + '</ul>' +
        '<a class="btn ' + (p.popular ? 'btn-em' : 'btn-out') + '" data-link="demo" target="_blank" rel="noopener" data-i18n="pricing.button"></a>'));
    });
    var fq = $('#faqList');
    EN.faq.items.forEach(function (q, i) {
      fq.appendChild(h('details', { 'data-reveal-item': '' },
        '<summary data-i18n="faq.items.' + i + '.q"></summary><p data-i18n="faq.items.' + i + '.a"></p>'));
    });
  }

  /* ---------- language ---------- */
  function applyLang(l) {
    lang = l; store.set('wx-lang', l);
    var m = TXT[l].meta;
    root.lang = m.lang; root.dir = m.dir || 'ltr';
    doc.title = m.title;
    var md = $('meta[name="description"]'); if (md) md.setAttribute('content', m.description);
    $$('[data-i18n]').forEach(function (e) {
      var v = get(e.getAttribute('data-i18n'));
      if (v == null) v = get(e.getAttribute('data-i18n'), 'en');
      if (v != null) e.innerHTML = fill(v);
    });
    $$('[data-i18n-aria]').forEach(function (e) {
      var v = get(e.getAttribute('data-i18n-aria'));
      if (v != null) e.setAttribute('aria-label', fill(v));
    });
    $$('.lang [data-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === l)); });
    $('#planNote').innerHTML = fill(get('pricing.note'));
    renderPrices();
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  }

  /* ---------- prices ---------- */
  function renderPrices() {
    var per = get('pricing.perMonth'), setup = get('pricing.setup');
    P.plans.forEach(function (p) {
      var pr = $('[data-price="' + p.id + '"]'), su = $('[data-setup="' + p.id + '"]');
      if (region === 'abroad') {
        pr.innerHTML = 'USD ' + fmt(p.monthlyUSD) + '<small>' + per + '</small>';
        su.textContent = '';
      } else {
        pr.innerHTML = 'PKR ' + fmt(p.monthlyPKR) + '<small>' + per + '</small>';
        su.textContent = setup + ': PKR ' + fmt(p.setupPKR);
      }
    });
    $$('[data-region]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-region') === region)); });
  }

  /* ---------- links ---------- */
  function links() {
    var L = CFG.links, isPh = function (v) { return !v || v.indexOf('{{') === 0; };
    $$('[data-link]').forEach(function (a) {
      var k = a.getAttribute('data-link'), v;
      if (k === 'demo') v = L.demoWhatsApp;
      if (k === 'email') v = isPh(L.contactEmail) ? L.contactEmail : 'mailto:' + L.contactEmail;
      if (k === 'privacy') v = L.privacy;
      if (k === 'terms') v = L.terms;
      if (isPh(v)) { a.setAttribute('href', '#contact'); a.setAttribute('data-placeholder', v); }
      else a.setAttribute('href', v);
      if (a.getAttribute('data-text') === 'email') a.textContent = L.contactEmail;
    });
    if (isPh(L.demoWhatsApp) || isPh(L.contactEmail) || isPh(L.privacy)) {
      console.warn('[Webxeen] Placeholders still in config.js — replace {{DEMO_WHATSAPP_LINK}}, {{CONTACT_EMAIL}}, {{PRIVACY_URL}} before launch.');
    }
  }

  /* ---------- videos ---------- */
  var BASE = 'assets/video/';
  function aspect() { return MOBILE.matches ? '9x16' : '16x9'; }
  function setPoster(v) { v.poster = BASE + v.dataset.v + '-' + aspect() + '-poster.webp'; }
  function loadVideo(v) {
    var a = aspect();
    if (v.dataset.loaded === a) return;
    v.dataset.loaded = a;
    setPoster(v);
    if (reduce || saveData) return;            // posters only
    v.innerHTML = '<source src="' + BASE + v.dataset.v + '-' + a + '.webm" type="video/webm">' +
                  '<source src="' + BASE + v.dataset.v + '-' + a + '.mp4" type="video/mp4">';
    v.load();
  }
  function play(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  function videos() {
    var vids = $$('video.vid');
    var near = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { loadVideo(e.target); near.unobserve(e.target); } });
    }, { rootMargin: '400px 0px' }) : null;
    var vis = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting && v.dataset.loaded && !reduce && !saveData) play(v); else v.pause();
      });
    }, { threshold: 0.2 }) : null;
    vids.forEach(function (v) {
      if (v.hasAttribute('data-eager')) {
        setPoster(v);
        var go = function () { setTimeout(function () { loadVideo(v); if (isVisible(v)) play(v); }, 200); };
        if (doc.readyState === 'complete') go(); else window.addEventListener('load', go);
      } else if (near) near.observe(v); else loadVideo(v);
      if (vis) vis.observe(v);
      v.addEventListener('canplay', function () { if (isVisible(v) && !reduce && !saveData) play(v); });
    });
    var swap = function () {
      vids.forEach(function (v) { if (v.dataset.loaded) { v.dataset.loaded = ''; loadVideo(v); } });
    };
    if (MOBILE.addEventListener) MOBILE.addEventListener('change', swap); else if (MOBILE.addListener) MOBILE.addListener(swap);
  }
  function isVisible(e) { var r = e.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; }

  /* ---------- nav ---------- */
  function nav() {
    var n = $('#nav'), b = $('#burger'), l = $('#links');
    var onScroll = function () { n.classList.toggle('solid', scrollY > 20); };
    onScroll(); addEventListener('scroll', onScroll, { passive: true });
    b.addEventListener('click', function () {
      var open = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(open)); l.classList.toggle('open', open);
      n.classList.add('solid');
    });
    $$('a', l).forEach(function (a) { a.addEventListener('click', function () { b.setAttribute('aria-expanded', 'false'); l.classList.remove('open'); }); });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && l.classList.contains('open')) { b.click(); b.focus(); } });
    $$('.lang [data-lang]').forEach(function (btn) { btn.addEventListener('click', function () { applyLang(btn.getAttribute('data-lang')); }); });
    $$('[data-region]').forEach(function (btn) { btn.addEventListener('click', function () { region = btn.getAttribute('data-region'); store.set('wx-region', region); renderPrices(); }); });
  }

  /* ---------- how-it-works state ---------- */
  function setStep(i) {
    $$('.step').forEach(function (s, j) { s.classList.toggle('on', j === i); });
    $$('.mp-body .mb').forEach(function (m) { m.classList.toggle('vis', +m.dataset.st <= i); });
  }

  /* ---------- counters ---------- */
  function count(el) {
    var to = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now();
    (function step(now) {
      var k = Math.min(1, (now - t0) / 1200), v = Math.round(to * (1 - Math.pow(1 - k, 3)));
      el.textContent = v + suf;
      if (k < 1) requestAnimationFrame(step);
    })(t0);
  }

  /* ---------- animations ---------- */
  function animate() {
    var g = window.gsap, ST = window.ScrollTrigger;
    if (reduce || !g || !ST) { setStep(2); return; }
    g.registerPlugin(ST);
    g.from('.hero .badge, [data-hero]', { y: 26, opacity: 0, duration: .9, ease: 'power3.out', stagger: .1, delay: .1 });
    $$('[data-reveal]').forEach(function (e) {
      g.from(e, { y: 34, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: e, start: 'top 88%', once: true } });
    });
    g.set('[data-reveal-item]', { opacity: 0, y: 30 });
    ST.batch('[data-reveal-item]', {
      start: 'top 90%', once: true,
      onEnter: function (b) {
        g.to(b, { opacity: 1, y: 0, duration: .7, ease: 'power3.out', stagger: .08, overwrite: true });
        b.forEach(function (x) { var c = $('[data-count]', x); if (c) count(c); });
      }
    });
    $$('.feat').forEach(function (s) {
      var rev = s.classList.contains('rev') ? -1 : 1, dir = root.dir === 'rtl' ? -1 : 1;
      g.from($('[data-feat-text]', s), { x: -40 * rev * dir, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: s, start: 'top 78%', once: true } });
      g.from($('[data-feat-media]', s), { opacity: 0, y: 50, rotateX: 10, scale: .94, transformPerspective: 1100, transformOrigin: '50% 100%', duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: s, start: 'top 78%', once: true } });
    });
    var mm = g.matchMedia();
    mm.add('(min-width: 981px) and (min-height: 680px)', function () {
      var how = $('#how');
      how.classList.add('pinned'); setStep(0);
      var st = ST.create({
        trigger: how, start: 'top top', end: '+=1500', pin: true, anticipatePin: 1,
        onUpdate: function (s) { setStep(Math.min(2, Math.floor(s.progress * 3.2))); }
      });
      return function () { st.kill(); how.classList.remove('pinned'); setStep(2); };
    });
    mm.add('(max-width: 980px), (max-height: 679px)', function () {
      setStep(2);
      g.set('.step', { opacity: 0, y: 24 });
      ST.batch('.step', { start: 'top 88%', once: true, onEnter: function (b) { g.to(b, { opacity: 1, y: 0, stagger: .12, duration: .7, ease: 'power3.out' }); } });
    });
  }

  /* ---------- start ---------- */
  build();
  links();
  applyLang(lang);
  nav();
  videos();
  // main.js runs right away (text is on screen at first paint); GSAP is deferred,
  // so animations start once the page has finished parsing.
  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', animate); else animate();
})();
