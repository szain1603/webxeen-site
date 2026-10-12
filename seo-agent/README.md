# SEO Agent — aasaan guide (Roman Urdu)

Yeh folder aap ke SEO agent ka "dimagh" hai. Agent har hafte khud chalta hai.

## Agent kya karta hai
1. Pehle check karta hai ke Google ne apne qawaneen mein koi tabdeeli to nahi ki.
   Agar ki ho to `playbook.md` khud update karta hai, aur source ka link bhi likhta hai.
2. Aap ki website check karta hai: title, speed, sitemap, links waghera.
3. Aik kaam karta hai, jaise naya article ya koi technical fix.
4. GitHub par **Pull Request** banata hai. Website par tab tak kuch nahi jata jab tak aap
   approve na karein.

## Approve kaise karein
1. GitHub par `webxeen-site` kholein, phir upar **Pull requests** par click karein.
2. Agent wala PR kholein aur description parhein.
3. Theek lage to neeche hara **Merge pull request** dabayein, phir **Confirm merge**.
4. Vercel 1 minute mein website update kar dega.
Pasand na aaye to **Close pull request** daba dein, kuch live nahi hoga.

## Nayi website add karna
1. Us website ki repository GitHub par honi chahiye, aur aap ko us ka access hona chahiye.
2. `sites.json` mein nayi entry daalein, ya Claude se keh dein ke add kar de.
3. `"approved": true` sirf tab likhein jab website ke maalik ki ijazat ho.

## Files
- `AGENT.md` — agent ki hidayaat
- `playbook.md` — SEO ke tareeqay (agent khud update karta hai)
- `sites.json` — websites ki list aur har website ke agle kaam
- `log.md` — har hafte ka record
