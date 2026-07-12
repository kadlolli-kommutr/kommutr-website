# Kommutr website — what we’ve done

A simple progress log.  
**Site:** [www.kommutr.com](https://www.kommutr.com)  
**Updated:** July 12, 2026 (Phases 0–4)

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
