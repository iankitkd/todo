import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const token = request.cookies.get("token");

  const pathname = request.nextUrl.pathname;
  const isAuthPage = pathname === "/signin" || pathname === "/signup";
  const isDashboardPage = pathname === "/";

  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signin", "/signup"],
};
