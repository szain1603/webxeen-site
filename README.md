# Webxeen website — aasaan guide (Roman Urdu)

Yeh folder aap ki poori website hai: **webxeen.com**.
Koi server nahi chahiye. Aap isay **GitHub** par upload karenge, **Vercel** (free) par chalayenge, aur **Cloudflare** se apna domain jorenge.

Neeche har kaam click-by-click likha hai. Aap ko coding aani zaroori nahi.

---

## 1. Folder mein kya hai?

| File / folder | Kaam |
|---|---|
| `index.html` | Website ka page |
| `config.js` | **Qeematein aur links** — sirf yahan badlein |
| `content.js` | **Website ka saara text** (English + Roman Urdu) |
| `assets/video/` | 6 videos (A se F), har aik desktop (16x9) aur mobile (9x16) mein, MP4 + WebM, aur poster tasveerein |
| `assets/css/`, `assets/js/`, `assets/fonts/` | Design, animation aur fonts — inhein chhedne ki zaroorat nahi |
| `og-image.jpg` | WhatsApp/Facebook par link share karne par jo tasveer dikhti hai |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` | Browser tab ka chhota icon |
| `sitemap.xml`, `robots.txt` | Google ke liye |
| `vercel.json` | Vercel ki settings (cache waghera) |

---

## 2. SAB SE PEHLE: placeholders badlein

`config.js` file kholein (Notepad, ya GitHub par seedha — neeche step 6 dekhein). Upar yeh hissa milega:

```js
links: {
  demoWhatsApp: '{{DEMO_WHATSAPP_LINK}}',
  contactEmail: '{{CONTACT_EMAIL}}',
  privacy: '{{PRIVACY_URL}}',
  terms: '{{TERMS_URL}}'
},
```

Har `{{...}}` ko apni asal value se badlein. **Quotes `' '` mat hatayein.**

**a) WhatsApp demo link** — format: `https://wa.me/92XXXXXXXXXX`
- Number ke shuru se `0` hata kar `92` lagayein. Maslan `0300 1234567` → `923001234567`
- `+`, space ya dash mat lagayein.
- Saath mein message bhi bhar sakte hain:

```js
demoWhatsApp: 'https://wa.me/923001234567?text=Assalam%20o%20Alaikum%2C%20mujhe%20Webxeen%20demo%20chahiye',
```

**b) Email:**
```js
contactEmail: 'hello@webxeen.com',
```

**c) Privacy Policy link:**
```js
privacy: 'https://webxeen.com/privacy',
```
Agar abhi privacy page nahi hai to Google Docs mein likh kar "Publish to web" ka link yahan daal dein. Privacy Policy WhatsApp Business ke liye bhi zaroori hoti hai.

**d) Terms link (optional):** isi tarah. Agar nahi hai to bhi theek, link "#contact" par chala jayega.

> Jab tak placeholder nahi badlega, button page ke neeche "contact" hisse par le jayenge aur email ki jagah `{{CONTACT_EMAIL}}` likha nazar aayega. Launch se pehle zaroor badlein.

---

## 3. Qeematein badalna (`config.js`)

```js
plans: [
  { id: 'silver',  monthlyPKR: 2500, setupPKR: 3000,  monthlyUSD: 29,  popular: false },
  { id: 'gold',    monthlyPKR: 4500, setupPKR: 5000,  monthlyUSD: 59,  popular: true  },
  { id: 'premium', monthlyPKR: 9000, setupPKR: 10000, monthlyUSD: 119, popular: false }
]
```

- Sirf number badlein (comma ke baghair: `4500`, `4,500` nahi).
- "Most popular" ka label kis plan par ho: wahan `popular: true`, baqi `false`.
- `trialDays: 7`, `yearlyFreeMonths: 2`, `extraReplyPrice: 'Rs 1'` bhi yahin hain — yeh text mein khud ba khud lag jate hain.
- Plans ki features ki list (jaise "1,000 replies / month") `content.js` mein `pricing → features` ke andar hai.

---

## 4. Text badalna (`content.js`)

