import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import { AccountRole } from "@prisma/client";

import { prisma } from "@/libs/prismadb";
import EmailConfirmAccount from "@/emails/EmailConfirmAccount";

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
        const emailHost: string = process.env.EMAIL_SMTP!;
        const emailUser: string = process.env.EMAIL_USER!;
        const emailPass: string = process.env.EMAIL_PASS!;
        const emailPort: number = Number(process.env.EMAIL_PORT!);
        const baseUrl =
          process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_BASEURL_DEV
            : process.env.NEXT_PUBLIC_BASEURL;

        if (!credentials?.email || !credentials?.password) {
          throw new Error(
            "Credenciais inválidas! Verifique e tente novamente!",
          );
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
          throw new Error(
            "Credenciais inválidas! Verifique e tente novamente!",
          );
        }

        if (!user.isConfirmed) {
          const transport = nodemailer.createTransport({
            host: emailHost,
            port: emailPort,
            auth: {
              user: emailUser,
              pass: emailPass,
            },
          });

          const emailHtml = render(
            EmailConfirmAccount({
              userName: `${user.firstName} ${user.lastName}`,
              url: `${baseUrl}/?id=${user.id}&confirmed=true&type=${credentials.type}`
            })
          );

          const options = {
            from: emailUser,
            to: user.email,
            subject: "Confirme sua conta - O Sapiente",
            html: emailHtml,
          };

          transport.sendMail(options, (error) => {
            if (error) {
              console.log("[ERROR_ON_CONFIRMATION_ACCOUNT_EMAIL]", error);

              return new Response("Ocorreu um erro ao enviar o e-mail de confirmação da sua conta", { status: 400 })
            }
          });

          throw new Error(
            "Cadastro não confirmado, verifique seu e-mail e confirme sua conta",
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
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
