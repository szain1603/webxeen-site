#!/usr/bin/env node
/*
  Pre-render the English home page into index.html so search engines see every word
  without running JavaScript. content.js and config.js stay the source of truth:
  in the browser, main.js rebuilds the same sections from them (and the language toggle
  keeps working). Re-run this after any change to content.js or config.js:

    npm i --no-save jsdom@24   (once, anywhere on NODE_PATH)
    node seo-agent/tools/prerender.js

  Only the part of index.html between the skip link and <noscript> is rewritten.
*/
'use strict';
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = path.resolve(__dirname, '..', '..');
const file = path.join(ROOT, 'index.html');
const src = fs.readFileSync(file, 'utf8');

const START = '<a class="skip" href="#main">Skip to content</a>';
const END = '<noscript>';
const a = src.indexOf(START), b = src.indexOf(END);
if (a < 0 || b < 0 || b < a) throw new Error('index.html markers not found');

const dom = new JSDOM(src, { url: 'https://webxeen.com/', runScripts: 'outside-only', pretendToBeVisual: true });
const w = dom.window;
w.matchMedia = () => ({ matches: false, addListener() {}, addEventListener() {} });
w.WEBXEEN_PRERENDER = true;
for (const s of ['config.js', 'content.js', 'assets/js/main.js']) {
  w.eval(fs.readFileSync(path.join(ROOT, s), 'utf8'));
}
const d = w.document;
const header = d.querySelector('header.nav').outerHTML;
const main = d.querySelector('main#main').outerHTML;
const footer = d.querySelector('footer.foot').outerHTML;

const region = START + '\n\n' + header + '\n\n' + main + '\n\n<!-- 14. FOOTER ==================================================== -->\n' + footer + '\n\n';
const out = src.slice(0, a) + region + src.slice(b);
fs.writeFileSync(file, out);

// quick report
const words = (d.querySelector('main').textContent.match(/\S+/g) || []).length;
console.log('prerendered index.html: ' + words + ' words in <main>, ' + d.querySelectorAll('h1').length + ' h1, ' + d.querySelectorAll('h2').length + ' h2');
