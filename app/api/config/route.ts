import { NextResponse } from "next/server";

export const GET = async () => {
  console.log("API Request: /api/config");
  return NextResponse.json({ message: "Hello, World!" });
};
