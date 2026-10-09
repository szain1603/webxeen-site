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
    nav: { how: 'How it works', features: 'Features', pricing: 'Pricing', faq: 'FAQ', cta: 'Free demo', menu: 'Menu', lang: 'Language' },
    hero: {
      badge: 'AI sales assistant for WhatsApp',
      title: 'Your shop’s WhatsApp, answering and taking orders <em>24/7</em>.',
      sub: 'Webxeen replies to your customers in their own language — Urdu, English, Arabic and more — and books orders automatically, even while you sleep.',
      cta1: 'Get a free demo on WhatsApp', cta2: 'See pricing',
      note: '{trial}-day free trial · No app to install',
      videoLabel: 'Animation: a customer orders two kurtas on WhatsApp and the AI sends back a receipt.'
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
        { title: 'Customer sends a message', text: 'Any time, in any of 8 languages. “2 kurtay chahiye.”' },
        { title: 'AI answers and books the order', text: 'Using only your products, prices and delivery rules. It collects name, address and payment, then sends a receipt with an order number.' },
        { title: 'You tap one button', text: 'Paid, Dispatched or Cancel — right inside WhatsApp. Your customer is told automatically.' }
      ],
      demo: {
        cust: '2 kurtay chahiye',
        bot: 'Ji zaroor! Blue lawn kurta PKR 2,600 each. 2 kurtay = PKR 5,200. Order book kar doon?',
        receipt: 'Order confirmed · #ALI-0012 · PKR 5,200',
        seller: 'New order #12 · PKR 5,200',
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
        bullets: ['Customer can switch payment method after booking (COD to JazzCash, etc.)', 'Customer can cancel before dispatch', 'Online payments use a slightly odd amount like PKR 5,199.72, so you spot each payment instantly — never more than the total'],
        videoLabel: 'Animation: items go into a cart, order details are filled in and a receipt with an order number prints.'
      },
      {
        id: 'd', eyebrow: 'Payment check', title: 'Checks payment screenshots for you.',
        text: 'The AI reads the amount, transaction ID, date and receiver. It rejects photos that are not receipts and warns you when something looks wrong:',
        bullets: ['Amount is lower than due', 'Money went to a different account', 'Screenshot looks edited', 'Same screenshot or transaction ID was used for another order'],
        note: 'No AI can catch every fake. Always confirm the payment in your own bank or JazzCash app before you dispatch.',
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
    soon: {
      title: 'Coming soon', badge: 'Coming soon',
      items: [
        { title: 'Facebook Messenger', text: 'The same AI, on Messenger' },
        { title: 'Instagram DMs', text: 'The same AI, on Instagram' },
        { title: 'Comment-to-DM', text: 'Auto reply to “Price?” comments by DM' },
        { title: 'TikTok', text: 'Links to your WhatsApp for now' },
        { title: 'Seller dashboard', text: 'Manage everything online' }
      ]
    },
    pricing: {
      eyebrow: 'Pricing', title: 'Simple monthly plans.', sub: 'Start with a {trial}-day free trial.',
      regionPK: 'Pakistan (PKR)', regionAbroad: 'Abroad (USD)', regionLabel: 'Show prices for',
      perMonth: '/month', setup: 'One-time setup', popular: 'Most popular', button: 'Start free trial',
      names: { silver: 'Silver', gold: 'Gold', premium: 'Premium' },
      features: {
        silver: ['1,000 replies / month', 'Up to 50 products', 'Urdu + Roman Urdu + English', 'Orders + COD', 'Email order alerts + morning summary', '3 months memory'],
        gold: ['4,000 replies / month', 'Up to 300 products', 'All 8 languages', 'Payment screenshot checking', 'Complaints sent to your team', 'WhatsApp alerts with tap buttons', 'Monthly report', '1 year memory'],
        premium: ['15,000 replies / month', 'Unlimited products', 'Up to 3 numbers / branches', 'Everything in Gold', 'Priority support', 'Courier and payment-link integrations (coming soon)', '5 years memory']
      },
      note: '{trial}-day free trial. Yearly plan = {yearly} months free. Extra replies {extra} each after your limit — the bot never stops mid-month.'
    },
    faq: {
      eyebrow: 'FAQ', title: 'Questions, answered.',
      items: [
        { q: 'Do I need a new number?', a: 'Usually yes — a number that is not already on WhatsApp. Or send us your current number and we will check if it can be connected.' },
        { q: 'Can it cancel or refund?', a: 'Yes. Customers can cancel before dispatch. You can cancel, mark refunded or returned with one line (cancel 18, refunded 18, returned 18), and undo if needed. Every action asks a quick Yes/No, then the customer is told automatically.' },
        { q: 'Is my data safe?', a: 'Each business has its own separate setup — its own number, products, prices and customers. Your data is used to run your shop’s assistant. Please read our Privacy Policy for full details.' },
        { q: 'Which languages does it speak?', a: 'Urdu, Roman Urdu, English, Arabic, Farsi, Spanish, Hindi and Italian. The Silver plan covers Urdu, Roman Urdu and English; Gold and Premium include all languages.' },
        { q: 'What if the AI makes a mistake?', a: 'It only answers from your own products and prices, and stays on topic. You confirm every payment yourself in your own bank or JazzCash app, and complaints go straight to your team with numbers like C1.' },
        { q: 'Can I use it outside Pakistan?', a: 'Yes. Each business has its own currency and time zone. Plans abroad start at {usdFrom}/month.' }
      ]
    },
    final: {
      title: 'Let your WhatsApp sell while you rest.',
      sub: 'Try Webxeen free for {trial} days. We set it up with your products, prices and delivery rules.',
      cta1: 'Get a free demo on WhatsApp', cta2: 'Email us'
    },
    footer: { privacy: 'Privacy Policy', terms: 'Terms', rights: '© {year} Webxeen. All rights reserved.', tagline: 'AI WhatsApp sales assistant for small businesses.' }
  },

  ur: {
    meta: {
      lang: 'ur-Latn', dir: 'ltr', switchLabel: 'Roman Urdu',
      title: 'Webxeen — aap ki shop ke liye AI WhatsApp sales assistant',
      description: 'Webxeen WhatsApp par aap ke customers ko 24/7, 8 zubaanon mein jawab deta hai, receipt ke saath order leta hai, payment screenshot check karta hai aur sab kuch aik tap se chalata hai.'
    },
    nav: { how: 'Kaise kaam karta hai', features: 'Features', pricing: 'Qeematein', faq: 'Sawalat', cta: 'Free demo', menu: 'Menu', lang: 'Zubaan' },
    hero: {
      badge: 'WhatsApp ke liye AI sales assistant',
      title: 'Aap ki shop ka WhatsApp — <em>24/7</em> jawab bhi de, order bhi le.',
      sub: 'Webxeen aap ke customers ko unki apni zubaan mein jawab deta hai — Urdu, English, Arabic aur bohat si — aur order khud book karta hai, chahe aap so rahe hon.',
      cta1: 'WhatsApp par free demo lein', cta2: 'Qeematein dekhein',
      note: '{trial} din free trial · Koi app install nahi karni',
      videoLabel: 'Animation: customer WhatsApp par 2 kurtay order karta hai aur AI receipt bhejta hai.'
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
    soon: {
      title: 'Jald aa raha hai', badge: 'Jald aa raha hai',
      items: [
        { title: 'Facebook Messenger', text: 'Wohi AI, Messenger par' },
        { title: 'Instagram DMs', text: 'Wohi AI, Instagram par' },
        { title: 'Comment-to-DM', text: '“Price?” comment ka jawab DM mein' },
        { title: 'TikTok', text: 'Abhi ke liye aap ke WhatsApp ka link' },
        { title: 'Seller dashboard', text: 'Sab kuch online manage karein' }
      ]
    },
    pricing: {
      eyebrow: 'Qeematein', title: 'Aasaan mahana plans.', sub: '{trial} din free trial se shuru karein.',
      regionPK: 'Pakistan (PKR)', regionAbroad: 'Bahar (USD)', regionLabel: 'Qeematein dikhayein',
      perMonth: '/mahina', setup: 'Aik dafa setup', popular: 'Sab se pasandeeda', button: 'Free trial shuru karein',
      names: { silver: 'Silver', gold: 'Gold', premium: 'Premium' },
      features: {
        silver: ['1,000 jawab / mahina', '50 products tak', 'Urdu + Roman Urdu + English', 'Orders + COD', 'Email order alerts + subah ki summary', '3 mahine ki yaaddasht'],
        gold: ['4,000 jawab / mahina', '300 products tak', 'Tamam 8 zubaanein', 'Payment screenshot check', 'Shikayatein aap ki team tak', 'WhatsApp alerts tap buttons ke saath', 'Mahana report', '1 saal ki yaaddasht'],
        premium: ['15,000 jawab / mahina', 'Unlimited products', '3 numbers / branches tak', 'Gold ki har cheez', 'Priority support', 'Courier aur payment-link integrations (jald aa raha hai)', '5 saal ki yaaddasht']
      },
      note: '{trial} din free trial. Saalana plan = {yearly} mahine free. Limit ke baad har extra jawab {extra} — bot mahine ke beech kabhi band nahi hota.'
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
      sub: 'Webxeen {trial} din free try karein. Hum isay aap ke products, qeematon aur delivery rules ke saath set kar dete hain.',
      cta1: 'WhatsApp par free demo lein', cta2: 'Email karein'
    },
    footer: { privacy: 'Privacy Policy', terms: 'Terms', rights: '© {year} Webxeen. Tamam huqooq mehfooz hain.', tagline: 'Chhote businesses ke liye AI WhatsApp sales assistant.' }
  }
};
