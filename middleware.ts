// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  if (!token) {
    if (url.pathname === "/login") {
      return NextResponse.next();
    }
    if (
      url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/questions")
    ) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  let userId: string | undefined;
  let role: "STUDENT" | "TEACHER" | undefined;

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);
    userId = payload.id as string;
    role = payload.role as "STUDENT" | "TEACHER";
  } catch (error) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");
    return response;
  }

  if (url.pathname === "/login" && userId && role) {
    return NextResponse.redirect(new URL("/questions", req.url));
  }

  if (url.pathname.startsWith("/dashboard") && userId && role) {
    try {
      const res = await fetch(
        `${process.env.NEXTAUTH_URL || req.nextUrl.origin}/api/check-profile?userId=${userId}&role=${role}`,
        {
          headers: {
            Cookie: req.cookies.toString(),
            "Cache-Control": "no-cache",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (!data.completed) {
          return NextResponse.redirect(new URL("/questions", req.url));
        }
      }
    } catch (e) {
      console.error("Profile check error:", e);
      return NextResponse.redirect(new URL("/questions", req.url));
    }
  }

  if (url.pathname.startsWith("/questions") && userId && role) {
    try {
      const res = await fetch(
        `${process.env.NEXTAUTH_URL || req.nextUrl.origin}/api/check-profile?userId=${userId}&role=${role}`,
        {
          headers: {
            Cookie: req.cookies.toString(),
            "Cache-Control": "no-cache",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (data.completed) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      }
    } catch (e) {
      console.error("Profile check error:", e);
    }
  }

  return NextResponse.next();
}
