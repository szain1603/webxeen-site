# SEO Playbook

Last reviewed: 2026-10-18
(The agent updates this date and the Changelog every run. Rules change only with a source.)

## 1. What actually moves rankings (what good agencies do)

These are the methods that work and that agencies charge for. None of them is secret;
they work because most small sites don't do them consistently.

1. **Topic clusters, not random posts.** Pick a core topic (e.g. "WhatsApp automation for
   shops"). Build one strong pillar page plus 8–15 supporting articles that each answer one
   specific question, all linking to the pillar and to each other.
2. **Search intent first.** Before writing, look at what already ranks for the keyword
   (WebSearch). Match the format people want (how-to, comparison, list, explainer) and
   answer the question in the first 2–3 sentences.
3. **Content gap vs competitors.** Find the 3–5 sites ranking for the target keywords.
   List the questions they answer that this site doesn't, and the questions none of them
   answer well. Write those.
4. **Experience and proof (E-E-A-T).** Use the business's real details: real features,
   real workflow, real examples from its own product, screenshots from the site's own
   videos. Name an author and show "Last updated" dates. Never fake experience.
5. **Internal linking.** Every new page links to and from related pages with descriptive
   anchor text. Orphan pages rank poorly.
6. **Refresh beats new.** Every 3–6 months, update articles that are getting impressions
   but sitting on positions 5–20: improve the answer, add missing sub-questions, update
   the date. This is often the fastest win.
7. **Local and language targeting.** Write for the real audience's words in each market
   (see section 6). Example: in Pakistan, English, Roman Urdu and Urdu-script queries are
   different searches; in the Gulf, Arabic and English are. Separate language
   versions get separate URLs with `hreflang` tags.
8. **Answer-engine optimisation (AI Overviews, ChatGPT/Copilot answers).** Clear question
   headings, a direct 40–60 word answer under each, short lists and tables, consistent
   facts about the brand across the web. This helps both classic results and AI answers.
9. **Technical hygiene.** Text in HTML (not only JavaScript), fast mobile pages, valid
   sitemap, canonical tags, structured data that matches the page.
10. **Digital PR / earned links.** Links that come from being useful: free tools, original
    data the business actually owns, guides other people cite, genuine directory and
    partner listings, interviews, guest posts on relevant sites. The agent can draft
    outreach and find opportunities; the owner sends them.
11. **Programmatic pages, done carefully.** Pages for each real use case (e.g. "WhatsApp
    bot for clothing shops", "...for restaurants") are fine **only** when each page has
    genuinely different, useful content. Never generate near-duplicate pages by swapping
    city or industry names.

## 2. Red lines (never do these — they get sites penalised or removed)

Based on Google's spam policies:
- Buying or selling links, link exchanges at scale, private blog networks (PBNs).
- **Scaled content abuse:** mass-producing pages (AI or not) mainly to rank, with little
  value. AI-written content is allowed; low-value content at scale is not.
- Doorway pages, city/keyword-swap pages, cloaking, hidden text or links, keyword stuffing.
- Fake reviews, fake ratings in structured data, fake authors, fake stats.
- Expired-domain abuse and site-reputation abuse (renting a strong site to host unrelated
  content).
- Structured data that doesn't match visible content.
- **Back button hijacking:** scripts that stop the browser's Back button from leaving the
  site or send visitors to pages they didn't ask for (spam policy, enforced since 15 June 2026).
If a source recommends any of these as a "hidden trick", treat it as a red flag about
that source.

## 3. Technical checklist (every page)

- Unique `<title>` (50–60 chars, keyword near the start, brand at end).
- Meta description (140–160 chars) that states the benefit plainly.
- One `<h1>`; logical `<h2>/<h3>`; `lang` attribute; self-referencing canonical.
- Open Graph + Twitter card tags; image alt text.
- In `sitemap.xml` with correct `lastmod`; not blocked in `robots.txt`.
- Core Web Vitals targets (mobile): LCP < 2.5s, INP < 200ms, CLS < 0.1.
  (INP replaced FID as a Core Web Vital in March 2024.)
- Structured data (JSON-LD):
  - Home: `Organization` + `WebSite`; product: `SoftwareApplication` with `offers`.
  - Articles: `Article` (or `BlogPosting`) with `author`, `datePublished`, `dateModified`.
  - `BreadcrumbList` on articles.
  - FAQ markup: Google stopped showing FAQ rich results for all sites on 7 May 2026 and
    removed FAQ reporting from Search Console. Don't add `FAQPage` markup for Google; a
    visible FAQ section is still useful for readers and AI answers. Existing markup is harmless.
  - HowTo rich results were retired by Google; don't rely on them.
- Bing/Yandex: support IndexNow (a key file at the site root + ping on new pages).

## 4. Content rules for articles

- 900–1,800 words unless the question needs less. Answer first, then detail.
- Structure: H1 = the question/keyword; intro with the direct answer; H2s for each
  sub-question; a short "Webxeen kaise madad karta hai" section only where it genuinely
  fits; a closing call-to-action to the free WhatsApp demo.
- Use the site's real product facts only. Link to the home page's relevant section.
- **Fact-check everything before publishing** (Google, 1 Oct 2026): AI text can contain
  "hallucinations", so check every claim against content.js / config.js by hand — including the
  `<title>`, meta description, structured data and image alt text, not only the body.
- Include at least one practical element: a checklist, a table, a step list, or an example
  chat (fictional shop names, obviously fake numbers like 0300-0000000).
- Write the English version first. If the site has a Roman Urdu section, write a real
  Roman Urdu version (not a word-for-word translation) on its own URL with `hreflang`.
- File naming: `/blog/<slug>/index.html`, lowercase slug with hyphens.
- Reuse the site's existing CSS, fonts, header and footer so articles look native.

## 5. Measurement (owner shares numbers; agent records them in log.md)

- Search Console: clicks, impressions, average position per page, top queries.
- Search Console also has **Generative AI performance reports** (since June 2026) showing how
  the site appears in AI Overviews / AI Mode. Ask the owner to share these numbers too.
- When the owner pastes Search Console data, prioritise: pages with high impressions and
  position 5–20 (refresh), queries with impressions but no matching page (new article).

## 6. International SEO (rank worldwide)

- One domain (`webxeen.com`), languages in subfolders: `/` (English, global), `/ar/`, `/es/`,
  `/ur/` etc. Every version links to all others with `hreflang`, plus `hreflang="x-default"`
  pointing to the English page. Each language version has its own canonical.
- Translate for the market, not word for word: local terms, currency, payment habits and
  examples. Machine-literal translations perform poorly and read as low quality.
- Don't auto-redirect by IP or language; suggest the right version with a visible switch
  instead, so search engine crawlers (mostly US-based) can see every version.
- Global English pages: USD prices, international examples, no country-only jargon.
  Country pages carry the local details.
- Target where competition is beatable: long-tail use-case keywords and non-English
  keywords, where few strong pages exist. Large global companies dominate generic English
  head terms; win around them first.
- Earn links and mentions from several countries (directories, partner sites, guest posts
  in each language market), not only from one country.

## Changelog

- 2026-06-30 — Playbook created from known Google guidance up to June 2026
  (spam policies incl. scaled content / site reputation / expired domain abuse, March 2024;
  INP as Core Web Vital, March 2024; FAQ/HowTo rich result changes, 2023).
  First agent run must check for changes after this date.
- 2026-10-12 — First agent review (sources checked: Google Search Status Dashboard,
  Google Search Central blog, Search Engine Land, Search Engine Roundtable).
  - FAQ rich results retired for all sites (7 May 2026); playbook FAQ rule updated.
    https://developers.google.com/search/docs/appearance/structured-data/faqpage ,
    https://searchengineland.com/google-to-no-longer-support-faq-rich-results-476957
  - New spam policy "back button hijacking" (announced April 2026, enforced from 15 June 2026)
    added to Red lines. https://developers.google.com/search/blog/2026/04/back-button-hijacking
  - Search Console Generative AI performance reports (June 2026) added to Measurement.
    https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports
  - Spam updates on 24 Jun, 18 Aug and 24 Sep 2026 (the last one finished ~8 Oct). No new
    rules from them; existing Red lines already cover what they target.
    https://status.search.google.com/products/rGHU1u87FJnkP6W2GwMi/history
  - Not verified this run (pages could not be fetched): Bing Webmaster blog. No Bing rule changed.
- 2026-10-18 — Review (sources checked: Google Search Central blog, Search documentation updates,
  Google Search Status Dashboard, PPC Land).
  - Google's "Using generative AI content" guide (updated 1 Oct 2026) now says generative models
    predict words rather than retrieve facts, that output may contain hallucinations, and that it is
    critical to manually fact-check all AI-generated content — including titles, meta descriptions,
    structured data and alt text. Added as a rule in section 4. No ranking change came with it.
    https://developers.google.com/search/docs/fundamentals/using-gen-ai-content ,
    https://ppc.land/google-tells-sites-to-manually-factcheck-all-ai-content-before-publishing/
  - Other Search docs updates since 12 Oct (Indexing API quota page, UGC Fresh Data Program, SEO
    learning-path playlists) do not affect this site. Search Status Dashboard: no ranking updates
    listed 10–17 Oct. https://developers.google.com/search/updates
  - Bing Webmaster blog not verified this run (no recent post found in search). No Bing rule changed.
