# Kommutr.com — website plan (discovery + hosting)

Updated: **2026-07-12**  
Repo: [`kadlolli-kommutr/kommutr-website`](https://github.com/kadlolli-kommutr/kommutr-website)  
Live: [https://www.kommutr.com](https://www.kommutr.com) (Vercel `kommutr-website`)  
DNS: Porkbun  

**Canonical host (locked):** `https://www.kommutr.com`  
Apex `https://kommutr.com` → **308** → `https://www.kommutr.com` (Vercel Domains).  
Use **www** in sitemap, OG, GSC URL inspection, `llms.txt`, IndexNow, and all internal absolute links.

---

## How to use this doc

Work is split into **phases**. Each phase is sized so an agent can finish it in one session.

| Tag | Meaning |
|-----|---------|
| **Agent** | Cursor/agent can implement in the repo and push |
| **Founder** | Needs human: DNS, Search Console, legal, accounts, secrets |
| **Blocked** | Depends on a prior phase or founder input |

Execute phases in order unless noted. After each **Agent** phase: commit → push `main` → confirm Vercel deploy → curl the live URLs.

---

## Executive audit (current live site)

| Area | Status |
|------|--------|
| Hosting | Vercel + Git OK; www primary; apex 308 |
| Pages | Single `index.html` + `#` sections only |
| `robots.txt` / `sitemap.xml` / `llms.txt` | **404** |
| Open Graph / canonical / favicon | **Missing** / favicon **404** |
| Security headers | HSTS + `nosniff` only; **`Access-Control-Allow-Origin: *`** present (remove) |
| CSP / Referrer / Permissions / frame | **Missing** |
| GSC / Bing / IndexNow | Assume not done |
| Privacy / Terms URLs | **Missing** (footer placeholders) |
| WebMCP | Phase 7a ✅ (`navigate_section`); 7b with waitlist |
| Monitoring / analytics | Phase 8 ✅ — no uptime tool / no analytics for now; 2FA + email DNS done |

---

## Page tree

### Today (hash-only)

```text
https://www.kommutr.com/
├── #value #ride #features #panels #drive #testimonials
├── #cities #pricing #business #download #support
└── footer Terms/Privacy → # (not real pages)
```

### Target

```text
https://www.kommutr.com/
├── /                      Home
├── /ride/ /drive/ /business/ /support/ /cities/austin/
├── /waitlist/
├── /privacy/ /terms/
├── /robots.txt /sitemap.xml /llms.txt
└── /{indexnow-key}.txt
```

Search engines index **URLs**, not `#anchors`. Do not put fragments in `sitemap.xml`.

---

# Phases (agent-executable)

## Phase 0 — Canonical & baseline (docs only)

**Owner:** Agent  
**Depends on:** none (www redirect already live)  
**Status:** ✅ **DONE** (verified 2026-07-12 — apex `308` → `https://www.kommutr.com/`, www `200`)

### Scope
- Treat this file as source of truth: canonical = **www**
- No code required if Domains panel already shows www Production + apex 308

### Acceptance
- [x] Apex 308 → www (verified 2026-07-12)
- [x] All later phases use `https://www.kommutr.com/...` only (locked in this doc)

---

## Phase 1 — Security headers & caching

**Owner:** Agent  
**Depends on:** Phase 0  
**Files:** `vercel.json`  
**Status:** ✅ **DONE (live)** — verified 2026-07-12 on www.kommutr.com

### Why (commercial hosting)
Google/Meta-class sites ship a standard header set at the edge: CSP, clickjacking defense, referrer control, permissions lockdown, no accidental CORS `*`.

### Scope
1. Update `vercel.json`:
   - Keep `X-Content-Type-Options: nosniff`
   - Add `Referrer-Policy: strict-origin-when-cross-origin`
   - Add `X-Frame-Options: DENY` (or CSP `frame-ancestors 'none'`)
   - Add `Permissions-Policy` (disable unused: camera, mic, geolocation, payment, etc. on marketing site)
   - Add starter `Content-Security-Policy` allowing self + current third parties (Google Fonts, `api.dicebear.com`) — tighten later if fonts are self-hosted
   - Replace open CORS `*` with `Access-Control-Allow-Origin: https://www.kommutr.com`
2. Long-cache static assets:
   - `/assets/(.*)` → `Cache-Control: public, max-age=31536000, immutable` (or high max-age)
   - HTML stays short/no-store or `max-age=0, must-revalidate`
3. Plain-text Content-Type for `robots.txt`, `llms.txt`, `*.txt`

### Out of scope
- WAF / bot fight UI (Founder enables in Vercel dashboard if needed)
- Self-hosting fonts (optional Phase 1b later)

### Acceptance
- [x] `curl -sI https://www.kommutr.com/` shows Referrer-Policy, frame defense, Permissions-Policy, CSP
- [x] CORS is not `*` (site origin only)
- [x] `/assets/*` cache headers stronger than HTML

---

## Phase 2 — Discoverability files

**Owner:** Agent  
**Depends on:** Phase 0  
**Files:** `robots.txt`, `sitemap.xml`, `llms.txt`  
**Status:** ✅ **DONE (live)** — verified 2026-07-12 on www.kommutr.com

### Scope
1. **`robots.txt`** — `Allow: /`, `Sitemap: https://www.kommutr.com/sitemap.xml`  
   - GPTBot / Google-Extended: leave Allow for now; Legal can tighten later
2. **`sitemap.xml`** — Phase 2 lists homepage only; expand in Phase 4+
3. **`llms.txt`** — per [llmstxt.org](https://llmstxt.org/): H1, blockquote, `##` sections, absolute **www** URLs  
   - Privacy/Terms links added in Phase 4 when those pages exist

### Acceptance
- [x] `https://www.kommutr.com/robots.txt` → 200
- [x] `https://www.kommutr.com/sitemap.xml` → 200, only real URLs
- [x] `https://www.kommutr.com/llms.txt` → 200, valid structure

---

## Phase 3 — Open Graph, canonical, icons, JSON-LD

**Owner:** Agent  
**Depends on:** Phase 0  
**Files:** `index.html`, `assets/og-image.png`, `assets/favicon.ico`, `assets/favicon-32.png`, `assets/apple-touch-icon.png`  
**Status:** ✅ **DONE** — sanity warnings cleared; live after this publish

### Scope
1. `<link rel="canonical" href="https://www.kommutr.com/" />`
2. Full `og:*` + `twitter:card=summary_large_image` (absolute www image URLs)
3. Create **1200×630** `assets/og-image.png` (PNG/JPG — not SVG-only)
4. Favicon + apple-touch-icon links (stop favicon 404)
5. Optional Organization JSON-LD with www URLs (+ CSP script hash)
6. Footer: do not leave Terms/Privacy as dead `#` once Phase 4 exists

### Acceptance
- [x] View-source shows canonical + OG + Twitter
- [x] `assets/og-image.png` present (1200×630)
- [x] Favicon linked
- [ ] Sharing debugger preview OK after deploy (Founder can re-scrape caches)
- [x] `npm run sanity` → 0 warnings for Phase 3 items

---

## Phase 4 — Legal stub pages

**Owner:** Agent (stubs) + **Founder/Legal** (final copy)  
**Depends on:** Phase 2–3 recommended first  
**Files:** `privacy/index.html`, `terms/index.html`  
**Status:** ✅ **DONE (stubs live after publish)** — replace with attorney copy before store launch

### Scope
1. Real URLs: `/privacy/`, `/terms/`
2. Minimal branded layout consistent with home (header/footer, canonical, OG)
3. Stub body is OK initially: “Policy coming soon” + `support@kommutr.com` — **better than `#`**
4. Update homepage footer links
5. Add both URLs to `sitemap.xml` + `llms.txt`

### Acceptance
- [x] `/privacy/` and `/terms/` pages exist
- [x] Footer links work
- [x] Sitemap lists both
- [ ] Attorney-approved final copy (Founder/Legal)

### Founder follow-up
- Replace stubs with attorney-approved policies before App Store / paid ads

---

## Phase 5 — Search Console & Bing (founder)

**Owner:** Founder  
**Depends on:** Phase 2 live (`sitemap.xml` 200)  
**Blocked for Agent:** needs Google/Bing login + Porkbun DNS

### Google Search Console
1. Domain property `kommutr.com` (covers apex + www)
2. Verify via Porkbun **TXT**
3. Submit sitemap: `https://www.kommutr.com/sitemap.xml`
4. URL Inspection → `https://www.kommutr.com/` → Request indexing  
Note: Google’s old sitemap **ping URL is deprecated** — use GSC only.

### Bing Webmaster Tools
1. Add site (or import from GSC)
2. Submit same sitemap
3. Confirm `robots.txt` Sitemap line

### Acceptance
- [x] GSC verified; sitemap Success (founder)
- [x] Bing verified; sitemap OK (founder)

---

## Phase 6 — IndexNow

**Owner:** Agent (files/script) + Founder (key from Bing)  
**Depends on:** Phase 5 Bing verified  
**Status:** ✅ **DONE** — key proof file + `npm run indexnow`; ping after deploy

### Scope
1. Generate IndexNow key; host `{key}.txt` at site root (body = key only)  
2. Script `scripts/indexnow.mjs` POSTs to `https://api.indexnow.org/indexnow`  
3. Host: `www.kommutr.com`  
4. Ping only on real content changes (not scheduled spam)

### Acceptance
- [x] Key file in repo  
- [x] Key URL → 200 text/plain (live)  
- [x] Test POST → 202 Accepted (IndexNow OK)  

---

## Phase 7 — WebMCP (agent tools)

**Owner:** Agent  
**Depends on:** none (progressive enhancement)  
**Files:** `main.js`, later waitlist form HTML  
**Refs:** [WebMCP](https://developer.chrome.com/docs/ai/webmcp), [Declarative](https://developer.chrome.com/docs/ai/webmcp/declarative-api), [Imperative](https://developer.chrome.com/docs/ai/webmcp/imperative-api)

### Phase 7a — Imperative (do with current one-pager)
**Status:** ✅ **DONE** (2026-07-12) — in `main.js`

- Feature-detect `document.modelContext` (fallback `navigator.modelContext`)
- Register `navigate_section` for `#value` `#ride` `#features` `#panels` `#drive` `#testimonials` `#cities` `#pricing` `#business` `#download` `#support`
- No-op on unsupported browsers (try/catch + feature detect)

### Phase 7b — Declarative (with waitlist — Phase 9)
- Form attrs: `toolname`, `tooldescription`, `toolparamdescription`
- Avoid `toolautosubmit` for email capture

### Acceptance
- [x] Tools register when Chrome WebMCP / `document.modelContext` is available (feature-detect)
- [x] Unsupported browsers unchanged
- [x] Phase 7b deferred until waitlist form (Phase 9) → done with `join_waitlist`

---

## Phase 8 — Observability & account hardening

**Owner:** Founder (+ Agent only after you pick analytics)  
**Depends on:** Phase 1–4 preferred  
**Status:** ✅ **DONE** (2026-07-12) — founder completed checklist

### Scope (commercial baseline)
| Item | Action | Status notes (2026-07-12) |
|------|--------|---------------------------|
| Uptime | Better Stack / Checkly / UptimeRobot / Vercel monitoring on `https://www.kommutr.com/` | **Skipped for now** (Founder choice) |
| Errors | Optional Sentry (only if JS grows) | **Skip for now** — static site |
| Analytics | Plausible or GA4 — **Founder chooses**; cookie banner if required | **None** (Founder choice) |
| Access | 2FA on Porkbun, Vercel, GitHub; protect `main` | 2FA done; `main` ruleset deferred (private repo / paid later) |
| DNS email | SPF / DKIM / DMARC before waitlist mail | **SPF + DKIM + DMARC live** (MX → Zoho) |

### Agent portion (only if Founder picks a tool)
- Add analytics script with CSP update in Phase 1 headers
- Do not add trackers without explicit approval — **none selected**

### Acceptance
- [x] Uptime decision recorded (**none** for now)
- [x] 2FA confirmed on critical accounts
- [ ] `main` protected — deferred (paid GitHub or public repo later)
- [x] SPF + DKIM + DMARC confirmed
- [x] Analytics decision recorded (**none**)

---

## Phase 9 — Waitlist page + form hardening

**Owner:** Agent + Marketing + Founder  
**Depends on:** Phase 4, Phase 7a; Legal/Marketing copy for waitlist  
**Status:** ✅ **DONE** (2026-07-12) — live submits via Web3Forms (browser) + `WEB3FORMS_ACCESS_KEY`

### Scope
1. `/waitlist/` page + form — ✅  
2. Server endpoint `/api/waitlist` (honeypot, validation, Web3Forms forward) — ✅  
3. Declarative WebMCP tags on form (`join_waitlist`, no `toolautosubmit`) — ✅  
4. Update sitemap + llms.txt + IndexNow defaults — ✅  
5. CSP hash for waitlist JSON-LD — ✅  
6. Turnstile / double opt-in — deferred (add when volume or compliance needs it)

### Founder (required for E2E)
1. Create free key at [web3forms.com](https://web3forms.com) (use `support@kommutr.com` or your inbox)
2. Vercel → Project `kommutr-website` → Settings → Environment Variables →  
   `WEB3FORMS_ACCESS_KEY` = (your key) for Production (+ Preview)
3. Redeploy (or push any commit) so the env is live
4. Test submit on https://www.kommutr.com/waitlist/

### Acceptance
- [x] Page live at `/waitlist/`
- [x] Abuse controls: honeypot + server validation + no PII client logs
- [x] End-to-end submit works (Web3Forms + Vercel env)
- [x] No PII in client-side logs

---

## Phase 10 — Multi-page IA

**Owner:** Agent + Marketing  
**Depends on:** Phase 3–4  
**Status:** ✅ **DONE** (2026-07-12)

### Scope
Split real URLs: `/ride/`, `/drive/`, `/business/`, `/support/`, `/cities/austin/`  
Per-page canonical + OG; expand sitemap + llms.txt; IndexNow on publish.

### Acceptance
- [x] Each path 200 with unique title/description
- [x] Sitemap complete for shipped URLs

---

## Phase 11 — Optional hardening (later)

**Owner:** Agent / Founder as needed  
Skip until traffic or compliance demands it.

- Self-host fonts (drop Google Fonts from CSP)
- Replace Dicebear with local assets
- `/.well-known/security.txt`
- Vercel Attack Challenge / WAF
- Preview-only robots noindex
- Custom `404.html`
- GitHub Action: Lighthouse CI on PRs
- Domain lock + CAA DNS records

---

# Reference (kept for depth)

## A. What `website.md` originally covered
Page tree, llms.txt, WebMCP, GSC, Bing, Open Graph, IndexNow — still valid; URLs updated to **www**.

## B. Hosting gaps companies also plan for
Mapped into phases above: security headers (1), caching (1), legal URLs (4), search consoles (5), IndexNow (6), monitoring/DNS email (8), form abuse (9), supply-chain/WAF (11).

## C. `robots.txt` template

```txt
User-agent: *
Allow: /

Sitemap: https://www.kommutr.com/sitemap.xml
```

## D. `sitemap.xml` template (grows by phase)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.kommutr.com/</loc>
    <lastmod>2026-07-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

## E. Sources
- https://llmstxt.org/  
- https://developer.chrome.com/docs/ai/webmcp  
- https://developer.chrome.com/docs/ai/webmcp/declarative-api  
- https://developer.chrome.com/docs/ai/webmcp/imperative-api  
- https://www.indexnow.org/documentation  
- https://ogp.me/  
- https://support.google.com/webmasters/answer/9008080  
- https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping  
- https://blogs.bing.com/webmaster/July-2025/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search  

---

## Suggested next command to the agent

> Implement **Phase 1** and **Phase 2** from `website.md`, then push to `main`.

Then: Phase 3 → Phase 4 → Founder does Phase 5 → continue.

---

*Phases 1–4, 6 (files), 7a, and 10 are designed for agent implementation. Phases 5, 8 (accounts), and legal final copy require the founder.*
