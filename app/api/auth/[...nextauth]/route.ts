import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

import { prisma } from "@/libs/prismadb";
import { AccountRole } from "@prisma/client";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
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
                    throw new Error("Credenciais inválidas! Verifique e tente novamente!");
                }

                let user;

                if (credentials.type === "student") {
                    user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
                            accountType: AccountRole.STUDENT,
                        },
                    });
                }

                if (credentials.type === "professor") {
                    user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
                            accountType: AccountRole.PROFESSOR,
                        },
                    });
                }

                if (!user || !user?.password) {
                    console.log("erro no usuário não encontrado");
                    throw new Error("Credenciais inválidas! Verifique e tente novamente!");
                }

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.password);

                if (!isCorrectPassword) {
                    throw new Error("Credenciais inválidas! Verifique e tente novamente!");
                }

                return user;
            },
        }),
    ],
    debug: process.env.NODE_ENV === "development",
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
