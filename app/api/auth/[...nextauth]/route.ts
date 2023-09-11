import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

import { prisma } from "@/libs/prismadb";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
        type: { label: "type", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("E-mail ou Senha invalidos");
        }

        let user;

        if (credentials.type === "student") {
          user = await prisma.student.findUnique({
            where: {
              email: credentials.email,
            },
          });
        }

        if (credentials.type === "professor") {
          user = await prisma.professor.findUnique({
            where: {
              email: credentials.email,
            },
          });
        }

        if (!user || !user?.password) {
          throw new Error("E-mail ou Senha Invalidos");
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isCorrectPassword) {
          throw new Error("E-mail ou Senha Invalidos");
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
});

export { handler as GET, handler as POST };
