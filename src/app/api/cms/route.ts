import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getCmsContent, saveCmsContent, type CmsContent } from "@/lib/cms";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

export async function GET() {
  const content = getCmsContent();
  return NextResponse.json(content);
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token || !verifySessionToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: CmsContent;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    saveCmsContent(body);
  } catch {
    return NextResponse.json(
      {
        error:
          "Failed to save content. On Vercel, the filesystem is read-only — a database adapter is required for production.",
      },
      { status: 500 }
    );
  }

  revalidatePath("/");
  revalidatePath("/contact");

  return NextResponse.json({ ok: true });
}
