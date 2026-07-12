/**
 * Waitlist intake — validates, rejects honeypot bots, forwards to Web3Forms.
 *
 * Vercel env (Production + Preview):
 *   WEB3FORMS_ACCESS_KEY = key from https://web3forms.com (free)
 *
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
      if (raw.length > 8_000) {
        reject(new Error("payload_too_large"));
      }
    });
    req.on("end", () => {
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch {
        // application/x-www-form-urlencoded fallback
        const params = new URLSearchParams(raw);
        resolve(Object.fromEntries(params.entries()));
      }
    });
    req.on("error", reject);
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
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

  // Honeypot: treat as success so bots do not retry, but do not forward
  if (body.company_url) {
    return res.status(200).json({ ok: true });
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

  try {
    const upstream = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: "Kommutr waitlist signup",
        from_name: "Kommutr website",
        email,
        name: name || "(not provided)",
        interest,
        message: `Waitlist signup\nInterest: ${interest}\nName: ${name || "(not provided)"}`,
        botcheck: "",
      }),
    });

    const data = await upstream.json().catch(() => ({}));
    if (!upstream.ok || data.success === false) {
      return res.status(502).json({
        error: "Could not save your signup. Please try again or email support@kommutr.com.",
      });
    }

    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({
      error: "Could not save your signup. Please try again or email support@kommutr.com.",
    });
  }
};
