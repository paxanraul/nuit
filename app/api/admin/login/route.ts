import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { createAdminSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const passwordValid = typeof password === "string" && process.env.ADMIN_PASSWORD_HASH
    ? await compare(password, process.env.ADMIN_PASSWORD_HASH)
    : false;
  if (email !== process.env.ADMIN_EMAIL || !passwordValid) {
    return NextResponse.json({ error: "Неверный email или пароль" }, { status: 401 });
  }
  await createAdminSession();
  return NextResponse.json({ ok: true });
}
