#!/usr/bin/env bash
# Kommutr website — local + CI sanity checks (one run, many steps)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
SCRIPTS="$ROOT/scripts"

PASS=0
FAIL=0
WARN=0

green() { printf '  OK  %s\n' "$*"; PASS=$((PASS + 1)); }
red() { printf '  FAIL %s\n' "$*"; FAIL=$((FAIL + 1)); }
yellow() { printf '  WARN %s\n' "$*"; WARN=$((WARN + 1)); }
section() { printf '\n== %s ==\n' "$*"; }

# --- 1. Required files ---
section "1. Required files exist"
REQUIRED=(
  index.html styles.css main.js waitlist.js vercel.json 404.html
  robots.txt sitemap.xml llms.txt package.json
  privacy/index.html terms/index.html waitlist/index.html
  ride/index.html drive/index.html business/index.html support/index.html
  cities/austin/index.html
  api/waitlist.js
  assets/fonts.css
  .well-known/security.txt
)
for f in "${REQUIRED[@]}"; do
  if [[ -f "$f" ]]; then green "$f"; else red "missing $f"; fi
done

# --- 2. Valid JSON ---
section "2. Valid JSON"
if python3 -m json.tool vercel.json >/dev/null; then
  green "vercel.json parses"
else
  red "vercel.json is invalid JSON"
fi
if python3 -m json.tool package.json >/dev/null; then
  green "package.json parses"
else
  red "package.json is invalid JSON"
fi

# --- 3. Security headers ---
section "3. Security headers in vercel.json"
for needle in \
  "X-Content-Type-Options" \
  "Referrer-Policy" \
  "X-Frame-Options" \
  "Permissions-Policy" \
  "Content-Security-Policy" \
  "Access-Control-Allow-Origin"
do
  if grep -q "$needle" vercel.json; then
    green "header present: $needle"
  else
    red "header missing from vercel.json: $needle"
  fi
done
if grep -q '"value": "\*"' vercel.json; then
  red "CORS must not be wildcard *"
elif grep -q 'https://www.kommutr.com' vercel.json; then
  green "CORS locked to www.kommutr.com"
fi
if grep -q 'max-age=31536000' vercel.json; then
  green "asset long-cache configured"
else
  red "asset Cache-Control long-cache missing"
fi

