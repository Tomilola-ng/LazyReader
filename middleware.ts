import { NextRequest, NextResponse } from "next/server";
import { _api } from "./types/api";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_cookie")?.value;

  const authResponse: _api["getAuth"] = () => {
    // Run your authentication logic here
    return {
      status: 200,
      body: {
        accessToken: accessToken,
      },
    };
  };

  if (authResponse()) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/login?NotLoggedIn=True", req.url));
  }
}

export const config = {
  matcher: [
    "/admin",
    "/dashboard",
    "/dashboard/:path*",
    "/super-admin",
    "/super-admin/:path*",
  ],
};
