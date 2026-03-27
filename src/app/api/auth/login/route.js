import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { loginUser } from "@/lib/auth-users";

export async function POST(request) {
  try {
    const body = await request.json();
    const identifier = String(body?.identifier || "").trim();
    const password = String(body?.password || "");

    if (!identifier || !password) {
      return NextResponse.json(
        { error: "MISSING_FIELDS" },
        { status: 400 },
      );
    }

    const session = await loginUser({ identifier, password });

    if (!session) {
      return NextResponse.json({ error: "INVALID_CREDENTIALS" }, { status: 401 });
    }

    cookies().set({
      name: "lexer_session",
      value: session.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({ ok: true, user: session.user });
  } catch (error) {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}
