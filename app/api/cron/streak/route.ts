import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const secret = request.headers.get("x-cron-secret");
  if (secret !== process.env.CRON_SECRET && process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json({
    processed: 0,
    message: "Streak cron is stubbed — Supabase not connected yet",
    nextStep: "Wire to check_and_update_streak() in Phase 2 migration",
  });
}
