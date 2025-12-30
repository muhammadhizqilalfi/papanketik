// app/api/products/route.ts
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("papanketik");
    const products = await db.collection("products").find({}).toArray();
    return NextResponse.json({ products });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
