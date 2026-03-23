import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Single canonical host: non-www. Set NEXT_PUBLIC_SITE_URL to https://rockrivervt.com
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  if (host === "www.rockrivervt.com") {
    const url = request.nextUrl.clone();
    url.hostname = "rockrivervt.com";
    url.protocol = "https:";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webmanifest)$).*)"],
};
