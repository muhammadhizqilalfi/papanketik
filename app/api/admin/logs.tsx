// app/api/admin/users/logs.tsx
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const logs = await client
      .db("papanketik")
      .collection("logs")
      .find()
      .sort({ timestamp: -1 })
      .limit(100)
      .toArray();

    return NextResponse.json(logs);
  } catch (err) {
    console.error("Failed to fetch logs:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
