/* =====================================================================
   WEBXEEN SETTINGS — prices and links live ONLY in this file.
   Change a number or a link here, save, and upload again. That's it.
   ===================================================================== */
window.WEBXEEN_CONFIG = {

  /* ---- Links: replace the {{...}} placeholders ---------------------- */
  links: {
    // Example: 'https://wa.me/923001234567?text=Hi%20Webxeen%2C%20I%20want%20a%20demo'
    demoWhatsApp: 'https://wa.me/923164308893?text=Assalam%20o%20Alaikum%2C%20mujhe%20Webxeen%20ka%20free%20demo%20chahiye',
    // Example: 'hello@webxeen.com'
    contactEmail: 'hello@webxeen.com',
    // Example: 'https://webxeen.com/privacy'
    privacy: '/privacy',
    // Optional. Example: 'https://webxeen.com/terms'
    terms: '/terms'
  },

  /* ---- Prices --------------------------------------------------------- */
  pricing: {
    // 'auto' = PKR for visitors in Pakistan (by their device time zone) and on the Roman Urdu
    // page, USD for everyone else. 'pk' always shows PKR first, 'abroad' always shows USD first.
    // The visitor can still switch with the PKR/USD buttons.
    defaultRegion: 'auto',
    trialDays: 7,
    yearlyFreeMonths: 2,
    extraReplyPrice: 'Rs 1.5',
    // Price per extra reply for USD visitors, e.g. 'USD 0.01'. Empty = the text says
    // "a small fee" instead of a number.
    extraReplyPriceUSD: '',
    plans: [
      { id: 'silver',  monthlyPKR: 5000, setupPKR: 3000,  monthlyUSD: 29,  popular: false },
      { id: 'gold',    monthlyPKR: 10000, setupPKR: 5000,  monthlyUSD: 59,  popular: true  },
      { id: 'premium', monthlyPKR: 18000, setupPKR: 10000, monthlyUSD: 119, popular: false }
    ]
  }
};
