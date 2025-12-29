import { NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { Resend } from "resend";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { newEmail } = await req.json();
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 jam

  const client = await clientPromise;
  const db = client.db();

  await db.collection("users").updateOne(
    { email: session.user.email },
    {
      $set: {
        pendingEmail: newEmail,
        emailChangeToken: token,
        emailChangeExpires: expires,
      },
    }
  );

  const verifyUrl = `${process.env.NEXTAUTH_URL}/verify-email-change?token=${token}`;

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "Papanketik <noreply@papanketik.com>",
    to: newEmail,
    subject: "Confirm your new email",
    html: `<a href="${verifyUrl}">Confirm email change</a>`,
  });

  return NextResponse.json({ ok: true });
}