# --- 4. Secrets ---
section "4. No secrets in tree"
SECRET_HITS=0
while IFS= read -r -d '' f; do
  case "$f" in
    ./node_modules/*|./.git/*|./.vercel/*|./scripts/*) continue ;;
  esac
  if grep -Eiq \
    'BEGIN (RSA |OPENSSH |EC )?PRIVATE KEY|AWS_SECRET_ACCESS_KEY|sk_live_[A-Za-z0-9]+|ghp_[A-Za-z0-9]{20,}' \
    "$f" 2>/dev/null; then
    red "possible secret pattern in $f"
    SECRET_HITS=$((SECRET_HITS + 1))
  fi
done < <(find . -type f \( \
  -name '*.html' -o -name '*.js' -o -name '*.json' -o -name '*.md' \
  -o -name '*.txt' -o -name '*.yml' -o -name '*.yaml' -o -name '.env*' \
\) ! -path './.git/*' ! -path './node_modules/*' ! -path './scripts/*' -print0 2>/dev/null)
if [[ "$SECRET_HITS" -eq 0 ]]; then
  green "no obvious secret patterns in scanned files"
fi
if [[ -f .env.local ]] || [[ -f .env ]]; then
  if git check-ignore -q .env.local 2>/dev/null || git check-ignore -q .env 2>/dev/null; then
    green ".env files are gitignored"
  else
    yellow ".env file present — confirm it is gitignored"
  fi
fi

# --- 5. HTTPS / www ---
section "5. HTTPS + www canonical in content"
# Scan site content only (not docs/scripts that mention http:// as examples)
HTTP_HITS="$(grep -RIn --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=scripts \
  --exclude='sanity_check.md' --exclude='implemented_website.md' --exclude='website.md' \
  -E 'http://(www\.)?kommutr\.com' . 2>/dev/null || true)"
if [[ -n "$HTTP_HITS" ]]; then
  red "found insecure kommutr.com links (must use https://www.kommutr.com)"
  printf '%s\n' "$HTTP_HITS" | head -20
else
  green "no insecure kommutr.com links in site files"
fi
if grep -q 'https://www.kommutr.com' sitemap.xml robots.txt llms.txt; then
  green "discoverability files use https://www.kommutr.com"
else
  red "sitemap/robots/llms should use https://www.kommutr.com"
fi

# --- 6–7. Sitemap + links (Python helpers) ---
section "6. Sitemap URLs map to files"
set +e
SM_OUT="$(python3 "$SCRIPTS/check_sitemap.py")"
SM_RC=$?
set -e
while IFS= read -r line; do
  [[ -z "$line" ]] && continue
  case "$line" in
    OK*) green "${line#OK }" ;;
    FAIL*) red "${line#FAIL }" ;;
  esac
done <<<"$SM_OUT"

section "7. Local links and assets resolve"
set +e
LINK_OUT="$(python3 "$SCRIPTS/check_links.py")"
LINK_RC=$?
set -e
LINK_FAIL_COUNT=0
LINK_OK_COUNT=0
while IFS= read -r line; do
  [[ -z "$line" ]] && continue
  case "$line" in
    OK*) LINK_OK_COUNT=$((LINK_OK_COUNT + 1)) ;;
    FAIL*)
      LINK_FAIL_COUNT=$((LINK_FAIL_COUNT + 1))
      red "${line#FAIL }"
      ;;
  esac
done <<<"$LINK_OUT"
if [[ "$LINK_FAIL_COUNT" -eq 0 ]]; then
  green "all local href/src targets resolve ($LINK_OK_COUNT checked)"
fi

# --- 8. HTML / JS ---
section "8. HTML structure + JS syntax"
if grep -q '<!DOCTYPE html>' index.html && grep -qiE '<html[^>]*lang=' index.html; then
  green "index.html has DOCTYPE and lang"
else
  red "index.html missing DOCTYPE or lang"
fi
if grep -q '<title>' index.html && grep -q 'name="description"' index.html; then
  green "title and meta description present"
else
  red "title or meta description missing"
fi
if grep -q 'styles.css' index.html && grep -q 'main.js' index.html; then
  green "styles.css and main.js referenced"
else
  red "styles.css or main.js not referenced from index.html"
fi
if node --check main.js >/dev/null 2>&1; then
  green "main.js syntax OK (node --check)"
else
  red "main.js failed node --check"
fi
if grep -q 'modelContext' main.js && grep -q 'navigate_section' main.js && grep -q 'registerTool' main.js; then
  green "WebMCP navigate_section registered (Phase 7a)"
else
  red "main.js missing WebMCP navigate_section registration"
fi
if node --check waitlist.js >/dev/null 2>&1; then
  green "waitlist.js syntax OK"
else
  red "waitlist.js failed node --check"
fi
if node --check api/waitlist.js >/dev/null 2>&1; then
  green "api/waitlist.js syntax OK"
else
  red "api/waitlist.js failed node --check"
fi
if grep -q 'toolname="join_waitlist"' waitlist/index.html && grep -q 'tooldescription=' waitlist/index.html; then
  green "WebMCP declarative waitlist form (Phase 7b/9)"
else
  red "waitlist form missing WebMCP toolname/tooldescription"
fi
if grep -q 'company_url' waitlist/index.html && grep -q 'company_url' api/waitlist.js; then
  green "waitlist honeypot present"
else
  red "waitlist honeypot missing"
fi
if grep -q 'WEB3FORMS_ACCESS_KEY' api/waitlist.js; then
  green "waitlist API uses WEB3FORMS_ACCESS_KEY env"
else
  red "waitlist API missing WEB3FORMS_ACCESS_KEY handling"
fi

# --- 8b. Phase 11 hardening ---
section "8b. Phase 11 hardening"
if ! grep -R --include='*.html' -q 'fonts.googleapis.com\|fonts.gstatic.com\|api.dicebear.com' . 2>/dev/null; then
  green "no Google Fonts or Dicebear CDN references in HTML"
else
  red "HTML still references Google Fonts or Dicebear CDN"
fi
if grep -q 'fonts.googleapis.com\|fonts.gstatic.com\|api.dicebear.com' vercel.json; then
  red "CSP still allows Google Fonts or Dicebear"
else
  green "CSP tightened (no Google Fonts / Dicebear)"
fi
if [[ -f assets/fonts/inter-latin-400-normal.woff2 && -f assets/fonts.css ]]; then
  green "self-hosted Inter fonts present"
else
  red "self-hosted Inter fonts missing"
fi
if [[ -f .well-known/security.txt ]] && grep -q 'Contact:' .well-known/security.txt; then
  green "security.txt present"
else
  red "security.txt missing"
fi
if [[ -f 404.html ]] && grep -qi 'not found' 404.html; then
  green "custom 404.html present"
else
  red "404.html missing"
fi

# --- 9. Phase 3 soft checks ---
section "9. Canonical, Open Graph, favicon (Phase 3)"
if grep -q 'rel="canonical"' index.html; then
  green "canonical link present"
else
  yellow "canonical not yet — expected in Phase 3"
fi
if grep -q 'property="og:image"' index.html; then
  green "og:image present"
else
  yellow "Open Graph tags not yet — expected in Phase 3"
fi
if grep -q 'rel="icon"' index.html || [[ -f favicon.ico ]] || [[ -f assets/favicon.ico ]]; then
  green "favicon referenced or present"
else
  yellow "favicon not yet — expected in Phase 3"
fi

# --- 10. Asset budgets ---
section "10. Asset size budgets"
MAX_ASSET_BYTES=$((2 * 1024 * 1024))
WARN_ASSET_BYTES=$((1024 * 1024))
if [[ -d ./assets ]]; then
  while IFS= read -r -d '' f; do
    size=$(wc -c <"$f" | tr -d ' ')
    name="${f#./}"
    if [[ "$size" -gt "$MAX_ASSET_BYTES" ]]; then
      red "$name is ${size} bytes (>2MB)"
    elif [[ "$size" -gt "$WARN_ASSET_BYTES" ]]; then
      yellow "$name is ${size} bytes (>1MB)"
    else
      green "$name size OK (${size} bytes)"
    fi
  done < <(find ./assets -type f -print0)
else
  yellow "no assets/ directory"
fi

# --- 11. llms.txt ---
section "11. llms.txt basic shape"
if head -1 llms.txt | grep -q '^# '; then
  green "llms.txt starts with H1"
else
  red "llms.txt must start with # Title"
fi
if grep -q '^>' llms.txt; then
  green "llms.txt has blockquote summary"
else
  yellow "llms.txt missing > summary line"
fi
if grep -q 'https://www.kommutr.com' llms.txt; then
  green "llms.txt uses absolute www URLs"
else
  red "llms.txt should use absolute https://www.kommutr.com URLs"
fi

# --- 12. IndexNow key proof file ---
section "12. IndexNow key file"
INDEXNOW_FOUND=0
for f in *.txt; do
  [[ -f "$f" ]] || continue
  case "$f" in robots.txt|llms.txt) continue ;; esac
  if [[ "$f" =~ ^[A-Za-z0-9-]{8,128}\.txt$ ]]; then
    key="${f%.txt}"
    body="$(tr -d '[:space:]' <"$f")"
    if [[ "$body" == "$key" ]]; then
      green "IndexNow proof file present ($f)"
      INDEXNOW_FOUND=1
      break
    fi
  fi
done
if [[ "$INDEXNOW_FOUND" -eq 0 ]]; then
  yellow "IndexNow key file not found (optional until Phase 6)"
fi

printf '\n======== SUMMARY ========\n'
printf 'Passed: %s   Warnings: %s   Failed: %s\n' "$PASS" "$WARN" "$FAIL"
if [[ "$FAIL" -gt 0 ]]; then
  printf 'Sanity check FAILED\n'
  exit 1
fi
printf 'Sanity check PASSED\n'
exit 0
