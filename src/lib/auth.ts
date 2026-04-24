import crypto from "crypto";
export { SESSION_COOKIE, SESSION_MAX_AGE } from "./auth-constants";

const ADMIN_EMAILS = (
  process.env.ADMIN_EMAILS ?? "s.medjaher@gmail.com,s.medjajher@gmail.com"
)
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

const SECRET = process.env.CMS_SECRET ?? "dev-secret-change-me-in-production";

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase().trim());
}

export function createSessionToken(email: string): string {
  const payload = `${email.toLowerCase()}:${Date.now()}`;
  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(payload);
  const sig = hmac.digest("hex");
  return Buffer.from(`${payload}:${sig}`).toString("base64url");
}

export function verifySessionToken(token: string): string | null {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf-8");
    const lastColon = decoded.lastIndexOf(":");
    if (lastColon === -1) return null;

    const payload = decoded.slice(0, lastColon);
    const sig = decoded.slice(lastColon + 1);

    const hmac = crypto.createHmac("sha256", SECRET);
    hmac.update(payload);
    const expectedSig = hmac.digest("hex");

    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) {
      return null;
    }

    const colonIdx = payload.indexOf(":");
    const email = payload.slice(0, colonIdx);

    if (!isAdminEmail(email)) return null;
    return email;
  } catch {
    return null;
  }
}
