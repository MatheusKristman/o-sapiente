import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import Header from "../components/Header";
import HeaderMobile from "@/components/HeaderMobile";
import Footer from "@/components/Footer";
import AuthContext from "@/context/AuthContext";
import ActiveStatus from "@/components/ActiveStatus";

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
        <AuthContext>
          <Header />
          <HeaderMobile />
          <ActiveStatus />
          <Toaster
            position="top-center"
            reverseOrder
            containerStyle={{ zIndex: "99999" }}
          />
          {children}
          <Footer />
        </AuthContext>
      </body>
    </html>
  );
}
