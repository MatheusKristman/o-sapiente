import NextAuth, { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

import { prisma } from "@/libs/prismadb";
import { IUser } from "@/types";

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
          throw new Error(
            "Credenciais inválidas! Verifique e tente novamente!",
          );
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
          console.log("erro no usuário não encontrado");
          throw new Error(
            "Credenciais inválidas! Verifique e tente novamente!",
          );
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isCorrectPassword) {
          throw new Error(
            "Credenciais inválidas! Verifique e tente novamente!",
          );
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
