import { NextResponse, type NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("user_token")?.value;

  const verifiedToken =
    token && (await verifyToken(token).catch((err) => console.log(err)));

  const isPublicUrl = ["/login", "/sign-up", "/verify-email"].some((path) =>
    req.nextUrl.pathname.startsWith(path),
  );

  if (isPublicUrl && verifiedToken) {
    return NextResponse.redirect(new URL("/", req.url)).headers.set(
      "x-middleware-cache",
      "no-cache",
    );
  }

  if (isPublicUrl && !verifiedToken) {
    return;
  }

  if (!isPublicUrl && !verifiedToken) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/sign-up",
    "/verify-email",
    "/game-of-life",
    "/categories",
  ],
};
