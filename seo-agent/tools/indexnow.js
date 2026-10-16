#!/usr/bin/env node
/*
  Tell Bing, Yandex, Seznam, Naver (IndexNow) that pages on webxeen.com changed.
  The key file /e21cc142480f44c4c42672b747d0ff45.txt at the site root proves we own the site.

    node seo-agent/tools/indexnow.js https://webxeen.com/blog/some-article ...
    node seo-agent/tools/indexnow.js --changed <old-git-sha>   (URLs whose sitemap entry changed)
    node seo-agent/tools/indexnow.js --all                     (every URL in sitemap.xml)

  Runs automatically from .github/workflows/indexnow.yml after sitemap.xml changes on main.
  Needs Node 18+ (built-in fetch). Exit code 0 = accepted (HTTP 200/202).
*/
'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const HOST = 'webxeen.com';
const KEY = 'e21cc142480f44c4c42672b747d0ff45';
const ROOT = path.resolve(__dirname, '..', '..');

// Map of <loc> -> full <url> block text, so any change (lastmod, hreflang) counts.
function entries(xml) {
  const map = new Map();
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = (m[1].match(/<loc>\s*([^<\s]+)\s*<\/loc>/) || [])[1];
    if (loc) map.set(loc, m[1].replace(/\s+/g, ' ').trim());
  }
  return map;
}

function urlsFromArgs(argv) {
  const now = entries(fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8'));
  if (argv[0] === '--all') return [...now.keys()];
  if (argv[0] === '--changed') {
    let old = new Map();
    try { old = entries(execSync('git show ' + argv[1] + ':sitemap.xml', { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })); } catch (e) { /* no old sitemap: all URLs are new */ }
    return [...now].filter(([loc, block]) => old.get(loc) !== block).map(([loc]) => loc);
  }
  return argv;
}

async function main() {
  const urls = [...new Set(urlsFromArgs(process.argv.slice(2)))].filter((u) => new URL(u).hostname === HOST);
  if (!urls.length) { console.log('IndexNow: nothing to submit.'); return; }
  const body = { host: HOST, key: KEY, keyLocation: 'https://' + HOST + '/' + KEY + '.txt', urlList: urls };
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: JSON.stringify(body)
  });
  console.log('IndexNow: HTTP ' + res.status + ' for ' + urls.length + ' URL(s):\n  ' + urls.join('\n  '));
  if (res.status !== 200 && res.status !== 202) process.exit(1);
}
main().catch((e) => { console.error(e); process.exit(1); });
