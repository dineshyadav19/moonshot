import { NextResponse, type NextRequest } from "next/server";
import { verifyToken } from "./lib/auth";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("user_token")?.value;
  const verifiedToken =
    token && (await verifyToken(token).catch((err) => console.log(err)));

  if (req.nextUrl.pathname.startsWith("/Login") && !verifiedToken) {
    return;
  }
  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/Login", req.url));
  }
  if (req.nextUrl.pathname.startsWith("/Login") && verifiedToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/", "/Login"],
};
