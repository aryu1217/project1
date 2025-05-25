import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
  const token =
    request.cookies.get("next-auth.session-token")?.value || //HTTP
    request.cookies.get("__Secure-next-auth.session-token")?.value; //HTTPS

  const isLoggedIn = !!token;
  const isLoginPage = request.nextUrl.pathname === "/login";

  //로그인 상태에서 로그인 페이지에 접근하면 홈으로 리다이렉트
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

export const config = {};
