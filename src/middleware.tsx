import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isUserLoggedIn = request.cookies.get("accessToken");
  if (!isUserLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/home", "/movie/:slug*"],
};
