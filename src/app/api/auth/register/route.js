import { NextResponse } from "next/server";
import { registerUser } from "@/lib/auth-users";

const isEmailValid = (email) => /\S+@\S+\.\S+/.test(email);

export async function POST(request) {
  try {
    const body = await request.json();
    const fullName = String(body?.fullName || "").trim();
    const username = String(body?.username || "").trim();
    const email = String(body?.email || "").trim();
    const password = String(body?.password || "");

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "MISSING_FIELDS" },
        { status: 400 },
      );
    }

    if (username.length < 3 || password.length < 8 || !isEmailValid(email)) {
      return NextResponse.json(
        { error: "INVALID_PAYLOAD" },
        { status: 400 },
      );
    }

    const user = await registerUser({
      fullName,
      username,
      email,
      password,
    });

    return NextResponse.json({ ok: true, user });
  } catch (error) {
    if (error?.code === "USER_ALREADY_EXISTS") {
      return NextResponse.json(
        { error: "USER_ALREADY_EXISTS" },
        { status: 409 },
      );
    }

    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}
