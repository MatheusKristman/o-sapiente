import { Metadata } from "next";
import { extractRouterConfig } from "uploadthing/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

import { ourFileRouter } from "@/app/api/uploadthing/core";

export const metadata: Metadata = {
  title: "O Sapiente - Painel de Controle",
  description:
    "Conecte-se para aprender e ensinar! Nossa plataforma une professores apaixonados a alunos em busca de conhecimento. Junte-se a nós para uma jornada educacional enriquecedora e colaborativa.",
};

function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NextSSRPlugin
        /**
         * The `extractRouterConfig` will extract **only** the route configs
         * from the router to prevent additional information from being
         * leaked to the client. The data passed to the client is the same
         * as if you were to fetch `/api/uploadthing` directly.
         */
        routerConfig={extractRouterConfig(ourFileRouter)}
      />
      {children}
    </>
  );
}

export default AdminDashboardLayout;
