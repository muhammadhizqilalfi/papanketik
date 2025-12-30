// app/api/account/change-email/route.ts
import { NextResponse } from "next/server";
import crypto from "crypto";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth/next";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Resend } from "resend";

// Definisikan authOptions dengan tipe NextAuthOptions
const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const client = await clientPromise;
        const db = client.db("papanketik");
        const user = await db.collection("users").findOne({ email: credentials.email });
        if (!user) return null;

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role || "user",
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user && "role" in user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as "user" | "admin";
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { newEmail } = await req.json();
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 jam

  const client = await clientPromise;
  const db = client.db("papanketik");

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
