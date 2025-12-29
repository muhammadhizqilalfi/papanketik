// app/api/auth/[...nextauth]/options.ts
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // logika cek user
        return { id: "1", name: "Demo User", email: credentials?.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
};
