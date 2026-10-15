/* Webxeen live demo (/demo)
   A free, rule-based copy of the assistant that runs only in the visitor's browser:
   nothing is sent anywhere. Left phone = the customer, right phone = the shop owner.
   Later, reply() can call the real AI (Gemini) instead of the rules below. */
(function () {
  'use strict';
  var doc = document, root = doc.documentElement;
  var $ = function (s, c) { return (c || doc).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || doc).querySelectorAll(s)); };
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };
  var ART = '/assets/img/art.svg?v=20261015';
  var CFG = window.WEBXEEN_CONFIG || { links: {} };

  /* ================================================================
     1. Helpers
     ================================================================ */
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
  function el(tag, cls, html) { var e = doc.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function art(id, label) {
    return '<svg viewBox="0 0 96 96" ' + (label ? 'role="img" aria-label="' + esc(label) + '"' : 'aria-hidden="true"') + ' focusable="false"><use href="' + ART + '#' + id + '"></use></svg>';
  }
  var ICON = {
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    more: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>',
    img: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="10" r="1.5"/><path d="M21 16l-5-5-8 8"/></svg>'
  };
  function norm(t) {
    return ' ' + String(t).toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9؀-ۿ]+/g, ' ').replace(/\s+/g, ' ').trim() + ' ';
  }
  function initials(name) {
    var w = String(name).replace(/[^A-Za-z0-9 ]/g, ' ').trim().split(/\s+/).filter(Boolean);
    var s = (w[0] ? w[0][0] : 'S') + (w[1] ? w[1][0] : (w[0] && w[0][1] ? w[0][1] : 'H'));
    return s.toUpperCase();
  }
  function pad4(n) { return ('000' + n).slice(-4); }
  function rnd(a, b) { return a + Math.random() * (b - a); }

  /* ================================================================
     2. Business presets (one per business type)
     items: [name, price in PKR, price in USD, picture]
     ================================================================ */
  var CATS = {
    restaurant: { flow: 'order', art: 'biryani', name: 'Karachi Grill', area: 'DHA, Lahore', hours: '12 pm – 1 am, every day', fee: 150, feeUsd: 3,
      eta: { en: '35–45 minutes', ur: '35–45 minute' }, pays: ['cod', 'jazzcash', 'easypaisa'],
      items: [['Chicken Karahi (half)', 1450, 16, 'karahi'], ['Seekh Kabab (4 pcs)', 780, 9, 'kabab'], ['Chicken Biryani', 650, 8, 'biryani'], ['Garlic Naan', 120, 2, 'naan'], ['Zinger Burger', 550, 7, 'burger'], ['Mint Margarita', 350, 4, 'drink']] },
    seller: { flow: 'order', art: 'dress', name: 'Sana’s Boutique', area: 'Gulberg, Lahore', hours: '11 am – 10 pm, Mon–Sat', fee: 250, feeUsd: 5,
      eta: { en: '2–3 days', ur: '2–3 din' }, pays: ['cod', 'jazzcash', 'bank'],
      items: [['Lawn 3pc (printed)', 4500, 45, 'dress'], ['Chiffon dupatta', 1800, 18, 'dupatta'], ['Men’s kurta', 3200, 32, 'kurta'], ['Khussa (pair)', 2200, 22, 'shoes'], ['Clutch bag', 2600, 26, 'bag'], ['Perfume 50 ml', 2900, 29, 'perfume']] },
    clinic: { flow: 'appt', art: 'stethoscope', who: 'patient', name: 'City Care Clinic', area: 'Model Town, Lahore', hours: '10 am – 8 pm, Mon–Sat',
      pays: ['cash', 'jazzcash', 'card'],
      items: [['General checkup', 1500, 20, 'stethoscope'], ['Dental scaling', 3500, 40, 'tooth'], ['Blood test (CBC)', 900, 12, 'lab'], ['Skin consultation', 2500, 30, 'makeup'], ['Follow-up visit', 800, 10, 'calendar']] },
    school: { flow: 'school', art: 'gradcap', name: 'Bright Future School', area: 'Johar Town, Lahore', hours: '8 am – 2 pm, Mon–Fri (office till 4 pm)',
      pays: ['bank', 'jazzcash', 'cash'],
      items: [['Admission fee (one time)', 15000, 150, 'gradcap'], ['Monthly fee: Montessori', 5500, 55, 'book'], ['Monthly fee: Class 1–5', 6500, 65, 'book'], ['Monthly fee: Class 6–8', 7800, 78, 'book'], ['Van service (monthly)', 4000, 40, 'bus'], ['Uniform set', 3800, 38, 'uniform']] },
    salon: { flow: 'appt', art: 'scissors', who: 'client', name: 'Glow Salon', area: 'Bahria Town, Lahore', hours: '11 am – 9 pm, Tue–Sun',
      pays: ['cash', 'jazzcash', 'card'],
      items: [['Haircut & blow-dry', 1200, 15, 'scissors'], ['Hair colour', 4500, 45, 'dryer'], ['Facial', 3000, 30, 'makeup'], ['Manicure & pedicure', 2500, 25, 'nails'], ['Party makeup', 6000, 60, 'makeup'], ['Bridal makeup', 25000, 250, 'makeup']] },
    bakery: { flow: 'order', art: 'cake', name: 'Sweet Crumbs Bakery', area: 'Cantt, Lahore', hours: '9 am – 11 pm, every day', fee: 120, feeUsd: 3,
      eta: { en: '60–90 minutes', ur: '60–90 minute' }, pays: ['cod', 'jazzcash', 'easypaisa'],
      items: [['Chocolate fudge cake (2 lb)', 2400, 25, 'cake'], ['Cupcakes (box of 6)', 1200, 12, 'cupcake'], ['Fresh bread loaf', 250, 3, 'bread'], ['Chicken pizza (medium)', 1300, 14, 'pizza'], ['Doodh patti chai', 120, 2, 'chai']] },
    grocery: { flow: 'order', art: 'basket', name: 'Fresh Mart', area: 'Wapda Town, Lahore', hours: '8 am – 12 am, every day', fee: 100, feeUsd: 3,
      eta: { en: 'the same day (2–3 hours)', ur: 'usi din (2–3 ghante)' }, pays: ['cod', 'jazzcash', 'easypaisa'],
      items: [['Fruit basket (mixed)', 1800, 18, 'basket'], ['Atta 10 kg', 1350, 14, 'grocery'], ['Cooking oil 5 L', 2900, 29, 'grocery'], ['Fresh milk 1 L', 220, 2, 'grocery'], ['Eggs (dozen)', 360, 4, 'grocery'], ['Basmati rice 5 kg', 1950, 20, 'grocery']] },
    electronics: { flow: 'order', art: 'phone', name: 'Mobile Hub', area: 'Hafeez Centre, Lahore', hours: '11 am – 9 pm, Mon–Sat', fee: 200, feeUsd: 5,
      eta: { en: '1–2 days', ur: '1–2 din' }, pays: ['cod', 'bank', 'card'],
      items: [['Galaxy A56 (8/256)', 94999, 349, 'phone'], ['Wireless earbuds', 4500, 25, 'earbuds'], ['Smart watch', 6999, 39, 'watch'], ['Fast charger 25W', 2200, 12, 'charger'], ['Power bank 20000 mAh', 5500, 22, 'charger']] }
  };
  // Versions for visitors outside Pakistan (prices in USD, no Pakistan-only payment apps).
  // items: [name, price in USD, picture]
  var INTL = {
    restaurant: { name: 'Grill House', area: 'Downtown', pays: ['cod', 'card', 'bank'],
      items: [['Chicken Kebab plate', 12, 'kabab'], ['Classic Burger', 9, 'burger'], ['Margherita Pizza', 14, 'pizza'], ['Chicken Biryani', 11, 'biryani'], ['Garlic Naan', 2, 'naan'], ['Mint Lemonade', 4, 'drink']] },
    seller: { name: 'Luna Boutique', area: 'City Centre', pays: ['cod', 'card', 'bank'],
      items: [['Summer dress', 45, 'dress'], ['Silk scarf', 18, 'dupatta'], ['Linen shirt', 32, 'kurta'], ['Sneakers', 55, 'shoes'], ['Clutch bag', 26, 'bag'], ['Perfume 50 ml', 29, 'perfume']] },
    clinic: { area: 'Main Street', pays: ['cash', 'card', 'bank'] },
    school: { area: 'Green Valley', pays: ['bank', 'card', 'cash'],
      items: [['Registration fee (one time)', 150, 'gradcap'], ['Monthly fee: Kindergarten', 55, 'book'], ['Monthly fee: Grades 1–5', 65, 'book'], ['Monthly fee: Grades 6–8', 78, 'book'], ['School bus (monthly)', 40, 'bus'], ['Uniform set', 38, 'uniform']] },
    salon: { area: 'Marina', pays: ['cash', 'card', 'bank'] },
    bakery: { area: 'Old Town', pays: ['cod', 'card', 'bank'],
      items: [['Chocolate fudge cake', 25, 'cake'], ['Cupcakes (box of 6)', 12, 'cupcake'], ['Sourdough loaf', 6, 'bread'], ['Pepperoni pizza', 14, 'pizza'], ['Cappuccino', 4, 'chai']] },
    grocery: { area: 'Riverside', pays: ['cod', 'card', 'bank'],
      items: [['Fruit basket (mixed)', 18, 'basket'], ['Whole wheat flour 5 kg', 9, 'grocery'], ['Olive oil 1 L', 12, 'grocery'], ['Fresh milk 1 L', 2, 'grocery'], ['Eggs (dozen)', 4, 'grocery'], ['Basmati rice 5 kg', 20, 'grocery']] },
    electronics: { area: 'Tech Mall', pays: ['cod', 'card', 'bank'] }
  };
  var CAT_ORDER = ['restaurant', 'seller', 'clinic', 'school', 'salon', 'bakery', 'grocery', 'electronics'];

  // pictures for items the visitor types in themselves
  var ART_KEYS = [
    [/laptop|phone|mobile|iphone|samsung|galaxy|tablet pc|ipad/, 'phone'], [/earbud|airpod|headphone|handsfree|earphone/, 'earbuds'],
    [/charger|cable|adapter|power ?bank/, 'charger'], [/watch/, 'watch'],
    [/karahi|curry|handi|qorma|korma|nihari|haleem|daal|dal |chana/, 'karahi'], [/naan|roti|paratha|chapati|kulcha/, 'naan'],
    [/kabab|kebab|tikka|boti|bbq|seekh|grill|steak/, 'kabab'], [/biryani|pulao|fried rice/, 'biryani'],
    [/burger|zinger|sandwich|shawarma|wrap|roll/, 'burger'], [/pizza/, 'pizza'], [/chai|tea|coffee|latte|cappuccino/, 'chai'],
    [/cupcake|pastry|donut|doughnut|cookie|muffin|biscuit/, 'cupcake'], [/cake|brownie|mithai|sweet/, 'cake'],
    [/bread|bun|rusk|loaf|croissant/, 'bread'], [/drink|juice|shake|margarita|soda|cola|lassi|water|smoothie/, 'drink'],
    [/test|cbc|lab|blood|x ?ray|ultrasound|scan/, 'lab'], [/dental|teeth|tooth|scaling|filling|braces/, 'tooth'],
    [/checkup|check up|consult|doctor|physician|gp |ent |child specialist/, 'stethoscope'], [/medicine|pill|capsule|syrup|pharmacy|injection/, 'pill'],
    [/haircut|hair cut|trim|beard|shave/, 'scissors'], [/colou?r|blow|keratin|rebond|hair/, 'dryer'],
    [/mani|pedi|nail/, 'nails'], [/facial|makeup|make up|bridal|threading|wax|cleansing|skin/, 'makeup'],
    [/uniform/, 'uniform'], [/van|bus|transport|pick and drop/, 'bus'],
    [/admission|montessori|class|grade|tuition|course|notes|book/, 'book'], [/fee|matric|o level|a level|exam/, 'gradcap'],
    [/dupatta|shawl|scarf|stole|hijab/, 'dupatta'], [/shoe|khussa|sneaker|sandal|heel|slipper|chappal/, 'shoes'],
    [/bag|clutch|purse|wallet|backpack/, 'bag'], [/perfume|attar|fragrance|scent|cologne|body spray/, 'perfume'],
    [/kurta|shirt|kameez|shalwar|tee|polo|jacket|trouser|jeans/, 'kurta'], [/lawn|suit|dress|frock|gown|abaya|3 ?pc|2 ?pc|lehenga|saree|kurti/, 'dress'],
    [/fruit|apple|mango|banana|orange|vegetable|sabzi/, 'basket'], [/atta|flour|oil|ghee|sugar|milk|egg|rice|grocery|soap|shampoo/, 'grocery'],
    [/appointment|session|visit/, 'calendar']
  ];
  var ART_BG = { karahi: 'f', naan: 'f', kabab: 'f', biryani: 'f', burger: 'f', pizza: 'f', chai: 'f', cake: 'f', cupcake: 'f', bread: 'f', drink: 'f',
    kurta: 'w', dress: 'w', dupatta: 'w', shoes: 'w', bag: 'w', perfume: 'w', watch: 'e', phone: 'e', earbuds: 'e', charger: 'e',
    basket: 'g', grocery: 'g', stethoscope: 'h', tooth: 'h', lab: 'h', pill: 'h', scissors: 'b', dryer: 'b', makeup: 'b', nails: 'b',
    book: 's', gradcap: 's', bus: 's', uniform: 's', calendar: 'h', box: 'x', tag: 'x' };
  function pickArt(name, flow) {
    var t = ' ' + String(name).toLowerCase() + ' ';
    for (var i = 0; i < ART_KEYS.length; i++) if (ART_KEYS[i][0].test(t)) return ART_KEYS[i][1];
    return flow === 'appt' ? 'calendar' : flow === 'school' ? 'book' : 'box';
  }
  function tile(id, cls) { return '<span class="pic pic-' + (ART_BG[id] || 'x') + (cls ? ' ' + cls : '') + '">' + art(id) + '</span>'; }

  var PAYS = {
    cod: { en: 'Cash on delivery', ur: 'Cash on delivery', online: false },
    cash: { en: 'Cash at the counter', ur: 'Counter par cash', online: false },
    jazzcash: { en: 'JazzCash', ur: 'JazzCash', online: true, acc: 'JazzCash 0300-0000000' },
    easypaisa: { en: 'Easypaisa', ur: 'Easypaisa', online: true, acc: 'Easypaisa 0345-0000000' },
    bank: { en: 'Bank transfer', ur: 'Bank transfer', online: true, acc: 'Meezan Bank, account 0000-0000000', accIntl: 'City Bank, account 0000-0000000' },
    card: { en: 'Card', ur: 'Card', online: false }
  };
  var PAY_ORDER = ['cod', 'cash', 'jazzcash', 'easypaisa', 'bank', 'card'];
  function acc(k) { return B && B.cur !== 'Rs' && PAYS[k].accIntl ? PAYS[k].accIntl : PAYS[k].acc; }

  /* ================================================================
     3. Words on the page (UI) — English and Roman Urdu
     ================================================================ */
  var UI = {
    en: {
      skip: 'Skip to the demo',
      nav: { home: 'Home', pricing: 'Pricing', faq: 'FAQ', test: 'Free test on WhatsApp', lang: 'Language' },
      head: { eyebrow: 'Live demo', title: 'Try Webxeen with your own business.', sub: 'Pick your business, add your products, then type as a customer on the first phone. The second phone shows what you, the shop owner, receive.' },
      setup: { title: 'Set up your demo', s1: 'Where do customers message you?', s2: 'What do you run?', s3: 'Your details', name: 'Business name',
        items: { order: 'Products and prices', appt: 'Services and fees', school: 'Classes and fees' }, add: 'Add item', fee: 'Delivery fee', cur: 'Currency',
        pay: 'Payment methods', hours: 'Opening hours', area: 'Area / city', edit: 'Edit name, products and prices', start: 'Start chat with these details', note: 'Demo only — nothing is sent to anyone.',
        itemName: 'Item {n} name', itemPrice: 'Item {n} price', remove: 'Remove item {n}', restarted: 'Chat restarted with your details.', max: 'You can add up to 8 items in the demo.' },
      cats: { restaurant: 'Restaurant', seller: 'Online seller', clinic: 'Clinic', school: 'School', salon: 'Salon', bakery: 'Bakery', grocery: 'Grocery', electronics: 'Electronics' },
      tabs: { cust: 'Customer', sell: 'Shop owner' },
      phone: { cust: 'You are the customer — type here', sell: 'You are the shop owner — tap the buttons', restart: 'Restart chat', log: 'Chat messages', new: 'New messages',
        msgLabel: 'Message', send: 'Send', type: 'Type a message…', all: 'All options', close: 'Close', more: 'More', alerts: 'Webxeen alerts', for: 'for {biz}',
        sLog: 'Shop owner alerts', sMsgLabel: 'Reply to the customer', sType: 'Reply to the customer as the shop…', online: 'online', replies: 'replies instantly',
        empty: 'New orders, payments and requests arrive here, each with one-tap buttons.', you: 'You' },
      stats: { orders: 'orders', sales: 'sales', check: 'to check' },
      after: { title: 'Like it? Try it with your real products on WhatsApp.', text: 'We set the assistant up with your products, prices and delivery rules. You chat with it as a customer before you pay anything.', cta: 'Get a free test', pricing: 'See pricing' },
      foot: { tagline: 'AI WhatsApp sales assistant for small businesses.', privacy: 'Privacy Policy', terms: 'Terms', rights: '© 2023 Webxeen. All rights reserved.' }
    },
    ur: {
      skip: 'Demo par jayein',
      nav: { home: 'Home', pricing: 'Qeematein', faq: 'Sawalat', test: 'WhatsApp par free test', lang: 'Zubaan' },
      head: { eyebrow: 'Live demo', title: 'Apne business ke saath Webxeen try karein.', sub: 'Apna business chunein, apne products daalein, phir pehle phone par customer ban kar likhein. Doosre phone par dekhein ke aap, shop owner, ko kya milta hai.' },
      setup: { title: 'Apna demo set karein', s1: 'Customers aap ko kahan message karte hain?', s2: 'Aap ka business kya hai?', s3: 'Aap ki tafseel', name: 'Business ka naam',
        items: { order: 'Products aur qeematein', appt: 'Services aur fees', school: 'Classes aur fees' }, add: 'Item add karein', fee: 'Delivery fee', cur: 'Currency',
        pay: 'Payment ke tareeqe', hours: 'Timings', area: 'Ilaqa / shehar', edit: 'Naam, products aur qeematein badlein', start: 'In details ke saath chat shuru karein', note: 'Sirf demo — kisi ko kuch nahi bheja jata.',
        itemName: 'Item {n} ka naam', itemPrice: 'Item {n} ki qeemat', remove: 'Item {n} hatayein', restarted: 'Aap ki details ke saath chat dobara shuru ho gayi.', max: 'Demo mein 8 items tak add kar sakte hain.' },
      cats: { restaurant: 'Restaurant', seller: 'Online seller', clinic: 'Clinic', school: 'School', salon: 'Salon', bakery: 'Bakery', grocery: 'Grocery', electronics: 'Electronics' },
      tabs: { cust: 'Customer', sell: 'Shop owner' },
      phone: { cust: 'Aap customer hain — yahan likhein', sell: 'Aap shop owner hain — buttons dabayein', restart: 'Chat dobara shuru karein', log: 'Chat ke messages', new: 'Naye messages',
        msgLabel: 'Message', send: 'Bhejein', type: 'Message likhein…', all: 'Saare options', close: 'Band karein', more: 'More', alerts: 'Webxeen alerts', for: '{biz} ke liye',
        sLog: 'Shop owner ke alerts', sMsgLabel: 'Customer ko jawab', sType: 'Shop ki taraf se customer ko jawab likhein…', online: 'online', replies: 'foran jawab deta hai',
        empty: 'Naye orders, payments aur requests yahan aati hain, har aik aik tap wale buttons ke saath.', you: 'Aap' },
      stats: { orders: 'orders', sales: 'sales', check: 'check karna' },
      after: { title: 'Pasand aaya? Apne asal products ke saath WhatsApp par try karein.', text: 'Hum assistant ko aap ke products, qeematon aur delivery rules ke saath set karte hain. Paise dene se pehle aap customer ban kar check karte hain.', cta: 'Free test lein', pricing: 'Qeematein dekhein' },
      foot: { tagline: 'Chhote businesses ke liye AI WhatsApp sales assistant.', privacy: 'Privacy Policy', terms: 'Terms', rights: '© 2023 Webxeen. Tamam huqooq mehfooz hain.' }
    }
  };

  /* Customer actions: button label + what the customer "says" when tapping it */
  var ACT = {
    menu: { en: 'See menu', ur: 'Menu dekhein', say: { en: 'Can I see the menu?', ur: 'Menu bhej dein' } },
    products: { en: 'See products', ur: 'Products dekhein', say: { en: 'What do you have?', ur: 'Kya kya available hai?' } },
    services: { en: 'Services & fees', ur: 'Services aur fees', say: { en: 'What services do you offer, and the fees?', ur: 'Services aur fees bata dein' } },
    fees: { en: 'Fee structure', ur: 'Fee structure', say: { en: 'What is the fee structure?', ur: 'Fee structure bata dein' } },
    order: { en: 'Place an order', ur: 'Order karein', say: { en: 'I want to place an order', ur: 'Order karna hai' } },
    add: { en: 'Add item', ur: 'Item add karein', say: { en: 'I want to add something', ur: 'Kuch aur add karna hai' } },
    edit: { en: 'Edit order', ur: 'Order edit', say: { en: 'I want to change my order', ur: 'Order mein tabdeeli karni hai' } },
    remove: { en: 'Remove item', ur: 'Item hatayein', say: { en: 'I want to remove an item', ur: 'Aik item hatana hai' } },
    confirm: { en: 'Confirm order', ur: 'Order confirm', say: { en: 'Please confirm my order', ur: 'Order confirm kar dein' } },
    cancel: { en: 'Cancel order', ur: 'Order cancel', say: { en: 'Please cancel my order', ur: 'Order cancel kar dein' } },
    pay: { en: 'Change payment', ur: 'Payment badlein', say: { en: 'Can I change the payment method?', ur: 'Payment ka tareeqa badalna hai' } },
    shot: { en: 'Send payment screenshot', ur: 'Payment screenshot bhejein', say: null },
    addr: { en: 'Change address', ur: 'Address badlein', say: { en: 'I need to change my address', ur: 'Address badalna hai' } },
    track: { en: 'Track order', ur: 'Order track', say: { en: 'Where is my order?', ur: 'Mera order kahan hai?' } },
    delivery: { en: 'Delivery charges', ur: 'Delivery charges', say: { en: 'How much is delivery and how long does it take?', ur: 'Delivery kitne ki hai aur kitna time lagega?' } },
    payments: { en: 'Payment methods', ur: 'Payment ke tareeqe', say: { en: 'How can I pay?', ur: 'Payment kaise hogi?' } },
    hours: { en: 'Opening hours', ur: 'Timings', say: { en: 'What are your timings?', ur: 'Timings kya hain?' } },
    location: { en: 'Location', ur: 'Location', say: { en: 'Where are you located?', ur: 'Aap kahan hain?' } },
    staff: { en: 'Talk to the shop', ur: 'Shop se baat', say: { en: 'Can I talk to someone from the shop?', ur: 'Shop walon se baat karwa dein' } },
    complaint: { en: 'Make a complaint', ur: 'Shikayat', say: { en: 'I have a complaint', ur: 'Mujhe shikayat karni hai' } },
    book: { en: 'Book appointment', ur: 'Appointment book', say: { en: 'I want to book an appointment', ur: 'Appointment book karni hai' } },
    resched: { en: 'Change time', ur: 'Time badlein', say: { en: 'Can I change my appointment time?', ur: 'Appointment ka time badalna hai' } },
    cancelAppt: { en: 'Cancel appointment', ur: 'Appointment cancel', say: { en: 'Please cancel my appointment', ur: 'Appointment cancel kar dein' } },
    admission: { en: 'Admission process', ur: 'Admission ka tareeqa', say: { en: 'How does admission work?', ur: 'Admission kaise hota hai?' } },
    visit: { en: 'Book campus visit', ur: 'School visit book', say: { en: 'I want to visit the campus', ur: 'School dekhne aana hai' } },
    van: { en: 'Van service', ur: 'Van service', say: { en: 'Do you have a van service?', ur: 'Van service hai?' } }
  };
  var SHEET = {
    order: [[{ en: 'Shopping', ur: 'Khareedari' }, ['menu', 'order', 'add', 'edit', 'remove', 'confirm', 'cancel']],
            [{ en: 'Payment and delivery', ur: 'Payment aur delivery' }, ['payments', 'pay', 'shot', 'addr', 'delivery', 'track']],
            [{ en: 'Help', ur: 'Madad' }, ['hours', 'location', 'staff', 'complaint']]],
    appt: [[{ en: 'Appointments', ur: 'Appointments' }, ['services', 'book', 'resched', 'cancelAppt']],
           [{ en: 'Help', ur: 'Madad' }, ['payments', 'hours', 'location', 'staff', 'complaint']]],
    school: [[{ en: 'Admissions', ur: 'Admissions' }, ['fees', 'admission', 'visit', 'van']],
             [{ en: 'Help', ur: 'Madad' }, ['payments', 'hours', 'location', 'staff', 'complaint']]]
  };

  /* ================================================================
     4. State
     ================================================================ */
  var params = new URLSearchParams(location.search);
  var tz = ''; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
  var inPK = tz === 'Asia/Karachi';
  var uiLang = params.get('lang') === 'ur' || params.get('lang') === 'en' ? params.get('lang') : (store.get('wx-lang') === 'ur' || store.get('wx-lang') === 'en' ? store.get('wx-lang') : (inPK ? 'ur' : 'en'));
  var S = null;           // conversation state (reset on every restart)
  var B = null;           // the business being demoed
  var gen = 0;            // bumps on restart so old timers stop
  var Q = Promise.resolve();
  var ch = ['wa', 'ig', 'fb'].indexOf(params.get('ch')) >= 0 ? params.get('ch') : 'wa';
  var cat = CATS[params.get('cat')] ? params.get('cat') : 'restaurant';
  var unseen = 0;

  function U(path, vars) {
    var v = path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, UI[uiLang]);
    if (v == null) v = path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, UI.en);
    return String(v).replace(/\{(\w+)\}/g, function (m, k) { return vars && vars[k] != null ? vars[k] : m; });
  }
  function rl() { return S ? S.rl : uiLang; }   // reply language (follows how the customer writes)
  function R(en, ur) { return rl() === 'ur' ? ur : en; }

  function money(n) {
    var c = B ? B.cur : 'Rs', v = Math.round(n * 100) / 100;
    var s = v.toLocaleString('en-US', { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 });
    return c === 'Rs' || c === 'AED' || c === 'SAR' ? c + ' ' + s : c + s;
  }
  function convert(pkr, usd, cur) {
    if (cur === 'Rs') return pkr;
    if (cur === '$') return usd;
    if (cur === 'AED' || cur === 'SAR') return Math.max(5, Math.round(usd * 3.7 / 5) * 5);
    if (cur === '£') return Math.max(1, Math.round(usd * 0.8));
    return Math.max(1, Math.round(usd * 0.92));
  }

  /* ================================================================
     5. Setup panel
     ================================================================ */
  var form = $('#bizForm'), fItems = $('#fItems');
  var draft = null; // what the form shows

  function presetDraft(key, cur) {
    var C = CATS[key];
    cur = cur || (inPK || uiLang === 'ur' ? 'Rs' : '$');
    var I = cur !== 'Rs' ? INTL[key] || {} : {};
    var items = I.items ? I.items.map(function (it) { return { n: it[0], p: convert(0, it[1], cur), a: it[2] }; })
      : C.items.map(function (it) { return { n: it[0], p: convert(it[1], it[2], cur), a: it[3] }; });
    return {
      cat: key, flow: C.flow, cur: cur, name: I.name || C.name, area: I.area || C.area, hours: C.hours,
      fee: C.flow === 'order' ? convert(C.fee, C.feeUsd, cur) : 0,
      pays: (I.pays || C.pays).slice(), items: items, touched: false
    };
  }
  function renderCats() {
    var g = $('#catGroup'); g.innerHTML = '';
    CAT_ORDER.forEach(function (k) {
      var b = el('button', 'd-cat', tile(CATS[k].art) + '<span>' + esc(U('cats.' + k)) + '</span>');
      b.type = 'button'; b.setAttribute('role', 'radio'); b.setAttribute('data-cat', k);
      b.setAttribute('aria-checked', String(k === cat));
      b.addEventListener('click', function () { selectCat(k); });
      g.appendChild(b);
    });
    radioKeys(g);
  }
  function radioKeys(group) {
    var btns = $$('[role=radio]', group);
    btns.forEach(function (b, i) {
      b.tabIndex = b.getAttribute('aria-checked') === 'true' ? 0 : -1;
      b.onkeydown = function (e) {
        var d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (!d) return; e.preventDefault();
        var n = btns[(i + d + btns.length) % btns.length]; n.focus(); n.click();
      };
    });
  }
  function renderForm() {
    $('#fName').value = draft.name;
    $('#fHours').value = draft.hours;
    $('#fArea').value = draft.area;
    $('#fFee').value = draft.fee || '';
    $('#fCur').value = draft.cur;
    $('#feeWrap').hidden = draft.flow !== 'order';
    $('#itemsLabel').textContent = U('setup.items.' + draft.flow);
    renderItems();
    var pg = $('#fPays'); pg.innerHTML = '';
    PAY_ORDER.forEach(function (k) {
      if (draft.flow === 'order' ? k === 'cash' : k === 'cod') return;
      var b = el('button', 'd-chip', ICON.check + '<span>' + esc(PAYS[k][uiLang]) + '</span>');
      b.type = 'button'; b.setAttribute('aria-pressed', String(draft.pays.indexOf(k) >= 0)); b.setAttribute('data-pay', k);
      b.addEventListener('click', function () {
        var on = b.getAttribute('aria-pressed') !== 'true';
        if (!on && $$('[aria-pressed=true]', pg).length === 1) return; // keep at least one
        b.setAttribute('aria-pressed', String(on));
      });
      pg.appendChild(b);
    });
  }
  function renderItems() {
    fItems.innerHTML = '';
    draft.items.forEach(function (it, i) {
      var row = el('div', 'd-item');
      var n = i + 1;
      row.innerHTML = tile(it.a || pickArt(it.n, draft.flow), 'sm') +
        '<input class="d-in" maxlength="40" data-f="n" aria-label="' + esc(U('setup.itemName', { n: n })) + '" value="' + esc(it.n) + '">' +
        '<input class="d-in d-price" maxlength="8" inputmode="decimal" data-f="p" aria-label="' + esc(U('setup.itemPrice', { n: n })) + '" value="' + esc(it.p) + '">' +
        '<button type="button" class="d-x" aria-label="' + esc(U('setup.remove', { n: n })) + '">' + ICON.minus + '</button>';
      $('[data-f=n]', row).addEventListener('input', function (e) { draft.touched = true; it.n = e.target.value; it.a = null; $('.pic', row).outerHTML = tile(pickArt(it.n, draft.flow), 'sm'); });
      $('[data-f=p]', row).addEventListener('input', function (e) { draft.touched = true; it.p = e.target.value; });
      $('.d-x', row).addEventListener('click', function () { if (draft.items.length > 1) { draft.touched = true; draft.items.splice(i, 1); renderItems(); } });
      fItems.appendChild(row);
    });
    $('#fAdd').disabled = draft.items.length >= 8;
  }
  function readForm() {
    var d = draft;
    d.name = $('#fName').value.trim() || CATS[d.cat].name;
    d.hours = $('#fHours').value.trim() || CATS[d.cat].hours;
    d.area = $('#fArea').value.trim() || CATS[d.cat].area;
    d.cur = $('#fCur').value;
    d.fee = Math.max(0, parseFloat(String($('#fFee').value).replace(/[^0-9.]/g, '')) || 0);
    d.pays = $$('#fPays [aria-pressed=true]').map(function (b) { return b.getAttribute('data-pay'); });
    if (!d.pays.length) d.pays = CATS[d.cat].pays.slice();
    var items = d.items.map(function (it) {
      var p = parseFloat(String(it.p).replace(/[^0-9.]/g, ''));
      return { n: String(it.n).trim(), p: isFinite(p) && p > 0 ? p : 0, a: it.a || pickArt(it.n, d.flow) };
    }).filter(function (it) { return it.n && it.p > 0; });
    if (!items.length) items = presetDraft(d.cat, d.cur).items;
    return { cat: d.cat, flow: d.flow, cur: d.cur, name: d.name, hours: d.hours, area: d.area, fee: d.flow === 'order' ? d.fee : 0, pays: d.pays, items: items,
      eta: CATS[d.cat].eta, who: CATS[d.cat].who, ini: initials(d.name) };
  }
  function selectCat(k) {
    cat = k;
    $$('#catGroup [role=radio]').forEach(function (b) { b.setAttribute('aria-checked', String(b.getAttribute('data-cat') === k)); });
    radioKeys($('#catGroup'));
    draft = presetDraft(k, draft ? draft.cur : null);
    renderForm();
    start();
    if (isMobile() && !$('#dDet').open) $('#dTabs').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  }
  function selectCh(c) {
    ch = c;
    $$('#chGroup [role=radio]').forEach(function (b) { b.setAttribute('aria-checked', String(b.getAttribute('data-ch') === c)); });
    radioKeys($('#chGroup'));
    $('#custPane').setAttribute('data-ch', c);
    $('#cChan').textContent = { wa: 'WhatsApp', ig: 'Instagram', fb: 'Messenger' }[c];
  }

  /* ================================================================
     6. Customer phone
     ================================================================ */
  var cLog = $('#cLog'), sLog = $('#sLog'), cIn = $('#cIn'), sIn = $('#sIn');
  var typingEl = el('div', 'msg bot typing', '<i></i><i></i><i></i>');
  typingEl.setAttribute('aria-hidden', 'true');

  function nearEnd(log) { return log.scrollHeight - log.scrollTop - log.clientHeight < 90; }
  function toEnd(log, force) {
    if (force || nearEnd(log)) { log.scrollTop = log.scrollHeight; if (log === cLog) $('#cNew').hidden = true; }
    else if (log === cLog) $('#cNew').hidden = false;
  }
  function stamp() { var d = new Date(); return d.toLocaleTimeString(uiLang === 'ur' ? 'en-PK' : 'en-US', { hour: 'numeric', minute: '2-digit' }); }
  function appendC(node) {
    var stick = nearEnd(cLog);
    if (typingEl.parentNode === cLog) cLog.insertBefore(node, typingEl); else cLog.appendChild(node);
    toEnd(cLog, stick);
    if (!reduce && node.animate) node.animate([{ opacity: 0, transform: 'translateY(8px) scale(.98)' }, { opacity: 1, transform: 'none' }], { duration: 260, easing: 'cubic-bezier(.2,.9,.3,1.2)' });
  }
  function custSays(text) {
    var m = el('div', 'msg me', '<p>' + esc(text) + '</p><time>' + stamp() + '</time>');
    appendC(m);
  }
  function noteC(html) { appendC(el('div', 'msg sys', html)); }

  // everything the bot and the owner's phone do goes through one queue, so it plays in order
  function later(fn, ms) {
    var g = gen;
    Q = Q.then(function () { return new Promise(function (res) { setTimeout(function () { if (g === gen) fn(); res(); }, reduce ? Math.min(ms, 60) : ms); }); });
  }
  function bot(html, opt) {
    opt = opt || {};
    var ms = Math.min(1100, 380 + String(html).replace(/<[^>]+>/g, '').length * 6);
    later(function () { cLog.appendChild(typingEl); toEnd(cLog); }, 120);
    later(function () { if (typingEl.parentNode) typingEl.remove(); appendC(botMsg(html, opt)); renderQuick(); }, ms);
  }
  function botMsg(html, opt) {
    var m = el('div', 'msg bot' + (opt.staff ? ' staff' : ''));
    var h = (opt.staff ? '<b class="from">' + esc(B.name) + ' · ' + esc(R('team', 'team')) + '</b>' : '') + '<p>' + html + '</p>';
    if (opt.receipt) h += receiptHTML(opt.receipt);
    m.innerHTML = h;
    if (opt.cards) m.appendChild(cardsEl(opt.cards, opt.cardBtn));
    if (opt.editor) { lockEditors(); m.appendChild(editorEl(opt._o || S.order, !!opt._o)); }
    if (opt.choices) {
      // older questions are closed once a new one is asked
      $$('.choices', cLog).forEach(function (w) { $$('button', w).forEach(function (b) { b.disabled = true; }); });
      m.appendChild(choicesEl(opt.choices));
    }
    m.appendChild(el('time', null, stamp()));
    return m;
  }
  function cardsEl(idx, btn) {
    var wrap = el('div', 'cards');
    idx.forEach(function (i) {
      var it = B.items[i];
      var c = el('div', 'card', tile(it.a) + '<b>' + esc(it.n) + '</b><small>' + esc(money(it.p)) + '</small>');
      if (btn) {
        var bt = el('button', 'card-btn', ICON.plus + '<span>' + esc(btn === 'book' ? R('Book', 'Book') : R('Add', 'Add')) + '</span>');
        bt.type = 'button';
        bt.addEventListener('click', function () {
          if (btn === 'book') { custSays(R('Book ', 'Book karna hai: ') + it.n); pickService(i); }
          else { custSays(R('Add 1 x ', '1 x ') + it.n + R('', ' add kar dein')); addItems([{ i: i, q: 1 }]); }
        });
        c.appendChild(bt);
      }
      wrap.appendChild(c);
    });
    return wrap;
  }
  function choicesEl(list) {
    var w = el('div', 'choices');
    var yes = list.filter(function (c) { return c.yes; })[0], no = list.filter(function (c) { return c.no; })[0];
    if (yes || no) {
      var lockW = function () { $$('button', w).forEach(function (x) { x.disabled = true; }); };
      S.pendingYes = yes ? function () { lockW(); yes.go(); } : null;
      S.pendingNo = no ? function () { lockW(); no.go(); } : null;
    }
    list.forEach(function (c) {
      var b = el('button', 'choice' + (c.primary ? ' pri' : ''), esc(c.label));
      b.type = 'button';
      b.addEventListener('click', function () {
        $$('button', w).forEach(function (x) { x.disabled = true; });
        b.classList.add('picked'); S.pendingYes = S.pendingNo = null;
        if (c.say !== false) custSays(c.say || c.label);
        c.go();
      });
      w.appendChild(b);
    });
    return w;
  }
  function lineTotal(lines) { return lines.reduce(function (s, l) { return s + B.items[l.i].p * l.q; }, 0); }
  function orderTotal(o) { return lineTotal(o.lines) + (B.fee || 0); }
  function linesText(lines) { return lines.map(function (l) { return l.q + ' x ' + esc(B.items[l.i].n); }).join(', '); }
  function statusLabel(s) {
    var L = { booked: R('Booked', 'Booked'), paid: R('Paid', 'Paid'), dispatched: R('On the way', 'Raste mein'), delivered: R('Delivered', 'Deliver ho gaya'),
      cancelled: R('Cancelled', 'Cancel'), confirmed: R('Confirmed', 'Confirm'), arrived: R('Arrived', 'Aa gaye'), noshow: R('No-show', 'Nahi aaye'), requested: R('Requested', 'Request') };
    return L[s] || s;
  }
  function receiptHTML(o) {
    var rows = o.lines.map(function (l) { var it = B.items[l.i]; return '<li><span>' + l.q + ' x ' + esc(it.n) + '</span><span>' + esc(money(it.p * l.q)) + '</span></li>'; }).join('');
    if (B.fee) rows += '<li class="fee"><span>' + R('Delivery', 'Delivery') + '</span><span>' + esc(money(B.fee)) + '</span></li>';
    return '<div class="rc"><div class="rc-top"><span>' + R('Order', 'Order') + ' <b>#' + esc(o.no) + '</b></span><em class="st st-' + o.status + '">' + esc(statusLabel(o.status)) + '</em></div>' +
      '<ul>' + rows + '</ul><div class="rc-total"><span>' + R('Total', 'Total') + '</span><b>' + esc(money(orderTotal(o))) + '</b></div>' +
      '<div class="rc-meta">' + esc(o.name) + (o.addr ? ' · ' + esc(o.addr) : '') + '<br>' + esc(PAYS[o.pay][rl()]) + '</div></div>';
  }

  /* order editor inside the chat: change quantities, remove, add, save */
  function lockEditors() { $$('.ed:not(.done)', cLog).forEach(function (w) { w.classList.add('done'); $$('button', w).forEach(function (b) { b.disabled = true; }); }); }
  function editorEl(o, isCart) {
    var work = o.lines.map(function (l) { return { i: l.i, q: l.q }; });
    var w = el('div', 'ed');
    function draw() {
      w.innerHTML = '';
      work.forEach(function (l, k) {
        var it = B.items[l.i];
        var r = el('div', 'ed-row' + (l.q ? '' : ' off'),
          tile(it.a, 'sm') + '<span class="ed-name">' + esc(it.n) + '<small>' + esc(money(it.p)) + '</small></span>' +
          '<span class="ed-q"><button type="button" data-d="-1" aria-label="' + esc(R('One less ', 'Aik kam ') + it.n) + '">' + ICON.minus + '</button><b aria-live="polite">' + l.q + '</b>' +
          '<button type="button" data-d="1" aria-label="' + esc(R('One more ', 'Aik aur ') + it.n) + '">' + ICON.plus + '</button></span>');
        $$('[data-d]', r).forEach(function (b) { b.addEventListener('click', function () { l.q = Math.max(0, Math.min(20, l.q + +b.getAttribute('data-d'))); draw(); }); });
        w.appendChild(r);
      });
      var tot = lineTotal(work) + (B.fee || 0);
      w.appendChild(el('div', 'ed-total', '<span>' + R('New total', 'Naya total') + '</span><b>' + esc(money(tot)) + '</b>'));
      var a = el('div', 'ed-act');
      var add = el('button', 'ed-add', ICON.plus + '<span>' + R('Add item', 'Item add') + '</span>'); add.type = 'button';
      var save = el('button', 'ed-save', R('Save changes', 'Save karein')); save.type = 'button';
      add.addEventListener('click', function () {
        lock(); custSays(R('I want to add an item', 'Aik item add karna hai'));
        var kept = work.filter(function (l) { return l.q > 0; });
        if (isCart) S.cart = kept;
        else if (diffCore(o.lines, kept, 'en') !== 'no change' && kept.length) saveEdit(work, 'customer', true);
        showAddPicker();
      });
      save.addEventListener('click', function () { lock(); custSays(R('Save my changes', 'Changes save kar dein')); if (isCart) S.cartEdit = true; saveEdit(work, 'customer'); });
      a.appendChild(add); a.appendChild(save); w.appendChild(a);
    }
    function lock() { w.classList.add('done'); $$('button', w).forEach(function (b) { b.disabled = true; }); }
    draw();
    return w;
  }

  /* quick buttons (3 + More) and the "More" sheet */
  function quickKeys() {
    var f = B.flow;
    if (f === 'appt') return S.appt && S.appt.status !== 'cancelled' ? ['resched', 'cancelAppt', 'location'] : ['services', 'book', 'hours'];
    if (f === 'school') return S.visit && S.visit.status !== 'cancelled' ? ['van', 'location', 'staff'] : ['fees', 'admission', 'visit'];
    var o = S.order, menuKey = B.cat === 'restaurant' || B.cat === 'bakery' ? 'menu' : 'products';
    if (S.stage === 'details' || S.stage === 'phone' || S.stage === 'pay') return ['edit', menuKey, 'staff'];
    if (S.cart.length) return ['confirm', 'edit', 'add'];
    if (o && o.status === 'booked' && PAYS[o.pay].online && !o.shot) return ['shot', 'edit', 'track'];
    if (o && (o.status === 'booked' || o.status === 'paid')) return ['track', 'edit', 'add'];
    if (o && o.status === 'dispatched') return ['track', 'staff', 'complaint'];
    return [menuKey, 'delivery', 'payments'];
  }
  function actLabel(k) {
    if (k === 'menu' && B.flow === 'order' && !(B.cat === 'restaurant' || B.cat === 'bakery')) k = 'products';
    return ACT[k][uiLang];
  }
  function renderQuick() {
    var q = $('#cQuick'); q.innerHTML = '';
    var sc = el('div', 'qr-scroll');
    quickKeys().forEach(function (k) {
      var b = el('button', 'qr', esc(actLabel(k))); b.type = 'button';
      b.addEventListener('click', function () { doAct(k); });
      sc.appendChild(b);
    });
    q.appendChild(sc);
    var m = el('button', 'qr qr-more', ICON.more + '<span>' + esc(U('phone.more')) + '</span>'); m.type = 'button';
    m.setAttribute('aria-haspopup', 'dialog'); m.setAttribute('aria-controls', 'cSheet');
    m.addEventListener('click', openSheet);
    q.appendChild(m);
  }
  var lastFocus = null;
  function openSheet() {
    lastFocus = doc.activeElement;
    var body = $('#cSheetBody'); body.innerHTML = '';
    SHEET[B.flow].forEach(function (g) {
      body.appendChild(el('p', 'sh-h', esc(g[0][uiLang])));
      var grid = el('div', 'sh-grid');
      g[1].forEach(function (k) {
        var b = el('button', 'sh-btn', esc(actLabel(k))); b.type = 'button';
        b.addEventListener('click', function () { closeSheet(); doAct(k); });
        grid.appendChild(b);
      });
      body.appendChild(grid);
    });
    $('#cSheet').hidden = false;
    $('#cSheetClose').focus();
  }
  function closeSheet() { $('#cSheet').hidden = true; if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  $('#cSheetClose').addEventListener('click', closeSheet);
  $('#cSheet').addEventListener('click', function (e) { if (e.target === e.currentTarget) closeSheet(); });
  $('#cSheet').addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { e.stopPropagation(); closeSheet(); }
    if (e.key === 'Tab') { // keep focus inside the sheet
      var f = $$('button', $('#cSheet')), a = f[0], z = f[f.length - 1];
      if (e.shiftKey && doc.activeElement === a) { e.preventDefault(); z.focus(); } else if (!e.shiftKey && doc.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });

  function doAct(k) {
    if (k === 'shot') return sendShot();
    var say = ACT[k].say;
    if (k === 'menu' && B.flow === 'order' && !(B.cat === 'restaurant' || B.cat === 'bakery')) say = ACT.products.say;
    custSays(say[uiLang]);
    S.rl = uiLang;
    ACTIONS[k]();
  }

  /* ================================================================
     7. Shop owner phone
     ================================================================ */
  function appendS(node) {
    var e = $('.s-empty', sLog); if (e) e.remove();
    sLog.appendChild(node);
    sLog.scrollTop = sLog.scrollHeight;
    if (!reduce && node.animate) node.animate([{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 300, easing: 'ease-out' });
    if (isMobile() && activeTab !== 'sell') { unseen++; var bd = $('#sellBadge'); bd.textContent = unseen; bd.hidden = false; }
    stats();
  }
  function seller(fn) { later(fn, 280); }
  function event(title, body, tone) {
    appendS(el('div', 'ev' + (tone ? ' ' + tone : ''), '<b>' + title + '</b>' + (body ? '<span>' + body + '</span>' : '') + '<time>' + stamp() + '</time>'));
  }
  function stats() {
    var orders = S.orders.filter(function (o) { return o.status !== 'cancelled'; });
    $('#stOrders').textContent = orders.length + (S.appts.length ? S.appts.filter(function (a) { return a.status !== 'cancelled'; }).length : 0) + (S.visits.length ? S.visits.length : 0);
    $('#stSales').textContent = money(orders.reduce(function (s, o) { return s + orderTotal(o); }, 0));
    $('#stCheck').textContent = S.orders.filter(function (o) { return o.shot && o.status === 'booked'; }).length + S.tickets.filter(function (t) { return !t.solved; }).length;
  }

  // One live card per order. It moves to the bottom when something new happens.
  function orderCard(o) {
    var c = o.card || el('div', 'oc');
    o.card = c;
    var lines = o.lines.map(function (l) { var it = B.items[l.i]; return '<li>' + tile(it.a, 'xs') + '<span>' + l.q + ' x ' + esc(it.n) + '</span><b>' + esc(money(it.p * l.q)) + '</b></li>'; }).join('');
    c.innerHTML = '<div class="oc-top"><b>' + esc(o.status === 'booked' && !o.edited ? U2('New order', 'Naya order') : U2('Order', 'Order')) + ' #' + esc(o.no) + '</b><em class="st st-' + o.status + '">' + esc(statusLabelUI(o.status)) + '</em></div>' +
      '<ul class="oc-lines">' + lines + '</ul>' +
      '<div class="oc-meta"><span>' + esc(o.name) + (o.phone ? ' · ' + esc(o.phone) : '') + '</span><span>' + esc(o.addr || '') + '</span><span>' + esc(PAYS[o.pay][uiLang]) + (o.paidAmt ? ' · ' + esc(U2('paid', 'paid')) + ' ' + esc(money(o.paidAmt)) : '') + '</span></div>' +
      '<div class="oc-total"><span>' + esc(U2('Total', 'Total')) + (B.fee ? ' <small>(' + esc(U2('incl. delivery', 'delivery samait')) + ')</small>' : '') + '</span><b>' + esc(money(orderTotal(o))) + '</b></div>';
    c.appendChild(sellerButtons(orderButtons(o)));
    return c;
  }
  function U2(en, ur) { return uiLang === 'ur' ? ur : en; }
  function statusLabelUI(s) { var k = S.rl; S.rl = uiLang; var v = statusLabel(s); S.rl = k; return v; }
  function bumpCard(o) { appendS(orderCard(o)); }

  // 3 buttons on every card: two main actions + "More" with all the others
  function sellerButtons(spec) {
    var w = el('div', 'sb');
    spec.main.forEach(function (a) { w.appendChild(sBtn(a)); });
    if (spec.more && spec.more.length) {
      var m = el('button', 'sbtn more', ICON.more + '<span>' + esc(U('phone.more')) + '</span>'); m.type = 'button';
      m.setAttribute('aria-expanded', 'false');
      var menu = el('div', 'smenu'); menu.hidden = true;
      spec.more.forEach(function (a) { var b = sBtn(a); b.className = 'smi'; menu.appendChild(b); });
      m.addEventListener('click', function () { var open = menu.hidden; menu.hidden = !open; m.setAttribute('aria-expanded', String(open)); if (open) $('button', menu).focus(); });
      menu.addEventListener('keydown', function (e) { if (e.key === 'Escape') { menu.hidden = true; m.setAttribute('aria-expanded', 'false'); m.focus(); } });
      w.appendChild(m); w.appendChild(menu);
    }
    return w;
  }
  function sBtn(a) {
    var b = el('button', 'sbtn' + (a.pri ? ' pri' : '') + (a.warn ? ' warn' : ''), esc(a.label)); b.type = 'button';
    b.addEventListener('click', function () { a.go(b); });
    return b;
  }
  function orderButtons(o) {
    var s = o.status, online = PAYS[o.pay].online;
    var A = {
      paid: { label: U2('Mark paid', 'Paid'), pri: true, go: function () { sellerPaid(o); } },
      notpaid: { label: U2('Not paid', 'Payment nahi aayi'), warn: true, go: function () { sellerNotPaid(o); } },
      dispatch: { label: U2('Dispatched', 'Dispatched'), pri: true, go: function () { sellerStatus(o, 'dispatched'); } },
      delivered: { label: U2('Delivered', 'Delivered'), pri: true, go: function () { sellerStatus(o, 'delivered'); } },
      cancel: { label: U2('Cancel', 'Cancel'), warn: true, go: function (b) { sellerConfirm(b, o, U2('Cancel order #', 'Order cancel karein #') + o.no + '?', function () { sellerCancel(o); }); } },
      edit: { label: U2('Edit order', 'Order edit'), go: function () { sellerEdit(o); } },
      additems: { label: U2('Add items', 'Items add'), go: function () { sellerAdd(o); } },
      refund: { label: U2('Refund', 'Refund'), go: function () { sellerRefund(o); } },
      msg: { label: U2('Message customer', 'Customer ko message'), go: function () { focusReply(); } }
    };
    if (s === 'booked' && online && !o.paidAmt) return { main: [A.paid, A.cancel], more: [A.edit, A.additems, A.dispatch, A.msg] };
    if (s === 'booked') return { main: [A.dispatch, A.cancel], more: [A.edit, A.additems, A.paid, A.msg] };
    if (s === 'paid') return { main: [A.dispatch, A.cancel], more: [A.edit, A.additems, A.refund, A.msg] };
    if (s === 'dispatched') return { main: [A.delivered, A.msg], more: [A.refund] };
    if (s === 'delivered') return { main: [A.msg], more: [A.refund] };
    return { main: o.paidAmt && !o.refunded ? [A.refund] : [A.msg], more: [] };
  }
  function sellerConfirm(btn, o, q, yes) {
    var bar = btn.closest('.sb'), old = bar.innerHTML;
    var box = el('div', 'sconfirm', '<span>' + esc(q) + '</span>');
    var y = el('button', 'sbtn warn', esc(U2('Yes', 'Haan'))), n = el('button', 'sbtn', esc(U2('No', 'Nahi')));
    y.type = n.type = 'button';
    y.addEventListener('click', function () { yes(); });
    n.addEventListener('click', function () { bumpCardInPlace(o); });
    box.appendChild(y); box.appendChild(n);
    bar.replaceWith(box); y.focus();
  }
  function bumpCardInPlace(o) { orderCard(o); }
  function focusReply() {
    if (isMobile()) setTab('sell');
    sIn.focus();
  }

  /* owner actions -> the customer is told automatically */
  function sellerPaid(o) {
    o.status = 'paid'; o.paidAmt = o.odd || orderTotal(o); o.paidFor = orderTotal(o); o.shotCard && o.shotCard.classList.add('done');
    bumpCard(o);
    bot(R('Payment received ✅ for order #', 'Payment mil gayi ✅ order #') + esc(o.no) + R('. Thank you! We’re preparing it now.', '. Shukriya! Ab tayyari ho rahi hai.'));
  }
  function sellerNotPaid(o) {
    o.shot = false; o.shotCard && o.shotCard.classList.add('done');
    event(U2('Payment marked not received', 'Payment nahi mili'), '#' + esc(o.no), 'warn');
    bot(R('We couldn’t find your payment for #', 'Order #') + esc(o.no) + R(' yet. Please check the amount and account, then send the screenshot again.', ' ki payment abhi nahi mili. Raqam aur account check karke screenshot dobara bhej dein.'));
  }
  function sellerStatus(o, st) {
    o.status = st; bumpCard(o);
    if (st === 'dispatched') bot(R('Good news! Your order #', 'Khushkhabri! Aap ka order #') + esc(o.no) + R(' is on the way 🚚', ' raste mein hai 🚚') + (PAYS[o.pay].online ? '' : R(' Please keep ' + esc(money(orderTotal(o))) + ' ready.', ' ' + esc(money(orderTotal(o))) + ' tayyar rakhein.')));
    if (st === 'delivered') bot(R('Order #', 'Order #') + esc(o.no) + R(' was delivered. Thank you for shopping with ', ' deliver ho gaya. ') + esc(B.name) + R('!', ' se khareedari ka shukriya!'));
  }
  function sellerCancel(o) {
    o.status = 'cancelled'; bumpCard(o);
    if (S.order === o) S.order = null;
    bot(R('Sorry, ', 'Maazrat, ') + esc(B.name) + R(' had to cancel order #', ' ko order #') + esc(o.no) + R(' (item out of stock).', ' cancel karna para (item stock mein nahi).') +
      (o.paidAmt ? R(' Your refund of ' + esc(money(o.paidAmt)) + ' will be sent today.', ' Aap ka refund ' + esc(money(o.paidAmt)) + ' aaj bhej diya jayega.') : ''));
  }
  function sellerRefund(o) {
    var amt = o.paidAmt || orderTotal(o); o.refunded = true; bumpCard(o);
    event(U2('Refund sent', 'Refund bhej diya'), '#' + esc(o.no) + ' · ' + esc(money(amt)));
    bot(R('Your refund of ', 'Aap ka refund ') + esc(money(amt)) + R(' for order #', ' (order #') + esc(o.no) + R(' has been sent.', ') bhej diya gaya hai.'));
  }
  function sellerEdit(o) {
    if (o.status === 'dispatched' || o.status === 'delivered' || o.status === 'cancelled') return;
    var work = o.lines.map(function (l) { return { i: l.i, q: l.q }; });
    var w = el('div', 'oc ed s-ed');
    function draw() {
      w.innerHTML = '<div class="oc-top"><b>' + esc(U2('Edit order #', 'Order edit #')) + esc(o.no) + '</b></div>';
      work.forEach(function (l) {
        var it = B.items[l.i];
        var r = el('div', 'ed-row' + (l.q ? '' : ' off'), tile(it.a, 'xs') + '<span class="ed-name">' + esc(it.n) + '</span>' +
          '<span class="ed-q"><button type="button" data-d="-1" aria-label="' + esc(U2('One less ', 'Aik kam ') + it.n) + '">' + ICON.minus + '</button><b>' + l.q + '</b>' +
          '<button type="button" data-d="1" aria-label="' + esc(U2('One more ', 'Aik aur ') + it.n) + '">' + ICON.plus + '</button></span>');
        $$('[data-d]', r).forEach(function (b) { b.addEventListener('click', function () { l.q = Math.max(0, Math.min(20, l.q + +b.getAttribute('data-d'))); draw(); }); });
        w.appendChild(r);
      });
      w.appendChild(el('div', 'ed-total', '<span>' + esc(U2('New total', 'Naya total')) + '</span><b>' + esc(money(lineTotal(work) + (B.fee || 0))) + '</b>'));
      var a = el('div', 'ed-act');
      var add = el('button', 'ed-add', ICON.plus + '<span>' + esc(U2('Add items', 'Items add')) + '</span>'); add.type = 'button';
      var save = el('button', 'ed-save', esc(U2('Save and tell customer', 'Save karke customer ko batayein'))); save.type = 'button';
      add.addEventListener('click', function () { pickerS(function (i) { var f = work.filter(function (l) { return l.i === i; })[0]; if (f) f.q++; else work.push({ i: i, q: 1 }); draw(); }); });
      save.addEventListener('click', function () { w.classList.add('done'); $$('button', w).forEach(function (b) { b.disabled = true; }); saveEdit(work, 'shop', false, o); });
      a.appendChild(add); a.appendChild(save); w.appendChild(a);
    }
    draw(); appendS(w);
  }
  function sellerAdd(o) {
    if (o.status === 'dispatched' || o.status === 'delivered' || o.status === 'cancelled') return;
    pickerS(function (i) {
      var work = o.lines.map(function (l) { return { i: l.i, q: l.q }; });
      var f = work.filter(function (l) { return l.i === i; })[0]; if (f) f.q++; else work.push({ i: i, q: 1 });
      saveEdit(work, 'shop', false, o);
    });
  }
  function pickerS(onPick) {
    var w = el('div', 'oc pick', '<div class="oc-top"><b>' + esc(U2('Add an item', 'Item chunein')) + '</b></div>');
    B.items.forEach(function (it, i) {
      var b = el('button', 'pick-row', tile(it.a, 'xs') + '<span>' + esc(it.n) + '</span><b>' + esc(money(it.p)) + '</b>' + ICON.plus); b.type = 'button';
      b.addEventListener('click', function () { w.remove(); onPick(i); });
      w.appendChild(b);
    });
    appendS(w);
  }

  /* ================================================================
     8. Understanding the customer (rules)
     ================================================================ */
  var URW = /\b(hai|hain|ha|kya|kia|mein|mai|aur|bhi|chahiye|chahye|chaiye|chahie|dein|kar|karo|kardo|kitna|kitne|kitni|bhej|bhejo|bhejein|hoga|hogi|nahi|nhi|haan|han|ji|jee|acha|accha|theek|thik|shukriya|shukria|mujhe|mujhy|muje|apna|aap|ap|hum|yeh|ye|woh|wo|kab|kahan|kaise|kesy|kese|kyun|salam|assalam|aoa|walaikum|bhai|baji|dena|lena|wala|wali|abhi|jaldi|ka|ki|ke|ko|se|par|pe|tak|karna|karni|krna|krdo|kr|dedo|de)\b/g;
  var ENW = /\b(the|is|are|what|how|much|please|can|i|you|want|need|does|have|your|my|when|where|thanks|thank|would|like|could|with|for|this|that|it|there|any|do|an|of|to|me|we|get|will|am)\b/g;
  function detectLang(t) {
    var u = (t.match(URW) || []).length, e = (t.match(ENW) || []).length;
    if (u > e) return 'ur';
    if (e > u) return 'en';
    return null;
  }
  var NUMW = { ek: 1, aik: 1, ik: 1, one: 1, a: 1, an: 1, do: 2, two: 2, teen: 3, three: 3, char: 4, chaar: 4, four: 4, panch: 5, paanch: 5, five: 5,
    che: 6, chay: 6, chhe: 6, six: 6, saat: 7, seven: 7, aath: 8, eight: 8, nau: 9, nine: 9, das: 10, ten: 10 };
  var STOP = { pcs: 1, pc: 1, half: 1, full: 1, set: 1, pack: 1, piece: 1, pieces: 1, pair: 1, the: 1, and: 1, with: 1, ml: 1, lb: 1, kg: 1, of: 1, box: 1, fresh: 1,
    monthly: 1, fee: 1, one: 1, time: 1, class: 1, medium: 1, large: 1, small: 1, mixed: 1, visit: 1, bank: 1, dozen: 1, mah: 1, '1': 1, '2': 1, '4': 1, '5': 1, '6': 1, '10': 1, '50': 1 };
  function tokens(name) { return norm(name).trim().split(' ').filter(function (w) { return w.length >= 3 && !STOP[w] && !/^\d+$/.test(w); }); }
  function similar(w, k) {
    if (w === k) return true;
    if (w.length < 4 || k.length < 4) return false;
    var n = Math.min(w.length, k.length, 5);
    return w.slice(0, n) === k.slice(0, n) && Math.abs(w.length - k.length) <= 3;
  }
  // find the products the customer named, with how many of each
  function findItems(t) {
    var words = t.trim().split(' ');
    var freq = {};
    B.items.forEach(function (it) { tokens(it.n).forEach(function (k) { freq[k] = (freq[k] || 0) + 1; }); });
    var hits = [];
    B.items.forEach(function (it, i) {
      var score = 0, pos = -1;
      tokens(it.n).forEach(function (k) {
        for (var j = 0; j < words.length; j++) if (similar(words[j], k)) { score += 1 / freq[k]; if (pos < 0 || j < pos) pos = j; break; }
      });
      if (score > 0) hits.push({ i: i, score: score, pos: pos });
    });
    if (!hits.length) return { items: [], ambiguous: null };
    // group hits that start at the same word: keep the best ones
    var groups = {};
    hits.forEach(function (h) { (groups[h.pos] = groups[h.pos] || []).push(h); });
    var items = [], ambiguous = null;
    Object.keys(groups).map(Number).sort(function (a, b) { return a - b; }).forEach(function (p) {
      var g = groups[p].sort(function (a, b) { return b.score - a.score; });
      var q = qtyAt(words, p);
      if (g.length > 1 && g[0].score === g[1].score && g[0].score < 1) { ambiguous = { list: g.map(function (h) { return h.i; }), q: q }; return; }
      if (g[0].score >= 0.99 || g.length === 1) items.push({ i: g[0].i, q: q, explicit: q.explicit });
    });
    items = items.map(function (x) { return { i: x.i, q: x.q.n, explicit: x.explicit }; });
    return { items: items, ambiguous: ambiguous && { list: ambiguous.list, q: ambiguous.q.n } };
  }
  function qtyAt(words, p) {
    for (var b = p - 1; b >= Math.max(0, p - 3); b--) {
      var w = words[b];
      if (/^\d{1,2}$/.test(w)) return { n: Math.max(1, Math.min(20, +w)), explicit: true };
      var m = w.match(/^(\d{1,2})x$/); if (m) return { n: +m[1], explicit: true };
      if (NUMW[w] != null) return { n: NUMW[w], explicit: w !== 'a' && w !== 'an' };
      if (w === 'x') continue;
      if (b < p - 1) break;
    }
    var a = words[p + 1], a2 = words[p + 2];
    if (a && /^x?\d{1,2}$/.test(a)) return { n: Math.max(1, Math.min(20, +a.replace('x', ''))), explicit: true };
    if (a === 'x' && /^\d{1,2}$/.test(a2 || '')) return { n: +a2, explicit: true };
    return { n: 1, explicit: false };
  }
  var RX = {
    salam: /\b(assalam|asalam|assalamualaikum|salam|slam|aoa|salaam|asslam)\b/,
    greet: /\b(hi|hii|hello|hey|hola|good morning|good evening|good afternoon)\b/,
    thanks: /\b(thanks|thank you|thank u|thx|ty|shukriya|shukria|jazakallah|jazak allah|meherbani|great|perfect|nice)\b/,
    yes: /^ (yes|yeah|yep|yup|haan|han|ha|ji|jee|g|ok|okay|okk|theek|thik|confirm|sure|done|kar do|kardo|kar dein|bilkul|zaroor|y) /,
    no: /^ (no|nope|nahi|nhi|nai|na|mat|n) /,
    menu: /\b(menu|list|catalog|catalogue|products|product|items|services|service|kya kya|kia kia|kya milta|kya hai|available|dikhao|dikhayein|dikha do|show)\b/,
    price: /\b(price|prices|rate|rates|kitn[aeiy]|kitny|cost|costs|how much|qeemat|keemat|paise|fees|fee)\b/,
    want: /\b(order|chahiye|chahye|chaiye|chahie|chaheye|want|need|take|dena|de do|dedo|dein|bhej do|bhejo|send|buy|lena|leni|lunga|lungi|mangwana|mangwa|add|daal|dal do|get me|i ll have|ill have|give me)\b/,
    add: /\b(add|aur|bhi|plus|extra|one more|ek aur|aik aur|also|another)\b/,
    remove: /\b(remove|hata|hatao|hata do|hata dein|nikal|nikalo|nikal do|minus|delete|without|nahi chahiye|kam kar)\b/,
    edit: /\b(edit|change|badal|badalna|badlo|badal do|tabdeel|tabdeeli|update|modify|quantity|qty)\b/,
    cancel: /\b(cancel|cancell?ed|mat bhejo|mat bhejna|order band|wapas le lo|cancle|cansel)\b/,
    confirm: /\b(confirm|place order|place my order|book kar do|book kardo|done hai|final)\b/,
    track: /\b(track|tracking|status|kahan hai|kahan h|kidhar|where is|kab aye|kab ayega|kab aaye|kab aaega|kab tak|when will|arrive|pohnche|pohanch|rider)\b/,
    delivery: /\b(delivery|deliver|shipping|ship|charges|kitne din|how long|time lagega|courier)\b/,
    payment: /\b(pay|payment|jazzcash|jazz cash|easypaisa|easy paisa|bank|card|cod|cash|transfer|account)\b/,
    shot: /\b(screenshot|screen shot|ss|paid|bhej di|bhej diya|send kar di|send kar diya|transfer kar di|transfer kar diya|payment kar di|payment done|payment ho gayi)\b/,
    hours: /\b(timing|timings|open|close|closed|khula|khulta|khulte|band hota|hours|working hours|kab tak khula|kab khulta)\b/,
    location: /\b(location|where are you|kahan ho|kahan hain|shop kahan|map|branch|located|address kya)\b/,
    staff: /\b(human|staff|owner|manager|insaan|real person|call me|call karo|call kar|baat karni|baat karwa|talk to|speak to)\b/,
    complaint: /\b(complain|complaint|shikayat|kharab|kharaab|bad|der ho|der se|wrong|ghalat|galat|thanda|broken|toota|tuta|damaged|missing|not happy|disappointed)\b/,
    book: /\b(appointment|book|booking|slot|milna|consult|checkup|visit|aana|aa sakta|aa sakti|come in|available time)\b/,
    resched: /\b(reschedule|change (the |my )?time|time badal|time change|another time|different time|aur time|postpone|shift|dusra time|doosra time|move my)\b/,
    admission: /\b(admission|admit|dakhla|daakhla|enroll|enrol|seat|apply)\b/,
    visit: /\b(visit|campus|tour|dekhne|milne|aana|meet|school dekh)\b/,
    van: /\b(van|transport|pick|drop|bus)\b/,
    whoami: /\b(are you (a )?(bot|ai|robot|human|real)|bot ho|robot ho|insaan ho|ai ho|who are you|kaun ho|aap kaun)\b/,
    offtopic: /\b(weather|mausam|cricket|match|score|politics|election|news|joke|movie|film|song|gaana|gana|love|shaadi|homework|bitcoin|crypto|stock|football|recipe|chatgpt|gemini|capital of|president|prime minister)\b/
  };
  function has(t, k) { return RX[k].test(t); }

  /* ================================================================
     9. Replies
     ================================================================ */
  function menuWord() {
    if (B.flow === 'appt') return R('services', 'services');
    if (B.flow === 'school') return R('fee structure', 'fee structure');
    return B.cat === 'restaurant' || B.cat === 'bakery' ? R('menu', 'menu') : R('products', 'products');
  }
  function allIdx() { return B.items.map(function (x, i) { return i; }); }
  function payList() { return B.pays.map(function (k) { return esc(PAYS[k][rl()]); }).join(', '); }

  var ACTIONS = {
    menu: function () { showMenu(); },
    products: function () { showMenu(); },
    services: function () { showMenu(); },
    fees: function () { showMenu(); },
    order: function () {
      if (B.flow !== 'order') return showMenu();
      bot(R('Sure! Tap “Add” on what you’d like, or just type it — for example “2 ', 'Ji zaroor! Jo chahiye us par “Add” dabayein, ya likh dein — jaise “2 ') + esc(B.items[0].n.split(' (')[0].toLowerCase()) + '”.', { cards: allIdx(), cardBtn: 'add' });
    },
    add: function () {
      if (B.flow !== 'order') return showMenu();
      if (S.order && editable(S.order)) { S.editWork = null; return showAddPicker(); }
      ACTIONS.order();
    },
    edit: function () { openEdit(); },
    remove: function () { openEdit(); },
    confirm: function () { confirmCart(); },
    cancel: function () { askCancel(); },
    pay: function () { changePay(); },
    addr: function () {
      if (!S.order) return noOrder();
      if (!editable(S.order)) return lockedMsg(S.order);
      S.stage = 'addr';
      bot(R('Sure — please send the new full address for order #', 'Ji — order #') + esc(S.order.no) + R('.', ' ka naya poora address bhej dein.'));
    },
    track: function () { track(); },
    delivery: function () { deliveryInfo(); },
    payments: function () { bot(R('We accept: ', 'Hum yeh payments lete hain: ') + payList() + '.'); },
    hours: function () { bot(R('We’re open ', 'Hamari timings: ') + esc(B.hours) + '.'); },
    location: function () { bot(R('We’re in ', 'Hum ') + esc(B.area) + R('.', ' mein hain.') + (B.flow === 'order' ? R(' We deliver across the city.', ' Poore shehar mein delivery karte hain.') : R(' Parking is available nearby.', ' Qareeb parking mil jati hai.'))); },
    staff: function () { handoff(''); },
    complaint: function () {
      S.stage = 'complaint';
      bot(R('I’m sorry to hear that. Please tell me what happened, and I’ll pass it to the team right away.', 'Afsos hua sun kar. Bata dein kya hua, main foran team tak pohncha deta hun.'));
    },
    book: function () { if (B.flow === 'school') return startVisit(); showMenu(true); },
    resched: function () {
      if (!S.appt || S.appt.status === 'cancelled') return bot(R('You don’t have an appointment yet. Want to book one?', 'Abhi aap ki koi appointment nahi. Book karein?'), { choices: [yesBook()] });
      askSlot('resched');
    },
    cancelAppt: function () {
      var a = S.appt;
      if (!a || a.status === 'cancelled') return bot(R('You don’t have an appointment to cancel.', 'Cancel karne ke liye koi appointment nahi.'));
      bot(R('Cancel appointment #', 'Appointment #') + esc(a.no) + R(' (' + esc(B.items[a.i].n) + ', ' + esc(a.slot) + ')?', ' (' + esc(B.items[a.i].n) + ', ' + esc(a.slot) + ') cancel kar doon?'), {
        choices: [{ label: R('Yes, cancel', 'Haan, cancel'), yes: true, go: function () { cancelAppt('customer'); } }, { label: R('No, keep it', 'Nahi, rehne dein'), no: true, go: function () { bot(R('No problem, it stays booked.', 'Theek hai, appointment qaim hai.')); } }]
      });
    },
    admission: function () {
      bot(R('Admissions are open for 2026–27. The steps are simple:<br>1. Visit the campus and meet the coordinator<br>2. A short, friendly assessment<br>3. Submit documents: ' + (B.cur === 'Rs' ? 'B-form' : 'birth certificate') + ', 2 photos and the last school report<br>Would you like to book a campus visit?',
        'Session 2026–27 ke admissions open hain. Tareeqa aasaan hai:<br>1. School visit karein aur coordinator se milein<br>2. Chhota sa assessment<br>3. Documents jama karwayein: B-form, 2 tasveerein aur pichla result card<br>Kya school visit book kar doon?'),
        { choices: [{ label: R('Book a visit', 'Visit book karein'), primary: true, yes: true, go: startVisit }, { label: R('See fees', 'Fees dekhein'), go: function () { showMenu(); } }] });
    },
    visit: function () { startVisit(); },
    van: function () {
      var v = B.items.filter(function (it) { return /van|transport|bus/i.test(it.n); })[0];
      bot(R('Yes, we have a pick-and-drop van for nearby areas', 'Ji, qareebi ilaqon ke liye pick-and-drop van hai') + (v ? R(' — ' + esc(money(v.p)) + ' a month.', ' — ' + esc(money(v.p)) + ' mahana.') : '.') + R(' The office can check your route.', ' Office aap ka route check kar lega.'));
    }
  };
  function yesBook() { return { label: R('Book now', 'Abhi book karein'), primary: true, yes: true, go: function () { showMenu(true); } }; }
  function noOrder() { bot(R('You don’t have an order yet. Would you like to see the ' + menuWord() + '?', 'Abhi aap ka koi order nahi. ' + menuWord() + ' dekhein?'), { choices: [{ label: R('Yes, show me', 'Haan, dikhayein'), primary: true, yes: true, go: function () { showMenu(); } }] }); }
  function editable(o) { return o && (o.status === 'booked' || o.status === 'paid'); }
  function lockedMsg(o) {
    bot(R('Order #' + esc(o.no) + ' is already ' + (o.status === 'cancelled' ? 'cancelled' : o.status === 'delivered' ? 'delivered' : 'on the way') + ', so it can’t be changed now. Want me to ask the shop team?',
      'Order #' + esc(o.no) + ' ' + (o.status === 'cancelled' ? 'cancel ho chuka' : o.status === 'delivered' ? 'deliver ho chuka' : 'raste mein') + ' hai, is liye ab tabdeeli nahi ho sakti. Shop team se baat karwa doon?'),
      { choices: [{ label: R('Yes, please', 'Ji, karwa dein'), primary: true, yes: true, go: function () { handoff(''); } }, { label: R('No, thanks', 'Nahi, shukriya'), no: true, go: function () { bot(R('Okay! Anything else?', 'Theek hai! Aur kuch?')); } }] });
  }

  function showMenu(forBooking) {
    var f = B.flow;
    if (f === 'order') bot(R('Here’s our ' + menuWord() + ' 👇 Tap “Add” or just type what you’d like.', 'Yeh raha hamara ' + menuWord() + ' 👇 “Add” dabayein ya likh dein kya chahiye.'), { cards: allIdx(), cardBtn: 'add' });
    else if (f === 'appt') bot(forBooking ? R('Which service would you like to book?', 'Kaun si service book karni hai?') : R('Here are our services and fees. Tap “Book” to pick a time.', 'Yeh hain hamari services aur fees. Time chunne ke liye “Book” dabayein.'), { cards: allIdx(), cardBtn: 'book' });
    else bot(R('Here is our fee structure for 2026–27:', 'Session 2026–27 ka fee structure:'), { cards: allIdx(), choices: [{ label: R('Admission process', 'Admission ka tareeqa'), go: ACTIONS.admission }, { label: R('Book a campus visit', 'School visit book'), primary: true, go: startVisit }] });
  }
  function deliveryInfo() {
    if (B.flow !== 'order') return ACTIONS.location();
    var eta = B.eta ? B.eta[rl()] : R('1–2 days', '1–2 din');
    bot(B.fee ? R('Delivery is ' + esc(money(B.fee)) + ' and usually takes ' + esc(eta) + '.', 'Delivery ' + esc(money(B.fee)) + ' hai aur aam taur par ' + esc(eta) + ' lagte hain.')
      : R('Delivery is free and usually takes ' + esc(eta) + '.', 'Delivery free hai aur aam taur par ' + esc(eta) + ' lagte hain.'));
  }

  /* ----- cart and orders ----- */
  function cartText(lines) { return lines.map(function (l) { return l.q + ' x ' + esc(B.items[l.i].n) + ' (' + esc(money(B.items[l.i].p * l.q)) + ')'; }).join('<br>'); }
  function merge(lines, add) {
    add.forEach(function (a) { var f = lines.filter(function (l) { return l.i === a.i; })[0]; if (f) f.q = Math.min(20, f.q + a.q); else lines.push({ i: a.i, q: a.q }); });
    return lines;
  }
  function addItems(add) {
    if (B.flow === 'appt') return pickService(add[0].i);
    if (B.flow === 'school') return priceReply(add.map(function (a) { return a.i; }));
    if (S.order && editable(S.order) && !S.cart.length) {
      var work = merge(S.order.lines.map(function (l) { return { i: l.i, q: l.q }; }), add);
      return saveEdit(work, 'customer', true);
    }
    merge(S.cart, add);
    var sub = lineTotal(S.cart);
    bot(R('Added ✅', 'Add ho gaya ✅') + '<br>' + cartText(S.cart) + '<br><b>' + R('Subtotal', 'Subtotal') + ': ' + esc(money(sub)) + '</b>' +
      (B.fee ? R(' + delivery ' + esc(money(B.fee)), ' + delivery ' + esc(money(B.fee))) : '') + '<br>' + R('Anything else, or shall I confirm the order?', 'Aur kuch, ya order confirm kar doon?'),
      { choices: [{ label: R('Confirm order', 'Order confirm'), primary: true, yes: true, go: confirmCart }, { label: R('Add more', 'Aur add karein'), go: function () { showMenu(); } }] });
  }
  function confirmCart() {
    if (B.flow !== 'order') return showMenu(true);
    if (!S.cart.length) {
      if (S.order && editable(S.order)) return bot(R('Your order #' + esc(S.order.no) + ' is already booked ✅', 'Aap ka order #' + esc(S.order.no) + ' pehle hi book hai ✅'), { receipt: S.order });
      return bot(R('Your cart is empty. What would you like to order?', 'Cart khaali hai. Kya order karna hai?'), { cards: allIdx(), cardBtn: 'add' });
    }
    if (S.cust.name && S.cust.addr && (ch === 'wa' || S.cust.phone)) return askPay();
    S.stage = 'details';
    bot(R('Great! Please send your name and full delivery address.', 'Zabardast! Apna naam aur poora delivery address bhej dein.'));
  }
  function looksLikeAddress(t) { return /\d/.test(t) || /\b(house|home|street|st|road|rd|block|phase|sector|gali|mohalla|town|colony|flat|apartment|apt|plot|near|society|lane|avenue|dha|gulberg|bahria|johar|model)\b/i.test(t); }
  function takeDetails(raw) {
    var t = raw.trim();
    var parts = t.split(/\s*[,\n]\s*/);
    if (!S.cust.name && parts.length > 1 && parts[0].split(' ').length <= 4 && !looksLikeAddress(parts[0])) { S.cust.name = parts[0]; S.cust.addr = parts.slice(1).join(', '); }
    else if (!S.cust.name && !looksLikeAddress(t) && t.split(' ').length <= 4) S.cust.name = t;
    else if (!S.cust.addr) S.cust.addr = t;
    else S.cust.name = S.cust.name || t;
    S.cust.name = S.cust.name && S.cust.name.slice(0, 40);
    S.cust.addr = S.cust.addr && S.cust.addr.slice(0, 90);
    if (!S.cust.name) return bot(R('Thanks! And your name, please?', 'Shukriya! Aur aap ka naam?'));
    if (!S.cust.addr) return bot(R('Thanks ' + esc(S.cust.name) + '! And your full delivery address?', 'Shukriya ' + esc(S.cust.name) + '! Ab poora delivery address bata dein?'));
    if (ch !== 'wa' && !S.cust.phone) { S.stage = 'phone'; return bot(R('And a mobile number for the rider?', 'Aur rider ke liye mobile number?')); }
    askPay();
  }
  function askPay() {
    S.stage = 'pay';
    var total = lineTotal(S.cart) + (B.fee || 0);
    bot(R('Your order: ', 'Aap ka order: ') + '<br>' + cartText(S.cart) + (B.fee ? '<br>' + R('Delivery', 'Delivery') + ' ' + esc(money(B.fee)) : '') + '<br><b>' + R('Total ', 'Total ') + esc(money(total)) + '</b><br>' + R('How would you like to pay?', 'Payment kaise karenge?'),
      { choices: B.pays.map(function (k) { return { label: PAYS[k][rl()], go: function () { book(k); } }; }) });
  }
  function book(payKey) {
    S.stage = null;
    var o = { no: B.ini + '-' + pad4(S.seq++), lines: S.cart, name: S.cust.name, addr: S.cust.addr, phone: S.cust.phone, pay: payKey, status: 'booked', shot: false };
    S.cart = []; S.order = o; S.orders.push(o);
    if (PAYS[payKey].online) o.odd = Math.round((orderTotal(o) - rnd(0.13, 0.87)) * 100) / 100;
    bot(R('Order <b>#' + esc(o.no) + '</b> is booked ✅', 'Order <b>#' + esc(o.no) + '</b> book ho gaya ✅'), { receipt: o });
    if (PAYS[payKey].online) {
      bot(R('Please send exactly <b>' + esc(money(o.odd)) + '</b> to ' + esc(acc(payKey)) + ' (demo account) and share the screenshot here. The slightly odd amount helps the shop spot your payment instantly.',
        'Meharbani karke bilkul <b>' + esc(money(o.odd)) + '</b> ' + esc(acc(payKey)) + ' (demo account) par bhejein aur screenshot yahan bhej dein. Thodi alag raqam se shop aap ki payment foran pehchan leti hai.'),
        { choices: [{ label: R('Send screenshot (demo)', 'Screenshot bhejein (demo)'), primary: true, say: false, go: sendShot }] });
    } else if (payKey === 'card') {
      bot(R('We’ll send you a secure card payment link in a moment (demo).', 'Abhi aap ko card payment ka mehfooz link bhej dete hain (demo).'));
    } else {
      bot(R('You’ll pay ' + esc(money(orderTotal(o))) + ' ' + (payKey === 'cash' ? 'at the counter' : 'on delivery') + '. We’ll message you as soon as it’s dispatched.',
        esc(money(orderTotal(o))) + ' ' + (payKey === 'cash' ? 'counter par' : 'delivery par') + ' dene honge. Dispatch hote hi aap ko bata denge.'));
    }
    seller(function () { bumpCard(o); });
  }
  function sendShot() {
    var o = S.order;
    if (!o || !PAYS[o.pay].online) {
      custSays(R('I sent the payment', 'Payment bhej di hai'));
      return bot(R('Thanks! There’s no online payment pending right now.', 'Shukriya! Abhi koi online payment baqi nahi.'));
    }
    var amt = o.odd || orderTotal(o);
    var m = el('div', 'msg me shot', '<div class="shot-img" role="img" aria-label="' + esc(R('Payment screenshot', 'Payment screenshot')) + '"><span class="shot-bar">SamplePay</span><span class="shot-ok">' + ICON.check + R('Transfer successful', 'Transfer ho gaya') + '</span><b>' + esc(money(amt)) + '</b><small>' + R('To', 'To') + ': ' + esc(B.name) + '</small><small>TX-' + Math.floor(rnd(10000000, 99999999)) + '</small></div><time>' + stamp() + '</time>');
    appendC(m);
    o.shot = true;
    bot(R('Thanks! Payment screenshot received for #' + esc(o.no) + '. The shop will confirm it shortly.', 'Shukriya! #' + esc(o.no) + ' ka payment screenshot mil gaya. Shop jald confirm kar degi.'));
    seller(function () {
      var c = el('div', 'oc pay', '<div class="oc-top"><b>' + esc(U2('Payment screenshot', 'Payment screenshot')) + ' · #' + esc(o.no) + '</b><em class="st st-check">' + esc(U2('Check', 'Check')) + '</em></div>' +
        '<ul class="chk"><li>' + ICON.check + esc(U2('Amount ', 'Raqam ')) + esc(money(amt)) + esc(U2(' matches', ' theek')) + '</li><li>' + ICON.check + esc(U2('Receiver: ', 'Receiver: ')) + esc(B.name) + '</li><li>' + ICON.check + esc(U2('Transaction ID not used before', 'Transaction ID pehle use nahi hui')) + '</li></ul>' +
        '<p class="oc-note">' + esc(B.cur === 'Rs' ? U2('Always confirm in your own bank or JazzCash app before you dispatch.', 'Dispatch se pehle apni bank ya JazzCash app mein zaroor confirm karein.') : U2('Always confirm in your own bank app before you dispatch.', 'Dispatch se pehle apni bank app mein zaroor confirm karein.')) + '</p>');
      c.appendChild(sellerButtons({ main: [{ label: U2('Mark paid', 'Paid'), pri: true, go: function () { c.classList.add('done'); $$('button', c).forEach(function (b) { b.disabled = true; }); sellerPaid(o); } },
        { label: U2('Not paid', 'Nahi aayi'), warn: true, go: function () { c.classList.add('done'); $$('button', c).forEach(function (b) { b.disabled = true; }); sellerNotPaid(o); } }],
        more: [{ label: U2('Message customer', 'Customer ko message'), go: focusReply }] }));
      o.shotCard = c;
      appendS(c);
    });
  }
  function openEdit() {
    if (B.flow !== 'order') return B.flow === 'appt' ? ACTIONS.resched() : showMenu();
    if (S.cart.length) {
      var o0 = { lines: S.cart };
      // edit the cart the same way as an order
      return bot(R('Here is your cart. Change quantities, then tap Save.', 'Yeh raha aap ka cart. Tadaad badlein, phir Save dabayein.'), { editor: true, _o: o0 });
    }
    if (!S.order) return noOrder();
    if (!editable(S.order)) return lockedMsg(S.order);
    bot(R('Here’s order #' + esc(S.order.no) + '. Change quantities or remove items, then tap “Save changes”.', 'Yeh raha order #' + esc(S.order.no) + '. Tadaad badlein ya item hatayein, phir “Save karein” dabayein.'), { editor: true });
  }
  function showAddPicker() {
    bot(R('What would you like to add?', 'Kya add karna hai?'), { cards: allIdx(), cardBtn: 'add' });
  }
  function saveEdit(work, by, quiet, target) {
    var lines = work.filter(function (l) { return l.q > 0; });
    lockEditors();
    if (S.cartEdit) {
      S.cartEdit = false; S.cart = lines;
      if (!lines.length) return bot(R('Your cart is now empty. What would you like instead?', 'Cart ab khaali hai. Kuch aur chahiye?'), { cards: allIdx(), cardBtn: 'add' });
      return bot(R('Updated ✅', 'Update ho gaya ✅') + '<br>' + cartText(lines) + '<br>' + R('Shall I confirm?', 'Confirm kar doon?'), { choices: [{ label: R('Confirm order', 'Order confirm'), primary: true, yes: true, go: confirmCart }] });
    }
    var o = target || S.order;
    if (!o) return;
    if (!lines.length) { if (by === 'customer') return askCancel(); return; }
    var before = orderTotal(o), beforeLines = o.lines;
    var diffTxt = diffLines(beforeLines, lines);
    o.lines = lines; o.edited = true;
    var after = orderTotal(o);
    if (o.odd && !o.paidAmt) o.odd = Math.round((after - rnd(0.13, 0.87)) * 100) / 100;
    var money2 = '';
    if (o.paidAmt) {
      var base = o.paidFor || o.paidAmt;   // the odd amount counts as the full order total
      if (after > base) money2 = R(' You’ve already paid for ' + esc(money(base)) + ', so please send the remaining <b>' + esc(money(after - base)) + '</b>.', ' Aap ' + esc(money(base)) + ' ki payment kar chuke hain, baqi <b>' + esc(money(after - base)) + '</b> bhej dein.');
      else if (after < base) money2 = R(' The extra <b>' + esc(money(base - after)) + '</b> will be refunded to you.', ' Zyada <b>' + esc(money(base - after)) + '</b> aap ko wapas kar diye jayenge.');
    } else if (o.odd) money2 = R(' Please pay <b>' + esc(money(o.odd)) + '</b> instead.', ' Ab <b>' + esc(money(o.odd)) + '</b> bhejein.');
    if (by === 'shop') bot(esc(B.name) + R(' updated your order #', ' ne aap ka order #') + esc(o.no) + R(': ', ' update kiya: ') + diffTxt + '. ' + R('New total ', 'Naya total ') + '<b>' + esc(money(after)) + '</b>.' + money2, { receipt: o });
    else bot(R('Updated ✅ Order #', 'Update ho gaya ✅ Order #') + esc(o.no) + R(' now: ', ' ab: ') + linesText(lines) + '. ' + R('New total ', 'Naya total ') + '<b>' + esc(money(after)) + '</b>' + (before !== after ? ' (' + R('was ', 'pehle ') + esc(money(before)) + ')' : '') + '.' + money2, { receipt: quiet ? null : o });
    seller(function () {
      event((by === 'shop' ? U2('You updated order #', 'Aap ne order update kiya #') : U2('Customer updated order #', 'Customer ne order update kiya #')) + esc(o.no), diffLinesUI(beforeLines, lines) + ' · ' + esc(U2('new total ', 'naya total ')) + esc(money(after)));
      bumpCard(o);
    });
  }
  function diffCore(a, b, lang) {
    var out = [], ids = {};
    a.concat(b).forEach(function (l) { ids[l.i] = 1; });
    Object.keys(ids).forEach(function (k) {
      var i = +k, qa = (a.filter(function (l) { return l.i === i; })[0] || { q: 0 }).q, qb = (b.filter(function (l) { return l.i === i; })[0] || { q: 0 }).q;
      var n = esc(B.items[i].n);
      if (qb > qa) out.push('+' + (qb - qa) + ' ' + n);
      else if (qb < qa && qb === 0) out.push((lang === 'ur' ? 'hataya: ' : 'removed ') + n);
      else if (qb < qa) out.push('−' + (qa - qb) + ' ' + n);
    });
    return out.join(', ') || (lang === 'ur' ? 'koi tabdeeli nahi' : 'no change');
  }
  function diffLines(a, b) { return diffCore(a, b, rl()); }
  function diffLinesUI(a, b) { return diffCore(a, b, uiLang); }
  function askCancel() {
    if (B.flow === 'appt') return ACTIONS.cancelAppt();
    if (S.cart.length && !S.order) {
      return bot(R('Clear your cart?', 'Cart khaali kar doon?'), { choices: [{ label: R('Yes', 'Haan'), yes: true, go: function () { S.cart = []; S.stage = null; bot(R('Done, your cart is empty. Anything else?', 'Ho gaya, cart khaali hai. Aur kuch?')); } }, { label: R('No', 'Nahi'), no: true, go: function () { bot(R('Okay, your cart is still there.', 'Theek hai, cart wese hi hai.')); } }] });
    }
    var o = S.order;
    if (!o) return noOrder();
    if (!editable(o)) return lockedMsg(o);
    bot(R('Cancel order #' + esc(o.no) + ' (' + esc(money(orderTotal(o))) + ')?', 'Order #' + esc(o.no) + ' (' + esc(money(orderTotal(o))) + ') cancel kar doon?'), {
      choices: [{ label: R('Yes, cancel it', 'Haan, cancel karein'), yes: true, go: function () {
        o.status = 'cancelled'; S.order = null;
        bot(R('Order #' + esc(o.no) + ' is cancelled.', 'Order #' + esc(o.no) + ' cancel ho gaya.') + (o.paidAmt ? R(' Your refund of ' + esc(money(o.paidAmt)) + ' will be sent by the shop.', ' Aap ka refund ' + esc(money(o.paidAmt)) + ' shop bhej degi.') : '') + R(' Anything else?', ' Aur kuch?'));
        seller(function () { event(U2('Customer cancelled order #', 'Customer ne order cancel kiya #') + esc(o.no), esc(money(orderTotal(o))), 'warn'); bumpCard(o); });
      } }, { label: R('No, keep it', 'Nahi, rehne dein'), no: true, go: function () { bot(R('Great, order #' + esc(o.no) + ' stays as it is.', 'Theek hai, order #' + esc(o.no) + ' qaim hai.')); } }]
    });
  }
  function changePay() {
    var o = S.order;
    if (!o) return bot(R('You can choose how to pay when you confirm your order. We accept: ', 'Order confirm karte waqt payment ka tareeqa chun sakte hain. Hum lete hain: ') + payList() + '.');
    if (!editable(o) || o.paidAmt) return lockedMsg(o);
    bot(R('Sure. How would you like to pay for #' + esc(o.no) + '?', 'Ji. #' + esc(o.no) + ' ki payment kaise karenge?'), {
      choices: B.pays.filter(function (k) { return k !== o.pay; }).map(function (k) {
        return { label: PAYS[k][rl()], go: function () {
          var old = o.pay; o.pay = k; o.shot = false;
          o.odd = PAYS[k].online ? Math.round((orderTotal(o) - rnd(0.13, 0.87)) * 100) / 100 : 0;
          bot(R('Done ✅ Payment for #' + esc(o.no) + ' is now ' + esc(PAYS[k].en) + '.', 'Ho gaya ✅ #' + esc(o.no) + ' ki payment ab ' + esc(PAYS[k].ur) + ' se hogi.') +
            (PAYS[k].online ? R(' Please send exactly <b>' + esc(money(o.odd)) + '</b> to ' + esc(acc(k)) + ' and share the screenshot.', ' Bilkul <b>' + esc(money(o.odd)) + '</b> ' + esc(acc(k)) + ' par bhej kar screenshot bhej dein.') : ''),
            PAYS[k].online ? { choices: [{ label: R('Send screenshot (demo)', 'Screenshot bhejein (demo)'), primary: true, say: false, go: sendShot }] } : null);
          seller(function () { event(U2('Payment method changed · #', 'Payment ka tareeqa badla · #') + esc(o.no), esc(PAYS[old][uiLang]) + ' → ' + esc(PAYS[k][uiLang])); bumpCard(o); });
        } };
      })
    });
  }
  function track() {
    if (B.flow === 'appt') { var a = S.appt; return a ? bot(R('Your appointment #' + esc(a.no) + ' is ' + esc(statusLabel(a.status).toLowerCase()) + ': ' + esc(B.items[a.i].n) + ', ' + esc(a.slot) + '.', 'Aap ki appointment #' + esc(a.no) + ': ' + esc(B.items[a.i].n) + ', ' + esc(a.slot) + ' (' + esc(statusLabel(a.status)) + ').')) : ACTIONS.resched(); }
    var o = S.order || S.orders[S.orders.length - 1];
    if (!o) return noOrder();
    var M = {
      booked: R('is booked and being prepared', 'book hai aur tayyar ho raha hai'), paid: R('is paid and being prepared', 'ki payment ho gayi, tayyar ho raha hai'),
      dispatched: R('is on the way with the rider', 'rider ke paas hai, raste mein'), delivered: R('was delivered', 'deliver ho chuka hai'), cancelled: R('was cancelled', 'cancel ho chuka hai')
    };
    bot(R('Order #', 'Order #') + esc(o.no) + ' ' + M[o.status] + '.' + (o.status === 'booked' || o.status === 'paid' ? ' ' + R('Expected delivery: ', 'Andaazan delivery: ') + esc(B.eta ? B.eta[rl()] : '') + '.' : ''));
  }
  function handoff(text) {
    S.stage = null;
    bot(R('Sure — I’ve asked the ' + esc(B.name) + ' team to reply here. They usually answer within a few minutes.', 'Ji zaroor — ' + esc(B.name) + ' ki team ko bata diya hai, woh yahin jawab denge. Aam taur par chand minute lagte hain.'));
    seller(function () {
      var c = el('div', 'oc hand', '<div class="oc-top"><b>' + esc(U2('Customer wants to talk to you', 'Customer aap se baat karna chahta hai')) + '</b><em class="st st-check">' + esc(U2('Reply', 'Jawab')) + '</em></div>' +
        (text ? '<p class="oc-quote">“' + esc(text) + '”</p>' : '') + '<p class="oc-note">' + esc(U2('Type below — your message goes straight to the customer.', 'Neeche likhein — aap ka message seedha customer ko jayega.')) + '</p>');
      c.appendChild(sellerButtons({ main: [{ label: U2('Reply', 'Jawab dein'), pri: true, go: focusReply }, { label: U2('Solved', 'Hal ho gaya'), go: function () { c.classList.add('done'); $$('button', c).forEach(function (b) { b.disabled = true; }); } }], more: [] }));
      appendS(c);
    });
  }
  function complaint(text) {
    S.stage = null;
    var t = { no: 'C' + (S.tickets.length + 1), text: text, solved: false };
    S.tickets.push(t);
    bot(R('I’m really sorry about this. I’ve logged it as complaint <b>' + t.no + '</b> and the team will reply within 24 hours.', 'Is ke liye maazrat. Main ne isay shikayat <b>' + t.no + '</b> ke taur par darj kar liya hai, team 24 ghante mein jawab degi.'));
    seller(function () {
      var c = el('div', 'oc comp', '<div class="oc-top"><b>' + esc(U2('Complaint ', 'Shikayat ')) + t.no + (S.order ? ' · #' + esc(S.order.no) : '') + '</b><em class="st st-warn">' + esc(U2('Open', 'Khuli')) + '</em></div><p class="oc-quote">“' + esc(text) + '”</p>');
      c.appendChild(sellerButtons({ main: [{ label: U2('Reply', 'Jawab dein'), pri: true, go: focusReply }, { label: U2('Solved', 'Hal ho gaya'), go: function () {
        t.solved = true; c.classList.add('done'); $$('button', c).forEach(function (b) { b.disabled = true; }); stats();
        bot(R('Your complaint ' + t.no + ' has been resolved. Thank you for your patience!', 'Aap ki shikayat ' + t.no + ' hal ho gayi. Sabr ka shukriya!'));
      } }], more: [] }));
      appendS(c);
    });
  }
  function priceReply(idx) {
    var lines = idx.map(function (i) { return esc(B.items[i].n) + ': <b>' + esc(money(B.items[i].p)) + '</b>'; }).join('<br>');
    if (B.flow === 'order') bot(lines + '<br>' + R('Shall I add it?', 'Add kar doon?'), { cards: idx, cardBtn: 'add' });
    else if (B.flow === 'appt') bot(lines + '<br>' + R('Want to book a time?', 'Time book karein?'), { cards: idx, cardBtn: 'book' });
    else bot(lines + '<br>' + R('Would you like to book a campus visit?', 'School visit book karein?'), { choices: [{ label: R('Book a visit', 'Visit book karein'), primary: true, yes: true, go: startVisit }] });
  }

  /* ----- appointments (clinic, salon) ----- */
  function slots() {
    var now = new Date(), out = [];
    var d = function (n) { var x = new Date(now); x.setDate(x.getDate() + n); return x; };
    var day = function (n) {
      if (n === 0) return R('Today', 'Aaj');
      if (n === 1) return R('Tomorrow', 'Kal');
      return d(n).toLocaleDateString('en-US', { weekday: 'short' });
    };
    if (now.getHours() < 16) out.push(day(0) + ' 6:00 PM');
    out.push(day(1) + ' 11:00 AM', day(1) + ' 4:30 PM', day(2) + ' 12:00 PM');
    return out.slice(0, 4);
  }
  function pickService(i) {
    if (B.flow === 'school') return startVisit();
    S.pendingSvc = i;
    askSlot('new');
  }
  function askSlot(mode) {
    var it = B.items[mode === 'resched' ? S.appt.i : S.pendingSvc];
    bot(mode === 'resched' ? R('Sure, pick a new time for #' + esc(S.appt.no) + ':', 'Ji, #' + esc(S.appt.no) + ' ke liye naya time chunein:')
      : R('Great choice: ' + esc(it.n) + ' (' + esc(money(it.p)) + '). Which time suits you?', 'Behtareen: ' + esc(it.n) + ' (' + esc(money(it.p)) + '). Kaun sa time theek rahega?'),
    { choices: slots().map(function (s) { return { label: s, go: function () { mode === 'resched' ? moveAppt(s, 'customer') : gotSlot(s); } }; }).concat([{ label: R('Another time', 'Koi aur time'), go: function () { handoff(R('Asked for another time', 'Doosra time chahiye')); } }]) });
  }
  function gotSlot(s) {
    S.pendingSlot = s;
    if (S.cust.name) return bookAppt();
    S.stage = 'apptName';
    bot(B.who === 'patient' ? R('Please share the patient’s name.', 'Mareez ka naam bata dein.') : R('May I have your name?', 'Aap ka naam?'));
  }
  function bookAppt() {
    S.stage = null;
    var a = { no: B.ini + '-' + pad4(S.aseq++), i: S.pendingSvc, slot: S.pendingSlot, name: S.cust.name, status: 'booked' };
    S.appt = a; S.appts.push(a);
    bot(R('Booked ✅ <b>#' + esc(a.no) + '</b>: ' + esc(B.items[a.i].n) + ', <b>' + esc(a.slot) + '</b>, for ' + esc(a.name) + '. Fee ' + esc(money(B.items[a.i].p)) + ' (pay at the ' + (B.cat === 'clinic' ? 'clinic' : 'salon') + '). Please arrive 10 minutes early. You’ll get a reminder.',
      'Book ho gaya ✅ <b>#' + esc(a.no) + '</b>: ' + esc(B.items[a.i].n) + ', <b>' + esc(a.slot) + '</b>, ' + esc(a.name) + ' ke liye. Fee ' + esc(money(B.items[a.i].p)) + ' (' + (B.cat === 'clinic' ? 'clinic' : 'salon') + ' par). 10 minute pehle aa jayein. Aap ko reminder bhi milega.'));
    seller(function () { apptCard(a); });
  }
  function apptCard(a) {
    var c = a.card || el('div', 'oc appt');
    a.card = c;
    var it = B.items[a.i];
    c.innerHTML = '<div class="oc-top"><b>' + esc(U2('New appointment', 'Nayi appointment')) + ' #' + esc(a.no) + '</b><em class="st st-' + a.status + '">' + esc(statusLabelUI(a.status)) + '</em></div>' +
      '<ul class="oc-lines"><li>' + tile(it.a, 'xs') + '<span>' + esc(it.n) + '</span><b>' + esc(money(it.p)) + '</b></li></ul>' +
      '<div class="oc-meta"><span>' + esc(a.slot) + '</span><span>' + esc(a.name) + (S.cust.phone ? ' · ' + esc(S.cust.phone) : '') + '</span></div>';
    var A = {
      confirm: { label: U2('Confirm', 'Confirm'), pri: true, go: function () { a.status = 'confirmed'; apptCard(a); bot(R('Your appointment #' + esc(a.no) + ' is confirmed ✅ See you ' + esc(a.slot) + '.', 'Aap ki appointment #' + esc(a.no) + ' confirm ho gayi ✅ ' + esc(a.slot) + ' milte hain.')); } },
      move: { label: U2('Change time', 'Time badlein'), go: function () { var s = slots()[2]; moveAppt(s, 'shop'); } },
      cancel: { label: U2('Cancel', 'Cancel'), warn: true, go: function () { cancelAppt('shop'); } },
      arrived: { label: U2('Arrived', 'Aa gaye'), pri: true, go: function () { a.status = 'arrived'; apptCard(a); } },
      noshow: { label: U2('No-show', 'Nahi aaye'), go: function () { a.status = 'noshow'; apptCard(a); } },
      msg: { label: U2('Message', 'Message'), go: focusReply }
    };
    var spec = a.status === 'booked' ? { main: [A.confirm, A.cancel], more: [A.move, A.msg, A.arrived, A.noshow] }
      : a.status === 'confirmed' ? { main: [A.arrived, A.move], more: [A.cancel, A.msg, A.noshow] } : { main: [A.msg], more: [] };
    c.appendChild(sellerButtons(spec));
    appendS(c);
  }
  function moveAppt(s, by) {
    var a = S.appt; if (!a) return;
    a.slot = s; a.status = 'booked';
    bot(by === 'shop' ? esc(B.name) + R(' moved your appointment #' + esc(a.no) + ' to <b>' + esc(s) + '</b>. Reply if that doesn’t work for you.', ' ne aap ki appointment #' + esc(a.no) + ' <b>' + esc(s) + '</b> par shift ki. Agar yeh time theek nahi to bata dein.')
      : R('Moved ✅ #' + esc(a.no) + ' is now <b>' + esc(s) + '</b>.', 'Shift ho gayi ✅ #' + esc(a.no) + ' ab <b>' + esc(s) + '</b> hai.'));
    seller(function () { event((by === 'shop' ? U2('You moved #', 'Aap ne shift ki #') : U2('Customer changed time · #', 'Customer ne time badla · #')) + esc(a.no), esc(s)); apptCard(a); });
  }
  function cancelAppt(by) {
    var a = S.appt; if (!a) return;
    a.status = 'cancelled';
    bot(by === 'shop' ? R('Sorry, ' + esc(B.name) + ' had to cancel appointment #' + esc(a.no) + '. Reply here to pick another time.', 'Maazrat, ' + esc(B.name) + ' ko appointment #' + esc(a.no) + ' cancel karni pari. Naya time chunne ke liye yahan likhein.')
      : R('Appointment #' + esc(a.no) + ' is cancelled. Hope to see you soon!', 'Appointment #' + esc(a.no) + ' cancel ho gayi. Phir milenge!'));
    seller(function () { if (by !== 'shop') event(U2('Customer cancelled #', 'Customer ne cancel ki #') + esc(a.no), esc(a.slot), 'warn'); apptCard(a); });
  }

  /* ----- school visits ----- */
  function startVisit() {
    bot(R('Happy to show you around! Which time suits you for a campus visit?', 'Zaroor tashreef layein! School visit ke liye kaun sa time theek rahega?'),
      { choices: slots().map(function (s) { return { label: s, go: function () { S.pendingSlot = s; S.stage = 'visitName'; bot(R('Please send the parent’s name and the class you’re applying for (e.g. “Sara Khan, Class 2”).', 'Walid/walida ka naam aur jis class mein admission chahiye woh bata dein (jaise “Sara Khan, Class 2”).')); } }; }) });
  }
  function bookVisit(text) {
    S.stage = null;
    var parts = text.split(/\s*[,\n]\s*/);
    var v = { no: B.ini + '-' + pad4(S.vseq++), slot: S.pendingSlot, parent: parts[0].slice(0, 40), cls: (parts.slice(1).join(', ') || R('not given', 'nahi bataya')).slice(0, 40), status: 'booked' };
    S.visit = v; S.visits.push(v); S.cust.name = v.parent;
    bot(R('Visit booked ✅ <b>#' + esc(v.no) + '</b>: <b>' + esc(v.slot) + '</b>. Please bring the child’s last school report and ' + (B.cur === 'Rs' ? 'B-form' : 'birth certificate') + '. The coordinator will meet you at the front office.',
      'Visit book ho gaya ✅ <b>#' + esc(v.no) + '</b>: <b>' + esc(v.slot) + '</b>. Bachay ka pichla result card aur B-form saath layein. Coordinator front office par milenge.'));
    seller(function () {
      var c = el('div', 'oc appt', '<div class="oc-top"><b>' + esc(U2('New admission inquiry', 'Naya admission inquiry')) + ' #' + esc(v.no) + '</b><em class="st st-booked">' + esc(U2('Visit', 'Visit')) + '</em></div>' +
        '<div class="oc-meta"><span>' + esc(U2('Campus visit: ', 'School visit: ')) + esc(v.slot) + '</span><span>' + esc(U2('Parent: ', 'Walidain: ')) + esc(v.parent) + '</span><span>' + esc(U2('Class: ', 'Class: ')) + esc(v.cls) + '</span></div>');
      c.appendChild(sellerButtons({ main: [{ label: U2('Confirm visit', 'Visit confirm'), pri: true, go: function (b) { b.disabled = true; v.status = 'confirmed'; bot(R('Your campus visit #' + esc(v.no) + ' is confirmed ✅ See you ' + esc(v.slot) + '.', 'Aap ka school visit #' + esc(v.no) + ' confirm ho gaya ✅ ' + esc(v.slot) + ' milte hain.')); } },
        { label: U2('Message', 'Message'), go: focusReply }], more: [] }));
      appendS(c);
    });
  }

  /* ================================================================
     10. The main rule: read the customer's message and answer
     ================================================================ */
  function handle(raw) {
    var t = norm(raw);
    // language of the reply follows the customer
    if (/[؀-ۿ]/.test(raw)) {
      S.rl = 'ur';
      if (!S.scriptNote) { S.scriptNote = true; noteC(esc(R('Demo note: this demo replies in English or Roman Urdu. The real assistant also replies in Urdu script, Arabic and more.', 'Demo note: yeh demo English ya Roman Urdu mein jawab deta hai. Asal assistant Urdu script, Arabic aur doosri zubaanon mein bhi jawab deta hai.'))); }
    } else { var dl = detectLang(t); if (dl) S.rl = dl; }

    // 1. answers to a question the bot just asked
    if (S.stage === 'details' && !has(t, 'cancel') && !has(t, 'menu') && !has(t, 'staff') && !(findItems(t).items.length && has(t, 'want'))) return takeDetails(raw);
    if (S.stage === 'phone') {
      var ph = raw.replace(/[^\d+]/g, '');
      if (ph.length >= 7) { S.cust.phone = ph.slice(0, 15); return askPay(); }
      return bot(R('Please send a phone number with digits, e.g. 0300 1234567.', 'Number digits mein bhej dein, jaise 0300 1234567.'));
    }
    if (S.stage === 'addr' && S.order) {
      S.stage = null; S.order.addr = raw.trim().slice(0, 90); S.cust.addr = S.order.addr;
      var o = S.order;
      bot(R('Updated ✅ Order #' + esc(o.no) + ' will go to: ' + esc(o.addr) + '.', 'Update ho gaya ✅ Order #' + esc(o.no) + ' ab is address par jayega: ' + esc(o.addr) + '.'));
      return seller(function () { event(U2('New address · #', 'Naya address · #') + esc(o.no), esc(o.addr)); bumpCard(o); });
    }
    if (S.stage === 'pay') {
      var PX = { jazzcash: /jazz/, easypaisa: /easy ?paisa/, bank: /bank|transfer/, card: /card/, cod: /\bcod\b|cash on delivery|delivery par|\bcash\b/, cash: /\bcash\b|counter/ };
      var pk = ['jazzcash', 'easypaisa', 'bank', 'card', 'cod', 'cash'].filter(function (k) { return B.pays.indexOf(k) >= 0 && PX[k].test(t); })[0];
      if (pk) { $$('.choices:not(.used) button', cLog).forEach(function (b) { b.disabled = true; }); return book(pk); }
    }
    if (S.stage === 'apptName') { S.cust.name = raw.trim().slice(0, 40); return bookAppt(); }
    if (S.stage === 'visitName') return bookVisit(raw.trim());
    if (S.stage === 'complaint') return complaint(raw.trim().slice(0, 200));

    var f = findItems(t), items = f.items;
    // name + address typed right after choosing items: take it as the delivery details
    if (B.flow === 'order' && S.cart.length && !S.stage && !items.length && looksLikeAddress(raw) && /[,\n]/.test(raw)) { S.stage = 'details'; return takeDetails(raw); }
    var py = S.pendingYes, pn = S.pendingNo; S.pendingYes = S.pendingNo = null;
    if (py && has(t, 'yes') && !items.length) return py();
    if (pn && has(t, 'no') && !items.length) return pn();

    // 2. the big intents
    if (has(t, 'whoami')) {
      var can = B.flow === 'order' ? R('the ' + menuWord() + ' and orders', menuWord() + ' aur orders') : B.flow === 'appt' ? R('services and appointments', 'services aur appointments') : R('fees, admissions and visits', 'fees, admission aur visits');
      return bot(R('I’m ' + esc(B.name) + '’s AI assistant 🤖 I help with ' + can + ', and I can connect you to the team any time.', 'Main ' + esc(B.name) + ' ka AI assistant hun 🤖 ' + can + ' mein madad karta hun, aur jab chahein team se baat karwa sakta hun.'));
    }
    if (has(t, 'staff')) return handoff(raw.trim().slice(0, 140));
    if (has(t, 'complaint') && !items.length && !has(t, 'price')) return complaint(raw.trim().slice(0, 200));
    if (B.flow === 'appt' && (has(t, 'resched') || (has(t, 'edit') && /time|appointment|slot|waqt|date|day|din/.test(t)))) return ACTIONS.resched();
    if (has(t, 'cancel')) return B.flow === 'appt' ? ACTIONS.cancelAppt() : askCancel();
    if (B.flow === 'order' && has(t, 'shot') && S.order && PAYS[S.order.pay].online) return sendShot();
    if (B.flow === 'order' && has(t, 'shot') && S.order && editable(S.order)) {
      return bot(R('Order #' + esc(S.order.no) + ' is ' + esc(PAYS[S.order.pay].en.toLowerCase()) + ', so there’s nothing to pay online. Want to pay online instead?', 'Order #' + esc(S.order.no) + ' ' + esc(PAYS[S.order.pay].ur) + ' hai, is liye online payment ki zaroorat nahi. Online pay karna hai?'),
        { choices: [{ label: R('Change payment', 'Payment badlein'), go: changePay }] });
    }
    if (B.flow === 'order' && (has(t, 'edit') || has(t, 'remove')) && !items.length) return has(t, 'payment') ? changePay() : /address|addr|pata/.test(t) ? ACTIONS.addr() : openEdit();
    if (B.flow === 'order' && has(t, 'remove') && items.length) {
      var target = S.cart.length ? S.cart : (S.order && editable(S.order) ? S.order.lines : null);
      if (!target) return noOrder();
      var work = target.map(function (l) { return { i: l.i, q: l.q }; });
      items.forEach(function (x) { work.forEach(function (l) { if (l.i === x.i) l.q = x.explicit ? Math.max(0, l.q - x.q) : 0; }); });
      if (S.cart.length) S.cartEdit = true;
      return saveEdit(work, 'customer');
    }

    if (B.flow === 'school' && !has(t, 'price')) {
      if (has(t, 'admission')) return ACTIONS.admission();
      if (has(t, 'van')) return ACTIONS.van();
      if (has(t, 'visit')) return startVisit();
    }

    // 3. products named in the message
    if (f.ambiguous && !items.length) {
      var q = f.ambiguous.q;
      return bot(R('Which one do you mean?', 'Kaun sa chahiye?'), { choices: f.ambiguous.list.map(function (i) { return { label: B.items[i].n, go: function () { has(t, 'price') ? priceReply([i]) : addItems([{ i: i, q: q }]); } }; }) });
    }
    if (items.length) {
      if (has(t, 'price') && !has(t, 'want')) return priceReply(items.map(function (x) { return x.i; }));
      if (B.flow === 'order') {
        var wants = has(t, 'want') || has(t, 'add') || items.some(function (x) { return x.explicit; });
        if (wants) return addItems(items.map(function (x) { return { i: x.i, q: x.q }; }));
        return priceReply(items.map(function (x) { return x.i; }));
      }
      if (B.flow === 'appt') return has(t, 'price') ? priceReply([items[0].i]) : pickService(items[0].i);
      return priceReply(items.map(function (x) { return x.i; }));
    }

    // 4. everything else
    if (B.flow === 'order' && has(t, 'confirm') && S.cart.length) return confirmCart();
    if (B.flow === 'school' && has(t, 'admission')) return ACTIONS.admission();
    if (B.flow === 'school' && has(t, 'van')) return ACTIONS.van();
    if (B.flow === 'school' && has(t, 'visit')) return startVisit();
    if (B.flow === 'appt' && has(t, 'book')) return showMenu(true);
    if (has(t, 'menu') || has(t, 'price')) return showMenu();
    if (has(t, 'hours')) return ACTIONS.hours();
    if (B.flow === 'order' && has(t, 'track')) return track();
    if (has(t, 'delivery')) return deliveryInfo();
    if (has(t, 'payment')) return S.order && has(t, 'edit') ? changePay() : ACTIONS.payments();
    if (has(t, 'location')) return ACTIONS.location();
    if (B.flow === 'order' && has(t, 'want')) return ACTIONS.order();
    if (B.flow === 'order' && has(t, 'yes') && S.cart.length) return confirmCart();
    if (has(t, 'salam') || /سلام/.test(raw)) return greet(true);
    if (has(t, 'greet')) return greet(false);
    if (has(t, 'thanks') || has(t, 'yes')) return bot(R('You’re welcome! 😊 Anything else I can help with?', 'Shukriya aap ka! 😊 Aur kisi cheez mein madad karun?'));
    if (has(t, 'no')) return bot(R('Okay! I’m here if you need anything.', 'Theek hai! Kuch chahiye ho to main yahin hun.'));
    if (has(t, 'offtopic')) return bot(R('Sorry, I can only help with ' + esc(B.name) + '’s ' + menuWord() + ', bookings and orders. 🙂', 'Maazrat, main sirf ' + esc(B.name) + ' ke ' + menuWord() + ', bookings aur orders mein madad kar sakta hun. 🙂'));
    var topics = B.flow === 'order' ? R('the ' + menuWord() + ', prices or delivery', menuWord() + ', qeemat ya delivery') : B.flow === 'appt' ? R('our services, fees or booking a time', 'services, fees ya appointment') : R('fees, admissions or a campus visit', 'fees, admission ya school visit');
    bot(R('I didn’t quite get that. You can ask about ' + topics + ' — or tap “More” below for all options.', 'Main samajh nahi saka. Aap ' + topics + ' ke baare mein pooch sakte hain — ya neeche “More” dabayein.'));
  }
  function greet(salam) {
    var hello = salam ? R('Wa Alaikum Assalam!', 'Wa Alaikum Assalam!') : R('Hi!', 'Hello!');
    var mw = menuWord();
    var what = B.flow === 'order' ? R('See the ' + mw + ', ask a price or place an order — what would you like?', mw.charAt(0).toUpperCase() + mw.slice(1) + ' dekhein, qeemat poochein ya order karein — kya chahiye?')
      : B.flow === 'appt' ? R('I can share our services and fees or book an appointment for you.', 'Main services aur fees bata sakta hun ya appointment book kar sakta hun.')
      : R('I can help with fees, admissions and campus visits.', 'Fees, admission aur school visit mein madad kar sakta hun.');
    if (S.greeted) return bot(hello + ' ' + what);
    S.greeted = true;
    bot(hello + ' ' + R('Welcome to ', '') + '<b>' + esc(B.name) + '</b>' + R('. ', ' mein khush aamdeed. ') + what);
  }

  /* ================================================================
     11. Start / restart
     ================================================================ */
  function start(silent) {
    gen++; Q = Promise.resolve();
    B = readForm();
    S = { rl: uiLang, cart: [], order: null, orders: [], appt: null, appts: [], visit: null, visits: [], tickets: [], cust: {}, stage: null,
      seq: 12, aseq: 7, vseq: 4, scriptNote: false };
    cLog.innerHTML = ''; sLog.innerHTML = '';
    unseen = 0; $('#sellBadge').hidden = true; $('#cNew').hidden = true;
    $('#cAv').textContent = B.ini;
    $('#cName').textContent = B.name;
    $('#cStatus').textContent = U('phone.replies');
    $('#sSub').textContent = U('phone.for', { biz: B.name });
    noteC(esc(R('Demo chat with ', '')) + '<b>' + esc(B.name) + '</b>' + esc(R('. Type like a customer, or tap a button below.', ' ke saath demo chat. Customer ki tarah likhein, ya neeche button dabayein.')));
    sLog.appendChild(el('p', 's-empty', esc(U('phone.empty'))));
    stats();
    renderQuick();
    store.set('wx-demo', JSON.stringify({ cat: B.cat, ch: ch }));
    if (!silent) { greetFirst(); }
  }
  function greetFirst() {
    // the shop greets first, like a real business account
    S.greeted = true;
    bot(R('Hi! Welcome to ', '') + '<b>' + esc(B.name) + '</b>' + R(' 😊 How can I help you today?', ' mein khush aamdeed 😊 Bataiye, kya khidmat karun?'));
  }

  /* ================================================================
     12. UI language, tabs, events
     ================================================================ */
  function applyUI() {
    root.lang = uiLang === 'ur' ? 'ur-Latn' : 'en';
    $$('[data-t]').forEach(function (e) { e.textContent = U(e.getAttribute('data-t')); });
    $$('[data-t-aria]').forEach(function (e) { e.setAttribute('aria-label', U(e.getAttribute('data-t-aria'))); });
    $$('[data-ui-lang]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-ui-lang') === uiLang)); });
    cIn.placeholder = U('phone.type'); sIn.placeholder = U('phone.sType');
    doc.title = uiLang === 'ur' ? 'Live demo — Webxeen ka AI WhatsApp assistant apne business ke saath try karein' : 'Live demo — try Webxeen’s AI WhatsApp assistant with your business';
    var wa = CFG.links && CFG.links.demoWhatsApp;
    if (wa && wa.indexOf('{{') !== 0) $$('[data-wa]').forEach(function (a) { a.href = wa; });
    $$('[data-home]').forEach(function (a) { a.href = (uiLang === 'ur' ? '/ur' : '/') + (a.getAttribute('data-home') || ''); });
    if (B) { $('#cStatus').textContent = U('phone.replies'); $('#sSub').textContent = U('phone.for', { biz: B.name }); renderQuick(); }
  }
  $$('[data-ui-lang]').forEach(function (b) {
    b.addEventListener('click', function () {
      uiLang = b.getAttribute('data-ui-lang'); store.set('wx-lang', uiLang);
      var u = new URL(location.href); u.searchParams.set('lang', uiLang); history.replaceState(null, '', u);
      applyUI(); renderCats();
      if (draft) { var keep = readForm(); draft.items = keep.items; renderForm(); }
      if (S) S.rl = uiLang;
    });
  });
  $$('#chGroup [role=radio]').forEach(function (b) { b.addEventListener('click', function () { selectCh(b.getAttribute('data-ch')); }); });
  $('#fCur').addEventListener('change', function () {
    var cur = $('#fCur').value;
    if (!draft.touched) { var name = $('#fName').value; draft = presetDraft(draft.cat, cur); renderForm(); if (name && name !== CATS[draft.cat].name && name !== (INTL[draft.cat] || {}).name) $('#fName').value = name; }
    else draft.cur = cur;
  });
  $('#fAdd').addEventListener('click', function () {
    draft.touched = true;
    if (draft.items.length >= 8) return;
    draft.items.push({ n: '', p: '', a: null }); renderItems();
    var ins = $$('#fItems [data-f=n]'); ins[ins.length - 1].focus();
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault(); start();
    if (isMobile()) { setTab('cust'); $('#dTabs').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); }
    else cIn.focus();
  });
  $('#cReset').addEventListener('click', function () { start(); cIn.focus(); });
  $('#cForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var v = cIn.value.trim(); if (!v) return;
    cIn.value = ''; custSays(v); handle(v);
  });
  $('#sForm').addEventListener('submit', function (e) {
    e.preventDefault();
    var v = sIn.value.trim(); if (!v) return;
    sIn.value = '';
    appendS(el('div', 'ev me', '<b>' + esc(U('phone.you')) + '</b><span>' + esc(v) + '</span><time>' + stamp() + '</time>'));
    later(function () { appendC(botMsg(esc(v), { staff: true })); }, 200);
  });
  $('#cNew').addEventListener('click', function () { toEnd(cLog, true); });
  cLog.addEventListener('scroll', function () { if (nearEnd(cLog)) $('#cNew').hidden = true; }, { passive: true });

  var activeTab = 'cust';
  function isMobile() { return matchMedia('(max-width: 1099px)').matches; }
  function setTab(t) {
    activeTab = t;
    $('#dGrid').setAttribute('data-tab', t);
    $$('#dTabs [role=tab]').forEach(function (b) { var on = b.getAttribute('data-tab') === t; b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1; });
    if (t === 'sell') { unseen = 0; $('#sellBadge').hidden = true; sLog.scrollTop = sLog.scrollHeight; }
    else toEnd(cLog, true);
  }
  $$('#dTabs [role=tab]').forEach(function (b) {
    b.addEventListener('click', function () { setTab(b.getAttribute('data-tab')); });
    b.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); var o = $('#dTabs [aria-selected=false]'); o.focus(); o.click(); } });
  });

  /* ---------- go ---------- */
  root.classList.add('js');
  applyUI();
  renderCats();
  selectCh(ch);
  draft = presetDraft(cat);
  renderForm();
  setTab('cust');
  if (!isMobile()) $('#dDet').open = true;
  start();
})();