- `en: { ... }` = English, `ur: { ... }` = Roman Urdu.
- Sirf quotes ke andar ka text badlein. `'Ji zaroor!'` → `'Ji bilkul!'`
- Agar text mein `'` (apostrophe) likhna ho to `’` (tedha apostrophe) use karein, ya us se pehle `\` laga dein: `'Shop\'s'`.
- Dono zubaanon mein cheezon ki tadaad aik jaisi rakhein (maslan agar English mein 3 bullets hain to Roman Urdu mein bhi 3).
- `{trial}`, `{yearly}`, `{extra}`, `{usdFrom}`, `{year}` ko mat hatayein — yeh `config.js` se khud bhar jate hain.

**Zaroor check karein:** FAQ ka sawal "Is my data safe? / Kya mera data mehfooz hai?" ka jawab aam si baat likhi hai. Isay apne asal tareeqa-e-kaar aur Privacy Policy ke mutabiq kar lein.

Page ke sab se upar wala (hero) text `index.html` mein bhi aik copy ke taur par likha hai, taake page khulte hi text nazar aaye. Asal text phir bhi `content.js` se aata hai, is liye wahan badalna kaafi hai.

**Arabic baad mein add karna:** `content.js` mein `en` wala poora hissa copy karke `ar` naam dein, `lang: 'ar'`, `dir: 'rtl'` likhein, text Arabic mein karein, aur `index.html` mein language buttons ke saath `<button type="button" data-lang="ar" aria-pressed="false">العربية</button>` add kar dein. Design right-to-left ke liye tayyar hai.

---

## 5. GitHub par upload karna

1. **github.com** kholein → **Sign up** (agar account nahi) ya **Sign in**.
2. Upar daayein **+** par click → **New repository**.
3. **Repository name:** `webxeen-site` likhein. **Public** ya **Private** — dono chalte hain. Baqi kuch na chhedein → **Create repository**.
4. Agle page par neeli line mein **"uploading an existing file"** par click karein.
5. Apne computer par zip file ko **extract** karein (right click → Extract All). `webxeen-site` folder ke **andar** jayein.
6. Andar ki **saari files aur folders** select karein (Ctrl + A) aur GitHub ke page par **drag karke chhor dein**.
   - Dhyan: folder `webxeen-site` ko nahi, uske **andar ki cheezein** daalni hain, taake `index.html` seedha repository ke shuru mein ho.
7. Upload mukammal hone tak intezar karein (videos ki wajah se 1–2 minute).
8. Neeche **Commit changes** (hara button) par click karein.

> Agar GitHub kahe ke aik waqt mein 100 se zyada files nahi, to pehle `assets` folder ke ilawa sab upload karein, phir dobara "Add file → Upload files" se `assets` folder daal dein.

---

## 6. Vercel par website chalana (free)

1. **vercel.com** kholein → **Sign Up** → **Continue with GitHub** (wohi GitHub account).
2. Plan poochay to **Hobby** (free) chunein.
3. Dashboard par **Add New… → Project**.
4. List mein `webxeen-site` ke saamne **Import** dabayein. (Repository na dikhe to **Adjust GitHub App Permissions** se Vercel ko us repository ki ijazat dein.)
5. Settings:
   - **Framework Preset:** `Other`
   - **Build Command / Output Directory:** khaali chhor dein
6. **Deploy** dabayein. 20–40 second mein website live ho jayegi aur aik link milega, jaise `webxeen-site.vercel.app`. Use khol kar check karein.

**Baad mein kuch badalna ho:** GitHub par repository kholein → file par click (maslan `config.js`) → upar daayein **pencil (Edit)** → tabdeeli karein → **Commit changes**. Vercel 1 minute mein khud nayi website laga deta hai.

---

## 7. webxeen.com domain jorna (Cloudflare)

**Vercel mein:**
1. Vercel par apna project kholein → **Settings** → baayein taraf **Domains**.
2. **Add Domain** → `webxeen.com` likhein → **Add**.
3. Vercel `www.webxeen.com` add karne ka bhi poochay ga — haan kar dein. Jab poochay ke kaun sa main ho, **`webxeen.com`** ko main rakhein aur **`www.webxeen.com` ko redirect** to `webxeen.com` karein.
4. Ab Vercel aap ko records dikhayega, jaise:
   - `webxeen.com` ke liye **A** record — aik IP address
   - `www` ke liye **CNAME** record — `...vercel-dns...com` jaisi value
   - Yeh values har project ke liye alag ho sakti hain, is liye **jo Vercel dikhaye wohi copy karein.**

**Cloudflare mein:**
1. **dash.cloudflare.com** → Sign in → `webxeen.com` par click.
2. Baayein menu mein **DNS → Records**.
3. Agar `webxeen.com` (Name: `@`) ya `www` ke liye pehle se koi **A, AAAA ya CNAME** record hai to us par **Edit → Delete** kar dein (warna takrao hoga). **MX/TXT (email wale) records mat chhedein.**
4. **Add record**:
   - **Type:** `A` · **Name:** `@` · **IPv4 address:** Vercel wala IP · **Proxy status:** **narangi (orange) baadal ko band** karein, taake grey ho jaye (= **DNS only**) · **Save**
5. Phir **Add record**:
   - **Type:** `CNAME` · **Name:** `www` · **Target:** Vercel wali value · **Proxy status: DNS only** (grey cloud) · **Save**
6. Vercel ke Domains page par wapas jayein. 5 minute se le kar kuch ghanton mein dono domain ke saamne **Valid Configuration** (hara) aa jayega aur SSL (https) Vercel khud laga dega.

> Grey cloud (DNS only) is liye ke Vercel khud SSL aur speed sambhalta hai. Agar baad mein narangi baadal on karna chahein to Cloudflare mein **SSL/TLS → Full (strict)** zaroor rakhein.

---

## 8. Videos ke baare mein

`assets/video/` mein 6 videos hain. Har aik 8–10 second ka, bina awaaz, khud ba khud loop hota hai:

| Video | Kya dikhata hai | Kahan lagi hai |
|---|---|---|
| **A** | Phone mein "2 kurtay chahiye" → AI qeemat batata hai → receipt #ALI-0012 | Sab se upar (hero) |
| **B** | "Qeemat kya hai?" 8 zubaanon mein, jawab bhi usi zubaan mein | Languages |
| **C** | Cart → order details → order number wali receipt print | Orders |
| **D** | Payment screenshot scan → "Looks OK" aur "Amount lower than due" | Payment check |
| **E** | Seller "Paid" dabata hai → customer ko confirmation; "dispatched 18-24" | Seller control |
| **F** | Raat (quiet hours) → subah 8 baje ki list | Morning list |

Har video ki 4 files hain: `-16x9` (computer) aur `-9x16` (mobile), har aik `.mp4` aur `.webm`. Saath mein `-poster.webp` aur `-poster.jpg` (pehla frame).

Videos mein dukan "Ali Garments", log aur bank ("SamplePay") sab farzi hain, phone number `0300-0000000` hai, aur kisi asal company ka logo nahi. Chat ka design aam hara chat app hai, WhatsApp ki copy nahi.

**Kisi video ko apni video se badalna:** nayi video ka naam bilkul wohi rakhein (maslan `b-16x9.mp4`) aur GitHub par purani ki jagah upload kar dein. Size 2 MB se kam rakhein.

Website khud samajh leti hai: computer par 16x9, mobile par 9x16. Videos tab load hoti hain jab user un ke qareeb scroll kare, aur screen se hatte hi ruk jati hain. Jin logon ne phone mein "reduce motion" on kiya ho, ya data saver on ho, unhein sirf poster tasveer dikhti hai.

---

## 9. Testing ke nataij (deliver karne se pehle)

- 360 px (Android phone) aur 1440 px (laptop) par check kiya, koi cheez screen se bahar nahi nikalti.
- Pehli dafa page khulne par (videos se pehle) taqreeban **240 KB** load hota hai. Hero video ke saath taqreeban **680 KB**.
- Har video 200–650 KB (sab 2 MB se kam).
- Lighthouse (Google ka test), local computer par:
  - **Mobile:** Performance 96–97 · Accessibility 100 · Best Practices 100 · SEO 100
  - **Desktop:** Performance 100 · Accessibility 100 · Best Practices 100 · SEO 100
  - Vercel par asal domain par numbers thore mukhtalif ho sakte hain.

---

## 10. Launch se pehle checklist

- [ ] `config.js` mein WhatsApp link, email, privacy (aur terms) daal diye
- [ ] Qeematein sahi hain
- [ ] FAQ ka "data safe" wala jawab apne hisaab se check kar liya
- [ ] Vercel link par website khol kar dono zubaanein (EN / Roman Urdu) aur PKR/USD button check kiye
- [ ] Domain ke saamne Vercel mein "Valid Configuration"
- [ ] Phone par WhatsApp demo button daba kar dekha ke sahi number khulta hai
