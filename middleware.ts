import { NextRequest, NextResponse } from "next/server"; 
import { clerkMiddleware } from "@clerk/nextjs/server";
import { _api } from "./types/api";

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("access_cookie")?.value;

  // Check if accessToken exists to determine authentication
  if (accessToken) {
    return NextResponse.next(); // Proceed if authenticated
  } else {
    return NextResponse.redirect(new URL("/login?NotLoggedIn=True", req.url)); // Redirect if not authenticated
  }
}

// Apply Clerk middleware
export default clerkMiddleware();

// Configure the routes the middleware applies to
export const config = {
  matcher: [
    "/admin",
    "/dashboard",
    "/dashboard/:path*",
    "/super-admin",
    "/super-admin/:path*",
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};

