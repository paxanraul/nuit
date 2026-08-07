const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const basePath = rawBasePath && rawBasePath !== "/"
  ? `/${rawBasePath.replace(/^\/+|\/+$/g, "")}`
  : "";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nuit-store.ru").replace(/\/$/, "");
export const siteOrigin = new URL(siteUrl).origin;

export function withBasePath(path: string) {
  if (!path.startsWith("/") || !basePath || path === basePath || path.startsWith(`${basePath}/`)) {
    return path;
  }
  return `${basePath}${path}`;
}

export function absoluteUrl(path: string) {
  return new URL(withBasePath(path), `${siteUrl}/`).toString();
}
