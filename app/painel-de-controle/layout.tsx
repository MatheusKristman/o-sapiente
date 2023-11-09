import DashboardNav from "@/components/dashboard/DashboardNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "O Sapiente - Painel de Controle",
  description:
    "Conecte-se para aprender e ensinar! Nossa plataforma une professores apaixonados a alunos em busca de conhecimento. Junte-se a nós para uma jornada educacional enriquecedora e colaborativa.",
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full flex flex-col">
      <DashboardNav />
      {children}
    </div>
  );
};

export default DashboardLayout;
