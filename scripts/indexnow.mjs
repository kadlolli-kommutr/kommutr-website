#!/usr/bin/env node
/**
 * Notify IndexNow (Bing + participating engines) that URLs changed.
 *
 * Usage:
 *   node scripts/indexnow.mjs
 *   node scripts/indexnow.mjs https://www.kommutr.com/privacy/
 *   npm run indexnow
 *
 * Key file at repo root: {KEY}.txt (same name as the key, contents = key only).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HOST = "www.kommutr.com";
const ENDPOINT = "https://api.indexnow.org/indexnow";

function findKeyFile() {
  const files = fs.readdirSync(ROOT).filter((f) => /^[A-Za-z0-9-]{8,128}\.txt$/.test(f));
  // Prefer a file whose name (without .txt) matches its contents
  for (const f of files) {
    if (["robots.txt", "llms.txt"].includes(f)) continue;
    const key = f.slice(0, -4);
    const body = fs.readFileSync(path.join(ROOT, f), "utf8").trim();
    if (body === key) return { key, keyFile: f };
  }
  return null;
}

const found = findKeyFile();
if (!found) {
  console.error("No IndexNow key file found. Expected {key}.txt at repo root with matching contents.");
  process.exit(1);
}

const { key, keyFile } = found;
const keyLocation = `https://${HOST}/${keyFile}`;

const defaultUrls = [
  `https://${HOST}/`,
  `https://${HOST}/waitlist/`,
  `https://${HOST}/ride/`,
  `https://${HOST}/drive/`,
  `https://${HOST}/business/`,
  `https://${HOST}/support/`,
  `https://${HOST}/cities/austin/`,
  `https://${HOST}/privacy/`,
  `https://${HOST}/terms/`,
];

const urls = process.argv.slice(2).length ? process.argv.slice(2) : defaultUrls;

const body = {
  host: HOST,
  key,
  keyLocation,
  urlList: urls,
};

console.log("IndexNow submit:", {
  host: HOST,
  keyLocation,
  urlList: urls,
  key: "(hidden)",
});

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

const text = await res.text();
console.log("HTTP", res.status, text || "(empty body)");

if (res.status !== 200 && res.status !== 202) {
  process.exit(1);
}

console.log("IndexNow OK");
