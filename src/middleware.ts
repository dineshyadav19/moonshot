import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isUserAuthenticated } from "~/utils/session";

export default function middleware(req: NextRequest) {
  if (isUserAuthenticated) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/Login", req.url));
}

export const config = {
  matcher: "/",
};
