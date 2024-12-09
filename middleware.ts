import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  console.log("Middleware executed");
  return NextResponse.next();
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};
