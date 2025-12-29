import bcrypt from "bcryptjs";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, password } = await req.json();
  const hash = await bcrypt.hash(password, 10);

  const client = await clientPromise;
  const db = client.db();

  const user = await db.collection("users").findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user)
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });

  await db.collection("users").updateOne(
    { _id: user._id },
    {
      $set: { passwordHash: hash },
      $unset: { resetPasswordToken: "", resetPasswordExpires: "" },
    }
  );

  return NextResponse.json({ ok: true });
}
