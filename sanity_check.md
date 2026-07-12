# Website sanity checks — what runs on every check-in

**Site:** Kommutr marketing site  
**How it runs:** **One GitHub Action** (`.github/workflows/sanity.yml`) with **one job** and many steps.  
**Locally:** `npm run sanity` or `bash scripts/sanity-check.sh`

---

## Should we use one run or many?

**Use one run.** For this small static site that is the right choice.

| Approach | When to use |
|----------|-------------|
| **One workflow, one job** (what we have) | Fast feedback, easy to understand, enough for HTML/CSS/JS |
| Split into many workflows | Only later, if one step becomes slow (e.g. heavy Lighthouse) or needs special secrets |

So: **one green/red check on every push and pull request.**

---

## What the checklist covers

### Security
- [x] Required security headers still listed in `vercel.json`
- [x] CORS not left open as `*`
- [x] No obvious secret/API key patterns in repo files
- [x] Extra secret scan (Gitleaks) in CI
- [x] No `http://kommutr.com` links (must be `https://www…`)

### Quality
- [x] Required files exist (`index.html`, `robots.txt`, `sitemap.xml`, `llms.txt`, …)
- [x] `vercel.json` / `package.json` are valid JSON
- [x] Homepage has DOCTYPE, language, title, description
- [x] `llms.txt` has a basic valid shape
- [x] Asset files are not huge (warn &gt;1MB, fail &gt;2MB)
- [x] Share tags / favicon — **warning until Phase 3** (then they should pass)

### No broken code / links
- [x] `main.js` passes a syntax check
- [x] WebMCP `navigate_section` registration present in `main.js` (Phase 7a)
- [x] Local `href` / `src` files actually exist
- [x] Every URL in `sitemap.xml` maps to a real file
- [x] Discoverability files use the official **www** address
- [x] Privacy & Terms pages exist (`privacy/index.html`, `terms/index.html`) — Phase 4
- [x] Waitlist page + API + honeypot (`waitlist/`, `api/waitlist.js`) — Phase 9

---

## What it does *not* do yet (optional later)

- Full accessibility lab (axe) on every PR  
- Lighthouse score gates  
- Live curl of production after deploy (can add a small post-deploy smoke later)  
- Visual screenshot diffs  

Add those only if the site grows and you want stricter gates.

---

## How to run

```bash
cd /Users/kommutr/kommutr/kommutr-website
npm run sanity
```

On GitHub: open the repo → **Actions** → **Sanity check**.

- **Pass** = safe to merge  
- **Fail** = fix before merging  
- **Warnings** = OK for now (e.g. waiting on Phase 3 Open Graph), but plan to clear them
