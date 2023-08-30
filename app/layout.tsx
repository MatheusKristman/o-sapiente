import "./globals.css";
import type { Metadata } from "next";

import Header from "../components/Header";
import HeaderMobile from "@/components/HeaderMobile";

export const metadata: Metadata = {
  title: "O Sapiente",
  description:
    "Conecte-se para aprender e ensinar! Nossa plataforma une professores apaixonados a alunos em busca de conhecimento. Junte-se a nós para uma jornada educacional enriquecedora e colaborativa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <HeaderMobile />
        {children}
      </body>
    </html>
  );
}
