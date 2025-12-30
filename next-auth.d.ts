import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** Semua properti bawaan user */
      name?: string | null;
      email?: string | null;
      image?: string | null;
      /** Tambahkan role */
      role: "user" | "admin";
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: "user" | "admin";
  }

  interface JWT {
    role?: "user" | "admin";
  }
}
