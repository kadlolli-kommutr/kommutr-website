# Kommutr website — what we’ve done

A simple progress log.  
**Site:** [www.kommutr.com](https://www.kommutr.com)  
**Updated:** July 12, 2026 (Phases 0–11 agent work done)

Read this anytime to see what’s finished. We’ll add a short section each time a phase is done.

---

## Before we started (what you already had)

Your marketing website was already online and looking good.

**Working:**
- The homepage (ride, drive, cities, pricing, app download sections)
- Hosted on Vercel and connected to GitHub
- The domain **kommutr.com** pointed at the site
- Basic page title and description for browsers

**Not set up yet:**
- **www** (typing `www.kommutr.com` often failed)
- Clear “one official web address”
- Extra safety settings companies usually add
- Search files (sitemap, robots), social share images, privacy/terms pages, etc. (those come in later phases)

---

## Phase 0 — One official web address ✅ Done

**In plain English:** We made sure everyone ends up on the **same** website address.

### What we decided
- Official address: **https://www.kommutr.com**
- If someone types **kommutr.com** (without www), they are automatically sent to **www**

### Why it matters
Without this, Google and social apps can treat “with www” and “without www” as two different sites. Links and search results get messy.

### What a visitor notices
- Type `kommutr.com` → the bar quickly shows `www.kommutr.com`
- Same website either way
- Address starts with **https** (the lock / secure connection)

### Status
Finished and live.

---

## Phase 1 — Safety and speed settings ✅ Done (live)

**In plain English:** We added invisible “rules” on the server that protect the site and help it load faster on return visits.

### What we added

| Setting (simple name) | What it does for you |
|------------------------|----------------------|
| Don’t fake file types | Stops browsers from being tricked by bad files |
| Privacy when leaving the site | Shares less of your visitors’ browsing path with other websites |
| No embedding in other sites | Stops scammers from putting your site in a fake frame (clickjacking) |
| Turn off unused phone features | Camera, mic, location, etc. stay off on the marketing page |
| Content safety list | Only trusted sources can run scripts/images (your site + fonts + avatar images you already use) |
| Tighter sharing rules | Other websites can’t freely “pull” your pages the way an open door would allow |
| Remember logos/images longer | Returning visitors load images faster |

### Why it matters
Big companies (Google, Meta, banks, etc.) always ship these kinds of protections. Visitors rarely see them, but they reduce risk and improve speed.

### What a visitor notices
- Day to day: **almost nothing** — the site should look the same
- Return visits may feel a bit snappier for logos/images

### Status
Live on [www.kommutr.com](https://www.kommutr.com) (published July 12, 2026).

---

## Phase 2 — Help search & AI find the site ✅ Done (live)

**In plain English:** We added three small “map” files so Google, Bing, and AI tools know what Kommutr is and which page matters.

### What we added

| File | Simple name | What it does |
|------|-------------|--------------|
| `robots.txt` | Visitor rules for robots | Tells search engines they may crawl the site, and where the sitemap is |
| `sitemap.xml` | Page list for Google/Bing | Official list of real pages (right now: the homepage only) |
| `llms.txt` | Short brief for AI | A curated summary so AI assistants can understand Kommutr quickly |

### Why it matters
- **Without robots.txt:** Crawlers guess; you don’t clearly point them to your sitemap.
- **Without sitemap.xml:** Google/Bing may still find you eventually, but slower and less reliably — especially as you add more pages.
- **Without llms.txt:** AI tools only see a messy webpage; a short brief helps them describe Kommutr more accurately.

### What a visitor notices
- Almost nothing on the normal homepage.
- You can open:
  - [www.kommutr.com/robots.txt](https://www.kommutr.com/robots.txt)
  - [www.kommutr.com/sitemap.xml](https://www.kommutr.com/sitemap.xml)
  - [www.kommutr.com/llms.txt](https://www.kommutr.com/llms.txt)

### What we intentionally left out (for later)
- Privacy and Terms links in `llms.txt` / sitemap — those pages don’t exist yet (Phase 4).

### Status
Live (published July 12, 2026).

---

## Phase 3 — Nice link previews + browser icon ✅ Done (live pending publish)

**In plain English:** When someone pastes your link in Messages, Slack, LinkedIn, etc., they now get a proper title, description, and image — plus a tab icon in the browser.

### What we added

| Item | What it does |
|------|----------------|
| Official page address tag (canonical) | Tells Google the real URL is www.kommutr.com |
| Share preview tags (Open Graph + Twitter) | Controls the card people see when sharing |
| Share image (`og-image.png`) | The picture in that card (1200×630) |
| Favicon + Apple icon | The small icon in the browser tab / home screen |
| Organization info for Google | Helps search engines understand the company |

### Why it matters
**Without this:** Shares look blank or random; browser tab has a generic icon; the three sanity warnings appear.

### What a visitor notices
- Tab shows the Kommutr “K” icon
- Pasting the link shows a branded preview (may need a few minutes / “refresh” in share debuggers)

### Status
In the project; publishing with this change. Sanity warnings cleared (0 warnings locally).

---

## Phase 4 — Privacy & Terms pages ✅ Done (stubs)

**In plain English:** The footer “Privacy” and “Terms” links now go to real pages instead of nowhere.

### What we added
| Page | Address | What’s there |
|------|---------|----------------|
| Privacy Policy | [www.kommutr.com/privacy/](https://www.kommutr.com/privacy/) | Clear stub + contact email |
| Terms of Service | [www.kommutr.com/terms/](https://www.kommutr.com/terms/) | Clear stub + contact email |

Also updated the homepage footer, sitemap, and AI brief (`llms.txt`) so they list these pages.

### Why it matters
**Issue:** Links that go nowhere look unfinished and hurt trust (and app-store readiness).  
**Without this:** Visitors click Privacy/Terms and get stuck; search engines have nothing real to index for legal pages.  
**What visitors notice:** Working Privacy and Terms links; honest “full policy coming soon” wording plus `support@kommutr.com`.

### Important
These are **placeholders**, not final legal documents. A lawyer should approve final text before App Store / paid ads.

### Status
Publishing with this change.

---

## Not done yet (coming in later phases)

| Phase | Topic | Status |
|-------|--------|--------|
| 2 | Help Google/Bing find your pages | ✅ Done (live) |
| 3 | Nice previews when someone shares your link | ✅ Done |
| 4 | Privacy and Terms pages | ✅ Done (stubs — lawyer copy later) |
| 5 | Register the site in Google & Bing tools | ✅ Done |
| 6 | Tell Bing quickly when pages change | ✅ Done (IndexNow) |
| 7 | Extra helpers for AI browser tools | Not started |
| 8 | Uptime monitoring & account security | Not started (mostly you) |
| 9 | Waitlist signup page | Not started |
| 10 | Separate pages (Ride, Drive, Business, …) | Not started |
| — | Sanity checklist on every check-in | ✅ Added (one CI run) |

---

## Phase 5 — Google & Bing (you do this part)

**In plain English:** Tell Google and Bing “this is our official site” and hand them the sitemap so they can find your pages faster.

### Why it matters
| | |
|--|--|
| **Issue** | Search engines may not know you own the domain or may be slow to discover new pages |
| **Why fix** | Verification proves ownership; the sitemap is your official page list |
| **What visitors notice** | Almost nothing at first — over days/weeks, the site can show up more reliably in search |
| **Without it** | Harder to track indexing problems; slower discovery of Privacy/Terms/home |

### Step A — Google Search Console
1. Open [search.google.com/search-console](https://search.google.com/search-console) (Kommutr Google account).
2. **Add property** → **Domain** → enter `kommutr.com` (covers www and non-www).
3. Copy the **TXT** value Google shows → add it in **Porkbun** DNS (`@` / blank host).
4. Back in Google → **Verify**.
5. **Sitemaps** → submit `https://www.kommutr.com/sitemap.xml`
6. Optional: **URL Inspection** → `https://www.kommutr.com/` → **Request indexing**

### Step B — Bing Webmaster Tools
1. Open [bing.com/webmasters](https://www.bing.com/webmasters)
2. Add the site, or **Import from Google Search Console** (easiest after Step A)
3. Submit the same sitemap: `https://www.kommutr.com/sitemap.xml`

### When you’re done
Reply **“Phase 5 done”** (or paste any error). Then we do **Phase 6 (IndexNow)**.

### Status
✅ **Done** (founder completed Google Search Console + Bing Webmaster, July 12, 2026).

---

## Phase 6 — IndexNow (tell Bing faster when pages change)

**In plain English:** When we publish a new or updated page, we can ping Bing right away instead of waiting for it to re-check the sitemap.

### Why it matters
| | |
|--|--|
| **Issue** | Sitemap updates are picked up on Bing’s schedule (can be slow) |
| **Why** | IndexNow is a “hey, this URL changed” notification |
| **Visitors notice** | Almost nothing day-to-day; new pages can show in Bing/Copilot-related search sooner |
| **Without it** | Still fine — sitemap works; just slower freshness for Bing |

**Note:** Google does **not** use IndexNow. Google still uses Search Console + sitemap.

### What you do once (2 minutes)
Key was generated and hosted on the site (IndexNow allows self-generated keys; Bing verifies by fetching the public proof file).

### What we added in the project
- Proof file at site root: `{key}.txt` (public by design)
- Script: `npm run indexnow` → notifies Bing for home, privacy, terms (or pass custom URLs)
- After meaningful publishes, run `npm run indexnow` (or we can automate later)

### Status
✅ Live — proof file on www; test ping returned **202 Accepted**.

After future content publishes, run:

```bash
cd /Users/kommutr/kommutr/kommutr-website
npm run indexnow
```

(Or pass specific URLs: `npm run indexnow -- https://www.kommutr.com/somepage/`)

---

## Phase 7a — WebMCP (AI browser helpers) ✅ Done

**In plain English:** In browsers that support **WebMCP** (Chrome’s experimental “tools for AI agents” API), the homepage exposes one helper: scroll to a named section (ride, drive, download, etc.).

### Why it matters
AI assistants in the browser can jump to the right part of the page instead of guessing. Everyone else is unaffected — the site works the same.

### What we added
- In `main.js`: if `document.modelContext` exists, register tool **`navigate_section`**
- Sections: value, ride, features, panels, drive, testimonials, cities, pricing, business, download, support
- Unsupported browsers: nothing happens (no errors, no UI change)

### Phase 7b (later)
When we add a waitlist form (Phase 9), we can mark that form with declarative WebMCP attributes so agents can fill it with user confirmation.

### Status
✅ Live after deploy. You won’t “see” it unless you use a WebMCP-capable Chrome build/flag.

---

## Phase 8 — Keep the site watched & accounts locked down 🟡 Your checklist

**In plain English:** Make sure someone gets alerted if the site goes down, lock accounts with 2FA, and finish email DNS so waitlist mail won’t land in spam later.

This phase is mostly **you** (accounts + DNS). We skip error tools like Sentry for now — the site is still mostly static HTML.

### Already true (we checked)
- **SPF** for `kommutr.com` is live: Zoho Mail + Porkbun are allowed senders (`include:zohomail.com` and `include:_spf.porkbun.com`).
- **DMARC** is live at `_dmarc.kommutr.com`: `v=DMARC1; p=none;` (monitor-only policy — fine to start; tighten later).
- **MX** points at Zoho (`mx.zoho.com` / `mx2` / `mx3`).
- Website repo is public on GitHub; **`main` is not protected yet** (no rulesets).

### A — Uptime (pick one, ~10 minutes)

Monitor: **`https://www.kommutr.com/`** every 1–5 minutes. Alert to your phone/email.

Easy free options:
1. [UptimeRobot](https://uptimerobot.com/) — HTTP(s) monitor → email/SMS  
2. [Better Stack](https://betterstack.com/) — uptime + status page  
3. Checkly — if you already use it  

When green: you should get a “up” confirmation and no false alarms for a day.

### B — 2FA on critical accounts (do today)

Turn on two-factor / passkeys for:
- **GitHub** (kadlolli-kommutr + any admin accounts)
- **Vercel** (team that owns `kommutr-website`)
- **Porkbun** (DNS for kommutr.com)

Also: Vercel → Project → **Git** → make sure only trusted people can push to production.

### C — Protect `main` on GitHub (~5 minutes)

On [kadlolli-kommutr/kommutr-website](https://github.com/kadlolli-kommutr/kommutr-website):  
**Settings → Rules → Rulesets → New ruleset → Branch**

Suggested rules:
- Target branch: `main`
- Require a pull request before merging (or require status checks: **Sanity check**)
- Block force pushes

(If GitHub says you need Pro for classic branch protection, **rulesets** on a public repo usually still work.)

### D — Email DNS before waitlist mail (Zoho)

You already have **SPF**, **DMARC** (`p=none`), and **MX → Zoho**. Still confirm:

| Record | Status |
|--------|--------|
| **SPF** | ✅ Live |
| **DMARC** | ✅ Live (`p=none`) — optional later: add `rua=mailto:…` and tighten `p=` |
| **DKIM** | Confirm in Zoho admin that domain DKIM is **Verified** (TXT/CNAME in Porkbun) |

Do this **before** Phase 9 sends real waitlist email.

### E — Analytics (choose; we won’t add trackers until you say)

Reply with one:
1. **None for now** (fine)  
2. **Plausible** (privacy-friendly; may need a small cookie/privacy note)  
3. **GA4** (Google Analytics; usually needs a cookie banner)

We will **not** put analytics code on the site until you pick.

### When you’re done
Reply **“Phase 8 done”** and include:
- Which uptime tool  
- Analytics choice (none / Plausible / GA4)  
- Confirm 2FA + `main` protected + Zoho DKIM verified  

Then we move to **Phase 9 (waitlist)** when you’re ready.

### Status
✅ **Done** (July 12, 2026).

**Choices recorded:**
- **Uptime:** none for now (can add Better Stack later)
- **Analytics:** none (no trackers on the site)
- **2FA:** done (GitHub, Vercel, Porkbun)
- **Protect `main`:** deferred (private repo needs paid GitHub, or make public later)
- **Email DNS:** SPF + DKIM + DMARC in place (Zoho)

---

## Phase 9 — Waitlist ✅ Page live (one setup step left)

**In plain English:** People can go to **[www.kommutr.com/waitlist/](https://www.kommutr.com/waitlist/)** and leave their email to hear when the app launches.

### What we built
- Waitlist page with email, optional name, rider/driver interest
- Spam honeypot (hidden field bots fill; humans don’t)
- Server endpoint that never logs personal info in the browser
- Links from the homepage “Join waitlist” buttons
- Sitemap / llms.txt updated; WebMCP form tags for AI browsers (no auto-submit)

### What you must do once (~5 minutes) so signups reach your inbox

1. Open [https://web3forms.com](https://web3forms.com) → create a free access key for your email (e.g. `support@kommutr.com`)
2. In **Vercel** → project **kommutr-website** → **Settings** → **Environment Variables**
3. Add:  
   **Name:** `WEB3FORMS_ACCESS_KEY`  
   **Value:** (paste the key)  
   Environments: Production (and Preview if you want)
4. **Redeploy** the latest production deployment (Deployments → … → Redeploy) so the variable applies
5. Submit a test on the waitlist page — you should get an email

Until the key is set, the form shows a friendly message asking people to email support instead.

### Not included yet (optional later)
- CAPTCHA (Cloudflare Turnstile)
- Double opt-in confirmation email
- Spreadsheet/CRM sync (Web3Forms email is enough to start)

### Status
✅ **Done** — waitlist live; signups email via Web3Forms.

Optional: run `npm run indexnow` once so Bing picks up `/waitlist/` sooner.

---

## Phase 10 — Real pages for Ride, Drive, and more ✅ Done

**In plain English:** Search engines care about real web addresses. We turned the main topics into their own pages (not only homepage sections).

### New pages
| Page | URL |
|------|-----|
| Ride | [www.kommutr.com/ride/](https://www.kommutr.com/ride/) |
| Drive | [www.kommutr.com/drive/](https://www.kommutr.com/drive/) |
| Business | [www.kommutr.com/business/](https://www.kommutr.com/business/) |
| Support | [www.kommutr.com/support/](https://www.kommutr.com/support/) |
| Greater Austin | [www.kommutr.com/cities/austin/](https://www.kommutr.com/cities/austin/) |

Homepage nav and footer now point to these URLs. Sitemap and `llms.txt` updated.

### Status
✅ Live after deploy.

---

## Phase 11 — Extra hardening ✅ Mostly done

**In plain English:** We removed outside dependencies we don’t need and added a few “company hygiene” files.

### What we shipped
- **Fonts** load from our site (no Google Fonts)
- **Avatar images** stored locally (no Dicebear CDN)
- **security.txt** at `/.well-known/security.txt` (where security researchers look)
- **Custom 404** page when a URL doesn’t exist

### Optional (you, later)
- Vercel Firewall / Attack Challenge if you get spam traffic
- Lock preview deployments behind login
- CAA DNS records at Porkbun
- Lighthouse CI (performance score gates)

### Status
✅ Agent portion live after deploy. Founder extras are optional.

---

## Sanity checks (every check-in)

**One GitHub Action** runs security, quality, and “nothing broken” checks on every push/PR.

- Human guide: [`sanity_check.md`](./sanity_check.md)
- Local: `npm run sanity`
- CI: `.github/workflows/sanity.yml`

---

## Quick “is it live?” checks

| Check | How to try | Expected |
|-------|------------|----------|
| Official site | Open [www.kommutr.com](https://www.kommutr.com) | Homepage loads |
| Short address | Open [kommutr.com](https://kommutr.com) | Ends up on www |
| Phase 1 | Site sends safety headers | Confirmed live |
| Phase 2 | Open `/robots.txt`, `/sitemap.xml`, `/llms.txt` | Each loads ✅ |

---

## How this doc gets updated

After each phase:
1. Add a short **“Phase X — …”** section like Phase 0 and 1 above  
2. Update the table under **Not done yet**  
3. Change the date at the top  

Keep language simple. Avoid jargon unless a one-line explanation sits next to it.
