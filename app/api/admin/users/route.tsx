import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("papanketik");

    const users = await db
      .collection("users")
      .find({})
      .project({ password: 0 }) // jangan kirim password
      .toArray();

    return NextResponse.json({ users });
  } catch (error) {
    console.error("FETCH USERS ERROR:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
