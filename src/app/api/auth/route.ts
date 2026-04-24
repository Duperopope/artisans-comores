import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  isAdminEmail,
  createSessionToken,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from "@/lib/auth";

const CMS_PASSWORD = process.env.CMS_PASSWORD ?? "";

export async function POST(request: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const cookieStore = await cookies();

  if (body.logout === true) {
    cookieStore.delete(SESSION_COOKIE);
    return NextResponse.json({ ok: true });
  }

  const email = String(body.email ?? "");
  const password = String(body.password ?? "");

  if (!CMS_PASSWORD) {
    return NextResponse.json(
      { error: "CMS_PASSWORD env var not configured on this server." },
      { status: 500 }
    );
  }

  if (!isAdminEmail(email) || password !== CMS_PASSWORD) {
    return NextResponse.json({ error: "Identifiants invalides." }, { status: 401 });
  }

  const token = createSessionToken(email);
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
