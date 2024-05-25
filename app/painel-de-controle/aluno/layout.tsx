import { Metadata } from "next";
import { extractRouterConfig } from "uploadthing/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";

import DashboardNav from "@/components/dashboard/DashboardNav";
import { ourFileRouter } from "@/app/api/uploadthing/core";

export const metadata: Metadata = {
  title: "O Sapiente - Painel de Controle",
  description:
    "Conecte-se para aprender e ensinar! Nossa plataforma une professores apaixonados a alunos em busca de conhecimento. Junte-se a nós para uma jornada educacional enriquecedora e colaborativa.",
};

const StudentDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col">
      <DashboardNav />
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
    </div>
  );
};

export default StudentDashboardLayout;
