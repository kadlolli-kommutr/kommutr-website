/**
 * Waitlist config + optional validation helper.
 *
 * GET  → { configured, accessKey? }  (access key is public by Web3Forms design)
 * POST → honeypot/validation only (no upstream call)
 *
 * Vercel env: WEB3FORMS_ACCESS_KEY
 * Never logs email or other PII.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INTERESTS = new Set(["rider", "driver", "both"]);

function readBody(req) {
  if (req.body && typeof req.body === "object") return Promise.resolve(req.body);
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 8_000) reject(new Error("payload_too_large"));
    });
    req.on("end", () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve(Object.fromEntries(new URLSearchParams(raw).entries()));
      }
    });
    req.on("error", reject);
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  const accessKey = String(process.env.WEB3FORMS_ACCESS_KEY || "").trim();

  if (req.method === "GET") {
    if (!accessKey) {
      return res.status(503).json({ configured: false });
    }
    // Access key is designed to be used from the browser
    return res.status(200).json({ configured: true, accessKey });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!accessKey) {
    return res.status(503).json({
      error:
        "Waitlist signup is not configured yet. Please email support@kommutr.com with subject Waitlist.",
    });
  }

  let body;
  try {
    body = await readBody(req);
  } catch (err) {
    const status = err && err.message === "payload_too_large" ? 413 : 400;
    return res.status(status).json({ error: "Invalid request" });
  }

  if (body.company_url) {
    return res.status(200).json({ ok: true, spam: true });
  }

  const email = String(body.email || "")
    .trim()
    .toLowerCase();
  const name = String(body.name || "")
    .trim()
    .slice(0, 120);
  let interest = String(body.interest || "both")
    .trim()
    .toLowerCase();
  if (!INTERESTS.has(interest)) interest = "both";

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  return res.status(200).json({
    ok: true,
    accessKey,
    email,
    name: name || "Waitlist guest",
    interest,
  });
};
