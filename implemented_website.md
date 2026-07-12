# Kommutr website — what we’ve done

A simple progress log.  
**Site:** [www.kommutr.com](https://www.kommutr.com)  
**Updated:** July 12, 2026 (Phases 0–2 live)

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

## Not done yet (coming in later phases)

| Phase | Topic | Status |
|-------|--------|--------|
| 2 | Help Google/Bing find your pages | ✅ Done (live) |
| 3 | Nice previews when someone shares your link (image + tags) | Not started |
| 4 | Privacy and Terms pages | Not started |
| 5 | Register the site in Google & Bing tools | Not started (needs you to log in) |
| 6 | Tell Bing quickly when pages change | Not started |
| 7 | Extra helpers for AI browser tools | Not started |
| 8 | Uptime monitoring & account security | Not started (mostly you) |
| 9 | Waitlist signup page | Not started |
| 10 | Separate pages (Ride, Drive, Business, …) | Not started |
| — | Sanity checklist on every check-in | ✅ Added (one CI run) |

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
