import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const tempToken = url.searchParams.get("access_token");

  if (!tempToken) {
    return NextResponse.redirect(new URL("/", url.origin));
  }

  const cookieStore = await cookies();
  cookieStore.get("redirect_path");

  const isDev = process.env.NODE_ENV !== "production";

  const finalRedirectUrl = process.env.NEXT_PUBLIC_CENTRAL_BASE_URL!;

  const response = new NextResponse(null, {
    status: 302,
    headers: {
      Location: finalRedirectUrl,
    },
  });

  response.cookies.set("session_token", tempToken, {
    httpOnly: true,
    path: "/",
    sameSite: isDev ? "lax" : "none",
    secure: !isDev,
  });

  response.cookies.set("redirect_path", "", {
    path: "/",
    maxAge: -1,
  });

  return response;
}
