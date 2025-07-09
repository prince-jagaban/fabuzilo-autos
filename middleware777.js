// middleware.js
import { NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, applicationDefault } from "firebase-admin/app";

// Initialize admin SDK only once
const app =
  !getAuth.apps?.length &&
  initializeApp({
    credential: applicationDefault(),
  });

export async function middleware(request) {
  const token = request.cookies.get("__session")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    await getAuth().verifyIdToken(token);
    return NextResponse.next(); // allow access
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"], // protect dashboard only
};
