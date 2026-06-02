import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ processed: 0, message: "cron disabled in dev" });
}
