import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("papanketik");
    const products = await db.collection("products").find().toArray();
    return NextResponse.json({ products });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, image, stock, price, type } = body;

    if (!name || !description || !image || !stock || !price || !type) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("papanketik");
    const result = await db.collection("products").insertOne({
      name,
      description,
      image,
      stock,
      price,
      type,
      createdAt: new Date(),
    });

    return NextResponse.json({ product: { ...body, _id: result.insertedId } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, name, description, image, stock, price, type } = body;

    if (!id) return NextResponse.json({ error: "Missing product id" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("papanketik");
    await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, description, image, stock, price, type } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing product id" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db("papanketik");
    await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
