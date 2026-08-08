import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const cookieName = "nuit_admin";
const secret = () => new TextEncoder().encode(process.env.AUTH_SECRET ?? "");

function assertAuthConfig() {
  if (!process.env.AUTH_SECRET || !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD_HASH) {
    throw new Error("AUTH_SECRET, ADMIN_EMAIL and ADMIN_PASSWORD_HASH must be configured.");
  }
}

export async function createAdminSession() {
  assertAuthConfig();
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(process.env.ADMIN_EMAIL!)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
  const store = await cookies();
  store.set(cookieName, token, { httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 60 * 60 * 24 * 7 });
}

export async function getAdminSession() {
  try {
    assertAuthConfig();
    const token = (await cookies()).get(cookieName)?.value;
    if (!token) return false;
    const { payload } = await jwtVerify(token, secret());
    return payload.role === "admin" && payload.sub === process.env.ADMIN_EMAIL;
  } catch {
    return false;
  }
}

export async function clearAdminSession() {
  (await cookies()).delete(cookieName);
}
