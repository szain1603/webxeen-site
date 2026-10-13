/* Webxeen: "One AI, every inbox" section. Decorative chats that type themselves in the
   background (WhatsApp, Instagram, Messenger). Uses Motion if present; safe to remove. */
(function () {
  'use strict';
  if (window.WEBXEEN_PRERENDER) return;
  var sec = document.getElementById('channels'); if (!sec) return;
  var M = window.Motion;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return; // keep the static chats from the HTML

  var CHATS = {
    wa: [['in', 'Assalam o Alaikum, yeh suit available hai?'], ['out', 'Ji haan! Size M aur L — Rs 4,500.'], ['in', 'M chahiye, COD ho jayega?'], ['out', 'Bilkul. Naam aur address bhej dein 😊'], ['in', 'Ayesha, Model Town Lahore'], ['out', 'Order #ALI-0031 book ho gaya ✅']],
    ig: [['in', 'Price?'], ['out', 'Rs 2,450 — Lahore mein free delivery 🚚'], ['in', 'Black mein hai?'], ['out', 'Ji, black aur maroon dono. Order karein?'], ['in', 'Yes please! 2 pieces'], ['out', 'Done ✅ Total Rs 4,900. Receipt bhej di.']],
    fb: [['in', 'Kal tak deliver ho jayega?'], ['out', 'Lahore mein 1–2 din mein, InshaAllah.'], ['in', 'JazzCash se pay kar sakta hun?'], ['out', 'Ji, order ke baad exact amount bhej dete hain.'], ['in', 'Screenshot bhej diya'], ['out', 'Payment mil gayi, shukriya! 🙌']]
  };
  var MAX = 5, visible = false, started = false;

  function wait(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function appear(node) {
    if (M) return M.animate(node, { opacity: [0, 1], y: [14, 0], scale: [.94, 1] }, { type: 'spring', stiffness: 320, damping: 24 });
    node.style.opacity = 1; return Promise.resolve();
  }
  function trim(feed) {
    while (feed.children.length > MAX) {
      var first = feed.firstElementChild;
      if (M) { first.style.pointerEvents = 'none'; }
      feed.removeChild(first);
    }
  }
  async function run(col, key, delay) {
    var feed = col.querySelector('.chan-feed');
    await wait(delay);
    for (;;) {
      var lines = CHATS[key];
      for (var i = 0; i < lines.length; i++) {
        while (!visible) await wait(400);
        var who = lines[i][0];
        if (who === 'out') {
          var t = document.createElement('p'); t.className = 'cb out typing'; t.innerHTML = '<i></i><i></i><i></i>';
          feed.appendChild(t); trim(feed); appear(t);
          await wait(900);
          feed.removeChild(t);
        }
        var b = document.createElement('p'); b.className = 'cb ' + who; b.textContent = lines[i][1];
        b.style.opacity = 0; feed.appendChild(b); trim(feed); appear(b);
        await wait(who === 'in' ? 1300 : 1700);
      }
      await wait(1600);
      if (M) await M.animate(feed.children, { opacity: 0, y: -10 }, { duration: .4 });
      feed.innerHTML = '';
      await wait(500);
    }
  }

  new IntersectionObserver(function (e) {
    visible = e[0].isIntersecting;
    if (visible && !started) {
      started = true;
      var cols = sec.querySelectorAll('.chan-col');
      for (var i = 0; i < cols.length; i++) {
        var key = cols[i].classList.contains('wa') ? 'wa' : cols[i].classList.contains('ig') ? 'ig' : 'fb';
        cols[i].querySelector('.chan-feed').innerHTML = '';
        run(cols[i], key, i * 700);
      }
    }
  }, { rootMargin: '80px' }).observe(sec);

  /* gentle parallax + entrance */
  if (M) {
    var bg = sec.querySelector('.chan-bg');
    M.scroll(M.animate(bg, { y: [60, -60] }, { ease: 'linear' }), { target: sec, offset: ['start end', 'end start'] });
    M.inView(sec, function () {
      M.animate(sec.querySelectorAll('.chan-pills li'), { opacity: [0, 1], y: [16, 0] }, { delay: M.stagger(.12, { startDelay: .2 }), type: 'spring', stiffness: 260, damping: 22 });
    }, { amount: .4 });
  }
})();
