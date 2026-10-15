/* Webxeen: Motion (Framer Motion) effects + animated graphics.
   Loaded with `defer` after main.js. Safe to remove: the page works without it.
   Uses the Motion library (assets/js/motion.min.js, global `Motion`). */
(function () {
  'use strict';
  var M = window.Motion;
  if (!M || window.WEBXEEN_PRERENDER) return;
  var doc = document;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var touch = matchMedia('(hover: none)').matches;
  // Phones, small screens and slow computers skip the heavy decorations so scrolling stays smooth.
  var light = touch || matchMedia('(max-width: 900px)').matches ||
    (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) || (navigator.deviceMemory && navigator.deviceMemory <= 4);
  var scrolling = 0;
  addEventListener('scroll', function () { scrolling = performance.now(); }, { passive: true });
  var SPRING = { type: 'spring', stiffness: 260, damping: 22 };
  var NS = 'http://www.w3.org/2000/svg';
  function el(tag, cls, parent) { var e = doc.createElement(tag); if (cls) e.className = cls; if (parent) parent.appendChild(e); return e; }

  /* 1. scroll progress bar */
  if (!reduce) {
    var bar = el('div', 'fx-progress', doc.body);
    bar.setAttribute('aria-hidden', 'true');
    M.scroll(M.animate(bar, { scaleX: [0, 1] }, { ease: 'linear' }));
  }

  /* 2. hero: particle network (canvas) */
  (function () {
    var hero = $('.hero'); if (!hero || light || reduce) return;
    var c = el('canvas', 'fx-net'); c.setAttribute('aria-hidden', 'true');
    var veil = $('.hero-veil', hero); hero.insertBefore(c, veil ? veil.nextSibling : hero.firstChild);
    var ctx = c.getContext('2d'), P = [], W = 0, H = 0, mx = -999, my = -999, dpr = Math.min(window.devicePixelRatio || 1, 2), visible = true;
    function size() {
      W = hero.clientWidth; H = hero.clientHeight; c.width = W * dpr; c.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(40, W * H / 24000)); P = [];
      for (var i = 0; i < n; i++) P.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, r: 1 + Math.random() * 1.8 });
    }
    var frame = 0;
    function draw() {
      // ~30 frames a second, and none while the page is being scrolled
      if (!reduce && visible && (++frame % 2 || performance.now() - scrolling < 150 || doc.hidden)) { requestAnimationFrame(draw); return; }
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < P.length; i++) {
        var p = P[i];
        if (!reduce) {
          p.x += p.vx; p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1; if (p.y < 0 || p.y > H) p.vy *= -1;
          var dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
          if (d < 110 && d > 0) { p.x += dx / d * 1.2; p.y += dy / d * 1.2; }
        }
        for (var j = i + 1; j < P.length; j++) {
          var q = P[j], dd = Math.hypot(p.x - q.x, p.y - q.y);
          if (dd < 120) { ctx.strokeStyle = 'rgba(52,211,153,' + (.2 * (1 - dd / 120)) + ')'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
        ctx.fillStyle = 'rgba(167,243,208,.7)'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      }
      if (!reduce && visible) requestAnimationFrame(draw);
    }
    if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { var was = visible; visible = e[0].isIntersecting; if (visible && !was && !reduce) draw(); }).observe(hero);
    hero.addEventListener('pointermove', function (e) { var r = hero.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; });
    hero.addEventListener('pointerleave', function () { mx = my = -999; });
    // start after the page has loaded and the browser is idle, so it never slows the first paint
    var start = function () { size(); draw(); };
    var later = function () { (window.requestIdleCallback || function (f) { setTimeout(f, 300); })(start, { timeout: 2000 }); };
    if (doc.readyState === 'complete') setTimeout(later, 600); else addEventListener('load', function () { setTimeout(later, 600); });
    var t; addEventListener('resize', function () { clearTimeout(t); t = setTimeout(function () { size(); if (reduce) draw(); }, 150); });
  })();

  /* 3. hero headline: words spring in (replaces the plain fade for the h1) */
  (function () {
    var h1 = $('.hero h1'); if (!h1 || reduce) return;
    h1.removeAttribute('data-hero'); // main.js would fade it as one block; we animate the words instead
    (function split(node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var f = doc.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (w) {
            if (!w) return;
            if (/^\s+$/.test(w)) f.appendChild(doc.createTextNode(w));
            else { var s = el('span', 'fx-w'); s.textContent = w; f.appendChild(s); }
          });
          node.replaceChild(f, n);
        } else if (n.nodeType === 1) { n.classList.add('fx-w'); }
      });
    })(h1);
    M.animate($$('.fx-w', h1), { y: [22, 0], rotate: [3, 0] }, { delay: M.stagger(0.06, { startDelay: .15 }), type: 'spring', stiffness: 220, damping: 20 });
  })();

  /* 4. magnetic buttons */
  if (!reduce && !touch) $$('.hero .btn, .final .btn').forEach(function (b) {
    b.addEventListener('pointermove', function (e) { var r = b.getBoundingClientRect(); M.animate(b, { x: (e.clientX - r.left - r.width / 2) * .22, y: (e.clientY - r.top - r.height / 2) * .3 }, { type: 'spring', stiffness: 300, damping: 18 }); });
    b.addEventListener('pointerleave', function () { M.animate(b, { x: 0, y: 0 }, { type: 'spring', stiffness: 300, damping: 14 }); });
  });

  /* 5. how it works: flow graphic drawn step by step */
  (function () {
    var vis = $('.how-visual'); if (!vis) return;
    var svg = doc.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'fx-flow'); svg.setAttribute('viewBox', '0 0 600 420'); svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML =
      '<defs><radialGradient id="fxCore"><stop offset="0" stop-color="#6EE7B7"/><stop offset=".6" stop-color="#10B981"/><stop offset="1" stop-color="#047857"/></radialGradient></defs>' +
      '<path d="M110 150 C 120 300, 200 330, 300 320" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M300 320 C 400 330, 480 300, 490 150" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M490 80 C 430 -10, 170 -10, 110 80" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="4" stroke-dasharray="2 12" stroke-linecap="round"/>' +
      '<path class="fx-seg" d="M110 150 C 120 300, 200 330, 300 320" fill="none" stroke="#34E0A1" stroke-width="6" stroke-linecap="round"/>' +
      '<path class="fx-seg" d="M300 320 C 400 330, 480 300, 490 150" fill="none" stroke="#34E0A1" stroke-width="6" stroke-linecap="round"/>' +
      '<path class="fx-seg" d="M490 80 C 430 -10, 170 -10, 110 80" fill="none" stroke="#10B981" stroke-width="4" stroke-linecap="round"/>' +
      '<g class="fx-node"><rect x="72" y="60" width="76" height="118" rx="14" fill="#060B17" stroke="#24314F" stroke-width="2"/><rect x="80" y="72" width="60" height="94" rx="8" fill="#F2F6F3"/>' +
        '<rect x="100" y="82" width="34" height="12" rx="6" fill="#D1FAE5"/><rect x="86" y="100" width="40" height="12" rx="6" fill="#fff"/><rect x="100" y="118" width="30" height="12" rx="6" fill="#D1FAE5"/></g>' +
      '<g class="fx-node"><circle class="fx-ring" cx="300" cy="320" r="56" fill="none" stroke="#34E0A1" stroke-width="2" opacity=".45"/>' +
        '<circle cx="300" cy="320" r="42" fill="url(#fxCore)"/><text x="300" y="329" text-anchor="middle" font-family="Sora,system-ui,sans-serif" font-weight="800" font-size="24" fill="#04281C">AI</text></g>' +
      '<g class="fx-node"><rect x="452" y="60" width="76" height="118" rx="14" fill="#060B17" stroke="#24314F" stroke-width="2"/><rect x="460" y="72" width="60" height="94" rx="8" fill="#0E1B33"/>' +
        '<rect x="468" y="82" width="44" height="30" rx="6" fill="#fff"/><rect x="468" y="118" width="21" height="14" rx="4" fill="#10B981"/><rect x="491" y="118" width="21" height="14" rx="4" fill="#334155"/></g>' +
      '<circle class="fx-pkt" r="10" fill="#34E0A1" stroke="#fff" stroke-width="3" opacity="0"/>';
    vis.appendChild(svg);
    var segs = $$('.fx-seg', svg).map(function (p) { var L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = reduce ? 0 : L; return { p: p, L: L, done: reduce }; });
    var nodes = $$('.fx-node', svg), pkt = $('.fx-pkt', svg);
    nodes.forEach(function (n, i) { n.style.opacity = reduce || i === 0 ? 1 : .35; });
    if (reduce) { nodes.forEach(function (n) { n.style.opacity = 1; }); return; }
    var queue = Promise.resolve();
    function drawSeg(i) {
      var s = segs[i]; if (s.done) return; s.done = true;
      queue = queue.then(function () {
        return M.animate(0, 1, { duration: .9, ease: 'easeInOut', onUpdate: function (k) {
          s.p.style.strokeDashoffset = s.L * (1 - k);
          var pt = s.p.getPointAtLength(s.L * k); pkt.setAttribute('cx', pt.x); pkt.setAttribute('cy', pt.y); pkt.style.opacity = k < 1 ? 1 : 0;
        } }).then(function () {
          var n = nodes[(i + 1) % 3]; n.style.opacity = 1;
          M.animate(n, { scale: [1, 1.08, 1] }, { duration: .4 });
        });
      });
    }
    function current() { var on = $$('.step').map(function (s) { return s.classList.contains('on'); }).indexOf(true); return on; }
    var seen = false;
    function update() { if (!seen) return; var c = current(); for (var i = 0; i <= c && i < 3; i++) drawSeg(i); }
    $$('.step').forEach(function (s) { new MutationObserver(update).observe(s, { attributes: true, attributeFilter: ['class'] }); });
    M.inView(svg, function () { seen = true; update(); }, { amount: .4 });
  })();

  /* 6. feature cards: icons draw themselves + tilt */
  $$('.fcard .fi svg').forEach(function (svg) {
    var parts = $$('path,circle', svg);
    parts.forEach(function (p) { var L = p.getTotalLength ? p.getTotalLength() : 60; p._L = L; p.style.strokeDasharray = L; p.style.strokeDashoffset = reduce ? 0 : L; });
    if (reduce) return;
    M.inView(svg, function () { parts.forEach(function (p, i) { M.animate(p, { strokeDashoffset: [p._L, 0] }, { duration: 1, delay: .2 + .15 * i, ease: 'easeOut' }); }); }, { amount: .6 });
    var card = svg.closest('.fcard');
    if (!touch) card.addEventListener('pointerenter', function () { parts.forEach(function (p, i) { M.animate(p, { strokeDashoffset: [p._L, 0] }, { duration: .7, delay: .08 * i }); }); });
  });
  function tilt(sel, max, lift) {
    if (reduce || touch) return;
    $$(sel).forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        M.animate(c, { rotateY: x * max, rotateX: -y * max, y: -lift, transformPerspective: 1000 }, { type: 'spring', stiffness: 220, damping: 18 });
      });
      c.addEventListener('pointerleave', function () { M.animate(c, { rotateY: 0, rotateX: 0, y: 0 }, SPRING); });
    });
  }
  tilt('.fcard', 10, 6);
  tilt('.plan', 6, 6);
  tilt('.vframe', 5, 0);
  tilt('.soon-list li', 8, 4);

  /* 7. pricing: Gold card floats; prices roll when switching PKR / USD */
  (function () {
    var pop = $('.plan.pop');
    if (pop && !reduce) M.inView(pop, function () { setTimeout(function () { M.animate(pop, { y: [0, -8, 0] }, { duration: 4, repeat: Infinity, ease: 'easeInOut' }); }, 1200); });
    var prices = $$('[data-price]');
    var num = function (t) { return Number((t.match(/[\d,]+/) || ['0'])[0].replace(/,/g, '')); };
    $$('[data-region]').forEach(function (b) {
      b.addEventListener('click', function () {
        var before = prices.map(function (p) { return { el: p, n: num(p.textContent) }; });
        setTimeout(function () { // main.js has just written the new price
          before.forEach(function (o) {
            var html = o.el.innerHTML, to = num(o.el.textContent), cur = (o.el.textContent.match(/^[A-Z]+/) || [''])[0];
            if (reduce || to === o.n) return;
            var small = $('small', o.el), tail = small ? small.outerHTML : '';
            M.animate(o.n, to, { duration: .7, ease: 'easeOut', onUpdate: function (v) { o.el.innerHTML = cur + ' ' + Math.round(v).toLocaleString('en-US') + tail; } })
              .then(function () { o.el.innerHTML = html; });
            M.animate(o.el.closest('.plan'), { scale: [1, 1.03, 1] }, { duration: .4 });
          });
        }, 0);
      });
    });
  })();

  /* 8. FAQ: spring open / close */
  if (!reduce) $$('.faq details').forEach(function (d) {
    var sum = $('summary', d), body = $('p', d), busy = false;
    sum.addEventListener('click', function (e) {
      e.preventDefault(); if (busy) return; busy = true;
      if (!d.open) {
        d.open = true; var h = body.scrollHeight;
        M.animate(body, { height: [0, h + 'px'], opacity: [0, 1] }, { type: 'spring', stiffness: 260, damping: 28 }).then(function () { body.style.height = ''; busy = false; });
      } else {
        M.animate(body, { height: [body.scrollHeight + 'px', 0], opacity: [1, 0] }, { duration: .25 }).then(function () { d.open = false; body.style.height = ''; body.style.opacity = ''; busy = false; });
      }
    });
  });

  /* 9. final call to action: parallax blobs */
  (function () {
    var f = $('.final'); if (!f || light) return;
    var a = el('span', 'fx-blob a'), b = el('span', 'fx-blob b');
    a.setAttribute('aria-hidden', 'true'); b.setAttribute('aria-hidden', 'true');
    f.insertBefore(b, f.firstChild); f.insertBefore(a, f.firstChild);
    if (reduce) return;
    M.scroll(M.animate(a, { y: [-80, 120], x: [-40, 60] }, { ease: 'linear' }), { target: f, offset: ['start end', 'end start'] });
    M.scroll(M.animate(b, { y: [120, -100], x: [40, -60] }, { ease: 'linear' }), { target: f, offset: ['start end', 'end start'] });
  })();
})();
