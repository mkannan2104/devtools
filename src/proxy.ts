import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CANONICAL_HOST = "www.developerworkbench.in";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const proto = request.headers.get("x-forwarded-proto");
  const { pathname, search } = request.nextUrl;
  const pathWithQuery = `${pathname}${search}`;

  const isProductionHost =
    host === "developerworkbench.in" || host === CANONICAL_HOST;

  if (!isProductionHost) {
    return NextResponse.next();
  }

  if (host === "developerworkbench.in") {
    return NextResponse.redirect(
      new URL(`https://${CANONICAL_HOST}${pathWithQuery}`),
      301
    );
  }

  if (proto === "http") {
    return NextResponse.redirect(
      new URL(`https://${CANONICAL_HOST}${pathWithQuery}`),
      301
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images/|ads.txt|robots.txt|sitemap.xml).*)",
  ],
};
