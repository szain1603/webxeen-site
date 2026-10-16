/* =====================================================================
   WEBXEEN WEBSITE TEXT — every word on the page lives in this file.
   "en" = English, "ur" = Roman Urdu, "ar" = Arabic. Edit the text between the quotes.
   Keep the same keys in both languages. {trial}, {usdFrom}, {year},
   {extra}, {yearly} are filled in automatically from config.js.
   "ar" = Arabic (right-to-left, page /ar). To add a language: copy the "en"
   block, translate it for that market, and add it to PAGES in prerender.js.
   ===================================================================== */
window.WEBXEEN_CONTENT = {

  en: {
    services: {
      eyebrow: 'Two ways we help you sell',
      title: 'What do you need?',
      bot: { tag: 'WhatsApp Bot', title: 'An AI assistant on your WhatsApp', text: 'Answers customers in their language, takes orders and checks payments — day and night.', cta: 'See how the bot works' },
      web: { tag: '3D Websites', title: 'A website that moves as you scroll', text: 'Your product turns and explains itself in 3D, with an order button that goes to WhatsApp.', cta: 'See the website service', sample: 'Open the live 3D sample' }
    },
    meta: {
      lang: 'en', dir: 'ltr', switchLabel: 'English',
      title: 'Webxeen — AI WhatsApp sales assistant for your shop',
      description: 'Webxeen answers your customers on WhatsApp 24/7 in 8 languages, takes orders with receipts, checks payment screenshots and lets you run everything with one tap.'
    },
    nav: { how: 'How it works', features: 'Features', pricing: 'Pricing', faq: 'FAQ', demo: 'Live demo', cta: 'Try live demo', menu: 'Menu', lang: 'Language', websites: '3D Websites', bot: 'WhatsApp Bot' },
    hero: {
      badge: 'AI sales assistant for WhatsApp',
      title: 'Your shop’s WhatsApp, answering and taking orders <em>24/7.</em>',
      sub: 'Webxeen replies to your customers in their own language — English, Arabic, Spanish, Urdu and more — and books orders automatically, even while you sleep.',
      cta1: 'Try the live demo', cta2: 'Free test on WhatsApp',
      note: 'No sign-up · 8 languages · Free test before you buy',
      artLabel: 'Example: a customer orders food on WhatsApp, the assistant books it, and the shop owner gets the order with one-tap buttons.'
    },
    heroChat: {
      shop: 'Grill House', ini: 'GH', status: 'replies instantly', you: 'Customer',
      c1: 'Hi! Can I see the menu? Do you deliver downtown?',
      b1: 'Hi! Yes, downtown delivery is $3. Today’s favourites:',
      p1: 'Chicken Kebab', p2: 'Classic Burger', p3: 'Margherita Pizza', pr1: '$12', pr2: '$9', pr3: '$14', a1: 'kabab', a2: 'burger', a3: 'pizza',
      c2: '1 kebab plate and 2 burgers please',
      b2: '1 x Chicken Kebab $12 + 2 x Classic Burger $18 + delivery $3 = <b>$33</b>. Shall I confirm?',
      q1: 'Confirm', q2: 'Edit order', q3: 'More',
      b3: 'Done! Order <b>#GH-0012</b> is booked. Cash on delivery.',
      b4: 'Your order #GH-0012 is on the way.',
      seller: 'You · shop owner', newOrder: 'New order #GH-0012', lines: '1 x Chicken Kebab<br>2 x Classic Burger · Downtown', total: '$33 · Cash on delivery',
      paid: 'Paid', disp: 'Dispatched', more: 'More', told: 'Customer told automatically', wait: 'Waiting for new orders…'
    },
    demoStrip: {
      eyebrow: 'Live demo',
      title: 'Try it with your own business — in 2 minutes.',
      text: 'Pick your business type, add your products and chat with your own assistant. You type as the customer on one phone and watch the shop owner’s phone on the other.',
      cta: 'Open the live demo', note: 'No sign-up. Nothing is sent to real WhatsApp.',
      cats: { restaurant: 'Restaurant', seller: 'Online seller', clinic: 'Clinic', school: 'School', salon: 'Salon', bakery: 'Bakery', grocery: 'Grocery', electronics: 'Electronics' }
    },
    facts: [
      { num: 8, label: 'languages it replies in' },
      { text: '24/7', label: 'replies, day and night' },
      { num: 1, label: 'tap to confirm a payment' },
      { num: 8, suffix: ' AM', label: 'your morning list arrives' }
    ],
    problem: {
      eyebrow: 'Sound familiar?',
      title: 'Selling on WhatsApp shouldn’t keep you up at night.',
      items: [
        { icon: 'bubbles', title: '“Price?” at midnight', text: 'The same question arrives again and again, at every hour. Replying to each one takes your whole day — and night.' },
        { icon: 'missed', title: 'Missed orders', text: 'A late reply is often a lost customer. They simply buy from the next shop.' },
        { icon: 'fake', title: 'Fake payment screenshots', text: 'Edited or reused screenshots are hard to spot when you are busy.' }
      ]
    },
    how: {
      eyebrow: 'How it works',
      title: 'Three steps. Zero extra work.',
      steps: [
        { title: 'Customer sends a message', text: 'Any time, in any of 8 languages: “I need 2 shirts”, <bdi lang="ar">“أريد قميصين”</bdi> or “2 kurtay chahiye”.' },
        { title: 'AI answers and books the order', text: 'Using only your products, prices and delivery rules. It collects name, address and payment, then sends a receipt with an order number.' },
        { title: 'You tap one button', text: 'Paid, Dispatched or Cancel — right inside WhatsApp. Your customer is told automatically.' }
      ],
      demo: {
        cust: 'I need 2 shirts',
        bot: 'Sure! The blue linen shirt is $26 each. 2 shirts = $52. Shall I book the order?',
        receipt: 'Order confirmed · #ALI-0012 · $52',
        seller: 'New order #12 · $52',
        told: 'Customer told ✓'
      }
    },
    features: [
      {
        id: 'b', eyebrow: 'Languages', title: 'Speaks your customer’s language.',
        text: 'Urdu, Roman Urdu, English, Arabic, Farsi, Spanish, Hindi and Italian. The AI replies in the language the customer writes in — and politely keeps the chat about your shop.',
        bullets: ['Answers only from your own price list — never invents prices', 'Politely refuses off-topic questions', 'Remembers returning customers and their past orders'],
        videoLabel: 'Animation: the question “What’s the price?” and its answer shown in 8 languages.'
      },
      {
        id: 'c', eyebrow: 'Orders', title: 'Orders with receipts and order numbers.',
        text: 'Product, quantity, name, address and payment method — collected in the chat, confirmed, and sent back as a clean receipt like #ALI-0012.',
        bullets: ['Customer can switch payment method after booking (e.g. cash on delivery to bank transfer or a mobile wallet)', 'Customer can cancel before dispatch', 'Online payments use a slightly odd amount like 5,199.72 instead of 5,200, so you spot each payment instantly — never more than the total'],
        videoLabel: 'Animation: items go into a cart, order details are filled in and a receipt with an order number prints.'
      },
      {
        id: 'd', eyebrow: 'Payment check', title: 'Checks payment screenshots for you.',
        text: 'The AI reads the amount, transaction ID, date and receiver. It rejects photos that are not receipts and warns you when something looks wrong:',
        bullets: ['Amount is lower than due', 'Money went to a different account', 'Screenshot looks edited', 'Same screenshot or transaction ID was used for another order'],
        note: 'No AI can catch every fake. Always confirm the payment in your own bank or mobile-wallet app before you dispatch.',
        videoLabel: 'Animation: a sample payment screenshot is scanned. First it looks OK, then a second one shows a lower amount warning.'
      },
      {
        id: 'e', eyebrow: 'Seller control', title: 'Run everything from WhatsApp.',
        text: 'Every new order and payment screenshot arrives with tap buttons: Paid, Not paid, Dispatched, Cancel. Or type a short command:',
        commands: ['paid 21', 'dispatched 18-24', 'cancel 18 out of stock', 'refunded 18', 'returned 18', 'undo 18', 'pending', 'solved C3'],
        note: 'Every action asks a quick Yes/No first — then your customer is told automatically. No app needed.',
        videoLabel: 'Animation: the seller taps Paid and the customer instantly gets a confirmation. Then the command “dispatched 18-24” marks 7 orders as dispatched.'
      },
      {
        id: 'f', eyebrow: 'Morning list', title: 'Sleep well. Your list is ready at 8 AM.',
        text: 'Quiet hours keep your phone silent from 11 PM to 8 AM. In the morning you get one list:',
        bullets: ['Payments to check', 'Parcels to send', 'Refunds due', 'Complaints, numbered C1, C2…'],
        videoLabel: 'Animation: night turns to morning and a morning summary list appears.'
      }
    ],
    grid: {
      eyebrow: 'Also included',
      title: 'Lots of small things that save big time.',
      items: [
        { icon: 'memory', title: 'Long memory', text: 'Remembers returning customers and their past orders. “When did I last order?” — answered.' },
        { icon: 'undo', title: 'Cancel, refund, return', text: 'One line each: cancel 18, refunded 18, returned 18 — or undo 18 if you change your mind.' },
        { icon: 'shield', title: 'COD protection', text: 'After 2 returned COD parcels, that customer must pay in advance.' },
        { icon: 'flag', title: 'Complaints with numbers', text: 'Complaints reach your team as C1, C2… and the customer gets a 24-hour reply promise.' },
        { icon: 'clock', title: 'Reminders and auto-cancel', text: 'Unpaid online orders get a reminder after 24 hours and cancel automatically after 72 hours.' },
        { icon: 'globe', title: 'Your currency, your time zone', text: 'Each business has its own currency and time zone — selling in the Gulf or Europe works too.' }
      ]
    },
    channels: {
      eyebrow: 'One AI, every inbox',
      title: 'WhatsApp today. Instagram and Messenger next.',
      text: 'The same assistant, the same products and the same order flow — on every app your customers use to message you.',
      live: 'Live now', soon: 'Coming soon',
      wa: 'WhatsApp', ig: 'Instagram DMs', fb: 'Facebook Messenger',
      chats: {
        wa: [{ w: 'in', t: 'Hi, is this dress available?' }, { w: 'out', t: 'Yes! Sizes M and L — $45.' }, { w: 'in', t: 'M please. Can I pay on delivery?' }, { w: 'out', t: 'Sure. Please send your name and address 😊' }, { w: 'in', t: 'Sarah, 12 Park Road' }, { w: 'out', t: 'Order #ALI-0031 is booked ✅' }],
        ig: [{ w: 'in', t: 'Price?' }, { w: 'out', t: '$25 — free delivery 🚚' }, { w: 'in', t: 'Do you have it in black?' }, { w: 'out', t: 'Yes, black and maroon. Shall I place the order?' }, { w: 'in', t: 'Yes please! 2 pieces' }, { w: 'out', t: 'Done ✅ Total $50. Receipt sent.' }],
        fb: [{ w: 'in', t: 'Can it arrive by tomorrow?' }, { w: 'out', t: 'Delivery takes 1–2 days in the city.' }, { w: 'in', t: 'Can I pay by card?' }, { w: 'out', t: 'Yes, we send the exact amount right after your order.' }, { w: 'in', t: 'Sent the payment screenshot' }, { w: 'out', t: 'Payment received, thank you! 🙌' }]
      }
    },
    soon: {
      title: 'Coming soon', badge: 'Coming soon',
      items: [
        { title: 'Comment-to-DM', text: 'Auto reply to “Price?” comments by DM' },
        { title: 'TikTok', text: 'Links to your WhatsApp for now' },
        { title: 'Seller dashboard', text: 'Manage everything online' }
      ]
    },
    pricing: {
      eyebrow: 'Pricing', title: 'Simple monthly plans.', sub: 'Test it free with your own products before you buy.',
      regionPK: 'Pakistan (PKR)', regionAbroad: 'Other countries (USD)', regionLabel: 'Show prices for',
      extraAbroad: 'cost a small fee',
      perMonth: '/month', setup: 'One-time setup', popular: 'Most popular', button: 'Get a free test',
      names: { silver: 'Silver', gold: 'Gold', premium: 'Premium' },
      features: {
        silver: ['1,000 replies / month', 'Up to 50 products', 'Urdu + Roman Urdu + English', 'Orders + COD', 'Email order alerts + morning summary', '3 months memory'],
        gold: ['4,000 replies / month', 'Up to 300 products', 'All 8 languages', 'Payment screenshot checking', 'Complaints sent to your team', 'WhatsApp alerts with tap buttons', 'Monthly report', '1 year memory'],
        premium: ['15,000 replies / month', 'Unlimited products', 'Up to 3 numbers / branches', 'Everything in Gold', 'Priority support', 'Courier and payment-link integrations (coming soon)', '5 years memory']
      },
      note: 'Free test: we set the assistant up with your products and you chat with it as a customer. Yearly plan = {yearly} months free. Extra replies {extra} each after your limit — the bot never stops mid-month.'
    },
    faq: {
      eyebrow: 'FAQ', title: 'Questions, answered.',
      items: [
        { q: 'Do I need a new number?', a: 'Usually yes — a number that is not already on WhatsApp. Or send us your current number and we will check if it can be connected.' },
        { q: 'Can it cancel or refund?', a: 'Yes. Customers can cancel before dispatch. You can cancel, mark refunded or returned with one line (cancel 18, refunded 18, returned 18), and undo if needed. Every action asks a quick Yes/No, then the customer is told automatically.' },
        { q: 'Is my data safe?', a: 'Each business has its own separate setup — its own number, products, prices and customers. Your data is used to run your shop’s assistant. Please read our Privacy Policy for full details.' },
        { q: 'Which languages does it speak?', a: 'Urdu, Roman Urdu, English, Arabic, Farsi, Spanish, Hindi and Italian. The Silver plan covers Urdu, Roman Urdu and English; Gold and Premium include all languages.' },
        { q: 'What if the AI makes a mistake?', a: 'It only answers from your own products and prices, and stays on topic. You confirm every payment yourself in your own bank or mobile-wallet app, and complaints go straight to your team with numbers like C1.' },
        { q: 'Does it work outside Pakistan?', a: 'Yes. Each business has its own currency and time zone, and the assistant replies in 8 languages — so a shop in the Gulf, the UK, Europe or anywhere else on WhatsApp can use it. Plans outside Pakistan start at {usdFrom}/month.' }
      ]
    },
    web: {
      eyebrow: 'Also from Webxeen',
      title: 'Websites that move as you scroll.',
      text: 'We build scroll-animation and 3D product websites for brands. Your product turns, opens up and explains itself as visitors scroll — and every page can end with an order button that goes straight to your WhatsApp assistant.',
      points: ['3D product reveal and scroll stories', 'Fast and smooth on phones', 'Order on WhatsApp from any page', 'Ready for Google search'],
      cta: 'See the website service',
      cta2: 'Ask for a quote'
    },
    final: {
      title: 'Let your WhatsApp sell while you rest.',
      sub: 'Test Webxeen free before you buy. We set it up with your products, prices and delivery rules, and you chat with it as a customer.',
      cta0: 'Try the live demo', cta1: 'Get a free test on WhatsApp', cta2: 'Email us'
    },
    footer: { privacy: 'Privacy Policy', terms: 'Terms', rights: '© 2023 Webxeen. All rights reserved.', tagline: 'AI WhatsApp sales assistant for small businesses.' }
  },

  ur: {
    services: {
      eyebrow: 'Hum do tarah madad karte hain',
      title: 'Aap ko kya chahiye?',
      bot: { tag: 'WhatsApp Bot', title: 'Aap ke WhatsApp par AI assistant', text: 'Customers ko unki zubaan mein jawab, orders lena aur payment check karna — din raat.', cta: 'Dekhein bot kaise kaam karta hai' },
      web: { tag: '3D Websites', title: 'Aisi website jo scroll par chalti hai', text: 'Aap ka product 3D mein ghoom kar khud apni khoobiyan batata hai, aur order ka button seedha WhatsApp par jata hai.', cta: 'Website service dekhein', sample: 'Live 3D sample kholein' }
    },
    meta: {
      lang: 'ur-Latn', dir: 'ltr', switchLabel: 'Roman Urdu',
      title: 'Webxeen — aap ki shop ke liye AI WhatsApp sales assistant',
      description: 'Webxeen WhatsApp par aap ke customers ko 24/7, 8 zubaanon mein jawab deta hai, receipt ke saath order leta hai, payment screenshot check karta hai aur sab kuch aik tap se chalata hai.'
    },
    nav: { how: 'Kaise kaam karta hai', features: 'Features', pricing: 'Qeematein', faq: 'Sawalat', demo: 'Live demo', cta: 'Live demo', menu: 'Menu', lang: 'Zubaan', websites: '3D Websites', bot: 'WhatsApp Bot' },
    hero: {
      badge: 'WhatsApp ke liye AI sales assistant',
      title: 'Aap ki shop ka WhatsApp — <em>24/7</em> jawab bhi de, order bhi le.',
      sub: 'Webxeen aap ke customers ko unki apni zubaan mein jawab deta hai — Urdu, English, Arabic aur bohat si — aur order khud book karta hai, chahe aap so rahe hon.',
      cta1: 'Live demo try karein', cta2: 'WhatsApp par free test',
      note: 'Sign-up nahi · 8 zubaanein · Khareedne se pehle free test',
      artLabel: 'Misaal: customer WhatsApp par khana order karta hai, assistant order book karta hai, aur shop owner ko aik tap wale buttons ke saath order milta hai.'
    },
    heroChat: {
      shop: 'Karachi Grill', ini: 'KG', status: 'foran jawab deta hai', you: 'Customer',
      c1: 'Menu bhej dein? DHA mein delivery hai?',
      b1: 'Ji haan, DHA delivery Rs 150. Aaj ke favourite:',
      p1: 'Chicken Karahi', p2: 'Seekh Kabab', p3: 'Garlic Naan', pr1: 'Rs 1,450', pr2: 'Rs 780', pr3: 'Rs 120', a1: 'karahi', a2: 'kabab', a3: 'naan',
      c2: '1 karahi aur 4 naan',
      b2: '1 x Chicken Karahi Rs 1,450 + 4 x Garlic Naan Rs 480 + delivery Rs 150 = <b>Rs 2,080</b>. Confirm kar doon?',
      q1: 'Confirm', q2: 'Order edit', q3: 'More',
      b3: 'Ho gaya! Order <b>#KG-0012</b> book ho gaya. Payment delivery par cash.',
      b4: 'Aap ka order #KG-0012 raste mein hai.',
      seller: 'Aap · shop owner', newOrder: 'Naya order #KG-0012', lines: '1 x Chicken Karahi<br>4 x Garlic Naan · DHA', total: 'Rs 2,080 · Cash on delivery',
      paid: 'Paid', disp: 'Dispatched', more: 'More', told: 'Customer ko khud bata diya', wait: 'Naye orders ka intezar…'
    },
    demoStrip: {
      eyebrow: 'Live demo',
      title: 'Apne business ke saath try karein — sirf 2 minute mein.',
      text: 'Apne business ki qism chunein, apne products daalein aur apne assistant se baat karein. Aik phone par aap customer hain, doosre par shop owner ka phone dekhein.',
      cta: 'Live demo kholein', note: 'Sign-up nahi. Asal WhatsApp par kuch nahi jata.',
      cats: { restaurant: 'Restaurant', seller: 'Online seller', clinic: 'Clinic', school: 'School', salon: 'Salon', bakery: 'Bakery', grocery: 'Grocery', electronics: 'Electronics' }
    },
    facts: [
      { num: 8, label: 'zubaanon mein jawab' },
      { text: '24/7', label: 'jawab, din raat' },
      { num: 1, label: 'tap se payment confirm' },
      { num: 8, suffix: ' AM', label: 'subah ki list aati hai' }
    ],
    problem: {
      eyebrow: 'Yeh masla jaana pehchana hai?',
      title: 'WhatsApp par bechna aap ki neend nahi udana chahiye.',
      items: [
        { icon: 'bubbles', title: 'Aadhi raat ko “Price?”', text: 'Ek hi sawal baar baar, har waqt aata hai. Har aik ko jawab dene mein poora din — aur raat — nikal jati hai.' },
        { icon: 'missed', title: 'Order haath se nikal jata hai', text: 'Jawab der se gaya to customer aksar agli shop se khareed leta hai.' },
        { icon: 'fake', title: 'Jaali payment screenshots', text: 'Edit kiye hue ya dobara use hue screenshots masroofiyat mein pakadna mushkil hai.' }
      ]
    },
    how: {
      eyebrow: 'Kaise kaam karta hai',
      title: 'Teen qadam. Aap ka koi extra kaam nahi.',
      steps: [
        { title: 'Customer message karta hai', text: 'Kisi bhi waqt, 8 zubaanon mein se kisi mein bhi. “2 kurtay chahiye.”' },
        { title: 'AI jawab deta hai aur order book karta hai', text: 'Sirf aap ke products, qeematon aur delivery rules se. Naam, address aur payment le kar order number ke saath receipt bhejta hai.' },
        { title: 'Aap sirf aik button dabate hain', text: 'Paid, Dispatched ya Cancel — WhatsApp ke andar hi. Customer ko khud ba khud bata diya jata hai.' }
      ],
      demo: {
        cust: '2 kurtay chahiye',
        bot: 'Ji zaroor! Blue lawn kurta PKR 2,600 each. 2 kurtay = PKR 5,200. Order book kar doon?',
        receipt: 'Order confirm · #ALI-0012 · PKR 5,200',
        seller: 'Naya order #12 · PKR 5,200',
        told: 'Customer ko bata diya ✓'
      }
    },
    features: [
      {
        id: 'b', eyebrow: 'Zubaanein', title: 'Customer ki zubaan mein baat karta hai.',
        text: 'Urdu, Roman Urdu, English, Arabic, Farsi, Spanish, Hindi aur Italian. Customer jis zubaan mein likhe, AI usi mein jawab deta hai — aur baat shop tak hi rakhta hai.',
        bullets: ['Sirf aap ki price list se jawab — qeemat apni taraf se nahi banata', 'Ghair mutaliq sawalon ko tameez se mana karta hai', 'Purane customers aur unke pichle orders yaad rakhta hai'],
        videoLabel: 'Animation: “Qeemat kya hai?” ka sawal aur jawab 8 zubaanon mein.'
      },
      {
        id: 'c', eyebrow: 'Orders', title: 'Receipt aur order number ke saath orders.',
        text: 'Product, tadaad, naam, address aur payment ka tareeqa — chat mein hi le kar confirm karta hai, phir #ALI-0012 jaisi saaf receipt bhejta hai.',
        bullets: ['Booking ke baad customer payment ka tareeqa badal sakta hai (COD se JazzCash waghera)', 'Dispatch se pehle customer order cancel kar sakta hai', 'Online payment ke liye PKR 5,199.72 jaisi thodi alag raqam — taake aap har payment foran pehchan lein; total se zyada kabhi nahi'],
        videoLabel: 'Animation: cheezein cart mein jati hain, order ki tafseel bharti hai aur order number wali receipt nikalti hai.'
      },
      {
        id: 'd', eyebrow: 'Payment check', title: 'Payment screenshots aap ke liye check karta hai.',
        text: 'AI raqam, transaction ID, tareekh aur receiver parhta hai. Jo tasveer receipt na ho use rad karta hai, aur kuch ghalat lage to aap ko khabardar karta hai:',
        bullets: ['Raqam wajib raqam se kam ho', 'Paisa kisi aur account mein gaya ho', 'Screenshot edit kiya hua lage', 'Wohi screenshot ya transaction ID kisi aur order mein use hui ho'],
        note: 'Koi bhi AI har jaali screenshot nahi pakad sakta. Parcel bhejne se pehle payment hamesha apni bank ya JazzCash app mein confirm karein.',
        videoLabel: 'Animation: sample payment screenshot scan hota hai. Pehla theek nikalta hai, doosre mein kam raqam ki warning aati hai.'
      },
      {
        id: 'e', eyebrow: 'Seller control', title: 'Sab kuch WhatsApp se chalayein.',
        text: 'Har naya order aur payment screenshot tap buttons ke saath aata hai: Paid, Not paid, Dispatched, Cancel. Ya chhoti si command likh dein:',
        commands: ['paid 21', 'dispatched 18-24', 'cancel 18 out of stock', 'refunded 18', 'returned 18', 'undo 18', 'pending', 'solved C3'],
        note: 'Har kaam se pehle aik jaldi Yes/No poocha jata hai — phir customer ko khud bata diya jata hai. Koi app nahi chahiye.',
        videoLabel: 'Animation: seller Paid dabata hai aur customer ko foran confirmation milti hai. Phir “dispatched 18-24” se 7 orders dispatched ho jate hain.'
      },
      {
        id: 'f', eyebrow: 'Subah ki list', title: 'Aaram se soyein. Subah 8 baje list tayyar.',
        text: 'Quiet hours mein raat 11 se subah 8 baje tak phone khamosh rehta hai. Subah aap ko aik list milti hai:',
        bullets: ['Check karne wali payments', 'Bhejne wale parcels', 'Wajib refunds', 'Shikayatein, number ke saath C1, C2…'],
        videoLabel: 'Animation: raat subah mein badalti hai aur subah ki list samne aati hai.'
      }
    ],
    grid: {
      eyebrow: 'Yeh bhi shamil hai',
      title: 'Bohat si chhoti cheezein jo bara waqt bachati hain.',
      items: [
        { icon: 'memory', title: 'Lambi yaaddasht', text: 'Purane customers aur unke orders yaad rakhta hai. “Maine aakhri order kab kiya tha?” — jawab tayyar.' },
        { icon: 'undo', title: 'Cancel, refund, return', text: 'Aik aik line mein: cancel 18, refunded 18, returned 18 — aur iraada badle to undo 18.' },
        { icon: 'shield', title: 'COD hifazat', text: 'Jis customer ke 2 COD parcel wapas aa jayein, use aage advance payment karni hogi.' },
        { icon: 'flag', title: 'Number wali shikayatein', text: 'Shikayatein C1, C2… ke number se aap ki team tak jati hain, aur customer ko 24 ghante mein jawab ka waada milta hai.' },
        { icon: 'clock', title: 'Reminder aur auto-cancel', text: 'Online order ki payment na aaye to 24 ghante baad reminder, aur 72 ghante baad order khud cancel.' },
        { icon: 'globe', title: 'Apni currency, apna time zone', text: 'Har business ki apni currency aur time zone — Gulf ya Europe mein bechna bhi mumkin hai.' }
      ]
    },
    channels: {
      eyebrow: 'Aik AI, har inbox',
      title: 'Aaj WhatsApp. Agla qadam Instagram aur Messenger.',
      text: 'Wohi assistant, wohi products, wohi order ka tareeqa — har us app par jahan aap ke customers aap ko message karte hain.',
      live: 'Abhi live', soon: 'Jald aa raha hai',
      wa: 'WhatsApp', ig: 'Instagram DMs', fb: 'Facebook Messenger',
      chats: {
        wa: [{ w: 'in', t: 'Assalam o Alaikum, yeh suit available hai?' }, { w: 'out', t: 'Ji haan! Size M aur L — Rs 4,500.' }, { w: 'in', t: 'M chahiye, COD ho jayega?' }, { w: 'out', t: 'Bilkul. Naam aur address bhej dein 😊' }, { w: 'in', t: 'Ayesha, Model Town Lahore' }, { w: 'out', t: 'Order #ALI-0031 book ho gaya ✅' }],
        ig: [{ w: 'in', t: 'Price?' }, { w: 'out', t: 'Rs 2,450 — Lahore mein free delivery 🚚' }, { w: 'in', t: 'Black mein hai?' }, { w: 'out', t: 'Ji, black aur maroon dono. Order karein?' }, { w: 'in', t: 'Yes please! 2 pieces' }, { w: 'out', t: 'Done ✅ Total Rs 4,900. Receipt bhej di.' }],
        fb: [{ w: 'in', t: 'Kal tak deliver ho jayega?' }, { w: 'out', t: 'Lahore mein 1–2 din mein, InshaAllah.' }, { w: 'in', t: 'JazzCash se pay kar sakta hun?' }, { w: 'out', t: 'Ji, order ke baad exact amount bhej dete hain.' }, { w: 'in', t: 'Screenshot bhej diya' }, { w: 'out', t: 'Payment mil gayi, shukriya! 🙌' }]
      }
    },
    soon: {
      title: 'Jald aa raha hai', badge: 'Jald aa raha hai',
      items: [
        { title: 'Comment-to-DM', text: '“Price?” comment ka jawab DM mein' },
        { title: 'TikTok', text: 'Abhi ke liye aap ke WhatsApp ka link' },
        { title: 'Seller dashboard', text: 'Sab kuch online manage karein' }
      ]
    },
    pricing: {
      eyebrow: 'Qeematein', title: 'Aasaan mahana plans.', sub: 'Khareedne se pehle apne products ke saath free test karein.',
      regionPK: 'Pakistan (PKR)', regionAbroad: 'Bahar (USD)', regionLabel: 'Qeematein dikhayein',
      extraAbroad: 'ki choti si fees',
      perMonth: '/mahina', setup: 'Aik dafa setup', popular: 'Sab se pasandeeda', button: 'Free test karein',
      names: { silver: 'Silver', gold: 'Gold', premium: 'Premium' },
      features: {
        silver: ['1,000 jawab / mahina', '50 products tak', 'Urdu + Roman Urdu + English', 'Orders + COD', 'Email order alerts + subah ki summary', '3 mahine ki yaaddasht'],
        gold: ['4,000 jawab / mahina', '300 products tak', 'Tamam 8 zubaanein', 'Payment screenshot check', 'Shikayatein aap ki team tak', 'WhatsApp alerts tap buttons ke saath', 'Mahana report', '1 saal ki yaaddasht'],
        premium: ['15,000 jawab / mahina', 'Unlimited products', '3 numbers / branches tak', 'Gold ki har cheez', 'Priority support', 'Courier aur payment-link integrations (jald aa raha hai)', '5 saal ki yaaddasht']
      },
      note: 'Free test: hum assistant ko aap ke products ke saath set karte hain aur aap customer ban kar us se baat karte hain. Saalana plan = {yearly} mahine free. Limit ke baad har extra jawab {extra} — bot mahine ke beech kabhi band nahi hota.'
    },
    faq: {
      eyebrow: 'Sawalat', title: 'Aap ke sawal, hamare jawab.',
      items: [
        { q: 'Kya naya number chahiye?', a: 'Aam taur par haan — aisa number jo pehle se WhatsApp par na ho. Ya apna maujooda number bhejein, hum check kar lenge ke kya woh connect ho sakta hai.' },
        { q: 'Kya yeh cancel ya refund kar sakta hai?', a: 'Haan. Customer dispatch se pehle order cancel kar sakta hai. Aap aik line se cancel, refunded ya returned likh sakte hain (cancel 18, refunded 18, returned 18), aur zaroorat ho to undo bhi. Har kaam se pehle Yes/No poocha jata hai, phir customer ko khud bata diya jata hai.' },
        { q: 'Kya mera data mehfooz hai?', a: 'Har business ka setup alag hota hai — apna number, products, qeematein aur customers. Aap ka data aap ki shop ke assistant ko chalane ke liye use hota hai. Mukammal tafseel ke liye hamari Privacy Policy parhein.' },
        { q: 'Yeh kaun si zubaanein bolta hai?', a: 'Urdu, Roman Urdu, English, Arabic, Farsi, Spanish, Hindi aur Italian. Silver plan mein Urdu, Roman Urdu aur English; Gold aur Premium mein tamam zubaanein.' },
        { q: 'Agar AI ghalti kare to?', a: 'AI sirf aap ke products aur qeematon se jawab deta hai aur shop ki baat tak rehta hai. Har payment aap khud apni bank ya JazzCash app mein confirm karte hain, aur shikayatein C1 jaise number ke saath seedhi aap ki team tak jati hain.' },
        { q: 'Kya Pakistan se bahar use ho sakta hai?', a: 'Ji haan. Har business ki apni currency aur time zone hoti hai. Bahar ke plans {usdFrom}/mahina se shuru hain.' }
      ]
    },
    web: {
      eyebrow: 'Webxeen ki doosri service',
      title: 'Aisi websites jo scroll ke saath chalti hain.',
      text: 'Hum brands ke liye scroll animation aur 3D product websites banate hain. Visitor scroll karta hai to aap ka product ghoomta hai, khulta hai aur apni khoobiyan khud batata hai — aur har page ke aakhir mein order ka button seedha aap ke WhatsApp assistant tak le jata hai.',
      points: ['3D product reveal aur scroll stories', 'Phone par tez aur smooth', 'Har page se WhatsApp par order', 'Google search ke liye tayyar'],
      cta: 'Website service dekhein',
      cta2: 'Qeemat poochein'
    },
    final: {
      title: 'Aap ka WhatsApp bechta rahe, aap aaram karein.',
      sub: 'Khareedne se pehle Webxeen ka free test karein. Hum isay aap ke products, qeematon aur delivery rules ke saath set kar dete hain, aur aap customer ban kar check karte hain.',
      cta0: 'Live demo try karein', cta1: 'WhatsApp par free test', cta2: 'Email karein'
    },
    footer: { privacy: 'Privacy Policy', terms: 'Terms', rights: '© 2023 Webxeen. Tamam huqooq mehfooz hain.', tagline: 'Chhote businesses ke liye AI WhatsApp sales assistant.' }
  },

  ar: {
    services: {
      eyebrow: 'طريقتان نساعدك بهما على البيع',
      title: 'ماذا تحتاج؟',
      bot: { tag: 'بوت واتساب', title: 'مساعد ذكي على واتساب الخاص بك', text: 'يرد على العملاء بلغتهم، ويستقبل الطلبات ويتحقق من الدفع — ليلًا ونهارًا.', cta: 'شاهد كيف يعمل البوت' },
      web: { tag: 'مواقع ثلاثية الأبعاد', title: 'موقع يتحرك مع التمرير', text: 'يدور منتجك ويشرح نفسه بتقنية ثلاثية الأبعاد، مع زر طلب يذهب إلى واتساب.', cta: 'تعرّف على خدمة المواقع', sample: 'افتح النموذج الحي ثلاثي الأبعاد' }
    },
    web: {
      eyebrow: 'أيضًا من Webxeen',
      title: 'مواقع تتحرك مع التمرير.',
      text: 'نصمم مواقع بحركة التمرير وعرض المنتجات ثلاثي الأبعاد للعلامات التجارية. يدور منتجك ويُظهر تفاصيله بينما يتصفح الزائر — ويمكن أن تنتهي كل صفحة بزر طلب يذهب مباشرة إلى مساعد واتساب الخاص بك.',
      points: ['عرض المنتج ثلاثي الأبعاد وقصص التمرير', 'سريعة وسلسة على الجوال', 'اطلب عبر واتساب من أي صفحة', 'جاهزة لبحث Google'],
      cta: 'تعرّف على خدمة المواقع',
      cta2: 'اطلب عرض سعر'
    },
    meta: {
      lang: 'ar', dir: 'rtl', switchLabel: 'العربية',
      title: 'Webxeen — مساعد مبيعات ذكي على واتساب لمتجرك',
      description: 'Webxeen يرد على عملائك في واتساب على مدار الساعة بـ 8 لغات منها العربية، يستقبل الطلبات ويرسل إيصالًا برقم الطلب، يفحص صور إثبات الدفع، وتدير كل شيء بلمسة واحدة.'
    },
    nav: { websites: 'مواقع ثلاثية الأبعاد', bot: 'بوت واتساب', how: 'كيف يعمل', features: 'المزايا', pricing: 'الأسعار', faq: 'الأسئلة الشائعة', demo: 'تجربة مباشرة', cta: 'جرّب الآن', menu: 'القائمة', lang: 'اللغة' },
    hero: {
      badge: 'مساعد مبيعات بالذكاء الاصطناعي لواتساب',
      title: 'واتساب متجرك يرد على العملاء ويستقبل الطلبات <em>24/7.</em>',
      sub: 'يرد Webxeen على عملائك بلغتهم — العربية والإنجليزية والأردية والإسبانية وغيرها — ويسجّل الطلبات تلقائيًا، حتى وأنت نائم.',
      cta1: 'جرّب العرض المباشر', cta2: 'تجربة مجانية على واتساب',
      note: 'بدون تسجيل · 8 لغات · تجربة مجانية قبل الشراء',
      artLabel: 'مثال: عميل يطلب طعامًا عبر واتساب، فيسجّل المساعد الطلب، ويصل الطلب إلى صاحب المتجر مع أزرار تعمل بلمسة واحدة.'
    },
    heroChat: {
      shop: 'مشويات الدار', ini: 'MD', status: 'يرد فورًا', you: 'العميل',
      c1: 'مرحبًا! ممكن أشوف المنيو؟ هل يوجد توصيل إلى وسط المدينة؟',
      b1: 'أهلًا وسهلًا! نعم، التوصيل إلى وسط المدينة 10 درهم. الأكثر طلبًا اليوم:',
      p1: 'كباب دجاج', p2: 'برجر كلاسيك', p3: 'بيتزا مارغريتا', pr1: '45 درهم', pr2: '35 درهم', pr3: '50 درهم', a1: 'kabab', a2: 'burger', a3: 'pizza',
      c2: 'طبق كباب واحد و2 برجر لو سمحت',
      b2: '1 × كباب دجاج 45 + 2 × برجر كلاسيك 70 + التوصيل 10 = <b>125 درهم</b>. هل أؤكد الطلب؟',
      q1: 'تأكيد', q2: 'تعديل الطلب', q3: 'المزيد',
      b3: 'تم! سُجّل طلبك رقم <b>#MD-0012</b>. الدفع عند الاستلام.',
      b4: 'طلبك رقم #MD-0012 في الطريق إليك.',
      seller: 'أنت · صاحب المتجر', newOrder: 'طلب جديد #MD-0012', lines: '1 × كباب دجاج<br>2 × برجر كلاسيك · وسط المدينة', total: '125 درهم · الدفع عند الاستلام',
      paid: 'مدفوع', disp: 'تم الشحن', more: 'المزيد', told: 'أُبلغ العميل تلقائيًا', wait: 'بانتظار طلبات جديدة…'
    },
    demoStrip: {
      eyebrow: 'تجربة مباشرة',
      title: 'جرّبه على نشاطك التجاري — في دقيقتين.',
      text: 'اختر نوع نشاطك، وأضف منتجاتك، وتحدّث مع مساعدك الخاص. تكتب أنت كعميل على هاتف، وتشاهد هاتف صاحب المتجر على الآخر.',
      cta: 'افتح العرض المباشر', note: 'بدون تسجيل. لا يُرسل شيء إلى واتساب حقيقي. العرض حاليًا بالإنجليزية.',
      cats: { restaurant: 'مطعم', seller: 'بائع أونلاين', clinic: 'عيادة', school: 'مدرسة', salon: 'صالون', bakery: 'مخبز', grocery: 'بقالة', electronics: 'إلكترونيات' }
    },
    facts: [
      { num: 8, label: 'لغات يرد بها' },
      { text: '24/7', label: 'ردود ليلًا ونهارًا' },
      { num: 1, label: 'لمسة لتأكيد الدفع' },
      { num: 8, suffix: ' ص', label: 'تصلك قائمة الصباح' }
    ],
    problem: {
      eyebrow: 'هل يبدو هذا مألوفًا؟',
      title: 'البيع عبر واتساب لا يجب أن يحرمك من النوم.',
      items: [
        { icon: 'bubbles', title: '«كم السعر؟» في منتصف الليل', text: 'السؤال نفسه يصلك مرة بعد مرة، وفي كل ساعة. الرد على كل رسالة يأخذ يومك كله — وليلك أيضًا.' },
        { icon: 'missed', title: 'طلبات ضائعة', text: 'الرد المتأخر يعني غالبًا عميلًا خسرته؛ فهو ببساطة يشتري من المتجر التالي.' },
        { icon: 'fake', title: 'صور دفع مزيفة', text: 'يصعب كشف صور الإيصالات المعدّلة أو المكررة حين تكون مشغولًا.' }
      ]
    },
    how: {
      eyebrow: 'كيف يعمل',
      title: 'ثلاث خطوات. بدون أي عمل إضافي.',
      steps: [
        { title: 'العميل يرسل رسالة', text: 'في أي وقت، وبأي لغة من 8 لغات: «أريد قميصين» أو «<bdi lang="en">I need 2 shirts</bdi>» أو «<bdi lang="ur-Latn">2 kurtay chahiye</bdi>».' },
        { title: 'الذكاء الاصطناعي يرد ويسجّل الطلب', text: 'يعتمد فقط على منتجاتك وأسعارك وشروط التوصيل لديك. يجمع الاسم والعنوان وطريقة الدفع، ثم يرسل إيصالًا برقم الطلب.' },
        { title: 'أنت تضغط زرًا واحدًا', text: 'مدفوع، تم الشحن أو إلغاء — داخل واتساب نفسه. ويُبلَّغ عميلك تلقائيًا.' }
      ],
      demo: {
        cust: 'أريد قميصين',
        bot: 'بكل سرور! القميص الكتان الأزرق بـ 95 درهم للقطعة. قميصان = 190 درهم. هل أسجّل الطلب؟',
        receipt: 'تم تأكيد الطلب · #ALI-0012 · 190 درهم',
        seller: 'طلب جديد #12 · 190 درهم',
        told: 'أُبلغ العميل ✓'
      }
    },
    features: [
      {
        id: 'b', eyebrow: 'اللغات', title: 'يتحدث بلغة عميلك.',
        text: 'العربية، الإنجليزية، الأردية، الأردية بالحروف اللاتينية، الفارسية، الإسبانية، الهندية والإيطالية. يرد الذكاء الاصطناعي باللغة التي يكتب بها العميل — ويُبقي المحادثة بلطف حول متجرك.',
        bullets: ['يجيب فقط من قائمة أسعارك — لا يخترع أسعارًا أبدًا', 'يعتذر بلطف عن الأسئلة الخارجة عن الموضوع', 'يتذكر العملاء العائدين وطلباتهم السابقة'],
        videoLabel: 'رسوم متحركة: سؤال «كم السعر؟» وجوابه معروضان بـ 8 لغات.'
      },
      {
        id: 'c', eyebrow: 'الطلبات', title: 'طلبات بإيصالات وأرقام طلب.',
        text: 'المنتج والكمية والاسم والعنوان وطريقة الدفع — تُجمع كلها داخل المحادثة، ثم يُؤكَّد الطلب ويُرسل إيصال واضح برقم مثل #ALI-0012.',
        bullets: ['يمكن للعميل تغيير طريقة الدفع بعد الحجز (مثلًا من الدفع عند الاستلام إلى تحويل بنكي أو محفظة إلكترونية)', 'يمكن للعميل إلغاء الطلب قبل الشحن', 'للدفع الإلكتروني يُطلب مبلغ مميز قليلًا مثل 199.72 بدل 200، فتتعرف على كل دفعة فورًا — ولا يزيد أبدًا عن الإجمالي'],
        videoLabel: 'رسوم متحركة: منتجات تُضاف إلى السلة، وتُملأ تفاصيل الطلب، ويُطبع إيصال برقم الطلب.'
      },
      {
        id: 'd', eyebrow: 'فحص الدفع', title: 'يفحص صور إثبات الدفع نيابةً عنك.',
        text: 'يقرأ الذكاء الاصطناعي المبلغ ورقم العملية والتاريخ والمستلم. يرفض الصور التي ليست إيصالات، وينبّهك عندما يبدو شيء غير صحيح:',
        bullets: ['المبلغ أقل من المستحق', 'المال حُوّل إلى حساب آخر', 'الصورة تبدو معدّلة', 'الصورة نفسها أو رقم العملية نفسه استُخدم لطلب آخر'],
        note: 'لا يوجد ذكاء اصطناعي يكشف كل تزوير. تأكد دائمًا من وصول المبلغ في تطبيق البنك أو المحفظة الخاص بك قبل الشحن.',
        videoLabel: 'رسوم متحركة: فحص صورة دفع تجريبية. الأولى تبدو سليمة، ثم تظهر في الثانية تنبيه بأن المبلغ أقل.'
      },
      {
        id: 'e', eyebrow: 'تحكّم البائع', title: 'أدِر كل شيء من واتساب.',
        text: 'كل طلب جديد وكل صورة دفع تصلك مع أزرار: مدفوع، غير مدفوع، تم الشحن، إلغاء. أو اكتب أمرًا قصيرًا (الأوامر بالإنجليزية كما هي):',
        commands: ['paid 21', 'dispatched 18-24', 'cancel 18 out of stock', 'refunded 18', 'returned 18', 'undo 18', 'pending', 'solved C3'],
        note: 'قبل كل إجراء يُطرح عليك سؤال سريع: نعم/لا — ثم يُبلَّغ عميلك تلقائيًا. لا حاجة لأي تطبيق.',
        videoLabel: 'رسوم متحركة: البائع يضغط «مدفوع» فيصل للعميل تأكيد فوري. ثم يُعلّم الأمر «dispatched 18-24» سبعة طلبات كمشحونة.'
      },
      {
        id: 'f', eyebrow: 'قائمة الصباح', title: 'نم مرتاحًا. قائمتك جاهزة الساعة 8 صباحًا.',
        text: 'ساعات الهدوء تُبقي هاتفك صامتًا من 11 مساءً حتى 8 صباحًا. وفي الصباح تصلك قائمة واحدة:',
        bullets: ['دفعات تحتاج إلى مراجعة', 'طرود يجب إرسالها', 'مبالغ مستحقة للاسترداد', 'شكاوى مرقّمة C1، C2…'],
        videoLabel: 'رسوم متحركة: الليل يتحول إلى صباح وتظهر قائمة ملخص الصباح.'
      }
    ],
    grid: {
      eyebrow: 'مشمول أيضًا',
      title: 'تفاصيل صغيرة كثيرة توفر وقتًا كبيرًا.',
      items: [
        { icon: 'memory', title: 'ذاكرة طويلة', text: 'يتذكر العملاء العائدين وطلباتهم السابقة. «متى كان آخر طلب لي؟» — الجواب جاهز.' },
        { icon: 'undo', title: 'إلغاء، استرداد، إرجاع', text: 'سطر واحد لكلٍّ منها: cancel 18 أو refunded 18 أو returned 18 — أو undo 18 إن غيّرت رأيك.' },
        { icon: 'shield', title: 'حماية الدفع عند الاستلام', text: 'بعد إرجاع طردين بالدفع عند الاستلام، يجب على ذلك العميل الدفع مسبقًا.' },
        { icon: 'flag', title: 'شكاوى مرقّمة', text: 'تصل الشكاوى إلى فريقك بأرقام مثل C1، C2… ويحصل العميل على وعد بالرد خلال 24 ساعة.' },
        { icon: 'clock', title: 'تذكير وإلغاء تلقائي', text: 'الطلبات الإلكترونية غير المدفوعة تتلقى تذكيرًا بعد 24 ساعة، وتُلغى تلقائيًا بعد 72 ساعة.' },
        { icon: 'globe', title: 'عملتك ومنطقتك الزمنية', text: 'لكل نشاط تجاري عملته ومنطقته الزمنية الخاصة — البيع في الخليج أو أوروبا ممكن أيضًا.' }
      ]
    },
    channels: {
      eyebrow: 'ذكاء اصطناعي واحد لكل صناديق الرسائل',
      title: 'واتساب اليوم. وإنستغرام وماسنجر قريبًا.',
      text: 'المساعد نفسه، والمنتجات نفسها، وطريقة الطلب نفسها — على كل تطبيق يراسلك منه عملاؤك.',
      live: 'متاح الآن', soon: 'قريبًا',
      wa: 'واتساب', ig: 'رسائل إنستغرام', fb: 'فيسبوك ماسنجر',
      chats: {
        wa: [{ w: 'in', t: 'السلام عليكم، هل هذا الفستان متوفر؟' }, { w: 'out', t: 'وعليكم السلام! نعم، المقاس M و L — 160 درهم.' }, { w: 'in', t: 'أريد M. هل الدفع عند الاستلام متاح؟' }, { w: 'out', t: 'أكيد. أرسلي الاسم والعنوان من فضلك 😊' }, { w: 'in', t: 'مريم، دبي مارينا' }, { w: 'out', t: 'تم تسجيل الطلب #ALI-0031 ✅' }],
        ig: [{ w: 'in', t: 'كم السعر؟' }, { w: 'out', t: '90 درهم — التوصيل مجاني 🚚' }, { w: 'in', t: 'هل يوجد باللون الأسود؟' }, { w: 'out', t: 'نعم، الأسود والعنابي. هل أسجّل الطلب؟' }, { w: 'in', t: 'نعم من فضلك! قطعتان' }, { w: 'out', t: 'تم ✅ الإجمالي 180 درهم. أرسلنا الإيصال.' }],
        fb: [{ w: 'in', t: 'هل يمكن أن يصل غدًا؟' }, { w: 'out', t: 'التوصيل داخل المدينة يستغرق 1–2 يوم.' }, { w: 'in', t: 'هل يمكنني الدفع بالبطاقة؟' }, { w: 'out', t: 'نعم، نرسل لك المبلغ المطلوب بالضبط بعد الطلب مباشرة.' }, { w: 'in', t: 'أرسلت صورة الدفع' }, { w: 'out', t: 'وصلنا المبلغ، شكرًا لك! 🙌' }]
      }
    },
    soon: {
      title: 'قريبًا', badge: 'قريبًا',
      items: [
        { title: 'من التعليق إلى الرسائل', text: 'رد تلقائي في الرسائل الخاصة على تعليقات «كم السعر؟»' },
        { title: 'تيك توك', text: 'حاليًا يحوّل إلى رقم واتساب الخاص بك' },
        { title: 'لوحة تحكم البائع', text: 'أدِر كل شيء عبر الإنترنت' }
      ]
    },
    pricing: {
      eyebrow: 'الأسعار', title: 'باقات شهرية بسيطة.', sub: 'جرّبه مجانًا بمنتجاتك قبل أن تشتري.',
      regionPK: 'باكستان (PKR)', regionAbroad: 'باقي الدول (USD)', regionLabel: 'اعرض الأسعار لـ',
      extraAbroad: 'برسوم بسيطة',
      perMonth: '/شهريًا', setup: 'رسوم إعداد لمرة واحدة', popular: 'الأكثر طلبًا', button: 'احصل على تجربة مجانية',
      names: { silver: 'Silver', gold: 'Gold', premium: 'Premium' },
      features: {
        silver: ['1,000 رد / شهريًا', 'حتى 50 منتجًا', 'الأردية + الأردية اللاتينية + الإنجليزية', 'الطلبات + الدفع عند الاستلام', 'تنبيهات الطلبات بالبريد + ملخص الصباح', 'ذاكرة 3 أشهر'],
        gold: ['4,000 رد / شهريًا', 'حتى 300 منتج', 'كل اللغات الثماني (منها العربية)', 'فحص صور الدفع', 'إرسال الشكاوى إلى فريقك', 'تنبيهات واتساب مع أزرار', 'تقرير شهري', 'ذاكرة سنة'],
        premium: ['15,000 رد / شهريًا', 'منتجات بلا حدود', 'حتى 3 أرقام / فروع', 'كل ما في Gold', 'دعم بأولوية', 'ربط مع شركات الشحن وروابط الدفع (قريبًا)', 'ذاكرة 5 سنوات']
      },
      note: 'التجربة المجانية: نُعدّ المساعد بمنتجاتك، وتتحدث معه أنت كعميل. في الباقة السنوية تحصل على أشهر مجانية (عددها: {yearly}). بعد الحد الشهري، كل رد إضافي {extra} — ولا يتوقف البوت أبدًا في منتصف الشهر.'
    },
    faq: {
      eyebrow: 'الأسئلة الشائعة', title: 'أسئلتكم وأجوبتنا.',
      items: [
        { q: 'هل أحتاج إلى رقم جديد؟', a: 'غالبًا نعم — رقم غير مسجل على واتساب. أو أرسل لنا رقمك الحالي وسنتحقق إن كان يمكن ربطه.' },
        { q: 'هل يمكنه الإلغاء أو الاسترداد؟', a: 'نعم. يمكن للعميل الإلغاء قبل الشحن. ويمكنك أنت الإلغاء أو تسجيل الاسترداد أو الإرجاع بسطر واحد (cancel 18، refunded 18، returned 18)، والتراجع عند الحاجة. قبل كل إجراء سؤال سريع نعم/لا، ثم يُبلَّغ العميل تلقائيًا.' },
        { q: 'هل بياناتي آمنة؟', a: 'لكل نشاط تجاري إعداد مستقل — رقمه ومنتجاته وأسعاره وعملاؤه. تُستخدم بياناتك لتشغيل مساعد متجرك. يُرجى قراءة سياسة الخصوصية للتفاصيل الكاملة.' },
        { q: 'هل يرد بالعربية؟', a: 'نعم. يرد بالعربية والإنجليزية والأردية والأردية اللاتينية والفارسية والإسبانية والهندية والإيطالية. باقة Silver تشمل الأردية والأردية اللاتينية والإنجليزية فقط؛ أما العربية وباقي اللغات ففي باقتي Gold و Premium.' },
        { q: 'ماذا لو أخطأ الذكاء الاصطناعي؟', a: 'يجيب فقط من منتجاتك وأسعارك، ويبقى في موضوع متجرك. أنت من يؤكد كل دفعة بنفسه في تطبيق البنك أو المحفظة، وتصل الشكاوى مباشرة إلى فريقك بأرقام مثل C1.' },
        { q: 'هل يعمل خارج باكستان، مثلًا في الخليج؟', a: 'نعم. لكل نشاط تجاري عملته ومنطقته الزمنية، ويرد المساعد بـ 8 لغات منها العربية — لذلك يمكن لأي متجر يبيع عبر واتساب، في الخليج أو أي مكان آخر، أن يستخدمه. الباقات خارج باكستان تبدأ من {usdFrom} شهريًا.' }
      ]
    },
    final: {
      title: 'دع واتساب يبيع عنك وأنت ترتاح.',
      sub: 'جرّب Webxeen مجانًا قبل الشراء. نُعدّه بمنتجاتك وأسعارك وشروط التوصيل لديك، وتتحدث معه أنت كعميل.',
      cta0: 'جرّب العرض المباشر', cta1: 'احصل على تجربة مجانية على واتساب', cta2: 'راسلنا بالبريد'
    },
    footer: { privacy: 'سياسة الخصوصية', terms: 'الشروط', rights: '© 2023 Webxeen. جميع الحقوق محفوظة.', tagline: 'مساعد مبيعات ذكي على واتساب للأنشطة التجارية الصغيرة.' }
  }
};
