// import type { NextRequest } from "next/server";

// export default async function middleware(req: NextRequest) {
//   const sessionToken = req.cookies.get("session_token")?.value;
//   console.log(sessionToken);
//   if (sessionToken && !req.nextUrl.pathname.startsWith("/")) {
//     return Response.redirect(new URL("/", req.url));
//   }

//   if (!sessionToken && !req.nextUrl.pathname.startsWith("/Login")) {
//     return Response.redirect(new URL("/Login", req.url));
//   }
// }

// export const config = {
//   matcher: "/",
// };

export default () => {};
