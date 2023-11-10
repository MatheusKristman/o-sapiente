import { SlidersHorizontal, MessageCircle, ListChecks, UserSquare2, Lock } from "lucide-react";

export const menuItems = [
  {
    label: "Painel de controle",
    icon: SlidersHorizontal,
    studentHref: "/painel-de-controle/aluno/resumo/",
    professorHref: "/painel-de-controle/professor/resumo/",
  },
  {
    label: "Mensagens",
    icon: MessageCircle,
    studentHref: "/painel-de-controle/aluno/mensagens/",
    professorHref: "/painel-de-controle/professor/mensagens/",
  },
  {
    label: "Histórico de Solicitações",
    icon: ListChecks,
    studentHref: "/painel-de-controle/aluno/historico-de-solicitacoes/",
    professorHref: "/painel-de-controle/professor/historico-de-solicitacoes/",
  },
  {
    label: "Minha Conta",
    icon: UserSquare2,
    studentHref: "/painel-de-controle/aluno/minha-conta/",
    professorHref: "/painel-de-controle/professor/minha-conta/",
  },
  { label: "Em breve", icon: Lock, studentHref: "", professorHref: "" },
];
