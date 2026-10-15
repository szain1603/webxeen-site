/* =====================================================================
   WEBXEEN WEBSITE TEXT — every word on the page lives in this file.
   "en" = English, "ur" = Roman Urdu. Edit the text between the quotes.
   Keep the same keys in both languages. {trial}, {usdFrom}, {year},
   {extra}, {yearly} are filled in automatically from config.js.
   To add Arabic later: copy the "en" block, name it "ar", set dir:'rtl'.
   ===================================================================== */
window.WEBXEEN_CONTENT = {

  en: {
    meta: {
      lang: 'en', dir: 'ltr', switchLabel: 'English',
      title: 'Webxeen — AI WhatsApp sales assistant for your shop',
      description: 'Webxeen answers your customers on WhatsApp 24/7 in 8 languages, takes orders with receipts, checks payment screenshots and lets you run everything with one tap.'
    },
    nav: { how: 'How it works', features: 'Features', pricing: 'Pricing', faq: 'FAQ', demo: 'Live demo', cta: 'Try live demo', menu: 'Menu', lang: 'Language' },
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
    final: {
      title: 'Let your WhatsApp sell while you rest.',
      sub: 'Test Webxeen free before you buy. We set it up with your products, prices and delivery rules, and you chat with it as a customer.',
      cta0: 'Try the live demo', cta1: 'Get a free test on WhatsApp', cta2: 'Email us'
    },
    footer: { privacy: 'Privacy Policy', terms: 'Terms', rights: '© 2023 Webxeen. All rights reserved.', tagline: 'AI WhatsApp sales assistant for small businesses.' }
  },

  ur: {
    meta: {
      lang: 'ur-Latn', dir: 'ltr', switchLabel: 'Roman Urdu',
      title: 'Webxeen — aap ki shop ke liye AI WhatsApp sales assistant',
      description: 'Webxeen WhatsApp par aap ke customers ko 24/7, 8 zubaanon mein jawab deta hai, receipt ke saath order leta hai, payment screenshot check karta hai aur sab kuch aik tap se chalata hai.'
    },
    nav: { how: 'Kaise kaam karta hai', features: 'Features', pricing: 'Qeematein', faq: 'Sawalat', demo: 'Live demo', cta: 'Live demo', menu: 'Menu', lang: 'Zubaan' },
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
    final: {
      title: 'Aap ka WhatsApp bechta rahe, aap aaram karein.',
      sub: 'Khareedne se pehle Webxeen ka free test karein. Hum isay aap ke products, qeematon aur delivery rules ke saath set kar dete hain, aur aap customer ban kar check karte hain.',
      cta0: 'Live demo try karein', cta1: 'WhatsApp par free test', cta2: 'Email karein'
    },
    footer: { privacy: 'Privacy Policy', terms: 'Terms', rights: '© 2023 Webxeen. Tamam huqooq mehfooz hain.', tagline: 'Chhote businesses ke liye AI WhatsApp sales assistant.' }
  }
};
