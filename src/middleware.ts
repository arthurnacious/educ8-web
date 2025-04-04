import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Configuration for auth routes that should be publicly accessible
const authRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/auth", // For NextAuth.js API routes
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the requested path is an auth route that should be publicly accessible
  const isAuthRoute = authRoutes.some(
    (route) => pathname.startsWith(route) || pathname.includes("/api/auth/")
  );

  // If this is an auth route, allow access without authentication
  if (isAuthRoute) {
    return NextResponse.next();
  }

  // For all other routes, check if the user is authenticated
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  // If no token exists, redirect to login
  if (!token) {
    // Create the login URL with a redirect parameter
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", encodeURI(request.url));

    return NextResponse.redirect(loginUrl);
  }

  // User is authenticated, allow access to the requested route
  return NextResponse.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    // Match all routes except static files, api routes handled separately, and _next
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
