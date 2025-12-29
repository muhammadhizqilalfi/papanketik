import crypto from "crypto";
import clientPromise from "@/lib/mongodb";
import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  const token = crypto.randomBytes(32).toString("hex");

  const client = await clientPromise;
  const db = client.db();

  const user = await db.collection("users").findOne({ email });
  if (!user) return NextResponse.json({ ok: true });

  await db.collection("users").updateOne(
    { email },
    {
      $set: {
        resetPasswordToken: token,
        resetPasswordExpires: new Date(Date.now() + 1000 * 60 * 60),
      },
    }
  );

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "Papanketik <noreply@papanketik.com>",
    to: email,
    subject: "Reset your password",
    html: `<a href="${resetUrl}">Reset password</a>`,
  });

  return NextResponse.json({ ok: true });
}
